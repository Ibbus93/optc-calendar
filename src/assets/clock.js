var clockID;
var a = new Date().getTimezoneOffset();

var res = -Math.round(a/60)+'.'+-(a%60);
yourTimeZoneFrom = res < 0 ?res : '+'+res;

//var yourTimeZoneFrom = +1.00; //time zone value where you are at

var d = new Date();
//get the timezone offset from local time in minutes
var tzDifference = yourTimeZoneFrom * 60 + d.getTimezoneOffset();
//convert the offset to milliseconds, add to targetTime, and make a new Date
var offset = tzDifference * 60 * 1000;

function UpdateClock() {
  var tDate = new Date(new Date().getTime()+offset);
  var year = tDate.getFullYear();
  var month = tDate.getMonth() + 1;
  dayOfClock = tDate.getDate();
  var in_hours = tDate.getHours();
  var in_minutes=tDate.getMinutes();
  var in_seconds= tDate.getSeconds();

  if(in_minutes < 10)
    in_minutes = '0'+in_minutes;
  if(in_seconds<10)
    in_seconds = '0'+in_seconds;
  if(in_hours<10)
    in_hours = '0'+in_hours;

  document.getElementById('clock').innerHTML = ""
    //   				   + year + "-"
    //                   + month + "-"
    //                   + day + " "
    + in_hours + ":"
    + in_minutes + ":"
    + in_seconds + " " + yourTimeZoneFrom;

  setToday(month);

}
function StartClock() {
  clockID = setInterval(UpdateClock, 500);
}

function KillClock() {
  clearTimeout(clockID);
}
window.onload=function() {
  StartClock();

}

function setToday(month){
  for(i=0;i<7;i++){
    var dayGet = $('#day'+(i+1)).text();
    var monthGet = $("#month").text();
    if(dayOfClock == dayGet && numberToMonth(month) == monthGet){
      $("#back" + (i+1)).css("background-color", "darkblue");
    } else {
      $("#back" + (i+1)).css("background-color", "rgb(27, 128, 205)");
    }
  }
}

function numberToMonth(number) {
  switch (number) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
  }
}
