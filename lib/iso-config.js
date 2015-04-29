var isoreq = require('./iso-request-core');

/* eslint-disable no-underscore-dangle */
var requestConfigs;
var requestBaseUrl;

var _DEFAULT_ISO_REQUEST_RPC_ = '_DEFAULT_ISO_REQUEST_RPC_';
var _DEFAULT_BASEURL_ = '/_isoreq_/';

var defaultCfg = {
    _DEFAULT_ISO_REQUEST_RPC_: function (cfg) {
        var URL = requestConfigs[cfg.name];

        if (!URL) {
            return Promise.reject('call isocall.request() on api: "' + cfg.name + '" without URL!');
        }

        cfg.url = URL;

        return isoreq(cfg);
    }
};

var resetBaseURL = function () {
    requestBaseUrl = _DEFAULT_BASEURL_;
};

var resetConfigs = function (clean) {
    requestConfigs = clean ? {} : Object.assign({}, defaultCfg);
};

resetBaseURL();
resetConfigs();

module.exports = {
    _DEFAULT_ISO_REQUEST_RPC_: _DEFAULT_ISO_REQUEST_RPC_,

    resetConfigs: resetConfigs,
    resetBaseURL: resetBaseURL,

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
