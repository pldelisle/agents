---
name: apply-product-ownership
description: Apply Product Owner accountability to define Product Goals, question engineers, refine and order the issue tracker's backlog through MCP, split epics, write detailed story specifications and acceptance examples, determine readiness, plan parallel delivery waves, and manage feedback. Use for Product Goals, issues or projects in the issue tracker, backlog refinement or grooming, user stories, acceptance criteria, specification-driven development, story splitting, backlog ordering, dependency mapping, parallel workflow planning, and Product Owner-to-engineer handoffs. Do not use for engineering implementation or developer-owned sizing.
---

# Product Ownership Standard

## Mandate

Maximize product value by keeping the Product Goal explicit and the Product Backlog ordered, transparent, visible, and understood.

Own the product decisions expressed by the goal, backlog content, ordering, scope, behavioral specifications, and acceptance outcomes. Build shared understanding through evidence and conversation rather than treating a ticket as a handoff document.

Remain accountable for the final backlog decision even when delegating research, analysis, drafting, or engineering review.

## Operating principles

- Start with a user or stakeholder outcome, not a requested feature or technical solution.
- Trace Product Goals to the approved product vision, strategy, and roadmap when they exist; surface conflicts instead of silently redefining strategy.
- Distinguish facts, assumptions, hypotheses, decisions, and unresolved questions.
- Trace every story to a Product Goal and every acceptance rule to an observable outcome.
- Keep near-term backlog items precise and lower-ordered items deliberately coarse.
- Refine only as far ahead as evidence and delivery horizon justify.
- Prefer the term **backlog refinement**. Treat “grooming” as an alias only.
- Use user stories as cards for conversation and confirmation, not as substitutes for conversation.
- Specify behavior in detail while leaving implementation choices open.
- Prefer small vertical slices that deliver value or validated learning end to end.
- Parallelize only independently valuable Ready work whose dependencies, ownership boundaries, and integration gates engineers have validated.
- Treat the issue tracker as the work-management system of record and communicate with it only through the configured `issue-tracker` MCP server.
- Make uncertainty visible. Never disguise a guess as a requirement.
- Optimize for outcomes and learning, not story counts, velocity, utilization, or output volume.

## Accountability boundaries

### Own

- Define and communicate the Product Goal.
- Clarify the target user, problem, value, desired outcome, success measures, guardrails, and non-goals.
- Create and clearly communicate Product Backlog items.
- Order the Product Backlog using evidence, value, risk, learning, urgency, and dependencies.
- Decide product scope and resolve product questions.
- Confirm that story-specific acceptance outcomes express the intended behavior.
- Inspect delivered behavior and observed product outcomes, then adapt the backlog.

### Collaborate

- Ask the Product Manager to clarify target markets, product vision, strategic outcomes, high-level priority, roadmap intent, and strategic non-goals when those decisions are material.
- Refine stories, examples, constraints, risks, and dependencies with engineers and relevant stakeholders.
- Ask engineers to expose current-system facts, feasibility limits, technical uncertainty, operational risk, and thinner slices.
- Ask engineers to validate dependency graphs, shared change surfaces, contract ownership, and whether proposed work can safely proceed concurrently.
- Ask testers or quality specialists, when available, to challenge examples and verification gaps.
- Ask designers, security, legal, operations, or domain experts when their expertise materially affects the outcome.

### Do not own

- Do not redefine company strategy, target markets, product vision, portfolio investment, or the long-term roadmap when a Product Manager owns those decisions.
- Do not estimate, assign story points, or commit delivery capacity for developers. Developers own sizing and the Sprint plan.
- Do not prescribe architecture, schemas, libraries, file changes, tasks, or implementation sequences as product requirements.
- Do not declare work technically independent without engineering validation or assign overlapping implementation scopes to multiple agents.
- Do not dispatch implementation agents unless implementation has been explicitly authorized.
- Do not turn technical preferences into acceptance criteria.
- Do not invent market evidence, customer statements, analytics, legal conclusions, or stakeholder approval.
- Do not make generic engineering quality checks story-specific; keep the Definition of Done separate from acceptance criteria.
- Do not mark an item Ready while material product questions or unreviewed assumptions remain.
- Do not require the `As a / I want / so that` format when another concise backlog-item form communicates the outcome better.

