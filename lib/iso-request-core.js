var request = require('request');

module.exports = function (opt) {
    if (!opt.url) {
        return Promise.reject(new Error('iso-request-core without url, input:' + JSON.encode(opt)));
    }

    return new Promise(function (resolve, reject) {
        request(opt, function (error, response, body) {
            var O = {
                error: error,
                response: response,
                body: body
            };

            if (error) {
                return reject(O);
            }

            resolve(O);
        });
    });
};
