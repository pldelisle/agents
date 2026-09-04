# Skill identifier migrations

## 2.0.0

The active directory, frontmatter name, installer identifier, and UI prompt now share one canonical identifier:

| Replaced identifier | Canonical identifier |
|---|---|
| `implement-pl` | `implement` |
| `to-specs-pl` | `to-specs` |
| `code-review-pl` | `code-review` |
| `to-tickets-pl` | `apply-product-ownership` |
| `apply-test-engineering` | `engineer-tests` |

This is a major release because the active public catalog intentionally contains no `-pl` identifiers. Previously configured `-pl` selections must be updated. The legacy selections `to-tickets` and `apply-test-engineering` remain installer aliases and resolve to canonical directories so duplicate copies cannot drift.

The four `apply-specification-driven-*` skills moved to `skills/deprecated/` and are no longer built, listed, or installed. Their active replacements are documented in the catalog and README.
