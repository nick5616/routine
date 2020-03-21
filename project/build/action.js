class task {
    constructor(d, s, e){
        //console.log("invoked main constructor");
        this.desc = d;
        this.start = s;
        this.end = e;
    }
}
class routine {
    //data = [];
    constructor(){
        this.data = [];
    }
    appendTask(task){
        this.data.push(task);
    }
    removeLastTask(task){
        this.data.pop();
    }
}

var display_mode = "All";
function routineIsEmpty(){
    return $(".routine").is(":empty");
}
function relative_luminance(colorArray8Bit){
    var r, g, b;
    var l;
    var standard_red = colorArray8Bit[0]/255;
    var standard_green = colorArray8Bit[1]/255;
    var standard_blue = colorArray8Bit[2]/255; 
    //console.log("sR", standard_red);
    //console.log("sG", standard_green);
    //console.log("sB", standard_blue);
    ////console.log(standard_red);
    if(standard_red <= 0.03928){
      //console.log("path 1");
      r = standard_red/12.92;
    }
    else {
      
      r = Math.pow(((standard_red+0.055)/1.055), 2.4);
  
    }
  
    if(standard_green <= 0.03928){
      //console.log("path 1");
      g = standard_green/12.92;
    }
    else {
      g= Math.pow(((standard_green+0.055)/1.055), 2.4);
    }
  
    if(standard_blue <= 0.03928){
      //console.log("path 1");
      b = standard_blue/12.92;
    }
    else {
      b = Math.pow(((standard_blue+0.055)/1.055), 2.4);
    }
    //console.log("R", r);
    //console.log("G", g);
    //console.log("B", b);
    l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    //console.log("L", l);
    //console.log(typeof l);
    return l;
}

function generateRandomColor(){
    //console.log("generating primary color");
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    return [red, green, blue];
}

function colorArrayToString(array){
    return "rgb("+array[0]+","+array[1]+","+array[2]+")";
};

function generateBackgroundColor(){
    var sunrise = [255, 219, 0];
    var color_string = "background: linear-gradient(0deg, rgba(0,241,254,1) 0%, rgba(205,245,249,1) 100%)";
    var color_array = [0,241,254];
    
    return [color_string, color_array];
}
  
function generateColorScheme(){
    var background_color = generateBackgroundColor();
    var background_color_luminance = relative_luminance(background_color[1]);
    var color = generateRandomColor();
    //console.log("primary color's rel lum", relative_luminance(primar))
    while(Math.abs(relative_luminance(color) - background_color_luminance) < 0.5){
        //console.log("relative_luminance is", relative_luminance(color));
        color = generateRandomColor();
        //secondary_color = generateRandomColor();
    }
    console.log("relative_luminance is", relative_luminance(color));
    return [color, background_color[0]];
}
function setElemsPrimaryColor(){
    var primary_color = generateRandomColor();
    ////console.log("color: ",primary_color);
    $(".prim").css("background-color",primary_color);
}
function getCurrentMilitaryTime(){
    var date = new Date();
    return date.getHours().toString()+date.getMinutes().toString();
}
function getCapitalizedWord(string){ 
    var new_char = string[0].toUpperCase();
    var new_string = new_char + string.substring(1, string.length);
    ////console.log("new string", new_string);
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
        //console.log("timeless task");
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
        //console.log("task description", task.desc);
        var normal_task = '<div class = "task" tabindex = "0">'+
            '<div class="row">'+
                '<div class="col">'+
                    '<div class = "task-item dynamic">'+capitalizeSentence(task.desc)+'</div>'+
                '</div>'+
                '<div class="col">'+
                    '<div class = "task-item dynamic">'+toNormalTime(task.start)+'</div>'+
                '</div>to'+
                '<div class="col">'+
                    '<div class = "task-item dynamic">'+toNormalTime(task.end)+'</div>'+
                '</div>'+
                '<div class="col">'+
                    '<button class = "custom-div-btn dynamic" tabindex="0" id = "remove-button"> <i class="fas fa-minus-circle"></i> Remove </button>'+
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
    //console.log("input data sorted");
    //console.log("state of array", data);
    var html_string = '';
    //console.log("length of passed array", data.length);
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
    //console.log("name changed");
    var new_name = getCapitalizedWord($(".heading-tf").val());
    $(".heading-tf").val(new_name);
    var new_length = $(".heading-tf").val().length;
    //console.log("current text length:", new_length);
    $('.heading-tf').attr('size', new_length);
}

