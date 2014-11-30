var test = require('tape');
var fs = require('fs');

// Credentials
var username, password;
if ( process.env.ST_USER && process.env.ST_PASS &&
      process.env.ST_USER.length > 0 && process.env.ST_PASS.length > 0 ) {

  username = process.env.ST_USER;
  password = process.env.ST_PASS;

} else if ( fs.existsSync( __dirname + '/config.json' ) ) {

  var config = require(__dirname + '/config.json');

  username = config.username;
  password = config.password;

} else {
  throw new Error('no login credentials');
}

// Test

var SpaceTrack = require('./../src/spacetrack');

var spacetrack = new SpaceTrack({
  username: username,
  password: password
});

test('SpaceTrack#get', function(t) {

  t.plan(2);

  t.ok(spacetrack.get);

  t.ok(spacetrack.get instanceof Function);

});

