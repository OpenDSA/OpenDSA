/* global document, console, $, JSAV */

$(document).ready(function () {
"use strict";

    JSAV.init();
    JSAV.ext.SPEED = 500;
    var av;

    // Use this instatiation for embedding in standalone parseTree1.html file
    //    av = new JSAV($("#parseTree"));
    //////////////////////////////////////////////////////

    // Use this instatiation for embedding as inlineav in RST file
    var av_name = "parseTree5a";
    var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;
    av = new JSAV(av_name);
    //////////////////////////////////////////////////////

    var lt = "&lt;";
    var gt = "&gt;";
    var empty_prod = "&epsilon;";
    var arr;
    var tree;
    var label1;
    var label2;

    var the_tree = "";		// String representation of the tree

    var the_exp = "A + B * C";	// The expression to parse


    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 1 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    arr = av.ds.array(the_exp.split(" "));
    arr.addClass(true, "oneCharWidth");
    label1 = av.label("Beginning the parse ");
    av.umsg(" ");
    tree = av.ds.tree({nodegap: 10});
    tree.root(lt+"exp"+gt);
    tree.root().addClass("wider");
    tree.layout();
    av.displayInit();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 2 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("First we wiil use the &lt;exp&gt; + &lt;exp&gt; production.");
    tree.root().addChild(lt+"exp"+gt).addChild("+").addChild(lt+"exp"+gt);
    tree.root().child(0).addClass("wider");
    tree.root().child(2).addClass("wider");
    tree.root().child(1).highlight();
    arr.addClass(1, "jsavhighlight");
    tree.layout();
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 3 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("Complete parsing the &lt;exp&gt; on the left");
    tree.root().child(0).addChild(lt+"pri"+gt);
    tree.root().child(0).child(0).addClass("wider");
    tree.root().child(0).child(0).addChild("A");
    tree.root().child(0).child(0).child(0).highlight();
    arr.addClass(0, "jsavhighlight");
    tree.layout();
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 4 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("Now take care of the &lt;exp&gt; on the right by using the &lt;exp&gt; * &lt;exp&gt; production");
    tree.root().child(2).addChild(lt+"exp"+gt).addChild("*").addChild(lt+"exp"+gt);
    tree.root().child(2).child(1).highlight();
    tree.root().child(2).child(0).addClass("wider");
    tree.root().child(2).child(2).addClass("wider");
    arr.addClass(3, "jsavhighlight");
    tree.layout();
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 5 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("* will multiply B ...");
    tree.root().child(2).child(0).addChild(lt+"pri"+gt);
    tree.root().child(2).child(0).child(0).addClass("wider");
    tree.root().child(2).child(0).child(0).addChild("B");
    tree.root().child(2).child(0).child(0).child(0).highlight();
    arr.addClass(2, "jsavhighlight");
    tree.layout();
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 6 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("... times C");
    tree.root().child(2).child(2).addChild(lt+"pri"+gt);
    tree.root().child(2).child(2).child(0).addClass("wider");
    tree.root().child(2).child(2).child(0).addChild("C");
    tree.root().child(2).child(2).child(0).child(0).highlight();
    arr.addClass(4, "jsavhighlight");
    tree.layout();
    av.step();

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    


    av.recorded();





});
