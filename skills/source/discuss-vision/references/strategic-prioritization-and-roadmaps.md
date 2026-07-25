# Strategic Prioritization and Roadmaps

## Contents

1. Level and decision rights
2. Candidate preparation
3. Strategic gates
4. Comparative prioritization
5. Scoring discipline
6. Outcome-based roadmaps
7. Roadmap adaptation
8. Quality gate

## Level and decision rights

Product Manager prioritization is above the backlog. Compare markets, segments, opportunities, outcomes, strategic themes, initiatives, and high-level capability or feature candidates. Decide which strategic bets deserve attention and investment.

The Product Owner remains accountable for the exact order of Product Backlog items used to pursue an active Product Goal. Engineering owns estimates, technical dependencies, architecture, and implementation sequence. Leadership or finance retains investment and commitment authority unless explicitly delegated.

Do not use roadmap rank to bypass any of these accountabilities.

## Candidate preparation

Compare candidates at the same abstraction level. A market-expansion initiative cannot be meaningfully scored against a small UI enhancement without first normalizing the decision.

Give every candidate:

- a stable identifier and comparable scope;
- the applicable product context, canonical actors and concepts, and any unresolved semantic boundary;
- target segment and problem/opportunity;
- intended user and business outcomes;
- strategic trace and differentiation thesis;
- evidence, confidence, and contrary evidence;
- time horizon and urgency;
- known dependencies and enabling capabilities;
- feasibility, investment range, and uncertainty from accountable experts;
- major trust, safety, regulatory, accessibility, operational, and reputational consequences;
- next learning or commitment gate.

Separate mandatory obligations from discretionary bets. Identify the authority and deadline behind claimed legal, contractual, safety, or regulatory work; “mandatory” is not a stakeholder priority label.

## Strategic gates

Apply gates before optimization. A candidate normally does not advance when it:

- conflicts with company mission, approved product vision, law, safety, ethics, or non-negotiable policy;
- targets a segment or problem explicitly outside the chosen strategy without a strategy review;
- has no plausible path to user value or sustainable business/mission value;
- depends on fabricated, materially stale, or untraceable evidence;
- creates unacceptable trust, privacy, security, accessibility, or operational harm;
- requires an unavailable capability or authority with no credible path to acquire it;
- is framed too vaguely to compare or test.
- depends on conflicting definitions of a material actor, state, boundary, or outcome with no decision owner or resolution gate.

Record whether a failed gate causes rejection, reframing, research, escalation, or strategy review.

## Comparative prioritization

Use this decision sequence:

1. **Strategic fit:** Does it advance a chosen market, problem, differentiation, principle, and outcome?
2. **User value:** How important, severe, frequent, and widespread is the opportunity for the target segment?
3. **Business/mission value:** What durable value could it create or protect, and through which causal mechanism?
4. **Evidence:** What supports impact, reach, adoption, willingness, timing, and causality? What contradicts it?
5. **Urgency:** Is there a real window, decay, deadline, or cost of delay?
6. **Learning and options:** Does it cheaply resolve a strategic uncertainty, reduce risk, unlock future choices, or create reusable capability?
7. **Feasibility and investment:** What range and uncertainty do engineering, design, legal, operations, go-to-market, and finance provide?
8. **Coherence and dependencies:** Does the bet reinforce the portfolio or fragment attention and create hidden prerequisites?
9. **Semantic coherence:** Do the affected product contexts agree on the actors, concepts, states, and outcomes, or is an explicit translation or boundary decision required?
10. **Opportunity cost:** Which valuable alternative, existing-user need, or strategic capability will wait?
11. **Downside and reversibility:** What happens if the hypothesis is wrong, and can the decision be reversed?

Then produce:

- an explicit order or a small number of ordered tiers;
- a written comparison of the top candidate with the strongest alternative;
- a confidence and sensitivity statement;
- rejected and deferred candidates with reasons and revisit triggers;
- decision owner and date.

Prioritization is incomplete when it only explains why the winner is attractive. Explain why the opportunity cost is acceptable.

## Scoring discipline

Use RICE, value-versus-effort, cost of delay, or a local model only when it fits the decision and the organization understands the inputs.

- Define every factor, scale, unit, time window, and evidence source.
- Keep ordinal labels ordinal; do not perform precise arithmetic on arbitrary categories without acknowledging the limitation.
- Obtain effort, feasibility, and technical-risk inputs from engineering rather than estimating for them.
- Keep reach tied to a defined population and period.
- Express impact as a causal hypothesis against a specific outcome.
- Make confidence reflect evidence quality, not stakeholder enthusiasm.
- Run sensitivity checks on inputs most likely to change the rank.
- Do not combine mandatory compliance work with discretionary growth work in one opaque score.
- Treat the score as decision support; record the accountable narrative decision separately.

