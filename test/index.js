var test = require('tape');

var SpaceTrack = require('./../src/spacetrack');

test('SpaceTrack', function(t) {

  t.plan(2);

  t.ok(SpaceTrack);

  t.ok(SpaceTrack instanceof Function);

});
