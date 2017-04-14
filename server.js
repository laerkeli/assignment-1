var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var router = express.Router();

app.set('port', 3000);

app.get('/', function(req, res) {
  console.log("GET the homepage");
  res
  .status(200)
  .sendFile(path.join(__dirname, 'public', 'index.html'));
});

//curl -H Accept: application/json+canvas-string-ids //Fra CANVAS

app.use (function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function (req, res) {
  res.json({ message: 'API Initialized!' });
});

router.route('/courses')
.get((req, res) => {
  request('https://ucn.instructure.com/api/v1/courses?access_token=' + CanvasToken).pipe(res);
});

module.exports = router;

app.use('/api', router);

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
console.log('Magic happens on port ' + port);
});
