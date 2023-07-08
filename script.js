var timerElement = document.getElementById("timer");
var leaderboards = [];
var quizQuestions = [
{
  question: "question 1",
  options: ["Right","Wrong","Wrong","Wrong"],
  answer: 0,
},
{
  question: "question 2",
  options: ["Wrong","Right","Wrong","Wrong"],
  answer: 1,
},
{
  question: "question 3",
  options: ["Wrong","Wrong","Wrong","Right"],
  answer: 3,
},
{
  question: "question 4",
  options: ["Wrong","Wrong","Right","Wrong"],
  answer: 2,
},
];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 100;
let timerInterval;
var endTime;
const startElement = document.getElementById("start-button");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitElement = document.getElementById("submit-button");
const textboxElement = document.getElementById("initials");



startElement.addEventListener("click", startButtonClicked);
submitElement.addEventListener("click", saveScore);
submitElement.style.display = "none";
textboxElement.style.display = "none";




function startButtonClicked() {
  setQuestion();
  startElement.style.display = "none";
  timerInterval = setInterval(updateTimer, 1000);
};


function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    endQuiz();
  }
};


function setQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  for (let i = 0; i < currentQuestion.options.length; i++) {
    var choice = document.createElement("li");
    choice.textContent = currentQuestion.options[i];
    choice.addEventListener("click", () => {
      checkAnswer(i);
    });
    optionsElement.appendChild(choice);
  };
};
function checkAnswer(answerIndex) {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  if (timeLeft <= 0){
    endQuiz();
  };
  if (answerIndex === currentQuestion.answer) {
    score++;
  } else {
    timeLeft -= 25;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    setQuestion();
  } else {
      endQuiz();
  }
};


function endQuiz() {
  clearInterval(timerInterval);
  endTime = timeLeft;
  timerElement.style.display = "none";
  optionsElement.style.display = "none";
  textboxElement.style.display = "block";
  submitElement.style.display = "block";
  questionElement.textContent = "Your score is " + score + " out of 100, with " + endTime + " seconds left. Enter your initials and click submit to save your score!";
};


function displayHighscore() {
  var storedHighScore = localStorage.getItem("leaderboards");
  if (storedHighScore) {
    score = parseInt(storedHighScore);
  }
  highScoreElement.textContent = score.toString();
}



function saveScore() {
  var initials = textboxElement.value;
  var totalScore = {
    Initials: initials,
    Score: score,
    Time: endTime
  };
  leaderboards.push(totalScore);
  // console.log(leaderboards);
  // console.log('Score:', timeLeft)
  if (timeLeft > score) {
    score = timeLeft;
    console.log("New High Score: ", score);
  }
  localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
};



function listHighScores() {
  console.log(leaderboards)
  for (var i = 0; i < leaderboards.length; i++) {
      var highScores = leaderboards[i];
      var li = document.createElement("li");
      li.textContent = highScores.Initials + " your score is " + highScores.Score + " out of 100";
      leaderBoard.appendChild(li);
  }
}
function displayHighscore() {
  var storedHighScores = JSON.parse(localStorage.getItem("leaderboards"));
  if (storedHighScores != null) {
      leaderboards = storedHighScores;
  }
  listHighScores()
}
displayHighscore()