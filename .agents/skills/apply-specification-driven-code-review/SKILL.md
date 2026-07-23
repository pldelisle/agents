---
name: apply-specification-driven-code-review
description: Perform independent, evidence-backed review of specification-driven changes across constitutions, feature specifications, plans, tasks, contracts, tests, code, migrations, dependencies, and technical designs. Use for SDD, Spec Kit, Kiro, spec-first, spec-anchored, or spec-as-source review; spec-to-code conformance; bidirectional traceability; artifact drift; agent-generated change review; pre-merge review; secure code review; architecture review; and regression-risk assessment. Do not use to implement the change, approve product intent, or redefine requirements.
---

# Specification-Driven Code Review Standard

## Mission

Determine independently whether a specification-driven change forms one coherent,
traceable chain from approved intent through plan, tasks, implementation, and objective
evidence—and whether the realized change is correct, secure, appropriately designed,
maintainable, and supported by sufficient evidence. Find consequential defects at both
artifact and code level without blocking sound work over personal preference.

Treat review as an engineering investigation, not a checklist recital. Understand the
change, form risk hypotheses, try to disprove them, and report only findings that are
specific, reachable, actionable, and supported by evidence.

Read [specification-driven-development.md](references/specification-driven-development.md)
completely before every substantive SDD review. Apply its authority, rigor, artifact,
traceability, change-control, and agent-safety model together with this review standard.
Read [sdd-research.md](references/sdd-research.md) only when comparing SDD frameworks,
adapting this method, or explaining why a control exists.
Read [sdd-review-template.md](references/sdd-review-template.md) before creating a durable
review record or when the artifact chain is too complex for a short findings report.

## Reviewer contract

- Remain read-only by default. Do not edit the reviewed change, requirements, or backlog
  unless the user separately authorizes implementation.
- Review the change independently of the author's confidence, explanations, and test
  results. Treat them as evidence to verify, not conclusions to inherit.
- Protect user data, credentials, and security-sensitive details. Never reproduce a live
  secret or provide unnecessary exploit detail in a public-facing finding.
- Review the changed behavior and the minimum surrounding system needed to understand it.
  Do not turn a bounded review into an audit of unrelated legacy code.
- Report a pre-existing problem only when the change worsens it, relies on it, makes it
  reachable, or the user explicitly requested a broader audit.
- Separate product acceptance from technical review. Do not redefine intended behavior;
  identify missing or contradictory requirements as review uncertainty.
- Never claim that absence of findings proves correctness. State the inspected scope,
  evidence obtained, checks not run, and remaining material uncertainty.

## SDD reviewer contract

- Establish the specification authority model, persistence model, rigor lane, governing
  artifact paths, exact revisions, and approval state before assessing conformance.
- Treat an approved feature specification as authority for intended observable behavior,
  the technical plan as authority for the accepted approach, and tasks as execution
  records. Treat code as the realization, not permission to rewrite intent after the fact.
- Review the artifact chain in both directions. Detect omitted requirements on the way
  forward and unapproved code, tests, tasks, dependencies, and abstractions on the way back.
- Distinguish **requirement defect or ambiguity**, **plan contradiction**, **task coverage
  gap**, **implementation non-conformance**, **verification weakness**, and **untraced
  scope**. Route each concern to the artifact and owner that can actually resolve it.
- Independently reconstruct important requirements and paths. Give less weight to tests or
  checklists produced by the same agent that authored the spec and implementation unless
  their oracle is independently justified.
- Never repair drift by accepting whichever artifact changed last. Require an explicit
  source-level decision, impact analysis, revised baseline, and downstream reconciliation.
- If the repository has no complete SDD packet, continue useful review but label the
  verdict partial and identify the smallest missing artifact or decision needed.

## Review priority

Apply this order when concerns compete:

1. Prevent security compromise, privacy breach, data loss, corruption, and unsafe action.
2. Preserve explicit requirements, observable behavior, public contracts, and compatibility.
3. Protect domain invariants, architectural boundaries, and trustworthy state transitions.
4. Ensure failure safety, concurrency correctness, operability, and bounded resource use.
5. Keep the design understandable and economical to change.
6. Enforce style only when a repository rule or material readability problem justifies it.

