"use strict";
/*global alert: true, ODSA */

$(document).ready(function() {
  var jsav = new JSAV("topSortQCON");
  var g;
  var queue;
  var Courses;
  var Ecount;
  var oparr;
  var arrleft = 420;

  var oparrcnt ;
  var output = new Array();
  var c1, c2, c3, c4, c5, c6, c7, c8;
  var Count = new Array();

  g = jsav.ds.graph({width: 500, height: 500, left: 55, top: 20,
                     layout: "manual", directed: true});

  queue = jsav.ds.array(["<b>Queue</b>","","","","","","","",""],
                        {left: arrleft, top: 200}).css({"font-size": "10px",
                                                        "width": "100px"});
  queue.css(0, {"background-color":"#CC6633"});

  //  Ecount = new jsav.ds.array(["<b>&nbsp;Count&nbsp</b>", "", "", "", "", "", "", "", ""],
  Ecount = new jsav.ds.array(["<b>&nbsp;Count&nbsp;</b>"], {left: arrleft, top:135}).css({"font-size": "10px"});
  Ecount.css(0,{"background-color":"#CC6633"});

  oparr = jsav.ds.array(["<b>Output</b>", "", "", "", "", "", "", "", ""],
                        {left: arrleft, top: 275}).css({"font-size": "10px"});
  oparr.css(0,{"background-color": "#CC6633"});
  oparrcnt = 1;

  // Create some graph. Right now, manually. But could read from file.
  initGraph();

  // Generate the count of prereqs for each job
  getCounts();
  
  g.layout();
  jsav.umsg("A queue based topological sort is performed on a directed acyclic graph.");
  jsav.step();
  jsav.displayInit();

  jsav.umsg("The \"Nodes\" array begins with a list of the courses. These are effectively in some random order (we will order by course number, which does not dictate prerequisite order). The \"Count\" array shows the number of incoming edges, which is the number of unresolved dependencies for that node.");
  jsav.step();
  jsav.umsg("Now we are ready to start the topological sort process.");
  jsav.step();

  topSortBFS(g.nodes()[0]);

  jsav.umsg("Possible ordering of CS coures:  " + displaySort());
  jsav.step();
  jsav.recorded();

  
  function getCounts() {
    var v;
    var i, j;
    var node;
    var adjNode = new Array();
    for (v = 0; v < g.nodeCount(); v++) {
      Count[v] = 0;
    }
    for (v = 0; v < g.nodeCount(); v++) {
      node = g.nodes()[v];
      adjNode = node.neighbors();
      for(i = 0; i < adjNode.length; i++){
        j = (g.nodes()).indexOf(adjNode[i]);
        if(j >= 0)
          (Count[j])++;
      }
    }
    for(i = 0; i < g.nodeCount(); i++) {
      Ecount.value(i+1, Count[i]);
    }
  }
  
  function displaySort() {
    var str = "";
    var opnode;
    while(output.length > 0) {
      opnode=output.shift();
      str += "CS" + opnode+ "   ";
    }
    return str;
  }

  function markIt(node, q) {
    node.addClass("marked");
    jsav.umsg("Enqueue "+ node.value() +" since it has no unsatisfied prerequisite.");
    for(var i = 0; i < q.length; i++)
      queue.value(i + 1, q[i].value());
    node.highlight();
    jsav.step();
  }

  function dequeueIt(node, q) {
    var i;
    node.addClass("dequeued");
    for(i = 0; i < q.length; i++)
      queue.value(i + 1, q[i].value());
    queue.value(i + 1, "");
    i = g.nodes().indexOf(node);
    oparr.value(oparrcnt, node.value());
    oparr.css(oparrcnt, {"background-color":"#66CC99", "font-size": "10px"});
    oparrcnt++;
    Ecount.addClass(i + 1, "marked");
    Courses.unhighlight(i + 1);
    Ecount.unhighlight(i + 1);
  }

  function updateCount(adjnodes){
    var str = "";
    var node;
    var i;
    
    while(adjnodes.length > 0) {
      node = adjnodes.shift();
      str += " " + node.value() + " ";
    }
    jsav.umsg("Mark " + str + " and update the number of incoming edges.");
    for(var i = 0;i < g.nodeCount(); i++) {
      var temp = Ecount[i + 1];
      Ecount.value(i + 1, Count[i]);
      if(Count[i] == 0 && temp != 0) {
        if(!Ecount.hasClass(i + 1, "marked")){
          Courses.highlight(i + 1);
          Ecount.highlight(i + 1);
        }
      }
    }
    jsav.step();
  }

  function topSortBFS(start) {
    console.log("start : " + start.value());
    var node;
    var adjNode = new Array();
    var q = new Array();
    var v = 0;
    var ctr = 0;
    var i, j;
    var cntZero = new Array();
    // Put any nodes without prereqs onto the queue
    for(v = 0; v < g.nodeCount(); v++) {
      if(Count[v] == 0){
        node = g.nodes()[v];
        if(!node.hasClass("marked")){
          q.push(node);
          Courses.highlight(v+1);
          Ecount.highlight(v+1);
          markIt(node,q);
        }
      }
    }

    // Process the queue until it is empty
    while(q.length > 0) {
      node = q.shift();
      jsav.umsg("Dequeue " + node.value()+ ", put it into the Output array and reduce the prerequisite count of its neighbors.");
      dequeueIt(node, q);
      jsav.step();
      // console.log("node " + node.value());
      output.push(node.value());
      adjNode = node.neighbors();
      // console.log("adjNode " + adjNode.length);
      ctr = 0;

      // Process the neighbors
      for(i = 0; i < adjNode.length; i++) {
        j = (g.nodes()).indexOf(adjNode[i]);
        if (j >= 0){
          (Count[j])--;
          ctr++;
          if(Count[j] == 0) {
            node=g.nodes()[j];
            cntZero.push(node);
          }
        }
      }
      if(ctr > 0)
        updateCount(adjNode);
      while(cntZero.length > 0) {
        node=cntZero.shift();
        q.push(node);
        markIt(node, q);
      }
    }

  }

  // Graph prepartion for initial stage of visualization
  function initGraph() {
    c1 = g.addNode("1114", {"left": 230});
    c2 = g.addNode("2114", {"left": 100, "top": 75});
    c5 = g.addNode("2505", {"left": 0, "top": 150});
    c6 = g.addNode("2506", {"left": 10, "top": 270});
    c7 = g.addNode("3114", {"left": 200, "top": 150});
    c8 = g.addNode("3214", {"left": 10, "top": 350});
    c4 = g.addNode("3304", {"left": 225, "top": 220});
    c3 = g.addNode("3604", {"left": 170, "top": 220});

    g.addEdge(c1, c2);
    g.addEdge(c2, c5);
    g.addEdge(c5, c7);
    g.addEdge(c5, c6);
    g.addEdge(c7, c3);
    g.addEdge(c7, c4);
    g.addEdge(c6, c8);

    g.addEdge(c7, c6);
    
    var gNodes = g.nodes();
    var data = new Array();
    data[0] = "Nodes"
    for(var i = 0; i < g.nodeCount(); i++) {
      data[i + 1] = gNodes[i].value();
    }
    Courses = new jsav.ds.array(data, {left: arrleft, top: 90}).css({"font-size" : "10px"});
    Courses.css(0, {width:80, "background-color": "#CC6633"});
  }
});
