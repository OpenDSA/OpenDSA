"use strict";

$(document).ready(function () {
  var jsav = new JSAV("AlignmentGraph");
  var graph=new jsav.ds.graph({width: 500, height: 600,directed: true});
  var a=jsav.label(" ",{left:0, top:120});
  var D=jsav.label(" ",{left:0, top:180});
  var s1_show=jsav.label(" ",{left:0, top:60});
  var s2_show=jsav.label(" ",{left:0, top:90});
  var Directions=["Diagonal","Diagonal","Down","Diagonal","Diagonal"];
   s1_show.show();
   s2_show.show();

  var s1=["T","A","C","G","G"];
  var s2=["T","T","G","G"];
  var s1_alignment=[];
  var s2_alignment=[];
  var right;
  var down;

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
  graph.addEdge(node3, node4).label("G");
  graph.addEdge(node4, node5).label("G");
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
  graph.addEdge(node6, node11).label("T");
  graph.addEdge(node7, node12);
  graph.addEdge(node8, node13);
  graph.addEdge(node9, node14);
  graph.addEdge(node10, node15);
  graph.addEdge(node11, node16).label("C");
  graph.addEdge(node12, node17);
  graph.addEdge(node13, node18);
  graph.addEdge(node14, node19);
  graph.addEdge(node15, node20);
  graph.addEdge(node16, node21).label("C");
  graph.addEdge(node17, node22);
  graph.addEdge(node18, node23);
  graph.addEdge(node19, node24);
  graph.addEdge(node20, node25);
  graph.addEdge(node21, node26).label("G");
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
  graph.nodes()[0].highlight();
  graph.getEdge(graph.nodes()[0], graph.nodes()[6]).css({"arrow-end": "classic-wide-long"}).addClass("markpath");
  graph.nodes()[6].highlight();
  graph.getEdge(graph.nodes()[6], graph.nodes()[12]).css({"arrow-end": "classic-wide-long"}).addClass("markpath");
  graph.nodes()[12].highlight();
  graph.getEdge(graph.nodes()[12], graph.nodes()[17]).css({"arrow-end": "classic-wide-long"}).addClass("markpath");
  graph.nodes()[17].highlight();
  graph.getEdge(graph.nodes()[17], graph.nodes()[23]).css({"arrow-end": "classic-wide-long"}).addClass("markpath");
  graph.nodes()[23].highlight();
  graph.getEdge(graph.nodes()[23], graph.nodes()[29]).css({"arrow-end": "classic-wide-long"}).addClass("markpath");
  graph.nodes()[29].highlight();

  jsav.label("Alignment:",{left:0, top:30});
  jsav.label("Directions:",{left:0, top:150});

  jsav.displayInit();
  var i=0;
  var j=0;
  var s1_index=0;
  var s2_index=0;
  while(i!=graph.nodes().length-1)
   {
    if(Directions[j]=="Diagonal")
    {
   s1_alignment.push(s1[s1_index]);
   s2_alignment.push(s2[s2_index]);
     if(s1[s1_index]==s2[s2_index]){
     a.text("Match",{left:0, top:120});
      }
      else
      {
           a.text("Mismatch",{left:0, top:120});
         }
   s1_show.text(s1_alignment[j]);
   s2_show.text(s2_alignment[j]);
          i+=6;
          s1_index++;
          s2_index++;  
    }
  else if(Directions[j]=="Right")
  {
    s1_alignment.push("-");
    s2_alignment.push(s2[s2_index]);
    s1_show.text(s1_alignment[j]);
    s2_show.text(s2_alignment[j]);
    jsav.text("insertion",{left:0, top:120});
    s2_index++;  

   i+=1;
  }
  else if(Directions[j]=="Down"){
    s1_alignment.push(s1[s1_index]);
    s2_alignment.push("-");
    s1_show.text(s1_alignment[j]);
    s2_show.text(s2_alignment[j]);
    a.text("Deletion",{left:0, top:120});

    s1_index++;  

    i+=5;
  }
  D.text(Directions[j]);

    j++;
    jsav.step();
   }
s1_show.text(s1_alignment);
s2_show.text(s2_alignment);

  jsav.recorded();
});
