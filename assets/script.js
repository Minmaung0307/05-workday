//## 1
var timeblockContainer = document.getElementsByClassName("container");
// console.log(timeContainer);
var currentDay = document.getElementById("currentDay");
var now = new Date();
// console.log(now);
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekday[now.getDay()]; //0-6
let date = now.getDate(); //1-31
let dateSuper = getNumberWithOrdinal(date);

const monthArr = [
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
function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
let month = monthArr[now.getMonth()];

var year = now.getFullYear();
currentDay.innerHTML = dateSuper + ", " + month + ", " + day + ", " + year;

function addTimeBlocks() {
  for (var i = 9; i < 18; i++) {
    //to do check if there is localStorage for this time
    // var tasks = localStorage.getItem("rowId");
    //to add text arr
    // console.log(tasks);
    // document.getElementById("text").innerHTML =
    var amPm = "am";
    if (i > 11) {
      amPm = "pm";
    }

    var tasks = localStorage.getItem("myNote" + i);
    timeblocks = `<div id="taskRow${i}" class="row">
    <div class="col-2">${i}:00 ${amPm}</div>
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
// console.log(localStorage.getItem("myNote11"));

//creating listerner function
function addButtonListeners() {
  var buttons = document.getElementsByTagName("button"); //link first
  //console.log(buttons)
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", saveTask); //add saveTask button function to save
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
  // console.log(row.attr("id"));

  localStorage.setItem(rowId, note);
  //todo store the note in localStorage
  // localStorage.setItem("myNote", JSON.stringify(myNote));
}

//## call function
addTimeBlocks();
