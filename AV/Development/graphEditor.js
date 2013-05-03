(function ($) { 
  // Global variables?????
	
	var click = false;
	var cll = isChecked();
	jsav = new JSAV($('.avcontainer'));  
	var g = jsav.ds.graph({width: 800, height: 500, layout: "manual", directed: cll});
  
  //jsav.umsg(
	var i = 0; 
	var weight = 10;
	var graphNodes = new Array();
	var preClick = new Array();
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
  var switchState = true;
  var stateCount = 0;
  var stateCountTwo = 0;
  
    // Struct type container to hold id and x,y position of nodes   
	function node(id, x, y) {
    console.log("in node");
		this.id = id;
		this.x = x;
		this.y = y;
	}
  
	//Struct type container to hold the x,y positions of a previous click
	function storeClick(x,y) {
    this.x = x;
		this.y = y;
	}
	
	function getGraphNodeOne(graphNodes, preClick, x, y) {
		var	clickedX = preClick[0].x;
		var clickedY = preClick[0].y;
		for(var i = 0; i < graphNodes.length; i++) {
			realX = graphNodes[i].x;
			realY = graphNodes[i].y;
				if(realX  + 25 >= clickedX && realX - 25 <= clickedX && realY + 25 >= clickedY && realY - 25 <= clickedY) {
		    		//console.log("X: " + realX + "  Y: " + realY);
					//g.nodes()[graphNodes[i].id].highlight();
					//alert("now I am in node one");
				
					return graphNodes[i].id;
				}
		}
		return null;
	}
	
	
    function getGraphNodeTwo(graphNodes, x, y) {
		var realX;
		var realY;
		for(var i = 0; i < graphNodes.length; i++) {
			realX = graphNodes[i].x;
			realY = graphNodes[i].y;
			
				if(realX + 25 >= x && realX - 25 <= x && realY + 25 >= y && realY - 25 <= y) {
		    		//alert("now I am in node one");
					//g.nodes()[graphNodes[i].id].highlight();
          console.log("GET GRAPH NODE:   X: " + x + "  Y: " + y);
          console.log("GET GRAPH NODE:   realX: " + realX + "  realY: " + realY);
					return graphNodes[i].id;
				}
		}
		return null;
		
    }
    
	
	function isChecked(){
   var checkbox = document.getElementById('chkbox');
     if (checkbox.checked) {
       return true;
     } else { 
       return false;
     }
   
	}
	
	function addNodeMode() {
   
      addNodes = true;
      addEdges = false;
      addWeights = false;
      move = false;
      console.log("Inside add node mode()");
      jsav.umsg("You are currently in add node mode");
    
	}
	
	function addEdgeMode() {
   console.log(stateCount);
   if(stateCount <= 0) {
      
      addEdges = true;
      addNodes = false;
      addWeights = false;
      move = false;
      stateCountTwo++;
      stateCount--;
      console.log("Inside add edge mode()");
      jsav.umsg("You are currently in add edge mode");
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
    console.log("Inside add weighted edge mode()");
		jsav.umsg("You are currently in add weighted edge mode.  Click on two nodes to add the weighted edge.");
  }else {
     alert("Can not change from add weight edges to add edges");
	}
  }
  
  function moveNodeMode() {
    move = true;
    addEdges = false;
		addNodes = false;
		addWeights = false;
    console.log("Inside move node mode()" + move);
		jsav.umsg("You are currently in move node mode.  Click on a node and then click on new position.");
  }
    
	
	function validateNodeClick(nodeOne, nodeTwo) {
		if(nodeOne === null || nodeTwo === null) {
			alert("Must click on a node -- Try again");
			click = !click;	
		}
	}		
					
					
   
   
   
	
 // START MAKING CHANGES HERE... ATTEMPT TO CAPTURE CLICK AND DRAW A NODE.  
  
	jQuery(document).ready(function(){$('.jsavcanvas').click(function(e)
	{
  
    
      
  
 // function test() {
 
    // var self = $(this);
    // var dx = e.pageX;
    // var dy = e.pageY;

    // var x = dx - self.offset().left ;
    // var y = dy - self.offset().top ;
		
			var x = e.pageX - 86;       //x click coordinate
			var y = e.pageY - 195; 		// y click coordinate
			console.log("moveNode in clicker " + move);
			//if click is outside of the box that contains the graph
			// if(y < 250) {
				
				// alert("You can only add nodes inside the blue box");
				// insideBox = !insideBox;
			// }
      
      
        
			/* Add the node to the canvas and store the id (i) and coordinates (x and y) in an array. */
 			if(insideBox && addNodes) {
        console.log("I should add node to screen here");
				//g.addNode(i, {"left": x - 88, "top": y - 180});
        g.addNode(i, {"left": x, "top": y});
				graphNodes[i] = new node(i, x, y);
        console.log("i " + i);
				i++;
			}
      /*Move does not work correctly now -- disconnected handler */
      if(move) {
      console.log("in moveNode");
        if(!click) {
          console.log("moveNodeMode and !nextClick");
          
          var moveNode = getGraphNodeTwo(graphNodes, x, y);
         // edges = g.nodes()[moveNode].edges();
       //  (g.nodes()[moveNode]).hide();
         
         var xX=graphNodes[moveNode].x;
         var yY=graphNodes[moveNode].y;
         console.log("x " + x + "  y " + y);
         console.log("xX " + xX + "   yY " + yY);
         jsav.g.circle(xX + 68, yY + 23, 24);
       //  jsav.displayInit();
         // g.removeNode(g.nodes()[moveNode]);
          nodeNumber = moveNode;
          click = !click;
        } else {
          console.log("move node mode  and nextclick");
          g.addNode(nodeNumber, {"left": x, "top": y});
          console.log(graphNodes[nodeNumber].x);
         
          
          click = !click;
        }
      }
			
      
			/* Add Edges */
			if(addEdges && g.nodeCount() > 1) {
				if(nodeOneHigh!=null && nodeTwoHigh!=null) {
					g.nodes()[nodeOneHigh].unhighlight();
					g.nodes()[nodeTwoHigh].unhighlight();
				}
				
				
			
				//Need to store a click location to identify the first node selected
				if(!click){
				   	preClick[0] = new storeClick(x,y);
          /*Highlight broken  
					var nodeOne = getGraphNodeOne(graphNodes, preClick, x, y);
					nodeOneHigh = nodeOne;
					console.log(nodeOneHigh);**/
					
          
					click = !click;
				}
				// First node has been selected, now retrieve second selected node.
				else if(click) {
					var nodeOne = getGraphNodeOne(graphNodes, preClick, x, y);
					//nodeOneHigh = nodeOne;
					//g.nodes()[nodeOne].highlight();
					var nodeTwo = getGraphNodeTwo(graphNodes, x, y);
				//	nodeTwoHigh = nodeTwo;
				//	g.nodes()[nodeTwo].highlight();
					
					//validateNodeClick(nodeOne, nodeTwo);
					
					//g.nodes()[nodeOne].highlight();
					if(nodeOne === null || nodeTwo === null) {
						alert("Must click on a node -- Try again");
						click = !click;
						
					}
					//Also need to check if there is already an edge connecting two nodes
					
					if (g.nodes()[nodeOne].value() === g.nodes()[nodeTwo].value()) {
						jsav.umsg("Can not connect a node to itself");
						click = !click;
					}
					else if (g.hasEdge(g.nodes()[nodeOne],g.nodes()[nodeTwo])) {
						alert("Graph already has a edge between " + g.nodes()[nodeOne].value() +
							" and " + g.nodes()[nodeTwo].value());
							click = !click;
					}
					
					else {
						g.addEdge(g.nodes()[nodeOne],g.nodes()[nodeTwo]);
						
						jsav.umsg("Connected node " + g.nodes()[nodeOne].value() + " to node " + g.nodes()[nodeTwo].value());
						g.layout();
						click = !click;
					
					}
				}
				else {
					preClick[0] = new storeClick(x,y);
					click = !click;
				}
			}		
      
			if(addWeights && g.nodeCount() > 1) {
        if(!click){
				  preClick[0] = new storeClick(x,y);
				//	var nodeOne = getGraphNodeOne(graphNodes, preClick, x, y);
				//	nodeOneHigh = nodeOne;
				//	console.log(nodeOneHigh);
					//g.nodes()[nodeOne].highlight();
					click = !click;
				}
				
				else if(click) {
					var nodeOne = getGraphNodeOne(graphNodes, preClick, x, y);
				//	nodeOneHigh = nodeOne;
					//g.nodes()[nodeOne].highlight();
					var nodeTwo = getGraphNodeTwo(graphNodes, x, y);
				//	nodeTwoHigh = nodeTwo;
				//	g.nodes()[nodeTwo].highlight();
					
					//validateNodeClick(nodeOne, nodeTwo);
					
					//g.nodes()[nodeOne].highlight();
					if(nodeOne === null || nodeTwo === null) {
						alert("Must click on a node -- Try again");
						click = !click;
						
					}
					//Also need to check if there is already an edge connecting two nodes
					
					if (g.nodes()[nodeOne].value() === g.nodes()[nodeTwo].value()) {
						jsav.umsg("Can not connect a node to itself");
						click = !click;
					}
					else if (g.hasEdge(g.nodes()[nodeOne],g.nodes()[nodeTwo])) {
						alert("Graph already has a edge between " + g.nodes()[nodeOne].value() +
							" and " + g.nodes()[nodeTwo].value());
							click = !click;
					}
					
					else {
            var weight = window.prompt("Input weight of edge","");
						//var edge = g.getEdge(g.nodes()[nodeOne], g.nodes()[nodeTwo]);
						//edge.weight(weight);
						// jsav.displayInit();
						// click = !click;
						g.addEdge(g.nodes()[nodeOne],g.nodes()[nodeTwo],{"weight": weight});
					//	jsav.container.trigger("jsav-updaterelative");
						jsav.umsg("Connected node " + g.nodes()[nodeOne].value() + " to node " + g.nodes()[nodeTwo].value());
            g.layout();
						jsav.displayInit();
						click = !click;
					
					}
				}
				else {
					preClick[0] = new storeClick(x,y);
					click = !click;
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
					// var nodeTwo = getGraphNodeTwo(graphNodes, x, y);
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
			if(!insideBox){
				insideBox=!insideBox;
			}
			
      
  }
                                                                    )
                                  }
	//}
		
	   ) 
    //}
//	)
// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#help').click(help);
$('#addNodeMode').click(addNodeMode);
$('#addEdgeMode').click(addEdgeMode);
$('#addWeightedEdgeMode').click(addWeightedEdgeMode);
$('#moveNodeMode').click(moveNodeMode);



$('#reset').click(ODSA.AV.reset);
}(jQuery));
