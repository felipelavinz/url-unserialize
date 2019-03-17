'use strict';

var _ = require('underscore');

var unserializer = {
	toObject: function( string ) {
		if ( _.isEmpty( string ) ) {
			return {};
		}
		var parts  = string.split('&');
		var output = {};
		var decodeValue = function( value ) {
			var decodedValue;
			value = decodeURIComponent( value );
			if ( value.indexOf(',') !== -1 && value.match(/,?[0-9]+/) ) {
				decodedValue = [];
				_.each( value.split(','), function( item ){
					if ( item.match(/[0-9]+$/) ) {
						decodedValue.push( parseInt( item, 10 ) );
					} else {
						decodedValue.push( item );
					}
				} );
			} else if ( value.match(/[0-9]+/) ) {
				decodedValue = [ parseInt( value, 10 ) ];
			} else {
				decodedValue = decodeURIComponent( value ).replace(/\+/g, ' ');
			}
			return decodedValue;
		}
		_.each( parts, function( item, key ){
			var pair  = item.split('=');
			var key   = pair[ 0 ];
			if ( _.isEmpty( pair[ 1 ] ) ) {
				return;
			}
			var keyIsObject = key.match(/(.+)\[(.+)\]/);
			if ( keyIsObject ) {
				if ( typeof output[ keyIsObject[ 1 ] ] === 'undefined' ) {
					output[ keyIsObject[ 1 ] ] = {};
				}
				output[ keyIsObject[ 1 ] ][ keyIsObject[ 2 ] ] = decodeValue( pair[ 1 ] );
			} else {
				output[ key ] = decodeValue( pair[ 1 ] );
			}
		});
		return output;
	},
	toString: function( object ){
		var out = [];
		for ( var i in object ) {
			var notEmptyString = _.isString( object[i] ) && object[i] !== '';
			var notEmptyNumber = _.isNumber( object[i] ) && object[i] !== 0;
			var notEmptyObject = ! _.isEmpty( object[i] );
			if ( i && ( notEmptyString || notEmptyNumber || notEmptyObject ) ) {
				if ( _.isObject( object[i] ) ) {
					for ( var prop in object[i] ) {
						var _notEmptyString = _.isString( object[i][ prop ] ) && object[i][ prop ] !== '';
						var _notEmptyNumber = _.isNumber( object[i][ prop ] ) && object[i][ prop ] !== 0;
						var _notEmptyObject = ! _.isEmpty( object[i][ prop ] );
						if ( _notEmptyString || _notEmptyNumber || _notEmptyObject ) {
							out.push( i +'['+ prop +']='+ encodeURIComponent( object[i][prop] ) );
						}
					}
				} else {
					out.push( i +'='+ encodeURIComponent( object[i] ) );
				}
			}
		}
		return out.join('&');
	}
};

export default unserializer;