# URL Unserializer

Convert an object to query string or vice versa.

Strongly opinionated, and probably very custom for a wide use.

Modularized mostly for testing purposes.

## Examples

A simple query string it's converted to an object.

Input: 

`foo=bar&lorem=ipsum`

Output: 

``` json
{
	foo: 'bar',
	lorem: 'ipsum'
}
```

Multi-dimensional array or objects

Input:

`foo=bar&lorem[ipsum]=dolor`

Output:

```json
{
	foo: 'bar',
	lorem: {
		ipsum: 'dolor'
	}
}
```

Numbers are always converted to arrays

Input:

`foo=1,2&lorem[ipsum]=dolor&quick=1`

Output:

```json
{
	foo: [ 1, 2 ],
	lorem: {
		ipsum: 'dolor'
	},
	quick: [ 1 ]
}
```
