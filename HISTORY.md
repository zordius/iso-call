Release History
===============

0.0.3
-----
https://github.com/zordius/iso-call/releases/tag/v0.0.3

**2015-05-03 Webpack support**

* Add example of webpack
* Now `.setupMiddleware()` will throw when be executed on the same express instance more than once.
* Now `.setBaseURL()` will warn when be executed after `.setupMiddleware()`
* new `.middlewareMounted()` API
* Now the `.request()` result `R.response.body` removed because it is dupe with `R.body` . This makes client side `.request()` save 50% response size.

0.0.2
-----
https://github.com/zordius/iso-call/releases/tag/v0.0.2

**2015-04-30 Context support**

* now the middleware support context (access request by this inside RPC)
* now `isocall.execute()` can response more formats at client side
* Add example of context isocall

0.0.1
-----
https://github.com/zordius/iso-call/releases/tag/v0.0.1

**2015-04-29 Initial Version**

* First Release
