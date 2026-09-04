# Python engineering guidance

Read this reference only for Python changes. Repository configuration, supported Python version, public API conventions, formatter, linter, type checker, and dependency policy take precedence.

## Types and interfaces

- Type public APIs and important boundaries precisely; infer obvious locals.
- Prefer concrete types for concrete behavior and `collections.abc` capabilities such as `Iterable`, `Mapping`, and `Sequence` for capability-oriented inputs.
- Use `Protocol` for structural contracts across implementations, an ABC for shared runtime semantics or controlled inheritance, and a callable when it is sufficient.
- Use `TypedDict` for dictionary-shaped records, dataclasses for cohesive values, and enums for meaningful closed sets.
- Validate untrusted serialized data at the boundary. `typing.cast` performs no runtime validation.
- Prefer immutable values when mutation has no domain meaning, without imposing `frozen`, `slots`, or keyword-only construction blindly.

## Structure and control flow

- Prefer functions for stateless behavior and classes for identity, durable state, lifecycle, polymorphism, or cohesive invariants.
- Favor composition. Use inheritance only for a genuinely substitutable relationship or framework contract.
- Keep constructors cheap. Put fallible I/O and startup in explicit factories or lifecycle operations.
- Inject unstable external dependencies at useful boundaries; do not wrap every pure helper in an interface.
- Avoid service locators, global mutable state, unnecessary singletons, and generic `Manager`, `Helper`, or `Utils` containers.
- Prefer idiomatic expressions while they remain readable; use explicit loops for state, early exit, or multi-step behavior.
- Treat iterables as one-shot unless their contract guarantees repeatability.
- Distinguish absence from zero, empty strings, and empty collections. Be explicit about precision, time zones, encoding, ordering, and equality.

## Failures, resources, and concurrency

- Catch the narrowest exception that can be handled meaningfully. Catch `Exception` only at a boundary that logs, translates, cleans up, or isolates failure.
- Preserve causes with `raise NewError(...) from error`; never report false success.
- Use context managers for deterministic resource ownership and atomic operations instead of check-then-act file sequences.
- Keep blocking work out of async paths. Define timeouts, preserve cancellation, bound concurrency, and clean up spawned tasks.
- Do not assume the GIL provides application-level atomicity or thread safety.

## Relevant correctness traps

Check only traps reachable in the changed path:

- mutable defaults, shared class state, late-bound closures, and accidental aliasing;
- iterator exhaustion, mutation during iteration, and accidental quadratic work;
- dataclass equality or hashing inconsistent with identity or mutability;
- naive datetimes, DST assumptions, floating-point money, and locale-dependent parsing;
- broad exception handling, masked causes, import-time I/O, circular imports, and package shadowing;
- blocking async work, leaked tasks, cancellation suppression, and unbounded concurrency;
- unsafe paths, temporary files, deserialization, shell construction, SQL, regexes, and validation after side effects;
- hidden N+1 queries, unbounded reads, and assumptions about deterministic ordering.

Use docstrings where a public or non-trivial contract is not evident from the signature. Document side effects, invariants, raised boundary errors, and surprising constraints without boilerplate.
