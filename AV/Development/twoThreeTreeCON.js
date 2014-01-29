(function ($) {
	"use strict";
	var jsav = new JSAV("twoThreeTreeCON");

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

	var properties = {"stroke-width": 1.5};
	jsav.g.line(243, 18, 63, 80, properties);
	jsav.g.line(264, 21, 264, 80, properties);
	jsav.g.line(286, 18, 458, 80, properties);
	jsav.g.line(44, 100, 24, 160, properties);
	jsav.g.line(64, 101, 104, 160, properties);
	jsav.g.line(244, 100, 184, 160, properties);
	jsav.g.line(264, 101, 264, 160, properties);
	jsav.g.line(284, 100, 344, 160, properties);
	jsav.g.line(437, 100, 424, 160, properties);
	jsav.g.line(458, 101, 504, 160, properties);

}(jQuery));