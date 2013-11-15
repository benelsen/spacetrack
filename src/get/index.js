(function(){
  'use strict';

  var request = require('request'),
      Q = require('q');

  var buildURL = require('./buildURL');

  var get = function (options) {

    var deferred = Q.defer();

    var url = buildURL(options);

    var _this = this;

    request(url, {
      jar: this.cookieJar
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
            deferred.resolve( _this.get( options ) );
          })
          .fail(function(err) {
            deferred.reject(err);
          });
      }

      return deferred.reject(new Error('unexpected error'));

    });

    return deferred.promise;

  };

  module.exports = get;

}());
