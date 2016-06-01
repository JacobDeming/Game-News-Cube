$(document).ready(function() {
  fetchMongo();
  startPage();})

var mongoStuff;
var count = 0;
var dateTime;
var state = 0;

var startPage = function() {
  $.getJSON('/checkMongo', function(data) {
    mongoStuff = data;
    dateTime = mongoStuff[mongoStuff.length - 1].date;}).done(function() {
    clickBox();
    noteSave();});};

var getMongo = function() {
  var idCount = count - 1;
  console.log(mongoStuff[idCount]);
  $.ajax({
    type: "POST",
    dataType: "json",
    url: '/getMongo',
    data: {
      id: mongoStuff[idCount]._id}}).done(function(currentNotes){
    postNote(currentNotes);})
  .fail(function() {});};

var postNote = function(currentNotes) {
  console.log(currentNotes);
  $("#notes").val("");
  var note = "";
  for (var i = 0; i < currentNotes.length; i++) {
    note = note + currentNotes[i].noteText + '\n';}
  $("#notes").val(note);};

var noteSave = function() {
  $("#note").on('click', function() {
    var text = $("#input").val();
    var idCount = count - 1;
    $.ajax({
      type: "POST",
      dataType: "json",
      url: '/saveNote',
      data: {
        id: mongoStuff[idCount]._id,
        date: dateTime,
        note: text}}).done(function() {
      $("#input").val("");
      getMongo();}).fail(function() {});});};

var deleteNote = function() {
  $("#delete").on('click', function() {
    var idCount = count - 1;
    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: '/deleteNote',
      data: {
        id: mongoStuff[idCount]._id,}}).done(function() {
      $("#notes").val("");}).fail(function(){});});};

var rotate = ['moveFront', 'moveBack', 'moveRight', 'moveLeft', 'moveTop', 'moveBottom'];
var cubeSide = ['back', 'right', 'left', 'top', 'bottom', 'front'];

var typePost = function() {
  $("#article").remove();
  $("#summary").remove();
  var h = 0;
  var s = 0;
  var newsText;
  if (state > 0) {
    side = state - 1;}
  else {
    side = 5;}
  $("." + cubeSide[side]).append("<div id='article'></div>");
  $("." + cubeSide[side]).append("<div id='summary'></div>");
  var article = mongoStuff[count].article;
  var summary = mongoStuff[count].summary;
  count++;
  (function type() {
    printArticle = article.slice(0, ++h);
    printSummary = summary.slice(0, ++s);
    $("#article").text(printArticle);
    $("#summary").html(printSummary);
    if (printArticle.length === article.length && printSummary.length === summary.length) {
      return;}
    setTimeout(type, 20);}());};

var clickBox = function() {
  $("#GameCube").on("click", function() {
    if (state <= 5) {
      state++;}
    else {
      state = 0;}
    $('#GameCube').removeClass().addClass(rotate[state]);
    typePost();
    getMongo();
    deleteNote();
    $("#input").show();
    $("#save").show();});};

var fetchMongo = function() {
  $.ajax({
    type: "POST",
    url: '/fetchMongo'}).fail(function(){
    alert("Server broke.");});};
