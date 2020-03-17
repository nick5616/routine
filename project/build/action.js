class task {
    desc;
    start = "0000";
    end = "2399";
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
one = new task("brush teeth", "0000", "1200");
two = new task("shower", "0001", "1200");
three = new task("eat crayon", "0002", "1200");
var board = new routine();
board.data.push(one);
board.data.push(two);
board.data.push(three);
function addTaskToDisplay(task){
    var html_string = '<div class = "task" tabindex = "0">'+
                        '<div class="row">'+
                            '<div class="col">'+
                                '<input class = "custom-tf description" value = "'+capitalizeSentence(task.desc)+'"></input>'+
                            '</div>'+
                            '<div class="col">'+
                                '<input class = "custom-tf start" value = "'+toNormalTime(task.start)+'"></input>'+
                                'to'+
                                '<input class = "custom-tf end" value = "'+toNormalTime(task.end)+'"></input>'+
                            '</div>'+
                            '<div class = "col">'+
                                '<button class = "custom-div-btn" id = "remove-button"> <i class="fas fa-minus-circle"></i> Remove </button>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
    $(".routine").append(html_string);
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
    console.log("gonna display all the tasks");
    getAllTasks().forEach((current_task)=>{
        console.log("current task", current_task);
        addTaskToDisplay(current_task);
    });
        
    
}


function insertTask(task){
    //insert the task in the right spot
    
}

function updateUI(){
    var current_method = "All";
    if(current_method == "All"){
        if(getAllTasks().length > 0){
            hideTutorial();
        }
        else {
            showTutorial();
        }
    }
    else if(current_method == "Current"){
        hideTutorial();
        if(getCurrentTasks().length < 1){
            $(".routine").append("You don't appear to have any tasks right now");
        }
    }
    else {
        console.log("current_method not selected");
    }
}

function getCurrentTasks(){
    current = [];
}

function displayCurrentTasks(){

}

$(document).ready(function(){
    /*$("input").change(function(){
        alert("The text has been changed.");
    });*/
    $(".heading-tf").change( function(){
        resizeHeadingField();
    });
    $("#all-tasks").click(()=>{
        console.log("all tasks clicked");
        displayAllTasks();
    });
    $(document).on('click', $("#remove-button"), ()=>{
        console.log("remove button clicked");
        $(this).remove();
        //$(task).remove();
    });
    
        
});
function getDescription(task){
    var description = $(task).child;
}
function hideUploadInfo(){
    $(".how-to-upload").hide();
}

function showUploadInfo(){
    $(".how-to-upload").show();
}

function removeFocussedContent(){
    //remove task
    var children = $(".routine").children();
    
    console.log("removed task. this is the new length", board.data.length);

    if(board.data.length == 0){
        showUploadInfo();
    }
}

function toMilitaryTime(){
    var time = $("#starttime").val();
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
    console.log("a task has focus");
    var d = $(".description").val();
    var s = $(".start").val();
    var e = $(".end").val();
    console.log("fetched vals", d, s.toMilitaryTime(), e.toMilitaryTime());
    var myBoy = new task(d, s, e);
    console.log("created task", myBoy);
    board.appendTask(myBoy);
    addTaskToDisplay(myBoy);
    console.log("board.length", board.data.length);
    if(board.data.length > 0) {
        console.log("gonna hide it")
        hideUploadInfo();
        hideTutorialHeading();
        showRoutineHeading();
    }
    console.log('state of routine', board);
}

$(document).on('keyup', function(e) {
    if(e.which == 8){
        //backspace
        console.log("backspace");
        
        if($(".task").is(":focus") || $(".current-task").is(":focus")){
            removeFocussedContent();
        }
    }

    if(e.which == 13) {
        //enter
        if($(".task").is(":focus") || $(".current-task").is(":focus")){
            appendContent();
        }
        console.log("enter key pressed");
        
    }
});