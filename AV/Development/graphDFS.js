(function ($) {
	
	var jsav = new JSAV($('.avcontainer'));;
	var g;
	var arr;
	var a, b, c, d, e, f;
	
	
	
	function runit() {
		g = jsav.ds.graph({width: 500, height: 500, layout: "manual", directed: true});
		arr = jsav.ds.array([1,2,3,4],{layout: "vertical"});
		arr.css({"left": "+=300px", "bottom": "450px", "width": "30px"});
		initGraph();
		g.layout();
		jsav.displayInit();
		markIt(g.nodes()[0]);
		dfs(g.nodes()[0]);
		jsav.step();
		finalGraph();
		jsav.recorded();
	}
  
  
  	function preVisit(node, prev) {
   
      jsav.umsg("Add " + node.value() + " to the stack");
      if (prev) {
        node.edgeFrom(prev).css("stroke-width", "4", "red"); // highlight
      }
	 
      jsav.step();
    }
	
    // Mark the nodes when visited and highlight it to 
	// show it has been marked
    function markIt(node) {
      node.addClass("marked");
      jsav.umsg("Mark node " + node.value());
	  node.highlight();
      jsav.step();
    }
	
	
	
	
    function postVisit(node) {
	
      jsav.umsg("Pop " + node.value() + " off of stack");
      
    }
	
	// Recursive depth first search algorithmn for searching
	// the graph
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
	   alert("Depth first search visualization");
	}
    
	
	// Graph prepartion for initial stage of visualization
	
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
	
	// Resulting graph of completed depth first search
	function finalGraph() {
		jsav.umsg("Completed depth first search graph");
		g.removeEdge(a, e);
		g.removeEdge(c, d);
		g.removeEdge(c, f);
	}

 // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#help').click(help);
  $('#reset').click(reset);
}(jQuery));