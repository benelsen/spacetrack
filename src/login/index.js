var base = require('../common');

var request = require('request');
var Promise = require('es6-promise').Promise;

var login = function () {

  return new Promise(function (resolve, reject) {

    var jar = this.cookieJar;

    request.post(base.baseURL + '/ajaxauth/login', {
      form: {
        identity: this.options.username,
        password: this.options.password
      },
      jar: jar,
      json: true
    }, function(err, res, body) {

      if ( err ) {
        return reject(err);
      }

      if ( body.Login === 'Failed' ) {
        return reject(new Error('Login Failed'));
      }

      if ( res.statusCode === 200 ){
        this.loggedIn = true;
        return resolve(true);
      }

      reject(new Error('HTTP Error ' + res.statusCode));

    }.bind(this));

  }.bind(this));

};

module.exports = login;
