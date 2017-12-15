/**
 * Requires BowlingGame object from BowlingGame.js
 */
var game = new BowlingGame();

/**
 * Main function.  This is called when the 'Roll' button is clicked.
 */
function main() {
    if (game.currentRoll > 20) {
        var message = "Game over!  Please click reset to try again!"
        testCaseHistory.innerHTML = message + testCaseHistory.innerHTML; 
        return;
    }
    var roll = document.getElementById('rollValue').value;
    var allowedValues = new RegExp('^[\-]?[0-9a-zA-Z]+$');
    if (!roll.match(allowedValues)) {
        //Checks the same code coverage section as the isNaN() check
        //in BowlingGame.js
        game.codeCovered[7] = true;
        var testCaseHistory = document.getElementById("testHistory");        
        var message = document.getElementById('rollValue').value + " pins hit" + 
        " *Invalid roll, not counted to score but does execute code coverage. \n";
        testCaseHistory.innerHTML = message + testCaseHistory.innerHTML; 
        getCodeCoverage();
        return;
    }

    roll = parseInt(roll, 10);
    document.getElementById("triangleType").innerText = "";

    //This code block executes if the roll qualifies for one of the "bugs" defined in BowlingGame.bugs()
    if (!game.roll(roll)) {
        var testCaseHistory = document.getElementById("testHistory");        
        var message = document.getElementById('rollValue').value + " pins hit" + 
        " *Invalid roll, not counted to score but does execute code coverage. \n";
        testCaseHistory.innerHTML = message + testCaseHistory.innerHTML; 
        getCodeCoverage();
        return;
    }
    //This code handles the proper symbols to put in the score table
    if (!game.gameOver) {
        var currentFrameBox = document.getElementById("roll" + (game.frameIndex));
        if (currentFrameBox.innerHTML != "") {
            if (game.rolls[game.currentRoll - 1] == 10) {
                currentFrameBox.innerHTML = currentFrameBox.innerHTML + 'X';
            }else if (game.rolls[game.currentRoll - 1] + game.rolls[game.currentRoll - 2] == 10
                && game.rollIndex <= 2) {
                currentFrameBox.innerHTML = currentFrameBox.innerHTML + " /";
            }else {
                if (game.rollIndex != 3){currentFrameBox.innerHTML = currentFrameBox.innerHTML + "-";}
                currentFrameBox.innerHTML = currentFrameBox.innerHTML + game.rolls[game.currentRoll - 1];        
            }
        }
        else {
            if (game.rolls[game.currentRoll - 1] == 10) {
                currentFrameBox.innerHTML = 'X';
            } else {
                currentFrameBox.innerHTML = currentFrameBox.innerHTML + game.rolls[game.currentRoll - 1];        
            }
        }
        
    }
    game.score();
    document.getElementById("testsrun").innerText = "Number of balls thrown: " + game.currentRoll;
    currentScore();
    getCodeCoverage();
    logTestCase();
}

/**
 * Writes the results of each roll to the output
 */
function logTestCase() {
    var testCaseHistory = document.getElementById("testHistory");
    var message = "Throw " + game.currentRoll + ": " + document.getElementById('rollValue').value + " pins hit.\n";
    testCaseHistory.innerHTML = message + testCaseHistory.innerHTML;
}

/**
 * gets the current score by duplicating the current game object
 * and simulating enough rolls to finish the game and get a correct score.
 */
function currentScore() {
    var tempGame = $.extend(true, {}, game);
    var rollsLeft = 21 - tempGame.currentRoll;
    while (rollsLeft--) {
        tempGame.roll(0);
    }
    var score = tempGame.score();
    document.getElementById("score").innerText = score;
    console.log("frame index: " + game.frameIndex + " roll index: " + game.rollIndex)
    delete tempGame;
    return score;
}

/**
 * Sets the code coverage bar.
 */
function getCodeCoverage() {
    var codeCoverageP = game.getCodeCovered();
    document.getElementById("codeCoverageBar").style = "width:" + codeCoverageP + "%";
    document.getElementById("codeCoveragePercentage").innerText = codeCoverageP.toFixed(2) + "%";
}


/**
 * the following code is meant to prevent accidental refreshes
 */
reset = false;
function resetClicked() {
    reset = true;
}

window.onbeforeunload = function() {
    if (!reset) {
        return "Data will be lost if you leave the page, are you sure?";
    }
};