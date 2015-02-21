/*global ODSA, setPointerL */
//"use strict";
$(document).ready(function () {
//  var av = new JSAV(av_name);
  ODSA.AV.reset(true);

    $(".avcontainer").on("jsav-message" ,  function() {
      // invoke MathJax to do conversion again
      MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });
    $(".avcontainer").on("jsav-updatecounter" ,  function(){
      // invoke MathJax to do conversion again 
     MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

    var av = new JSAV($('.avcontainer')); var x,y,r; var gatelabel = new Array(7);

    var board = newCircuit();


    av.umsg("<b>Background</b>");

    label1 = av.label("The reduction shown in this slideshow relies heavily on the following identity:<br/> 'If and only if' (denoted by $\\leftrightarrow$) is a "+
    "boolean operator that follows the following truth table. <br><br>Let C = "
    +"A $\\leftrightarrow$ B",{left:0,top:-30});

    var data = [["A","B","C"], 
                ["T","T","T"], 
                ["T","F","F"], 
                ["F","T","F"],
                ["F","F","T"] ];

    var table1 = new av.ds.matrix(data,{style:"table",left:20,top:40});
  
    for(var i=0;i<3;i++) 
        table1.css(0,i,{"background-color":"Tan",opacity:0.5});


    label2 = av.label("A$\\leftrightarrow$B is equivalent to ($\\overline{A} + B$)."+
    "($A + \\overline{B}$).<br/>Check each line of the truth table to convince yourself that this is true.",{left:200,top:100});

    av.displayInit();
    av.step();

    av.umsg("<br/><br/>We will also use the following laws of boolean logic.", {preserve:true});
    label1.hide(); label2.hide();table1.hide();

    label2 = av.label("<b> Distributive Law</b>",{left:10,top:60});
    label3 = av.label("$A\\cdot (B + C) = A\\cdot B + A\\cdot C$",{left:40,top:80});
    label4 = av.label("$ A + B.C = (A+B).(A+C)$",{left:40,top:100});
    label5 = av.label("<b> DeMorgan's Law</b>",{left:10,top:140});
    label6 = av.label("$ \\overline{A.B} = \\overline{A} + \\overline{B}$",{left:40,top:160});
    label7 = av.label("$ \\overline{A+B} = \\overline{A}.\\overline{B}$",{left:40,top:180});

    av.step();

    label1.hide();
    label2.hide();
    label3.hide();
    label4.hide();
    label5.hide();
    label6.hide();
    label7.hide();

    av.umsg("<b>Reduction of Circuit-Satisfiability to SAT</b>" +
            "<br><br>Our reduction takes the following steps:" +
            "<br><br>1. Assign a variable $x_i$ for each input signal of a circuit." +
            "<br><br>2. Assign a variable (say $x_o$) for each output wire of a gate.");
    av.umsg("<br><br>3. Set up an 'if and only if' formula for each gate.", {preserve:true});
    av.umsg(" (NOTE: 'If and only if' can be expressed as a conjuntion of clauses.)",{preserve:true}); 
    av.umsg("<br>&nbsp;&nbsp;&nbsp;&nbsp;Let $F_k$ be the formula for "+
    "the $k$<sup>th</sup> gate.",{preserve:true}); 
    av.umsg("<br><br>4. Let $x_O$ be the final output wire of the "+
    "circuit.",{preserve:true});
    av.umsg("<br><br>&nbsp;&nbsp;&nbsp;&nbsp;The CNF formula is " +
            "$x_{o,f} . F_1 . F_2$ ... ",{preserve:true});
    av.step();

    av.umsg("<b>Reduction for NOT gate</b>"); 
    var notgate=board.addGate(av,"not",400,50,30); 
    notgate.css({"fill":"Tan"});

    label1 = av.label("x1",{left:350,top:10}); 
    label2 = av.label("x2",{left:450,top:10});
    av.step();
    label3 = av.label("The reduced CNF formula F  = ($x_2 \\leftrightarrow"
    +"\\overline{x_1}$)",{left:50,top:100}); 
    av.step();
    label4 = av.label(" = ($\\overline{x_1} + \\overline{x_2}$).($x_1 + x_2$) &nbsp;"+
    "&nbsp;&nbsp; which is a conjunction of clauses.",{left:240,top:130}); 
    av.step();
    label5 = av.label("Note: Since $x_2$ is the output of NOT on $x_1$,"
    +" $(x_2 \\leftrightarrow \\overline{x_1})$ (i.e. F) is always True.",
    {left:100,top:200});
    av.step();
    label6 = av.label("<b>NOT gate can be reduced to a CNF formula in "+
    "polynomial time</b>",{left:100,top:300});

    av.step();
 
    board.hide(notgate);
    label1.hide();label2.hide();label3.hide();label4.hide();label5.hide();
    label6.hide();
    av.umsg("<b>Reduction for AND gate</b>"); 
    var andgate=board.addGate(av,"and",400,50,30); 
    andgate.css({"fill":"Tan"});

    label1 = av.label("x1",{left:335,top:7}); 
    label2 = av.label("x2",{left:335,top:38}); 
    label3 = av.label("x3",{left:450,top:22});
    av.step();
    label4 = av.label("The reduced CNF formula F  = ($x_3 \\leftrightarrow$"
    +"$x_1 . x_2$)",{left:50,top:100}); 
    av.step();
    label5 = av.label(" = ($\\overline{x_1.x_2} + x_3$).($\\overline{x_3} + "+
    "x_1.x_2$)",{left:240,top:130}); 
    label6 = av.label(" = ($\\overline{x_1} + \\overline{x_2} + x_3$)."+
    "($\\overline{x_3} + x_1$).($\\overline{x_3} + x_2$)."+
    "<br><br>&nbsp;&nbsp;&nbsp; which is a conjunction of clauses."
    ,{left:240,top:160}); 
    av.step();
    label7 = av.label("Note: &nbsp; Since $x_3$ is the output of AND on $x_1$"
    +" and $x_2$, $(x_3 \\leftrightarrow x_1.x_2)$ (i.e. F) is always True."
    ,{left:100,top:250});

    av.step();

    label1.hide();label2.hide();label3.hide();label4.hide();label5.hide();
    label6.hide(); label7.hide();
    av.umsg("<b>Reduction for AND gate with 3 inputs.</b>");
    andgate["input"][1].show();
    
    label1 = av.label("x1",{left:335,top:7}); 
    label2 = av.label("x2",{left:335,top:22});
    label3 = av.label("x3",{left:335,top:38}); 
    label4 = av.label("x4",{left:450,top:22});
    
    av.step();
    label5 = av.label("The reduced CNF formula F  = ($x_4 \\leftrightarrow$"
    +"$x_1 . x_2 . x_3$)",{left:50,top:100}); 
    av.step();
    label6 = av.label(" = ($x_4 + \\overline{x_1.x_2.x_3}$).($\\overline{x_4}+"
    +"x_1.x_2.x_3$)",{left:240,top:130}); 
    label7 = av.label(" = ($x_4 + \\overline{x_1} + \\overline{x_2}+ "+
    "\\overline{x_3}$).($\\overline{x_4} + x_1$).($\\overline{x_4} + x_2$).("+
    "($\\overline{x_4} +x_3$) <br><br>&nbsp;&nbsp;&nbsp; which is a conjunction"
    +" of clauses.",{left:240,top:160}); 
    av.step();
    label8 = av.label("Note: &nbsp; Since $x_4$ is the output of AND on $x_1$"
    +" $x_2$ and $x_3$, $(x_4 \\leftrightarrow x_1.x_2.x_3)$ (i.e. F) is always True."
    ,{left:100,top:250});
    av.step();
    label9 = av.label("<b>AND gate with any number of input wires"+
    " can be reduced to a similar CNF formula in polynomial time</b>",
    {left:100,top:300});
    av.step();

    
    board.hide(andgate);
    label1.hide();label2.hide();label3.hide();label4.hide();label5.hide();
    label6.hide(); label7.hide();label8.hide();label9.hide();


    av.umsg("<b>Reduction for OR gate.</b>");
    var orgate=board.addGate(av,"or",400,50,30); 
    orgate.css({"fill":"Tan"});
    label1 = av.label("x1",{left:320,top:7}); 
    label2 = av.label("x2",{left:320,top:38}); 
    label3 = av.label("x3",{left:450,top:22});
    av.step();
    label4 = av.label("The reduced CNF formula F  = ($x_3 \\leftrightarrow$"
    +"$(x_1 + x_2)$)",{left:50,top:100}); 
    av.step();
    label5 = av.label(" = ($x_3 + (\\overline{x_1+x_2})$).($\\overline{x_3}+"
    +"(x_1+x_2$))",{left:240,top:130}); 
    label6 = av.label(" = ($x_3 + \\overline{x_1}.\\overline{x_2}$)"
    +".($x_3+x_1+x_2$)",{left:240,top:160}); 
    av.step();
    label7 = av.label(" = ($x_3 + \\overline{x_1}$).($x_3 + \\overline{x_2}$)."+
    ".($x_3 + x_1 + x_2$)"+
    "<br><br>&nbsp;&nbsp;&nbsp; which is a conjunction of clauses."
    ,{left:240,top:190}); 
    av.step();
    label8 = av.label("Note: &nbsp; Since $x_3$ is the output of OR on $x_1$"
    +" and $x_2$, $(x_4 \\leftrightarrow (x_1+x_2))$ (i.e. F) is always True."
    ,{left:100,top:250});

    av.step();

    label1.hide();label2.hide();label3.hide();label4.hide();label5.hide();
    label6.hide(); label7.hide();label8.hide();
    orgate["input"][1].show();
    
    label1 = av.label("x1",{left:320,top:7}); 
    label2 = av.label("x2",{left:320,top:22});
    label3 = av.label("x3",{left:320,top:38}); 
    label4 = av.label("x4",{left:450,top:22});
    av.step();
    label5 = av.label("The reduced CNF formula F  = ($x_4 \\leftrightarrow$"
    +"$(x_1 + x_2 + x_3)$)",{left:50,top:100}); 
    av.step();
    label6 = av.label(" = ($x_4 + (\\overline{x_1+x_2+x_3})$).($\\overline{x_4}+"
    +"(x_1+x_2+x_3$))",{left:240,top:130}); 
    label7 = av.label(" = ($x_4 + \\overline{x_1}.\\overline{x_2}.\\overline"
    +"{x_3}$).($x_4+x_1+x_2+x_3$)",{left:240,top:160}); 
    label8 = av.label(" = ($x_4 + \\overline{x_1}$).($x_4 + \\overline{x_2}$)."+
    "($x_4 +\\overline{x_3}$).($x_4 + x_1 + x_2 + x_3$)"+
    "<br><br>&nbsp;&nbsp;&nbsp; which is a conjunction of clauses."
    ,{left:240,top:190}); 

    av.step();
    label9 = av.label("Note: &nbsp; Since $x_4$ is the output of OR on $x_1$"
    +" $x_2$ and $x_3$, $(x_4 \\leftrightarrow (x_1+x_2+x_3))$ (i.e. F) is always True."
    ,{left:100,top:250});
  
    av.step();
    label10 = av.label("<b>OR gate with any number of input wires"+
    " can be reduced to a similar CNF formula in polynomial time</b>",
    {left:100,top:300});
    av.step();

    board.hide(orgate);
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

    av.umsg("<br><br><b>Reduction of Circuit-Satisfiability to SAT</b>"); 

    av.umsg("<br><br>Hence each gate in the circuit (with n gates) can be reduced to a CNF "+
    "formula F in polynomial time",{preserve:true});
    av.umsg("<br><br>If x<sub>O</sub> be the variable corresponding to the "
    +"final output of the circuit, and F,sub>k</sub> is the CNF formula for"
    +"gate k, the circuit can be reduced to the CNF formula : x<sub>O</sub>" 
    +" . F<sub>1</sub> . F<sub>2</sub> ... F<sub>n</sub>",{preserve:true});

    av.step(); 
    av.umsg("<b>Example Circuit</b>"); 
    x = 100; y = 20; r = 25;

    var x1pos = [x-50,y-0.4*r]; 
    var x2pos = [x-50,y+0.4*r]; 
    var x3pos = [x-50,y+150];

    board.addSignals(["x1","x2","x3"]); 
    xlabel1 =av.label("x1",{left:20,top:-15}); 
    xlabel2 = av.label("x2",{left:20,top:5});
    xlabel3 = av.label("x3",{left:20,top:y+125}); 
    var gate1=board.addGate(av,"not",x,y+150,r); 
    gatelabel[0] = av.label("A",{left:x-7,top:y+125});

    x+=100; 
    var gate2=board.addGate(av,"or",x,y,r); 
    gatelabel[1] =  av.label("B",{left:x-7,top:y-25});

    x+=50; 
    var gate3=board.addGate(av,"not",x,y+75,r); 
    gatelabel[2] = av.label("C",{left:x-7,top:y+50});

    var gate4=board.addGate(av,"and",x,y+150,r); 
    gate4.input[1].show();
    gate4.input[1].removeClass("invisible"); 
    gatelabel[3] =
    av.label("D",{left:x-7,top:y+125});

    x+=100; 
    var gate5=board.addGate(av,"or",x,y+37,r); 
    gatelabel[4] = av.label("E",{left:x-7,top:y+12});

    var gate6=board.addGate(av,"or",x,y+112,r);   
    gatelabel[5] = av.label("F",{left:x-7,top:y+87});

    x+=100; 
    var gate7=board.addGate(av,"and",x,y+140,r); 
    gate7.input[1].show();
    gate7.input[1].removeClass("invisible"); 
    gatelabel[6] =  av.label("G",{left:x-7,top:y+115});
    

    //connect gates
    board.inputToGate(av,"x1",x1pos,gate2,0,[]);
    board.inputToGate(av,"x1",x1pos,gate4,0,[[x1pos[0]+100,x1pos[1]],
    [x1pos[0]+100,y+150-0.4*r]]);
    board.inputToGate(av,"x2",x2pos,gate4,2,[[x2pos[0]+110,x2pos[1]],
    [x2pos[0]+110,y+150+0.4*r]]);
    board.inputToGate(av,"x2",x2pos,gate2,2,[]);
    board.inputToGate(av,"x3",x3pos,gate1,0,[]); 


    board.connectGates(av,gate1,gate4,1,[]);
    board.connectGates(av,gate1,gate3,0,[[x3pos[0]+120,x3pos[1]],
    [x1pos[0]+120,y+75]]);
  
    var startpt = gate2.endpoints[gate2.endpoints.length - 1].slice(0); 
    var endpt= gate5.endpoints[0].slice(0); 
    board.connectGates(av,gate2,gate5,0,[[(endpt[0] + startpt[0])/2,
    startpt[1]],[(endpt[0] + startpt[0])/2,endpt[1]]]); 

    startpt = gate3.endpoints[gate3.endpoints.length - 1].slice(0);

    endpt = gate5.endpoints[2].slice(0);
    board.connectGates(av,gate3,gate5,2,[[(endpt[0] + startpt[0])/2,
    startpt[1]],[(endpt[0] + startpt[0])/2,endpt[1]]]); 
  
    endpt = gate6.endpoints[0].slice(0);

    board.connectGates(av,gate3,gate6,0,[[(endpt[0] + startpt[0])/2,
    startpt[1]],[(endpt[0] + startpt[0])/2,endpt[1]]]); 

    startpt = gate4.endpoints[gate4.endpoints.length - 1].slice(0);

    endpt = gate7.endpoints[2].slice(0);
    board.connectGates(av,gate4,gate7,2,[]);

    endpt = gate6.endpoints[2].slice(0);

    board.connectGates(av,gate4,gate6,2,[[(endpt[0] + startpt[0])/2,
    startpt[1]],[(endpt[0] + startpt[0])/2,endpt[1]]]); 

    startpt = gate6.endpoints[gate6.endpoints.length - 1].slice(0); 
    endpt = gate7.endpoints[1].slice(0);
    board.connectGates(av,gate6,gate7,1,[[endpt[0]-10,startpt[1]],
    [endpt[0]-10,endpt[1]]]); 

    startpt = gate5.endpoints[gate5.endpoints.length - 1].slice(0); 
    endpt = gate7.endpoints[0].slice(0);

    board.connectGates(av,gate5,gate7,0,[[endpt[0],startpt[1]]]); 

    var numlabels = new Array(10);

    numlabels[0] = av.label("x4",{left:130,top:135}); 
    numlabels[1] = av.label("x5",{left:235,top:-15}); 
    numlabels[2] = av.label("x6",{left:280,top:60}); 
    numlabels[3] = av.label("x7",{left:275,top:135}); 
    numlabels[4] = av.label("x8",{left:385,top:22}); 
    numlabels[5] = av.label("x9",{left:385,top:95}); 
    numlabels[6] = av.label("x10",{left:490,top:130});


    av.step();
    numlabels[6].css({color:"Maroon"});
    var labels = new Array(15);
    label1 = av.label("This circuit can be reduced to:",{left:0,top:200});
    labels[0] = av.label("$x_{10}$",{left:0,top:230}).css({color:"Maroon","font-size":"125%"});
    av.step();
    gate1.css({"fill":"Blue",opacity:0.5});
    labels[1] = av.label(".",{left:25,top:230}).css({"font-size":"125%"});
    labels[2] = av.label("($x_4 \\leftrightarrow \\overline{x_3}$)",{left:30,top:230}).css({color:"Blue",opacity:0.75,"font-size":"125%"});
    av.step();
    gate2.css({"fill":"DarkCyan",opacity:0.5});
    labels[3] = av.label(".",{left:110,top:230}).css({"font-size":"125%"});
    labels[4] = av.label("($x_5 \\leftrightarrow (x_1 + x_2)$)",{left:120,top:230}).css({color:"DarkCyan",opacity:0.75,"font-size":"125%"});
    av.step();
    gate3.css({"fill":"BlueViolet",opacity:0.5});
    labels[5] = av.label(".",{left:255,top:230}).css({"font-size":"125%"});
    labels[6] = av.label("($x_6 \\leftrightarrow \\overline{x_4}$)",{left:260,top:230}).css({color:"BlueViolet",opacity:0.75,"font-size":"125%"});
    av.step();
    gate4.css({"fill":"DarkSlateGray",opacity:0.5});
    labels[7] = av.label(".",{left:340,top:230}).css({"font-size":"125%"});
    labels[8] = av.label("($x_7 \\leftrightarrow (x_1.x_2.x_4)$)",{left:345,top:230}).css({color:"DarkSlateGray",opacity:0.75,"font-size":"125%"});
    av.step();
    gate5.css({"fill":"MediumVioletRed",opacity:0.5});
    labels[9] = av.label(".",{left:495,top:230}).css({"font-size":"125%"});
    labels[10] = av.label("($x_8 \\leftrightarrow (x_5+x_6)$)",{left:500,top:230}).css({color:"MediumVioletRed",opacity:0.75,"font-size":"125%"});
    av.step();
    gate6.css({"fill":"SaddleBrown",opacity:0.5});
    labels[11] = av.label(".",{left:635,top:230}).css({"font-size":"125%"});
    labels[12] = av.label("($x_9 \\leftrightarrow (x_7+x_6)$)",{left:640,top:230}).css({color:"SaddleBrown",opacity:0.75,"font-size":"125%"});
    av.step();
    gate7.css({"fill":"Orange",opacity:0.5});
    labels[13] = av.label(".",{left:775,top:230}).css({"font-size":"125%"});
    labels[14] = av.label("($x_{10} \\leftrightarrow (x_7.x_8.x_9)$)",{left:0,top:250}).css({color:"Orange",opacity:0.75,"font-size":"125%"});

    av.step();

    label2 = av.label("<b>Each of these 'if and only if' formulae can be rewritten as equivalent CNF formulae as shown in earlier slides.</b>",{left:20,top:300});
    av.step();

    board.hide();
    for(i in gatelabel)
	gatelabel[i].hide();
    for(i in numlabels)
	numlabels[i].hide();
    for(i in labels)
	labels[i].hide();
    xlabel1.hide();
    xlabel2.hide();
    xlabel3.hide();
    label1.hide(); label2.hide();

    av.umsg("<br><br><b>SAT and Circuit Satisfiability</b>");
    
    av.umsg("<br><br> The reduced CNF formula for a circuit with n gates is of the form x<sub>O</sub> . F<sub>1</sub>. F<sub>2</sub> . ... F<sub>n</sub> where F<sub>k</sub> is the CNF formula corresponding to the k<sup>th</sup>gate.",{preserve:true});
    av.umsg("<br><br><b>1. If the circuit is satisfiable</b>",{preserve:true});
    av.umsg("<br><br>The gates in a circuit perform a well defined function causing the F<sub>k</sub> formulae to be aways True. ",{preserve:true});
    av.umsg("Since the circuit is satisfiable, its final output x<sub>O</sub> evaluates to True. Hence with al clauses satisfied, the reduced CNF formula also evaluates to True.",{preserve:true});
    av.umsg("<br><b>The CNF formula is also satisfiable</b>",{preserve:true});
    av.umsg("<br><br><b>2. If the CNF formula is satisfiable</b>",{preserve:true});
    av.umsg("<br><br> For the CNF formula to be satisfiable, all the clauses must be True. Hence all the 'if and only if' formulae of the form F<sub>k</sub> will also need to be True. This preserves the functionality of all corresponding gates in the circuit. Also the output X<sub>0</sub> is True.",{preserve:true});
    av.umsg("<br><b>The circuit is also satisfiable</b>",{preserve:true});
   av.recorded();

});
