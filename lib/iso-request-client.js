var isoconfig = require('./iso-config');
var isoexe = require('./iso-execute-client');

module.exports = {
    request: function (name, cfg) {
        if (!name) {
            return Promise.reject(new Error('iso-execute-request without name!'));
        }

        return isoexe._clientReq(name, cfg);
    }
};