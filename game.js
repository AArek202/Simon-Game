
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

var score = 0;

var highScore = 0;

var heighstScore =[];

$("#start").click(function(){

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence(){

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

};

function playSound(name){

    var audio1 = new Audio("sounds/" + name + ".mp3");
  audio1.play();

};

function animatePress(currentColour){

  $("#" + currentColour).addClass(".pressed");

  setTimeout(function() {
     $("#" + currentColour).addClass(".pressed");
  }, 100);

};

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (gamePattern.length === userClickedPattern.length){

      setTimeout(function(){
        
        nextSequence()
      },1000);

        myScore();

    };

  } else {

      var audio2 = new Audio("sounds/wrong.mp3");
      audio2.play();

      $("body").addClass("game-over");

      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Start to Play Again");

      $(".startbtn").click(startOver);

      scoreCheck();
      
  }

};


function myScore(){
  score+=100;
  $(".cscore").text(score);
};

function scoreCheck(){

  if (score > highScore) {
    
      highScore = score;
      heighstScore.push(highScore);
      $(".hscore").text(highScore);

  };
  
};

function startOver(){
  level=0;
  gamePattern = [];
  started = false;
  score = 0;
};
