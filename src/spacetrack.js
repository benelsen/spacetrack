(function(){
  'use strict';

  var request = require('request');

  var SpaceTrack = function(options) {
    this.options = options || {};

    if ( !this.options.username || !this.options.password ) {
      throw new Error('username or password undefined');
    }

    this.cookieJar = request.jar();

    this.login(this.options.username, this.options.password, function(err) {
      if ( err )
        throw err;
    });

  };

  SpaceTrack.version = '0.0.1';

  SpaceTrack.prototype.login = require('./login');

  SpaceTrack.prototype.get = require('./get');

  module.exports = SpaceTrack;

}());
