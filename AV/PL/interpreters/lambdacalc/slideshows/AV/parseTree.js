"use strict";

(function () {

    var lt = "&lt;";
    var gt = "&gt;";
    var eNT = lt + "&lambda;exp" + gt;
    var varNT = lt + "var" + gt;
    var lambdaexp = "((z ^x.^y.z) (x y))"
    var arr, tree, label1,label2;

    var setArrayCellsWidth = function (highlight,range) {
	arr.removeClass(true,"oneCharWidth");
	arr.removeClass(true,"emptyWidth");
	arr.removeClass(true,"lambdaWidth");
	arr.removeClass(true,"parenWidth");
	arr.addClass(true, "defaultCellStyle");
	arr.addClass(oneChar, "oneCharWidth");
	arr.addClass(noChar,"emptyWidth");
	arr.addClass(lambdaChar,"lambdaWidth");
	arr.addClass(parenChar,"parenWidth");
	if (highlight !== undefined) {
	    if (highlight) {
		arr.removeClass(true,"unhighlightCell");
		arr.addClass(range, "highlightCell");
	    } else {
		arr.removeClass(true,"highlightCell");
		arr.addClass(range, "unhighlightCell");
	    }
	}
    }
    var oneChar = function(x) { return arr.value(x).length === 1; };
    var noChar = function(x) { return arr.value(x).length === 0; };
    var lambdaChar = function(x) { return arr.value(x).length === 3; };
    var parenChar = function(x) { 
    return arr.value(x) === '(' || arr.value(x) === ')' ||
	    arr.value(x) === ' '; 
    };

    JSAV.init();
    JSAV.ext.SPEED = 500;

    var av = new JSAV($(".avcontainer"));

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 1 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    arr = av.ds.array(LAMBDA.mySplit(lambdaexp.replace(/\^/g,"\u03BB")));
    setArrayCellsWidth();
    label1 = av.label("<h4>The root node of the parse tree for any </h4>");
    label2 = av.label("<h4>&lambda; expression  is always the non-terminal " + eNT +".</h4>");
    tree = av.ds.tree();
    tree.root( eNT);
    tree.layout();
    av.displayInit();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 2 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    arr.addClass([0],"highlight");
    label1.text("<h4>Since the first character of the</h4>");
    label2.text("<h4>&lambda; expression is a left parenthesis...</h4>");
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 3 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    arr.addClass([arr.size()-1],"highlight");
    label1.text("<h4>... it must, together with the last parenthesis, define a");
    label2.text("<h4>function application at the top-level of the parse tree.</h4>");
    av.step();
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 4 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>Let's add the four nodes corresponding to this</h4>");
    label2.text("<h4>top-level function application to the parse tree.</h4>");

    tree.root().addChild("(").addChild(eNT).addChild(eNT).addChild(")");
    tree.root().child(0).highlight();
    tree.root().child(1).highlight();
    tree.root().child(2).highlight();
    tree.root().child(3).highlight();
    tree.layout();
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 5 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    arr.removeClass([0,arr.size()-1],"highlight");
    arr.addClass([1],"highlight");
    tree.root().child(0).unhighlight();
    tree.root().child(1).unhighlight();
    tree.root().child(2).unhighlight();
    tree.root().child(3).unhighlight();
    label1.text("<h4>Now, we need to identify the two &lambda; expressions that make up</h4>");
    label2.text("<h4>this application. The first one must start with this left parenthesis...</h4>");
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 6 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    arr.addClass([7],"highlight");
    label1.text("<h4>... and must end with the matching</h4>");
    label2.text("<h4>right parenthesis highlighted above.</h4>");
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 7 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>So we can add the corresponding</h4>");
    label2.text("<h4>nodes to the parse tree.</h4>");
    tree.root().child(1).addChild("(").addChild(eNT).addChild(eNT).addChild(")");
    tree.root().child(1).child(0).highlight();
    tree.root().child(1).child(1).highlight();
    tree.root().child(1).child(2).highlight();
    tree.root().child(1).child(3).highlight();
    tree.layout();
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 8 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>Similarly, the second &lambda; expression in the top-level</h4>");
    label2.text("<h4>application is contained in the highlighted parentheses.</h4>");
    tree.root().child(1).child(0).unhighlight();
    tree.root().child(1).child(1).unhighlight();
    tree.root().child(1).child(2).unhighlight();
    tree.root().child(1).child(3).unhighlight();
    arr.removeClass([1,7],"highlight");
    arr.addClass([arr.size()-6,arr.size()-2],"highlight");
    tree.layout();


    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 9 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>So we can add the corresponding nodes to the parse tree.</h4>");
    label2.text("<h4>And since the highlighted function application is really short...</h4>");
    tree.root().child(2).addChild("(").addChild(eNT).addChild(eNT).addChild(")");
    tree.root().child(2).child(0).highlight();
    tree.root().child(2).child(1).highlight();
    tree.root().child(2).child(2).highlight();
    tree.root().child(2).child(3).highlight();
    tree.layout();
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 10 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>... let's add all of the nodes that</h4>");
    label2.text("<h4>make up its two sub-trees.</h4>");
    arr.removeClass([arr.size()-6,arr.size()-2],"highlight");
    arr.addClass([arr.size()-5,arr.size()-3],"highlight");

    tree.root().child(2).child(0).unhighlight();
    tree.root().child(2).child(1).unhighlight();
    tree.root().child(2).child(2).unhighlight();
    tree.root().child(2).child(3).unhighlight();
    tree.root().child(2).child(1).addChild(varNT);
    tree.root().child(2).child(2).addChild(varNT);
    tree.root().child(2).child(1).child(0).addChild("x");
    tree.root().child(2).child(2).child(0).addChild("y");
    tree.root().child(2).child(1).child(0).highlight();
    tree.root().child(2).child(2).child(0).highlight();    
    tree.root().child(2).child(1).child(0).child(0).highlight();    
    tree.root().child(2).child(2).child(0).child(0).highlight();    
    tree.layout();

    av.step();
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 11 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>Now we turn our attention back to the first</h4>");
    label2.text("<h4>application in the top-level &lambda; expression.</h4>");
    arr.removeClass([arr.size()-5,arr.size()-3],"highlight");
    tree.root().child(2).child(1).child(0).unhighlight();
    tree.root().child(2).child(2).child(0).unhighlight();    
    tree.root().child(2).child(1).child(0).child(0).unhighlight();    
    tree.root().child(2).child(2).child(0).child(0).unhighlight();    

    arr.addClass([1,7],"highlight");
    tree.root().child(1).child(0).highlight();
    tree.root().child(1).child(1).highlight();
    tree.root().child(1).child(2).highlight();
    tree.root().child(1).child(3).highlight();
    tree.layout();

    av.step();



    av.recorded();
    
})();
