# Space Track

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
    {field: 'NORAD_CAT_ID', condition: '25544'} // i.e.
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
    '+ORDINAL',
    '-NORAD_CAT_ID'
  ],
  limit: 3
}, function(err, result) {
  util.puts( util.inspect(result, {colors: true, depth: null}) );
});
```
Result:
```json
{
  "request_metadata": {
    "Total": 10,
    "Limit": 3,
    "LimitOffset": 0,
    "ReturnedRows": 3,
    "RequestTime": "0.3113"
  },
  "data": [
    {
      "OBJECT_NAME": "NAVSTAR 68 (USA 242)",
      "EPOCH": "2013-05-17 04:16:34",
      "INCLINATION": "55.0019",
      "ARG_OF_PERICENTER": "322.5536",
      "RA_OF_ASC_NODE": "99.946",
      "MEAN_ANOMALY": "37.413",
      "ECCENTRICITY": "0.0002604",
      "MEAN_MOTION": "1.97502337"
    },
    {
      "OBJECT_NAME": "ISS (ZARYA)",
      "EPOCH": "2013-05-19 07:23:54",
      "INCLINATION": "51.6479",
      "ARG_OF_PERICENTER": "332.9506",
      "RA_OF_ASC_NODE": "251.5234",
      "MEAN_ANOMALY": "68.617",
      "ECCENTRICITY": "0.0009375",
      "MEAN_MOTION": "15.50334239"
    },
    {
      "OBJECT_NAME": "NAVSTAR 68 (USA 242)",
      "EPOCH": "2013-05-17 03:24:21",
      "INCLINATION": "55.0007",
      "ARG_OF_PERICENTER": "322.6991",
      "RA_OF_ASC_NODE": "99.9489",
      "MEAN_ANOMALY": "11.4805",
      "ECCENTRICITY": "0.0002638",
      "MEAN_MOTION": "1.97500988"
    }
  ]
}
```

## Tests
Yep.
[![Build Status](https://travis-ci.org/benelsen/spacetrack.png?branch=develop)](https://travis-ci.org/benelsen/spacetrack)
