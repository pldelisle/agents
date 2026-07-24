# Method Foundations

Use this reference to understand why the review method is structured as it is or to adapt it to
a new review context. The skill synthesizes these sources; it does not require ritual adherence
to any one framework.

## Review and inspection

- Michael Fagan, *Design and Code Inspections to Reduce Errors in Program Development*, IBM
  Systems Journal 15(3), 1976, DOI `10.1147/sj.153.0182`. Adopt systematic preparation,
  explicit defect detection, role separation, and follow-through; adapt the heavyweight meeting
  mechanics to modern asynchronous review.
- Google, [Engineering Practices: Code Review](https://google.github.io/eng-practices/review/reviewer/).
  Adopt broad-to-narrow navigation, design-first review, actionable comments, timely progress,
  and the standard that a change should preserve or improve overall code health rather than be
  perfect.
- Alberto Bacchelli and Christian Bird,
  [*Expectations, Outcomes, and Challenges of Modern Code Review*](https://www.microsoft.com/en-us/research/publication/expectations-outcomes-and-challenges-of-modern-code-review/),
  ICSE 2013. Adopt change understanding as the prerequisite for useful review and recognize
  defect finding, alternative solutions, knowledge transfer, and team awareness as legitimate
  outcomes without confusing comment volume with effectiveness.
- Caitlin Sadowski et al.,
  [*Modern Code Review: A Case Study at Google*](https://research.google/pubs/modern-code-review-a-case-study-at-google/),
  ICSE-SEIP 2018. Adopt lightweight, regular, tool-supported review and keep rigor proportional
  enough to work at high change volume.
- NIST, [Secure Software Development Framework 1.1, SP 800-218](https://doi.org/10.6028/NIST.SP.800-218),
  especially PW.7. Adopt documented peer review, review of analysis and test evidence, security
  standards, expert review for high-risk content, and triage of discovered issues.

## Architecture and design

- Rick Kazman et al., [The Architecture Tradeoff Analysis Method](https://www.sei.cmu.edu/library/the-architecture-tradeoff-analysis-method-2/),
  Software Engineering Institute, 1998. Adopt quality-attribute scenarios and explicit
  identification of risks, sensitivity points, and trade-off points; use a lightweight form for
  change review rather than reproducing the full multi-day ATAM process.
- Len Bass, Paul Clements, and Rick Kazman, *Software Architecture in Practice*, 4th ed.,
  Addison-Wesley, 2021. Adopt scenario-based reasoning about quality attributes and explicit
  connection between business drivers, architectural decisions, and system qualities.
- David Parnas, “On the Criteria To Be Used in Decomposing Systems into Modules,”
  *Communications of the ACM* 15(12), 1972, DOI `10.1145/361598.361623`. Adopt information
  hiding and likely-to-change design decisions as stronger modularity criteria than execution
  sequence alone.

## Refactoring and changeability

- Martin Fowler, *Refactoring: Improving the Design of Existing Code*, 2nd ed., Addison-Wesley,
  2018, and the [Catalog of Refactorings](https://refactoring.com/catalog/). Adopt small,
  behavior-preserving transformations and use code smells as investigation prompts, not
  automatic findings.
- Michael Feathers, *Working Effectively with Legacy Code*, Prentice Hall, 2004. Adopt
  characterization tests, seams, and cautious dependency control when current behavior is the
  only available specification.
- Steve McConnell, *Code Complete*, 2nd ed., Microsoft Press, 2004. Adopt focused construction
  checklists, defect-oriented inspection, and attention to data, control, interfaces, and error
  handling while avoiding checklist-only review.

## Application and supply-chain security

- OWASP, [Secure Code Review Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html)
  and [Code Review Guide](https://owasp.org/www-project-code-review-guide/). Adopt manual review
  of security-relevant data flow and context-specific vulnerability classes alongside automated
  analysis.
- OWASP, [Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html).
  Adopt the four-question threat-modelling loop: understand the system, identify what can go
  wrong, select mitigations, and validate sufficiency.
- OWASP, [Application Security Verification Standard 5.0](https://owasp.org/www-project-application-security-verification-standard/).
  Use ASVS as a source of verifiable control requirements for applicable web and service
  surfaces, not as a claim of certification.
- OWASP, [Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html),
  [Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html),
  [Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html),
  and [Vulnerable Dependency Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html).
  Adopt deny-by-default object-level authorization, least-privilege secret lifecycles, sensitive
  data exclusion, and contextual dependency-vulnerability analysis.
- OpenSSF, [Scorecard](https://github.com/ossf/scorecard). Use provenance, review practice,
  maintenance, pinned dependencies, token permissions, and vulnerability signals as dependency
  trust evidence while respecting that heuristic scores have false positives and negatives.

## Synthesis decisions

The skill deliberately combines these traditions as follows:

- Use inspection discipline to make reviews reproducible, but keep process proportional to
  risk and change size.
- Review design before details because locally correct code can still violate system structure
  or quality-attribute goals.
- Use refactoring concepts to locate change risk, but require a concrete consequence before
  filing a finding.
- Triage security on every change and perform full threat modelling only when the changed
  surface or uncertainty warrants it.
- Treat tests, automation, scanners, and author explanations as evidence to validate rather
  than substitutes for independent reasoning.
- Optimize findings for defect removal and safe decisions, not comment volume or reviewer
  stylistic authority.
