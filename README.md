[![NPM Version](https://img.shields.io/npm/v/micro-route.svg?style=flat-square)](https://www.npmjs.com/package/micro-route)
[![node](https://img.shields.io/node/v/micro-route.svg?style=flat-square)](https://www.npmjs.com/package/micro-route)
[![Build Status](https://img.shields.io/travis/dotcypress/micro-route.svg?branch=master&style=flat-square)](https://travis-ci.org/dotcypress/micro-route)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

# micro-route
>  🎛 Tiny http routing helper

## Installation

Install from NPM:

```js
$ npm install micro-route --save
```

## Examples

```js
const match = require('micro-route/match')

module.exports = function (req, res) {
  const { id } = match(req, '/api/transactions/:id')
  console.log('Transaction id:', id)  
}
```

```js
const MicroRoute = require('micro-route')

const corsRoute = new MicroRoute('OPTIONS')
const fooRoute = new MicroRoute(['POST', 'PUT'], '/')
const barRoute = new MicroRoute('DELETE', '/api/collection/:id')
const anotherRoute = new MicroRoute('*', 'api/transactions/:id')

module.exports = function (req, res) {
  if (corsRoute.match(req)) {
    // Send CORS headers 
  } else if (fooRoute.match(req)) {
    // Do cool stuff
  } else if (barRoute.match(req)) {
    // Do another cool stuff
  } else if (anotherRoute.match(req)) {
    // Same here
  } 
}
```