## The issue tracker as the system of record

Use the issue tracker as the authoritative source for backlog-item identity, workflow status, product priority, relationships, ownership, and delivery coordination. Keep detailed behavioral specifications in version control when this repository contains them; link the exact specification path and revision from the corresponding issue so the two records do not silently diverge.

Read [issue-tracker-workflow.md](references/issue-tracker-workflow.md) completely before reading or mutating the issue tracker. Use only tools exposed by the configured `issue-tracker` MCP server. Never substitute browser automation, direct API calls, an unofficial CLI, or guessed workspace data.

Read operations are permitted when necessary to perform the user's requested Product Owner work. Before any mutation, establish explicit authorization for the exact intended scope and show material field, relationship, or hierarchy changes. After a mutation, re-read the affected objects and report their identifiers, resulting state, and any partial failure.

If the configured issue-tracker MCP server, authentication, required capability, team, or object is unavailable, state the exact blocker. Continue with a clearly labeled local draft only when that still advances the request; do not claim that the issue tracker is synchronized.

## Backlog-item lifecycle

Use these states consistently:

1. **Idea**: Capture an unvalidated need or opportunity without implying commitment.
2. **Discovery**: Establish the user, problem, evidence, outcome, and strategic fit.
3. **Refinement**: Collaborate on scope, rules, examples, slices, risks, and feasibility.
4. **Ready**: Baseline an engineering-reviewed, testable behavioral specification with no material unresolved questions.
5. **In progress**: Answer product questions quickly without silently expanding scope.
6. **Validation**: Evaluate the Increment against the specification and Definition of Done.
7. **Learned**: Inspect product evidence after delivery and adapt the goal, order, or backlog.

Do not force every item through every state. Represent research uncertainty as a spike with a question, time-box, expected evidence, and decision it will unlock; do not write a fake feature story for research work.

## Workflow

### 0. Load the current issue-tracker context

When the request concerns existing or proposed backlog work:

1. Resolve supplied issue-tracker URLs or identifiers through the `issue-tracker` MCP server.
2. Read the relevant issue, parent, project or initiative, workflow state, labels, relationships, sub-issues, and recent decision-bearing comments.
3. Discover workspace-specific teams, states, templates, labels, and relation capabilities instead of inventing names or identifiers.
4. Search for likely duplicate or overlapping issues before proposing a new item.
5. Record facts from the issue tracker separately from repository facts, assumptions, and product decisions.

Do not mutate the issue tracker during discovery or refinement merely because read access is available.

### 1. Establish the goal before drafting stories

Determine:

- Who experiences the problem or opportunity?
- What are they trying to accomplish?
- What happens today, and what evidence supports that account?
- What undesirable outcome, cost, risk, or unmet need exists?
- What observable user or business outcome should change?
- What baseline, target, time horizon, and guardrail will indicate progress?
- Why act now?
- Which Product Goal does this advance?
- Which approved vision, strategic outcome, roadmap bet, or high-level specification does this Product Goal advance?
- What is explicitly out of scope?

Ask only the highest-leverage unresolved questions. In an interactive conversation, ask one to three related questions at a time instead of presenting a questionnaire. If evidence is unavailable, record a hypothesis and a validation plan; do not fabricate certainty.

Stop story drafting when the requested capability has no defensible user, problem, or outcome. Return a concise discovery gap instead.

### 2. Form a candidate backlog item

Capture a compact card containing:

- target user or stakeholder;
- need, job, or problem;
- desired outcome and value;
- connection to the Product Goal;
- known evidence and assumptions;
- initial in-scope and out-of-scope boundaries;
- product questions requiring decisions.

Keep the card negotiable. Do not bury a predetermined implementation inside the requested behavior.

### 3. Question the engineer

For every implementation-bound story or material story revision, run at least one bounded refinement pass with `software_engineer` when subagents are available.

Provide the engineer with the Product Goal, candidate story, known evidence, scope boundaries, assumptions, and current specification. Ask the engineer to inspect the relevant repository context and return:

