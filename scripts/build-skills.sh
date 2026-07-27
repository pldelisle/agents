#!/usr/bin/env bash
set -euo pipefail

repository_root="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
source_skills="$repository_root/skills/source"

usage() {
  cat <<'EOF'
Usage: scripts/build-skills.sh [codex|claude|kiro|all] [linear|jira]

Materialize runtime-specific skill folders from skills/source. Generated folders
must not be edited directly. Without a tracker argument, `all` preserves the
default set: Codex with Linear, Claude Code with Jira, and Kiro with Jira.
EOF
}

materialize() {
  local target="$1"
  rm -rf "$target"
  mkdir -p "$(dirname "$target")"
  cp -R "$source_skills" "$target"
}

adapt_jira() {
  local target="$1"
  find "$target" -type f -name '*.md' -print0 | xargs -0 perl -pi -e '
    s/linear-workflow\.md/jira-workflow.md/g;
    s/\blinear_(issue|url|synced_revision)\b/jira_$1/g;
    s/\bLinear\b/Jira/g;
    s/\blinear\b/Jira/g;
  '
  find "$target" -type f -name linear-workflow.md -print0 | while IFS= read -r -d '' workflow; do
    mv "$workflow" "${workflow%linear-workflow.md}jira-workflow.md"
  done
  find "$target" -type f -name jira-workflow.md -print0 | xargs -0 perl -0pi -e '
    s#Use the configured `Jira` MCP server at `https://mcp\.Jira\.app/mcp`\.#Use the configured Jira/Atlassian MCP server.#g;
    s#The repository commits only the server URL and approval policy\. OAuth credentials remain user-specific and must never be committed\. Register and authenticate once with `codex mcp add Jira --url https://mcp\.Jira\.app/mcp`; if the server is already registered for the user, run `codex mcp login Jira` instead\. Complete the Jira OAuth flow and restart Codex so the server and tools load\.#Keep OAuth credentials user-specific and never commit them. Configure and authenticate the Jira/Atlassian MCP server using the organization\x27s approved connection method, then restart the runtime when required for tools to load.#g;
  '
}

adapt_claude() {
  local target="$1"
  find "$target" -type d -name agents -prune -exec rm -rf {} +
  find "$target" -type f -name '*.md' -print0 | xargs -0 perl -pi -e '
    s/\bCodex\b/Claude Code/g;
    s/\bcodex\b/claude/g;
    s/AGENTS\.md/CLAUDE.md/g;
  '
}

build_codex() {
  local tracker="$1"
  local target="$repository_root/.codex/skills"
  materialize "$target"
  if [[ "$tracker" == jira ]]; then
    adapt_jira "$target"
  fi
}

build_claude() {
  local tracker="$1"
  local target="$repository_root/.claude/skills"
  materialize "$target"
  if [[ "$tracker" == jira ]]; then
    adapt_jira "$target"
  fi
  adapt_claude "$target"
}

adapt_kiro() {
  local target="$1"
  find "$target" -type d -name agents -prune -exec rm -rf {} +
  find "$target" -type f -name '*.md' -print0 | xargs -0 perl -pi -e '
    s/\bCodex\b/Kiro/g;
    s/\bcodex\b/kiro/g;
  '
}

build_kiro() {
  local tracker="$1"
  local target="$repository_root/.kiro/skills"
  materialize "$target"
  if [[ "$tracker" == jira ]]; then
    adapt_jira "$target"
  fi
  adapt_kiro "$target"
}

runtime="${1:-all}"
tracker="${2:-}"

case "$runtime" in
  codex|claude|kiro|all) ;;
  -h|--help) usage; exit 0 ;;
  *) usage >&2; exit 2 ;;
esac

case "$tracker" in
  ""|linear|jira) ;;
  *) usage >&2; exit 2 ;;
esac

case "$runtime" in
  codex) build_codex "${tracker:-linear}" ;;
  claude) build_claude "${tracker:-jira}" ;;
  kiro) build_kiro "${tracker:-jira}" ;;
  all)
    if [[ -n "$tracker" ]]; then
      build_codex "$tracker"
      build_claude "$tracker"
      build_kiro "$tracker"
    else
      build_codex linear
      build_claude jira
      build_kiro jira
    fi
    ;;
esac
