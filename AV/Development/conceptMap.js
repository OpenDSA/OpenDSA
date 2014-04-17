(function ($) {
var nodeIndex = 0;
var nodes = new Array();
var connections = new Array();
var linking_phrase = new Array();
var graph = new Array();
var adjacents = new Array();
//var graph = [][];
//var adjacents = new Array();
//var array = {};
var array = new Array();
var list = new Array();
function Parser() {


//$.get('data/hello.xml', function(xml){ var json = $.xml2json(xml); alert(json.message); }); - See more at: http://www.fyneworks.com/jquery/xml-to-json/#sthash.ElDIZAKp.dpuf
$.get("Graphs.xml", function(xml){
    var json = $.xml2json(xml);
  //  console.log("JSON");
  //  console.log(JSON.stringify(json)); // To show result in the browser
});

xmlhttp = new XMLHttpRequest();
if (xmlhttp) {
  xmlhttp.open("GET","Graphs.xml",false);
  xmlhttp.send();
  xmlDoc=xmlhttp.responseXML;
}


phrase = xmlDoc.getElementsByTagName('linking-phrase');
  for (var c = 0; c < phrase.length; c++) {
    id = phrase[c].getAttribute('id');
    label = phrase[c].getAttribute('label');

    linking_phrase.push(new Phrase(id, label));
  }

//Connections between nodes
connection = xmlDoc.getElementsByTagName('connection');
//console.log("connection length " + connection.length);
for (var b = 0; b < connection.length; b++) {
  id = connection[b].getAttribute('id');
  from_id = connection[b].getAttribute('from-id');
  to_id = connection[b].getAttribute('to-id');
 
  connections.push(new Connection(id, from_id, to_id));
}

concept = xmlDoc.getElementsByTagName('concept');
var id = 0;
var label = null;

//Concepts or Nodes
//console.log("concepts length " + concept.length);
for (var a = 0; a < concept.length; a++) {
  id = concept[a].getAttribute('id');
  label = concept[a].getAttribute('label');
  nodes.push(new Node(id, label, null, null));
  
//  console.log(graph[a]);
} 
//console.log('**************************************');
for (var aa = 0; aa < concept.length; aa++) {
  thisId = concept[aa].getAttribute('id');
  thisLabel = concept[aa].getAttribute('label');
  var startNode = new Array();
  var parentId = getParent(thisId);
  var parentLabel = getConceptLabel(parentId);
 
  var incomingEdge = getIncomingEdge(thisId);
 // console.log("this label " + thisLabel + "  parent label  " + parentLabel);
  startNode.push(new Node(thisId, thisLabel, incomingEdge, parentLabel));
  graph.push(startNode);

}




}


function buildGraph() {
  var to_id = null;
  var from_id = null;
  var index = 0;
  var fromNode = null;
  var edgeLabel = null;
  var parent_id = null;
  var parent_node = null;
// console.log(graph);

  for(var d = 0; d < connections.length; d++) {
    if(isNode(connections[d].from_id)) { 

      index = getNodeIndex(connections[d].from_id);
     
      var adjacentNodes = graph[index];
      from_id = connections[d].from_id;
      to_id = connections[d].to_id;

      for(var e = 0; e < connections.length; e++) {          
        if(to_id === connections[e].from_id) {
          toNode = getConceptLabel(connections[e].to_id);
          edgeLabel = getEdgeLabel(to_id);
          adjacentNodes.push(new Node(connections[e].to_id, toNode, edgeLabel, null));
        }
      }
      graph[index].push(adjacentNodes);
    } 
 else {

        var nodeList = graph[index];
     
        for(var r = 0; r < connections.length; r++) {
     
          if(to_id === connections[r].from_id) {
            toNode = getConceptLabel(connections[r].to_id);
            edgeLabel = getEdgeLabel(to_id);
            nodeList.push(new Node(connections[r].to_id, toNode, edgeLabel)); 
          }
        }
      } 
    }
  }



function test() {
  
  var adjacents = new Array();
  for(var f = 0; f < 4; f ++) {
    adjacents.push(new Node(f, "from", "edge"));  
  }
  
  array["id1"] = adjacents;
  
  var adjacents = new Array();
  for(var g = 5; g < 9; g++) {
    adjacents.push(new Node(j, "from", "edge"));  
  }
  array["id2"] = adjacents;



}

function isInGraph(from_id) {
  for(var h = 0; h < graph.length; h++) {
    var list = graph[h];
    if(list[0].id === from_id) {
      nodeIndex = h;
      return true;
    }
  }
  return false; 
}


function getNodeIndex(id) {
  for(var z = 0; z < graph.length; z++) {
    var list = graph[z];
    if(list[0].id === id) {
      return z;
    }
  }
  return null; 
}

function getConceptLabel(id) {
  for (var i = 0; i < nodes.length; i++) {
    if(nodes[i].id === id) {
      return nodes[i].label;
    }
  }
    return null;
}



function getParent(id) {
  for (var u = 0; u < connections.length; u++) {
    if(connections[u].to_id === id) {
       var from_id = connections[u].from_id;
       for (var v = 0; v < connections.length; v++) {
        if(connections[v].to_id == from_id){
          return connections[v].from_id;
        }
       }
    }
  }
}

function getEdgeLabel(id) {
  for (var j = 0; j < linking_phrase.length; j++) {
    if(linking_phrase[j].id === id) {
      return linking_phrase[j].label;
    }
  }
    return null;
}


function getIncomingEdge(id) {
  
  for (var bb = 0; bb < connections.length; bb++) {
    
    if(connections[bb].to_id === id) {
      var label = getEdgeLabel(connections[bb].from_id);
      return label;
    }
  }
  return null;

}
function isNode(id) {
 // console.log("node count " + nodes.length);
  for(var k = 0; k < nodes.length; k++) {
    if(nodes[k].id === id){
      return true;
    }
  }
  return false;
}

var Graph = function() {
      this.numOfEdges = 0;
      this._adjacencyLists = {};
      this._nodeList={};
}




var Node = function(id, label, edge, parent) {
      this.id = id;
      this.label = label;
      this.edge = edge;
      this.parent = parent;
}


var Connection = function(id, from_id, to_id) {
  this.id = id;
  this.from_id = from_id; 
  this.to_id = to_id;
}

var Phrase = function(id, label) {
  this.id = id;
  this.label = label;
}



function printGraph() {
  for(var l = 0; l < graph.length; l++) {
    var m = graph.length;
    var list = graph[l];
 //   var string = list[0].label;
 //   console.log( list[0].label  + "  " + list[0].edge + "  " + list[0].parent);  
  }
}

function runit() {
  Parser();

  buildGraph();
//  printGraph();

  jsav = new JSAV($('.avcontainer'));
  g = jsav.ds.graph({width: 800, height: 800, layout: "automatic", directed: true});  

 // var nlist = graph[0];
  for(var n = 0; n < 5; n++) {     
  //  var m = graph.length;
    var list = graph[n];
    console.log(list[0].label);
    var fromNode = g.addNode(list[0].label);

     for(var p = 1; p < list.length; p++) {

       var toNode = g.addNode(list[p].label);
    //   console.log("from Node " + list[0].label + " to Node  " + list[p].label);
       g.addEdge(fromNode, toNode);
    
    } 
    g.layout();
  } 
}





$('#runit').click(runit);
}(jQuery));
