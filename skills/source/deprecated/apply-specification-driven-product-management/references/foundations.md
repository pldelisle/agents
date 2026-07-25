# Product Management Foundations

## Contents

1. Purpose
2. Repository role model
3. Literature-derived doctrine
4. Source notes

## Purpose

Use this reference to ground Product Manager judgment and preserve clear accountability boundaries. Product management has no single universal role definition; titles and authority vary by organization. This repository adopts an explicit operating model rather than presenting local choices as an industry standard.

## Repository role model

The Product Manager is the strategic product leader. The role integrates user, market, business, and technical evidence to recommend where the product should go and why. It owns product vision, strategy, strategic priorities, and the long-term product roadmap through influence and documented decisions.

The Product Owner is the delivery-facing product accountability. The role translates approved strategy into Product Goals and an ordered, understood Product Backlog; it specifies detailed behavior, acceptance outcomes, and readiness. The Scrum Guide assigns Product Goal development, Product Backlog creation, and exact backlog ordering to the Product Owner, so the Product Manager must not quietly take those accountabilities away.

Engineering owns technical design, estimates, implementation planning, technical sequencing, and delivery evidence. Company leadership owns company mission, corporate strategy, investment authority, and enterprise risk appetite unless explicitly delegated.

Use this hierarchy:

```text
Company mission and strategy                 executive sponsor
  -> Product vision and product strategy     product_manager
    -> Strategic bets and roadmap horizons   product_manager
      -> Product Goals and backlog order     product_owner
        -> Technical plan and delivery       software_engineer
```

This is a collaboration model, not a chain of command. Evidence and decisions flow in both directions.

## Literature-derived doctrine

### Vision is a persuasive future state

Marty Cagan distinguishes a multi-year product vision from a specification and describes it as a persuasive representation of the future, while product strategy provides the intentional path. Roman Pichler's Product Vision Board combines vision with target groups, needs, product value, and business goals. Therefore:

- write vision as the durable future the product intends to create;
- pair inspiration with target users, needs, value, and strategic principles;
- avoid embedding a complete solution or delivery plan in the vision;
- keep details flexible while making the destination and values coherent.

### Strategy is choice

SVPG frames product strategy around focus, insights, actions, and ongoing management. *Playing to Win* frames strategy as linked choices including aspiration, where to play, how to win, capabilities, and management systems. Therefore:

- make target markets, priority problems, differentiation, and non-goals explicit;
- choose among plausible alternatives instead of compiling all stakeholder requests;
- connect claimed advantage to evidence and capabilities;
- revisit choices as evidence or the environment changes.

### Product management balances user and business outcomes

Melissa Perri describes the Product Manager as working with a team to balance business needs and user problems, with direction and outcomes taking priority over commanding what to build. Marty Cagan's *Inspired* similarly emphasizes discovering products customers value that also work for the business. Therefore:

- own the why, direction, evidence, and outcome recommendation;
- do not act as a miniature CEO or feature dictator;
- evaluate desirability, viability, feasibility, usability, ethics, trust, and operability with the accountable specialists;
- measure changed behavior and value, not merely shipped output.

### Discovery starts from opportunities, not requests

Teresa Torres's Opportunity Solution Tree connects a desired outcome to customer opportunities, candidate solutions, and assumption tests. Jobs to Be Done examines the progress people seek in real circumstances, including functional, social, and emotional forces. Strategyzer's Value Proposition Canvas links customer jobs, pains, and gains to proposed value. Therefore:

- separate outcome, opportunity, solution, and assumption;
- study observed behavior, circumstances, workarounds, and switching forces;
- preserve differences among users, buyers, customers, and affected stakeholders;
- compare several solutions and test their riskiest assumptions before committing.

### Market evidence needs breadth and triangulation

The U.S. Small Business Administration's market-research guidance covers demand, market size, economic context, location, saturation, pricing, competitors, barriers, and substitutes. IDEO's methods combine secondary research, direct interviews, context, and observation. Therefore:

