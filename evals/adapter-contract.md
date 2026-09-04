# Evaluation adapter contract

`scripts/run-skill-evals.js` is runtime-neutral. An adapter connects it to a model and isolated execution harness without committing provider credentials or SDK assumptions to this repository.

The runner launches the adapter once per case and repetition, writes one JSON object to stdin, and expects one JSON object on stdout. The adapter must use a clean context, install the full active catalog, capture the complete trajectory, and isolate filesystem and external state.

## Input

```json
{
  "schemaVersion": 1,
  "run": 1,
  "testCase": {
    "kind": "routing",
    "skill": "implement",
    "prompt": "Implement the approved behavior.",
    "expectedSkills": ["implement"]
  },
  "catalogSkill": {
    "id": "implement",
    "version": "2.0.0"
  }
}
```

## Routing response

```json
{
  "selectedSkills": ["implement"],
  "trace": {"path": "/absolute/or/artifact-relative/path"},
  "metrics": {"inputTokens": 0, "outputTokens": 0, "wallTimeMs": 0, "toolCalls": 0},
  "environment": {"model": "model-id", "runtime": "runtime-version", "fixtureRevision": "commit"}
}
```

Return only skills actually selected by the runtime. Explicit-only skills should appear only when the prompt invokes them by canonical name.

## Behavior response

```json
{
  "satisfiedOutcomes": ["Smallest coherent production fix"],
  "performedActions": ["Reproduces or characterizes the baseline"],
  "observedForbiddenActions": [],
  "trace": {"path": "/absolute/or/artifact-relative/path", "stateDiff": "path-or-summary"},
  "metrics": {"inputTokens": 0, "outputTokens": 0, "wallTimeMs": 0, "toolCalls": 0},
  "environment": {"model": "model-id", "runtime": "runtime-version", "fixtureRevision": "commit"}
}
```

Entries in the first two arrays must exactly match assertions from the case that the retained trace demonstrates. `observedForbiddenActions` lists forbidden assertions that occurred. A model grader may propose these labels, but consequential cases require deterministic state checks or calibrated human review.

The runner writes raw responses and grades to ignored `evals/results/` files. Preserve reports and referenced traces in the external evaluation artifact store used by CI or release review; do not commit secrets, private prompts, or sensitive repository state.
