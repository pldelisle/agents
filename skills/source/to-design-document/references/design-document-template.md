# Implementation-Ready Design Document Template

Use this fallback only when the repository has no stronger template. Keep the
finished document concise: retain every applicable concern, remove instructional
text, and link instead of repeating authoritative requirements.

```markdown
# Design: <change>

## Control

| Field | Value |
|---|---|
| Status | DRAFT / BLOCKED / READY FOR REVIEW / APPROVED / SUPERSEDED |
| Design revision | <stable revision> |
| Owner | <technical owner> |
| Reviewer / approval | <name, date, revision; blank until approved> |
| Governing source | <requirement paths, IDs, and exact revision> |
| Delivery unit | <issue, PR-sized scope, or task> |
| Change class | <greenfield / brownfield / defect / refactor / migration> |

## 1. Outcome and scope

**Outcome:** <one observable sentence; do not restate the whole specification>

**In scope**

- <bounded behavior or technical responsibility>

**Out of scope**

- <nearby behavior deliberately excluded>

**Must remain unchanged**

- <compatibility or regression boundary, with source>

## 2. Current system and constraints

Describe only the current flow and constraints that affect the design.

| Evidence | Current fact | Design consequence |
|---|---|---|
| `<path:symbol>` | <verified behavior or structure> | <constraint> |

- **Applicable instructions/ADRs:** <links and consequences>
- **Existing dependencies and conventions:** <facts>
- **Baseline behavior/evidence:** <test, reproduction, or “greenfield—none”>

## 3. Proposed design

### 3.1 Decisions

| ID | Decision | Rationale and evidence | Traces to |
|---|---|---|---|
| D-01 | <specific commitment> | <why this shape; repository evidence> | <REQ/RISK/ADR> |

Record only consequential alternatives:

| Alternative | Advantage | Rejection reason |
|---|---|---|
| <viable option> | <real benefit> | <specific trade-off> |

### 3.2 Change surface

| Path / symbol / artifact | Add or change | Responsibility after change | Traces to |
|---|---|---|---|
| `<exact path or generated source>` | <change> | <single responsibility> | <D/REQ> |

For generated artifacts, name the authoritative source, generator, and
reproduction command.

### 3.3 Interfaces and invariants

For every changed public or cross-module seam, define:

- inputs, outputs, and validation;
- errors and failure translation;
- state and ordering rules;
- side effects and forbidden side effects;
- compatibility/version behavior;
- invariants callers and tests may rely on.

Use a compact signature, schema, state table, equation, or contract snippet only
when prose would be less precise. Do not include implementation bodies.

### 3.4 Runtime and data flow

1. <trigger and caller>
2. <boundary crossings and transformations>
3. <state changes and externally visible result>
4. <failure, retry, cleanup, and recovery>

Add one sequence, state, data-flow, or deployment diagram only when it materially
improves review.

### 3.5 Impact screen

| Concern | Applies? | Design / verification, or evidence-backed reason |
|---|---|---|
| Dependencies and external services | yes/no | <version/contract/supply-chain decision or reason> |
| Configuration, secrets, environments | yes/no | <keys, ownership, validation, redaction, or reason> |
| Data model and migration | yes/no | <decision or reason> |
| API and backward compatibility | yes/no | <decision or reason> |
| Security and privacy | yes/no | <trust boundary/control or reason> |
| Reliability and concurrency | yes/no | <failure property or reason> |
| Performance and resources | yes/no | <measurable budget or reason> |
| Observability and operations | yes/no | <signals/runbook or reason> |
| Deployment and rollback | yes/no | <sequence/fallback or reason> |
| Accessibility and interaction | yes/no | <criterion or reason> |

Expand only applicable concerns below the table. State thresholds, ownership,
failure behavior, migration/rollback mechanics, and verification—not aspirations.

## 4. Test design

### 4.1 Seams and strategy

| Seam | Why behavior is observable here | Level / size | Harness and prior art | Focused command |
|---|---|---|---|---|
| <public seam> | <behavior/risk> | <level> | `<test path>` / `<example>` | `<verified command>` |

State shared fixtures, builders, safe datasets, boundary fakes, clock/randomness
controls, concurrency coordination, and environment needs. Explain any use of
interaction assertions.

### 4.2 Verification cases

Use repository naming conventions. Keep each row independently reviewable.

| ID / exact test name | Covers | Level, seam, location | Given / When | Then / independent oracle | Data, doubles, controls | Expected pre-change signal |
|---|---|---|---|---|---|---|
| V-01 / `<name>` | <REQ/D/RISK> | <level>; <seam>; `<path>` | <minimal setup and action> | <observable result and forbidden effects>; oracle: <source> | <values/boundaries/fake/time> | RED: <specific failure> |
| V-02 / `<name>` | <unchanged behavior> | <level>; <seam>; `<path>` | <setup and action> | <observable baseline>; oracle: <source> | <controls> | GREEN BASELINE: <reason> |

Use a non-automated evidence row only when automation is not the strongest
method. Name the procedure, environment, expected result, retained artifact, and
owner.

### 4.3 Traceability

| Requirement / invariant / risk | Design decisions | Verification IDs | Coverage |
|---|---|---|---|
| <source ID> | <D-IDs> | <V-IDs> | covered / partial / blocked |

No in-scope source may be missing. No decision, changed surface, or verification
case may lack an upstream source or named risk.

## 5. TDD delivery plan

Run each listed case as its own red-green-refactor cycle; do not write the rows
in bulk.

| Slice | Test order | Minimum capability after green | Expected surfaces | Focused completion signal |
|---|---|---|---|---|
| S-01 | V-01 | <small observable vertical behavior> | `<paths>` | `<command and result>` |

- **Baseline command:** `<verified command and current result>`
- **Final required gates:** `<focused, integration, full suite, static/security/etc.>`
- **Dependencies/blocking order:** <only real dependencies>

## 6. Delivery and operations

Include only applicable details from the impact screen:

- migration/backfill and mixed-version behavior;
- deployment order, feature control, and smoke evidence;
- telemetry tied to failure decisions and success criteria;
- rollback/containment trigger, procedure, and data limitations;
- operator or user documentation changes.

## 7. Risks and resolved decisions

| Risk / trigger | Prevention or detection | Mitigation / fallback | Owner |
|---|---|---|---|
| <specific risk> | <signal/test> | <action> | <owner> |

- **Resolved assumptions:** <decision and authority, or none>
- **Open questions:** None before READY FOR REVIEW

## 8. Readiness

- [ ] Authority, revision, scope, non-goals, and unchanged behavior are explicit.
- [ ] Repository evidence supports every material current-state claim.
- [ ] Decisions, interfaces, flows, errors, and applicable impacts are concrete.
- [ ] Traceability is complete in both directions.
- [ ] Every automated case has an independent oracle and expected pre-change signal.
- [ ] Test data, boundary doubles, deterministic controls, environments, and commands are known.
- [ ] TDD slices are vertical, dependency-ordered, and one-case-at-a-time.
- [ ] Applicable migration, compatibility, rollout, observability, and rollback are safe.
- [ ] Risks are owned; no material question remains.
- [ ] The design introduces no requirement and requires no material interpretation.

**Author gate:** <BLOCKED with reason / READY FOR REVIEW>
```
