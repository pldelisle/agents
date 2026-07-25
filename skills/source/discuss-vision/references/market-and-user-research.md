# Market and User Research Protocol

## Contents

1. Research integrity
2. Research brief
3. Evidence portfolio
4. Market and ecosystem research
5. User and customer research
6. Synthesis
7. Evidence register
8. Research quality gate

## Research integrity

Research exists to reduce uncertainty around a decision, not to decorate a preferred solution.

- State the decision, belief, unknown, and evidence threshold before selecting methods.
- Seek evidence that could disprove the current thesis.
- Separate users, customers, buyers, administrators, partners, and affected non-users.
- Preserve participants' and sources' original product language before translating it into canonical strategic terms. A vocabulary conflict can be a finding, not noise to normalize away.
- Obtain informed consent and follow applicable privacy, recording, retention, compensation, and research-ethics requirements.
- Collect only necessary participant information. Never put personal or confidential data into repository artifacts.
- Do not claim to have interviewed, observed, surveyed, or tested with people unless that activity actually occurred.
- Cite current sources close to consequential claims and record access or publication dates.
- Prefer original research, official statistics, regulatory sources, company filings, direct product evidence, and first-party documentation over aggregators.
- Triangulate material conclusions. A source count is not triangulation when every article repeats the same underlying claim.

## Research brief

Create this brief before material research:

| Field | Content |
|---|---|
| Decision | The specific choice the research will inform |
| Decision owner | Person accountable for making the choice |
| Current belief | What is believed and why |
| Riskiest unknowns | Unknowns most likely to change the decision |
| Target populations | Segments and roles to study separately |
| Scope | Geography, industry, product boundary, lifecycle, and horizon |
| Methods | Methods selected for each unknown |
| Evidence threshold | What would support, weaken, or reject the belief |
| Constraints | Time, access, privacy, legal, budget, and sample constraints |
| Output | Required evidence and decision artifacts |
| Review gate | Date or condition for making the decision |

Do not begin with “research the whole market.” Narrow the scope to the decision while noting adjacent uncertainties.

## Evidence portfolio

Use complementary evidence types:

| Evidence | Best for | Common limitations |
|---|---|---|
| Official statistics, filings, standards, and regulation | Market structure, size bounds, economics, constraints | Lag, category mismatch, geographic mismatch |
| Industry research and expert interviews | Ecosystem, trends, causal context | Incentives, opaque methods, paywalls, expert bias |
| Competitor primary sources and product observation | Positioning, pricing, capabilities, channels | Marketing claims, hidden adoption, rapid change |
| Customer and user interviews or observation | Context, jobs, pains, workarounds, language, switching | Small or selected samples, recall, interviewer effects |
| Product analytics and experiments | Behavior, frequency, funnels, causal tests | Existing-user bias, instrumentation, confounding |
| Sales, support, success, and lost-deal evidence | Buying objections, pain, retention, commercial patterns | Loud-customer and pipeline bias |
| Surveys | Prevalence and segmentation after concepts are understood | Wording, self-report, sampling, non-response |
| Financial and operational data | Value capture, cost-to-serve, viability | Allocation assumptions, historical lag |

Do not infer prevalence from interviews alone or motivation from analytics alone.

## Market and ecosystem research

### Market definition

Define the market by a customer problem and alternatives, not solely by a vendor category. Record:

- target geography and time horizon;
- relevant segments and buying units;
- user, buyer, payer, and channel roles;
- current solutions, substitutes, manual workarounds, and non-consumption;
- value chain, partners, complementors, suppliers, and distribution;
- regulatory, standard, platform, data, and technology constraints.

Define material market and role terms precisely. If a word such as “customer,” “account,” “member,” or “subscription” carries different meanings across segments or ecosystem participants, preserve those contexts rather than forcing premature equivalence.

### Demand and attractiveness

Investigate:

- evidence that the problem exists and prompts action;
- frequency, severity, urgency, budget, and willingness to switch or pay;
- market size and growth with units, dates, and category definitions;
- adoption drivers, barriers, switching costs, procurement, and sales cycles;
- concentration, saturation, margins, cost-to-serve, and economic sensitivity;
- structural trends and plausible discontinuities;
- underserved segments and non-consumption.

When sizing is decision-relevant, show both top-down bounds and bottom-up assumptions when possible:

```text
TAM = all qualifying units x annual value per unit
SAM = TAM constrained by product scope, geography, channel, and capability
SOM = reachable share constrained by adoption, distribution, capacity, and time
```

State the unit, currency, base year, source, exclusions, and sensitivity. Never report a precise market number from vague category data.

### Competitive and alternative analysis

Compare direct competitors, indirect substitutes, workarounds, and non-consumption on dimensions that matter to the target job:

| Alternative | Target segment/job | Value proposition | Evidence of traction | Strengths | Weaknesses/trade-offs | Pricing/economics | Switching forces | Strategic implication |
|---|---|---|---|---|---|---|---|---|

Treat feature grids as one input, not the conclusion. Ask why customers choose, reject, retain, or leave each alternative. Separate a competitor's claim from observed product behavior and third-party evidence.

## User and customer research

