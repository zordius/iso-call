require('iso-call/polyfill');

var isocall = require('iso-call');

var inner = function (D) {
    return `
<input type="text" name="q" value="" />
<input type="submit" value="TEST" />
<hr/>
<h3>Result:</h3>
<textarea>${D}</textarea>
`;
};

var template = function (D) {
    var R = inner(D);
    return `
<form onsubmit="(new REQConsole()).renderInto(this);return false">
${R}
</form>
`;
};

var app = function (req) {
    this._req = req;
};

app.prototype = {
    get: function (Q) {
        return this.execute(Q).then(template, template);
    },
    getInner: function (Q) {
        return this.execute(Q).then(inner, inner);
    },
    renderInto: function (form) {
        this.get(form.elements.q.value).then(function (H) {
            form.innerHTML = H;
        });
    },
    execute: function () {
        return isocall.execute.apply(this._req, arguments);
    }
};

module.exports = app;
