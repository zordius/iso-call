require('iso-call/polyfill');
var yql = require('./yql');

var inner = function (D) {
    var json = JSON.stringify(D, undefined, '  ');
    return `
<input type="text" name="query" value="" />
<input type="submit" value="TEST" />
<hr/>
<h3>Result:</h3>
<textarea>${json}</textarea>
`;
};

var template = function (D) {
    var R = inner(D);
    return `
<form onsubmit="YQLConsole.render(this);return false">
${R}
</form>
`;
};

module.exports = {
    get: function (Q) {
        return yql(Q).then(template, template);
    },
    getInner: function (Q) {
        return yql(Q).then(inner, inner);
    },
    renderInto: function (form) {
        this.get(form.elements.query.value).then(function (H) {
            form.innerHTML = H;
        });
    }
};
