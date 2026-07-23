# Product Vision & Strategy Brief Template

## Contents

1. How to use this template
2. Document control and executive narrative
3. Vision mandate and opportunity landscape
4. Alternative futures and product strategy
5. High-level specifications and strategic priorities
6. Long-term roadmap and learning agenda
7. Handoff, decision log, and quality gate

## How to use this template

Use this version-controlled brief as the canonical strategic product artifact. Keep the executive narrative readable; link detailed research instead of burying the strategy in raw notes. Remove irrelevant sections. Never leave placeholder text in an approved revision.

The Product Manager authors and maintains the brief, but the named strategic decision owner approves the direction. Use status values deliberately: `Draft`, `Proposed`, `Approved`, `Under review`, or `Superseded`. Approval means the accountable owner chose the direction; it does not mean every hypothesis is validated.

````markdown
# <Product> — Product Vision & Strategy Brief

## Document control

- **Product/portfolio boundary:** <included products, services, users, and exclusions>
- **Status:** <Draft | Proposed | Approved | Under review | Superseded>
- **Strategic decision owner:** <name/role>
- **Product Manager:** <name/role>
- **Revision:** <stable revision/date>
- **Decision horizon:** <vision horizon and strategy review horizon>
- **Last reviewed:** <date>
- **Next review gate:** <date or evidence condition>
- **Supersedes:** <revision or none>
- **Related mission/company strategy:** <exact source/revision>
- **Related Linear initiative/project:** <identifier/URL or not synchronized>
- **Repository SDD substrate:** <Spec Kit | Kiro | custom | none observed>
- **Default specification posture:** <spec-anchored or another approved model, with owner/rationale>
- **Default persistence model:** <living | flow-forward | flow-back, with owner/rationale>

## Executive product narrative

### Vision statement

> For `<target people in a meaningful context>`, we envision `<better future state>` so that `<durable human/customer value>`. `<Product>` will uniquely enable this by `<distinctive product contribution>`, advancing `<business or mission value>`.

Treat this as a guide, not a mandatory fill-in formula. Prefer one memorable sentence in domain language.

### One-minute future narrative

Describe:

1. the consequential problem and present experience;
2. the future experience when the vision is realized;
3. why the product has a credible and distinctive role;
4. why this future matters now;
5. what durable user and business outcomes will be different.

### Strategic thesis

State the linked choices in one short paragraph: where to play, how to win, the most important insight, the primary strategic bets, and the most important exclusion.

### What this is not

- <misinterpretation, adjacent market, solution fixation, or non-goal>

## Vision mandate and context

### Sponsor's vision seed

- **Input:** <the future, purpose, or ambition supplied by the sponsor>
- **Source/owner/date:** <traceable source>
- **Interpretation:** <what it means for the product>
- **Unresolved ambiguity:** <what requires sponsor decision>

### Product and value exchange

- **Product definition:** <vehicle that creates value and its clear boundary>
- **Users:** <who uses or experiences it>
- **Customers/buyers/payers:** <who chooses and funds it>
- **Other affected stakeholders:** <operators, partners, non-users, regulators, communities>
- **User value:** <progress or benefit created>
- **Business/mission value:** <how the organization sustains the product and advances strategy>
- **Lifecycle stage:** <exploration, introduction, growth, maturity, renewal, retirement>

### Why now

Describe material user, market, technology, regulatory, organizational, or competitive changes. Link every changing claim to current evidence.

## Evidence-based opportunity landscape

### Target segments

| Segment | User/customer/buyer roles | Circumstances and job | Priority pains/gains | Current alternatives | Evidence IDs | Confidence | Strategic relevance |
|---|---|---|---|---|---|---|---|

### Priority opportunities

| Opportunity ID | Segment | Problem or desired progress | Frequency/reach | Severity/value | Current workaround | Contrary evidence | Confidence | Outcome influenced |
|---|---|---|---|---|---|---|---|---|

### Market and ecosystem

- **Market definition:** <problem, alternatives, geography, time, buying unit>
- **Demand and size bounds:** <TAM/SAM/SOM only when decision-relevant; units, base year, assumptions>
- **Trends and discontinuities:** <evidence and scenarios>
- **Value chain/channels:** <buyers, partners, distribution, suppliers, complements>
- **Economics:** <pricing norms, willingness to pay, cost-to-serve, margins, procurement>
- **Constraints:** <regulation, standards, platforms, data, trust, accessibility, sustainability>

### Alternative and competitor landscape

| Alternative | Type | Target job/segment | Value proposition | Evidence of traction | Strength/trade-off | Switching forces | Strategic implication |
|---|---|---|---|---|---|---|---|

