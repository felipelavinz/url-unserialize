import unserializer from './index';
import { exportAllDeclaration } from '@babel/types';

test('decode simple string', () => {
	expect( unserializer.toObject( 'foo=bar&lorem=ipsum') ).toEqual( {
		foo: 'bar',
		lorem: 'ipsum'
	} );
});

test('decode complex string', () => {
	expect( unserializer.toObject( 'foo=bar&lorem[ipsum]=dolor' ) ).toEqual({
		foo: 'bar',
		lorem: {
			ipsum: 'dolor'
		}
	});
});

test('decode string with numbers', () => {
	expect( unserializer.toObject( 'foo=bar&lorem[ipsum]=dolor&quick=1') ).toEqual({
		foo: 'bar',
		lorem: {
			ipsum: 'dolor'
		},
		quick: [ 1 ]
	});
});

test('decode string with number array', () => {
	expect( unserializer.toObject( 'foo=1,2') ).toEqual({
		foo: [ 1, 2 ]
	});
});
test('decode string with encoded number array', () => {
	expect( unserializer.toObject( 'quick[brown]=1%2C2') ).toEqual({
		quick : {
			brown: [ 1, 2 ]
		}
	});
})

test('encode simple object', () => {
	expect( unserializer.toString({
		search: 'foo'
	}) ).toEqual('search=foo');
});
test('encode complex object', () => {
	expect( unserializer.toString({
		terms_by_tax: {
			locations: [ 4, 5 ]
		}
	})).toEqual( 'terms_by_tax[locations]=4%2C5' );
});