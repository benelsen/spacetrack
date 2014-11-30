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
      'ORDINAL'
    ],
    limit: 2
  })
  .then(function(result) {
    console.log( util.inspect(result, {colors: true, depth: null}) );
  })
  .catch(function(err) {
    console.error(err);
  });

```
Result:
```javascript
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
```
