---
name: to-specs
description: Create or revise a behavioral feature specification from approved product intent, discovery evidence, or a PRD. Use for spec-first delivery, requirements, rules, quality attributes, acceptance examples, traceability, and change governance. Do not decide product vision, backlog priority, architecture, implementation, or self-approval.
metadata:
  owner: "pldelisle"
  version: "2.0.0"
  last-verified: "2026-09-04"
  verification-scope: "deterministic; behavioral suite requires external execution"
  compatibility: "Codex, Claude Code, and Kiro"
---

# To Specs

## Outcome and boundary

Produce a reviewable specification that defines observable behavior precisely enough for product, engineering, and quality roles to challenge it without prescribing implementation.

The approved product source owns why and strategic intent. This skill owns the cross-story behavioral contract. `$apply-product-ownership` owns slices, exact backlog order, and readiness; `$to-design-document` owns technical decisions; implementation and independent review remain separate.

Do not author missing product decisions silently. Label facts, source decisions, assumptions, hypotheses, conflicts, and open questions. An authored specification is `Draft` or `In review` until an authorized reviewer approves its exact revision.

Read [specification-method.md](references/specification-method.md) for non-trivial state, rule, example, traceability, or change-governance work. Read [feature-specification-template.md](references/feature-specification-template.md) before creating or materially restructuring the durable artifact.

## Choose proportionate formality

- **Exploratory:** The main need is learning. Define the hypothesis, experiment or prototype, observation, and decision threshold; do not pretend behavior is settled.
- **Lightweight:** A clear, reversible, low-risk change may need only a concise behavior note with source, scope, examples, and verification.
- **Standard:** A multi-path feature needs stable rule and example identifiers, a behavioral model, quality attributes, and review status.
- **High assurance:** Safety, authorization, regulated data, money, migration, irreversible state, or broad compatibility requires explicit hazards, failure behavior, traceability, verification method, and controlled revisions.

Use the least ceremony that preserves shared understanding and change safety. If a full feature specification would add no useful decision or contract, say so and recommend the lighter artifact.

## Workflow

1. **Resolve authority.** Identify the approved product source, decision owner, revisions, status, and repository conventions. Surface conflicts rather than choosing silently.
2. **Build the intent packet.** Capture target user, problem, desired outcome, evidence, product hypothesis, success measure, guardrails, scope boundaries, non-goals, and terms.
3. **Characterize the baseline.** Inspect current product behavior, public contracts, existing specifications, tests, schemas, interfaces, and relevant issues. Treat implementation as evidence, not intended behavior by default.
4. **Define the behavioral boundary.** Name actors, system boundary, inputs, outputs, externally visible state, permissions, dependencies, and excluded behavior.
5. **Clarify material intent.** Ask one to three related questions only where different answers would change observable behavior. Offer a recommendation and identify the evidence or assumption behind it.
6. **Model behavior.** Define states, events, business rules, permissions, invariants, failure and recovery behavior, external-dependency behavior, and applicable quality attributes.
7. **Derive rules and examples.** Give each material rule and acceptance example a stable identifier. Use scenarios for event-driven behavior, decision tables for combinatorial rules, and measurable statements for static qualities.
8. **Challenge the draft.** Test happy, alternate, invalid, boundary, empty, duplicate, stale, permission, concurrency, partial-failure, retry, migration, compatibility, accessibility, privacy, and operational cases only where relevant.
9. **Establish traceability.** Preserve `source decision → outcome hypothesis → requirement or rule → acceptance example → planned verification`. Reference shared rules from backlog items rather than copying them.
10. **Persist and gate.** When a durable artifact is requested, use the repository path and template. Remove unused sections. Record revision, status, approver, changes, unresolved questions, and affected identifiers.

## Requirement quality

Each normative requirement should be necessary, singular, concise, unambiguous in the product language, consistent, feasible at the product level, verifiable, and traceable. Replace adjectives such as “fast,” “secure,” “easy,” or “robust” with thresholds, constraints, or an explicit evaluation method when the quality matters.

Keep rationale separate from normative behavior. Record genuine externally imposed technical constraints, but do not select architecture, libraries, schemas, endpoints, classes, or task sequences.

Non-functional requirements deserve explicit treatment when relevant. State the scenario, measure, threshold or evaluation method, operating conditions, and consequence. Avoid generic quality checklists and unmeasurable aspirations.

## Author gate

Before handoff, confirm:

- the source and exact revision are identified;
- scope, non-goals, terms, actors, states, rules, and examples are internally consistent;
- every normative item has a stable identifier and source trace;
- every rule has acceptance evidence and every example maps to planned verification;
- material quality attributes and failure behavior are measurable;
- assumptions and open questions have owners and consequences;
- implementation choices remain open unless an approved external constraint closes them; and
- the artifact does not claim approval it did not receive.

## Completion and handoff

Return the artifact or path, revision and status, source decisions, requirement-to-example trace, unresolved blockers, and recommended review owner. Hand the approved feature contract to `$apply-product-ownership` for slicing and ordering, and to `$to-design-document` only when the change's risk or architectural uncertainty warrants technical design.
