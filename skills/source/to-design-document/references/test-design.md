# Test Design for an Implementation-Ready Handoff

Read this reference before authoring the design document's verification cases.
Select techniques because they expose a requirement or credible risk, not
because a checklist names them.

## 1. Build the test basis

Inventory the observable obligations:

- functional rules and concrete examples;
- invariants and forbidden effects;
- permissions, threats, and trust boundaries;
- state transitions, ordering, idempotency, retries, and recovery;
- data, protocol, schema, migration, and compatibility contracts;
- performance, resource, reliability, accessibility, and operability targets;
- unchanged brownfield behavior and prior defects.

If an expected outcome cannot be derived from an approved source, the problem is
a requirement gap—not an invitation to invent a test oracle.

## 2. Choose seams and levels

Use the smallest reliable test that can observe the behavior through a stable
interface. Prefer one or a few high-leverage seams over one test surface per
class or function.

| Need | Strong default |
|---|---|
| Pure rule or invariant | Focused deterministic test through the public module interface |
| Collaboration with a database, queue, filesystem, or protocol | Integration or contract test at the real boundary |
| Critical journey across deployed parts | Small number of end-to-end or smoke cases |
| Schema or consumer/provider agreement | Contract validation on both sides |
| Migration, upgrade, or compatibility | Representative old data and version-boundary rehearsal |
| Performance or reliability target | Controlled measurement with workload, environment, threshold, and repetition |
| Security or privacy control | Threat-derived negative case plus the appropriate analysis or scanner |
| Accessibility or usability outcome | Automated semantics checks plus human evaluation where required |

Test level and runtime size are separate. Use broader tests only for behavior a
narrower test cannot credibly observe. Do not impose a pyramid quota.

## 3. Derive a discriminating case set

Apply the techniques that fit the behavior:

- **Equivalence partitions:** choose one representative from each meaningfully
  different valid and invalid class.
- **Boundary values:** exercise exact inclusive/exclusive edges and immediately
  adjacent values; include empty, zero, maximum, precision, encoding, timezone,
  and overflow boundaries when relevant.
- **Decision tables:** enumerate interacting conditions and distinct outcomes;
  remove impossible combinations and cover each remaining rule.
- **State transitions:** cover permitted transitions, high-risk forbidden
  transitions, repeated events, and recovery from intermediate states.
- **Properties and metamorphic relations:** use independently meaningful
  properties such as round-trip preservation, idempotence, monotonicity,
  conservation, or equivalence under a semantics-preserving transformation.
- **Contract cases:** cover semantic request/response or producer/consumer
  behavior, not only schema shape.
- **Failure injection:** inject failure before, during, and after side effects to
  test atomicity, cleanup, retry safety, compensation, and truthful status.
- **Concurrency cases:** name the required property first, then coordinate actors
  with barriers, latches, or controlled schedulers—not sleeps.
- **Differential or characterization cases:** compare with a trusted baseline
  only after controlling nondeterminism and deciding which differences are
  allowed.
- **Threat and misuse cases:** exercise authorization, validation, disclosure,
  tampering, replay, injection, and resource abuse that are credible at the
  changed trust boundary.

Do not create a positive and negative test mechanically for every requirement.
Create distinct cases for distinct ways the implementation could be wrong.

## 4. Specify each case completely

For every automated case, record:

1. stable verification ID, exact repository-conventional name, and location;
2. requirement, decision, invariant, threat, or regression risk covered;
3. level, runtime size, public seam, and subject under test;
4. minimal setup and preconditions;
5. one meaningful stimulus;
6. externally observable result and relevant forbidden side effects;
7. independent oracle source;
8. test data: representative or boundary values and why they discriminate;
9. real dependencies, fakes, stubs, or interaction checks at system boundaries;
10. controls for time, randomness, concurrency, network, locale, and shared
    state;
11. expected pre-change signal and precise reason.

Use `RED` for a new behavior or regression and name the expected assertion,
contract, compile, or static-analysis failure. Use `GREEN BASELINE` for a
characterization case. Investigate a new-behavior case that already passes:
the behavior may exist, the test may be insensitive, or the scope may be wrong.

## 5. Keep oracles independent and tests durable

- Assert user- or caller-visible state through the public interface.
- Use known literals, approved examples, schemas, standards, or a small trusted
  model for expected results.
- Avoid calculating the expected result with the same algorithm proposed for
  production.
- Prefer real deterministic collaborators. Use a faithful fake when the real
  boundary is slow or unavailable; contract-test important fakes.
- Stub boundary inputs sparingly. Use interaction assertions only when the
  interaction itself is the observable obligation, such as an irreversible side
  effect, ordering guarantee, or call budget.
- Never mock the subject under test or private internal collaborators.
- Keep setup local and intention-revealing. Avoid control flow and hidden
  assertions in test helpers.
- Make failures identify the broken behavior without depending on suite order.

## 6. Order cases for TDD

Start with a walking skeleton when a new path must cross real boundaries. Then
order cases by dependency and learning value:

1. simplest representative success;
2. core rule variations and decision-table rows;
3. boundaries and invalid inputs;
4. state, failure, retry, and forbidden-effect cases;
5. boundary integration and contract cases;
6. migration, security, performance, reliability, accessibility, and end-to-end
   evidence where applicable.

Execute one case at a time: observe the planned red signal, implement the
minimum behavior to make it green, run focused regression checks, refactor while
green, then select the next case. The reviewed catalog guides the loop; it does
not authorize horizontal test construction.

## 7. Assess adequacy

Check forward coverage from every source obligation to evidence and backward
coverage from every case to a source or risk. Mark coverage `covered`,
`partial`, or `blocked`; never infer completeness from a test count or line
coverage percentage.

For important cases, state at least one plausible wrong implementation the case
would reject. Use selective mutation or fault injection when supported and
proportionate to validate that a critical oracle is sensitive. Remove cases that
exercise the same behavior, data partition, and failure mode without adding
discrimination.

Reject plans that rely on snapshots without a reviewed oracle, live external
services in ordinary tests, sleeps for coordination, unsafe production data,
unbounded fuzzing, unverifiable manual steps, or “test passes” as the only
expected result.