Approve once the change improves or preserves overall system health and no material defect
remains. Do not demand perfection, speculative generality, or unrelated cleanup.

## Select review depth

Perform the core workflow for every review. Increase depth based on consequence and change
surface, not diff size alone.

Treat a review as elevated risk when the change affects any of these:

- trust boundaries, identity, authentication, authorization, tenancy, or privileged actions;
- secrets, cryptography, personal or regulated data, logs, telemetry, exports, or deletion;
- parsers, deserialization, templates, shell/database queries, file paths, or untrusted input;
- dependencies, build scripts, package resolution, CI/CD, infrastructure, or deployment;
- persistence schemas, migrations, transactions, caches, distributed state, or concurrency;
- public APIs, compatibility, money, irreversible side effects, or high-availability paths;
- agents, model prompts or output, tool execution, connectors, or external data egress;
- a cross-layer design, new architectural mechanism, or broad refactor.
- spec-as-source generation, generated regions, specification tooling, artifact templates,
  policy gates, traceability automation, or the SDD workflow itself.

For elevated security risk, read and apply [security-review.md](references/security-review.md)
in full. For cross-boundary design or material refactoring, read and apply
[architecture-and-refactoring.md](references/architecture-and-refactoring.md) in full. Read
[foundations.md](references/foundations.md) when adapting the method or resolving a conflict
between review practices.

## Core workflow

### 1. Establish the review target

Identify exactly what is under review before judging it:

- determine the base and head revisions, working-tree state, staged and unstaged changes,
  generated files, and whether the supplied diff is complete;
- read applicable `AGENTS.md`, repository conventions, issue or story specification,
  acceptance examples, design records, and public contracts;
- discover `.specify/`, `specs/`, `.kiro/specs/`, generated-code markers, contract files,
  trace matrices, decision records, and the project constitution or equivalent;
- identify whether the packet is Lite, Standard, High assurance, or Exploratory and whether
  its artifacts are living, flow-forward, or flow-back;
- state the intended outcome in observable terms and list any missing evidence that limits
  the review;
- preserve unrelated work and do not mutate tracked files while gathering evidence.

If the base, intended behavior, or relevant artifact cannot be established, continue with
safe inspection where useful but label the review partial. Do not invent the missing contract.

### 2. Build a semantic change map

Read the change description and broad diff first. Then inspect complete changed files and the
relevant callers, callees, tests, schemas, configuration, and runtime wiring. Map:

- user-visible behavior and domain rules being added, removed, or altered;
- entry points, outputs, actors, assets, permissions, and externally controlled inputs;
- control flow, data flow, state transitions, persistence, side effects, and failure boundaries;
- public and internal contracts, compatibility expectations, and downstream consumers;
- new dependencies, configuration, privileges, network access, and operational assumptions.

Build a compact conformance map as you inspect:

```text
Goal -> Requirement -> Rule / NFR -> Example -> Plan decision
     -> Task -> Changed surface -> Verification condition -> Observed result
```

Assign each relevant link `covered`, `partial`, `contradicted`, `blocked`, or `not
applicable`. A matching identifier is not evidence of semantic coverage. Investigate every
changed surface that has no upstream authority and every in-scope requirement that has no
downstream realization or evidence.

Distinguish facts observed in artifacts from hypotheses and unknowns. A list of changed files
is not a change map; explain how behavior moves through the system.

### 3. Review the design before the lines

Ask whether the change belongs in this system and in these components. Evaluate:

- whether responsibilities and invariants sit with the component that has the knowledge to
  enforce them;
- whether dependency direction follows established boundaries and stable policy remains
  independent of replaceable frameworks and transports;
- whether the design introduces hidden coupling, duplicated knowledge, temporal coupling,
  global state, or an unnecessary abstraction;
- whether failure, retry, rollback, migration, compatibility, and partial-completion behavior
  are explicit where relevant;
- which quality attributes the decision improves or weakens: security, modifiability,
  reliability, performance, availability, observability, usability, and testability;
- whether a realistic scenario contradicts an architectural assumption.

