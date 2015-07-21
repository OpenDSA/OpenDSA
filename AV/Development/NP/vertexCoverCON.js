//Written by Nabanita Maji and Cliff Shaffer
/*global ODSA, setPointerL */
 "use strict";
$(document).ready(function () {
  var av_name = "vertexCoverCON";

    $(".avcontainer").on("jsav-message" ,  function() {
      // invoke MathJax to do conversion again
      MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
    });
    $(".avcontainer").on("jsav-updatecounter" ,  function(){
      // invoke MathJax to do conversion again 
     MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
 
  var label1, label2 , label3, label4, label5, label6,label7,label8,label9;
  //slide2
  var y = 0;

  av.umsg("<br><b>Introduction to the Vertex Cover problem </b>");
  var nl1=av.label("This slideshow introduces and explains the \"Vertex Cover\" Problem."
+"</b> <br><br><br> We start with some definitions  and background.",{top:0});


    av.displayInit();

    av.step();
    nl1.hide();
  av.umsg("<br><b>Vertex Cover</b>"); 

   nl1=av.label("A Vertex Cover of a graph is a set of vertices such that "+
"any edge of the graph is incident on at least one vertex of the set."
+"<br><br><br>The smallest possible Vertex Cover of a graph is called "+
"the \"Minimum Vertex cover\".",{top:-10});

  av.step();

  var  g = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false,top:100,left:100});
  var x=70;
  var y=0;
  var c1 = g.addNode("1", {"left": x-70, "top": y+100});
  var c2 = g.addNode("2", {"left": x+35, "top": y+100});
  var c3 = g.addNode("3", {"left": x+160,"top": y+100});
  var c4 = g.addNode("4", {"left": x-70, "top": y+200});
  var c5 = g.addNode("5", {"left": x+35, "top": y+200});
  var c6 = g.addNode("6", {"left": x+160, "top": y+200});
  var c7 = g.addNode("7", {"left": x+260, "top": y+200});
  
 
  var e1 = g.addEdge(c1, c2);
  var e2 = g.addEdge(c1, c4);
  var e3 = g.addEdge(c2, c3);
  var e4 = g.addEdge(c2, c5);
  var e5 = g.addEdge(c3, c5);
  var e6 = g.addEdge(c5, c6);
  var e7 = g.addEdge(c3, c6);
  var e8 = g.addEdge(c3, c7);

  c3.addClass("nodecolor1");
  e3.addClass("edgecolor1");
  e5.addClass("edgecolor1");
  e7.addClass("edgecolor1");
  e8.addClass("edgecolor1");

  c5.addClass("nodecolor2");
  e4.addClass("edgecolor2");
  e6.addClass("edgecolor2");

  c1.addClass("nodecolor4");
  e1.addClass("edgecolor4");
  e2.addClass("edgecolor4");

  g.layout();
  g.show();
  //slide 3

   av.step();
   label1 = av.label("The colored vertices in this graph form a Vertex Cover."
+"<br>The Vertex Cover is {1, 3, 5}",
{left:500,top: 200});
  
   av.step();
   nl1.hide();
   av.umsg("<br><b>Example of Vertex Cover in graph </b>");
   g.hide();
   label1.hide();
  y=0; 
  nl1=av.label("The following graph contains a Vertex Cover  of size"+
" 6. (i.e. {1,2,3,6,9,10})",{top:-15}); 

  x=70;
  y=10;
  var  g1 = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false,top:30,left:200});

  var ca1 = g1.addNode("1", {"left": x+100, "top": y+70});
  var ca2 = g1.addNode("2", {"left": x+10, "top": y+125});
  var ca3 = g1.addNode("3", {"left": x+190,"top": y+125});
  var ca4 = g1.addNode("4", {"left": x+35, "top": y+220});
  var ca5 = g1.addNode("5", {"left": x+165, "top": y+220});
  var ca6 = g1.addNode("6", {"left": x+100, "top": y-10});
  var ca7 = g1.addNode("7", {"left": x-70, "top": y+80});
  var ca8 = g1.addNode("8", {"left": x+270, "top": y+80});
  var ca9 = g1.addNode("9", {"left": x-45, "top": y+280});
  var ca10 = g1.addNode("10", {"left": x+245, "top": y+280});
  
 
  var ea1 = g1.addEdge(ca1, ca6);
  var ea2 = g1.addEdge(ca1, ca4);
  var ea3 = g1.addEdge(ca1, ca5);
  var ea4 = g1.addEdge(ca2, ca7);
  var ea5 = g1.addEdge(ca2, ca3);
  var ea6 = g1.addEdge(ca2, ca5);
  var ea7 = g1.addEdge(ca3, ca8);
  var ea8 = g1.addEdge(ca3, ca4);
  var ea9 = g1.addEdge(ca4, ca9);
  var ea10 = g1.addEdge(ca5, ca10);

  var ea11 = g1.addEdge(ca6, ca8);
  var ea12 = g1.addEdge(ca6, ca7);
  var ea13 = g1.addEdge(ca9, ca7);
  var ea14 = g1.addEdge(ca8, ca10);
  var ea15 = g1.addEdge(ca9, ca10);

  ca6.addClass("nodecolor1");
  ea1.addClass("edgecolor1");
  ea11.addClass("edgecolor1");
  ea12.addClass("edgecolor1");

  ca1.addClass("nodecolor2");
  ea2.addClass("edgecolor2");
  ea3.addClass("edgecolor2");


  ca2.addClass("nodecolor9");
  ea4.addClass("edgecolor9");
  ea5.addClass("edgecolor9");
  ea6.addClass("edgecolor9");



  ca3.addClass("nodecolor4");
  ea7.addClass("edgecolor4");
  ea8.addClass("edgecolor4");



  ca10.addClass("nodecolor5");
  ea10.addClass("edgecolor5");
  ea14.addClass("edgecolor5");
  ea15.addClass("edgecolor5");


  ca9.addClass("nodecolor7");
  ea9.addClass("edgecolor7");
  ea13.addClass("edgecolor7");

  g1.layout();
  g1.show();
