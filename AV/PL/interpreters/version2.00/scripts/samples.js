/* global SLang : true */

(function () {

"use strict";

var samples = [

/* 0 */   "",
/* 1 */   ["12"],
/* 2 */   ["x"],
/* 3 */   ["+(1,*(2,add1(3)))"],
/* 4 */   ["fn () => 5"],
/* 5 */   ["fn (x) => x"],
/* 6 */   ["fn (a,b,c) => y"],
/* 7 */   ["(fn (x) => 5 y)"],
/* 8 */   ["(fn (z) => z *(y, add1(x)))"],
/* 9 */   ["(fn (a,b,c) => y 1 2 3)"],
/* 10 */  ["(fn (x) => *(x,x) +(x,y))"],
/* 11 */  ["(fn (f,x) => (f (f x)) fn (y) => *(2,y) +(x,y))"],
/* 12 */  [ "let\n" +
            "    x = 1\n" +
            "    y = 2\n" +
            "    sqr = fn (x) => *(x,x)\n" +
            "in\n" +
            "   let\n" +
            "       f = fn (x) => *(y,x)\n" +
            "       g = fn () => set y = add1(y)\n" +
            "       h = fn () => set x = add1(x)\n" +
            "       x = 3\n"+
            "   in\n" +
            "          set x = *(2,x);\n" +
            "          print x;    print y;\n" +
            "          print (sqr +(x,y));\n" +
            "          print (f 5);\n" +
            "          (g);\n" +
            "          (h);\n" +
            "          print x;\n" +
            "          print (f 5);\n" +
            "          set y = 10;\n" +
            "          print (f 5)\n" +
            "   end\n" +
            "end\n"
         ]
]

SLang.samples = samples;

}());
