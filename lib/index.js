
import request from 'request'

import delay from './delay'

import {baseURL} from './common'
import buildURL from './buildURL'
import normaliseData from './normalise'

import {version} from '../package.json'

/**
 * Creates a new SpaceTrack instance.
 * (Should not be called manually, the library exports a singleton.)
 * @class
 * @private
 */
class SpaceTrack {

  constructor () {

    this.version = version

    this.credentials = {
      username: null,
      password: null
    }

    this.loggedIn = false
    this.loginInProgress = false
    this.failedLoginAttempts = 0
    this.cookieJar = request.jar()

  }

  /**
   * Performs a login with the Space-Track API using the provided credentials.
   * @param    {Object}  credentials
   * @property {string}  credentials.username Username
   * @property {string}  credentials.password Password
   * @return   {Promise}                      Promise that resolves to the result (boolean) of the login attempt
   *                                          (true if user is logged in, false if another attempt is already in progress)
   *                                          Or rejects upon an unsuccessful attempt with a reason.
   */
  login (credentials) {

    if ( this.loggedIn ) {
      return Promise.resolve(true)
    }

    if ( this.loginInProgress ) {
      return Promise.resolve(false)
    }

    this.loginInProgress = true

    if ( credentials && credentials.username && credentials.password ) {
      this.credentials = credentials
    }

    if ( !(this.credentials && this.credentials.username && this.credentials.password) ) {
      this.loginInProgress = false
      return Promise.reject( new Error('No credentials provided') )
    }

    return new Promise( (resolve, reject) => {

      request.post(baseURL + '/ajaxauth/login', {
        form: {
          identity: this.credentials.username,
          password: this.credentials.password
        },
        jar: this.cookieJar,
        json: true
      }, (err, res, body) => {

        this.loginInProgress = false

        if ( !err && res.statusCode === 200 && body.Login !== 'Failed' ) {
          this.loggedIn = true
          this.failedLoginAttempts = 0
          return resolve(true)
        }

        this.loggedIn = false
        this.failedLoginAttempts += 1

        if ( body.Login === 'Failed' ) {
          err = new Error('Login Failed. Credentials not accepted.')
        } else {
          err = new Error('Login Failed. Got HTTP Error ' + res.statusCode + ' from SpaceTrack.')
        }
        err.statusCode = res.statusCode

        reject(err)
      })
    })

  }

  /**
   * Performs a request with the specified query against the Space-Track API.
   * @param    {Object} query        Query
   * @param    {Object} options      Options
   * @property {boolean} options.raw Return raw data from the Space-Track API?
   * @return   {Promise}             Promise that resolves to an Array of Elements
   */
  get (query, options = {}) {

    const result = this._getRequest(query)
      .catch( err => {

        // Not logged in / Session timed out
        if ( err.statusCode && err.statusCode === 401 ) {
          this.loggedIn = false
          return this.login().then( () => this._getRequest(query) )
        }

        throw err
      })

    if ( options.raw ) {
      return result
    }

    return result.then( result => {
      let data = result.data
      if ( !Array.isArray(data) ) {
        data = [data]
      }
      return normaliseData(data)
    })
  }

  /**
   * Performs the actual request against the API
   * @private
   * @param  {Object} query Query
   * @return {Promise}      Result
   */
  _getRequest (query) {

    if ( this.loginInProgress ) {
      return delay(250).then( () => this._getRequest(query) )
    }

    if ( !this.loggedIn ) {
      return this.login().then( () => this._getRequest(query) )
    }

    const url = buildURL(query)

    return new Promise( (resolve, reject) => {

      request(url, {
        jar: this.cookieJar,
        json: true
      }, (err, res, body) => {

        if ( !err && res.statusCode === 200 ) {
          return resolve(body)
        }

        if ( !err ) {
          err = new Error('HTTP Error ' + res.statusCode )
          err.statusCode = res.statusCode
        }

        return reject(err)

      })

    })

  }

}

export const spacetrack = new SpaceTrack()
export default spacetrack
