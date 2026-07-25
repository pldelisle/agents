# Security and Privacy Testing

Apply this reference when code or configuration affects a trust boundary, identity, authorization,
tenancy, sensitive data, external input, privileged side effect, supply chain, or exposed service.

## Contents

- Safety and authorization
- Threat-derived strategy
- Verification layers
- Core security properties
- Security test evidence

## Safety and authorization

- Confirm target ownership, scope, environment, permitted techniques, accounts, rate limits, time
  window, monitoring contacts, data handling, and stop conditions before active testing.
- Default to local or isolated test environments. Never scan, fuzz, load, exploit, or disrupt a
  production or third-party target without explicit authorization.
- Use dedicated least-privilege test identities and synthetic data. Do not persist tokens, payloads
  containing sensitive data, or unnecessary exploit detail in artifacts.
- Prefer a non-destructive proof. Stop after proving impact; do not pivot, exfiltrate, establish
  persistence, or broaden scope.

## Threat-derived strategy

Map actors, assets, entry points, privileges, trust boundaries, data flows, external dependencies, and
abuse cases. For each credible threat, state:

1. the security property and applicable requirement;
2. attacker capability and preconditions;
3. attack or misuse path;
4. expected prevention, detection, containment, and recovery behavior;
5. the safest test technique and oracle.

Use OWASP ASVS 5.0.0 as a source of versioned, verifiable web-application requirements and the OWASP
WSTG v4.2 as stable scenario guidance. Tailor both to the actual technology and threat model; passing a
checklist is not certification.

## Verification layers

Use complementary evidence because no single scanner or test method is complete:

- **Requirements and threat model:** verify that security and privacy obligations are explicit and
  testable.
- **Unit/component:** verify control logic, validation, encoding, cryptographic API use, and safe
  failure without exposing secrets.
- **Integration/system:** verify controls at the deployed boundary with real middleware, identity,
  storage, transport, and configuration.
- **Static and dependency analysis:** use repository-approved SAST, secret, IaC, container, and SCA
  tools; validate findings for reachability and context.
- **Dynamic/manual testing:** use DAST, fuzzing, and focused adversarial testing for runtime and
  business-logic weaknesses that automation may miss.

## Core security properties

Test applicable positive and negative requirements.

### Identity, session, and authorization

- unauthenticated, wrong-role, wrong-tenant, wrong-object, stale, disabled, and revoked identities;
- direct object references, bulk operations, nested resources, alternate methods, and background jobs;
- session creation, rotation, expiry, logout, replay, fixation, concurrent use, and recovery;
- deny-by-default behavior and enforcement at every independently reachable boundary.

### Input, output, and execution

- canonicalization before validation; size, depth, count, recursion, encoding, and decompression limits;
- contextual injection defenses for queries, commands, templates, paths, redirects, headers, and logs;
- safe parsing and deserialization, content-type enforcement, file handling, archive extraction, and
  server-side request destinations;
- output encoding, security headers, error minimization, and safe handling of attacker-controlled
  values in logs and telemetry.

### Data protection and privacy

- collection minimization, purpose and consent rules where specified, access, export, retention,
  deletion, backups, caches, replicas, logs, and analytics;
- encryption in transit and at rest where required, key and secret boundaries, token audience/scope,
  and failure when cryptographic verification is invalid;
- absence of credentials, personal data, internal metadata, and cross-tenant content in responses,
  errors, artifacts, logs, metrics, traces, and caches.

### Abuse, availability, and supply chain

- rate and resource limits, expensive-input amplification, quotas, lockout abuse, replay, automation,
  and graceful overload behavior;
- dependency provenance, integrity pins, install/build hooks, generated artifacts, permission changes,
  and known vulnerabilities with reachable impact;
- secure defaults and production configuration, including debug paths, admin surfaces, transport,
  CORS, cookies, storage permissions, and network exposure.

## Security test evidence

For each finding, preserve a minimal safe reproducer, affected asset and actor, expected security
property, actual result, environment, tool version, and confidence. Redact secrets and sensitive data.
Separate confirmed vulnerabilities from scanner candidates and defense-in-depth improvements.

After a correction, add a regression test at the lowest reliable layer and re-test the deployed
boundary when configuration or integration affects the control. Record residual exposure and any
requirement that could not be tested.
