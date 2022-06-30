"use strict";

$(document).ready(function () {
  var jsav = new JSAV("DirectedGraph");
  var graph=new jsav.ds.graph({width: 500, height: 700,directed: true});
  var right;
  var down;
  var s2_alignment="TT-GG";
  var s1_alignment="TACGG";
  var index=[];
  var node1=graph.addNode(" ",{left:0, top:0});
  var node2=graph.addNode(" ",{left:100, top: 0});
  var node3=graph.addNode(" ",{left:200, top: 0});
  var node4=graph.addNode(" ",{left:300, top: 0});
  var node5=graph.addNode(" ",{left:400, top: 0});
  var node6=graph.addNode(" ", {left:0, top: 100});
  var node7=graph.addNode(" ",{left:100, top: 100});
  var node8=graph.addNode(" ",{left:200, top: 100});
  var node9=graph.addNode(" ",{left:300, top: 100});
  var node10=graph.addNode(" ",{left:400, top:100});
  var node11=graph.addNode(" ",{left:0, top: 200});
  var node12=graph.addNode(" ",{left:100, top:200});
  var node13=graph.addNode(" ",{left:200, top:200});
  var node14=graph.addNode(" ",{left:300, top:200});
  var node15=graph.addNode(" ",{left:400, top:200});
  var node16=graph.addNode(" ",{left:0, top:300});
  var node17=graph.addNode(" ",{left:100, top:300});
  var node18=graph.addNode(" ",{left:200, top:300});
  var node19=graph.addNode(" ",{left:300, top:300});
  var node20=graph.addNode(" ",{left:400, top:300});
  var node21=graph.addNode(" ",{left: 0, top:400});
  var node22=graph.addNode(" ",{left:100, top:400});
  var node23=graph.addNode(" ",{left:200, top:400});
  var node24=graph.addNode(" ",{left:300, top:400});
  var node25=graph.addNode(" ",{left:400, top:400});
  var node26=graph.addNode(" ",{left: 0, top:500});
  var node27=graph.addNode(" ",{left:100, top:500});
  var node28=graph.addNode(" ",{left:200, top:500});
  var node29=graph.addNode(" ",{left:300, top:500});
  var node30=graph.addNode(" ",{left:400, top:500});


  graph.addEdge(node1, node2).label("T");
  graph.addEdge(node2, node3).label("A");
  graph.addEdge(node3, node4,).label("G");
  graph.addEdge(node4, node5,).label("G");
  graph.addEdge(node6, node7);
  graph.addEdge(node7, node8);
  graph.addEdge(node8, node9);
  graph.addEdge(node9, node10);
  graph.addEdge(node11, node12);
  graph.addEdge(node12, node13);
  graph.addEdge(node13, node14);
  graph.addEdge(node14, node15);
  graph.addEdge(node16, node17);
  graph.addEdge(node17, node18);
  graph.addEdge(node18, node19);
  graph.addEdge(node19, node20);
  graph.addEdge(node21, node22);
  graph.addEdge(node22, node23);
  graph.addEdge(node23, node24);
  graph.addEdge(node24, node25);
  graph.addEdge(node26, node27);
  graph.addEdge(node27, node28);
  graph.addEdge(node28, node29);
  graph.addEdge(node29, node30);
  graph.addEdge(node1, node6).label("T");
  graph.addEdge(node2, node7)
  graph.addEdge(node3, node8)
  graph.addEdge(node4, node9)
  graph.addEdge(node5, node10)
  graph.addEdge(node6, node11).label("T");;
  graph.addEdge(node7, node12);
  graph.addEdge(node8, node13);
  graph.addEdge(node9, node14);
  graph.addEdge(node10, node15);
  graph.addEdge(node11, node16).label("C");;
  graph.addEdge(node12, node17);
  graph.addEdge(node13, node18);
  graph.addEdge(node14, node19);
  graph.addEdge(node15, node20);
  graph.addEdge(node16, node21).label("C");;
  graph.addEdge(node17, node22);
  graph.addEdge(node18, node23);
  graph.addEdge(node19, node24);
  graph.addEdge(node20, node25);
  graph.addEdge(node21, node26).label("G");;
  graph.addEdge(node22, node27);
  graph.addEdge(node23, node28);
  graph.addEdge(node24, node29);
  graph.addEdge(node25, node30);
  graph.addEdge(node1, node7);
  graph.addEdge(node2, node8);
  graph.addEdge(node3, node9);
  graph.addEdge(node4, node10);
  graph.addEdge(node6, node12);
  graph.addEdge(node7, node13);
  graph.addEdge(node8, node14);
  graph.addEdge(node9, node15);
  graph.addEdge(node11, node17);
  graph.addEdge(node12, node18);
  graph.addEdge(node13, node19);
  graph.addEdge(node14, node20);
  graph.addEdge(node16, node22);
  graph.addEdge(node17, node23);
  graph.addEdge(node18, node24);
  graph.addEdge(node19, node25);
  graph.addEdge(node21, node27);
  graph.addEdge(node22, node28);
  graph.addEdge(node23, node29);
  graph.addEdge(node24, node30);
  graph.layout();
  jsav.g.line([20, 90], {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  jsav.label("Alignment:",{left:0, top:0});
  jsav.label(s1_alignment,{left:0, top:30});
  jsav.label(s2_alignment,{left:0, top:60});
   graph.layout();
  jsav.displayInit();
  jsav.umsg("Direction:",{left:0, top:90});
  graph.nodes()[0].highlight();
  var i=0;
  var j=0;
 while(i!=graph.nodes().length-1)
   {
    if(s1_alignment[j]==s2_alignment[j]){
      graph.getEdge(graph.nodes()[i], graph.nodes()[i+6]).css({"arrow-end": "classic-wide-long"}).addClass("markpath");
      graph.nodes()[i+6].highlight();
      i+=6;
      jsav.umsg("Diagonal ",{left:0, top:90,"preserve": true});

  }
  else if(s1_alignment[j]=="-")
  {
   graph.getEdge(graph.nodes()[i], graph.nodes()[i+1]).css({"arrow-end": "classic-wide-long"}).addClass("markpath");
   graph.nodes()[i+1].highlight();
   i+=1;
   jsav.umsg("right ",{left:0, top:90,"preserve": true});

  }
  else if(s2_alignment[j]=="-"){
    graph.getEdge(graph.nodes()[i], graph.nodes()[i+5]).css({"arrow-end": "classic-wide-long"}).addClass("markpath");
    graph.nodes()[i+5].highlight();
    i+=5;
    jsav.umsg("Down ",{left:0, top:90,"preserve": true});

  }
  else{
    graph.getEdge(graph.nodes()[i], graph.nodes()[i+6]).css({"arrow-end": "classic-wide-long"}).addClass("markpath");
    graph.nodes()[i+6].highlight();
    i+=6;
    jsav.umsg("Diagonal ",{left:0, top:90,"preserve": true});

  }
  j++;
    jsav.step();
   }
   graph.nodes()[graph.nodes().length-1].highlight();
   jsav.step();
   jsav.recorded();
});
