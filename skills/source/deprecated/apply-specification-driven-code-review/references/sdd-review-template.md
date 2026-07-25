# SDD Review Record Template

Use this structure for a substantive specification-driven review. Remove irrelevant
sections. Do not turn an unknown into a passing value.

```markdown
# SDD Review — <change>

## Verdict

**<Block | Comment | Approve | Partial review>** — <one-sentence reason>

## Artifact baseline

| Concern | Observed source |
|---|---|
| Review target | <base/head, diff, PR, or working tree> |
| Constitution | <path/revision/status> |
| Strategic/product source | <path/ID/revision/status> |
| Feature specification | <path/revision/approval> |
| Authority / persistence | <model / model> |
| Rigor lane | <lite / standard / high-assurance / exploratory> |
| Plan / contracts / tasks | <paths/revisions> |
| Implementation | <revision> |

## Findings

### [P<n>] <Imperative consequence-focused title>

- **Class:** <requirement ambiguity | plan contradiction | task gap | implementation non-conformance | verification weakness | untraced scope>
- **Location:** <narrow artifact or code location>
- **Governing IDs:** <REQ/RULE/NFR/DEC/TASK/VER>
- **Trigger and evidence:** <reachable path and observed facts>
- **Impact:** <affected actor/system and consequence>
- **Direction:** <smallest source-level outcome needed>
- **Confidence:** <High | Medium>

## Traceability

| Goal | Requirement / NFR | Example | Plan / contract | Task | Changed surface | Verification / result | Status |
|---|---|---|---|---|---|---|---|
| <ID> | <ID> | <ID> | <ID/path> | <ID> | <path> | <method/result> | <covered/partial/contradicted/blocked> |

### Untraced downstream scope

- <task, dependency, file, behavior, or test with no upstream authority>

### Unmet upstream scope

- <approved obligation with no adequate plan, implementation, or evidence>

## Cross-artifact coherence

- **Constitution vs spec/plan:** <consistent or finding reference>
- **Spec vs plan/tasks:** <consistent or finding reference>
- **Spec/plan vs implementation:** <consistent or finding reference>
- **Spec vs verification oracle:** <consistent or finding reference>
- **Generated boundaries:** <respected, not applicable, or finding reference>
- **Change control:** <revision and impact flow, or finding reference>

## Independent evidence

| Check or analysis | Revision/environment | Result | Limitation |
|---|---|---|---|
| `<command or method>` | <context> | <observed result> | <limit> |

## Residual risk

- <unverified path, environment, assumption, or same-agent oracle coupling>
```
