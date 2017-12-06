var BowlingGame = function() {
    console.log("Game Initialized");
    this.frameIndex = 0;
	this.rolls = [];
    this.currentRoll = 0;
    this.codeCovered = [];
    this.numCoveragePoints = 7;
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

BowlingGame.prototype.score = function() {
	var score = 0;
	var frameIndex = 0;
	var self = this;

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
            console.log("is strike");
			frameIndex++;
		} else if (isSpare()) {
            console.log("is spare");            
			score += 10 + spareBonus();
			frameIndex += 2;
		} else {
			score += sumOfBallsInFrame();
			frameIndex += 2;
		}
    }
    self.frameIndex = frameIndex
	return score;
};

BowlingGame.prototype.bugs = function() {
    var self = this;
    if (self.rolls[self.currentRoll] > 10) {
        console.log("is bug");
        self.codeCovered[4] = true;
        //Thats a bug, one roll hitting more than 10 pins
        return 1;
    }
    if (self.rolls[self.currentRoll] < 0) {
        self.codeCovered[6] = true;
        return 1;
    }
    if (self.currentRoll > 0 && self.currentRoll % 2 != 0) {
        if ((self.rolls[self.currentRoll] + self.rolls[self.currentRoll - 1] > 10) && self.rolls[self.currentRoll - 1] < 10) {
            self.codeCovered[5] = true;
            console.log("is bug");
            console.log("Need to fix this, triggers at wrong times");
            //That's a bug, frame totaling more than 10 pins
            return 1;
        }
    }
    return 0;
}

