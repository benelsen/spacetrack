import spacetrack from '../lib/';
import util from 'util';

spacetrack.login({
  username: process.env.ST_USER,
  password: process.env.ST_PASS
}).then( result => console.info('Login completed. Result:', result))

spacetrack.get({
  type: 'tle_latest',
  conditions: {
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
    'MEAN_MOTION',
  ]
})
.then( result => {
  console.log( util.inspect(result, {colors: true, depth: null}) )
})
.catch( err => {
  console.error(err)
  throw err
})

/*
[ { name: 'ISS (ZARYA)',
    epoch: '2015-11-11T12:29:47.405184Z',
    inclination: 51.6449,
    argument_of_periapsis: 129.5613,
    right_ascension: 68.7539,
    mean_anomaly: 291.4123,
    eccentricity: 0.0006638,
    mean_motion: 15.5498395 },
  { name: 'NAVSTAR 68 (USA 242)',
    epoch: '2015-11-11T05:09:27.121536Z',
    inclination: 55.533,
    argument_of_periapsis: 11.6071,
    right_ascension: 63.4948,
    mean_anomaly: 348.4469,
    eccentricity: 0.0026844,
    mean_motion: 2.005599 } ]
 */
