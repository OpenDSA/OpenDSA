var lambda = String.fromCharCode(955),
epsilon = String.fromCharCode(949),
square = String.fromCharCode(9633),
dot = String.fromCharCode(183),
arrow = String.fromCharCode(8594),
emptystring = lambda;
var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var ContextFreeGrammarTransformer = function(jsav, grammar) {
    this.init(jsav, grammar);
  };
  
  var transformerProto = ContextFreeGrammarTransformer.prototype;
  transformerProto.init = function(jsav, grammar){
    this.jsav = jsav;
    this.productions = JSON.parse(grammar);
    this. varCounter = 1;
}
// remove lambda productions
transformerProto.removeLambda = function (GrammarMatrix) {
  var derivers = {};  // variables that derive lambda
  var productions = this.productions;
  var counter = 0;
  // find lambda-deriving variables
  this.jsav.umsg("We need to identify the productions that produce " + emptystring);
  while (this.removeLambdaHelper(derivers, productions, GrammarMatrix)) {
    counter++;
    if (counter > 500) {
      console.log(counter);
      break;
    }
  };
  if (productions[0][0] in derivers) {
    alert('The start variable derives '+emptystring+'.');
  }
  this.jsav.step();
  var transformed = [];
  // remove lambda productions
  productions = _.filter(productions, function(x) { return x[2] !== emptystring;});
  transformed = transformed.concat(productions);
  this.jsav.umsg("Now we need to replace any production that has an occuarance for a Varialble that produces a " + emptystring);
  var newGrammarMatrix = this.jsav.ds.matrix(productions, {style: "table", left: 210});
  this.jsav.step();
  for (var i = 0; i < productions.length; i++) {
    if(i>0){
      newGrammarMatrix.unhighlight(i-1, 0);
      newGrammarMatrix.unhighlight(i-1, 1);
      newGrammarMatrix.unhighlight(i-1, 2);
      newGrammarMatrix = this.jsav.ds.matrix(transformed, {style: "table", left: 210});
      this.jsav.umsg("Replacing the variable(s) that produce(s) " + emptystring + " will add these new productions");
      this.jsav.step();
    }
    newGrammarMatrix.highlight(i, 0);
    newGrammarMatrix.highlight(i, 1);
    newGrammarMatrix.highlight(i, 2);
    var p = productions[i];
    // find lambda deriving variables in right hand side
    var v = _.filter(p[2], function(x) { return x in derivers;});
    if (v.length > 0) {
      this.jsav.umsg("Production " + productions[i] + " has variable"+ (v.length>1?"s ":" ") + " that produce"+ (v.length>1?" ":"s ") + emptystring);
      v = v.join('');
      for (var j = v.length - 1; j >= 0; j--) {
        // remove all combinations of lambda-deriving variables
        var n = getCombinations(v, j + 1);
        for (var next = n.next(); next.value; next = n.next()) {
          var replaced = p[2];
          for (var k = 0; k < next.value.length; k++) {
            replaced = replaced.replace(next.value[k], "");
          }
          // if not a lambda production
          if (replaced && !_.find(transformed, function(x) {return x[0] === p[0] && x[2] === replaced})) {
            transformed.push([p[0], arrow, replaced]);
          }
        }
      }
    }
    
    else{
      this.jsav.umsg("Production " + productions[i] + " does not have any variable that produces " + emptystring);
      
    }
    this.jsav.step();
  }
  newGrammarMatrix.unhighlight(i-1, 0);
  newGrammarMatrix.unhighlight(i-1, 1);
  newGrammarMatrix.unhighlight(i-1, 2);
  newGrammarMatrix = this.jsav.ds.matrix(transformed, {style: "table", left: 210});
  this.jsav.umsg("Replacing the variable(s) that produce(s) " + emptystring + " will add these new productions");
  this.jsav.step();
  var ret = _.map(transformed, function(x) {return x.join('');});
  this.jsav.umsg("The resulting grammar is " + emptystring + " free");
  GrammarMatrix.hide();
  this.jsav.step();
  return ret;
};

