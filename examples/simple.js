var spacetrack = require('../');
var util = require('util');

spacetrack.login({
  username: 'username',
  password: 'password'
});

spacetrack.get({
  type: 'tle_latest',
  query: [
    {field:'NORAD_CAT_ID', condition: '25544,39166'},
    {field:'ORDINAL', condition: '1'},
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
  console.log( util.inspect(result, {colors: true, depth: null}) );
}, function(err) {
  console.error('error', err.stack);
});

/*
[ { name: 'ISS (ZARYA)',
    epoch: '2014-11-30 06:04:20Z',
    eccentricity: '0.0007406',
    inclination: '51.6472',
    rightAscension: '356.222',
    argPericenter: '82.0627',
    meanAnomaly: '354.8734',
    meanMotion: '15.5163917' },
  { name: 'NAVSTAR 68 (USA 242)',
    epoch: '2014-11-29 04:46:55Z',
    eccentricity: '0.0015209',
    inclination: '55.3145',
    rightAscension: '77.407',
    argPericenter: '8.8422',
    meanAnomaly: '351.1853',
    meanMotion: '2.00562708' } ]
 */
