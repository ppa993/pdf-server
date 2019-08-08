var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var port = process.env.PORT || 1337;


var ps = require('./routes/product-summary');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', ps);

app.get('*', function (req, res) {
    res.redirect('/api');
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});