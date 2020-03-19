class task {
    constructor(d, s, e){
        console.log("invoked main constructor");
        this.desc = d;
        this.start = s;
        this.end = e;
    }
}
class routine{
    
    data = [];
    appendTask(task){
        this.data.push(task);
    }
    removeLastTask(task){
        this.data.pop();
    }
}
var display_mode = "All";

setInterval(function() {
    console.log("time has passed");
    updateUI();
}, 5 * 1000);


function routineIsEmpty(){
    return $(".routine").is(":empty");
}
function getCurrentMilitaryTime(){
    var date = new Date();
    return date.getHours().toString()+date.getMinutes().toString();
}
function getCapitalizedWord(string){ 
    var new_char = string[0].toUpperCase();
    var new_string = new_char + string.substring(1, string.length);
    console.log("new string", new_string);
    return new_string;
}
function capitalizeSentence(sentence){
    var words = sentence.split(" ");
    var new_words = [];
    words.forEach((current_word)=>{
        new_words.push(getCapitalizedWord(current_word));
    })
    return new_words.join(" ");
}
/*
function customizeHeading(){

}
function customizePage(){
    customizeHeading();
}
*/
//customizePage();
one = new task("brush teeth", "2248", "2250");
two = new task("shower", "2249", "2300");
three = new task("eat crayon", "0002", "1200");
var board = new routine();
//board.data.push(one);
//board.data.push(two);
//board.data.push(three);
function addTaskToDisplay(task){
    if(task.start == "0000" && task.end == "0000"){
        console.log("timeless task");
        var timeless_task = '<div class = "task" tabindex = "0">'+
        '<div class="row">'+
            '<div class="col">'+
                '<div class = "task-item">'+capitalizeSentence(task.desc)+'</div>'+
            '</div>'+
            '<div class="col">'+
                '<div class = "task-item">All Day</div>'+
            '</div>'+
            '<div class="col">'+
                '<div class = "task-item"></div>'+
            '</div>'+
            '<div class="col">'+
                '<button class = "custom-div-btn" tabindex="0" id = "remove-button"> <i class="fas fa-minus-circle"></i> Remove </button>'+
            '</div>'+
        '</div>'+
        '</div>';
        $(".routine").append(timeless_task);
    }
    else{
        console.log("task description", task.desc);
        var normal_task = '<div class = "task" tabindex = "0">'+
            '<div class="row">'+
                '<div class="col">'+
                    '<div class = "task-item">'+capitalizeSentence(task.desc)+'</div>'+
                '</div>'+
                '<div class="col">'+
                    '<div class = "task-item">'+toNormalTime(task.start)+'</div>'+
                '</div>to'+
                '<div class="col">'+
                    '<div class = "task-item">'+toNormalTime(task.end)+'</div>'+
                '</div>'+
                '<div class="col">'+
                    '<button class = "custom-div-btn" tabindex="0" id = "remove-button"> <i class="fas fa-minus-circle"></i> Remove </button>'+
                '</div>'+
            '</div>'+
        '</div>';
        $(".routine").append(normal_task);
    }    
}
function earliest_start(e1, e2){
    return e1.start - e2.start;
}
function addRoutineToDisplay(data){
    data.sort(earliest_start);
    console.log("input data sorted");
    console.log("state of array", data);
    var html_string = '';
    console.log("length of passed array", data.length);
    //clearDisplay();
    if(data.length < 1){
        html_string = '<h3 style = "text-align: center">Your Tasks Will Appear Here</h3>';
        $(".routine").append(html_string);
    }
    else {
        //geq 1
        data.forEach((task)=>{
            addTaskToDisplay(task);
        });
    }
}
function clearDisplay(){
    $(".routine").empty();
}
function hideTutorial(){
    $(".tutorial-heading").hide();
}
function showTutorial(){
    $(".tutorial-heading").show();
}
//resizeHeadingField();
function resizeHeadingField(){
    console.log("name changed");
    var new_name = getCapitalizedWord($(".heading-tf").val());
    $(".heading-tf").val(new_name);
    var new_length = $(".heading-tf").val().length;
    console.log("current text length:", new_length);
    $('.heading-tf').attr('size', new_length);
}

function getAllTasks(){
    return board.data;
}

function displayAllTasks(){
    display_mode = "All";
    updateUI();
}
function displayNowTasks(){
    display_mode = "Current";
    updateUI();
}

function insertTask(task){
    //insert the task in the right spot
    
}

