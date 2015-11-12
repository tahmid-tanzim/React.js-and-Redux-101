var express = require('express');
var app = express();

/**
 * Note: Middleware app.use will serve everything static from public directory and bootstrap.
 * */
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

app.listen(3000);
console.log("Polling server is running at 'http://localhost:3000'");