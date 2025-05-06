//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */
$(document).ready(function () {
  "use strict";

  var av_name = "TSPCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var av = new JSAV(av_name);
  var minC, minPath=[];
  var gnodes; //must be populated with the using g.nodes() befire calling getSol on g.
  var visited; //must be initialized to an array containing as many nodes as g, all setto zero, before calling getSol on g.
  var getSol= function(g,curr,start,path,length){
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
      var newlength = length + g.getEdge(gnodes[curr],gnodes[i]).weight();
      if(minC >= 0 && newlength>=minC)
        continue;
      getSol(g,i,start,path,newlength);
    }
    if(flag==0){
      newlength = length + g.getEdge(gnodes[curr],gnodes[start]).weight();
      if(minC<0 || minC > newlength){
        minC=newlength;
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

  var label1, label2 , label3, label4, label5, label6,label7,label8,label9;
  var y = 0;

  // Slide 1
  av.umsg("<br><b>Introduction to Traveling Salesman Problem (TSP)</b>");
  var nl1=av.label("This slideshow introduces and explains the \"Traveling"+
                   " Salesman\" Problem.",{top:0});
  av.displayInit();
  av.step();

  // Slide 2
  nl1.hide();
  av.umsg("<br><b>Traveling Salesman</b>");
  nl1=av.label("There are $n$ cities. Every pair of cities is separated"
               + " by some distance. A traveling salesman aims to visit each one exactly once, and the total distance covered during the tour is as "
               + "short as possible.", {top: -10});
  av.step();

  // Slide 3
  var nl2=av.label("This can be modeled as a complete graph where each node "
                   +"represents a particular city and the weight of the edges denote the distance"+
                   " between the two cities it connects. <br> The problem now can be stated as finding"+
                   " the shortest simple cycle in the graph that passes through all vertices in the graph. (The length of a cycle is"
                   +" the sum of weights of all the edges included in the cycle.)"+
                   "<br><br>Note: A simple cycle may be defined as a closed walk with no "+
                   "repetitions of vertices and edges allowed, other than the repetition of the "+
                   "starting and ending vertex.</b>"
                   ,{top:70});
  av.step();

  // Slide 4
  var nl3 = av.label("<b>An example:</b>", {top: 260});

  var g1 = av.ds.graph({width: 400,  height: 200, layout: "manual",
                        directed: false,top:280,left:100});
  var nodes = new Array(5);
  var x = 50;
  var y = 0;
  nodes[0] = g1.addNode("A",{left:x+50,top:y});
  nodes[1] = g1.addNode("B",{left:x+200,top:y});

  nodes[2] = g1.addNode("C",{left:x,top:y+75});

  nodes[3] = g1.addNode("D",{left:x+280,top:y+100});

  nodes[4] = g1.addNode("E",{left:x+150,top:y+150});

  for(var i=0;i<4;i++)
    for(var j=i+1;j<5;j++)
      g1.addEdge(nodes[j],nodes[i]).weight(2*i+j);
  g1.layout();
  /* minC=-1;
     gnodes=g1.nodes();
     visited = new Array(gnodes.length);
     for(var i in visited)
     visited[i]=0;
     getSol(g1,0,0,[],0);
     console.log(minPath);
  */
  av.step();

  // Slide 5
  label1 = av.label("The red edges form a minimum-length tour with total length being 24.",{left:450,top:270});
  g1.getEdge(nodes[0],nodes[2]).addClass("edgehighlight");
  g1.getEdge(nodes[3],nodes[2]).addClass("edgehighlight");
  g1.getEdge(nodes[3],nodes[1]).addClass("edgehighlight");
  g1.getEdge(nodes[4],nodes[1]).addClass("edgehighlight");
  g1.getEdge(nodes[4],nodes[0]).addClass("edgehighlight");
  av.step();

  // Slide 6
  label1.hide();
  nl1.hide();
  nl2.hide();
  nl3.hide();
  g1.hide();
  av.umsg("<br><b>The Traveling Salesman Problem</b>");
  nl1=av.label("The Traveling Salesman problem can be defined either as a decision problem or not."
               +" The decision form is know to be NP-complete."
               +  "<br><br><br>Given a graph $G=(V,E)$, find the shortest simple cycle that passes through all "+
               "vertices of the graph.The length of the cycle is the sum of weights of its edges."
               +"<br><br>OR<br><br>"
               +"(Decision Problem Form:) Given a graph $G=(V,E)$ and integer $k$, does the graph contain a simple"+
               " cycle that passes through all vertices and has length $\\leq k$?"
               ,{top:0});
  av.step();

  // Slide 7
  nl1.hide();
  av.umsg("<br><b>Example of Traveling Salesman Problem (decision form)</b>");
  var g = av.ds.graph({width: 600,  height: 450, layout: "manual",
                       directed: false,left:100,top:30});
  nodes = new Array(7);
  var x = 0;
  var y = 0;
  nodes[0] = g.addNode("A",{left:x+200,top:y});
  nodes[1] = g.addNode("B",{left:x+440,top:y});
  nodes[2] = g.addNode("C",{left:x-5,top:y+130});
  nodes[3] = g.addNode("D",{left:x+550,top:y+140});
  nodes[4] = g.addNode("E",{left:x+5,top:y+250});
  nodes[5] = g.addNode("F",{left:x+540,top:y+300});
  nodes[6] = g.addNode("G",{left:x+175,top:y+360});

  for(i=0;i<6;i++)
    for(j=i+1;j<7;j++)
      g.addEdge(nodes[j],nodes[i]).weight(2*i+j);
  g.layout();

  /*  minC=-1;
      gnodes=g.nodes();
      visited = new Array(gnodes.length);
      for(var i in visited)
      visited[i]=0;
      getSol(g,0,0,[],0);
      console.log(minPath);
      console.log(minC);
  */
  nl1=av.label("Does this graph have a simple cycle that includes all vertices and has "+
               "length $\\leq 50$?",{top:-10});
  av.step();

  // Slide 8
  nl2=av.label("<b>No</b>",{top:40});
  av.step();

  // Slide 9
  nl1.hide();
  nl2.hide();
  av.umsg("<br><b>Example of Traveling Salesman Problem</b>");
  nl1=av.label("Does this graph have a simple cycle that includes all vertices and has"+
               " length <= $55$?",{top:-10});
  av.step();

  // Slide 10
  nl2=av.label("<b>Yes</b> <br>[The cycle has a length of 51.]",{top:40});
  g.getEdge(nodes[0],nodes[3]).addClass("edgehighlightbold");
  g.getEdge(nodes[4],nodes[3]).addClass("edgehighlightbold");
  g.getEdge(nodes[4],nodes[1]).addClass("edgehighlightbold");
  g.getEdge(nodes[5],nodes[1]).addClass("edgehighlightbold");
  g.getEdge(nodes[5],nodes[2]).addClass("edgehighlightbold");
  g.getEdge(nodes[6],nodes[2]).addClass("edgehighlightbold");
  g.getEdge(nodes[6],nodes[0]).addClass("edgehighlightbold");

  av.recorded();
});
