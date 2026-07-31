import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const RUNTIMES = ["codex", "claude", "kiro"];
export const TRACKERS = ["linear", "jira"];
export const DEFAULT_CONFIG_FILE = "agent-skills.config.json";

const CONFIG_KEYS = new Set([
  "$schema",
  "runtimes",
  "tracker",
  "skills",
  "scope",
  "target",
  "force",
]);

const DEFAULT_TRACKERS = {
  codex: "linear",
  claude: "jira",
  kiro: "jira",
};

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
export const DEFAULT_DISTRIBUTION_ROOT = resolve(moduleDirectory, "../dist");

export class InstallerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InstallerError";
  }
}

function requireFlagValue(args, index, flag) {
  const value = args[index + 1];
  if (value === undefined || value.startsWith("--")) {
    throw new InstallerError(`${flag} requires a value.`);
  }
  return value;
}

function appendList(values, value) {
  for (const item of value.split(",")) {
    const trimmedItem = item.trim();
    if (trimmedItem) {
      values.push(trimmedItem);
    }
  }
}

export function parseCliArgs(args) {
  const parsed = {};

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    const [flag, inlineValue] = argument.split("=", 2);
    const valueFor = () => {
      if (inlineValue !== undefined) {
        return inlineValue;
      }
      const value = requireFlagValue(args, index, flag);
      index += 1;
      return value;
    };

    switch (flag) {
      case "--runtime":
        parsed.runtimes ??= [];
        appendList(parsed.runtimes, valueFor());
        break;
      case "--tracker":
        parsed.tracker = valueFor();
        break;
      case "--skill":
        parsed.skills ??= [];
        appendList(parsed.skills, valueFor());
        break;
      case "--scope":
        parsed.scope = valueFor();
        break;
      case "--target":
        parsed.target = valueFor();
        break;
      case "--config":
        parsed.config = valueFor();
        break;
      case "--global":
        parsed.scope = "user";
        break;
      case "--project":
        parsed.scope = "project";
        break;
      case "--force":
        parsed.force = true;
        break;
      case "--dry-run":
        parsed.dryRun = true;
        break;
      case "--list":
        parsed.list = true;
        break;
      case "--help":
      case "-h":
        parsed.help = true;
        break;
      case "--version":
      case "-v":
        parsed.version = true;
        break;
      default:
        throw new InstallerError(`Unknown argument: ${argument}`);
    }
  }

  return parsed;
}

function assertStringArray(value, key) {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((item) => typeof item !== "string" || item.length === 0)
  ) {
    throw new InstallerError(`Configuration "${key}" must be a non-empty array of strings.`);
  }
}

export function validateConfiguration(configuration, source = DEFAULT_CONFIG_FILE) {
  if (
    configuration === null ||
    typeof configuration !== "object" ||
    Array.isArray(configuration)
  ) {
    throw new InstallerError(`${source} must contain a JSON object.`);
  }

  const unknownKeys = Object.keys(configuration).filter((key) => !CONFIG_KEYS.has(key));
  if (unknownKeys.length > 0) {
    throw new InstallerError(
      `${source} contains unknown option${unknownKeys.length === 1 ? "" : "s"}: ${unknownKeys.join(", ")}`,
    );
  }

  if (configuration.runtimes !== undefined) {
    assertStringArray(configuration.runtimes, "runtimes");
  }
  if (configuration.skills !== undefined) {
    assertStringArray(configuration.skills, "skills");
  }
  if (configuration.tracker !== undefined && typeof configuration.tracker !== "string") {
    throw new InstallerError('Configuration "tracker" must be a string.');
  }
  if (configuration.scope !== undefined && typeof configuration.scope !== "string") {
    throw new InstallerError('Configuration "scope" must be a string.');
  }
  if (
    configuration.target !== undefined &&
    (typeof configuration.target !== "string" || configuration.target.length === 0)
  ) {
    throw new InstallerError('Configuration "target" must be a non-empty string.');
  }
  if (configuration.force !== undefined && typeof configuration.force !== "boolean") {
    throw new InstallerError('Configuration "force" must be a boolean.');
  }

  return configuration;
}

