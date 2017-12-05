var assert = require('chai').assert;
var nock = require('nock');
var isoexe = require('../lib/iso-execute-client');
var isocall = require('../');

var baseHOST = 'http://t.e.s.t';
var baseURL = baseHOST + '/';

describe('iso-execute-client', function () {
    beforeAll(function () {
        isocall.setBaseURL(baseURL);
        nock.disableNetConnect();
    });

    afterAll(function () {
        isocall.resetBaseURL();
        nock.enableNetConnect();
    });

    afterEach(function () {
        nock.cleanAll();
    });

    it('will return rejected Promise when no input name', function (done) {
        isoexe.execute()['catch'](function (E) {
            assert.equal(E.message, 'iso-execute-client without name!');
        }).then(done.bind(), done);
    });

    it('will make PUT request to baseURL', function (done) {
        nock(baseHOST).persist().put('/test').reply(200, {rpc: {msg: 'OK!'}});

        isoexe.execute('test').then(function (R) {
            assert.deepEqual(R, {msg: 'OK!'});
        }).then(done.bind(), done);
    });

    it('will put arguments into request body', function (done) {
        var body = null;
        nock(baseHOST).persist()
            .filteringRequestBody(function (B) {
                body = B;
                return true;
            })
            .put('/test')
            .reply(200, {rpc: {msg: 'OK!'}});

        isoexe.execute('test', 123, 456, 'abc').then(function () {
            assert.deepEqual(body, '[123,456,"abc"]');
        }).then(done.bind(), done);
    });
});
