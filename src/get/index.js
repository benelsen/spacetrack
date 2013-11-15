(function(){
  'use strict';

  var request = require('request');

  var buildURL = require('./buildURL');

  var get = function (options, callback) {

    var url = buildURL(options);

    var _this = this;

    request(url, {
      jar: this.cookieJar
    }, function(err, res, body) {

      if ( err ) return callback(err, null);

      if ( res.statusCode === 200 ) {
        var data = JSON.parse(body);
        return callback(null, data);
      }

      if ( res.statusCode === 401 ) {
        _this.loggedIn = false;

        return _this.login(function(err) {
          if ( err ) {
            throw err;
          } else {
            _this.loggedIn = true;
            _this.get( options, callback );
          }

        });
      }

      return callback(new Error('unexpected error'), null);

    });
  };

  module.exports = get;

}());
