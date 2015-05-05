require('iso-call/polyfill');

var isocall = require('iso-call');

var inner = function (D) {

    /* eslint-disable no-underscore-dangle */
    var csrf = this._csrf;
    return `
<input type="text" name="q" value="" />
<input type="hidden" name="_csrf" value="${csrf}" />
<input type="submit" value="TEST" />
<hr/>
<h3>Result:</h3>
<textarea>${D}</textarea>
`;
};

var template = function (D) {
    var R = (inner.bind(this))(D);
    return `
<form onsubmit="(new REQConsole()).renderInto(this);return false">
${R}
</form>
`;
};

// Server side: construct app with request, then .execute() works.
// Client side: no request provided, but .execute() still works well.
var app = function (req, csrf) {
    /* eslint-disable no-underscore-dangle */
    // Keep request at _req .
    this._req = req;

    /* eslint-disable no-underscore-dangle */
    this._csrf = csrf;
};

app.prototype = {
    get: function () {
        return this.execute.apply(this, arguments).then(template.bind(this), template.bind(this));
    },
    getInner: function (Q) {
        return this.execute(Q).then(inner, inner);
    },
    renderInto: function (form) {
        var csrf = form.elements._csrf.value;
        this.get(form.elements.q.value, {csrfToken: csrf} ).then(function (H) {
            form.innerHTML = H;
            form.elements._csrf.value = csrf;
        });
    },
    // provide APP.execute() to deal with request <=> this
    execute: function () {
        return isocall.execute.apply(this._req, arguments);
    }
};

module.exports = app;
