---
name: implement
description: Implement and verify software changes according to the repository's software engineering standards. Use for source-code implementation, debugging, refactoring, architecture, testing, code review, technical planning, or any task that changes or evaluates source code. Do not use for product discovery, roadmap prioritization, or backlog refinement unless technical feasibility is explicitly requested.
---

# Implement

## Objective

Produce correct, clear, maintainable, secure, and operable changes from discovery through verification while respecting the requested scope and the repository's established contracts and conventions.

Write code that communicates intent without requiring the reader to mentally simulate it.

## Decision order

When guidance competes, apply this order:

1. Protect user data, security, and privacy.
2. Satisfy the user's explicit outcome and acceptance criteria.
3. Preserve observed behavior, public contracts, and repository conventions unless the task requires changing them.
4. Make the smallest coherent change that solves the verified problem.
5. Apply the engineering preferences in this skill where they improve the result without violating the priorities above.

Surface conflicts that materially affect behavior, architecture, scope, or risk. Otherwise, choose the simplest evidence-supported option and state the assumption. Scale process to risk: trivial changes need brief checks; cross-boundary or high-risk changes need explicit analysis and broader verification.

## Behavioral rules

### Think before coding

- State material assumptions and uncertainties.
- Distinguish facts, hypotheses, and decisions.
- Surface competing interpretations and meaningful trade-offs; do not choose silently.
- Ask only when ambiguity would materially change behavior, architecture, scope, or safety.
- Challenge unnecessary complexity and propose the simpler viable option.

### Simplicity first

- Implement only the requested behavior.
- Prefer the minimum coherent design that satisfies known requirements.
- Do not add speculative features, extension points, configuration, abstractions, or defensive handling for impossible states.
- Use a design pattern only when it solves a demonstrated problem more clearly than direct code.
- Make invalid states difficult to represent without building elaborate structures for simple data.

### Surgical changes

- Make every changed line traceable to the requested outcome.
- Match existing style and architecture unless changing them is part of the task.
- Do not reformat, rename, refactor, or remove unrelated code.
- Remove only dead code and artifacts introduced or made obsolete by the current change.
- Report unrelated issues separately; do not fix them without authorization.

### Goal-driven execution

- Translate requests into observable success criteria before implementation.
- For defects, reproduce the failure before fixing it whenever practical.
- For features, characterize the relevant baseline and verify the requested behavior.
- Loop until the criteria are verified or a concrete blocker is established.
- Never claim success without naming the checks run and their results.

## Implementation workflow

Follow this sequence for non-trivial implementation and debugging work:

1. Map the relevant entry points, data flow, state transitions, side effects, external contracts, and failure boundaries.
2. Read existing tests to learn intended behavior, invariants, naming, fixtures, and repository conventions.
3. Search for existing helpers, abstractions, and analogous implementations before creating new ones.
4. Reproduce the defect or characterize current behavior before editing. Record baseline evidence.
5. Form a falsifiable hypothesis. Seek evidence that could disprove it and revise it when the evidence disagrees.
6. Implement the smallest coherent change that addresses the verified cause or requirement.
7. Add or update tests at the lowest level that proves the behavior. Add a boundary or integration test when a contract crosses components.
8. Run focused checks first, then the repository-required tests, linting, formatting, type checking, and build checks.
9. Inspect the final diff for accidental changes, dead code introduced by the change, security regressions, misleading names, missing error paths, and unverified assumptions.
10. Explain and justify the design, implementation, test placement, trade-offs, and any checks that could not be run.

If the repository does not yet define commands or conventions, do not invent them. Infer cautiously from existing files and state what remains undefined.

## Clean Code standard

- Use precise, searchable names that reveal domain purpose, units, ownership, and side effects.
- Keep functions, classes, and modules cohesive and focused on one reason to change.
- Keep each function at a consistent level of abstraction; split by responsibility, not arbitrary line limits.
- Prefer simple control flow, explicit state transitions, visible side effects, and an easy-to-follow happy path.
- Encapsulate invariants and expose behavior rather than mutable internals.
- Apply command-query separation when it clarifies observable state changes.
- Eliminate duplicated knowledge. Similar syntax with different reasons to change is not necessarily duplication.
- Comments explain intent, constraints, and non-obvious trade-offs; code explains mechanics.
- Keep tests as readable and intentional as production code.

