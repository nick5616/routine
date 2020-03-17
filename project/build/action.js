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
/*
function customizeHeading(){

}
function customizePage(){
    customizeHeading();
}
*/
//customizePage();
var board = new routine();
function addTaskToDisplay(task){
    var html_string = '<div class = "current-task" tabindex = "0">'+
                        '<div class="row">'+
                            '<div class="col">'+
                                '<input class = "custom-tf description current-tf" value = "Breakfast"></input>'+
                            '</div>'+
                            '<div class="col">'+
                                '<input class = "custom-tf start current-tf" value = "9:00 am"></input>'+
                                'to'+
                                '<input class = "custom-tf end current-tf" value = "10:00 am"></input>'+
                            '</div>'+
                            '<div class = "col">'+
                                '<button class = "custom-div-btn"> <i class="fas fa-minus-circle"></i> Remove </button>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
    //$(".routine").append();
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



function insertTask(task){
    
}

function getCurrentTasks(){
    current = [];
}
$(document).ready(function(){
    /*$("input").change(function(){
        alert("The text has been changed.");
    });*/
    $(".heading-tf").change( function(){
        resizeHeadingField();
    });    
});

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
    alert(sHours + ":" + sMinutes);
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
    console.log("fetched vals", d, s, e);
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