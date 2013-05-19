
all: pkgjson jshint test

.PHONY: all

deps:
	npm install

test: FORCE
	npm test

jshint:
	node_modules/.bin/jshint --show-non-errors src/
	node_modules/.bin/jshint --show-non-errors test/

pkgjson:
	node pkgjson.js

FORCE:
