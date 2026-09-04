#!/usr/bin/env node

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = join(repositoryRoot, "skills", "source");
const catalog = JSON.parse(
  readFileSync(join(repositoryRoot, "skills", "catalog.json"), "utf8"),
);

const runtimes = ["codex", "claude", "kiro"];
const trackers = ["linear", "jira"];
const defaultTrackers = { codex: "linear", claude: "jira", kiro: "jira" };

function usage(stream = process.stdout) {
  stream.write(
    "Usage: scripts/build-skills.sh [codex|claude|kiro|all] [linear|jira]\n",
  );
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  usage(process.stderr);
  process.exit(2);
}

function runtimeTarget(runtime, tracker) {
  const outputRoot = process.env.SKILLS_OUTPUT_ROOT;
  return outputRoot
    ? join(outputRoot, runtime, tracker, "skills")
    : join(repositoryRoot, `.${runtime}`, "skills");
}

function validateSources() {
  for (const { id } of catalog.skills) {
    const skillFile = join(sourceRoot, id, "SKILL.md");
    if (!existsSync(skillFile)) {
      throw new Error(`Catalog skill is missing its source: ${id}`);
    }
    const frontmatterName = readFileSync(skillFile, "utf8").match(
      /^---\n[\s\S]*?^name:\s*([^\n]+)$/mu,
    )?.[1]?.trim();
    if (frontmatterName !== id) {
      throw new Error(`Catalog and frontmatter names differ for: ${id}`);
    }
  }
}

function materialize(runtime, tracker) {
  const target = runtimeTarget(runtime, tracker);
  const staging = `${target}.tmp-${process.pid}`;
  const backup = `${target}.bak-${process.pid}`;
  rmSync(staging, { recursive: true, force: true });
  rmSync(backup, { recursive: true, force: true });
  mkdirSync(staging, { recursive: true });

  for (const { id } of catalog.skills) {
    const source = join(sourceRoot, id);
    const destination = join(staging, id);
    cpSync(source, destination, { recursive: true });

    // agents/openai.yaml is a Codex/OpenAI adapter, not portable skill policy.
    if (runtime !== "codex") {
      rmSync(join(destination, "agents"), { recursive: true, force: true });
    }
  }

  mkdirSync(dirname(target), { recursive: true });
  const hadPreviousTarget = existsSync(target);
  try {
    if (hadPreviousTarget) {
      renameSync(target, backup);
    }
    renameSync(staging, target);
  } catch (error) {
    if (hadPreviousTarget && !existsSync(target) && existsSync(backup)) {
      renameSync(backup, target);
    }
    throw error;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
  rmSync(backup, { recursive: true, force: true });
}

const requestedRuntime = process.argv[2] ?? "all";
const requestedTracker = process.argv[3];

if (["-h", "--help"].includes(requestedRuntime)) {
  usage();
  process.exit(0);
}
if (![...runtimes, "all"].includes(requestedRuntime)) {
  fail(`Unsupported runtime: ${requestedRuntime}`);
}
if (requestedTracker !== undefined && !trackers.includes(requestedTracker)) {
  fail(`Unsupported tracker: ${requestedTracker}`);
}

const selectedRuntimes = requestedRuntime === "all" ? runtimes : [requestedRuntime];
validateSources();
for (const runtime of selectedRuntimes) {
  materialize(runtime, requestedTracker ?? defaultTrackers[runtime]);
}
