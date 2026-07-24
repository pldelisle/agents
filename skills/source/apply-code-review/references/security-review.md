# Security Review and Threat Modelling

Apply this reference in full when a change touches a trust boundary, identity, authorization,
secrets, sensitive data, untrusted input, dependencies, build or deployment, infrastructure,
external integration, agents, model output, or privileged side effects.

## Contents

1. Security review rules
2. Focused threat model
3. Authentication and authorization
4. Secrets and credentials
5. Data exposure and privacy
6. Input, interpretation, and outbound requests
7. Dependencies and software supply chain
8. Agents, models, tools, and connectors
9. Security verification and reporting

## 1. Security review rules

- Review the design and data flow before searching for vulnerability patterns.
- Assume every external actor, input, dependency, service response, model output, and stored
  record can be malicious unless a verified trust boundary says otherwise.
- Distinguish authentication (who the actor is) from authorization (what that actor may do to
  this operation and object in this state).
- Prefer deny-by-default, least privilege, complete mediation, minimized data, short-lived
  credentials, explicit trust transitions, and safe failure.
- Look for bypasses around a control, not only defects inside the control.
- Evaluate preventive, detective, and recovery controls. Logging without prevention is not a
  sufficient control for an irreversible privileged action.
- Never paste a discovered secret into commands, findings, logs, test fixtures, or messages.
  If a credential may be live, identify only its type and location, minimize further exposure,
  and recommend immediate revocation or rotation through the authorized incident process.

## 2. Focused threat model

Answer four questions for the changed surface:

1. **What are we changing?** Map assets, actors, entry and exit points, components, data flows,
   trust boundaries, privileged operations, external dependencies, and security controls.
2. **What can go wrong?** Describe credible abuse and failure scenarios from an attacker's or
   less-privileged actor's perspective.
3. **What are we doing about it?** Map each threat to preventive, detective, and recovery
   controls and identify who owns residual risk.
4. **Did we do enough?** Verify controls with tests or direct evidence and record assumptions,
   untested paths, and accepted risk.

Use STRIDE as a prompt, not a substitute for system understanding:

- **Spoofing:** impersonated user, service, worker, webhook, package, or tool.
- **Tampering:** modified request, object identifier, state, artifact, dependency, message, or
  policy input.
- **Repudiation:** privileged action cannot be reliably attributed or audit evidence can be
  altered.
- **Information disclosure:** data crosses to an unauthorized actor, tenant, log, cache,
  artifact, model, connector, or third party.
- **Denial of service:** unbounded input, fan-out, retries, expensive parsing, lock contention,
  quota bypass, or resource exhaustion.
- **Elevation of privilege:** horizontal, vertical, tenant, service, tool, or confused-deputy
  escalation.

For each credible threat, record:

```text
Asset and security property:
Threat actor and precondition:
Abuse path across trust boundaries:
Impact and blast radius:
Existing control and evidence:
Missing mitigation or residual risk owner:
```

Prioritize by plausible reachability and impact. Do not assign numerical risk scores without
an established repository model and evidence for its inputs.

## 3. Authentication and authorization

Trace every changed privileged operation from request to side effect. Check:

- identity is established by a trusted mechanism and cannot be selected through user input;
- authentication state, token audience, issuer, expiry, signature, revocation, and session
  lifecycle are validated at the correct boundary;
- authorization executes server-side for every operation and object, including batch,
  background, export, retry, websocket, webhook, and administrative paths;
- policy denies by default and failure cannot fall through to an allowed state;
- horizontal access uses the actor's permitted object scope rather than trusting an object ID;
- vertical access distinguishes user, operator, service, and administrator capabilities;
- tenant isolation applies to reads, writes, search, cache keys, jobs, files, and indirect
  references;
- ownership and role changes cannot authorize themselves or exploit stale cached policy;
- authorization occurs close enough to the protected action to avoid time-of-check/time-of-use
  gaps and confused-deputy behavior;