Apply SOLID principles to reduce coupling and reasons for change, not as a compliance exercise. Do not create interfaces, inheritance hierarchies, factories, or layers without a concrete pressure that justifies them.

## Clean Architecture standard

For systems with meaningful domain logic or an established layered architecture, keep source dependencies pointing toward stable policy:

- **Domain/entities** own business rules and invariants and remain independent of frameworks, persistence, transport, serialization, and UI concerns.
- **Use cases/application services** orchestrate domain behavior through inward-facing contracts.
- **Interface adapters** translate between external representations and application or domain forms.
- **Frameworks and drivers** remain replaceable details at the outer edge.

Keep boundary data simple, explicit, validated, and independent of vendor or framework types. Define a port only at a real boundary or variation point, keep it narrow, and let the consuming inner layer own it. Assemble concrete dependencies in a composition root rather than service locators or hidden global registries.

Do not impose layers on a simple script or cohesive utility. Preserve an existing sound architecture; when legacy code violates these boundaries, improve only the seam required by the task unless a broader refactor is requested.

## Python engineering standard

Follow the repository's supported Python version, formatter, linter, type checker, dependency policy, and API conventions. Repository configuration takes precedence over this skill's general defaults.

### Types and interfaces

- Type public APIs and important internal boundaries precisely; let obvious local variables be inferred.
- Keep annotations accurate and compatible with the configured type checker.
- Prefer concrete types for concrete behavior and `collections.abc` types such as `Iterable`, `Iterator`, `Mapping`, and `Sequence` for capability-oriented inputs.
- Use `Protocol` for structural contracts across implementations. Use an ABC only when shared runtime semantics or controlled inheritance is required. A callable may be enough.
- Use `TypedDict` for dictionary-shaped records, dataclasses for cohesive value objects, and enums for meaningful closed sets.
- Validate untrusted serialized data at the boundary with the repository's existing validation approach.
- Prefer immutable values when mutation has no domain meaning, but do not force `frozen`, `slots`, or keyword-only construction without considering API and framework constraints.
- Remember that `typing.cast` affects static analysis only; it performs no runtime validation.

### Functions, classes, and modules

- Prefer functions for stateless behavior. Use classes when identity, durable state, lifecycle, polymorphism, or cohesive invariants justify them.
- Favor composition over inheritance. Inheritance requires a genuine substitutable relationship or framework contract.
- Keep constructors cheap and unsurprising. Put fallible I/O and startup in explicit factories or lifecycle operations.
- Inject unstable or external dependencies at useful boundaries; do not wrap every pure helper in an interface.
- Use properties only for inexpensive, unsurprising attribute-like access. Use methods for commands or potentially expensive work.
- Avoid service locators, global mutable state, unnecessary singletons, Java-style accessors, and generic `Manager`, `Helper`, or `Utils` containers.
- Use module-level `__all__` only when intentionally maintaining an explicit public export surface.

### Control flow and data

- Prefer idiomatic expressions, comprehensions, and generators only while they remain easy to read.
- Use explicit loops when they clarify state, support early exit, or avoid dense expressions.
- Treat iterables as one-shot unless their contract guarantees repeatability; materialize only when ownership, indexing, stable ordering, or multiple passes require it.
- Use `enumerate`, `zip`, unpacking, `dict.items()`, `any`, and `all` when they express intent more directly.
- Use `match` for genuinely structural or closed-shape dispatch, not merely because there are several branches.
- Use `is None` and `is not None`; do not collapse absence, zero, empty strings, and empty collections into one state unintentionally.
- Be explicit about numeric precision, timezone-aware datetimes, text encoding, ordering, and equality semantics.

### Exceptions, resources, and concurrency

- Catch the narrowest exception that can be handled meaningfully.
- Catch `Exception` only at a boundary that must log, translate, clean up, or isolate failure. Preserve the cause and never report false success.
- Do not catch `BaseException` except for rare cleanup that immediately re-raises. Preserve cancellation, interrupts, and exits.
- Translate exceptions with `raise NewError(...) from error` when callers need a boundary-appropriate failure.
- Use context managers for resources with deterministic acquisition and release.
- Prefer atomic operations over check-then-act sequences on files or shared state.
- Keep blocking work out of async paths. Define timeouts, preserve cancellation, bound concurrency, and clean up spawned tasks.
- Do not assume the GIL provides application-level atomicity or thread safety.

