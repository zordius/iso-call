var isocall = require('iso-call');

// Define yql api
var yql = function (Q) {
    return isocall.request('yql', {
        qs: {
            q: Q,
            format: 'json',
            diagnostics: 'true'
        },
        json: true,
    }).catch(function (E) {
        console.log(E);
    });
};

// Define yql api endpoint
isocall.addConfigs({
    yql: 'https://query.yahooapis.com/v1/public/yql'
});

module.exports = yql;
