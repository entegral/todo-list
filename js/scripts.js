var listID = 0;
var taskLists = [];

function Task(task, taskID, listID) {
  this.complete = "incomplete";
  this.toDo = task;
  this.pid = listID.toString() + "-" + taskID.toString();
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
  taskLists.push(this);
}

List.prototype.addTask = function(task) {
  var myTask = new Task(task, this.taskID, this.pid)
  this.list.push(myTask);
  this.taskID++;
  this.update(myTask, $("#list" + this.pid));
}

List.prototype.instantiate = function(selector) {
  var theBasics = "<div class='list'><h3>" + this.name + "</h3><ul id='list" + this.pid + "'></ul>"
  theBasics += "<form id='form" + this.pid + "' class='list-form'><div class='form-group'><label>Enter New Task:<input class='form-control' id='input" + this.pid + "'></label></div><button type=submit>Submit</button>";
  theBasics += "</div>";
  selector.append(theBasics);
  attachSubmitListener(this.pid);
  attachCompleteListener(this.pid);
}

List.prototype.update = function(task, selector) {
  selector.append(task.writeTask());
}

function attachCompleteListener(id) {
  $("#list" + id).on("click", "li", function(){
    this.classList.toggle("complete");
  });
}

function attachSubmitListener(id) {
  $(".list").on("submit", "#form" + id, function(event) {
    event.preventDefault();
    var id = parseInt(this.id.slice(4));
    var input = $("#input" + id).val();
    taskLists.forEach(function(list) {
      if(list.pid === id) {
        list.addTask(input);
      }
    });
  });
}

$(function() {
  $("#newList").submit(function(event){
    event.preventDefault();
    var tempListName = $("#newListInput").val();
    var tempList = new List(tempListName);
  });
  var basicList = new List("Default");
});
