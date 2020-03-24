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
    if(sentence.length == 0){
        console.log("empty sentence", sentence);
        return "";
    }
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
                //'<button class = "custom-div-btn" tabindex="0" id = "remove-button"> <i class="fas fa-minus-circle"></i> Remove </button>'+
                '<div class = "remove-instructions hidden">Press Backspace to Remove</div>'+
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
                    //'<button class = "custom-div-btn dynamic" tabindex="0" id = "remove-button"> <i class="fas fa-minus-circle"></i> Remove </button>'+
                    '<div class = "remove-instructions hidden">Press Backspace to Remove</div>'+    
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
    $(".paragraph").empty();
    $(".paragraph").text(generateParagraph());
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
    var colors = generateAnalogousColorScheme();
    //console.log("colors", colors);
    
    $("body").css("color", colorArrayToString(colors[0]));
    $(".custom-div-btn").css("border", "1px solid "+colorArrayToString(colors[0]));
    $(".current-task").css("border", "1px solid "+colorArrayToString(colors[0]));
    $(".current-tf").css("border-bottom", "2px solid "+colorArrayToString(colors[0]));
    $(".current-tf:focus").css("border", "2px dashed "+colorArrayToString(colors[0]));
    $(".dynamic").css("color", colorArrayToString(colors[0]));
    $("body").css("background", colorArrayToString(colors[1]));
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
    while(contrast_ratio(relative_luminance(color1), relative_luminance(color2)) < 4.5){
        //above 3 is wcag compliant
        color1 = generateRandomColor();
        //color2 = generateRandomColor();
    }
    return [color1, color2];
}
function rgb_to_hsl(rgb){
    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[2];
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    // Calculate hue
    // No difference
    if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
      
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;
  
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return [h, s, l];
  }
  function hsl_to_rgb(hsl){
    // Must be fractions of 1
    var h = hsl[0];
    var s = hsl[1];
    var l = hsl[2];
  
    s /= 100;
    l /= 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
  
    return [r, g, b];
  }
  function generateGreeting(){
    var time = getCurrentMilitaryTime();
    //var time = "0000";
    var timeInt = parseInt(time);
    var str = "";
    if(timeInt == 2400) timeInt = 0;
    //6 AM to 12 PM morning
    if(timeInt < 601){
      str = "Late night or early morning? ";
    }
    else if(timeInt < 1201){
      str = "Good morning! ";
    }
    else if(timeInt < 1800){
      str = "Good afternoon! ";
    }
    else{
      str = "Good evening! ";
    }
    return str;
  }
  function generateParagraph(){
    var time_info = "";
    var type = generateTimeType(getCurrentMilitaryTime());
    switch(type){
      case "day":
        time_info = "The background of the page is bright. ";
        break;
      case "change":
        time_info = "The background of the page is neither dark nor bright. ";
        break;
      case "night":
        time_info = "The background of the page is dark. ";
        break;
    }
    var num_tasks = "You have "+getAllTasks().length+" tasks on your routine, and "+getCurrentTasks().length + " right now. ";
    return generateGreeting() + time_info + num_tasks;
  }
  function generateTimeType(t){
    var type = "";
    if(t == "2400"){
      t = "0000";
    }
    if(parseInt(t) < 1200){
      console.log("AM");
      //AM
      if(t.startsWith("06")){
        //sunrise
        console.log("sunrise");
        type = "change";
      }
      else if(parseInt(t) > 659){
        //daytime
        type = "day";
      }
      else {
        //late night
        type = "night";
      }
    }
    else {
      //PM
      if(t.startsWith("18")){
        //sunset
        type = "change";
      }
      else if(parseInt(t) > 1859){
        //night time
        type = "night";
      }
      else {
        //day time
        type = "day";
      }
    }
    return type;
  }
  function generateBounds(t){
    var upper = 255
    var lower = 0;
    var type = generateTimeType(t);
    if(type == "day"){
      lower = 141;
      upper = 255;
    }
    else if(type == "change"){
      lower = 100;
      upper = 140;
    }
    else {
      lower = 0;
      upper = 99;
    }
    console.log("lower bound",lower);
    console.log("upper bound", upper);
    return [lower, upper];
  }
  function generateBackgroundColor(){
    /*
    Things to consider:
      time of day
    
    */
    
    
    var time = getCurrentMilitaryTime();
    
    //var time = "2000";
    [lower_bound, upper_bound] = generateBounds(time);
    var r, g, b;
    var colorArray = [r, g, b];
    for(var i = 0; i < colorArray.length; i++){
      colorArray[i] = Math.floor(Math.random() * (upper_bound - lower_bound)) + lower_bound;
    }
      
    return colorArray;
  }

