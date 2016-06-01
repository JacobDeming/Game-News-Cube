var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');

var db = 'mongodb://localhost/indieNews';
mongoose.connect(db, function(err){
  if(err){
    console.log(err);}
  else {
    console.log('mongoose connected!');}});

app.use(express.static(__dirname +'/public'));
var port = 3000;

var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false}));

var routes = require('./config/routes.js');

app.use('/', routes);
app.use('/fetchMongo', routes);
app.use('/getMongo', routes);
app.use('/checkMongo', routes);
app.use('/saveNote', routes);
app.use('/deleteNote', routes);


app.listen(port, function() {
    console.log("lisenting on port:" + port);});
