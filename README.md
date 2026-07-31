# Agent Skills

This repository maintains one canonical set of skills, generates runtime-specific copies for Codex, Claude Code, and Kiro, and packages them in a configurable `npx` installer.

## Layout

```text
skills/source/              Canonical skill definitions; edit these files.
scripts/build-skills.sh     Builds runtime-specific skill directories.
Makefile                    Builds the distributable runtime/tracker matrix.
bin/agent-skills.js         Installer CLI entry point.
.codex/agents/              Codex agent definitions.
.codex/skills/              Generated Codex skills (ignored by Git).
.claude/skills/             Generated Claude Code skills (ignored by Git).
.kiro/skills/               Generated Kiro skills (ignored by Git).
dist/                       Generated installer payload (ignored by Git).
```

## Build skills

Run the build after changing anything under `skills/source/`:

```bash
scripts/build-skills.sh all
```

Build a single runtime when needed. The optional second argument selects the work-tracking system:

```bash
scripts/build-skills.sh codex
scripts/build-skills.sh claude
scripts/build-skills.sh kiro
scripts/build-skills.sh codex jira
scripts/build-skills.sh claude linear
scripts/build-skills.sh kiro linear
scripts/build-skills.sh all jira
```

Without a tracker argument, Codex uses Linear while Claude Code and Kiro use Jira. Passing `linear` or `jira` overrides that default; `all jira`, for example, generates Jira variants for all three runtimes.

Do not edit `.codex/skills/`, `.claude/skills/`, or `.kiro/skills/` directly; the next build replaces them.

## Build the installer payload

Build all Codex, Claude Code, and Kiro variants for both Linear and Jira:

```bash
make dist
```

The generated payload uses this layout:

```text
dist/<runtime>/<tracker>/skills/
```

`npm pack` and Git-based `npx` installs run this build automatically through the package's `prepare` script.

## Install with npx

After publishing the package:

```bash
npx @pldelisle/agent-skills
```

The default installs every Codex/Linear skill into `.codex/skills/` in the current project. Common alternatives are:

```bash
# Install selected skills for the current user.
npx @pldelisle/agent-skills --global --skill implement --skill to-specs

# Install all three runtime variants with Jira terminology.
npx @pldelisle/agent-skills --runtime all --tracker jira

# Preview a project install without writing files.
npx @pldelisle/agent-skills --runtime claude --dry-run

# Install beneath another project root.
npx @pldelisle/agent-skills --runtime kiro --target ../another-project
```

The installer refuses to overwrite an existing skill. Pass `--force` to replace only colliding skill directories; it never replaces the whole runtime skills directory. Use `--list` to see the skill identifiers accepted by `--skill`.

Until the package is published, the same CLI can be exercised from this repository:

```bash
node bin/agent-skills.js --list
```

## Installer configuration

For repeatable installs, create `agent-skills.config.json` in the directory where the command runs:

```json
{
  "$schema": "https://raw.githubusercontent.com/pldelisle/agents/main/agent-skills.schema.json",
  "runtimes": ["codex", "claude"],
  "tracker": "jira",
  "skills": ["implement", "to-specs", "to-tickets"],
  "scope": "project",
  "force": false
}
```

Supported settings are:

- `runtimes`: any combination of `codex`, `claude`, and `kiro`;
- `tracker`: `linear` or `jira`; when omitted, Codex defaults to Linear and the other runtimes to Jira;
- `skills`: skill identifiers from `--list`; omit it to install all skills;
- `scope`: `project` or `user`;
- `target`: a custom base directory, relative to the config file when not absolute;
- `force`: whether colliding skill directories may be replaced.

CLI flags override the corresponding file settings. Use `--config <path>` to select a different configuration file. A custom target receives `.<runtime>/skills/` beneath it.

## Runtime adaptations

The Codex build copies the canonical skills, including Codex UI metadata. The Claude Code build removes that metadata and replaces Codex-oriented instructions with Claude Code equivalents. The Kiro build likewise removes the Codex UI metadata and replaces Codex terminology with Kiro equivalents, keeping `AGENTS.md` references intact because Kiro reads them natively. Jira variants adapt Linear terminology, workflow references, and story-template keys, and use the configured Jira/Atlassian MCP server rather than embedding credentials or a server URL.

The source skills remain Codex/Linear-oriented because that is the canonical integration. Keep runtime-specific behavior inside `scripts/build-skills.sh` so shared guidance stays in one place.