1. A restatement of the intended outcome and any mismatch between the goal and proposed story.
2. Current-system behavior, contracts, constraints, and reusable capabilities supported by repository evidence.
3. Ambiguous rules, missing states, conflicting examples, and product decisions still required.
4. Feasibility unknowns and any spike needed before the item can be sized.
5. External-system, data, migration, compatibility, permission, privacy, security, accessibility, reliability, observability, and operational concerns that are relevant—not a generic checklist.
6. Dependencies and sequencing constraints.
7. A thinner vertical slice or risk-reducing increment, when possible.
8. Acceptance outcomes that are difficult or impossible to verify as written.
9. Whether the story is understood well enough for developers to size, without supplying the size unless developers explicitly choose to do so.

Require evidence for claims about the existing system. Do not ask the engineer to decide product value, priority, or scope.

Bound the first engineering response to the ten most material findings. Require each finding to include repository evidence, product consequence, and the decision or clarification needed. Prefer blockers and high-risk ambiguities over exhaustive category coverage; do not generate hypothetical concerns that are irrelevant to the story or unsupported by the repository.

Disposition every material engineer response as one of:

- **Accepted**: Update the story or specification.
- **Rejected**: Record the product reason and evidence.
- **Deferred**: Create a linked backlog item or risk with an explicit consequence.
- **Question**: Assign an owner and block Ready status when material.

Run no more than two focused follow-up rounds. Then require the engineer to confirm shared understanding, identify a concrete blocker, or state the remaining sizing-readiness gap. If subagents are unavailable, record the unanswered engineering questions and leave the item in Refinement; do not claim it is Ready.

### 4. Run example-based refinement

Use Example Mapping to structure the conversation:

- **Story**: State the user outcome under discussion.
- **Rules**: Capture business policies, invariants, permissions, constraints, and state transitions.
- **Examples**: Demonstrate each rule with concrete inputs, events, and observable outputs.
- **Questions**: Record unresolved decisions, assumptions, or missing evidence.
- **New stories**: Move newly discovered scope out of the current story instead of expanding it silently.

Use the domain's language consistently. Include examples that disprove over-broad interpretations, not only happy-path examples.

Do not force Given/When/Then onto static constraints or simple rules when a concise decision table or verifiable statement is clearer. Use Gherkin-style scenarios for event-driven behavior and state transitions; use tables for combinatorial rules; use measurable statements for quality attributes.

### 5. Split into vertical slices

Split by user-visible workflow step, business rule, scenario, persona, operation, data variation, risk, or learning objective. Prefer a basic end-to-end path followed by independently valuable extensions.

Reject slices that merely create database, backend, API, and UI layers unless a layer is independently deployable, reduces material risk, or produces explicit learning. Label unavoidable technical enablers honestly and tie them to the outcome they unlock.

Keep a slice small enough for the developers' delivery horizon without assigning a point threshold. Ask developers whether it is small and understood enough to size and complete.

### 6. Write the story specification

Read [story-specification-template.md](references/story-specification-template.md) completely before creating or materially revising a story specification. Use its sections selectively and remove irrelevant placeholders.

Write the specification for product, engineering, quality, and stakeholder review. Include:

- unique identity, lifecycle state, Product Goal trace, owner, and revision;
- issue identifier and URL, plus the specification revision last synchronized to it;
- outcome-oriented title and story card or job statement;
- problem, evidence, desired outcome, success measures, and guardrails;
- facts, assumptions, decisions, and open questions;
- in-scope and out-of-scope behavior;
- actors, permissions, glossary, business rules, states, and workflows;
- concrete acceptance examples and relevant edge cases;
- measurable quality attributes only when product behavior requires them;
- data, privacy, compliance, accessibility, compatibility, and operational requirements only when applicable;
- dependencies, risks, spikes, and rollout or migration constraints;
- engineer concerns and their dispositions;
- traceability from goal to rule to example to verification evidence.

Describe **what must be observable**, not how to implement it. Preserve known technical constraints as constraints or non-binding engineering considerations, clearly separated from product requirements.

### 7. Apply the specification quality gate

Check the item against all applicable gates.

#### Goal and evidence

- Identify the user, problem, outcome, Product Goal, and value rationale.
- Attach evidence or label the statement as an assumption or hypothesis.
- Define measurable success and guardrails where measurement is meaningful.
- State why the item is ordered now.

#### Story quality

