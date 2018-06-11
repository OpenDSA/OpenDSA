$(document).ready(function() {
  "use strict";
  var av_name = "paramPassingByVal";

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
  var mainBox = av.g.rect(leftMargin+220, topMargin+122, 150, 74);

  pseudo.setCurrentLine(7);

  av.displayInit();
  av.step();

  av.umsg("main's g is initialized to 2.");

  pseudo.setCurrentLine(8);
  av.label("g", {left: leftMargin+225, top: topMargin+116});
  var mainGVar = av.ds.array([2], {indexed: false, left: leftMargin+240, top: topMargin+112});

  av.step();

  av.umsg("foo is called, with a copy of main's g and a[2] passed in.",{preserve: false});
  pseudo.setCurrentLine(9);

  av.step();

  pseudo.setCurrentLine(1);

  var fooBox = av.g.rect(leftMargin+375, topMargin+122, 150, 74);
  var fooBoxLbl = av.label("foo",
  {relativeTo:fooBox, anchor:"left top", myAnchor:"left bottom", left:0, bottom:40})

  var rVarLbl = av.label("r",
    {relativeTo:fooBox, anchor:"left top", myAnchor:"left top", left:5, top:10});
  var rVar = av.ds.array([2],
    {relativeTo:rVarLbl, anchor:"right center", myAnchor:"left center", indexed:false, left:8, top:8});
  var sVarLbl = av.label("s",
    {relativeTo:rVarLbl, anchor:"center bottom", myAnchor:"center top", left:0, top:12});
  var sVar = av.ds.array([-6],
    {relativeTo:sVarLbl, anchor:"right center", myAnchor:"left center", indexed:false, left:8, top:8});


  av.step();

  av.umsg("s is set to the value of r.");
  pseudo.setCurrentLine(2);

  sVar.value(0, rVar.value(0));
  sVar.highlight(0);
  rVar.highlight(0);

  av.step();

  av.umsg("g is set to 3.");
  pseudo.setCurrentLine(3);

  sVar.unhighlight(true);
  rVar.unhighlight(true);
  gVar.highlight(0);
  gVar.value(0,3);

  av.step();

  av.umsg("r is set to the value of a[3].");
  pseudo.setCurrentLine(4);

  gVar.unhighlight(true);
  rVar.highlight(0);
  aArray.highlight(3);
  rVar.value(0, aArray.value(3));

  av.step();

  av.umsg("a[3] is set to the value of a[2].");
  pseudo.setCurrentLine(5);

  rVar.unhighlight(true);
  aArray.unhighlight(true);
  aArray.highlight([2,3]);
  aArray.value(3,aArray.value(2));

  av.step();

  av.umsg("In this context, r = 4, s = 2, and g = 3.");

  aArray.unhighlight(true);

  av.step();

  av.umsg("In this context, g = 2. The values stored in array a can be seen below.");
  pseudo.setCurrentLine(9);

  av.recorded();
});
