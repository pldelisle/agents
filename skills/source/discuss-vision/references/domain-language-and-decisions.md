# Product Domain Language and Strategic Decisions

## Contents

1. Purpose and accountability
2. Artifact discovery and lazy creation
3. Canonical language format
4. Active discussion discipline
5. Multiple product contexts
6. Concrete scenario probes
7. Reconciliation with evidence and current behavior
8. Product ADRs
9. Quality gate

## Purpose and accountability

Use product-domain modeling to make vision and strategy precise enough that users, sponsors, go-to-market teams, Product Owners, designers, domain experts, and engineers can reason about the same concepts.

Treat the product-facing domain model as:

- canonical product-specific terms and definitions;
- distinct actors and roles;
- semantic contexts in which terms have stable meanings;
- relationships, ownership meanings, lifecycle states, and boundaries that materially affect strategy;
- explicit translations where contexts legitimately use different meanings.

Do not turn it into a class model, data dictionary, service map, ontology, behavioral specification, or architecture. The Product Manager governs strategic product meaning. Product Ownership governs detailed product behavior and acceptance. Engineering governs technical domains, architecture, schemas, services, events, and implementation names.

Use this as an active discussion discipline. Reading an existing glossary for vocabulary is necessary context, but the protocol applies when the conversation must challenge, resolve, or record the product model.

Use the structure and repository-layout rules from Matt Pocock's
[CONTEXT.md Format](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/CONTEXT-FORMAT.md),
adapted here to product-facing language. Preserve its context heading, short
context description, `## Language` section, opinionated term entries,
`_Avoid_` aliases, root single-context glossary, and root multi-context map.
Keep this Product Manager variant free of implementation detail even though an
engineering context map may legitimately mention technical integrations.

## Artifact discovery and lazy creation

Inspect repository instructions and existing artifacts before choosing a location or name. Look for:

- the Product Vision & Strategy Brief;
- product glossaries, taxonomies, research codebooks, or language sections;
- `CONTEXT.md`, `CONTEXT-MAP.md`, domain dictionaries, or equivalent local conventions;
- strategic decision logs and `docs/adr/`;
- related Product Goals, specifications, policy, analytics definitions, and current-system documentation.

Resolve the layout deterministically:

1. If root `CONTEXT-MAP.md` exists, read it and follow the link for the applicable context.
2. Otherwise, if root `CONTEXT.md` exists, treat the repository as single-context.
3. If neither exists and no stronger repository convention applies, create root `CONTEXT.md` lazily when the first material term resolves.

For a single-context product, keep canonical vocabulary in root `CONTEXT.md` and link it from the Product Vision & Strategy Brief. Do not duplicate the same definitions inside the brief.

For multiple semantic contexts, keep root `CONTEXT-MAP.md` and link each context's `CONTEXT.md` from it. A context glossary may remain at the root or live near the context it governs; the root map makes its location authoritative. Do not substitute a context map embedded only in the vision brief.

Create artifacts lazily:

- create the first glossary section when the first material term is resolved;
- create a context map when two legitimate vocabularies or semantic boundaries must be related;
- create `docs/adr/` only when the first qualifying ADR is needed;
- never create empty files, placeholder taxonomies, or decision records for ceremony.

When approved artifacts disagree, do not silently choose the most convenient source. Record the conflicting definitions, artifact revisions, intended authority, and accountable decision owner.

## Canonical language format

Use this format:

```markdown
# <Product context>

<One or two sentences describing what this context is and why it exists.>

## Language

**Customer**:
The person or organization that enters the commercial relationship and is accountable for payment. A Customer may contain many Users.
_Avoid_: Account, buyer, user
```

Apply these rules:

- Choose one preferred term for one concept within a context.
- List misleading synonyms under `_Avoid_`; do not ban ordinary language outside the governed artifact.
- Include a one- or two-sentence context description below the title.
- Keep the definition to one or two sentences and state what the concept **is**.
- Include only product-specific concepts whose ambiguity could affect research, strategy, experience, policy, metrics, or handoff.
- Exclude general programming concepts even when the repository uses them extensively.
- Keep behavior, validation rules, workflow steps, data shape, and implementation details in their accountable artifacts.
- Preserve participant wording in research evidence even when it differs from the canonical vocabulary.
- Group terms under subheadings only when natural clusters emerge; otherwise keep one flat language list.
- Keep evidence links, trace identifiers, decision rationale, unresolved questions, examples, and change history outside `CONTEXT.md`; link the glossary revision from those owning artifacts instead.

Put relationships, lifecycle rules, and unresolved behavior outside the glossary. Link them from a high-level specification, scenario-probe record, policy, Product Goal, or decision record as appropriate.

## Active discussion discipline

### Walk the dependency tree one decision at a time