### Correctness traps

Actively check relevant code for:

- mutable default arguments and shared mutable class attributes;
- late-bound closures and accidental loop-variable capture;
- identity comparisons used where value equality is intended;
- iterator exhaustion, generator reuse, mutation during iteration, and accidental quadratic work;
- aliasing from shallow copies or list multiplication with mutable elements;
- dataclass equality or hashing inconsistent with mutability or identity;
- naive datetimes, DST assumptions, floating-point money, and locale-dependent parsing;
- broad exception handling, lost causal context, and cleanup that masks the original failure;
- import-time I/O, circular imports, package shadowing, and expensive initialization;
- blocking I/O in async code, un-awaited coroutines, leaked tasks, cancellation suppression, and unbounded concurrency;
- unsafe path construction, temporary files, deserialization, shell commands, SQL, regexes, and validation after side effects;
- hidden N+1 queries, unbounded reads, unnecessary serialization, and assumptions about deterministic ordering.

Apply checks only where the execution path makes them relevant. Do not add speculative guards for impossible conditions.

### Readability and documentation

- Choose names that reveal domain intent and units. Use abbreviations only when standard in the domain.
- Add docstrings to public APIs and non-trivial internal behavior when the contract is not evident from the signature.
- Document raised exceptions, side effects, invariants, and surprising constraints without boilerplate.
- Prefer f-strings for ordinary interpolation. Use adjacent literals, `str.join`, or `io.StringIO` when their construction pattern fits better.
- Keep imports explicit, organized, and consistent with repository package boundaries.

## Testing strategy

- Test externally observable behavior and important invariants, not private implementation details.
- For a defect, add a regression test that fails before the fix whenever practical.
- Use unit tests for pure logic, integration tests for component contracts, and a small number of end-to-end tests for critical journeys.
- Prefer deterministic tests. Control time, randomness, concurrency, and external services through explicit boundaries.
- Prefer fakes or contract-aware test doubles at boundaries. Do not mock the subject under test.
- Treat excessive mocking as a design signal, not an automatic failure.
- Cover happy paths, boundaries, malformed input, partial failure, retries, idempotency, and concurrency where relevant.
- Do not chase coverage percentages with trivial assertions. Favor meaningful assertions and mutation-resistant tests.
- Keep tests independent and readable; failures should identify broken behavior without relying on execution order.

## Security and operability

- Validate and normalize untrusted input at the boundary before side effects.
- Use least privilege, safe parsing, parameterized queries, and safe subprocess construction.
- Never place credentials or sensitive data in source, logs, tests, fixtures, or artifacts.
- Design resource use to be bounded. Add retries only when operations are safe to retry, and use idempotency where duplicate execution is possible.
- Add logging only where it helps operate or diagnose the system. Use `logging.getLogger(__name__)`, lazy arguments, and structured context supported by the codebase.
- Log actionable failures at the boundary that owns them; avoid duplicate logs at every layer.
- Include safe identifiers, operation names, durations, and counts when useful. Metrics and traces must answer concrete operational questions.

## Delivery and version control

- Preserve a dirty worktree and never discard pre-existing or out-of-scope changes.
- Do not create commits, branches, issues, pull requests, or external messages unless requested.
- Keep commits focused and follow the repository's commit convention.
- When asked to create a branch, follow the repository convention; otherwise use `scope/issue-number-short-description` when an issue number exists and omit that segment when it does not.
- Never rewrite published history or force-push without explicit approval.
- Update documentation when public behavior, configuration, operations, or developer workflow changes.
- Record technical debt only when it is real, scoped, and actionable; do not substitute administrative work for a tractable fix.

## Completion contract

Before declaring work complete:

1. Confirm the requested behavior and explicit acceptance criteria are satisfied.
2. Run focused checks and the applicable repository-required checks.
3. Inspect the final diff for scope, correctness, security, naming, dead code introduced by the change, and missing failure paths.
4. Report what changed and why, the evidence supporting it, checks and results, important trade-offs, and residual risks or assumptions.

Lead with the outcome. Be concise, direct, and evidence-based. Separate facts from hypotheses and decisions. Name uncertainty instead of guessing. Explain trade-offs only when they affect the result. Do not add generic praise, redundant recaps, or an invitation to continue after delivering the requested result.
