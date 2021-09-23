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
    localStorage.setItem("todoApp", this);
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
    this.complete = false;
  }
  changeStatus() {
    if (!this.complete) {
      this.complete = true;
    } else if (this.complete) {
      this.complete = false;
    }
  }
}
//Declare App
let myApp = new app();

//New List button and event listener
let newListButton = document.getElementById("newListButton");
newListButton.addEventListener("click", () => {
  addList(document.getElementById("newListName").value);
});

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
function addTask(listIndex, taskName) {
  myApp.lists[listIndex].addTask("taskName");
}
function updateTaskDOM(listIndex) {
  myApp.lists[listIndex].tasks.forEach((t) => {
    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(t.taskName));
    console.log(t);
    li.setAttribute("class", "list-group-item");
    taskList.appendChild(li);
  });
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
tester();
