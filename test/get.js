'use strict';

var config = JSON.parse(require('fs').readFileSync(__dirname+'/config.json', 'utf8'));

var SpaceTrack = require('./../src/spacetrack');

var st = new SpaceTrack({
  username: config.username,
  password: config.password
});

st.get({
  type: 'tle_latest',
  query: [
    {field:'NORAD_CAT_ID', condition: '25544'}
  ],
  predicates: [
    // 'OBJECT_NAME',
    // 'INCLINATION',
    // 'FILE'
  ],
  orderby: [
    '+ORDINAL'
    // '-NORAD_CAT_ID'
  ],
  limit: 100
  // offset: 20,
  // distinct: true,
  // favorites: 'Navigation'
}, function(err, data) {
  console.error(err);
  console.dir(data);
});
