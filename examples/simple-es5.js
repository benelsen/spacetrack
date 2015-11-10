const spacetrack = require('../').spacetrack
const util = require('util')

spacetrack.login({
  username: 'username',
  password: 'password'
})

spacetrack.get({
  type: 'tle_latest',
  query: [
    {field: 'NORAD_CAT_ID', condition: '25544,39166'},
    {field: 'ORDINAL', condition: '1'},
  ],
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
    epoch: '2015-11-10 13:22:28Z',
    eccentricity: '0.0006683',
    inclination: '51.6443',
    right_ascension: '73.5654',
    arg_pericenter: '125.1067',
    mean_anomaly: '299.1753',
    mean_motion: '15.54956788' },
  { name: 'NAVSTAR 68 (USA 242)',
    epoch: '2015-11-09 05:17:34Z',
    eccentricity: '0.0026796',
    inclination: '55.5318',
    right_ascension: '63.5746',
    arg_pericenter: '11.7037',
    mean_anomaly: '348.3475',
    mean_motion: '2.00559939' } ]
 */
