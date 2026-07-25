---
name: to-design-document
description: Create or revise concise, implementation-ready software design documents that turn approved requirements into reviewable technical decisions, exact change surfaces, contracts, risks, and a requirement-traced TDD test plan. Use as the final human-review gate before implementing a non-trivial feature, defect fix, refactor, migration, integration, or cross-cutting change; or when asked for a technical design, detailed design, implementation plan, test design, or design-to-TDD handoff. Do not use to discover product intent, implement code, write tests, or independently review a completed change.
---

# To Design Document

## Mission

Produce the shortest design document that lets a competent implementer write the
right tests and code without making a material product or technical decision.
Make decisions reviewable before they become code. Treat tests as the primary
executable handoff, not as an appendix.

Keep these authorities separate:

- The approved requirement source owns **what and why**.
- The design document owns **how and how it will be proved**.
- The implementation owns code and executed evidence.
- A named human reviewer owns approval. Never approve the design you authored.

Follow repository instructions and an established design template when they are
stronger. Otherwise, use
[design-document-template.md](references/design-document-template.md). Read it
completely before drafting. Read
[test-design.md](references/test-design.md) completely before deriving tests.
Read [foundations.md](references/foundations.md) only when adapting the method or
explaining why a control exists.

## Non-negotiable rules

1. **Do not launder requirements.** Trace every externally observable behavior
   to an approved source. Return a product ambiguity to its owner instead of
   choosing a plausible answer in the design.
2. **Ground the design in the repository.** Verify paths, symbols, interfaces,
   dependencies, commands, conventions, generated regions, and prior tests.
   Never invent repository facts.
3. **Make traceability semantic and bidirectional.** Map each requirement,
   invariant, quality target, threat, and compatibility obligation to design
   decisions and verification. Map every decision, changed surface, and test
   back to authority or a named risk.
4. **Design tests around behavior.** Prefer the fewest stable public seams that
   expose the required behavior. Test observable state and outcomes, not private
   methods, collaborator call choreography, or the proposed implementation.
5. **Use independent oracles.** Derive expected results from the requirement,
   contract, worked example, trusted model, or known literal—not by repeating
   the planned algorithm.
6. **Plan real TDD.** Enumerate the test catalog for review, then order it into
   vertical slices executed one test at a time: red, minimal green, refactor.
   Never instruct the implementer to write the entire suite before production
   code.
7. **Resolve decisions before approval.** A material open question, unsupported
   assumption, unknown test oracle, or unverified integration point makes the
   document `BLOCKED`, not implementation-ready.
8. **Scale detail to risk.** Include only views and controls that answer a
   reviewer concern. Do not omit an applicable concern; do not fill the document
   with ritual `N/A` sections, mandatory diagrams, or invented alternatives.
9. **Keep one coherent delivery unit per design.** Split work that cannot be
   reviewed, implemented, and verified as one bounded change.
10. **Do not implement.** Include exact interfaces, schemas, state tables,
    equations, or short decision-rich pseudocode only when they remove ambiguity.
    Do not include copy-paste method bodies or test code.

## Status model

Use exactly these states unless the repository defines stronger ones:

- `DRAFT`: still resolving or writing the design.
- `BLOCKED`: missing authority, evidence, feasibility, or a material decision.
- `READY FOR REVIEW`: author checks pass; an accountable human has not approved.
- `APPROVED`: a named human approved this exact revision; implementation may
  begin.
- `SUPERSEDED`: another design revision replaced this one.

Record reviewer, date, and design revision when changing to `APPROVED`. Any
material post-approval change returns the document to `READY FOR REVIEW`.

## Workflow

### 1. Resolve authority and local conventions

Read the relevant repository instructions, design templates, governing
requirements or issue, acceptance examples, ADRs, architecture docs, source,
nearby tests, dependency manifests, CI configuration, and build/test commands.
Determine:

- the authoritative requirement IDs and exact revision;
- the accountable product and technical owners;
- the intended delivery unit and design-file location;
- whether the change is greenfield, brownfield behavior, defect correction,
  refactor, migration, or exploratory work;
- the repository's persistence and approval conventions.

If no formal specification exists, use the user's explicit request as the
authority only when it already distinguishes correct from incorrect behavior.
Capture a compact behavior contract and label its source. Ask for clarification
when missing intent would change behavior, scope, architecture, safety, or cost.

### 2. Characterize the current system

Trace the current entry points, call and data flow, state transitions, side
effects, failure boundaries, callers, consumers, and deployment path. Record
only facts that constrain this change, each with repository evidence.

For brownfield work, state current behavior and behavior that must remain
unchanged. For a defect, state the minimal reproduction and observed versus
required outcome. For greenfield work, identify the integration points and
explicitly state that no behavioral baseline exists.

### 3. Challenge readiness before designing

Confirm that scope, non-goals, behavior, permissions, failure/recovery
semantics, compatibility, and measurable quality targets are sufficiently
defined for the risk. Separate:

- product gaps, which return to the requirement owner;
- architecture decisions, which follow the repository's ADR policy;
- bounded implementation decisions, which belong in this document;
- unknown feasibility, which requires focused investigation or a disposable
  prototype before approval.

Ask only decision-bearing questions that cannot be answered from evidence. Ask
in a small batch, explain the impact, and give a recommendation when evidence
supports one. Do not draft around a material unknown.

### 4. Design the smallest coherent change