Do not reject a small, direct design for lacking layers or patterns. Do not accept a locally
clean diff that creates a system-level inconsistency.

### 4. Inspect behavior path by path

Trace each meaningful path from input to observable result, including the return path and
side effects. Inspect only applicable classes of risk, but do not skip a class merely because
tests pass.

#### Contract and correctness

- Compare behavior with every explicit rule and acceptance example.
- Check boundary values, empty and absent values, duplicates, ordering, precision, timezones,
  encoding, and malformed inputs.
- Check state-machine legality, invariants before and after mutation, idempotency, and repeated
  execution.
- Check public API, serialization, schema, configuration, and command compatibility.
- Look for behavior silently removed or broadened by renames, defaults, fallbacks, or error
  handling.

#### Failure, resources, and concurrency

- Follow exceptions and error values to the boundary that owns recovery or reporting.
- Check partial writes, cleanup, rollback, retry safety, timeouts, cancellation, and duplicate
  delivery.
- Check ownership and lifetime of files, sockets, transactions, tasks, locks, and temporary
  data.
- Look for check-then-act races, lost updates, unsafe shared state, deadlocks, unbounded work,
  blocking in asynchronous paths, and ordering assumptions.
- Verify that failure does not report false success or leave authorization or data state in a
  less safe condition.

#### Data and operability

- Trace each new or changed field across validation, transformation, storage, caching,
  serialization, logging, telemetry, export, and deletion.
- Check query count, batching, pagination, memory growth, algorithmic cost, and payload size
  where the path can scale.
- Require logs, metrics, or traces only when they answer a concrete operational question.
  Check that observability is actionable, non-duplicative, and safe for sensitive data.
- Check rollout, migration, backward compatibility, and rollback for changes that cross
  deployment versions.

#### Code clarity

- Verify that names reveal domain purpose, units, ownership, and side effects.
- Look for mixed abstraction levels, misleading comments, overly broad exception handling,
  unreachable branches, and duplicated business knowledge.
- Use code smells as prompts to investigate change risk, not as proof of a defect. Require a
  concrete consequence before filing a finding.
- Prefer a small refactoring direction that preserves behavior. Do not prescribe redesign
  when a local correction resolves the demonstrated problem.

### 5. Perform security triage on every change

Always ask:

- Does the change add or move a trust boundary, entry point, privileged action, or data flow?
- Can a less-privileged actor influence the operation, object identifier, policy input, path,
  query, command, template, parser, redirect, or external request?
- Can credentials, tokens, personal data, source code, prompts, tool output, or internal
  metadata reach logs, errors, caches, artifacts, third parties, or unauthorized users?
- Does the change add a dependency, install/build hook, executable artifact, permission,
  network destination, or mutable supply-chain input?
- What abuse becomes possible if an input, caller, dependency, model output, or external
  service is malicious rather than merely malformed?

If every answer is demonstrably no, record security as baseline-only and continue. If any
answer is yes or uncertain, apply the full security reference and construct a focused threat
model. Security review is risk-triggered; security triage is mandatory.

### 6. Evaluate verification evidence

Map requirements, invariants, failure modes, and threats to evidence. Inspect tests as
production-quality code and ask whether they could pass while the implementation is broken.

- Prefer behavior-level assertions over implementation coupling.
- Require a regression test for a defect when practical and a boundary test when a contract
  crosses components.
- Check relevant success, boundary, invalid-input, permission, failure, retry, migration, and
  concurrency cases according to risk.
- Check deterministic control of time, randomness, scheduling, external services, and global
  state.
- Treat excessive mocking, permissive assertions, snapshot churn, and tests that restate the
  implementation as weak evidence.
- Run focused repository-defined checks when safe. Then run broader required checks in
  proportion to risk. Do not invent commands the repository does not define.
- Treat static analysis, scanners, coverage, and passing tests as evidence with false-positive
  and false-negative limits, never as substitutes for reasoning.
- Recheck repository status after commands and report checks that rewrote or created material
  artifacts.

For SDD changes, also verify:

- specification examples and quality thresholds were translated into discriminating
  evidence at appropriate levels rather than mechanically copied into permissive tests;
