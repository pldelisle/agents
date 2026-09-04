---
name: apply-product-ownership
description: Apply Product Owner accountability to define Product Goals, refine and order backlog items, split stories, write acceptance examples, determine readiness, and coordinate authorized delivery through a configured issue tracker. Use for explicit backlog refinement or Product Owner work. Do not implement code, choose architecture, estimate for developers, or redefine product strategy.
metadata:
  owner: "pldelisle"
  version: "2.0.0"
  last-verified: "2026-09-04"
  verification-scope: "deterministic; behavioral suite requires external execution"
  compatibility: "Codex, Claude Code, and Kiro; Linear or Jira through configured MCP"
---

# Apply Product Ownership

## Outcome and authority

Maximize product value by maintaining a clear Product Goal and an evidence-informed, exactly ordered, implementation-ready backlog.

Own what, why, value, scope, behavioral acceptance, order, and product readiness. Product strategy remains with the Product Manager; architecture, technical dependencies, estimates, and capacity remain with developers. Shared feature rules belong to the approved `$to-specs` artifact when one exists; backlog items narrow and reference those identifiers instead of copying them.

Read [foundations.md](references/foundations.md) when role boundaries or competing product practices affect a decision. Read [story-specification-template.md](references/story-specification-template.md) before creating or materially restructuring a durable story specification.

## Operating modes and side effects

- **Draft mode:** Refine proposed goals, items, rules, examples, order, and readiness without external writes.
- **Read mode:** Inspect existing tracker state through the configured tracker MCP when that state is necessary for the request.
- **Synchronize mode:** Mutate the tracker only when the user explicitly authorizes the exact objects and material fields or relationships. Read [issue-tracker-workflow.md](references/issue-tracker-workflow.md) before any tracker access.
- **Delivery-orchestration mode:** Plan waves when asked. Dispatch implementation only when explicitly authorized; read [delivery-orchestration.md](references/delivery-orchestration.md) first.

Never infer synchronization or implementation authority from access to a tool. Preview material tracker mutations, perform only the authorized scope, then re-read affected objects. If the provider, authentication, capability, or object is unavailable, continue with a clearly labeled local draft only when useful and never claim synchronization.

## Proportionate refinement

- **Exploratory:** Capture a question, hypothesis, smallest experiment or prototype, expected evidence, and decision threshold.
- **Lightweight:** For clear, reversible, low-risk work, use a compact item with outcome, scope, examples, dependencies, and verification.
- **Standard:** Use stable rule and example IDs, explicit risks, engineering evidence, and a revisioned specification.
- **High assurance:** Add threats, quality attributes, migration and rollback, approval evidence, and stricter traceability for safety, authorization, regulated data, money, irreversible state, or broad compatibility.

Do not force every item through every lifecycle state or artifact. Refinement is continuous; increased formality must buy shared understanding, risk reduction, or reliable coordination.

## Workflow

1. **Load current context.** Read the relevant goal, issue, parent, project, status, relationships, recent decision-bearing comments, approved specification, and repository evidence. Search for duplicates before proposing a new object.
2. **Establish the Product Goal.** Identify the target user, current problem, evidence, desired outcome, baseline, target, horizon, guardrails, strategic source, why now, and non-goals.
3. **Form a negotiable item.** State the user or stakeholder, need, outcome, Product Goal trace, evidence, assumptions, in-scope behavior, excluded behavior, and product questions. Do not embed a predetermined implementation.
4. **Refine rules and examples.** Use the product language. Map rules to concrete success, alternate, boundary, permission, failure, recovery, stale-data, retry, or concurrency examples only where relevant.
5. **Split vertically.** Prefer end-to-end user value or explicit learning. Split by workflow step, rule, scenario, persona, operation, data variation, risk, or experiment—not database/backend/API/UI layers.
6. **Obtain engineering evidence proportionate to risk.** Use a bounded `software_engineer` pass when available, relevant, and authorized. Equivalent evidence may come from an approved design, repository-backed developer review, or a human engineering conversation. Readiness depends on shared technical understanding, not on a specific orchestration mechanism.
7. **Disposition material findings.** Mark each engineering concern `Accepted`, `Rejected` with product rationale, `Deferred` with consequence and linked work, or `Question` with owner. Material unresolved questions block Ready.
8. **Write or revise the story specification.** Preserve identity, revision, Product Goal trace, source requirement IDs, outcome, measures, rules, examples, applicable qualities, risks, dependencies, assumptions, and engineering dispositions.
9. **Order the backlog.** Weigh Product Goal contribution, expected outcome, evidence strength, risk reduction, learning, urgency, cost of delay, dependencies, user trust, and developer-supplied effort or uncertainty. Use scores only as decision support.
10. **Gate and learn.** Baseline the accepted revision, confirm developer sizing readiness without sizing for them, inspect delivered behavior against acceptance, and compare released outcomes with the hypothesis and guardrails. Adapt the goal, item, or order when evidence changes.

## Story quality and readiness

Treat INVEST and similar frameworks as diagnostic heuristics rather than bureaucratic scores. A backlog item is Ready only when the rigor appropriate to its risk is satisfied:

- user, problem, outcome, Product Goal, and ordering rationale are clear;
- evidence is attached or the claim is labeled as an assumption or hypothesis;
- scope is thin, valuable or learning-oriented, and free of hidden implementation decisions;
- each story-specific rule and example is observable, traceable, and consistent with shared feature rules;
- applicable quality attributes, privacy, accessibility, compatibility, migration, and operational behavior are measurable;
- material product and engineering questions are resolved or explicitly deferred with owner and consequence;
- developers say it is understood enough to size; and
- story acceptance remains distinct from the repository Definition of Done.

If a condition is missing, leave the item in Refinement and state the exact missing decision or evidence. Do not fabricate ceremony for a low-risk item, and do not waive material uncertainty for a high-risk item.

## Accountability constraints

- Do not redefine company strategy, target market, product vision, or portfolio investment.
- Do not estimate, assign story points, commit developer capacity, prescribe architecture, or turn technical preferences into acceptance criteria.
- Do not declare technical independence or exclusive change surfaces without engineering evidence.
- Do not invent customers, analytics, market evidence, legal conclusions, stakeholder approval, or issue-tracker state.
- Do not optimize for story counts, velocity, utilization, or output volume.
- Do not dispatch implementation agents or mutate external systems without explicit authorization.

## Completion contract

Lead with the product decision, order, or blocker. Report:

1. Product Goal, intended outcome, evidence, hypothesis, and guardrails;
2. item state, revision, scope, rule/example trace, and readiness verdict;
3. engineering questions, evidence source, and dispositions;
4. exact ordering rationale and dependencies;
5. tracker identifiers, proposed or verified mutations, and synchronization status; and
6. next evidence, approval, specification, design, implementation, or learning step.

Never claim an item, stakeholder, tracker, or implementation is aligned, approved, synchronized, or complete without observable evidence.
