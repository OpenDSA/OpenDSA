/* global window */

(function() {
    "use strict";

    var options = [
	/* option 0 */
	{ f: 
	  "var f = function (ns) {\n" +
	  "    if (fp.isNull(ns))\n" +
          "        return 0;\n" +
	  "    else\n" +
          "        return fp.add(fp.hd(ns), f(fp.tl(ns)));\n" +
	  "}",
	  tests: 
	  "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	  "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	  correct: "0, 1, 3, 6, 10",
	  incorrect: [
	      "0, 1, 2, 3, 4",
	      "0, 1, 3, 5, 7",
	      "1, 3, 6, 10, 15",
	  ]
	},

	/* option 1 */
	{ f: 
	  "var f = function (ns) {\n" +
	  "    if (fp.isNull(ns))\n" +
          "        return 0;\n" +
	  "    else if (fp.isEq(fp.hd(ns),2))\n" +
	  "        return 3;\n" +
	  "    else\n" +
          "        return fp.add(fp.hd(ns), f(fp.tl(ns)));\n" +
	  "}",
	  tests: 
	  "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	  "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	  correct: "0, 1, 4, 4, 4",
	  incorrect: [
	      "0, 1, 2, 2, 2",
	      "0, 1, 3, 3, 3",
	      "0, 1, 3, 4, 7",
	  ]
	}	
    ];
    var RP6part1 = {

	init: function() {

	    var option = Math.floor( Math.random() * options.length );
	    console.log("here: " + option);
	    // export to the HTML page
	    this.functionDefinition = options[option].f;
	    this.functionCalls = options[option].tests;
	    this.correct = options[option].correct;;
	    this.incorrect = options[option].incorrect;

	}// init function

    };// RP6part1 object

    window.RP6part1 = window.RP6part1 || RP6part1;
}());

