//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */
$(document).ready(function () {
  "use strict";
  var av_name = "threeSATtoCliqueCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var av = new JSAV(av_name);
  var label1, label2 , label3, label4, label5, label6,label7,label8,label9;

  // Slide 1
  var y = 0;
  av.umsg("<br><b>Reduction of 3-SAT to Clique problem </b>");
  var nl1=av.label("This slideshow presents how to reduce"+
                   " a 3-SAT problem instance to an equivalent CLIQUE problem instance in polynomial time.",{top:0});
  av.displayInit();
  av.step();

  // Slide 2
  nl1.hide();
  av.umsg("<br><b>3-SAT and Clique problem");
  nl1=av.label("Given a boolean formula in 3 CNF, the <b>3-SAT</b> problem"+
               " is to find whether the formula is satisfiable.<br><br>For a given"+
               " graph $G = ( V , E )$ and integer $k$, the "
               +"CLIQUE problem is to find whether $G$ contains a clique of size " 
               +"$\\geq k$.", {top:-10});
  av.step();

  // Slide 3
  nl1.hide();
  av.umsg("<br><b>Reduction of 3-SAT to Clique</b>");

  nl1=av.label("A formula $\\Phi$ of $k$ three-literal clauses can be reduced to a "
               +"$k$-Clique problem in the following way:",{top:-10});
  av.step();

  // Slide 4
  var nl2=av.label("Construct a graph G of $k$ clusters with a maximum of $3$ "
                   +"nodes in each cluster.<br><br>Each cluster corresponds to a clause in $\\Phi$."
                   +"<br><br>Each node in a cluster is labeled with a literal from the clause."
                   +"<br><br><br>An edge is put between all pairs of nodes in different clusters "
                   +"except for pairs of the form $(x, \\overline{x}$)"
                   +"<br><br><br>No edge is put between any pair of nodes in the same cluster."
                   ,{top:40});
  av.step();

  // Slide 5
  nl1.hide();
  nl2.hide();

  av.umsg("<br><b>Example of 3-SAT to k-Clique Reduction</b>");
  nl1=av.label("Construction of cluster of nodes corresponding to clauses in 3 CNF",{top:-10});
  y=10;
  var x=0;
  label1 = av.label("$\\Phi = $",{top:y+10,left:x});
  label1.show();
  x = x+35;
  label2 = av.label("$(x_2 + x_1 + \\overline{x_3})$"
                    ,{top:y+10,left:x}).addClass("labelcolor1");
  label2.show();
  x = x+100;
  label5 = av.label(".",{top:y+10,left:x-5});
  label5.show();
  label3 = av.label("$(\\overline{x_1} + \\overline{x_2} + x_4)$"
                    ,{top:y+10,left:x}).addClass("labelcolor2");
  label3.show();
  x = x+110;
  label6 = av.label("$\\cdot$",{top:y+10,left:x-5});
  label6.show();
  label4 = av.label("$(x_2 + \\overline{x_4} + x_3)$"
                    ,{top:y+10,left:x}).addClass("labelcolor3");
  label4.show();

  var  g1 = av.ds.graph({width: 450, height: 450, layout: "manual", directed: false, top: 50, left: 200, autoresize: false});
  x=0;
  y=0;
  var x21 = g1.addNode("$\\overline{x_1}$", {"left": x+100, "top": y}).addClass("nodecolor2");
  var x22 = g1.addNode("$\\overline{x_2}$", {"left": x+200,"top": y}).addClass("nodecolor2");
  var x23 = g1.addNode("$x_4$", {"left": x+300, "top": y}).addClass("nodecolor2");

  var x11 = g1.addNode("$x_2$", {"left": x+20, "top": y+90}).addClass("nodecolor1");
  var x12 = g1.addNode("$x_1$", {"left": x+10,"top": y+180}).addClass("nodecolor1");
  var x13 = g1.addNode("$\\overline{x_3}$", {"left": x, "top": y+270}).addClass("nodecolor1");

  var x31 = g1.addNode("$x_2$", {"left": x+400, "top": y+90}).addClass("nodecolor3");
  var x32 = g1.addNode("$\\overline{x_4}$", {"left": x+410,"top": y+180}).addClass("nodecolor3");
  var x33 = g1.addNode("$x_3$", {"left": x+420, "top": y+270}).addClass("nodecolor3");

  g1.layout();

  av.step();

  // Slide 6
  av.umsg("<br><b>Example of 3-SAT to k-Clique Reduction</b>");
  nl1.hide();
  nl1=av.label("Connecting the nodes in the graph",{top:-10});
  var e1=g1.addEdge(x11,x31);
  e1.addClass("edgefocus");
  var e2=g1.addEdge(x11,x32);
  e2.addClass("edgefocus");
  var ec3=g1.addEdge(x11,x33);
  ec3.addClass("edgefocus");
  var e4=g1.addEdge(x11,x21);
  e4.addClass("edgefocus");
  var ec1=g1.addEdge(x11,x23);
  ec1.addClass("edgefocus");
  g1.layout();
  av.step();

  // Slide 7
  e1.removeClass("edgefocus");
  e2.removeClass("edgefocus");
  ec3.removeClass("edgefocus");
  e4.removeClass("edgefocus");
  ec1.removeClass("edgefocus");

  e1=g1.addEdge(x12,x31);
  e1.addClass("edgefocus");
  e2=g1.addEdge(x12,x32);
  e2.addClass("edgefocus");
  var e3=g1.addEdge(x12,x33);
  e3.addClass("edgefocus");
  var e4=g1.addEdge(x12,x22);
  e4.addClass("edgefocus");
  var e5=g1.addEdge(x12,x23);
  e5.addClass("edgefocus");
  g1.layout();
  av.step();

  // Slide 8
  e1.removeClass("edgefocus");
  e2.removeClass("edgefocus");
  e3.removeClass("edgefocus");
  e4.removeClass("edgefocus");
  e5.removeClass("edgefocus");

  e1=g1.addEdge(x13,x31);
  e1.addClass("edgefocus");
  e2=g1.addEdge(x13,x32);
  e2.addClass("edgefocus");
  e3=g1.addEdge(x13,x21);
  e3.addClass("edgefocus");
  e4=g1.addEdge(x13,x22);
  e4.addClass("edgefocus");
  e5=g1.addEdge(x13,x23);
  e5.addClass("edgefocus");
  g1.layout();
  av.step();

  // Slide 9
  e1.removeClass("edgefocus");
  e2.removeClass("edgefocus");
  e3.removeClass("edgefocus");
  e4.removeClass("edgefocus");
  e5.removeClass("edgefocus");

  e1=g1.addEdge(x21,x31);
  e1.addClass("edgefocus");
  e2=g1.addEdge(x21,x32);
  e2.addClass("edgefocus");
  e3=g1.addEdge(x21,x33);
  e3.addClass("edgefocus");
  g1.layout();
  av.step();

  // Slide 10
  e1.removeClass("edgefocus");
  e2.removeClass("edgefocus");
  e3.removeClass("edgefocus");

  e2=g1.addEdge(x22,x32);
  e2.addClass("edgefocus");
  e3=g1.addEdge(x22,x33);
  e3.addClass("edgefocus");
  g1.layout();
  av.step();

  // Slide 11
  e2.removeClass("edgefocus");
  e3.removeClass("edgefocus");

  e2=g1.addEdge(x23,x31);
  e2.addClass("edgefocus");
  var ec2=g1.addEdge(x23,x33);
  ec2.addClass("edgefocus");
  g1.layout();
  av.step();

  // Slide 12
  e2.removeClass("edgefocus");
  ec2.removeClass("edgefocus");
  g1.layout();
  av.step();

  // Slide 13
  g1.hide();
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  label5.hide();
  label6.hide();
  nl1.hide();
  av.umsg("<br><b>Insights about the graph</b>");
  nl1=av.label("1. If two nodes in the graph are connected, the corresponding literals "
               +"can simultaneously be assigned $True$.<br>(This is true since there is no edge between nodes"
               +" corresponding to literals of type $x$ and $\\overline{x}$.)"+
               "<br><br><br>2. If two literals not from the same clause can be assigned $True$ "
               +"simultaneously, the nodes corresponding to these literals in the graph are connected."
               +"<br><br><br>3. Construction of the graph can be performed in polynomial time"
               ,{top:-10});
  av.step();

  // Slide 14
  av.umsg("<br><b>3-SAT to k-Clique Reduction</b>");
  nl1.hide();
  nl2.hide();
  nl1=av.label("$G$ has a $k$-clique if and only if $\\Phi$ is satisfiable.</b>",{top:0});
  av.step();

  // Slide 15
  nl2=av.label("1. <b>If the graph $G$ has a $k$-clique,</b> the"
               +" clique has exacty one node from each cluster. <br>(This is because no two nodes from"
               +" the same cluster are connected to each other, hence they can never be a part of "
               +"the same clique.)<br>All nodes in a clique are connected, hence all corresponding "
               +"literals can be assigned $True$ simultaneously."
               +"<br> Each literal belongs to exactly one of the $k$-clauses. Hence <b> $\\Phi$ is satisfiable.</b>",
               {top:60});
  av.step();
  
  // Slide 16
  var nl3=av.label("<b>2. If $\\Phi$ is satisfiable,</b> let A be a satisfying assignment. "
                   +"Select from each clause a literal that is $True$ in A to construct a set S. $||S|| = k$."
                   +"Since no two literals in S are from the same clause and all of them are simultaneously $True$, all"
                   +" the corresponding nodes in the graph are connected to each other, forming a k-clique."
                   +" Hence, <b>the graph has a $k$-clique.</b>",{top:200});
  av.step();

  // Slide 17
  nl1.hide();
  nl2.hide();
  nl3.hide();
  av.umsg("<br><b>Example of 3-SAT to k-Clique Reduction</b>");
  g1.show();
  av.umsg("<br><br>The following graph hase a 3-clique.",{preserve:true});
  ec1.addClass("edgehighlight");
  ec2.addClass("edgehighlight");
  ec3.addClass("edgehighlight");
  av.step();

  // Slide 18
  av.umsg("<br><b>Example of 3-SAT to k-Clique Reduction</b>");
  nl1=av.label("The corresponding assignment: $x_2 = True , x_3 = True , x_4 = True$.",{top:-10});
  av.step();

  // Slide 19
  g1.hide();
  nl1.hide();
  av.umsg("<br><b>Example of 3-SAT to k-Clique Reduction</b>");
  nl1 = av.label("$\\Phi$ is $True$ for the corresponding assignment: $x_2 = True , x_3= True , x_4 = True$.",{top:50});
  label1.show();
  label2.removeClass("labelcolor1").show();
  label3.removeClass("labelcolor2").show();
  label4.removeClass("labelcolor3").show();
  label5.show();
  label6.show();
  av.recorded();
});
