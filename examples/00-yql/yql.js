var isocall = require('iso-call');

// Define yql api
var yql = function (Q) {
    console.log('request yql!');
    return isocall.request('yql', Q);
};

// Define yql api endpoint
isocall.addConfigs({
    yql: 'http://https://query.yahooapis.com/v1/public/yql'
});

module.exports = yql;
