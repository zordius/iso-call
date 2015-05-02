var isocall = require('iso-call');

// Define RPC list by name
// you can return value or Promise
isocall.addConfigs({
    hostname: function () {
        return require('os').hostname();
    },
    ls: function () {
        return new Promise(function (resolve, reject) {
            require('child_process').exec('ls -al', function (E, stdout, stderr) {
                if (E) {
                    return reject(E);
                }
                resolve(stdout + stderr);
            });
        });
    }
});
