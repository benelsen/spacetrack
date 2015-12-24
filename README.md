# Space Track

[![npm version](https://badge.fury.io/js/spacetrack.svg)](https://badge.fury.io/js/spacetrack)
[![Build Status](https://travis-ci.org/benelsen/spacetrack.svg?branch=v3)](https://travis-ci.org/benelsen/spacetrack)
[![Dependency Status](https://david-dm.org/benelsen/spacetrack.svg?branch=v3)](https://david-dm.org/benelsen/spacetrack)
[![devDependency Status](https://david-dm.org/benelsen/spacetrack/dev-status.svg)](https://david-dm.org/benelsen/spacetrack#info=devDependencies)

Simple node.js library for the [Space-Track.org](https://www.space-track.org/) REST API.

You need login credentials for Space-Track. Available upon request and approval [here](https://www.space-track.org/auth/create_user).

**Note:**
The API and the data returned underwent major breaking changes with version 3.x. Please refer to the [Changelog](CHANGELOG.md)

## API

This project follows [semver](http://semver.org/) principles.

### Module import

**As a ES2015+ module**
```javascript
import spacetrack from 'spacetrack'
```

**As a CommonJS module (≤ES5)**
```javascript
var spacetrack = require('spacetrack').spacetrack
```

### Login

```javascript
spacetrack.login({
  username: 'yourusername',
  password: 'yourpassword'
})
```

### Request

This will build a request from the provided options and return a promise.

```javascript
const promise = spacetrack.get({
  controller: 'basicspacedata', // defaults to 'basicspacedata'
  action: 'query', // defaults to 'query'

  type: 'tle_latest', // required, must be one of the following:
  // tle, tle_latest, tle_publish, omm, boxscore, satcat,
  // launch_site, satcat_change, satcat_debut, decay, tip, csm

  conditions: {  // optional, but highly recommended
    NORAD_CAT_ID: 25544 // e.g. (see the API documentation)
  },

  predicates: [  // optional
    'NORAD_CAT_ID', 'ORDINAL'
  ],

  favorites: [  // optional
    'Navigation'
  ],

  orderBy: [  // optional
    '+ORDINAL', // ascending by ORDINAL
    '-NORAD_CAT_ID' // descending by NORAD_CAT_ID
  ],

  limit: 100, // optional, defaults to 100
  offset: 10, // optional, defaults to 0

  distinct: false // optional (this option causes some hiccups)
})
```

For more information on the options consult the [Space-Track API Documentation](https://www.space-track.org/documentation).

## Example

This is a basic example to get the latest ephemerides of satellites 25544 (ISS) and 39166 (USA 242).

```javascript
import spacetrack from 'spacetrack';
import util from 'util';

spacetrack.login({
  username: 'username',
  password: 'password'
})

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
    'MEAN_MOTION'
  ]
})
.then( result => {
  console.log( util.inspect(result, {colors: true, depth: null}) )
})
```

Result:
```javascript
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
```