/*
Function to find lambda-deriving variables.
A variable derives lambda if it directly produces lambda or if its right side is
composed only of lambda-deriving variables.
Used during parsing as well.
*/
transformerProto.removeLambdaHelper = function (set, productions, GrammarMatrix) {
  for (var i = 0; i < productions.length; i++) {
    if (productions[i][2] === emptystring || _.every(productions[i][2], function(x) { return x in set;})) {
      if (!(productions[i][0] in set)) {
        GrammarMatrix.highlight(i,0);
        GrammarMatrix.highlight(i,1);
        GrammarMatrix.highlight(i,2);
        set[productions[i][0]] = true;
        return true;
      }
    }
  }
  return false;
};
// check if browser supports generators
var isGeneratorSupported = function () {
  try {
    eval("(function*(){})()");
    return true;
  } catch(err){
    console.log(err);
    console.log("No generator support.");
    return false;
  }
}
// creates a generator for the combinations of variables to remove

  var getCombinations = function* (str, l) {
    for (var i = 0; i < str.length; i++) {
      if (l === 1) {
        yield [str[i]];
      } else {
        var n = getCombinations(str.substring(i + 1), l - 1);
        for (var next = n.next(); next.value; next = n.next()) {
          yield [str[i]].concat(next.value);
        }
      }
    }
  };

// remove unit productions
transformerProto.removeUnit = function (GrammarMatrix) {
  this.originalMatrix = GrammarMatrix;
  var productions = this.productions;
  var pDict = {};
  // a dictionary mapping left sides to right sides
  for (var i = 0; i < productions.length; i++) {
    if (!(productions[i][0] in pDict)) {
      pDict[productions[i][0]] = [];
    }
    pDict[productions[i][0]].push(productions[i][2]);
  }
  var v = [];
    for (var i = 0; i < productions.length; i++) {
      if (v.indexOf(productions[i][0]) === -1) {
        v.push(productions[i][0]);
      }
  }
  var modelDFA = this.jsav.ds.graph({layout: "layered", directed: true, left: 420});
  for (var i = 0; i < v.length; i++) {
    modelDFA.addNode(v[i]);
  }
  var unitProductions = _.filter(productions, function(x) {
    // return x[2].length === 1 && variables.indexOf(x[2]) !== -1;
    return x[2].length === 1 && variables.indexOf(x[2]) !== -1;
  });
  modelDFA.layout();
  var nodes1 = modelDFA.nodes();
  for (var from = nodes1.next(); from; from = nodes1.next()) {
    var nodes2 = modelDFA.nodes();
    for(var to = nodes2.next(); to; to = nodes2.next()){
      if (_.find(unitProductions, function(x) {return x[0] === from.value() && x[2] === to.value();})) {
        this.jsav.umsg("The production " + from.value() + arrow + to.value() + " is a unit production.");
        var newEdge = modelDFA.addEdge(from, to);
        if (newEdge) { modelDFA.layout();}
        this.jsav.step();
      }
    } 
  }
  this.jsav.umsg("The next step is to replace them by substituting each variable with its RHS value")
  this.jsav.step();
  var emptyLine = _.filter(productions, function(x) { return true;});
  for(var i = 0; i< 3*productions.length; i++)
    emptyLine.push(["", arrow, ""]);
  this.newGrammerMatrix = this.jsav.ds.matrix(emptyLine, {style: "table", left: 210});
  for(var i = 0; i< 3*productions.length; i++)
    this.newGrammerMatrix._arrays[productions.length + i].hide();
  var counter = 0;
  while (this.removeUnitHelper(productions, pDict)) {
    counter++;
    if (counter > 500) {
      console.log(counter);
      break;
    }
  };
  // remove original unit productions
  productions = _.filter(productions, function(x) {
    return !(x[2].length === 1 && variables.indexOf(x[2]) !== -1);
  });
  var ret = _.map(productions, function(x) {return x.join('');});
  this.jsav.umsg("The resulting grammar has no unit productions.")
  this.originalMatrix.hide();
  modelDFA.hide();
  this.jsav.step();
  return ret;
};

// Function to find a unit production and add one of the replacement productions
transformerProto.removeUnitHelper = function (productions, pDict) {
  for (var i = 0; i < productions.length; i++) {
    if (productions[i][2].length === 1 && variables.indexOf(productions[i][2]) !== -1) {
      var p = pDict[productions[i][2]];
      var n = [];
      for (var j = 0; j < p.length; j++) {
        if (p[j].length === 1 && variables.indexOf(p[j]) !== -1) {
          continue;
        } else if (!_.find(productions, function(x){ return x[0] === productions[i][0] && x[2] === p[j];})) {
          n.push(p[j]);
        }
      }
      var newProductions = [];
      this.newGrammerMatrix._arrays[i].hide();
      for(var k = 0; k < n.length; k++) {
        productions.push([productions[i][0], arrow, n[k]]);
        newProductions.push([productions[i][0], arrow, n[k]].join(''));
        this.newGrammerMatrix._arrays[productions.length - 1].show();
        this.newGrammerMatrix._arrays[productions.length - 1]._indices[0].value(productions[productions.length - 1][0]);
        this.newGrammerMatrix._arrays[productions.length - 1]._indices[2].value(n[k]);
        highlightProductionByIndex(this.newGrammerMatrix, productions.length - 1);
        pDict[productions[i][0]].push(n[k]);
      }
      if(n.length > 0){
        highlightProductionByIndex(this.originalMatrix, i);
        this.jsav.umsg("The production " + productions[i].join('') + " is a unit production. It will be replaced by " +  newProductions.join(', '));
        this.jsav.step();
        unhighlightMatrix(this.originalMatrix);
        unhighlightMatrix(this.newGrammerMatrix);
      }
    }
  }
  return (n.length > 0);
};

 // remove useless productions
