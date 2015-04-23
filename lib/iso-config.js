var isoreq = require('./iso-request-core');

var requestConfigs;
var requestBaseUrl = '/_isoreq_/';
var defaultCfg = {
    '?_request_?': function (name, param) {
        return new Promise(function (resolve, reject) {
            request(param, function (error, response, body) {
                var O = {
                    error: error,
                    response: response,
                    body: body
                };
    
                if (error) {
                    return reject(O);
                }
    
                resolve(O);
            });
        });
    }
};

var resetConfigs = function () {
    requestConfigs = Object.assign({}, defaultCfg);
};

resetConfigs();

module.exports = {
    resetConfigs: resetConfigs,
    addConfigs: function (cfgs) {
        Object.assign(requestConfigs, cfgs);
    },
    getConfigs: function () {
        return requestConfigs;
    },
    setBaseURL: function (url) {
        requestBaseUrl = url;
    },
    getBaseURL: function () {
        return requestBaseUrl;
    }
};
