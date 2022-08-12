//1. First Getting Connection
var timeContainer = document.getElementsByClassName("container");
//console.log(timeContainer)

// 2. Adding targeted blocks
function addTime() {
  for (var i = 9; i < 18; i++) {
    createBlocks = `<div class="row">
    <div class="col-2">${i}:00</div>
    <textarea class="col-8"></textarea>
    <button class="col-2" type="button">Save Task</button>
    </div>`;
    timeContainer[0].innerHTML += createBlocks;
  }
  addButtonListeners();
}

// 3. Adding buttons to listen
function addButtonListeners() {
  var buttons = document.getElementsByTagName("button");
  // console.log(buttons);
  for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", saveTask);
  }
}

// 4. Adding function to savetask buttons
function saveTask() {
  console.log("task received");
}

// calling primary function
addTime();
