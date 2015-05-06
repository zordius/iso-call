var isoconfig = require('./iso-config');
var isoreq = require('./iso-request-core');

module.exports = {
    execute: function () {
        var name = arguments[0];
        if (!name) {
            return Promise.reject(new Error('iso-execute-client without name!'));
        }
        return isoreq(Object.assign({}, {
            method: 'PUT',
            body: Array.prototype.slice.call(arguments).slice(1),
            url: isoconfig.getBaseURL() + name,
            headers: {
                'content-type': 'application/json'
            },
            json: true
        })).then(function (R) {
            return R.body.rpc;
        });
    }
};
