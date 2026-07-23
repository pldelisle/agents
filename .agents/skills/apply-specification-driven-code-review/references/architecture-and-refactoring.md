# Architecture and Refactoring Review

Use this reference for changes that cross boundaries, alter system structure, introduce a new
mechanism, or materially refactor existing code. Scale the analysis to the decision; a small
change needs a small model, not a ceremonial architecture exercise.

## Contents

1. Architectural reconstruction
2. Scenario-based analysis
3. Boundary and dependency review
4. State and distributed-systems review
5. Refactoring diagnostics
6. Legacy-code changes
7. Architecture finding standard

## 1. Architectural reconstruction

Reconstruct the architecture actually exercised by the change rather than relying only on
diagrams or directory names:

- identify components, their responsibilities, runtime relationships, and owners of policy;
- identify entry points, data stores, external systems, queues, caches, and privileged services;
- identify synchronous and asynchronous calls, state ownership, and consistency boundaries;
- identify public contracts and the components that can change independently;
- compare this observed model with documented intent and existing dependency direction.

Flag documentation drift only when it creates a real review, maintenance, or operational risk.

## 2. Scenario-based analysis

Translate vague quality claims into concrete scenarios. For each high-priority quality
attribute touched by the change, state:

- **source:** actor or condition producing the stimulus;
- **stimulus:** event, request, failure, attack, or modification;
- **environment:** normal operation, degraded dependency, deployment overlap, peak load, or
  attack conditions;
- **artifact:** affected component, data, or operation;
- **response:** how the system should behave;
- **measure:** observable limit or success criterion.

Example:

```text
When an older worker receives an event emitted by the new API during a rolling deployment,
it rejects or safely ignores unknown optional fields without losing the event, and the event
can still be retried once within the documented processing limit.
```

Use scenarios to expose:

- **risks:** a decision may prevent a required response;
- **sensitivity points:** one decision strongly affects a quality attribute;
- **trade-off points:** one decision improves an attribute while weakening another;
- **non-risks:** important assumptions that evidence demonstrates are adequately handled.

Do not declare an architecture “scalable,” “secure,” or “maintainable” without an operational
scenario that gives the claim meaning.

## 3. Boundary and dependency review

Check whether:

- business rules and invariants remain independent of transport, persistence, serialization,
  vendor SDKs, and user-interface details where the repository architecture expects it;
- the consuming policy layer owns narrow boundary contracts at real variation points;
- translation and validation occur at boundaries and vendor/framework types do not leak
  inward without justification;
- dependency assembly is visible and lifecycle ownership is clear;
- abstractions remove a demonstrated source of coupling rather than hide a single concrete
  operation behind indirection;
- shared utilities contain genuinely shared policy, not unrelated behavior coupled by syntax;
- the change creates a dependency cycle, backchannel, global mutable state, or ordering
  requirement between components that appear independent;
- compatibility responsibility is assigned to the side capable of safely evolving it.

Review a boundary in both directions: valid data flowing inward and results, failures, and
sensitive details flowing outward.

## 4. State and distributed-systems review

For persistent, concurrent, or distributed changes, model state explicitly:

- list legal states and transitions, including retry, cancel, expire, compensate, and recover;
- identify the transaction or atomicity boundary and what becomes visible after partial work;
- identify the source of truth, cache invalidation rule, and reconciliation path;
- determine whether delivery is at-most-once, at-least-once, or effectively-once and whether
  consumers are idempotent under the actual guarantee;
- check optimistic/pessimistic concurrency, versioning, deduplication, and lost-update risks;
- check clock, ordering, partition, and stale-read assumptions;
- test rolling-version overlap and rollback when schemas or messages evolve;
- bound queues, retries, fan-out, memory, and work amplification.

Treat “eventually consistent” as an incomplete statement until the allowed inconsistency,
convergence trigger, failure behavior, and user-visible consequence are known.

## 5. Refactoring diagnostics

Use refactoring literature to identify where a change may be expensive or unsafe to evolve.
Do not report a smell without demonstrating its consequence in the reviewed change.

Investigate these signals:

- **Change amplification / shotgun surgery:** one rule requires coordinated edits in several
  places. Determine whether knowledge is duplicated and whether an edit was missed.
- **Divergent change / mixed responsibilities:** one module changes for unrelated reasons.
  Determine whether the new behavior makes invariants or ownership harder to locate.
- **Feature envy / misplaced responsibility:** code repeatedly reaches into another object's
  data. Determine which component has the knowledge needed to enforce the rule.
- **Data clumps / primitive obsession:** values that travel together or have domain constraints
  are passed independently. Look for swapped values, inconsistent validation, and unit errors.
- **Long method / deep conditionals:** do not use size alone. Look for mixed abstraction,
  hidden state transitions, duplicated branches, or untestable failure paths.
- **Message chains / middle man:** look for boundary leakage and change propagation, not a
  mechanical preference for fewer calls.
- **Parallel inheritance or type switches:** check whether adding one variant requires edits
  across disconnected hierarchies or whether the closed-set assumption is real.
- **Global data / temporal coupling:** check hidden ordering, test interference, concurrency,
  and lifecycle hazards.
- **Speculative generality:** check whether extension points, factories, flags, or interfaces
  have a current consumer and a demonstrated variation pressure.

Recommend a refactoring only when it removes or contains a demonstrated risk. Require that
behavior be preserved, the step be independently verifiable, and the proposed scope remain
proportionate. Separate a required correction from an optional cleanup.

## 6. Legacy-code changes

When behavior is poorly specified or weakly tested:

- characterize current behavior at the nearest stable observable seam before judging change;
- identify a seam where dependencies can be controlled without a broad rewrite;
- distinguish accidental behavior from relied-upon behavior using callers, tests, history,
  documentation, and production contracts;
- prefer a narrow safety net around the changed behavior over snapshotting an entire system;
- challenge “cleanup” that mixes behavior changes with structural movement and makes the diff
  impossible to reason about;
- require migration or compatibility evidence before removing apparently unused behavior.

Lack of tests is not itself a line-level defect. Explain which changed behavior cannot be
trusted and which failure a focused test would detect.

## 7. Architecture finding standard

An architecture finding must connect:

```text
quality-attribute scenario
    -> architectural decision or missing decision
    -> concrete failure or change-cost mechanism
    -> affected product or operational outcome
    -> bounded remediation direction
```

Avoid findings such as “violates SOLID,” “not clean architecture,” “too coupled,” or “use a
design pattern.” Name the affected scenario, dependency, invariant, or modification and show
why the current decision cannot satisfy it.
