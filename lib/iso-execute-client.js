var isoconfig = require('./iso-config');
var isoreq = require('./iso-request-core');

var clientRequest = function (name, cfg) {
    return isoreq(Object.assign({}, {
        method: 'PUT',
        body: JSON.stringify(cfg),
        url: isoconfig.getBaseURL() + name,
        json: (cfg && cfg.json) ? true : false,
        headers: {
            'content-type': 'application/json'
        }
    }));
};

module.exports = {
    _clientReq: clientRequest,

    execute: function (name, cfg) {
        if (!name) {
            return Promise.reject(new Error('iso-execute-client without name!'));
        }

        return _clientReq(name, cfg);
    }
};