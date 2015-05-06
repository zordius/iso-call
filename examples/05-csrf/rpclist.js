var isocall = require('iso-call');

// Define RPC list by name
// you can return value or Promise
// you can access request by `this`
isocall.addConfigs({
    header: function () {
        return JSON.stringify(this.headers, undefined, '  ');
    }
});
