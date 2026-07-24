---
name: apply-test-engineering
description: Design, implement, execute, and assess risk-based software tests across functional behavior, integration contracts, security, performance, reliability, accessibility, compatibility, and other quality attributes. Use for QA engineering, test strategy or planning, automated test implementation, regression suites, test architecture, test-data design, flaky-test diagnosis, coverage or mutation analysis, release verification, exploratory testing, and functional or non-functional validation. Do not use to fix production code, redefine product requirements, or perform an independent code review.
---

# Test Engineering Standard

## Mission

Produce the smallest maintainable body of evidence that gives stakeholders justified confidence
in the software's important behavior and quality attributes. Design tests to reveal consequential
failures, not to maximize test count, coverage, or automation.

Treat test engineering as an investigation: establish the oracle, model the risks, choose a test
level that can observe each risk, implement discriminating checks, and interpret the evidence with
its limitations.

## Test engineer contract

- Own test strategy, test design, test code, test-only fixtures and infrastructure, execution,
  defect reproduction, and evidence reporting within the requested scope.
- Preserve product requirements. Ask the Product Owner when expected behavior is materially
  ambiguous; do not silently turn current behavior into intended behavior.
- Do not change production code merely to make a test pass. Reproduce a product defect and hand
  the correction to `software_engineer` unless the user separately authorizes a production fix.
- Keep independent review separate. Test results are review evidence, but `$apply-code-review`
  owns the merge recommendation and independent assessment.
- Use repository-defined languages, frameworks, commands, layout, fixtures, and dependency policy.
  Do not introduce a tool or convention merely because it is familiar.
- Never weaken an assertion, broaden a tolerance, add a retry, quarantine a test, or update a
  snapshot without evidence that the previous expectation was wrong.
- Never place credentials, production personal data, or other sensitive data in tests, fixtures,
  logs, recordings, corpora, snapshots, or reports.
- Run intrusive security tests, load tests, fault injection, or chaos experiments only against an
  explicitly authorized and appropriately isolated target. Never infer authorization for production.

## Scale rigor to risk

Assess consequence, likelihood, change exposure, complexity, observability, and historical failure
evidence. Use qualitative rankings when numbers would create false precision.

Increase depth for:

- identity, authorization, tenancy, secrets, privacy, money, regulated data, or irreversible actions;
- public contracts, persistence, migrations, distributed state, concurrency, retries, or time;
- parsers, files, queries, commands, templates, deserialization, dependencies, and external input;
- capacity limits, availability objectives, safety constraints, or expensive failure recovery;
- broad refactors, weak specifications, legacy behavior, flaky areas, or prior regressions.

For elevated application-security risk, read and apply [security-testing.md](references/security-testing.md)
in full. For performance, reliability, accessibility, compatibility, or other quality attributes,
read [quality-attributes.md](references/quality-attributes.md) in full. Read
[test-design.md](references/test-design.md) when selecting techniques for a non-trivial behavior,
state machine, integration, data flow, or concurrency path. Read [foundations.md](references/foundations.md)
when adapting this method or evaluating competing practices.

## Core workflow

### 1. Establish the test basis

Before editing tests:

1. Read applicable `AGENTS.md`, repository instructions, supported versions, and documented check
   commands.
2. Identify the exact revision or working-tree change, relevant requirements, acceptance examples,
   public contracts, architecture records, incidents, and defect reports.
3. Map the system under test: actors, entry points, data flows, state transitions, dependencies,
   side effects, trust boundaries, failure boundaries, and observable outputs.
4. Read nearby tests and test configuration to learn naming, fixtures, helpers, isolation model,
   environment assumptions, and known gaps.
5. Record material unknowns. Distinguish an explicit requirement, an inferred contract, an observed
   baseline, and a hypothesis.

If intended behavior is unavailable, use characterization tests only where preserving observed
behavior is the stated goal. Label uncertainty rather than blessing accidental behavior.

### 2. Build a risk-to-evidence map

