const express = require('express');
const bodyParser = require('body-parser');
var routes = require('./routes');
var logger = require('cf-nodejs-logging-support');

logger.setLoggingLevel("info");

var app = express();
app.use(logger.logNetwork);


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.listen( process.env.PORT || 3000 , () => console.log('App listening on port 3000!'))

app.use(express.static('./'))
app.use('/', routes);



