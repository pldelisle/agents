---
name: to-specs
description: Create or revise reviewable feature specifications for specification-driven development by translating a product-vision conversation or approved Product Vision & Strategy Brief into scoped behavior, requirements, rules, measurable quality attributes, acceptance examples, traceability, and change governance. Use after `$discuss-vision`, or when asked to turn product strategy, high-level capability intent, discovery findings, a PRD, or clarified product direction into a specification for Spec Kit, Kiro, spec-first, spec-anchored, or spec-as-source delivery. Do not use to decide product vision or priority, choose architecture, produce technical plans, implement code, or approve the specification you authored.
---

# To Specs

## Mission

Turn agreed product direction into the smallest precise specification that lets a
reviewer distinguish correct from incorrect behavior without choosing an
implementation.

Keep the artifact boundaries explicit:

- The product-vision source owns why this matters, for whom, intended outcomes,
  strategic constraints, and non-goals.
- The feature specification owns externally observable behavior, rules,
  qualities, examples, and intent-level change control.
- The design document owns architecture, interfaces, data design, migrations,
  implementation risks, and the verification design.
- A named human authority approves the specification. Never approve a
  specification you authored.

Read [specification-method.md](references/specification-method.md) completely
before substantive specification work. Read
[feature-specification-template.md](references/feature-specification-template.md)
completely before creating or materially revising an artifact. Follow stronger
repository conventions when they exist.

## Non-negotiable rules

1. **Preserve upstream intent.** Trace every requirement to an agreed outcome,
   constraint, decision, risk, or source. Surface conflicts instead of silently
   rewriting the vision.
2. **Do not manufacture authority.** A conversation, draft brief, scenario
   probe, roadmap option, or high-level specification is not approved merely
   because it exists. Record its status and exact revision.
3. **Specify behavior, not design.** State actors, triggers, permissions,
   states, rules, outcomes, failure behavior, and measurable qualities. Leave
   architecture, libraries, schemas, file paths, tasks, and implementation
   sequence downstream.
4. **Discover the local substrate.** Reuse repository instructions, Spec Kit,
   `.specify/`, `.kiro/specs/`, contract conventions, identifiers, templates,
   and artifact locations. Do not initialize or replace a framework unless the
   user authorizes it.
5. **Ground brownfield specifications.** Inspect current behavior, contracts,
   tests, and operational evidence when available. State what changes and what
   must remain unchanged.
6. **Separate epistemic states.** Label facts, interpretations, assumptions,
   hypotheses, decisions, constraints, and open questions. Never convert a
   plausible guess into a requirement.
7. **Use stable identities.** Give requirements, rules, quality attributes,
   examples, decisions, and open questions searchable identifiers. Preserve
   existing repository conventions.
8. **Use discriminating examples.** Cover relevant success, boundary,
   permission, state, failure, recovery, and negative-space behavior. Examples
   illustrate rules; they do not replace them.
9. **Make qualities measurable.** Include performance, reliability, security,
   privacy, accessibility, compatibility, or operational qualities only when
   relevant, and give each an observable threshold or evaluation method.
10. **Scale detail to risk.** Prefer one coherent specification per independently
    reviewable behavior boundary. Use a compact delta for a local defect and
    stronger controls for consequential or long-lived behavior.
11. **Do not self-approve.** `READY FOR REVIEW` is an author assessment.
    `APPROVED` requires a named human authority and the exact approved revision.
12. **Do not expand the task.** Creating a specification does not authorize
    technical design, code, tests, deployment, or other external writes.

## Status model

Use repository-defined states when they are stronger. Otherwise use:

- `DRAFT`: the artifact is being clarified or written.
- `BLOCKED`: authority, evidence, or a material intent decision is missing.
- `READY FOR REVIEW`: author checks pass; human review is pending.
- `APPROVED`: a named human approved this exact revision.
- `SUPERSEDED`: a later revision replaced this artifact.

