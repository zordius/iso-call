var isoconfig = require('./iso-config');
var isoreq = require('./iso-request-core');

module.exports = {
    request: function (name, cfg) {
        if (!name) {
            return Promise.reject(new Error('iso-request-client.request without name!'));
        }

        return isoreq(Object.assign({}, {
            method: 'PUT',
            body: JSON.stringify(cfg),
            url: isoconfig.getBaseURL() + name,
            json: (cfg && cfg.json) ? true : false,
            headers: {
                'content-type': 'application/json'
            }
        }));
    }
};