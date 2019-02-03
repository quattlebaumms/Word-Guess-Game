var movieNames = [
  "CASABLANCA",
  "JAWS",
  "ALIEN",
  "PYSCHO",
  "TITANIC",
  "INCEPTION",
  "GLADIATOR",
  "AIRPLANE",
  "RENT",
  "SCARFACE",
  "CHOCOLAT",
  "CLOVERFIELD",
  "AVATAR",
];


var userGuess = [];
var movieWordIndex;
var lettersGuessed = [];
var remainingGuesses = 0;
var hasCompleted = false;
var wins = 0;
const maxChances = 11;


function resetGame() {
  remainingGuesses = maxChances;


  movieWordIndex = Math.floor(Math.random() * (movieNames.length));


  lettersGuessed = [];
  userGuess = [];


  for (var i = 0; i < movieNames[movieWordIndex].length; i++) {
    userGuess.push("_");
  }


  document.getElementById("pressKeyRestart").style.cssText = "display: none";
  document.getElementById("youWin").style.cssText = "display: none";
  document.getElementById("youLose").style.cssText = "display: none";


  resetDisplay();
};


function resetDisplay() {

  document.getElementById("allWins").innerText = wins;


  var userGuessText = "";
  for (var i = 0; i < userGuess.length; i++) {
    userGuessText += userGuess[i];
  }


  document.getElementById("currentWord").innerText = userGuessText;
  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("lettersGuessed").innerText = lettersGuessed;
};



function updateHangmanGame() {
  document.getElementById("hangmangame");
};


function evaluateGuess(letter) {
  var place = [];

  for (var i = 0; i < movieNames[movieWordIndex].length; i++) {
    if (movieNames[movieWordIndex][i] === letter) {
      place.push(i);
    }
  }

  if (place.length <= 0) {
    remainingGuesses--;
    updateHangmanGame();
  } else {
    for (var i = 0; i < place.length; i++) {
      userGuess[place[i]] = letter;
    }
  }
};

function checkWin() {
  if (userGuess.indexOf("_") === -1) {
    document.getElementById("youWin").style.cssText = "display: block";
    document.getElementById("pressKeyRestart").style.cssText = "display: block";
    wins++;
    hasCompleted = true;
  }
};

function checkLoss() {
  if (remainingGuesses <= 0) {
    document.getElementById("youLose").style.cssText = "display: block";
    document.getElementById("pressKeyRestart").style.cssText = "display:block";
    hasCompleted = true;
  }
}

function makeGuess(letter) {
  if (remainingGuesses > 0) {
    if (lettersGuessed.indexOf(letter) === -1) {
      lettersGuessed.push(letter);
      evaluateGuess(letter);
    }
  }
};
document.onkeyup = function (event) {
  if (hasCompleted) {
    resetGame();
    hasCompleted = false;
  } else {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      makeGuess(event.key.toUpperCase());
      resetDisplay();
      checkWin();
      checkLoss();
    }
  }
};