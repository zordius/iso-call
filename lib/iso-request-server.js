var isoexe = require('./iso-execute-server');
module.exports = {
    request: function (name, cfg) {
        if (!name) {
            return Promise.reject(new Error('iso-request-server without name!'));
        }

        /* eslint-disable no-underscore-dangle */
        return isoexe.execute(require('./iso-config')._DEFAULT_ISO_REQUEST_RPC_, {name: name, cfg: cfg});
    }
};