//slide 4 
 av.step();
nl1.hide(); 
 y=0;
   av.umsg("<br><b>Example of Vertex Cover in graph </b>");
   g1.hide();
  nl1=av.label("The following graph contains a Vertex Cover  of size"+
" 3. (i.e. {1,2,3})",{top:-10}); 
 
  x=50;
  y=0;

  var  g2 = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false,top:30,left:200});
  var cb1 = g2.addNode("1", {"left": x+50, "top": y+50});
  var cb2 = g2.addNode("2", {"left": x+50, "top": y+150});
  var cb3 = g2.addNode("3", {"left": x+50,"top": y+250});
  var cb4 = g2.addNode("4", {"left": x+250, "top": y});
  var cb5 = g2.addNode("5", {"left": x+250, "top": y+100});
  var cb6 = g2.addNode("6", {"left": x+250, "top": y+200});
  var cb7 = g2.addNode("7", {"left": x+250, "top": y+300});
  
 
  var eb1 = g2.addEdge(cb1, cb5);
  var eb2 = g2.addEdge(cb1, cb6);
  var eb3 = g2.addEdge(cb2, cb4);
  var eb4 = g2.addEdge(cb2, cb6);
  var eb5 = g2.addEdge(cb2, cb7);
  var eb6 = g2.addEdge(cb3, cb5);
  var eb7 = g2.addEdge(cb3, cb6);
  var eb8 = g2.addEdge(cb1, cb4);
  var eb9 = g2.addEdge(cb3, cb7);
  var eb10 = g2.addEdge(cb2, cb5);

  cb1.addClass("nodecolor1");
  eb1.addClass("edgecolor1");
  eb2.addClass("edgecolor1");
  eb8.addClass("edgecolor1");

  cb2.addClass("nodecolor2");
  eb3.addClass("edgecolor2");
  eb4.addClass("edgecolor2");
  eb5.addClass("edgecolor2");

  cb3.addClass("nodecolor4");
  eb6.addClass("edgecolor4");
  eb7.addClass("edgecolor4");
  eb9.addClass("edgecolor4");

  g2.layout();
  g2.show();



 //slide 5 
  av.step();
  nl1.hide();
  g2.hide();
    av.umsg("<br><b>The Vertex Cover Problem </b>");
    nl1=av.label("The Vertex Cover Problem can be defined as either "
+"of the following: "+
"<br><br><br><b>Given a graph $G = (V , E)$, find the Minimum "
+"Vertex Cover in $G$.</b>"+
"<br><br><br>Or"+
"<br><br><br><b>Given a graph $G = (V , E)$, and a number "
+"$k$, does $G$ contain an Vertex Cover of size $<= k$ ?</b>",{top:5});


  av.step();

  nl1.hide();

  av.umsg("<br><b>Example of Vertex Cover Problem: </b>");  

  nl1=av.label("Does the graph below have a vertex cover of size "
+"<=3 ?",{top:-15}); 

  x=70;
  y=10;

  var  g4 = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false,top:40,left:200});
  var cc1 = g4.addNode("1", {"left": x+100, "top": y+70});
  var cc2 = g4.addNode("2", {"left": x+10, "top": y+125});
  var cc3 = g4.addNode("3", {"left": x+190,"top": y+125});
  var cc4 = g4.addNode("4", {"left": x+35, "top": y+220});
  var cc5 = g4.addNode("5", {"left": x+165, "top": y+220});
  var cc6 = g4.addNode("6", {"left": x+100, "top": y-10});
  var cc7 = g4.addNode("7", {"left": x-70, "top": y+80});
  var cc8 = g4.addNode("8", {"left": x+270, "top": y+80});
  var cc9 = g4.addNode("9", {"left": x-45, "top": y+280});
  var cc10 = g4.addNode("10", {"left": x+245, "top": y+280});
  
 
  var ec1 = g4.addEdge(cc1, cc6);
  var ec2 = g4.addEdge(cc1, cc4);
  var ec3 = g4.addEdge(cc1, cc5);
  var ec4 = g4.addEdge(cc2, cc7);
  var ec5 = g4.addEdge(cc2, cc3);
  var ec6 = g4.addEdge(cc2, cc5);
  var ec7 = g4.addEdge(cc3, cc8);
  var ec8 = g4.addEdge(cc3, cc4);
  var ec10 = g4.addEdge(cc5, cc10);
  var ec11 = g4.addEdge(cc2, cc6);
  var ec12 = g4.addEdge(cc2, cc9);
  var ec13 = g4.addEdge(cc3, cc6);
  var ec14 = g4.addEdge(cc3, cc10);
  var ec16 = g4.addEdge(cc4, cc10);
  var ec17 = g4.addEdge(cc10, cc9);
  var ec19 = g4.addEdge(cc1, cc7);
  var ec20 = g4.addEdge(cc1, cc8);


  g4.layout();
  g4.show();

  av.step();

  label2 = av.label("<b>No</b>",{top:40}).css({"text-align": "center"}); 
  g4.show();


  av.step();
  label2.hide();
  av.umsg("<br><b>Example of Vertex Cover Problem: </b>");  
  g4.show();
  nl1.hide();

  nl1=av.label("Does the graph below have a vertex cover of size "
+"<=4 ?",{top:-15}); 

  av.step();

  y=0;

  label2 = av.label("<b>Yes</b>",{top:40}).css({"text-align": "center"}); 
  label2.show();


  cc1.addClass("nodecolor1");
  cc2.addClass("nodecolor2");
  cc3.addClass("nodecolor4");
  cc10.addClass("nodecolor5");


  ec1.addClass("edgecolor1");
  ec2.addClass("edgecolor1");
  ec3.addClass("edgecolor1");
  ec4.addClass("edgecolor2");
  ec5.addClass("edgecolor2");
  ec6.addClass("edgecolor2");
  ec7.addClass("edgecolor4");
  ec8.addClass("edgecolor4");
  ec10.addClass("edgecolor5");
  ec11.addClass("edgecolor2");
  ec12.addClass("edgecolor2");
  ec13.addClass("edgecolor4");
  ec14.addClass("edgecolor4");
  ec16.addClass("edgecolor5");
  ec17.addClass("edgecolor5");
  ec19.addClass("edgecolor1");
  ec20.addClass("edgecolor1");

  g4.show();
  av.recorded();
});

