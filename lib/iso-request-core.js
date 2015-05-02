var request = require('request');

module.exports = function (opt) {
    if (!opt) {
        return Promise.reject(new Error('iso-request-core without input!'));
    }

    if (!opt.url) {
        return Promise.reject(new Error('iso-request-core without url, input:' + JSON.stringify(opt)));
    }

    return new Promise(function (resolve, reject) {
        request(opt, function (error, response, body) {
            var O = {
                error: error,
                response: response,
                body: body
            };

            // Prevent response.body == body double sized
            if (response) {
                delete response.body;
            }

            if (error) {
                return reject(O);
            }

            resolve(O);
        });
    });
};
