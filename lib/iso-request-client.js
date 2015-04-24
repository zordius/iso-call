var isoexe = require('./iso-execute-client');
var isocfg = require('./iso-config');

module.exports = {
    request: function (name, cfg) {
        if (!name) {
            return Promise.reject(new Error('iso-request-client without name!'));
        }

        return isoexe.execute(isocfg._DEFAULT_ISO_REQUEST_RPC_, {name: name, cfg: cfg});
    }
};
