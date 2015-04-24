iso-call
========

Isomorphic call API or RPC as <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a> for any nodejs/express application.

[![Build Status](https://travis-ci.org/zordius/iso-call.svg?branch=master)](https://travis-ci.org/zordius/iso-call) [![Test Coverage](https://codeclimate.com/github/zordius/iso-call/badges/coverage.svg)](https://codeclimate.com/github/zordius/iso-call) [![Code Climate](https://codeclimate.com/github/zordius/iso-call/badges/gpa.svg)](https://codeclimate.com/github/zordius/iso-call) [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.txt)

Installation
------------

**Server**
```sh
npm install iso-call
```

**Client**

Use <a href="https://github.com/substack/node-browserify">browserify</a> to bundle your application and iso-call for browser. You may also use <a href="https://github.com/benbria/aliasify">aliasify</a> to do more tricks:
* hide api end points from users
* handle server side only logic
* handle client side only logic
* reduce bundle size

(TODO: add examples for these use case)

Usage
-----

**1. Enable Promise**

You should enable Promise and Object.assign() before using `iso-call` in your application for both server and client.

```javascript
// A. BABEL way: Init ES6 environments for require()
require('babel/register')({
    extensions: ['.jsx']
});

// B. polyfill way: auto polyfill Promise and Object.assign()
require('object.assign').shim();
require('es6-promise').polyfill();
```

**2. Setup your API**

You should setup all your API or RPC list only for server.

```javascript
isocall = require('iso-call');

// Setup your API or RPC
isocall.addConfigs({
    // API as {name: endpoint} list
    yql: 'http://https://query.yahooapis.com/v1/public/yql',
    graph: 'https://graph.facebook.com/v2.3/641060562',

    // RPC as {name: function} list
    connectdb: function (params) {
        return mysqlPromise(params.host, params.port);
    }
});
```

**3. Setup middleware**

You should setup middleware for express only at server side to wrap client side `iso-call`.

```javascript
var express = require('express');
var app = express();

isocall.setupMiddleware(app);
```

**4. Call API or RPC!**

Now you can do isomprphic RPC!!

```javascript
// Works on both client and server side!
isocall.execute('rpcName', rpcParams).then(function (R) {
    // Success, R = result
}).catch(function (E) {
    // Failed , E = error
});
```

Or make isomorphic http request!!

```javascript
// Works on both client and server side!
isocall.request('apiName', requestParams).then(function (R) {
    // Success, R = {error: ... , response: ... , body: ...}
}).catch(function (R) {
    // Failed , R = {error: ... , response: ... , body: ...}
});
```
