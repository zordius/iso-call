var execute = function () {
    var name = arguments[0];

    var exec = require('./iso-config').getConfigs()[name];

    if (!name) {
        return Promise.reject(new Error('iso-execute-server.execute without name!'));
    }

    if (!exec) {
        return Promise.reject(new Error('iso-execute-server.execute but no config for the service: ' + name));
    }

    if ('function' !== typeof exec) {
        return Promise.reject(new Error('iso-execute-server can not execute the service: ' + name));
    }

    try {
        return Promise.resolve(exec.apply(this, Array.prototype.slice.call(arguments).slice(1)));
    } catch (E) {
        return Promise.reject(E);
    }
};

var middleware = function (req, res) {
    execute.apply(req, [req.params.name].concat(req.body)).then(function (R) {
        res.send({rpc: R});
    })['catch'](function (E) {
        console.warn(E.stack);
        res.status(500).send(('production' !== process.env.NODE_ENV) ?
            {
                error: (E.stack || E),
                service: req.params.name,
                params: req.body
            } : {
                error: 'Internal Server Error',
                service: req.params.name,
                params: req.body
            }
        );
    });
};

var mounted = false;

module.exports = {
    execute: execute,
    middlewareMounted: function () {
        return mounted;
    },
    setupMiddleware: function (app) {
        if (app.enabled('_rpcMounted_')) {
            throw new Error('Can not .setupMiddleware() to an express instance again!');
        }
        mounted = true;
        app.enable('_rpcMounted_');
        app.put(require('./iso-config').getBaseURL() + ':name', require('body-parser').json({strict: false}), middleware);
    }
};