function readConfiguration(configPath, required) {
  if (!existsSync(configPath)) {
    if (required) {
      throw new InstallerError(`Configuration file not found: ${configPath}`);
    }
    return {};
  }

  try {
    return validateConfiguration(
      JSON.parse(readFileSync(configPath, "utf8")),
      configPath,
    );
  } catch (error) {
    if (error instanceof InstallerError) {
      throw error;
    }
    throw new InstallerError(`Could not parse ${configPath}: ${error.message}`);
  }
}

function unique(values) {
  return [...new Set(values)];
}

function validateChoice(value, choices, optionName) {
  if (!choices.includes(value)) {
    throw new InstallerError(
      `Invalid ${optionName} "${value}". Expected one of: ${choices.join(", ")}.`,
    );
  }
}

function resolveUserPath(value, userHome) {
  if (value === "~") {
    return userHome;
  }
  if (value.startsWith(`~${sep}`)) {
    return join(userHome, value.slice(2));
  }
  return value;
}

export function resolveOptions(
  cliOptions,
  {
    cwd = process.cwd(),
    userHome = homedir(),
    env = process.env,
  } = {},
) {
  const explicitConfigPath =
    cliOptions.config === undefined ? undefined : resolve(cwd, cliOptions.config);
  const defaultConfigPath = join(cwd, DEFAULT_CONFIG_FILE);
  const configPath = explicitConfigPath ?? defaultConfigPath;
  const configuration = readConfiguration(configPath, explicitConfigPath !== undefined);

  let runtimes = cliOptions.runtimes ?? configuration.runtimes ?? ["codex"];
  if (runtimes.length === 0) {
    throw new InstallerError("At least one runtime must be selected.");
  }
  if (runtimes.includes("all")) {
    runtimes = RUNTIMES;
  }
  runtimes = unique(runtimes);
  for (const runtime of runtimes) {
    validateChoice(runtime, RUNTIMES, "runtime");
  }

  const tracker = cliOptions.tracker ?? configuration.tracker;
  if (tracker !== undefined) {
    validateChoice(tracker, TRACKERS, "tracker");
  }

  let skills = cliOptions.skills ?? configuration.skills ?? ["*"];
  if (skills.length === 0) {
    throw new InstallerError("At least one skill must be selected.");
  }
  if (skills.includes("all") || skills.includes("*")) {
    skills = ["*"];
  } else {
    skills = unique(skills);
  }

  const scope = cliOptions.scope ?? configuration.scope ?? "project";
  validateChoice(scope, ["project", "user"], "scope");

  let target;
  if (cliOptions.target !== undefined) {
    target = resolve(cwd, resolveUserPath(cliOptions.target, userHome));
  } else if (configuration.target !== undefined) {
    const configRelativeTarget = resolveUserPath(configuration.target, userHome);
    target = isAbsolute(configRelativeTarget)
      ? configRelativeTarget
      : resolve(dirname(configPath), configRelativeTarget);
  }

  return {
    runtimes,
    tracker,
    skills,
    scope,
    target,
    force: cliOptions.force ?? configuration.force ?? false,
    dryRun: cliOptions.dryRun ?? false,
    list: cliOptions.list ?? false,
    cwd,
    userHome,
    env,
    configPath: existsSync(configPath) ? configPath : undefined,
  };
}

function userDestination(runtime, options) {
  switch (runtime) {
    case "codex":
      return join(options.env.CODEX_HOME || join(options.userHome, ".codex"), "skills");
    case "claude":
      return join(
        options.env.CLAUDE_CONFIG_DIR || join(options.userHome, ".claude"),
        "skills",
      );
    case "kiro":
      return join(options.env.KIRO_CONFIG_DIR || join(options.userHome, ".kiro"), "skills");
    default:
      throw new InstallerError(`Unsupported runtime: ${runtime}`);
  }
}