function getAllTasks(){
    return board.data;
}

function displayAllTasks(){
    display_mode = "All";
    $("#now-tasks").removeClass("toggled-button");
    $("#all-tasks").addClass("toggled-button");
    $("#now-tasks").removeClass("prim");
    $("#all-tasks").addClass("prim");
    updateUI();
}
function displayNowTasks(){
    display_mode = "Current";
    $("#now-tasks").addClass("toggled-button");
    $("#all-tasks").removeClass("toggled-button");
    $("#now-tasks").addClass("prim");
    $("#all-tasks").removeClass("prim");
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
        //console.log("current_method not selected");
    }
}
function inside(time, beginning, end){
    var t = parseInt(time);
    var b = parseInt(beginning);
    var e = parseInt(end);
    var bool = t <= e && t >= b;
    //console.log("happening now: "+bool);
    if(beginning == "0000" && end == "0000"){
        return true;
    }
    return bool;
}
function getCurrentTasks(){
    var current_tasks = [];
    var current_time = getCurrentMilitaryTime();
    //console.log("current military time", current_time);
    board.data.forEach((task)=>{
        if(inside(current_time, task.start, task.end)){
            current_tasks.push(task);
        }
    });
    return current_tasks;
}
function applyColorScheme(){
    var colors = generateTwoHighContrastColors();
    //console.log("colors", colors);
    
    $(".background").css("color", colorArrayToString(colors[0]));
    $(".dynamic").css("color", colorArrayToString(colors[0]));
    $(".background").css("background", colorArrayToString(colors[1]));
}
function contrast_ratio(lum1, lum2){
    var l1 = Math.max(lum1, lum2);
    var l2 = Math.min(lum1, lum2);
    var cr = (l1 + 0.05)/(l2 + 0.05);
    console.log(cr);
    return cr;
}

function generateTwoHighContrastColors(){
    var color1 = generateRandomColor();
    var color2 = generateRandomColor();
    while(contrast_ratio(relative_luminance(color1), relative_luminance(color2)) < 3){
        color1 = generateRandomColor();
        //color2 = generateRandomColor();
    }
    return [color1, color2];
}

$(document).ready(function(){
    if(routineIsEmpty) {
        hideTutorial();
    }
    
    $("#now-tasks").removeClass("toggled-button");
    $("#all-tasks").addClass("toggled-button");
    $("#now-tasks").removeClass("prim");
    $("#all-tasks").addClass("prim");
    applyColorScheme();
    setInterval(function() {
        //console.log("time has passed");
        updateUI();
    }, 5 * 1000);

    updateUI();
     // 60 * 1000 milsec
    /*$("input").change(function(){
        alert("The text has been changed.");
    });*/
    $(".heading-tf").change( function(){
        resizeHeadingField();
    });
    $("#now-tasks").click(()=>{
        //console.log("current tasks clicked");

        displayNowTasks();
    });
    $("#all-tasks").click(()=>{
        //console.log("all tasks clicked");

        displayAllTasks();
    });
    $(document).on('click', '#remove-button', ()=>{
        //console.log("remove button clicked");
        $(this).remove();
        //$(task).remove();
    });
    $(document).on('focus', '#remove-button', ()=>{
        //console.log("remove in focus");
        //add infocus class
        ////console.log("great grandparent", $(this).parent().parent().parent());
        //console.log($("#remove-button:focus").parent().parent().parent().html());
        $("#remove-button:focus").parent().parent().parent().remove();
    });
    $(document).on('focus', '#add-button', ()=>{
        
    });
    $(document).on('blur', '.task', ()=>{
        //console.log("remove blur");
        //add infocus class
        ////console.log("great grandparent", $(this).parent().parent().parent());
        //console.log($(".task:focus"));
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
    //console.log("removed task. this is the new length", board.data.length);

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
      //console.error("malformatted input");
    }
    var date = raw_date.substring(0, 2) + ":" + raw_date.substring(2, 4);
    ////console.log("date", date);
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
        //console.log("backspace");
        
        if($(".task").is(":focus")){
            removeFocussedContent();
        }
    }

    if(e.which == 13) {
        //enter
        if($(".current-task").is(":focus" || $("#description").is(":focus"))){
            //console.log("exectuting enter");
            appendContent();
        }
        //console.log("enter key pressed");
        
    }
});