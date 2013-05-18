(function(){
  'use strict';

  var base = require('../common');

  var util = require('util');

  var get = function (options) {

    if ( !options )
      throw new Error('#get requires ´options´ to be defined');

    if ( !options.type )
      throw new Error('#get requires ´options.type´ to be set');

    // Required options (for now)
    options.metadata = true;
    options.emptyresult = 'show';
    options.format = 'json';

    if ( !options.controller || ['basicspacedata', 'expandedspacedata'].indexOf(options.controller) === -1 )
      options.controller = 'basicspacedata';

    if ( !options.action || ['query', 'modeldef'].indexOf(options.action) === -1 )
      options.action = 'query';

    var url = base.baseURL +
              '/' + options.controller +
              '/' + options.action +
              '/class/' + options.type;

    if ( options.query ) {
      if ( !util.isOb (options.query) )
        options.query = [options.query];

      options.query.forEach(function(q) {
        url += '/' + q.field + '/' + q.condition;
      });
    }

    // must be array ['OBJECT_NAME','ORDINAL']
    if ( options.predicates ) {
      if ( !util.isArray(options.predicates) )
        options.predicates = [options.predicates];
      url += '/predicates/' + options.predicates.join();
    }

    if ( options.favorites ) {
      if ( !util.isArray(options.favorites) )
        options.favorites = [options.favorites];
      url += '/favorites/' + options.favorites.join();
    }

    // must be array ['+OBJECT_NAME','-ORDINAL']
    if ( options.orderby ) {
      if ( !util.isArray(options.orderby) )
        options.orderby = [options.orderby];

      url += '/orderby/' + options.orderby.map(function(o) {
        return o.slice( ~~( o[0] === '+' || o[0] === '-' ) ) +' '+ (o[0] === '-' ? 'desc' : 'asc');
      }).join();

    }

    if ( isFinite(options.limit) || isFinite(options.offset) ) {
      if ( !isFinite(options.offset) ) options.offset = 0;
      if ( !isFinite(options.limit) ) options.limit = 100;

      url += '/limit/' + options.limit + ',' + options.offset;
    }

    if ( options.distinct )
      url += '/distinct/true';

    if ( options.metadata )
      url += '/metadata/true';

    if ( options.emptyresult === 'show' )
      url += '/emptyresult/show';

    if ( ['json', 'xml', 'html', 'csv', 'tle', '3le'].indexOf(options.format) > -1 )
      url += '/format/' + options.format;

    return url;

  };

  module.exports = get;

}());
