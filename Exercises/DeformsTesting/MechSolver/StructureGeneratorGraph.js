// MODEL
// ???

// VIEW
// Mostly in MechSolverCommon.js; a single button

// CONTROLLER
// The generator file that hands back the data

var cy = null;

// TESTING CODE
// var cy = cytoscape({ /* options */})

// console.log(cy);

// var eles = cy.add([
//     { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
//     { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
//     { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
//   ]);
// console.log("Creating a sample graph",cy.json())
// console.log(cy.graphml())

Window.getGraphAnswer = function() {
  var textFileContent = "";
  var textFileName = "algebraGraph.graphml"

  // Temp only for displaying graph
  cy ? cy.destroy() : null;
  cy = cytoscape({ /* options */ });

  textFileContent = createGraphFromFormula();

  // Window.saveTextToFile(textFileContent, textFileName);
  // cy.destroy();
}

function createGraphFromFormula() 
{
  var nodeDataList = {};
  var nodeDataArray = [];
  var associationEdgeDataList = {};
  
  // Creating the root nodes, i.e. the values to be shown
  var numericParams = document.querySelectorAll(".param");
  for(var i_numericParam=0; i_numericParam < numericParams.length; i_numericParam++)
  {
    
    // canonicalGraph.add([{ group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } }])
    let newParamNode = { group: 'nodes', 
      data: 
      { 
        id: numericParams[i_numericParam].dataset.id, 
        type: "question_parameter",
        valueDisplay: 
          numericParams[i_numericParam].dataset.value+" "+
          numericParams[i_numericParam].dataset.unit,
        value: numericParams[i_numericParam].dataset.value,
        unit: numericParams[i_numericParam].dataset.unit,
        parent: "question_params"
      }
    }

    nodeDataList[numericParams[i_numericParam].dataset.id] = newParamNode
    nodeDataArray = nodeDataArray.concat(nodeDataList[numericParams[i_numericParam].dataset.id]);

    cy.add(newParamNode)
  }
  // console.log(cy.json())
  // console.log(cy.graphml());

  var list_of_equations = [];
  for(var i_wkspace in Window.wkspacelist.workspace_list)
  {
    for(var i_eq in Window.wkspacelist.workspace_list[i_wkspace].LIST_OF_EQUATIONS_IN_WORKSPACE)
    {
      list_of_equations = list_of_equations.concat(
        Window.wkspacelist.workspace_list[i_wkspace].LIST_OF_EQUATIONS_IN_WORKSPACE[i_eq]
        );
    }
  }
  
  // Pre-analysis 1: Look at all the associations, and figure out 1-1 vs n-n relationships
  // 1. Find associations, list out the equations that connect them (dict)
  // 2. A 1-1 association will only have 2 equations connecting it
  // 2.1. A single unknown is its own system, but its answer might be transformed into a 1-1 association connecting it to the subsequent equation it was used in.
  // 2.2. nxn associations end-up with nC2 connections between themselves and cannot be simplified, leave them be.
  
  // Pre-analysis 1.1: Use solution boxes to establish any other 1-1 or nxn relationships that may need to be established.
  // For each unknown/assoc term that gets solved for, 
  //    enter a key Soln=True for an edge connecting every SourceEquation/corresponding vertex
  //    To the target equations that these solutions were used in.
  // (if one sourceeqn generated a value used in one other target equation, we have a one-one relation that maybe able to turn into an association/substitution)
  // Else, it becomes nx1, 1xn, or nxm, and we may not be able to substitute them

  // Change of plans, we're establishing it as a bipartite graph (unknowns vs equations) and then analyzing it for dependencies
  
  bipartiteEqUnknown = cytoscape();
  associations = {}; // assoc_id : eq_id

  for(var i_eq; i_eq< list_of_equations.length; i_eq++)
  {
    // Add a new node for the equation
    var newEqNode = { group: 'nodes', 
      data: 
      { 
        id: list_of_equations[i_eq]['name'],
        type: "equation",
        // newAttr: value
      }
    }
    bipartiteEqUnknown.add(newEqNode)

    // Iterate over variables to get unknowns
    for(var variableBox in list_of_equations[i_eq]['variables'])
    {
      var varBox = list_of_equations[i_eq]['variables'][variableBox];
      
      if(varBox.valueType == null) {
        // node definitely does not exist, singular unknown appearing in only one equation
        bipartiteEqUnknown.add({ group: 'nodes', data: { id: varBox.currentSymbol, type: "unknown"} })
        bipartiteEqUnknown.add({ group: 'edges', data: { 
          id: list_of_equations[i_eq]['name']+" "+varBox.currentSymbol,
          source: varBox.currentSymbol,
          target: list_of_equations[i_eq]['name']
        } })
      }
      
      else if(varBox.valueType == 'association') {
        // node probably exists, check for it
        if( !(varBox.value.var in associations) )
        {
          associations[varBox.value.var] = null;
          bipartiteEqUnknown.add({ group: 'nodes', data: { id: varBox.value.var, type: "unknown"} })
        }
        bipartiteEqUnknown.add({ group: 'edges', data: { 
          id: list_of_equations[i_eq]['name']+" "+varBox.value.var,
          source: varBox.value.var,
          target: list_of_equations[i_eq]['name']
        } })
      }
    }
  }
  
  console.log(bipartiteEqUnknown.graphml());
  return 
  // return bipartiteEqUnknown.graphml()
  // Analysis 2: Substitute equations related by a 1-1 relationship in the graph based on which one has an answer that is being used in the end.
  // i.e. if Equation 1 connects to an output box, and has one 1-1 connection to Equation 2, then Equation 2 gets substituted into Equation 1 by changing the subject.
  // Any connections from Equation 2 to others get transferred to this equation.
  // If Equation has >1 connections to other equations, check if those equations are connected by 1-1 relations or not.
  //    If yes, then substitute all of those equations in if those equations are not connected to anyone else.
  //    Else, leave those equations out.
  // End result: Only connections between simultaneous sets of equations that cannot be substituted into each other.
  // 
  // Order of substitution: start from solution box, and walk backwards to source: i.e. depth first traversal with solution box as root.
  // Go to leaf, and go upwards, merging node with root if path does not have a cycle, since that means there are multiple associations set up somewhere that cannot be substituted. (??? TO REVISE)
  // (https://en.wikipedia.org/wiki/Cycle_(graph_theory))
  // (See McGill paper 2 for details on equation dependency)
  // 
  // simplified version will not use substitution here - maybe proceed with that first?
  
  for(var i_eq=0; i_eq < list_of_equations.length; i_eq++)
  {
    var solvableRepr = list_of_equations[i_eq].createSolvableRepresentation();
    var currentEqn = solvableRepr["equations"][solvableRepr["equations"].length -1]
    var currentEqnRHSform = currentEqn.split("=")[1] + " + -1.0 * " + currentEqn.split("=")[0];
    console.log(currentEqnRHSform)
    console.log(solvableRepr)
    
    for(var i=0; i<solvableRepr["equations"].length; i++)
    {
      /**
       * V0.1 - Following the report (McGill/Atom3/IAV), the LHS and RHS should be simplified and brought to set eq=0.
       * In our case, the LHS is usually just variable, so we shift it to the right to create RHS+(-varname) expression.
       * RHS is already simplified. Then, Go through LHS (which is pretty much defined canonically anyway)
       * And account for negative terms (if value, leave it as is; if unknown/assoc, change into -1.0 * assoc)
       * 
       * (Note: The above is temporary, will have to replaced with more generic algorithms to make it more powerful)
       * (Right now:
       * 1. the equations we're using are by themselves quite simple with discrete sum and product terms,
       * but going forward and supporting general algebra will make this difficult. 
       * 2. Also, we do not support direct substitution of n1m1 equations that are associated with a term in an nKmK equation set,
       * which will require this kind of simplification down the line once the foundation is solid.
       * 3. We also assume the left side will always be one single term. Not necessarily the case when
       * we make the system more general and powerful for students to be able to create their own equations.
       * In that case, each side will require their own simplification and need to follow the rules more closely.
       * 
       * Then, run recursive algorithm to generate graph from this, setup assoc edges, etc.
       */
      
      // A varbox either has a positive of negative const or var/assoc. Either way, the structure must be preserved relative 
      // to original equation, to show that in fact the varbox appears on the left side, and so that the sign for the 
      // quantity in the box is preserved as per submitted by user
      
      // Turn the expression into an expression tree
      expression_tree = treeGen(currentEqnRHSform)
      
      // Traverse the tree again, and for each constant/symbol term,
      // Attach the corresponding unique ID from the details
      // the equation name is already provided, use this as the name for the parent node for this tree
      // and attach unique IDs to each variable in the expression tree
      
      

      // Find associations from solvableRepr and register them
      // 1. This includes variables where the x_y representation matches in unknowns in two places (i.e. multiway association)
      // 2. As well as connections connecting a constant quantity to either a solution box or parameter
      // For the given equation, go over the list of variables to extract this information
      // For each variable, 
      // if it is a number, we use valueSource to create this association to the param/solutionBox node
      // If it is an association, we use the varName in unknowns to create an entry in associationEdgeDataList and add the unique id for variables to it
      // TODO: Move this section to before canonicalization to aid simplifying the expressions first
    }
  }

  // Add the connections for associations between variables
  for(var edge in associationEdgeDataList)
  {
    // Find edges with unique ID in 
  }
}

