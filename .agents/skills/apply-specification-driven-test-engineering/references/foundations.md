# Method Foundations

Use this reference to understand or adapt the method. The skill synthesizes these sources; it does not
claim conformance or require ritual adherence to one framework.

## Process and quality models

- ISO/IEC/IEEE, [29119 software testing series](https://committee.iso.org/sites/jtc1sc7/home/projects/flagship-standards/isoiecieee-29119-series.html).
  Adopt a repeatable progression from test basis and planning through design, execution, monitoring,
  completion, and documentation. Keep artifacts proportional to risk rather than recreating a
  heavyweight process for every change.
- ISO/IEC, [25010:2023 product quality model](https://www.iso.org/standard/78176.html). Use its nine
  characteristics—functional suitability, performance efficiency, compatibility, interaction
  capability, reliability, security, maintainability, flexibility, and safety—as a completeness
  prompt for quality objectives, not a demand to test every characteristic on every change.
- NIST, [Secure Software Development Framework 1.1, SP 800-218](https://doi.org/10.6028/NIST.SP.800-218).
  Adopt risk-based verification, secure test data, analysis of executable and third-party components,
  documented findings, and remediation evidence throughout development.

## Sustainable test suites

- Titus Winters, Tom Manshreck, and Hyrum Wright, eds.,
  [*Software Engineering at Google*](https://abseil.io/resources/swe-book/html/toc.html), especially
  [Testing Overview](https://abseil.io/resources/swe-book/html/ch11.html),
  [Unit Testing](https://abseil.io/resources/swe-book/html/ch12.html),
  [Test Doubles](https://abseil.io/resources/swe-book/html/ch13.html), and
  [Larger Testing](https://abseil.io/resources/swe-book/html/ch14.html). Separate test size from scope;
  optimize for fast, reliable, scalable feedback; test behavior through public APIs; prefer state over
  interaction assertions and realism over unnecessary isolation; add larger tests for risks small tests
  cannot observe. Treat the 80/15/5 pyramid as a rough contextual guideline, never a quota.
- Martin Fowler, [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html). Keep a
  broad base of focused tests and few expensive end-to-end tests while adapting the shape to system
  architecture and risk.
- Gerard Meszaros, *xUnit Test Patterns*, Addison-Wesley, 2007. Adopt explicit fixtures, test doubles,
  result verification, and smell diagnosis to keep suites deterministic and maintainable.

## Stronger test design and evidence

- Glenford Myers, Corey Sandler, and Tom Badgett, *The Art of Software Testing*, 3rd ed., Wiley, 2011.
  Adopt the defect-seeking mindset and systematic equivalence, boundary, cause-effect, and error-
  guessing techniques.
- Paul Ammann and Jeff Offutt, *Introduction to Software Testing*, 2nd ed., Cambridge University
  Press, 2016. Adopt graph, logic, input-space, and syntax-based coverage criteria as ways to derive
  discriminating tests.
- Koen Claessen and John Hughes, “QuickCheck: A Lightweight Tool for Random Testing of Haskell
  Programs,” ICFP 2000, DOI `10.1145/351240.351266`. Adopt executable properties, generated inputs,
  and shrinking for input spaces where example tests are insufficient.
- Goran Petrović et al., [State of Mutation Testing at Google](https://research.google/pubs/state-of-mutation-testing-at-google/),
  ICSE-SEIP 2018, and [Long Term Effects of Mutation Testing](https://research.google/pubs/long-term-effects-of-mutation-testing/),
  ICSE 2021. Use selective, actionable mutants to evaluate whether tests detect plausible faults;
  prefer this evidence to raw coverage while recognizing equivalent mutants and execution cost.
- Google, [OSS-Fuzz repository](https://github.com/google/oss-fuzz). Adopt continuous, coverage-guided
  fuzzing with sanitizers, seed corpora, reproducible crashes, and minimized test cases for parsers and
  hostile-input boundaries.

## Security, performance, reliability, and accessibility

- OWASP, [Application Security Verification Standard 5.0.0](https://owasp.org/www-project-application-security-verification-standard/).
  Derive versioned, testable security-control requirements appropriate to the application and target
  assurance level.
- OWASP, [Web Security Testing Guide v4.2](https://owasp.org/www-project-web-security-testing-guide/v42/).
  Use lifecycle-integrated white-, gray-, and black-box techniques; combine automation with manual
  threat-driven testing and safe authorization boundaries.
- Google, [Site Reliability Engineering: Addressing Cascading Failures](https://sre.google/sre-book/addressing-cascading-failures/)
  and [Reliable Product Launches](https://sre.google/sre-book/reliable-product-launches/). Test realistic
  capacity limits, nonlinear overload, graceful degradation, load shedding, failure mode, and recovery;
  connect performance evidence to capacity planning.
- W3C, [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/) and
  [Accessibility Conformance Testing rules](https://www.w3.org/WAI/standards-guidelines/act/rules/).
  Use technology-independent success criteria and combine automation with human evaluation; do not
  infer conformance from an automated scan.

## Synthesis decisions

- Use a risk-to-evidence map as the central artifact because neither a test pyramid nor a standards
  checklist decides what matters in a particular system.
- Keep fast tests dominant for sustainable feedback while requiring realistic boundaries for
  integration, deployment, security, reliability, and performance claims.
- Use coverage diagnostically and mutation testing selectively; neither percentage is a product goal.
- Automate stable, repeatable checks and retain exploratory, usability, accessibility, security, and
  resilience work where human judgment or controlled experiments provide stronger evidence.
- Report uncertainty and residual risk explicitly because a passing suite samples behavior and cannot
  prove the absence of defects.
