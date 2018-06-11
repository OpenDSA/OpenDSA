$(document).ready(function() {
  "use strict";
  var av_name = "paramPassingByRef";

  var av = new JSAV(av_name);

  // Relative offsets
  var leftMargin = 50;
  var topMargin = 4;

  av.umsg("main() begins execution.");

  var pseudo = av.code(["void foo(int r, int s){",
  " s = r;",
  " g = 3;",
  " r = a[g];",
  " a[g] = a[2];",
  "}",
  "int main() {",
  " int g = 2;",
  " foo(g, a[g]);",
  "}"],
  {left: leftMargin, top: topMargin, lineNumbers: false});

  av.label("g", {left: leftMargin+220, top: topMargin + 4});
  var gVar = av.ds.array([0], {indexed: false, left: leftMargin+235, top: topMargin});
  av.label("a", {left: leftMargin+220, top: topMargin+36});
  var aArray = av.ds.array([-9,-1,-6,4,10],
    {indexed: true, left: leftMargin+235, top: topMargin+32});

  av.label("main", {left: leftMargin+220, top: topMargin+80});
  av.g.rect(leftMargin+220, topMargin+122, 150, 40);

  pseudo.setCurrentLine(7);

  av.displayInit();
  av.step();

  av.umsg("main's g is initialized to 2.");

  pseudo.setCurrentLine(8);
  av.label("g", {left: leftMargin+225, top: topMargin+116});
  var mainGVar = av.ds.array([2], {indexed: false, left: leftMargin+240, top: topMargin+112});

  av.step();

  av.umsg("foo is called, with a reference to main's g and a[2] passed in.",{preserve: false});
  pseudo.setCurrentLine(9);

  av.step();

  pseudo.setCurrentLine(1);

  /*var fooBoxLbl = av.label("foo", {left: leftMargin+375, top: topMargin+68});
  var fooBox = av.g.rect(leftMargin+375, topMargin+110, 150, 40);*/

  var rPointer = av.pointer('r', mainGVar,
    {targetIndex:0, top:68, right:42, arrowAnchor:"center bottom"});
  var sPointer = av.pointer('s', aArray,
    {targetIndex:2, bottom:68, left:32});

  av.step();

  av.umsg("a[2] is set to the value of main's g.");
  pseudo.setCurrentLine(2);

  aArray.value(2, mainGVar.value(0));
  aArray.highlight(2);
  mainGVar.highlight(0);

  av.step();

  av.umsg("g is set to 3.");
  pseudo.setCurrentLine(3);

  mainGVar.unhighlight(true);
  aArray.unhighlight(true);
  gVar.highlight(0);
  gVar.value(0,3);

  av.step();

  av.umsg("main's g is set to the value of a[3].");
  pseudo.setCurrentLine(4);

  gVar.unhighlight(true);
  mainGVar.highlight(0);
  aArray.highlight(3);
  mainGVar.value(0, aArray.value(3));

  av.step();

  av.umsg("a[3] is set to the value of a[2].");
  pseudo.setCurrentLine(5);

  mainGVar.unhighlight(true);
  aArray.unhighlight(true);
  aArray.highlight([2,3]);
  aArray.value(3,aArray.value(2));

  av.step();

  av.umsg("In this context, r = 4, s = 2, and g = 3.");

  aArray.unhighlight(true);

  av.step();

  av.umsg("In this context, g = 4. The values stored in array a can be seen below.");
  pseudo.setCurrentLine(9);

  rPointer.hide();//makes the slideshow area super tall
  sPointer.hide();//don't know why

  av.recorded();
});
