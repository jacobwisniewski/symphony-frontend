const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/callback', function (req, res) {
  var code = req.query.code || null;
  return res.send(code);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);