(function ($) { 
// Global variables?????
	var click = false;
	var cll = isChecked();
	var cll = true;	
	var message = new JSAV($('.avcontainer'));
	var jsav = new JSAV($('.jsavcanvas')); 
	var g = jsav.ds.graph({layout: "manual", directed: cll, height:"450px", width:"600px"});
	var g2 = jsav.ds.graph(); 
	var size; 
	var i = 0; 
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





/////////////////////////////////////////////////////////////////////////

function done() {
	console.log("DONE");
	$('#graphControls').toggle();
	g.hide();
	console.log("done " + g.nodes()[0].value());
	message.clearumsg();
}


function reshow() {    
	// g2.show();
	jsav2.displayInit();     
}


function getGraphNode(x, y) {
	var realX;
	var realY;
	var node;
	for (var i = 0; i < g.nodes().length; i++) {
		node = g.nodes()[i];
		realX = node.options.left;
		realY = node.options.top;

		if(realX + 25 >= x && realX - 25 <= x && realY + 25 >= y && realY - 25 <= y) {		
			console.log("Node   x: " + node.options.left + " y: " + node.options.top);   
			node.highlight(); 
			return node;
		}
	}
	return null;		
}


function isChecked(){
	// if($('#chkbox').prop('checked'))  {
	// 	console.log("checked");
	// }
	// return $('#chkbox').prop('checked');
	if($('#chkbox').checked){
	console.warn("The graph is directed");
	}
	return $('#chkbox').checked;
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
	} else {
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

jQuery(document).ready(function(){$('.jsavgraph').click(function(e)
{

var x = e.pageX - 50;       //x click coordinate 150
var y = e.pageY - 220; 		// y click coordinate   190


/* Add the node to the canvas and store the id (i) and coordinates (x and y) in an array. */
if(addNodes) {
	g.addNode(i, {"left": x, "top": y}); 
	i++;
}
/*Move does not work correctly now -- disconnected handler */
if(move) {   
	if(!click) {
		moveNode = getGraphNode(x, y);
		click = !click;
	} else {
		//var temp = moveNode.value();
 		//g.removeNode(moveNode);
		//g.layout();
		moveNode.options.left = x;
		moveNode.options.top = y
		//g.addNode(temp, {"left": x, "top": y}); 

		console.log("moved node   x: " + moveNode.options.left + " y: " + moveNode.options.top);
  	g.layout();
		click = !click;
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
		}	else if (g.hasEdge(nodeOne,nodeTwo)) {
			alert("Graph already has a edge between " + nodeOne.value() +
				" and " + nodeTwo.value());
			click = !click;
		} else {
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
	} else if(click) {		
		nodeTwo = getGraphNode(x, y);
		if(nodeOne === null || nodeTwo === null) {
			alert("Must click on a node -- Try again");
			click = !click;						
		}
//Also need to check if there is already an edge connecting two nodes					
		if (nodeOne === nodeTwo) {
			jsav.umsg("Can not connect a node to itself");
			click = !click;
		} else if (g.hasEdge(nodeOne,nodeTwo)) {
			alert("Graph already has a edge between " + nodeOne.value() +
				" and " + nodeTwo.value());
			click = !click;
		} else {
			var weight = window.prompt("Input weight of edge","");
			g.addEdge(nodeOne,nodeTwo,{"weight": weight});					
			jsav.umsg("Connected node " + nodeOne.value() + " to node " + nodeTwo.value());
	//		g.layout();
			//	jsav.displayInit();
			click = !click;					
		}
	}

}
console.log("Node count :  " + g.nodeCount());
var node = g.nodes();
console.log(node[0]);
//for (var i = 0; i < g.nodes().length; i++) {		node = g.nodes()[i];
//	console.log("Node " + i + " === " + node.value());
//}
})}); 

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
