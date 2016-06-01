var express = require('express');
var router = express.Router();
var scrape = require('../scripts/scrape.js');
var headlinesController = require('../controllers/headlines.js');
var notesController = require('../controllers/notes.js');

router.get('/', function(req, res) {
    res.render('home');});

router.post('/fetchMongo', function(req, res) {
    headlinesController.fetch();
    res.send('success');});

router.get('/checkMongo', function(req, res) {
    headlinesController.check(function(data) {
        res.json(data);});});

router.post('/getMongo', function(req, res) {
    notesController.gather(req.body, function(data) {
        res.json(data);});});

router.post('/saveNote', function(req, res) {
    notesController.save(req.body, function(data) {
        res.json(data);});});

router.delete('/deleteNote', function(req, res) {
    notesController.delete(req.body, function(data) {
        res.json(data);});});


module.exports = router;