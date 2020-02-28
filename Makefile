MDCAT:=$(firstword $(shell which mdcat cat 2>/dev/null))

.PHONY: help
help:
	$(MDCAT) MAKE.md

.PHONY: readme
readme:
	$(MDCAT) README.md

.PHONY: test
test:
	npm test


.PHONY: publish
publish:
	npm publish

