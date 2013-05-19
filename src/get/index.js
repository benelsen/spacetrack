(function(){
  'use strict';

  var common = require('../common');

  var util = require('util');

  var buildURL = function (options) {

    if ( !options )
      throw new Error('´options´ undefined');

    if ( !options.type )
      throw new Error('´options.type´ required to be set');

    // Required options (for now)
    options.metadata = true;
    options.emptyresult = 'show';
    options.format = 'json';

    // controller
    if ( !options.controller || ['basicspacedata', 'expandedspacedata'].indexOf(options.controller) === -1 )
      options.controller = 'basicspacedata';

    // action
    if ( !options.action || ['query', 'modeldef'].indexOf(options.action) === -1 )
      options.action = 'query';

    var url = common.baseURL +
              '/' + options.controller +
              '/' + options.action +
              '/class/' + options.type;

    // query
    // must be array of objects [{field:'predicate', condition:'now-7--now'}]
    if ( options.query ) {
      if ( !util.isArray(options.query) )
        options.query = [options.query];

      options.query.forEach(function(q) {
        url += '/' + q.field + '/' + q.condition;
      });
    }

    // predicates
    // must be array ['OBJECT_NAME','ORDINAL']
    if ( options.predicates && options.predicates.length > 0 ) {
      if ( !util.isArray(options.predicates) )
        options.predicates = [options.predicates];
      url += '/predicates/' + options.predicates.join();
    }

    // favorites
    if ( options.favorites && options.favorites.length > 0 ) {
      if ( !util.isArray(options.favorites) )
        options.favorites = [options.favorites];
      url += '/favorites/' + options.favorites.join();
    }

    // orderby
    // must be array ['+OBJECT_NAME','-ORDINAL']
    if ( options.orderby && options.orderby.length > 0 ) {
      if ( !util.isArray(options.orderby) )
        options.orderby = [options.orderby];

      url += '/orderby/' + options.orderby.map(function(o) {
        return o.slice( ~~( o[0] === '+' || o[0] === '-' ) ) +' '+ (o[0] === '-' ? 'desc' : 'asc');
      }).join();

    }

    // limit & offset
    if ( isFinite(options.limit) || isFinite(options.offset) ) {
      if ( !isFinite(options.offset) ) options.offset = 0;
      if ( !isFinite(options.limit) ) options.limit = 100;

      url += '/limit/' + options.limit + ',' + options.offset;
    }

    // distinct
    if ( options.distinct )
      url += '/distinct/true';

    // metadata
    if ( options.metadata )
      url += '/metadata/true';

    // emptyresult
    if ( options.emptyresult === 'show' )
      url += '/emptyresult/show';

    // format
    if ( ['json', 'xml', 'html', 'csv', 'tle', '3le'].indexOf(options.format) > -1 )
      url += '/format/' + options.format;

    return url;

  };

  var get = function (options) {

    var url = buildURL(options);

    return url;

  };

  module.exports = get;

}());
