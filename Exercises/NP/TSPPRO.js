/*global define */
(function() {
  "use strict";

  	var
	  jsav,           // The JSAV object
	  jsavGraph,
	  Answer,
	  From,
	  To,
	  guessedAns,
	  On,
	  userInput;      // Boolean: Tells us if user ever did anything

	 var minC=-1, minPath=[];
	 var gnodes; //must be populated with the using g.nodes() befire calling getSol on g.
	 var visited; //must be initialized to an array containing as many nodes as g, all setto zero, before calling getSol on g.
	 
	 var getSol= function(g,curr,start,path,cost){
	      visited[curr]=1;
	      path.push(curr);
	      var flag=0;
	      for(var i=0;i<gnodes.length;i++){
	          if(i==curr){
	              continue;
	          }
	          if(visited[i]==1){
	                continue;
	          }
	          flag=1;
	          var newcost = cost + g.getEdge(gnodes[curr],gnodes[i]).weight();
	          if(minC >= 0 && newcost>=minC)
	                continue;
	          getSol(g,i,start,path,newcost);
	      }
	      if(flag==0){
	          newcost = cost + g.getEdge(gnodes[curr],gnodes[start]).weight();
	          if(minC<0 || minC > newcost){
	             minC=newcost;
	             minPath = path.slice(0);
	             path.pop();
	             visited[curr]=0;
	             return;
	          }
	     }
	     path.pop();
	     visited[curr]=0;
	      return;
	 };


	function checkCycle(){
	  var edges=jsavGraph.edges();
	  var w=0;
	  for(var i=0;i<jsavGraph.edgeCount();i++)
	    if(edges[i].hasClass('selected'))
	        w=w+edges[i].weight();
	  if(w>minC)
		return false;

	  return true;
	}

	// Click event handler on the graph, intended for edges
	var clickHandler = function () {
	  //var element = obj;  // This is the DOM object being clicked
	  //var $this = $(obj);
	  var g = jsavGraph;
	  var nodes = g.nodes();
	  var node, s, e;
	  var c_edge = $(this).data("edge");
	  for(var i=0;i<g.nodeCount();i++){
	    if(nodes[i].value()== c_edge.start().value())
	        s=i;
	    else if(nodes[i].value()==c_edge.end().value())
	        e=i;
	  }
	  if(c_edge.hasClass('selected')){
	    On[e] = On[e]-1;
	    On[s] = On[e]-1;
	    c_edge.css({"stroke":"black"});
	    c_edge.removeClass('selected');
	  }
	  else {
	    On[s] = On[s]+1;
	    On[e] = On[e]+1;
	    c_edge.css({"stroke":"red"});
	    c_edge.addClass('selected');
	  }

	  TSP_KA.userInput = true;
	};


	// reset function definition
	var f_reset = function () {
	  if (jsavGraph) {
	    var nodes = jsavGraph.nodes();
	    for(var i=0;i<nodes.length;i++){
	      On[i] = 0;
	    }
	    var edges = jsavGraph.edges();
	    for(var i=0;i<edges.length;i++){
	      edges[i].removeClass('selected');      
	      edges[i].css({"stroke":"black"});
	    } 
	  }
	  TSP_KA.userInput = false;
	};

	var TSP_KA = {
		// Initialise the exercise
		userInput:false,

		initJSAV:function (nnodes) {

		  jsav = new JSAV("jsav");
		//  jsav.recorded();
		  
		  if (jsavGraph) {
		      jsavGraph.clear();
		  }

		  jsavGraph = jsav.ds.graph({width: 400, height: 280, layout: "manual",
		  directed: false});

		  var x = 50;
		  var y=30;

		  if(nnodes==5){
		      jsavGraph.addNode("A",{left:x+50,top:y-10});
		      jsavGraph.addNode("B",{left:x+200,top:y})
		      jsavGraph.addNode("C",{left:x,top:y+75});
		      jsavGraph.addNode("D",{left:x+280,top:y+100});
		      jsavGraph.addNode("E",{left:x+150,top:y+150});
		  }
		  if(nnodes==6){
		      jsavGraph.addNode("A",{left:x+50,top:y-10});
		      jsavGraph.addNode("B",{left:x+200,top:y})
		      jsavGraph.addNode("C",{left:x-20,top:y+75});
		      jsavGraph.addNode("D",{left:x+300,top:y+110});
		      jsavGraph.addNode("E",{left:x+210,top:y+230});
		      jsavGraph.addNode("F",{left:x+10,top:y+210})
		  }

		  gnodes=jsavGraph.nodes();
		  for(var i=0;i<nnodes;i++)
		    for(var j=i+1;j<nnodes;j++)
		       jsavGraph.addEdge(gnodes[i],gnodes[j],{weight:Math.floor((Math.random() * 30) + 1)});
		  On = new Array(jsavGraph.nodeCount());
		  for(i=0;i<jsavGraph.nodeCount();i++){
		      On[i]=0;
		  }

		  var edges = jsavGraph.edges();
		  for(i=0;i<edges.length;i++)
		    edges[i].css({"stroke-width":"1.5px","border": "5px solid transparent"});
		  //graphUtils.generate(jsavGraph,{weighted:true,nodes:nnodes,edges:edges});
		  //jsavGraph.layout();
		  jsavGraph.layout();

		  // Bind the clickHandler to handle click events on the array
		  //jsavGraph.click(clickHandler, {edge:true});
		  $(".jsavedge").on("click", clickHandler );
		  $(".jsavlabel.jsavedgelabel").on("click", clickHandler );
		  /**{
		    var edge = $(this).data("edge");
		    if (!edge.hasClass("marked")) {
		      markEdge(edge);
		    }
		  });*/
		  //
		  jsavGraph.mouseleave(function() { this.removeClass("over")},
		// only for edges, don't record the changes
		        {edge: true, node: false, record: false}); 
		  jsavGraph.mouseenter(function() { this.addClass("over")},
		        {edge: true, node: false, record: false});

		  ;
		  guessedAns = true;
		  visited = new Array(jsavGraph.nodeCount());
		  for(var i=0;i<jsavGraph.nodeCount();i++)
		    visited[i]=0;

		  getSol(jsavGraph,0,0,[],0);
		   
		   Answer=gnodes[minPath[0]].value();
		    for(i=1;i<minPath.length;i++){
		     Answer=Answer+"->"+gnodes[minPath[i]].value();
		    }
		    Answer=Answer+"->"+gnodes[minPath[0]].value();
		  jsav.displayInit();
		  // Set up handler for reset button
		  $("#reset").click(f_reset);
		},


		// Check user's answer for correctness: User's array must match answer
		checkAnswer:function (x) {

		  /*for(i in On){
		     if(On[i]!=2){
		         return false;
		     }
		  }*/
		 var ret_val = checkCycle();
		  if (ret_val === true && x !== undefined){
		  	minC=-1, minPath=[]
		  }
		  return ret_val;
		},

		// return the answer
		getSolution: function() {
			return Answer;s
		},
	};

  window.TSP_KA = window.TSP_KA || TSP_KA;

}());