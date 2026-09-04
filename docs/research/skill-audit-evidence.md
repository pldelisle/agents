# Evidence base for auditing the repository's agent skills

Research snapshot: 2026-09-04

## Purpose and evidence policy

This note translates research and first-party guidance into review criteria for the repository's `SKILL.md` files. It does not audit or modify the skills themselves.

Sources are weighted as follows:

1. **Normative/first-party:** the Agent Skills specification, vendor documentation, and framework definitions. Use these for format, compatibility, lifecycle, and product-accountability claims.
2. **Empirical research:** peer-reviewed papers and systematic reviews. Use these for claims about observed quality, requirements, testing, and review outcomes.
3. **Emerging preprints:** recent agent-skill studies that have not necessarily completed peer review. Use these as directional evidence and hypotheses to reproduce locally, not as settled fact.
4. **Practitioner literature:** Matt Pocock, *Clean Code*, *Clean Architecture*, and Medium articles. These are useful design lenses, but they are not substitutes for evaluation or empirical evidence.

## Executive audit standard

A strong skill should have:

- a precise routing contract: what user intent activates it, what adjacent intent does not, and one coherent outcome;
- a small, high-signal `SKILL.md`, with conditional detail behind one-level-deep references;
- direct, reusable procedures whose specificity matches the fragility of the task;
- explicit inputs, outputs, side effects, stop conditions, and observable completion criteria;
- environment-grounded tool use, validation loops, and failure handling;
- traceability from source evidence or product intent to output and verification;
- a version-controlled evaluation set that measures activation, trajectory, outcome, cost, and coexistence;
- lifecycle ownership, compatibility assumptions, and a deprecation path.

The sections below give the evidence and concrete audit questions for each criterion.

## 1. Routing and scope are part of the interface

