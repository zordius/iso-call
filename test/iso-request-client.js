var assert = require('chai').assert;
var isoreq = require('../lib/iso-request-client');
var isoexe = require('../lib/iso-execute-client');
var sinon = require('sinon');

describe('iso-request-client', function () {
    afterEach(function () {
        if (isoexe.execute.restore) {
            isoexe.execute.restore();
        }
    });

    it('should return rejected Promise when no input name', function (done) {
        isoreq.request()['catch'](function (E) {
            assert.equal(E.message, 'iso-request-client without name!');
        }).then(done.bind(), done);
    });

    it('should isoexe.execute() with default request RPC name', function (done) {
        sinon.stub(isoexe, 'execute').returns(Promise.resolve());

        isoreq.request('test').then(function () {
            assert.deepEqual(isoexe.execute.getCall(0).args, [
                '_DEFAULT_ISO_REQUEST_RPC_',
                {name: 'test', cfg: undefined}
            ]);
        }).then(done.bind(), done);
    });
});
