How to try this
===============

1. npm install ../..
2. npm install
3. npm start
4. open http://localhost:3000/ with your browser
5. type `header` then press TEST button. This is a client side isocall.execute(), you may check with develop tools.
6. open http://localhost:3000/?q=header. This is a server side isocall.execute().

How it works
------------

* <a href="server.js">server.js</a> creates an Express Server:
  * using <a href="http://babeljs.io/">babel</a> to enable ES6 features
  * serve client side bundle file at /js/REQConsle.js with <a href="https://github.com/ForbesLindesay/browserify-middleware">browserify-middleware</a>
  * serve iso-call default proxy at /_isoreq_/ for your RPC or API
  * serve a <a href="page.js">REQUEST console page</a> for any other URL requests.
* <a href="page.js">page.js</a> creates an Express middleware:
  * using <a href="http://babeljs.io/docs/learn-es6/">ES6</a> template string syntax
  * using <a href="app.js">app.js</a> to create an app instance to keep the request context, then .get() REQUEST console HTML then render whole page
* <a href="app.js">app.js</a> exports an application contructor with these API:
  * `execute()`: context based execute which can access request by `this`
  * `get(cmd)`: return a promise of command result inside console HTML
  * `getInner(cmd)`: return a promise of command result inside console innerHTML
  * `renderInto(form)`: use `this.execute()` to get command result and render the form
* <a href="rpclist.js">rpclist.js</a> defined all RPC:
  * It is not `require()` by app.js, so the content will not be bundled to client side.
  * `header` command is provided by request.headers
