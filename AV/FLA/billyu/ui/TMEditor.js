(function($) {
	var jsav = new JSAV("av");
	var g = new jsav.ds.tm({width: '730px', height: 440, layout: "automatic", editable: true});
	var n1 = g.addNode({left: '150px'});
	var n2 = g.addNode();
	var e1 = g.addTransition(n1, n2, "a", "b", "R");
	console.log(e1);
	console.log(e1.getWeight());
}(jQuery));
