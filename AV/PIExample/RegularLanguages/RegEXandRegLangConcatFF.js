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
  //frame 2
  av.umsg("We need 2 NFA schemes. One represents the RegEx $r$ and the other NFA represents $s$.");
  var rFA = drawScheme(av, "r", 110,0);
  var sFA = drawScheme(av, "s", 110,250);
  av.step();
  //frame 3
  av.umsg("Now we need to connect these 2 NFAs into one NFA that represents the RegEx $r \\cdot s$");
  av.step();
  //frame 4
  av.umsg("The first step now is to create a new start state");
  var fa = new av.ds.FA({left: 0, top: 0, width: 50, height: 600});
  var newS = fa.addNode({value:"s", left: 10, top: 190});
  toggleInitial(fa, newS);
  rFA.initial._initialMarker.hide();
  rFA.initial.css({"font-weight": "normal"});
  av.step();
  //frame 5
  av.umsg("Conncet the new start state with the start state for NFA that represents $r$ using a labmda transition");
  av.g.line(40, 215, 165,85, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:100, top: 80});
  av.step();
  //frame 6
  av.umsg("Now, connect the final state for the NFA that represents $r$ with the start state of the NFA that represents $s$ with a $\\lambda$ transition");
  sFA.initial._initialMarker.hide();
  sFA.initial.css({"font-weight": "normal"});
  sFA.getFinals()[0].css({"border-style": "dotted"});
  av.g.line(380, 98, 175,320, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:220, top: 170});
  av.step();
  //frame 7
  av.umsg("Then creat a new final state");
  var fa2 = new av.ds.FA({left: 540, top: 0, width: 20, height: 600});
  var newF = fa2.addNode({value:"f", left: -20, top: 190});
  toggleFinal(fa2, newF);
  rFA.getFinals()[0].css({"border-style": "dotted"});
  av.step();
  //frame 8
  av.umsg("Conncet the old final state for the NFA that represents $s$ to the new final state with a $\\lambda$ transition");
  av.g.line(390, 320, 520,220, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:450, top: 240});
  av.step();
  //frame 9
  av.umsg("The resulting NFA accepts $r \\cdot s$");
  fa.disableDragging();
  fa2.disableDragging();
  av.recorded();
});  