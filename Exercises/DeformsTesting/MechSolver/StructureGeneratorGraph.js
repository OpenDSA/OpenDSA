// MODEL
// ???

// VIEW
// Mostly in MechSolverCommon.js; a single button

// CONTROLLER
// The generator file that hands back the data

// var cy = null;

var cy = cytoscape({ /* options */})

console.log(cy);

var eles = cy.add([
    { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
    { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
    { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
  ]);
console.log("Creating a sample graph",cy.json())
console.log(cy.graphml())

Window.getGraphAnswer = function() {
  var textFileContent = "";
  var textFileName = "algebraGraph.graphml"

  // Temp only for displaying graph

  cy.destroy()
  cy = cytoscape({ /* options */ });

  textFileContent = Window.createGraphFromFormula();

  // Window.saveTextToFile(textFileContent, textFileName);
  // cy.destroy();
}

Window.createGraphFromFormula = function() {
  var nodeDataList = {};
  var nodeDataArray = [];
  var associationEdgeDataList = {};
  
  // Creating the root nodes, i.e. the values to be shown
  var numericParams = document.querySelectorAll(".param");
  for(var i_numericParam=0; i_numericParam < numericParams.length; i_numericParam++)
  {
    
    // canonicalGraph.add([{ group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } }])
    nodeDataList[numericParams[i_numericParam].dataset.id] = { group: 'nodes', 
      data: 
      { 
        id: numericParams[i_numericParam].dataset.id, 
        type: "question_parameter",
        value: numericParams[i_numericParam].dataset.valueDisplay+" "+
        numericParams[i_numericParam].dataset.unitDisplay,
        parent: "question_params"
      }
    }

    nodeDataArray = nodeDataArray.concat(nodeDataList[numericParams[i_numericParam].dataset.id]);
  }
  console.log(cy.json())
  console.log(cy.graphml());

  var list_of_equations = [];
  for(var i_wkspace in Window.wkspacelist.workspace_list)
    for(var i_eq in Window.wkspacelist.workspace_list[i_wkspace].LIST_OF_EQUATIONS_IN_WORKSPACE)
      list_of_equations = list_of_equations.concat(Window.wkspacelist.workspace_list[i_wkspace].LIST_OF_EQUATIONS_IN_WORKSPACE[i_eq]);

  for(var i_eq=0; i_eq < list_of_equations.length; i_eq++)
  {
    var solvableRepr = list_of_equations[i_eq].createSolvableRepresentation();
    var currentEqn = solvableRepr["equations"][solvableRepr["equations"].length -1]
    var currentEqnRHSform = currentEqn.split("=")[1] + " + -1.0 * " + currentEqn.split("=")[0];
    console.log(currentEqnRHSform)
    
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
        
        if(varName in solvableRepr["knowns"])
        {
            // Replace the number in the equation with the units converted to base units
            // This will be needed anyway down the road.
            var domain = Window.unitDomainMap[solvableRepr["knowns"][varName]["unit"]][0];
            var defaultUnit = Window.defaultDomains[domain][Window.unitFamily];
            // console.log(domain, defaultUnit)
            if(domain != "dimensionless" && domain in Window.defaultDomains)
            {
                // If the domain is dimensionless, don't convert to base Units; there isn't any.
                // If the domain is not recognized, don't convert either;
                // we don't need to convert back or anything since we don't have base unit info
                // as the unit was definitely not converted in this solve session.
                var baseValue = mathjs.evaluate(
                    "number("+
                    solvableRepr["knowns"][varName]["value"]+" "+
                    solvableRepr["knowns"][varName]["unit"]+" "+
                    ","+defaultUnit["unit"]+")");
            }
            else var baseValue = solvableRepr["knowns"][varName]["value"];
            solvableRepr["equations"][i] = varName+"="+baseValue;
        }
    }

    // DEBUG
    // console.log(solvableRepr);

    // Add the variables to find units for to the variableSet
    for(var vname in solvableRepr["unknowns"])
    {
        if(vname in variableSet) continue;
        // variableSet[vname] = []; // true indicates unit has been resolved
        variableSet[vname] = {}; // Trying with an object
    }
  }
}