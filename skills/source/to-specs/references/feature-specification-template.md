# Feature Specification Template

## Contents

1. [How to use this template](#how-to-use-this-template)
2. [Document control](#document-control)
3. [Decision and strategic trace](#decision-and-strategic-trace)
4. [Evidence, scope, and baseline](#evidence-scope-and-baseline)
5. [Behavioral specification](#behavioral-specification)
6. [Quality and external boundaries](#quality-and-external-boundaries)
7. [Governance and traceability](#governance-and-traceability)
8. [Author quality gate](#author-quality-gate)

## How to use this template

Use this template when the repository has no stronger feature-specification
format. Keep only applicable sections and delete all instructions and
placeholders from the finished artifact. Never fill a gap with invented content
or repeated `N/A`.

````markdown
---
id: <stable feature-specification identifier>
type: <feature | behavior-change | defect | experiment>
status: <DRAFT | BLOCKED | READY FOR REVIEW | APPROVED | SUPERSEDED>
strategic_source: <artifact, conversation context, or decision identifier>
strategic_revision: <exact revision, date, or context marker>
high_level_specifications: [<HLS IDs>]
product_context: <context and glossary revision>
spec_authority: <spec-first | spec-anchored | spec-as-source>
persistence_model: <living | flow-forward | flow-back>
rigor_lane: <lite | standard | high-assurance | exploratory>
decision_authority: <named person or accountable role>
required_reviewers: [<roles or names>]
revision: <number, date, or repository-conventional value>
supersedes: <prior revision or none>
approved_by: <named human and date, or unapproved>
updated: <ISO-8601 date>
---

# <Outcome-oriented capability or behavior>

## Document control

- **Specification status:** <status and exact blocker when blocked>
- **Decision requested:** <the single approval or clarification currently needed>
- **Source authority:** <source, revision, and approval state>
- **Behavior boundary:** <one-sentence statement of what this specification governs>
- **SDD posture:** <authority model, persistence model, and rigor lane>
- **Revision lineage:** <current revision, predecessor, and reason for revision>

## Decision and strategic trace

### Intent summary

- **Target segment/actor:** <specific actor and circumstance>
- **Problem, job, or opportunity:** <evidence-linked need>
- **Desired user outcome:** <observable change>
- **Desired business outcome:** <observable value>
- **Success measures:** <baseline, target, horizon, and method>
- **Guardrails:** <measures or conditions that must not regress>

### Upstream trace

| Source ID/revision | Source type | Approved intent used here | Evidence/confidence | Specification consequence |
|---|---|---|---|---|
| <vision, outcome, HLS, constraint, or decision> | <type> | <concise intent> | <source IDs and limits> | <scope, rule, quality, or non-goal> |

### Strategic non-goals

- <behavior or outcome deliberately not pursued, with source>

## Evidence, scope, and baseline

### Evidence states

#### Facts

- **FACT-1:** <claim and source>

#### Interpretations

- **INT-1:** <interpretation and supporting facts>

#### Assumptions and hypotheses

- **ASM-1:** <statement> — validate by <method and decision point>

#### Intent decisions

- **DEC-1:** <decision, authority, date, rationale, and affected IDs>

### Scope

#### In scope

- <externally observable behavior included>

#### Out of scope

- <related behavior explicitly excluded or deferred>

### Current and unchanged behavior

- **Current behavior:** <observable baseline with evidence>
- **Required change:** <delta from the baseline>
- **Unchanged behavior:** <relied-upon behavior this specification preserves>

For greenfield behavior, state that no behavioral baseline exists and identify
the integration boundary that is known.

## Actors, permissions, and domain language

### Actors and permissions

| Actor | Relevant state/context | Permitted behavior | Prohibited behavior |
|---|---|---|---|
| <actor> | <state/context> | <observable behavior> | <observable prohibition> |

### Canonical terms

| Term | Product context | Precise meaning | Avoided or translated terms | Source revision |
|---|---|---|---|---|
| <term> | <context> | <meaning> | <aliases or cross-context translation> | <glossary/decision> |

Record only terms needed to interpret this behavior. Link to the upstream
glossary instead of copying it wholesale.

## Behavioral specification

### Journeys and entry/exit conditions

| Journey | Actor | Entry conditions | Trigger or action | Successful exit | Unsuccessful exit |
|---|---|---|---|---|---|
| JRN-1 | <actor> | <conditions> | <event> | <observable state/outcome> | <failure/cancellation outcome> |

### State and workflow model

```text
<state> --<event [guard]>--> <state> / <observable effect>
```

Define legal transitions, terminal states, invariants, repetition semantics,
and forbidden transitions only when state matters.

### Requirements

| ID | Observable obligation | Upstream source | Rationale | Verification class |
|---|---|---|---|---|
| REQ-1 | <necessary, singular, implementation-independent obligation> | <source ID/revision> | <why it matters> | <test, analysis, inspection, demonstration, or measurement> |

### Behavioral rules

| ID | Parent requirement | Rule | Source or rationale |
|---|---|---|---|
| RULE-1 | REQ-1 | <singular, unambiguous, verifiable rule> | <evidence, policy, decision, or risk> |

### Acceptance examples

#### EX-1 — <descriptive behavior>

- **Requirement/rules:** REQ-1, RULE-1
- **Given:** <specific relevant state>
- **When:** <one meaningful event>
- **Then:** <externally observable outcome>
- **And not:** <forbidden side effect when discriminating>
- **Oracle source:** <requirement, rule, worked value, policy, or trusted model>
- **Downstream evidence intent:** <test, demonstration, inspection, analysis, or measurement>

Use a decision table when interacting conditions are clearer:

| Example | Requirement/rules | Inputs/state | Event | Observable outcome | Forbidden outcome |
|---|---|---|---|---|---|
| EX-2 | <IDs> | <conditions> | <event> | <result> | <must not occur> |

### Invariants or properties

| ID | Parent requirement | Invariant/property | Scope and evaluation method |
|---|---|---|---|
| INV-1 | REQ-1 | <condition that must always hold> | <states, operations, or model> |

Use invariants only when examples cannot adequately express the behavior space.

## Quality and external boundaries

### Quality attributes

Include only applicable, measurable behavior.

| ID | Parent requirement | Attribute | Threshold or obligation | Measurement context |
|---|---|---|---|---|
| NFR-1 | REQ-1 | <performance, reliability, security, accessibility, etc.> | <objective target> | <conditions and evaluation method> |

### Data and privacy

- **Data semantics:** <meaning, required/optional status, absence, staleness, and conflicts>
- **Classification and purpose:** <sensitivity, use, and source policy>
- **Collection/minimization:** <observable obligation>
- **Retention/deletion:** <observable behavior>
- **Consent/access/audit:** <applicable actor-visible or policy behavior>

### External systems and failure behavior

| Boundary | Observable contract | Timeout/failure behavior | Retry/recovery/idempotency | Compatibility obligation |
|---|---|---|---|---|
| <system or actor boundary> | <input/output obligation> | <visible outcome> | <behavior> | <version/migration constraint> |

### Accessibility, policy, and operations

- **Accessibility:** <standard, interaction behavior, or evaluation method>
- **Policy/compliance:** <obligation and authoritative source>
- **Audit/observability:** <events or evidence required to operate and evaluate behavior>
- **Rollout/containment constraints:** <user-visible staging, fallback, or safety obligation>

### Dependencies and risks

| ID | Type | Statement | Evidence | Responsible party | Consequence or response |
|---|---|---|---|---|---|
| DEP-1 | Dependency | <external prerequisite> | <source> | <role/person> | <consequence if unmet> |
| RISK-1 | Risk | <uncertainty or harm> | <source> | <role/person> | <mitigation, containment, or decision gate> |

Do not include architecture, implementation sequencing, or estimates.

## Open questions

| ID | Question | Decision authority | Material consequence | Required by |
|---|---|---|---|---|
| OQ-1 | <decision-bearing question> | <role/person> | <what remains blocked or conditional> | <review/design/release point> |

## Governance and traceability

### Artifact governance

- **Repository instructions/constitution:** <path and revision>
- **Strategic source:** <path/context and approved revision>
- **Feature specification:** <this path, status, and revision>
- **Authority model:** <spec-first, spec-anchored, or spec-as-source>
- **Persistence model:** <living, flow-forward, or flow-back>
- **Generated boundaries:** <source, command, generated paths, and extension points when applicable>
- **Intent-change authority:** <named person or accountable role>
- **Change protocol:** <increment/supersede, impact analysis, reapproval, and evidence rerun>
- **Expiry/graduation gate:** <required for spec-first or exploratory behavior>

### Forward traceability

| Strategic source/outcome | Requirement | Rule/NFR/invariant | Acceptance example | Downstream design | Verification intent | Status |
|---|---|---|---|---|---|---|
| <ID/revision> | REQ-1 | RULE-1 | EX-1 | <not yet designed or design ID> | <condition/method> | <covered/partial/contradicted/blocked> |

### Backward traceability

List any rule, quality attribute, example, proposed design decision, contract,
or verification condition that lacks upstream authority. Remove it or obtain an
explicit intent decision before approval.

### Review findings

| Finding | Reviewer/role | Evidence | Affected IDs | Resolution/status |
|---|---|---|---|---|
| <finding> | <review source> | <evidence> | <IDs> | <resolved, deferred, or blocker> |

## Author quality gate

- [ ] Exact upstream source, revision, and approval state are recorded.
- [ ] Target actor, problem/opportunity, intended outcomes, measures, guardrails,
      scope, and non-goals are explicit.
- [ ] Facts, interpretations, assumptions, decisions, constraints, and open
      questions are distinguished.
- [ ] Canonical terms, product contexts, actors, permissions, states, and
      transitions are coherent.
- [ ] Current, changed, and unchanged behavior are explicit when applicable.
- [ ] Requirements are necessary, singular, unambiguous, consistent, feasible,
      traceable, implementation-independent, and verifiable.
- [ ] Rules, quality attributes, invariants, examples, decisions, and open
      questions have stable identifiers.
- [ ] Acceptance examples discriminate relevant success, boundary, permission,
      failure, recovery, and forbidden behavior.
- [ ] Applicable quality, data, privacy, accessibility, policy, compatibility,
      external-system, and operational obligations are measurable.
- [ ] Every requirement has upstream authority; every rule, quality attribute,
      invariant, and example has a parent requirement.
- [ ] Backward traceability exposes no unsupported scope.
- [ ] Material contradictions and review findings are resolved at the governing
      artifact.
- [ ] No material intent question or unreviewed assumption remains.
- [ ] Authority model, persistence model, rigor lane, revision, decision
      authority, reviewers, lineage, and change protocol are explicit.
- [ ] `READY FOR REVIEW` is not presented as human approval.

**Author verdict:** <DRAFT | BLOCKED | READY FOR REVIEW>

**Next human decision:** <clarification or approval required>

**Approved baseline:** <revision and named approver, populated only after approval>
````
