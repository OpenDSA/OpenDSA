//Written by Nabanita Maji and Cliff Shaffer
/*global ODSA, setPointerL */
 "use strict";
$(document).ready(function () {
  var av_name = "independentSetCON";

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

    av.umsg("<br><b>Introduction to the Independent Set Problem </b>");
    var nl1=av.label("This slideshow introduces and explains the \""+
"Independent Set\" Problem.</b> <br><br><br> We start with some "+
"definitions  and background.",{top:0});


    av.displayInit();

    av.step();

  av.umsg("<br><b>Independent Set</b>"); 
  nl1.hide();
  nl1=av.label("An Independent Set of a graph is a set of vertices such "+
"that no two of them are connected <br>i.e. there exists no edge between any two "+
"vertices of an Independent Set.",{top:-10}); 

  av.step();

  var nl2=av.label("The largest possible Independent Set of a graph is called "+
"the \"Maximum Independent Set\".",{top:50}); 

  av.step();
  

  var  g = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false,left:200,top:100});
  var x=70;
  y=0;
  var c1 = g.addNode("1", {"left": x-70, "top": y+20});
  var c2 = g.addNode("2", {"left": x+35, "top": y+20});
  var c3 = g.addNode("3", {"left": x+160,"top": y+20});
  var c4 = g.addNode("4", {"left": x-70, "top": y+120});
  var c5 = g.addNode("5", {"left": x+35, "top": y+120});
  var c6 = g.addNode("6", {"left": x+160, "top": y+120});
  var c7 = g.addNode("7", {"left": x+35, "top": y+200});
  
 
  var e1 = g.addEdge(c1, c2);
  var e2 = g.addEdge(c1, c4);
  var e3 = g.addEdge(c2, c3);
  var e4 = g.addEdge(c2, c5);
  var e5 = g.addEdge(c6, c7);
  var e6 = g.addEdge(c5, c6);
  var e7 = g.addEdge(c3, c6);
  var e8 = g.addEdge(c4, c7);

  c3.addClass("nodecolor1");
  e3.addClass("edgecolor1");
  e7.addClass("edgecolor1");

  c1.addClass("nodecolor2");
  e1.addClass("edgecolor2");
  e2.addClass("edgecolor2");

  c5.addClass("nodecolor4");
  e4.addClass("edgecolor4");
  e6.addClass("edgecolor4");

  c7.addClass("nodecolor6");
  e5.addClass("edgecolor6");
  e8.addClass("edgecolor6");

  g.layout();
  g.show(); 

   av.step();
   label1 = av.label("The colored vertices in this graph form an independent set."
,{left:500,top: 150}); 
   label2 = av.label("The Independent set is {$1, 3, 5, 7$}",{left:500,top: 200}); 

   av.step();
 y=0;
 g.hide(); 
   nl1.hide();
   nl2.hide();
 label1.hide();
 label2.hide();
  av.umsg("<br><b>Example of Independent Set in graph </b>");
  nl1=av.label("The following graph contains an Independent Set of size $3$."+
" (i.e. {$2,4,5$})",{top:0}); 
 
  x=0;
  y=0;

  var  g2 = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false,top:50,left:200});
  var cb1 = g2.addNode("1", {"left": x+50, "top": y+50});
  var cb2 = g2.addNode("2", {"left": x+50, "top": y+250});
  var cb3 = g2.addNode("3", {"left": x+250,"top": y+250});
  var cb4 = g2.addNode("4", {"left": x+250, "top": y+50});
  var cb5 = g2.addNode("5", {"left": x+150, "top": y+150});
  
 
  var eb1 = g2.addEdge(cb1, cb2);
  var eb2 = g2.addEdge(cb2, cb3);
  var eb3 = g2.addEdge(cb3, cb4);
  var eb4 = g2.addEdge(cb4, cb1);
  var eb5 = g2.addEdge(cb5, cb1);
  var eb6 = g2.addEdge(cb3, cb5);

  cb2.addClass("nodecolor1");
  eb1.addClass("edgecolor1");
  eb2.addClass("edgecolor1");

  cb4.addClass("nodecolor2");
  eb3.addClass("edgecolor2");
  eb4.addClass("edgecolor2");

  cb5.addClass("nodecolor4");
  eb6.addClass("edgecolor4");
  eb5.addClass("edgecolor4");

  g2.layout();
  g2.show();

 av.step();


   av.umsg("<br><b>Example of Independent Set in graph </b>");
   g2.hide();

  y=0;
  nl1.hide(); 
  nl1=av.label("The following graph contains an Independent Set"
+" of size $5$. ( i.e. {$2,3,4,6,10$} ) ",{top:-10}); 

  x=70;
  y=-10;
  var  g1 = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false,top:70,left:200});

  var ca1 = g1.addNode("1", {"left": x+100, "top": y+70});
  var ca2 = g1.addNode("2", {"left": x-70, "top": y+160});
  var ca3 = g1.addNode("3", {"left": x+190,"top": y+125});
  var ca4 = g1.addNode("4", {"left": x+35, "top": y+160});
  var ca5 = g1.addNode("5", {"left": x+165, "top": y+250});
  var ca6 = g1.addNode("6", {"left": x+100, "top": y+10});
  var ca7 = g1.addNode("7", {"left": x-70, "top": y+80});
  var ca8 = g1.addNode("8", {"left": x+300, "top": y+20});
  var ca9 = g1.addNode("9", {"left": x-45, "top": y+240});
  var ca10 = g1.addNode("10", {"left": x+300, "top": y+200});
  
 
  var ea1 = g1.addEdge(ca1, ca6);
  var ea2 = g1.addEdge(ca1, ca4);
  var ea4 = g1.addEdge(ca2, ca7);
  var ea5 = g1.addEdge(ca1, ca3);
  var ea6 = g1.addEdge(ca7, ca4);
  var ea7 = g1.addEdge(ca3, ca8);
  var ea8 = g1.addEdge(ca3, ca5);
  var ea9 = g1.addEdge(ca4, ca9);
  var ea10 = g1.addEdge(ca5, ca10);

  var ea11 = g1.addEdge(ca6, ca8);
  var ea12 = g1.addEdge(ca6, ca7);
  var ea13 = g1.addEdge(ca2, ca9);
  var ea14 = g1.addEdge(ca8, ca10);
  var ea3 = g1.addEdge(ca5, ca4);


  ca6.addClass("nodecolor1");
  ea1.addClass("edgecolor1");
  ea11.addClass("edgecolor1");
  ea12.addClass("edgecolor1");

  ca2.addClass("nodecolor2");
  ea4.addClass("edgecolor2");
  ea13.addClass("edgecolor2");


  ca4.addClass("nodecolor3");
  ea2.addClass("edgecolor3");
  ea9.addClass("edgecolor3");
  ea6.addClass("edgecolor3");
  ea3.addClass("edgecolor3");



  ca3.addClass("nodecolor4");
  ea7.addClass("edgecolor4");
  ea8.addClass("edgecolor4");
  ea5.addClass("edgecolor4");



  ca10.addClass("nodecolor5");
  ea10.addClass("edgecolor5");
  ea14.addClass("edgecolor5");


  g1.layout();
  g1.show();


 //slide 5 
    av.step();
    nl1.hide();
    g1.hide();
    av.umsg("<br><b>The Independent Set Problem </b>");
    nl1=av.label("The Independent Set Problem can be defined as either "
+"of the following: <br><br><br><b>Given a graph $G = (V , E)$, find "
+"the Maximum Independent Set in $G$.</b><br><br><br>Or<br><br><br><b>"
+"Given a graph $G = (V , E)$, and a number $k$, does $G$ contain an "
+"Independent Set of size >= $k$ ?</b>",{top:0});


