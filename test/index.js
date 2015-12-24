import test from 'tape'

// Credentials
var username, password
if ( process.env.ST_USER && process.env.ST_PASS ) {

  username = process.env.ST_USER
  password = process.env.ST_PASS

} else {
  throw new Error('no login credentials')
}

// Tests
import spacetrack from '../lib/'

test('SpaceTrack', function(t) {

  t.plan(2)

  t.ok(spacetrack)
  t.ok(spacetrack instanceof Object)

})

test('SpaceTrack#login', function (t) {

  t.plan(2)

  spacetrack.login({
    username: username,
    password: password,
  })
  .then(function (result) {

    t.ok(result)
    t.ok(spacetrack.loggedIn)

  })

})

test('SpaceTrack#get', function(t) {

  t.plan(3)

  t.ok(spacetrack.get)
  t.ok(spacetrack.get instanceof Function)

  spacetrack.get({
    controller: 'basicspacedata',
    action: 'query',
    type: 'tle_latest',
    conditions: {
      NORAD_CAT_ID: 25544,
    },
    predicates: [
      'NORAD_CAT_ID', 'ORDINAL',
    ],
    orderBy: [
      '+ORDINAL',
      '-NORAD_CAT_ID',
    ],
  })
  .then(function (result) {
    t.ok(result instanceof Array)
  })
  .catch( err => {
    throw err
  })

})
