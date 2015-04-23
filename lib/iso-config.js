var defaultCfg = {
    _request_: require('./iso-
};

var requestConfigs = {
    
};

var requestBaseUrl = '/_isoreq_/';

module.exports = {
    resetConfigs: function () {
        requestConfigs = {};
    },
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
