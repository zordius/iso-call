var assert = require('chai').assert;
var isoreq = require('../lib/iso-request-core');
var nock = require('nock');

describe('iso-request-core', function () {
    before(function () {
        nock.disableNetConnect();
    });

    after(function () {
        nock.enableNetConnect();
    });

    afterEach(function () {
        nock.cleanAll();
    });

    it('should return rejected Promise when no input', function (done) {
        isoreq()['catch'](function (E) {
            assert.equal(E.message, 'iso-request-core without input!');
        }).then(done.bind(), done);
    });

    it('should return rejected Promise when no input.url', function (done) {
        isoreq({})['catch'](function (E) {
            assert.equal(E.message, 'iso-request-core without url, input:{}');
        }).then(done.bind(), done);
    });

    it('should call request with url', function (done) {
        nock('http://abc').persist().get('/').reply(200, 'OK!');

        isoreq({url: 'http://abc/'}).then(function (R) {
            assert.equal(R.body, 'OK!');
        }).then(done.bind(), done);
    });

    it('should not do JSON parse when no json: true option', function (done) {
        nock('http://abc').persist().get('/').reply(200, {foo: 'bar!'});

        isoreq({url: 'http://abc/'}).then(function (R) {
            assert.equal(R.body, '{"foo":"bar!"}');
        }).then(done.bind(), done);
    });

    it('should do JSON parse when json: true', function (done) {
        nock('http://abc').persist().get('/').reply(200, {foo: 'bar!'});

        isoreq({url: 'http://abc/', json: true}).then(function (R) {
            assert.deepEqual(R.body, {foo: 'bar!'});
        }).then(done.bind(), done);
    });
});
