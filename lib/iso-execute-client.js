var isoconfig = require('./iso-config');
var isoreq = require('./iso-request-core');

module.exports = {
    execute: function (name, cfg) {
        if (!name) {
            return Promise.reject(new Error('iso-execute-client without name!'));
        }
        return isoreq(Object.assign({}, {
            method: 'PUT',
            body: JSON.stringify(cfg),
            url: isoconfig.getBaseURL() + name,
            json: true,
            headers: {
                'content-type': 'application/json'
            }
        })).then(function (R) {
            return R.body;
        });
    }
};
