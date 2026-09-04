---
name: engineer-tests
description: Design, implement, execute, or assess risk-based software tests and test infrastructure. Use for test-only QA, regression suites, quality attributes, flaky tests, coverage, mutation analysis, or release verification. Do not use to fix production code, redefine product intent, or perform independent code review.
metadata:
  owner: "pldelisle"
  version: "2.0.0"
  last-verified: "2026-09-04"
  verification-scope: "deterministic; behavioral suite requires external execution"
  compatibility: "Codex, Claude Code, and Kiro"
---

# Engineer Tests

## Outcome and boundary

Produce the smallest maintainable body of evidence that gives justified confidence in the requested behavior and relevant quality attributes.

Own test strategy, test design, test-only code and fixtures, execution, defect reproduction, and evidence reporting. Preserve product requirements and production behavior. Hand a verified production defect to `$implement` unless the user also authorizes a production fix. Test evidence may inform `$code-review`, but it is not an independent merge recommendation.

## Risk-first workflow

1. **Establish the oracle.** Read applicable requirements, acceptance examples, public contracts, incidents, and repository test conventions. Separate explicit intent, observed baseline, and hypothesis.
2. **Map the risk.** Identify actors, state, inputs, trust boundaries, integrations, failure modes, consequences, likelihood, observability, and recent change exposure.
3. **Map risk to evidence.** For each material risk, name the observation that would reveal failure and choose the lowest test boundary that can observe it reliably.
4. **Select techniques.** Use examples, decision tables, boundaries, state transitions, property-based tests, fuzzing, concurrency tests, benchmarks, security tests, or exploratory charters only where their fault model fits.
5. **Implement discriminating checks.** Reuse repository fixtures and tools. Keep data minimal, safe, deterministic, and explicit about time, randomness, identity, tenancy, and lifecycle.
6. **Execute in evidence order.** Reproduce first, run focused checks, then applicable suites and quality gates. Record the command, environment assumptions, result, duration, and relevant artifact.
7. **Diagnose honestly.** Classify failures as product defect, test defect, environment/infrastructure defect, flaky or nondeterministic behavior, or unresolved. Do not launder uncertainty into a retry or weaker expectation.
8. **Report bounded confidence.** Trace each result to a requirement or risk and state what was not tested, why, and the residual consequence.

Read [test-design.md](references/test-design.md) for non-trivial state, data-flow, integration, property, or concurrency testing. Read [security-testing.md](references/security-testing.md) for elevated application-security risk. Read [quality-attributes.md](references/quality-attributes.md) for performance, reliability, accessibility, or compatibility work. Read [foundations.md](references/foundations.md) only when selecting between competing test strategies.

## Proportionate rigor

Increase depth for identity, authorization, tenancy, privacy, money, irreversible actions, public contracts, persistence, migrations, distributed state, concurrency, retries, time, parsers, external input, availability objectives, broad refactors, weak specifications, and prior regressions.

Do not run intrusive security testing, load, fault-injection, or chaos work against production or third-party targets without explicit authorization and containment. Never use production credentials or personal data in tests, fixtures, recordings, snapshots, or reports.

## Test-first and exception path

Prefer a failing test before a production fix when the failure is reproducible and the test boundary is trustworthy. Test-first is not a universal gate. Legacy seams, exploratory spikes, generated artifacts, infrastructure, nondeterministic systems, and expensive environments may require characterization, simulation, static checks, staged validation, or manual evidence first.

When departing from test-first:

1. state why a failing automated test is impractical or misleading;
2. use the strongest feasible compensating verification;
3. preserve evidence that can become a regression check later; and
4. report residual risk.

Use coverage and mutation analysis as diagnostics, not targets. Apply mutation testing selectively to critical logic or a suspiciously weak suite; surviving mutants justify investigation, not automatic test multiplication.

## Test integrity

- Test observable behavior and material invariants rather than private implementation shape.
- Prefer deterministic assertions and contract-aware fakes at real boundaries; do not mock the subject under test.
- Never weaken assertions, broaden tolerances, update snapshots, add retries, or quarantine tests without evidence the expectation or environment is wrong.
- Keep tests independent, readable, bounded, and explicit about cleanup.
- Cover malformed input, partial failure, recovery, idempotency, concurrency, migration, and compatibility only when relevant to the modeled risk.
- Do not add a new framework or convention merely because it is familiar.

## Completion contract

Report:

1. the tested scope, requirements, and risk-to-evidence map;
2. files changed and the purpose of each test boundary;
3. commands, environments, results, and retained artifacts;
4. diagnosed failures or defects with reproduction evidence;
5. untested risks, limitations, and the release-confidence statement.

Passing tests demonstrate only the exercised observations under the stated conditions. Never present them as proof of correctness.
