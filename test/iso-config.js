var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
var assert = require('chai').assert;

var isocfg = require('../lib/iso-config');

describe('iso-config', function () {
    describe('.addConfigs()', function () {
        it('should merge config into original one', function () {
            isocfg.resetConfigs();
            isocfg.addConfigs({a: 'b'});
            assert.deepEqual(isocfg.getConfigs(), {a: 'b'});
        });

        it('should merge config into previous one', function () {
            isocfg.resetConfigs();
            isocfg.addConfigs({a: 'b'});
            isocfg.addConfigs({a: 'c'});
            isocfg.addConfigs({b: 'd'});
            assert.deepEqual(isocfg.getConfigs(), {a: 'c', b: 'd'});
        });
    });

    it('.resetConfigs() should clean configs', function () {
        isocfg.resetConfigs();
        assert.deepEqual(isocfg.getConfigs(), {});
        isocfg.addConfigs({b: 'd'});
        assert.deepEqual(isocfg.getConfigs(), {b: 'd'});
        isocfg.resetConfigs();
        assert.deepEqual(isocfg.getConfigs(), {});
    });

    it('.getBaseURL() should return baseURL', function () {
        assert.deepEqual(isocfg.getBaseURL(), '/_isoreq_/');
    });

    it('.setBaseURL() should return baseURL', function () {
        isocfg.setBaseURL('/_lalala_/');
        assert.deepEqual(isocfg.getBaseURL(), '/_lalala_/');
    });
});