Maintain a working tree of unresolved semantic decisions and their prerequisites. Before asking, inspect repository instructions, documentation, source, tests, contracts, schemas, configuration, fixtures, UI text, and existing artifacts. Answer questions about current-system facts from that evidence; ask the user only for intended meaning or a choice the repository cannot establish.

Select the earliest unresolved prerequisite. Present the material evidence, recommend one answer with a concise rationale, ask exactly one question, and wait. State alternatives without turning them into additional questions. If the answer reveals an earlier dependency, return to that branch before proceeding.

After the user answers, update the applicable `CONTEXT.md` before asking the next question. Never save a batch of resolved terms for the end of the session.

### Challenge conflicts immediately

When current language conflicts with an approved definition, quote both meanings concisely and ask for the decision:

> Evidence: `CONTEXT.md` defines “Customer” as the paying organization, while the proposal uses it for an individual User.
>
> Recommendation: Keep Customer for the paying organization and use User for the individual because the roles have different interests and decision rights.
>
> Question: Should this proposal adopt that distinction?

Do not continue reasoning as if the conflict is harmless.

### Sharpen vague or overloaded terms

Propose precise alternatives when words such as `account`, `customer`, `active`, `cancelled`, `order`, `subscription`, `workspace`, `platform`, or `engagement` hide distinct concepts.

Separate actors from containers, commercial relationships, permissions, lifecycle states, and product surfaces. Ask whether two words are synonyms, distinct concepts, or the same concept in different contexts.

### Update resolved language inline

Record a resolved term, avoided alias, or context qualifier in the applicable `CONTEXT.md` when it crystallizes and before later reasoning can reuse the discarded meaning. Keep cross-context relationships and translations in root `CONTEXT-MAP.md`, not the glossary.

Keep unresolved conflicts visibly open with their owner and next decision gate. Do not force consensus merely to make the glossary look complete.

## Multiple product contexts

Create a context map when one global vocabulary would conflate legitimate meanings. A product context is a semantic area where terms have a stable product or business meaning. It may align with a market, business capability, lifecycle stage, or product surface, but it does not prescribe a team or technical boundary.

Use the root-map structure:

```markdown
# Context Map

## Contexts

- [Acquisition](./product/acquisition/CONTEXT.md) — describes prospects, evaluators, and conversion.
- [Entitlement](./product/entitlement/CONTEXT.md) — describes Users, memberships, roles, and access.
- [Commercial](./product/commercial/CONTEXT.md) — describes Customers, contracts, subscriptions, and payment.

## Relationships

- **Acquisition → Entitlement**: a Prospect becomes a User only after identity and access are established.
- **Commercial ↔ Entitlement**: Customer means the paying party; User means a person with access. One Customer can sponsor many Users.
```

For each relationship, state:

- the linked location of each context glossary;
- the meaning on each side;
- whether the concept is shared, translated, handed off, or deliberately separate;
- any unresolved ownership or lifecycle boundary;
- the evidence or decision that governs the translation when consequential.

Infer the current product context from the supplied artifacts and discussion. If more than one context could apply and the distinction would change the meaning, ask before updating the model.

Do not force one canonical word across contexts when different meanings are real. Keep this product-facing map semantic: do not describe APIs, messages, event names, shared types, tables, services, or data ownership. Route those facts to separate engineering documentation.

## Concrete scenario probes

Invent concrete scenarios to expose ambiguity, not to claim observed behavior. Label every invented example `Constructed probe — not research evidence`.

Use this structure:

```text
Given <actor, context, and starting state>,
when <event, exception, or boundary condition>,
which interpretation applies to <term, relationship, state, or ownership>:
the existing concept, a new concept, or a translation between contexts?
```

Probe dimensions such as:

- one person occupying several roles, or several people sharing one role;
- first, last, none, partial, duplicate, or conflicting instances;
- lifecycle transitions such as invitation, activation, suspension, cancellation, renewal, retirement, and restoration;
- partial versus whole-product action;
- ownership transfer, delegation, and revocation;
- buyer, payer, administrator, user, and affected non-user disagreement;
- segment, geography, policy, trust, accessibility, or regulatory exceptions;
- concurrent actions, stale state, delayed effects, and reversals;
- movement from one product context to another.

Record what the probe changed:

- a clarified canonical definition;
- a newly distinct concept;
- a context translation;
- a candidate product rule for Product Owner refinement;
- an unresolved strategic choice with an owner;
- no change because the existing model handled the case.

Do not turn probe outputs directly into detailed acceptance criteria. Do not count scenarios as interviews, observations, demand, prevalence, or validation.

## Reconciliation with evidence and current behavior

Compare intended product meaning with the available evidence:

| Source | What it can establish | Caution |
|---|---|---|
| Approved vision, strategy, policy, or decision | Intended meaning and accountable choices | May be stale or contradicted by later approval |
| User and customer research | Observed language, roles, circumstances, and mental models | Preserve sample and method limits |
| UI, documentation, contracts, and support evidence | Customer-facing meaning and recurring confusion | Current wording may be accidental or inconsistent |
| Analytics and commercial definitions | Operational metric or reporting meaning | A reporting category is not automatically a product concept |
| Current product and code facts | What the system currently distinguishes or permits | Current implementation is not automatically intended strategy |
| Domain experts and engineers | Specialist constraints and current-system interpretation | Attribute the input; do not transfer their accountability |

