//global variables
var selection;
var corrAns = 0;
var incorrAns = 0;
var unAns = 0;
var currQues = 0;
var count = 15;
var intervalId;
var quiz = [
    {question: "Who shot Cyrus?",
    choices: ["The Warriors","The Turnbull ACs","The Orphans","The Rogues"],
    answer: "The Rogues",
    answerinArr: 3},
    {question: "Who was the original Warlord?",
    choices: ["Swan","Ajax","Cleon","Rembrant"],
    answer: "Cleon",
    answerinArr: 2},
    {question: "Where was the big conclave in the Bronx?",
    choices: ["Van Cortland Park","Central Park","Battery Park","Riverside Park"],
    answer: "Van Cortland Park",
    answerinArr: 0},
    {question: "Who wasn't invited to the big conclave",
    choices: ["The Turnbull ACs","The Orphans","The Moon Runners","The Baseball Furies"],
    answer: "The Orphans",
    answerinArr: 1},
    {question: "Who did the Warriors rumble with in Central Park?",
    choices: ["The Turnbull ACs","The Orphans","The Rogues","The Baseball Furies"],
    answer: "The Baseball Furies",
    answerinArr: 3}

]


$(document).ready(

function start(){
$("#start_button").click(function() {
$(this).hide();
pose();
})
});


function pose(){
    console.log(currQues);
    if (currQues<=quiz.length-1){
    $("#question").html(quiz[currQues].question);
    var choicesArr = quiz[currQues].choices;
    var buttonsArr = [];
    for (var i = 0; i < choicesArr.length; i++) {
        var button = $("<button>");
        button.text(choicesArr[i]);
        button.attr("data-id", i);
        $('#choices').append(button)};
    runTimer();
    $("#choices").on("click", "button", function(){
        console.log("clickeded")
        clearInterval(intervalId);
        var selection = $(this).attr("data-id");
        // console.log(selection);
        var index = parseInt(selection);

        if(index===quiz[currQues].answerinArr){
            right();
        } else {
            wrong()
            }
        })}
    
    else {
        tally();
        }
       
    }

//Rigt, Wrong, Pass
function timesUp(){
    unAns++;
    clearInterval(intervalId);
    $("#timer").empty();
    $("#choices").empty();
    $("#question").html("Too slow, turkey.  The answer was " + quiz[currQues].answer +".");
    console.log("increment timesUp")
    currQues++;
    count = 15;
    setTimeout(pose, 3000);
    $("#choices").off();
}
function right(){
    corrAns++;
    clearInterval(intervalId);
    $("#timer").empty();
    $("#choices").empty();
    $("#question").html("Looking good, Warriors! The answer was, in fact, " + quiz[currQues].answer +".");
    console.log("increment right")
    currQues++;
    count = 15;
    setTimeout(pose, 3000);
    $("#choices").off();
}   
function wrong(){
    incorrAns++;
    clearInterval(intervalId);
    $("#timer").empty();
    $("#choices").empty();
    $("#question").html("Sucka! The answer was " + quiz[currQues].answer +".");
    console.log("increment wrong")
    currQues++;
    count = 15;
    setTimeout(pose, 3000);
    $("#choices").off();
}

//timer functions   
function runTimer() {
    intervalId = setInterval(decrement, 1000);
    }
function decrement() {
    $("#timer").html("Time remaining: "+ count + " secs");
    count--;
    if (count === 0) {
        clearInterval(intervalId);
        timesUp()
      }
    }

    //score
function tally(){
    clearInterval(intervalId);
    $("#timer").html("You got " + corrAns + " answers correct.");
    $("#question").html("You got " + incorrAns + " answers incorrect.");
    $("#choices").html("You left " + unAns + " questions unanswered.");
    setTimeout(reset, 3000);
}

//game reset
function reset() {
    corrAns = 0;
    incorrAns = 0;
    unAns = 0;
    currQues = 0;
    $("#timer").empty();
    $("#choices").empty();
    $("#question").empty();
    $("#start_button").show()
    start();
}
