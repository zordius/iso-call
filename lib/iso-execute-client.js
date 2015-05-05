var isoconfig = require('./iso-config');
var isoreq = require('./iso-request-core');

module.exports = {
    execute: function (name, cfg) {
        if (!arguments[0]) {
            return Promise.reject(new Error('iso-execute-client without name!'));
        }
        return isoreq(Object.assign({}, {
            method: 'PUT',
            body: JSON.stringify(Array.prototype.slice.call(arguments, 1)),
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
