var isoconfig = require('./iso-config');
var isoexe = require('./iso-execute-server');

var request = function (name, cfg) {
    return isoexe.execute(isoconfig._DEFAULT_ISO_REQUEST_RPC_, {name: name, cfg: cfg});
};

module.exports = Object.assign({
    request: request
}, isoexe);