function getAnalogousColor(hsl){
    console.log("color before hue shift", hsl);
    var oneOrZero = Math.round(Math.random());
    if(oneOrZero == 0){
        hsl[0] = (hsl[0] + 30);
        if(hsl[0] > 360) {
            hsl[0] -= 360;
        }
    }
    else {
        hsl[0] = (hsl[0] - 30);
        if(hsl[0] > 360) {
            hsl[0] -= 360;
        }
    }
    
    console.log("color after hue shift", hsl);
    return [hsl[0], hsl[1], hsl[2]];
  }
  
  function satisfactoryContrastRatio(rgbColor1, rgbColor2){
    return contrast_ratio(relative_luminance(rgbColor1), relative_luminance(rgbColor2)) >= 4.5;
  }
  function lightenColor(color){
    color[2] += 10;
    if(color[2] > 100) {
      color = 100;
    }
    return color;
  }
  function darkenColor(color){
    color[2] -= 10;
    if(color[2] < 0) {
      color = 0;
    }
    return color;
  }
  function generateAnalogousColorScheme(){
    //123, 20, 45
    var accessible = true;
    var background_color = generateBackgroundColor();
    console.log("background color rgb", background_color);
    var bg_color_hsl = rgb_to_hsl(background_color);
    console.log("background color hsl", bg_color_hsl);
    var analogous_color = getAnalogousColor(bg_color_hsl);
    //var analogous_color_rgb = hsl_to_rgb(analogous_color);
    while(!satisfactoryContrastRatio(hsl_to_rgb(analogous_color), background_color)){
      console.log("background lightness", bg_color_hsl[2]);
      console.log("color lightness", analogous_color);
      if(bg_color_hsl[2] < 50){
        console.log("lightening foreground");
        if(analogous_color[2] <= 90) analogous_color = lightenColor(analogous_color);
        else{
            console.log("NOT ACCESSIBLE??");
            analogous_color[2] = 100;
            var cr = contrast_ratio(relative_luminance(hsl_to_rgb(analogous_color)), relative_luminance(hsl_to_rgb(background_color)));
            console.log("contrast RATIO", cr)
            if(cr < 4.5) accessible = false;
            break;
        }
      }
      else {
        console.log("darkening foreground");
        if(analogous_color[2] > 10) analogous_color = darkenColor(analogous_color);
        else {
            console.log("NOT ACCESSIBLE??");
            analogous_color[2] = 0;
            var cr = contrast_ratio(relative_luminance(hsl_to_rgb(analogous_color)), relative_luminance(hsl_to_rgb(background_color)));
            console.log("contrast RATIO", cr);
            if(cr < 4.5) accessible = false;
            break;
        }
      }
    }
    console.log("hsl of complete foreground color", analogous_color);
    if(!accessible) return [[241, 166, 149], [119, 16, 49]];
    return [hsl_to_rgb(analogous_color), background_color];
  }
$(document).ready(function(){
    
    $("#now-tasks").removeClass("toggled-button");
    $("#all-tasks").addClass("toggled-button");
    $("#now-tasks").removeClass("prim");
    $("#all-tasks").addClass("prim");
    applyColorScheme();
    setInterval(function() {
        //console.log("time has passed");
        applyColorScheme();
        updateUI();
    }, 60 * 1000);

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
    $(document).on('click', '#add-button', ()=>{
        appendContent();
    });
    $(document).on('focus', '.task', ()=>{
        $(this).closest(".remove-instructions").removeClass("hidden");
    });
    $(document).on('blur', '.task', ()=>{
        $(this).closest(".remove-instructions").addClass("hidden");
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
    var t = new task(getNewTaskDescription(), toMilitaryTime(getNewTaskStart()), toMilitaryTime(getNewTaskEnd()));
    console.log("this is the task", t);
    return t;
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
    if(new_task.desc.length != 0){
        board.data.push(new_task);
        updateUI();
        clearAddTask();
    }
    
    
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
        if($("#add-button").is(":focus" || $("#description").is(":focus"))){
            //console.log("exectuting enter");
            appendContent();
        }
        //console.log("enter key pressed");
        
    }
});