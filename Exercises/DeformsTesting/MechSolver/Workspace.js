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
        console.log(this);
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
                this.globalSectionObj.label("Add", 
                {
                    left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 - 93, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("workspacebutton"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel")),
        };
        this.elements[3]["div"].setAttribute("id",this.name+"addeq");
        this.elements[3]["jsav"].element[0].dataset.type = "add";
        document.getElementById(this.name+"addeq").addEventListener('click', e => {
            e.stopPropagation();
            // Add function call to equation addition here.
            // console.log(this.globalEquationBank.currentSelectedEquationObject.eqobject);
            
            // this.globalSectionObj.logEvent({type: "adding new equation", id: this.name+"_"+
            // this.globalEquationBank.currentSelectedEquationObject.eqobject["id"]+"_"+(this.equationCounter+1)});
            this.addNewEquation();
        });
        this.elements[3]["jsav"].element[0]
        .setAttribute("title", "Add selected (highlighted) equation from the palette to this workspace.");

        this.elements[4] = {
            "jsav":
                this.globalSectionObj.label("Remove", 
                {
                    left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 - 45, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("workspacebutton"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel")),
        };
        // this.elements[4]["div"].setAttribute("id",this.name+"deleq");
        // document.getElementById(this.name+"deleq").addEventListener('click', e => {
        //     e.stopPropagation();
        //     // Add function call to equation deletion here.
        // });
        this.elements[4]["jsav"].element[0].dataset.type = "remove";
        this.elements[4]["jsav"].element[0].addEventListener('click', e => {
            e.stopPropagation();
            // Add function call to equation deletion here.
            this.globalSectionObj.logEvent({type: "Deleting equation"});
            this.deleteEquations();
        });
        this.elements[4]["jsav"].element[0].setAttribute("title", "Remove selected (ticked) equations from this workspace.");

        this.elements[5] = {
            "jsav":
                this.globalSectionObj.label("Solve", 
                {
                    left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 + 36, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("workspacebutton"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel")),
        };
        // this.elements[5]["div"].setAttribute("id",this.name+"solveeq");
        // document.getElementById(this.name+"solveeq").addEventListener('click', e => {
        //     e.stopPropagation();
        //    // Add function call to equation set solving and result propagation here.
        // });
        this.elements[5]["jsav"].element[0].dataset.type = "solve";
        this.elements[5]["jsav"].element[0].addEventListener('click', e => {
            e.stopPropagation();
           // Add function call to equation set solving and result propagation here.
           this.solveEquations();
           this.globalSectionObj.logEvent({type: "Solution"});
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
            Window.showHelp("workspace");
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
        if(equationListEntity.name in this.equationHashMap)
            lastHashMapID = (list => list[list.length-1])
            (this.equationHashMap[equationListEntity.name]).counter+1;
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
        if(equationListEntity.name in this.equationHashMap)
        {
            this.equationHashMap[equationListEntity.name]
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
            this.equationHashMap[equationListEntity["name"]] = [
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
    OldSolveEquations()
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
        }
        Window.windowManager.shiftUp(this.id);
        Window.clearGlobalPointerReference();
    }

    solveEquations()
    {
        // Step 1: See which equations are selected
        var equationSet = []; // which stores the solvable representations in all cases.
        var equationObjectSet = [];
        var variableSet = {};
        try {
            for(var index in this.LIST_OF_EQUATIONS_IN_WORKSPACE)
            {
                var currentEqn = this.LIST_OF_EQUATIONS_IN_WORKSPACE[index];
                if(currentEqn.selected == true)
                {
                    equationObjectSet.push(currentEqn);
                    var solvableRepr = currentEqn.createSolvableRepresentation();
                    console.log(solvableRepr);
                    // Add the equation representations
                    for(var x=0; x<solvableRepr["equations"].length; x++)
                        equationSet.push(solvableRepr["equations"][x]);
                    // Find out the unknown varDisplay-varName mapping pairs
                    for(var vname in solvableRepr["unknowns"])  // vname is the internal symbol
                    {
                        var unitDesc = currentEqn.getUnitOfVariable(vname);
                        // Find the unit of the variable from its corresponding equation
                        // variableSet[vname] = {
                        //     "name": solvableRepr["unknowns"][vname],    // The greek/external symbol
                        //     "unit": null,
                        //     "domain": null,
                        //     "unitDisp": null,
                        // };
                        if(vname in variableSet) continue;
                        variableSet[vname] = {
                            "name": solvableRepr["unknowns"][vname],    // The greek/external symbol
                            "unit": unitDesc[1],
                            "domain": unitDesc[2][0],
                            "unitDisp": unitDesc[2][1],
                        };
                        if(unitDesc.length == 4)
                            variableSet[vname]["correction"] = unitDesc[3]; // multiply the result with this to correct.
                    }
                }
            }
        }
        catch (exception) {
            JSAV.utils.dialog(
                `<h4>Error</h4>
                There was likely a problem with the units of the values. Perhaps an unrecognized
                unit was used, or the unit of a quantity could not be discerned. Please review your work and
                try again.`, 
            {width: 200, closeText: "OK"})[0].addEventListener("click", e=>{
                e.stopPropagation();
            });
            return;
        }
        // console.log(variableSet);
        // console.log(equationSet);
        
        // Computing solutions
        var soln = {};
        var listOfSolutions = null;
        try {
            if(equationObjectSet.length > 1)
            {
                listOfSolutions = nerdamer.solveEquations(equationSet);
                //DEBUG: Primary checking for solutions in terms of knowns;
                // Maybe useful for unit inference in system setting.
                // listOfSolutions only provides the numbers; someway to 
                // find the variables? Unknowns in terms of knowns? Ans: Nope, not useful
                console.log(equationSet);
            }
            else
            {
                // Confirmed there is only one unknown in the system.
                listOfSolutions = equationObjectSet[0].solve(); 
                console.log(listOfSolutions);
                console.log(variableSet);
                // Yeah turns out the combined logic does not work for single solvers; gives erroneous results.
                // var unitDesc = equationObjectSet[0].getUnitOfVariable();
                // variableSet[unitDesc[0]]["unit"] = unitDesc[1];
                // variableSet[unitDesc[0]]["domain"] = unitDesc[2][0];
                // variableSet[unitDesc[0]]["unitDisp"] = unitDesc[2][1];
            }
        }
        catch (exception) {
            JSAV.utils.dialog(
                `<h4>Error: Inconsistent system</h4>
                There was an error in defining the system of equations. Namely, #unknowns =/= #equations.<br>
                Please review the unknowns (associated variables) in the equations, as well as grayed out boxes
                which by default are treated as unknowns.<br>Please also check that the remaining equation boxes are filled
                with values.<br>Finally, please make sure to check all the boxes for the equations that are to be
                included in the system to be solved.<br>`, 
            {width: 200, closeText: "OK"})[0].addEventListener("click", e=>{
                e.stopPropagation()
            });
            return;
        }
        for(var i=0; i<listOfSolutions.length; i++)
            soln[listOfSolutions[i][0]] = listOfSolutions[i][1];
        // console.log(soln);
        
        // console.log("Before printing solutions", this.DIMENSIONS);
        for(var unknownName in variableSet)
        {
            var value = null;
            if(variableSet[unknownName].length == 4)
                value = soln[unknownName]*variableSet[unknownName]["correction"];
            else
                value = soln[unknownName];
            var currSolution = new ValueBox(
                false,
                {
                    "visuals": this.DIMENSIONS.ELEMENTS,
                    "dataset": {
                        "value": value,
                        "unit": variableSet[unknownName]["unit"],
                        "variable": unknownName,    // The internal variable name eg: x_y
                        // "valueDisplay": String(Number(Math.round(+'e3')+'e-3')),
                        "valueDisplay": Window.valueStringRepr(value),
                        "unitDisplay": variableSet[unknownName]["unitDisp"],
                        "variableDisplay": variableSet[unknownName]["name"], // The greek/external symbol
                        "domain": variableSet[unknownName]["domain"]
                    }
                },
                this.globalSectionObj,
                this.globalPointerReference
            )
            console.log(currSolution);

            this.LIST_OF_SOLUTIONS_IN_WORKSPACE[this.solutionCounter] = currSolution;
            this.solutionCounter++;

            this.DIMENSIONS.ELEMENTS["POSITION_Y"]+=
            this.DIMENSIONS.ELEMENTS["HEIGHT"]+this.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

            this.lastSolution = currSolution;

            Window.windowManager.shiftDown(null, this.id);
        }

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