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