### Recruit by behavior and circumstance

Recruit people who recently experienced the decision or job. Include meaningful contrasts such as adopters, rejecters, churned customers, switchers, heavy and light users, non-consumers, buyers, and affected operators. Do not merge distinct segments merely to reach a sample count.

### Interview past behavior

Prefer concrete accounts over opinions about hypothetical features:

- “Tell me about the last time you tried to …”
- “What triggered that?”
- “What did you do first, then what happened?”
- “Which alternatives did you consider?”
- “What was difficult, risky, slow, or expensive?”
- “Who else influenced or approved the decision?”
- “What did you call the people, objects, states, and steps involved?”
- “Would that word mean the same thing to everyone involved? Can you give an exception?”
- “What did you expect to improve, and what actually improved?”
- “What would have stopped you from changing?”

Avoid leading questions, pitching during discovery, asking participants to design the product, or interpreting politeness as demand. Record direct observations separately from interpretations.

### Observe context and artifacts

When appropriate and authorized, observe the workflow, environment, handoffs, tools, workarounds, exceptions, and artifacts involved in the job. Context often exposes constraints that recollection omits.

### Quantify after discovering language and structure

Use analytics, surveys, experiments, and commercial data to test prevalence, frequency, segment differences, behavior, and causal assumptions. Define metric population, event, window, exclusions, and baseline. Do not use vanity metrics or percentages without denominators.

## Synthesis

### Opportunity record

Create one record per distinct segment and opportunity:

| Field | Content |
|---|---|
| Opportunity ID | Stable identifier |
| Segment and role | User/customer/buyer/affected stakeholder |
| Circumstance | Trigger and relevant context |
| Job/progress | Functional, social, and emotional progress sought |
| Pain or gain | Specific unmet need or desired result |
| Current alternatives | Products, substitutes, workarounds, non-consumption |
| Frequency/reach | Observed or estimated with source |
| Severity/cost | Time, money, risk, effort, emotion, or lost outcome |
| Switching forces | Push, pull, habit, anxiety, approval, cost |
| User evidence | Observations, source IDs, sample limitations |
| Market/business evidence | Demand, value capture, strategic relevance |
| Contrary evidence | Disconfirming observations or explanations |
| Confidence | High / medium / low with rationale |
| Next test | Evidence needed to change or advance the decision |

Cluster opportunities only after preserving source traceability. Frequency of mentions is not automatically importance; account for severity, sample composition, and silent workarounds.

### Insight statement

Write an insight as a causal, evidence-linked interpretation:

> When `<circumstance>`, `<segment>` struggles to `<job>` because `<mechanism>`, producing `<consequence>`. Evidence `<sources>` supports this with `<confidence>`; `<contrary evidence or unknown>` could change the interpretation.

Do not write a feature request as an insight.

### Product-language synthesis

Synthesize observed language separately from the canonical product vocabulary:

| Source term | Source/context | Intended concept | Candidate canonical term | Avoided aliases | Contradiction or ambiguity | Evidence IDs | Decision owner/status |
|---|---|---|---|---|---|---|---|

- Preserve source wording in notes or evidence records; do not rewrite participant language to make the strategy appear more coherent.
- Choose a canonical term only when the evidence and accountable decision support it.
- Define the term in one or two sentences as what it **is**. Keep behavior, policy rules, data shape, and implementation details in their accountable artifacts.
- When one term legitimately has different meanings, name the product contexts and the translation instead of forcing a global definition.
- Use constructed edge-case scenarios to test a candidate meaning, but label them as probes. They reveal ambiguity; they do not establish prevalence, demand, or user behavior.
- Record unresolved semantic conflicts as research unknowns or decisions with an owner and next gate.

## Evidence register

Maintain a table in the Product Vision & Strategy Brief or its linked research artifact:

| ID | Claim | Type | Source and date | Population/scope | Method | Supports/contradicts | Limitations | Confidence | Decision affected |
|---|---|---|---|---|---|---|---|---|---|

Use these claim types consistently:

- **Fact:** directly supported within the source's scope.
- **Interpretation:** synthesis derived from facts.
- **Assumption:** believed without sufficient evidence.
- **Hypothesis:** falsifiable claim with a planned test.
- **Decision:** choice made by an accountable owner.
- **Commitment:** authorized promise with owner and consequence.

## Research quality gate

- The research traces to a specific decision and owner.
- Target populations and roles are not conflated.
- Current, authoritative sources support time-sensitive claims.
- Material claims are triangulated or explicitly low-confidence.
- Direct, indirect, substitute, and non-consumption alternatives are considered.
- Interviews focus on real behavior and context, not feature voting alone.
- Original participant and source language remains traceable; canonical terms do not erase meaningful segment or context differences.
- Constructed scenarios used to sharpen terminology are clearly separated from observed research evidence.
- Market sizing exposes units, bounds, assumptions, dates, and sensitivity.
- Contrary evidence and sampling, method, recency, and incentive limitations are visible.
- Participant privacy, consent, recording, and retention obligations are satisfied.
- The evidence register permits another reviewer to trace each strategic claim.
- The next decision, evidence threshold, owner, and review gate are explicit.
