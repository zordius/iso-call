var isoconfig = require('./iso-config');
var isoexe = require('./iso-execute-server');

var request = function (name, cfg) {
    return isoexe.execute('?_request_?', {name: name, cfg: cfg});
};

module.exports = Object.assign({
    request: request
}, isoexe);