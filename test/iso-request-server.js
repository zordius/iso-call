var assert = require('chai').assert;
var isoreq = require('../lib/iso-request-server');
var isoexe = require('../lib/iso-execute-server');
var sinon = require('sinon');

describe('iso-request-server', function () {
    afterEach(function () {
        if (isoexe.execute.restore) {
            isoexe.execute.restore();
        }
    });

    it('.request() should return rejected promise when NO url provided', function (done) {
        isoreq.request('test').catch(function (E) {
            assert.deepEqual(E.message, 'call isocall.request() on api: "test" without URL!');
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
