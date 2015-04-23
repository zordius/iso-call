var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
var assert = require('chai').assert;

var isocfg = require('../lib/iso-config');

describe('iso-config', function () {
    describe('.addConfigs() should merge config into original one', function () {
        isocfg.resetConfigs();
        isocfg.addConfigs({a: 'b'});
        assert.deepEqual(isocfg.getConfigs(), {a: 'b'});
    });
});
/*
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
*/
