
var nodeIndex = 0;
var nodes = new Array();
var connections = new Array();
var linking_phrase = new Array();
var graph = new Array();
var adjacents = new Array();
var array = new Array();
var list = new Array();

function Parser() {

  xmlhttp = new XMLHttpRequest();
    if(xmlhttp) {
      xmlhttp.open("GET","Graphs.xml",false);
      xmlhttp.send();
      xmlDoc=xmlhttp.responseXML;
  }

  phrase = xmlDoc.getElementsByTagName('linking-phrase');
    for(var c = 0; c < phrase.length; c++) {
      id = phrase[c].getAttribute('id');
      label = phrase[c].getAttribute('label');
      linking_phrase.push(new Phrase(id, label));
  }

  //Connections between nodes
  connection = xmlDoc.getElementsByTagName('connection');
    for(var b = 0; b < connection.length; b++) {
      id = connection[b].getAttribute('id');
      from_id = connection[b].getAttribute('from-id');
      to_id = connection[b].getAttribute('to-id'); 
      connections.push(new Connection(id, from_id, to_id));
  }

  concept = xmlDoc.getElementsByTagName('concept');
  var id = 0;
  var label = null;

//Concepts or Nodes
  for(var a = 0; a < concept.length; a++) {
    id = concept[a].getAttribute('id');
    label = concept[a].getAttribute('label');
    nodes.push(new Node(id, label, null, null));
  } 

  for(var aa = 0; aa < concept.length; aa++) {
    thisId = concept[aa].getAttribute('id');
    thisLabel = concept[aa].getAttribute('label');
    var startNode = new Array();
    var parentId = getParent(thisId);
    var parentLabel = getConceptLabel(parentId);
 
    var incomingEdge = getIncomingEdge(thisId);
    startNode.push(new Node(thisId, thisLabel, incomingEdge, parentLabel));
    graph.push(startNode);
  }
 /* var newList;
  console.log("GOING TO PRINT GRAPH START NODES");
  for(var index = 0; index < graph.length; index++) {
    newList = graph[index];
    console.log(newList[0].label);
  } */
}

function buildGraph() {
  var to_id = null;
  var from_id = null;
  var index = 0;
  var fromNode = null;
  var edgeLabel = null;
  var parent_id = null;
  var parent_node = null;

  for(var d = 0; d < connections.length; d++) {
    index = getNodeIndex(connections[d].from_id);
    if(isNode(connections[d].from_id)) { 
        
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
     // graph[index].push(adjacentNodes);
    } 
/* else {

        var nodeList = graph[index];
     
        for(var r = 0; r < connections.length; r++) {
     
          if(to_id === connections[r].from_id) {
            toNode = getConceptLabel(connections[r].to_id);
            edgeLabel = getEdgeLabel(to_id);
            nodeList.push(new Node(connections[r].to_id, toNode, edgeLabel)); 
          }
        }
      } */
    }
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
  for(var i = 0; i < nodes.length; i++) {
    if(nodes[i].id === id) {
      return nodes[i].label;
    }
  }
    return null;
}

function getParent(id) {
  for(var u = 0; u < connections.length; u++) {
    if(connections[u].to_id === id) {
       var from_id = connections[u].from_id;
       for(var v = 0; v < connections.length; v++) {
        if(connections[v].to_id == from_id){
          return connections[v].from_id;
        }
       }
    }
  }
}

function getEdgeLabel(id) {
  for(var j = 0; j < linking_phrase.length; j++) {
    if(linking_phrase[j].id === id) {
      return linking_phrase[j].label;
    }
  }
    return null;
}


function getIncomingEdge(id) {  
  for(var bb = 0; bb < connections.length; bb++) {
    
    if(connections[bb].to_id === id) {
      var label = getEdgeLabel(connections[bb].from_id);
      return label;
    }
  }
  return null;
}

function isNode(id) {
  for(var k = 0; k < nodes.length; k++) {
    if(nodes[k].id === id){
      return true;
    }
  }
  return false;
}

function Graph() {
      this.numOfEdges = 0;
      this._adjacencyLists = {};
      this._nodeList={};
}

function Node(id, label, edge, parent) {
      this.id = id;
      this.label = label;
      this.edge = edge;
      this.parent = parent;
}

function Connection(id, from_id, to_id) {
  this.id = id;
  this.from_id = from_id; 
  this.to_id = to_id;
}

function Phrase(id, label) {
  this.id = id;
  this.label = label;
}

function printGraph(concept) {
  jsav = new JSAV($('.avcontainer'));
  g = jsav.ds.graph({width: 800, height: 500, layout: "automatic", directed: true});  
  
  for(var l = 0; l < graph.length; l++) {
    var m = graph.length;
    var list = graph[l];
    if(list[0].label === concept) {
      var fromNode = g.addNode(list[0].label);
      var parentNodeName = list[0].parent;
        if(parentNodeName != null) {
          var parentNode = g.addNode(parentNodeName);
          g.addEdge(parentNode, fromNode, {"weight":list[0].edge});
        }
      for(var p = 1; p < list.length; p++) {
        var toNode = g.addNode(list[p].label);
        g.addEdge(fromNode, toNode, {"weight": list[p].edge});
      }
      g.layout();
      return;
    }
      
    }
  }

function runit() {
  Parser();
  buildGraph();
  var term = localStorage.getItem("concept");  
  printGraph(term);  
}


