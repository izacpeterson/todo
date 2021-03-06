/** @format */
//Classes and methods
class app {
  constructor(user, lists, activeList) {
    this.user = user;
    this.lists = [];
    this.activeList = 0;
  }
  addList(listName) {
    let array = this.lists;
    array.push(listName);
    this.lists = array;
  }
  save() {
    localStorage.setItem("todoApp", JSON.stringify(this));
  }
  changeList(index) {
    this.activeList = index;
    updateListDOM();
    updateTaskDOM();
  }
}
class toDoList {
  constructor(listName, tasks) {
    this.listName = listName;
    this.tasks = [];
  }
  addTask(task) {
    let array = this.tasks;
    array.push(task);
    this.tasks = array;
    updateTaskDOM();
    myApp.save();
  }
  removeTask(index) {
    let array = this.tasks;
    array.splice(index, 1);
    this.tasks = array;
    myApp.save();
    updateTaskDOM();
  }
}
class task {
  constructor(taskName, complete) {
    this.taskName = taskName;
    this.complete = complete;
  }
  changeTaskName(tn) {
    this.taskName = tn;
    myApp.save();
  }
  changeStatus() {
    if (!this.complete) {
      this.complete = true;
    } else if (this.complete) {
      this.complete = false;
    }
  }
}
//Declare App and load data
let myApp = new app();
load();
function load() {
  let data = JSON.parse(localStorage.getItem("todoApp"));
  if (data != null) {
    data.lists.forEach((list, index) => {
      myApp.addList(new toDoList(data.lists[index].listName));
      data.lists[index].tasks.forEach((taskobj, taskindex) => {
        myApp.lists[index].addTask(
          new task(taskobj.taskName, taskobj.complete)
        );
      });
    });
  } else {
  }
}
if (myApp.lists[myApp.activeList] != undefined) {
  updateListDOM();
  updateTaskDOM();
}

//New List button and event listener
let newListButton = document.getElementById("newListButton");
newListButton.addEventListener("click", () => {
  location.reload();
  addList(document.getElementById("newListName").value);
  myApp.save();
  myApp.activeList += 1;
  updateListDOM();
  updateTaskDOM();
});

// let newListButton2 = document.getElementById("newListButton2");
// newListButton2.addEventListener("click", () => {
//   document.querySelector("#newUser").style = "display: none";

//   addList(document.getElementById("newListName2").value);

//   myApp.save();
//   myApp.activeList += 1;
//   location.reload();

//   updateListDOM();
//   updateTaskDOM();
// });

//Add task button and event listener
let newTaskButton = document.getElementById("addTaskButton");
newTaskButton.addEventListener("click", () => {
  myApp.lists[myApp.activeList].addTask(new task(""));
  document
    .getElementById(myApp.lists[myApp.activeList].tasks.length - 1)
    .childNodes[1].focus();
});

//Add Lists
function addList(listName) {
  myApp.addList(new toDoList(listName));
  updateListDOM(listName);
}
function updateListDOM() {
  let dropdownList = document.getElementById("listMenu");
  let listH2 = document.getElementById("listName");
  listH2.innerText = myApp.lists[myApp.activeList].listName;

  dropdownList.innerHTML = "";
  myApp.lists.forEach((list, index) => {
    dropdownList.innerHTML += `
    <li class="nav-item list-group-item bg-primary text-white" id="list${index}" onclick="myApp.changeList('${index}')")>${list.listName}</li>
    `;
  });
}
//Add tasks

function updateTaskDOM() {
  let taskList = document.getElementById("taskList");
  taskList.innerText = "";
  myApp.lists[myApp.activeList].tasks.forEach((t, index) => {
    let li = document.createElement("li");
    taskList.innerHTML += `
    <li class="bg-transparent-lt list-group-item d-flex justify-content-between align-items-center todoItem" id="${index}">
    <input class="form-control bg-white me-1 flex-grow-1 border-0" value="${t.taskName}" oninput="myApp.lists[myApp.activeList].tasks[this.parentNode.id].changeTaskName(this.value);">
    <button class="btn-iz-check text-white iz-sh-1 material-icons me-1" onclick="changeStatus('${index}')">done</button>
    <button class="btn-iz bg-transparent text-primary material-icons me-1 trashBtn" onclick="deleteItem(${index},event)">delete</button>
    </li>
    `;
    changeStatusDOM(index);
  });
}
//delete item
function deleteItem(i, listItem) {
  listItem.target.parentElement.classList.add("deleteTransition");

  setTimeout(() => {
    myApp.lists[myApp.activeList].removeTask(i);
  }, 500);
}
//change task status
function changeStatus(id) {
  myApp.lists[myApp.activeList].tasks[id].changeStatus();
  changeStatusDOM(id);
  myApp.save();
}
function changeStatusDOM(id) {
  let taskDOM = document.getElementById(id).childNodes[1];
  let taskBTN = document.getElementById(id).childNodes[3];
  if (myApp.lists[myApp.activeList].tasks[id].complete) {
    taskDOM.style.color = "grey";
    taskBTN.innerHTML = "restart_alt";

    taskBTN.classList.add("bg-transparent");
    taskBTN.classList.add("text-primary");
    taskBTN.classList.remove("bg-primary");
    taskBTN.classList.remove("text-white");
    taskBTN.classList.remove("iz-sh-1");

    document.getElementById(id).style.setProperty("--line_width", "60%");
  }

  if (!myApp.lists[myApp.activeList].tasks[id].complete) {
    taskDOM.style.color = "black";
    taskBTN.innerHTML = "done";
    taskBTN.classList.remove("bg-transparent");
    taskBTN.classList.remove("text-primary");
    taskBTN.classList.add("bg-primary");
    taskBTN.classList.add("text-white");
    taskBTN.classList.add("iz-sh-1");

    document.getElementById(id).style.setProperty("--line_width", "0%");
  }
}
//darkmode
let dm = false;
function darkMode() {
  let ltelems = document.querySelectorAll(".bg-transparent-lt");
  let wtelems = document.querySelectorAll(".bg-white");
  let nav = document.querySelector("nav");
  let svg = document.querySelector(".svgLight");
  svg.classList.toggle("svgDark");
  nav.classList.toggle("bg-primary");
  nav.classList.toggle("bg-transparent-dk");
  for (el of ltelems) {
    el.classList.toggle("bg-transparent-dk");
  }
  for (el of wtelems) {
    el.classList.toggle("bg-dark");
    el.classList.toggle("text-white");
  }
}
