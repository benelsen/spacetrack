import {api, baseURL} from './common'

export default function buildURL (options) {

  if ( !options ) {
    throw new Error('´options´ undefined')
  }

  if ( !options.type ) {
    throw new Error('´options.type´ required to be set')
  }

  // Required options (for now)
  options.metadata = true
  options.emptyresult = 'show'
  options.format = 'json'

  // controller
  if ( !options.controller || api.controller.indexOf(options.controller) === -1 ) {
    options.controller = 'basicspacedata'
  }

  // action
  if ( !options.action || api.actions.indexOf(options.action) === -1 ) {
    options.action = 'query'
  }

  if ( api.types.indexOf(options.type) === -1 ) {
    throw new Error('request type not supported')
  }

  let url = `${baseURL}/${options.controller}/${options.action}/class/${options.type}`

  // query
  // must be array of objects [{field:'predicate', condition:'now-7--now'}]
  if ( options.query ) {

    url = Object.keys(options.query).reduce( (url, key) => {

      if ( api.fields[options.type].indexOf(key) > -1 ) {
        return `${url}/${ key }/${ options.query[key].toString() }`
      }

      return url

    }, url)

  }

  // predicates
  // must be array ['OBJECT_NAME','ORDINAL']
  if ( options.predicates && options.predicates.length > 0 ) {

    if ( !Array.isArray(options.predicates) ) {
      options.predicates = [options.predicates]
    }

    options.predicates = options.predicates.filter(function(p) {

      var isValid = api.fields[options.type].indexOf(p) > -1
      if ( !isValid ) {
        throw new Error(p + ' is not a valid predicate for ' + options.type)
      }

      return isValid
    })

    url += '/predicates/' + options.predicates.join()
  }

  // favorites
  if ( options.favorites && options.favorites.length > 0 ) {

    if ( !Array.isArray(options.favorites) ) {
      options.favorites = [options.favorites]
    }

    url += '/favorites/' + options.favorites.join()
  }

  // orderby
  // must be array ['+OBJECT_NAME','-ORDINAL']
  if ( options.orderby && options.orderby.length > 0 ) {

    if ( !Array.isArray(options.orderby) ) {
      options.orderby = [options.orderby]
    }

    options.orderby = options.orderby.filter(function(p) {

      var predicate = p.slice( ~~( p[0] === '+' || p[0] === '-' ) )

      var isValid = api.fields[options.type].indexOf(predicate) > -1
      if ( !isValid ) {
        throw new Error(predicate + ' is not a valid predicate for ' + options.type)
      }

      return isValid
    })

    url += '/orderby/' + options.orderby.map(function(o) {
      return o.slice( ~~( o[0] === '+' || o[0] === '-' ) ) +'%20'+ (o[0] === '-' ? 'desc' : 'asc')
    }).join()

  }

  // limit & offset
  if ( isFinite(options.limit) || isFinite(options.offset) ) {

    if ( !isFinite(options.offset) ) options.offset = 0
    if ( !isFinite(options.limit) ) options.limit = 100

    url += '/limit/' + options.limit + ',' + options.offset
  }

  // distinct
  if ( options.distinct ) {
    url += '/distinct/true'
  }

  // metadata
  if ( options.metadata ) {
    url += '/metadata/true'
  }

  // emptyresult
  if ( options.emptyresult === 'show' ) {
    url += '/emptyresult/show'
  }

  // format
  if ( api.formats.indexOf(options.format) > -1 ) {
    url += '/format/' + options.format
  }

  return url
}
