var App = require('./app');

module.exports = function (req, res) {
    var csrf = req.csrfToken(),
        APP = new App(req, csrf);
    res.cookie("XSRF-TOKEN", csrf);
    APP.get(req.query.q).then(function (consoleHTML) {
        //res.set('csrf-token', csrfToken);
        res.send(`
<!DOCTYPE html>
<html>
 <head>
  <title>SHELL Console DEMO</title>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
 </head>
<style>
input {width:80%}
input[type="submit"] {width:10%}
textarea {width: 100%;height:400px}
</style>
<body>
Welcome to the SHELL Console!
${consoleHTML}
<script src="/js/REQConsole.js"></script>
</body>
</html>
`);
    }).catch(function (E) {
        console.warn(E);
    });
};
