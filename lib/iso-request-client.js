var isoexe = require('./iso-execute-client');

module.exports = {
    request: function (name, cfg) {
        if (!name) {
            return Promise.reject(new Error('iso-request-client without name!'));
        }

        return isoexe._clientReq('?_request_?', {name: name, cfg: cfg});
    }
};