(function(){
  'use strict';

  var base = require('../common');

  var request = require('request'),
      Q = require('q');

  var login = function () {

    var deferred = Q.defer();

    var jar = this.cookieJar;

    request.post(
      base.baseURL + '/ajaxauth/login',
      {
        form: {
          identity: this.options.username,
          password: this.options.password
        },
        jar: jar
      },
      function(err, res, body) {

        if ( err ) {
          return deferred.reject(err);
        }

        if ( res.statusCode !== 200 ){
          return deferred.reject(new Error('Error ' + res.statusCode));
        }

        if ( body ) {
          var response;

          try {
            response = JSON.parse(body);
          } catch (e) {
            return deferred.reject(e);
          }

          if ( response.Login === 'Failed' ) {
            return deferred.reject(new Error('Login Failed'));
          }

        }

        return deferred.resolve();
      }
    );

    return deferred.promise;

  };

  module.exports = login;

}());
