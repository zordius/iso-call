// Init ES6 environments for .require()
require('babel/register')();

var express = require('express'),
    isocall = require('iso-call'),
    browserify = require('browserify-middleware'),
    csrf = require('csurf'),
    cookieParser = require('cookie-parser');

var app = express(),
    csrfOptions = {
        cookie: {key: '_secret'},
        value: function (req) {
            return req.body[0].csrfToken || '';
        }
    };

// Setup rpc
require('./rpclist');


// Serve the bundled app
// aliasify is required transform to ensure iso-call work properly
// Add these in your package.json:
/*
  "browserify": {
    "transform": [
      "aliasify"
    ]
  }
*/
app.use('/js/REQConsole.js', browserify('./app.js', {
    standalone: 'REQConsole'
}));

app.use(cookieParser());
app.use(require('body-parser').json({strict: false}));
app.use(csrf(csrfOptions));

// csrf error handler
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') {
        return next(err);
    }

    // handle CSRF token errors here
    res.status(403);
    res.send({rpc: '403 forbidden for no csrf token!'});

});

// Mount iso-call middleware to the express
isocall.setupMiddleware(app);

// Serve the page
app.use(require('./page'));

app.listen(3000);
console.log('Express server started at port 3000');
