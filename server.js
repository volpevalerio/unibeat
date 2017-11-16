const express = require("express"),
      app = express(),
      path = require("path");

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

app.listen(3000, () => console.log('Example app listening on port 3000!'))