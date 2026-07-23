# SDD Evidence Matrix Template

Use this template for a substantive conformance plan or report. Keep specification-quality
findings separate from implementation results.

```markdown
# SDD Verification Record — <change>

## Artifact baseline

- **Specification:** <path/ID/revision/approval>
- **Plan/contracts/tasks:** <paths/revisions>
- **Implementation:** <revision/environment>
- **Authority / persistence:** <model / model>
- **Rigor lane:** <lite / standard / high-assurance / exploratory>
- **Oracle owners/reviewers:** <roles>

## Specification verification

| Finding | Requirement location | Quality violated | Consequence | Owner/status |
|---|---|---|---|---|
| <ambiguity/contradiction/gap> | <ID/location> | <singularity/clarity/completeness/etc.> | <test or delivery impact> | <owner/status> |

## Risk-to-evidence matrix

| Requirement / rule / NFR / threat | Trigger | Independent oracle | Level / environment | Test or method | Gate | Result | Trace status |
|---|---|---|---|---|---|---|---|
| <ID> | <condition> | <observable distinction> | <scope/context> | <path/command> | <local/merge/release> | <observed/pending> | <covered/partial/contradicted/blocked/N/A> |

## Oracle independence

- **Shared authoring risk:** <who/what generated spec, code, and tests>
- **Counterexamples/negative space:** <independently derived cases>
- **Alternate evidence:** <contract, property, model, mutation, inspection, domain review>
- **Remaining coupling:** <limitation>

## Execution evidence

| Command or method | Revision/environment | Result | Seed/statistics/artifact | Limitation |
|---|---|---|---|---|
| `<command>` | <context> | <observed pass/fail/count> | <details> | <limit> |

## Defects

| Defect | Governing ID | Minimal trigger | Expected vs observed | Impact | Routed owner |
|---|---|---|---|---|---|
| <ID> | <REQ/NFR> | <reproduction> | <difference> | <consequence> | <product/engineering/test/environment> |

## Residual risk

- <untested path, unavailable environment, weak oracle, flake, or assumption>
```
