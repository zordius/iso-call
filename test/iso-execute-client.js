var assert = require('chai').assert;
var nock = require('nock');
var isoexe = require('../lib/iso-execute-client');
var isocall = require('../');

var baseHOST = 'http://t.e.s.t';
var baseURL = baseHOST + '/test/';

describe('iso-execute-client', function () {
    before(function () {
        isocall.setBaseURL(baseURL);
        nock.disableNetConnect();
    });

    after(function () {
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
    it.skip('will make PUT request to baseURL', function (done) {
        nock(baseHOST).persist().get('/').reply(200, 'OK!');

        isoexe.execute('test').then(function (R) {
             console.log(R);
        }).then(done.bind(), done);
    });
});
