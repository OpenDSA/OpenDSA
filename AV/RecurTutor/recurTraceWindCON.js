/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Visualization for winding and unwinding a series of function calls
$(document).ready(function () {
"use strict";
  var av_name = "recurTraceWindCON";
  var av = new JSAV(av_name);
  
  // Slide 1
  av.umsg("Suppose function a() has a call to function b().");
  var  pseudo = av.code(" a()\n{ \n  b();  \n}" , {lineNumbers:false , top:0 , left:100}); 
  var Pointer1 = av.g.line(165, 80, 215, 30, {"arrow-end": "classic-wide-long",
                                              opacity: 0, stroke: "black", "stroke-width": 2});
  Pointer1.show(); 
  var  pseudo2 = av.code(" b()\n{ \n c();  \n}" , {lineNumbers:false , top:0 , left:200});
  av.displayInit();
  
  // Slide 2
  av.umsg("Function b() has a call to function c().");
  var Pointer2 = av.g.line(255, 80, 315, 30, {"arrow-end": "classic-wide-long",
                                              opacity: 0, stroke: "black", "stroke-width": 2});
  Pointer2.show(); 
  var  pseudo3 = av.code(" c()\n{ \n d();  \n}" , {lineNumbers: false, top: 0, left: 300});
  av.step();

  // Slide 3
  av.umsg("Function c() has a call to function d().");
  var Pointer3 = av.g.line(355, 80, 415, 30, {"arrow-end": "classic-wide-long", opacity: 0,
                                              stroke: "black", "stroke-width": 2});
  Pointer3.show(); 
  var  pseudo4 = av.code(" d()\n{ \n      \n}" , {lineNumbers: false, top: 0, left: 400});
  av.step();

  // Slide 4
  av.umsg("Once function d() is done, what happens next?");
  Pointer1.hide();
  Pointer2.hide();
  Pointer3.hide();
  av.step();

  // Slide 5
  av.umsg("It goes back to c()...");
  var Pointer4 = av.g.line(415, 80, 355, 30, {"arrow-end": "classic-wide-long", opacity: 0,
                                              stroke: "black", "stroke-width": 2});
  Pointer4.show(); 
  av.step();

  // Slide 6
  av.umsg("... then to b()...");
  var Pointer5 = av.g.line(315, 80, 255, 30, {"arrow-end": "classic-wide-long", opacity: 0,
                                              stroke: "black", "stroke-width": 2});
  Pointer5.show();  
  av.step();
  
  // Slide 7
  av.umsg("...and finally back to a().");
  var Pointer6 = av.g.line(215, 80, 165, 30, {"arrow-end": "classic-wide-long", opacity: 0,
                                              stroke: "black", "stroke-width": 2});
  Pointer6.show();
  av.step();

  // Slide 8
  av.umsg("So you can think of going from a() to d() as the 'winding' for a series of function calls.");
  Pointer4.hide();
  Pointer5.hide();
  Pointer6.hide();  
  Pointer1.show();
  Pointer2.show();
  Pointer3.show();
  av.step();

  // Slide 9
  av.umsg("And returning back to a() as the `unwinding`.");
  Pointer1.hide();
  Pointer2.hide();
  Pointer3.hide();
  Pointer4.show();
  Pointer5.show();
  Pointer6.show();
  av.step();
  
  // Slide 10
  av.umsg("The same thing happens with all functions. Recursive functions aren't different from non-recursive functions in how they behave.");
  pseudo.hide();
  pseudo2.hide();
  pseudo3.hide(); 
  pseudo4.hide();
  Pointer4.hide();
  Pointer5.hide();
  Pointer6.hide();
  av.step();
  
  // Slide 11
  av.umsg("Suppose function f() makes a recursive call to function f()...");
  var  pseudo5 = av.code(" f()\n{ \n  f();  \n}" , {lineNumbers:false , top:0 , left:100}); 
  Pointer1.show(); 
  var  pseudo6 = av.code(" f()\n{ \n f();  \n}" , {lineNumbers:false , top:0 , left:200});
  av.step();

  // Slide 12
  av.umsg("...which makes a call to function f()...");
  Pointer2.show(); 
  var  pseudo7 = av.code(" f()\n{ \n f();  \n}" , {lineNumbers:false , top:0 , left:300});
  av.step();

  // Slide 13
  av.umsg("...which eventually makes a call to function f() that triggers the base case.");
  Pointer3.show(); 
  var  pseudo8 = av.code(" f()\n{ \n f(); \n}" , {lineNumbers:false , top:0 , left:400});
  av.step();
 
  // Slide 14
  av.umsg("Once reaching the base case, it will then return to the previous instance of f()...");
  Pointer1.hide();
  Pointer2.hide();
  Pointer3.hide();
  Pointer4.show();
  av.step();

  // Slide 15
  av.umsg("...then f()...");
  Pointer5.show();
  av.step();

  // Slide 16
  av.umsg("...and finally back to the original f()");
  Pointer6.show();
  av.recorded();
});
