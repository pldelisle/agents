import assert from "node:assert/strict";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  DEFAULT_DISTRIBUTION_ROOT,
  InstallerError,
  installSkills,
  listAvailableSkills,
  parseCliArgs,
  resolveOptions,
} from "../lib/installer.js";

const ACTIVE_SKILLS = [
  "apply-product-ownership",
  "code-review",
  "discuss-vision",
  "engineer-tests",
  "implement",
  "to-design-document",
  "to-specs",
];

function temporaryDirectory(t) {
  const directory = mkdtempSync(join(tmpdir(), "agent-skills-test-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  return directory;
}

test("parses repeatable and comma-separated CLI selections", () => {
  assert.deepEqual(
    parseCliArgs([
      "--runtime",
      "codex,claude",
      "--runtime=kiro",
      "--skill",
      "implement",
      "--skill=to-specs,apply-product-ownership",
      "--tracker",
      "jira",
      "--global",
      "--force",
      "--dry-run",
    ]),
    {
      runtimes: ["codex", "claude", "kiro"],
      skills: ["implement", "to-specs", "apply-product-ownership"],
      tracker: "jira",
      scope: "user",
      force: true,
      dryRun: true,
    },
  );
});

test("loads the default config and resolves its target relative to the config", (t) => {
  const projectDirectory = temporaryDirectory(t);
  writeFileSync(
    join(projectDirectory, "agent-skills.config.json"),
    JSON.stringify({
      runtimes: ["claude", "kiro"],
      tracker: "linear",
      skills: ["implement"],
      target: "configured-target",
      force: true,
    }),
  );

  const options = resolveOptions({}, {
    cwd: projectDirectory,
    userHome: join(projectDirectory, "home"),
    env: {},
  });

  assert.deepEqual(options.runtimes, ["claude", "kiro"]);
  assert.equal(options.tracker, "linear");
  assert.deepEqual(options.skills, ["implement"]);
  assert.equal(options.target, join(projectDirectory, "configured-target"));
  assert.equal(options.force, true);
});

test("CLI options override configuration values", (t) => {
  const projectDirectory = temporaryDirectory(t);
  writeFileSync(
    join(projectDirectory, "agent-skills.config.json"),
    JSON.stringify({
      runtimes: ["claude"],
      tracker: "jira",
      skills: ["to-specs"],
      scope: "user",
    }),
  );

  const options = resolveOptions(
    {
      runtimes: ["codex"],
      tracker: "linear",
      skills: ["implement"],
      scope: "project",
    },
    { cwd: projectDirectory, env: {}, userHome: join(projectDirectory, "home") },
  );

  assert.deepEqual(options.runtimes, ["codex"]);
  assert.equal(options.tracker, "linear");
  assert.deepEqual(options.skills, ["implement"]);
  assert.equal(options.scope, "project");
});

test("distribution contains every runtime and tracker variant", () => {
  for (const runtime of ["codex", "claude", "kiro"]) {
    for (const tracker of ["linear", "jira"]) {
      const skillsRoot = join(DEFAULT_DISTRIBUTION_ROOT, runtime, tracker, "skills");
      assert.deepEqual(
        readdirSync(skillsRoot, { withFileTypes: true })
          .filter((entry) => entry.isDirectory())
          .map((entry) => entry.name)
          .sort(),
        ACTIVE_SKILLS,
        `${runtime}/${tracker} catalog differs`,
      );
      for (const skill of ACTIVE_SKILLS) {
        assert.equal(
          existsSync(join(skillsRoot, skill, "SKILL.md")),
          true,
          `${runtime}/${tracker}/${skill} is missing`,
        );
      }
    }
  }
});

test("generated guidance is provider-neutral and only Codex retains OpenAI metadata", () => {
  for (const skill of ACTIVE_SKILLS) {
    const canonical = readFileSync(
      join(DEFAULT_DISTRIBUTION_ROOT, "codex", "linear", "skills", skill, "SKILL.md"),
      "utf8",
    );
    for (const runtime of ["codex", "claude", "kiro"]) {
      for (const tracker of ["linear", "jira"]) {
        const root = join(DEFAULT_DISTRIBUTION_ROOT, runtime, tracker, "skills", skill);
        assert.equal(readFileSync(join(root, "SKILL.md"), "utf8"), canonical);
        assert.equal(
          existsSync(join(root, "agents", "openai.yaml")),
          runtime === "codex",
          `${runtime}/${tracker}/${skill} has incorrect OpenAI metadata`,
        );
      }
    }
  }
});

test("default catalog excludes deprecated skills", () => {
  const options = resolveOptions(
    { runtimes: ["codex"], tracker: "linear", list: true },
    { cwd: process.cwd(), env: {}, userHome: join(process.cwd(), ".test-home") },
  );
  const [{ skills }] = listAvailableSkills(options);

  assert.deepEqual(skills, ACTIVE_SKILLS);
  assert.equal(skills.some((skill) => skill.includes("deprecated")), false);
});

test("installs only selected skills into a custom target", (t) => {
  const target = temporaryDirectory(t);
  const options = resolveOptions(
    {
      runtimes: ["codex"],
      tracker: "linear",
      skills: ["implement"],
      target,
    },
    { cwd: target, env: {}, userHome: join(target, "home") },
  );

  const operations = installSkills(options);

  assert.equal(operations.length, 1);
  assert.equal(existsSync(join(target, ".codex", "skills", "implement", "SKILL.md")), true);
  assert.equal(existsSync(join(target, ".codex", "skills", "to-specs")), false);
});

test("preflights collisions before installing any selected skill", (t) => {
  const target = temporaryDirectory(t);
  const baseOptions = {
    runtimes: ["codex"],
    tracker: "linear",
    target,
  };
  const environment = { cwd: target, env: {}, userHome: join(target, "home") };

  installSkills(resolveOptions({ ...baseOptions, skills: ["implement"] }, environment));

  assert.throws(
    () =>
      installSkills(
        resolveOptions(
          { ...baseOptions, skills: ["implement", "to-specs"] },
          environment,
        ),
      ),
    (error) =>
      error instanceof InstallerError &&
      error.message.includes("Refusing to overwrite 1 existing skill"),
  );
  assert.equal(existsSync(join(target, ".codex", "skills", "to-specs")), false);
});

test("force replaces only colliding skill directories", (t) => {
  const target = temporaryDirectory(t);
  const environment = { cwd: target, env: {}, userHome: join(target, "home") };
  const selection = {
    runtimes: ["codex"],
    tracker: "linear",
    skills: ["implement"],
    target,
  };
  const options = resolveOptions(selection, environment);

  installSkills(options);
  const marker = join(target, ".codex", "skills", "implement", "old-file.txt");
  writeFileSync(marker, "old");

  installSkills(resolveOptions({ ...selection, force: true }, environment));

  assert.equal(existsSync(marker), false);
  assert.match(
    readFileSync(join(target, ".codex", "skills", "implement", "SKILL.md"), "utf8"),
    /^---/u,
  );
});

test("dry-run plans an install without creating runtime directories", (t) => {
  const target = temporaryDirectory(t);
  const options = resolveOptions(
    {
      runtimes: ["claude"],
      tracker: "jira",
      skills: ["to-specs"],
      target,
      dryRun: true,
    },
    { cwd: target, env: {}, userHome: join(target, "home") },
  );

  const operations = installSkills(options);

  assert.equal(operations.length, 1);
  assert.equal(existsSync(join(target, ".claude")), false);
});

test("legacy selections install to the canonical skill directory", (t) => {
  const target = temporaryDirectory(t);
  const options = resolveOptions(
    {
      runtimes: ["codex"],
      tracker: "linear",
      skills: ["apply-test-engineering", "to-tickets"],
      target,
    },
    { cwd: target, env: {}, userHome: join(target, "home") },
  );

  const operations = installSkills(options);

  assert.deepEqual(operations.map(({ skill }) => skill), [
    "engineer-tests",
    "apply-product-ownership",
  ]);
  assert.equal(existsSync(join(target, ".codex", "skills", "engineer-tests")), true);
  assert.equal(existsSync(join(target, ".codex", "skills", "apply-product-ownership")), true);
  assert.equal(existsSync(join(target, ".codex", "skills", "apply-test-engineering")), false);
  assert.equal(existsSync(join(target, ".codex", "skills", "to-tickets")), false);
});

test("rejects unknown config keys to catch misspelled options", (t) => {
  const projectDirectory = temporaryDirectory(t);
  writeFileSync(
    join(projectDirectory, "agent-skills.config.json"),
    JSON.stringify({ runtime: ["codex"] }),
  );

  assert.throws(
    () => resolveOptions({}, { cwd: projectDirectory }),
    /contains unknown option: runtime/u,
  );
});
