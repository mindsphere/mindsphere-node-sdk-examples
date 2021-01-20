const express = require('express');
const bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen( process.env.PORT || 3000 , () => console.log('App listening on port 3000!'))

app.use('/', routes);



