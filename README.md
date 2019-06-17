# Space Track

[![Build Status](https://travis-ci.org/benelsen/spacetrack.svg?branch=master)](https://travis-ci.org/benelsen/spacetrack)

Simple node.js library for the [Space-Track.org](https://www.space-track.org/) REST API.

You need login credentials for Space-Track. Available upon request and approval [here](https://www.space-track.org/auth/create_user).

## API

This project follows [semver](http://semver.org/) principles.

### Login

```javascript
var spacetrack = require('spacetrack');
spacetrack.login({
  username: 'yourusername',
  password: 'yourpassword'
});
```

### Request
  This will build a request from the provided options and return a promise.

```javascript
var promise = spacetrack.get(options);
```

```javascript
options = {
  controller: 'basicspacedata', // defaults to 'basicspacedata'
  action: 'query', // defaults to 'query'

  type: 'tle_latest', // required, must be one of the following:
  // tle, tle_latest, tle_publish, omm, boxscore, satcat,
  // launch_site, satcat_change, satcat_debut, decay, tip, csm

  query: [  // optional, but highly recommended
    {field: 'NORAD_CAT_ID', condition: '25544'} // e.g. (see the API documentation)
  ],

  predicates: [  // optional
    'NORAD_CAT_ID', 'ORDINAL'
  ],

  favorites: [  // optional
    'Navigation'
  ],

  orderby: [  // optional
    '+ORDINAL', // ascending by ORDINAL
    '-NORAD_CAT_ID' // descending by NORAD_CAT_ID
  ],

  limit: 100, // optional, but recommended
  offset: 10, // optional (needs limit to be set, otherwise limit defaults to 100)

  distinct: false // optional (this option causes some hiccups)
}
```
  For more information on the options consult the [Space-Track API Documentation](https://www.space-track.org/documentation).

## Example

  This is a basic example to get the latest ephemerides of satellites 25544 (ISS) and 39166 (USA 242).

```javascript
var spacetrack = require('spacetrack');
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

```
Result:
```javascript
[ { name: 'ISS (ZARYA)',
    epoch: '2014-11-30 14:05:20Z',
    eccentricity: '0.0007404',
    inclination: '51.6481',
    rightAscension: '354.5641',
    argPericenter: '83.5665',
    meanAnomaly: '60.4119',
    meanMotion: '15.51651628' },
  { name: 'NAVSTAR 68 (USA 242)',
    epoch: '2014-11-30 04:42:49Z',
    eccentricity: '0.001521',
    inclination: '55.3151',
    rightAscension: '77.3669',
    argPericenter: '9.0755',
    meanAnomaly: '350.9483',
    meanMotion: '2.00562695' } ]
```