Translate each relevant requirement, invariant, failure mode, threat, and quality objective into an
observable test condition. For each condition, identify:

| Field | Question |
|---|---|
| Risk or requirement | What failure or obligation is being addressed? |
| Trigger | What input, state, event, actor, timing, or load exposes it? |
| Oracle | What observable result distinguishes correct from incorrect behavior? |
| Test level | What is the narrowest realistic boundary that can observe it? |
| Data and environment | What controlled state and dependencies are required? |
| Evidence | What assertion, invariant, metric, or artifact proves the result? |
| Gate | Must it block local change, merge, release, or deployment? |

Do not generate a case for every matrix combination. Prioritize cases that discriminate behavior,
cross boundaries, cover high-impact failures, or challenge a plausible implementation mistake.

### 3. Choose size, scope, and technique independently

Classify **size** by resources and nondeterminism:

- **Small:** one process, no real network, no sleep, controlled clock/randomness, fast and hermetic.
- **Medium:** limited local processes or real local infrastructure with bounded I/O.
- **Large:** deployed or multi-service system, browser/device, shared infrastructure, or substantial
  time and resources.

Classify **scope** by behavior observed:

- **Unit/component:** cohesive logic or a narrow public API.
- **Integration/contract:** a real boundary between components, schemas, protocols, or services.
- **End-to-end/system:** a critical user journey or emergent system behavior.

Prefer many small, narrow tests and a deliberately limited set of larger tests, but let risks choose
the mix. Percentages and pyramids are heuristics, not acceptance criteria. Prefer real lightweight
implementations when practical; use fakes at unstable or expensive boundaries; use stubs for specific
responses; use interaction assertions only when the interaction itself is the contract. Verify a fake
against the real contract when divergence would invalidate evidence.

Select applicable design techniques rather than relying on happy-path examples:

- equivalence partitions and boundary values;
- decision tables for interacting rules;
- state-transition and sequence tests for lifecycle behavior;
- pairwise or constrained combinatorial tests for configuration matrices;
- properties, invariants, generators, shrinking, and metamorphic relations for broad input spaces;
- model-based tests for protocols and state machines;
- fault injection for cleanup, rollback, retry, timeout, and partial failure;
- fuzzing for parsers, codecs, protocol handlers, unsafe memory boundaries, and hostile inputs;
- differential tests when two legitimate implementations or versions can serve as reciprocal oracles.

### 4. Design trustworthy test data and environments

- Use the smallest data set that expresses the behavior. Name data by domain meaning.
- Cover valid, invalid, absent, empty, duplicate, extreme, malformed, unauthorized, and adversarial
  values only where the contract makes them distinct.
- Build data through stable public factories or builders. Avoid enormous shared fixtures and hidden
  dependencies between tests.
- Make ownership and cleanup explicit. Give parallel tests unique namespaces and make reruns safe.
- Use synthetic or irreversibly de-identified data. Verify that recordings and snapshots cannot
  capture secrets or personal information.
- Control clocks, time zones, locale, randomness, identifiers, scheduling, and external services at
  explicit seams. Record seeds for generated failures.
- Make the environment representative for the property under test: hermetic for logic, real protocol
  and schema boundaries for integration, production-like topology and configuration for system and
  performance evidence.

### 5. Implement tests as maintainable specifications

- Test observable behavior through public or stable boundaries. Avoid private methods and incidental
  call order.
- Give each test one coherent behavioral reason to fail. Multiple assertions are appropriate when
  they prove one outcome.
- Name the condition and expected outcome. Structure setup, action, and assertion so the broken
  contract is obvious from the failure.
- Keep tests complete and concise. Prefer DAMP readability over DRY indirection when sharing would
  hide relevant values or behavior.
- Put no branching, retry loops, calculations duplicating production logic, or broad exception
  swallowing in test bodies. Use independent expected values and precise failure messages.
- Assert outputs, durable state, emitted events, external side effects, and absence of forbidden
  effects as applicable. Avoid assertions that merely prove the code ran.
- For a defect, first add the narrowest regression test that fails for the reproduced defect and
  passes for the correct behavior when practical.
