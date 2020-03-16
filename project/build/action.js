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
$(".routine-heading").hide();
var board = new routine();
function addTaskToDisplay(task){
    var htmlString = '<div class = "task" tabindex = "0">'+
    '<input class = "custom-tf description" value = "'+task.desc+'"></input>'+
    'from'+
    '<input class = "custom-tf start" value = "'+task.start+'"></input>'+
    'to'+
    '<input class = "custom-tf end" value = "'+task.end+'"></input>'+
    '<button class = "custom-div-btn">Remove</button>'+
    '</div>';
    //htmlString.append();
    $(".routine").append(htmlString);
}

function hideUploadInfo(){
    $(".how-to-upload").hide();
}

function showUploadInfo(){
    $(".how-to-upload").show();
}

function removeFocussedContent(){
    //remove task
    $(".routine").children().is(":focus").remove();
    console.log("removed task. this is the new length", board.data.length);

    if(board.data.length == 0){
        showUploadInfo();
    }
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
        removeFocussedContent();
    }

    if(e.which == 13) {
        //enter
        //if($(".task").is(":focus") || $(".current-task").is(":focus")){
            
        //}
        console.log("enter key pressed");
        appendContent();
    }
});