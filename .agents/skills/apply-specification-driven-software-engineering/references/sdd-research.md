# SDD Research Synthesis

Read this reference when comparing SDD approaches, adapting the shared method, explaining
why a control exists, or revisiting the skill as the field changes. These sources are
methodology inputs, not runtime dependencies or proof that SDD is universally superior.

## Current primary guidance

- [GitHub Spec Kit: What is SDD?](https://github.github.com/spec-kit/concepts/sdd.html)
  defines intent-first, multi-step refinement and the Spec -> Plan -> Tasks -> Implement
  structure.
- [GitHub Spec Kit: Agentic SDD](https://github.github.io/spec-kit/reference/agentic-sdd.html)
  adds clarification, requirements checklists, read-only cross-artifact analysis, staged
  implementation, and convergence.
- [GitHub Spec Kit: persistence models](https://github.github.com/spec-kit/concepts/spec-persistence.html)
  distinguishes flow-back, flow-forward, and living-spec mutation strategies.
- [Kiro requirements-first workflow](https://kiro.dev/docs/specs/feature-specs/requirements-first/)
  demonstrates EARS-style requirements, explicit review, design, tasks, and iterative
  synchronization.
- [Cucumber BDD guidance](https://cucumber.io/docs/bdd/) contributes collaborative
  discovery, formulation by concrete examples, automation, and living documentation.
- [ISO/IEC/IEEE 29148:2018](https://www.iso.org/standard/72089.html) and
  [NASA requirements guidance](https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/)
  anchor requirement quality, verification, and traceability.
- [NASA requirements management](https://www.nasa.gov/reference/6-2-requirements-management/)
  supports bidirectional traceability and mapping verification results to requirements.

## Research and critical practice

- Piskala's 2026 technical report,
  [*Spec-Driven Development: From Code to Contract*](https://arxiv.org/abs/2602.00180),
  usefully distinguishes spec-first, spec-anchored, and spec-as-source. Treat its case
  claims as a practitioner synthesis, not settled comparative evidence.
- Krishna et al.,
  [*Using LLMs in Software Requirements Specifications*](https://arxiv.org/abs/2404.17842),
  found value in LLM-assisted drafting and validation but also incompleteness and a need
  for better validation guidance. Keep humans and deterministic checks in the loop.
- Reinpold et al.,
  [*Exploring LLMs for Verifying Technical System Specifications Against Requirements*](https://arxiv.org/abs/2411.11582),
  reported promising but imperfect classification against a formal benchmark. Do not use
  an LLM alone as the conformance oracle.
- Böckeler's
  [comparison of Kiro, Spec Kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
  identifies variable meanings of SDD, excessive artifact volume, poor fit for small work,
  nondeterminism, and a false sense of control.
- The [Thoughtworks Technology Radar SDD entry](https://www.thoughtworks.com/en-us/radar/techniques/spec-driven-development)
  places the emerging technique at **Assess** and warns that elaborate workflows and
  lengthy generated specs do not fit every task.
- Thoughtworks' 2026 [feedback flywheel](https://www.thoughtworks.com/en-us/radar/techniques/feedback-flywheel)
  extends spec-to-implementation work with human-reviewed improvements to shared agent
  instructions and feedback sensors. Keep durable lessons, but filter noisy session-local
  observations before changing the harness.
- Medium field reports from
  [Thoughtworks](https://thoughtworks.medium.com/spec-driven-development-d85995a81387)
  and [arconsis](https://medium.com/arconsis/part-5-speckit-turning-github-copilot-into-a-specification-driven-teammate-c84c3cfc2ca4)
  reinforce short feedback loops, explicit technical context, phase review, and the risk
  of spec drift. Treat practitioner anecdotes as hypotheses to validate locally.

Revisit the source set when materially changing this method: SDD tooling and terminology
are evolving quickly.
