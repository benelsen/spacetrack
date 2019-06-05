'use strict';

var request = require('request');
var base = require('./common');
var buildURL = require('./buildURL');
var cleanData = require('./cleanData');

function SpaceTrack () {

  this.credentials =  {
    username: null,
    password: null
  };

  this.loggedIn = false;
  this.loginInProgress = false;
  this.failedLoginAttempts = 0;
  this.cookieJar = request.jar();

}

SpaceTrack.prototype.get = function get (options) {

  return this._getRequest.call(this, options)
    .catch(function (err) {

      // Not logged in / Session timed out
      if ( err.statusCode && err.statusCode === 401 ) {
        this.loggedIn = false;
        return this.login.call(this).then( this._getRequest.bind(this, options) );
      }

      throw err;

    }.bind(this))
    .then(cleanData);

};

SpaceTrack.prototype._getRequest = function _getRequest (options) {

  if ( this.loginInProgress ) {
    return delay(250).then( this._getRequest.bind(this, options) );
  }

  if ( !this.loggedIn ) {
    return this.login.call(this).then( this._getRequest.bind(this, options) );
  }

  return new Promise(function (resolve, reject) {

    var url = buildURL(options);

    request(url, {
      jar: this.cookieJar,
      json: true
    }, function(err, res, body) {

      if ( !err && res.statusCode === 200 ) {
        return resolve(body);
      }

      if ( !err ) {
        err = new Error('HTTP Error ' + res.statusCode );
        err.statusCode = res.statusCode;
      }

      return reject(err);

    }.bind(this));

  }.bind(this));

};

SpaceTrack.prototype.login = function (credentials) {

  if ( this.loggedIn ) {
    return true;
  }

  if ( this.loginInProgress ) {
    return false;
  }

  this.loginInProgress = true;

  if ( credentials && credentials.username && credentials.password ) {
    this.credentials = credentials;
  }

  if ( !(this.credentials && this.credentials.username && this.credentials.password) ) {
    this.loginInProgress = false;
    throw new Error('No credentials provided');
  }

  return new Promise(function (resolve, reject) {

    request.post(base.baseURL + '/ajaxauth/login', {
      form: {
        identity: this.credentials.username,
        password: this.credentials.password
      },
      jar: this.cookieJar,
      json: true
    }, function(err, res, body) {

      if ( !err && res.statusCode === 200 && body.Login !== 'Failed' ) {
        this.loggedIn = true;
        this.loginInProgress = false;
        this.failedLoginAttempts = 0;
        return resolve(true);
      }

      this.loggedIn = false;
      this.loginInProgress = false;
      this.failedLoginAttempts += 1;

      if ( body && body.Login === 'Failed' ) {
        err = new Error('Login Failed. Credentials not accepted.');
      } else if ( res ) {
        err = new Error('Login Failed. Got HTTP Error ' + res.statusCode + ' from SpaceTrack');
        err.statusCode = res.statusCode;
      }
      else {
        err = new Error(err.message);
      }

      reject(err);

    }.bind(this));

  }.bind(this));

};

SpaceTrack.prototype.version = require('../package.json').version;

function delay (ms) {

  return new Promise(function (resolve) {

    setTimeout(function () {
      resolve();
    }, ms);

  });

}

module.exports = new SpaceTrack();
