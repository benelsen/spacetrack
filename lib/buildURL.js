import {contains} from 'ramda'

import {api, baseURL} from './common'

/**
 * Builds the URL from the provided query object
 * @param  {Object} query
 * @param  {Object} [options]
 * @return {string}
 */
export default function buildURL (query, options = {}) {

  if ( !query ) {
    throw new Error('´query´ undefined')
  }

  if ( !query.type ) {
    throw new Error('´query.type´ required to be set')
  }

  // Required options (for now)
  query.metadata = true
  query.emptyresult = 'show'
  query.format = 'json'

  // controller
  if ( !query.controller || !contains(query.controller, api.controller) ) {
    query.controller = 'basicspacedata'
  }

  // action
  if ( !query.action || !contains(query.action, api.actions) ) {
    query.action = 'query'
  }

  if ( !contains(query.type, api.types) ) {
    throw new Error('request type not supported')
  }

  let url = `${baseURL}/${query.controller}/${query.action}/class/${query.type}`

  // conditions
  // must be an object {field1: condition1, field2: condition2}
  if ( query.conditions ) {

    url = Object.keys(query.conditions).reduce( (url, key) => {

      if ( contains(key, api.fields[query.type]) ) {
        return `${url}/${ key }/${ query.conditions[key].toString() }`
      }

      return url

    }, url)

  }

  // predicates
  // must be array ['OBJECT_NAME','ORDINAL']
  if ( query.predicates && query.predicates.length > 0 ) {

    if ( !Array.isArray(query.predicates) ) {
      query.predicates = [query.predicates]
    }

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

    url += '/predicates/' + query.predicates.join()
  }

  // favorites
  if ( query.favorites && query.favorites.length > 0 ) {

    if ( !Array.isArray(query.favorites) ) {
      query.favorites = [query.favorites]
    }

    url += '/favorites/' + query.favorites.join()
  }

  // orderby
  // must be array ['+OBJECT_NAME','-ORDINAL']
  if ( query.orderby && query.orderby.length > 0 ) {

    if ( !Array.isArray(query.orderby) ) {
      query.orderby = [query.orderby]
    }

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
  if ( !query.offset || !isFinite(query.offset) ) query.offset = 0
  if ( !query.limit || !isFinite(query.limit) ) query.limit = 100

  url += '/limit/' + query.limit + ',' + query.offset

  // distinct
  if ( query.distinct ) {
    url += '/distinct/true'
  }

  // metadata
  if ( query.metadata ) {
    url += '/metadata/true'
  }

  // emptyresult
  if ( query.emptyresult === 'show' ) {
    url += '/emptyresult/show'
  }

  // format
  if ( contains(query.format, api.formats) ) {
    url += '/format/' + query.format
  }

  return url
}
