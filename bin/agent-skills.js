#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  InstallerError,
  installSkills,
  listAvailableSkills,
  parseCliArgs,
  resolveOptions,
} from "../lib/installer.js";

const executableDirectory = dirname(fileURLToPath(import.meta.url));

const HELP = `Install this repository's generated agent skills.

Usage:
  agent-skills [options]

Options:
  --runtime <name>    codex, claude, kiro, or all (default: codex)
  --tracker <name>    linear or jira (defaults: Codex=Linear, others=Jira)
  --skill <name>      install one skill; repeat or comma-separate (default: all)
  --project           install under the current project (default)
  --global            install in the current user's runtime config directory
  --scope <scope>     project or user
  --target <path>     use a custom base directory
  --config <path>     load a JSON config (default: agent-skills.config.json)
  --force             replace colliding skill directories
  --dry-run           show what would be installed without writing files
  --list              list skills available for the selected runtime/tracker
  --help              show this help
  --version           show the package version

CLI options override values from the config file. Repeat --runtime to install
more than one runtime. A custom target receives .<runtime>/skills beneath it.`;

function packageVersion() {
  const packagePath = resolve(executableDirectory, "../package.json");
  return JSON.parse(readFileSync(packagePath, "utf8")).version;
}

function printAvailableSkills(groups) {
  for (const group of groups) {
    process.stdout.write(`${group.runtime}/${group.tracker}\n`);
    for (const skill of group.skills) {
      process.stdout.write(`  ${skill}\n`);
    }
  }
}

function printInstallResult(operations, dryRun) {
  const verb = dryRun ? "Would install" : "Installed";
  const grouped = new Map();

  for (const operation of operations) {
    const key = `${operation.runtime}/${operation.tracker}`;
    const group = grouped.get(key) ?? {
      count: 0,
      destination: operation.destinationRoot,
    };
    group.count += 1;
    grouped.set(key, group);
  }

  process.stdout.write(`${verb} ${operations.length} skill${operations.length === 1 ? "" : "s"}:\n`);
  for (const [runtimeAndTracker, group] of grouped) {
    process.stdout.write(
      `  ${runtimeAndTracker}: ${group.count} -> ${group.destination}\n`,
    );
  }
}

function main() {
  const cliOptions = parseCliArgs(process.argv.slice(2));

  if (cliOptions.help) {
    process.stdout.write(`${HELP}\n`);
    return;
  }
  if (cliOptions.version) {
    process.stdout.write(`${packageVersion()}\n`);
    return;
  }

  const options = resolveOptions(cliOptions);
  if (options.list) {
    printAvailableSkills(listAvailableSkills(options));
    return;
  }

  const operations = installSkills(options);
  printInstallResult(operations, options.dryRun);
}

try {
  main();
} catch (error) {
  const message =
    error instanceof InstallerError ? error.message : `Unexpected failure: ${error.message}`;
  process.stderr.write(`agent-skills: ${message}\n`);
  process.exitCode = 1;
}
