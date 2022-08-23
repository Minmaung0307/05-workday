//#1 Targetting HTML Elements
var timeblockContainer = document.getElementsByClassName("container");
var currentDay = document.getElementById("currentDay");
var buttons = document.getElementsByTagName("button");
// console.log(timeblockContainer);

//#2 Getting Date, Day, Month, Year
var now = new Date();
currentDay.innerHTML = now.toLocaleString("en-US");

/*
// console.log(now);
var pastDate = new Date(1100, 11, 25, 11, 45, 59);
var futureDate = new Date(5500, 11, 25, 11, 45, 59);
var birthday = new Date(1900, 1, 25, 11, 25, 15);
console.log(birthday.getMonth()); // 0-11
console.log(birthday.getFullYear()); // yyyy
console.log(birthday.getDate()); // 1-31
console.log(birthday.getDay()); // 0-6
console.log(birthday.getHours()); // 0-23
console.log(birthday.getTime()); // mimmiseconds since 1st Jan

var weekArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var day = weekArr[now.getDay()]; //between 0-6

var monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var date = now.getDate(); //between 1-31
var sufFix = superScript(date);

function superScript(date) {
  var supScpt = ["th", "st", "nd", "rd"],
    vSc = date % 100;
  return date + (supScpt[(vSc - 20) % 10] || supScpt[vSc] || supScpt[0]);
}

var month = monthArr[now.getMonth()];
var year = now.getFullYear();

// currentDay.innerHTML = day + ", " + sufFix + ", " + month + ", " + ", " + year;
*/

//#3 Creating Timeblocks
function addTimeBlocks() {
  for (var i = 9; i < 18; i++) {
    var morningEvening = " A.M.";
    if (i > 11) {
      morningEvening = " P.M.";
    }

    var tasks = localStorage.getItem("myNote" + i) || "";

    //#3.1
    timeblocks = `<div id="taskRow${i}" class="row">
    <div class="col-2 workTime">${i}:00 ${morningEvening}</div>
    <textarea name="" id="myNote${i}" class="col-8">${tasks}</textarea>
    <button class="col-2 saveBtn" type="button">Save Task</button>
  </div>`;
    timeblockContainer[0].innerHTML += timeblocks;

    var date = new Date();
    var currentHour = date.getHours();
    var txtarea = document.getElementById("myNote" + i);

    if (i < currentHour) {
      txtarea.classList.remove("present");
      txtarea.classList.remove("future");
      txtarea.classList.add("past");
    } else if (i === currentHour) {
      txtarea.classList.remove("past");
      txtarea.classList.remove("future");
      txtarea.classList.add("present");
    } else {
      txtarea.classList.remove("past");
      txtarea.classList.add("future");
      txtarea.classList.remove("present");
    }
  }
  addButtonListeners(); //add listener
}

//#4 Adding eventListerner to Buttons
function addButtonListeners() {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", saveTask);
  }
}

//#5 Save button action and save to local storage
//create save button function
function saveTask(event) {
  event.preventDefault();

  var row = $(event.target).parent();
  var textarea = row.children("textarea");
  // console.log(textarea.val());
  var note = textarea.val();
  // console.log(note);
  // console.log("task received");
  var rowId = textarea.attr("id");
  // console.log(textarea.attr("id"));

  localStorage.setItem(rowId, note);
}

addTimeBlocks();
