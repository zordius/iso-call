iso-call
========

Isomorphic call API or RPC as <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a> for any nodejs/express application.

[![npm version](https://img.shields.io/npm/v/iso-call.svg)](https://www.npmjs.org/package/iso-call) [![Build Status](https://travis-ci.org/zordius/iso-call.svg?branch=master)](https://travis-ci.org/zordius/iso-call) [![Test Coverage](https://codeclimate.com/github/zordius/iso-call/badges/coverage.svg)](https://codeclimate.com/github/zordius/iso-call) [![Code Climate](https://codeclimate.com/github/zordius/iso-call/badges/gpa.svg)](https://codeclimate.com/github/zordius/iso-call) [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.txt)

Installation
------------

**Server**
```sh
npm install iso-call
```

**Client**

Use <a href="https://github.com/substack/node-browserify">browserify</a> + <a href="https://github.com/benbria/aliasify">aliasify</a> to bundle your application and iso-call for browser:

```sh
npm install browserify aliasify --save-dev
```

Add these into your `package.json` to enable aliasify:

```json
  "browserify": {
    "transform": ["aliasify"]
  }
```

Usage
-----

**1. Enable Required ES Features**

You should enable Promise and Object.assign() before using `iso-call` in your application for both server and client.

*A. BABEL way: when you write ES6 scripts*

```javascript
// For server side (in your main server script)
// Init ES6 environments for require()
require('babel/register')();

// For client side (in your main client script)
// use iso-call polyfill wrapper. require babelify
require('iso-call/polyfill');
```

*B. Polyfill way: for most case*

```javascript
// For both server side and client side
// require object.assign and es6-promise
require('object.assign').shim();
require('es6-promise').polyfill();
```

You may also enable polyfill for client side by including any polyfill web service in your HTML before loading bundled JavaScript file:

```javascript
<script src="https://cdn.polyfill.io/v1/polyfill.min.js"></script>
<script src="bundle.js"></script>
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

How it works?
-------------

**iso.execute() at Server side**
* iso.execute() -> getRPCFuncByName -> execute -> return Promise

**iso.execute() at Client side**
* iso.execute() -> call wraped URL -> middleware -> getRPCFuncByName -> execute -> respone json -> receive result -> return Promise

**iso.request() at both Server and Client side**
* iso.request() -> iso.execute(preDefinedRPCName, wrapedOpt)

Use Case: isomorphic RPC
------------------------

Check our <a href="examples/01-shell">shell example</a> to know more about isocall.execute().

With isocall.execute() a RPC you can:

* Trigger server side only process with RPC then get the result from server or client side.
* Place specific logic inside RPC to hide it from users.
* Call API inside RPC to hide API endpoint from users.
* Do input validation at server side to ensure security.
* Reduce client side JavaScript size because RPC codes will not be bundled.

Use Case: isomorphic http request
---------------------------------

Check our <a href="examples/02-yql">YQL example</a> to know more about isocall.request().

With isocall.request() an API you can:

* Trigger an API by name from both server side and client.
* Using consist options from <a href="https://github.com/request/request">request</a>.
* Do not need to worry about cross domain request issue.

Use Case: deal with request by context
--------------------------------------

Checkout our <a href="examples/03-context">Context example</a> to know more about context based RPC which can access request by `this`.

With contexted isocall you can:

* Access <a href="http://expressjs.com/4x/api.html#req">express request<a/> by `this` inside the RPC.
* Do request based logic inside a RPC.
* Get required cookie or headers from the request then pass to an API.
