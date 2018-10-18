//document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');
$(document).ready(function() {
  "use strict";
  var av_name = "TraceEvenBinaryDFACON";
  var av = new JSAV(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;
  var url = interpret("fa1");
    
  function TapeHead(headX, headY){
    this.Y = headY;
    this.X = headX;
  }
  TapeHead.prototype = {
    constructor: TapeHead,
    drawHead: function(cellRect){
      //window.alert(cellRect.rObj.attrs.toSource());
      this.X = cellRect.rObj.attrs.x + cellRect.rObj.attrs.width / 2.0;
      this.Y = cellRect.rObj.attrs.y + 1.5 * cellRect.rObj.attrs.height;
      this.headArrow = av.g.line( this.X, this.Y,
      this.X, this.Y - 0.5 * cellRect.rObj.attrs.height, {"arrow-end": "classic-wide-long", opacity: 0,
      "stroke-width": 2});
      this.headArrow.show();
    }
  }

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
    this.cellRect = av.g.rect(this.X, this.Y, this.Width, this.Height);
    av.label(this.TapeValue, {left: 0, top: 0, relativeTo: this.cellRect});
  }
}
function Tape(x, y, cellWidth, numberOfCells, listOfContents)
{
  this.cellIndex = 0;
  this.cells = [];
  for (let index = 0; index < numberOfCells; index++) {
    this.cells.push(new TapeCell(x + (index * cellWidth), y, cellWidth,
     listOfContents.length > index? listOfContents[index]: ""));    
  }
  this.head = new TapeHead(x + cellWidth / 2.0, y - 20);
}
Tape.prototype = {
  constructor: Tape,
  draw: function(){
    for (let index = 0; index < this.cells.length; index++) {
      this.cells[index].draw();
    }
    this.head.drawHead(this.cells[0].cellRect);
  },
  moveTapeHeadToRight: function(){
    this.cellIndex ++;
    this.head.headArrow.hide();
    this.head.drawHead(this.cells[this.cellIndex].cellRect);
  },
  moveTapeHeadToLeft: function(){
    this.cellIndex --;
    this.head.headArrow.hide();
    this.head.drawHead(this.cells[this.cellIndex].cellRect);
  }
}
  var BinaryDFA = new av.ds.fa();

  FiniteAutomaton.prototype.loadFAFromJFLAPFile.call(BinaryDFA,url);
  BinaryDFA.disableDragging();
  var nodes = BinaryDFA.nodes();
  // Slide 1
  av.umsg("Let's trace the acceptance string 11010 by the following DFA");
  //drawTape(av, 50,50,10,[0,0,0,0,0,0,0,0,0,0]);
  var tape = new Tape(300, 20, 30, 10, [1,1,0,1,0]);
  av.displayInit();
  // Slide 2
  av.umsg("At the begining, the machine will be on the start state $q_0$.");
  tape.draw();
  nodes[0].highlight();
  av.step();
  // Slide 3
  av.umsg("When the machine reads 1 while it is on state $q_0$, the DFA will stays at state $q_0$.");
  av.step();
  tape.moveTapeHeadToRight();
  av.step();
  av.umsg("When the machine reads 0 while it is on state $q_0$, the DFA will moves to state $q_1$.");
  tape.moveTapeHeadToRight();
  nodes[0].unhighlight();
  nodes[1].highlight();
  av.step();
  av.umsg("When the machine reads 0 while it is on state $q_1$, the DFA will stays at state $q_1$.");
  tape.moveTapeHeadToRight();
  av.step();
  av.umsg("When the machine reads 1 while it is on state $q_1$, the DFA will moves to state $q_0$.");
  nodes[1].unhighlight();
  nodes[0].highlight();
  tape.moveTapeHeadToRight();
  av.step();
  av.umsg("When the machine reads 0 while it is on state $q_0$, the DFA will moves to state $q_1$.");
  av.step();  av.umsg("When the machine reads 0 while it is on state $q_0$, the DFA will moves to state $q_1$.");
  tape.moveTapeHeadToRight();
  nodes[0].unhighlight();
  nodes[1].highlight();
  av.step();
  av.umsg("Now the string is finished and the state is on a final (accepting) state. Thus, the string 11010 is accepted by the DFA");
  //q1.unhighlight();
  av.recorded();
});
