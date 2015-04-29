var isoexe = require('./iso-execute-server');

/* eslint-disable no-underscore-dangle */
var requestConfigs;
var requestBaseUrl;

var _DEFAULT_ISO_REQUEST_RPC_ = '_DEFAULT_ISO_REQUEST_RPC_';
var _DEFAULT_BASEURL_ = '/_isoreq_/';

var defaultCfg = {
    _DEFAULT_ISO_REQUEST_RPC_: function (cfg) {
        return isoexe.execute(cfg.name, cfg.cfg);
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
