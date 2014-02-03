// Create diagram for twoThreeTreeCON.
(function ($) {
	"use strict";
	var jsav = new JSAV("twoThreeTreeCON");

	// Create all the arrays that represent the nodes in the 2-3 tree.
	var arr1 = jsav.ds.array([18, 13], {left: "240px", top: "0px"});
	var arr2 = jsav.ds.array([12, ""], {left: "40px", top: "80px"});
	var arr3 = jsav.ds.array([23, 30], {left: "240px", top: "80px"});
	var arr4 = jsav.ds.array([48, ""], {left: "435px", top: "80px"});
	var arr5 = jsav.ds.array([10, ""], {left: "0px", top: "160px"});
	var arr6 = jsav.ds.array([15, ""], {left: "80px", top: "160px"});
	var arr7 = jsav.ds.array([20, 21], {left: "160px", top: "160px"});
	var arr8 = jsav.ds.array([24, ""], {left: "240px", top: "160px"});
	var arr9 = jsav.ds.array([31, ""], {left: "320px", top: "160px"});
	var arr10 = jsav.ds.array([45, 47], {left: "400px", top: "160px"});
	var arr11 = jsav.ds.array([50, 52], {left: "480px", top: "160px"});

	// Create lines that connect all the nodes.
	var properties = {"stroke-width": 1.5};
	jsav.g.line(243, 28, 73, 81, properties);
	jsav.g.line(274, 31, 274, 80, properties);
	jsav.g.line(306, 28, 469, 81, properties);
	jsav.g.line(44, 110, 24, 160, properties);
	jsav.g.line(74, 111, 114, 160, properties);
	jsav.g.line(244, 110, 194, 160, properties);
	jsav.g.line(274, 111, 274, 160, properties);
	jsav.g.line(304, 110, 354, 160, properties);
	jsav.g.line(437, 110, 434, 160, properties);
	jsav.g.line(468, 111, 514, 160, properties);

}(jQuery));

// Create slide show for simpleInsertCON
(function ($) {
	"use strict";
	var jsav = new JSAV("simpleInsertCON");

	/* 1st Slide *************************************************************/
	jsav.umsg("Simple insert into the 2-3 tree.");
	// Create all the arrays that represent the nodes in the 2-3 tree.
	var arr1 = jsav.ds.array([18, 13], {left: "240px", top: "0px"});
	var arr2 = jsav.ds.array([12, ""], {left: "40px", top: "80px"});
	var arr3 = jsav.ds.array([23, 30], {left: "240px", top: "80px"});
	var arr4 = jsav.ds.array([48, ""], {left: "435px", top: "80px"});
	var arr5 = jsav.ds.array([10, ""], {left: "0px", top: "160px"});
	var arr6 = jsav.ds.array([15, ""], {left: "80px", top: "160px"});
	var arr7 = jsav.ds.array([20, 21], {left: "160px", top: "160px"});
	var arr8 = jsav.ds.array([24, ""], {left: "240px", top: "160px"});
	var arr9 = jsav.ds.array([31, ""], {left: "320px", top: "160px"});
	var arr10 = jsav.ds.array([45, 47], {left: "400px", top: "160px"});
	var arr11 = jsav.ds.array([50, 52], {left: "480px", top: "160px"});
	var arr12 = jsav.ds.array([14], {left: "180px", top: "0px", visible: false});
	// Create lines that connect all the nodes.
	var properties = {"stroke-width": 1.5};
	jsav.g.line(243, 28, 73, 81, properties);
	jsav.g.line(274, 31, 274, 80, properties);
	jsav.g.line(306, 28, 469, 81, properties);
	jsav.g.line(44, 110, 24, 160, properties);
	jsav.g.line(74, 111, 114, 160, properties);
	jsav.g.line(244, 110, 194, 160, properties);
	jsav.g.line(274, 111, 274, 160, properties);
	jsav.g.line(304, 110, 354, 160, properties);
	jsav.g.line(437, 110, 434, 160, properties);
	jsav.g.line(468, 111, 514, 160, properties);
	// set initial display for first slide.
	jsav.displayInit();

	/* 2nd Slide *************************************************************/
	jsav.umsg("The value 14 is inserted into the tree. The value is first compared agains the root node.\nSince 14 is less than the left value of the root node it follows the left child node.");
	arr12.show();
	arr1.highlight(0);
	jsav.step();

	/* 3rd Slide *************************************************************/
	jsav.umsg("This node has only one element, and 14 is greater than 12 so the center child is followed next.");
	arr1.unhighlight(0);
	arr12.css({left: "40px", top: "40px"});
	arr2.highlight(0);
	jsav.step();

	/* 4th Slide *************************************************************/
	jsav.umsg("A leaf node has being reached. Since the leaf node has an empty space the new node can be inserted here.");
	arr2.unhighlight(0);
	arr12.css({left: "80px", top: "200px"});
	arr6.highlight(0);
	jsav.step();

	/* 5th Slide *************************************************************/
	jsav.umsg("The new key 14 is less than 15 so the key 15 has to be moved to the right to make room for the new key.");
	arr6.unhighlight(0);
	arr6.swap(0, 1, {arrow: false});
	jsav.step();

	/* 6th Slide *************************************************************/
	jsav.umsg("Finally the key 14 is inserted into the 2-3 tree.");
	arr6.value(0, 14);
	arr12.hide();
	// Mark the slide show as finished.
	jsav.recorded();

}(jQuery));