transformerProto.removeUseless = function (matrix) {
  this.GrammarMatrix = matrix;
  this.jsav.umsg("To remove useless productions, we need to check for two things.\n1) Productions that do not produce a terminal string (No infinity loop).\n2) Productions that are not reachable from the start variable. ")
  this.jsav.step();
  var derivers = {};  // variables that derive a string of terminals
  var productions = this.productions;
  var counter = 0;
  var newGrammarMatrix;
  this.jsav.umsg("We will start by looking for procutions that produce an infinity loop. In other words, productions that will not produce terminal string.");
  this.jsav.step();
  while (this.findDerivable(derivers, productions)) {
    counter++;
    if (counter > 500) {
      console.log(counter);
      break;
    }
  };
  var transformed = [];
  // remove productions which do not derive a string of terminals
  for (var i = 0; i < productions.length; i++) {
    if (_.every(productions[i][2], function(x) { return x in derivers || variables.indexOf(x) === -1;})) {
      transformed.push(productions[i]);
    }
  }
  if(transformed.length === productions.length){
    this.jsav.umsg("In this grammar, all productions can produce terminal strings.");
    this.jsav.step();
  }
  else{//we need to test this
    diff = getGrammarVariables(productions).filter(function(x) { return getGrammarVariables(transformed).indexOf(x) < 0 });
    for(var l = 0; l< diff.length; l++) {
      this.jsav.umsg("Variable " + diff[l][0] + " does not produce terminal strings. It should be removed from the grammar.")
      highlightProductionWithVariableOccurance(this.GrammarMatrix, diff[l][0]);
      this.jsav.step();
    }
    this.jsav.umsg("This is the resulting grammar after the first step.")
    GrammarMatrix = this.jsav.ds.matrix(transformed, {style: "table", left: 210});
    unhighlightMatrix(this.GrammarMatrix);
    this.jsav.step();
  }
  
  this.jsav.umsg("Then, we need to check the reachability of the variables. We can use dependency graph to help us identifying unreachable variables.")
  this.jsav.step();
  this.jsav.umsg("In the dependency graph, each variable is a state and an edge $(u, v)$ means that node $v$ can be reached from node $u$.")
  var modelDFA = this.jsav.ds.graph({layout: "layered", directed: true, left: 500});
  var top = 0;
  var vairables = getGrammarVariables(transformed);
  for (var i = 0; i < vairables.length; i++) {
    var a = modelDFA.addNode(vairables[i]);
    top+=50;
  }
  modelDFA.layout({layout: 'automatic'});
  this.jsav.step();
  var pDict = {};   // dictionary to hold reachable variables
  var start = transformed[0][0];
  for (var i = 0; i < transformed.length; i++) {
    if (!(transformed[i][0] in pDict)) {
      pDict[transformed[i][0]] = [];
    }
    // map left hand side to the variables in the right hand side
    var r = _.uniq(_.filter(transformed[i][2], function(x) {return variables.indexOf(x) !== -1;}));
    pDict[transformed[i][0]] = _.union(pDict[transformed[i][0]], r);
  }
  var visited = {};
  visited[start] = true;
  // find reachable variables and map them in pDict
  this.findReachable(start, pDict, visited);
  var nodes1 = modelDFA.nodes();
  for (var from = nodes1.next(); from; from = nodes1.next()) {
    var nodes2 = modelDFA.nodes();
    for(var to = nodes2.next(); to; to = nodes2.next()){
      if (_.find(transformed, function(x) {return x[0] === from.value() && x[2].indexOf(to.value()) !== -1;})){
        unhighlightMatrix(GrammarMatrix);
        this.jsav.umsg("Variable " + to.value() + " is reachable from " + from.value());
        highlightProductionGivenFromTO(GrammarMatrix, from.value(), to.value());
        var asd = modelDFA.addEdge(from, to);
        asd.layout();
        modelDFA.layout();
        this.jsav.step();
      }
    } 
  }
  unhighlightMatrix(GrammarMatrix);
  // remove unreachable productions
  transformed = _.filter(transformed, function(x) { return x[0] === start || pDict[start].indexOf(x[0]) !== -1;});
  this.jsav.umsg("Removing all unreachable variables will give the final grammar.");
  GrammarMatrix.hide();
  var newGrammarMatrix = this.jsav.ds.matrix(transformed, {style: "table", left: 210, top: 0});;
  this.jsav.step();
  var ret = _.map(transformed, function(x) {return x.join('');});
  return ret;
};
// Function to get variables which can derive a string of terminals
transformerProto.findDerivable = function (set, productions) {
  for (var i = 0; i < productions.length; i++) {
    unhighlightMatrix(this.GrammarMatrix);
    if (_.every(productions[i][2], function(x) { return x in set || variables.indexOf(x) === -1;})) {
      if (!(productions[i][0] in set)) {
        set[productions[i][0]] = true;
        this.jsav.umsg("The variable " + productions[i][0] + " produces terminal strings.");
        highlightProduction(this.GrammarMatrix, productions[i][0]);
        this.jsav.step();
        return true;
      }
    }
  }
  return false;
};
// dfs on the dictionary
transformerProto.findReachable = function (start, pDict, visited) {
  for (var i = 0; i < pDict[start].length; i++) {
    if (!(pDict[start][i] in visited)) {
      visited[pDict[start][i]] = true;
      this.findReachable(pDict[start][i], pDict, visited);
      pDict[start] = _.union(pDict[start], pDict[pDict[start][i]]);

    }

  }
};

