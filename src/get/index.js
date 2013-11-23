(function(){
  'use strict';

  var request = require('request'),
      Q = require('q');

  var buildURL = require('./buildURL'),
      cleanData = require('./../common/cleanData');

  var get = function(options) {

    return getRequest(options, this)
      .then(cleanData);

  };

  var getRequest = function(options, _this) {

    var deferred = Q.defer();

    var url = buildURL(options);

    request(url, {
      jar: _this.cookieJar
    }, function(err, res, body) {

      if ( err ) return deferred.reject(err);

      if ( res.statusCode === 200 ) {
        var data = JSON.parse(body);
        return deferred.resolve(data);
      }

      if ( res.statusCode === 401 ) {
        _this.loggedIn = false;

        return _this.login()
          .then(function() {
            _this.loggedIn = true;
            deferred.resolve( getRequest( options, _this ) );
          })
          .fail(function(err) {
            deferred.reject(err);
          });
      }

      return deferred.reject( new Error('unexpected error ' + res.statusCode ));

    });

    return deferred.promise;

  };

  module.exports = get;

}());
