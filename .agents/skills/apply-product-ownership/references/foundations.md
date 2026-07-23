# Product Ownership Foundations

When a Product Manager role exists, treat its approved Product Vision & Strategy Brief as upstream strategic context. The Product Manager owns market choice, vision, strategy, strategic outcomes, high-level specifications, and roadmap horizons. The Product Owner remains accountable for Product Goals, Product Backlog content and exact order, detailed product behavior, acceptance outcomes, and readiness. Escalate conflicts between strategy and delivery evidence instead of letting either role silently take over the other's decisions.

Use these sources and design decisions when maintaining or adapting the Product Owner workflow.

## Authoritative role definition

- [The Scrum Guide, November 2020](https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf): Hold the Product Owner accountable for maximizing product value and for effective Product Backlog management—Product Goal, clear backlog items, ordering, and transparency. Preserve the explicit boundary that Developers create the Sprint plan and own sizing.
- [Scrum.org: Product Backlog Refinement](https://www.scrum.org/resources/product-backlog-refinement): Treat refinement as an ongoing collaborative activity that develops clarity and shared understanding; do not treat it as a mandatory Scrum event or a Product Owner-only writing phase.
- [Scrum.org: Evidence-Based Management](https://www.scrum.org/resources/evidence-based-management): Focus goals and measures on customer outcomes, value, feedback, and intentional experiments rather than output or velocity.

## Story and specification practices

- [Agile Alliance: The Three C's](https://agilealliance.org/glossary/three-cs/): Preserve Card, Conversation, and Confirmation. A story artifact does not replace collaboration.
- [Bill Wake: INVEST in Good Stories and SMART Tasks](https://xp123.com/articles/invest-in-good-stories-and-smart-tasks/): Use INVEST as a quality heuristic for backlog items, not as a scoring ritual or a fixed point threshold.
- [Cucumber: Behaviour-Driven Development](https://cucumber.io/docs/bdd/): Build shared understanding through concrete examples, formulate business-readable specifications, and enable engineering to automate those examples where useful.
- [Cucumber: Example Mapping](https://cucumber.io/docs/bdd/example-mapping/): Organize refinement around a story, rules, examples, questions, and newly discovered stories.
- [NASA: How to Write a Good Requirement](https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/): Keep requirements singular, clear, complete enough, implementation-free, consistent, traceable, feasible, and verifiable; replace vague qualities with measurable criteria.

## Public agent and skill review

Use public repositories as pattern evidence, not as authority. Do not copy their content or inherit their assumptions without review.

- [alirezarezvani/claude-skills: agile-product-owner](https://github.com/alirezarezvani/claude-skills/blob/main/product-team/agile-product-owner/SKILL.md): Retain useful emphases on INVEST, concrete acceptance criteria, story splitting, and explicit workflows. Reject PO-authored story points, fixed acceptance-criteria counts, arbitrary universal priority weights, velocity targets, and Product Owner acceptance embedded in the Definition of Done.
- [decodingahmed/ai-product-owner-hack](https://github.com/decodingahmed/ai-product-owner-hack): Retain staged discovery, progressive questioning, explicit assumptions/risks, spikes, and a confirmation gate before external tracker writes. Extend it with engineer interrogation, behavioral specifications, traceability, and readiness evidence.
- [withkynam/vibecode-pro-max-kit: vc-generate-spec](https://github.com/withkynam/vibecode-pro-max-kit/blob/main/.claude/skills/vc-generate-spec/SKILL.md): Retain the separation of product intent from implementation approach and the use of a reviewable specification before planning. Reject permanently freezing the specification; maintain controlled revisions when delivery reveals new product facts.
- [datexland/Jira-Tickets-AI](https://github.com/datexland/Jira-Tickets-AI): Retain assertive interviewing and explicit readiness checks. Reject embedding implementation instructions and generic engineering Definition-of-Done items in every Product Owner story.

## Resulting design choices

- Make goal discovery, engineering challenge, example mapping, specification, readiness, ordering, and learning one accountable Product Owner loop.
- Require a bounded `software_engineer` refinement pass before implementation-bound work becomes Ready.
- Keep product requirements detailed about observable behavior and intentionally open about implementation.
- Let developers own estimates, tasks, architecture, implementation, and verification strategy.
- Keep acceptance criteria story-specific and the Definition of Done repository-wide.
- Treat specifications as living, versioned agreements; record changes instead of silently diverging or freezing known mistakes.
- Model parallel delivery as an engineering-validated dependency graph. Let the Product Owner order independently valuable Ready nodes while implementation agents receive exclusive work packages and synchronize through explicit integration gates.
