/* global SLang : true */

(function () {

"use strict";

var samples = [

/* 0 */   "",
/* 1 */   ["", 
           "class Point extends Object {\n" +
	   "   protected x\n" +
	   "   protected y\n" +
	   "   method initialize (initx, inity) { set x = initx; set y = inity }\n" +
	   "   method move (dx,dy) { set x = (x + dx); set y = (y + dy) }\n" +
	   "   method printLocation () { print \"x\" x; print \"y\" y }\n" +
	   "}\n" +
           "class ColorPoint extends Point {\n" +
	   "   protected color\n" +
	   "   method setColor (c) { set color = c }\n" +
	   "   method getColor ()  { color }\n" +
	   "}\n\n" +
	   "public class Driver extends Object {\n" +
	   "   method main() {\n" +
	   "         new ColorPoint()\n" +
	   "   }\n" +
	   "}"
          ],
]

SLang.samples = samples;

}());