function treeGen(expression)
{
  // Receives an expression, turns it into a canonical tree and returns it
  rootNode = null;

  mathjs.parse(expression).traverse(function(node, path, parent) {
    switch (node.type) {
      case 'OperatorNode':
        console.log(node.type, node.op, node)
        switch (node.op) {
          case '+':
            /**
             *  look at children
                if a child has is an Op +, 
                  merge them to this level
                if a child has is an Op -,
                  multiply all children nodes of that node by -1 to turn them into * (-1 x) form nodes
                  then merge all the nodes to this level as children
                if a child has an Op * node, leave it as it is.
             */
            break;
          
          case '*':
            /**
             *  look at children
                if a child has is an Op *, 
                  merge them to this level
                if a child has is an Op /,
                  exponentiate all children nodes of that node by -1 to turn them into ^ (x -1) form nodes
                  then merge all the nodes to this level as children
                if a child has an Op + node, leave it as it is (FOR NOW, SINCE IT REQUIRES SIMPLIFICATION)
             */
            break;
        }
        break
      case 'ConstantNode':
        console.log(node.type, node.value, node)
        // Simply add the value as it is
        break
      case 'SymbolNode':
        console.log(node.type, node.name, node)
        break
      default:
        console.log(node.type, node)
    }
  })
}