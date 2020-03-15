class task {
    desc;
    start = "0000";
    end = "2399";
    task(d, s, e){
        desc = d;
        start = s;
        end = e;
    }
    task(d){
        desc = d;
    }
}
class routine{
    board = [];
    appendTask(task){
        this.board.push(task);
    }
    removeLastTask(task){
        this.board.pop();
    }
}

var board = new routine();
function addTaskToDisplay(task){
    var htmlString = '<div class = "example-task">'+
    '<input class = "custom-tf description" value = "Breakfast"></input>'+
    'from'+
    '<input class = "custom-tf start" value = "9:00 am"></input>'+
    'to'+
    '<input class = "custom-tf end" value = "10:00 am"></input>'+
    '<button class = "custom-btn"> ENTER </button>'+
    '</div>';
    //htmlString.append();
    $(".routine").append(htmlString);
}
$(document).on('keyup',function(e) {
    if(e.which == 8){
        //backspace
        console.log("backspace");
    }
    if(e.which == 13) {
        //enter
        var d = $(".description").val();
        var s = $(".start").val();
        var e = $(".end").val();
        console.log("fetched vals", d, s, e);
        var myBoy = new task(d, s, e);
        board.appendTask(myBoy);
        addTaskToDisplay(myBoy);
        console.log('state of routine', board);
    }
});