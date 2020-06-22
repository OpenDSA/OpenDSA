$(document).ready(function() {
  "use strict";
  function drawScheme(av, name, left, top){
    var fa = new av.ds.FA({left: left, top: top, width: 300, height: 200});
    var startX = 50;
    var lambda = String.fromCharCode(955);
    var s = fa.addNode({value:"s", left: startX, top: 50});
    var n1 = fa.addNode({value:" ",left: 100 + startX, top: 0});
    var n2 = fa.addNode({value:" ",left: 100 + startX, top: 50});
    var n3 = fa.addNode({value:" ",left: 100 + startX, top: 100});
    var f = fa.addNode({value:"f", left: 200 + startX, top: 50});
    fa.addEdge(n1, f,{weight: lambda});
    fa.addEdge(n2, f,{weight: lambda});
    fa.addEdge(n3, f,{weight: lambda});
    toggleInitial(fa, s);
    toggleFinal(fa, f);
    var e1 = fa.addEdge(s, n1, {weight:" "});
    e1.css({"stroke-dasharray": "."});
    var e2 = fa.addEdge(s, n2, {weight:" "});
    e2.css({"stroke-dasharray": "."});
    var e3 = fa.addEdge(s, n3, {weight:" "});
    e3.css({"stroke-dasharray": "."});
    //fa.css({outline: "1px black solid", border: "10px transparent solid;"});
    av.g.rect(left + 30, top + 10, 260, 150);
    av.label("NFA that accepts $" + name + "$", {left: left + 40, top: top +125});
    fa.disableDragging();
    return fa;
  }
  var av_name = "RegEXandRegLangConcatFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
    interpret = config.interpreter, // get the interpreter
    code = config.code;             // get the code object

  //frame 1
  
  av.umsg("Now, we need to find the NFA that can accept the RegEx $r \\cdot s$");
  av.displayInit();
  av.umsg(Frames.addQuestion("q1"));
  av.step();
  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();
  //frame 3
  av.umsg("We need 2 NFA schemes. One represents the RegEx $r$ and the other NFA represents $s$.");
  var rFA = drawScheme(av, "r", 110,0);
  var sFA = drawScheme(av, "s", 110,250);
  av.step();
  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();
  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  var fa = new av.ds.FA({left: 0, top: 0, width: 50, height: 600});
  var newS = fa.addNode({value:"s", left: 10, top: 190});
  toggleInitial(fa, newS);
  av.step();
  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  rFA.initial._initialMarker.hide();
  av.g.line(40, 215, 165,85, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  rFA.initial.css({"font-weight": "normal"});
  av.label(lambda, {left:100, top: 80});
  av.step();
  //frame 6
  av.umsg("Correct. Since the first part of any string in $L(r.s)$ must accepted in the NFA for $r$.");
  av.step();
  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  sFA.initial._initialMarker.hide();
  sFA.initial.css({"font-weight": "normal"});
  sFA.getFinals()[0].css({"border-style": "dotted"});
  av.g.line(380, 98, 175,320, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:220, top: 170});
  av.step();
  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  var fa2 = new av.ds.FA({left: 540, top: 0, width: 20, height: 600});
  var newF = fa2.addNode({value:"f", left: -20, top: 190});
  toggleFinal(fa2, newF);
  rFA.getFinals()[0].css({"border-style": "dotted"});
  av.step();
  //frame 8
  av.umsg("Conncet the old final state for the NFA that represents $s$ to the new final state with a $\\lambda$ transition");
  av.g.line(390, 320, 520,220, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.step();
  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.label(lambda, {left:450, top: 240});
  av.step();
  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();
  //frame 11
  av.umsg("The resulting NFA accepts $r \\cdot s$");
  fa.disableDragging();
  fa2.disableDragging();
  av.recorded();
});  