(function ($) {
  "use strict";
  var actualEdges=0;
  var enforcedHC=false;
  var hcpermute=[];
  function generateRandomEdges(nNodes, nEdges, weighted) {
    // Utility funciton to check whether the edge already exists 
    function isEligibleEdge(startIndex, endIndex) {
      if ((startIndex === endIndex) ||
          (enforcedHC && hcpermute.indexOf(endIndex) 
                         === (hcpermute.indexOf(startIndex)+1)%nNodes)  ||
          (adjacencyMatrix[startIndex][endIndex] === 1) ||
          (adjacencyMatrix[endIndex][startIndex] === 1))
      {
        return false;
      }
      return true;
    }

    var edges = new Array(nEdges),
        adjacencyMatrix,
        index1,
        index2,
        i, j;
    //Create the adjacencyMatrix
    adjacencyMatrix = new Array(nNodes);
    for (i = 0; i < nNodes; i++) {
      adjacencyMatrix[i] = new Array(nNodes);
    }
    //Initialize the adjacency matrix
    for (i = 0; i < nNodes; i++) {
      for (j = 0; j < nNodes; j++) {
        adjacencyMatrix[i][j] = 0;
      }
    }
    var ind = nEdges - nNodes;  
    for (i = 0; i < nEdges - nNodes; i++) {
      do {
        index1 = Math.floor((Math.random() * nNodes));
        index2 = Math.floor((Math.random() * nNodes));
      } while (!isEligibleEdge(index1, index2));
      edges[i] = {
        startIndex: index1,
        endIndex: index2
      };
      if (weighted) {
        edges[i].weight = 1 + Math.floor((Math.random() * 9));
      }
      // add the edge to the matrix
      adjacencyMatrix[index1][index2] = 1;
      // adjacencyMatrix[index2][index1] = 1;
    }
    for (i = 0; i < nNodes; i++) {
      var rEmpty=1, cEmpty=1;
      for (j = 0; j < nNodes; j++) {
        if(adjacencyMatrix[i][j]!=0){
		rEmpty=0; 
		break;
        }
      }
      if(rEmpty==1){
	for(var k=0;k<nNodes;k++){
	  index2=k;
          if(isEligibleEdge(i,index2)){
              edges[ind] = {
                startIndex: i,
                endIndex: index2
            };
            if (weighted) {
               edges[ind].weight = 1 + Math.floor((Math.random() * 9));
            }
            adjacencyMatrix[i][index2] = 1;
            ind++;
            break;
          }
        }
      }
      for (j = 0; j < nNodes; j++) {
        if(adjacencyMatrix[j][i]!=0){
		cEmpty=0; 
		break;
        }
      }
      if(cEmpty==1){
	for(var k=0;k<nNodes;k++){
	  index1=k;
          if(isEligibleEdge(k,i)){
              edges[ind] = {
                startIndex: index1,
                endIndex: i
            };
            if (weighted) {
               edges[ind].weight = 1 + Math.floor((Math.random() * 9));
            }
            adjacencyMatrix[index1][i] = 1;
            ind++;
            break;
          }
	}
      }
	
    }
    actualEdges = ind;

    return edges;
  }

  /*
   * Generates a graph to an empty JSAV graph instance (graph).
   * 
   * Arguments:
   *    - graph:    an empty JSAV graph instance
   *
   * Options:
   *    - nodes:    number of nodes, default is 7
   *    - edges:    number of edges, default is 10
   *    - weighted: should the graph be weighted, default is false
   */
  function generateGraph(graph, options) {
    var defaultOptions = {
      weighted: false,
      nodes: 7,          // number of nodes
      edges: 10          // number of edges
    };
    var opts = $.extend(defaultOptions, options),
        weighted = opts.weighted,
        nNodes = opts.nodes,
        nEdges = opts.edges + nNodes,
        nodes = new Array(nNodes),
        edges,
        i;

    enforcedHC = (Math.floor((Math.random() * 100))%2==0); 

    // Generate the node values
    for (i = 0; i < nNodes; i++) {
      nodes[i] = String.fromCharCode(i + 65);
    }
    // Generate edges
    if(enforcedHC)
      edges = generateRandomEdges(nNodes, nEdges-nNodes, weighted);
    else
      edges = generateRandomEdges(nNodes, nEdges, weighted);
    // Add the nodes to the graph
    for (i = 0; i < nNodes; i++) {
      graph.addNode(nodes[i]);
    }

    if(enforcedHC){
       var tmpnodes = graph.nodes()
       var tmpnodes2 = graph.nodes()
       hcpermute = new Array(nNodes);
       for(var idx = 0; idx < tmpnodes.length; idx++)
       {
         var swpIdx = idx + Math.floor(Math.random() * (tmpnodes.length - idx));
         var tmp = tmpnodes[idx];
         tmpnodes[idx] = tmpnodes[swpIdx];
         tmpnodes[swpIdx] = tmp;
       }
       for(var idx = 0; idx < tmpnodes.length; idx++){
         hcpermute[idx] = tmpnodes2.indexOf(tmpnodes[idx]);
       }     
       for(i=0;i<nNodes;i++)
         graph.addEdge(tmpnodes[i],tmpnodes[(i+1)%nNodes]);
    }

    // Add the edges to the graph
    for (i = 0; i < actualEdges; i++) {
      var gNodes  = graph.nodes(),
          start   = gNodes[edges[i].startIndex],
          end     = gNodes[edges[i].endIndex],
          eOpts   = edges[i].weight ? {weight: edges[i].weight} : {};

      graph.addEdge(start, end, eOpts);
    }
  }

  window.graphUtils = {
    generate: generateGraph
  };

}(jQuery));
