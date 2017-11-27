rolls = [];
currentRoll = 0;
codeCovered = [];
for (var i = 0; i < 6; i++) {
    codeCovered[i] = false;
}

function getCodeCovered() {
    var count = 0;
    for (var i = 0; i < 6; i++) {
        if (codeCovered[i]) {
            count++;
        }
    }
    return count * 100 / 6;
}

function roll(pins) {
    rolls[currentRoll] = pins;
    bugs();
    currentRoll++;
    codeCovered[0] = true;
}

function score() {
    var score = 0;
	var frameIndex = 0;

	function sumOfBallsInFrame() {
        codeCovered[1] = true;
        return rolls[frameIndex] + rolls[frameIndex + 1];
	}

	function spareBonus() {
        codeCovered[2] = true;
        return rolls[frameIndex + 2];
	}

	function strikeBonus() {
        codeCovered[3] = true;
        return rolls[frameIndex + 1] + rolls[frameIndex + 2];
	}

	function isStrike() {
        return rolls[frameIndex] === 10;
	}

	function isSpare() {
        return rolls[frameIndex] + rolls[frameIndex + 1] === 10;
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
	return score;
}

function bugs() {
    if (rolls[currentRoll] > 10) {
        console.log("is bug");
        codeCovered[4] = true;
        //Thats a bug, one roll hitting more than 10 pins
    }
    if (currentRoll > 0 && currentRoll % 2 != 0) {
        if (rolls[currentRoll] + rolls[currentRoll - 1] > 10) {
            codeCovered[5] = true;
            console.log("is bug");
            //That's a bug, frame totaling more than 10 pins
        }
    }
}