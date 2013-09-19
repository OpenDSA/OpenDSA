(function ($) { 
  // Global variables?????
	
	var click = false;
	var cll = isChecked();
  var message = new JSAV($('.avcontainer'));
	var jsav = new JSAV($('.avcontainer')); 
  var jsav2 = new JSAV($('.avcontainer2'));
  
  
	var g = jsav.ds.graph({layout: "manual", directed: cll, height:"500px", width:"600px"});
  var g2 = jsav.ds.graph();
 // var g2 = jsav.ds.graph(); 
  var size;  var i = 0; 
	
  
	var graphNodes = new Array();
	var preClick = new Array();
  var nodeOne = null;
  var nodeTwo = null;
	var insideBox = true;
	var addNodes = false;
	var addEdges = false;
	var addWeights = false;
  var move = false;
	var nodeOneHigh = null;
	var nodeTwoHigh = null;
  var nextClick = true;
  var edges;
  var nodeNumber;
   var moveNode;
  var switchState = true;
  var stateCount = 0;
  var stateCountTwo = 0;
  
    // Struct type container to hold id and x,y position of nodes   
	function node(id, x, y) {   
		this.id = id;
		this.x = x;
		this.y = y;
	}
  
	//Struct type container to hold the x,y positions of a previous click
	function storeClick(x,y) {
    this.x = x;
		this.y = y;
	}
  function showControls() {
    $('#graphControls').show();
    
  }
  ///////////////////////////////////////////////////////////////////////////////
function runit() {
  size = g.nodeCount();
  
  markIt(g.nodes()[0]);
  dfs(g.nodes()[0]);
 
  jsav.step(); 

 // jsav.displayInit();
  jsav.recorded();
  
}

// Mark the nodes when visited and highlight it to 
// show it has been marked
function markIt(node) {
  node.addClass("marked");
  jsav.umsg("Mark node " + node.value());
  node.highlight();
  jsav.step();
}


function preVisit(node, prev) {
  jsav.umsg("Add " + node.value() + " to the stack ");
 // arr.css({"left": "600px", "bottom": "500px", "width": "30px"});
  arr.value(size, node.value());
  size--;
  if (prev) {
    node.edgeFrom(prev).css({"stroke-width":"4", "stroke":"red"}); // highlight
    //prev.edgeFrom(node).css("stroke-width", "4" );
  }
  jsav.step();
}

function postVisit(node) {
  jsav.umsg("Pop " + node.value() + " off of stack");
  size++;
  arr.value(size, " ");
  jsav.step();
  
}

// Recursive depth first search algorithmn for searching
// the graph
function dfs(start, prev) {
  var adjacent;
  var next;
  preVisit(start, prev);
  adjacent = start.neighbors();


  for (next = adjacent.next(); next; next = adjacent.next()) {
    jsav.umsg("Process (" + start.value() + "," + next.value() + ")");
      if(next.hasClass("marked")) {
        jsav.umsg("Node " + next.value() + " already marked");
      }
  
    jsav.step();
    if (!next.hasClass("marked")) {
      jsav.umsg("Print (" + start.value() + "," + next.value() + ") and call depth first search on " + next.value());
      jsav.step();
      markIt(next);
      dfs(next, start);
      jsav.step();
    }
  }
  postVisit(start);
}
  
  
  
  
  
  /////////////////////////////////////////////////////////////////////////
	
  function done() {
  console.log("DONE");
  $('#graphControls').toggle();
  g2 = g;
  g.clear();
   console.log("done " + g.nodes()[0].value());
   message.clearumsg();
 // $('.avcontainer').clear();  
  
   
    
    }
    
    
    function reshow() {
    
    console.log("reshow " + g2.nodes()[0].value());
   
   
    g2.layout();
     jsav.displayInit();
    
    
    
        
      
    }
 
	function getGraphNodeOne(x, y) {
		var	clickedX = preClick[0].x;
		var clickedY = preClick[0].y;
		for(var i = 0; i < graphNodes.length; i++) {
			realX = graphNodes[i].x;
			realY = graphNodes[i].y;
				if(realX  + 25 >= clickedX && realX - 25 <= clickedX && realY + 25 >= clickedY && realY - 25 <= clickedY) {
          return graphNodes[i].id;
				}
		}
		return null;
	}
	
	
  // function getGraphNode(x, y) {
		// var realX;
		// var realY;
		// for(var i = 0; i < graphNodes.length; i++) {
			// realX = graphNodes[i].x;
			// realY = graphNodes[i].y;
			
				// if(realX + 25 >= x && realX - 25 <= x && realY + 25 >= y && realY - 25 <= y) {		    
					// return graphNodes[i].id;
				// }
		// }
		// return null;
		
  // }
  
  
  function getGraphNode(x, y) {
		var realX;
		var realY;
		for(var i = 0; i < g.nodes().length; i++) {
			realX = g.nodes()[i].options.left;
			realY = g.nodes()[i].options.top;
			
				if(realX + 25 >= x && realX - 25 <= x && realY + 25 >= y && realY - 25 <= y) {		    
					return g.nodes()[i];
				}
		}
		return null;
		
  }
    
	
	function isChecked(){
   return document.getElementById('#chkbox');
  // var checkbox = document.getElementById('chkbox');
   // console.log(checkbox.checked);
     // if (checkbox.checked) {
       // return true;
     // } else { 
       // return false;
     // }   
	}
	
	function addNodeMode() {
    
    addNodes = true;
    addEdges = false;
    addWeights = false;
    move = false;    
    message.umsg("You are currently in add node mode");
    
	}	
	function addEdgeMode() {
   
   if(stateCount <= 0) {
      
      addEdges = true;
      addNodes = false;
      addWeights = false;
      move = false;
      stateCountTwo++;
      stateCount--;
  
      message.umsg("You are currently in add edge mode");
   }
   else {
      alert("Can not change from add edges to add weighte edges");
  }
    
	}
	
	function addWeightedEdgeMode() {
   
    if(stateCountTwo<=0) {    
      addWeights = true;
		  addEdges = false;
		  addNodes = false;
		  move = false;
      stateCount++;
      stateCountTwo--;
     
		  message.umsg("You are currently in add weighted edge mode.  Click on two nodes to add the weighted edge.");
    }else {
      alert("Can not change from add weight edges to add edges");
	  }
  }
  
  function moveNodeMode() {
    move = true;
    addEdges = false;
		addNodes = false;
		addWeights = false;    
		message.umsg("You are currently in move node mode.  Click on a node and then click on new position.");
  }
    
	
	function validateNodeClick(nodeOne, nodeTwo) {
		if(nodeOne === null || nodeTwo === null) {
			alert("Must click on a node -- Try again");
			click = !click;	
		}
	}		
					
					
   
   
   
	
 // START MAKING CHANGES HERE... ATTEMPT TO CAPTURE CLICK AND DRAW A NODE.  
  
	jQuery(document).ready(function(){$('.avcontainer').click(function(e)
	{

  // g.mouseenter(function() { this.highlight(); })
    // .mouseleave(function() { this.unhighlight(); });
   console.log('Nodes  ' + g.nodes());
		var x = e.pageX - 40;       //x click coordinate 150
		var y = e.pageY - 210; 		// y click coordinate   190
				/* Add the node to the canvas and store the id (i) and coordinates (x and y) in an array. */
 			if(addNodes) {
        g.addNode(i, {"left": x, "top": y}); 
        g.layout();
       	i++;
			}
      /*Move does not work correctly now -- disconnected handler */
      if(move) {     
        if(!click) {
          moveNode = getGraphNode(x, y);
          console.log("moving node " +  moveNode.options.left);
          click = !click;
        }else{
          var temp = moveNode.value();
       //   console.log("move " + temp.left);
          g.removeNode(moveNode);
          g.layout();
          moveNode.options.left = x;
          moveNode.options.top = y;
          g.addNode(temp, {"left": x, "top": y}); 
          console.log('x : ' + x + '  y: ' + y);
          test = getGraphNode(x, y);
          console.log("coords of moved x:" + test.options.left + '   y:   ' + test.options.top);
        
          click = !click;
         // g.layout();
        }
      }
      
			/* Add Edges */
			if(addEdges && g.nodeCount() > 1) {
				if(!click){        
          nodeOne = getGraphNode(x,y);
         	click = !click;
				}
				// First node has been selected, now retrieve second selected node.
				else if(click) {
					nodeTwo = getGraphNode(x, y);
          
					if(nodeOne === null || nodeTwo === null) {
            alert("Must click on a node -- Try again");
            click = !click;
					}
					//Also need to check if there is already an edge connecting two nodes
					
					if (nodeOne.value() === nodeTwo.value()) {
						jsav.umsg("Can not connect a node to itself");
						click = !click;
					}
					else if (g.hasEdge(nodeOne,nodeTwo)) {
						alert("Graph already has a edge between " + nodeOne.value() +
							" and " + nodeTwo.value());
							click = !click;
					}					
					else {
           	g.addEdge(nodeOne,nodeTwo);
          	jsav.umsg("Connected node " + nodeOne.value() + " to node " + nodeTwo.value());		
            g.layout();
						click = !click;					
					}
				}				
			}		
      
			if(addWeights && g.nodeCount() > 1) {
        if(!click){
          nodeOne = getGraphNode(x, y);
					click = !click;
				}        
				else if(click) {		
					nodeTwo = getGraphNode(x, y);
					if(nodeOne === null || nodeTwo === null) {
						alert("Must click on a node -- Try again");
						click = !click;						
					}
					//Also need to check if there is already an edge connecting two nodes					
					if (nodeOne === nodeTwo) {
						jsav.umsg("Can not connect a node to itself");
						click = !click;
					}
					else if (g.hasEdge(nodeOne,nodeTwo)) {
						alert("Graph already has a edge between " + nodeOne.value() +
							" and " + nodeTwo.value());
							click = !click;
					}					
					else {
            var weight = window.prompt("Input weight of edge","");
						g.addEdge(nodeOne,nodeTwo,{"weight": weight});					
						jsav.umsg("Connected node " + nodeOne.value() + " to node " + nodeTwo.value());
            g.layout();
					//	jsav.displayInit();
						click = !click;					
					}
				}
				
      
      
				// if(!click){
				   	// preClick[0] = new storeClick(x,y);
					// var nodeOne = getGraphNodeOne(graphNodes, preClick, x, y);
					// nodeOneHigh = nodeOne;
					// console.log(nodeOneHigh);
					// g.nodes()[nodeOne].highlight();
					// click = !click;
				// }else  {
					// console.log("in weights: ");
					// var nodeOne = getGraphNodeOne(graphNodes, preClick, x, y);
					// var nodeTwo = getGraphNode(graphNodes, x, y);
					// validateNodeClick(nodeOne, nodeTwo);
					
					// if(!g.hasEdge(g.nodes()[nodeOne], g.nodes()[nodeTwo])) {
						// alert("There is not an edge between the two selected nodes");
						// click = !click;
					// }else {
						// var weight = window.prompt("Input weight of edge","");
						// var edge = g.getEdge(g.nodes()[nodeOne], g.nodes()[nodeTwo]);
						// edge.weight(weight);
						// jsav.displayInit();
						// click = !click;
					// }
				// }
			}
	  
      
  }

                                                                    )
                                                                    
                                  }
	//}
		
	   ) 
    //}
//	)
// Connect action callbacks to the HTML entities

$('#addNodeMode').click(addNodeMode);
$('#addEdgeMode').click(addEdgeMode);
$('#addWeightedEdgeMode').click(addWeightedEdgeMode);
$('#moveNodeMode').click(moveNodeMode);
$('#createGraph').click(showControls);
$('#reshowGraph').click(reshow);

$('#done').click(done);




$('#reset').click(ODSA.AV.reset);
}(jQuery));
