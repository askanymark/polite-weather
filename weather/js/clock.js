if (TwentyFourHourClock == true) {
  var TwentyFourHourClock = "true";
} else {
  var TwentyFourHourClock = "false";
}

function getdates() {
  var date = new Date();
  var day = date.getDay();
  var datetoday = date.getDate();
  var year = date.getFullYear();
  var monthnum = date.getMonth();
  var textdate = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eightheenth", "Nineteenth", "Twentyith", "TwentyFirst", "TwentySecond", "TwentyThird", 'TwentyFourth', "TwentyFifth", "TwentySixth", "TwentySeventh", "TwentyEight", "TwentyNinth", "Thirtyith", "ThirtyFirst"][datetoday - 1];
  document.getElementById("Date").innerHTML = '<span>' + sday[day] + ", " + smonth[monthnum] + " " + datetoday + '</span>';
}
setInterval(function() {
  updateClock()
}, 30000);
setInterval(function() {
  getdates()
}, 1800000);
getdates();
updateClock();

function updateClock() {

  if (TwentyFourHourClock == "true") {

    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();
    currentHours = (currentHours < 10 ? "0" : "") + currentHours;
    currentHours = (currentHours == 0) ? 12 : currentHours;
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    var currentTimeString = currentHours + ":" + currentMinutes;

    var t = currentTime;
    var n = t.getHours();
    var r = t.getMinutes();
    var i = t.getSeconds();
    n = (n < 10 ? "0" : "") + n;
    r = (r < 10 ? "0" : "") + r;
    var o = n + ":" + r;
    var u = new Array("Twelve", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty", "TwentyOne", "TwentyTwo", "TwentyThree", "TwetyFour");
    var a = new Array("o' clock", "o' one", "o' two", "o' three", "o' four", "o' five", "o' six", "o' seven", "o' eight", "o' nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "Sixteen", "Seventeen", "eighteen", "Nineteen", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty");
    var f = new Array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "");
    var t = new Date;
    var n = t.getHours();
    var r = t.getMinutes();
    var l = t.getMinutes();
    var i = t.getSeconds();
    var o = u[n];
    var c = a[r];
    var h = f[l];

    document.getElementById("Clock").innerHTML = currentTimeString + '<span style="font-size:18px">' + format + '</span>';
  }

  if (TwentyFourHourClock == "false") {

    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
    var timeOfDay = (currentHours < 12) ? "AM" : "PM";
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
    currentHours = (currentHours == 0) ? 12 : currentHours;
    var currentzHours = (currentHours < 10 ? "0" : "") + currentHours;
    var currentTimeString = currentHours + ":" + currentMinutes;

    var t = currentTime;
    var n = t.getHours();
    var r = t.getMinutes();
    var i = t.getSeconds();
    r = (r < 10 ? "0" : "") + r;
    i = (i < 10 ? "0" : "") + i;
    var s = n < 12 ? "AM" : "PM";
    n = n > 12 ? n - 12 : n;
    n = n == 0 ? 12 : n;
    var o = n + ":" + r;
    var u = new Array("Twelve", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve");
    var a = new Array("o' clock", "o' one", "o' two", "o' three", "o' four", "o' five", "o' six", "o' seven", "o' eight", "o' nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "Sixteen", "Seventeen", "eighteen", "Nineteen", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty");
    var f = new Array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "");
    var t = new Date;
    var n = t.getHours();
    var r = t.getMinutes();
    var l = t.getMinutes();
    var i = t.getSeconds();
    var o = u[n];
    var c = a[r];
    var h = f[l];
  }

  var todayDate = new Date();
  var hours = todayDate.getHours();
  var format = "AM";

  if (hours > 11) {
    format = "PM";
  }

  document.getElementById("Clock").innerHTML = currentTimeString + '<span style="font-size:18px">' + format + '</span>';
}
