---
name: to-design-document
description: Create or revise an implementation-ready technical design from approved requirements when risk, ambiguity, or cross-boundary change warrants a design gate. Use for architecture, migrations, integrations, contracts, technical planning, and requirement-traced test design. Do not discover product intent, implement code, write tests, or self-approve.
metadata:
  owner: "pldelisle"
  version: "2.0.0"
  last-verified: "2026-09-04"
  verification-scope: "deterministic; behavioral suite requires external execution"
  compatibility: "Codex, Claude Code, and Kiro"
---

# To Design Document

## Outcome and gate

Produce the smallest reviewable design that resolves the technical decisions needed to implement an approved requirement safely and verify it convincingly.

Do not require a design document for every change. A clear, local, reversible, low-risk edit should proceed directly to `$implement` with proportionate verification unless repository policy requires a gate. Recommend a design when the change crosses modules or systems, introduces a public contract, migration, concurrency, security or privacy boundary, irreversible state, significant operational risk, or a hard-to-reverse architectural choice.

This skill owns the proposed technical decision and test design, not product intent, implementation, approval, estimates, backlog order, or independent review. Mark the artifact `Draft`, `In review`, `Approved`, `Superseded`, or `Blocked`; only an authorized reviewer can set `Approved`.

Read [foundations.md](references/foundations.md) when architecture principles conflict. Read [test-design.md](references/test-design.md) before designing non-trivial verification. Read [design-document-template.md](references/design-document-template.md) before creating or materially restructuring a durable design document.

## Workflow

1. **Resolve authority.** Identify the approved requirement and acceptance-example revisions, decision owner, repository instructions, design conventions, and required reviewers. Stop if a missing product decision would change observable behavior.
2. **Characterize the current system.** Map relevant modules, entry points, state and data flow, contracts, dependencies, trust boundaries, side effects, failure modes, deployment topology, tests, and operational constraints.
3. **Decide whether design is warranted.** Classify the change as exploratory, lightweight, standard, or high assurance. For a lightweight change, return a concise no-design-needed rationale, material risks, and required checks instead of manufacturing an artifact.
4. **Frame the decision.** State goals, non-goals, constraints, assumptions, open questions, decision drivers, and the exact requirement IDs the design must satisfy.
5. **Compare viable options.** Include the current approach where relevant. Evaluate correctness, information hiding, coupling, migration, compatibility, security, privacy, operability, testability, cost, and reversibility. Recommend one option and say why the alternatives lose here.
6. **Design the smallest coherent change.** Give each invariant one owner. Hide change-prone choices behind a useful boundary. Keep stable policy independent of provider, framework, storage, transport, or tracker mechanisms when the system's complexity justifies that separation.
7. **Specify contracts and failure behavior.** Define inputs, outputs, state transitions, validation, permissions, idempotency, retries, concurrency, timeouts, partial failure, cleanup, observability, compatibility, migration, rollout, and rollback only where applicable.
8. **Derive verification before task order.** Map each requirement and material risk to the lowest boundary that can prove it. Choose deterministic tests, integration or contract checks, security or quality-attribute evidence, and operational validation.
9. **Order implementation slices.** Sequence by dependencies and risk reduction. Prefer thin end-to-end increments. Use red-green-refactor where a trustworthy failing test is practical; otherwise state the exception and compensating verification.
10. **Compress and gate.** Remove background that does not change a decision. Validate links, identifiers, change surfaces, rollout order, test traceability, unresolved questions, and approval status.

## Design quality rules

- Repository architecture and observed constraints outrank generic patterns.
- Treat *Clean Architecture*, SOLID, and code smells as conditional heuristics. Do not add layers or ports without a concrete policy boundary or change pressure.
- Prefer deep modules with small interfaces over pass-through abstractions.
- Keep provider and framework details at explicit adapters; avoid broad textual transformations that can alter policy accidentally.
- Preserve public behavior and backward compatibility unless the approved requirement authorizes change.
- Include rejected alternatives only when they were genuinely viable or illuminate a consequential trade-off.
- Never invent benchmark results, capacity, stakeholder approval, legal conclusions, or completed validation.

## Verification design

Trace `requirement or risk → observation → test boundary → setup/data → expected evidence`. Include functional, security, privacy, performance, reliability, accessibility, compatibility, migration, and operational validation only when the change creates those risks.

TDD is a useful default, not a universal law. For legacy seams, exploratory work, generated artifacts, infrastructure, nondeterministic systems, or expensive environments, specify the strongest feasible characterization or staged validation and state residual risk.

## Readiness gate and handoff

A design is ready for approval when:

- the approved requirement revision and every affected identifier are traceable;
- current behavior and constraints are evidence-backed;
- the selected option, alternatives, trade-offs, and reversibility are clear;
- contracts, invariants, change surfaces, dependency order, failure behavior, and migration are precise enough to implement;
- the verification plan could detect the material defects and risks;
- open questions have owners and consequences; and
- the document identifies its approver without claiming approval.

On approval, hand `$implement` the exact design revision, ordered slices, owned change surfaces, and required checks. Hand `$engineer-tests` the requirement-and-risk trace when separate test engineering is warranted. Return product ambiguities to the product owner rather than resolving them as technical choices.
