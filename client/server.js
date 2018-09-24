const express = require('express');
const path = require('path');
const request = require('request');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/callback', function (req, res) {
  var code = req.query.code || null;
  var data = {
    url: 'http://localhost:5000/api/login',
    body: {access_code: code},
    json: true
  };

  request.post(data, function(error, response, body) {
    res.send(body)
  });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/callback', function (req, res) {
  var code = req.query.code || null;
  return res.send(code);
});

app.listen(process.env.PORT || 8080);