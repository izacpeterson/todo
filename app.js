/** @format */

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
let list = new toDoList("list");
console.log(list);
let task1 = new task("task1");
let task2 = new task("task2");
let task3 = new task("task3");
let task4 = new task("task4");

list.addTask(task1);
list.addTask(task2);
list.addTask(task3);
list.addTask(task4);

console.log(list);