Include direct competitors, indirect substitutes, workarounds, and non-consumption.

## Alternative futures considered

| Direction | Target/market | Future value | How it could win | Required capabilities | Evidence/confidence | Major downside | Decision |
|---|---|---|---|---|---|---|---|
| V-1 | <...> | <...> | <...> | <...> | <...> | <...> | <Selected/Rejected> |

### Vision decision

- **Selected direction:** <ID and concise description>
- **Decision owner/date:** <owner/date>
- **Why selected:** <evidence and trade-offs>
- **Strongest rejected alternative:** <ID and why it lost>
- **What would reopen the decision:** <evidence threshold or external change>

## Product strategy

### Strategic choices

- **Winning aspiration:** <valuable product outcome in service of mission>
- **Where to play:** <segments, jobs, geography, channels, product boundary>
- **Where not to play:** <explicit exclusions>
- **How to win:** <distinctive value and advantage>
- **Capabilities required:** <product, data, distribution, operational, organizational>
- **Management/evidence system:** <metrics, research, cadence, decision rights>

### Value proposition

For each priority segment, connect the most important jobs, pains, and gains to the intended product value. Do not claim fit without evidence.

| Segment | Priority jobs/pains/gains | Intended pain relief/gain | Differentiation | Evidence | Fit status |
|---|---|---|---|---|---|

### Product principles

| Principle | Trade-off guided | Implication | Counterexample/non-meaning |
|---|---|---|---|
| P-1 | <recurring tension> | <which value wins and why> | <what the principle must not be used to justify> |

### Outcomes and guardrails

| Outcome ID | Type | Population | Baseline/date | Target/horizon | Leading indicator | Lagging indicator | Guardrails | Causal hypothesis | Owner |
|---|---|---|---|---|---|---|---|---|---|

Use `user`, `product`, or `business` as outcome types. Do not use feature shipment as the outcome.

### Strategic themes and bets

| Bet ID | Theme/opportunity | Strategic hypothesis | Outcomes | Target segment | Evidence/confidence | Capabilities required | Investment envelope | Decision gate |
|---|---|---|---|---|---|---|---|---|

### Non-goals

| Non-goal | Reason | Reconsideration trigger |
|---|---|---|

## High-level product specifications

Use these to express strategic feature or capability intent. Product Ownership will refine approved items into Product Goals and backlog behavior.

### HLS-<n> — <Outcome-oriented capability name>

- **Status:** <Opportunity | Candidate | Validating | Selected | Deferred | Rejected>
- **Target segment and circumstance:** <who/when>
- **Job, pain, or opportunity:** <evidence-linked need>
- **Desired user outcome:** <observable change>
- **Desired business outcome:** <observable value>
- **Capability/experience intent:** <high-level what, solution-open where possible>
- **Vision/strategy trace:** <vision, principle, outcome, bet IDs>
- **Upstream source revision:** <exact approved brief revision>
- **Evidence and confidence:** <IDs and rationale>
- **In scope:** <high-level boundary>
- **Out of scope/non-goals:** <boundary>
- **Product constraints and guardrails:** <trust, safety, privacy, accessibility, policy, compatibility, economics>
- **Dependencies/enablers:** <known business or technical capability; accountable source>
- **Risks and unknowns:** <material uncertainty>
- **Next discovery or decision gate:** <test, threshold, owner>
- **Recommended SDD rigor:** <lite | standard | high-assurance | exploratory, with reason>
- **Recommended authority/persistence:** <posture and audit/lifecycle rationale; engineering validates feasibility>
- **Product-intent seed:** <actors, problem, desired outcomes, scope, non-goals, guardrails, assumptions, risks, and open product decisions>
- **Downstream ownership boundary:** <what Product Ownership and engineering must still decide>
- **Product Owner handoff:** <not selected | requested | Product Goal/Linear link>

## Strategic priority record

### Decision criteria

List the context-specific criteria, gates, evidence standards, and accountable sources for feasibility or investment inputs.

| Rank/tier | Candidate | Strategic fit | User/business impact | Evidence/confidence | Urgency | Learning/options | Feasibility/investment input | Opportunity cost | Rationale |
|---:|---|---|---|---|---|---|---|---|---|

- **Top choice over strongest alternative:** <comparative decision>
- **Sensitivity:** <which uncertain inputs could reverse the order>
- **Mandatory work separated:** <safety/legal/contractual obligations and authority>
- **Decision owner/date:** <owner/date>

## Long-term outcome-based roadmap

