//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */
$(document).ready(function () {
  "use strict";
  var av_name = "cliqueCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again 
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var av = new JSAV(av_name);

  var label1, label2 , label3, label4, label5, label6,label7,label8,label9;
  var y = 0;
  
  // Slide 1
  av.umsg("<br><b>Introduction to the Clique problem </b>"); 
  var nl1=av.label("This slideshow introduces and explains the \"Clique\"  Problem."
                   +"</b> <br><br><br> We start with some definitions  and background.",{top:0});
  av.displayInit();
  av.step();

  // Slide 2
  nl1.hide();
  av.umsg("<br><b>Clique </b>");
  nl1=av.label("A Clique is complete graph i.e. a graph where each node"+
               " is connected to every other node by at least one edge.",{top:-10}); 
  av.step();

  // Slide 3
  var nl2=av.label("Example of a clique:",{top:60});
  var  g = av.ds.graph({width: 400, height: 450,
                        layout: "manual", directed: false,top:60,left:200});
  var x=20;
  y=0;

  g.addNode("A", {"left": x+150, "top": y+50});
  g.addNode("B", {"left": x+50, "top": y+100});
  g.addNode("C", {"left": x+250,"top": y+100});
  g.addNode("D", {"left": x+25, "top": y+200});
  g.addNode("E", {"left": x+275, "top": y+200});
  g.addNode("F", {"left": x+150, "top": y+250});

  var gnodes = g.nodes();
  for(var i=0;i<6;i++)
    for(var j=i+1;j<6;j++)
      g.addEdge(gnodes[i],gnodes[j]);

  g.layout();
  av.step();

  // Slide 4
  nl1.hide();
  nl2.hide();
  av.umsg("<br><b>Clique in a graph </b>");
  g.hide();
  y=0; 
  nl1=av.label("If in a graph $G$ there exists a complete subgraph of "+
               "$k$ nodes, $G$ is said to contain a $k$-clique.",{top:-10}); 
  av.step();

  // Slide 5
  label1 = av.label("For example, the following graph contains a "+
                    "$3$-clique. (Actually, there is more than one.)",{top:40,left:0}); 

  var  g3 = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false,left:220,top:70});
  x=0;
  y=0;
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

  ne7.addClass("edgehighlight");
  ne6.addClass("edgehighlight");
  ne2.addClass("edgehighlight");
  g3.layout();
  g3.show();
  av.step();

  // Slide 6
  nl1.hide();
  label1.hide();
  g3.hide();

  nl1=av.label("Any clique with the largest number of vertices in a graph $G$"
               +" is called a Maximum Clique in $G$.",{top:-10}); 
  av.step();

  // Slide 7
  label1 = av.label("For example, the Maximum Clique in this "+
                    "graph is a $4$-clique.",{top:40,left:0}); 
  g3.show();
  ne1.addClass("edgehighlight");
  ne4.addClass("edgehighlight");
  ne5.addClass("edgehighlight");
  g3.layout();
  av.step();

  // Slide 8
  nl1.hide();
  g3.hide();
  label1.hide();
  av.umsg("<br><b>The Clique Problem</b>");
  nl1=av.label("The Clique Problem can be defined as either of the following:"
               + "<br><br><b>Given a graph $G = (V , E)$, find the Maximum Clique in $G$.</b> This is the optimization form of the problem."
               + "<br><br>Or<br><br>"
               + "<b>Given a graph $G = (V, E)$, and a number $k$, does $G$ contain a Clique of size $\\geq k$ ?</b> This is the decision form of the problem.", {top: -10});
  av.step();

  // Slide 9
  nl1.hide();
  var  g1 = av.ds.graph({width: 400, height: 450,
                         layout: "manual", directed: false});
  label1.hide();
  av.umsg("<br><b>An example of the Clique Problem:</b>");  
  nl1=av.label("In the graph below does there exist a clique of size $\\geq 5$?"
               ,{top:-10});
  x=20;
  y = 300;
  var c7 = g1.addNode("a", {"left":x , "top":y });
  var c4 = g1.addNode("b", {"left":x+150 , "top":y+20 });
  var c5 = g1.addNode("c", {"left":x+300, "top":y });
  var c10 = g1.addNode("d", {"left":x-20, "top":y-120 });
  var c9 = g1.addNode("e", {"left":x+200, "top":y-80 });
  var c3 = g1.addNode("f", {"left":x+320, "top":y-140 });
  var c2 = g1.addNode("g", {"left":x+120, "top":y-190 });
  var c6 = g1.addNode("h", {"left":x+215, "top":y-190 });
  var c1 = g1.addNode("i", {"left":x+100, "top":y-260 });
  var c8 = g1.addNode("j", {"left":x+195, "top":y-260 });

  var e1 = g1.addEdge(c1, c2);
  var e2 = g1.addEdge(c1, c6);
  var e3 = g1.addEdge(c1, c8);
  g1.addEdge(c1, c10);
  var e4 = g1.addEdge(c2, c8);
  var e5 = g1.addEdge(c2, c6);
  g1.addEdge(c2, c4);
  g1.addEdge(c2, c7);
  g1.addEdge(c2, c9);
  g1.addEdge(c2, c10);
  g1.addEdge(c3, c5);
  g1.addEdge(c3, c6);
  g1.addEdge(c3, c8);
  g1.addEdge(c3, c9);
  g1.addEdge(c4, c9);
  g1.addEdge(c4, c10);
  g1.addEdge(c5, c9);
  g1.addEdge(c5, c6);
  g1.addEdge(c5, c10);
  var e6 = g1.addEdge(c6, c8);
  g1.addEdge(c6, c9);
  g1.addEdge(c6, c10);
  g1.addEdge(c7, c9);
  g1.addEdge(c7, c10);
  g1.addEdge(c9, c10);
  g1.layout();
  av.step();

  // Slide 10
  label1 = av.label("<b>No</b>",{top:20}).css({"text-align": "center"}); 
  av.step();

  // Slide 11
  nl1.hide();
  
  av.umsg("<br><b>Example of Clique Problem: </b>");  

  nl1=av.label("In the graph below does there exist a clique of size $\\geq 4$?"
               ,{top:-10}); 
  label1.hide();    
  av.step(); 

  label1 = av.label("<b>Yes</b>",{top:20}).css({"text-align": "center"}); 
  e1.addClass("edgehighlight");
  e2.addClass("edgehighlight");
  e3.addClass("edgehighlight");
  e4.addClass("edgehighlight");
  e5.addClass("edgehighlight");
  e6.addClass("edgehighlight");

  g1.layout();
  av.recorded();
});
