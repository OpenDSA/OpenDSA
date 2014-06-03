"use strict";

// Recursive multiplication visualization with Sally's point of view
(function ($) {

  var av = new JSAV("RecursionIntroCON1");
  var pseudo = av.code({url: "../../../SourceCode/Java/RecurTutor/Recmultiply.java",
                       lineNumbers: false});
  av.umsg("It is required from you to multiply two numbers x and y. If they are simple enough, you will do the task on your own. Otherwise, you will simplify and delegate this task to a friend. Who will do a smaller version of the problem by multiplying x-1 and y. When he returns the result back, you will add a y to that result to complete your task.");
  
  pseudo.highlight(0);
  var label = av.label("x*y?", {left: 0, top: 170}); // create a label for the icon
  //label.addClass("forward"); // change the image of the icon
  av.displayInit();
  av.step();

  pseudo.unhighlight(0);
  pseudo.highlight(4);
  pseudo.unhighlight(4);
  pseudo.highlight(0);

  av.umsg("Your friend will do exactly the same with another friend. That other friend will help with a smaller version of the problem. He will multiply x-1-1 by y.");
  var Pointer1 = av.g.line(80 , 210,130, 210,{"arrow-end": "classic-wide-long", "opacity": 0, "stroke":'black',"stroke-width":5});
  Pointer1.show(); 
  
  var label2 = av.label("x-1*y?", {left: 0, top: 170}); // create a label for the icon
  label2.css({left: "+=120px", top: "+=0px"}); // move the icon
  av.step();

  pseudo.unhighlight(4);
  pseudo.highlight(4);
  pseudo.unhighlight(4);
  pseudo.highlight(0);

  av.umsg("Who will do exactly the same with a  third friend.");
  var Pointer2 = av.g.line(200 , 210,250, 210,{"arrow-end": "classic-wide-long", "opacity": 0, "stroke":'black',"stroke-width":5});
  Pointer2.show(); 
  
  var label3 = av.label("x-2*y?", {left: 0, top: 170}); // create a label for the icon
  label3.css({left: "+=240px", top: "+=0px"}); // move the icon
  av.step();
  
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  
  av.umsg(" The problem gets smaller as it goes from a friend to another. Till it reaches to the <b> base case</b> where x reaches to 1 at some friend. This friend will find the task simple enough to be done on his own without doing any delegations.");

  var Pointer3 = av.g.line(320 , 210,370, 210,{"arrow-end": "classic-wide-long", "opacity": 0, "stroke":'black',"stroke-width":5});
  Pointer3.show(); 
  
  var dots1 = av.g.circle(390, 210, 2);
  var dots2 = av.g.circle(430, 210, 2);
  var dots3 = av.g.circle(470, 210, 2);
  
  var Pointer4 = av.g.line(490 , 210,540, 210,{"arrow-end": "classic-wide-long", "opacity": 0, "stroke":'black',"stroke-width":5});
  Pointer4.show(); 
  
  var label4 = av.label("1*y?", {left: 0, top: 170}); // create a label for the icon
  label4.css({left: "+=550px", top: "+=0px"}); // move the icon
  av.step();
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  av.umsg("That friend will send back the result of multiplying a one and y. Then he will return back the result to the previous friend");
  // All the way back
  
  label.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  Pointer1.hide();
  Pointer2.hide();
  Pointer3.hide();
  Pointer4.hide();
  dots1.hide();
  dots2.hide();
  dots3.hide();

 
  //last friend will send back the result of multiplying a one and y. The last friend willl be returning back the result to the previous friend
  label4 = av.label("y", {left: 0, top: 170}); // create a label for the icon
  label4.css({left: "+=550px", top: "+=0px"}); // move the icon
  Pointer4 = av.g.line(540 , 210,490, 210,{"arrow-end": "classic-wide-long", "opacity": 0, "stroke":'black',"stroke-width":5});
  Pointer4.show();
  av.step();
  pseudo.unhighlight(2);
  pseudo.highlight(4);
  av.umsg("This process will continue all the way back till the result of x-2 multiplied by y is back to your friend");

  dots3 = av.g.circle(470, 210, 2);
  dots2 = av.g.circle(430, 210, 2);
  dots1 = av.g.circle(390, 210, 2);
  
  
  Pointer3 = av.g.line(370 , 210,320, 210,{"arrow-end": "classic-wide-long", "opacity": 0, "stroke":'black',"stroke-width":5});
  Pointer3.show(); 
    
  
  label3 = av.label("x-2*y", {left: 0, top: 170}); // create a label for the icon
  label3.css({left: "+=240px", top: "+=0px"}); // move the icon
 
  av.step();
  pseudo.unhighlight(4);
  pseudo.highlight(4);
  av.umsg("Your friend will add y and send you the result of multiplying x-1  by y.");
  Pointer2 = av.g.line(250 , 210,200, 210,{"arrow-end": "classic-wide-long", "opacity": 0, "stroke":'black',"stroke-width":5});
  Pointer2.show(); 
  
  
  label2 = av.label("x-1*y", {left: 0, top: 170}); // create a label for the icon
  label2.css({left: "+=120px", top: "+=0px"}); // move the icon
  av.step();
  pseudo.unhighlight(4);
  pseudo.highlight(4);
  av.umsg("When the result is back to you, you will simply add y to the result and you will be done with your task!");
  Pointer1 = av.g.line(130 , 210,80, 210,{"arrow-end": "classic-wide-long", "opacity": 0, "stroke":'black',"stroke-width":5});
  Pointer1.show(); 
  
  label = av.label("x*y", {left: 0, top: 170}); // create a label for the icon
  av.step();
  
  av.recorded();
  
}(jQuery));

