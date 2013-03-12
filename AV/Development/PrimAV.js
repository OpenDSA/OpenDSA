
(function ($) {
	
	var jsav = new JSAV($('.avcontainer'));
	var g;
	var a, b, c, d, e, f;
	
	function runit() {			
		//-------------------ADD NEW GRAPH STUFF HERE----------------------------------------
		g = jsav.ds.graph({width: 600, height: 600, layout: "manual", directed: true});
		initGraph();
		g.layout();
		jsav.displayInit();
		markIt(g.nodes()[0]);		//Mark the first node in the graph
		var startNode=new Array();  //Define an array to hold the value of the start node to be passed to prim function
		startNode[0]=g.nodes()[0];
		prim(startNode);		//Call the function which describes Prim's algorithm and pass the first node. 
		removeEdges();			//Remove extra edges that are not in the spanning tree.
		jsav.recorded();

  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

  
	//This function is for searching for a node in a specific set of nodes.
	//We use this function to state whether a particular node is contained in the set of nodes added so far to the spanning tree.
	function searchNodes(S,targetNode)
	{
		for(j=0;j<S.length;j++)
		{
			if(S[j].value()==targetNode.value())
			{
				return true;
			}
		}
		return false;
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

	//This function is for finding cut(S) where S is the set of nodes added so far to the spanning tree. 
	//cut(S) are the set of edges that are connecting nodes in S to nodes outside S.
	function findCut(S)
	{
		var cutEdges=new Array();
		var index=0;
		for(i=0;i<g.edges().length;i++)
		{
			if(searchNodes(S,g.edges()[i].start()) && !searchNodes(S,g.edges()[i].end()))
			{
				cutEdges[index]=g.edges()[i];
				index++;
			}
		}
		return cutEdges;
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

	//This function is for finding the minimum cost edge in cut(S).
	function findMinimumCostEdge(cut)
	{
		var minCost=parseInt(cut[0].label());
		var minCostIndex=0;
		for(var i=1;i<cut.length;i++)
		{
			if(parseInt(cut[i].label())<minCost)
			{
				minCostIndex=i;
			}
		}
		return minCostIndex;
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

	//This function is used to mark a node in the graph.
    function markIt(node) {
      node.addClass("marked");
      jsav.umsg("Add node " + node.value()+ " to the minimum spanning tree");
	  node.highlight();
      jsav.step();
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

	//This function simply displays the set of nodes in S in a convenient manner to be used in messages in the slideshow.
	function displayNodes(S)
	{
		var str=" (";
		for (var i=0;i<(S.length)-1;i++)
		{
			str+=S[i].value()+" , ";
		}
		str+=S[i].value()+")";
		return str;
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//This function contains the implementation of Prim's algorithm.
    function prim(S) 
	{
		
		var cut=new Array();
		var index;
		T=new Array();
		while(S.length<g.nodes().length)
		{
			cut=findCut(S);
			index=findMinimumCostEdge(cut);
			jsav.umsg("Find the minimum cost edge in cut of "+displayNodes(S));
			cut[index].css("stroke","red");
			T.push(cut[index]);
			jsav.step();
			markIt(cut[index].end());
			S.push(cut[index].end());
		}
    }   

	function about() {
	   alert("Prim's Algorithm visualization");
   }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//This function is used to initialize the graph.
    function initGraph() {
		a = g.addNode("A", {"left": 25});
		b = g.addNode("B", {"left": 325});
		c = g.addNode("C", {"left": 145, "top": 75});
		d = g.addNode("D", {"left":145, "top": 200});
        e = g.addNode("E", {"left": 0, "top": 300});
		f = g.addNode("F", {"left":325, "top":250});
		G = g.addNode("G", {"left":500, "top":150});
		
		
		e1=g.addEdge(a, c).label("30");
		e2=g.addEdge(a, e).label("10");
		e3=g.addEdge(c, b).label("20");
		e4=g.addEdge(c, d).label("15");
		e5=g.addEdge(c, f).label("25");
		e6=g.addEdge(f, b).label("2");
		e7=g.addEdge(d, f).label("5");
		e8=g.addEdge(e, f).label("40");
		e9=g.addEdge(f, G).label("50");
		e10=g.addEdge(b, G).label("22");
		
		//e11=g.addEdge(c, a).label("30");
		//e22=g.addEdge(e, a).label("10");
		//e33=g.addEdge(b, c).label("20");
		//e44=g.addEdge(d, c).label("15");
		//e55=g.addEdge(f, c).label("25");
		//e66=g.addEdge(f, b).label("2");
		//e77=g.addEdge(f, d).label("5");
		//e88=g.addEdge(f, e).label("40");
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//This function is used to remove edges that are not in the minimum spanning tree
	function removeEdges() 
	{
	
		for(var i=0;i<g.edges().length;i++)
		{
			for(var j=0;j<T.length;j++)
			{
				if(g.edges()[i]==T[j])
				{
					break;
				}
			}
			if(j==T.length)
			{
				g.removeEdge(g.edges()[i].start(),g.edges()[i].end());
			}
		}
		jsav.umsg("Complete minimum spanning tree");
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#help').click(help);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));