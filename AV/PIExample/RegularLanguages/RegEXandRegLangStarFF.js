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
  var av_name = "RegEXandRegLangStarFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
    interpret = config.interpreter, // get the interpreter
    code = config.code;             // get the code object

  av.umsg("The last operator is the Kleene star ($*$) operator. As we know this operator means that we need to concatenate the language with itself for Zero or more times.");
  av.displayInit();
  av.umsg(Frames.addQuestion("q2"));
  av.step();
  av.umsg(Frames.addQuestion("q3"));
  var rFA = drawScheme(av, "r", 150,150);
  av.step();
  av.umsg(Frames.addQuestion("q4"));
  var fa = new av.ds.FA({left: 50, top: 0, width: 50, height: 600});
  var newS = fa.addNode({value:"s", left: 10, top: 200});
  toggleInitial(fa, newS);
  rFA.initial._initialMarker.hide();
  rFA.initial.css({"font-weight": "normal"});
  av.step();
  av.umsg("Connct the new start state with the NFA start state using a lambda transition.");
  av.g.line(90, 230, 200, 230, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:130, top:195});
  av.step();
  av.umsg(Frames.addQuestion("q8"));
  var fa2 = new av.ds.FA({left: 550, top: 0, width: 20, height: 600});
  var newF = fa2.addNode({value:"f", left: -20, top: 200});
  toggleFinal(fa2, newF);
  rFA.getFinals()[0].css({"border-style": "dotted"});
  av.step();
  av.umsg("Concet the final state for the NFA with the new finla state by a lambda transition.")
  av.g.line(435, 230, 530, 230, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:480, top:195});
  av.step();
  av.umsg(Frames.addQuestion("q9"));
  av.step();
  av.umsg(Frames.addQuestion("q10"));
  av.g.path('M '+ 90 + ',' + 230 + ' Q' + 320 + ',' 
        + 600 + ' ' + 530 + ',' + 235, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:320, top:375});
  av.step();
  av.umsg(Frames.addQuestion("q12"));
  av.g.path('M '+ 530 + ',' + 225 + ' Q' + 320 + ',' 
        + 0 + ' ' + 90 + ',' + 225, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:320, top:50});
  fa.disableDragging();
  fa2.disableDragging();
  av.step();
  av.umsg("Done. This is the NFA that accepts $r^*$")
  av.recorded();
  
});  