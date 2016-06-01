var scrape = require('../scripts/scrape.js');
var makeDate = require('../scripts/date.js');
var Article = require('../models/Article.js');
var Note = require('../models/Note.js');

exports.fetch = function() {
  scrape("http://www.gamasutra.com/updates", function(data) {
    var obj = data;
    var date = makeDate();
    for (var i in obj) {
      noneFound(i);}
    function noneFound(current) {
      Article.findOne({
        'article': obj[current][0]}, function(err, res) {
        if (err) {
          console.log(err);}
        if (res === null) {
          var articleEntry = new Article({
            article: obj[current][0],
            summary: obj[current][1],
            date: date});
          articleEntry.save(function(err) {
            if (err) {}
            else {
              console.log('successfully added');}});}});}});};

exports.check = function(cb) {
  Article.find().sort({_id: -1}).exec(function(err, doc) {
      cb(doc);});};
