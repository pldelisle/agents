# Test Design Reference

Use this reference to choose high-yield tests for non-trivial behavior. Apply only techniques that
address a credible risk or contract.

## Contents

- Functional modeling
- Boundary and combinatorial design
- Contracts and data
- State, failure, and concurrency
- Generated and exploratory testing

## Functional modeling

Start from observable rules, not code branches. Identify actors, preconditions, actions, outcomes,
invariants, and forbidden side effects.

- Use equivalence partitions when many inputs should behave alike. Include one representative per
  meaningful valid and invalid class.
- Use boundary-value analysis at each inclusive/exclusive edge, immediately inside and outside it,
  and at empty, zero, maximum, overflow, and precision transitions where applicable.
- Use decision tables when independent conditions interact. Remove impossible combinations and keep
  each remaining rule tied to a distinct outcome.
- Use examples to clarify requirements, then look for the general rule the examples imply.
- Test absence of an effect when the contract prohibits writes, events, disclosure, retries, or calls.

## Boundary and combinatorial design

Do not multiply every parameter value blindly.

- Prioritize combinations with known interactions, shared state, security significance, or prior
  defects.
- Use pairwise or higher-strength covering arrays for broad compatibility/configuration matrices only
  after encoding invalid constraints.
- Test each supported version boundary and each migration direction that the product promises.
- Include encoding, locale, timezone, daylight-saving, precision, ordering, and case-folding boundaries
  when the domain exposes them.

## Contracts and data

### APIs and protocols

- Assert status or result type, semantic body, headers/metadata, error shape, idempotency, pagination,
  ordering, versioning, and authorization as applicable.
- Validate producer and consumer expectations at both sides of the boundary. A schema-only test does
  not prove behavioral compatibility.
- Exercise timeouts, duplicate delivery, retryable versus terminal errors, rate limits, malformed
  frames, and unknown fields according to the protocol contract.
- Use consumer-driven contracts when they represent actual consumer needs; do not encode hypothetical
  consumers or provider implementation details.

### Persistence and migrations

- Verify constraints, transactions, rollback, isolation assumptions, query semantics, and round trips
  against the real supported database when those properties matter.
- Test upgrades on representative old data, mixed-version compatibility when deployments overlap,
  backfill restartability, rollback limitations, and preservation of unknown or historical values.
- Assert durable state after reconnect or restart when durability is the property under test.

### Events, queues, and jobs

- Test at-least-once delivery, duplicates, ordering scope, redelivery, poison messages, dead-lettering,
  checkpointing, partial batches, and crash recovery as applicable.
- Assert business idempotency and durable outcomes, not broker call order.

### User interfaces

- Prefer role/name/label and user-observable semantics over CSS selectors or DOM structure.
- Test critical journeys with realistic navigation, validation, loading, empty, error, permission, and
  interrupted states.
- Keep end-to-end UI tests few. Put business rules below the UI and verify them narrowly as well.

## State, failure, and concurrency

- Model legal states and transitions. Test each permitted transition, forbidden high-risk transitions,
  repeated commands, and recovery from intermediate states.
- Inject failures before, during, and after side effects to verify atomicity, cleanup, compensation,
  retry safety, and truthful status reporting.
- For concurrency, define the required property first: linearizability, serializability, mutual
  exclusion, eventual convergence, fairness, bounded parallelism, or cancellation.
- Coordinate actors with barriers, latches, or controlled schedulers. Avoid timing races created only
  with sleeps.
- Assert final invariants and intermediate safety properties over repeated schedules. Preserve seeds
  and minimized traces for failures.

## Generated and exploratory testing

### Property-based and metamorphic testing

Write properties that are independently meaningful, such as round-trip preservation, idempotence,
monotonicity, conservation, commutativity under defined conditions, or equivalence after a semantics-
preserving transformation. Constrain generators to valid and intentionally invalid domains. Keep the
shrunk counterexample and seed in failure output; promote important regressions to named examples.

### Model-based and differential testing

Use a small trusted model for stateful behavior. Compare implementations only when their independent
agreement is a valid oracle; shared defects and intentional version differences limit the evidence.

### Fuzzing

Target parsers and trust boundaries with a deterministic harness, bounded inputs, useful seed corpus,
sanitizers where supported, and crash minimization. Assert more than “did not crash” when semantic
invariants exist. Store only safe, minimal reproducer inputs.

### Exploratory testing

Create a time-boxed charter with a target, risk, data, environment, and stopping condition. Record the
path, observations, and reproducible evidence. Use exploration to discover unknown risks; convert
stable high-value findings into automated regression tests when economical.
