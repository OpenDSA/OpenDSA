//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */
$(document).ready(function () {
  "use strict";
  var av_name = "IStoVCCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var av = new JSAV(av_name);
  var i, j,label1,label2,label3,label4;

  // Slide 1
  av.umsg("<br><b>Reduction of an input instance to INDEPENDENT SET to an equivalent input instance to VERTEX COVER.</b>");
  av.displayInit();
  av.step();

  // Slide 2
  av.umsg("<br><b>INDEPENDENT SET and VERTEX COVER</b>");

  var nl1 = av.label("For a given graph $G = ( V , E )$ and integer $k$, the "
               +"INDEPENDENT SET problem is to find whether <b>G</b> contains<br> an Independent Set "
               +"of size $\\geq k$.<br><br>"
               +"For a given graph $G = ( V , E )$ and integer $k$, the "
               +"VERTEX COVER problem is to find whether <b>G</b> contains <br>a Vertex Cover of "
               +"size $\\leq k$.<br><br>", {top:0});
  av.step();

  // Slide 3
  nl1.hide();
  av.umsg("<br><b>Reduction of INDEPENDENT SET to VERTEX COVER</b>");
  label1 = av.label("In a graph $G = \\{ V , E \\}$, <br> $S$ is an "+
                    "<b>Independent Set $\\Leftrightarrow (V - S)$ is a Vertex Cover.</b>"
                    , {left:0,top:-10});
  av.step();

  // Slide 4
  label2 = av.label("1. <b>If $S$ is an Independent Set</b>, there is no "+
                    "edge $e = (u,v)$ in $G$, such that both $u,v \\in S$.<br>"+
                    "Hence for any edge $e = (u,v)$, at least one of $u, v$ must lie in $(V-S)$."+
                    "<br><b>$\\Rightarrow (V-S)$ is a vertex cover in G</b>."
                    , {left:0,top:80});
  av.step();

  // Slide 5
  label3 = av.label("2. <b>If $(V-S)$ is a Vertex Cover,</b> then between any "+
                    "pair of vertices $(u,v) \\in S$ if there exist an edge $e$,<br>"+
                    "none of the endpoints of $e$ would exist in $(V - S)$ violating the "+
                    "definition of vertex cover. <br>Hence no pair of vertices in $S$ can be connected "+
                    "by an edge.<br><b>$\\Rightarrow S$ is an Independent Set in G</b>."
                    , {left:0,top:190});

  av.step();

  // Slide 6
  label4 = av.label("<b>Hence G contains an Independent Set of size $k$"+
                    "&nbsp;&nbsp;&nbsp;$\\Leftrightarrow $ &nbsp;&nbsp;&nbsp;G contains a "+
                    "Vertex Cover of size $\\left\\vert{V}\\right\\vert - k$.</b><br>"
                    , {left:0,top:320});

  av.step();

  // Slide 7
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  av.umsg("<br><b>Example graph</b>");
  var  g = av.ds.graph({width: 600,  height: 400, layout: "manual",
                        directed: false});
  var nodes = new Array(12);;
  var colors = ["SeaGreen","IndianRed","SlateBlue","Orchid","GoldenRod"];
  var x=500;
  var y=350;
  nodes[2]=g.addNode("3",{left:x,top:y/2});
  nodes[0]=g.addNode("1",{left:x-50,top:y-70});
  nodes[5]=g.addNode("6",{left:x-40,top:80});
  nodes[1]=g.addNode("2",{left:x-140,top:20});
  nodes[7]=g.addNode("8",{left:x-160,top:y-50});
  nodes[3]=g.addNode("4",{left:x-200,top:y-110});
  nodes[8]=g.addNode("9",{left:x-230,top:80});
  nodes[4]=g.addNode("5",{left:x-340,top:20});
  nodes[11]=g.addNode("12",{left:x-370,top:y-30});
  nodes[10]=g.addNode("11",{left:x-440,top:80});
  nodes[6]=g.addNode("7",{left:x-480,top:y-80});
  nodes[9]=g.addNode("10",{left:x-500,top:y/2-10});

  var ISnodes = [];
  var VCnodes = [];
  ISnodes.push(nodes[7]);
  ISnodes.push(nodes[2]);
  ISnodes.push(nodes[4]);
  ISnodes.push(nodes[9]);
  ISnodes.push(nodes[10]);
  ISnodes.push(nodes[3]);
  ISnodes.push(nodes[5]);
  VCnodes.push(nodes[0]);
  VCnodes.push(nodes[1]);
  VCnodes.push(nodes[6]);
  VCnodes.push(nodes[8]);
  VCnodes.push(nodes[11]);
  for(var i=0;i<nodes.length;i++)
    for(var j=i+1;j<nodes.length;j++)
      g.addEdge(nodes[i],nodes[j]).hide();

  g.layout();
  g.getEdge(nodes[7],nodes[1]).show();
  g.getEdge(nodes[5],nodes[1]).show();
  g.getEdge(nodes[7],nodes[6]).show();
  g.getEdge(nodes[7],nodes[0]).show();
  g.getEdge(nodes[9],nodes[6]).show();
  g.getEdge(nodes[9],nodes[8]).show();
  g.getEdge(nodes[9],nodes[11]).show();
  g.getEdge(nodes[8],nodes[4]).show();
  g.getEdge(nodes[8],nodes[2]).show();
  g.getEdge(nodes[8],nodes[3]).show();
  g.getEdge(nodes[6],nodes[2]).show();
  g.getEdge(nodes[0],nodes[2]).show();
  g.getEdge(nodes[1],nodes[3]).show();
  g.getEdge(nodes[0],nodes[3]).show();
  g.getEdge(nodes[0],nodes[4]).show();
  g.getEdge(nodes[0],nodes[5]).show();
  g.getEdge(nodes[6],nodes[5]).show();
  g.getEdge(nodes[6],nodes[4]).show();
  g.getEdge(nodes[11],nodes[4]).show();
  g.getEdge(nodes[10],nodes[0]).show();
  g.getEdge(nodes[10],nodes[6]).show();
  g.getEdge(nodes[10],nodes[11]).show();
  g.getEdge(nodes[5],nodes[11]).show();
  g.getEdge(nodes[1],nodes[11]).show();
  av.step();

  // Slide 8
  av.umsg("<br><b>Does this 12-node graph have an Independent Set of size >= 9?");
  av.step();

  // Slide 9
  nl1=av.label("<b>No</b>",{top:-10});
  av.step();

  // Slide 10
  av.umsg("<br><b>Does this 12-node graph have an Vertex Cover of size <= 3?");
  nl1.hide();
  av.step();

  // Slide 11
  nl1.show();
  av.step();

  // Slide 12
  nl1.hide();
  av.umsg("<br><b>Does this 12-node graph have an Independent Set of size >= 7?");
  av.step();
  
  // Slide 13
  nl1=av.label("<b>Yes</b>",{top:-10});
  for (var i in ISnodes){
    ISnodes[i].addClass("highlightnode");
  }
  av.step();

  // Slide 14
  nl1.hide();
  av.umsg("<br><b>Does this 12-node graph have an Vertex Cover of size <= 5?");
  av.step();

  // Slide 15
  nl1.show();
  for (var i in VCnodes){
    VCnodes[i].css({"background-color":colors[i]});
    for(var j=0;j<VCnodes[i].neighbors().length;j++)
      g.getEdge(VCnodes[i],VCnodes[i].neighbors()[j]).css({"stroke":colors[i]});
  }
  av.recorded();
});
