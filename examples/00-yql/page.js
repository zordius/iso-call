var app = require('./app');

module.exports = function (req, res) {
    res.send(`
<!DOCTYPE html>
<html>
 <head>
  <title>YQL Console DEMO</title>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
 </head>
<body>
OK! :D
<script src="/js/yqlconsole.js"></script>
</body>
</html>
`);
};