//silde 6 
  av.step();
  nl1.hide();
  y=0;


  label1.hide();

  av.umsg("<br><b>Example of Independent Set Problem: </b>");  

  nl1=av.label("Does the graph below have an independent set of size >=$9$ ?",{top:-10}); 
  x=70;
  y=20;

  var  g4 = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false,top:40,left:200});
  var cc1 = g4.addNode("1", {"left": x+100, "top": y+70});
  var cc2 = g4.addNode("2", {"left": x+10, "top": y+125});
  var cc3 = g4.addNode("3", {"left": x+190,"top": y+125});
  var cc4 = g4.addNode("4", {"left": x+35, "top": y+200});
  var cc5 = g4.addNode("5", {"left": x+165, "top": y+200});
  var cc6 = g4.addNode("6", {"left": x+100, "top": y-20});
  var cc7 = g4.addNode("7", {"left": x-50, "top": y+30});
  var cc8 = g4.addNode("8", {"left": x+250, "top": y+30});
  var cc9 = g4.addNode("9", {"left": x-45, "top": y+250});
  var cc10 = g4.addNode("10", {"left": x+245, "top": y+250});
  var cc11 = g4.addNode("11", {"left": x-70, "top": y+180});
  
 
  var ec1 = g4.addEdge(cc1, cc6);
  var ec2 = g4.addEdge(cc1, cc4);
  var ec3 = g4.addEdge(cc1, cc5);
  var ec4 = g4.addEdge(cc2, cc7);
  var ec5 = g4.addEdge(cc2, cc3);
  var ec6 = g4.addEdge(cc2, cc5);
  var ec7 = g4.addEdge(cc3, cc1);
  var ec10 = g4.addEdge(cc5, cc10);
  var ec11 = g4.addEdge(cc2, cc6);
  var ec12 = g4.addEdge(cc2, cc9);
  var ec13 = g4.addEdge(cc3, cc6);
  var ec14 = g4.addEdge(cc3, cc10);
  var ec16 = g4.addEdge(cc4, cc10);
  var ec17 = g4.addEdge(cc10, cc9);
  var ec19 = g4.addEdge(cc1, cc7);
  var ec20 = g4.addEdge(cc1, cc8);
  var ec21 = g4.addEdge(cc11, cc9);
  var ec22 = g4.addEdge(cc11, cc7);
  var ec8 = g4.addEdge(cc10, cc8);


  g4.layout();
  g4.show();

