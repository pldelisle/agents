# Issue-tracker MCP workflow

Use this workflow whenever Product Owner work reads from or changes the issue tracker.

## Source-of-truth boundaries

- Treat the issue tracker as the authoritative source for work-item identity, title, workflow status, product priority, parentage, relationships, ownership, project or initiative placement, milestones, cycles, and delivery coordination.
- Treat a version-controlled story specification as authoritative for its detailed behavioral revision when one exists. Store its repository path and exact revision in the corresponding issue.
- Keep the issue tracker's description sufficient to understand the outcome, scope, readiness, acceptance references, and specification link without copying a long specification that will drift.
- Preserve engineering ownership of estimates, technical tasks, implementation assignments, and capacity commitments.

## MCP-only access

Use the configured `issue-tracker` MCP server. Inspect the tools and input schemas exposed in the current session; use capability-equivalent tools rather than assuming a tool name or unsupported field.

The repository commits only the server URL and approval policy. OAuth credentials remain user-specific and must never be committed. Register and authenticate once with `codex mcp add issue-tracker --url https://<issue-tracker-mcp-endpoint>/mcp`; if the server is already registered for the user, run `codex mcp login issue-tracker` instead. Complete the issue-tracker OAuth flow and restart Codex so the server and tools load.

Never use browser automation, the issue tracker's GraphQL or REST API, an unofficial CLI, or credentials stored in the repository as a fallback. Never expose OAuth tokens, API keys, private comments, customer data, or sensitive issue content in logs or local artifacts.

If the MCP server is absent, disabled, unauthenticated, denied by workspace policy, or missing a required tool, stop the issue-tracker operation and report the exact condition. A local draft is not a successful issue-tracker write.

## Read protocol

Before making a recommendation or mutation:

1. Resolve the supplied issue URL or stable identifier. If neither is supplied, search narrowly by team, project, title, and outcome.
2. Read the current object and the fields material to the decision.
3. Read its parent, project or initiative, sub-issues, blocking relationships, and recent decision-bearing comments when relevant.
4. Discover the workspace's actual teams, workflow states, templates, labels, projects, initiatives, milestones, and cycles before referencing them.
5. Search for likely duplicates and overlapping scopes before proposing creation.
6. Distinguish retrieved facts from inferences, stale repository data, and unresolved questions.

Do not treat search snippets, cached output, or a remembered issue state as authoritative when a direct read is available.

## Object mapping

Adapt to established workspace conventions. Do not create a new hierarchy solely to fit this mapping.

| Product concept | Preferred issue-tracker representation |
|---|---|
| Product Goal or strategic outcome | Existing initiative, project goal, or linked project context |
| Epic or outcome with coordinated delivery | Existing project or parent issue, according to workspace convention |
| Story, defect, spike, or enabler | Issue |
| Independently assignable work package | Sub-issue or linked issue |
| Must-precede dependency | Supported blocks / blocked-by relationship |
| Detailed behavioral specification | Version-controlled file linked with exact revision, or an existing issue-tracker document convention |
| Product decision or material refinement change | Updated description plus a concise decision comment when history matters |
| Delivery wave or integration gate | Existing milestone, label, project update, or relation convention; otherwise keep it in the approved plan |

Do not create new statuses, labels, templates, projects, initiatives, milestones, or cycles without explicit authorization.

## Mutation protocol

Treat reads as non-mutating. For creates, updates, relationship changes, moves, assignments, comments, archives, or deletions:

1. Identify the exact target objects by stable ID.
2. Draft the desired state locally.
3. Show material changes, including old and new values, new objects, hierarchy or relationship changes, and fields deliberately left unchanged.
4. Obtain explicit authorization for that mutation scope. Authorization to refine or draft does not authorize a write; authorization to create does not authorize assignment, cycle commitment, archival, or deletion.
5. Re-read each target immediately before writing when concurrent edits are plausible. Stop on a material conflict instead of overwriting it.
6. Use the narrowest MCP mutation and stable IDs. Preserve fields outside the approved scope.
7. Re-read every affected object and relationship after writing.
8. Report canonical identifiers and URLs, verified resulting state, unchanged requested fields, and failures.

Before creation, search for an existing issue with the same outcome or scope. Prefer updating or relating an existing issue when appropriate; never create duplicates to avoid resolving ambiguity.

For a multi-object mutation, state whether the operation is all-or-nothing or may partially succeed. On partial failure, stop unsafe follow-up writes, report successful object IDs and failed operations separately, and do not claim rollback unless the MCP server confirms it.

Never archive, delete, or bulk-reassign work based on implied authorization.

## Lifecycle and synchronization

Do not assume the skill's lifecycle names match the issue tracker's workflow-state names. Discover the team's actual states and record the intended mapping before the first transition. Do not create replacement states merely to obtain a one-to-one mapping.

When a specification becomes Ready or materially changes:

- synchronize its exact revision, readiness verdict, Product Goal trace, outcome, scope, acceptance references, and unresolved blockers;
- synchronize product order and validated dependency relationships when authorized;
- keep developer-owned estimates, assignments, and cycle commitments unchanged unless their owner or the user explicitly authorizes them;
- add a concise decision comment when a changed product decision would otherwise be difficult to reconstruct from issue history;
- re-read the issue and specification link, then record the verified issue-tracker synchronization state in the specification.

If the issue tracker and the repository disagree, do not silently choose one. Report the conflicting fields and timestamps or revisions, identify the accountable owner, and block affected mutations until the intended source is confirmed.

## Parallel delivery

When synchronizing an authorized parallel plan:

- create or update one independently assignable issue or sub-issue in the issue tracker per work package;
- store exclusive scope, specification revision, prerequisites, acceptance references, and integration gate in each package;
- encode validated must-precede edges with supported issue relationships;
- preserve product order separately from engineering assignment or cycle commitment;
- update downstream readiness only after the predecessor and applicable integration gate are verified;
- never infer implementation-agent assignment from an assignee in the issue tracker unless the integration explicitly establishes that meaning.
