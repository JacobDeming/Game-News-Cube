var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    article: {
      type: String,
      required: true},
    summary:{
      type: String,
      required: true},
    date: String,});


var Article = mongoose.model('article', ArticleSchema);
module.exports = Article;
