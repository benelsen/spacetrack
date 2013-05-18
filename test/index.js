/*global describe, it */
var should = require('should');

var SpaceTrack = require('./../src/spacetrack');

describe('SpaceTrack', function() {
  'use strict';

  it('should exist', function() {
    should.exist(SpaceTrack);
  });

  it('should be a function', function() {
    SpaceTrack.should.be.a('function');
  });

});
