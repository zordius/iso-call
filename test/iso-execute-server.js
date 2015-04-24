var assert = require('chai').assert;
var sinon = require('sinon');
var isoexe = require('../lib/iso-execute-server');
var isocall = require('../lib/isocall');

var getMockApp = function () {
    return {
       put: sinon.spy()
    };
};

var cleanUp = function () {
    isocall.resetConfigs();
};

describe('iso-execute-server', function () {
    beforeEach(cleanUp);
    afterEach(cleanUp);
    
    describe('.execute()', function () {
        it('will return rejected Promise when no input name', function (done) {
            isoexe.execute()['catch'](function (E) {
                assert.equal(E.message, 'iso-execute-server.execute without name!');
            }).then(done.bind(), done);
        });
        it('will return rejected Promise when no config found', function (done) {
            isoexe.execute('not found')['catch'](function (E) {
                assert.equal(E.message, 'iso-execute-server.execute but no config for the service: not found');
            }).then(done.bind(), done);
        });
    });

    describe('.setupMiddleware()', function () {
        it('will setup app with correct route url', function () {
            var app = getMockApp();
            isocall.setBaseURL('haha');
            isoexe.setupMiddleware(app);
            assert.equal(app.put.getCall(0).args[0], 'haha:name');
        });
    });
});
