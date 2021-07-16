var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var flag = false;

var count = 0;

$(document).keypress(function() {

  if (flag == false) {
    changeHeading();
    nextSequence();
    flag = true;
  }

});

$(".btn").click(function(event) {

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {

  console.log(currentLevel);
  console.log("gamePattern " + gamePattern);
  console.log("userClickedPattern " + userClickedPattern);


  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();

  }

}

function nextSequence() {

  changeHeading();

  userClickedPattern = [];


  var randomNumber = Math.floor(Math.random() * 4);
  //console.log(randomNumber);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  animatePress(randomChosenColor);

  playSound(randomChosenColor);

  //$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

}

function playSound(color) {
  var colorAudio = new Audio("sounds/" + color + ".mp3");
  colorAudio.play();
}

function animatePress(currentColor) {

  randomButton = $("div #" + currentColor);

  randomButton.addClass("pressed");

  setTimeout(function() {
    randomButton.removeClass("pressed");
  }, 100);
}

function changeHeading() {
  $("h1").text("Level " + count);
  count++;
}

function startOver() {
  gamePattern = [];
  flag = false;
  count = 0;
}
