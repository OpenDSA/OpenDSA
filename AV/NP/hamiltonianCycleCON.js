//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */
$(document).ready(function () {
  "use strict";

  var av_name = "hamiltonianCycleCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var av = new JSAV(av_name);
  var y = 0;

  // Slide 1
  av.umsg("<br><b>Introduction to Hamiltonian Cycle Problem </b>");
  var nl1=av.label("This slideshow introduces"+
                   " and explains the \"Hamiltonian Cycle\" Problem."
                   +"</b> <br><br><br> We start with some definitions  and background.",{top:0});

  av.displayInit();
  av.step();

  // Slide 2
  nl1.hide();
  av.umsg("<br><b>Hamiltonian Cycle</b>");

  nl1=av.label("Hamiltonian Cycle is a graph cycle in an undirected or a"
               +"directed graph that passes through each vertex exactly once.", {top:-10});
  av.step();

  // Slide 3
  var nl2=av.label("For example - The edges marked in red in the graph below forms"
                   +" a Hamiltonian Cycle.", {top: 40});

  var  g = av.ds.graph({width: 400,  height: 450, layout: "manual",  directed:
                        false,left:200,top:100});
  var x=50;
  y=0;
  var c1 = g.addNode("1",  {"left": x,  "top": y+80});
  var c2 = g.addNode("2",  {"left": x+75, "top": y});
  var c3 = g.addNode("3",  {"left": x+95,  "top": y+170});
  var c4 = g.addNode("4",  {"left": x+145,  "top": y+70});
  var c5 = g.addNode("5",  {"left": x+300,  "top": y-10});
  var c6 = g.addNode("6",  {"left": x+240,  "top": y+120});

  var e14 = g.addEdge(c1,  c4);
  var e23 = g.addEdge(c2,  c3);
  var e21 = g.addEdge(c2,  c1);
  var e24 = g.addEdge(c2,  c4);
  var e13 = g.addEdge(c1,  c3);
  var e34 = g.addEdge(c4,  c3);
  var e46 = g.addEdge(c4,  c6);
  var e45 = g.addEdge(c4,  c5);
  var e25 = g.addEdge(c2,  c5);
  var e36 = g.addEdge(c3,  c6);
  var e56 = g.addEdge(c5,  c6);

  e25.addClass("edgehighlight1");
  e21.addClass("edgehighlight1");
  e13.addClass("edgehighlight1");
  e36.addClass("edgehighlight1");
  e46.addClass("edgehighlight1");
  e45.addClass("edgehighlight1");

  g.layout();
  g.show();
  av.step();

  // Slide 4
  nl1.hide();
  nl2.hide();
  g.hide();
  av.umsg("<br><b>The Hamiltonian Cycle Problem </b>");
  nl1=av.label("<b>Given a graph $G = (V,E)$, does the graph "
               +"contain a Hamiltonian Cycle? </b><br><br>",
               {top:5});
  av.step();

  // Slide 5
  y=0;
  nl1.hide();

  av.umsg("<br><b>Example of Hamiltonian Cycle Problem </b>");

  nl1=av.label("Does the graph below contain a Hamiltonian Cycle?"
               , {top:-10});

  var  g1 = av.ds.graph({width: 500,  height: 400, layout: "manual",  directed:
                         true,  left: 150, top:50});

  g1.addNode("1", {"width":"40px", "height":"40px", "min-widh":"40px",
                   "min-height":"40px", "background-color":"LightSyBlue", "left":300, "top":100});
  g1.addNode("2", {"width":"40px", "height":"40px", "min-widh":"40px",
                   "min-height":"40px", "background-color":"LightSyBlue", "left":330, "top":240});
  g1.addNode("3", {"width":"40px", "height":"40px", "min-widh":"40px",
                   "min-height":"40px", "background-color":"LightSyBlue", "left":450, "top":100});
  g1.addNode("4", {"width":"40px", "height":"40px", "min-widh":"40px",
                   "min-height":"40px", "background-color":"LightSyBlue", "left":200, "top":230});
  g1.addNode("5", {"width":"40px", "height":"40px", "min-widh":"40px",
                   "min-height":"40px", "background-color":"LightSyBlue", "left":0, "top":50});
  g1.addNode("6", {"width":"40px", "height":"40px", "min-widh":"40px",
                   "min-height":"40px", "background-color":"LightSyBlue", "left":70, "top":250});
  g1.addNode("7", {"width":"40px", "height":"40px", "min-widh":"40px",
                   "min-height":"40px", "background-color":"LightSyBlue", "left":100, "top":70});
  g1.addNode("8", {"width":"40px", "height":"40px", "min-widh":"40px",
                   "min-height":"40px", "background-color":"LightSyBlue", "left":250, "top":0});

  var nodes=g1.nodes();
  var cycleEdges = new Array(8);
  for(i=0;i<8;i++)
    cycleEdges[i]=g1.addEdge(nodes[i], nodes[(i+1)%8]).css({"stroke-width":"1.5px"});

  g1.addEdge(nodes[3], nodes[6]).css({"stroke-width":"1.5px"});;
  g1.addEdge(nodes[5], nodes[1]).css({"stroke-width":"1.5px"});;
  g1.addEdge(nodes[0], nodes[6]).css({"stroke-width":"1.5px"});;
  g1.addEdge(nodes[3], nodes[0]).css({"stroke-width":"1.5px"});;
  g1.addEdge(nodes[7], nodes[4]).css({"stroke-width":"1.5px"});;
  g1.addEdge(nodes[0], nodes[2]).css({"stroke-width":"1.5px"});;
  g1.addEdge(nodes[3], nodes[5]).css({"stroke-width":"1.5px"});;
  g1.addEdge(nodes[2], nodes[7]).css({"stroke-width":"1.5px"});;
  g1.addEdge(nodes[1], nodes[3]).css({"stroke-width":"1.5px"});;
  g1.layout();
  g1.show();
  av.step();

  // Slide 6
  var label1=av.label("<b>Yes</b>",{left:10,top:40});
  for(i=0;i<8;i++)
    cycleEdges[i].addClass("edgehighlight2");;
  g1.layout();
  g1.show();
  av.step();

  // Slide 7
  nl1.hide();
  y=0;
  label1.hide();
  g1.removeEdge(g1.getEdge(nodes[1], nodes[3]));
  g1.removeEdge(g1.getEdge(nodes[2], nodes[3]));
  g1.removeEdge(g1.getEdge(nodes[6], nodes[7]));
  nodes[6].css({"left":180, "top":150});
  nodes[4].css({"left":100, "top":100});
  nodes[0].css({"left":250});
  nodes[2].css({"left":470, "top":280});

  g1.addEdge(nodes[3], nodes[1]);
  g1.addEdge(nodes[0], nodes[4]);

  var edges = g1.edges();

  for(i=0;i<edges.length;i++)
    edges[i].removeClass("edgehighlight2");

  g1.layout();
  av.umsg("<b><br>Example of Hamiltonian Cycle Problem</b>");
  nl1=av.label("Does the graph below contain a Hamiltonian Cycle?"
               , {top:-10});
  av.step();

  // Slide 8
  label1=av.label("<b>No</b>",{left:10,top:40});
  av.recorded();
});
