"use strict";
  
//===============================================================================================================================
// Visualization of Towers of Hanoi
(function ($) {

  var av = new JSAV("RecursionTraceCON8");
//  define 3 vertical rectangles
 var rectver0 = av.g.rect(105, 10, 10, 180).css({"fill": "brown"}); 
 var rectver1 = av.g.rect(375, 10, 10, 180).css({"fill": "brown"}); 
 var rectver2 = av.g.rect(605, 10, 10, 180).css({"fill": "brown"}); 
// The moving ones
  var rect0 = av.g.rect(65, 30, 90, 20).css({"fill": "grey"});
  var rect1 = av.g.rect(50, 60, 120, 20).css({"fill": "yellow"});
  var rect2 = av.g.rect(35, 90, 150, 20).css({"fill": "purple"});
  var rect3 = av.g.rect(20, 120, 180, 20).css({"fill": "green"});
  var rect4 = av.g.rect(5, 150, 210, 20).css({"fill": "red"});
  var rect5 = av.g.rect(-10, 180, 240, 20).css({"fill": "blue"});
  
  var pseudo = av.code({url: "../../../SourceCode/Java/RecurTutor/RecTOH.java",
                       lineNumbers: false,top:200 , left:100});
  //av.umsg("Towers of Hanoi Visualizations"); 
  av.step();
  pseudo.highlight(2);
  av.step();
  pseudo.unhighlight(2);
  pseudo.highlight(4);
  rect0.hide();
  var rect06 = av.g.rect(565, 180, 90, 20).css({"fill": "grey"});
  av.step();
  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect1.hide();
  var rect17 = av.g.rect(315, 180, 120, 20).css({"fill": "yellow"});
  av.step();
  pseudo.unhighlight(9);
  av.step();
  pseudo.highlight(9); 
  rect06.hide();
  var rect068 = av.g.rect(330, 150, 90, 20).css({"fill": "grey"});
  av.step();
  pseudo.unhighlight(9);
  pseudo.highlight(10); 
  rect2.hide();
  var rect29 = av.g.rect(540, 180, 150, 20).css({"fill": "purple"});
  av.step();
 
  pseudo.unhighlight(10);
  pseudo.highlight(1);
  rect068.hide();
  var  rect06810 = av.g.rect(65, 90, 90, 20).css({"fill": "grey"});
  av.step();

  pseudo.unhighlight(1);
  pseudo.highlight(9);
  rect17.hide();
  var rect1711 = av.g.rect(550, 150, 120, 20).css({"fill": "yellow"});
  av.step();
  
  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect06810.hide();
  var  rect0681012 = av.g.rect(565, 120, 90, 20).css({"fill": "grey"});
  av.step();
  
  pseudo.unhighlight(4);
  pseudo.highlight(10);
  av.step();
  pseudo.unhighlight(10);
  pseudo.highlight(9);
   
  rect3.hide();
  var rect313 = av.g.rect(295, 180, 180, 20).css({"fill": "green"});
  av.step();
 
  pseudo.unhighlight(9);
  pseudo.highlight(1);
  av.step();

  pseudo.unhighlight(1);
  pseudo.highlight(4);
  rect0681012.hide();
  var  rect068101214 = av.g.rect(335, 150, 90, 20).css({"fill": "grey"});
  av.step();
  
  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect1711.hide();
  var rect171115 = av.g.rect(50, 120, 120, 20).css({"fill": "yellow"});
  av.step();

  
  pseudo.unhighlight(9);
  pseudo.highlight(1);
  rect068101214.hide();
  var rect015 = av.g.rect(65, 90, 90, 20).css({"fill": "grey"});
  av.step();
  pseudo.unhighlight(1);
  pseudo.highlight(10);
  av.step();
  
  pseudo.unhighlight(10);
  pseudo.highlight(9);
  rect29.hide();
  var rect216 = av.g.rect(315, 150, 150, 20).css({"fill": "purple"});
  av.step();
  
  pseudo.unhighlight(9);
  pseudo.highlight(1);
  av.step();
  
  pseudo.unhighlight(1);
  pseudo.highlight(4);
  rect015.hide();
  var rect017 = av.g.rect(565, 180, 90, 20).css({"fill": "grey"});
  av.step();
  
  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect171115.hide();
  var rect118 = av.g.rect(330, 120, 120, 20).css({"fill": "yellow"});
  av.step();
  
  pseudo.unhighlight(9);
  pseudo.highlight(1);
  av.step();
  pseudo.unhighlight(1);
  pseudo.highlight(4);
  rect017.hide();
  var rect019 = av.g.rect(340, 90, 90, 20).css({"fill": "grey"});
  av.step();

  pseudo.unhighlight(4);
  pseudo.highlight(10);
  av.step();
  
  pseudo.unhighlight(10);
  pseudo.highlight(9);
  rect4.hide();
  var rect420 = av.g.rect(515, 180, 210, 20).css({"fill": "red"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(1);

  av.step();
  pseudo.unhighlight(1);
  pseudo.highlight(4);
  rect019.hide();
  var rect021 = av.g.rect(65, 150, 90, 20).css({"fill": "grey"});
  av.step();
  
  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect118.hide();
  var rect122 = av.g.rect(550, 150, 120, 20).css({"fill": "yellow"});
  av.step();
  
  pseudo.unhighlight(9);
  pseudo.highlight(1);
  av.step();
  
  pseudo.unhighlight(1);
  pseudo.highlight(4);
  rect021.hide();
  var rect023 = av.g.rect(565, 120, 90, 20).css({"fill": "grey"});
  av.step();


  pseudo.unhighlight(4);
  pseudo.highlight(10);
  av.step();

  
  pseudo.unhighlight(10);
  pseudo.highlight(9);
  
  rect216.hide();
  var rect224 = av.g.rect(35, 150, 150, 20).css({"fill": "purple"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect023.hide();
  var rect025 = av.g.rect(330, 150, 90, 20).css({"fill": "grey"});
  av.step();


  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect122.hide();
  var rect126 = av.g.rect(50, 120, 120, 20).css({"fill": "yellow"});
  av.step();


  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect025.hide();
  var rect027 = av.g.rect(65, 90, 90, 20).css({"fill": "grey"});
  av.step();
  
  pseudo.unhighlight(4);
  pseudo.highlight(10);
  av.step();
  
  pseudo.unhighlight(10);
  pseudo.highlight(9);
  rect313.hide();
  var rect328 = av.g.rect(530, 150, 180, 20).css({"fill": "green"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(1);
  av.step();

  pseudo.unhighlight(1);
  pseudo.highlight(4);
  rect027.hide();
  var rect029 = av.g.rect(570, 120, 90, 20).css({"fill": "grey"});
  av.step();
  
  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect126.hide();
  var rect130 = av.g.rect(320, 180, 120, 20).css({"fill": "yellow"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(1);
  av.step();

  pseudo.unhighlight(1);
  pseudo.highlight(4);
  rect029.hide();
  var rect031 = av.g.rect(335, 150, 90, 20).css({"fill": "grey"});
  av.step();
  
  pseudo.unhighlight(4);
  pseudo.highlight(9); 
  rect224.hide();
  var rect232 = av.g.rect(545, 120, 150, 20).css({"fill": "purple"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect031.hide();
  var rect033 = av.g.rect(65, 150, 90, 20).css({"fill": "grey"});
  av.step();

  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect130.hide();
  var rect134 = av.g.rect(560, 90, 120, 20).css({"fill": "yellow"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect033.hide();
  var rect035 = av.g.rect(570, 60, 90, 20).css({"fill": "grey"});
  av.step();

  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect5.hide();
  var rect536 = av.g.rect(260, 180, 240, 20).css({"fill": "blue"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect035.hide();
  var rect037 = av.g.rect(335, 150, 90, 20).css({"fill": "grey"});
  av.step();
  
  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect134.hide();
  var rect138 = av.g.rect(55, 180, 120, 20).css({"fill": "yellow"});
  av.step();
  
  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect037.hide();
  var rect039 = av.g.rect(65, 150, 90, 20).css({"fill": "grey"});
  av.step();


  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect232.hide();
  var rect240 = av.g.rect(305, 150, 150, 20).css({"fill": "purple"});
  av.step();
  
  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect039.hide();
  var rect040 = av.g.rect(570, 120, 90, 20).css({"fill": "grey"});
  av.step();
  
  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect138.hide();
  var rect141 = av.g.rect(320, 120, 120, 20).css({"fill": "yellow"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect040.hide();
  var rect042 = av.g.rect(335, 90, 90, 20).css({"fill": "grey"});
  av.step();
  
  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect328.hide();
  var rect343 = av.g.rect(20, 180, 180, 20).css({"fill": "green"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect042.hide();
  var rect044 = av.g.rect(65, 150, 90, 20).css({"fill": "grey"});
  av.step();

  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect141.hide();
  var rect145 = av.g.rect(560, 150, 120, 20).css({"fill": "yellow"});
  av.step();


  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect044.hide();
  var rect046 = av.g.rect(570, 120, 90, 20).css({"fill": "grey"});
  av.step();

  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect240.hide();
  var rect247 = av.g.rect(35 , 150, 150, 20).css({"fill": "purple"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect046.hide();
  var rect048 = av.g.rect(335, 150, 90, 20).css({"fill": "grey"});
  av.step();


  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect145.hide();
  var rect149 = av.g.rect(55, 120, 120, 20).css({"fill": "yellow"});
  av.step();
  
  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect048.hide();
  var rect050 = av.g.rect(65, 90, 90, 20).css({"fill": "grey"});
  av.step();

  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect420.hide();
  var rect451 = av.g.rect(275, 150, 210, 20).css({"fill": "red"});
  av.step();


  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect050.hide();
  var rect052 = av.g.rect(565, 180, 90, 20).css({"fill": "grey"});
  av.step();


  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect149.hide();
  var rect153 = av.g.rect(320, 120, 120, 20).css({"fill": "yellow"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect052.hide();
  var rect054 = av.g.rect(335, 90, 90, 20).css({"fill": "grey"});
  av.step();

  
  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect247.hide();
  var rect255 = av.g.rect(545 , 180, 150, 20).css({"fill": "purple"});
  av.step();
  
  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect054.hide();
  var rect055 = av.g.rect(65, 150, 90, 20).css({"fill": "grey"});
  av.step();

 pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect153.hide();
  var rect156 = av.g.rect(560, 150, 120, 20).css({"fill": "yellow"});
  av.step();
  
  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect055.hide();
  var rect057 = av.g.rect(570, 120, 90, 20).css({"fill": "grey"});
  av.step();
  
  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect343.hide();
  var rect358 = av.g.rect(295, 120, 180, 20).css({"fill": "green"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect057.hide();
  var rect059 = av.g.rect(335, 90, 90, 20).css({"fill": "grey"});
  av.step();

  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect156.hide();
  var rect160 = av.g.rect(55, 180, 120, 20).css({"fill": "yellow"});
  av.step();

  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect059.hide();
  var rect061 = av.g.rect(65, 150, 90, 20).css({"fill": "grey"});
  av.step();


  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect255.hide();
  var rect262 = av.g.rect(305 , 90, 150, 20).css({"fill": "purple"});
  av.step();


  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect061.hide();
  var rect063 = av.g.rect(570, 180, 90, 20).css({"fill": "grey"});
  av.step();

  pseudo.unhighlight(4);
  pseudo.highlight(9);
  rect160.hide();
  var rect164 = av.g.rect(320, 60, 120, 20).css({"fill": "yellow"});
  av.step();
 
  pseudo.unhighlight(9);
  pseudo.highlight(4);
  rect063.hide();
  var rect065 = av.g.rect(335, 30, 90, 20).css({"fill": "grey"});
  av.step();
  
  av.recorded();
  
}(jQuery));



//==============================================================================================================================
