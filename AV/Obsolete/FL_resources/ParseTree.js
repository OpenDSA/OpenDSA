(function($) {
  var lambda = String.fromCharCode(955),
  epsilon = String.fromCharCode(949),
  square = String.fromCharCode(9633),
  dot = String.fromCharCode(183),
  arrow = String.fromCharCode(8594),
  emptystring = lambda;
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var ParseTreeController = function(jsav, grammar, string, treeOptions) {
      this.init(jsav, grammar, string, treeOptions);
    };
    
    var controllerProto = ParseTreeController.prototype;
    window.ParseTreeController = ParseTreeController;
    controllerProto.init = function(jsav, grammar, string, treeOptions){
        this.jsav = jsav;
        this.productions = JSON.parse(grammar);
        this.inputString = string;
        this.parseTree = this.jsav.ds.tree(treeOptions);
        this.derivationTree = {};
    }
    
    controllerProto.removeLambdaHelper = function (set, productions) {
      for (var i = 0; i < productions.length; i++) {
        if (productions[i][2] === emptystring || _.every(productions[i][2], function(x) { return x in set;})) {
          if (!(productions[i][0] in set)) {
            set[productions[i][0]] = true;
            return true;
          }
        }
      }
      return false;
    };
  
    controllerProto.stringAccepted = function(){
        var inputString = this.inputString;
      if(inputString === "!"){
        inputString = "";
      }
      var productions = this.productions;
      var table = {};   // maps each sentential form to the rule that produces it
      var sententials = [];
      var next;
      // assume the first production is the start variable
      for (var i = 0; i < productions.length; i++) {
        if (productions[i][0] === productions[0][0]) {
          if (productions[i][2] === emptystring) {
            sententials.push('');
            table[''] = [i, ''];
          } else {
            sententials.push(productions[i][2]);
            table[productions[i][2]] = [i, ''];
          }
        }
      }
      var derivers = {};  // variables that derive lambda
      var counter = 0;
      // find lambda deriving variables
      while (this.removeLambdaHelper(derivers, productions)) {
        counter++;
        if (counter > 5000) {
          console.warn(counter);
          var confirmed = confirm('This is taking a while. Continue?');
          if (confirmed) {
            counter = 0;
          } else {
            break;
          }
        }
      };
      var hasLambda = function(productions){
          for (var i = 0; i < productions.length; i++)
            if (productions[i][2] === emptystring)
              return true;
          return false;
      }
      if(hasLambda(productions)){
      derivers = Object.keys(derivers);
      // parse
      counter = 0;
      //var queue = [];
      var queue = new Set();
      //queue.push(productions[0][0]);
      queue.add(productions[0][0]);
      for(let nextValue = queue.values().next(); nextValue.done !== true; nextValue = queue.values().next()){
        if(counter > 10000){
          break;
        }
        var next = nextValue.value;
        queue.delete(next);

        if(this.removeLambda(next) === inputString){
          return [true, next, table];
        }
        for(var i = 0; i < this.replaceLHS(productions, next).length; i++){
          var newString = this.replaceLHS(productions, next)[i];
          if(!shouldSkipString(inputString, newString)){
            queue.add(newString);
            table[this.replaceLHS(productions, next)[i]] = next;
          }
        }
        counter++;
      }
      return [false, next, table];
    }
      else
      {
          derivers = Object.keys(derivers);
      // parse
      counter = 0;
      var queue = new Set();
      queue.add(productions[0][0]);
      for(let nextValue = queue.values().next(); nextValue.done !== true; nextValue = queue.values().next()){
        var next = nextValue.value;
        if(next === undefined)
          return [false, null, table];//I added this line to reject a string not in the grammar. For grammar exercise controller
        queue.delete(next);
        if(next.length > inputString.length)
        {
          counter--;
          continue;
        }
        
        if(this.removeLambda(next) === inputString){
          return [true, next, table];
        }
        for(var i = 0; i < this.replaceLHS(productions, next).length; i++){
          var newValue = this.replaceLHS(productions, next)[i];
          if(!shouldSkipString(inputString, newValue))
            if(newValue.length <= inputString.length)
              {
                queue.add(newValue);
                table[this.replaceLHS(productions, next)[i]] = next;
              }
        }
        counter++;
      }
      return [false, next, table];
      }
    }
    controllerProto.replaceLHS = function(productions, sentential){
      result = [];
      for (var i = 0; i < productions.length; i++) {
        for (var j = 0; j < sentential.length; j++) {
          for (var k = 1; k < sentential.length + 1 - j; k++) {
            var subString = sentential.substring(j, j + k);
            if (subString === (productions[i][0])) {
              var newString = sentential.substring(0, j) + productions[i][2]
                    + sentential.substring(j + k, sentential.length);
  
                          result.push(newString);
                          this.derivationTree[newString] = [productions[i], sentential];
            }
          }
        }
      }
      return result;
    }
  
    controllerProto.removeLambda = function(string){
      for(var i = 0; i < string.length; i++){
        if(string[i] === lambda){
          string = string.replace(lambda, "");
        }
      }
      return string;
    }
    controllerProto.displayTree = function(){
      var inputString = this.inputString;
      var productions = this.productions;
  
      var table = {};   // maps each sentential form to the rule that produces it
      var next;
      var accepted = this.stringAccepted(inputString);
      if (accepted[0]) {
        table = this.derivationTree;
        //this.jsav.umsg('"' + inputString + '" accepted');
        var temp = accepted[1];
        var results = [];   // derivation table
        counter = 0;
        // go through the map of sentential forms to productions in order to get the trace
        do {                // handles the case where inputstring is the emptystring
          counter++;
          if (counter > 500) {
            console.warn(counter);
            break;
          }
          var rp = table[temp][0].join("");
          results.push([rp, temp]);
          temp = table[temp][1];
        } while (table[temp] && temp);
  
        results.reverse();
        // set up display
        
        //var displayOrder = [];  // order in which to display the nodes of the parse tree
        // create the parse tree using the derivation table
        this.jsav.umsg("The root of the parse tree is the grammar start variable");
        this.parseTree.root(results[0][0].split(arrow)[0]);
        var root = this.parseTree.root();
        var sentential = [root]; //order of sentential form nodes
        //var displayOrderParents = [];  //order of parent nodes
        //var level = new Map(); //a map from node to level(left and top position)
        //level.set(root, [0,0]); // add root node
        //displayOrder.push(root);
  
        for (var i = 0; i < results.length; i++) {
            this.jsav.step();
            this.jsav.umsg("We substitute in the production " + results[i][0]);
          var lhsProd = results[i][0].split(arrow)[0];
          var rhsProd = results[i][0].split(arrow)[1];
          //find correct lhs in sentential
          var sententialString = "";
          for(var j = 0; j < sentential.length; j++){
            //join all nodes to make a sentential string
            sententialString += sentential[j].value();
          }
          //make the production compatible to this.replaceLHS function
          var pro = results[i][0].split(arrow);
          pro.push(pro[1]);
          pro[1] = "" ;
          var lhsOccur;
          //compare this.replaceLHS to results[i][1]
          for(var j = 0; j < this.replaceLHS([pro],sententialString).length; j++){
            if(this.replaceLHS([pro], sententialString)[j] === results[i][1]){
              //record the jth occurrence of lhs
              lhsOccur = j;
            }
          }
  
          //convert lhsOccur to actual index number of the sententialString
          var count = 0;
          var realIndex = 0;
          while(true){
            var index = sententialString.indexOf(results[i][0].split(arrow)[0]);
            realIndex += index;
            if(count === lhsOccur){
              break;
            }else{
              sententialString = sententialString.substring(index+1);
              realIndex++;
            }
            count++;
          }
  
          //addEdgesFromLHStoRHS();
          var children = [];
          for(var l = 0; l < rhsProd.length; l++){
            var newNode = this.parseTree.newNode(rhsProd[l]);
            children.push(newNode);
            for(var r = 0; r < lhsProd.length; r++){
              sentential[realIndex + r].addChild(newNode);
             
            }
            //construct a map from node to position([left, top])
            //level.set(newNode, [50*(l+realIndex) ,50 + 50*i]);
            this.parseTree.layout();
          }
          //displayOrderParents.push(sentential.slice(realIndex, realIndex + lhsProd.length));
          //removelhsProdfromSentential and addrhsProdtoSentential
          var temp1 = sentential.slice(0, realIndex);
          var temp2 = sentential.slice(realIndex + lhsProd.length);
          sentential = temp1.concat(children);
          sentential = sentential.concat(temp2);
          //displayOrder.push(children);
        }
  
        //updateWidth(parseGraph, root);
        //highlightTerminal(sentential);
        //layoutTable(derivationTable);
        this.parseTree.layout();/*
        // hide the whole tree except for the start node and hide the derivation table
        for(var i = 0; i < this.parseTree.nodes().length; i++){
          this.parseTree.nodes()[i].hide();
        }
        root.show();
        //hide all edges
        for(var i = 0; i < this.parseTree.edges().length; i++){
          this.parseTree.edges()[i].hide();
        }
  
        // create slideshow stepping through derivation table and parse tree
        this.jsav.displayInit();
        var parents = displayOrder.shift();
        for (var i = 0; i < results.length; i++) {
          this.jsav.step();
  
          var parents = displayOrderParents.shift();
          var nodes = displayOrder.shift();
          for (var j = 0; j < nodes.length; j++) {
            nodes[j].show({recursive: false});
  
            //find the deepest level of the parents
            var deepestLevel = -1;
            for(var l = 0; l < parents.length; l++){
              if(level.get(parents[l])[1] > deepestLevel){
                deepestLevel = level.get(parents[l])[1];
              }
            }
            for(var l = 0; l < parents.length; l++){
              if(level.get(parents[l])[1] != deepestLevel){
                var newParent = this.parseTree.addNode(parents[l].value(), {left: level.get(parents[l])[0],top: deepestLevel});
                this.parseTree.addEdge(parents[l], newParent);
                this.parseTree.addEdge(newParent, nodes[j]);
                parents[l].css({'background': "black"});
              }else{
                parents[l].edgeTo(nodes[j]).show();
              }
            }
            this.parseTree.layout();
            //add a rectangle background to show combining nodes
            if(parents.length > 1){
              //show combining nodes with a rectangle
              var rect = jsav.g.rect(183+leftMostPosition(parents,level),  46 + (productions.length-1)*29.5+deepestLevel, results[i][0].split(arrow)[0].length * 50, 50, {stroke: "orange", "stroke-width": 4});
            }
          }
          parents = nodes;
        }*/
        this.jsav.recorded();
      }
    }
  
    var shouldSkipString = function (target, proposedString){
      var numberOfTerminals = getTheNumberOfTerminals(proposedString);
      if(numberOfTerminals <= target.length){
      for(var i = 0; i< target. length; i++){
        if(variables.indexOf(proposedString[i]) <0 && proposedString[i] != lambda){ //not a varuialble so compare the letters
          if(target[i] !== proposedString[i])
            return true;
        }
        else // a variable or a terminal
          return false;
      }
  
    }
    else
      return true;
  }
    var getTheNumberOfTerminals = function (proposedString){
      var count =0;
      for(var i = 0; i<proposedString.length; i++)
        if(variables.indexOf(proposedString[i])<0 && proposedString[i] !== lambda)
          count++;
      return count;
    }
  
}(jQuery));
