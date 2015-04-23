iso-call
========

Isomorphic api call as <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a> for any nodejs/express application.

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

You should enable Promise before using `iso-call` in your application for both server and client.

```javascript
// Use babel or any promise lib to provide required Promise
// A. BABEL way: Init ES6 environments for require()
require('babel/register')({
    extensions: ['.jsx']
});

// B. es6-promise way: auto polyfill Promise for all modules
require('es6-promise').polyfill();
```

**2. Setup your API**

You should setup all your API {name: endpoint} list for server.

```javascript
isocall = require('iso-call');

// Setup your API lists
isocall.addConfigs({
    yql: 'http://https://query.yahooapis.com/v1/public/yql',
    graph: 'https://graph.facebook.com/v2.3/641060562'
});
```

**3. Setup middleware**

You should setup middleware for express at server side to wrap client side `iso-call`.

```javascript
var express = require('express');
var app = express();

isocall.setupMiddleware(app);
```

**4. Request!**

Now you can make isomorphic http request!

```javascript
// Works on both client and server side!
isocall.request('apiName', requestParams).then(function (R) {
    // Success, R = {error: ... , response: ... , body: ...}
}).catch(function (R) {
    // Failed , R = {error: ... , response: ... , body: ...}
});
```
