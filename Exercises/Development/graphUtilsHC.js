(function ($) {
  "use strict";

  var actualEdges;
  function generateRandomEdges(nNodes, nEdges, weighted) {
    // Utility funciton to check whether the edge already exists 
    function isEligibleEdge(startIndex, endIndex) {
      if ((startIndex === endIndex) ||
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
        remaining,
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
   var curr =0 ;
   var enforcedHC = (Math.floor((Math.random() * 100))%2==0);

    if(enforcedHC){
       var hcpermute = new Array(nNodes);
       for(var idx = 0; idx < nNodes; idx++)
             hcpermute[idx] = idx;
       for(var idx = 0; idx < nNodes; idx++)
       {
         var swpIdx = idx + Math.floor(Math.random() * (nNodes - idx));
         var tmp = hcpermute[idx];
         hcpermute[idx] = hcpermute[swpIdx];
         hcpermute[swpIdx] = tmp;
         
       }
       for(var idx = 0; idx < nNodes; idx++){
           index1=hcpermute[idx];
           index2=hcpermute[(idx+1)%nNodes];
       	   edges[curr] = {
             startIndex: index1,
             endIndex: index2
      	   };
      	   if (weighted) {
             edges[curr].weight = 1 + Math.floor((Math.random() * 9));
      	   }
           curr = curr + 1;
           adjacencyMatrix[index1][index2] = 1;
       }
       remaining = nEdges;
       actualEdges = nEdges;
    }
    else
       remaining = nEdges-nNodes;


    for (var i = curr;i<remaining ;i++) {
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
    if(!enforcedHC){
      var ind = nEdges - nNodes;
      for (var i = 0; i < nNodes; i++) {
        var rEmpty=1, cEmpty=1;
        for (var j = 0; j < nNodes; j++) {
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

     }

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
        nEdges = opts.edges,
        nodes = new Array(nNodes),
        edges,
        i;

    // Generate the node values
    for (i = 0; i < nNodes; i++) {
      nodes[i] = String.fromCharCode(i + 65);
    }
    // Generate edges
    edges = generateRandomEdges(nNodes, nEdges, weighted);
    // Add the nodes to the graph
    for (i = 0; i < nNodes; i++) {
      graph.addNode(nodes[i]);
    }
    // Add the edges to the graph
    for (i = 0; i <actualEdges; i++) {
    //for (i = nEdges-nNodes; i < nEdges; i++) {
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
