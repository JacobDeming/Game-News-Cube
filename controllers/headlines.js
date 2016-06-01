var scrape = require('../scripts/scrape.js');
var makeDate = require('../scripts/date.js');
var Headline = require('../models/Headline');
var Note = require('../models/Note');

exports.fetch = function() {
  scrape("http://www.gamasutra.com/updates", function(data) {
    var obj = data;
    var date = makeDate();
    for (var i in obj) {
      noneFound(i);}
    function noneFound(current) {
      Headline.findOne({
        'headline': obj[current][0]}, function(err, res) {
        if (err) {
          console.log(err);}
        if (res === null) {
          var headlineEntry = new Headline({
            headline: obj[current][0],
            summary: obj[current][1],
            date: date});
          headlineEntry.save(function(err) {
            if (err) {}
            else {
              console.log('successfully added');}});}});}});};

exports.check = function(cb) {
  Headline.find().sort({_id: -1}).exec(function(err, doc) {
      cb(doc);});};
