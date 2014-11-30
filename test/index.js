var test = require('tape');

// Credentials
var username, password;
if ( process.env.ST_USER && process.env.ST_PASS ) {

  username = process.env.ST_USER;
  password = process.env.ST_PASS;

} else {
  throw new Error('no login credentials');
}

// Tests
var spacetrack = require('../');

test('SpaceTrack', function(t) {

  t.plan(2);

  t.ok(spacetrack);

  t.ok(spacetrack instanceof Object);

});

test('SpaceTrack#login', function (t) {

  t.plan(2);

  spacetrack.login({
    username: username,
    password: password
  })
  .then(function (result) {

    t.ok(result);
    t.ok(spacetrack.loggedIn);

  });

});

test('SpaceTrack#get', function(t) {

  t.plan(2);

  t.ok(spacetrack.get);

  t.ok(spacetrack.get instanceof Function);

});
