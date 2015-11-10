const spacetrack = require('../').spacetrack
const util = require('util')

spacetrack.login({
  username: 'username',
  password: 'password'
})

spacetrack.get({
  type: 'tle_latest',
  query: {
    NORAD_CAT_ID: [25544, 39166],
    ORDINAL: 1,
  },
  predicates: [
    'OBJECT_NAME',
    'EPOCH',
    'INCLINATION',
    'ARG_OF_PERICENTER',
    'RA_OF_ASC_NODE',
    'MEAN_ANOMALY',
    'ECCENTRICITY',
    'MEAN_MOTION'
  ]
})
.then(function(result) {
  console.log( util.inspect(result, {colors: true, depth: null}) )
})

/*
[ { name: 'ISS (ZARYA)',
    epoch: '2015-11-10 18:22:05',
    inclination: 51.6444,
    arg_pericenter: 124.673,
    right_ascension: 72.5265,
    mean_anomaly: 25.1002,
    eccentricity: 0.0006657,
    mean_motion: 15.54961234 },
  { name: 'NAVSTAR 68 (USA 242)',
    epoch: '2015-11-09 17:15:32',
    inclination: 55.5321,
    arg_pericenter: 11.6622,
    right_ascension: 63.5546,
    mean_anomaly: 348.3891,
    eccentricity: 0.0026815,
    mean_motion: 2.00559928 } ]
 */
