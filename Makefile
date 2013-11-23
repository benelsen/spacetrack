
all: pkgjson jshint test

.PHONY: all

deps:
	npm install

test: FORCE
	node_modules/.bin/mocha --recursive --reporter spec --require should

jshint:
	node_modules/.bin/jshint --show-non-errors src/
	node_modules/.bin/jshint --show-non-errors test/

complex:
	node_modules/.bin/cr src/

pkgjson:
	node pkgjson.js

FORCE:
