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

var board = new routine();
function addTaskToDisplay(task){
    var htmlString = '<div class = "task">'+
    '<input class = "custom-tf description" value = "'+task.desc+'"></input>'+
    'from'+
    '<input class = "custom-tf start" value = "'+task.start+'"></input>'+
    'to'+
    '<input class = "custom-tf end" value = "'+task.end+'"></input>'+
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

$(document).on('keyup', function(e) {
    if(e.which == 8){
        //backspace
        console.log("backspace");
        //remove task
        $(".routine").children().last().remove();
        console.log("removed task. this is the new length", board.data.length);
        if(board.data.length < 1){
            showUploadInfo();
        }
    }
    if(e.which == 13) {
        //enter
        
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
        }
        console.log('state of routine', board);
    }
});