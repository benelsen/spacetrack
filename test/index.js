/*global describe, it */
'use strict';

var should = require('should');

// Test

var SpaceTrack = require('./../src/spacetrack');

describe('SpaceTrack', function() {

  it('should exist', function() {
    should.exist(SpaceTrack);
  });

  it('should be a function', function() {
    SpaceTrack.should.be.a.instanceOf(Function);
  });

});
