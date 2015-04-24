var isoreq = require('./iso-request-server');

var requestConfigs;
var requestBaseUrl = '/_isoreq_/';
var _DEFAULT_ISO_REQUEST_RPC_ = '_DEFAULT_ISO_REQUEST_RPC_';

var defaultCfg = {
    _DEFAULT_ISO_REQUEST_RPC_: isoreq.request
};

var resetConfigs = function (clean) {
    requestConfigs = clean ? {} : Object.assign({}, defaultCfg);
};

resetConfigs();

module.exports = {
    _DEFAULT_ISO_REQUEST_RPC_: _DEFAULT_ISO_REQUEST_RPC_,

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
