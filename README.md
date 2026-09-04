# Agent Skills

This repository maintains a catalog of product and software-delivery skills and packages provider-neutral builds for Codex, Claude Code, and Kiro.

## Skill catalog

[`skills/catalog.json`](skills/catalog.json) is the canonical source for public identifiers, versions, invocation policy, compatibility, outcomes, and side effects. A validator prevents the catalog, directory, frontmatter, UI metadata, documentation, and generated distributions from drifting.

| Skill | Owned outcome | Invocation | Material side effects |
|---|---|---|---|
| `$discuss-vision` | Clarify product vision, strategy, outcomes, and product language | Explicit | Conversation-only by default; writes artifacts only when requested |
| `$to-specs` | Create a cross-story behavioral feature specification | Automatic | May create or revise a requested local specification |
| `$apply-product-ownership` | Define Product Goals and refine, order, or synchronize backlog work | Explicit | Tracker writes and delivery dispatch require explicit authorization |
| `$to-design-document` | Create an implementation-ready technical design when risk warrants it | Automatic | May create or revise a requested local design |
| `$implement` | Implement, debug, or refactor production code | Automatic | May change source, tests, and related documentation in scope |
| `$engineer-tests` | Design, implement, execute, or assess test-only evidence | Automatic | May change test-only files and execute tests |
| `$code-review` | Independently review Spec and Standards conformance | Explicit | Read-only by default; persists a review only when requested |

Explicit skills must be invoked by name. Automatic skills remain eligible for intent-based selection. Invocation does not expand the user's authorization: external writes, destructive actions, publication, or delivery dispatch still require the appropriate explicit scope.

## Delivery flow and feedback

The default ownership flow is:

```text
discuss-vision
      ↓ approved strategic intent
to-specs ↔ apply-product-ownership
      ↓ approved requirements and ready slice
to-design-document (only when risk warrants it)
      ↓ approved design
implement → engineer-tests → code-review
      ↑                ↓              ↓
      └──── product, requirement, and design feedback ────┘
```

- Product vision owns strategic intent and outcomes.
- The feature specification owns shared behavior, rules, and acceptance-example identifiers.
- Product Ownership owns Product Goals, vertical slices, exact backlog order, and readiness. Stories reference shared requirement IDs instead of copying them.
- Technical design owns consequential implementation decisions and verification design.
- Implementation owns the production change; test engineering owns test-only quality evidence; code review remains independent.
- Delivery evidence returns to the artifact and role that owns the affected decision.

This is not a mandatory document pipeline. Choose the least process that preserves shared understanding and safety:

| Lane | Use when | Expected treatment |
|---|---|---|
| Exploratory | The key need is learning | Hypothesis, small experiment or prototype, observation, decision threshold |
| Lightweight | Clear, local, reversible, low-risk change | Concise scope, behavior examples, and focused verification |
| Standard | Multiple paths, teams, modules, or meaningful product rules | Revisioned specification, engineering evidence, design when useful, traceability |
| High assurance | Safety, authorization, regulated data, money, migration, irreversible state, or broad compatibility | Explicit hazards, qualities, approvals, rollback, and end-to-end traceability |

## Dependencies and compatibility

- **Runtime:** Codex, Claude Code, or Kiro.
- **Work tracking:** Linear or Jira through a tracker MCP server configured by the consuming repository or runtime. Skills do not embed provider URLs, credentials, or guessed server names.
- **Repository tools:** Git and repository-defined build/test commands when the task requires them.
- **Delegation:** Optional except when the user explicitly requests independent or parallel agent work. Product readiness can rely on equivalent repository-backed human or prior engineering evidence.

Codex builds retain `agents/openai.yaml`. Claude Code and Kiro builds omit that OpenAI-specific adapter. The skill instructions themselves are identical across runtimes and trackers; provider and runtime setup remains at the outer integration boundary.

## Repository layout

```text
skills/catalog.json         Canonical public catalog and lifecycle metadata.
skills/source/              Active canonical skill definitions.
skills/deprecated/          Archived skills; never built or installed.
scripts/build-skills.js     Deterministic catalog-driven builder.
scripts/build-skills.sh     Portable shell entry point for the builder.
scripts/validate-skills.js  Structural, reference, metadata, and eval-data checks.
evals/                      Versioned routing and behavioral evaluation cases.
test/                       Installer and distribution tests.
.github/workflows/ci.yml    Validation, build, tests, and package smoke checks.
dist/                       Generated installer payload; ignored by Git.
```

