---
name: implement
description: Implement, debug, or refactor production code and verify the requested behavior. Use when source code must change. Do not use for test-only QA, independent review, product discovery, backlog refinement, or design-document-only requests.
metadata:
  owner: "pldelisle"
  version: "2.0.0"
  last-verified: "2026-09-04"
  verification-scope: "deterministic; behavioral suite requires external execution"
  compatibility: "Codex, Claude Code, and Kiro"
---

# Implement

## Outcome and boundary

Deliver the smallest coherent production change that satisfies the authorized behavior and is supported by proportionate verification.

Own implementation, defect correction, and implementation-local refactoring. `$engineer-tests` owns test-only QA work, `$code-review` owns independent review, `$to-design-document` owns a requested design artifact, and product skills own product intent and backlog decisions. A clear, low-risk change does not require a new specification or design document unless the repository does.

## Decision order

1. Protect user data, security, privacy, and irreversible state.
2. Satisfy explicit behavior and acceptance criteria.
3. Preserve public contracts, observed behavior, and repository conventions unless the request changes them.
4. Make the smallest coherent change that solves the evidenced problem.
5. Apply general engineering heuristics only when they improve this code in this repository.

Surface conflicts that materially change behavior, architecture, scope, or safety. Otherwise make the simplest evidence-supported decision and state any consequential assumption.

## Workflow

Scale the work to risk. A typo may need one focused check; a migration, security boundary, or cross-module refactor needs broader evidence.

1. **Establish the target.** Translate the request into observable success criteria. Read repository instructions, relevant requirements, and current worktree state.
2. **Map the change.** Identify entry points, state transitions, side effects, trust boundaries, public contracts, failure paths, and the smallest relevant surrounding system.
3. **Characterize the baseline.** Read nearby tests and analogous code. Reproduce a defect or record current behavior before editing when practical.
4. **Choose the seam.** Reuse existing capabilities. Prefer a deep, cohesive module that hides change-prone decisions over new pass-through layers or speculative extension points.
5. **Implement surgically.** Keep every changed line traceable to the request. Preserve unrelated user changes and avoid unrelated formatting, renaming, or cleanup.
6. **Verify at the lowest useful boundary.** Add or update a regression or behavior test when it provides durable evidence. Add an integration check when the changed contract crosses components.
7. **Run checks in evidence order.** Start focused, then run applicable repository tests, linting, formatting, type checks, builds, and compatibility checks.
8. **Inspect the final diff.** Look for accidental scope, misleading names, dead code introduced by the change, unsafe inputs, missing failure paths, compatibility breaks, and unverified assumptions.

For Python work, read [python.md](references/python.md) before choosing language-specific types, concurrency, exception, resource, or packaging behavior. For a meaningful new boundary, cross-layer refactor, or architecture change, read [engineering-principles.md](references/engineering-principles.md). Do not load either reference for an unrelated simple edit.

## Implementation constraints

- Match the repository's architecture and style unless changing them is part of the request.
- Prefer explicit state and visible side effects. Make invalid states difficult to represent without adding ceremony to simple data.
- Introduce an abstraction only for a demonstrated boundary, invariant, or source of change.
- Validate untrusted input before side effects. Use least privilege, safe parsing, parameterized queries, and safe subprocess construction.
- Bound resource use, retries, concurrency, and external calls. Preserve cancellation and causal error context.
- Never place credentials or sensitive data in source, logs, tests, fixtures, or artifacts.
- Do not change production behavior merely to make a test easier. Improve testability at a real seam without weakening the contract.
- Do not create commits, branches, issues, pull requests, or external messages unless requested.

Treat *Clean Code*, SOLID, code smells, and *Clean Architecture* as design lenses rather than compliance rules. Optimize for comprehensibility and change safety; local evidence and repository contracts win over doctrine.

## Verification standard

Test externally observable behavior and material invariants, not private implementation shape. Prefer deterministic tests and contract-aware fakes at real boundaries. Cover malformed input, partial failure, retries, idempotency, concurrency, time, migration, or compatibility only when the changed path makes them relevant.

When a durable automated test is impractical—such as exploratory work, generated artifacts, infrastructure, or difficult legacy seams—use the strongest feasible compensating check and report the residual risk. Never weaken an assertion, tolerance, snapshot, or gate merely to obtain a pass.

## Completion contract

Before declaring completion:

1. Confirm the requested observable behavior is present.
2. Name every check run and its result; do not claim checks that were unavailable.
3. Confirm the diff contains no unrelated or accidental changes.
4. Report the design choice, important trade-offs, assumptions, and residual risks that affect the user.

Stop and report a concrete blocker when the required authority, product decision, environment, dependency, or reproducible state is unavailable. Difficulty alone is not a blocker.
