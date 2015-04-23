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
Use <a href="https://github.com/substack/node-browserify">browserify</a> to bundle your application and iso-call for browser

Usage
-----



```javascript
// Use babel or any promise lib to provide required Promise
// A. BABEL way: Init ES6 environments for require()
require('babel/register')({
    extensions: ['.jsx']
});

// B. es6-promise way: auto polyfill Promise for all modules
require('es6-promise').polyfill();

isocall = require('iso-call');


```
