var listID = 0;
var taskLists = [];

function Task(task, pid) {
  this.complete = "incomplete";
  this.toDo = task;
  this.pid = pid;
}

Task.prototype.complete = function() {
  this.complete = "complete";
}

Task.prototype.writeTask = function() {
  var output = "<li class='" + this.complete + "' id='task" + this.pid + "'>" + this.toDo + "</li>";
  return output;
}

function incrementID() {
  listID++;
}

function List(name) {
  this.list = [];
  this.taskID = 0;
  this.pid = listID;
  this.name = name;
  incrementID();
  this.instantiate($(".lists"));
}

List.prototype.addTask = function(task) {
  debugger;
  var myTask = new Task(task, this.taskID)
  this.list.push(myTask);
  this.taskID++;
  this.update(myTask, $("#list" + this.pid));
}

List.prototype.instantiate = function(selector) {
  var theBasics = "<div class='list'><h3>" + this.name + "</h3><ul id='list" + this.pid + "'></ul>"
  theBasics += "<form id='form" + this.pid + "' class='list-form'><div class='form-group'><label>Enter New Task:<input class='form-control' id='input" + this.pid + "'></label></div><button type=submit>Submit</button>";
  theBasics += "</div>";
  selector.append(theBasics);
}

List.prototype.update = function(task, selector) {
  selector.append(task.writeTask());
}

function attachSubmitListeners() {
  $(".list").on("submit", "form", function(event) {
    event.preventDefault();
    var id = parseInt(this.id.slice(4));
    var input = $("#input" + id).val();
    debugger;
    taskLists.forEach(function(list) {
      if(list.pid === id) {
        list.addTask(input);
      }
    });
    debugger;
  })
}

// List.prototype.writeList = function() {
//   var output = "";
//   this.list.forEach(function(task) {
//     output += task.writeTask();
//   })
//   return output;
// }

function write() {

}

$(function() {
  var basicList = new List("Default");
  taskLists.push(basicList);
  attachSubmitListeners();
});