- list and bulk endpoints filter unauthorized objects rather than only protecting detail paths;
- mass assignment, alternate encodings, optional fields, and default values cannot broaden
  privileges;
- errors do not reveal object existence or policy internals beyond the intended contract;
- security-relevant decisions and privileged actions produce attributable, tamper-resistant,
  appropriately minimized audit evidence;
- tests include unauthenticated, wrong-role, wrong-owner, cross-tenant, stale/revoked identity,
  and policy-failure cases applicable to the change.

Do not accept user-interface hiding, client-side checks, possession of an identifier, or an
earlier gateway check as sufficient authorization unless the architecture proves complete
mediation for every path.

## 4. Secrets and credentials

Search the changed content and data paths for passwords, API keys, private keys, access and
refresh tokens, session identifiers, connection strings, webhook secrets, certificates, and
provider-specific credentials. Check:

- no secret is hard-coded in source, history additions, configuration defaults, examples,
  tests, fixtures, snapshots, generated output, container layers, or documentation;
- secrets come from the repository's approved secret mechanism and are never silently replaced
  with an insecure fallback;
- credentials are scoped to the minimum service, operation, environment, tenant, and lifetime;
- credentials are short-lived where feasible, revocable, rotatable, and attributable;
- secrets do not enter logs, traces, metrics, exception text, URLs, command-line arguments,
  process listings, caches, artifacts, or temporary files;
- redaction handles structured and encoded forms and occurs before crossing an observability or
  error boundary;
- forked builds, pull requests, untrusted branches, generated previews, and debug tooling
  cannot extract CI/CD or production secrets;
- comparison, storage, transit, and memory lifetime use the platform's established safe
  mechanisms where relevant;
- secret rotation and revocation do not strand dependent services or require exposing the old
  secret.

Treat a committed live credential as compromised even if later removed from the visible diff.
Removal is not remediation; revocation or rotation is required.

## 5. Data exposure and privacy

Classify changed data by sensitivity and trace its complete lifecycle:

- collection and purpose;
- validation and normalization;
- in-memory processing and isolation;
- storage, indexes, replicas, caches, and backups;
- serialization, APIs, files, exports, connectors, and third parties;
- logs, traces, metrics, analytics, errors, support tools, and test artifacts;
- retention, deletion, legal holds, and restoration.

Check:

- collect, persist, and return only fields needed for the stated purpose;
- responses, projections, serializers, error objects, pagination metadata, and debug endpoints do
  not expose internal or sensitive fields;
- object and field-level authorization applies before serialization and export;
- tenant, environment, and purpose separation survive caches, background jobs, and analytics;
- sensitive values are protected in transit and at rest using established platform controls;
- logs use safe identifiers and exclude credentials, session values, personal data, source
  content, prompts, and tool payloads unless explicitly justified and protected;
- redaction occurs before data leaves the trusted component and cannot be bypassed by nested,
  binary, encoded, or oversized values;
- deletion covers derived stores, queues, caches, indexes, and exports according to the actual
  contract;
- third-party disclosure, model-provider transmission, residency, retention, and training use
  match the product's stated policy;
- failure and partial completion do not leave a more exposed copy of the data.

Treat data-exposure impact as the intersection of sensitivity, affected actors, scale, duration,
and recoverability. A one-record cross-tenant disclosure can still be high severity because it
demonstrates a general authorization failure.

## 6. Input, interpretation, and outbound requests

At every interpreter or boundary, verify that data is kept separate from control:

- parameterize database and operating-system operations using the repository's safe APIs;
- apply context-appropriate output encoding rather than generic input stripping;
- validate file paths after canonicalization and constrain them to an authorized root;
- use safe parsers with bounded depth, size, expansion, and entity behavior;
- avoid unsafe deserialization and dynamic evaluation of untrusted data;
- constrain templates, regular expressions, redirects, URLs, headers, and archive extraction;
- protect state-changing browser requests against the platform's CSRF and origin threats;
- validate uploads by content, size, storage location, serving behavior, and downstream parser;
- constrain outbound destinations, redirects, DNS behavior, protocols, ports, and credentials to
  prevent server-side request forgery and internal service access;
