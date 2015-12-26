
import request from 'request'
import Joi from 'joi'
import {clone} from 'ramda'

import buildURL from './buildURL'
import normalise from './normalise'
import {api, baseURL} from './common'

import {coerceArray, delay} from './helpers'

import {version} from '../package.json'

/**
 * Creates a new SpaceTrack instance.
 * (Should not be called manually, the library exports a singleton.)
 * @class
 * @private
 */
export class SpaceTrack {

  constructor (optionsRaw = {}) {

    const {error, value: options} = Joi.validate(optionsRaw, Joi.object().keys({
      baseURL: Joi.string().uri().default(baseURL),
    }))

    if (error) {
      throw error
    }

    // class properties
    this.baseURL = options.baseURL

    this.credentials = {
      username: null,
      password: null,
    }

    this.loggedIn = false
    this.loginInProgress = false
    this.failedLoginAttempts = 0
    this.cookieJar = request.jar()

    this.version = version
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
  login (credentialsRaw = {}) {

    if ( this.loggedIn ) {
      return Promise.resolve(true)
    }

    if ( this.loginInProgress ) {
      return Promise.resolve(false)
    }

    this.loginInProgress = true

    if ( !this.credentials.username || !this.credentials.password ) {

      const {error, value: credentials} = Joi.validate(credentialsRaw, Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }))

      if ( error ) {
        this.loginInProgress = false
        return Promise.reject( error )
      }

      this.credentials = credentials

    }

    return new Promise( (resolve, reject) => {

      request.post(`${this.baseURL}/ajaxauth/login`, {
        form: {
          identity: this.credentials.username,
          password: this.credentials.password,
        },
        jar: this.cookieJar,
        json: true,
      }, (err, res, body) => {

        this.loginInProgress = false

        if ( !err && res.statusCode === 200 && body.Login !== 'Failed' ) {
          this.loggedIn = true
          this.failedLoginAttempts = 0
          return resolve(true)
        }

        this.loggedIn = false
        this.failedLoginAttempts++

        if ( body.Login === 'Failed' ) {
          err = new Error('Login Failed. Credentials not accepted.')
        } else {
          err = new Error(`Login Failed. Got HTTP Error ${res.statusCode} from SpaceTrack.`)
        }
        err.statusCode = res.statusCode

        reject(err)
      })
    })

  }

  /**
   * Performs a request with the specified query against the Space-Track API.
   * @param    {Object}  query                           Query
   * @param    {Object}  [options]                       Options
   * @property {boolean} [options.raw]                   Return raw data from the Space-Track API?
   * @property {boolean} [options.epochNormalisation]    Normalise the epoch field?
   * @property {boolean} [options.keepMicrosecondsField] Keep the
   * @return   {Promise}                                 Promise that resolves to an Array of Elements
   */
  get (queryRaw = {}, optionsRaw = {}) {

    const {queryError, value: query} = Joi.validate(queryRaw, querySchema)

    if (queryError) {
      return Promise.reject( queryError )
    }

    const {optionsError, value: options} = Joi.validate(optionsRaw, Joi.object().keys({
      epochNormalisation: Joi.string().default(true),
      keepMicrosecondsField: Joi.boolean().default(false),
      raw: Joi.boolean().default(false),
    }))

    if ( optionsError ) {
      return Promise.reject( optionsError )
    }

    const result = this._getRequest(query, options)
      .catch( err => {

        // Not logged in / Session timed out
        if ( err.statusCode && err.statusCode === 401 ) {
          this.loggedIn = false
          return this.login().then( () => this._getRequest(query, options) )
        }

        throw err
      })

    if ( options.raw ) {
      return result
    }

    return result.then( result => normalise(coerceArray(result.data), options))
  }

  /**
   * Performs the actual request against the API
   * @private
   * @param  {Object} query   Query
   * @param  {Object} options Options
   * @return {Promise}        Result
   */
  _getRequest (query, options) {

    if ( this.loginInProgress ) {
      return delay(250).then( () => this._getRequest(query, options) )
    }

    if ( !this.loggedIn ) {
      return this.login().then( () => this._getRequest(query, options) )
    }

    const url = buildURL(this.baseURL, query, options)

    return new Promise( (resolve, reject) => {

      request(url, {
        jar: this.cookieJar,
        json: true,
      }, (err, res, body) => {

        if ( !err && res.statusCode === 200 ) {
          return resolve(body)
        }

        if ( !err ) {
          err = new Error(`HTTP Error ${res.statusCode}`)
          err.statusCode = res.statusCode
        }

        return reject(err)

      })

    })

  }

}

/**
 * Joi Schema
 * @private
 * @typedef {JoiSchema}
 */

/**
 * Validation schema for the query object
 * @private
 * @type {JoiSchema}
 */
const querySchema = Joi.object().keys({
  controller:   Joi.string().valid(api.controller).default('basicspacedata'),
  action:       Joi.string().valid(api.actions).default('query'),
  type:         Joi.string().valid(api.types).required(),
  conditions:   Joi.object().default(clone({})),
  predicates:   Joi.array().items(Joi.string()).default(clone([])),
  favorites:    Joi.array().items(Joi.string()).default(clone([])),
  orderBy:      Joi.array().items(Joi.string()).default(clone([])),
  limit:        Joi.number().integer().positive().default(50),
  offset:       Joi.number().integer().positive().default(0),
  distinct:     Joi.boolean().default(false),
  metadata:     Joi.boolean().valid(true).default(true),
  emptyresult:  Joi.string().valid('show').default('show'),
  format:       Joi.string().valid('json').default('json'),
})

export const spacetrack = new SpaceTrack()
export default spacetrack
