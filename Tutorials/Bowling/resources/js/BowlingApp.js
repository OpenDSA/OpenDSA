/**
 * Requires BowlingGame object from BowlingGame.js
 */
var game = new BowlingGame();

function rollMany(n, pins) {
    while (n--) {
        game.roll(pins);
    }
}

function test() {
    if (game.currentRoll > 20) {
        alert("Game complete, please click reset");
        return;
    }
    var roll = document.getElementById('rollValue').value;
    roll = parseInt(roll, 10);
    game.roll(roll);
    document.getElementById("testsrun").innerText = "Number of balls thrown: " + game.currentRoll;


    getCodeCoverage();
    logTestCase();
    console.log(currentScore());
    console.log(game.codeCovered);
}

function logTestCase() {
    var testCaseHistory = document.getElementById("testHistory");
    testCaseHistory.innerHTML = testCaseHistory.innerHTML + "Throw " + game.currentRoll + ": ";
    testCaseHistory.innerHTML = testCaseHistory.innerHTML + document.getElementById('rollValue').value + " pins hit."
    testCaseHistory.innerHTML = testCaseHistory.innerHTML + "\n ";
}

function currentScore() {
    var tempGame = $.extend(true, {}, game);
    var rollsLeft = 21 - tempGame.currentRoll;
    while (rollsLeft--) {
        tempGame.roll(0);
    }
    var score = tempGame.score();
    document.getElementById("score").innerText = "Score: " + score;

    return score;
    delete tempGame;
}

function getCodeCoverage() {
    var codeCoverageP = game.getCodeCovered();
    document.getElementById("codeCoverageBar").style = "width:" + codeCoverageP + "%";
    document.getElementById("codeCoveragePercentage").innerText = codeCoverageP.toFixed(2) + "%";
}

reset = false;
function resetClicked() {
    reset = true;
}

window.onbeforeunload = function() {
    if (!reset) {
        return "Data will be lost if you leave the page, are you sure?";
    }
};