import {contains} from 'ramda'
import Joi from 'joi'

import {api, baseURL} from './common'

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
  conditions:   Joi.object(),
  predicates:   Joi.array().items(Joi.string()),
  favorites:    Joi.array().items(Joi.string()),
  orderby:      Joi.array().items(Joi.string()),
  limit:        Joi.number().integer().positive().default(100),
  offset:       Joi.number().integer().positive().default(0),
  distinct:     Joi.boolean(),
  metadata:     Joi.boolean().default(true).valid(true),
  emptyresult:  Joi.string().default('show').valid('show'),
  format:       Joi.string().default('json').valid('json')
})

/**
 * Builds the URL from the provided query object
 * @param  {Object} query
 * @param  {Object} [options]
 * @return {string}
 */
export default function buildURL (queryRaw, options = {}) {

  const {error, value: query} = Joi.validate(queryRaw, querySchema)

  if (error) {
    throw error
  }

  let url = `${baseURL}/${query.controller}/${query.action}/class/${query.type}`

  // conditions
  // must be an object {field1: condition1, field2: condition2}
  if ( query.conditions ) {

    url = Object.keys(query.conditions).reduce( (url, key) => {

      if ( contains(key, api.fields[query.type]) ) {
        return `${url}/${key}/${query.conditions[key].toString()}`
      }

      return url

    }, url)

  }

  // predicates
  // must be array ['OBJECT_NAME','ORDINAL']
  if ( query.predicates ) {

    if ( !options.raw && contains(query.type, ['tle', 'tle_latest']) &&
          contains('EPOCH', query.predicates) &&
         !contains('EPOCH_MICROSECONDS', query.predicates) ) {
      query.predicates = [...query.predicates, 'EPOCH_MICROSECONDS']
    }

    query.predicates = query.predicates.filter(function(p) {

      var isValid = contains(p, api.fields[query.type])
      if ( !isValid ) {
        throw new Error(p + ' is not a valid predicate for ' + query.type)
      }

      return isValid
    })

    url += `/predicates/${query.predicates.join()}`
  }

  // favorites
  if ( query.favorites ) {
    url += `/favorites/${query.favorites.join()}`
  }

  // orderby
  // must be array ['+OBJECT_NAME','-ORDINAL']
  if ( query.orderby ) {

    query.orderby = query.orderby.filter(function(p) {

      var predicate = p.slice( ~~( p[0] === '+' || p[0] === '-' ) )

      var isValid = contains(predicate, api.fields[query.type])
      if ( !isValid ) {
        throw new Error(predicate + ' is not a valid predicate for ' + query.type)
      }

      return isValid
    })

    url += '/orderby/' + query.orderby.map(function(o) {
      return o.slice( ~~( o[0] === '+' || o[0] === '-' ) ) +'%20'+ (o[0] === '-' ? 'desc' : 'asc')
    }).join()

  }

  // limit & offset
  url += `/limit/${query.limit},${query.offset}`

  // distinct
  if ( query.distinct ) {
    url += `/distinct/${query.distinct}`
  }

  // metadata
  if ( query.metadata ) {
    url += `/metadata/${query.metadata}`
  }

  // emptyresult
  if ( query.emptyresult ) {
    url += `/emptyresult/${query.emptyresult}`
  }

  // format
  url += `/format/${query.format}`

  return url
}
