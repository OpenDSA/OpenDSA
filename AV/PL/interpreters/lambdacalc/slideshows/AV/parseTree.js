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
    tree = av.ds.tree({nodegap: 15});
    tree.root( eNT);
    tree.root().addClass("wider");
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
    tree.root().child(1).addClass("wider");
    tree.root().child(2).addClass("wider");
    tree.root().child(0).highlight();
    tree.root().child(1).highlight();
    tree.root().child(2).highlight();
    tree.root().child(3).highlight();
    tree.root().child(0).addClass("moveLeft");
    //tree.root().edgeToChild(0).g._points[1][0] = 50;
    //tree.root().edgeToChild(0).g._points[1][1] = 50;
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
    tree.layout();
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
    tree.root().child(1).child(1).addClass("wider");
    tree.root().child(1).child(2).addClass("wider");
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
    tree.root().child(2).child(1).addClass("wider");
    tree.root().child(2).child(2).addClass("wider");
    tree.root().child(2).child(0).highlight();
    tree.root().child(2).child(1).highlight();
    tree.root().child(2).child(2).highlight();
    tree.root().child(2).child(3).highlight();
    tree.layout();
    av.step();
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 10 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>... let's add all of the nodes</h4>");
    label2.text("<h4>that make up its two sub-trees.</h4>");
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

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 12 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>The first &lambda; expression in this application is a</h4>");
    label2.text("<h4>variable. Let's add its sub-tree to the parse tree.</h4>");
    arr.removeClass([1,7],"highlight");
    arr.addClass([2],"highlight");
    tree.root().child(1).child(0).unhighlight();
    tree.root().child(1).child(1).unhighlight();
    tree.root().child(1).child(2).unhighlight();
    tree.root().child(1).child(3).unhighlight();
    tree.root().child(1).child(1).addChild(varNT);
    tree.root().child(1).child(1).child(0).addChild("z");
    tree.root().child(1).child(1).child(0).highlight();
    tree.root().child(1).child(1).child(0).child(0).highlight();
    tree.layout();
    av.step();
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 13 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>The second &lambda; expression is a &lambda; abstraction. Let's</h4>");
    label2.text("<h4>add the four corresponding nodes to the parse tree.</h4>");
    arr.removeClass([2],"highlight");
    arr.addClass([4,5,6],"highlight");
    tree.root().child(1).child(1).child(0).unhighlight();
    tree.root().child(1).child(1).child(0).child(0).unhighlight();
    tree.root().child(1).child(2).addChild("&lambda;");
    tree.root().child(1).child(2).addChild(varNT);
    tree.root().child(1).child(2).addChild(".");
    tree.root().child(1).child(2).addChild(eNT);
    tree.root().child(1).child(2).child(3).addClass("wider");
    tree.root().child(1).child(2).child(0).highlight();
    tree.root().child(1).child(2).child(1).highlight();
    tree.root().child(1).child(2).child(2).highlight();
    tree.root().child(1).child(2).child(3).highlight();
    tree.layout();
    av.step();
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 14 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>The formal parameter in this &lambda; expression is x.</h4>");
    label2.text("<h4>Let's add one node for x to the parse tree.</h4>");
    arr.removeClass([5,6],"highlight");
    tree.root().child(1).child(2).child(0).unhighlight();
    tree.root().child(1).child(2).child(1).unhighlight();
    tree.root().child(1).child(2).child(2).unhighlight();
    tree.root().child(1).child(2).child(3).unhighlight();
    tree.root().child(1).child(2).child(1).addChild("x");
    tree.root().child(1).child(2).child(1).child(0).highlight();
    tree.layout();
    av.step();
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 15 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>Finally, we complete the parse tree by adding</h4>");
    label2.text("<h4>nodes for this innermost &lambda; expression.</h4>");
    arr.removeClass([4],"highlight");
    tree.root().child(1).child(2).child(1).child(0).unhighlight();
    arr.addClass([5,6],"highlight");
    tree.root().child(1).child(2).child(3).addChild("&lambda;");
    tree.root().child(1).child(2).child(3).addChild("y");
    tree.root().child(1).child(2).child(3).addChild(".");
    tree.root().child(1).child(2).child(3).addChild(varNT);
    tree.root().child(1).child(2).child(3).child(3).addChild("z");
    tree.root().child(1).child(2).child(3).child(0).highlight();
    tree.root().child(1).child(2).child(3).child(1).highlight();
    tree.root().child(1).child(2).child(3).child(2).highlight();
    tree.root().child(1).child(2).child(3).child(3).highlight();
    tree.root().child(1).child(2).child(3).child(3).child(0).highlight();
    tree.layout();
    av.step(); 
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 16 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("<h4>And this is the complete parse</h4>");
    label2.text("<h4>tree for the &lambda; expression above.</h4>");
    arr.removeClass([5,6],"highlight");
    tree.root().child(1).child(2).child(3).child(0).unhighlight();
    tree.root().child(1).child(2).child(3).child(1).unhighlight();
    tree.root().child(1).child(2).child(3).child(2).unhighlight();
    tree.root().child(1).child(2).child(3).child(3).unhighlight();
    tree.root().child(1).child(2).child(3).child(3).child(0).unhighlight();

    tree.layout();
    av.step(); 
    av.recorded();
    
})();
