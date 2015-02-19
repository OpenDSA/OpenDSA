/*global ODSA, setPointerL */
//"use strict";
$(document).ready(function () {
//  var av = new JSAV(av_name);
    $(".avcontainer").on("jsav-message" ,  function() {
      // invoke MathJax to do conversion again
      MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
    });
    $(".avcontainer").on("jsav-updatecounter" ,  function(){
      // invoke MathJax to do conversion again 
     MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

    var av = new JSAV($('.avcontainer'));
  
  var label1, label2 , label3, label4, label5, label6,label7,label8,label9;

  // Slide 1
  var y = 0;
  av.umsg("<br><br><b>Boelan Expressions</b>");
  av.umsg("<br><br>Boolean variables : x<sub>1</sub> , x<sub>2</sub> , "
  +"x<sub>3</sub> ...",{preserve:true});
  av.umsg("<br><br>Boolean operators: AND (+) , OR (.), NOT (^)",
  {preserve:true});
  av.umsg("<br><br>Boolean expressions/Propositional logic formula :"+ 
  "x<sub>1</sub> + x<sub>2</sub> . x<sub>3</sub> ",{preserve:true});
  av.displayInit();

  // Slide 2
  av.umsg("<b>CNF</b>");
  av.umsg("<br><br><b>A <i>literal</i> is either a boolean variable (x) or "
  +"its negation (^x) </b>",{preserve:true}); 

  av.umsg("<br><br>For e.g. : a , ^b , ^g , c , ^c , ^e ... ",{preserve:true});

  av.umsg("<br><br><b>A <i>clause</i> is disjunction (OR) of literals i.e. of "
  +"the form  l<sub>1</sub> + l<sub>2</sub> + l<sub>3</sub> + ... +"+
  "l<sub>n</sub> for some literal l<sub>i</sub></b>",{preserve:true}); 

  av.umsg("<br><br>For e.g. :&nbsp&nbsp&nbsp&nbsp (a + ^b) , &nbsp&nbsp&nbsp"
  +"&nbsp ^g , &nbsp&nbsp&nbsp&nbsp (c + ^f + ^e + h), &nbsp&nbsp&nbsp&nbsp "
  +"... ",{preserve:true});

  av.umsg("<br><br><b>A <i>Conjunctive normal form (CNF)</i> is a conjunction "
  +"(AND) of clauses.</b>",{preserve:true}); 

  av.umsg("<br><br>For e.g.: &nbsp&nbsp&nbsp&nbsp^x<sub>1</sub> . ("+
  "x<sub>1</sub> + x<sub>2</sub>) . (x<sub>3</sub> + x<sub>4</sub> + "+
  "^x<sub>5</sub>)",{preserve:true}); 

  av.umsg("<br><br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp(x<sub>1</sub> + "
  +"x<sub>3</sub>) . (^x<sub>3</sub> + x<sub>2</sub> + ^x<sub>5</sub>) . "+
  "(x<sub>1</sub> + x<sub>2</sub> + ^x<sub>3</sub>) . (x<sub>3</sub> + "+
  "x<sub>4</sub> + ^x<sub>2</sub>) . (^x<sub>4</sub> + ^x<sub>1</sub> + "+
  "^x<sub>5</sub>) . (x<sub>1</sub> + x<sub>3</sub> + x<sub>5</sub>)",{preserve:true}); 
  av.step();

  // Slide 3
  av.umsg("<b>Satisfiability</b>");
  y=0;
  
  label1 = av.label("A formula is said to be <b>satisfiable</b> if it can be made TRUE by some assignment of variables.",{top: y,left:50}).css({"text-align": "center"});
  label1.show(); 
  y = y+ 50;
  label2 = av.label("For e.g. (x<sub>1</sub> + x<sub>2</sub> . x<sub>3</sub>) is TRUE for x<sub>1</sub>=TRUE , x<sub>2</sub>=TRUE, x<sub>3</sub>=TRUE , hence satisfiable.",{top: y,left:50}).css({"text-align": "center"});
  label2.show(); 
  y = y+ 50;
  label3 = av.label("(x<sub>1</sub> . ^x<sub>1</sub>) is  always FALSE, hence not satisfiable.",{top: y,left:50}).css({"text-align": "center"});
  label3.show(); 
  av.step();

  // Slide 4
  av.umsg("<b>SAT</b>");
  y=0;
  label1.hide();
  label2.hide();
  label3.hide();
 
  label1 = av.label("The <b>Boolean satisfiability problem (SAT)</b> is, given a formula, to check whether it is satisfiable.",{top: y,left:50}).css({"text-align": "center"}); 
  label1.show();
  av.step();

  //slide 5 : Is the following formula satisfiable?
  label1.hide();
  label2.hide();

  y = 0;
   
//  label1 = av.label("P = ($x_1$ + $x_2$).($x_2$ + ^$x_3$ + $x_4$).($x_1$ + ^$x_2$ + $x_3$ + $x_4$).(^$x_1$ + $x_3$)",{top: y-30,left:0}).css({"text-align": "center"}); 
 av.umsg("<b>Example of SAT</b>" +
         "<br/><br/>P = $(x_1 + x_2).(x_2 + \\overline{x_3} + x_4).(x_1 + \\overline{x_2} + x_3 + x_4).(\\overline{x_1} + x_3)$ is the expression.");
//  label1.show();
  label2 = av.label("Truth Table for P",{top: y+20,left:150}).css({"text-align": "center"}); 
  label2.show();
  var matdata=[["$x_1$","$x_2$","$x_3$</sub>","$x_4$","P"],
               ["F","F","F","F","F"],
               ["F","F","F","T","F"],
               ["F","F","T","F","F"],
               ["F","F","T","T","F"],
               ["F","T","F","F","F"],
               ["F","T","F","T","T"],
               ["F","T","T","F","T"],
               ["F","T","T","T","T"]];
  var matdata1=[["x<sub>1</sub>","x<sub>2</sub>","x<sub>3</sub>","x<sub>4</sub>","P"],
                ["T","F","F","F","F"],
                ["T","F","F","T","F"],
                ["T","F","T","F","F"],
                ["T","F","T","T","T"],
                ["T","T","F","F","F"],
                ["T","T","F","T","F"],
                ["T","T","T","F","T"],
                ["T","T","T","T","T"]];

  

  var mat1 = new av.ds.matrix(matdata,{autoresize:false,style:"table",left:50,top:y+50});
  var mat2= new av.ds.matrix(matdata1,{style:"table",left:250,top:y+50});

  for(var j=0; j<5 ; j++)
      mat1.css(0,j,{"background-color":"Tan",opacity:0.5});
  for(var j=0; j<5 ; j++)
      mat2.css(0,j,{"background-color":"Tan",opacity:0.5});

  av.step();
  for (var i=1; i< 9; i++){
	if (matdata[i][4] == "F"){
		for(var j=0; j<5 ; j++)
			mat1.css(i,j,{"background-color":"#CC3333"});
	}
	else{
		for(var j=0; j<5 ; j++)
			mat1.css(i,j,{"background-color":"#669966"});
	}

	if (matdata1[i][4] == "F"){
		for(var j=0; j<8 ; j++)
			mat2.css(i,j,{"background-color":"#CC3333"});
	}
	else{
		for(var j=0; j<8 ; j++)
			mat2.css(i,j,{"background-color":"#669966"});
	}
	
  }
  mat1.show();
  mat2.show();

    av.step();
    label4 = av.label("There exists assignments that makes the formula true "+
    "(The green rows)",{top:y+120,left:550})
    av.step();

  label3 = av.label("P is satisfiable",{top: y+175,left:550}).css({"text-align": "center", "font-size": "20px"}); 
  label3.show();


//slide 8
  av.step();
  mat1.hide();
  mat2.hide();
//  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();

  av.umsg("<b>Example of SAT</b>");
  y = 0;

   
  label1 = av.label("P = ($x_1$ + $x_2$).($x_2$ + ^$x_3$ + $x_4$).($x_3$ + ^$x_4$).($x_1$ + ^$x_1$).($x_1$ + ^$x_2$ + $x_3$ + $x_4$)",{top: y-30,left:0}).css({"text-align": "center"}); 


  label1.show();
  label2 = av.label("Truth Table for P",{top: y+20,left:150}).css({"text-align": "center"}); 
  label2.show();

   var matdata2=[["x<sub>1</sub>","x<sub>2</sub>","x<sub>3</sub>","x<sub>4</sub>","P"],
                 ["F","F","F","F","F"],
                 ["F","F","F","T","F"],
                 ["F","F","T","F","F"],
                 ["F","F","T","T","F"],
                 ["F","T","F","F","F"],
                 ["F","T","F","T","F"],
                 ["F","T","T","F","F"],
                 ["F","T","T","T","F"]];
   var matdata3=[["x<sub>1</sub>","x<sub>2</sub>","x<sub>3</sub>","x<sub>4</sub>","P"],
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
      mat3.css(0,j,{"background-color":"Tan",opacity:0.5});
  for(var j=0; j<5 ; j++)
      mat4.css(0,j,{"background-color":"Tan",opacity:0.5});

  av.step();
  for ( var k=1; k< 9; k++){
	for(var l=0; l<5 ; l++){
		mat3.css(k,l,{"background-color":"#CC3333"});
		mat4.css(k,l,{"background-color":"#CC3333"});
	}
	
  }
  mat3.show();
  mat4.show();
//slide 9
    av.step();
    label4 = av.label("There does not exist any assignment that makes the formula true "+
    "(No green rows)",{top:y+120,left:550})
    av.step();

  label3 = av.label("P is non satisfiable",{top: y+175,left:550}).css({"text-align": "center", "font-size": "20px"}); 
  label3.show();


  av.step();
  mat3.hide();
  mat4.hide();
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  av.umsg("<b>Insights</b>");
  av.umsg("<br><br><br><br>Size of the truth table is 2<sup>n</sup> where n is the "
  +"number of boolean variables involved ",{preserve:true}); 
  av.umsg("<br><br>Hence the problem gets exponentially harder as number of variables"
  +" increase ",{preserve:true}); 

  av.recorded();
});
