/* global window */

(function() {
    "use strict";

    var options = [
	/* option 0 */
	{ args:
	  '<span class="string">ns</span> is a list of integers',
	  f: 
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
	{ args:
	  '<span class="string">ns</span> is a list of integers',
	  f: 
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
	{ args:
	  '<span class="string">ns</span> is a list of integers',
	  f:
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
	{ args:
	  '<span class="string">ns</span> is a list of integers',
	  f:
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
	{ args:
	  '<span class="string">ns</span> is a list of integers',
	 f:
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
	{ args:
	  '<span class="string">ns</span> is a list of integers',
	  f:
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
	{ args:
	  '<span class="string">ns</span> is a list of integers',
	  f:
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
	{ args:
	  '<span class="string">ns</span> is a list of integers',
	  f:
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
	{ args:
	  '<span class="string">ns</span> is a list of integers',
	  f:
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
	{ args:
	  '<span class="string">ns</span> is a list of integers',
	  f:
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
	},

	/* option 10 */
	{ args:
	  '<span class="string">n</span> is an integer and ' +
	  '<span class="string">ns</span> is a list of integers',
	  f:
	 "var f = function (n,ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
         "        return false;\n" + 
	 "    else if (fp.isEq(n,fp.hd(ns)))\n" +
         "        return true;\n" +
	 "    else\n" +
	 "        return f(n,fp.tl(ns));\n" +
	 "}",
	 tests:
	 "f( 1, [ ] )<br />f( 1, [ 1, 2, 3 ] )<br />f( 2, [ 1, 2, 3 ] )<br />" + 
	 "f( 3, [ 1, 2, 3 ] )<br />f( 4, [ 1, 2, 3 ] )<br />",
	 correct:  "false, true, true, true, false",
	 incorrect: [
	     "false, true, error, error, error",
	     "false, true, true, true, error",
	     "false, true, false, false, false"
	 ]
	},

	/* option 11 */
	{args:
	  '<span class="string">n</span> is an integer and ' +
	  '<span class="string">ns</span> is a list of integers',
	 f:
	 "var f = function (n,ns) {\n" +
	 "    if (fp.isEq(n,fp.hd(ns)))\n" +
         "        return true;\n" +
	 "    else if (f(n,fp.tl(ns)))\n" +
         "        return true;\n" +
	 "    else\n" +
	 "        return false;\n" +
	 "}",
	 tests:
	 "f( 1, [ ] )<br />f( 1, [ 1, 2, 3 ] )<br />f( 2, [ 1, 2, 3 ] )<br />" + 
	 "f( 3, [ 1, 2, 3 ] )<br />f( 4, [ 1, 2, 3 ] )<br />",
	 correct:  "error, true, true, true, error",
	 incorrect: [
	     "error, true, true, true, false",
	     "error, true, error, error, error",
	     "error, true, false, false, false"
	 ]
	},

	/* option 12 */
	{args:
	  '<span class="string">n</span> is an integer and ' +
	  '<span class="string">ns</span> is a list of integers',
	 f:
	 "var f = function (n,ns) {\n" +
	 "    if (f(n,fp.tl(ns)))\n" +
	 "        return true;\n" +
	 "    else if (fp.isEq(n,fp.hd(ns)))\n" +
         "        return true;\n" +
	 "    else\n" +
         "        return false;\n" +
	 "}",
	 tests:
	 "f( 1, [ ] )<br />f( 1, [ 1, 2, 3 ] )<br />f( 2, [ 1, 2, 3 ] )<br />" + 
	 "f( 3, [ 1, 2, 3 ] )<br />f( 4, [ 1, 2, 3 ] )<br />",
	 correct:  "error, error, error, error, error",
	 incorrect: [
	     "error, error, error, error, false",
	     "error, error, error, true, false",
	     "false, true, true, true, false"
	 ]
	},

	/* option 13 */
	{args:
	  '<span class="string">n</span> is an integer and ' +
	  '<span class="string">ns</span> is a list of integers',
	 f:
	 "var f = function (n,ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
	 "        return 0;\n" +
	 "    else if (fp.isEq(n,fp.hd(ns)))\n" +
         "        return n;\n" +
	 "    else\n" +
         "        return f(n,fp.tl(ns));\n" +
	 "}",
	 tests:
	 "f( 1, [ ] )<br />f( 1, [ 1, 2, 3 ] )<br />f( 2, [ 1, 2, 3 ] )<br />" + 
	 "f( 3, [ 1, 2, 3 ] )<br />f( 4, [ 1, 2, 3 ] )<br />",
	 correct:  "0, 1, 2, 3, 0",
	 incorrect: [
	     "0, 1, 2, 3, 4",
	     "0, 1, 2, 3, error",
	     "0, 1, 1, 1, 0"
	 ]
	},

	/* option 14 */
	{args:
	  '<span class="string">n</span> is an integer and ' +
	  '<span class="string">ns</span> is a list of integers',
	 f:
	 "var f = function (n,ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
	 "        return 0;\n" +
	 "    else if (fp.isEq(n,fp.hd(ns)))\n" +
         "        return fp.add(n,fp.hd(fp.tl(ns)));\n" +
	 "    else\n" +
         "        return f(n,fp.tl(ns));\n" +
	 "}",
	 tests:
	 "f( 1, [ ] )<br />f( 1, [ 1, 2, 3 ] )<br />f( 2, [ 1, 2, 3 ] )<br />" + 
	 "f( 3, [ 1, 2, 3 ] )<br />f( 4, [ 1, 2, 3 ] )<br />",
	 correct:  "0, 3, 5, error, 0",
	 incorrect: [
	     "0, 3, error, error, error",
	     "0, 3, 5, error, error",
	     "0, 3, error, error, 0"
	 ]
	},

	/* option 15 */
	{args:
	  '<span class="string">n</span> is an integer and ' +
	  '<span class="string">ns</span> is a list of integers',
	 f:
	 "var f = function (n,ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
         "        return false;\n" + 
	 "    else if (fp.isEq(n,fp.hd(ns)))\n" +
         "        return true;\n" +
	 "    else\n" +
	 "        return f(n,fp.tl(fp.tl(ns)));\n" +
	 "}",
	 tests:
	 "f( 1, [ ] )<br />f( 1, [ 1, 2, 3 ] )<br />f( 2, [ 1, 2, 3 ] )<br />" + 
	 "f( 3, [ 1, 2, 3 ] )<br />f( 4, [ 1, 2, 3 ] )<br />",
	 correct:  "false, true, error, true, error",
	 incorrect: [
	     "false, true, false, true, false",
	     "false, true, false, true, error",
	     "false, true, false, false, error"
	 ]
	},

	/* option 16 */
	{args:
	  '<span class="string">n</span> is an integer and ' +
	  '<span class="string">ns</span> is a list of integers',
	 f:
	 "var f = function (n,ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
	 "        return 0;\n" +
	 "    else if (fp.isEq(n,fp.hd(ns)))\n" +
         "        return n;\n" +
	 "    else\n" +
         "        return f(n,fp.tl(fp.tl(ns)));\n" +
	 "}",
	 tests:
	 "f( 1, [ ] )<br />f( 1, [ 1, 2, 3 ] )<br />f( 2, [ 1, 2, 3 ] )<br />" + 
	 "f( 3, [ 1, 2, 3 ] )<br />f( 4, [ 1, 2, 3 ] )<br />",
	 correct:  "0, 1, error, 3, error",
	 incorrect: [
	     "0, 1, 2, 3, 0",
	     "0, 1, 2, 3, error",
	     "0, 1, 1, 1, 0"
	 ]
	},

	/* option 17 */
	{args:
	  '<span class="string">n</span> is an integer and ' +
	  '<span class="string">ns</span> is a list of integers',
	 f:
	 "var f = function (n,ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
	 "        return 0;\n" +
	 "    else if (fp.isEq(n,fp.hd(ns)))\n" +
         "        return fp.add(n,fp.hd(fp.tl(ns)));\n" +
	 "    else\n" +
         "        return f(n,fp.tl(fp.tl(ns)));\n" +
	 "}",
	 tests:
	 "f( 1, [ ] )<br />f( 1, [ 1, 2, 3 ] )<br />f( 2, [ 1, 2, 3 ] )<br />" + 
	 "f( 3, [ 1, 2, 3 ] )<br />f( 4, [ 1, 2, 3 ] )<br />",
	 correct:  "0, 3, error, error, error",
	 incorrect: [
	     "0, 3, 5, error, 0",
	     "0, 3, 5, error, error",
	     "0, 3, error, error, 0"
	 ]
	},

	/* option 18 */
	{args:
	  '<span class="string">ns</span> is a list of integers',
	 f:
	 "var f = function (ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
	 "        return [];\n" +
	 "    else\n" +
         "        return fp.cons(fp.hd(ns),f(fp.tl(ns)));\n" +
	 "}",
	 tests:
	 "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	 "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	 correct:  "[ ], [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 1, 2, 3, 4 ]",
	 incorrect: [
	     "[ ], [ 1 ], [ 2, 1 ], [ 3, 2, 1 ], [ 4, 3, 2, 1 ]",
	     "[ ], [ 1 ], [ 1, 2 ], [ 1, 3, 2 ], [ 1, 4, 2, 3 ]",
	     "[ ], [ 1 ], [ 1, 2 ], [ 1, 2], [ 1, 2]"
	 ]
	},

	/* option 19 */
	{ args:
	  '<span class="string">ns</span> is a list of integers',
	 f:
	 "var f = function (ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
	 "        return [];\n" +
	 "    else\n" +
         "        return fp.cons(fp.hd(ns),f(fp.tl(fp.tl(ns))));\n" +
	 "}",
	 tests:
	 "f( [ ] )<br />f( [ 1 ] )<br />f( [ 1, 2 ] )<br />" + 
	 "f( [ 1, 2, 3 ] )<br />f( [ 1, 2, 3, 4 ] )<br />",
	 correct:  "[ ], error, [ 1 ], error, [ 1, 3 ]",
	 incorrect: [
	     "[ ], [ 1 ], [ 1 ], [ 1, 3 ], [ 1, 3 ]",
	     "[ ], error, error, error, error",
	     "[ ], error, error, error, [ 1, 3 ]"

	 ]
	},

	/* option 20 */
	{args:
	  '<span class="string">n</span> is an integer and ' +
	  '<span class="string">ns</span> is a list of integers',
	 f:
	 "var f = function (n,ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
	 "        return fp.cons(n,[ ]);\n" +
	 "    else\n" +
         "        return fp.cons(fp.hd(ns),f(n,fp.tl(ns)));\n" +
	 "}",
	 tests:
	 "f( 10, [ ] )<br />f( 10, [ 1 ] )<br />f( 10, [ 1, 2 ] )<br />" + 
	 "f( 10, [ 1, 2, 3 ] )<br />f( 10, [ 1, 2, 3, 4 ] )<br />",
	 correct:  "[ 10 ], [ 1, 10 ], [ 1, 2, 10 ], [ 1, 2, 3, 10 ], [ 1, 2, 3, 4, 10 ]",
	 incorrect: [
	     "[ 10 ], [ 1, 10 ], [ 1, 2, 10 ], [ 1, 2, 3, 10 ], error ",
	     "[ 10 ], [ 10, 1 ], [ 10, 1, 2 ],  [ 10, 1, 2, 3 ], [ 10, 1, 2, 3, 4]",

	     "[ 10 ], error, error, error, error"
	 ]
	},

	/* option 21 */
	{args:
	  '<span class="string">n</span> is an integer and ' +
	  '<span class="string">ns</span> is a list of integers',
	 f:
	 "var f = function (n,ns) {\n" +
	 "    if (fp.isNull(ns))\n" +
	 "        return fp.cons(n,[ ]);\n" +
	 "    else\n" +
         "        return fp.cons(n, fp.cons( fp.hd(ns),f(n,fp.tl(ns))));\n" +
	 "}",
	 tests:
	 "f( 10, [ ] )<br />f( 10, [ 1 ] )<br />f( 10, [ 1, 2 ] )<br />" + 
	 "f( 10, [ 1, 2, 3 ] )<br />f( 10, [ 1, 2, 3, 4 ] )<br />",
	 correct:  "[ 10 ], [ 10, 1, 10 ], [ 10, 1, 10, 2, 10 ], [ 10, 1, 10, 2, 10, 3, 10 ], [ 10, 1, 10, 2, 10, 3, 10, 4, 10 ]",
	 incorrect: [
	     "[ 10 ], [ 1, 10 ], [ 1, 10, 2, 10 ], [ 1, 10, 2, 10, 3, 10 ], [ 1, 10, 2, 10, 3, 10, 4, 10 ]",
	     "[ 10 ], [ 10, 1 ], [ 10, 1, 10, 2 ], [ 10, 1, 10, 2, 10, 3 ], [ 10, 1, 10, 2, 10, 3, 10, 4 ]",
	     "[ 10 ], [ 1, 10 ], [ 1, 2, 10 ], [ 1, 2, 3, 10 ], [ 1, 2, 3, 4, 10 ]"
	 ]
	},

	/* option 22 */
	{args:
	 'both <span class="string">ms</span> and ' +
	 '<span class="string">ns</span> are lists of integers',
	 f:
	 "var f = function (ms,ns) {\n" +
	 "    if (fp.isNull(ms))\n" +
	 "        return ns;\n" +
	 "    else\n" +
         "        return f(fp.tl(ms),fp.cons(fp.hd(ms),ns));\n" +
	 "}",
	 tests:
	 "f( [ ], [ ] )<br />f( [ 1 ], [ ] )<br />f( [ 1, 2 ], [ ] )<br />" + 
	 "f( [ 1, 2, 3 ], [ ], )<br />f( [ 1, 2, 3 ], [ 4, 5 ] )<br />",
	 correct:  "[ ], [ 1 ], [ 2, 1 ], [ 3, 2, 1 ], [ 3, 2, 1, 4, 5 ]",
	 incorrect: [
	     "[ ], [ 1 ], [ 2, 1 ], [ 2, 1, 3 ], [ 2, 1, 3, 4, 5 ]",
	     "[ ], [ 1 ], [ 2, 1 ], [ 3, 2, 1 ], error",
	     "[ ], [ 1 ], [ 2, 1 ], [ 2, 1, 3 ], error"
	 ]
	},

	/* option 23 */
	{args:
	 'both <span class="string">ms</span> and ' +
	 '<span class="string">ns</span> are lists of integers',
	 f:
	 "var f = function (ms,ns) {\n" +
	 "    if (fp.isNull(ms))\n" +
	 "        return fp.cons(fp.hd(ns),ns);\n" +
	 "    else\n" +
         "        return f(fp.tl(ms),fp.cons(fp.hd(ms),ns));\n" +
	 "}",
	 tests:
	 "f( [ ], [ ] )<br />f( [ 1 ], [ ] )<br />f( [ 1, 2 ], [ ] )<br />" + 
	 "f( [ 1, 2, 3 ], [ ], )<br />f( [ 1, 2, 3 ], [ 4, 5 ] )<br />",
	 correct:  "error, [ 1, 1 ], [ 2, 2, 1 ], [ 3, 3, 2, 1 ], [ 3, 3, 2, 1, 4, 5 ]",
	 incorrect: [
	     "error, [ 1, 1 ], [ 2, 2, 1 ], [ 3, 3, 2, 1 ], [ 4, 3, 2, 1, 4, 5 ]",
	     "error, error, error, error, error",
	     "error, [ 1, 1 ], error, [ 3, 3, 2, 1 ], error"
	 ]
	},

	/* option 24 */
	{args:
	 'both <span class="string">ms</span> and ' +
	 '<span class="string">ns</span> are lists of integers',
	 f:
	 "var f = function (ms,ns) {\n" +
	 "    if (fp.isNull(ms))\n" +
	 "        return ms;\n" +
	 "    else\n" +
         "        return f(fp.tl(ms),fp.cons(fp.hd(ms),ns));\n" +
	 "}",
	 tests:
	 "f( [ ], [ ] )<br />f( [ 1 ], [ ] )<br />f( [ 1, 2 ], [ ] )<br />" + 
	 "f( [ 1, 2, 3 ], [ ], )<br />f( [ 1, 2, 3 ], [ 4, 5 ] )<br />",
	 correct:  "[ ], [ ], [ ], [ ], [ ]",
	 incorrect: [
	     "[ ], error, error, error, error",
	     "[ ], [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 1, 2, 3]",
	     "[ ], [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 1, 2, 3, 4, 5]"
	 ]
	}
    ];
    var RP6part1 = {

	init: function() {

	    var option = Math.floor( Math.random() * options.length );

	    // export to the HTML page
	    this.args = options[option].args;
	    this.functionDefinition = options[option].f;
	    this.functionCalls = options[option].tests;
	    this.correct = options[option].correct;
	    this.incorrect = options[option].incorrect;

	}// init function

    };// RP6part1 object

    window.RP6part1 = window.RP6part1 || RP6part1;
}());

