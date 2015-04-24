var assert = require('chai').assert;
var isoexe = require('../lib/iso-execute-server');
var isocall = require('../lib/isocall');

describe('iso-execute-server', function () {
    beforeEach(isocall.resetConfig);
    afterEach(isocall.resetConfig);
    
    describe('.execute()', function () {
    });
    describe('.setupMiddleware()', function () {
        it('will setup app with default route', function () {
        });
    });
});