- negative space, forbidden side effects, unchanged behavior, and high-risk invariants have
  evidence where the spec makes them relevant;
- contract/schema/model validation checks the same revision implemented by the change;
- requirements checklists validate specification quality but are not misrepresented as
  runtime conformance evidence;
- a spec-as-source change modified the authoritative input and reproducibly regenerated the
  output instead of hand-editing generated regions;
- failures led to the owning artifact being corrected and rebaselined, not to weakened tests
  or undocumented divergence.

### 7. Validate each candidate finding

Before reporting a finding, establish all of the following:

1. Point to the narrowest relevant location in the changed code or design.
2. Describe the concrete trigger and reachable execution or data path.
3. State the violated requirement, invariant, security property, or operational expectation.
4. Explain the observable impact and affected actor or system.
5. Confirm that the change introduced, worsened, or newly exposed the problem.
6. Rule out nearby guards, callers, framework guarantees, tests, and repository conventions
   that could invalidate the claim.
7. Give a bounded remediation direction without implementing the fix.

If evidence is incomplete, investigate further. If the concern remains plausible but cannot
be demonstrated, report it as an open question or residual risk, not a defect. Omit purely
subjective preferences and speculative future-proofing.

## Severity and disposition

Assign severity from demonstrated impact and plausible reachability. Do not inflate severity
to gain attention.

- **P0 — critical:** readily exploitable broad security compromise, active credential
  exposure, irreversible data loss or corruption, or a change unsafe to deploy at all.
- **P1 — high:** breaks a core requirement or common path, permits meaningful authorization
  bypass or sensitive-data exposure, corrupts durable state, or creates a likely severe
  operational failure. Block until resolved.
- **P2 — medium:** causes a real but bounded failure under a credible condition, weakens an
  important defense, or leaves a significant contract or recovery gap. Normally resolve
  before merge unless risk is explicitly accepted by the proper owner.
- **P3 — low:** limited-impact defect or maintainability problem with a demonstrated cost.
  Distinguish it from an optional suggestion.

Use confidence separately: high when directly reproduced or structurally certain; medium
when the path is supported but an environmental assumption remains; low only for questions,
not asserted findings.

Recommend **block** for any unresolved P0 or P1, unmet acceptance outcome, or review evidence
too incomplete to assess a high-risk change. Also block an unapproved requirement change,
material spec/plan/code contradiction, or untraceable high-risk behavior. Recommend
**comment** for bounded P2/P3 findings.
Recommend **approve** only when no material finding remains and evidence is proportionate to
risk. Approval is a technical recommendation, not product acceptance or deployment authority.

## Review output

Lead with findings ordered by severity. Use this structure for each finding:

```text
[P1] Imperative, consequence-focused title
Location: path/to/file.py:line
Evidence: What the changed code does and the reachable trigger.
Impact: Who or what is affected and how.
Direction: The smallest outcome the correction must achieve.
Confidence: High | Medium
```

Keep locations narrow and comments self-contained. Address the code, not the author. Clearly
label blocking requirements, questions, and optional suggestions.

After findings, report:

1. **Verdict:** block, comment, or approve.
2. **Artifact baseline:** authority, persistence model, rigor lane, paths, revisions, and
   approval state used for the review.
3. **Traceability summary:** requirements covered, partial, contradicted, blocked, orphaned,
   or not applicable, plus any untraced changed surfaces.
4. **Review scope:** revisions/diff and behavioral surfaces inspected.
5. **Evidence:** tests, analysis, commands, and results independently verified.
6. **Residual risks:** relevant paths, environments, or security assumptions not verified.

If there are no findings, say so directly, then provide the same scope, evidence, and residual
risk sections. Never pad an empty review with low-value comments.

## Re-review

On a subsequent pass:

- re-read the new diff rather than only the author's response;
- re-read every changed governing artifact and confirm the implementation still targets the
  same approved revision;
- verify each finding against the actual correction and check for adjacent regressions;
- review newly introduced code to the same standard;
- mark findings resolved, still present, or superseded with evidence;
- do not reopen settled preferences without new technical evidence.
