
all: spacetrack.js spacetrack.min.js pkgjson

.PHONY: clean all jshint test

test: spacetrack.js
	node_modules/.bin/mocha --recursive --reporter spec --require should

jshint: spacetrack.js
	node_modules/.bin/jshint spacetrack.js

spacetrack.js: $(shell node_modules/.bin/smash --list src/spacetrack.js)
	@rm -f $@
	node_modules/.bin/smash src/spacetrack.js | node_modules/.bin/uglifyjs - --beautify indent-level=2 --output $@
	@chmod a-w $@

spacetrack.min.js: spacetrack.js
	@rm -f $@
	node_modules/.bin/uglifyjs $< --compress --mangle --output $@

pkgjson: spacetrack.js
	node pkgjson.js

clean:
	rm -f spacetrack*.js
