# Quality-Attribute Testing

Use this reference for performance, reliability, accessibility, compatibility, flexibility, safety,
and other non-functional requirements. Turn each vague adjective into a measurable scenario before
testing.

## Contents

- Scenario format
- Performance efficiency
- Reliability and resilience
- Interaction and accessibility
- Compatibility and flexibility
- Maintainability and safety

## Scenario format

Define the source and stimulus, environment, affected artifact, required response, and response
measure. A useful objective names the workload or event, data shape, concurrency, environment,
measurement window, percentile or error budget, resource ceiling, and pass threshold.

Do not invent thresholds. Obtain them from requirements, SLOs, capacity plans, user research,
supported-platform policy, regulations, or an explicitly accepted baseline.

## Performance efficiency

### Experimental design

- State the question: regression, latency, throughput, capacity, scalability, stress, spike,
  endurance/soak, or resource leak.
- Model representative request mixes, arrival patterns, concurrency, data volumes, cache states,
  payloads, and dependency behavior. Separate cold start from steady state.
- Use a production-representative but isolated environment. Record hardware, topology, versions,
  configuration, dataset, load generator, and competing work.
- Verify the load generator is not the bottleneck. Synchronize clocks where cross-host timings matter.
- Warm up runtimes and caches deliberately, run enough independent samples, retain the distribution,
  and compare like with like. Avoid conclusions from a single run or arithmetic mean alone.
- Report throughput, error rate, p50/p90/p95/p99 or requirement-specific tail latency, saturation,
  queue depth, CPU, memory, I/O, network, and downstream constraints as applicable.
- Define practical and statistical significance before calling a regression. Use confidence intervals
  or repeated paired comparisons where tooling supports them.

### Capacity and overload

Measure normal operating range, saturation point, breaking point, failure mode, load shedding,
backpressure, degradation, retry amplification, and recovery after load removal. Stop safely before an
uncontrolled cascade. Preserve enough headroom for the stated availability and growth assumptions.

Run microbenchmarks only for isolated algorithmic questions. Prevent dead-code elimination and include
setup in the measurement only when production pays that cost. A faster microbenchmark does not prove a
faster user journey.

## Reliability and resilience

- Test repeated and long-running operation, restart and reconnect, resource exhaustion, dependency
  slowness or loss, malformed responses, partitions, clock movement, cancellation, and process death
  where credible.
- Verify timeouts are bounded, retries are selective and safe, jitter/backoff does not amplify load,
  duplicate work is idempotent, and partial work is cleaned up or recoverable.
- Verify durability and recovery point/time objectives with actual restore or failover exercises when
  authorized; the existence of a backup is not restore evidence.
- Use fault injection at controlled seams first. Use chaos experiments only with explicit hypotheses,
  blast-radius controls, observability, abort conditions, and authorization.
- Assert both steady-state user behavior and system recovery. Record time to detect, contain, recover,
  and return to full capacity.

## Interaction and accessibility

Use WCAG 2.2 and applicable policy as testable requirements for web content. Automated tools detect
only a subset; combine them with keyboard, focus, zoom/reflow, screen-reader or accessibility-tree,
contrast, motion, error-recovery, and representative user evaluation as required.

- Test perceivable names and alternatives, semantic roles/states, reading and focus order, keyboard
  access, visible focus, target size, non-drag alternatives, authentication, status announcements,
  validation, and error association where applicable.
- Cover responsive variants, supported browsers/devices, localization expansion, high contrast,
  reduced motion, text resizing, and assistive technologies promised by the product.
- Report the exact WCAG version, success criterion, conformance target, technology, tool, and manual
  procedure. Automated success alone is not a conformance claim.

## Compatibility and flexibility

Build the matrix from the documented support policy and telemetry or user need, not every possible
combination. Cover minimum and maximum supported versions, upgrade and mixed-version windows, protocol
and schema evolution, browser/device/runtime/OS variants, installation, configuration, coexistence,
replacement, and rollback where promised.

Use pairwise selection only after forcing known-risk combinations and invalid constraints. Record
exact versions and classify an untested supported cell as residual risk, not implicit success.

## Maintainability and safety

Test architectural or dependency rules only when they represent an explicit boundary with a concrete
failure consequence. Use maintainability metrics as investigation prompts, not release oracles.

For safety-related systems, derive tests from hazard analysis and safety requirements. Exercise unsafe
commands, sensor or input faults, stale data, control loss, limit violations, alarms, interlocks,
independent shutdown, degraded modes, and recovery using appropriate simulation or accredited
environments. Never perform a hazardous test without explicit authorization, trained oversight, and
documented containment.
