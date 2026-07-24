# Agent Skills

This repository maintains one canonical set of skills and generates runtime-specific copies for Codex and Claude Code.

## Layout

```text
skills/source/              Canonical skill definitions; edit these files.
scripts/build-skills.sh     Builds runtime-specific skill directories.
.codex/agents/              Codex agent definitions.
.codex/skills/              Generated Codex skills (ignored by Git).
.claude/skills/             Generated Jira/Claude Code skills (ignored by Git).
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
scripts/build-skills.sh codex jira
scripts/build-skills.sh claude linear
scripts/build-skills.sh all jira
```

Without a tracker argument, Codex uses Linear and Claude Code uses Jira. Passing `linear` or `jira` overrides that default; `all jira`, for example, generates Jira variants for both runtimes.

Do not edit `.codex/skills/` or `.claude/skills/` directly; the next build replaces them.

## Runtime adaptations

The Codex build copies the canonical skills, including Codex UI metadata. The Claude Code build removes that metadata and replaces Codex-oriented instructions with Claude Code equivalents. Jira variants adapt Linear terminology, workflow references, and story-template keys, and use the configured Jira/Atlassian MCP server rather than embedding credentials or a server URL.

The source skills remain Codex/Linear-oriented because that is the canonical integration. Keep runtime-specific behavior inside `scripts/build-skills.sh` so shared guidance stays in one place.
