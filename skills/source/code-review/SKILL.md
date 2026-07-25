---
name: code-review
description: Perform independent, evidence-backed review of code changes, pull requests, diffs, refactors, tests, migrations, dependencies, and design documents against both approved design intent and engineering standards. Use for code review, pre-merge review, design-document review or conformance, architecture review, regression-risk assessment, secure code review, threat modelling, or review of authentication, authorization, secrets, sensitive data, external integrations, CI/CD, infrastructure, and software-supply-chain changes. Do not use to implement the change or redefine product requirements.
---

# Code Review Standard

## Mission

Determine independently whether a change is correct, secure, appropriately designed,
maintainable, and supported by sufficient evidence. Find consequential defects at both
system and line level without blocking sound work over personal preference.

Treat review as an engineering investigation, not a checklist recital. Understand the
change, form risk hypotheses, try to disprove them, and report only findings that are
specific, reachable, actionable, and supported by evidence.

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

## Independent review axes

Evaluate two axes independently so strength in one cannot mask failure in the other:

1. **Design conformance:** determine whether the change faithfully implements its governing
   requirements and approved design document. Requirements own **what and why**; the design
   document owns **how and how it will be proved**. Check for missing or partial outcomes, scope
   creep, behavior that contradicts the design, and implementation decisions with no traceable
   authority. Record the design revision and status; never treat a draft or superseded document
   as approved intent.
2. **Engineering standards:** determine whether the change follows documented repository
   standards and preserves correctness, security, architecture, operability, and maintainability.
   Repository rules take precedence over generic heuristics. Treat a heuristic as a prompt for
   investigation, not as a hard rule.

When the reviewed artifact is itself a design document, assess that revision against its
governing requirements, repository design-document standard, and declared readiness state;
do not require a draft under review to be approved already.

For an implementation review, if no governing requirement or approved design document exists,
continue the engineering-standards review and mark the unavailable portion of design conformance
as not assessed. Missing authority is a finding only when the repository requires it; otherwise
report it as review uncertainty.

For a material review, keep the axes as separate investigative passes. Use parallel subagents
when they are available and allowed: give both the same pinned diff and commit list, give the
design pass the governing artifacts, and give the standards pass the repository rules and
applicable risk references. Independently validate every candidate finding before reporting it.

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
- when the user supplies a fixed point such as a commit, branch, or tag, verify it with
  `git rev-parse --verify <fixed-point>`, pin the merge-base comparison as
  `git diff <fixed-point>...HEAD`, and record `git log <fixed-point>..HEAD --oneline`; use the
  confirmed target branch as the fixed point in a pull-request review;
- when staged, unstaged, or untracked work is in scope, inspect `git diff`, `git diff --cached`,
  and `git ls-files --others --exclude-standard` separately; a three-dot comparison covers
  committed trees, not the working tree;
- verify that the expected diff is non-empty before deep review. Do not silently substitute a
  different base, a two-dot comparison, or a default branch when the requested range is invalid;
- state the intended outcome in observable terms and list any missing evidence that limits
  the review;
- preserve unrelated work and do not mutate tracked files while gathering evidence.

Resolve authority for each review axis without conflating them:

- For design conformance, prefer an artifact or issue the user or pull request identifies, then
  issue or story references in the branch name and commit messages, then matching approved
  requirements, acceptance examples, and design documents under repository conventions. Record
  the exact revision and approval state. Ask for the source only when the missing intent would
  materially change the review; if none exists, mark that portion not assessed.
- For engineering standards, read applicable `AGENTS.md`, `CONTRIBUTING.md`, coding standards,
  language or framework guidance, architecture decisions, public contracts, and repository-
  defined check commands. When a documented local rule conflicts with a generic review
  heuristic, the local rule wins unless it violates a higher-authority safety or contract
  requirement.

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
- Screen for mysterious names, duplicated code or knowledge, feature envy, data clumps,
  primitive obsession, repeated type switches, shotgun surgery, divergent change, message
  chains, middle men, refused bequests, and speculative generality.
- Use code smells as prompts to investigate change risk, not as proof of a defect. Require a
  concrete consequence before filing a finding. Label smell-based concerns as judgement calls,
  let documented repository standards override them, and skip issues already enforced reliably
  by tooling unless the change bypasses or weakens that enforcement.
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
too incomplete to assess a high-risk change. Recommend **comment** for bounded P2/P3 findings.
Recommend **approve** only when no material finding remains and evidence is proportionate to
risk. Approval is a technical recommendation, not product acceptance or deployment authority.

## Review output

Lead with findings ordered by severity. Use this structure for each finding:

```text
[P1] Imperative, consequence-focused title
Axis: Design conformance | Engineering standards
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
2. **Axis summary:** status and finding count for design conformance and engineering standards,
   including the most severe issue within each axis. Do not average the axes into a pass.
3. **Review scope:** fixed point, head, diff form, commits, and behavioral surfaces inspected.
4. **Evidence:** tests, analysis, commands, and results independently verified.
5. **Residual risks:** missing authority, paths, environments, or security assumptions not
   verified.

If there are no findings, say so directly, then provide the same scope, evidence, and residual
risk sections. Never pad an empty review with low-value comments.

## Re-review

On a subsequent pass:

- re-read the new diff rather than only the author's response;
- verify each finding against the actual correction and check for adjacent regressions;
- review newly introduced code to the same standard;
- mark findings resolved, still present, or superseded with evidence;
- do not reopen settled preferences without new technical evidence.
