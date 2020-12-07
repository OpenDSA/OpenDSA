/**
 * Class for defining individual workspaces. Each workspace can contain multiple
 * equations, and is associated with a single task of the problem.
 * Workspaces are created when people move to different tasks of the problem,
 * after completing the previous tasks.
 * (??)TODO: However, equations from different workspaces are accessible for solving
 * elsewhere as well.
 */


 //Need to add globalJSAVobject for event logger
class Workspace
{
    constructor(jsavCanvasObj, dim_obj, workspaceid, geb, gpr)
    {
        this.id=workspaceid;
        this.name="wk"+workspaceid;
        this.globalSectionObj = jsavCanvasObj;
        this.globalEquationBank = geb;
        this.globalPointerReference = gpr;

        // INITIALIZATIONS
        this.LIST_OF_EQUATIONS_IN_WORKSPACE = {};
        this.LIST_OF_ASSOCIATIONS = {};
        this.equationCounter = 0;
        this.equationHashMap = {};  // This is used to keep track of an enumerate
                                    // multiple instances of the same equation.

        this.LIST_OF_SOLUTIONS_IN_WORKSPACE = {};
        this.solutionCounter = 0;
        
        this.lastSolution = null;
        this.lastEquation = null;

        // Actually create the region for the new workspace
        this.DIMENSIONS = {
            "POSITION_X": dim_obj["CORNER_X"],
            "POSITION_Y": dim_obj["CORNER_Y"],
            "WIDTH": dim_obj["WIDTH"],
            "HEIGHT": dim_obj["HEIGHT"],
            "ELEMENTS": {
                "POSITION_X": dim_obj["CORNER_X"]+5,
                "POSITION_Y": dim_obj["CORNER_Y"]+20,
                "WIDTH": 30,
                "HEIGHT_PAD": 5,
                "HEIGHT": 30
            }
        }
        
        // Hold references to the individual elements in the box,
        // To delete later when required.
        this.elements = [];
        this.removebutton = null;

        this.createBox();
        // console.log(this);
    }
    createBox()
    {
        // Creating the div element and setting attributes
        this.elements[0] = {
            "jsav": this.globalSectionObj.g.rect(
                //Update this to a global object all Workspace instances receive.
                this.DIMENSIONS["POSITION_X"],
                this.DIMENSIONS["POSITION_Y"],
                this.DIMENSIONS["WIDTH"],
                this.DIMENSIONS["HEIGHT"],
                {
                    "fill":"white",
                    "r": 10,
                }),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByTagName("rect"))
        };
        this.elements[0]["div"].setAttribute("id",this.name+"box");
        // "Select an equation from the Equation Bank, and click here to add it"

