# Method Foundations

Use this reference when adapting the skill or explaining its controls. The skill
synthesizes these sources; it does not claim formal conformance to any standard.

## Design descriptions and traceability

- IEEE, [IEEE 1016-2009: Software Design Descriptions](https://standards.ieee.org/ieee/1016/4502/).
  Treat a design description as a methodology-independent work product for
  recording and communicating high- or detailed-design information to its
  stakeholders.
- ISO/IEC/IEEE,
  [42010:2022 Architecture Description](https://www.iso.org/standard/74393.html).
  Select architectural views and model kinds to address actual stakeholder
  concerns; do not mandate every possible diagram.
- ISO/IEC/IEEE,
  [29148:2018 Requirements Engineering](https://www.iso.org/standard/72089.html).
  Preserve the authority, identity, quality, and lifecycle traceability of the
  requirements the design realizes.
- NASA Software Engineering Handbook,
  [SWE-058 Detailed Design](https://swehb.nasa.gov/spaces/7150/pages/16450603/SWE-058%2B-%2BDetailed%2BDesign)
  and
  [SWE-052 Bidirectional Traceability](https://swehb.nasa.gov/spaces/SWEHBVD/pages/102695427/SWE-052%2B-%2BBidirectional%2BTraceability).
  Require enough detail to code without significant interpretation and trace
  requirements through design, implementation, and verification in both
  directions.
- David Parnas and Paul Clements,
  [“A Rational Design Process: How and Why to Fake It”](https://doi.org/10.1109/TSE.1986.6312940),
  IEEE TSE 12(2), 1986. Record a coherent chain of decisions and rationale that
  supports review, implementation, and maintenance even though discovery itself
  is iterative.

## Test design and TDD

- ISO/IEC/IEEE,
  [29119 Software Testing series](https://committee.iso.org/sites/jtc1sc7/home/projects/flagship-standards/isoiecieee-29119-series.html).
  Separate the test basis, test-design techniques, cases, procedures, and
  evidence while keeping the documentation proportional to risk.
- ISTQB,
  [Certified Tester Foundation Level Syllabus v4.0.1](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf).
  Use specification-based equivalence, boundary, decision-table, and
  state-transition techniques to derive a small systematic case set.
- Titus Winters, Tom Manshreck, and Hyrum Wright, eds.,
  [*Software Engineering at Google*](https://abseil.io/resources/swe-book/html/toc.html),
  especially
  [Testing Overview](https://abseil.io/resources/swe-book/html/ch11.html),
  [Unit Testing](https://abseil.io/resources/swe-book/html/ch12.html), and
  [Test Doubles](https://abseil.io/resources/swe-book/html/ch13.html).
  Test behavior through public interfaces, prefer observable state to internal
  interactions, and optimize for clear, deterministic, maintainable feedback.
- Kent Beck, *Test-Driven Development: By Example*, Addison-Wesley, 2002, and
  [Test Desiderata](https://testdesiderata.com/). Use short red-green-refactor
  loops and treat test qualities as trade-offs rather than one universal test
  shape.
- Hakan Erdogmus, Maurizio Morisio, and Marco Torchiano,
  [“On the Effectiveness of the Test-First Approach to Programming”](https://doi.org/10.1109/TSE.2005.37),
  IEEE TSE 31(3), 2005. Treat test-first as a disciplined feedback mechanism;
  do not overclaim that empirical literature proves it universally superior in
  every context.
- Koen Claessen and John Hughes,
  [“QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs”](https://doi.org/10.1145/351240.351266),
  ICFP 2000. Use executable properties, generated inputs, and shrinking where
  examples cannot efficiently cover the input space.
- Goran Petrović et al.,
  [“State of Mutation Testing at Google”](https://research.google/pubs/state-of-mutation-testing-at-google/),
  ICSE-SEIP 2018. Use selective mutation feedback to challenge critical test
  sensitivity rather than treating execution coverage as proof.

## Quality and secure delivery

- ISO/IEC, [25010:2023 Product Quality Model](https://www.iso.org/standard/78176.html).
  Use quality characteristics as an impact prompt, not a demand to expand every
  design.
- NIST,
  [Secure Software Development Framework 1.1, SP 800-218](https://doi.org/10.6028/NIST.SP.800-218).
  Integrate risk-based security verification and protect secrets and test data
  throughout development.
- W3C, [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/).
  Make applicable interaction criteria explicit and combine automation with
  human evaluation where automation cannot establish conformance.

## Synthesis choices

- Use one compact design plus linked authorities instead of duplicating the
  specification, ADRs, or runbooks.
- Make the test catalog and its independent oracles the center of the
  implementation handoff.
- Adapt views and evidence to consequence and ambiguity; completeness means no
  material decision or risk is hidden, not that every template section is long.
- Keep approval human and revision-specific because an authoring agent cannot
  independently validate its own assumptions.
