SHELL := /bin/bash

.PHONY: all skills dist clean validate test

all: dist

skills:
	./scripts/build-skills.sh all

dist:
	rm -rf "$(CURDIR)/dist"
	for runtime in codex claude kiro; do \
		for tracker in linear jira; do \
			SKILLS_OUTPUT_ROOT="$(CURDIR)/dist" ./scripts/build-skills.sh "$$runtime" "$$tracker"; \
		done; \
	done

clean:
	rm -rf "$(CURDIR)/dist"

validate:
	node scripts/validate-skills.js
	node --check scripts/build-skills.js
	node --check scripts/validate-skills.js
	node --check scripts/run-skill-evals.js
	node scripts/run-skill-evals.js --help > /dev/null

test: validate dist
	node --test
	npm pack --dry-run