        // Adding the name of the workspace
        this.elements[1] = {};
        this.elements[1] = {
            "jsav": this.globalSectionObj.label(this.name, 
                {
                    left: this.DIMENSIONS["POSITION_X"]+4, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("workspacelabel"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel"))
        };
        this.elements[1]["div"].setAttribute("id",this.name+"label");
        
        // Adding the close X button/text
        this.elements[2] = {
            "jsav":
                this.globalSectionObj.label("&#x2702", 
                {
                    left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]-20, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("close_x"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel")),
        };
        this.elements[2]["div"].setAttribute("id",this.name+"close");
        this.elements[2]["div"].setAttribute("title", "Click to remove the workspace, with all of its contents.");
        this.removebutton = document.getElementById(this.name+"close");

        // Adding the Add, Remove, Solve Buttons to add, remove, and solve equations
        this.elements[3] = {
            "jsav":
                this.globalSectionObj.label("", 
                {
                    left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 - 80, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("workspacebutton"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel")),
        };

        var addButton = document.createElement("input");
        addButton.setAttribute("type", "button");
        addButton.setAttribute("value", "Add");
        this.elements[3]["jsav"].element[0].appendChild(addButton);
        this.elements[3]["div"].setAttribute("id",this.name+"addeq");
        
        // this.elements[3]["jsav"].element[0].dataset.type = "add";
        this.elements[3]["jsav"].element[0].addEventListener('click', e => {
            e.stopPropagation();
            // Add function call to equation addition here.
            // this.globalSectionObj.logEvent({type: "adding new equation", id: this.name+"_"+
            // this.globalEquationBank.currentSelectedEquationObject.eqobject["id"]+"_"+(this.equationCounter+1)});
            this.addNewEquation();
        });
        this.elements[3]["jsav"].element[0]
        .setAttribute("title", "Add selected (highlighted) equation from the palette to this workspace.");

        // Adding the Remove equations button
        this.elements[4] = {
            "jsav":
                this.globalSectionObj.label("", 
                {
                    left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 - 36, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("workspacebutton"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel")),
        };
        
        var removeButton = document.createElement("input");
        removeButton.setAttribute("type", "button");
        removeButton.setAttribute("value", "Remove");
        this.elements[4]["jsav"].element[0].appendChild(removeButton);
        this.elements[4]["div"].setAttribute("id",this.name+"removeeq");
        
        // this.elements[4]["jsav"].element[0].dataset.type = "remove";
        this.elements[4]["jsav"].element[0].addEventListener('click', e => {
            e.stopPropagation();
            // Add function call to equation deletion here.
            this.globalSectionObj.logEvent({type: "Deleting equation"});
            this.deleteEquations();
        });
        this.elements[4]["jsav"].element[0].setAttribute("title", "Remove selected (ticked) equations from this workspace.");

        // Adding solve equations
        this.elements[5] = {
            "jsav":
                this.globalSectionObj.label("", 
                {
                    left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 + 35, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("workspacebutton"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel")),
        };
        
        var solveButton = document.createElement("input");
        solveButton.setAttribute("type", "button");
        solveButton.setAttribute("value", "Solve");
        this.elements[5]["jsav"].element[0].appendChild(solveButton);
        this.elements[5]["div"].setAttribute("id",this.name+"solveeq");
        
        // this.elements[5]["jsav"].element[0].dataset.type = "solve";
        this.elements[5]["jsav"].element[0].addEventListener('click', e => {
            e.stopPropagation();
           // Add function call to equation set solving and result propagation here.
           this.solveEquations();
        });
        this.elements[5]["jsav"].element[0].setAttribute("title", "Click to solve the system of equations.");

        // Adding the Help button/text
        this.elements[6] = {
            "jsav":
                this.globalSectionObj.label("&#xFFFD", 
                {
                    left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]-42, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("close_x"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel")),
        };
        this.elements[6]["div"].setAttribute("id",this.name+"help");
        this.elements[6]["div"].setAttribute("title", "Click to get help.");
        
        this.elements[6].jsav.element[0].addEventListener("click", e=> {
            e.stopPropagation();
            Window.showHelp("workspace", e);
            Window.jsavObject.logEvent({type: "deforms-workspace-showhelp-clicked", desc: this.id});
        })
    }
    destroyBox()
    {
        // Triggered by the clickhandler
        Window.windowManager.deleteWkspace(this.id);

        // TODO: check delete equation objects
        this.elements.forEach(x => x['jsav'].clear())
        //This is fine, since the parent knows to remove this from their tracking.
        return this.id;
    }
    updateShape()
    {
        // update the location of the box, then the text and the cross button
        // then, call the update button for everything else in it in sequence.
        this.elements[0]["div"].setAttribute("y", this.DIMENSIONS["POSITION_Y"]+"px");
        this.elements[1]["div"].style.top = this.DIMENSIONS["POSITION_Y"]-15+"px";
        this.elements[2]["div"].style.top = this.DIMENSIONS["POSITION_Y"]-15+"px";
        this.elements[3]["div"].style.top = this.DIMENSIONS["POSITION_Y"]-15+"px";
        this.elements[4]["div"].style.top = this.DIMENSIONS["POSITION_Y"]-15+"px";
        this.elements[5]["div"].style.top = this.DIMENSIONS["POSITION_Y"]-15+"px";
        this.elements[6]["div"].style.top = this.DIMENSIONS["POSITION_Y"]-15+"px";
    }
    selectWorkspaceColor()
    {
        /*colors = {
            aqua: "#00ffff",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            blue: "#0000ff",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkviolet: "#9400d3",
            fuchsia: "#ff00ff",
            gold: "#ffd700",
            indigo: "#4b0082",
            khaki: "#f0e68c",
            lightblue: "#add8e6",
            lightcyan: "#e0ffff",
            lightgreen: "#90ee90",
            lightgrey: "#d3d3d3",
            lightpink: "#ffb6c1",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            magenta: "#ff00ff",
            maroon: "#800000",
            orange: "#ffa500",
            pink: "#ffc0cb",
            silver: "#c0c0c0",
            white: "#ffffff",
            yellow: "#ffff00"
        };
        var result;
        var count = 0;
        for (var prop in colors)
            if (Math.random() < 1/++count)
                result = prop;
        return result; TODO*/
        return "#FBEEE4";
    }
    addNewEquation()
    {
        // equationListEntity is of type equation (which we will define later) and not 
        // necessarily everything in equation.js
        var equationListEntity = Window.eqbank.currentSelectedEquationObject.eqobject;
        var lastHashMapID = 0;
        if(equationListEntity["id"] in this.equationHashMap)
            lastHashMapID = (list => list[list.length-1])
            (this.equationHashMap[equationListEntity["id"]]).counter+1;
        else {
            lastHashMapID = 1;
            Window.eqbank.addToFavourites(Window.eqbank.currentSelectedEquationObject.eqobject);
        }

        // Creating the new active equation object, that handles the display
        var newActiveEquation = new ActiveEquation(
            equationListEntity,
            this.DIMENSIONS.ELEMENTS,
            this.name+"_"+
            equationListEntity["id"]+"_"+(this.equationCounter+1)+"_"+
            lastHashMapID,
            this.globalSectionObj,
            this.globalPointerReference
        )
        // console.log(this.DIMENSIONS.ELEMENTS["POSITION_Y"]);
        this.DIMENSIONS.ELEMENTS["POSITION_Y"]+=
        newActiveEquation.equationObjectReference.height+this.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
        // console.log(this.DIMENSIONS.ELEMENTS["POSITION_Y"]);
        // Handling the internal initial bookkeeping
        this.LIST_OF_EQUATIONS_IN_WORKSPACE[this.equationCounter] = newActiveEquation;
        //        |_>  To be elaborated for additional operations.
        
        // If the equation already exists or was brought in once, preemptively
        // add a subscript to this equation.
        // This can be made more complex to update the subscripts for all of them
        if(lastHashMapID > 1)
        {
            newActiveEquation.setSubscript(null, String(lastHashMapID), newActiveEquation);
            // TODO: To replace this part with the appropriate calls to each variable's
            // changeVarName method that will change their parentSymbolTemplate, no the TemplateZero,
            // so that any subsequent calls to setSubscript will be able to reset to the subscripted
            // variable names as templates in grayed out boxes as well as in associations (where the
            // original template is available as this.varDisplayTemplate).
            for(var vIndex in newActiveEquation.variables)
            {
                newActiveEquation.variables[vIndex].changeVarName("", String(lastHashMapID));
            }
        }
        
        // TODO: This needs to be included into deletion of equations, where this also gets updated
        // To possibly reset the counter to 0 if required.
        if(equationListEntity.id in this.equationHashMap)
        {
            this.equationHashMap[equationListEntity.id]
            .push(
                {
                    "instance": newActiveEquation,
                    "counter": lastHashMapID,
                    "uniqueID": this.equationCounter++,
                }
            )
        }
        else
        {
            this.equationHashMap[equationListEntity["id"]] = [
                {
                    "instance": newActiveEquation,
                    "counter": 1,
                    "uniqueID": this.equationCounter++,
                }
            ];
        }

        // Add the event handler for deleting equations in here.
        newActiveEquation.visualComponents["delete"].element[0].addEventListener("click", e => {
            e.stopPropagation();
            
            this.LIST_OF_EQUATIONS_IN_WORKSPACE[e.target.dataset.id].selected = true;
            
            var tempListofOtherSelectedEquations = {};
            for(var eq in this.LIST_OF_EQUATIONS_IN_WORKSPACE)
            {
                if(!this.LIST_OF_EQUATIONS_IN_WORKSPACE[eq].selected) continue;
                // Otherwise, unselect it temporarily and add it a list.
                else {
                    if(eq == e.target.dataset.id) continue;
                    else {
                        this.LIST_OF_EQUATIONS_IN_WORKSPACE[eq].selected = false;
                        tempListofOtherSelectedEquations[eq] = null;
                    }
                }
            }
            this.deleteEquations();

            // Reset the list of equations to normalcy (those that were selected are returned to normal)
            for(var eqindex in tempListofOtherSelectedEquations)
                this.LIST_OF_EQUATIONS_IN_WORKSPACE[eqindex].selected = true;
        });
        
        // console.log(newActiveEquation);
        this.lastEquation = newActiveEquation;
        Window.windowManager.shiftDown(this.lastEquation, this.id);
        Window.clearGlobalPointerReference();
        //console.log(this.equationHashMap);
        // console.log(this.DIMENSIONS);
    }
    oldSolveEquations()
    {
    //     // Step 1: See which equations are selected
    //     var equationSet = [];
    //     var equationObjectSet = [];
    //     for(var index in this.LIST_OF_EQUATIONS_IN_WORKSPACE)
    //     {
    //         var currentEqn = this.LIST_OF_EQUATIONS_IN_WORKSPACE[index];
    //         if(currentEqn.selected == true)
    //         {
    //             // console.log(currentEqn.name);
    //             // for(var varIndex in currentEqn.variables)
    //             // {
    //             //     console.log(currentEqn.variables[varIndex]);
    //             // }
    //             equationObjectSet.push(currentEqn);
    //             equationSet.push(currentEqn.createSolvableRepresentation());
    //         }
    //     }
    //     //console.log(equationSet);
    //     var variableSet = {};
    //     // Find all the variables in the chosen equationObjectSet
    //     for(var i=0; i<equationObjectSet.length; i++)
    //     {
    //         for(var v in equationObjectSet[i].variables)
    //         {
    //             variableSet[equationObjectSet[i].variables[v].id] = 
    //             equationObjectSet[i].variables[v].parentSymbol;
    //         }
    //     }

    //     // Step 2: Feed the list to nerdamer, see the output.
    //     var soln = null;
    //     if(equationSet.length > 1)
    //         soln = nerdamer.solveEquations(equationSet);
    //     else
    //         //soln = equationObjectSet[0].solve();
    //         soln = equationObjectSet[0].solve();
    //     //console.log(soln);

    //     // Step 3: Create the solution boxes, new boxes inside the workspace.
    //     for(var i=0; i<soln.length; i++)
    //     {
    //         var currSolution = new ValueBox(
    //             false,
    //             {
    //                 "visuals": this.DIMENSIONS.ELEMENTS,
    //                 "dataset": {
    //                     "value": soln[i][1],
    //                     "unit": "",
    //                     "variable": soln[i][0],
    //                     "valueDisplay": String(Number(Math.round(soln[i][1]+'e3')+'e-3')),
    //                     "unitDisplay": "",
    //                     "variableDisplay": variableSet[soln[i][0]],
    //                     "domain": ""
    //                 }
    //             },
    //             this.globalSectionObj,
    //             this.globalPointerReference
    //         )
    //         // Create a {} object and add the ValueBox object
    //         //FUTURE: Add .element field to all the objects, and access to move them around
    //         this.LIST_OF_SOLUTIONS_IN_WORKSPACE[this.solutionCounter] = currSolution;
    //         this.solutionCounter++;

    //         this.DIMENSIONS.ELEMENTS["POSITION_Y"]+=
    //         this.DIMENSIONS.ELEMENTS["HEIGHT"]+this.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
    //         this.lastSolution = currSolution;
    //         Window.windowManager.shiftDown(null, null, this.id);

    //     }

    //     // De-select selected equations, the list of selections will get cleared anyway.
    //     for(var index in this.LIST_OF_EQUATIONS_IN_WORKSPACE)
    //     {
    //         var currentEqn = this.LIST_OF_EQUATIONS_IN_WORKSPACE[index];
    //         if(currentEqn.selected == true)
    //         {
    //             currentEqn.visualComponents.tickmark.addClass("tickunselected");
    //             currentEqn.visualComponents.tickmark.removeClass("tickselected");
    //             currentEqn.selected = false;
    //         }
    //     }
    }

    deleteEquations()
    {
        // But first, remove all the associations as well.
        for(var eq in this.LIST_OF_EQUATIONS_IN_WORKSPACE)
        {
            if (!this.LIST_OF_EQUATIONS_IN_WORKSPACE[eq].selected) continue;
            for(var v in this.LIST_OF_EQUATIONS_IN_WORKSPACE[eq].variables)
            {
                var variable = this.LIST_OF_EQUATIONS_IN_WORKSPACE[eq].variables[v];
                if(variable.valueType == "association")
                    variable.value.removeAssociation(variable);
            }

            Window.jsavObject.logEvent({type: "deforms-equation-remove", desc: this.LIST_OF_EQUATIONS_IN_WORKSPACE[eq].name});
        }
        Window.windowManager.shiftUp(this.id);
        Window.clearGlobalPointerReference();
    }

    sEquations()
    {
        // // Step 1: See which equations are selected
        // var equationSet = []; // which stores the solvable representations in all cases.
        // var equationObjectSet = [];
        // var variableSet = {};
        // try {
        //     for(var index in this.LIST_OF_EQUATIONS_IN_WORKSPACE)
        //     {
        //         var currentEqn = this.LIST_OF_EQUATIONS_IN_WORKSPACE[index];
        //         if(currentEqn.selected == true)
        //         {
        //             equationObjectSet.push(currentEqn);
        //             var solvableRepr = currentEqn.createSolvableRepresentation();
        //             console.log(solvableRepr);
        //             // Add the equation representations
        //             for(var x=0; x<solvableRepr["equations"].length; x++)
        //                 equationSet.push(solvableRepr["equations"][x]);
        //             // Find out the unknown varDisplay-varName mapping pairs
        //             for(var vname in solvableRepr["unknowns"])  // vname is the internal symbol
        //             {
        //                 var unitDesc = currentEqn.getUnitOfVariable(vname);
        //                 // Find the unit of the variable from its corresponding equation
        //                 // variableSet[vname] = {
        //                 //     "name": solvableRepr["unknowns"][vname],    // The greek/external symbol
        //                 //     "unit": null,
        //                 //     "domain": null,
        //                 //     "unitDisp": null,
        //                 // };
        //                 if(vname in variableSet) continue;
        //                 variableSet[vname] = {
        //                     "name": solvableRepr["unknowns"][vname],    // The greek/external symbol
        //                     "unit": unitDesc[1],
        //                     "domain": unitDesc[2][0],
        //                     "unitDisp": unitDesc[2][1],
        //                 };
        //                 if(unitDesc.length == 4)
        //                     variableSet[vname]["correction"] = unitDesc[3]; // multiply the result with this to correct.
        //             }
        //         }
        //     }
        // }
        // catch (exception) {
        //     JSAV.utils.dialog(
        //         `<h4>Error</h4>
        //         There was likely a problem with the units of the values. Perhaps an unrecognized
        //         unit was used, or the unit of a quantity could not be discerned. Please review your work and
        //         try again.`, 
        //     {width: 200, closeText: "OK"})[0].addEventListener("click", e=>{
        //         e.stopPropagation();
        //     });
        //     return;
        // }
        // console.log(variableSet);
        // console.log(equationSet);
        
        // // Computing solutions
        // var soln = {};
        // var listOfSolutions = null;
        // try {
        //     if(equationObjectSet.length > 1)
        //     {
        //         listOfSolutions = nerdamer.solveEquations(equationSet);
        //         //DEBUG: Primary checking for solutions in terms of knowns;
        //         // Maybe useful for unit inference in system setting.
        //         // listOfSolutions only provides the numbers; someway to 
        //         // find the variables? Unknowns in terms of knowns? Ans: Nope, not useful
        //         console.log(equationSet);
        //     }
        //     else
        //     {
        //         // Confirmed there is only one unknown in the system.
        //         listOfSolutions = equationObjectSet[0].solve(); 
        //         console.log(listOfSolutions);
        //         console.log(variableSet);
        //         // Yeah turns out the combined logic does not work for single solvers; gives erroneous results.
        //         // var unitDesc = equationObjectSet[0].getUnitOfVariable();
        //         // variableSet[unitDesc[0]]["unit"] = unitDesc[1];
        //         // variableSet[unitDesc[0]]["domain"] = unitDesc[2][0];
        //         // variableSet[unitDesc[0]]["unitDisp"] = unitDesc[2][1];
        //     }
        // }
        // catch (exception) {
        //     JSAV.utils.dialog(
        //         `<h4>Error: Inconsistent system</h4>
        //         There was an error in defining the system of equations. Namely, #unknowns =/= #equations.<br>
        //         Please review the unknowns (associated variables) in the equations, as well as grayed out boxes
        //         which by default are treated as unknowns.<br>Please also check that the remaining equation boxes are filled
        //         with values.<br>Finally, please make sure to check all the boxes for the equations that are to be
        //         included in the system to be solved.<br>`, 
        //         {width: 200, closeText: "OK"})[0].addEventListener("click", e=>{
        //         e.stopPropagation()});
        //     return;
        // }
        // for(var i=0; i<listOfSolutions.length; i++)
        //     soln[listOfSolutions[i][0]] = listOfSolutions[i][1];
        // console.log(soln);
        
        // // console.log("Before printing solutions", this.DIMENSIONS);
        // for(var unknownName in variableSet)
        // {
        //     var value = null;
        //     if(variableSet[unknownName].length == 4)
        //         value = soln[unknownName]*variableSet[unknownName]["correction"];
        //     else
        //         value = soln[unknownName];
        //     var currSolution = new ValueBox(
        //         false,
        //         {
        //             "visuals": this.DIMENSIONS.ELEMENTS,
        //             "dataset": {
        //                 "value": value,
        //                 "unit": variableSet[unknownName]["unit"],
        //                 "variable": unknownName,    // The internal variable name eg: x_y
        //                 // "valueDisplay": String(Number(Math.round(+'e3')+'e-3')),
        //                 "valueDisplay": Window.valueStringRepr(value),
        //                 "unitDisplay": variableSet[unknownName]["unitDisp"],
        //                 "variableDisplay": variableSet[unknownName]["name"], // The greek/external symbol
        //                 "domain": variableSet[unknownName]["domain"]
        //             }
        //         },
        //         this.globalSectionObj,
        //         this.globalPointerReference
        //     )
        //     console.log(currSolution);

        //     this.LIST_OF_SOLUTIONS_IN_WORKSPACE[this.solutionCounter] = currSolution;
        //     this.solutionCounter++;

        //     this.DIMENSIONS.ELEMENTS["POSITION_Y"]+=
        //     this.DIMENSIONS.ELEMENTS["HEIGHT"]+this.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

        //     this.lastSolution = currSolution;

        //     Window.windowManager.shiftDown(null, this.id);
        // }

        // // De-select selected equations, the list of selections will get cleared anyway.
        // for(var index in this.LIST_OF_EQUATIONS_IN_WORKSPACE)
        // {
        //     var currentEqn = this.LIST_OF_EQUATIONS_IN_WORKSPACE[index];
        //     if(currentEqn.selected == true)
        //     {
        //         // currentEqn.visualComponents.tickmark.addClass("tickunselected");
        //         // currentEqn.visualComponents.tickmark.removeClass("tickselected");
        //         currentEqn.visualComponents["tickmark"].element[0].dataset.selected="unselected";
        //         currentEqn.visualComponents["tickmark"].element[0].innerHTML = "&#x2610";
        //         currentEqn.selected = false;
        //     }
        // }

    }
    solveEquations()
    {
        // Create a tally of the selected equations in the system
        var selectedEquations = {};
        var variableSet = {};
        
        // An error marker that stores all the errors we find in this run
        var errorFlag = {"error": { "global": {} }, "warning": []};
        // var errorFlag = [];

        for(var index in this.LIST_OF_EQUATIONS_IN_WORKSPACE)
        {
            if(this.LIST_OF_EQUATIONS_IN_WORKSPACE[index].selected == true)
            {
                var solvableRepr = this.LIST_OF_EQUATIONS_IN_WORKSPACE[index].createSolvableRepresentation();
                
                // DEBUG
                // console.log(solvableRepr)

                // Convert the quantities in var=value equations to base units in the equation representation
                for(var i=0; i<solvableRepr["equations"].length; i++)
                {
                    var varName = solvableRepr["equations"][i].split("=")[0];
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
                
                // IGNORE: And can get together with [knowns] to track units
                // IGNORE: if this.variables.length = solvableRepr[knowns].length then we're done for this

                // Add to list of equations to parse over for unit coherency
                selectedEquations[index] = {
                    "obj": this.LIST_OF_EQUATIONS_IN_WORKSPACE[index],
                    "repr": solvableRepr
                }

                // TODO: Add lines with logEvent() that creates a string representation of the
                // system of equations, adds it to a container, to be pushed to the database later.
            }
        }

        // create an event that pu

        // Most basic check: if #unknowns =/= #equations, that's an error
        if(Object.keys(variableSet).length != Object.keys(selectedEquations).length)
        {
            // errorFlag.push({"type":"unequalUnknownsEquations"});
            errorFlag["error"]["global"] = {
                "unequalUnknownsEquations": {
                    "description" :
                    `The number of unknowns and equations are mismatched.<br>
                Try the following:<br>
                1. See if the right equations were checked/selected <br>.
                2. See if all the appropriate variable associations were made <br>.
                3. See if any spaces are left blank that should have been filled otherwise.`,
                    "minidescription" : "The number of unknowns and equations are mismatched"
                }
                
            }
        }

        // DEBUG
        // console.log(selectedEquations);

        // Parsing selectEquations to assign units to the unknowns
        // Step 1: Assign units for simple cases, and create candidates for complex cases
        // Step 2: Resolve conflicts for complex cases
        // Step 3: Check if all units have been cleared. If not, go again.

        // ALT: first find units for unknowns in canned equations
        // Since those are most definitely known

        // This variable is used to keep track of units for conflict error checking later on.
        // This error check depends solely on the units of the "numbers" used, and is
        // indicated as a warning at [TODO].
        // description: {domain : {unit : Variable.id, ... }, ... }

        // Create equation representation to push back
        let solveSet = {};

        for(var vindex in selectedEquations)
        {
            solveSet[vindex] = {};
            solveSet[vindex]["name"] = selectedEquations[vindex].obj.name;
            solveSet[vindex]["repr"] = selectedEquations[vindex].repr;
        }

        Window.jsavObject.logEvent({
            type: "deforms-solve-started",
            desc: JSON.stringify(solveSet)
        })

        var globalUnitList = {};

        for(var eq in selectedEquations)
        {
            var currentEqn = selectedEquations[eq];
            var currActiveEqnObject = currentEqn.obj;

            if(currActiveEqnObject.equationObjectReference.group == "Arithmetic")
            // if("resolve" in currActiveEqnObject.equationObjectReference)
                continue;
            else 
            {
                // Canned equations
                // iterate over the variables in the equation, find unknowns, set their units

                // This unit list is unique to this equation only
                var unitList = {};
                var unknowns = {};

                for(var v in currActiveEqnObject.variables)
                {
                    var unknown = currActiveEqnObject.variables[v];
                    if(unknown.valueType == "number")
                    {   
                        if(unknown.expectedDomain != unknown.currentDomain)
                        {
                            // errorFlag.push({"type":"wrongDomainNumber", "varID": unknown.id});
                            errorFlag["error"][unknown.id] = {
                                "wrongDomainNumber": {
                                    "description":
                                    `This position expected a value of a certain type, but<br>
                                    received something else. Please re-check and try again.<br>`,
                                    "minidescription" : "Please recheck units of value entered."
                                }
                            }
                            continue;
                        }

                        // continue;
                        if(!(unknown.expectedDomain in globalUnitList))
                        {
                            globalUnitList[unknown.expectedDomain] = {};
                        }
                        if(!(unknown.expectedDomain in unitList))
                        {
                            unitList[unknown.expectedDomain] = {};
                        }
                        if(!(unknown.currentUnit in globalUnitList[unknown.expectedDomain]))
                        {
                            globalUnitList[unknown.expectedDomain][unknown.currentUnit] = [];
                        }
                        if(!(unknown.currentUnit in unitList[unknown.expectedDomain]))
                        {
                            unitList[unknown.expectedDomain][unknown.currentUnit] = null;
                        }
                        globalUnitList[unknown.expectedDomain][unknown.currentUnit].push(unknown.id);
                    }
                    // Best case, the single unknowns are fully determined
                    else if(unknown.valueType == null)
                    {
                        // unknowns[v] = null;
                        unknowns[unknown.currentSymbol] = null;
                        // variableSet[unknown.currentSymbol] = [{
                        //     "domain": unknown.expectedDomain,
                        //     // "unit": Window.defaultDomains[unknown.expectedDomain][Window.unitFamily],

                        //     // We check the units too because we check for intra-domain unit consistency
                        //     // mm vs m, etc. and add warnings for that later
                        //     // We store the equation we're using to resolve this, and later figure it out
                        //     "equation": currentEqn,
                        // }]
                        variableSet[unknown.currentSymbol] = {};
                        variableSet[unknown.currentSymbol][unknown.expectedDomain] = {
                            "equation": [currentEqn]}
                    }
                    // For associations, we collect all the domains across assignments.
                    // If they all match, then we have a winner.
                    // Else, we have an error, and we point to the equation with a conflict
                    else if(unknown.valueType == "association")
                    {
                        // unknowns[v] = null;
                        unknowns[unknown.value.var] = null;
                        // if(variableSet[unknown.value.var].length == 0)
                        if(Object.keys(variableSet[unknown.value.var]).length == 0)
                        {
                            // variableSet[unknown.value.var] = [{
                            //     "domain": unknown.expectedDomain,
                            //     // "unit": Window.defaultDomains[unknown.expectedDomain][Window.unitFamily],
                            //     "equation": currentEqn
                            // }];
                            variableSet[unknown.value.var] = {};
                            variableSet[unknown.value.var][unknown.expectedDomain] = {
                                "equation": [currentEqn]
                            };
                        }
                        else if(Object.keys(variableSet[unknown.value.var]).length > 0)
                        {
                            // variableSet[unknown.value.var].push({
                            //     "domain": unknown.expectedDomain,
                            //     // "unit": Window.defaultDomains[unknown.expectedDomain][Window.unitFamily],
                            //     "equation": currentEqn
                            // });

                            // If the domain already exists, it must have been resolved earlier.
                            // This step validates/invalidates the earlier info.
                            // if domain exists, add that you're adding this equation to the list.
                            // Simple pushing is okay since the equations are processed only once in order.
                            if(unknown.expectedDomain in variableSet[unknown.value.var])
                                variableSet[unknown.value.var][unknown.expectedDomain]
                                .equation.push(currentEqn);
                            else 
                                variableSet[unknown.value.var][unknown.expectedDomain] 
                                = { "equation" : [currentEqn] };
                        }
                    } 
                }

                // create summary of possible units for the domains observed for the unknowns
                // from this specific equation
                for(var v in unknowns)
                {
                    // for(var i=0; i<variableSet[v].length; i++)
                    for(var dom in variableSet[v])
                    {
                        // Creating a list of candidate units
                        // if(!("unit" in variableSet[v][i]))
                        //     variableSet[v][i]["unit"] = {};
                        if(!("unit" in variableSet[v][dom]))
                            variableSet[v][dom]["unit"] = {};
                        
                        // If the domain is found in this unitList, copy over all the candidate units
                        // with overwriting.
                        // if(variableSet[v][i]["domain"] in unitList)
                        if(dom in unitList)
                        {
                            // for(var u in unitList[variableSet[v][i]["domain"]])
                            //     variableSet[v][i]["unit"][u] = null;
                            for(var u in unitList[dom])
                                variableSet[v][dom]["unit"][u] = null;
                        }
                        
                        // If the domain is not found, then we can assign the base unit that we know
                        // for this quantity, since we have nothing else to go by.
                        // Base case - a single item list is created used for additions later.
                        else{
                            // var unitSymbol = 
                            // Window.defaultDomains[variableSet[v][i]["domain"]][Window.unitFamily]["unit"];
                            // variableSet[v][i]["unit"][unitSymbol] = null;
                            if(dom in Window.defaultDomains)
                            {
                                var unitSymbol = Window.defaultDomains[dom][Window.unitFamily]["unit"];
                                variableSet[v][dom]["unit"][unitSymbol] = null;
                            }
                            else
                            {
                                // The domain does not exist in defaultDomains.
                                // It was not computed in this round clearly, it is coming in from before.
                                // This domain must be coming from a value quantity, not an association.
                                //      If it was an association, it would be discerned later in the steps.
                                //      It cannot be a single unknown, which is determined here or later.
                                //      So, it has to be a quantity that was dropped in.
                                // BUT, the quantity units are used to discern specifically what
                                // non base units we can use for a particular domain in this equation/globally.
                                // particular domain = domain for singular/associ unknown, which is obtained
                                // from currentDomain etc., so it can't be something completely weird.
                                // Still, we leave this here in case it does come up.

                                // ENABLE IF NECESSARY
                                // var unitSymbol = Object.keys(unitList[dom]["unit"])[0];
                                // variableSet[v][dom]["unit"][unitSymbol] = null;
                                console.log("Something weird happened; non-dafaultDomain in canned equation.")
                                console.log(currentEqn);
                            }
                        }
                    }
                }
            }
        }
        
        // addly, check for conflicts in associations and mark those out
        // TODO: Can this be moved to the end, prior to solving the system of equations?
        // for(var v in variableSet)
        // {
        //     // For all unknowns so far, resolve to a single domain, if possible.
        //     // Then, resolve to a single unit.
        //     if(variableSet[v].length == 1)
        //     {
        //         // Ignore for now, assign the intra-domain conflict-resolved units later on
        //         continue;
        //     }
        //     else if(!(variableSet[v]))
        //     {
        //         // NOTE: All unknowns are added to variableSet, so we have to be careful.
        //         // TODO: Check if the corresponding equation is of Arithmetic group or not
        //         console.log("Variable not resolved in first pass; "+v)
        //         // errorFlag.push({"type":"unresolvedVar", "var": v});
        //     }
        //     else {
        //         var resolvedDomain = null;
        //         for(var i=0; i<variableSet[v].length; i++)
        //         {
        //             if(resolvedDomain == null)
        //                 resolvedDomain = variableSet[v][i];
        //             else if (resolvedDomain.domain != variableSet[v][i].domain)
        //             {
        //                 // TODO: highlight variableSet[v].equation
        //                 // highlight to be disabled only after selecting the equation 
        //                 // including in system once again.
                        
        //                 // Abort the solution process, we have an error that needs to be fixed first.
        //                 errorFlag.push({
        //                     "type":"conflictingDomain", "var": v,
        //                     "eqn": variableSet[v][i].equation
        //                 });
        //             }
        //         }
        //         if(resolvedDomain)
        //             variableSet[v] = [resolvedDomain];
        //         // This ^^ moves the units observed as well as the domain.
        //         // For a variable with only one unit candidate, this is the final thing.
        //         // For a variable with multiple unit candidates in the same domain,
        //         // this needs to be processed further.
        //     }
        // }
        // Error checking continued from above
        // if(errorFlag.length > 0)
        // {
        //     for(var e=0; e<errorFlag.length; e++)
        //     {
        //         // do the highlighting etc. for error handling in here.
        //         // This one only handles wrongNumberDomain and conflictingDomain errors here.
        //         // without which the next steps cannot be completed.
        //         console.log(errorFlag[e]);
        //     }
        //     return;
        // }

        // DEBUG: Working so far
        console.log(variableSet);
        // return;
        
        // Phase 2: resolve all the "any" and "all" equations - \sum and \times types

        // Start: For each equation, see if it is of any/all condition type
        
        // For "any" type equations,
        // first pass, find the variables from variableSet that are in it, and their units/domains
        // If there are multiple domains, skip this equation, this is an error - 
        //      Point to the equation and say it needs revision
        // If same domain but multiple conflicting units, take the lowest order unit:
        // eg: mm vs m is mm, mm vs cm is cm, cm vs m is cm, etc.
        // Second pass (if no error), set as the units/domains for all of the unresolved variables
        // i.e. variableSet[v] = []

        // For "all" type equations,
        // first pass, find the variables from variableSet that are in it, and their units/domains
        // i.e. find the plugged in quants, resolved vars and unresolved vars, everything.
        // if there is one unresolved var, then we can predict the unit+domain for it
        //      Resolve the unit:
        // Else, we throw an error saying the domain is ambiguous, and highlight the variable.
        //      Which is true, since if c = a/b, and a=mm, c=? and b=?, we don't know what can happen.
        //      or: c=a*b and c = N.m, a=? and b=? - a=N.m and b=1, or a=m, and b=N? not known unless
        //          resolved otherwise. Hence.

        // if all the variables in variableSet are not defined yet, !(variableSet[v])
        // note the unresolved variables.
        // if the unresolved variables are the same as last time, throw an error since no more are left
        // to be resolved, and quit.
        // repeat from this process from Start: if some new variables were resolved.

        // Resolving the unit: how-to (suggestion)
        // "all" type equations have alternative forms for each of the variable positions
        // i.e. different ways to present the variable as a subject of the equation.
        // if one unresolved unknown is left,
        //      we lookup the alternative version that has this as the subject,
        //      plug in 1 unit of resolved unit quantities into this form
        //      and let mathjs tell us what the unit should be.
        //      if the domain can be determined, then we set it accordingly.
        //      Otherwise, the domain is unknown, and we can't support conversions.
        //      Only the units get inherited if this resolution is used in later resolutions.
        
        // At this stage, the domains are known wherever we can;
        // the units are used directly for later resolutions.
        var passFlag = true;
        
        // Creating a list of as yet completely unresolved variables
        var unresolvedVariablesCounter = 0;
        for(var v in variableSet)   if(Object.keys(variableSet[v]).length == 0)  unresolvedVariablesCounter++;

        while(passFlag)
        {
            for(var eq in selectedEquations)
            {
                var currentEqn = selectedEquations[eq];
                var currActiveEqnObject = currentEqn.obj;
                
                if(
                    currActiveEqnObject.equationObjectReference.group == "Arithmetic" &&
                    "resolve" in currActiveEqnObject.equationObjectReference &&
                    currActiveEqnObject.equationObjectReference.resolve == "any"
                )
                {
                    var unknowns = {};
                    var unitList = {};
                    // var resolvedDomain = null;

                    for(var v in currActiveEqnObject.variables)
                    {
                        var unknown = currActiveEqnObject.variables[v];
                        if(unknown.valueType == "number")
                        {
                            if(!(unknown.currentDomain in globalUnitList))
                            {
                                globalUnitList[unknown.currentDomain] = {};
                            }
                            if(!(unknown.currentDomain in unitList))
                            {
                                unitList[unknown.currentDomain] = {};
                            }
                            
                            if(!(unknown.currentUnit in globalUnitList[unknown.currentDomain]))
                            {
                                globalUnitList[unknown.currentDomain][unknown.currentUnit] = [];
                            }
                            if(!(unknown.currentUnit in unitList[unknown.currentDomain]))
                            {
                                unitList[unknown.currentDomain][unknown.currentUnit] = null;
                            }
                            globalUnitList[unknown.currentDomain][unknown.currentUnit].push(unknown.id);

                            // candidate Domain
                            // If the resolveDomain (non-null, seen something already) conflicts,
                            // We've got a major error; we might have to stop this fully.
                            // if(resolvedDomain != null && resolvedDomain.domain != this.currentDomain)
                            //     errorFlag.push({
                            //         "type":"conflictingDomain", "var": v,
                            //         "eqn": variableSet[v][i].equation
                            //     });
                            // else
                            //     resolvedDomain = {
                            //         "domain" : this.currentDomain,
                            //         "equation" : currentEqn
                            //     }
                        }
                        // Best case, the single unknowns are fully determined
                        else if(unknown.valueType == null)
                        {
                            // Record this variable, we'll assign it at the end with a common
                            // domain once we have this equation resolved; i.e.
                            // plugged values have no conflicting domains, and 
                            unknowns[unknown.currentSymbol] = null;
                        }
                        // For associations, we collect all the domains across assignments.
                        // If they all match, then we have a winner.
                        // Else, we have an error, and we point to the equation with a conflict
                        if(unknown.valueType == "association")
                        {
                            unknowns[unknown.value.var] = null;

                            // If this is the first time this unknown/assoc appears, and it is in
                            // the Arithmetic equation, it is like the single unknown. Leave it until it is
                            // fully resolved at the very end.
                            if(Object.keys(variableSet[unknown.value.var]).length == 0)
                            {
                                continue;
                            }
                            else if(Object.keys(variableSet[unknown.value.var]).length > 0)
                            {
                                // copy over what we know so far about this association to the
                                // working memory, i.e. the unitList
                                // for(var index=0; index<variableSet[v].length; index++)
                                // {
                                //     var obj = variableSet[v][i]; 
                                //     if(!(obj.domain in unitList))
                                //         unitList[obj.domain] = {};
                                //     for(var u in obj.unit)
                                //         unitList[obj.domain][u] = null;
                                // }
                                for(var dom in variableSet[unknown.value.var])
                                {
                                    if(!(dom in unitList))
                                        unitList[dom] = {};
                                    for(var u in variableSet[unknown.value.var][dom].unit)
                                        unitList[dom][u] = null;
                                }
                            }
                        }
                    }

                    // Resolving the unit for this equation

                    // If >1 domains, we throw/record an error
                    if (Object.keys(unitList).length > 1)
                    {
                        // Multiple domains in an addition equation; a serious error.
                        // TODO: Fix this to proper error keying when possible.
                        // errorFlag.push({
                        //     "type":"conflictingDomain",
                        //     "eqn": currActiveEqnObject
                        // });
                        errorFlag["error"][currActiveEqnObject.name] = {
                            "conflictingDomain": {
                                "description":
                                `While inferring units for variables and checking<br>
                                for consistency, we found that this equation might<br>
                                have variables which may even have multiple domains <br>
                                defined for the same unknown. Please revise and retry.<br>`,
                                "minidescription" : `Conflicting domains for unknowns encountered.
                                 Unit could not be determined.`
                            }
                        }
                        // Ignore further processing, and continue.
                        // continue;
                    }
                    
                    else if (Object.keys(unitList).length == 0)
                        ;// continue; // We'll find the units in some other iteration, let ctrl fall to end
                    
                    else if(Object.keys(unitList).length == 1)
                    {
                        // Technically, the unit conflict error is not reported until the end
                        // when we actually try to resolve all of the domains and units
                        // or in resolve="all" type equations where we need to know one
                        // definite answer for domain and unit. But even there, we assume nothing
                        // and parse over the entire container (object/list) first as long as
                        // there is only one domain
                        var resolvedDomain = Object.keys(unitList)[0];

                        // Important NOTE: the domains and units are completely free here;
                        // i.e. we don't refer to ./Maps.js to find units for a domain we recognize
                        // or even check it. So, any custom unit defined/calculated from previous
                        // steps can make it through to here, no problems. It can also make it through
                        // multiple rounds of computations if need be.
                        // Side note: typically, custom unit quantities are used in Arithmetic
                        // custom equations, not in canned stuff (unless by mistake). So, this is fine.

                        for(var v in unknowns)
                        {
                            // If yet unresolved, no information available
                            // assign to it without fear, whatever we have as common.
                            if(Object.keys(variableSet[v]).length == 0)
                            {
                                // First catch, assign to it blindly since resolved
                                variableSet[v] = {};
                                variableSet[v][resolvedDomain] = {
                                    "unit": {},
                                    "equation": [currActiveEqnObject]
                                };
                            }
                            // for(var d; d<variableSet[v].length; d++)

                            // If the  domain already exists in the variableSet, update it
                            if(!(resolvedDomain in variableSet[v]))
                                variableSet[v][resolvedDomain] = {"unit" : {}, "equation" : []}
                            // Else, it all already exists, so no worries
                            for(var u in unitList[resolvedDomain])
                            {
                                variableSet[v][resolvedDomain]["unit"][u] = null;
                                // variableSet[v][resolvedDomain]["equation"].push(currActiveEqnObject);
                            }
                        }
                    }
                    // else if(Object.keys(unitList).length == 0) continue;
                }
                else if(
                    currActiveEqnObject.equationObjectReference.group == "Arithmetic" &&
                    "resolve" in currActiveEqnObject.equationObjectReference &&
                    currActiveEqnObject.equationObjectReference.resolve == "all"
                )
                {
                    var unknowns = {};
                    // var unitList = {};

                    // Find the dimensions you already know.
                    // unlike previous cases where we used unitList 
                    // (which only cares about what units exist overall in the equation),
                    // here we want to explicitly track what units occur in which equation term
                    var variableTermAssoc = {};
                    
                    for(var v in currActiveEqnObject.variables)
                    {
                        var unknown = currActiveEqnObject.variables[v];
                        variableTermAssoc[unknown.name] = null;
                        if(unknown.valueType == "number")
                        {
                            if(!(unknown.currentDomain in globalUnitList)){
                                globalUnitList[unknown.currentDomain] = {};
                            }
                            if(!(unknown.currentUnit in globalUnitList[unknown.currentDomain])){
                                globalUnitList[unknown.currentDomain][unknown.currentUnit] = [];
                            }
                            globalUnitList[unknown.currentDomain][unknown.currentUnit].push(unknown.id);
                            
                            // Only the unit needs to be known if the quantity is already well defined.
                            variableTermAssoc[unknown.name] = {};
                            variableTermAssoc[unknown.name][unknown.currentDomain] = {};
                            variableTermAssoc[unknown.name][unknown.currentDomain][unknown.currentUnit] = {};
                        }
                        // MAJOR TODO:
                        // REVISE THE ENTIRE LOGIC FROM HERE BELOW
                        // DECIDE WHAT AND HOW TO INCORPORATE AS UNKNOWNS.
                        // 
                        // ALSO NOTE:
                        // TRACKING ALL THE UNITS IN A DOMAIN HELPS IN RESOLVING INTRA-DOMAIN CONFLICT,
                        // BUT TRACKING ACROSS DOMAINS IS USELESS, SINCE WE HAVE NO IDEA ABOUT
                        // CONSISTENCY HERE AS THERE IS NO WAY TO TELL WHAT UNITS CAN BE WHERE
                        // IN AN EQUATION, EXCEPT WHAT WE ALREADY KNOW.
                        // EG: NO POINT IN SAYING there exists a length, mass, and work domain
                        // no consistency checking can be done here (except that there is only 
                        // 1 domain for a resolved variable, and no more) since mult/div can create
                        // any kind of domain - which is what we are trying to check here.
                        // 
                        // UNLESS - WE CHECK FOR CONSISTENCY BY COMPARING TWO SIDES OF AN EQUATION
                        // IN THE EVENT THAT WE HAVE RESOLVED DOMAINS AND UNITS FOR VARIABLES (???)
                        // 
                        else if(unknown.valueType == null)
                        {
                            // If the variable is as yet unresolved, we consider this an unknown
                            if(Object.keys(variableSet[unknown.currentSymbol]).length == 0)
                            {
                                unknowns[unknown.currentSymbol] = unknown.name;
                            }
                            else
                            {
                                // If info exists, we pull this in for consistency check
                                variableTermAssoc[unknown.name] = {};
                                for(var dom in variableSet[unknown.currentSymbol])
                                {
                                    variableTermAssoc[unknown.name][dom] = {};
                                    for(var unit in variableSet[unknown.currentSymbol][dom])
                                    {
                                        // Assign the units as is, count them later for consistency
                                        variableTermAssoc[unknown.name][dom][unit] = null;
                                    }
                                }
                            }
                        }
                        if(unknown.valueType == "association")
                        {
                            if(Object.keys(variableSet[unknown.value.var]).length == 0)
                            {
                                // If the unknown occurs twice in the equation,
                                // then the second occurrence overwrites the first one;
                                // but this doesn't matter since the associated unit info
                                // will be the same.
                                unknowns[unknown.value.var] = unknown.name;
                                continue;
                            }
                            else if(Object.keys(variableSet[unknown.value.var]).length > 0)
                            {
                                // If the unknown occurs twice in the equation,
                                // then the second occurrence overwrites the first one;
                                // but this doesn't matter since the associated unit info
                                // will be the same.
                                // Plus, we need the information anyway to substitute in the 'x'terms
                                // for verification, if that comes up.
                                // for(var index=0; index<variableSet[v].length; index++)
                                // {
                                //     var obj = variableSet[v][i]; 
                                //     if(!(obj.domain in variableTermAssoc[unknown.name]))
                                //         variableTermAssoc[unknown.name][obj.domain] = {};
                                //     for(var u in obj.unit)
                                //         variableTermAssoc[unknown.name][obj.domain][u] = null;
                                // }
                                variableTermAssoc[unknown.name] = {};
                                for(var dom in variableSet[unknown.value.var])
                                {
                                    variableTermAssoc[unknown.name][dom] = {};
                                    for(var unit in variableSet[unknown.value.var][dom]["unit"])
                                    {
                                        // Assign the units as is, count them later for consistency
                                        variableTermAssoc[unknown.name][dom][unit] = null;
                                    }
                                }
                            }
                        }
                    }

                    // typically, these equations would have only one unknown.
                    // Only one variable out of all (usually 3) will be unresolved.
                    // If there is more than one unresolved variable, we will skip the next step
                    //     In the end, if we still have this as unresolved, then we have a joint unresolved
                    //     situation where the units/domain of the variables are interdependent and
                    //     cannot be properly discerned.
                    // Else, we look at the units for the rest.
                    // If they have been uniquely discerned, we are good.
                    // if there is a domain conflict, we record an error.
                    console.log(variableTermAssoc)
                    console.log(unknowns)
                    // return;

                    if(Object.keys(unknowns).length == 1)
                    {
                        // The meat of the matter; calculate the resultant unit and domain
                        var subjectFormKeyString = "";

                        for(var vta in unknowns) {
                            subjectFormKeyString+=unknowns[vta];
                            subjectFormKeyString+=" ";
                        }
                        // console.log(subjectFormKeyString.trimEnd());
                        var subjectForm = currActiveEqnObject.equationObjectReference
                                          .subjectForm[subjectFormKeyString.trimEnd()];
                        
                        let baseUnit = null;
                        let baseUnitSubjectForm = currActiveEqnObject.equationObjectReference
                                                  .subjectForm[subjectFormKeyString.trimEnd()];
                                                //   simply a copy of subjectForm used to compute the baseUnit
                        
                        // console.log(subjectForm);
                        
                        var skipProcessing = false;

                        // substitute units etc in subjectForm and baseUnitSubjectForm
                        for(var vta in variableTermAssoc)
                        {
                            if(variableTermAssoc[vta] != null)
                            {
                                // Then substitute the units and calculate

                                // If the number of units is bigger,
                                if(Object.keys(variableTermAssoc[vta]).length > 1)
                                {
                                    // errorFlag.push({
                                    //     "type":"conflictingDomain", "var": v,
                                    //     "eqn": currActiveEqnObject
                                    // });
                                    errorFlag["error"][currActiveEqnObject.name] = {
                                        "conflictingDomain": {
                                            "description":
                                            `While inferring units for variables and checking<br>
                                            for consistency, we found that this equation might<br>
                                            have variables which have multiple domains <br>
                                            defined for the same unknown. Please revise and retry.<br>`,
                                            "minidescription" : `Conflicting domains for unknowns encountered.
                                            Unit could not be determined.`
                                        }
                                    }
                                    skipProcessing = true;
                                    // Ignore further processing, and continue.
                                    break;
                                }

                                // Get the domain if it's just one domain
                                var unitDomKey = Object.keys(variableTermAssoc[vta])[0]

                                // Check if there is >1 units, if so, choose
                                // NOTE: if the unit is weird/custom/unrecognized, then there will be
                                // (for now) only one unit in that domain, and domain == unit.
                                // So, this will return one unit only.
                                if(Object.keys(variableTermAssoc[vta][unitDomKey]).length > 1)
                                    var unit = Window.lowestCommonUnit(
                                        variableTermAssoc[vta][unitDomKey]["unit"], unitDomKey);
                                else var unit = Object.keys(variableTermAssoc[vta][unitDomKey])[0];

                                subjectForm = subjectForm.replace(new RegExp(vta, 'g'), "1 "+unit);

                                // Now repeat for baseUnitSubjectForm
                                // If the domain exists, get the base unit
                                // Else, ignore it, since it wasn't converted in the first place.

                                if(domain in Window.defaultDomains)
                                    var baseUnitpart = 
                                    Window.defaultDomains[unitDomKey][Window.unitFamily]["unit"];
                                else
                                    var baseUnitpart = unit; // No conversion was done, just use the unit
                                baseUnitSubjectForm = 
                                    baseUnitSubjectForm.replace(new RegExp(vta, 'g'), "1 "+baseUnitpart);
                            }
                        }

                        // If true, skip processing this equation, since an error has occurred
                        if(skipProcessing)  continue;
                        else
                        {
                            // remove the magnitude and get the rest of the units
                            var resultUnit = mathjs.evaluate(subjectForm).toString().split(" ").slice(1).join(" ");
                            var resultDomain = null;
                            if(resultUnit in Window.unitDomainMap)  //  Moment of truth: weird unit, or not?
                                resultDomain = Window.unitDomainMap[resultUnit][0]
                            else if(resultUnit ==  undefined) resultDomain = "dimensionless"
                            else resultDomain = resultUnit;

                            if(resultDomain in variableSet[Object.keys(unknowns)[0]])
                                variableSet[Object.keys(unknowns)[0]][resultDomain]["unit"][resultUnit] = null;
                            else {
                                // variableSet[Object.keys(unknowns)[0]] = {};
                                variableSet[Object.keys(unknowns)[0]][resultDomain] = {"unit" : {}};
                                variableSet[Object.keys(unknowns)[0]][resultDomain]["unit"][resultUnit] = null;
                            }

                            // special case, if the domain is weird/unrecognized
                            // only in the special case that we need to define an explicit baseUnit,
                            // will this be used
                            if(resultDomain == resultUnit)
                            {
                                let baseUnit = 
                                    mathjs.evaluate(baseUnitSubjectForm).toString().split(" ").slice(1).join(" ");
                                // No need to check if this one exists or not; it doesn't, we've confirmed that
                                variableSet[Object.keys(unknowns)[0]][resultDomain]["baseUnit"] = baseUnit;
                            }
                        }

                        // from before:
                        // Now check the units in the terms.
                        // If any of the terms have more than one domain that we know of
                    }
                    else if(Object.keys(unknowns).length == 0)
                    {
                        // VERIFICATION ONLY; NO UNITS ARE ASSIGNED IN HERE.

                        // For now, treat it as an error and skip
                        // errorFlag.push({
                        //     "type":"overdeterminedEquation",
                        //     "eqn": variableSet[v][i].equation
                        // });

                        var subjectForm = currActiveEqnObject.equationObjectReference.subjectForm["consistency"];

                        var skipProcessing = false;
                        for(var vta in variableTermAssoc)
                        {
                            // if there is more than one domain for any of the variables, we have a conflict
                            if(Object.keys(variableTermAssoc[vta]).length > 1)
                            {
                                errorFlag["error"][currActiveEqnObject.name] = {
                                    "conflictingDomain": {
                                        "description":
                                        `While inferring units for variables and checking<br>
                                        for consistency, we found that this equation might<br>
                                        have variables which have multiple domains <br>
                                        defined for the same unknown. Please revise and retry.<br>`,
                                        "minidescription" : `Conflicting domains for unknowns encountered.
                                        Unit could not be determined.`
                                    }
                                }
                                skipProcessing = true;
                                // Ignore further processing, and continue.
                                break;
                            }

                            // Get the domain if it's just one domain
                            var unitDomKey = Object.keys(variableTermAssoc[vta])[0]

                            // Check if there is >1 units, if so, choose
                            if(Object.keys(variableTermAssoc[vta][unitDomKey]).length > 1)
                                var unit = Window.lowestCommonUnit(
                                    variableTermAssoc[vta][unitDomKey], unitDomKey);
                            else var unit = Object.keys(variableTermAssoc[vta][unitDomKey])[0];

                            subjectForm = subjectForm.replace(new RegExp(vta, 'g'),"1 "+unit);
                        }

                        // If true, skip processing this equation, since an error has occurred
                        if(skipProcessing)  ;//continue;
                        else
                        {
                            // remove the magnitude and get the rest of the units
                            var resultUnit = mathjs.evaluate(subjectForm).toString().split(" ").slice(1).join(" ");
                            
                            if(resultUnit ==  "")
                            {
                                // Then we're good to go, no problems here!
                                // Just keep going
                            }
                            else
                            {
                                // errorFlag.push({
                                //     "type":"consistencyError",
                                //     "eqn": currActiveEqnObject
                                // });
                                errorFlag["error"][currActiveEqnObject.name] = {
                                    "consistencyError": {
                                        "description":
                                        `While checking for consistency, we found that this equation might<br>
                                        have variables whose domains are not consistent with<br>
                                        each other. Please revise and retry.<br>`,
                                        "minidescription" : `This equation might have variables whose 
                                        domains are not consistent with each other.`
                                    }
                                }
                                console.log("Error here")
                                // record the error and keep going
                            }
                        }
                        // No unit assignments etc. are done here;
                        // because of how specific the resolution for resolve="all" type equations is,
                        // we check for consistency errors in here first.
                    }
                    else if(Object.keys(unknowns).length > 1) 
                    {
                        // unresolvable right now, try again later.
                        // continue;
                    }
                    // else if(countUnknowns == 3) continue;
                    // This one is a corner case, and we ignore it for now, i.e. classify >1 unknowns as
                    // unresolved and leave it till the next iteration.
                    // 
                    // 2 or more variables can be resolved if we know about the higher level relationships
                    // spanning across different equations eg: compressing eqs when applicable,
                    //  and even then it's a long-shot.
                    // 
                    // else if(countUnknowns == 2)
                    // {
                    //     var subjectFormKeyString = "";
                    //     for(v in variableTermAssoc)
                    //         if(variableTermAssoc[v] == null)
                    //             subjectFormKeyString+=v;

                    //     if(v in )
                    // }
                    
                }
            }

            // Comparing number of unresolved variables
            var tempUVC = 0;
            for(var v in variableSet)   if(Object.keys(variableSet[v]).length == 0)  tempUVC++;
            if(tempUVC == 0)
            {
                // no new variables were resolved, quit and throw an error
                console.log("Quitting time")
                passFlag = false;
            }
            else if(tempUVC < unresolvedVariablesCounter)
            {
                // number of unresolved variables has gone down, do another round 
                passFlag = true;
                unresolvedVariablesCounter = tempUVC;
            }
            else if(tempUVC == unresolvedVariablesCounter)
            {
                // no new variables were resolved, quit and throw an error
                console.log("Quitting time")
                passFlag = false;
                // errorFlag({"type":"unresolvedVariable", "var": []});
            }
        }
        console.log(variableSet)

        // Resolving units and domains for unknowns (single and assoc), 
        // and generating inconsistency errors if any
        for(var v in variableSet)
        {
            // If there's more than one domain for the variable after all the processing,
            // We've got a problem, and cannot resolve it.
            if(Object.keys(variableSet[v]) > 1)
            {
                // errorFlag.push({"type":"conflictingDomain", "var": v});
                errorFlag["error"][v] = {
                    "conflictingDomain" : {
                        "description":
                        `While attempting to discern the units for the quantity,<br>
                        we noticed inconsistencies, such that the variable may<br>
                        resolve to multiple domains. Please recheck and revise.<br>`,
                        "minidescription" : `Conflicting domains for unknowns encountered.
                        Unit could not be determined.`
                    }
                }
            }
            if(Object.keys(variableSet[v]) == 0)
            {
                // errorFlag.push({"type":"unresolvedVar", "var": v});
                errorFlag["error"][v] = {
                    "unresolvedVar" : {
                        "description":
                        `The units for this variable could not be resolved.<br>
                        Maybe the equations were setup in a way that creates<br>
                        non-linearity, or create unresolvable situations. Please<br>
                        recheck and revise.<br>`,
                        "minidescription" : `Units of this unknown could not be resolved.`
                    }
                }
            }
            else
            {
                var varObject = {};
                varObject["domain"] = Object.keys(variableSet[v])[0];
                varObject["unit"] = Window.lowestCommonUnit(
                    variableSet[v][varObject["domain"]]["unit"], Object.keys(variableSet[v])[0]);
                
                if(!(varObject["domain"] in Window.UNIT_DB))
                {
                    varObject["unitDisp"] = varObject["unit"];
                    // This also means domain ==  unit, get the baseUnit at that domain for v
                    varObject["baseUnit"] = variableSet[v][varObject["domain"]]["baseUnit"];
                }
                else varObject["unitDisp"] = Window.unitDomainMap[varObject["unit"]][1];
                
                variableSet[v]["solution"] = varObject;
            }
        }

        // Insert line to find out the greek symbols for the variables separately
        // and put them in as part of the variableSet[v] object.

        var equationSet = {};
        for(var index in selectedEquations)
        {
            var solvableRepr = selectedEquations[index]["repr"];
            for(var u in solvableRepr["unknowns"])
                if(u in variableSet)
                {
                    // if a solution exists, it will always be an object, with multiple parts.
                    // assign the symbol for it here. Otherwise, it must have an error, which
                    // is why there will be no object in here.
                    if("solution" in variableSet[u])
                        variableSet[u]["solution"]["name"] = solvableRepr["unknowns"][u];
                    if(u in errorFlag["error"])
                        errorFlag["error"][u]["symbol"] = solvableRepr["unknowns"][u];
                }
        }

        // Insert check for warning: unit conversion was performed, etc.
        for(var domain in globalUnitList)
        {
            if(Object.keys(globalUnitList[domain]).length > 1)
            {
                errorFlag["warning"].push({
                    "id" :"implicitUnitConversion", 
                    // : {
                    "description":
                    `Several quantities of the `+domain+
                    ` domain were found in the system,<br>
                    and not all of them had compatible units. Some implicit<br>
                    unit conversion was performed to maintain consistency.<br>
                    Please make note.\n`+JSON.stringify(globalUnitList[domain]),
                    "minidescription" : `Some units were implicitly converted.`
                    // }
                })
            }
        }

        // pushing out errors if any to logevents here
        this.globalSectionObj.logEvent({
            type: "deforms-solve-errors",
            desc: JSON.stringify(errorFlag)
        })

        // Pushing out errors into Notifications right here
        let notifBody = document.getElementById("notifications");
        notifBody.textContent = ""; // clearing the notification nodes and their events, sourced to these.
        // removing all instances of notiferrorelement class
        $(".notiferrorelement").removeClass("notiferrorelement");
        
        // Checking errors in here, to show them on messages, and see if we should proceed at all or not
        if(
            Object.keys(errorFlag["error"]["global"]).length > 0 ||
            Object.keys(errorFlag["error"]).length > 1
        )
        {
            // console.log("ERRORS ARE DUMPED HERE, PLEASE NOTE");
            // console.log("======================================");
            // console.log(JSON.stringify(errorFlag["error"], null, 4))
            JSAV.utils.dialog(
                `<h4>Errors generated</h4>
                Some errors have occurred<br>
                that have deemed it impossible to correctly solve this system<br>
                of equations. Please Look at the <b>Notifications</b> panel for more details.`, 
                {width: 200, closeText: "OK"})[0].addEventListener("click", e=>{
                e.stopPropagation()});

            // New: populate lines in notification panel and set up clickhandlers here
            for(let gerror in errorFlag["error"]["global"])
            {
                let newelem = document.createElement("div")
                newelem.innerHTML= "global error: "
                +errorFlag["error"]["global"][gerror]["minidescription"]+". Click here to see more.";
                newelem.classList.add('notifelement')
                notifBody.appendChild(newelem);

                // add clickhandler to show dialog box containing detailed explanation for the error.
                newelem.addEventListener(
                "click", e=> {
                    e.stopPropagation();
                    JSAV.utils.dialog(
                        `<h4>${errorFlag["error"]["global"][gerror]["minidescription"]}</h4>
                        ${errorFlag["error"]["global"][gerror]["description"]}.`, 
                        {width: 200, closeText: "OK"})[0].addEventListener("click", e2=>{
                        e2.stopPropagation()});
                })
            }
            for(let errorTag in errorFlag["error"])
            {
                if(errorTag == "global") continue;

                for(let descTag in errorFlag["error"][errorTag])
                {
                    if(descTag == "symbol") continue;

                    let newelem = document.createElement("div");
                    if("symbol" in errorFlag["error"][errorTag])
                    {
                        newelem.innerHTML = 
                        katex.renderToString(errorFlag["error"][errorTag]["symbol"])+": "+
                        errorFlag["error"][errorTag][descTag]["minidescription"]+" Click here to see where.";

                        // add clickhandler to highlight associations boxes once clicked, and deselect
                        // these as soon as something else is clicked. This can be achieved by
                        // adding a globalPointerContext, and removing it when something else is clicked.
                        newelem.addEventListener(
                        "click", e=> {
                            e.stopPropagation();
                            if(newelem.classList.contains("notiferrorelement"))
                            {
                                newelem.classList.remove("notiferrorelement");
                                let list = document.querySelectorAll(
                                    `span[data-association = '${errorTag}']`);
                                if(list.length == 0) list = document.querySelectorAll(
                                    `span[data-csymbol = '${errorTag}']`);
                                for(let i=0; i<list.length; i++)
                                    list[i].classList.remove("notiferrorelement");
                            }
                            else
                            {
                                // Don't automatically remove it on clicking elsewhere.
                                // Keep this persistent.
                                newelem.classList.add("notiferrorelement");
                                let list = document.querySelectorAll(
                                    `span[data-association = '${errorTag}']`);
                                if(list.length == 0) list = document.querySelectorAll(
                                    `span[data-csymbol = '${errorTag}']`);
                                for(let i=0; i<list.length; i++)
                                    list[i].classList.add("notiferrorelement");
                            }
                        })
                    }
                    else{
                        let errorIndex = errorTag.split("_");
                        errorIndex.splice(2,2);
                        newelem.innerHTML= errorIndex.join(", ")
                        +": "+errorFlag["error"][errorTag][descTag]["minidescription"]
                        +" Click here to see where.";

                        // add clickhandler to highlight equations and boxes once clicked, and deselect
                        // these as soon as something else is clicked. This can be achieved by
                        // adding a globalPointerContext, and removing it when something else is clicked.
                        newelem.addEventListener(
                        "click", e=> {
                            e.stopPropagation();
                            if(newelem.classList.contains("notiferrorelement"))
                            {
                                newelem.classList.remove("notiferrorelement");
                                document.getElementById(errorTag).classList.remove("notiferrorelement");
                            }
                            else
                            {
                                newelem.classList.add("notiferrorelement");
                                document.getElementById(errorTag).classList.add("notiferrorelement");
                            }
                        })
                    }
                    newelem.classList.add('notifelement')
                    notifBody.appendChild(newelem);
                }
            }

            return;
        }
        if(errorFlag["warning"].length > 0)
        {
            // console.log("WARNINGS ARE DUMPED HERE, PLEASE NOTE");
            // console.log("======================================");
            // console.log(JSON.stringify(errorFlag["warning"], null, 4))
            JSAV.utils.dialog(
                `<h4>Warnings generated</h4>
                Some warnings were generated<br>
                that need attention.<br>
                Please Look at the <b>Notifications</b> panel for more details.`, 
                {width: 200, closeText: "OK"})[0].addEventListener("click", e=>{
                e.stopPropagation()});
            
            for(let werror=0; werror<errorFlag["warning"].length; werror++)
            {
                let newelem = document.createElement("div")
                newelem.innerHTML= "warning: "+
                errorFlag["warning"][werror]["minidescription"]+" Click here to see more.";;
                newelem.classList.add('notifelement')
                notifBody.appendChild(newelem);

                // create clickhandler to show the error dialog when clicked
                // also, default pop-out the warning first.
                newelem.addEventListener(
                "click", e=> {
                    e.stopPropagation();
                    JSAV.utils.dialog(
                        `<h4>${errorFlag["warning"][werror]["minidescription"]}</h4>
                        ${errorFlag["warning"][werror]["description"]}`, 
                        {width: 200, closeText: "OK"})[0].addEventListener("click", e2=>{
                        e2.stopPropagation()});
                })
            }
        }

        // =========================================================================================
        // EXPLICIT ERROR CHECKING ENDS HERE
        // Computing solutions
        var soln = {};
        var listOfSolutions = [];
        try {
            if(Object.keys(selectedEquations).length > 1)
            {
                // Creating the list of equations to solve using solveEquations
                var equationSet = [];
                for(let seleq in selectedEquations)
                    for(let i=0; i<selectedEquations[seleq]["repr"]["equations"].length; i++)
                        equationSet.push(selectedEquations[seleq]["repr"]["equations"][i])

                let templistOfSolutions = nerdamer.solveEquations(equationSet);
                // Filter out the unknowns and knowns from the solutions

                for(let i=0; i<templistOfSolutions.length; i++)
                    if(templistOfSolutions[i][0] in variableSet)
                        listOfSolutions.push(templistOfSolutions[i])

                //DEBUG: Primary checking for solutions in terms of knowns;
                // Maybe useful for unit inference in system setting.
                // listOfSolutions only provides the numbers; someway to 
                // find the variables? Unknowns in terms of knowns? Ans: Nope, not useful
                // console.log(equationSet);
            }
            else
            {
                // Confirmed there is only one unknown in the system.
                let equations = selectedEquations[Object.keys(selectedEquations)[0]]["repr"]["equations"];
                let knowns = selectedEquations[Object.keys(selectedEquations)[0]]["repr"]["knowns"];

                // Part 1: Separate out the equation body and the values by checking against knowns
                let equationBody = null;
                let partialValues = {};
                for(let i=0; i<equations.length;i++)
                {
                    let partial = equations[i].split("=");
                    if(!isNaN(partial[1]))
                    {
                        // Then, extract and store the modified/converted values
                        partialValues[partial[0]] = partial[1];
                    }
                    else
                    {
                        // We have found the main equation
                        equationBody = equations[i];
                        // This will only happen once since there is only one equation in the system
                        // and the subject does
                    }
                }
                // Part 2: plug it in to recreate the equation
                for(let pv in partialValues)
                {
                    equationBody = equationBody.replace(new RegExp(pv, 'g'), partialValues[pv]);
                }

                let subject = Object.keys(
                    selectedEquations[Object.keys(selectedEquations)[0]]["repr"]["unknowns"]
                )[0];
                let solutions = nerdamer.solveEquations([equationBody,subject+" = x + 1"]);

                for(let i=0; i<solutions.length; i++)
                    if(solutions[i][0] == subject)
                        listOfSolutions.push(solutions[i]);
                // console.log(listOfSolutions);
                // console.log(variableSet);

                // Yeah turns out the combined logic does not work for single solvers; gives erroneous results.
                // var unitDesc = equationObjectSet[0].getUnitOfVariable();
                // variableSet[unitDesc[0]]["unit"] = unitDesc[1];
                // variableSet[unitDesc[0]]["domain"] = unitDesc[2][0];
                // variableSet[unitDesc[0]]["unitDisp"] = unitDesc[2][1];
            }
        }
        catch (exception) {
            JSAV.utils.dialog(
                `<h4>Unexpected Error:</h4>
                An unexpected error occurred while attempting to solve<br>
                the system of equations.<br>
                It would be advisable to:<br>
                1. Revisit the system of equations and examine associations<br>
                that might lead to unexpected equation setups, <br>
                2. Look at the errors and warnings generated, which might help<br>
                with step 1.<br>`, 
                {width: 200, closeText: "OK"})[0].addEventListener("click", e=>{
                e.stopPropagation()});
            
            this.globalSectionObj.logEvent({
                type: "deforms-solver-engine-error",
                desc: "Unexpected error during solving, check solveSet or debug"
            })
            return;
        }

        // Separating out the solutions
        for(let i=0; i<listOfSolutions.length; i++)
        {
            // Find the variable name, find the unit for it, and convert it to that unit.
            let quantity = listOfSolutions[i][1];
            let unit = variableSet[listOfSolutions[i][0]]["solution"]["unit"];
            let domain = variableSet[listOfSolutions[i][0]]["solution"]["domain"];
            if(domain != "dimensionless")
            {
                // If the domain is dimensionless, we don't need to convert.
                // If the domain is something else, we look at the.
                let baseUnit = null;
                if(domain in Window.defaultDomains)
                    baseUnit = Window.defaultDomains[domain][Window.unitFamily]["unit"];
                else if("baseUnit" in variableSet[listOfSolutions[i][0]]["solution"])
                {
                    // Use the baseUnit information computed at previous point, if it exists
                    baseUnit = variableSet[listOfSolutions[i][0]]["solution"]["baseUnit"];
                }
                else {
                    // If the baseUnit information doesn't exist, which means we didn't
                    // encounter this unit here for the first time,
                    // which also means the quantity was not converted to baseUnits to begin with
                    // NOTE: This can be refactored later
                    // quantity remains unchanged
                }
                if(baseUnit != null)
                {
                    quantity = mathjs.evaluate("number("+quantity+" "+baseUnit+" "+","+unit+")");
                }
            }
            soln[listOfSolutions[i][0]] = quantity;
        }

        // pushing out solutions to the database
        let solutionSetLog = {};
        
        // console.log(soln);

        // To do(?): insert a function that checks which unit in a domain has the cleanest
        // representation (also shortest) for a value, and use that unit.
        // On top of unit resolution, this one finds out what final unit to actually use.
        // (Is this useful?)

        // Creating the solutions view
        for(var unknownName in variableSet)
        {
            var value = soln[unknownName];
            // if(variableSet[unknownName].length == 4)
            //     value = soln[unknownName]*variableSet[unknownName]["correction"];
            // else
            //     value = soln[unknownName];
            var currSolution = new ValueBox(
                false,
                {
                    "visuals": this.DIMENSIONS.ELEMENTS,
                    "dataset": {
                        "value": value,
                        "unit": variableSet[unknownName]["solution"]["unit"],
                        "variable": unknownName,    // The internal variable name eg: x_y
                        // "valueDisplay": String(Number(Math.round(+'e3')+'e-3')),
                        "valueDisplay": Window.valueStringRepr(value),
                        "unitDisplay": variableSet[unknownName]["solution"]["unitDisp"],
                        "variableDisplay": variableSet[unknownName]["solution"]["name"], // The greek/external symbol
                        "domain": variableSet[unknownName]["solution"]["domain"]
                    }
                },
                this.globalSectionObj,
                this.globalPointerReference
            )
            // console.log(currSolution);

            // Creating log entry
            solutionSetLog[unknownName] = {};
            solutionSetLog[unknownName]["value"] = value;
            solutionSetLog[unknownName]["unit"] = variableSet[unknownName]["solution"]["unit"];
            solutionSetLog[unknownName]["variableDisplay"] = variableSet[unknownName]["solution"]["name"];
            solutionSetLog[unknownName]["domain"] = variableSet[unknownName]["solution"]["domain"];

            this.LIST_OF_SOLUTIONS_IN_WORKSPACE[this.solutionCounter] = currSolution;
            this.solutionCounter++;

            this.DIMENSIONS.ELEMENTS["POSITION_Y"]+=
            this.DIMENSIONS.ELEMENTS["HEIGHT"]+this.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

            this.lastSolution = currSolution;

            Window.windowManager.shiftDown(null, this.id);
        }
        
        // Pushing log events
        Window.jsavObject.logEvent({
            type: "deforms-solve-solutions",
            desc: JSON.stringify(solutionSetLog)
        })

        // De-select selected equations, the list of selections will get cleared anyway.
        for(var index in this.LIST_OF_EQUATIONS_IN_WORKSPACE)
        {
            var currentEqn = this.LIST_OF_EQUATIONS_IN_WORKSPACE[index];
            if(currentEqn.selected == true)
            {
                // currentEqn.visualComponents.tickmark.addClass("tickunselected");
                // currentEqn.visualComponents.tickmark.removeClass("tickselected");
                currentEqn.visualComponents["tickmark"].element[0].dataset.selected="unselected";
                currentEqn.visualComponents["tickmark"].element[0].innerHTML = "&#x2610";
                currentEqn.selected = false;
            }
        }
    }
}

window.Workspace = window.Workspace || Workspace