function updateUI(){
    clearDisplay();
    if(display_mode == "All"){
        $(".routine").append("<h2>All Tasks</h2>");
        addRoutineToDisplay(board.data);
    }
    else if(display_mode == "Current"){
        $(".routine").append("<h2>Current Tasks</h2>");
        addRoutineToDisplay(getCurrentTasks());
    }
    else {
        console.log("current_method not selected");
    }
}
function inside(time, beginning, end){
    var t = parseInt(time);
    var b = parseInt(beginning);
    var e = parseInt(end);
    var bool = t <= e && t >= b;
    console.log("happening now: "+bool);
    return bool;
}
function getCurrentTasks(){
    var current_tasks = [];
    var current_time = getCurrentMilitaryTime();
    console.log("current military time", current_time);
    board.data.forEach((task)=>{
        if(inside(current_time, task.start, task.end)){
            current_tasks.push(task);
        }
    });
    return current_tasks;
}


$(document).ready(function(){
    if(routineIsEmpty) {
        hideTutorial();
    }
    updateUI();
     // 60 * 1000 milsec
    /*$("input").change(function(){
        alert("The text has been changed.");
    });*/
    $(".heading-tf").change( function(){
        resizeHeadingField();
    });
    $("#now-tasks").click(()=>{
        console.log("current tasks clicked");

        displayNowTasks();
    });
    $("#all-tasks").click(()=>{
        console.log("all tasks clicked");

        displayAllTasks();
    });
    $(document).on('click', '#remove-button', ()=>{
        console.log("remove button clicked");
        $(this).remove();
        //$(task).remove();
    });
    $(document).on('focus', '#remove-button', ()=>{
        console.log("remove in focus");
        //add infocus class
        //console.log("great grandparent", $(this).parent().parent().parent());
        console.log($("#remove-button:focus").parent().parent().parent().html());
        $("#remove-button:focus").parent().parent().parent().remove();
    });
    $(document).on('focus', '#add-button', ()=>{
        
    });
    $(document).on('blur', '.task', ()=>{
        console.log("remove blur");
        //add infocus class
        //console.log("great grandparent", $(this).parent().parent().parent());
        console.log($(".task:focus"));
    });
        
});
function getNewTaskDescription(){
    return $("#description").val();
}
function getNewTaskStart(){
    return $("#start").val();
}
function getNewTaskEnd(){
    return $("#end").val();
}
function getNewTask(){
    return new task(getNewTaskDescription(), toMilitaryTime(getNewTaskStart()), toMilitaryTime(getNewTaskEnd()));
}
function clearAddTask(){
    $("#description").val("");
    $("#start").val("");
    $("#end").val("");
}
function hideUploadInfo(){
    $(".how-to-upload").hide();
}

function showUploadInfo(){
    $(".how-to-upload").show();
}
function removeTaskFromRoutineArray(){

}

function removeFocussedContent(){
    //remove task
    var description = $("#description:focus").val();
    $(".task:focus").remove();
    removeTaskFromRoutineArray();
    console.log("removed task. this is the new length", board.data.length);

    if(board.data.length == 0){
        showUploadInfo();
    }
}

function toMilitaryTime(time){
    if(time.length == 0){
        return "0000";
    }
    //var time = $("#starttime").val();
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if(AMPM == "PM" && hours<12) hours = hours+12;
    if(AMPM == "AM" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    //alert(sHours + ":" + sMinutes);
    return sHours+sMinutes;
}

function toNormalTime(raw_date) {
    //raw_date: 1300
    //date: 13:00:00
    //returned: 1:00 PM
    //relies on raw_date always being 4 long
    if(raw_date.length != 4){
      console.error("malformatted input");
    }
    var date = raw_date.substring(0, 2) + ":" + raw_date.substring(2, 4);
    //console.log("date", date);
    //added an hour and minute separator
    date = date + ":00";
    date = "April 27, 2017 "+date;
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
      h = hh - 12;
      dd = "PM";
    }
    if (h == 0) {
      h = 12;
    }
    m = m < 10 ? "0" + m : m;
  
    s = s < 10 ? "0" + s : s;
  
    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */
  
    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
  
    var replacement = h + ":" + m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " " + dd;
    var big_date = date.replace(pattern, replacement);
    var split_date = big_date.split(" ");
    return split_date[3] + ' ' + split_date[4];
  }

function hideTutorialHeading(){
    $(".tutorial-heading").hide();
}

function showRoutineHeading(){
    $(".routine-heading").show();
}
function appendContent(){
    //to do: replace this with insert task and do a variant of insertion sort
    var new_task = getNewTask();
    board.data.push(new_task);
    updateUI();
    clearAddTask();
}

$(document).on('keyup', function(e) {
    if(e.which == 8){
        //backspace
        console.log("backspace");
        
        if($(".task").is(":focus")){
            removeFocussedContent();
        }
    }

    if(e.which == 13) {
        //enter
        if($(".current-task").is(":focus")){
            appendContent();
        }
        console.log("enter key pressed");
        
    }
});