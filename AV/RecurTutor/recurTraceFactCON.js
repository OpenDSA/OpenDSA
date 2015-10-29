/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Visualization of factorial with copies model 
$(document).ready(function () {
  "use strict";
  var av_name = "recurTraceFactCON";
  var av = new JSAV(av_name);
  var pseudo = av.code({url: "../../../SourceCode/Java/RecurTutor/Recfact.java",
                       lineNumbers: false,});

  // Slide 1
  av.umsg("Suppose that we want to compute the value of factorial(5) using the following recursive factorial implementation.");
  av.displayInit();
 
  // Slide 2
  av.umsg("The recursive call creates a new copy of the code with n = 5");
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
  pseudo2.show();
  pseudo2.highlight(1);
  pseudo2.highlight(4);
  av.step();

  // Slide 3
  av.umsg("The n=5 copy calls a new copy of the code with n = 4");
  pseudo3.show();
  pseudo3.highlight(1);
  pseudo3.highlight(4);
  av.step();
  
  // Slide 4
  av.umsg("The n=4 copy calls a new copy of the code with n = 3");
  pseudo4.show();
  pseudo4.highlight(1);
  pseudo4.highlight(4);
  av.step();

  // Slide 5
  av.umsg("The n=3 copy calls a new copy of the code with n = 2");
  pseudo5.show();
  pseudo5.highlight(1);
  pseudo5.highlight(4);
  av.step();

  // Slide 6
  av.umsg("The n=2 copy calls a new copy of the code with n = 1");
  pseudo6.show();
  pseudo6.highlight(2);
  av.step();

  // Slide 7
  av.umsg("Now, the base case satisfies and the n=1 recursive copy will return a value of 1.");
  pseudo6.unhighlight(2);
  pseudo6.highlight(3); 
  av.step();

  // Slide 8
  av.umsg("The n=2 copy will multiply the return value of the n=1 copy  by 2.");
  pseudo2.hide();
  pseudo3.hide();
  pseudo4.hide();
  pseudo5.hide();
  pseudo6.hide();
  pseudo7.show();
  pseudo7.highlight(4);
  av.step();

  // Slide 9
  av.umsg("The n=3 copy will multiply the return value of the n=2 by 3.");
  pseudo8.show();
  pseudo8.highlight(4);
  av.step();
  
  // Slide 10
  av.umsg("The n=4 copy will multiply the return value of the n=3 by 6.");
  pseudo9.show();
  pseudo9.highlight(4);
  av.step();
  
  // Slide 11
  av.umsg("The n=5 copy will multiply the return value of the n=4 by 24. This last copy will return the result of the required factorial.");
  pseudo10.show();
  pseudo10.highlight(3);
  av.recorded();
});