// convert to Chomsky Normal Form
transformerProto.convertToChomsky = function (GrammarMatrix) {
  var v = {};
  var emptyLine = _.filter(this.productions, function(x) { return true;});
  for(var i = 0; i< 3*this.productions.length; i++)
    emptyLine.push(["", arrow, ""]);
  var newGrammerMatrix = this.jsav.ds.matrix(emptyLine, {style: "table", left: 210});
  for(var i = 0; i< 3*this.productions.length; i++)
    newGrammerMatrix._arrays[this.productions.length + i].hide();
  // find all the variables in the grammar
  var productions = this.productions;
  for (var i = 0; i < productions.length; i++) {
    var x = productions[i];
    // change RHS to an array
    x[2] = x[2].split("");
    v[x[0]] = true;
    for (var j = 0; j < x[2].length; j++) {
      if (variables.indexOf(x[2][j]) !== -1) {
        v[x[2][j]] = true;
      }
    }
  }
  // an array of all the temporary variables
  var tempVars = [];
  // counter for D(n) variables
  var varCounter = 1;
  // replace terminals with equivalent variables where necessary
  for (var i = 0; i < productions.length; i++) {
    unhighlightMatrix(newGrammerMatrix);
    if (productions[i][2].length === 1 && variables.indexOf(productions[i][2][0]) === -1) {
      this.jsav.umsg("This production " + productions[i].join('') + " is in Comskey normal form. So no need to modify it.");
      highlightProductionByIndex(newGrammerMatrix, i);
      this.jsav.step();
      continue;
    } else {
      var r = productions[i][2];
      for (var j = 0; j < r.length; j++) {
        if (r[j].length === 1 && variables.indexOf(r[j]) === -1) {
          var temp = "B(" + r[j] + ")";
          if (!_.find(productions, function(x) { return x[0] === temp;})) {
            this.jsav.umsg("This production " + productions[i].join('') + " is not in Comskey normal form. The terminal " + r[j] +" will be converted to " + temp + ". We need to add a new production " + [temp, arrow, [r[j]]].join('') + " to the grammar productions");
            highlightProductionByIndex(newGrammerMatrix, i);
            this.jsav.step();
            productions.push([temp, arrow, [r[j]]]);
            addNewProduction(newGrammerMatrix, [temp, arrow, [r[j]]], productions.length)
            highlightProductionByIndex(newGrammerMatrix, productions.length - 1);
            tempVars.push(temp);
          }
          r[j] = temp;
          modifyProduction(r.join(''), newGrammerMatrix, i, 2);
        }
      }
    }
  }
  var jsav = this.jsav;
  // Function to break productions down into pairs of variables
  var chomskyHelper = function () {
    
    for (var i = 0; i < productions.length; i++) {
      var r = productions[i][2];
      if (r.length === 1 && variables.indexOf(r[0]) === -1) {
        
        continue;
      } else if (r.length > 2) {
        highlightProductionByIndex(newGrammerMatrix, i);
        jsav.umsg("The production " + productions[i].join('') +  " has more than 2 variables on its RHS.");
        jsav.step();
        var temp = "D(" + varCounter + ")";
        var temp2 = r.splice(1, r.length - 1, temp);
        var present = _.find(productions, function(x) { return x[0].length > 1 && x[2].join('') === temp2.join('');});
        if (present) {
          r[1] = present[0];
        } else {
          jsav.umsg("We need to add a new production " + [temp, arrow, temp2].join('') +". And replace " +temp2 + " by " + temp + " in the original production.");
          jsav.step();
          productions.push([temp, arrow, temp2]);
          addNewProduction(newGrammerMatrix, [temp, arrow, temp2], productions.length)
          modifyProduction(r.join(''), newGrammerMatrix, i, 2);
          tempVars.push(temp);
          varCounter++;
        }
        return true;
      }
    }
    return false;
  };
  var counter = 0;
  jsav.umsg("The next step is to convert any production that has more than 2 variables on the RHS to Chomsky normal from.");
  unhighlightMatrix(newGrammerMatrix);
  jsav.step();
  while (chomskyHelper()) {
    counter++;
    if (counter > 500) {
      console.log(counter);
      break;
    }
    unhighlightMatrix(newGrammerMatrix);
  }
  for (var i = 0; i < productions.length; i++) {
    var x = productions[i];
    x[2] = x[2].join("");
  }
  this.jsav.umsg("This is the resulting grammar in Chomsky Normal Form");
  GrammarMatrix.hide();
  this.jsav.step();
  var ret =  _.map(productions, function(x) {return x.join('');});
  return ret;
};
var highlightProduction = function(matrix, productionVariable){
  for(var i = 0; i<matrix._arrays.length; i++)  {
    var row = matrix._arrays[i];
    if(row._indices[0].value() === productionVariable){
      for(var j = 0; j<row._indices.length; j++){
        row.highlight(j);
      }
    }
  }
}
var highlightProductionByIndex = function(matrix, productionIndex){

    var row = matrix._arrays[productionIndex];
      for(var j = 0; j<row._indices.length; j++){
        row.highlight(j);
      }
  }