The `name` and `description` are always-loaded routing metadata, while the body loads after activation; the official specification therefore requires a description that says both what the skill does and when to use it. It caps names at 64 characters and descriptions at 1,024 characters. [Agent Skills specification](https://agentskills.io/specification)

The official description-optimization guide says under-specified descriptions miss relevant tasks and over-broad descriptions trigger on irrelevant ones. It recommends intent-focused descriptions and approximately 20 realistic routing queries, split between positive cases and near-miss negatives, with varied phrasing and multiple runs because activation is nondeterministic. [Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions)

Anthropic's enterprise guidance adds a collection-level requirement: test a skill by itself and alongside installed peers, because a broad description can steal triggers from another skill or conflicting instructions can degrade both. [Skills for enterprise](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise)

**Audit checks**

- Can the skill's owned outcome be stated in one sentence?
- Does the description lead with user intent rather than implementation mechanics?
- Does it name distinct trigger branches without repeating synonyms?
- Are adjacent near-misses clear, especially where `implement`, `engineer-tests`, `code-review`, `to-design-document`, `to-specs`, `to-tickets`, and `discuss-vision` meet?
- Is there a positive/negative routing test set, including ambiguous multi-intent requests?
- Has coexistence been tested against every neighboring skill rather than only in isolation?

**Failure signals**

- the description is merely a summary of the body;
- several skills plausibly own the same request;
- the skill performs discovery, specification, implementation, and independent review in one invocation without an explicit handoff boundary;
- routing is justified only by keywords rather than the user's intended outcome.

## 2. Context is a finite quality budget

The Agent Skills specification recommends a body below 5,000 tokens and 500 lines, detailed material in separate files, relative links, and reference chains no deeper than one level. [Agent Skills specification](https://agentskills.io/specification)

Anthropic defines effective context engineering as finding the smallest high-signal token set that makes desired behavior likely. Its guidance recommends simple, direct prompts at the right altitude, a small set of diverse canonical examples instead of an edge-case laundry list, and just-in-time retrieval through lightweight pointers. [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

This is not only a cost concern. Controlled long-context studies found that relevant information can become harder to use when buried in the middle of a long prompt, and that irrelevant context can distract language models. [Liu et al., *Lost in the Middle*](https://arxiv.org/abs/2307.03172), [Shi et al., *Large Language Models Can Be Easily Distracted by Irrelevant Context*](https://proceedings.mlr.press/v202/shi23a.html)

Anthropic's authoring checklist says to include only context the model does not already know, keep the body under 500 lines, use one-level-deep references, avoid time-sensitive information, and keep terminology consistent. [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

**Audit checks**

- Would removing each paragraph change behavior on a representative task? If not, remove it.
- Is information required on nearly every run in the body, and branch-specific material in a reference?
- Does each reference pointer say exactly when to read the file?
- Are critical gotchas visible before the agent reaches the failure, rather than hidden in optional material?
- Are the same principles duplicated across multiple skills, global instructions, or references?
- Are canonical examples diverse and diagnostic, or numerous restatements of one rule?
- Is volatile runtime, tracker, model, or library detail isolated from stable policy?

**Failure signals**

- background tutorials explaining concepts a capable model already knows;
- long flat lists in which safety rules, completion conditions, and ordinary advice have equal visual weight;
- deep reference chains or references that must be read in full on every run;
- repeated framework doctrine in every skill instead of a shared, conditionally loaded source;
- stale version-specific advice presented as timeless.

## 3. Instructions should constrain outcomes at the right altitude

The official authoring guide recommends matching control to task fragility: allow judgment where several approaches are valid, be exact where ordering or destructive operations are fragile, provide a default instead of an undifferentiated menu, and teach a reusable procedure rather than the answer to one instance. [Best practices for skill creators](https://agentskills.io/skill-creation/best-practices)

Anthropic recommends simple, composable agent patterns and adding complexity only when it produces measurable value. It distinguishes predictable workflows for well-defined tasks from agents for tasks that require flexible, model-directed decisions. [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

Matt Pocock's first-party practitioner guide frames predictability as repeatable process rather than identical output. It advocates checkable completion criteria, defaults, progressive disclosure, a single source of truth, and deletion of sentences that do not change behavior. This is practitioner opinion, not controlled evidence, but it is directly relevant because the repository's skills share this design lineage. [Pocock, *writing-for-agents*](https://www.aihero.dev/skills-writing-for-agents), [Pocock, *AI Skills for Real Engineers*](https://www.aihero.dev/skills-post)

**Audit checks**

- Does each workflow step start with a concrete action and end with a checkable done condition?
- Is an exact command or sequence prescribed only when exactness is part of correctness?
- Are defaults explicit, with exceptions described as conditions rather than equal options?
- Does the skill state the objective and invariants while leaving implementation choices to the role that owns them?
- Are `always`, `never`, and `must` reserved for actual invariants, safety constraints, or framework rules?
- Does the skill define when to pause, continue, retry, hand off, or terminate?

**Failure signals**

- vague declarations such as "follow best practices" or "ensure high quality";
- exhaustive command scripts for work that requires repository-specific judgment;
- multiple equally ranked methods with no default;
- completion defined as producing an artifact rather than verifying its intended effect;
- a rule repeated as prose, checklist item, warning, and final reminder.

## 4. Skills should be cohesive and hide change-prone detail

Parnas's foundational modularity paper argues that decomposition should hide design decisions likely to change, enabling one module to be understood and replaced with little knowledge of another. [Parnas, *On the Criteria To Be Used in Decomposing Systems into Modules*](https://www.cs.lafayette.edu/~gexia/cs301/resources/parnas.html)

The Agent Skills model applies this idea operationally: task-specific instructions are composable resources loaded on demand rather than fragments placed in one permanent prompt. [Anthropic, *Equipping agents for the real world with Agent Skills*](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

John Ousterhout's practitioner design lens favors deep modules: substantial useful behavior behind a small interface, while explicitly noting disagreements with *Clean Code* about method length and comments. This is author commentary, not empirical proof, but it is a useful warning against splitting solely by line count. [Ousterhout, *A Philosophy of Software Design* author page](https://web.stanford.edu/~ouster/cgi-bin/book.php)

Robert C. Martin's *Clean Architecture* says source dependencies should point toward higher-level policy, keeping business rules independent of external mechanisms. As an analogy for skill design—not a demonstrated law of prompting—stable product and engineering policy should not depend directly on a particular runtime or issue tracker. [Martin, *The Clean Architecture Dependency Rule*](https://www.informit.com/articles/article.aspx?p=2832399)

**Audit checks**

- Does each skill encapsulate one reason to change?
- Are tracker, runtime, tool, and model adaptations kept at the outside edge of the system?
- Are shared concepts owned by one reference skill or document rather than copied?
- Does extracting a section hide real complexity, or merely force extra navigation?
- Are handoff contracts between product discovery, specification, design, implementation, test engineering, and review explicit?
- Would changing one policy require synchronized edits to several skills?

**Failure signals**

- pass-through skills that add naming but no hidden complexity or leverage;
- circular dependencies between skills;
- one shared rule copied into every workflow;
- canonical product policy coupled to Linear/Jira, Codex/Claude/Kiro, or one command syntax;
- fragmentation into many tiny peers that the agent must all load to understand one job.

## 5. Tool use must be observable, bounded, and environment-grounded

Anthropic's tool-design guidance recommends a small set of distinct, composable tools; clear tool names and descriptions; high-signal responses; meaningful identifiers; filtering or pagination for large outputs; and actionable errors. It also recommends evaluating expected tool calls, not just final text. [Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

Anthropic's trustworthy-agent framework emphasizes that behavior emerges from the model, harness, tools, and environment together; it recommends human control over permissions and heightened care for consequential actions. [Trustworthy agents in practice](https://www.anthropic.com/research/trustworthy-agents)

The official skill guide recommends plan-validate-execute for destructive or batch work and bundling a tested script when execution traces show the agent repeatedly rebuilding deterministic logic. [Best practices for skill creators](https://agentskills.io/skill-creation/best-practices)

**Audit checks**

- Does the skill distinguish read-only inspection, local writes, destructive changes, and external communication?
- Does it require checking tool results before deciding the next action?
- Are retries bounded and separated from terminal failures?
- Are large responses narrowed, paginated, or summarized without losing required evidence?
- Are script dependencies, compatibility requirements, and trusted inputs explicit?
- Can deterministic validation or transformation be moved into a tested script?
- Does the skill verify environmental state instead of assuming a command succeeded?

**Failure signals**

- treating a successful tool call as proof of the desired outcome;
- hidden or ambiguous side effects;
- unbounded retry loops;
- raw error output without a recovery branch;
- instructions to load untrusted network content without a trust boundary;
- shell commands with hard-coded paths or values where repository discovery is required.

## 6. Every material skill needs behavioral evaluations

The official evaluation guide says to compare each task with and without the skill—or against its previous version—in clean contexts; use realistic prompts, varied phrasing, edge cases, objective assertions where possible, human review for subjective qualities, and token/time measurements. It also recommends reading execution traces and removing assertions that pass equally in both conditions because they do not demonstrate skill value. [Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills)

Anthropic recommends evaluating triggering accuracy, isolation, coexistence, instruction following, and output quality before deployment, with representative positive, negative, and ambiguous queries and separation between author and reviewer. [Skills for enterprise](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise)

Agent evaluations should distinguish the final outcome from the trajectory that produced it, use multiple trials, combine deterministic and model/human graders, and inspect transcripts regularly. [Anthropic, *Demystifying evals for AI agents*](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

OpenAI similarly recommends eval-driven development, production-like distributions, typical/edge/adversarial cases, continuous evaluation, and human calibration of automated graders. Trace grading is intended to assess end-to-end decisions, tool calls, and intermediate results rather than only the last message. [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [OpenAI trace grading](https://developers.openai.com/api/docs/guides/trace-grading)

Recent preprints reinforce the need for local tests rather than reputation-based adoption. SkillsBench reports an average 16.2 percentage-point pass-rate improvement from curated skills across its diverse benchmark, but negative deltas on 16 of 84 tasks and large domain variation. [Li et al., *SkillsBench* preprint](https://arxiv.org/abs/2602.12670) SWE-Skills-Bench reports only a 1.2-point average gain in its software-engineering benchmark, with 39 of 49 skills producing no improvement and three degrading performance because guidance conflicted with project context. [Han et al., *SWE-Skills-Bench* preprint](https://arxiv.org/abs/2603.15401)

**Minimum evaluation contract per skill**

- **Activation:** representative should-trigger, should-not-trigger, and ambiguous prompts, run repeatedly.
- **Outcome:** deterministic state or artifact checks wherever possible; a calibrated rubric otherwise.
- **Trajectory:** required and forbidden actions, tool choice, arguments, evidence consulted, and validation steps.
- **Reliability:** more than one trial under a fixed model, harness, repository state, and budget.
- **Regression:** every observed production or review failure becomes a durable case.
- **Coexistence:** run with the normal installed collection, not only the tested skill.
- **Portability:** exercise every supported runtime/tracker transformation that can change semantics.
- **Cost:** record tokens, wall time, tool calls, and retries against the baseline.
- **Review:** retain raw artifacts and traces, and use an evaluator independent of the authoring context for consequential changes.

**Failure signals**

- "it worked once" as the only acceptance evidence;
- snapshot tests of wording when semantic outcomes matter;
- a final-answer grader that cannot see harmful side effects or skipped steps;
- no baseline, no repeated runs, or changed harness settings between variants;
- tuning on every test case with no held-out validation set;
- no regression case for a previously observed failure.

## 7. Trace product intent and evidence through every artifact

An empirical study of 24 medium-to-large open-source projects found that greater completeness of requirements traceability for three studied activities significantly affected defect rate, although the authors appropriately present this as project-level empirical evidence rather than a universal causal law. [Rempel and Mäder, *Preventing Defects: The Impact of Requirements Traceability Completeness on Software Quality*](https://www.researchgate.net/profile/Patrick-Rempel/publication/309523115_Preventing_Defects_The_Impact_of_Requirements_Traceability_Completeness_on_Software_Quality/links/5a00296e458515d0706e8af4/Preventing-Defects-The-Impact-of-Requirements-Traceability-Completeness-on-Software-Quality.pdf)

A newer systematic review finds that end-to-end traceability methods and industrial evaluations remain limited, so a lightweight, useful trace is better justified than a heavy compliance matrix copied into every workflow. [Koboyatshwene and Ayalew, *Requirements Traceability: A Systematic Literature Review*](https://doi.org/10.1145/3672608.3707952)

NASA's requirements-management guidance provides the high-assurance version of the principle: requirements should trace to their source and to verification/validation results. That rigor is context-specific, but the basic test—can a reviewer follow why an artifact exists and how it was verified—is broadly useful. [NASA, Requirements Management](https://www.nasa.gov/reference/6-2-requirements-management/)

**Audit checks**

- Can every proposed requirement be traced to a source: user evidence, product decision, standard, defect, or explicit assumption?
- Can every acceptance example and test be traced back to the requirement it verifies?
- Are facts, assumptions, decisions, and recommendations labeled separately?
- Do generated tickets preserve stable requirement identifiers instead of paraphrasing away the link?
- Does code review compare against the originating spec and repository standards independently?
- Are citations attached to the exact claim they support, and are primary sources preferred where available?

**Failure signals**

- unattributed "best practices" turned into requirements;
- product assumptions reported as discovered facts;
- acceptance criteria that cannot be linked to a user outcome or rule;
- tests listed without saying which requirement or risk they cover;
- traceability implemented as duplicated prose that will drift.

## 8. Product skills should optimize outcomes and learning, not document production

The Scrum Guide makes the Product Owner accountable for maximizing product value and for a clear, visible, understood, ordered Product Backlog. It defines the Product Goal as a future target, keeps sizing with Developers, and describes refinement as an ongoing activity that adds precision as more is learned. [Schwaber and Sutherland, *The Scrum Guide*](https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf)

Scrum.org's Evidence-Based Management guide distinguishes activities and outputs from outcomes experienced by customers. It treats every feature or requirement as a hypothesis about value and recommends explicit hypotheses, small experiments, measures, and adaptation based on results. This is first-party framework guidance, not independent proof that Scrum or EBM is optimal in every context. [*Evidence-Based Management Guide*, 2024](https://www.scrum.org/resources/online-evidence-based-management-guide)

A systematic review of 21 empirical studies on agile requirements engineering reports benefits from customer involvement, evolving requirements, continuous prioritization, prototyping, cross-functional collaboration, and frequent validation. It also reports limitations: minimal documentation becomes risky when communication is weak or teams are distributed, and non-functional requirements such as security and scalability are often under-addressed. [Inayat et al., *A systematic literature review on agile requirements engineering practices and challenges*](https://ris.utwente.nl/ws/files/6414697/1-s2.0-S074756321400569X-main.pdf)

An industry interview study found that systematic continuous experimentation was rare even where practitioners valued it; cited success factors included deep customer/domain knowledge, supportive culture, appropriate skills/tools, and suitable value measures. This is qualitative evidence from ten Finnish companies, so it should guide questions rather than mandate one process. [Fagerholm et al., *Raising the odds of success*](https://doi.org/10.1016/j.infsof.2016.04.008)

**Audit checks**

- Does a product skill begin with the customer, stakeholder, or organizational change sought rather than the artifact to write?
- Does it preserve the chain `vision/goal -> outcome -> hypothesis -> requirement -> acceptance evidence -> delivery feedback`?
- Does it distinguish discovery facts from product decisions and engineering decisions?
- Does backlog ordering weigh value, risk, learning, and dependencies without taking developer-owned sizing?
- Are non-functional requirements and operational risks elicited explicitly?
- Does the workflow support progressive refinement instead of pretending requirements are complete once documented?
- Does a prototype answer a named uncertainty and state what observation would change the decision?

**Failure signals**

- success defined as creating a vision, spec, design, or ticket rather than improving shared understanding or enabling a decision;
- a feature list with no expected customer outcome or measure;
- a backlog ordered only by stakeholder urgency or estimated effort;
- PM/PO instructions that prescribe implementation or developer estimates;
- discovery, prioritization, and implementation decisions collapsed into one role;
- prototypes or research without an explicit question, hypothesis, or decision threshold.

## 9. Treat coding doctrines as heuristics and verify them against behavior

*Clean Code* advocates small, well-named, organized units; meaningful names; limited duplication; and clean functions. Those are influential practitioner heuristics, not universal empirical laws, and the second edition itself presents them as craftsmanship guidance. [Martin, *Clean Code*, 2nd ed.](https://www.informit.com/store/clean-code-a-handbook-of-agile-software-craftsmanship-9780135398579)

Human-rated readability research found that local code features can predict readability judgments and that readability correlated with code changes and defect reports in the studied corpus, but it also found some surprising results—for example, comments alone mattered less to local readability judgments than simple formatting features. This supports evaluating comprehensibility rather than enforcing a ritualized style proxy. [Buse and Weimer, *A Metric for Software Readability*](https://web.eecs.umich.edu/~weimerw/p/weimer-issta2008-readability.pdf)

Evidence on code smells is mixed. One systematic review found several smells associated with bugs, while another concluded there was no strong evidence that smells reliably evaluate design quality or maintenance effort and reported low human agreement on smell detection. [Santos et al., *The Impact of Code Smells on Software Bugs*](https://www.mdpi.com/2078-2489/9/11/273), [Sobrinho et al., *A systematic review on the code smell effect*](https://doi.org/10.1016/j.jss.2018.07.035)

Code review has broader value than defect finding. An empirical Microsoft study found benefits in knowledge transfer, team awareness, and alternative solutions, while change understanding was a central difficulty. A separate case study across Qt, VTK, and ITK found significant links between review coverage, participation, expertise, and post-release quality. [Bacchelli and Bird, *Expectations, Outcomes, and Challenges of Modern Code Review*](https://www.cabird.com/pubs/bacchelli2013eoc.pdf), [McIntosh et al., *Impact of Modern Code Review Practices on Software Quality*](https://rebels.cs.uwaterloo.ca/journalpaper/2015/03/03/an-empirical-study-of-the-impact-of-modern-code-review-practices-on-software-quality.html)

**Audit checks**

- Does a skill ask whether code is comprehensible and change-safe, or merely count style smells?
- Are architecture principles applied in proportion to the change rather than as mandatory ceremony?
- Does review require understanding the change, its specification, and its risk before scanning for generic defects?
- Are standards findings separated from spec-conformance findings so evidence and remediation stay clear?
- Does the skill avoid presenting one author's style preference as empirical certainty?

## 10. Testing guidance needs both rigor and escape conditions

A meta-analysis of 27 TDD studies found a small positive average effect on external quality and little to no overall productivity effect, with larger quality gains and productivity drops in industrial subgroups. A later systematic review found mostly positive quality results but heterogeneous productivity effects. TDD is therefore evidence-supported as a useful default in many settings, but the effect is context-dependent rather than a universal guarantee. [Rafique and Mišić, *The Effects of Test-Driven Development on External Quality and Productivity*](https://doi.org/10.1109/TSE.2012.28), [Bissi et al., *The effects of test driven development on internal quality, external quality and productivity*](https://doi.org/10.1016/j.infsof.2016.02.004)

Google's long-running mutation-testing study found that exposing surviving mutants encouraged developers to add tests and improve test suites, but mutation analysis has known operator, equivalent-mutant, and cost limitations. It is best used selectively as evidence of test-suite sensitivity, not as a universal gate. [Petrovic et al., *Long Term Effects of Mutation Testing*](https://research.google/pubs/long-term-effects-of-mutation-testing/), [Kintis et al., *How effective are mutation testing tools?*](https://orbilu.uni.lu/handle/10993/35336)

**Audit checks**

- Does the test skill choose techniques from product risk and observability rather than from a fixed pyramid?
- Does test-first guidance define an explicit exception path for legacy, exploratory, generated, infrastructure, or otherwise hard-to-observe work?
- Does the exception require compensating verification and a statement of residual risk?
- Are acceptance, integration, security, performance, reliability, accessibility, and compatibility risks considered where relevant?
- Are tests judged by fault detection and requirement coverage, not only code coverage or test count?
- Are expensive methods such as mutation testing targeted to critical logic or suspiciously weak suites?

## 11. Skill maintenance should be empirical and version-aware

Anthropic recommends an explicit skill lifecycle: plan, create and independently review, test in isolation and coexistence, deploy with owner/version metadata, monitor, rerun evaluations, iterate, and deprecate persistent failures or retired workflows. [Skills for enterprise](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise)

Two emerging preprints provide useful warnings. A study of 238 sampled skills reports that more than 99% contained at least one author-defined "skill smell" and that smells rarely disappeared over file history; because the smell taxonomy came partly from multivocal practitioner literature and automated detection, the prevalence should be treated as a signal to inspect, not proof that 99% of skills are behaviorally defective. [Hong et al., *From Anatomy to Smells* preprint](https://arxiv.org/abs/2607.01456) SkillReducer reports that over 60% of body content in 55,315 public skills was classified as non-actionable and that compression improved its benchmark by 2.8%; this is promising but should be reproduced on this repository's tasks and models before adopting automated pruning. [Gao et al., *SkillReducer* preprint](https://arxiv.org/abs/2603.29919)

**Audit checks**

- Does every skill have an owner, compatibility statement, and last-verified model/runtime matrix?
- Are changes tied to an observed failure, a changed external contract, or a measured improvement?
- Does every material edit rerun routing, behavioral, coexistence, and portability evaluations?
- Is obsolete guidance removed rather than accumulated beneath exceptions?
- Can a skill be deprecated without breaking neighboring skills?
- Are the canonical source and generated runtime variants checked for semantic equivalence?

## Practitioner perspectives requested by the user

### Matt Pocock — first-party practitioner guidance

Pocock argues for small, inspectable skills; a router when the number of user-invoked skills exceeds what a person can remember; explicit information hierarchy; one source of truth; checkable completion criteria; and sentence-level pruning. These ideas align with official progressive-disclosure guidance, but Pocock's claims about what works are practitioner experience unless backed by a local evaluation. [*AI Skills for Real Engineers*](https://www.aihero.dev/skills-post), [*The writing-for-agents Skill*](https://www.aihero.dev/skills-writing-for-agents)

Actionable use: apply Pocock's "no-op" test to each sentence, but decide deletion with paired behavior tests; use a router only where it reduces genuine discovery burden; and keep shared vocabulary in one referenced source.

### *Clean Code* and *Clean Architecture* — influential books, secondary/opinion

Use *Clean Code* as a readability and cohesion checklist, not a line-count law. Use *Clean Architecture* as a dependency-direction analogy: product intent and engineering policy should remain stable while runtime, tracker, model, and tool adapters vary. Neither book is empirical evidence that a particular skill structure improves agent performance. [*Clean Code*, publisher page](https://www.informit.com/store/clean-code-a-handbook-of-agile-software-craftsmanship-9780135398579), [*The Clean Architecture Dependency Rule*, author excerpt](https://www.informit.com/articles/article.aspx?p=2832399)

### Medium — practitioner anecdotes, lowest evidence weight

Two Medium articles echo the three-layer progressive-disclosure model and argue for concise bodies, explicit resource routing, and validation. They mostly restate first-party documentation and provide no independent controlled evidence, so use their examples as idea generators only. [Naresh Jampani, *Inside Claude Agent Skills: A Developer's Deep Dive*](https://medium.com/@nareshjampani28/inside-claude-agent-skills-a-developers-deep-dive-bcf4479debcc), [Todd Thomas, *The Coherence Cascade for AI*](https://medium.com/@todd.dsm/why-progressive-disclosure-works-for-ai-agents-a-theory-of-motivated-retrieval-665a9d1ea23a)

Actionable use: mine practitioner posts for possible gotchas and test cases, then verify every borrowed prescription against official contracts, repository evidence, and with/without-skill evaluation.

## Recommended review order

1. **P0 — correctness and control:** destructive side effects, external writes, missing stop conditions, unsupported tools, conflicting role authority, and unverified completion.
2. **P1 — behavioral efficacy:** trigger overlap, missing acceptance evidence, missing evals, no traceability, and instructions that can silently skip necessary work.
3. **P2 — context and maintainability:** duplication, stale guidance, overly long bodies, deep references, runtime coupling, and option menus.
4. **P3 — editorial consistency:** naming, headings, voice, formatting, and examples that do not materially affect behavior.

This ordering follows the empirical lesson that observable outcome and safe trajectory matter more than textual tidiness; a shorter or cleaner skill is only an improvement when it preserves or improves behavior under representative evaluation. [Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills), [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)

## Compact audit scorecard

Score each dimension 0–2 (`0 = absent/unsafe`, `1 = partial`, `2 = explicit and evaluated`). Do not average away a P0 failure.

| Dimension | Evidence expected for score 2 |
|---|---|
| Scope | One coherent owned outcome and explicit non-goals/handoffs |
| Routing | Positive, near-miss negative, and ambiguous activation tests |
| Context | Essential body; conditional, one-level-deep references; no duplication |
| Instruction quality | Concrete steps, calibrated freedom, defaults, completion criteria |
| Tool/control safety | Side effects, permissions, result checks, retries, and stops are explicit |
| Product alignment | Outcome, hypothesis, stakeholder evidence, and decision authority preserved |
| Traceability | Source-to-requirement-to-test/review links survive each handoff |
| Verification | Deterministic outcome checks where possible and calibrated review otherwise |
| Evaluation | Baseline, repeated clean runs, trajectory/outcome/cost grading, held-out cases |
| Coexistence/portability | Tested with neighboring skills and every supported generated variant |
| Lifecycle | Owner, compatibility, last verification, regression set, deprecation path |

## Bottom line

The most defensible improvement program is not a blanket rewrite toward shorter prose. It is an eval-driven cycle: clarify ownership and routing, remove no-op or duplicated context, isolate change-prone details, add observable completion and safety checks, preserve product/evidence traceability, and prove each material change against a baseline in clean repeated runs. That synthesis is supported most directly by the Agent Skills authoring and evaluation guides, Anthropic's context and enterprise guidance, and the mixed results in recent skill benchmarks. [Best practices for skill creators](https://agentskills.io/skill-creation/best-practices), [Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills), [Skills for enterprise](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise), [SkillsBench](https://arxiv.org/abs/2602.12670), [SWE-Skills-Bench](https://arxiv.org/abs/2603.15401)