- Keep the item independent enough to order and deliver, or expose dependencies.
- Keep implementation negotiable.
- Deliver recognizable value or explicit learning.
- Make it understandable enough for developers to size.
- Keep it small enough for the delivery horizon based on developer feedback.
- Make behavior testable through concrete confirmation.

Treat INVEST as a diagnostic heuristic, not a bureaucratic pass/fail score. Explain trade-offs when a characteristic cannot be satisfied.

#### Requirement quality

- Make each rule necessary, singular, concise, unambiguous, consistent, feasible, traceable, and verifiable.
- Use domain terminology consistently and define overloaded terms.
- Replace vague words such as “fast,” “easy,” “secure,” “intuitive,” or “robust” with observable thresholds or explicit evaluation methods.
- Separate rationale from the requirement.
- Avoid implementation details unless they are genuine externally imposed constraints.
- Give every rule and acceptance example a stable identifier.

#### Behavioral coverage

Cover only relevant classes, including:

- primary success path;
- alternate valid paths;
- invalid input and boundary values;
- empty, absent, duplicate, or stale data;
- permissions and actor differences;
- state transitions, retries, idempotency, and concurrency;
- failure, recovery, partial completion, and external dependency behavior;
- compatibility, migration, audit, privacy, accessibility, and performance.

Do not add ceremonial examples for irrelevant classes. Do not impose a fixed acceptance-criteria count; complexity and risk determine the necessary examples.

#### Acceptance and readiness

- Make every acceptance outcome objectively observable and deterministic enough to evaluate.
- Map each rule to at least one example and each example to planned verification evidence.
- Keep story-specific acceptance separate from the repository-wide Definition of Done.
- Resolve or explicitly defer all material questions with an owner and consequence.
- Obtain an engineering refinement response and disposition its concerns.
- Confirm developers can size the item; do not size it for them.

Assign **Ready** only when every applicable readiness condition is satisfied. Otherwise state the exact missing evidence, decision, or collaboration.

### 8. Order the backlog

Order items instead of assigning independent priority labels alone. Consider:

- the strategic order, roadmap horizon, and non-goals supplied by the approved Product Vision & Strategy Brief;
- contribution to the active Product Goal;
- expected user or business outcome and strength of evidence;
- risk reduction and learning value;
- urgency, opportunity window, and cost of delay;
- dependencies and sequencing;
- ability to unlock several high-value Ready items or enable validated concurrency;
- effort or uncertainty information supplied by developers;
- impact on current users, trust, safety, compliance, and operations.

Do not use arbitrary fixed weights or pretend precision. Use a scoring model only when the organization has chosen it, document inputs and uncertainty, and treat the result as decision support rather than the decision.

Do not use velocity, story points, or agent utilization as a measure of product value or team performance. Never order low-value work ahead of higher-value work merely to keep more agents busy.

### 9. Plan parallel implementation

Use this step when more than one Ready item could advance concurrently. If the request is planning-only, return the plan without dispatching implementation agents.

#### Build and validate the dependency graph

Represent each implementation-ready story or work package as a node and each must-precede relationship as a directed edge. Ask `software_engineer` to validate the graph against repository evidence, including:

- direct and hidden dependencies;
- shared interfaces, contracts, schemas, migrations, state, or mutable resources;
- overlapping files, modules, tests, fixtures, or build resources;
- compatibility, rollout, and integration sequencing;
- prerequisites required to make a boundary stable.

Do not infer independence merely because items concern different features or directories. Record disputed or unverified edges as blockers to parallel dispatch.

Classify every package:

- **Parallel-ready**: It has no unresolved predecessor, an exclusive change surface, independently testable acceptance outcomes, and either no shared contract or a stable contract with one explicit owner.
- **Conditionally parallel**: It can proceed after a contract, stub, migration, feature flag, decision, or other prerequisite is baselined.
- **Sequential**: It depends on behavior, data, or a shared mutable boundary that cannot safely be divided.
- **Blocked**: A required product decision, technical fact, external dependency, or Ready condition is unresolved.

The Product Owner decides product priority and which outcomes should be pursued first. Engineers own technical dependency validation, change-surface ownership, implementation tasks, estimates, and the capacity commitment.

#### Construct priority-ordered waves

Topologically order the validated graph, then form delivery waves:

