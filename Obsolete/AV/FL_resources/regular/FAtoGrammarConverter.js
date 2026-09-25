var FAtoGrammarConverter = function(jsav, FA) {
    this.init(jsav, FA);
  };
  
  var controllerProto = FAtoGrammarConverter.prototype;
  
  controllerProto.init = function(jsav, FA) {
      this.jsav = jsav;
      this.FA = FA;
  }
  controllerProto.convertToGrammar = function (grammarMatrix) {
    // by default sets S to be the start variable
    var variables = "SABCDEFGHIJKLMNOPQRTUVWXYZ";
    var s = this.FA.initial;
    var newVariables = [s];
    var nodes = this.FA.nodes();
    var arrow = String.fromCharCode(8594);
    var converted = [];
    var matrixIndex = 0;
    // quit if the FA is too large for conversion
    if (this.FA.nodeCount() > 26) {
        window.alert('The FA must have at most 26 states to convert it into a grammar!');
        return;
    }
    for (var next = nodes.next(); next; next = nodes.next()) {
        if (!next.equals(s)) {
            newVariables.push(next);
        }
    }
    var finals = [];
    this.jsav.step();
    this.jsav.umsg("Now we need to check every state and transition to determine grammar productions.");
    for (var i = 0; i < newVariables.length; i++) {
        var edges = newVariables[i].getOutgoing();
        this.jsav.step();
        if(i>0){
            newVariables[i - 1].unhighlight();     
            newVariables[i - 1].getOutgoing().map(function(edge){
                edge.removeClass("testingLambda");
                edge._label.removeClass("testingLambda");
            });
        }
        this.jsav.umsg("For state: " + newVariables[i].value() + ", there " + ((edges.length>1)? "are ": "is ") + edges.length + " transition" + ((edges.length>1)?"s": ""));
        newVariables[i].highlight();
        for (var j = 0; j < edges.length; j++) {
            var toVar = variables[newVariables.indexOf(edges[j].end())];
            var weight = edges[j].weight().split("<br>");
            newVariables[i].getOutgoing().map(function(edge){
                edge.addClass("testingLambda");
                edge._label.addClass("testingLambda");
            });
            for (var k = 0; k < weight.length; k++) {
                var terminal = weight[k];
                if (weight[k] === emptystring) {
                    terminal = "";
                }
                converted.push([variables[i], arrow, terminal + toVar]);
                grammarMatrix.value(matrixIndex, 0 , variables[i]);
                grammarMatrix.value(matrixIndex, 2, terminal + toVar);
                grammarMatrix._arrays[matrixIndex++].show();
                
            }
        }
        if (newVariables[i].hasClass('final')) {
            this.jsav.step();
            this.jsav.umsg("Since " + variables[i] + " is the final state, we need to add a new transition with "+ emptystring);
            finals.push([variables[i], arrow, emptystring]);
            grammarMatrix.value(matrixIndex, 0 , variables[i]);
            grammarMatrix.value(matrixIndex, 2, emptystring);
            grammarMatrix._arrays[matrixIndex].show();
        }
    }
    newVariables[newVariables.length - 1].unhighlight();     
    newVariables[newVariables.length - 1].getOutgoing().map(function(edge){
        edge.removeClass("testingLambda");
        edge._label.removeClass("testingLambda");
    });
    converted = converted.concat(finals);
    // save resulting grammar as an array of arrays of strings
    // (same format as how the grammarEditor reads grammars)
   
    return JSON.stringify(converted);
};