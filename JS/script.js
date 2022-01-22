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

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var highScoreEl = document.querySelector("#highScore");

var questionIndex = 0;
var correctCount = 0;

var time= 20;
var intervalId;

var highScore = function() {
  var body = document.body;
  body.innerHTML = "Your Final Score is: " + correctCount;
  highScoreEl.innerHTML = "<button>Submit</button>";

  // var highScoreSubmit = document.createElement("div");
  // highScoreSubmit.className="submitForm";
  // var submitBtn = document.createElement("btn");
  // submitBtn.type= "submit";
  // submitBtn.innerHTML = "Submit";

  // highScoreSubmit.appendChild(submitBtn);
  // highScoreEl.appendChild(highScoreSubmit);

}

var endQuiz = function() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;
  highScore();
}

var updateTime = function() {
  time--;
  timerEl.textContent = time;
  if(time <=0) {
    endQuiz();
  }
}

function renderQuestion() {

  if (time == 0) {
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

var nextQuestion = function(){
  questionIndex++
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
};

var chooseAnswer = function(event){
  if(event.target.matches("li")) {
    var answer = event.target.textContent;
    if(answer === questions[questionIndex].answer){
      questionResultEl.textContent = "CORRECT!";
      correctCount++;
    }else {
      questionResultEl.textContent = "Incorrect";
      time--;
      timerEl.textContent = time;
    }
  }
setTimeout(nextQuestion, 2000);
};



renderQuestion();
optionListEl.addEventListener("click", chooseAnswer);

