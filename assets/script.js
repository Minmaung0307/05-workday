var timeblockContainer = document.getElementsByClassName("container");
var currentDay = document.getElementById("currentDay");
var buttons = document.getElementsByTagName("button");
// console.log(timeblockContainer);

var weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
var now = new Date();
// console.log(now);
var day = weekdays[now.getDay()]; //between 0-6
var date = now.getDate(); //between 1-31
var month = monthArr[now.getMonth()];
var year = now.getFullYear();
var sufFix = superScript(date);

function superScript(date) {
  var sSc = ["th", "st", "nd", "rd"],
    vSc = date % 100;
  return date + (sSc[(vSc - 20) % 10] || sSc[vSc] || sSc[0]);
}

currentDay.innerHTML = sufFix + ", " + month + ", " + day + ", " + year;

function addTimeBlocks() {
  for (var i = 9; i < 18; i++) {
    var moEv = " a.m.";
    if (i > 11) {
      moEv = " p.m.";
    }

    var tasks = localStorage.getItem("myNote" + i) || "";
    timeblocks = `<div id="taskRow${i}" class="row">
    <div class="col-2 workTime">${i}:00 ${moEv}</div>
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

function addButtonListeners() {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", saveTask);
  }
}

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
