

/* global console, LAMBDA */
(function() {
    "use strict";
    var L = LAMBDA;
    var words = [ "coca",  "comma",  "counterplea",  "credenza",  "dilemma",  "gondola",  "gorilla",  "hoopla",  "hypoglycemia",  "hypothermia",  "lemma",  "leukemia",  "lymphoma",  "mimosa",  "minutia",  "pizza",  "pneumonia",  "tesla",  "tibia",  "trivia",  "xenophobia" ];

    var RP19part1 = {    

	init: function () {
	    var prefix = "\u03BB";
	    var i, c, word, lastLetter, firstLetter, secondLetter, thirdLetter;
	    word = words[ L.getRnd(0,words.length-1)];
	    //word = words[0];
	    lastLetter = word.charAt(word.length-1);	    
	    firstLetter = word.charAt(0);
	    secondLetter = word.charAt(1);
	    thirdLetter = word.charAt(2);	    
	    for (i = 97; i <= 122; i++) {
		c = String.fromCharCode(i);
		if (word.indexOf(c) > -1 && c !== lastLetter) {
		    prefix += c;
		}
	    }
	    this.expression = prefix + lastLetter + ".(" + lastLetter + 
		" (" +	word.split("").join(" ") + "))";
	    this.clarification = "In other words, we have "+  firstLetter +
		" applied to " + secondLetter + ", the result of which is " +
		" applied to " + thirdLetter +
		(word.length > 4 ? ", ... " : "") + 
		", the result of which is applied to " + lastLetter +
		".  And to all of that, we apply " + lastLetter + ".";
	    this.answer = word.length-1;  // check this
	    this.option1 = "0";    // to do
	    this.option2 = "-1";
	    this.option3 = "-2";
	    this.option4 = "-3";
	} // init function
	
    };// RP19part1
    
    window.RP19part1 = window.RP19part1 || RP19part1;

}());


