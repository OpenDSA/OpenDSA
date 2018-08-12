"use strict";
/*global alert: true, ODSA */
$(document).ready(function () {

/**
 * Requires BowlingGame object from BowlingGame.js
 */
var game = new BowlingGame();
var threshold = 74;
var creditStatus = false;
var config = ODSA.UTILS.loadConfig(),
    interpret = config.interpreter,
    av = new JSAV("ssperform", {"animationMode": "none"});
/**
 * Main function.  This is called when the 'Roll' button is clicked.
 */
function main() {
    var roll = document.getElementById('rollValue').value;
    var allowedValues = new RegExp('^[\-]?[0-9a-zA-Z]+$');

    var initData = {};
    initData.user_roll = roll;
    ODSA.AV.logExerciseInit(initData);

    if (!roll.match(allowedValues)) {
        //Checks the same code coverage section as the isNaN() check
        //in BowlingGame.js
        game.codeCovered[7] = true;       
        var message = roll + " pins hit" + 
        " *Invalid roll, not counted to score but does execute code coverage. \n";
        av.umsg(message + "\n"); 
        var coverage = game.getCodeCovered();
    	if(!creditStatus && (coverage >= threshold)){
        	ODSA.AV.awardCompletionCredit();
        	creditStatus = true;
        	av.umsg(interpret("av_c1"));
    	}
    	getCodeCoverage();
        return;
    }
    

    roll = parseInt(roll, 10);
    //document.getElementById("triangleType").innerText = "";

    //This code block executes if the roll qualifies for one of the "bugs" defined in BowlingGame.bugs()
    if (!game.roll(roll)) {       
        var message = roll + " pins hit" + 
        " *Invalid roll, not counted to score but does execute code coverage. \n";
        av.umsg(message + "\n"); 
        var coverage = game.getCodeCovered();
    	if(!creditStatus && (coverage >= threshold)){
        	ODSA.AV.awardCompletionCredit();
        	creditStatus = true;
        	av.umsg(interpret("av_c1"));
    	}
    	getCodeCoverage();
        return;
    }
    //This code handles the proper symbols to put in the score table
    var type = "";
    if (!game.gameOver) {
        var currentFrameBox = document.getElementById("roll" + (game.frameIndex));
        if (currentFrameBox.innerHTML != "") {
            if (game.rolls[game.currentRoll - 1] == 10) {
                currentFrameBox.innerHTML = currentFrameBox.innerHTML + 'X';
                type = "strike";
            }else if (game.rolls[game.currentRoll - 1] + game.rolls[game.currentRoll - 2] == 10
                && game.rollIndex <= 2) {
                currentFrameBox.innerHTML = currentFrameBox.innerHTML + " /";
                type = "spare";
            }else {
                if (game.rollIndex != 3){currentFrameBox.innerHTML = currentFrameBox.innerHTML + "-";}
                currentFrameBox.innerHTML = currentFrameBox.innerHTML + game.rolls[game.currentRoll - 1];        
            }
        }
        else {
            if (game.rolls[game.currentRoll - 1] == 10) {
                currentFrameBox.innerHTML = 'X';
                type = "strike";
            } else {
                currentFrameBox.innerHTML = currentFrameBox.innerHTML + game.rolls[game.currentRoll - 1];        
            }
        }
        
    }

    var coverage = game.getCodeCovered();
    if(!creditStatus && (coverage >= threshold)){
        ODSA.AV.awardCompletionCredit();
        creditStatus = true;
        av.umsg(interpret("av_c1"));
    }
    getCodeCoverage();

    game.score();
    document.getElementById("testsrun").innerText = "Number of balls thrown: " + game.currentRoll;
    currentScore();
    getCodeCoverage();
    logTestCase(type);
    if(game.frameIndex == 10){
    	var checkSpare = (game.rolls[game.currentRoll - 2] + game.rolls[game.currentRoll - 1] != 10);
    	var checkStrike = (game.rolls[game.currentRoll - 2] + game.rolls[game.currentRoll - 1] != 20);
    	//twoRollsIn10th: The game will end if player in the 10th frame index
    	//and didn't get either strike or sphare in the 
    	//first two roll.
    	var twoRollsIn10th = game.rollIndex == 3 && checkSpare && checkStrike;
    	//threeRollsIn10th: The game will end if player in the 10th frame index
    	//and finish three rolls.
		var threeRollsIn10th = game.rollIndex == 4;
		//Game over if it satisfy either "twoRollsIn10th" or "threeRollsIn10th"
    	if(twoRollsIn10th || threeRollsIn10th){
        	var message = "Game over!  Please click reset to try again!"
        	av.umsg(message + "\n"); 
        }
    }
}

/**
 * Writes the results of each roll to the output
 */
function logTestCase(type) {
    var message = "Throw " + game.currentRoll + ": " + document.getElementById('rollValue').value + " pins hit.";
    if (type == "strike") {
        message = message + " You got a strike! \n";
    }
    else if (type == "spare") {
        message = message + " You got a spare! \n";
    } else {
        message = message + "\n";
    }

    av.umsg(message + "\n");
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
    //delete tempGame;
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

window.onload = function() {
    if (getUrlParam("code") == "true") {
        document.getElementById("coverageCode").style.display = "block";
        threshold = 100;
        //document.getElementById("container").style.float = "right";
    } else {
        document.getElementById("coverageCode").style.display = "none";
        //document.getElementById("container").style.float = "left";
    }
}

/**
 * Gets the value of a url parameter
 * @param {*} name is the name of the parameter you want to get 
 * @param {*} url is the url we want to read, can leave empty.
 */
function getUrlParam( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

function reset(){
    av.clearumsg();
    document.getElementById("rollValue").value = "";
    var testsrunText = document.getElementById("testsrun");
    testsrunText.innerHTML = "Number of balls thrown: " + 0;
    game.frameIndex = 1;
    game.rollIndex = 1;
    game.rolls = [];
    game.currentRoll = 0;
    game.gameOver = false;
    document.getElementById("codeCoverageBar").style = "width:" + 0 + "%";
    document.getElementById("codeCoveragePercentage").innerText = 0 + "%";
    for (var i = 0; i < game.numCoveragePoints; i++) {
        game.codeCovered[i] = false;
    }
    document.getElementById("score").innerText = 0;
    var rollID;
    for (var i = 1; i < 11; i++){
        rollID = "roll" + i;
        document.getElementById(rollID).innerText = "";
    }
}

$("#throwRoll").click(main);
$("#reset").click(reset);


});
