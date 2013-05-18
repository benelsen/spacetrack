'use strict';

var get = require('./../src/get');

console.log( get({
  type: 'tle',
  predicates: [
    'OBJECT_NAME',
    'INCLINATION',
    'FILE'
  ],
  orderby: [
    '+ORDINAL',
    '-NORAD_CAT_ID'
  ],
  limit: 100,
  offset: 20,
  distinct: true,
  favorites: 'Navigation'
}) );
