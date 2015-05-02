How to try this
===============

1. npm install ../..
2. npm install
3. npm start
4. open http://localhost:3000/ with your browser
5. type `ls` then press TEST button. This is a client side isocall.execute(), you may check with develop tools.
6. open http://localhost:3000/?q=ls. This is a server side isocall.execute().

How it works
------------

* This DEMO does same with <a href="../01-shell">01-shell</a> example, but we using <a href="https://github.com/webpack/webpack">webpack</a> as bundler here.
* <a href="server.js">server.js</a> creates an Express Server, it serves client side bundle file at /js/CMDConsle.js with <a href="https://github.com/webpack/webpack-dev-middleware">webpack-dev-middleware</a>
* check <a href="webpack.config.js">webpack.config.js</a> for required webpack settings.