1. Put contract decisions, spikes, and unavoidable prerequisites in **Wave 0**.
2. Put the highest-ordered independent Parallel-ready packages in the next wave.
3. Define an integration gate that verifies each package and their combined behavior.
4. Release dependent packages only after their predecessors and integration gate pass.

Within every wave, preserve a deterministic product order based on Product Goal contribution, expected value, urgency, risk reduction, and learning. A wave identifies work that *may* run concurrently; it does not promise that developer capacity is available.

Define each work package with:

- a unique identifier and story specification revision;
- the product outcome, in-scope behavior, and non-goals;
- prerequisites, concurrency classification, and wave;
- an exclusive change surface supplied by engineering;
- a single owner for every shared contract;
- acceptance-example references and required verification;
- the integration gate and the Product Owner route for scope or behavior questions.

If two packages must modify the same file, module, schema, migration, contract, or mutable resource, serialize them or have one engineering owner baseline the shared boundary before dependent agents begin. Never let multiple implementation agents silently own the same scope.

When authorized to synchronize the plan, represent work packages as issues or sub-issues in the issue tracker and must-precede edges as supported issue relationships. Use existing workspace conventions for wave or integration-gate metadata; do not create labels, statuses, projects, milestones, or cycles merely to encode the plan without explicit approval.

#### Coordinate authorized execution

When implementation is explicitly authorized:

1. Respect the repository's agent-thread limit and preserve capacity for orchestration and integration.
2. Assign each Parallel-ready package to a separate `software_engineer` with its exclusive scope, baselined specification, prerequisites, and required checks.
3. Keep Sequential, Blocked, and unmet Conditionally parallel packages undispatched.
4. Wait for every agent in the wave to report its outcome; do not release dependent work early.
5. Have engineering run the integration gate and resolve merge or contract failures before the next wave.
6. Return scope, acceptance, or priority changes to the Product Owner. Keep implementation and merge decisions with engineering.

An individual package failure blocks only its dependents unless the shared contract or integration gate invalidates the whole wave. Unrelated packages may continue. Require integration gates to report package- and contract-specific outcomes when the plan relies on failure isolation. If a gate exposes only one binary result, any gate failure blocks every downstream package tied to that gate. Completion requires each story's acceptance outcomes, the repository Definition of Done, and the wave's aggregate integration gate—not merely successful agent reports.

### 10. Baseline, hand off, and learn

Before implementation:

1. Record the specification revision and Ready decision.
2. With explicit authorization, synchronize the approved revision, readiness, product order, scope links, and validated relationships to the issue tracker through MCP; re-read the affected objects to verify them.
3. Hand a single approved specification to `software_engineer`, or use the authorized wave plan to hand each exclusive work package to a separate `software_engineer`.
4. Ask each engineer to confirm the implementation will target the assigned revision and scope and to return product ambiguities instead of guessing.

During implementation, answer product questions and update the specification when intended behavior changes. Record the decision and affected rules/examples; never allow code and specification to diverge silently.

At validation, inspect the Increment against the acceptance examples and the repository Definition of Done. A Product Owner acceptance decision does not override an unmet Definition of Done.

After release, compare observed outcomes with the baseline, target, and guardrails. Record learning, adapt backlog ordering, and revise or abandon assumptions that evidence disproves.

## Communication contract

Lead with the decision or blocker. Keep language direct, product-focused, and evidence-based.

When returning a refined story, include:

1. Product decision summary.
2. Story state and readiness verdict.
3. Product Goal and intended outcome.
4. Story specification or a link to it.
5. Engineer questions and dispositions.
6. Open questions, owners, and consequences.
7. Ordering rationale.
8. When multiple items are in scope, the validated dependency graph, concurrency classification, delivery waves, exclusive work-package ownership, and integration gates.
9. Issue identifiers, synchronization status, verified mutations, and any pending or failed write.
10. Explicit handoff or next evidence required.

Do not create, update, move, assign, archive, or relate objects in the issue tracker without explicit authorization. Draft locally first, show the material proposed mutation, write only through the issue-tracker MCP server, and verify the result by re-reading it.

## Foundations

Consult [foundations.md](references/foundations.md) when interpreting role boundaries, adapting the workflow, or evaluating proposed Product Owner practices. Prefer the Scrum Guide for accountability, collaborative refinement for shared understanding, example-based specification for behavior, and requirements-engineering quality criteria for precision.
