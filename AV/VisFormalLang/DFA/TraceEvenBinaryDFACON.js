document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');
$(document).ready(function() {
  "use strict";
  var av_name = "TraceEvenBinaryDFACON";
  var av = new JSAV(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  function TapeCell(x, y, width, value){
  this.X=x;
  this.Y=y;
  this.Width = this.Height = width;
  this.TapeValue = value;
}
TapeCell.prototype = {
  constructor: TapeCell,
  draw: function()
  {
    av.g.rect(this.X, this.Y, this.Width, this.Height);
    av.label(this.TapeValue, {left: this.X + 10, top: this.Y});
  }
}
function Tape(x, y, cellWidth, numberOfCells, listOfContents)
{
  this.cells = [];
  for (let index = 0; index < numberOfCells; index++) {
    this.cells.push(new TapeCell(x + (index * cellWidth), y, cellWidth,
     listOfContents.length > index? listOfContents[index]: ""));    
  }
}
Tape.prototype = {
  constructor: Tape,
  draw: function(){
    for (let index = 0; index < this.cells.length; index++) {
      this.cells[index].draw();
    }
  }
}
  var BinaryDFA = new av.ds.fa();
  var q0 = BinaryDFA.addNode({left: 50, top: 100});
  var q1 = BinaryDFA.addNode({left: 250, top: 100});
  BinaryDFA.disableDragging();
  toggleInitial(BinaryDFA, q0);
  toggleFinal(BinaryDFA, q1);
  BinaryDFA.addEdge(q0, q1, {weight: "0"});
  BinaryDFA.addEdge(q1, q0, {weight: "1"});
  BinaryDFA.addEdge(q0, q0, {weight: "1"});
  BinaryDFA.addEdge(q1, q1, {weight: "0"});
  BinaryDFA.layout();
  // Slide 1
  av.umsg("Consider the following NFA, we need to convert it to the equivalent DFA");
  //drawTape(av, 50,50,10,[0,0,0,0,0,0,0,0,0,0]);
  var tape = new Tape(50, 50, 50, 10, [0,1,2,3]);
  tape.draw();
  av.displayInit();

  // Slide 2
  av.umsg("Let's begin with the start state. Closure($q_0$) in $M_N$ is {$q_0,q_1,q_2$}. So this is the start state.");
  
  av.step();
  // Slide 3
  av.umsg("Now, we should determine the the possible transitions from out new start state. To do so, we need to check the transitions from {$q_0,q_1,q_2$} with $a$ and $b$ ");
  
  av.step();

  av.recorded();
});