Do not edit generated `.codex/skills/`, `.claude/skills/`, `.kiro/skills/`, or `dist/` content. Change `skills/source/`, update the catalog when the public interface changes, and rebuild.

## Build and validate

Build the default local variants:

```bash
scripts/build-skills.sh all
```

Build one runtime and optionally select the packaging tracker:

```bash
scripts/build-skills.sh codex
scripts/build-skills.sh claude jira
scripts/build-skills.sh kiro linear
scripts/build-skills.sh all jira
```

Without a tracker argument, Codex defaults to Linear while Claude Code and Kiro default to Jira. The tracker dimension selects the installer payload path; guidance remains provider-neutral.

Build every runtime/tracker package and run all deterministic gates:

```bash
make test
```

The gate checks the catalog, frontmatter names and lifecycle metadata, body size, local links, skill references, invocation policy, deprecated exclusion, evaluation-case coverage, runtime equivalence, installer behavior, and packaging.

## Install with npx

After publication, install every active Codex/Linear skill in the current project:

```bash
npx @pldelisle/agent-skills
```

Common alternatives:

```bash
# Install selected skills for the current user.
npx @pldelisle/agent-skills --global \
  --skill implement \
  --skill to-specs \
  --skill apply-product-ownership

# Install all three runtime payloads under their default directories.
npx @pldelisle/agent-skills --runtime all --tracker jira

# Preview without writing.
npx @pldelisle/agent-skills --runtime claude --dry-run

# Install beneath another project root.
npx @pldelisle/agent-skills --runtime kiro --target ../another-project
```

The installer refuses collisions. `--force` replaces only colliding skill directories, never the complete runtime skills directory. `--list` prints identifiers accepted by `--skill`:

```bash
node bin/agent-skills.js --list
```

## Installer configuration

Create `agent-skills.config.json` where the command runs:

```json
{
  "$schema": "https://raw.githubusercontent.com/pldelisle/agents/main/agent-skills.schema.json",
  "runtimes": ["codex", "claude"],
  "tracker": "jira",
  "skills": ["implement", "to-specs", "apply-product-ownership"],
  "scope": "project",
  "force": false
}
```

Supported settings:

- `runtimes`: any combination of `codex`, `claude`, and `kiro`;
- `tracker`: `linear` or `jira`;
- `skills`: identifiers from `--list`; omit to install the active catalog;
- `scope`: `project` or `user`;
- `target`: custom base directory, relative to the configuration file when not absolute; and
- `force`: replace only colliding selected skills.

CLI flags override configuration. A custom target receives `.<runtime>/skills/` beneath it.

## Evaluation and maintenance

Deterministic CI is necessary but not sufficient. [`evals/routing-cases.json`](evals/routing-cases.json) contains positive, near-miss, and ambiguous activation cases for every skill. [`evals/behavior-cases.json`](evals/behavior-cases.json) records required outcomes, required actions, forbidden actions, and side-effect expectations. Run them through the harness-neutral [`scripts/run-skill-evals.js`](scripts/run-skill-evals.js) adapter contract in clean contexts against the supported model/runtime matrix and compare a changed skill with the previous released version.

For material skill changes:

1. run routing cases repeatedly with the normal installed collection;
2. grade both outcome and trajectory, including forbidden side effects;
3. retain model, runtime, repository state, tokens, time, tool calls, and raw traces;
4. add every observed failure as a regression case; and
5. update `lastVerified` only after the declared matrix is exercised.

Do not treat shorter wording, a single successful run, coverage percentage, or a model-graded final answer as proof of improvement.

The committed `lastVerified` date covers deterministic source, build, installer, and package checks only. Skill metadata explicitly marks behavioral execution as external until retained model traces and results exist; do not infer a behavioral pass from the date.

Public identifiers follow semantic versioning in the catalog. Deprecate by moving the complete skill to `skills/deprecated/`, recording its replacement in [`docs/MIGRATIONS.md`](docs/MIGRATIONS.md), and removing it from the active catalog. When an alias is intentionally retained, installation always uses the canonical directory. Do not silently reuse a retired identifier for different behavior.

## License and attribution

This repository is MIT licensed. See [`LICENSE`](LICENSE). Portions of the skill design and wording are adapted from Matt Pocock's MIT-licensed skills; the retained attribution is in [`NOTICE`](NOTICE).
