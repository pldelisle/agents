#!/usr/bin/env node

import {
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage(stream = process.stdout) {
  stream.write(`Usage: node scripts/run-skill-evals.js --adapter <executable> [options]

Options:
  --adapter-arg <value>  Repeatable exact argument passed to the adapter.
  --runs <count>         Repetitions per case (default: 3).
  --suite <name>         routing, behavior, or all (default: all).
  --skill <id>           Run one canonical skill only.
  --timeout-ms <value>   Per-case adapter timeout (default: 120000).
  --output <path>        Result JSON path (default: evals/results/<timestamp>.json).
  --help                 Show this help.

The adapter receives one JSON case on stdin and must return one JSON result on
stdout. See evals/adapter-contract.md.
`);
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  usage(process.stderr);
  process.exit(2);
}

function parseArguments(args) {
  const options = { adapterArgs: [], runs: 3, suite: "all", timeoutMs: 120000 };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    const value = () => {
      const next = args[index + 1];
      if (next === undefined) fail(`${argument} requires a value.`);
      index += 1;
      return next;
    };
    switch (argument) {
      case "--adapter": options.adapter = value(); break;
      case "--adapter-arg": options.adapterArgs.push(value()); break;
      case "--runs": options.runs = Number(value()); break;
      case "--suite": options.suite = value(); break;
      case "--skill": options.skill = value(); break;
      case "--timeout-ms": options.timeoutMs = Number(value()); break;
      case "--output": options.output = value(); break;
      case "--help": options.help = true; break;
      default: fail(`Unknown argument: ${argument}`);
    }
  }
  if (!Number.isInteger(options.runs) || options.runs < 1) fail("--runs must be a positive integer.");
  if (!Number.isInteger(options.timeoutMs) || options.timeoutMs < 1) fail("--timeout-ms must be a positive integer.");
  if (!["routing", "behavior", "all"].includes(options.suite)) fail("--suite must be routing, behavior, or all.");
  return options;
}

function readJson(path) {
  return JSON.parse(readFileSync(join(repositoryRoot, path), "utf8"));
}

function sorted(values) {
  return [...values].sort();
}

function sameValues(left, right) {
  return JSON.stringify(sorted(left)) === JSON.stringify(sorted(right));
}

function routingCases(data, selectedSkill) {
  const cases = [];
  for (const suite of data.skills) {
    if (selectedSkill && suite.skill !== selectedSkill) continue;
    for (const prompt of suite.positive) {
      cases.push({ kind: "routing", skill: suite.skill, category: "positive", prompt, expectedSkills: [suite.skill] });
    }
    for (const prompt of suite.nearMiss) {
      cases.push({ kind: "routing", skill: suite.skill, category: "near-miss", prompt, expectedSkills: [] });
    }
    for (const entry of suite.ambiguous) {
      cases.push({ kind: "routing", skill: suite.skill, category: "ambiguous", prompt: entry.prompt, expectedSkills: entry.expected, rationale: entry.reason });
    }
  }
  return cases;
}

function behaviorCases(data, selectedSkill) {
  return data.skills.flatMap((suite) =>
    selectedSkill && suite.skill !== selectedSkill
      ? []
      : suite.cases.map((testCase) => ({ kind: "behavior", skill: suite.skill, ...testCase })),
  );
}

function grade(testCase, response) {
  if (testCase.kind === "routing") {
    const actual = Array.isArray(response.selectedSkills) ? response.selectedSkills : [];
    return {
      passed: sameValues(actual, testCase.expectedSkills),
      expectedSkills: testCase.expectedSkills,
      actualSkills: actual,
    };
  }

  const satisfiedOutcomes = response.satisfiedOutcomes ?? [];
  const performedActions = response.performedActions ?? [];
  const observedForbiddenActions = response.observedForbiddenActions ?? [];
  const missingOutcomes = testCase.requiredOutcomes.filter((item) => !satisfiedOutcomes.includes(item));
  const missingActions = testCase.requiredActions.filter((item) => !performedActions.includes(item));
  const forbiddenActions = testCase.forbiddenActions.filter((item) => observedForbiddenActions.includes(item));
  return {
    passed: missingOutcomes.length === 0 && missingActions.length === 0 && forbiddenActions.length === 0,
    missingOutcomes,
    missingActions,
    observedForbiddenActions: forbiddenActions,
  };
}

const options = parseArguments(process.argv.slice(2));
if (options.help) {
  usage();
  process.exit(0);
}
if (!options.adapter) fail("--adapter is required.");

const catalog = readJson("skills/catalog.json");
if (options.skill && !catalog.skills.some(({ id }) => id === options.skill)) {
  fail(`Unknown canonical skill: ${options.skill}`);
}

const cases = [];
if (["routing", "all"].includes(options.suite)) {
  cases.push(...routingCases(readJson("evals/routing-cases.json"), options.skill));
}
if (["behavior", "all"].includes(options.suite)) {
  cases.push(...behaviorCases(readJson("evals/behavior-cases.json"), options.skill));
}

const results = [];
for (const testCase of cases) {
  for (let run = 1; run <= options.runs; run += 1) {
    const startedAt = new Date().toISOString();
    const execution = spawnSync(options.adapter, options.adapterArgs, {
      cwd: repositoryRoot,
      encoding: "utf8",
      input: JSON.stringify({
        schemaVersion: 1,
        run,
        testCase,
        catalogSkill: catalog.skills.find(({ id }) => id === testCase.skill),
      }),
      maxBuffer: 10 * 1024 * 1024,
      timeout: options.timeoutMs,
    });

    let response;
    let adapterError;
    try {
      response = JSON.parse(execution.stdout || "{}");
    } catch (error) {
      adapterError = `Invalid adapter JSON: ${error.message}`;
      response = {};
    }
    if (execution.error) adapterError = execution.error.message;
    if (execution.status !== 0) adapterError = `Adapter exited ${execution.status}: ${execution.stderr.trim()}`;

    const gradeResult = adapterError ? { passed: false, adapterError } : grade(testCase, response);
    results.push({ testCase, run, startedAt, response, grade: gradeResult });
    process.stdout.write(`${gradeResult.passed ? "PASS" : "FAIL"} ${testCase.kind}/${testCase.skill}/${testCase.id ?? testCase.category} #${run}\n`);
  }
}

const passed = results.filter((result) => result.grade.passed).length;
const timestamp = new Date().toISOString().replace(/[:.]/gu, "-");
const output = resolve(
  repositoryRoot,
  options.output ?? join("evals", "results", `${timestamp}.json`),
);
if (!isAbsolute(output) || !output.startsWith(`${repositoryRoot}/`)) {
  fail("--output must resolve inside the repository.");
}
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify({
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  adapter: { executable: options.adapter, args: options.adapterArgs },
  options: { runs: options.runs, suite: options.suite, skill: options.skill ?? null, timeoutMs: options.timeoutMs },
  summary: { passed, failed: results.length - passed, total: results.length },
  results,
}, null, 2)}\n`);

process.stdout.write(`Result: ${passed}/${results.length} passed. Report: ${output}\n`);
if (passed !== results.length) process.exitCode = 1;
