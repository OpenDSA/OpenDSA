
(function ($) {
	
	var jsav = new JSAV($('.avcontainer'));;
	var g;
	var arr;
	var a, b, c, d, e, f;
	
	function runit() {
		//var arrValues = ODSA.AV.processArrayValues();
	//	jsav = 
		
					
		//-------------------ADD NEW GRAPH STUFF HERE----------------------------------------
		g = jsav.ds.graph({width: 500, height: 500, layout: "manual", directed: true});
		//array = jsav.ds.array({layout: vertical});
		arr = jsav.ds.array([1,2,3,4],{layout: "vertical"});
	//	g.css({"left": "+=400px"});
		arr.css({"left": "+=400px", "bottom": "400px", "width": "30px"});
		initGraph();
	//	finalGraph();
		g.layout();
		jsav.displayInit();
		markIt(g.nodes()[0]);
		dfs(g.nodes()[0]);
		jsav.step();
		finalGraph();
		//jsav.displayInit():
		jsav.recorded();

  }
  

  
  
  
  	function preVisit(node, prev) {
    // node.addClass("processing");
      jsav.umsg("Add " + node.value() + " to the stack");
      if (prev) {
        node.edgeFrom(prev).css("stroke", "red"); // highlight
       // node.edgeTo(prev).css("stroke", "red"); // highlight
      }
	 
      jsav.step();
    }
	
	
    function markIt(node) {
      node.addClass("marked");
      jsav.umsg("Mark node " + node.value());
	  node.highlight();
      jsav.step();
    }
	
	
	
	
    function postVisit(node) {
	
      jsav.umsg("Pop " + node.value() + " off of stack");
      
    }
	
	
    function dfs(start, prev) {
		var adjacent;
		var next;
		  preVisit(start, prev);
		  adjacent = start.neighbors();
		  for (next = adjacent.next(); next; next = adjacent.next()) {
			if (!next.hasClass("marked")) {
			  markIt(next);
			  dfs(next, start);
			  jsav.step();
			}
		  }
		
			postVisit(start);
			
			
		  
    }
  
	
   

	function about() {
	   alert("First attempt at a slideshow");
   }
   
    function initGraph() {
		a = g.addNode("A", {"left": 25});
		b = g.addNode("B", {"left": 325});
		c = g.addNode("C", {"left": 145, "top": 75});
		d = g.addNode("D", {"left":145, "top": 200});
        e = g.addNode("E", {"left": 0, "top": 300});
		f = g.addNode("F", {"left":325, "top":250});
		
		g.addEdge(a, c);
		g.addEdge(a, e);
		g.addEdge(c, b);
		g.addEdge(c, d);
		g.addEdge(c, f);
		g.addEdge(b, f);
		
		g.addEdge(f, d);
		g.addEdge(f, e);
		
		
	}
	
	function finalGraph() {
	
	
		//var a = g.addNode("A", {"left": 25});
		// var b = g.addNode("B", {"left": 325});
		// var c = g.addNode("C", {"left": 145, "top": 75});
		// var d = g.addNode("D", {"left":145, "top": 200});
        // var e = g.addNode("E", {"left": 0, "top": 300});
		// var f = g.addNode("F", {"left":325, "top":250});
		jsav.umsg("Completed depth first search graph");
	//	g.addEdge(a, c);
		g.removeEdge(a, e);
	//	g.addEdge(c, b);
		g.removeEdge(c, d);
		g.removeEdge(c, f);
	//	g.addEdge(b, f);
		
	//	g.addEdge(f, d);
	//	g.addEdge(f, e);
		
	}

 // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#help').click(help);
  $('#reset').click(reset);
}(jQuery));