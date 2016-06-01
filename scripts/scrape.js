var request = require('request');
var cheerio = require('cheerio');

var scrape = function(url, cb) {
    if (url == "http://www.gamasutra.com/updates") {
        request(url, function(err, res, body) {
            var $ = cheerio.load(body);
            var obj = {};
            $('.feed_item').each(function(i, element){
              var art = $(this).find(".story_title").text();
              var sum = ($(this).html().split('<br>')[2]);
              if (art !== "" && sum !== ""){
                var article = art.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var summary = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                obj[i] = [article];
                obj[i].push(summary);}});
            cb(obj);});}};

module.exports = scrape;
