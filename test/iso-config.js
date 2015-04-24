var assert = require('chai').assert;
var isocfg = require('../lib/iso-config');

describe('iso-config', function () {
    describe('.addConfigs()', function () {
        it('should merge config into original one', function () {
            isocfg.resetConfigs(true);
            isocfg.addConfigs({a: 'b'});
            assert.deepEqual(isocfg.getConfigs(), {a: 'b'});
        });

        it('should merge config into previous one', function () {
            isocfg.resetConfigs(true);
            isocfg.addConfigs({a: 'b'});
            isocfg.addConfigs({a: 'c'});
            isocfg.addConfigs({b: 'd'});
            assert.deepEqual(isocfg.getConfigs(), {a: 'c', b: 'd'});
        });
    });

    describe('.resetConfigs()', function () {
        it('should clean configs when input true', function () {
            isocfg.resetConfigs(true);
            assert.deepEqual(isocfg.getConfigs(), {});
            isocfg.addConfigs({b: 'd'});
            assert.deepEqual(isocfg.getConfigs(), {b: 'd'});
            isocfg.resetConfigs(true);
            assert.deepEqual(isocfg.getConfigs(), {});
        });

        it('should keep default iso-request RPC config when no input', function () {
            isocfg.resetConfigs(true);
            assert.deepEqual(isocfg.getConfigs(), {});
            isocfg.resetConfigs();
            console.log(isocfg);
            assert.equal(typeof isocfg.getConfigs()[isocfg._DEFAULT_ISO_REQUEST_RPC_], 'function');
        });
    });

    it('.getBaseURL() should return baseURL', function () {
        assert.deepEqual(isocfg.getBaseURL(), '/_isoreq_/');
    });

    it('.setBaseURL() should return baseURL', function () {
        isocfg.setBaseURL('/_lalala_/');
        assert.deepEqual(isocfg.getBaseURL(), '/_lalala_/');
    });
});
