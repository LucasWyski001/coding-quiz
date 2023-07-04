const quizQuestions = [
    {
        question: "Question 1",
        choices :["Option A", "Option B", "Option C", "Option D"],
        answer: 3
    },
    {
        question: "Question 2",
        choices : ["Option A", "Option B", "Option C", "Option D"],
        answer: 2
    },
    {
        question: "Question 3",
        choices : ["Option A", "Option B", "Option C", "Option D"],
        answer: 0
    },
    {
        question: "Question 4",
        choices : ["Option A", "Option B", "Option C", "Option D"],
        answer: 1
    }
]

// variables for the test
let currentQuestion = 0;
let time = 60;
let timerInterval;
let score = 0;

const startButton = document.getElementById("start");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("multipleChoice");
const submitButton = document.getElementById("submit-btn");
const initialsInput = document.getElementById("initials");

// This event listener will start the quiz
startButton.addEventListener("click", startQuiz);
// This function is what actually makes the quiz application run
function startQuiz(){
    startButton.style.display = "none";
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion();
}

// This function will make the questions work 
function displayQuestion() {
    const currentQuizData = quizQuestions[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    optionsElement.innerHTML = "";

    for (let i = 0; i < currentQuizData.choices.length; i++) {
        const option = document.createElement("li");
        option.textContent = String.fromCharCode(65 + i) + ". " + currentQuizData.choices[i];
        option.addEventListener("click", () => checkAnswer(i));
        optionsElement.appendChild(option);
    }
}

// This loop goes through the answers to check wether the answers are right or wrong
// if the answer is wrong it will deduct 10 seconds from the user (thus giving them more stress to finish)
function checkAnswer(answerIndex){
    const currentQuizData = quizQuestions[currentQuestion];

    if (answerIndex === currentQuizData.answer) {
        if (currentQuestion < quizQuestions.length -1){
            currentQuestion++;
            displayQuestion();
        } else{
            endQuiz();
        }
    } else{
        time -= 10;
    }
    saveScore();
}



function updateTimer(){
    time--;
    if (time <= 0){
        endQuiz();
    }
    timer.textContent = time;
}


// this function will end the quiz of the application
function endQuiz() {
    clearInterval(timerInterval);
    timer.style.display = "none";
    questionElement.innerText = "Completed Quiz!";
    optionsElement.innerHTML = "";
    initialsInput.style.display = "block";
    submitButton.style.display = "block";
}

function displayHighscore() {
    const storedHighScore = localStorage.getItem("HighScore");
    if (storedHighScore){
        highScore = parseInt(storedHighScore);
    }

    const highScoreElement = document.getElementById("high-score");
    highScoreElement.textContent = highScore.toString();
}



// this section will save score and take initials
submitButton.addEventListener("click", saveScore);

function saveScore(){
    const initials = initialsInput.value;
    console.log("Initials:", initials);
    console.log("Score:", time);

    if (time > highscore){
        highscore = time;
        console.log("New high score:", highscore)
    }
}