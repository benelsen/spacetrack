import test from 'tape'

import {assocPath} from 'ramda'

// Credentials
let username, password
if ( process.env.ST_USER && process.env.ST_PASS ) {
  username = process.env.ST_USER
  password = process.env.ST_PASS
} else {
  throw new Error('no login credentials')
}

// Tests
import spacetrack, {SpaceTrack} from '../lib/'

test('SpaceTrack', function(t) {
  t.plan(1)
  t.ok(spacetrack instanceof SpaceTrack)
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

  t.plan(4)

  t.ok(spacetrack.get instanceof Function)

  const testQuery = {
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
  }

  spacetrack.get(testQuery)
  .then(function (result) {
    t.ok(result instanceof Array)
  })
  .catch( err => {
    throw err
  })

  spacetrack.get(assocPath(['conditions', 'EPOCH'], '1990-01-01 00:00:00.000', testQuery))
  .then(function (result) {
    t.ok(result instanceof Array)
    t.equal(result.length, 0)
  })
  .catch( err => {
    throw err
  })

})
