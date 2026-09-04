# Delivery orchestration

Read this reference only when the user asks to plan parallel delivery or explicitly authorizes implementation dispatch. Product priority remains with the Product Owner; technical independence, change surfaces, estimates, and capacity remain with engineering.

## Validate the dependency graph

Represent each implementation-ready item or work package as a node and each must-precede relationship as an edge. Obtain repository-backed engineering evidence for:

- direct and hidden dependencies;
- shared contracts, schemas, migrations, state, fixtures, build resources, or mutable infrastructure;
- overlapping files, modules, tests, or ownership boundaries;
- rollout, compatibility, and integration sequencing; and
- prerequisites needed to stabilize a boundary.

Classify each package:

- **Parallel-ready:** no unresolved predecessor, an exclusive change surface, independently testable outcomes, and one owner for every shared contract.
- **Conditionally parallel:** can start after a named contract, stub, migration, flag, decision, or other prerequisite is baselined.
- **Sequential:** depends on behavior, data, or a mutable boundary that cannot safely be divided.
- **Blocked:** a product decision, technical fact, external dependency, or readiness condition is unresolved.

Unverified independence is a blocker to parallel dispatch, not proof that work must be permanently sequential.

## Construct delivery waves

1. Put contract decisions, spikes, migrations, and unavoidable prerequisites in Wave 0.
2. Put the highest-ordered independent Parallel-ready packages in the next wave.
3. Define an integration gate that verifies each package and their combined contracts.
4. Release dependent packages only after predecessors and the relevant integration gate pass.

A wave describes work that may proceed concurrently; it does not promise capacity. Each work package needs a unique ID, approved specification revision, outcome, scope and non-goals, prerequisites, concurrency class, wave, engineering-owned change surface, shared-contract owner, acceptance references, required checks, and Product Owner route for behavior questions.

If packages must modify the same file, schema, migration, contract, or mutable resource, serialize them or assign one engineering owner to baseline the boundary before dependent work begins.

## Coordinate authorized execution

Only after explicit implementation authorization:

1. Respect the runtime's thread limit and preserve orchestration and integration capacity.
2. Dispatch only Parallel-ready packages with exclusive scopes and baselined revisions.
3. Keep blocked, sequential, and unmet conditional packages undispatched.
4. Wait for the full wave and run its integration gate before releasing dependents.
5. Return product-scope questions to the Product Owner and implementation or merge decisions to engineering.

One package failure blocks its dependents. It blocks the whole wave only when it invalidates a shared contract or an aggregate gate cannot isolate the failure. Completion requires story acceptance, the repository Definition of Done, and the aggregate integration gate—not successful agent reports alone.
