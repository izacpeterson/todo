/** @format */

let app = {
  lists: [],
  activeList: 0,
  addList(listName) {
    console.log(listName);
    this.lists.push(new List(listName));
    // this.activeList += 1;
    this.render();
  },
  addTask(taskName) {
    this.lists[this.activeList].tasks.push(new Task(taskName));
    this.render();
  },
  toggleTask(taskId) {
    this.lists[this.activeList].tasks[taskId].status =
      !this.lists[this.activeList].tasks[taskId].status;
    console.log(this.lists[this.activeList].tasks[taskId]);
  },
  deleteTask(taskId, event) {
    event.target.parentElement.classList.add("deleteTransition");
    setTimeout(() => {
      this.lists[this.activeList].tasks.splice(taskId, 1);
      this.render();
    }, 500);
  },
  render() {
    document.getElementById("listName").innerText =
      this.lists[this.activeList].name;
    let taskList = document.getElementById("taskList");
    taskList.innerText = "";
    this.lists[this.activeList].tasks.forEach((t, index) => {
      taskList.innerHTML += `
        <li class="bg-transparent-lt list-group-item d-flex justify-content-between align-items-center todoItem" id="${index}">
        <input class="form-control bg-white me-1 flex-grow-1 border-0" value="${t.name}" oninput="myApp.lists[myApp.activeList].tasks[this.parentNode.id].changeTaskName(this.value);">
        <button class="btn-iz-check bg-primary text-white iz-sh-1 material-icons me-1" onclick="app.toggleTask('${index}')">done</button>
        <button class="btn-iz bg-transparent text-primary material-icons me-1 trashBtn" onclick="app.deleteTask(${index},event)">delete</button>
        </li>
        `;
    });
  },
  save() {
    localStorage.setItem("lists", JSON.stringify({ lists: this.lists }));
  },
  load() {
    let data = JSON.parse(localStorage.getItem("lists"));
    console.log(data);
    data.lists.forEach((list, index) => {
      let newList = new List(list.name);
      list.tasks.forEach((task) => {
        newList.tasks.push(new Task(task.name, task.status));
      });
      this.lists.push(newList);
    });
  },
};
class List {
  constructor(name, tasks) {
    this.name = name;
    this.tasks = [];
  }
}
class Task {
  constructor(name, status) {
    this.name = name;
    this.status = status;
  }
}

// app.addList("myList");
// app.addTask("wake up");
// app.addTask("eat breakfast");
// app.addTask("mtech");
// app.addTask("lunch");
// app.addTask("work");

// app.toggleTask(0);
// // app.deleteTask(3);

// app.render();

// console.log(app.lists);

// app.save();
app.load();

console.log(app.lists);
