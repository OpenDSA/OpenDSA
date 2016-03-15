

/* global console, LAMBDA */
(function() {
    "use strict";
    var L = LAMBDA;
    var words = [ "coca",  "comma",  "counterplea",  "credenza",  "dilemma",  "gondola",  "gorilla",  "hoopla",  "hypoglycemia",  "hypothermia",  "lemma",  "leukemia",  "lymphoma",  "mimosa",  "minutia",  "pizza",  "pneumonia",  "tesla",  "tibia",  "trivia",  "xenophobia", "absolutely", "already", "anarchy", "annoy", "apathy",  "apply", "astrology" , "beworry", "bully", "hurry", "marry", "worry" ];

    var RP19part1 = {    

	init: function () {
	    var prefix = "\u03BB";
	    var i, c, word, lastLetter, firstLetter, secondLetter, thirdLetter;
	    var rnd, options = [];
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
	    this.answer = word.length-2; 
	    while (options.length !== 4) {
		rnd = L.getRnd(1,12);
		if (rnd !== this.answer &&
		    options.indexOf(rnd) === -1) {
		    options.push(rnd);
		}
	    }
	    this.option1 = options[0];
	    this.option2 = options[1];
	    this.option3 = options[2];
	    this.option4 = options[3];
	} // init function
	
    };// RP19part1
    
    window.RP19part1 = window.RP19part1 || RP19part1;

}());