- examine market structure and behavior, not competitors' feature grids alone;
- combine recent secondary evidence with primary user evidence and product or commercial data;
- prefer authoritative primary sources for time-sensitive claims;
- expose sample, measurement, survivorship, confirmation, selection, and recency limitations.

### Roadmaps communicate strategic intent and learning

*Product Roadmaps Relaunched* treats a roadmap as strategic context centered on customer and organizational value, themes, outcomes, learning, and a coherent set of priorities—not promises a team cannot support. Therefore:

- trace roadmap items to vision, strategy, outcomes, and customer needs;
- use themes and horizons before feature-and-date commitments;
- make confidence and learning gates visible;
- distinguish roadmap, release plan, project plan, and backlog.

### Scoring supports but does not replace judgment

RICE makes reach, impact, confidence, and effort visible. Its usefulness comes from structured comparison and explicit uncertainty, not mathematical objectivity. Therefore:

- apply strategic gates before scoring;
- use consistent units and expert-supplied inputs;
- show uncertainty and sensitivity;
- record the narrative decision, strongest alternative, and opportunity cost.

## Source notes

Use these sources for doctrine and deeper reading. Re-check current sources when the work depends on changing facts.

- Ken Schwaber and Jeff Sutherland, [The Scrum Guide (2020)](https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf) — Product Owner and Product Backlog accountabilities.
- Sherif Mansour, [Product Manager: role and responsibilities](https://www.atlassian.com/agile/product-management/product-manager) — common PM/PO distinction and the intersection of user, business, and technology concerns.
- Marty Cagan, [Vision vs. Strategy](https://www.svpg.com/vision-vs-strategy/) and [Product Strategy Overview](https://www.svpg.com/product-strategy-overview/) — multi-year vision and strategy as focus, insights, actions, and management.
- Marty Cagan, [*Inspired*, 2nd edition](https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love-2nd-edition/) — product discovery, product teams, customer value, and business viability.
- Melissa Perri, [*Escaping the Build Trap*](https://www.oreilly.com/library/view/escaping-the-build/9781491973783/) — outcome-oriented product management and the role's limits.
- A.G. Lafley and Roger L. Martin, [*Playing to Win*](https://hbr.org/books/playing-to-win) — linked strategic choices.
- Roman Pichler, [Product Vision Board](https://www.romanpichler.com/tools/product-vision-board/) and [Product Management Framework](https://www.romanpichler.com/downloads/tools/RomansProductManagementFramework.pdf) — vision, target group, needs, product, business goals, market research, strategy, and roadmap knowledge areas.
- Teresa Torres, [Opportunity Solution Trees](https://www.producttalk.org/opportunity-solution-trees/) — connecting outcomes, opportunities, solutions, and assumption tests.
- Clayton Christensen Institute, [Jobs to Be Done Theory](https://www.christenseninstitute.org/theory/jobs-to-be-done/) — circumstances and functional, social, and emotional progress.
- Strategyzer, [Value Proposition Canvas](https://www.strategyzer.com/library/the-value-proposition-canvas) — customer jobs, pains, gains, pain relievers, and gain creators.
- C. Todd Lombardo, Bruce McCarthy, Evan Ryan, and Michael Connors, [*Product Roadmaps Relaunched*](https://www.oreilly.com/library/view/product-roadmaps-relaunched/9781491971710/) — strategic, value-centered, learning-aware roadmaps.
- Steve Portigal, [*Interviewing Users*, 2nd edition](https://rosenfeldmedia.com/books/interviewing-users-second-edition/) — research planning, interviewing, documentation, synthesis, and impact.
- IDEO.org, [Interview](https://www.designkit.org/methods/interview.html) and [Secondary Research](https://www.designkit.org/methods/secondary-research.html) — direct research in context and factual secondary research.
- U.S. Small Business Administration, [Market research and competitive analysis](https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis) — demand, market size, saturation, pricing, and competitive structure.
- Sean McBride, [RICE prioritization framework](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) — reach, impact, confidence, and effort as decision inputs.
