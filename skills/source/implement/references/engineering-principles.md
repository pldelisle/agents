# Engineering principles for consequential design work

Read this reference only when an implementation introduces or changes a meaningful module boundary, dependency direction, public contract, or cross-cutting architecture.

## Evidence hierarchy

Apply guidance in this order:

1. Explicit user outcomes, safety constraints, and approved requirements.
2. Repository architecture, contracts, conventions, and observed behavior.
3. Evidence from the changed system and its tests.
4. General design heuristics.

*Clean Code*, SOLID, *Clean Architecture*, code-smell catalogs, and similar practitioner sources are prompts for judgment, not proof that a design is good. Human readability and defect research supports caring about comprehensibility, but evidence for individual smells is mixed. State the concrete maintenance or correctness pressure before invoking a principle.

## Cohesion and information hiding

- Give a module one coherent responsibility and hide decisions likely to change behind a small interface.
- Prefer a deep module that provides useful behavior over several pass-through wrappers that merely rename calls.
- Keep duplicated knowledge in one owner. Similar syntax serving different policies is not necessarily duplication.
- Keep names precise and searchable. Comments should preserve intent, constraints, and non-obvious trade-offs; code should explain mechanics.
- Split functions and modules by responsibility or abstraction level, not arbitrary line limits.
- Add a pattern, port, factory, or hierarchy only when it removes a demonstrated coupling or variation pressure.

## Dependency direction

For systems with meaningful policy or an established layered architecture, keep stable business rules independent of volatile mechanisms:

- domain policy owns invariants without depending on transport, persistence, frameworks, serialization, or UI;
- application behavior coordinates policy through narrow inward-facing contracts;
- adapters translate external representations at the boundary;
- frameworks, providers, storage, and delivery mechanisms remain replaceable outer details.

The consuming inner layer should own a port. Keep boundary data explicit, validated, and free of vendor types. Assemble concrete dependencies at an obvious composition point. Do not impose these layers on a cohesive script or utility.

## Change design questions

- Which decision is likely to change, and where is it hidden?
- Which invariant has one authoritative owner?
- Can a caller use the module without understanding its implementation?
- Does the new seam reduce knowledge or merely move code?
- Are side effects and failure semantics visible at the interface?
- Can the boundary be verified without mocking the subject under test?

Prefer the smallest design that answers these questions well. Improve only the seam required by the current outcome unless a broader refactor is explicitly in scope.
