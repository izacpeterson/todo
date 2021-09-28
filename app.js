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
  }
  console.log(myApp);
}
if (myApp.lists[myApp.activeList] != undefined) {
  updateListDOM();
  updateTaskDOM();
}

//New List button and event listener
let newListButton = document.getElementById("newListButton");
newListButton.addEventListener("click", () => {
  addList(document.getElementById("newListName").value);
});

//Add task button and event listener
let newTaskButton = document.getElementById("addTaskButton");
newTaskButton.addEventListener("click", () => {
  myApp.lists[myApp.activeList].addTask(new task(""));
  console.log(
    document.getElementById(myApp.lists[myApp.activeList].tasks.length - 1)
      .childNodes[1]
  );
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
  let dropdownList = document.getElementById("dropdownList");
  let listH2 = document.getElementById("listName");
  listH2.innerText = myApp.lists[myApp.activeList].listName;

  dropdownList.innerHTML = "";
  myApp.lists.forEach((i) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(i.listName));
    li.setAttribute("class", "dropdown-item");
    dropdownList.appendChild(li);
  });
}
//Add tasks

function updateTaskDOM() {
  let taskList = document.getElementById("taskList");
  taskList.innerText = "";
  myApp.lists[myApp.activeList].tasks.forEach((t, index) => {
    let li = document.createElement("li");
    taskList.innerHTML += `
    <li class="bg-iz-bg-3 list-group-item d-flex justify-content-between align-items-center" id="${index}">
    <input class="form-control  me-1 flex-grow-1" value="${t.taskName}" oninput="myApp.lists[myApp.activeList].tasks[this.parentNode.id].changeTaskName(this.value);">
    <button class="btn material-icons me-1" onclick="changeStatus('${index}')">done</button>
    <button class="btn btn-danger material-icons me-1" onclick="myApp.lists[myApp.activeList].removeTask('${index}')">delete</button>
    </li>
    `;
    changeStatusDOM(index);
  });
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
    taskDOM.style.textDecoration = "line-through";
    taskBTN.innerHTML = "restart_alt";
    taskBTN.setAttribute(
      "class",
      "btn btn-outline-secondary material-icons me-1"
    );
  }

  if (!myApp.lists[myApp.activeList].tasks[id].complete) {
    taskDOM.style.color = "black";
    taskBTN.innerHTML = "done";
    taskBTN.setAttribute(
      "class",
      "btn btn-secondary text-white material-icons me-1"
    );
    taskDOM.style.textDecoration = "none";
  }
}