var highlightProductionWithVariableOccurance = function(matrix, productionVariable){
  for(var i = 0; i<matrix._arrays.length; i++)  {
    var row = matrix._arrays[i];
    for(var j= 0; j< row._indices.length; j++)
      if(row._indices[j].value().includes(productionVariable)){
        for(var k = 0; k<row._indices.length; k++){
          row.highlight(k);
      }
    }
  }
}
var highlightProductionGivenFromTO = function(matrix, from, to){
  for(var i = 0; i<matrix._arrays.length; i++)  {
    var row = matrix._arrays[i];
    if(row._indices[0].value() === from){
      for(var j= 0; j< row._indices.length; j++)
        if(row._indices[j].value().includes(to)){
          for(var k = 0; k<row._indices.length; k++){
            row.highlight(k);
        }
      }
    }
  }
}
var unhighlightMatrix = function(matrix){
  for(var i = 0; i<matrix._arrays.length; i++)  {
    var row = matrix._arrays[i];
    for(var j = 0; j<row._indices.length; j++){
        row.unhighlight(j);
    }
  }
}
var getGrammarVariables = function(productions){
  var variables = [productions[0][0]];
  for(var i = 1; i< productions.length; i++){
    var found = false;
    for(var j = 0; j< variables.length; j++){
      if(productions[i][0] === variables[j])
        found = true;
    }
    if(!found)
      variables.push(productions[i][0]);
  }
  return variables;
}
var drawAnEdge = function(from, to, graph){
  var fromNode, toNode;
  graph.nodes().map(function(node){
    if(node.value() == from)
      fromNode = node;
    if(node.value() == to)
      toNode = node;
  });
  graph.addEdge(fromNode, toNode);
  graph.layout();
}
var addNewProduction = function(matrix, listOfData, length){
  matrix._arrays[length - 1].show();
  matrix._arrays[length - 1]._indices[0].value(listOfData[0]);
  matrix._arrays[length - 1]._indices[2].value(listOfData[2]);
}
var modifyProduction = function(newValue, matrix, row, col){
  matrix._arrays[row]._indices[col].value(newValue);
}