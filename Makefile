
all: pkgjson

.PHONY: all jshint test

deps:
	npm install

test:
	node_modules/.bin/mocha --recursive --reporter spec --require should

jshint:
	node_modules/.bin/jshint --show-non-errors src/
	node_modules/.bin/jshint --show-non-errors test/

pkgjson:
	node pkgjson.js
