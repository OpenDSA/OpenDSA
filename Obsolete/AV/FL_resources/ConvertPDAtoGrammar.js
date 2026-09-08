var lambda = String.fromCharCode(955),
epsilon = String.fromCharCode(949),
square = String.fromCharCode(9633),
dot = String.fromCharCode(183),
arrow = String.fromCharCode(8594),
emptystring = lambda;
var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var PDAtoGrammarTransformer = function(jsav, grammar, grammerMatrix) {
    this.init(jsav, grammar, grammerMatrix);
  };
  
  var transformerProto = PDAtoGrammarTransformer.prototype;
  transformerProto.init = function(jsav, grammar, grammerMatrix){
    this.jsav = jsav;
    this.productions = JSON.parse(grammar);
    this.matrix = grammerMatrix;
    this. varCounter = 1;
}


transformerProto.convertToPDA = function () {
    var productions = this.productions;
    this.jsav.umsg("The first step is to create a new PDA with three states.")
    this.builtDFA = this.jsav.ds.FA({width: 500, top: 0, left: 100});
    var gWidth = this.builtDFA.element.width(),
        gHeight = this.builtDFA.element.height();
    var a = this.builtDFA.addNode({left: 0.17 * gWidth, top: 0.87 * gHeight}),
        b = this.builtDFA.addNode({left: 0.47 * gWidth, top: 0.87 * gHeight}),
        c = this.builtDFA.addNode({left: 0.77 * gWidth, top: 0.87 * gHeight});
    this.builtDFA.makeInitial(a);
    c.addClass('final');
    var startVar = productions[0][0];
    this.builtDFA.layout();
    this.jsav.step();
    this.convertToPDAinLL(a, b, c, productions, startVar);
  };

  transformerProto.convertToPDAinLL = function(a, b, c, productions, startVar) {
    this.jsav.umsg("Connect the start state with $q_1$ by " + emptystring + ':Z:' + startVar + 'Z');
    this.builtDFA.addEdge(a, b, {weight: emptystring + ':Z:' + startVar + 'Z'});
    this.builtDFA.layout();
    this.jsav.step();
    this.jsav.umsg("Connect $q_1$ state by the final state by " +  emptystring + ':Z:' + emptystring);
    this.builtDFA.addEdge(b, c, {weight: emptystring + ':Z:' + emptystring});
    this.builtDFA.layout();
    this.jsav.step();
    this.jsav.umsg("We need to create a transition from $q_1$ to iteself for every terminal we have.")
    // add a transition for each terminal
    for (var i = 0; i < productions.length; i++) {
      var t = productions[i][2].split("");
      for (var j = 0; j < t.length; j++) {
        if (variables.indexOf(t[j]) === -1 && t[j] !== emptystring) {
            this.builtDFA.addEdge(b, b, {weight: t[j] + ':' + t[j] + ':' + emptystring});
        }
      }
    }
    var bEdge = this.builtDFA.getEdge(b, b);
    //$(bEdge._label.element[0]).css('font-size', '1.4em');
    this.builtDFA.layout();

    this.pCount = 0;
    //this.labelHeight = $(bEdge._label.element[0]).height();
    // handler for the grammar table
    this.jsav.step();
    for(var i = 0; i< productions.length; i++){
        this.jsav.umsg("Create a tranistion from $q_1$ to itself for each helighted production.")
        this.convertGrammarHandler(a, b, c, i, this.matrix);
        this.jsav.step();
        this.matrix.unhighlight(i);
    }
  };
  transformerProto.convertGrammarHandler = function (a, b, c,index, matrix) {
    matrix.highlight(index);
  var l = matrix.value(index, 0);
  var r = matrix.value(index, 2);
  var newEdge = this.builtDFA.addEdge(b, b, {weight: emptystring + ':' + matrix.value(index, 0) + ':' + matrix.value(index, 2)});
  if (newEdge) {
    newEdge.layout();
    this.pCount++;
    // scale graph window
    //if ($(newEdge._label.element[0]).offset().top < $('.jsavgraph').offset().top) {
      //var h = $(".jsavgraph").height();
      //var newLabelHeight = $(newEdge._label.element[0]).height();
      //var graphOffset = (newLabelHeight - this.labelHeight) / this.pCount;
      //$(".jsavgraph").height(h + graphOffset);
      //var nodeY = $(a.element).offset().top;
      //$(a.element).offset({top: nodeY + graphOffset});
      //$(b.element).offset({top: nodeY + graphOffset});
      //$(c.element).offset({top: nodeY + graphOffset});
      //this.builtDFA.layout();
    //}
    if (this.pCount === this.productions.length) {
      this.jsav.umsg("Fininshed");
    }
  }
};