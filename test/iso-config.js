var assert = require('chai').assert;
var isocfg = require('../lib/iso-config');
var sinon = require('sinon');
var isoexe = require('../lib/iso-execute-server');

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
            /* eslint-disable no-underscore-dangle */
            assert.equal(typeof isocfg.getConfigs()[isocfg._DEFAULT_ISO_REQUEST_RPC_], 'function');
            /* eslint-enable no-underscore-dangle */
        });
    });

    it('.getBaseURL() should return baseURL', function () {
        assert.deepEqual(isocfg.getBaseURL(), '/_isoreq_/');
    });

    it('.setBaseURL() should set baseURL correctly', function () {
        isocfg.setBaseURL('/_lalala_/');
        assert.deepEqual(isocfg.getBaseURL(), '/_lalala_/');
    });

    it('.setBaseURL() should warn when after .setupMiddleware', function () {
        sinon.spy(console, 'warn');
        sinon.stub(isoexe, 'middlewareMounted').returns(true);

        isocfg.setBaseURL();
        assert(console.warn.getCall(0).args[0], '.setBaseURL() after .setupMiddleware() , this may cause client side call to wrong endpoint.');
        console.warn.restore();
        isoexe.middlewareMounted.restore();
    });
});
