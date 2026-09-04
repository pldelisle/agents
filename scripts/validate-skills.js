#!/usr/bin/env node

import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = join(repositoryRoot, "skills", "source");
const catalogPath = join(repositoryRoot, "skills", "catalog.json");
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const errors = [];

function report(file, message) {
  errors.push(`${relative(repositoryRoot, file)}: ${message}`);
}

function directories(path) {
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function filesRecursively(path) {
  const result = [];
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const entryPath = join(path, entry.name);
    if (entry.isDirectory()) {
      result.push(...filesRecursively(entryPath));
    } else {
      result.push(entryPath);
    }
  }
  return result;
}

function frontmatterOf(content, file) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/u);
  if (!match) {
    report(file, "missing YAML frontmatter");
    return { text: "", body: content };
  }
  return { text: match[1], body: content.slice(match[0].length) };
}

function scalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "mu"));
  return match?.[1].trim().replace(/^(["'])(.*)\1$/u, "$2");
}

function metadataScalar(frontmatter, key) {
  const metadata = frontmatter.match(/^metadata:\s*\n((?:^[ \t]+.*\n?)*)/mu)?.[1] ?? "";
  const match = metadata.match(new RegExp(`^[ \\t]+${key}:\\s*(.+)$`, "mu"));
  return match?.[1].trim().replace(/^(["'])(.*)\1$/u, "$2");
}

function sameValues(actual, expected) {
  return JSON.stringify([...actual].sort()) === JSON.stringify([...expected].sort());
}

function withoutFencedCode(markdown) {
  return markdown.replace(/````[\s\S]*?````/gu, "").replace(/```[\s\S]*?```/gu, "");
}

const catalogIds = catalog.skills.map(({ id }) => id);
if (new Set(catalogIds).size !== catalogIds.length) {
  report(catalogPath, "skill identifiers must be unique");
}
const aliases = catalog.skills.flatMap(({ aliases = [] }) => aliases);
if (new Set(aliases).size !== aliases.length) {
  report(catalogPath, "selection aliases must be unique");
}
for (const alias of aliases) {
  if (catalogIds.includes(alias)) {
    report(catalogPath, `alias must not shadow a canonical identifier: ${alias}`);
  }
}
const configurationSchemaPath = join(repositoryRoot, "agent-skills.schema.json");
const configurationSchema = JSON.parse(readFileSync(configurationSchemaPath, "utf8"));
const configuredSkillIds = configurationSchema.properties?.skills?.items?.enum ?? [];
if (!sameValues(configuredSkillIds, [...catalogIds, ...aliases])) {
  report(configurationSchemaPath, "skills enum must contain every canonical identifier and selection alias");
}
if (!sameValues(directories(sourceRoot), catalogIds)) {
  report(
    catalogPath,
    `active source directories must equal the catalog; found [${directories(sourceRoot).join(", ")}]`,
  );
}

const skillById = new Map(catalog.skills.map((skill) => [skill.id, skill]));
const activeFiles = [];

for (const skill of catalog.skills) {
  const skillRoot = join(sourceRoot, skill.id);
  const skillFile = join(skillRoot, "SKILL.md");
  if (!existsSync(skillFile)) {
    report(skillFile, "catalog entry has no SKILL.md");
    continue;
  }

  activeFiles.push(...filesRecursively(skillRoot));
  const content = readFileSync(skillFile, "utf8");
  const { text: frontmatter, body } = frontmatterOf(content, skillFile);
  const name = scalar(frontmatter, "name");
  const description = scalar(frontmatter, "description") ?? "";

  if (name !== skill.id) {
    report(skillFile, `frontmatter name must equal parent directory "${skill.id}"`);
  }
  if (description.length === 0 || description.length > 1024) {
    report(skillFile, `description length must be 1-1024 characters; found ${description.length}`);
  }
  if (description.length > 500) {
    report(skillFile, `description should remain routing-focused; found ${description.length} characters`);
  }
  if (body.split("\n").length > 500) {
    report(skillFile, "body exceeds the 500-line progressive-disclosure limit");
  }
  if (body.trim().split(/\s+/u).length > 3500) {
    report(skillFile, "body likely exceeds the recommended 5,000-token context budget");
  }

  const expectedMetadata = {
    owner: catalog.owner,
    version: skill.version,
    "last-verified": catalog.lastVerified,
  };
  for (const [key, expected] of Object.entries(expectedMetadata)) {
    if (metadataScalar(frontmatter, key) !== expected) {
      report(skillFile, `metadata.${key} must equal "${expected}"`);
    }
  }
  if (!metadataScalar(frontmatter, "compatibility")) {
    report(skillFile, "metadata.compatibility is required");
  }
  if (metadataScalar(frontmatter, "verification-scope") !== "deterministic; behavioral suite requires external execution") {
    report(skillFile, "metadata.verification-scope must distinguish deterministic from behavioral verification");
  }

  const openaiFile = join(skillRoot, "agents", "openai.yaml");
  if (!existsSync(openaiFile)) {
    report(openaiFile, "OpenAI UI metadata is required for the Codex build");
  } else {
    const openai = readFileSync(openaiFile, "utf8");
    if (!openai.includes(`$${skill.id}`)) {
      report(openaiFile, `default_prompt must reference $${skill.id}`);
    }
    const explicitOnly = /allow_implicit_invocation:\s*false/u.test(openai);
    if ((skill.invocation === "explicit") !== explicitOnly) {
      report(openaiFile, `invocation policy must match catalog value "${skill.invocation}"`);
    }
  }

  for (const markdownFile of filesRecursively(skillRoot).filter((file) => file.endsWith(".md"))) {
    const markdown = withoutFencedCode(readFileSync(markdownFile, "utf8"));
    for (const match of markdown.matchAll(/\]\(([^)]+)\)/gu)) {
      let target = match[1].trim();
      if (/^(?:https?:|mailto:|#)/u.test(target)) {
        continue;
      }
      target = target.replace(/^<|>$/gu, "").split("#", 1)[0];
      if (!target || /[<>]/u.test(target)) {
        continue;
      }
      const resolved = resolve(dirname(markdownFile), target);
      const withinSkill = resolved === skillRoot || resolved.startsWith(`${skillRoot}${sep}`);
      if (!withinSkill) {
        report(markdownFile, `local link escapes the independently installable skill: ${target}`);
      } else if (!existsSync(resolved)) {
        report(markdownFile, `broken local link: ${target}`);
      }
    }
  }
}

const referenceFiles = [
  ...activeFiles.filter((file) => /\.(?:md|ya?ml|toml)$/u.test(file)),
  ...filesRecursively(join(repositoryRoot, ".codex", "agents")),
  join(repositoryRoot, "README.md"),
];

for (const file of referenceFiles) {
  const content = withoutFencedCode(readFileSync(file, "utf8"));
  for (const match of content.matchAll(/\$([a-z][a-z0-9-]*)/gu)) {
    if (!skillById.has(match[1])) {
      report(file, `unknown skill reference $${match[1]}`);
    }
  }
  for (const forbidden of [
    /\b(?:implement|code-review|to-specs)-pl\b/u,
    /setup-matt-pocock-skills/u,
    /codex mcp add issue-tracker/u,
  ]) {
    if (forbidden.test(content)) {
      report(file, `contains forbidden stale or mechanically corrupted text: ${forbidden}`);
    }
  }
}

const routingPath = join(repositoryRoot, "evals", "routing-cases.json");
const behaviorPath = join(repositoryRoot, "evals", "behavior-cases.json");

function loadEvaluation(path) {
  if (!existsSync(path)) {
    report(path, "evaluation data is required");
    return { skills: [] };
  }
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    report(path, `invalid JSON: ${error.message}`);
    return { skills: [] };
  }
}

const routing = loadEvaluation(routingPath);
const routingIds = routing.skills?.map(({ skill }) => skill) ?? [];
if (!sameValues(routingIds, catalogIds)) {
  report(routingPath, "must contain exactly one routing suite for every catalog skill");
}
const allPrompts = new Set();
for (const suite of routing.skills ?? []) {
  const groups = [suite.positive ?? [], suite.nearMiss ?? [], suite.ambiguous ?? []];
  const count = groups.reduce((sum, group) => sum + group.length, 0);
  if (count < 20 || groups[0].length < 6 || groups[1].length < 6 || groups[2].length < 2) {
    report(routingPath, `${suite.skill} needs at least 20 cases: 6 positive, 6 near-miss, and 2 ambiguous`);
  }
  for (const entry of groups.flat()) {
    const prompt = typeof entry === "string" ? entry : entry.prompt;
    if (!prompt || allPrompts.has(prompt)) {
      report(routingPath, `${suite.skill} contains an empty or duplicate prompt`);
    }
    allPrompts.add(prompt);
  }
  if (skillById.get(suite.skill)?.invocation === "explicit") {
    for (const entry of [...groups[0], ...groups[2]]) {
      const prompt = typeof entry === "string" ? entry : entry.prompt;
      if (!prompt.includes(`$${suite.skill}`)) {
        report(routingPath, `${suite.skill} positive and ambiguous cases must invoke the explicit-only skill by name`);
      }
    }
  }
}

const behavior = loadEvaluation(behaviorPath);
const behaviorIds = behavior.skills?.map(({ skill }) => skill) ?? [];
if (!sameValues(behaviorIds, catalogIds)) {
  report(behaviorPath, "must contain exactly one behavior suite for every catalog skill");
}
for (const suite of behavior.skills ?? []) {
  if (!Array.isArray(suite.cases) || suite.cases.length < 3) {
    report(behaviorPath, `${suite.skill} needs at least three behavior cases`);
    continue;
  }
  for (const testCase of suite.cases) {
    for (const field of ["prompt", "requiredOutcomes", "requiredActions", "forbiddenActions"]) {
      if (
        testCase[field] === undefined ||
        (Array.isArray(testCase[field]) && testCase[field].length === 0)
      ) {
        report(behaviorPath, `${suite.skill}/${testCase.id ?? "unknown"} is missing ${field}`);
      }
    }
  }
}

if (errors.length > 0) {
  process.stderr.write(`Skill validation failed with ${errors.length} error(s):\n`);
  for (const error of errors) {
    process.stderr.write(`- ${error}\n`);
  }
  process.exit(1);
}

process.stdout.write(`Validated ${catalog.skills.length} active skills and ${allPrompts.size} routing cases.\n`);
