var assert = require('chai').assert;
var sinon = require('sinon');
var isoexe = require('../lib/iso-execute-client');
var isocall = require('../');

var cleanUp = function () {
    isocall.resetConfigs();
};

describe('iso-execute-client', function () {
    beforeEach(cleanUp);
    afterEach(cleanUp);
    
    it('will return rejected Promise when no input name', function (done) {
        isoexe.execute()['catch'](function (E) {
            assert.equal(E.message, 'iso-execute-client without name!');
        }).then(done.bind(), done);
    });
    it.skip('will make PUT request to baseURL', function (done) {
        isoexe.execute('not found')['catch'](function (E) {
        }).then(done.bind(), done);
    });
});
