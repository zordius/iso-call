var app = require('./app');

module.exports = function (req, res) {
    var APP = new app(req);

    APP.get(req.query.q).then(function (consoleHTML) {
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
`
        );
    }).catch(function (E) {
        console.warn(E);
    });
};
