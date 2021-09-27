/** @format */
//Classes and methods
class app {
  constructor(user, lists) {
    this.user = user;
    this.lists = [];
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
  }
  removeTask(index) {
    let array = this.tasks;
    array.splice(index, 1);
    this.tasks = array;
  }
}
class task {
  constructor(taskName, complete) {
    this.taskName = taskName;
    this.complete = complete;
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
if (myApp.lists[0] != undefined) {
  updateListDOM();
  updateTaskDOM(0);
}

//New List button and event listener
let newListButton = document.getElementById("newListButton");
newListButton.addEventListener("click", () => {
  addList(document.getElementById("newListName").value);
});

//Add task button and event listener
let newTaskButton = document.getElementById("addTaskButton");
newTaskButton.addEventListener("click", () => {
  addTask(0, document.getElementById("newTask").value);
});

//Add Lists
function addList(listName) {
  myApp.addList(new toDoList(listName));
  updateListDOM(listName);
}
function updateListDOM() {
  let dropdownList = document.getElementById("dropdownList");
  let listH2 = document.getElementById("listName");
  listH2.innerText = myApp.lists[0].listName;

  dropdownList.innerHTML = "";
  myApp.lists.forEach((i) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(i.listName));
    li.setAttribute("class", "dropdown-item");
    dropdownList.appendChild(li);
  });
}
//Add tasks
function addTask(listIndex, taskName) {
  myApp.lists[listIndex].addTask(new task(taskName));
  updateTaskDOM(listIndex);
  myApp.save();
}
function updateTaskDOM(listIndex) {
  let taskList = document.getElementById("taskList");
  taskList.innerText = "";
  myApp.lists[listIndex].tasks.forEach((t, index) => {
    let li = document.createElement("li");
    // li.innerText = t.taskName;
    li.setAttribute(
      "class",
      "list-group-item d-flex justify-content-between align-items-center taskListItem"
    );
    li.setAttribute("id", index);
    //title
    let taskName = document.createElement("h3");
    taskName.innerText = t.taskName;
    taskName.setAttribute("class", "flex-grow-1");
    taskName.setAttribute("contenteditable", true);

    taskName.addEventListener("input", changeTask(taskName));
    li.appendChild(taskName);
    //check button
    let checkBtn = document.createElement("button");
    checkBtn.setAttribute("class", "btn btn-primary material-icons me-1");
    checkBtn.setAttribute("onclick", `changeStatus('${index}')`);
    checkBtn.innerText = "done";
    li.appendChild(checkBtn);
    //trash button
    let btnRemove = document.createElement("button");
    btnRemove.innerHTML = "delete";
    btnRemove.setAttribute("class", "btn btn-danger material-icons");
    li.appendChild(btnRemove);

    taskList.appendChild(li);
    changeStatusDOM(index);
  });
}

//change task status
function changeStatus(id) {
  myApp.lists[0].tasks[id].changeStatus();
  changeStatusDOM(id);
  myApp.save();
}
function changeStatusDOM(id) {
  let taskDOM = document.getElementById(id).childNodes[0];
  let taskBTN = document.getElementById(id).childNodes[1];
  if (myApp.lists[0].tasks[id].complete) {
    taskDOM.style.color = "grey";
    taskDOM.style.textDecoration = "line-through";
    taskBTN.innerHTML = "restart_alt";
    taskBTN.setAttribute(
      "class",
      "btn btn-outline-secondary material-icons me-1"
    );
  }

  if (!myApp.lists[0].tasks[id].complete) {
    taskDOM.style.color = "black";
    taskBTN.style.backgroundColor = "";
    taskBTN.innerHTML = "done";
    taskBTN.setAttribute("class", "btn btn-primary material-icons me-1");
    taskDOM.style.textDecoration = "none";
  }
}

function tester() {
  myApp.addList(new toDoList("myList"));
  myApp.lists[0].addTask(new task("Wake Up"));
  myApp.lists[0].addTask(new task("Go to school"));
  myApp.lists[0].addTask(new task("Lunch"));
  myApp.lists[0].addTask(new task("Go to work"));
  updateListDOM();
  updateTaskDOM(0);
}
// tester();
