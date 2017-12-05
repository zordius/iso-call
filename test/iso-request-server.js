var assert = require('chai').assert;
var isoreq = require('../lib/iso-request-server');
var isoexe = require('../lib/iso-execute-server');
var isocfg = require('../lib/iso-config');
var sinon = require('sinon');
var nock = require('nock');

describe('iso-request-server', function () {
    beforeAll(function () {
        nock.disableNetConnect();
    });

    afterAll(function () {
        nock.enableNetConnect();
    });

    afterEach(function () {
        nock.cleanAll();
        if (isoexe.execute.restore) {
            isoexe.execute.restore();
        }
    });

    it('.request() should return rejected promise when NO name provided', function (done) {
        isoreq.request().catch(function (E) {
            assert.deepEqual(E.message, 'iso-request-server without name!');
        }).then(done.bind(), done);
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

    it('should isoreq() then receive result', function (done) {
        nock('http://abc').persist().get('/?a=b').reply(200, 'OK!');
        isocfg.addConfigs({test: 'http://abc/'});

        isoreq.request('test', {qs: {a: 'b'}}).then(function (R) {
            assert.equal(R.body, 'OK!');
        }).then(done.bind(), done);
    });
});