Define the exact modules, files, generated sources, interfaces, schemas,
invariants, state transitions, runtime sequence, error mapping, side effects,
dependencies, and integration call sites that must change. Preserve established
architecture unless the approved scope requires changing it.

Use an impact screen for dependencies and external services, configuration and
secrets, data and migration, API and compatibility, security and privacy,
reliability and concurrency, performance and resources, observability,
deployment and rollback, and accessibility or interaction. Expand only the
applicable concerns with concrete decisions and verification.

For a consequential or uncertain choice, compare at least two viable shapes and
record the selected option and trade-off. Do not manufacture alternatives for
obvious local decisions. Use a diagram only when it communicates relationships,
ordering, state, or deployment more clearly than short prose or a table.

### 5. Derive the test design before the task sequence

Build a test basis from requirements, rules, examples, invariants, quality
targets, threats, failure modes, unchanged behavior, and prior defects. Then:

1. Select the smallest reliable test level and highest stable seam that can
   observe each behavior.
2. Apply the techniques in [test-design.md](references/test-design.md) to derive
   a small discriminating set of cases.
3. Specify every case with a stable verification ID, repository-conventional
   name and location, trace links, level and seam, setup, stimulus, observable
   result and forbidden side effects, independent oracle source, test data,
   boundary doubles, deterministic controls, and expected pre-change signal.
4. Mark new behavior and regression cases `RED` with the precise expected
   failure. Mark characterization cases `GREEN BASELINE` and explain the
   behavior they freeze. A new-behavior test that already passes needs
   investigation.
5. Identify exact focused and full-suite commands. If a command or environment
   is unknown, record the gap and do not invent it.
6. Give every in-scope requirement and material risk adequate evidence. Use
   inspection, analysis, measurement, security review, accessibility evaluation,
   or a rehearsal when an automated example is not the right oracle.
7. Remove redundant cases. Retain multiple cases only when they cover distinct
   partitions, boundaries, rules, transitions, failure points, platforms, or
   risks.

Spend more design detail on seams, data, oracles, and failure discrimination
than on incidental implementation mechanics.

### 6. Order one-test-at-a-time TDD slices

Create dependency-ordered vertical slices. Use a walking skeleton first when
the change crosses a new integration path. For each slice, name:

- the next failing verification case;
- the minimum externally observable capability needed to make it pass;
- the expected changed surfaces;
- the focused command and completion signal;
- any safe refactor after green.

Within a slice, run one red-green-refactor cycle before starting the next case.
Keep migrations, contract changes, and shared test infrastructure early enough
to unblock later behavior, but never create speculative framework code.

### 7. Draft and compress

Draft with the repository template or the bundled fallback. Prefer compact
tables for exact mappings and prose for rationale. Link to authoritative
material instead of restating it. Delete instructions and empty optional
subsections from the finished artifact after the impact screen records why they
do not apply.

Do not modify source, tests, backlog items, changelogs, or external systems
unless the user separately authorizes that work or the repository explicitly
defines it as part of creating the design artifact.

### 8. Run the readiness gate

Set `READY FOR REVIEW` only when all author checks pass:

- Authority, scope, non-goals, baseline, and unchanged behavior are explicit.
- No material product or technical decision remains open.
- Every repository fact and chosen dependency has current evidence.
- Interfaces, data, runtime behavior, errors, and applicable quality concerns
  are concrete enough to implement without interpretation.
- Every requirement and material risk maps to a decision and adequate
  verification; every decision, changed surface, and verification case maps
  backward.
- Every automated case has a stable seam, discriminating independent oracle,
  controlled setup, data/doubles plan, and expected pre-change signal.
- TDD slices are vertical, dependency-ordered, and executable one case at a
  time with known commands.
- Migration, compatibility, rollout, observability, and rollback are safe where
  applicable.
- Risks have detection, mitigation or fallback, and an owner.
- The document contains no disguised requirement, invented fact, code dump,
  checklist theatre, or unexplained scope.

If a check fails, fix it or set `BLOCKED` and name the owner and resolution
needed. Present `READY FOR REVIEW` as an author assessment, never as approval.

## Handoff

When presenting the artifact, report:

- path, design revision, and status;
- governing requirement revision and delivery scope;
- material decisions and consequential trade-offs;
- verification count by level, complete traceability status, and first TDD case;
- blockers, residual risks, and the single approval decision needed.

After a named human approves, record the approval and hand implementation the
approved design revision, first TDD slice, focused command, and baseline
evidence. Instruct the implementer to stop and return to the owning artifact if
code discovery invalidates a requirement, design decision, test oracle, or risk
assumption.

## Reject these patterns

- A generic template filled without repository evidence.
- A new observable behavior hidden in a technical decision or test expectation.
- File lists without responsibilities, contracts, or integration points.
- Large code or pseudocode blocks standing in for design rationale.
- Test names without setup, stimulus, observable oracle, and traceability.
- Tests against private methods or mocks of internal collaborators.
- Tautological assertions that reproduce the proposed algorithm.
- Happy-path-only coverage, arbitrary coverage quotas, or one test per method.
- Uncontrolled time, randomness, concurrency, network, or shared state.
- A bulk “write all tests, then implement” phase labeled as TDD.
- Mandatory alternative counts, diagrams, or sections with no decision value.
- `N/A`, “follow existing pattern,” or “handle errors” without evidence.
- Open questions or unowned risks in a document marked ready.
- Implementation-completion checkboxes in a pre-implementation gate.
