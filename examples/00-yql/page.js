var app = require('./app');

module.exports = function (req, res) {
    app.get().then(function (consoleHtml) {
        res.send(`
<!DOCTYPE html>
<html>
 <head>
  <title>YQL Console DEMO</title>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
 </head>
<body>
Welcome to the YQL Console!
${consoleHTML}
<script src="/js/yqlconsole.js"></script>
</body>
</html>
`);
    });
};
