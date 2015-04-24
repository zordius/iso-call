var assert = require('chai').assert;
var sinon = require('sinon');
var isoexe = require('../lib/iso-execute-server');
var isocall = require('../');

var cleanUp = function () {
    isocall.resetConfigs();
};

var getMiddleware = function () {
    var middleware;
    isoexe.setupMiddleware({
        put: function (path, parser, M) {
            middleware = M;
        }
    });
    return middleware;
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
        it('will return rejected Promise when it is not executable', function (done) {
            isocall.addConfigs({
                test_rpc: 'string_is_not_function'
            });

            isoexe.execute('test_rpc')['catch'](function (E) {
                assert.equal(E.message, 'iso-execute-server can not execute the service: test_rpc');
            }).then(done.bind(), done);
        });
        it('will return resolved Promise when execute correctly', function (done) {
            isocall.addConfigs({
                test_rpc: function () {
                    return 'OK!';
                }
            });

            isoexe.execute('test_rpc').then(function (R) {
                assert.equal(R, 'OK!');
            }).then(done.bind(), done);
        });
        it('will return rejected Promise when execute error', function (done) {
            isocall.addConfigs({
                test_rpc: function () {
                    throw 'internal error';
                }
            });

            isoexe.execute('test_rpc')['catch'](function (E) {
                assert.equal(E, 'internal error');
            }).then(done.bind(), done);
        });
    });

    describe('.setupMiddleware()', function () {
        it('will setup app with correct route url', function () {
            var app = {
                put: sinon.spy()
            };

            isocall.setBaseURL('haha');
            isoexe.setupMiddleware(app);
            assert.equal(app.put.getCall(0).args[0], 'haha:name');
        });
    });

    describe('middleware', function () {
        it('will run execute() with route name and request body', function (done) {
            var req = {
                params: {name: 'test'},
                body: 'OK!'
            };
            var res = {
                send: function () {}
            };

            isocall.addConfigs({
                test: function (body) {
                    assert.equal(body, 'OK!');
                    done();
                }
            });

            getMiddleware()(req, res);
        });
        it('will res.send() execute() result', function (done) {
            var req = {
                params: {name: 'test'}
            };
            var res = {
                send: function (body) {
                    assert.equal(body, 'BODY!');
                    done();
                }
            };

            isocall.addConfigs({
                test: function () {
                    return 'BODY!';
                }
            });

            getMiddleware()(req, res);
        });
        it('will res.status(500) when execute() error', function (done) {
            var req = {
                params: {name: 'test'}
            };
            var res = {
                status: function (code) {
                    assert.equal(code, 500);
                    done();
                    return res;
                },
                send: function () {}
            };

            isocall.addConfigs({
                test: function () {
                    throw {message: 'Error!', stack: 'ignore this: console.warn(E.stack)'};
                }
            });

            getMiddleware()(req, res);
        });
    });
});
