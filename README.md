[![NPM Version](https://img.shields.io/npm/v/micro-route.svg?style=flat-square)](https://www.npmjs.com/package/micro-route)
[![node](https://img.shields.io/node/v/micro-route.svg?style=flat-square)](https://www.npmjs.com/package/micro-route)
[![Build Status](https://img.shields.io/travis/dotcypress/micro-route.svg?branch=master&style=flat-square)](https://travis-ci.org/dotcypress/micro-route)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

# micro-route
>  🎛 Tiny http routing helper based on [`url-pattern`](https://github.com/snd/url-pattern)

## Installation

Install from NPM:

```js
$ npm install micro-route --save
```

## Examples

```js
const route = require('micro-route')

const corsRoute = route('*', 'OPTIONS')
const fooRoute = route('/', ['POST', 'PUT'])
const barRoute = route('/api/collection/:id', 'DELETE')
const anotherRoute = route('/api/transactions/:id')

module.exports = function (req, res) {
  if (corsRoute(req)) {
    // Send CORS headers 
  } else if (fooRoute(req)) {
    // Do cool stuff
  }
}
```

```js
const match = require('micro-route/match')

module.exports = function (req, res) {
  const { params, query } = match(req, '/api/transactions/:id?ts=12', true)
  console.log('Transaction id:', params.id)  
  console.log('ts:', query.ts)  
}
```

```js
const dispatch = require('micro-route/dispatch')

module.exports = dispatch()
  .dispatch('*', 'OPTIONS', (req, res) => ... )
  .dispatch('/', ['POST', 'PUT'], (req, res) => ... )
  .dispatch('/api/collection/:id', 'DELETE', (req, res) => ... )
  .dispatch('/api/transactions/:id', '*', (req, res, { params, query }) => ... )
  .otherwise((req, res) => ... )
```
