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

/*
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
 */
