//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */
$(document).ready(function () {
  "use strict";
  var av_name = "SATto3SATCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var av = new JSAV(av_name);
  var label1, label2 , label3, label4, label5, label6, label7, label8, label9,
      label10, label11, label12,nl1,nl2,nl3,n4;

  // Slide 1
  av.umsg("<br><b>Reduction of SAT to 3-SAT </b>");
  nl1=av.label(" This slideshow shows how to convert (reduce) a general instance of the Formula Satisfiability "+
               "problem to a version with exactly 3 literals in every clause (so as to be a valid input to the 3-CNF Satisfiability problem) in polynomial time", {top: 0});
  av.displayInit();
  av.step();

  // Slide 2
  nl1.hide();
  av.umsg("<br><b>Reduction of SAT to 3-SAT</b>");
  nl1=av.label("Consider a general input to SAT: $C_1 . C_2 . \\cdots . C_n$."
               + " Each clause must be one of the following four cases."
               + "<br><br>&nbsp;1. It contains three literals. For example: ($x_1 + \\overline{x_2} + x_3$).<br>"
               + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No reduction is needed for this case."
               + "<br><br>&nbsp;2. It contains only one literal. For example: ($x_1$)."
               + "<br><br>&nbsp;3. It contains two literals. For example: ($x_1 + \\overline{x_2}$)."
               + "<br><br>&nbsp;4. It contains more than three literals. For example: $(x_1 + \\overline{x_2} + x_3 \\cdots + x_k)$ where $k > 3$.",
               {top: -10});
  av.step();

  // Slide 3
  nl2 = av.label("We now show how a clause $C$ from any of the cases above can be replaced by a collection of one or more clauses ($Z$) such that:"
                 + "<br>1. All clauses in $Z$ contain  exactly 3 literals."
                 + "<br>2. $C$ is satisfiable if and only if $Z$ is satisfiable.",
               {top: 260});
  av.step();

  // Slide 4
  av.umsg("<br><b>Case 2: Reduction of clauses containing one literal</b>");
  nl1.hide();
  nl2.hide();
  nl1 = av.label("Let $C_i = l_i$ where $l_i$ is a literal.", {top: -10});
  av.step();

  // Slide 5
  nl2 = av.label("Introduce 2 new variables $y_{i,1}$ and $y_{i,2}$.", {top: 20});
  av.step();

  // Slide 6
  nl3=av.label("Replace $C_i$ by $Z_i$, a conjunction of four clauses, where", {top: 45});
  var nl4 = av.label("$Z_i = $",{top:70,left:0});
  label1 = av.label("$(l_i + y_{i,1} + y_{i,2}) \\cdot$ ", {left: 30, top: 70});
  label2 = av.label("$(l_i + \\overline{y_{i,1}} + y_{i,2})\\ \\cdot$ ",{left:140, top: 70});
  label3 = av.label("$(l_i + y_{i,1} + \\overline{y_{i,2}})\\ \\cdot$ ", {left: 245, top: 70});
  label4 = av.label("$(l_i + \\overline{y_{i,1}} + \\overline{y_{i,2}})$.", {left: 350, top: 70});
  label1.addClass("falsecolor");
  label2.addClass("truecolor");
  label3.addClass("color1");
  label4.addClass("color2");

  label5 = av.label("I", {left: 65, top: 90}).addClass("falsecolor");
  label6 = av.label("II", {left: 190, top: 90}).addClass("truecolor");;
  label7 = av.label("III", {left: 295, top: 90}).addClass("color1");
  label8 = av.label("IV", {left: 400, top: 90}).addClass("color2");
  av.step();

  // Slide 7
  label9 = av.label("<b>Truth Table :</b>",{left:20,top:110});

  var mat1 =[["$l_i$","$y_{i,1}$","$y_{i,2}$",
              "I","II","III","IV","$Z_i$"],
             ["T","T","T","T","T","T","T","T"],
             ["T","T","F","T","T","T","T","T"],
             ["T","F","T","T","T","T","T","T"],
             ["T","F","F","T","T","T","T","T"],
             ["F","T","T","T","T","T","F","F"],
             ["F","T","F","T","F","T","T","F"],
             ["F","F","T","T","T","F","T","F"],
             ["F","F","F","F","T","T","T","F"]
            ];

  var table1 = new av.ds.matrix(mat1,{style:"table",left:10,top:130,});
  for(var i=0;i<9;i++)
    for(var j=3;j<8;j++)
      table1.addClass(i,j,"invisible");
  av.step();

  // Slide 8
  label1.addClass("fontbold");
  for(var i=0;i<9;i++)
    table1.removeClass(i,3,"invisible");
  av.step();

  // Slide 9
  label1.removeClass("fontbold");
  label2.addClass("fontbold");
  for(var i=0;i<9;i++)
    table1.removeClass(i,4,"invisible");
  av.step();

  // Slide 10
  label2.removeClass("fontbold");
  label3.addClass("fontbold");
  for(var i=0;i<9;i++)
    table1.removeClass(i,5,"invisible");
  av.step();

  // Slide 11
  label3.removeClass("fontbold");
  label4.addClass("fontbold");
  for(var i=0;i<9;i++)
    table1.removeClass(i,6,"invisible");
  av.step();

  // Slide 12
  label4.removeClass("fontbold");
  for(var i=0;i<9;i++)
    table1.removeClass(i,7,"invisible");
  av.step();

  // Slide 13
  label10 = av.label("When $C_i$ (i.e. $l_i$)  is $True$, $Z_i$ is true.", {left: 350, top: 200});
  for(var i=1;i<5;i++){
    table1.addClass(i,0,"cellhighlight");
    table1.addClass(i,7,"cellhighlight");
  }
  av.step();

  // Slide 14
  label11 = av.label("When $C_i$ (i.e. $l_i$) is $False$, $Z_i$ is false.", {left: 350, top: 230});
  for(var i=1;i<5;i++){
    table1.removeClass(i,0,"cellhighlight");
    table1.removeClass(i,7,"cellhighlight");
  }
  for(var i=5;i<9;i++){
    table1.addClass(i,0,"cellhighlight");
    table1.addClass(i,7,"cellhighlight");
  }
  av.step();

  // Slide 15
  for(var i=5;i<9;i++){
    table1.removeClass(i,0,"cellhighlight");
    table1.removeClass(i,7,"cellhighlight");
  }
  label12 = av.label("Hence $C_i$ can be reduced to $Z_i$ "+
                     "where each clause in $Z_i$ contains exactly 3 literals and "
                     +"$C_i \\iff Z_i$.",{left:350,top:270}).addClass("color1");
  av.step();

  // Slide 16
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  label5.hide();
  label6.hide();
  label7.hide();
  label8.hide();
  label9.hide();
  label10.hide();
  label11.hide();
  label12.hide();
  nl1.hide();
  nl2.hide();
  nl3.hide();
  nl4.hide();
  table1.hide();
  av.umsg("<br><b>Case 3: Reduction of clauses containing two literals.</b>");
  nl1=av.label("Let $C_i$ = ($l_{i,1}$ + $l_{i,2}$)"
               +" where $l_{i,1}$ and $l_{i,2}$ are literals.", {top: -10});
  av.step();

  // Slide 17
  nl2 = av.label("Introduce a new variable $y_i$.",{top:20});
  av.step();

  // Slide 18
  nl3 = av.label("Replace $C_i$ by conjunction of clauses $Z_i$ where", {top: 45});
  nl4 = av.label("$\\ \\ Z_i = (l_{i,1} + l_{i,2} + y_i) \\cdot (l_{i,1} + l_{i,2} + \\overline{y_i})$.", {top: 70});
  label1.addClass("color1");
  label2.addClass("color2");
  label3 = av.label("I", {left: 75, top: 90}).addClass("color1");
  label4 = av.label("II",{left: 180, top: 90}).addClass("color2");;
  av.step();

  // Slide 19
  label5 = av.label("<b>Truth Table :</b>",{left:20,top:110});

  var mat2=[["$l_{i,1}$","$l_{i,2}$","$y_i$",
             "$C_i$","I","II","$Z_i$"] ,
            ["T","T","T","T","T","T","T"],
            ["T","T","F","T","T","T","T"],
            ["T","F","T","T","T","T","T"],
            ["T","F","F","T","T","T","T"],
            ["F","T","T","T","T","T","T"],
            ["F","T","F","T","T","T","T"],
            ["F","F","T","F","T","F","F"],
            ["F","F","F","F","F","T","F"],
           ];

  var table2 = new av.ds.matrix(mat2,{style:"table",left:10,top:130,});

  for(var i=0;i<9;i++)
    for(var j=3;j<7;j++)
      table2.addClass(i,j,"invisible");
  av.step();

  // Slide 20
  for(var i=0;i<9;i++)
    table2.removeClass(i,3,"invisible");
  av.step();

  // Slide 21
  for(var i=0;i<9;i++)
    table2.removeClass(i,4,"invisible");
  label1.addClass("fontbold");
  av.step();

  // Slide 22
  label1.removeClass("fontbold");
  label2.addClass("fontbold");
  for(var i=0;i<9;i++)
    table2.removeClass(i,5,"invisible");
  av.step();

  // Slide 23
  label2.removeClass("fontbold");
  for(var i=0;i<9;i++)
    table2.removeClass(i,6,"invisible");
  av.step();

  // Slide 24
  label6 = av.label("When $C_i$ is true, $Z_i$ is true.", {left: 350, top: 200});
  for(var i=1;i<7;i++){
    table2.addClass(i,3,"cellhighlight");
    table2.addClass(i,6,"cellhighlight");
  }
  av.step();

  // Slide 25
  label7 = av.label("When $C_i$ is false, $Z_i$ is false.", {left: 350, top: 230});
  for(var i=1;i<7;i++){
    table2.removeClass(i,3,"cellhighlight");
    table2.removeClass(i,6,"cellhighlight");
  }
  for(var i=7;i<9;i++){
    table2.addClass(i,3,"cellhighlight");
    table2.addClass(i,6,"cellhighlight");
  }
  av.step();

  // Slide 26
  for(var i=7;i<9;i++){
    table2.removeClass(i,3,"cellhighlight");
    table2.removeClass(i,6,"cellhighlight");
  }
  label8 = av.label("Hence $C_i$ can be reduced to $Z_i$ "+
                    "where each clause in $Z_i$ contains exactly 3 literals and "
                    +"$C_i \\iff Z_i$.",{left:350,top:270}).addClass("color1");
  av.step();

  // Slide 27
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  label5.hide();
  label6.hide();
  label7.hide();
  label8.hide();

  nl1.hide();
  nl2.hide();
  nl3.hide();
  nl4.hide();
  table2.hide();

  // Slide 27
  av.umsg("<br><b>Case 4: Reduction of clauses containing more than three literals.</b>");
  nl1 = av.label("Let $C_i = (l_{i,1} + l_{i,2} + l_{i,3} + \\cdots + l_{i,k})$ where $k > 3$.", {top: -10});
  av.step();

  // Slide 28
  nl2=av.label("Introduce $k-3$ new variables: $y_1 , y_2, \\cdots "
               +",y_{k-3}$.", {top: 20});
  av.step();

  // Slide 29
  nl3=av.label("Replace $C_i$ with a sequence of clauses "
               + "$Z_i$ where<br><br> $Z_i = (l_{i,1} + l_{i,2} "
               + "+ y_1) \\cdot (\\overline{y_1} + l_{i,3} + y_2)"
               + " \\cdots (\\overline{y_{j-2}} + l_{i,j} + y_{j-1}) \\cdots"
               + " (\\overline{y_{k-4}} + l_{i,k-2} + y_{k-3}) \\cdot("
               + "\\overline{y_{k-3}} + l_{i,k-1} + l_{i,k})$.",
               {top: 60});
  av.step();

  // Slide 30
  nl4=av.label("<b>We need to prove:</b><br><br>a. When $C_i$ is satisfiable,$ Z_i$ is satisfiable."
               + "<br><br>b. When $C_i$ is not satisfiable, $Z_i$ is not satisfiable.", {top: 180});
  av.step();

  // Slide 31
  nl1.hide();
  nl2.hide();
  nl3.hide();
  nl4.hide();
  av.umsg("<br><b> Case 4a. When C<sub>i</sub> is satisfiable.</b>");

  nl1=av.label("$C_i = (l_{i,1} + l_{i,2} + l_{i,3} + \\cdots + l_{i,k})$ where $k > 3$.", {top: -20});
  nl2=av.label("$Z_i =$ ",{top:4});

  var zlabels = [];
  zlabels.push(av.label(" $($ ",{left: 35,top:4}));
  zlabels.push(av.label("$l_{i,1} + l_{i,2}$",{left:40,top:4}));
  zlabels.push(av.label(" $+$ ",{left: 95,top:4}));
  zlabels.push(av.label("$y_1$",{left: 110,top:4}));
  zlabels.push(av.label(" $)\\cdot($ ",{left: 120,top:4}));
  zlabels.push(av.label("$\\overline{y_1}$",{left: 137,top:4}));
  zlabels.push(av.label(" $+$ ",{left: 152,top:4}));
  zlabels.push(av.label("$l_{i,3}$",{left: 167,top:4}));
  zlabels.push(av.label(" $+$ ",{left: 185,top:4}));
  zlabels.push(av.label("$y_2$",{left: 200,top:4}));
  zlabels.push(av.label(" $) \\cdots ($ ",{left: 215,top:4}));
  zlabels.push(av.label("$\\overline{y_{j-3}}$",{left: 245,top:4}));
  zlabels.push(av.label(" $+$ ",{left: 277,top:4}));
  zlabels.push(av.label("$l_{i,j-1}$",{left: 290,top:4}));
  zlabels.push(av.label(" $+$ ",{left: 320,top:4}));
  zlabels.push(av.label("$y_{j-2}$",{left: 335,top:4}));
  zlabels.push(av.label(" $)\\cdot($ ",{left: 360,top:4}));
  zlabels.push(av.label("$\\overline{y_{j-2}}$",{left: 380,top:4}));
  zlabels.push(av.label(" $+$ ",{left: 408,top:4}));
  zlabels.push(av.label("$l_{i,j}$",{left: 423,top:4}));
  zlabels.push(av.label(" $+$ ",{left: 440,top:4}));
  zlabels.push(av.label("$y_{j-1}$",{left: 460,top:4}));
  zlabels.push(av.label(" $)\\cdot($ ",{left: 485,top:4}));
  zlabels.push(av.label("$\\overline{y_{j-1}}$",{left: 500,top:4}));
  zlabels.push(av.label(" $+$ ",{left: 530,top:4}));
  zlabels.push(av.label("$l_{i,j+1}$",{left: 545,top:4}));
  zlabels.push(av.label(" $+$ ",{left: 575,top:4}));
  zlabels.push(av.label("$y_{j}$",{left: 590,top:4}));
  zlabels.push(av.label("$)\\cdots($",{left: 605,top:4}));
  zlabels.push(av.label("$\\overline{y_{k-4}}$",{left:635,top:4}));
  zlabels.push(av.label(" $+$ ",{left:665,top:4}));
  zlabels.push(av.label("$l_{i,k-2}$",{left:680,top:4}));
  zlabels.push(av.label(" $+$ ",{left:715,top:4}));
  zlabels.push(av.label("$y_{k-3}$",{left:730,top:4}));
  zlabels.push(av.label(" $)\\cdot$ ",{left:758,top:4}));
  zlabels.push(av.label(" $($ ",{left:30,top:25}));
  zlabels.push(av.label("$\\overline{y_{k-3}}$",{left:37,top:25}));
  zlabels.push(av.label(" $+$ ",{left:72,top:25}));
  zlabels.push(av.label("$l_{i,k-1} + l_k$",{left:81,top:25}));
  zlabels.push(av.label(" $)$ ",{left:145,top:25}));

  nl3 = av.label("When $C_i$ is satisfiable, at least one literal in ${l_{i,1} ... l_{i,k}}$ is $True$.", {top: 60});
  av.step();
  
  // Slide 32
  label1=av.label("<b>If any of $l_{i,1}$ or $l_{i,2}$ is $True$</b>, "
                  +"set all the additional variables $y_1 ,"+
                  "y_2 \\cdots y_{k-3}$ to $False$.",{left:0,top:100});
  zlabels[1].addClass("truecolor");
  av.step();

  // Slide 33
  label3=av.label("The first term of all the clauses in $Z_i$ "+
                  "other than the first has a literal $\\overline{y_n}$ which evaluates to $True$.",
                  {left: 0, top: 130});

  zlabels[5].addClass("truecolor");
  zlabels[3].addClass("falsecolor");
  zlabels[11].addClass("truecolor");
  zlabels[9].addClass("falsecolor");
  zlabels[17].addClass("truecolor");
  zlabels[15].addClass("falsecolor");
  zlabels[23].addClass("truecolor");
  zlabels[21].addClass("falsecolor");
  zlabels[29].addClass("truecolor");
  zlabels[27].addClass("falsecolor");
  zlabels[36].addClass("truecolor");
  zlabels[33].addClass("falsecolor");
  label4=av.label("<b>$Z_i$ has a satisfying assignment.</b>"
                  ,{left:0,top:160});
  av.step();

  // Slide 34
  for(var i in zlabels){
    zlabels[i].removeClass("truecolor");
    zlabels[i].removeClass("falsecolor");
  }
  label1.hide();
  label3.hide();
  label4.hide();
  label1=av.label("<b>If any of $l_{i,k-1}$ or $l_{i,k}$ is $True$</b>, "
                  +"set all the additional variables $y_1 ,"+
                  "y_2 \\cdots y_{k-3}$ to $True$.",{left:0,top:100});
  zlabels[38].addClass("truecolor");
  av.step();

  // Slide 35
  label3=av.label("The third term of all the clauses in $Z_i$ "+
                  "other than the last has a literal $y_n$ which evaluates to $True$."
                  ,{left:0,top:130});

  zlabels[3].addClass("truecolor");
  zlabels[5].addClass("falsecolor");
  zlabels[9].addClass("truecolor");
  zlabels[11].addClass("falsecolor");
  zlabels[15].addClass("truecolor");
  zlabels[17].addClass("falsecolor");
  zlabels[21].addClass("truecolor");
  zlabels[23].addClass("falsecolor");
  zlabels[27].addClass("truecolor");
  zlabels[29].addClass("falsecolor");
  zlabels[33].addClass("truecolor");
  zlabels[36].addClass("falsecolor");
  label4.show();
  av.step();

  // Slide 36
  for(var i in zlabels){
    zlabels[i].removeClass("truecolor");
    zlabels[i].removeClass("falsecolor");
  }

  label1.hide();
  label3.hide();
  label4.hide();
  label1=av.label("<b>If $l_{i,j}$ $(where \\ j \\notin \\{1,2,k-1,k\\})$ is $True$</b>, "
                  +"set $y_1 \\cdots y_{j-2}$ to $True$ and $y_{j-1} \\cdots y_{k-3}$ to $False$."
                  ,{left:0,top:100});

  zlabels[19].addClass("truecolor");
  av.step ();

  // Slide 37
  label3=av.label("Let us call the clause in $Z_i$ containing "+
                  "$l_{i,j}$ in as $C$'.",{left:0,top:130});

  label6 = av.label("--------------------",{left:380,top:20});
  label7 = av.label("$C'$",{left:430,top:35});
  av.step();

  // Slide 38
  label4=av.label("The third term of all the clauses in $Z_i$ "+
                  "left to $C'$ has a literal $y_n$ ($where \\ n \\in \\{1..j-2\\}$) "
                  +"which evaluates to $True$.",{left:0,top:160});

  zlabels[3].addClass("truecolor");
  zlabels[5].addClass("falsecolor");
  zlabels[9].addClass("truecolor");
  zlabels[11].addClass("falsecolor");
  zlabels[15].addClass("truecolor");
  zlabels[17].addClass("falsecolor");
  av.step();

  // Slide 39
  label5=av.label("The first term of all the clauses in $Z_i$ "+
                  "right to $C'$ has a literal $\\overline{y_n}$ ($where \\ n \\in \\{j-1..k-3\\}$) "
                  +" which evaluates to $True$.",{left:0,top:210});

  zlabels[23].addClass("truecolor");
  zlabels[21].addClass("falsecolor");
  zlabels[29].addClass("truecolor");
  zlabels[27].addClass("falsecolor");
  zlabels[36].addClass("truecolor");
  zlabels[33].addClass("falsecolor");
  av.step();

  // Slide 40
  label8=av.label("<b>$Z_i$ has a satisfying assignment.</b>", {left: 0, top: 270});
  av.step();

  // Slide 41
  for(var i in zlabels){
    zlabels[i].removeClass("truecolor");
    zlabels[i].removeClass("falsecolor");
    zlabels[i].hide();
  }

  label1.hide();
  label3.hide();
  label4.hide();
  label5.hide();
  label6.hide();
  label7.hide();
  label8.hide();
  nl2.hide();
  nl3.hide();

  av.umsg("<br><b> Case 4a. When C<sub>i</sub> is satisfiable.</b>");
  nl3=av.label("Hence when $C_i$ is satisfiable, "+
               "$Z_i$ is satisfiable.",{top:40});

  av.step();

  // Slide 42
  nl3.hide();
  nl2.show();
  av.umsg("<br><b> Case 4b. When C<sub>i</sub> is not satisfiable.</b>");

  for(var i in zlabels){
    zlabels[i].show();
  }
  av.step();

  // Slide 43
  nl3=av.label("When $C_i$ is not satisfiable, NO literal in { "+
               "$l_i,1 \\cdots l_i,k$ } is $True$.",{top:70});

  zlabels[1].addClass("falsecolor");
  zlabels[7].addClass("falsecolor");
  zlabels[13].addClass("falsecolor");
  zlabels[19].addClass("falsecolor");
  zlabels[25].addClass("falsecolor");
  zlabels[31].addClass("falsecolor");
  zlabels[38].addClass("falsecolor");
  av.step();

  // Slide 44
  nl4=av.label("For $Z_i$ to be satisfiable, all its clauses "
               +"must evaluate to $True$.",{top:110});
  av.step();

  // Slide 45
  var nl5=av.label("For the first clause to be $True$, $y_1 = True.$"
                   ,{top:150});
  zlabels[3].addClass("truecolor");
  zlabels[5].addClass("falsecolor");
  av.step();

  // Slide 46
  var nl6=av.label("Now for the second clause to be $True$, $y_2 = True$."
                   ,{top:190});
  zlabels[9].addClass("truecolor");
  av.step();

  // Slide 47
  var nl7=av.label("Similarly for the third clause to be $True$, $y_3 = True$."
                   ,{top:230});
  av.step();

  // Slide 48
  var nl8=av.label("$y_3 = True \\Rightarrow y_4 = True \\cdots \\Rightarrow y_{j-2}"
                   +" = True \\Rightarrow y_{j-1} = True \\Rightarrow y_j = True \\cdots \\Rightarrow y_{k-4} "
                   +"= True \\Rightarrow y_{k-3} = True$.",{top:270});

  zlabels[11].addClass("falsecolor");
  zlabels[15].addClass("truecolor");
  zlabels[17].addClass("falsecolor");
  zlabels[21].addClass("truecolor");
  zlabels[23].addClass("falsecolor");
  zlabels[27].addClass("truecolor");
  zlabels[29].addClass("falsecolor");
  zlabels[33].addClass("truecolor");
  zlabels[36].addClass("falsecolor");
  av.step();

  // Slide 49
  var nl9=av.label("The last clause evaluates to $False$. <b> Hence $Z_i$"
                   +" is NOT SATISFIABLE</b>.",{top:310});
  av.step();

  // Slide 50
  for(var i in zlabels){
    zlabels[i].hide();
  }
  nl1.hide();
  nl2.hide();
  nl3.hide();
  nl4.hide();
  nl5.hide();
  nl6.hide();
  nl7.hide();
  nl8.hide();
  nl9.hide();

  av.umsg("<br><b>Case 4: Reduction of clauses containing more than three "+
          "literals.</b>");

  nl1=av.label("<b>Hence we have proved:</b>"
               +"<br><br>a. When $C_i$ is satisfiable., $Z_i$ is "
               +"satisfiable<br><br>b. When $C_i$ is not satisfiable., $Z_i$ "
               +"is not satisfiable",{top:20});
  av.step();

  // Slide 51
  nl1.hide();
  av.umsg("<br><b>Reduction of SAT to 3-SAT");
  nl1=av.label("Hence any clause in a SAT expression can be replaced by a"
               +" conjunction of clauses which contain 3 literals each."
               +"<br><br><br><b>Therefore, an instance of SAT can be reduced to an equivalent instance of 3-SAT"
               +" in polynomial time.</b>",{top:20});
  av.recorded();

});
