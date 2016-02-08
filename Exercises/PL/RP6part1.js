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
	      "1, 3, 6, 10, 15"
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
	      "0, 1, 3, 4, 7"
	  ]
	},

	/* option 2 */
	{ f:
	  "var f = function (ns) {\n" +
	  "    if (fp.isEq(fp.hd(ns),2))\n" +
	  "        return 2;\n" +
	  "    else\n" +
          "        return fp.add(fp.hd(ns), f(fp.tl(ns)));\n" + 
	  "}",
	  tests:
	  "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	  "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	  correct: "error, error, 3, 3, 3",
	  incorrect: [
	      "error, 3, 3, 3, 3",
	      "error, error, error, error, error",
	      "error, error, 3, 4, 5"
	  ]
	},

	/* option 3 */
	{ f:
	  "var f = function (ns) {\n" +
	  "    if (fp.isGT(fp.hd(ns),2))\n" +
          "        return 10;\n" +
	  "    else\n" +
          "        return fp.add(fp.hd(ns), f(fp.tl(ns)));\n" +
	  "}",
	  tests:
	  "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	  "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	  correct: "error, error, error, 13, 13",
	  incorrect: [ 
	      "error, error, error, 10, 10", 
	      "error, 13, 13, 13, 13", 
	      "error, error, error, 10, 13"
	  ]
	},

	/* option 4 */
	{f:
	 "var f = function (ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
         "        return 0;\n" +
	 "    else\n" +
         "        return fp.sub(fp.hd(ns), f(fp.tl(ns)));\n" +
	 "}",
	 tests:
	 "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	 "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	 correct:  "0, 1, -1, 2, -2",
	 incorrect: [
	     "0, -1, 1, -2, 2",
	     "0, 1, -2, 3, -4",
	     "0, -1, 1, -2, 4"
	 ]
	},

	/* option 5 */
	{f:
	 "var f = function (ns) {\n" +
	 "    if (fp.isNull(fp.tl(ns)))\n" +
         "        return fp.hd(ns);\n" +
	 "    else \n" +
         "        return f(fp.cons(fp.sub(fp.hd(ns),\n" +
	 "                                fp.hd(fp.tl(ns))),\n"+
	 "                         fp.tl(fp.tl(ns))));\n" +
	 "}",
	 tests:
	 "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	 "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	 correct:  "error, 1, -1, -4, -8",
	 incorrect: [
	     "error, 1, error, -4, error",
	     "error, 1, -1, error, -8",
	     "error, 1, error, error, error"
	 ]
	},

	/* option 6 */
	{f:
	 "var f = function (ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
         "        return 0;\n" +
	 "    else if (fp.isEq(fp.hd(ns),2))\n" +
	 "        return 2;\n" +
	 "    else\n" +
         "        return fp.sub(fp.hd(ns), f(fp.tl(ns)));\n" +
	 "}",
	 tests:
	 "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	 "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	 correct:  "0, 1, -1, -1, -1",
	 incorrect: [
	     "0, 1, -1, -3, -6",
	     "0, 1, -1,  1, -1",
	     "0, 1, -1, -3, -1"
	 ]
	},

	/* option 7 */
	{f:
	 "var f = function (ns) {\n" +
	 "    if (fp.isEq(fp.hd(ns),2))\n" +
	 "        return 2;\n" +
	 "    else\n" +
         "        return fp.sub(fp.hd(ns), f(fp.tl(ns)));\n" +
	 "}",
	 tests:
	 "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	 "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	 correct:  "error, error, -1, -1, -1",
	 incorrect: [
	     "error, error, -1, -2, -3",
	     "error, error, -1,  1, -1",
	     "error, -1, -2, -3, -4"
	 ]
	},

	/* option 8 */
	{f:
	 "var f = function (ns) {\n" +
	 "    if (fp.isEq(fp.hd(ns),2))\n" +
	 "        return f([2,1]);\n" +
	 "    else if (fp.isNull(fp.tl(ns)))\n" +
         "        return fp.hd(ns);\n" +
	 "    else\n" +
         "        return f(fp.cons(fp.sub(fp.hd(ns),\n" +
	 "                                fp.hd(fp.tl(ns))),\n" +
	 "                         fp.tl(fp.tl(ns))));\n" +
	 "}",
	 tests:
	 "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	 "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	 correct:  "error, 1, -1, -4, -8",
	 incorrect: [
	     "error, 1, error, -4, error",
	     "error, 1, -1, error, -8",
	     "error, 1, error, error, error"
	 ]
	},

	/* option 9 */
	{f:
	 "var f = function (ns) {\n" +
	 "    if (fp.isNull(fp.tl(ns)))\n" +
         "        return fp.hd(ns);\n" +
	 "    else if (fp.isEq(fp.hd(ns),2))\n" +
	 "        return f([2,1]);\n" +
	 "    else\n" +
         "        return f(fp.cons(fp.sub(fp.hd(ns),\n" +
	 "                                fp.hd(fp.tl(ns))),\n" +
	 "                         fp.tl(fp.tl(ns))));\n" +
	 "}",
	 tests:
	 "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	 "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	 correct:  "error, 1, -1, -4, -8",
	 incorrect: [
	     "error, 1, error, -4, error",
	     "error, 1, -1, error, -8",
	     "error, 1, error, error, error"
	 ]
	}


    ];
    var RP6part1 = {

	init: function() {

	    var option = Math.floor( Math.random() * options.length );
	    //option = 9;
	    // export to the HTML page
	    this.functionDefinition = options[option].f;
	    this.functionCalls = options[option].tests;
	    this.correct = options[option].correct;
	    this.incorrect = options[option].incorrect;

	}// init function

    };// RP6part1 object

    window.RP6part1 = window.RP6part1 || RP6part1;
}());

