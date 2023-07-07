const leaderBoard = document.getElementById("leaderBoard-list");
const highScores = leaderboards.length;
const leaderboards = [];
function listHighScores() {
    console.log(leaderboards)
    for (var i = 0; i < leaderboards.length; i++) {
        const highScore = leaderboards[i];
        const li = document.createElement("li");
        li.textContent = highScore.initials + "Your score is " + score + " out of 100, with " + endTime + " seconds left. Enter your initials and click submit to save your score!";
        leaderBoard.appendChild(li);
    }
}
function store() {
    const storedHighScores = JSON.parse(localStorage.getItem("leaderboards"));
    if (storedHighScores != null) {
        leaderboards = storedHighScores;
    }
    listHighScores()
}
store()