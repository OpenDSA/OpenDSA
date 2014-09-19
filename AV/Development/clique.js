/*global ODSA, setPointerL */
//"use strict";
$(document).ready(function () {
//  var av = new JSAV(av_name);
  var av = new JSAV($('.avcontainer'));
  
  var label1, label2 , label3, label4, label5, label6,label7,label8,label9;
  //slide2
  var y = 0;
  
  av.umsg("<b>Clique </b>"); 

  label2 = av.label("<i>Clique</i> is complete graph i.e. a graph where all nodes are connected to all other nodes by atleast one edge.",{top: y-40}).css({"text-align": "center"}); 
  label2.show();

  var  g = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false});
  x=50;
  y=100;
  var c4 = g.addNode("d", {"left": x+50, "top": y+100});
  var c5 = g.addNode("e", {"left": x+250,"top": y+100});
  var c6 = g.addNode("f", {"left": x+25, "top": y+200});
  var c7 = g.addNode("g", {"left": x+275, "top": y+200});
   
  var e1 = g.addEdge(c4, c5);
  var e2 = g.addEdge(c6,c7);
  var e3 = g.addEdge(c6,c4);
  var e4 = g.addEdge(c5,c7);
  var e5 = g.addEdge(c4,c7);
  var e6 = g.addEdge(c5,c6);

  g.layout();

  //slide 3

   av.step();
   av.umsg("<b>Example of Clique in graph </b>");
   g.hide();
   label2.hide();
  y=0; 
  label2 = av.label("The following graph contains a <i>3-Clique</i> i.e. a clique of size 3.",{top: y-30}).css({"text-align": "center"}); 
  label2.show();
  var  g3 = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false});
  x=50;
  y=50;
  var n1 = g3.addNode("1", {"left": x+50, "top": y+100});
  var n2 = g3.addNode("2", {"left": x+250,"top": y+100});
  var n3 = g3.addNode("3", {"left": x+50, "top": y+200});
  var n4 = g3.addNode("4", {"left": x+250, "top": y+200});
  var n5 = g3.addNode("5", {"left": x+175, "top": y+50});
  var n6 = g3.addNode("6", {"left": x+175, "top": y+250});
   
  var ne1 = g3.addEdge(n3, n2);
  var ne2 = g3.addEdge(n3, n4);
  var ne4 = g3.addEdge(n5, n2);
  var ne5 = g3.addEdge(n4, n2);
  var ne6 = g3.addEdge(n5, n4);
  var ne7 = g3.addEdge(n5, n3);
  var ne8 = g3.addEdge(n1, n3);
  var ne8 = g3.addEdge(n6, n3);

  ne7.css({"stroke":"red","stroke-width":"5"});
  ne6.css({"stroke":"red","stroke-width":"5"});
  ne2.css({"stroke":"red","stroke-width":"5"});

  g3.layout();
  g3.show();

//slide 4
 av.step();
 y=0; 
label2.hide();
  label2 = av.label("The following graph contains a <i>4-Clique</i> i.e. a clique of size 4.",{top: y-30}).css({"text-align": "center"}); 
  label2.show();
 
  ne1.css({"stroke":"red","stroke-width":"5"});
  ne4.css({"stroke":"red","stroke-width":"5"});
  ne5.css({"stroke":"red","stroke-width":"5"});

  g3.layout();
  g3.show();

 //slide 8
  av.step();
  g3.hide();
  label2.hide();
  av.umsg("<b>Clique Problem </b>");
  label1 = av.label("<i>Clique problem </i> is the decision problem to determine whether a graph contains a clique larger than a given size.",{top:20});
  label1.show();

//silde 9 
  av.step();
  y=0;

  g.show();

  label1.hide();

  av.umsg("<b>Example of Clique Problem: </b>");  

  label1 = av.label("In the graph below does there exist a clique of size >=5 ?",{top:-30}); 
  label1.show();
 
  y=100;
  var c1 = g.addNode("a", {"left": x, "top": y});
  var c2 = g.addNode("b", {"left": x+300, "top": y});
  var c3 = g.addNode("c", {"left": x+150, "top": y+50});
  var c4 = g.addNode("d", {"left": x+50, "top": y+100});
  var c5 = g.addNode("e", {"left": x+250,"top": y+100});
  var c6 = g.addNode("f", {"left": x+25, "top": y+200});
  var c7 = g.addNode("g", {"left": x+275, "top": y+200});

  g.addEdge(c1, c2);
  g.addEdge(c3, c2);
  g.addEdge(c3, c1);

  g.addEdge(c1, c4);
  g.addEdge(c2, c5);
  g.addEdge(c4, c3);
  g.addEdge(c3, c5);


  g.layout();

//slide 10
  av.step();

  av.umsg("<b>Example of Clique Problem: </b>");  

  y=0;

  label2 = av.label("<b>No</b>",{top:20}).css({"text-align": "center"}); 
  label2.show();


//slide 11

  av.step();
  av.umsg("<b>Example of Clique Problem: </b>");  
  label1.hide();
  label2.hide(); 
  

  label1 = av.label("In the graph below does there exist a clique of size >=4 ?",{top:-30}); 
  label1.show();
//slide 12

  av.step();

  av.umsg("<b>Example of Clique Problem: </b>");  

  y=0;

  label2 = av.label("<b>Yes</b>",{top:20}).css({"text-align": "center"}); 
  label2.show();
  e1.css({"stroke": "red","stroke-width":"7"});
  e2.css({"stroke": "red","stroke-width":"7"});
  e3.css({"stroke": "red","stroke-width":"7"});
  e4.css({"stroke": "red","stroke-width":"7"});
  e5.css({"stroke": "red","stroke-width":"7"});
  e6.css({"stroke": "red","stroke-width":"7"});

  g.layout();

  av.recorded();
});
