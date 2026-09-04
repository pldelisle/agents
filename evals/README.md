# Skill evaluations

These files are versioned evaluation inputs, not claims that a model passed them.

- `routing-cases.json` contains positive, near-miss, and ambiguous activation prompts. Run each prompt repeatedly in a clean context with the complete skill collection installed.
- `behavior-cases.json` defines observable outcomes, required trajectory actions, and forbidden actions. Execute them in disposable repositories so file and tool side effects can be asserted.

For every run retain the skill version, model, runtime, tracker integration, repository fixture revision, token and wall-time budget, tool calls, output, filesystem or external-state diff, and grader result. Compare a candidate skill against the prior released version with unchanged harness settings. Use deterministic state assertions where possible and calibrate model or human graders against reviewed examples.

Add production failures as regression cases. Keep held-out cases separate when tuning descriptions or instructions, and exercise neighboring skills together to detect trigger stealing or conflicting guidance.

Run the suites through a runtime-specific adapter:

```bash
npm run eval -- --adapter /absolute/path/to/eval-adapter --runs 3
```

The adapter protocol and required trace/metric fields are defined in [`adapter-contract.md`](adapter-contract.md). Result files are written beneath ignored `evals/results/`; release evidence should be retained by the evaluation system rather than committed with credentials or sensitive traces.
