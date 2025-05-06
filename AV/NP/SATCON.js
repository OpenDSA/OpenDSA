//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA*/
$(document).ready(function () {
  "use strict";
  var av_name = "SATCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again 
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var av = new JSAV(av_name);

  // Slide 1
  av.umsg("<br><b>Introduction to Formula Satisfiability </b>");
  var nl1=av.label("This slideshow introduces"+
                   " and explains the \"Formula Satisfiability\" (SAT) Problem."
                   +"</b> <br><br><br> We start with some definitions  and background.",{top:0,left:0});
  av.displayInit();
  av.step();
  
  // Slide 2
  var label1, label2 , label3, label4, label5, label6,label7,label8,label9;
  nl1.hide();
  var y = 0;
  av.umsg("<br><b>Background</b>");
  nl1 = av.label("Boolean variables are variables that can have a value from "+
                 "{T, F}, where 'T' stands for TRUE and 'F' for FALSE.<br>We typically use subscripts on letters like $x$ and $y$ for our Boolean variables: $x_1, x_2, x_3$", {left: 0, top: -10});
  av.step();

  // Slide 3
  var nl2=av.label("We use Boolean operators AND (+) , OR (.), and NOT ($\\overline{\\ \\ }$ over a variable), which follow these truth tables:", {top: 60, left: 0});

  var y=65;
  var x = 75;

  label1 = av.label("The NOT Operator",{left:x-50,top:y+50});
  var data1 = [[" $x$ ","$\\overline{x}$ "],
               [" T "," F "],
               [" F "," T "]];
  var table1 = new av.ds.matrix(data1,{style:"table",left:x-40,top:y+75,});

  for(var i=0;i<3;i++)
    table1.addClass(0,i,"headerrow");

  x+=225;

  label2 = av.label("The AND Operator",{left:x-50,top:y+50});
  var data2 = [[" $x$ "," $y$ "," $x.y$ "],
               [" T "," T "," T "],
               [" T "," F "," F "],
               [" F "," T "," F "],
               [" F "," F "," F "]];
  var table2 = new av.ds.matrix(data2,{style:"table",left:x-50,top:y+75});

  for(var i=0;i<3;i++)
    table2.addClass(0,i,"headerrow");

  x+=225;
  label3 = av.label("The OR Operator",{left:x-50,top:y+50});
  var data3 = [[" $x$ "," $y$ "," $x$+$y$ "],
               [" T "," T "," T "],
               [" T "," F "," T "],
               [" F "," T "," T "],
               [" F "," F "," F "]];

  var table3 = new av.ds.matrix(data3,{style:"table",left:x-50,top:y+75});

  for(var i=0;i<3;i++)
    table3.addClass(0,i,"headerrow");
  av.step();

  // Slide 4
  var nl3=av.label("A Boolean formula is composed of boolean variables and operators. For example: $x_1 + x_2 . \\overline{x_3}$ ", {top: 310, left: 0});
  av.step();

  // Slide 5
  nl1.hide();
  nl2.hide();
  nl3.hide();

  label1.hide(); label2.hide(); label3.hide();
  table1.hide(); table2.hide(); table3.hide();

  av.umsg("<br><b>Background</b>");
  nl1=av.label("A <b>literal</b> is either a boolean variable ($x$) or "
               +"its negation ($\\overline{x}$)<br><br>For example: " +
               "$a, \\overline{b} , \\overline{g}, c, \\overline{c}$.", {top: -10, left: 0});
  av.step();

  // Slide 6
  nl2=av.label("A <b>clause</b> is a disjunction (OR) of literals such as " +
               "$l_1 + l_2 + l_3 +\\cdots +l_n$ for literals $l_i$."
               +"<br><br>For example:&nbsp&nbsp&nbsp&nbsp ($a + \\overline{b}$) , &nbsp&nbsp&nbsp"
               +"&nbsp $\\overline{g}$ , &nbsp&nbsp&nbsp&nbsp ($c + \\overline{f} + \\overline{e} + h$).",
               {left:0,top:80}); 
  av.step();  

  // Slide 7
  nl3 = av.label("<br><br><br>A <b>Conjunctive normal form (CNF)</b> is a conjunction (AND) of clauses.<br><br>For example: &nbsp&nbsp&nbsp $\\overline{x_1} . (x_1 + x_2).(x_3 + x_4 + \\overline{x_5}) . (x_1 + x_3) . (\\overline{x_3} + x_2 + \\overline{x_5}) . (x_1 + x_2 + \\overline{x_3}) . (x_3 + x_4 + \\overline{x_2}) . (\\overline{x_4} + \\overline{x_1} + \\overline{x_5}) . (x_1 + x_3 + x_5)$<br><br>We will use CNF exclusively from now on.", {left: 0, top: 120}); 
  av.step();

  // Slide 8
  av.umsg("<br><b>Background</b>");
  y=0;
  nl1.hide();
  nl2.hide();
  nl3.hide();
  nl1=av.label("An assignment to the Boolean variables in a formula " +
               "is known as a <b>truth assignment</b>.", {top: -10, left: 0});
  av.step();

  // Slide 9
  nl2 = av.label("A truth assignment of variables is said to be <b>satisfying</b>, if it causes the formula to evaluate to \"TRUE\".", {top: 40});
  av.step();

  // Slide 10
  nl3=av.label("A CNF is said to be <b>satisfiable</b> if it has a "+
               "satisfying assignment.",{top:90});
  av.step(); 

  // Slide 11
  y = 130;
  label1 = av.label("For example: $(x_1 + x_2 . x_3)$ is"+
                    " \"True\" for $x_1$=T , $x_2$=T, $x_3$=T , "+
                    "hence satisfiable.",{top: y, left: 10});
  y = y+ 20;
  label2 = av.label("($x_1 . \\overline{x_1}$) is  always \"False\", hence"+
                    " not satisfiable.",{top: y, left: 102});
  av.step();
  
  // Slide 12
  nl1.hide();
  nl2.hide();
  nl3.hide();
  av.umsg("<br><b>The SAT Problem</b>");
  y=0;
  label1.hide();
  label2.hide();
  nl1=av.label("Given any boolean formula in CNF, is the formula satisfiable?"
               ,{top:0}); 
  av.step();

  // Slide 13
  nl1.hide();
  av.umsg("<br><b>Example of SAT (1)</b>");
  label1.hide();
  label2.hide();
  y = 0;
  label1 = av.label("P = ($x_1$ + $x_2$).($x_2$ + $\\overline{x_3}$ + $x_4$).($x_1$ + "+
                    "$\\overline{x_2}$ + $x_3$ + $x_4$).($\\overline{x_1}$ + $x_3$)"
                    ,{top: y-15,left:0}).css({"text-align": "center"}); 

  label2 = av.label("Truth Table for P",{top: y+20,left:150})
    .css({"text-align": "center"}); 

  var matdata=[["$x_1$","$x_2$","$x_3$","$x_4$","P"],
               ["F","F","F","F","F"],
               ["F","F","F","T","F"],
               ["F","F","T","F","F"],
               ["F","F","T","T","F"],
               ["F","T","F","F","F"],
               ["F","T","F","T","T"],
               ["F","T","T","F","T"],
               ["F","T","T","T","T"]];
  var matdata1=[["$x_1$","$x_2$","$x_3$","$x_4$","P"],
                ["T","F","F","F","F"],
                ["T","F","F","T","F"],
                ["T","F","T","F","F"],
                ["T","F","T","T","T"],
                ["T","T","F","F","F"],
                ["T","T","F","T","F"],
                ["T","T","T","F","T"],
                ["T","T","T","T","T"]];

  

  var mat1 = new av.ds.matrix(matdata,{style:"table",left:50,top:y+50});
  var mat2= new av.ds.matrix(matdata1,{style:"table",left:250,top:y+50});

  for(var j=0; j<5 ; j++)
    mat1.addClass(0,j,"headerrow");
  for(var j=0; j<5 ; j++)
    mat2.addClass(0,j,"headerrow");
  av.step();

  // Slide 14
  for (var i=1; i< 9; i++){
    if (matdata[i][4] == "F"){
      for(var j=0; j<5 ; j++)
        mat1.addClass(i,j,"cellfalse");
    }
    else{
      for(var j=0; j<5 ; j++)
        mat1.addClass(i,j,"celltrue");
    }

    if (matdata1[i][4] == "F"){
      for(var j=0; j<8 ; j++)
        mat2.addClass(i,j,"cellfalse");
    }
    else{
      for(var j=0; j<8 ; j++)
        mat2.addClass(i,j,"celltrue");
    }
    
  }
  av.step();

  // Slide 15
  label4 = av.label("There exist assignments that makes the formula true "+
                    "(the green rows).", {top: y + 120, left: 550})
  av.step();

  // Slide 16
  label3 = av.label("P is satisfiable.", {top: y + 185, left: 550});
  label3.show();
  av.step();

  // Slide 17
  mat1.hide();
  mat2.hide();
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();

  av.umsg("<br><b>Example of SAT (2)</b>");
  y = 0;
  label1 = av.label("P = ($x_1$ + $x_2$).($x_2$ + $\\overline{x_3}$ + $x_4$).($x_3$ + "+
                    "$\\overline{x_4}$).($x_1$ + $\\overline{x_1}$).($x_1$ + $\\overline{x_2}$ + $x_3$ + $x_4$)",{top: y-15,left:0})
    .css({"text-align": "center"}); 

  label2 = av.label("Truth Table for P",{top: y+20,left:150})
    .css({"text-align": "center"}); 

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
  for(var j=0; j<5 ; j++)
    mat3.addClass(0,j,"headerrow");
  for(var j=0; j<5 ; j++)
    mat4.addClass(0,j,"headerrow");
  av.step();

  // Slide 18
  for ( var k=1; k< 9; k++){
    for(var l=0; l<5 ; l++){
      mat3.addClass(k,l,"cellfalse");
      mat4.addClass(k,l,"cellfalse");
    }

  }
  av.step();

  // Slide 19
  label4 = av.label("There does not exist any assignment that makes the formula true "+
                    "(no green rows).",{top:y+120,left:550})
  av.step();

  // Slide 20
  label3 = av.label("P is not satisfiable.",{top: y+185,left:550});
  av.step();
  
  // Slide 21
  mat3.hide();
  mat4.hide();
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  av.umsg("<br><b>Insights</b>");
  av.label("The size of the truth table is $2^n$ where $n$ is the "
           + "number of boolean variables involved.<br><br>Hence the problem "
           + "gets exponentially harder as number of variables increases.",
           {top: 5}); 
  av.recorded();
});