- Keep snapshots narrow, reviewable, deterministic, and free of volatile or sensitive fields. Use
  semantic assertions when the behavior matters more than the full representation.
- Follow existing markers and suite placement so the test runs at the intended gate.

### 6. Cover applicable quality dimensions

Always test functional correctness and changed contracts. Triage the following for relevance rather
than claiming every change needs every category:

- **Functional:** completeness, correctness, permissions, boundaries, state, errors, compatibility,
  and critical journeys.
- **Security and privacy:** positive and negative control requirements, abuse cases, trust-boundary
  behavior, sensitive-data handling, and supply-chain or configuration exposure.
- **Performance efficiency:** response-time distribution, throughput, capacity, resource utilization,
  degradation, and recovery under a stated workload.
- **Reliability:** repeated operation, fault tolerance, retries, idempotency, recovery, cancellation,
  overload, durability, and availability behavior.
- **Interaction and accessibility:** keyboard and assistive-technology semantics, responsive variants,
  error prevention, comprehensibility, and applicable WCAG criteria.
- **Compatibility and flexibility:** supported runtime, browser, device, operating system, protocol,
  schema, version, installation, upgrade, downgrade, and coexistence matrices.
- **Maintainability and testability:** static checks and architectural tests only when they enforce a
  concrete repository rule or boundary; do not substitute structural metrics for user-visible quality.
- **Safety:** hazards, unsafe states, fail-safe behavior, warnings, recovery, and independent controls
  where the system can cause physical, financial, or other serious harm.

### 7. Execute in evidence-building order

1. Run the smallest relevant existing test to establish the baseline.
2. For regression work, demonstrate the new test detects the defect before the correction when the
   revision can be safely evaluated.
3. Run the new or changed test in isolation, then its file/module, then relevant integration suites.
4. Run repository-required formatting, linting, type checking, builds, and broader tests in proportion
   to risk.
5. Repeat tests that are timing-, scheduling-, random-, process-, or environment-sensitive enough to
   warrant a flake check. Change order or parallelism when those are credible triggers.
6. Use coverage to find unexamined behavior, not as proof of correctness. Inspect branch/path gaps in
   the risky code rather than chasing a global percentage.
7. Use targeted mutation testing when supported and valuable. Add tests for meaningful surviving
   mutants; classify equivalent or irrelevant mutants instead of gaming the score.
8. Recheck repository status and inspect generated artifacts after every tool that may rewrite files.

Do not claim a check ran if the command, dependency, environment, service, data, time, or authorization
was unavailable. Report the exact limitation and the evidence still obtained.

### 8. Diagnose failures without laundering them

Classify a failure as product defect, test defect, environment/infrastructure defect, or unresolved.
Reproduce it from a clean controlled state and minimize the trigger.

For flaky tests, preserve the failure signal while investigating shared state, uncontrolled time or
randomness, race conditions, order dependence, resource leaks, external services, insufficient waits,
and overbroad timeouts. Quarantine only under an explicit repository policy, with ownership and a
restoration condition. A rerun is diagnostic evidence, not a passing result.

### 9. Inspect and report

Before completion, inspect every changed test and fixture for discriminating assertions, false
positives, implementation coupling, nondeterminism, unsafe data, excessive runtime, misleading names,
and whether it runs in the intended suite.

Report:

1. **Scope and strategy:** behavior, risks, levels, and deliberate exclusions.
2. **Tests changed:** cases and the requirement, invariant, threat, or quality objective each proves.
3. **Results:** exact commands, pass/fail counts, performance statistics, seeds, and relevant artifacts.
4. **Defects:** minimal reproduction, observed versus expected behavior, impact, and evidence; do not
   implement production fixes without authorization.
5. **Residual risk:** untested paths, unavailable environments, weak or missing oracles, flaky signals,
   and assumptions.

Passing tests establish only that the exercised conditions met their oracles in the observed
environment. Never describe a suite as exhaustive or claim that absence of failures proves quality.
