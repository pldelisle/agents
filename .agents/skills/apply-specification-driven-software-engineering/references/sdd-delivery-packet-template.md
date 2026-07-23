# SDD Engineering Delivery Packet Template

Use this template when the repository has no stronger artifact convention. For Lite work,
keep only the governing behavior delta, compact plan, tasks, and evidence. Do not author or
approve product decisions merely to fill a field.

```markdown
# Engineering Delivery Packet — <change>

## Control

- **Governing spec:** <path/ID/revision/approval>
- **Constitution:** <path/revision>
- **Authority / persistence:** <model / model>
- **Rigor lane:** <lite / standard / high-assurance / exploratory>
- **Technical owner:** <owner>
- **Implementation revision:** <working tree or revision>

## Behavior contract

Use only when no approved feature spec exists.

- **Authorized request/source:** <user request or contract>
- **Current behavior:** <observed baseline>
- **Required behavior:** <observable outcome>
- **Unchanged behavior:** <regression boundary>
- **Assumptions/open decisions:** <explicit items and owners>

## Requirement-to-plan map

| Requirement / NFR | Current-system evidence | Technical decision / contract | Risk and failure behavior | Verification approach |
|---|---|---|---|---|
| <ID> | <path/fact> | <DEC/path> | <risk/response> | <VER/method> |

## Technical plan

- **Architecture and boundaries:** <minimum coherent approach>
- **Data/state/migration:** <models, compatibility, rollback>
- **Interfaces/contracts:** <schema/protocol/version behavior>
- **Security/privacy:** <trust boundary and controls>
- **Reliability/operability:** <failure, retry, idempotency, observability>
- **Alternatives:** <only consequential rejected options and rationale>
- **Constitution exceptions:** <none or approved exception>

## Task graph

| Task | Governing IDs | Prerequisites | Exclusive scope | Expected evidence | Status |
|---|---|---|---|---|---|
| TASK-1 | <REQ/DEC> | <none/IDs> | <paths/boundary> | <VER/check> | <pending/in progress/complete/blocked> |

## Discoveries and changes

| Discovery | Classification | Owning artifact/owner | Impact | Resolution/revision |
|---|---|---|---|---|
| <fact> | <intent/plan/task/code/test/environment> | <source> | <affected IDs> | <decision> |

## Verification and convergence

| Governing ID | Changed surface | Evidence method | Observed result | Coverage status | Limitation |
|---|---|---|---|---|---|
| <REQ/RULE/NFR> | <paths> | <command/inspection/measurement> | <result> | <covered/partial/contradicted/blocked> | <limit> |

### Backward traceability

- <changed dependency, behavior, file, task, or test without upstream authority, or none>

### Handoff

- **Completed task IDs:** <IDs>
- **Approved deviations:** <IDs/none>
- **Checks not run:** <check and reason>
- **Residual risks:** <risk/owner>
- **Independent review required:** <scope>
```
