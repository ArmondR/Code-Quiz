var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
];

var questionContainerEl = document.querySelector("#quizContainer");
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var scoreEl = document.querySelector("#scoreContainer");
var scoreBtn = document.querySelector("#save-score");
var scoreLi = document.querySelector("#scores");
var scoreFormEl = document.querySelector("#score-form");

var strtBtnEl = document.querySelector("#start");
var startEl = document.querySelector("#begin");



var questionIndex = 0;
var correctCount = 0;

var time = 20;
var intervalId;


 var endQuiz = function () {
   clearInterval(intervalId);
   //clearInterval(intervalId);
   questionContainerEl.style.display = "none";
   scoreEl.style.display = "flex";
   //var body = document.body;
  //body.innerHTML = "Game over, You scored " + correctCount;
  //saveScore();
 };


var saveScore = function () {

  //takes input value and puts it into an object with score
  var nameInput = document.querySelector("input[name='score-name']").value
  var score = {
    name: nameInput,
    score: correctCount
  }

  var userScore = JSON.parse(localStorage.getItem("userScore") || "[]");

  userScore.push(score);

  localStorage.setItem("userScore", JSON.stringify(userScore));
  return;

};


var updateTime = function () {
  time--;
  timerEl.innerHTML = "Remaining Time: " + time;
  if (time <= 0) {
    //document.innerHTML = "";
    //saveScore
    endQuiz();
  }
};

//Quiz controller
function renderQuestion() {

  // hide start elements then show questions
  strtBtnEl.style.display = "none";
  questionContainerEl.style.display = "block";

  // choose answer functionality
  optionListEl.addEventListener("click", chooseAnswer);


  if (time <= 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);

  questionEl.textContent = questions[questionIndex].question;

  optionListEl.textContent = "";
  questionResultEl.textContent = "";

  var choices = questions[questionIndex].choices;
  var choicesLength = choices.length;

  for (var i = 0; i < choicesLength; i++) {
    var answerChoicesEl = document.createElement("li");
    answerChoicesEl.textContent = choices[i];
    optionListEl.appendChild(answerChoicesEl);
  }
};

// generates next question
var nextQuestion = function () {
  questionIndex++
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
};

var chooseAnswer = function (event) {
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "CORRECT!";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time--;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000); // if answer incorrect; 2 sec penalty
};

// score submit btn
scoreBtn.addEventListener("click", function (event) {
  event.preventDefault();
  saveScore();
  //event.stopPropagation();

  var scoreListEl = document.createElement("li");
  var nameInput = document.querySelector("input[name='score-name']").value
  scoreListEl.className = "score-item";
  scoreListEl.textContent = nameInput;
  scoreLi.appendChild(scoreListEl);
  scoreFormEl.reset();
});



// Start Game
strtBtnEl.addEventListener("click", renderQuestion);

//renderQuestion();
//optionListEl.addEventListener("click", chooseAnswer);

