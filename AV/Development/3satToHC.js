/*global ODSA, setPointerL */
//"use strict";
(function ($) {
  
	var jsav;
	var x= 200,
	y = 20,
	r = 15;

	var label1,label2,label3,label4,label5,label6,label7,label8,label9,label10,label11,label12,str,g,source,target,line1,line2,varlabel,exprlabel,
	literalLabels=new Array(4),
	clauses=new Array(3) , 
	P=new Array(4), 
	C=new Array(3), 
	P1=new Array(4), 
	color=new Array(3), 
	PLabel=new Array(4), 
	PE= new Array(4),
	PE1= new Array(5),
	PE2= new Array(4);
	PE3= new Array(3);
	var input=[["x<sub>1</sub>","x<sub>2</sub>","^x<sub>3</sub>"],["^x<sub>2</sub>","x<sub>3</sub>","x<sub>4</sub>"],["x<sub>1</sub>","^x<sub>2</sub>","x<sub>4</sub>"]];


function hideGraph(){
	varlabel.hide();
	exprlabel.hide();
	for(var i=0;i<7;i++)
		literalLabels[i].hide();
	for(var i=0;i<5;i++)
		PE1[i].hide();
	for(var i=0;i<4;i++){
		if(i>0){
			for(var j=0;j<4;j++)
				PE2[i-1][j].hide();
		}
		PLabel[i].hide();
		for(var j=0;j<6;j++){
			if(j>0){
				PE[i][j][0].hide();
				PE[i][j][1].hide();
			}
			P[i][j].hide();
		}
	}
	source.hide(); target.hide();
	for(var i=0;i<3;i++){
		C[i].hide();
		for(var j=0;j<8;j++)
			clauses[i][j].hide();
		for(var j=0;j<3;j++){
			PE3[i][j][0].hide();
			PE3[i][j][1].hide();
		}
	}
	line1.hide(); line2.hide();
}

function runit(){

	ODSA.AV.reset(true);
	jsav = new JSAV($('.avcontainer'));
    $(".avcontainer").on("jsav-message", function() {
      // invoke MathJax to do conversion again
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }); 
    $(".avcontainer").on("jsav-updatecounter", function(){ 
      // invoke MathJax to do conversion again 
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]); 
    });  

	varlabel = jsav.label("Variables:",{left:10,top:-20});
	x = 100;
	for(var i=0;i<6;i=i+2){
		literalLabels[i]=jsav.label("x"+(i/2+1),{left:x,top:-20});
		literalLabels[i+1]=jsav.label(",",{left:x+30,top:-20});
		x=x+45;
	}
	
	color = ["#669966","SlateBlue","IndianRed"]
	literalLabels[i]=jsav.label("x"+(i/2+1),{left:x,top:-20});

	g = jsav.ds.graph({width: 800, height: 550, left: 100, top: 50, layout: "manual", directed: true});
	g1 = jsav.ds.graph({width: 800, height: 550, left: 100, top: 50, layout: "manual", directed: true});
	y = 75;
	source  = g.addNode("<b>s</b>",{"top":-5,"left":220}).css({"background-color":"Khaki","width":"40px","height":"40px","min-width":"40px","min-height":"40px","opacity":0.65});
	target  = g.addNode("<b>t</b>",{"top":y+260,"left":220}).css({"background-color":"Khaki","width":"40px","height":"40px","min-width":"40px","min-height":"40px","opacity":0.65});
	var tmpnode = g.addNode(" ",{"top":-5,"left":-200}).css({"width":"40px","height":"40px","min-width":"40px","min-height":"40px","opacity":0});
	PE1[4]=g.addEdge(tmpnode,source).css({"stroke":"DarkViolet","stroke-width":"1.5px"});
	line1 = jsav.g.line(100,80,100,425);
	line1.css({"stroke":"DarkViolet"});
	line2 = jsav.g.line(100,425,320,425);
	line2.css({"stroke":"DarkViolet"});
	line1.show();
	line2.show();

	for(var i=0;i<4;i++){
		x=10;
		P[i]=new Array(6);
		P1[i]=new Array(6);
		PE[i]=new Array(6);
		PLabel[i]=jsav.label("P"+(i+1),{"left":x+70,"top":y+55});
		for(var j=0;j<6;j++){
			P[i][j] = g.addNode(""+(j+1),{"top":y,"left":x}).css({"background-color":"Tan","width":"30px","height":"30px","min-width":"30px","min-height":"30px","opacity":0.5});
			P1[i][j] = g1.addNode(" ",{"top":y+5,"left":x}).css({"width":"30px","height":"30px","min-width":"30px","min-height":"30px","opacity":0});
			x = x+85;
			if(j>0){
				PE[i][j]=new Array(2);
				PE[i][j][0]=g.addEdge(P[i][j-1],P[i][j]).css({"stroke":"DarkGreen","stroke-width":"1.5px"});
				PE[i][j][1]=g1.addEdge(P1[i][j],P1[i][j-1]).css({"stroke":"FireBrick","stroke-width":"1.5px"});
			}
		}
		if(i>0){
			PE2[i-1]=new Array(4);
			PE2[i-1][0]=g.addEdge(P[i-1][0],P[i][0]).css({"stroke":"DarkViolet","stroke-width":"1.5px"});
			PE2[i-1][1]=g.addEdge(P[i-1][0],P[i][j-1]).css({"stroke":"DarkViolet","stroke-width":"1.5px"});
			PE2[i-1][2]=g.addEdge(P[i-1][j-1],P[i][0]).css({"stroke":"DarkViolet","stroke-width":"1.5px"});
			PE2[i-1][3]=g.addEdge(P[i-1][j-1],P[i][j-1]).css({"stroke":"DarkViolet","stroke-width":"1.5px"});
		}
		y = y+60;
	}

	
	PE1[0] = g.addEdge(source,P[0][0]).css({"stroke":"DarkViolet","stroke-width":"1.5px"});
	PE1[1] = g.addEdge(source,P[0][5]).css({"stroke":"DarkViolet","stroke-width":"1.5px"});
	PE1[2] = g.addEdge(P[3][0],target).css({"stroke":"DarkViolet","stroke-width":"1.5px"});
	PE1[3] = g.addEdge(P[3][5],target).css({"stroke":"DarkViolet","stroke-width":"1.5px"});

	
	x=150;
	y=0;
	exprlabel = jsav.label("3CNF expression: ",{"top":y,"left":10});
	for(var i=0;i<3;i++){
		clauses[i] = new Array(8);
		x=x+15;
		clauses[i][0]=jsav.label("(",{left:x,top:y}).css({"color":color[i]});
		x=x+15;
		for(var j=1;j<5;j=j+2){
			clauses[i][j]=jsav.label(input[i][(j-1)/2],{left:x,top:y}).css({"color":color[i]});
			x=x+25;
			clauses[i][j+1]=jsav.label("+",{left:x,top:y}).css({"color":color[i]});
			x=x+15;
		}
		clauses[i][j]=jsav.label(input[i][(j-1)/2],{left:x,top:y}).css({"color":color[i]});
		x=x+25;
		clauses[i][6]=jsav.label(")",{left:x+5,top:y}).css({"color":color[i]});
		x=x+15;
		clauses[i][7]=jsav.label(".",{left:x+5,top:y});
	}

	C[0]  = g.addNode("<b>C1</b>",{"top":-15,"left":430}).css({"background-color":color[0],"width":"50px","height":"50px","min-width":"50px","min-height":"50px","opacity":0.65});
	C[1]  = g.addNode("<b>C2</b>",{"top":325,"left":370}).css({"background-color":color[1],"width":"50px","height":"50px","min-width":"50px","min-height":"50px","opacity":0.65});
	C[2]  = g.addNode("<b>C3</b>",{"top":315,"left":580}).css({"background-color":color[2],"width":"50px","height":"50px","min-width":"50px","min-height":"50px","opacity":0.65});

	for(var i=0;i<3;i++){
		PE3[i] = new Array(3);
		for(var j=0;j<3;j++)
			PE3[i][j] = new Array(2);
	}	

	PE3[0][0][0]=g.addEdge(P[0][0],C[0]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[0][0][1]=g.addEdge(C[0],P[0][1]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[0][1][0]=g.addEdge(P[1][0],C[0]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[0][1][1]=g.addEdge(C[0],P[1][1]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[0][2][0]=g.addEdge(C[0],P[2][0]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[0][2][1]=g.addEdge(P[2][1],C[0]).css({"stroke":"SlateGray","stroke-width":"1.5px"});

	PE3[1][0][0]=g.addEdge(P[1][3],C[1]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[1][0][1]=g.addEdge(C[1],P[1][2]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[1][1][0]=g.addEdge(P[2][2],C[1]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[1][1][1]=g.addEdge(C[1],P[2][3]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[1][2][0]=g.addEdge(C[1],P[3][2]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[1][2][1]=g.addEdge(P[3][3],C[1]).css({"stroke":"SlateGray","stroke-width":"1.5px"});

	PE3[2][0][0]=g.addEdge(P[0][5],C[2]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[2][0][1]=g.addEdge(C[2],P[0][4]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[2][1][0]=g.addEdge(P[1][4],C[2]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[2][1][1]=g.addEdge(C[2],P[1][5]).css({"stroke":"SlateGray","stroke-width":"1.5px"});
	PE3[2][2][0]=g.addEdge(C[2],P[3][4]).css({"stroke":"SlateGray","stroke-width":"1.5x"});
	PE3[2][2][1]=g.addEdge(P[3][5],C[2]).css({"stroke":"SlateGray","stroke-width":"1.5px"});

	g.layout();
	g1.layout();

	//Hiding it 
	hideGraph();
//	jsav.displayInit();jsav.step();
	
	jsav.umsg("<b>Reduction of n 3-SAT to HAMILTONIAN CYCLE.</b>");
	label1 = jsav.label("For a 3-SAT expression containing $n$ variables, there are $2^n$ possible assignments.",
			    {top:0,left:20});
	label2 = jsav.label("We model these $2^n$ possible truth assignments using a graph with $2^n$ different Hamiltonian cycles by the following method.",{top:50,left:20});

	jsav.displayInit();
	jsav.step();
	
	jsav.umsg("<b>Step1: Construction of paths</b>");
	label1.hide();
	label2.hide();
	label1 = jsav.label("Construct $n$ paths $P_1$ , $P_2$, ..., $P_n$ corresponding to the $n$ variables.",
			    {left:10,top:0});
	label2 = jsav.label("Each path $P_i$ should consist of $2k$ nodes ($v_{i,1}$, $v_{i,2}, ..., $v_{i,2k}$) where $k$ is the number of clauses in the expression.",{left:10,top:50});

	jsav.step();
	

	label4 = jsav.label("For example:",{left:10,top:100});
	label3 = jsav.label("Let us consider the following boolean expression with 4 variables:",{left:10,top:130});
	label6 = jsav.label("x<sub>1</sub> , x<sub>2</sub> , x<sub>3</sub> , x<sub>4</sub>",{left:10,top:160});
	

	x=10,y=190;
	label8 = jsav.label("Expression : ",{left:x,top:y});	
	x=x+100;
	str = " ";
	for(var i=0;i<3;i++){
		str = str + "(";
		for(var j=0;j<2;j++){
			str = str + input[i][j];
			str = str + "+";
		}
		str = str + input[i][j];
		str = str + ")";
		str = str + ".";
	}
	label7 = jsav.label(str,{left:x,top:y});
	label5 = jsav.label("We construct 4 paths with 6 nodes each",{left:10,top:y+30});
	label9 = jsav.label("P<sub>1</sub> with nodes v<sub>1,1</sub> , v<sub>1,2</sub> , v<sub>1,3</sub> , v<sub>1,4</sub> , v<sub>1,5</sub> , v<sub>1,6</sub>",{left:25,top:y+60});
	label10 = jsav.label("P<sub>2</sub> with nodes v<sub>2,1</sub> , v<sub>2,2</sub> , v<sub>2,3</sub> , v<sub>2,4</sub> , v<sub>2,5</sub> , v<sub>2,6</sub>",{left:25,top:y+90});
	label11 = jsav.label("P<sub>3</sub> with nodes v<sub>3,1</sub> , v<sub>3,2</sub> , v<sub>3,3</sub> , v<sub>3,4</sub> , v<sub>3,5</sub> , v<sub>3,6</sub>",{left:25,top:y+120});
	label12 = jsav.label("P<sub>4</sub> with nodes v<sub>4,1</sub> , v<sub>4,2</sub> , v<sub>4,3</sub> , v<sub>4,4</sub> , v<sub>4,5</sub> , v<sub>4,6</sub>",{left:25,top:y+150});
	jsav.step();

	
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

	varlabel.show();
	
	for(var i=0;i<7;i++)
		literalLabels[i].show();


	for(var i=0;i<4;i++){
		if(i>0){
			literalLabels[2*(i-1)].css({"font-size":"100%"});
			for(var j=0;j<6;j++){
				P[i-1][j].css({"opacity":0.5});
			}
		}
		PLabel[i].show();
		for(var j=0;j<6;j++){
			P[i][j].show();
			P[i][j].css({"opacity":1});
		}

		literalLabels[2*i].css({"font-size":"125%"});
		jsav.umsg("<b>Step 1a: Adding nodes for the paths</b>");
		jsav.step();
	}

	for(var j=0;j<6;j++){
		P[i-1][j].css({"opacity":0.5});
	}

	literalLabels[2*(i-1)].css({"font-size":"100%"});
	varlabel.hide();
	for( var i=0;i<7;i++)
		literalLabels[i].hide();

	jsav.umsg("<b>Step 1b: Adding edges to the paths</b>");
	label1 = jsav.label("Add edges from v<sub>i,j-1</sub> to v<sub>i,j</sub> (i.e. left to right) on P<sub>i</sub> to correspond to the assignment  x<sub>i</sub> = 1",{"left":10,"top":-15} );
	for(var i=0;i<4;i++){
		for(var j=0;j<6;j++){
		    if(j>0){
			PE[i][j][0].show();
		    }
		}
	}
	jsav.step();

	label1.hide();
	label1 = jsav.label("Add edges from v<sub>i,j</sub> to v<sub>i,j-1</sub> (i.e. right to left) on P<sub>i</sub> to correspond to the assignment x<sub>i</sub> = 0",{"left":10,"top":-15} );
	for(var i=0;i<4;i++){
		for(var j=0;j<6;j++){
		    if(j>0){
			PE[i][j][1].show();
		    }
		}
	}
	jsav.step();

	jsav.umsg("<b>Step 2: Inter-connecting the paths</b>");
	label1.hide();	
	label1 = jsav.label("Add edges from  v<sub>i,1</sub> and v<sub>i,6</sub>  to  v<sub>i+1,1</sub> and v<sub>i+1,6</sub>",{"left":10,"top":-15} );
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++)
			PE2[i-1][j].show();
	}
	jsav.step();
	
	label1.hide();
	jsav.umsg("<b>Step 3: Adding source and target nodes</b>");
	source.show();
	target.show();
	jsav.step();

	jsav.umsg("<b>Step 4: Connecting  source and target nodes to the paths</b>");
	label1 = jsav.label("Add edges from 's' to v<sub>1,1</sub> and v<sub>1,6</sub> and from v<sub>4,1</sub> and v<sub>4,6</sub> to 't'",{"left":10,"top":-15} );
	for(var i=0;i<4;i++)
		PE1[i].show();
	jsav.step();

	jsav.umsg("<b>Step 5: Adding a backpath from target to source</b>");
	label1.hide();
	label1 = jsav.label("Note: Being the only path from target to source, this path will always be present in any Hamiltonian Cycle of the graph.",{"left":0,"top":-15} );
	line2.show();
	line1.show();
	PE1[4].show();
	jsav.step();
	label1.hide();
	jsav.umsg("<b>Step 6: Adding nodes corresponding to clauses</b>");
	exprlabel.show();
	for(var i=0;i<3;i++)
		for(var j=0;j<8;j++)
			clauses[i][j].show();

	C[0].show(); C[1].show(); C[2].show();
	jsav.step();


	hideGraph();
	jsav.umsg("<b>Step7: Connecting clauses to the paths</b>");
	label1 = jsav.label("If a clause C<sub>j</sub> contains the variable x<sub>i</sub>,",{"left":10,"top":-15} );
	label2 = jsav.label("1.Connect C<sub>j</sub> to v<sub>i,2j-1</sub> and v<sub>i,2j</sub>",{"left":30,"top":15} );
	label3 = jsav.label("2.The direction of the path connecting C<sub>j</sub>, v<sub>i,2j-1</sub> and v<sub>i,2j</sub> should be:",{"left":30,"top":45} );
	jsav.step();
	label4 = jsav.label("a. right to left if C<sub>j</sub> contains x<sub>i</sub>",{"left":40,"top":75} );
	label5 = jsav.label("For example : C<sub>1</sub> i.e. (x<sub>1</sub> + x<sub>2</sub> + ^x<sub>3</sub>) contains x<sub>1</sub>. So C<sub>1</sub> should be connected as:",{"left":40,"top":105} );
	var g2 = jsav.ds.graph({width: 200, height: 100, left: 100, top: 120, layout: "manual", directed: true});
	var tmpnode1, tmpnode2, tmpnode3;
	label6 = jsav.label("P1",{"left":100,"top":205});
	tmpnode1 = g2.addNode("1",{"top":75,"left":30}).css({"background-color":"Tan","width":"30px","height":"30px","min-width":"30px","min-height":"30px","opacity":0.5});
	tmpnode2 = g2.addNode("2",{"top":75,"left":130}).css({"background-color":"Tan","width":"30px","height":"30px","min-width":"30px","min-height":"30px","opacity":0.5});
	tmpnode3 = g2.addNode("C1",{"top":10,"left":90}).css({"background-color":"Teal","width":"50px","height":"50px","min-width":"50px","min-height":"50px","opacity":0.65});
	g2.addEdge(tmpnode1,tmpnode3).css({"stroke-width":"1.5px"});
	g2.addEdge(tmpnode3,tmpnode2).css({"stroke-width":"1.5px"});
	g2.layout();

	jsav.step();

	y=250;
	label7 = jsav.label("b. left to right if C<sub>j</sub> contains ^x<sub>i</sub>",{"left":40,"top":y} );
	label8 = jsav.label("For example : C<sub>2</sub> i.e. (^x<sub>2</sub> + x<sub>3</sub> + x<sub>4</sub>) contains ^x<sub>2</sub>. So C<sub>2</sub> should be connected as:",{"left":40,"top":y+30} );
	var g3 = jsav.ds.graph({width: 200, height: 100, left: 100, top: y+45, layout: "manual", directed: true});
	label9 = jsav.label("P2",{"left":100,"top":y+125});
	tmpnode1 = g3.addNode("3",{"top":75,"left":30}).css({"background-color":"Tan","width":"30px","height":"30px","min-width":"30px","min-height":"30px","opacity":0.5});
	tmpnode2 = g3.addNode("4",{"top":75,"left":130}).css({"background-color":"Tan","width":"30px","height":"30px","min-width":"30px","min-height":"30px","opacity":0.5});
	tmpnode3 = g3.addNode("C2",{"top":10,"left":90}).css({"background-color":"Teal","width":"50px","height":"50px","min-width":"50px","min-height":"50px","opacity":0.65});
	g3.addEdge(tmpnode3,tmpnode1).css({"stroke-width":"1.5px"});
	g3.addEdge(tmpnode2,tmpnode3).css({"stroke-width":"1.5px"});
	g3.layout();

	jsav.step();


	g2.hide();
	g3.hide();
	label1.hide();
	label2.hide();
	label3.hide();
	label4.hide();
	label5.hide();
	label6.hide();
	label7.hide();
	label8.hide();
	label9.hide();
	line2.show();
	line1.show();

	for(var i=0;i<5;i++)
		PE1[i].show();
	for(var i=0;i<4;i++){
		if(i>0){
			for(var j=0;j<4;j++)
				PE2[i-1][j].show();
		}
		PLabel[i].show();
		for(var j=0;j<6;j++){
			if(j>0){
				PE[i][j][0].show();
				PE[i][j][1].show();
			}
			P[i][j].show();
		}
	}
	source.show(); target.show();
	exprlabel.show();
	for(var i=0;i<3;i++)
		for(var j=0;j<8;j++)
			clauses[i][j].show();
	C[0].show(); C[1].show(); C[2].show();
	jsav.step();


	for(var i=0;i<3;i++){
		if(i>0){
			clauses[i-1][5].css({"font-size":"100%"});
			PE3[i-1][2][0].css({"stroke-width":"1.5px"});
			PE3[i-1][2][1].css({"stroke-width":"1.5px"});
		}
		for(var j=0;j<3;j++){
			if(j>0){
				clauses[i][2*j-1].css({"font-size":"100%"});
				PE3[i][j-1][0].css({"stroke-width":"1.5px"});
				PE3[i][j-1][1].css({"stroke-width":"1.5px"});
			}
			clauses[i][2*j+1].css({"font-size":"125%"});
			PE3[i][j][0].css({"stroke-width":"3px"});
			PE3[i][j][1].css({"stroke-width":"3px"});
			PE3[i][j][0].show();
			PE3[i][j][1].show();
			jsav.step();
		}
	}
	clauses[2][5].css({"font-size":"100%"});
	PE3[2][2][0].css({"stroke-width":"1.5px"});
	PE3[2][2][1].css({"stroke-width":"1.5px"});

	jsav.step();
	line1.hide(); line2.hide();
	exprlabel.hide();
	g.hide();
	g1.hide();
	for(var i=0;i<4;i++)
		PLabel[i].hide();
	for(var i=0;i<3;i++)
		for(j=0;j<8;j++)
			clauses[i][j].hide();
	jsav.umsg("<b>Insights about the constructed graph</b>");
	label1 = jsav.label("1. Any Hamiltonian Cycle in the constructed graph (G) traverses P<sub>i</sub> either from right-to-left or left-to-right.",{"left":10,"top":-15} );
	label2 = jsav.label("This is because any path entering a node v<sub>i,j</sub> has to exit from v<sub>i,j+1</sub> either immediately or  via one <br> clause-node in between, in order to maintain Hamiltonian property",{"left":15,"top":15} );
	label3 = jsav.label("Similarly all paths entering at v<sub>i,j-1</sub> has to exit from v<sub>i,j</sub>.",{"left":15,"top":50} );
	label4 = jsav.label("2. Since each path P<sub>i</sub> can be traversed in 2 possible ways and we have n paths mapping to n variables, <br> there can be 2<sup>n</sup> Hamiltonian cycles in the graph G - {C<sub>1</sub>,C<sub>2</sub>...C<sub>k</sub>}.",{"left":10,"top":80} );
	label5 = jsav.label("Each one of this 2<sup>n</sup> Hamiltonian cycles corresponds to a particular assignment for variables x<sub>1</sub>, x<sub>2</sub> ...  x<sub>n</sub>.",{"left":15,"top":125} );
	

	jsav.step();

	jsav.umsg("<b>3-SAT and Hamiltonian Cycle</b>");
	label1.hide();
	label2.hide();
	label3.hide();
	label4.hide();
	label5.hide();

	label1 = jsav.label("1. <b>If there exists a Hamiltonian cycle H in the graph G, </b>",{"left":10,"top":-15} );
	label2 = jsav.label("If H traverses P<sub>i</sub> from left to right, assign x<sub>i</sub>=1",{"left":25,"top":15} );
	label3 = jsav.label("If H traverses P<sub>i</sub> from right to left, assign x<sub>i</sub>=0",{"left":25,"top":40} );
	label4 = jsav.label("Since H visits each clause node C<sub>j</sub>, atleast one one P<sub>i</sub> was traversed in the right direction relative to the node C<sub>j</sub>",{"left":15,"top":65} );
	label5 = jsav.label("<b>The assignment obtained here satisfies the given 3CNF.</b>",{"left":15,"top":95} );

	jsav.step();

	label6 = jsav.label("2. <b>If there exists a satisfying assignment for the 3 CNF</b>, ",{"left":10,"top":135} );
	label7 = jsav.label("Select the path that traverses P<sub>i</sub> from left-to-right if x<sub>i</sub>=1 or right-to-left if x<sub>i</sub>=0",{"left":25,"top":165} );
	label8 = jsav.label("Include the clauses in the path wherever possible.",{"left":25,"top":190} );
	label9 = jsav.label("Connect the source to P<sub>1</sub> , P<sub>n</sub> to target and P<sub>i</sub> to P<sub>i+1</sub> appropriately o as to maintain the continuity of the path",{"left":25,"top":215} );
	label10 = jsav.label("Connect the target to source to complete the cycle",{"left":25,"top":240} );
	label11 = jsav.label("Since the assignment is such that every clause is satisfied, all the clause-nodes are included in the path.<br>The P<sub>i</sub> nodes and source and target are all included and since the path traverses unidirectional, <br> no node is repeated twice",{"left":15,"top":265} );
	label12 = jsav.label("<b> The path obtained is a Hamiltonian Cycle</b>",{"left":25,"top":325} );


	jsav.step();

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

	line1.show(); line2.show();
	g.show();
	g1.show();
	exprlabel.show();
	for(var i=0;i<3;i++)
		for(j=0;j<8;j++)
			clauses[i][j].show();
	for(var i=0;i<4;i++)
		PLabel[i].show();

	for(var i=0;i<PE1.length;i++)
		PE1[i].css({"opacity":0.5});
	for(var i=0;i<4;i++){
		for(j=1;j<6;j++){
			PE[i][j][0].css({"opacity":0.5});
			PE[i][j][1].css({"opacity":0.5});
		}
	}
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++)
			PE2[i][j].css({"opacity":0.5});
	}
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			PE3[i][j][0].css({"opacity":0.5});
			PE3[i][j][1].css({"opacity":0.5});
		}
	}

	jsav.umsg("<b>Hamiltonian Cycle in the constructed graph</b>");

	label1 = jsav.label("The graph G has a Hamiltonian cycle",{"left":10,"top":-15});

	line1.css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	line2.css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE1[4].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE1[0].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE1[2].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE3[0][0][0].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE3[0][0][1].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	for(var i=2;i<=5;i++)
		PE[0][i][0].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE2[0][3].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	for(var i=1;i<=5;i++)
		PE[1][i][1].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE2[1][0].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	for(var i=1;i<=5;i++)
		if(i!=3)
			PE[2][i][0].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE2[2][3].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	for(var i=1;i<=4;i++)
		PE[3][i][1].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE3[1][1][0].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE3[1][1][1].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE3[2][2][0].css({"stroke":"Blue","stroke-width":"3px","opacity":1});
	PE3[2][2][1].css({"stroke":"Blue","stroke-width":"3px","opacity":1});

	jsav.step();

	label1.hide();
	jsav.umsg("<b>Assignment for 3-SAT</b>");

	label1 = jsav.label("From the Hamiltonian cycle below the assignment is : ",{"left":10,"top":-15});
	label2 = jsav.label("<b>x<sub>1</sub> = 1 , x<sub>2</sub> = 0 , x<sub>3</sub> = 1 , x<sub>4</sub> = 0</b>",{"left":10,"top":30});
	exprlabel.hide();
	for(var i=0;i<3;i++)
		for(j=0;j<8;j++)
			clauses[i][j].hide();

	jsav.step();

	jsav.umsg("<b>Satisfiability of 3-CNF</b>");
	hideGraph();
	label3 = jsav.label("The above assignment satisfies the 3CNF ' (x1 + x2 + ^x3).(^x2 + x3 + x4).(x1 + ^x2 + x4) '",{"left":10,"top":70});
	

	jsav.recorded();
}

function about(){
	alert("Proof of NP Completeness for Hamiltonian Cycle Problem");
}

$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
