How to try this
===============

1. npm install ../..
2. npm install
3. npm start
4. open http://localhost:3000/ with your browser

How it works
------------

* <a href="server.js">server.js</a> created an Express Server with:
  * using <a href="http://babeljs.io/">babel</a> to enable ES6 features
  * serve client side bundle file at /js/yqlconsle.js with <a href="https://github.com/ForbesLindesay/browserify-middleware">browserify-middleware</a>
  * serve iso-call default proxy at /_isoreq_/ for your RPC or API
  * serve a <a href="page.js">yql console page</a> for any other URL requests.
* <a href="page.js">page.js</a> created an Express middleware:
  * Using <a href="http://babeljs.io/docs/learn-es6/">ES6</a> template string syntax
