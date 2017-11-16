const express = require("express"),
      app = express(),
      path = require("path");

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
app.use('/', express.static(__dirname));

app.listen(3000, () => console.log('Example app listening on port 3000!'))