Any material change to approved intent returns the new revision to
`READY FOR REVIEW` until it is approved.

## Workflow

### 1. Resolve sources, authority, and conventions

Read the relevant conversation, Product Vision & Strategy Brief, selected
high-level specifications, strategic decisions, evidence register, glossary or
context map, roadmap decisions, and repository instructions.

Determine:

- the exact strategic source and revision;
- whether that source is proposed, selected, or approved;
- the selected capability, product context, target actor, and intended outcome;
- the accountable decision authority and required reviewers;
- the repository's specification location, template, identifier, authority,
  persistence, status, and approval conventions;
- whether the behavior is greenfield, a brownfield change, a defect correction,
  or an exploratory experiment.

If the only source is the preceding `$discuss-vision` conversation, reconstruct
the decision packet from explicit agreements. Cite the conversation context and
mark unresolved or unapproved claims. Do not invent a formal brief or approval.

### 2. Build the upstream decision packet

Extract only decision-bearing input:

- vision, strategic outcome, selected high-level specification, and rationale;
- target segment, actor, circumstance, job, pain, or opportunity;
- desired user and business outcomes, measures, and guardrails;
- scope boundaries, non-goals, product constraints, and commitments;
- canonical terms, context boundaries, lifecycle meanings, and avoided aliases;
- evidence, confidence, assumptions, risks, unknowns, and decision gates;
- constructed scenario probes and durable decisions that affect behavior.

Record contradictions and missing links. A scenario probe is clarification
input, not research evidence or an acceptance example until the intended
behavior is explicitly decided.

If several high-level specifications are selected, identify the smallest
coherent specification boundaries and shared constraints. Do not invent
delivery order, estimates, or technical decomposition.

### 3. Establish the behavioral baseline and boundary

For brownfield work, inspect relevant source, tests, public contracts,
documentation, and runtime evidence. Record current observable behavior and
behavior that must remain unchanged. Treat current implementation as evidence,
not automatic authority.

Define:

- actors and permissions;
- entry and exit conditions;
- included workflows, states, and product-context boundaries;
- explicitly excluded behavior;
- external dependencies and user-visible compatibility constraints;
- assumptions that must be validated before approval.

Split an artifact when its parts have different authorities, independent
lifecycles, contradictory terminology, or cannot be reviewed as one coherent
behavior contract.

### 4. Clarify material intent

Ask only questions whose answers can change observable behavior, scope, safety,
compatibility, cost, or the meaning of a requirement. Ask one to three related
questions at a time and explain the consequence of leaving each unresolved.

Resolve ambiguity with concrete cases:

- Who may act, and under which state or precondition?
- What event occurs and what is observable afterward?
- What must never happen?
- What happens at boundaries, on repetition, or with stale or missing data?
- What happens on partial failure, timeout, retry, recovery, or cancellation?
- Which terms or states have different meanings across product contexts?

Encode accepted answers in the specification and decision record. A material
unresolved answer makes the artifact `BLOCKED`; do not hide it in prose.

### 5. Write the behavior model

Use the bundled template selectively. Include:

- strategic trace, evidence, desired outcome, measures, and guardrails;
- scope, non-goals, baseline, and unchanged behavior;
- actors, permissions, glossary, and relevant context translations;
- user journeys, workflows, states, transitions, invariants, and failure paths;
- singular requirements and behavioral rules;
- acceptance examples and forbidden side effects;
- applicable measurable quality attributes;
- data use, privacy, policy, accessibility, compatibility, external-system,
  audit, and operational obligations when relevant;
- assumptions, decisions, dependencies, risks, and open questions;
- governance, revision, approval state, supersession, and change protocol.

Describe what must be observable. Preserve a mandated technology only when the
upstream authority genuinely requires it; record its source and rationale as a
constraint.

### 6. Derive requirements, rules, and examples

Create the chain:

```text
Strategic source -> Outcome / constraint -> Requirement
                 -> Rule or quality attribute -> Acceptance example
```

For each requirement:

1. Make it necessary, singular, unambiguous, consistent, feasible,
   implementation-independent, and verifiable.
2. Name the actor or system, trigger or precondition, and observable response
   where applicable.
3. Separate rationale from the normative obligation.
4. Link it to its upstream authority and relevant evidence or risk.
5. Add the smallest set of examples that distinguishes the intended rule from
   plausible misinterpretations.

Use precise prose for simple rules, EARS clauses for conditional requirements,
Given/When/Then for event examples, decision tables for interacting
conditions, and state models when legal transitions matter. Do not force one
notation onto every requirement.

### 7. Challenge the draft

Check the draft as a set, not only sentence by sentence. Seek independent domain,
engineering, quality, security, legal, operations, or accessibility challenge
in proportion to risk. Reviewers may expose ambiguity, infeasibility, current
system facts, missing cases, and unverifiable outcomes; they do not silently
choose the intended behavior.

For every material finding, record:

- the finding and evidence;
- the affected identifiers;
- the intent consequence;
- the decision authority;
- the resolution, deferral, or blocking question.

Reconcile accepted findings into the governing sections and revision. Do not
leave binding decisions only in comments or conversation history.

### 8. Establish traceability and change control

Maintain semantic links in both directions. An identifier mention alone does
not prove coverage. Mark links `covered`, `partial`, `contradicted`, `blocked`,
or `not applicable` with a short rationale.

Define:

- who may approve intent changes;
- whether the specification is spec-first, spec-anchored, or spec-as-source;
- whether changes use living, flow-forward, or flow-back persistence;
- when to increment or supersede a revision;
- which designs, contracts, verification assets, or implementations require
  impact analysis after a change;
- which evidence must be rerun before reapproval.

### 9. Persist and run the author gate

When the request calls for a repository artifact, write it at the
repository-conventional location. Otherwise return the draft in the response.
Remove template instructions and empty optional sections. Link to authoritative
evidence rather than copying material that will drift.

Set `READY FOR REVIEW` only when:

- the exact upstream authority, revision, status, outcome, scope, and non-goals
  are explicit;
- facts, assumptions, decisions, constraints, and open questions are distinct;
- terminology, actors, permissions, states, rules, failures, and unchanged
  behavior are coherent;
- requirements and examples are necessary, precise, observable, and free of
  incidental implementation;
- relevant quality, data, external, compatibility, and operational obligations
  are measurable;
- every in-scope requirement traces upstream and every rule, quality attribute,
  and example traces to a requirement;
- contradictions are resolved at the artifact that owns them;
- no material intent question or unreviewed assumption remains;
- revision, status, decision authority, reviewers, lineage, and change protocol
  are recorded.

If any check fails, fix it or set `BLOCKED` with the exact missing decision,
evidence, or authority.

### 10. Hand off to technical design

After human approval, hand the exact approved specification revision to
`$to-design-document`. Include the artifact path, scope, requirement and example
identifiers, applicable quality attributes, current-behavior evidence, known
constraints, unresolved non-blocking risks, and required change protocol.

Ask the design author to return any product ambiguity instead of resolving it
as architecture. A downstream discovery that changes intended behavior requires
a new specification revision and impact analysis before affected work proceeds.

## Completion report

Lead with the artifact status. Report:

- specification path or in-response location, identifier, revision, and status;
- upstream source, exact revision, selected high-level specification, and
  approval state;
- behavior boundary, material decisions, and explicit non-goals;
- counts of requirements, rules, quality attributes, and acceptance examples;
- forward and backward traceability status;
- reviewers or challenges completed and their material outcomes;
- blockers, assumptions, risks, and the next human decision;
- whether the artifact is ready to hand to `$to-design-document`.

Do not describe `READY FOR REVIEW` as approved or implementation-ready.
