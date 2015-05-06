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
        },
        enable: function () {
        },
        enabled: function () {
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
                testRpc: 'string_is_not_function'
            });

            isoexe.execute('testRpc')['catch'](function (E) {
                assert.equal(E.message, 'iso-execute-server can not execute the service: testRpc');
            }).then(done.bind(), done);
        });
        it('will return resolved Promise when execute correctly', function (done) {
            isocall.addConfigs({
                testRpc: function () {
                    return 'OK!';
                }
            });

            isoexe.execute('testRpc').then(function (R) {
                assert.equal(R, 'OK!');
            }).then(done.bind(), done);
        });
        it('will pass arguments into RPC', function (done) {
            isocall.addConfigs({
                testRpc: function (a, b, c) {
                    return [c, b, a].join(',');
                }
            });

            isoexe.execute('testRpc', 1, 2, 3).then(function (R) {
                assert.equal(R, '3,2,1');
            }).then(done.bind(), done);
        });
        it('will return rejected Promise when execute error', function (done) {
            isocall.addConfigs({
                testRpc: function () {
                    throw 'internal error';
                }
            });

            isoexe.execute('testRpc')['catch'](function (E) {
                assert.equal(E, 'internal error');
            }).then(done.bind(), done);
        });
    });

    describe('.setupMiddleware()', function () {
        it('will setup app with correct route url', function () {
            var app = {
                put: sinon.spy(),
                enable: sinon.spy(),
                enabled: sinon.spy()
            };

            isocall.setBaseURL('haha');
            isoexe.setupMiddleware(app);
            assert.equal(app.put.getCall(0).args[0], 'haha:name');
        });

        it('will throw when already mounted', function () {
            var app = {
                put: sinon.spy(),
                enable: sinon.spy(),
                enabled: sinon.stub().returns(true)
            };

            assert.throws(function () {
                isoexe.setupMiddleware(app);
            }, 'Can not .setupMiddleware() to an express instance again!');
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
                    assert.deepEqual(body, {rpc: 'BODY!'});
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
