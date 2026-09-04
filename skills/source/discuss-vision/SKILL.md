---
name: discuss-vision
description: Clarify evidence-backed product vision, strategy, target users, outcomes, strategic choices, roadmap intent, and shared product language. Use for an explicit product-vision discussion or decision grill. Do not use for story acceptance criteria, backlog ordering, technical architecture, implementation, or developer estimates.
metadata:
  owner: "pldelisle"
  version: "2.0.0"
  last-verified: "2026-09-04"
  verification-scope: "deterministic; behavioral suite requires external execution"
  compatibility: "Codex, Claude Code, and Kiro"
---

# Discuss Vision

## Outcome and authority

Help the product sponsor choose and explain a valuable future: for whom, which problem or opportunity matters, why this product can win, which outcomes define progress, which bets come first, and what will not be pursued.

Own the strategic recommendation and product-facing language. Do not invent company authority, customer evidence, market facts, financial claims, legal conclusions, stakeholder agreement, or technical feasibility. Product Ownership owns Product Goals and backlog order; engineering owns architecture, estimates, and implementation.

Read [foundations.md](references/foundations.md) when role boundaries or competing product practices affect the decision. Read [market-and-user-research.md](references/market-and-user-research.md) before performing substantive external market, competitor, customer, or user research. Read [strategic-prioritization-and-roadmaps.md](references/strategic-prioritization-and-roadmaps.md) for portfolio prioritization or a multi-horizon roadmap.

## Interaction and persistence modes

Default to **conversation mode**: inspect evidence, recommend decisions, and ask one to three closely related questions without writing files.

Use **decision-grill mode** only when the user asks for a grill or one-question-at-a-time process. Ask exactly one decision-bearing question, provide a recommended answer and rationale, then wait.

Use **persistence mode** only when the user asks to create or revise durable artifacts. Before writing a product glossary, context map, or product ADR, read [domain-language-and-decisions.md](references/domain-language-and-decisions.md). Before writing a Product Vision & Strategy Brief, read [product-vision-strategy-template.md](references/product-vision-strategy-template.md). Repository conventions determine the path; do not create `CONTEXT.md`, a brief, or an ADR merely because the discussion activates this skill.

External research, issue-tracker mutation, publication, participant contact, and stakeholder messaging require the authority and tools explicitly placed in scope.

## Decision method

1. **Establish authority and scope.** Identify the product boundary, sponsor, decision owner, lifecycle stage, constraints, current commitments, and decisions requested now.
2. **Inspect current evidence.** Read supplied artifacts and relevant repository instructions, product surfaces, analytics or research summaries, contracts, tests, issues, and prior decisions. Current implementation is evidence of what exists, not automatic authority for what should exist.
3. **Resolve the vision seed.** Determine the better future, target user, reason it matters now, strategic fit, and boundaries. If no seed exists, offer materially different candidate directions as hypotheses rather than silently choosing one.
4. **Frame the riskiest belief.** Separate facts, interpretations, assumptions, hypotheses, decisions, commitments, and unknowns. State what evidence would change the recommendation.
5. **Develop strategic alternatives.** Compare where to play, how to win, differentiation, required capabilities, opportunity cost, and non-goals. Seek disconfirming evidence before recommending a bet.
6. **Define outcomes and experiments.** Express features as hypotheses about customer or business outcomes. Prefer the smallest experiment or prototype that can resolve a named uncertainty when confidence is low.
7. **Choose strategic order.** Prioritize outcomes, opportunities, themes, and capabilities using value, evidence strength, risk, learning, urgency, and dependencies. Scores support judgment; they do not make it.
8. **Express roadmap intent.** Use horizons, expected outcomes, confidence, assumptions, and decision gates rather than false delivery promises.
9. **Stress-test language and choices.** Use concrete edge cases to reveal ambiguity. Label constructed scenarios as probes, never as validation.
10. **Hand off and learn.** Preserve the chain `vision or goal → outcome hypothesis → capability → requirement → acceptance evidence → observed result`. Return delivery evidence to strategy rather than treating handoff as one-way.

## Product-language rules

- Prefer one canonical term within a product context and record discouraged aliases only when that reduces real ambiguity.
- Preserve original participant language as research evidence; do not rewrite quotes into validation.
- Keep product contexts about differences in customer or business meaning. Do not turn them into software bounded contexts, schemas, services, or class names.
- Put definitions in a glossary, evidence and unresolved questions in research or the strategic brief, product behavior in specifications, and technical decisions in engineering artifacts.
- Offer a product ADR only for a real trade-off that is both hard to reverse and surprising without its rationale. Most discussions need none.

## Product artifact contract

When persistence is requested, adapt the artifact to the decision rather than filling every template section. A durable Product Vision & Strategy Brief should make these relationships explicit:

- sponsor, revision, decision status, evidence date, and confidence;
- target users and circumstances, problem or opportunity, alternatives, and evidence;
- vision, strategic choices, differentiation, capabilities, guardrails, and non-goals;
- measurable outcomes, current baseline when known, hypotheses, and learning plan;
- strategic priority order and multi-horizon roadmap with decision gates;
- open questions, owners, and evidence that would change a choice;
- downstream handoff to `$to-specs` and `$apply-product-ownership` without duplicating their artifacts.

Do not present an authored artifact as validated or approved. Record who has authority to approve it and the evidence still required.

## Completion contract

Lead with the recommendation or unresolved decision. State:

1. the intended future and target user;
2. the strategic choices, non-goals, and strongest alternatives rejected;
3. facts, hypotheses, confidence, and material evidence gaps;
4. outcomes, measures, experiments, and decision gates;
5. the terms clarified and artifacts changed, if persistence was requested; and
6. the next Product Owner, specification, research, or engineering handoff.

Stop when a missing sponsor decision, authority, or material evidence would make further conclusions performative. Do not manufacture document completion in place of shared understanding.
