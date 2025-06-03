//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */

// Title: Introduction to the 3-CNF Satisfiability Problem
// Author: Nabinita Maji; Cliff Shaffer
// Institution: Virginia Tech
// Features: Demonstration
// Keyword: 3-Satisfiability Problem
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow demonstrating the 3-CNF satisfiability problem. */

$(document).ready(function () {
  "use strict";
  var av_name = "threeSATCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again 
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var av = new JSAV(av_name);

  // Slide 1
  av.umsg("<br><b>Introduction to 3-CNF Satisfiability</b> ");
  var nl1=av.label("This slideshow introduces"+
                   " and explains the \"3-CNF Satisfiability\" (3-SAT) Problem."
                   +"</b> <br><br><br> We start with some definitions  and background.",{top:0});
  av.displayInit();
  av.step();

  // Slide 2
  nl1.hide();
  var label1, label2 , label3, label4, label5, label6,label7,label8,label9;
  var y = 0;
  av.umsg("<br><b>Background</b>"); 
  nl1=av.label("A <b>3-CNF</b> is a Boolean formula that is an AND of "+
               "clauses, each of which is an OR of <br>exactly 3 distinct literals."
               ,{top:-10}); 
  av.step();

  // Slide 3
  var nl2 = av.label("Example of 3-CNF: $(x_1 + x_2 + x_3).(\\overline{x_1} + x_4 + x_6)." + 
                   "(x_2 + \\overline{x_5}+ \\overline{x_3}).(x_1 + \\overline{x_3} + \\overline{x_6})$."
                   ,{top:50});
  av.step();

  // Slide 4
  var nl3=av.label("An assignment to the boolean variables in a formula "+
                   "is known as a <b>truth assignment</b>.",{top:100});
  av.step();
  
  // Slide 5
  var nl4=av.label("A truth assignment of variables is said to be <b> "+
                   "satisfying</b>, if it causes the formula to evaluate to \"TRUE\".",{top:150});
  av.step();
  
  // Slide 6
  var nl5=av.label("A 3-CNF is said to be <b>satisfiable</b> if it has a "+
                   "satisfying assignment.",{top:200});
  av.step();
  
  // Slide 7
  nl1.hide();
  nl2.hide();
  nl3.hide();
  nl4.hide();
  nl5.hide();
  av.umsg("<br><b>The 3-SAT problem</b>");  
  nl1= av.label("Given some boolean formula in CNF such that each "+
                "clause has exactly 3 literals, is the formula satisfiable?",
                {top:0});
  av.step();

  // Slide 8
  nl1.hide(); 
  av.umsg("<br><b>Example of 3-SAT</b>");
  y = 0;
  label1 = av.label("<b>P = ($x_1$ + $x_2$ + $x_3$).($x_4$ + $\\overline{"+
                    "x_2}$ + $\\overline{x_1}$) . ($x_3$ + $\\overline{x_2}$ + $x_1$) . ("+
                    "$\\overline{x_3}$ + $x_4$ + $x_1$) . ($\\overline{x_4}$ + $\\overline{x_2}$"
                    +" + $\\overline{x_1}$) .($x_1$ + $x_4$ + $x_3$) . ($x_3$ + $x_2$ + $x_4$)</b>",
                    {top: y-20,left:0}).css({"text-align": "center"}); 
  av.step();

  // Slide 9
  label2 = av.label("Truth Table for P",{top:y+20,left:150})
    .css({"text-align": "center"});

  var matdata=[["$x_1$","$x_2$","$x_3$",
                "$x_4$","P"],
               ["F","F","F","F","F"],
               ["F","F","F","T","F"],
               ["F","F","T","F","F"],
               ["F","F","T","T","T"],
               ["F","T","F","F","F"],
               ["F","T","F","T","F"],
               ["F","T","T","F","F"],
               ["F","T","T","T","T"]];
  var matdata1=[["$x_1$","$x_2$","$x_3$",
                 "$x_4$","P"],
                ["T","F","F","F","F"],
                ["T","F","F","T","T"],
                ["T","F","T","F","T"],
                ["T","F","T","T","T"],
                ["T","T","F","F","F"],
                ["T","T","F","T","F"],
                ["T","T","T","F","F"],
                ["T","T","T","T","F"]];

  var mat1 = new av.ds.matrix(matdata,{style:"table",left:50,top:y+50}); 
  var mat2= new av.ds.matrix(matdata1,{style:"table",left:250,top:y+50}); 
  for(var i=0;i<5;i++){
    mat1.addClass(0,i,"headerrow");
    mat2.addClass(0,i,"headerrow");
  }
  av.step();

  // Slide 10
  for (var i=1; i< 9; i++){ 
    if (matdata[i][4] == "F"){ for(var j=0; j<5 ; j++)
      mat1.addClass(i,j,"cellfalse"); } 
    else{ for(var j=0; j<5 ; j++)
      mat1.addClass(i,j,"celltrue"); }

    if (matdata1[i][4] == "F"){ for(var j=0; j<8 ; j++)
      mat2.addClass(i,j,"cellfalse"); } 
    else{ for(var j=0; j<8 ; j++)
      mat2.addClass(i,j,"celltrue"); }
    
  } 
  av.step();

  // Slide 11
  label4 = av.label("There exists assignments that makes the formula true "+
                    "(the green rows).",{top:y+120,left:550})
  av.step();

  // Slide 12
  label3 = av.label("P is satisfiable.", {top: y + 200, left: 550});
  av.step(); 

  // Slide 13
  mat1.hide(); 
  mat2.hide(); 
  label1.hide(); 
  label2.hide();
  label3.hide();
  label4.hide(); 
  av.umsg("<br><b>Example of 3 - SAT</b>"); 
  y = 0;
  label1 = av.label("<b>P = ($x_1$ + $x_2$ + $x_3$) .($x_1$ + $\\overline{x_3}$ + "
                    +"$\\overline{x_4}$) . ($\\overline{x_1}$ + $x_3$ + $x_4$) . ($\\overline{x_2}$"
                    +" + $x_4$ + $\\overline{x_3}$). ($x_1$ + $\\overline{x_2}$ + $x_3$) . ($x_2$ + "+
                    "$\\overline{x_3}$ + $x_4$) . ($\\overline{x_1}$ + $\\overline{x_2}$ + $\\overline{x_4}$)"
                    +" . ($\\overline{x_1}$ + $x_2$ + $\\overline{x_4}$)</b>",
                    {top: y-20,left:0}).css({"text-align": "center"}); 
  av.step();

  // Slide 14
  label2 = av.label("Truth Table for P",{top:y+20,left:150})
    .css({"text-align": "center"}); label2.show();

  var matdata2=[["$x_1$","$x_2$","$x_3$","$x_4$","P"],
                ["F","F","F","F","F"],
                ["F","F","F","T","F"],
                ["F","F","T","F","F"],
                ["F","F","T","T","F"],
                ["F","T","F","F","F"],
                ["F","T","F","T","F"],
                ["F","T","T","F","F"],
                ["F","T","T","T","F"]];

  var matdata3=[["$x_1$","$x_2$","$x_3$","$x_4$","P"],
                ["T","F","F","F","F"],
                ["T","F","F","T","F"],
                ["T","F","T","F","F"],
                ["T","F","T","T","F"],
                ["T","T","F","F","F"],
                ["T","T","F","T","F"],
                ["T","T","T","F","F"],
                ["T","T","T","T","F"]];

  var mat3 = new av.ds.matrix(matdata2,{style:"table",left:50,top:y+50}); 
  var mat4= new av.ds.matrix(matdata3,{style:"table",left:250,top:y+50}); 
  for(var i=0;i<5;i++){
    mat3.addClass(0,i,"headerrow");
    mat4.addClass(0,i,"headerrow");
  }
  av.step();

  // Slide 15
  for ( var k=1; k< 9; k++){ 
    for(var l=0; l<5 ; l++){
      mat3.addClass(k,l,"cellfalse");
      mat4.addClass(k,l,"cellfalse"); }
  } 
  av.step();

  // Slide 16
  label4 = av.label("There exists no assignment that makes the formula true "+
                    "(no green rows).",{top:y+120,left:550})
  av.step();

  // Slide 17
  label3 = av.label("P is not satisfiable.",{top:y+200,left:550});
  av.step(); 

  // Slide 18
  av.umsg("<br><b>Insights</b>"); 
  mat3.hide(); mat4.hide(); 
  label1.hide();label2.hide(); label3.hide();label4.hide();
  av.label("The size of the truth table is $2^n$ where $n$ is the"
           + " number of boolean variables involved."
           + "<br><br>Hence the problem gets exponentially harder as the"
           + " number of variables increases.", {top: 5}); 
  av.recorded();
});
