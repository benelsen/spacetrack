# Space Track

Simple node.js library for the [Space-Track.org](https://www.space-track.org/) REST API.

You need login credentials for Space-Track. Available upon request and approval [here](https://www.space-track.org/auth/create_user).

## API
  Consider the API to be unstable at this time. Methods will change without notice and backward compatibility during this phase.

### Setup
  Require the library and create a new instance with your credentials.
  This will automatically try to do a login and store the needed cookies in a jar.
```javascript
var SpaceTrack = require('spacetrack');
var spacetrack = new SpaceTrack({
  username: 'yourusername',
  password: 'yourpassword'
});
```

### Request
  This will build a request from the provided options and call the callback with the result (and/or error).
  
```javascript
spacetrack.get(options, function(err, result) {});
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

  This is a basic example to get the first three sets of the selected fields (predicates) of satellites 25544 (ISS) and 39166 (USA 242) ordered ascending by `ORDINAL` and descending by `NORAD_CAT_ID`.

```javascript
var SpaceTrack = require('spacetrack'),
    util = require('util');

var spacetrack = new SpaceTrack({
  username: 'yourusername',
  password: 'yourpassword'
});

spacetrack.get({
    type: 'tle_latest',
    query: [
      {field:'NORAD_CAT_ID', condition: '25544,39166'}
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
    ],
    orderby: [
      '-EPOCH'
    ],
    limit: 3
  })
  .then(function(result) {
    util.puts( util.inspect(result, {colors: true, depth: null}) );
  })
  .fail(function(err) {
    console.error(err);
  });

```
Result:
```json
[ { name: 'ISS (ZARYA)',
    epoch: Sat Nov 23 2013 16:06:07 GMT+0100 (CET),
    eccentricity: '0.0001112',
    inclination: '51.651',
    rightAscension: '38.3864',
    argPericenter: '104.0257',
    meanAnomaly: '60.222',
    meanMotion: '15.50472132' },
  { name: 'ISS (ZARYA)',
    epoch: Sat Nov 23 2013 11:29:32 GMT+0100 (CET),
    eccentricity: '0.0001136',
    inclination: '51.6509',
    rightAscension: '39.3377',
    argPericenter: '107.1644',
    meanAnomaly: '64.2293',
    meanMotion: '15.50464898' },
  { name: 'ISS (ZARYA)',
    epoch: Sat Nov 23 2013 06:32:52 GMT+0100 (CET),
    eccentricity: '0.0001151',
    inclination: '51.6506',
    rightAscension: '40.3579',
    argPericenter: '106.2149',
    meanAnomaly: '354.5482',
    meanMotion: '15.50458843' } ]
```

## Tests
Yep.

[![Build Status](https://travis-ci.org/benelsen/spacetrack.png?branch=develop)](https://travis-ci.org/benelsen/spacetrack)
