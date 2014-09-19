/*global ODSA, setPointerL */
//"use strict";
$(document).ready(function () {
//  var av = new JSAV(av_name);
  var av = new JSAV($('.avcontainer'));
  
  var label1, label2 , label3, label4, label5, label6,label7,label8,label9;
  //slide2
  var y = 0;
  av.umsg("<b>Boelan Expressions</b>");
  label1 = av.label("Boolean variables : x<sub>1</sub> , x<sub>2</sub> , x<sub>3</sub> ...",{top: y,left:50}).css({"text-align": "center"});
  label1.show(); 
  y = y+50;
  label2=av.label("Boolean operators: AND (+) , OR (.), NOT (^)",{top: y,left:50}).css({"text-align": "center"});
  label2.show(); 
  y = y+50;
  label3 = av.label("Boolean expressions/Propositional logic formula : x<sub>1</sub> + x<sub>2</sub> . x<sub>3</sub> ",{top: y,left:50}).css({"text-align": "center"});
  label3.show(); 
  y = y+ 50;

//slide 3
  av.step();
  label1.hide();
  label2.hide();
  label3.hide();

  av.umsg("<b>CNF</b>");
  y=0;
  label1.hide();
 

  label2 = av.label("<b>A <i>literal</i> is either a boolean variable (x) or its negation (^x) </b>",{top: y,left:50}).css({"text-align": "center"}); 
  label2.show();

  y=y+30;
  label7 = av.label("For e.g. : a , ^b , ^g , c , ^c , ^e ... ",{top: y,left:50}).css({"text-align": "center"});
  label7.show();

    
  y=y+50;
  label3 = av.label("<b>A <i>clause</i> is disjunction (OR) of literals i.e. of the form  l<sub>1</sub> + l<sub>2</sub> + l<sub>3</sub> + ... +l<sub>n</sub> for some literal l<sub>i</sub></b>",{top: y,left:50}).css({"text-align": "center"}); 
  label3.show();

  y=y+30;
  label8 = av.label("For e.g. :&nbsp&nbsp&nbsp&nbsp (a + ^b) , &nbsp&nbsp&nbsp&nbsp ^g , &nbsp&nbsp&nbsp&nbsp (c + ^f + ^e + h), &nbsp&nbsp&nbsp&nbsp ... ",{top: y,left:50}).css({"text-align": "center"});
  label8.show();

  y=y+50;
  label1 = av.label("<b>A <i>Conjunctive normal form (CNF)</i> is a conjunction (AND) of clauses.</b>",{top: y,left:50}).css({"text-align": "center"}); 
  label1.show();

    
  y=y+30;
  label4 = av.label("For e.g.: &nbsp&nbsp&nbsp&nbsp^x<sub>1</sub>",{top: y,left:50}).css({"text-align": "center"}); 
  label4.show();
 
  y=y+30;
  label6 = av.label("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp(x<sub>1</sub> + x<sub>2</sub>) . (x<sub>3</sub> + x<sub>4</sub> + ^x<sub>5</sub>)",{top: y,left:50}).css({"text-align": "center"}); 
  label6.show();

  y=y+30;
  label5 = av.label("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp(x<sub>1</sub> + x<sub>3</sub>) . (^x<sub>3</sub> + x<sub>2</sub> + ^x<sub>5</sub>) . (x<sub>1</sub> + x<sub>2</sub> + ^x<sub>3</sub>) . (x<sub>3</sub> + x<sub>4</sub> + ^x<sub>2</sub>) . (^x<sub>4</sub> + ^x<sub>1</sub> + ^x<sub>5</sub>) . (x<sub>1</sub> + x<sub>3</sub> + x<sub>5</sub>)",{top: y,left:50}).css({"text-align": "center"}); 
  label5.show();

 //slide 4 
  
  av.step();
  av.umsg("<b>Satisfiability</b>");
  y=0;
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  label5.hide();
  label6.hide();
  label7.hide();
  label8.hide();
  
  label1 = av.label("A formula is said to be <b>satisfiable</b> if it can be made TRUE by some assignment of variables.",{top: y,left:50}).css({"text-align": "center"});
  label1.show(); 
  y = y+ 50;
  label2 = av.label("For e.g. (x<sub>1</sub> + x<sub>2</sub> . x<sub>3</sub>) is TRUE for x<sub>1</sub>=TRUE , x<sub>2</sub>=TRUE, x<sub>3</sub>=TRUE , hence satisfiable.",{top: y,left:50}).css({"text-align": "center"});
  label2.show(); 
  y = y+ 50;
  label3 = av.label("(x<sub>1</sub> . ^x<sub>1</sub>) is  always FALSE, hence not satisfiable.",{top: y,left:50}).css({"text-align": "center"});
  label3.show(); 
 
  // slide 4
  av.step();
  av.umsg("<b>SAT</b>");
  y=0;
  label1.hide();
  label2.hide();
  label3.hide();
 
  label1 = av.label("The <b>Boolean satisfiability problem (SAT)</b> is, given a formula, to check whether it is satisfiable.",{top: y,left:50}).css({"text-align": "center"}); 
  label1.show();

//slide 5

  av.step();
  av.umsg("<b>3 - SAT</b>");

  y=0;
  label1.hide();
   

  label1 = av.label("<b>3 SAT </b>",{top: y,left:50}).css({"text-align": "center"}); 
  label1.show();

  y=y+50;
  label2 = av.label("Problem Definition: Given any Boolean expression in CNF such that each clause has exactly 3 literals , is the expression satisfiable?",{top: y,left:50}).css({"text-align": "center"}); 
  label2.show();

//slide 6 : Is the following formula satisfiable ?
  av.step();
  av.umsg("<b>Example of 3 - SAT</b>");
  label1.hide();
  label2.hide();

  y = 0;

   
  label1 = av.label("<b>P = (x<sub>1</sub> + x<sub>2</sub> + x<sub>3</sub>) . (x<sub>4</sub> + ^x<sub>2</sub> + ^x<sub>1</sub>) . (x<sub>3</sub> + ^x<sub>2</sub> + x<sub>1</sub>) . (^x<sub>3</sub> + x<sub>4</sub> + x<sub>1</sub>) . (^x<sub>4</sub> + ^x<sub>2</sub> + ^x<sub>1</sub>) . (x<sub>1</sub> + x<sub>4</sub> + x<sub>3</sub>) . (x<sub>3</sub> + x<sub>2</sub> + x<sub>4</sub>)</b>",{top: y-30,left:0}).css({"text-align": "center"}); 

  label1.show();
  label2 = av.label("Truth Table for P",{top: y+20,left:150}).css({"text-align": "center"}); 
  label2.show();

  label3 = av.label("P is satisfiable",{top: y+175,left:550}).css({"text-align": "center", "font-size": "20px"}); 
  label3.show();

  var matdata=[["x<sub>1</sub>","x<sub>2</sub>","x<sub>3</sub>","x<sub>4</sub>","P"],["0","0","0","0","0"],["0","0","0","1","0"],["0","0","1","0","0"],["0","0","1","1","1"],["0","1","0","0","0"],["0","1","0","1","0"],["0","1","1","0","0"],["0","1","1","1","1"]];
  var matdata1=[["x<sub>1</sub>","x<sub>2</sub>","x<sub>3</sub>","x<sub>4</sub>","P"],["1","0","0","0","0"],["1","0","0","1","1"],["1","0","1","0","1"],["1","0","1","1","1"],["1","1","0","0","0"],["1","1","0","1","0"],["1","1","1","0","0"],["1","1","1","1","0"]];

  

  var mat1 = new av.ds.matrix(matdata,{style:"table",left:50,top:y+50});
  var mat2= new av.ds.matrix(matdata1,{style:"table",left:250,top:y+50});
  for (var i=1; i< 9; i++){
	if (matdata[i][4] == 0){
		for(var j=0; j<5 ; j++)
			mat1.css(i,j,{"background-color":"red"});
	}
	else{
		for(var j=0; j<5 ; j++)
			mat1.css(i,j,{"background-color":"green"});
	}

	if (matdata1[i][4] == 0){
		for(var j=0; j<8 ; j++)
			mat2.css(i,j,{"background-color":"red"});
	}
	else{
		for(var j=0; j<8 ; j++)
			mat2.css(i,j,{"background-color":"green"});
	}
	
  }
  mat1.show();
  mat2.show();

//slide 8
  av.step();
  mat1.hide();
  mat2.hide();
  label1.hide();
  label2.hide();
  label3.hide();
  av.umsg("<b>Example of 3 - SAT</b>");
  label1.hide();
  label2.hide();

  y = 0;

   
  label1 = av.label("<b>P = (x<sub>1</sub> + x<sub>2</sub> + x<sub>3</sub>) . (x<sub>1</sub> + ^x<sub>3</sub> + ^x<sub>4</sub>) . (^x<sub>1</sub> + x<sub>3</sub> + x<sub>4</sub>) . (^x<sub>2</sub> + x<sub>4</sub> + ^x<sub>3</sub>) . (x<sub>1</sub> + ^x<sub>2</sub> + x<sub>3</sub>) . (x<sub>2</sub> + ^x<sub>3</sub> + x<sub>4</sub>) . (^x<sub>1</sub> + ^x<sub>2</sub> + ^x<sub>4</sub>) . (^x<sub>1</sub> + x<sub>2</sub> + ^x<sub>4</sub>)</b>",{top: y-30,left:0}).css({"text-align": "center"}); 

  label1.show();
  label2 = av.label("Truth Table for P",{top: y+20,left:150}).css({"text-align": "center"}); 
  label2.show();

  label3 = av.label("P is non satisfiable",{top: y+175,left:550}).css({"text-align": "center", "font-size": "20px"}); 
  label3.show();

   var matdata2=[["x<sub>1</sub>","x<sub>2</sub>","x<sub>3</sub>","x<sub>4</sub>","P"],["0","0","0","0","0"],["0","0","0","1","0"],["0","0","1","0","0"],["0","0","1","1","0"],["0","1","0","0","0"],["0","1","0","1","0"],["0","1","1","0","0"],["0","1","1","1","0"]];
   var matdata3=[["x<sub>1</sub>","x<sub>2</sub>","x<sub>3</sub>","x<sub>4</sub>","P"],["1","0","0","0","0"],["1","0","0","1","0"],["1","0","1","0","0"],["1","0","1","1","0"],["1","1","0","0","0"],["1","1","0","1","0"],["1","1","1","0","0"],["1","1","1","1","0"]];


   var mat3 = new av.ds.matrix(matdata2,{style:"table",left:50,top:y+50});
   var mat4= new av.ds.matrix(matdata3,{style:"table",left:250,top:y+50});
  for ( var k=1; k< 9; k++){
	for(var l=0; l<5 ; l++){
		mat3.css(k,l,{"background-color":"red"});
		mat4.css(k,l,{"background-color":"red"});
	}
	
  }
  mat3.show();
  mat4.show();
//slide 9

  av.step();
  av.umsg("<b>3 SAT</b>");
  mat3.hide();
  mat4.hide();
  label1.hide();
  label2.hide();
  label3.hide();
  label1 = av.label("Size of the truth table is 2<sup>n</sup> where n is the number of boolean variables involved ",{top: y+20,left:150}).css({"text-align": "center"}); 
  label1.show();
  label2 = av.label("Hence the problem gets exponentially harder as number of variables increase ",{top: y+80,left:150}).css({"text-align": "center"}); 

  label2.show();

  av.recorded();
});
