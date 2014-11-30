var request = require('request');

var SpaceTrack = function(options) {
  this.options = options || {};

  if ( !this.options.username || !this.options.password ) {
    throw new Error('username or password undefined');
  }

  this.loggedIn = false;
  this.cookieJar = request.jar();

  this.login()
    .then(function() {
      this.loggedIn = true;
    }.bind(this), function(err) {
      throw err;
    });

};

SpaceTrack.version = '0.1.2';

SpaceTrack.prototype.login = require('./login');

SpaceTrack.prototype.get = require('./get');

module.exports = SpaceTrack;
