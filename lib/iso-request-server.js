var isoexe = require('./iso-execute-server');

module.exports = {
    request: function (name, cfg) {
        return isoexe.execute(require('./iso-config')._DEFAULT_ISO_REQUEST_RPC_, {name: name, cfg: cfg});
    }
};
