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

Apply this Fowler smell baseline to every Standards pass, even when the repository documents no
coding standards. Paste the full baseline into the Standards subagent prompt so that pass does
not depend on context from the Spec axis.

Two rules govern every baseline item:

- **The repository overrides.** Suppress a smell when a documented repository standard endorses
  the design. A higher-authority safety, requirement, or public-contract concern remains valid.
- **Every smell is a judgement call.** Label it `possible <smell>`, never a hard violation. Skip
  anything repository tooling reliably enforces unless the change bypasses that enforcement.
  Demonstrate a concrete consequence in the reviewed change before reporting it.

The always-on baseline is:

- **Mysterious Name** — a function, variable, or type whose name does not reveal what it does or
  holds. Rename it; if no honest name emerges, clarify the underlying responsibility.
- **Duplicated Code** — the same logic shape appears in more than one changed hunk or file.
  Extract the shared shape and call it from both when the copies can drift.
- **Feature Envy** — a method reaches into another object's data more than its own. Move the
  behavior toward the component that owns the data and invariant.
- **Data Clumps** — the same few fields or parameters keep travelling together. Bundle the
  cohesive values into a domain type when that prevents inconsistent use.
- **Primitive Obsession** — a primitive or string stands in for a constrained domain concept.
  Give the concept a small type when it centralizes validation, units, or meaning.
- **Repeated Switches** — the same switch or conditional cascade on the same type recurs across
  the change. Centralize the mapping or use polymorphism when adding a variant otherwise requires
  coordinated edits.
- **Shotgun Surgery** — one logical change forces scattered edits across many files. Gather the
  knowledge that changes together into one module or boundary.
- **Divergent Change** — one file or module is edited for several unrelated reasons. Split
  responsibilities so each module changes for one coherent reason.
- **Speculative Generality** — abstractions, parameters, hooks, flags, or factories are added for
  needs the governing spec does not establish. Delete or inline them until a real variation
  pressure exists.
- **Message Chains** — a caller navigates a long chain such as `a.b().c().d()` and therefore
  depends on intermediate structure. Hide the traversal behind an operation on the owning
  boundary.
- **Middle Man** — a class or function mostly delegates without owning policy, translation, or a
  useful boundary. Remove it and call the real target directly.
- **Refused Bequest** — a subtype ignores or invalidates substantial inherited behavior. Replace
  inheritance with composition when the subtype cannot honor callers' contract.

Also investigate long methods, deep conditionals, global mutable data, temporal coupling, and
parallel inheritance when the change makes state transitions, ownership, concurrency, or
variation unsafe. These are additional architecture signals, not part of the fixed baseline.

Recommend a refactoring only when it removes or contains a demonstrated risk. Require
behavior preservation, independent verification, and proportionate scope. Separate a required
correction from optional cleanup.

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
