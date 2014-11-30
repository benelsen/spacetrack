var request = require('request');
var Promise = require('es6-promise').Promise;

var buildURL = require('./buildURL');
var cleanData = require('./../common/cleanData');

var get = function(options) {

  return getRequest.call(this, options)
    .then(cleanData);

};

var getRequest = function(options) {

  return new Promise(function (resolve, reject) {

    var url = buildURL(options);

    request(url, {
      jar: this.cookieJar,
      json: true
    }, function(err, res, body) {

      if ( err ) {
        return reject(err);
      }

      if ( res.statusCode === 200 ) {
        return resolve(body);
      }

      if ( res.statusCode === 401 ) {
        this.loggedIn = false;

        return this.login()
          .then(function() {
            resolve( getRequest.call(this, options) );
          }.bind(this), reject);
      }

      return reject( new Error('HTTP Error ' + res.statusCode ));

    }.bind(this));

  }.bind(this));

};

module.exports = get;
