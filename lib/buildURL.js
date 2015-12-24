import {contains} from 'ramda'

import {api} from './common'

/**
 * Builds the URL from the provided query object
 * @param  {Object} base      The base URL
 * @param  {Object} query
 * @param  {Object} [options]
 * @return {string}
 */
export default function buildURL (base, query, options = {}) {

  let url = `${base}/${query.controller}/${query.action}/class/${query.type}`

  // conditions
  url = Object.keys(query.conditions).reduce( (memo, key) => {
    if ( contains(key, api.fields[query.type]) ) {
      return `${memo}/${key}/${query.conditions[key].toString()}`
    }
    return memo
  }, url)

  // predicates
  if ( query.predicates.length > 0 ) {

    if ( !options.raw &&
          contains(query.type, ['tle', 'tle_latest']) &&
          contains('EPOCH', query.predicates) &&
         !contains('EPOCH_MICROSECONDS', query.predicates) ) {
      query.predicates = [...query.predicates, 'EPOCH_MICROSECONDS']
    }

    query.predicates = query.predicates.filter(function(p) {
      const isValid = contains(p, api.fields[query.type])
      if ( !isValid ) {
        throw new Error(p + ' is not a valid predicate for ' + query.type)
      }
      return isValid
    })

    url += `/predicates/${query.predicates.join()}`
  }

  // favorites
  if ( query.favorites.length > 0 ) {
    url += `/favorites/${query.favorites.join()}`
  }

  // orderBy
  // must be array ['+OBJECT_NAME','-ORDINAL']
  if ( query.orderBy.length > 0 ) {

    query.orderBy = query.orderBy.filter(function(p) {

      const predicate = p.slice( ~~( p[0] === '+' || p[0] === '-' ) )

      const isValid = contains(predicate, api.fields[query.type])
      if ( !isValid ) {
        throw new Error(`${predicate} is not a valid predicate for ${query.type}`)
      }

      return isValid
    })

    url += '/orderby/' + query.orderBy.map(function(o) {
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
