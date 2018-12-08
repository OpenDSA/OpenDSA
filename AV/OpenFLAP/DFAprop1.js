document.write('<script src="../../../AV/Development/formal_language/fa/Automaton.js"></script>');
document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"../../../AV/Development/formal_language/css/FA.css\" />");

$(document).ready(function() {
  "use strict";

  var av_name = "DFAprop1";
  var av = new JSAV(av_name);
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter;
  var url = interpret("prop1");

  var BinaryDFA = new av.ds.fa();
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(BinaryDFA,url);
  BinaryDFA.disableDragging();
　
  av.displayInit();
  
  // change slides
  //BinaryDFA.hide();
  var url2 = interpret("prop2");
  var BinaryDFA2 = new av.ds.fa();
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(BinaryDFA2,url2);
  BinaryDFA2.disableDragging();
  av.step();
  
  //BinaryDFA2.hide();
  var url3 = interpret("prop3");
  var BinaryDFA3 = new av.ds.fa();
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(BinaryDFA3,url3);
  BinaryDFA3.disableDragging();
  av.step();
  
  //BinaryDFA3.hide();
  var url4 = interpret("prop4");
  var BinaryDFA4 = new av.ds.fa();
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(BinaryDFA4,url4);
  BinaryDFA4.disableDragging();
  av.step();
  
  //BinaryDFA4.hide();
  var url5 = interpret("prop5");
  var BinaryDFA5 = new av.ds.fa();
  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(BinaryDFA5,url5);
  BinaryDFA5.disableDragging();
  
  av.recorded();
});