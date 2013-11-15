(function(){
  'use strict';

  var base = require('../common');

  var request = require('request');

  var login = function (callback) {

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
          return callback(err);
        }

        if ( res.statusCode !== 200 ){
          return callback(new Error('Error ' + res.statusCode));
        }

        if ( body ) {
          var response;

          try {
            response = JSON.parse(body);
          } catch (e) {
            return callback(e);
          }

          if ( response.Login === 'Failed' ) {
            return callback(new Error('Login Failed'));
          }

        }

        if ( jar.cookies.length === 0 ) {
          return callback(new Error('No Cookies'));
        }

        return callback(null);
      }
    );

  };

  module.exports = login;

}());
