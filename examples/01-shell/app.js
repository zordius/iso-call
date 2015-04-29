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
<form onsubmit="CMDConsole.renderInto(this);return false">
${R}
</form>
`;
};

module.exports = {
    get: function (Q) {
        return isocall(Q).then(template, template);
    },
    getInner: function (Q) {
        return isocall(Q).then(inner, inner);
    },
    renderInto: function (form) {
        this.get(form.elements.query.value).then(function (H) {
            form.innerHTML = H;
        });
    }
};