When sources conflict:

1. State the conflicting meanings and exact sources or revisions.
2. Separate current behavior from intended behavior.
3. Identify the strategic, product-behavioral, policy, or technical decision involved.
4. Route the decision to the accountable owner.
5. Update the glossary, brief, specifications, and downstream links only after the intended meaning is resolved.

Never edit evidence to match the glossary or treat the code as the automatic source of product truth.

## Product ADRs

Use Matt Pocock's
[ADR Format](https://raw.githubusercontent.com/mattpocock/skills/refs/heads/main/skills/engineering/domain-modeling/ADR-FORMAT.md)
for the rare product decision that deserves a durable record. This skill uses
the same file format for product-scope decisions; technical architecture and
technology ADRs remain engineering-owned.

Keep routine and reversible choices in the brief's decision log. The default is
to create no ADR. Offer one only after a real decision has been made and all
three conditions hold:

1. **Hard to reverse:** changing the decision later would carry meaningful strategic, market, customer, organizational, regulatory, or migration cost.
2. **Surprising without context:** a reasonable future reader could mistake the choice for an error or reopen it without knowing why it exists.
3. **The result of a real trade-off:** credible alternatives existed and the accountable owner chose one for specific reasons.

Product-level examples may include:

- product, market, or value-exchange boundaries;
- a deliberate exclusion of a plausible segment or use case;
- a canonical semantic distinction that materially shapes the product;
- a durable cross-context translation or ownership meaning;
- a non-obvious strategic deviation from category convention;
- an external constraint not visible in ordinary product artifacts;
- a rejected direction likely to be proposed again.

Do not use this Product Manager protocol to record technical architecture or technology choices; route those to engineering. Do not record an unapproved hypothesis as a decision.

Do not ask the user to approve an ADR for routine vocabulary, a reversible preference, or a choice with no credible alternative. Most product-domain sessions should sharpen `CONTEXT.md` and produce zero ADRs.

Store ADRs in `docs/adr/` with four-digit sequential names:
`0001-short-slug.md`, `0002-short-slug.md`, and so on. Create the directory
lazily. Scan existing numeric prefixes, find the highest number, and increment
it; do not reuse gaps or renumber existing ADRs.

Use this minimal template:

```markdown
# <Short decision title>

<One to three sentences stating the context, the decision, and why this option won.>
```

That is sufficient for most ADRs. Add only these optional elements when they
provide genuine future value:

- `status` frontmatter with `proposed`, `accepted`, `deprecated`, or
  `superseded by ADR-NNNN`;
- `## Considered Options` when rejected alternatives are worth remembering;
- `## Consequences` when non-obvious downstream effects must be called out.

Keep the accountable owner, date, evidence links, and revisit gate in the
Product Vision & Strategy Brief or decision log rather than expanding the ADR
template. Link the ADR and its current status from that governing artifact. Do
not migrate or rewrite existing decision records unless the user separately
requests it.

## Quality gate

- Canonical terms are product-specific, concise, contextual, and free of implementation detail.
- Each decision-seeking interactive prompt contains one decision question and one recommended answer, and dependent questions wait for prerequisite decisions.
- Repository-discoverable facts are obtained from repository evidence rather than asked of the user.
- Resolved vocabulary is persisted to the applicable `CONTEXT.md` before the next dependent question.
- A single-context repository uses root `CONTEXT.md`; a multi-context repository uses root `CONTEXT-MAP.md` linking the applicable context glossaries.
- Each glossary has a context heading, one- or two-sentence context description, `## Language`, `**Term**:` entries, optional `_Avoid_` aliases, and no non-vocabulary content.
- Distinct actors and roles are not conflated.
- Original research language remains traceable after canonicalization.
- Multiple legitimate meanings are separated by context and connected through explicit translations.
- Consequential relationships, states, exceptions, and boundaries have concrete scenario probes.
- Every constructed scenario is visibly separated from research evidence.
- Contradictions among intended language, evidence, policy, current experience, metrics, and current-system facts are resolved or assigned.
- Product semantic contexts do not prescribe software architecture.
- Glossary changes, specifications, strategy, metrics, and handoff artifacts use compatible meanings or expose their revision mismatch.
- Product ADRs satisfy all three thresholds and use `docs/adr/NNNN-slug.md`.
- Each ADR is a title plus a one- to three-sentence context, decision, and rationale; optional status, considered options, or consequences appear only when useful.
- ADR ownership, date, evidence, and revisit status remain linked from the strategic brief or decision log.
- No ADR is created merely to demonstrate that the protocol was followed.
