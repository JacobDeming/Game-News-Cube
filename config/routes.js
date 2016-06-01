var express = require('express');
var router = express.Router();
var scrape = require('../scripts/scrape.js');
var articles = require('../controllers/articles.js');
var notes = require('../controllers/notes.js');

router.get('/', function(req, res) {
    res.render('home');});

router.post('/fetchMongo', function(req, res) {
    articles.fetch();
    res.send('success');});

router.get('/checkMongo', function(req, res) {
    articles.check(function(data) {
        res.json(data);});});

router.post('/getMongo', function(req, res) {
    notes.gather(req.body, function(data) {
        res.json(data);});});

router.post('/saveNote', function(req, res) {
    notes.save(req.body, function(data) {
        res.json(data);});});

router.delete('/deleteNote', function(req, res) {
    notes.delete(req.body, function(data) {
        res.json(data);});});


module.exports = router;