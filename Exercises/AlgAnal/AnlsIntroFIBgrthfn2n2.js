(function() {
    window.checkAnswer = function(answer) {
        if (answer.trim() === "none") {
            return true;
        } else {
            return false;
        }
    };
}())