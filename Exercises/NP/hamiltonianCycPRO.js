/*global define */
(function() {
  "use strict";

  var jsav,           // The JSAV object
      jsavGraph,
      solArr,
      Answer,
      gnodes,
      guessedAns,
      From,
      To,
      Solution,
      userInput;      // Boolean: Tells us if user ever did anything

  var visited;

  var hamiltonianCycle_KA = {
    userInput: null,

    // Initialise the exercise
    initJSAV: function (nnodes, nedges) {

      hamiltonianCycle_KA.userInput = false;

      jsav = new JSAV("jsav");
    //  jsav.recorded();
      
      if (jsavGraph) {
          jsavGraph.clear();
      }

      jsavGraph = jsav.ds.graph({width: 400, height: 280, layout: "automatic",
      directed: true});
      graphUtils.generate(jsavGraph,{weighted:false,nodes:nnodes,edges:nedges});
      
      var edges = jsavGraph.edges();
      for(i=0;i<edges.length;i++)
        edges[i].css({"stroke-width":"1.5px","border": "5px solid transparent"});
      jsavGraph.layout();
      gnodes = jsavGraph.nodes();
      From=new Array(gnodes.length);
      To=new Array(gnodes.length);
      visited=new Array(gnodes.length);
      for(var i=0;i<gnodes.length;i++){
        From[i]=0;
        To[i]=0;
        visited[i]=0;
      }
      // Bind the clickHandler to handle click events on the array
      //jsavGraph.click(clickHandler ,{edge:true});
      $(".jsavedge").on("click", clickHandler )
      jsavGraph.mouseleave(function() { this.removeClass("over")},
    // only for edges, don't record the changes
            {edge: true, node: false, record: false}); 
      jsavGraph.mouseenter(function() { this.addClass("over")},
            {edge: true, node: false, record: false});

      var nodes = jsavGraph.nodes();
      guessedAns = true;
      if(getSol(0,[])==false){
        Answer=false; 
        Solution="No Hamiltonian Cycle";
        //console.log("no Cyccle");
      }
      else{
        Answer=true;
        Solution=gnodes[solArr[0]].value();
        for(i=1;i<solArr.length;i++)
         Solution=Solution+"->"+gnodes[solArr[i]].value();
        //console.log(str);
      }
      jsav.displayInit();
      // Set up handler for reset button
      $("#reset").click(f_reset);

    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
     
      if(document.getElementById("noSol").checked==true){
          if(Answer)
            return false;
          else
            return true;
        }
     
      if(Answer){
        for(var i=0;i<gnodes.length;i++)
           if(From[i]!=1 || To[i]!=1)
              return false;
        return true;
      }
      return false;
      
    },
    // return the solution
    getSolution: function() {
      return Solution;
    },
  };

  // Click event handler on the graph, intended for edges
  function clickHandler () {
    var node;
    var c_edge = $(this).data("edge");
    if(c_edge.hasClass('selected')){
      From[gnodes.indexOf(c_edge.start())]-=1; 
      To[gnodes.indexOf(c_edge.end())]-=1; 
      c_edge.css({"stroke":"black"});
      c_edge.removeClass('selected');
    }
    else {
      From[gnodes.indexOf(c_edge.start())]+=1; 
      To[gnodes.indexOf(c_edge.end())]+=1; 
      c_edge.css({"stroke":"red"});
      c_edge.addClass('selected');
    }

    hamiltonianCycle_KA.userInput = true;
  };

  function getSol(curr,path){

        visited[curr]=1;
        path.push(curr);
        for(var i=0;i<gnodes.length;i++)
            if(visited[i]==0)
                break;
        if(i==gnodes.length){
            if(jsavGraph.hasEdge(gnodes[curr],gnodes[0])){
               path.push(0);
               solArr=path.slice(0);
               return true;
            }
            else
               path.pop();
               visited[curr]=0;
               return false;
        }
        var nextarr = gnodes[curr].neighbors();
        for(var j=0;j<nextarr.length;j++){
            i = gnodes.indexOf(nextarr[j]);
            if(visited[i]==1){
                  continue;
            }
            if(getSol(i,path))
                 return true;
        }
       path.pop();
       visited[curr]=0;
       return false;

   };


  // reset function definition
  function f_reset() {
    if (jsavGraph) {
      var nodes = jsavGraph.nodes();
      for(var i=0;i<nodes.length;i++){
          From[i]=0;
          To[i]=0;
          visited[i]=0;
      }
      var edges = jsavGraph.edges();
      for(var i=0;i<edges.length;i++){
        edges[i].removeClass('selected');      
        edges[i].css({"stroke":"black"});
      } 
    }
    hamiltonianCycle_KA.userInput = false;
  };

  function f_noHC() {
      for(var i=0;i<gnodes.length;i++){
        From[i]=0; 
        From[i]=1;
      }
      var edges = jsavGraph.edges();
      for(var i=0;i<edges.length;i++){
        edges[i].removeClass('selected');      
        edges[i].css({"stroke":"black"});
      } 
      guessedAns = false;
  };

  function showSolution(){
    if(Answer){
      for(i=0;i<solArr.length;i++)
        solArr[i].css({"stroke":"blue"});
      return "The Hamiltonian Cycle is shown in blue on the graph.";
    }
    else
      return "The graph consists of no Hamiltonian Cycle";
  };

 window.hamiltonianCycle_KA = window.hamiltonianCycle_KA || hamiltonianCycle_KA;
}());