var makeDate = function() {
    var d = new Date();
    var date = "";
    date = date + (d.getMonth() + 1) + "_";
    date = date + d.getDate() + "_";
    date = date + d.getFullYear();
    return date;
};

module.exports = makeDate;
