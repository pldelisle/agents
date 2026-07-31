SHELL := /bin/bash

.PHONY: all skills dist clean test

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

test: dist
	node --test