export function destinationFor(runtime, options) {
  if (options.target !== undefined) {
    return join(options.target, `.${runtime}`, "skills");
  }
  if (options.scope === "user") {
    return userDestination(runtime, options);
  }
  return join(options.cwd, `.${runtime}`, "skills");
}

export function discoverSkills(skillsRoot, currentDirectory = skillsRoot) {
  if (!existsSync(currentDirectory)) {
    throw new InstallerError(
      `Built skills not found at ${skillsRoot}. Run "make dist" before installing.`,
    );
  }

  const discoveredSkills = [];
  for (const entry of readdirSync(currentDirectory, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const directory = join(currentDirectory, entry.name);
    if (existsSync(join(directory, "SKILL.md"))) {
      discoveredSkills.push(relative(skillsRoot, directory).split(sep).join("/"));
    } else {
      discoveredSkills.push(...discoverSkills(skillsRoot, directory));
    }
  }
  return discoveredSkills.sort();
}

function requestedSkills(availableSkills, requested) {
  if (requested.length === 1 && requested[0] === "*") {
    return availableSkills;
  }

  const missingSkills = requested.filter((skill) => !availableSkills.includes(skill));
  if (missingSkills.length > 0) {
    throw new InstallerError(
      `Unknown skill${missingSkills.length === 1 ? "" : "s"}: ${missingSkills.join(", ")}`,
    );
  }
  return requested;
}

function trackerFor(runtime, configuredTracker) {
  return configuredTracker ?? DEFAULT_TRACKERS[runtime];
}

export function planInstallation(
  options,
  distributionRoot = DEFAULT_DISTRIBUTION_ROOT,
) {
  const operations = [];

  for (const runtime of options.runtimes) {
    const tracker = trackerFor(runtime, options.tracker);
    const skillsRoot = join(distributionRoot, runtime, tracker, "skills");
    const availableSkills = discoverSkills(skillsRoot);
    const selectedSkills = requestedSkills(availableSkills, options.skills);
    const destinationRoot = destinationFor(runtime, options);

    for (const skill of selectedSkills) {
      operations.push({
        runtime,
        tracker,
        skill,
        source: join(skillsRoot, ...skill.split("/")),
        destinationRoot,
        destination: join(destinationRoot, ...skill.split("/")),
      });
    }
  }

  return operations;
}

export function installSkills(
  options,
  distributionRoot = DEFAULT_DISTRIBUTION_ROOT,
) {
  const operations = planInstallation(options, distributionRoot);
  const collisions = operations.filter(({ destination }) => existsSync(destination));

  if (collisions.length > 0 && !options.force) {
    const collisionList = collisions
      .map(({ runtime, skill, destination }) => `  ${runtime}/${skill}: ${destination}`)
      .join("\n");
    throw new InstallerError(
      `Refusing to overwrite ${collisions.length} existing skill${
        collisions.length === 1 ? "" : "s"
      }:\n${collisionList}\nRe-run with --force to replace only these skill directories.`,
    );
  }

  if (options.dryRun) {
    return operations;
  }

  for (const operation of operations) {
    if (existsSync(operation.destination)) {
      const destinationStatus = lstatSync(operation.destination);
      if (destinationStatus.isSymbolicLink()) {
        rmSync(operation.destination);
      } else {
        rmSync(operation.destination, { recursive: true });
      }
    }
    mkdirSync(dirname(operation.destination), { recursive: true });
    cpSync(operation.source, operation.destination, {
      recursive: true,
      errorOnExist: true,
      force: false,
    });
  }

  return operations;
}

export function listAvailableSkills(
  options,
  distributionRoot = DEFAULT_DISTRIBUTION_ROOT,
) {
  return options.runtimes.map((runtime) => {
    const tracker = trackerFor(runtime, options.tracker);
    const skillsRoot = join(distributionRoot, runtime, tracker, "skills");
    return {
      runtime,
      tracker,
      skills: discoverSkills(skillsRoot),
    };
  });
}
