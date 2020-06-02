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
  var av_name = "RegEXandRegLangORFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
    interpret = config.interpreter, // get the interpreter
    code = config.code;             // get the code object
  //frame 1
  av.umsg("In last section, we covered some NFAs that accept basic Regular Expressions like $\\emptyset$, $\\lambda$, and any alphabe letter in $\\Sigma$.")
  av.displayInit();
  //frame 2
  av.umsg("Also, we coverd how to convert an NFA with multiple final states into an NFA with a single NFA");
  av.step();
  //frame 3
  av.umsg("In this part, we will see how to convert more complex RegExs that includes $\\textbf{OR}$ operation.");
  av.step();
  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  var rFA = drawScheme(av, "r", 110,0);
  av.step();
  //frame 5
  av.umsg("We look at this NFA as a blackbox that accepts a RegEx. In some books it is named as NFA Scheme");
  av.step();
  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();
  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();
  //frame 8
  av.umsg("Correct. We need 2 NFA schemes. One represents the RegEx $r$ and the other NFA represents $s$.");
  var sFA = drawScheme(av, "s", 110,250);
  av.step();
  //frame 9
  av.umsg("Now we need to connect these 2 NFAs into one NFA that represents the RegEx $r+s$");
  av.step();
  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  var fa = new av.ds.FA({left: 0, top: 0, width: 50, height: 600});
  var newS = fa.addNode({value:"s", left: 10, top: 190});
  toggleInitial(fa, newS);
  sFA.initial._initialMarker.hide();
  sFA.initial.css({"font-weight": "normal"});
  rFA.initial._initialMarker.hide();
  rFA.initial.css({"font-weight": "normal"});
  av.step();
  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.g.line(40, 230, 165,320, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:100, top: 240});
  av.g.line(40, 215, 165,85, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:100, top: 80});
  av.step();
  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();
  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  var fa2 = new av.ds.FA({left: 540, top: 0, width: 20, height: 600});
  var newF = fa2.addNode({value:"f", left: -20, top: 190});
  toggleFinal(fa2, newF);
  rFA.getFinals()[0].css({"border-style": "dotted"});
  sFA.getFinals()[0].css({"border-style": "dotted"});
  av.step();
  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.g.line(390, 320, 520,220, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.g.line(395, 85, 520,220, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.step();
  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.label(lambda, {left:450, top: 80});
  av.label(lambda, {left:450, top: 240});
  av.step();
  //frame 16
  av.umsg("Done. The resulting NFA accepts $r + s$");
  fa.disableDragging();
  fa2.disableDragging();
  av.recorded();
});  