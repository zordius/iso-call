var isoconfig = require('./iso-config');
var isoreq = require('./iso-request-core');

module.exports = {
    middleware: function (req, res, next) {
    },
    request: function (name, cfg) {
        var url = isoconfig.getConfigs()[name];

        if (!name) {
            return Promise.reject(new Error('iso-request-server.request without name!'));
        }

        if (!url) {
            return Promise.reject(new Error('iso-request-server.request but not url for service: ' + name));
        }

        return isoreq(Object.assign({url: url}, cfg));
    }
};