//==============================================================================================================================

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
  
  var label2 = av.label("x-1*y?", {left: 0, top: 170}); // create a label for the icon
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
  
  label2 = av.label("x-1*y", {left: 0, top: 170}); // create a label for the icon
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



//===============================================================================================================================
// Visualization of factorial with copies model 
(function ($) {

  var av = new JSAV("RecursionIntroCON3");
  var pseudo = av.code({url: "../../../SourceCode/Java/RecurTutor/Recfact.java",
                       lineNumbers: false,});
  av.umsg("Suppose we want to compute the value of factorial(5) using the following recursive factorial implementation:");
  av.step();
 
  av.umsg("The recursive call creates a new copy of the code where n = 5");

  var pseudo2 = av.code({url: "../../../SourceCode/Java/RecurTutor/Recfact5.java",
                       lineNumbers: false , top: 150 , left: 0 });

   
  var pseudo3 = av.code({url: "../../../SourceCode/Java/RecurTutor/Recfact4.java",
                       lineNumbers: false , top: 150 , left: 260 }); 

  var pseudo4 = av.code({url: "../../../SourceCode/Java/RecurTutor/Recfact3.java",
                       lineNumbers: false  , top: 150 , left: 520}); 
  
  var pseudo5 = av.code({url: "../../../SourceCode/Java/RecurTutor/Recfact2.java",
                       lineNumbers: false, top: 300 , left: 125});

  var pseudo6 = av.code({url: "../../../SourceCode/Java/RecurTutor/Recfact1.java",
                       lineNumbers: false , top: 300 , left: 385});

 // After the return:

  var pseudo7 = av.code({url: "../../../SourceCode/Java/RecurTutor/Recfact2r.java",
                       lineNumbers: false , top: 150 , left: 125});

  var pseudo8 = av.code({url: "../../../SourceCode/Java/RecurTutor/Recfact3r.java",
                       lineNumbers: false , top: 150 , left: 385});

  var pseudo9 = av.code({url: "../../../SourceCode/Java/RecurTutor/Recfact4r.java",
                       lineNumbers: false , top: 300 , left: 125});

  var pseudo10 = av.code({url: "../../../SourceCode/Java/RecurTutor/Recfact5r.java",
                       lineNumbers: false , top: 300 , left: 385});
  pseudo2.hide();
  pseudo3.hide();
  pseudo4.hide();
  pseudo5.hide();
  pseudo6.hide();
  pseudo7.hide();
  pseudo8.hide();
  pseudo9.hide();
  pseudo10.hide();

  av.displayInit(); 
   pseudo2.show();
  pseudo2.highlight(0);
  pseudo2.highlight(3);
  
  
  av.step();
  av.umsg("The n=5 copy calls a new copy of the code with n = 4");

 
  pseudo3.show();
  pseudo3.highlight(0);
  pseudo3.highlight(3);
  av.step();

  av.umsg("The n=4 copy calls a new copy of the code with n = 3");
  //pseudo3.hide();
  pseudo4.show();

  pseudo4.highlight(0);
  pseudo4.highlight(3);
  av.step();

  av.umsg("The n=3 copy calls a new copy of the code with n = 2");
 // pseudo4.hide();
  pseudo5.show();
  
  pseudo5.highlight(0);
  pseudo5.highlight(3);
  av.step();

  
  av.umsg("The n=2 copy calls a new copy of the code with n = 1");
  //pseudo5.hide();
  pseudo6.show();

  pseudo6.highlight(1);

  av.step();
  av.umsg("Now, the base case satisfies and the n=1 recursive copy will return a value of 1.");
  pseudo6.unhighlight(1);  
  pseudo6.highlight(2); 
  av.step();
  av.umsg("The n=2 copy will multiply the return value of the n=1 copy  by 2.");
  pseudo2.hide();
  pseudo3.hide();
  pseudo4.hide();
  pseudo5.hide();
  pseudo6.hide();

  pseudo7.show();

  pseudo7.highlight(3);
  av.step();
  
  av.umsg("The n=3 copy will multiply the return value of the n=2 by 3.");
  //pseudo7.hide();
  pseudo8.show();

  pseudo8.highlight(3);
  av.step();
  
  av.umsg("The n=4 copy will multiply the return value of the n=3 by 6.");
  //pseudo8.hide();
  pseudo9.show();

  pseudo9.highlight(3);
  av.step();
  
  av.umsg("The n=5 copy will multiply the return value of the n=4 by 24. This last copy will return the result of the required factorial.");
  //pseudo9.hide();
  
  pseudo10.show();
  pseudo10.highlight(3);
  av.step();
  
  av.recorded();
  
}(jQuery));



//==============================================================================================================================
