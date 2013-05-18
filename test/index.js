var should = require('should');

var spacetrack = require('./../');

describe('spacetrack', function() {

  it('should exist', function() {
    should.exist(spacetrack);
  });

  it('should be a object', function() {
    spacetrack.should.be.a('object');
  });

});
