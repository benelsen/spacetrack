# Space Track

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
.then( result => {
  console.log( util.inspect(result, {colors: true, depth: null}) )
})
```

Result:
```javascript
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
```
