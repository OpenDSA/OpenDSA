/*global define */
(function() {
  "use strict";

	var
	  jsav,            // The JSAV object
	  jsavGraph, 
	  adjacencyMat, 
	  solutionShowStat, 
	  maxClique,
	  Solution;
	//userInput;      // Boolean: Tells us if user ever did anything
	var clique_KA = {
		// Initialise the exercise
		userInput :false,

		initJSAV:function (nnodes, nedges) {
		  
		  solutionShowStat=0;

		  jsav = new JSAV("jsav");
		  //  jsav.recorded();
		  
		  if (jsavGraph) {
		      jsavGraph.clear();
		  }

		  jsavGraph = jsav.ds.graph({width: 400,  height: 280,  layout: "automatic",  
		  directed: false});
		  graphUtils.generate(jsavGraph, {weighted:false, nodes:nnodes, edges:nedges});
		  jsavGraph.layout();

		  // Bind the clickHandler to handle click events on the array
		  jsavGraph.click(clickHandler);
		  maxClique=[];
		  calcMaxClique(); 
		  var gnodes = jsavGraph.nodes();
		  Solution="The maximum clique is { "+gnodes[maxClique[0]]. value();
		  for(var i=1;i<maxClique.length;i++)
		    Solution+=" , "+gnodes[maxClique[i]].value();
		  Solution+=" }";
		  jsav.displayInit();
		  // Set up handler for reset button
		  $("#reset").click(f_reset);
		},


		// Check user's answer for correctness: User's array must match answer
		checkAnswer:function () {
		  var gnodes=jsavGraph.nodes();
		  var cliqueNodes = [];
		  for(var i=0;i<gnodes.length;i++)
		    if(gnodes[i].hasClass('marked'))
		      cliqueNodes.push(gnodes[i]);
		  if(cliqueNodes.length>=maxClique.length && isClique(cliqueNodes))
		    return true;
		  return false;
		  
		},
		// return the solution
		getSolution: function() {
			return Solution;
		},
	};

	function isClique(nodes){
	  for(var i=0;i<nodes.length;i++)
	    for(var j=i+1;j<nodes.length;j++)
	      if(!jsavGraph.hasEdge(nodes[i],nodes[j]))
	        return false;
	  return true;
	}

	function calcMaxClique(){
	  var nodenum = jsavGraph.nodeCount();
	  var gnodes = jsavGraph.nodes();
	  var subsets = new Array(2);
	  var tmparr,prev=0;
	  subsets[prev]= new Array(nodenum);
	  for(var i=0;i<nodenum;i++){
	    tmparr = new Array(1);
	    tmparr[0]=i;
	    subsets[prev][i]=tmparr;
	  } 
	  for(var n=2; n<=nodenum ;n++){
	    subsets[(prev+1)%2] = [];
	    var chk=0;
	    for(var i=0;i<subsets[prev].length;i++){
	      var start=getMaxOfArray(subsets[prev][i]);
	      for(var j=start+1;j<nodenum;j++){
	        tmparr=new Array(subsets[prev][i].length+1);
	        for(var k=0;k<subsets[prev][i].length;k++)
	          tmparr[k]=subsets[prev][i][k];
	        var flag=0;
	        for(var l=0;l<tmparr.length-1;l++){
	          if(!jsavGraph.hasEdge(gnodes[tmparr[l]],gnodes[j])){
	            flag = 1;
	            break;
	          }
	        }
	          if(flag==1)
	            continue;
	          chk=1;
	          tmparr[k] = j;   
	          subsets[(prev+1)%2].push(tmparr);
	        }
	      }
	      if(chk==0){
	        maxClique=subsets[prev].pop();
	        return maxClique.length;
	      }
	      prev = (prev+1)%2;
	    }
	    return 1;
	}


	function getMaxOfArray(numArray) {
	    return Math.max.apply(null,  numArray);
	}

	function populateAdjacencyMatrix(){
	  var gnodes = jsavGraph.nodes();
	  var n = gnodes.length;
	  adjacencyMat = new Array(n);
	  for(var i=0;i<n;i++){
	    adjacencyMat[i] = new Array(n);
	    for(j=0;j<n;j++){
	      if(jsavGraph.hasEdge(gnodes[i], gnodes[j]))
		adjacencyMat[i][j]=1;
	      else
		adjacencyMat[i][j]=0;
	    }
	  }

	}

	// Click event handler on the graph 
	var clickHandler = function () {
	  var i,  edge;
	  var nodes=jsavGraph.nodes(); 
	  if (!this.hasClass('marked')) {
	    this.addClass('marked');
	    this.addClass('selected');
	    for(i=0;i<nodes.length;i++)
	      if(nodes[i].hasClass('selected')){
	        if(jsavGraph.hasEdge(this,nodes[i])){
	          jsavGraph.getEdge(this,nodes[i]).addClass('edgemarked');
	          jsavGraph.getEdge(this,nodes[i]).addClass('marked');
	          jsavGraph.getEdge(this,nodes[i]).addClass('edgeselected');
	          jsavGraph.getEdge(this,nodes[i]).css({"stroke":"red"});;
	        }
	      }  
	  }
	  else if(this.hasClass('marked')) {
	    this.removeClass('marked');
	    this.removeClass('selected');
	    for(i=0;i<nodes.length;i++)
	      if(nodes[i].hasClass('selected') && jsavGraph.hasEdge(this,nodes[i])){
	        jsavGraph.getEdge(this,nodes[i]).removeClass('edgemarked');
	        jsavGraph.getEdge(this,nodes[i]).addClass('marked');
	        jsavGraph.getEdge(this,nodes[i]).removeClass('edgeselected');
	        jsavGraph.getEdge(this,nodes[i]).css({"stroke":"black"});
	      }
	    }
	  clique_KA.userInput = true;
	};

	// reset function definition
	var f_reset = function () {
	  if (jsavGraph) {
	    var nodes = jsavGraph.nodes();
	    for(var i=0;i<nodes.length;i++){
	      nodes[i].removeClass('marked');
	      nodes[i].removeClass('selected');
	      nodes[i].removeClass('prohibited');
	    }
	    var edges = jsavGraph.edges();
	    for(var i=0;i<edges.length;i++)
	      edges[i].removeClass('edgemarked');
	  }
	  clique_KA.userInput = false;
	};

	window.clique_KA = window.clique_KA || clique_KA;
}());