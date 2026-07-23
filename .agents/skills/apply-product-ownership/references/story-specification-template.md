# Story Specification Template

Use this template for an implementation-bound Product Backlog item. Remove sections that are genuinely irrelevant; never fill gaps with invented content or repeated “N/A.”

````markdown
---
id: <stable identifier>
linear_issue: <team-key-number>
linear_url: <canonical Linear issue URL>
linear_synced_revision: <revision last verified in Linear>
type: <story | defect | spike | enabler>
status: <idea | discovery | refinement | ready | in-progress | validation | learned>
product_goal: <goal identifier or link>
owner: <decision owner>
revision: <number or date>
updated: <ISO-8601 date>
---

# <Outcome-oriented title>

## Decision summary

- **Decision:** <what is being proposed or approved>
- **Why now:** <ordering rationale>
- **Readiness:** <Ready | Not Ready, with exact gaps>
- **Linear synchronization:** <verified at revision | local draft only | pending authorized mutation | failed with reason>

## Product Goal and outcome

- **Product Goal:** <the future product state this advances>
- **Target user/stakeholder:** <specific actor>
- **Problem/job:** <what they cannot accomplish or need to improve>
- **Current behavior/baseline:** <observable current state>
- **Desired outcome:** <observable change>
- **Success measure and target:** <metric, baseline, target, horizon>
- **Guardrails:** <measures that must not regress>

## Evidence

### Facts

- <fact with source or repository evidence>

### Assumptions and hypotheses

- **A-1:** <assumption> — validate by <method> before/by <point>

### Decisions

- **D-1:** <decision, owner, date, and rationale>

## Story card

Use the clearest concise form.

> As a <specific actor>, I want <capability or outcome>, so that <value>.

or

> When <situation>, I want to <motivation>, so I can <outcome>.

For a defect, spike, or enabler, state its outcome directly instead of forcing a user-story sentence.

## Scope

### In scope

- <observable behavior included in this slice>

### Out of scope

- <related behavior explicitly deferred or excluded>

### Follow-up stories

- <newly discovered scope with rationale>

## Actors, permissions, and glossary

### Actors and permissions

| Actor | Permitted behavior | Prohibited behavior |
|---|---|---|
| <actor> | <behavior> | <behavior> |

### Domain terms

| Term | Precise meaning |
|---|---|
| <term> | <definition> |

## Behavioral specification

### Workflow or state model

```text
<initial state> -> <event> -> <resulting state>
```

### Rules

| Rule | Requirement | Rationale/source |
|---|---|---|
| R-1 | <singular, implementation-free, verifiable rule> | <goal, policy, evidence, or decision> |

### Acceptance examples

#### EX-1 — <descriptive behavior>

- **Rules:** R-1
- **Given:** <specific context or state>
- **When:** <event or action>
- **Then:** <observable outcome>
- **And:** <additional observable outcome only when necessary>
- **Verification evidence:** <test, demonstration, inspection, or analysis to be planned by engineering>

Use a decision table instead when combinations are clearer:

| Example | Relevant rule | Inputs/state | Event | Observable outcome |
|---|---|---|---|---|
| EX-2 | R-2 | <conditions> | <event> | <outcome> |

## Quality attributes

Include only product-relevant, measurable requirements.

| ID | Attribute | Threshold/behavior | Measurement context |
|---|---|---|---|
| Q-1 | <performance, reliability, accessibility, etc.> | <objective threshold> | <conditions and method> |

## Data and external boundaries

- **Data classification:** <sensitivity and relevant policy>
- **Collection/use:** <necessary fields and purpose>
- **Retention/deletion:** <observable requirement>
- **External systems:** <contract and failure behavior>
- **Compatibility/migration:** <user-visible compatibility or migration constraint>
- **Audit/observability:** <events or evidence needed to operate and evaluate the outcome>

## Dependencies, risks, and spikes

| ID | Type | Description | Owner | Consequence/mitigation |
|---|---|---|---|---|
| DEP-1 | Dependency | <description> | <owner> | <consequence> |
| RISK-1 | Risk | <description> | <owner> | <mitigation> |
| SPIKE-1 | Spike | <question, time-box, evidence, decision unlocked> | <owner> | <next decision> |

## Engineering refinement

### Questions asked

- <goal, behavior, feasibility, risk, slice, or verification question>

### Engineer findings and Product Owner dispositions

| Finding | Evidence | Disposition | Product rationale or follow-up |
|---|---|---|---|
| <finding> | <repository/system evidence> | <Accepted / Rejected / Deferred / Question> | <rationale, owner, consequence> |

### Engineering-owned information

- **Sizing readiness:** <understood enough to size | not ready, reason>
- **Estimate:** <developer-owned; leave unset unless provided by developers>
- **Implementation considerations:** <non-binding notes supplied by engineers>

## Parallel delivery plan

Include this section only when multiple implementation-ready packages are being coordinated.

### Validated dependency graph

```text
<WP-1> --> <WP-3>
<WP-2> --> <WP-3>
```

### Work packages

| Package | Story/revision | Product order | Prerequisites | Concurrency class | Wave | Engineering-owned change surface | Shared contract owner | Acceptance references | Integration gate | Implementation agent |
|---|---|---:|---|---|---:|---|---|---|---|---|
| WP-1 | <id/revision> | 1 | <none or package IDs> | <parallel-ready / conditionally parallel / sequential / blocked> | 1 | <exclusive files/modules/boundary> | <one owner or none> | <EX-1> | <gate and evidence> | <unassigned until authorized> |

### Wave plan

- **Wave 0 — prerequisites:** <contracts, spikes, migrations, or decisions to baseline>
- **Wave 1 — concurrent candidates:** <priority-ordered package IDs>
- **Integration Gate 1:** <individual and aggregate verification required>
- **Gate result granularity:** <package/contract-specific outcomes, or binary gate that blocks every dependent package>
- **Wave 2 — dependents:** <package IDs released only after Gate 1>
- **Failure isolation:** <which dependents block if a package fails>
- **Execution authorization:** <planning only | explicitly authorized by whom and when>

## Open questions

| ID | Question | Owner | Material consequence | Due/decision point |
|---|---|---|---|---|
| OQ-1 | <question> | <owner> | <what cannot safely proceed> | <point> |

## Traceability

| Product Goal/outcome | Rule | Acceptance example | Planned verification evidence |
|---|---|---|---|
| <goal/outcome> | R-1 | EX-1 | <engineering-owned verification> |

## Readiness decision

- [ ] User, problem, outcome, and Product Goal are explicit.
- [ ] Evidence and assumptions are distinguished.
- [ ] Scope and non-goals are explicit.
- [ ] Rules are necessary, unambiguous, consistent, feasible, traceable, and verifiable.
- [ ] Relevant acceptance examples cover success, boundaries, and failures.
- [ ] Product-relevant quality and data requirements are measurable.
- [ ] The Linear issue and verified synchronized revision are recorded before implementation handoff.
- [ ] Dependencies and risks have owners and consequences.
- [ ] Engineering refinement is complete and findings are dispositioned.
- [ ] Engineering has validated any dependency graph and concurrency classifications.
- [ ] Parallel packages have exclusive scopes or a baselined shared contract with one owner.
- [ ] Delivery waves, integration gates, and failure-dependent behavior are explicit when parallel work is proposed.
- [ ] No material open product question remains.
- [ ] Developers confirm the item is understood enough to size.

**Verdict:** <Ready | Not Ready>

**Baseline revision:** <revision handed to engineering>
````
