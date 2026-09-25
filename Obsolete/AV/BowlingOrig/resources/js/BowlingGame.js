var BowlingGame = function() {
    this.frameIndex = 1;
    this.rollIndex = 1;
	this.rolls = [];
    this.currentRoll = 0;
    this.codeCovered = [];
    this.gameOver = false;
    this.numCoveragePoints = 8;
    for (var i = 0; i < this.numCoveragePoints; i++) {
        this.codeCovered[i] = false;
    }
};

BowlingGame.prototype.getCodeCovered = function() {
    var count = 0;
    for (var i = 0; i < this.numCoveragePoints; i++) {
        if (this.codeCovered[i]) {
            count++;
        }
    }
    return count * 100 / this.numCoveragePoints;
}

BowlingGame.prototype.setCodeCovered = function(index) {
    this.codeCovered[index] = true;
}

BowlingGame.prototype.roll = function(pins) {
    this.rolls[this.currentRoll] = pins;
    if (!this.bugs()) {
        this.currentRoll++;
        this.codeCovered[0] = true;
        return 1;
    } else {
        return 0;
    }
};

BowlingGame.prototype.updateFrame = function() {
    if (this.currentRoll == 0) {
        return;
    }
}

BowlingGame.prototype.score = function() {
	var score = 0;
	var frameIndex = 0;
    var self = this;
    if (self.gameOver) {
        //nothing
    }
    else if (self.frameIndex == 10) {
        self.rollIndex++;
        if (self.rollIndex > 3) {
            self.gameOver = true;
        }
        if (self.rollIndex == 3) {
            if (self.rolls[self.currentRoll - 2] == 10 || 
                self.rolls[self.currentRoll - 2] + self.rolls[self.currentRoll - 3] == 10) {
                    // continue
                }    
            else {
                self.gameOver = true;
            }                
        }
    } else if (self.rollIndex >= 2) {
        self.frameIndex++;
        self.rollIndex = 1;
    } else if (self.rolls[self.currentRoll - 1] == 10) {
        self.frameIndex++;
        self.rollIndex = 1;
    } else {
        self.rollIndex++;
    }

	function sumOfBallsInFrame() {
        self.codeCovered[1] = true;
        return self.rolls[frameIndex] + self.rolls[frameIndex + 1];
	}

	function spareBonus() {
        self.codeCovered[2] = true;
        return self.rolls[frameIndex + 2];
	}

	function strikeBonus() {
        self.codeCovered[3] = true;
        return self.rolls[frameIndex + 1] + self.rolls[frameIndex + 2];
	}

	function isStrike() {        
        return self.rolls[frameIndex] === 10;
	}

	function isSpare() {
        return self.rolls[frameIndex] + self.rolls[frameIndex + 1] === 10;
	}

	for (var frame = 0; frame < 10; frame++) {
		if (isStrike()) {
            score += 10 + strikeBonus();
            frameIndex++;
		} else if (isSpare()) {
			score += 10 + spareBonus();
			frameIndex += 2;
		} else {
			score += sumOfBallsInFrame();
			frameIndex += 2;
		}
    }
	return score;
};
/**
 * This code is checked and if any of the cases return 1
 * the bowling code execution is stopped and the code coverage 
 * for the respective case is calculated.
 */
BowlingGame.prototype.bugs = function() {
    var self = this;
    //Checks if roll is an integer or not
    if (isNaN(self.rolls[self.currentRoll])) {
        self.codeCovered[7] = true;
        return 1;
    }
    //Thats a bug, one roll hitting more than 10 pins
    if (self.rolls[self.currentRoll] > 10) {
        self.codeCovered[4] = true;        
        return 1;
    }
    //Bug if roll is less than 0
    if (self.rolls[self.currentRoll] < 0) {
        self.codeCovered[6] = true;
        return 1;
    }
    //Checks if the sum of two rolls in the same frame are greater than 0
    //Also handles the 10th frame
    if (self.rollIndex > 1) {
        if (self.rollIndex == 2) {
            if (self.frameIndex == 10) {
                if (self.rolls[self.currentRoll - 1] == 10) {
                    return 0;
                }
            }
        }
        if (self.rollIndex == 3) {
            if (self.rolls[self.currentRoll - 1] == 10) {
                return 0;
            }
            if (self.rolls[self.currentRoll - 1] + self.rolls[self.currentRoll - 2] == 10) {
                return 0;
            }
            if (self.rolls[self.currentRoll - 1] + self.rolls[self.currentRoll - 2] < 10) {
                self.gameOver = true;
                return 1;
            }
        }
        if (self.rolls[self.currentRoll - 1] + self.rolls[self.currentRoll] > 10) {
            self.codeCovered[5] = true;
            return 1;
        }
    }
    return 0;
}

