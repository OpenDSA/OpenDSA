"use strict";

// Recursive multiplication visualization with my understanding to Prof. Shaffer's point of view
(function ($) {

  var av = new JSAV("RecursionIntroCON2");
  var pseudo = av.code({url: "../../../SourceCode/Java/RecurTutor/Recmultiply.java",
                       lineNumbers: false});
  //pseudo.css({left: "+=0px",top: "+=10px"});
  av.umsg("It is required from you to multiply two numbers x and y. If they are simple enough, you will do the task on your own. Otherwise, you will simplify and delegate this task to a friend.");
  
  pseudo.highlight(0);
  var label = av.label("x*y?", {left: 150, top: 170}); // create a label for the icon
  //label.addClass("forward"); // change the image of the icon
  av.displayInit();
  av.step();

  av.umsg("Your friend will do a smaller version of the problem by multiplying x-1 and y. When he returns the result back, you will add a y to that result to complete your task.");
  
  pseudo.unhighlight(0);
  pseudo.highlight(4);
  pseudo.unhighlight(4);
  pseudo.highlight(0);

  
  var Pointer1 = av.g.line(230 , 210,280, 210,{"arrow-end": "classic-wide-long", "opacity": 0, "stroke":'black',"stroke-width":5});
  Pointer1.show(); 
  
  var label2 = av.label("(x-1)*y?", {left: 0, top: 170}); // create a label for the icon
  label2.css({left: "+=270px", top: "+=0px"}); // move the icon
  av.step();
 
  av.umsg("When you delegate the task to your friend. You are not worried how he is going to do it. You are just waiting for the answer.");

  pseudo.unhighlight(4);
  pseudo.highlight(4);
  pseudo.unhighlight(4);
  pseudo.highlight(0);

  label.hide();
  label2.hide();
  Pointer1.hide();
  
  label2 = av.label("(x-1)*y", {left: 0, top: 170}); // create a label for the icon
  label2.css({left: "+=280px", top: "+=0px"}); // move the icon
  av.step();
  pseudo.unhighlight(4);
  pseudo.highlight(4);
  av.umsg("You will simply add y to the result and you will be done with your task!");
  Pointer1 = av.g.line(280 , 210,230, 210,{"arrow-end": "classic-wide-long", "opacity": 0, "stroke":'black',"stroke-width":5});
  Pointer1.show(); 
  
  label = av.label("x*y", {left: 150, top: 170}); // create a label for the icon
  av.step();
  
  av.recorded();
  
}(jQuery));


