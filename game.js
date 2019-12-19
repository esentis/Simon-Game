var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var seqStarted = false;
var level = 0;

$(document).on("keypress", function(event) {
  if (!seqStarted) {
    nextSequence();
    seqStarted = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).effect("shake");
  playSound(randomChosenColour);

}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {

  //Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over<br><br>Press any key to Restart");
    seqStarted=false;
    level=0;
    gamePattern = [];

  }

}

$(".btn").on("click", function(event) {
  if (seqStarted==true){
    var userChosenColour = event.target.id;
    playSound(userChosenColour);
    $("#" + userChosenColour).effect("shake");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});


// CHECK IF TWO ARRAYS ARE THE SAME
// var is_same = arr1.length == arr2.length && arr1.every(function(element, index) {
//     return element === arr2[index];
// });
// if (is_same){
//   alert("CONGRATS");
// }
// });
