var request = require('request');
var cheerio = require('cheerio');

var scrape = function(url, cb) {
    if (url == "http://www.gamasutra.com/updates") {
        request(url, function(err, res, body) {
            var $ = cheerio.load(body);
            var obj = {};
            $('.feed_item').each(function(i, element){
              var head = $(this).find(".story_title").text();
              var sum=($(this).html().split('<br>')[2]);
              if (head !== "" && sum !== ""){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                obj[i] = [headNeat];
                obj[i].push(sumNeat);}});
            console.log(obj);
            cb(obj);});}};

module.exports = scrape;
