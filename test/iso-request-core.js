var assert = require('chai').assert;
var sinon = require('sinon');
var isoreq = require('../lib/iso-request-core');
var request = require('request');

describe('iso-request-core', function () {
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
});
