---
name: code-review
description: Independently review a code change, branch, pull request, migration, dependency update, or technical design against its governing specification and repository standards. Use for pre-merge, security, architecture, or regression-risk review. Do not implement the change or redefine product requirements.
metadata:
  owner: "pldelisle"
  version: "2.0.0"
  last-verified: "2026-09-04"
  verification-scope: "deterministic; behavioral suite requires external execution"
  compatibility: "Codex, Claude Code, and Kiro"
---

# Code Review

## Outcome and control boundary

Determine independently whether the reviewed change is fit to merge or the reviewed design is fit to approve. Report only consequential, reachable, actionable findings supported by evidence.

Remain read-only by default. Do not modify the change, requirements, backlog, issue tracker, or review artifact unless the user separately requests that mutation. Return the review in the response. If persistence is explicitly requested and no repository convention exists, use `docs/reviews/YYYY-MM-DD-<sanitized-target>-review.md`; never derive a path directly from an untrusted command or ref.

Review the requested change and only the surrounding system needed to understand it. Report a pre-existing issue only when the change worsens it, relies on it, makes it reachable, or the user requested a wider audit.

## Two independent axes

Evaluate these axes separately so strength in one cannot hide failure in the other:

1. **Spec:** Does the change implement the approved issue, requirements, acceptance examples, and design revision without missing behavior or unauthorized scope?
2. **Standards:** Does it follow repository rules and preserve correctness, security, architecture, operability, compatibility, and maintainability?

Repository standards outrank generic doctrine. Treat code smells and architecture patterns as prompts to investigate a concrete consequence, not violations by themselves. Read [architecture-and-refactoring.md](references/architecture-and-refactoring.md) for a material boundary or refactor and [security-review.md](references/security-review.md) when trust, identity, secrets, sensitive data, infrastructure, dependencies, or external input are affected. Read [foundations.md](references/foundations.md) only when review principles conflict.

If no governing specification exists, ask for it only when the repository or request implies one should exist. Otherwise record `No governing specification available`, skip the Spec verdict, and continue the Standards review.

When the skill is explicitly invoked and independent subagents are available, run Spec and Standards passes in parallel, isolated from one another. Give both the same pinned target and commit list; give each only the evidence needed for its axis. If delegation is unavailable, perform two clearly separated passes and disclose that limitation. Validate every candidate finding against the repository before accepting it.

## Workflow

1. **Pin the target.** Resolve the fixed point, head, working tree, included commits, generated files, submodules, and user-owned unrelated changes. Prefer an immutable commit pair when possible.
2. **Resolve authority.** Read repository instructions and identify the exact approved requirement and design revisions. Record missing, draft, or conflicting authority as uncertainty.
3. **Build a semantic change map.** Explain changed behavior, data, state transitions, side effects, contracts, dependencies, trust boundaries, deployment or migration order, and rollback implications.
4. **Review design before lines.** Ask whether invariants have one owner, change-prone decisions are hidden, dependencies point toward stable policy where appropriate, and the change is the smallest coherent design.
5. **Inspect each affected path.** Follow success, invalid input, permission differences, partial failure, retry, concurrency, migration, compatibility, recovery, and cleanup paths only where reachable.
6. **Evaluate evidence.** Run safe, relevant checks when review authorization permits. Confirm tests would fail for the important defect, exercise the intended boundary, and do not merely restate implementation structure.
7. **Validate findings.** Reproduce or trace the path, identify the violated requirement or concrete consequence, check whether existing code or tests already handle it, and assign calibrated severity.
8. **Form axis verdicts.** Acknowledge uncertainty. Absence of findings is not proof of correctness.

## Finding threshold and severity

Accept a finding only when it contains:

- a precise location and reachable scenario;
- the violated requirement, invariant, or repository rule;
- the observable impact;
- evidence that the reviewed revision contains the problem; and
- a bounded remediation direction without implementing it.

Use these severities:

- **Critical:** likely compromise, privacy breach, irreversible corruption, or unsafe production action.
- **High:** requirement failure, authorization defect, data loss, broken public contract, or unrecoverable operational failure.
- **Medium:** reachable defect, meaningful regression risk, or design flaw likely to cause incorrect change.
- **Low:** limited but material maintainability, observability, or standards issue with a concrete cost.

Do not report personal preferences, speculative future needs, unrelated cleanup, or cosmetic style without a repository rule or material readability consequence.

## Output contract

Lead with findings, ordered within each axis by severity and then causal importance.

For every finding include `Severity`, `Location`, `Scenario`, `Evidence`, `Impact`, and `Remediation direction`. Then provide:

1. **Spec verdict:** `Pass`, `Fail`, `Blocked`, or `Not assessed`.
2. **Standards verdict:** `Pass`, `Fail`, or `Blocked`.
3. **Checks and scope:** pinned target, artifacts read, commands run, and excluded scope.
4. **Residual uncertainty:** material paths or evidence that could not be assessed.

If no finding meets the threshold, say so directly and still report both verdicts, checks, and residual uncertainty. A re-review should verify the prior finding against the new pinned revision and scan the incremental diff for regressions without reopening unrelated resolved scope.