- enforce timeouts, quotas, rate limits, pagination, and bounded concurrency at attacker-
  controlled cost boundaries;
- keep error handling fail-closed for security decisions without leaking internals.

Validate at the boundary that owns the trust transition and encode at the boundary that knows
the output context. Do not rely on one normalization step to make data safe for every sink.

## 7. Dependencies and software supply chain

For every added, removed, or changed dependency, plugin, action, image, toolchain, generated
artifact, or package source, determine:

- why the dependency is necessary and whether existing platform capability suffices;
- whether the name, namespace, registry, publisher, repository, and download source are the
  intended provenance rather than a typo-squat or substitution;
- whether versions and transitive resolution are reproducible through the repository's lock,
  pinning, integrity, and update policy;
- whether install, build, generation, post-install, plugin, macro, or action code executes with
  repository, network, signing, or deployment privileges;
- whether the change expands runtime permissions, network access, native code, serialization,
  parsers, or data sent to a third party;
- whether known vulnerabilities affect a reachable code path in this product, not merely
  whether a scanner reports an identifier;
- whether maintenance activity, release integrity, security policy, compromise history, and
  ownership create a material trust concern;
- whether license or distribution constraints create a release risk when repository policy
  covers them;
- whether update and rollback behavior is tested and the lockfile change matches the declared
  manifest change;
- whether removing a direct package leaves a vulnerable or unexpected transitive copy.

Treat scanner scores and vulnerability severity as inputs. Confirm affected versions,
configuration, reachability, exploit prerequisites, mitigations, and blast radius. Any risk
acceptance must name the specific vulnerability, reason, compensating control, owner, and review
or expiry condition; a blanket ignore is not evidence.

## 8. Agents, models, tools, and connectors

When untrusted text or model output can influence tools or external systems, check:

- instructions and data are separated; retrieved content cannot silently redefine trusted
  policy or authorization;
- tool selection, arguments, destinations, and side effects are validated against the user's
  authorized intent, not only generated text;
- tool credentials and connectors use least privilege and do not become a confused deputy;
- untrusted output cannot construct shell commands, paths, queries, templates, or code without
  the applicable safe boundary;
- external content, repository text, issues, email, and web pages are treated as potential
  prompt-injection sources;
- sensitive context is minimized before model or connector transmission and cannot be
  exfiltrated through tool calls, URLs, logs, citations, or generated artifacts;
- approval boundaries exist for destructive, privileged, irreversible, or externally visible
  actions and cannot be bypassed through retries or alternate tools;
- loops, delegation, retries, tokens, tool calls, and output sizes are bounded;
- provenance and uncertainty are preserved where generated output affects decisions;
- failures, refusals, and partial tool results cannot be presented as successful completion.

Do not treat the model as a security principal or a trusted policy engine. Enforce permissions
and invariants in deterministic code at the side-effect boundary.

## 9. Security verification and reporting

Seek evidence proportionate to the threat:

- negative authorization tests at the actual protected boundary;
- regression tests for demonstrated injection, traversal, disclosure, or state-bypass paths;
- repository-approved secret, dependency, static, and configuration scans;
- tests for redaction, safe errors, audit events, expiry, revocation, and tenant separation;
- bounded abuse tests for size, recursion, retries, concurrency, and expensive operations;
- direct inspection of effective permissions, generated configuration, lockfile resolution, and
  deployment overlap where safe and available.

Do not run exploit code against live systems or transmit repository data to external scanners
without explicit authorization. Prefer local, non-destructive verification.

A security finding must identify the asset and property at risk, attacker or less-privileged
actor, prerequisites, trust-boundary path, missing or bypassed control, impact, and bounded
remediation outcome. Keep proof sufficient for maintainers to verify while minimizing weaponized
detail and sensitive content.