Example comparison table:

| Rank | Candidate | Strategic fit | User impact | Business impact | Evidence/confidence | Urgency | Learning/options | Feasibility/investment | Opportunity cost | Decision |
|---:|---|---|---|---|---|---|---|---|---|---|

## Outcome-based roadmaps

### Define horizons

Choose horizon meanings that match the product's lifecycle and learning speed. A typical adaptable model is:

- **Now:** the few outcomes and bets receiving active discovery or delivery attention; evidence is strongest and boundaries are clearest.
- **Next:** likely bets contingent on current learning, dependencies, or capacity; ordering may change.
- **Later:** strategic options and future problem spaces; low specificity and no implied promise.

For hardware, regulated products, infrastructure, or external commitments, calendar horizons may be necessary. State confidence, planning assumptions, accountable commitment owners, and the difference between target, forecast, and promise.

### Roadmap item schema

| Field | Purpose |
|---|---|
| Outcome | Observable user/product/business change, not output shipment |
| Segment/opportunity | Who and which evidence-backed problem |
| Strategic theme/bet | Why this belongs in the chosen strategy |
| Horizon | Now, Next, Later, or defined calendar horizon |
| Evidence/confidence | Basis and uncertainty |
| Measures/guardrails | How progress and harm will be assessed |
| Candidate capabilities | Illustrative solutions, explicitly labeled |
| Dependencies/enablers | Business and technical prerequisites with sources |
| Product contexts | Semantic contexts affected and any translation or boundary decision |
| Decision gate | Test, threshold, event, and owner for continue/change/stop |
| Commitment status | Intent, option, forecast, target, or authorized commitment |
| Product Goal link | Near-term Product Owner translation when available |

Limit work in Now. A roadmap that declares everything urgent communicates no strategy.

### Traceability

Maintain this direction of trace:

```text
Vision
  -> strategic choice
    -> target outcome
      -> strategic bet / roadmap item
        -> high-level specification
          -> Product Goal
            -> Product Backlog items
```

Do not force the reverse: a popular feature request does not become strategic merely because it exists in the backlog.

### Strategic scenarios

When regulation, technology, competition, funding, or adoption could produce materially different futures, define two or three plausible scenarios. For each, record trigger signals, affected assumptions, roadmap response, and decision owner. Do not average incompatible futures into one falsely precise plan.

### Audience views

Keep one underlying strategy and create views rather than contradictory roadmaps:

- executives: strategic choices, outcomes, investment, risk, decisions;
- go-to-market: target segments, value, confidence, launch dependencies, authorized commitments;
- Product Owner and teams: outcomes, opportunities, principles, high-level specifications, evidence, gates;
- customers/partners: direction appropriate to disclosure and commitment authority.

Never expose confidential research or turn an internal option into an external promise.

## Roadmap adaptation

Review on evidence and decision cadence, not only on a ceremonial calendar. Revisit when:

- an outcome or guardrail materially changes;
- a strategic assumption is validated or invalidated;
- market, competitor, technology, regulation, or company strategy changes;
- feasibility or investment differs materially from its range;
- a dependency, commitment, or opportunity window changes;
- Product Owner or delivery evidence exposes a strategy mismatch.

For every material change, record:

- previous and new horizon/order;
- new evidence or decision;
- consequences for commitments and Product Goals;
- stakeholders and artifact revisions affected;
- decision owner and communication required.

Do not preserve a roadmap item solely because stakeholders have become accustomed to seeing it.

## Quality gate

- Candidates are comparable and linked to target outcomes.
- Material product terms and context boundaries are precise enough to compare candidates without semantic drift.
- Strategic and safety gates precede scoring.
- Mandatory work has a real authority and deadline.
- User impact, business value, evidence, urgency, learning, feasibility, and opportunity cost are visible.
- Engineering and other specialists own their estimates and constraints.
- The decision compares the winner with the strongest alternative.
- Confidence, sensitivity, contrary evidence, and revisit triggers are explicit.
- Now contains a focused set of bets.
- Distant horizons contain less detail and more conditionality.
- Every roadmap item exposes outcome, evidence, dependencies, gate, owner, and commitment status.
- Roadmap items expose affected product contexts and unresolved semantic decisions when those could change scope or outcome meaning.
- Roadmap, release plan, project plan, Product Goal, and Product Backlog remain distinct.
- Product Owner and engineering accountabilities are preserved.