Define horizon meaning for this product. Use dates only when evidence or an accountable commitment supports them.

| Horizon | Outcome/theme | Target segment/opportunity | Why this horizon | Evidence/confidence | Measures/guardrails | Dependencies | Decision gate/review | Commitment status | Product Goal links |
|---|---|---|---|---|---|---|---|---|---|
| Now | <...> | <...> | <...> | <...> | <...> | <...> | <...> | <intent/forecast/commitment> | <...> |
| Next | <...> | <...> | <...> | <...> | <...> | <...> | <...> | <intent/forecast> | <...> |
| Later | <...> | <...> | <...> | <...> | <...> | <...> | <...> | <option> | <...> |

### Strategic scenarios

| Scenario/trigger | What changes | Roadmap response | Leading signal | Decision owner |
|---|---|---|---|---|

### External commitments

| Commitment | Scope/date | Authority | Evidence/assumptions | Consequence of change | Owner |
|---|---|---|---|---|---|

## Research and learning agenda

| Question/hypothesis | Why decision-relevant | Method | Population/source | Evidence threshold | Owner | Decision/date |
|---|---|---|---|---|---|---|

## Evidence register

| ID | Claim | Type | Source/date | Population/scope | Method | Supports/contradicts | Limitations | Confidence | Decision affected |
|---|---|---|---|---|---|---|---|---|---|

## Assumptions, risks, and dependencies

| ID | Type | Statement | Likelihood/impact | Evidence | Owner | Response/test | Decision affected |
|---|---|---|---|---|---|---|---|

## Stakeholder alignment and objections

| Stakeholder/role | Material input or objection | Evidence | Disposition | Decision owner | Follow-up |
|---|---|---|---|---|---|

Consensus is not required, but material disagreement must be visible.

## Product Manager to Product Owner handoff

- **Approved strategic revision:** <revision>
- **Selected bets/specifications:** <IDs>
- **Requested Product Goal proposal:** <outcome and boundaries>
- **Strategic priority:** <relative order and rationale>
- **Evidence package:** <links/IDs>
- **Measures and guardrails:** <IDs>
- **Non-goals:** <IDs>
- **Open product questions:** <questions the PO may decide vs strategic questions retained by PM/sponsor>
- **Stable trace chain:** <VISION -> OUTCOME -> OPPORTUNITY -> BET -> HLS identifiers>
- **Recommended SDD posture:** <authority, persistence, rigor, rationale, and engineering-validation need>
- **Product-intent seeds:** <selected HLS IDs and exact source revision>
- **Change authority/protocol:** <who revises strategic intent and which downstream owners must perform impact analysis>
- **Handoff status:** <not started | proposed | accepted | needs revision>
- **Resulting Product Goals/Linear objects:** <IDs/URLs/revisions>

## Decision log

| Decision ID | Date | Decision and owner | Alternatives | Evidence | Consequences | Revisit trigger |
|---|---|---|---|---|---|---|

## Change log

| Revision/date | Author | Material change | Reason/evidence | Downstream objects requiring review |
|---|---|---|---|---|

## Approval and quality gate

- [ ] Sponsor vision seed or absence is recorded.
- [ ] Vision describes a valuable future rather than a solution catalog.
- [ ] Target users, customers, buyers, problems, and product boundary are explicit.
- [ ] Market, user, alternative, and business claims are traceable and current enough.
- [ ] Contrary evidence and research limitations are visible.
- [ ] At least three alternative futures were considered or the constraint is explained.
- [ ] Strategy includes where to play, how to win, capabilities, principles, outcomes, and non-goals.
- [ ] High-level specifications remain above story and implementation detail.
- [ ] Priority decisions compare alternatives, confidence, opportunity cost, and expert inputs.
- [ ] Roadmap horizons, confidence, gates, and commitment status are honest.
- [ ] Outcomes have baselines or a plan to establish them, targets, horizons, and guardrails.
- [ ] Decision rights, owners, review cadence, assumptions, and risks are explicit.
- [ ] Product Owner handoff preserves backlog accountability.
- [ ] Every selected HLS has stable upstream traceability and an exact strategic source revision.
- [ ] Every delivery-bound HLS includes a product-intent seed without story-level or technical design leakage.
- [ ] SDD posture is proportional to consequence and lifecycle; spec-as-source is not assumed without engineering validation.
- [ ] Exploratory hypotheses have an expiry or graduation gate and are not presented as approved requirements.

**Strategic status:** <Draft | Proposed | Approved | Under review | Superseded>

**Approval decision:** <owner, date, scope, and unresolved conditions>
````