//slide 7 
  av.step();

  y=0;

  nl2=av.label("<b>No</b>",{top:40}); 

  av.step(); 
  nl1.hide();
  nl2.hide();

  av.umsg("<br><b>Example of Independent Set Problem: </b>");  

  nl1=av.label("Does the graph below have an independent set of size >=$7$ ?",{top:-10}); 

//slide 9

  av.step();

  y=0;

  nl2=av.label("<b>Yes</b>",{top:40}); 


  cc4.addClass("nodecolor7");
  ec2.addClass("edgecolor7");
  ec16.addClass("edgecolor7");

  cc9.addClass("nodecolor2");
  ec12.addClass("edgecolor2");
  ec17.addClass("edgecolor2");
  ec21.addClass("edgecolor2");


  cc5.addClass("nodecolor4");
  ec3.addClass("edgecolor4");
  ec6.addClass("edgecolor4");
  ec10.addClass("edgecolor4");


  cc8.addClass("nodecolor8");
  ec20.addClass("edgecolor8");
  ec8.addClass("edgecolor8");


  cc6.addClass("nodecolor9");
  ec1.addClass("edgecolor9");
  ec11.addClass("edgecolor9");
  ec13.addClass("edgecolor9");

  cc7.addClass("nodecolor11");
  ec22.addClass("edgecolor11");
  ec4.addClass("edgecolor11");
  ec19.addClass("edgecolor11");

  cc3.addClass("nodecolor10");
  ec7.addClass("edgecolor10");
  ec5.addClass("edgecolor10");
  ec14.addClass("edgecolor10");
  g4.show();
  av.recorded();
});

