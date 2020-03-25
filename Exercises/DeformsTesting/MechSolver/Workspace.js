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
                this.globalSectionObj.label("X", 
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
        this.removebutton = document.getElementById(this.name+"close");
        

        // Adding the Add, Remove, Solve Buttons to add, remove, and solve equations
        this.elements[3] = {
            "jsav":
                this.globalSectionObj.label("Add", 
                {
                    left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 - 75, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("addequation"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel")),
        };
        this.elements[3]["div"].setAttribute("id",this.name+"addeq");
        document.getElementById(this.name+"addeq").addEventListener('click', e => {
            e.stopPropagation();
            // Add function call to equation addition here.
            this.globalSectionObj.logEvent({type: "adding new equation", id: this.name+"_"+
            this.globalEquationBank.currentSelectedEquationObject.eqobject["id"]+"_"+(this.equationCounter+1)});
            this.addNewEquation();
        });

        this.elements[4] = {
            "jsav":
                this.globalSectionObj.label("Remove", 
                {
                    left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 - 41, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("delequation"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel")),
        };
        // this.elements[4]["div"].setAttribute("id",this.name+"deleq");
        // document.getElementById(this.name+"deleq").addEventListener('click', e => {
        //     e.stopPropagation();
        //     // Add function call to equation deletion here.
        // });
        this.elements[4]["jsav"].element[0].addEventListener('click', e => {
            e.stopPropagation();
            // Add function call to equation deletion here.
            this.globalSectionObj.logEvent({type: "Deleting equation"});
            this.deleteEquations();
        });

        this.elements[5] = {
            "jsav":
                this.globalSectionObj.label("Solve", 
                {
                    left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 + 26, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("solveequation"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("jsavlabel")),
        };
        // this.elements[5]["div"].setAttribute("id",this.name+"solveeq");
        // document.getElementById(this.name+"solveeq").addEventListener('click', e => {
        //     e.stopPropagation();
        //    // Add function call to equation set solving and result propagation here.
        // });
        this.elements[5]["jsav"].element[0].addEventListener('click', e => {
            e.stopPropagation();
           // Add function call to equation set solving and result propagation here.
           this.solveEquations();
           this.globalSectionObj.logEvent({type: "Solution"});
        });
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
        var equationListEntity = this.globalEquationBank.currentSelectedEquationObject.eqobject;
        var lastHashMapID = 0;
        if(equationListEntity.name in this.equationHashMap)
            lastHashMapID = (list => list[list.length-1])
            (this.equationHashMap[equationListEntity.name]).counter+1;
        else
            lastHashMapID = 1;

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
        
        console.log(this.DIMENSIONS.ELEMENTS["POSITION_Y"]);
        this.DIMENSIONS.ELEMENTS["POSITION_Y"]+=
        newActiveEquation.equationObjectReference.height+this.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
        console.log(this.DIMENSIONS.ELEMENTS["POSITION_Y"]);
        // Handling the internal initial bookkeeping
        this.LIST_OF_EQUATIONS_IN_WORKSPACE[this.equationCounter] = newActiveEquation;
        //        |_>  To be elaborated for additional operations.
        
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
        // console.log(newActiveEquation);
        this.lastEquation = newActiveEquation;
        Window.windowManager.shiftDown(this.lastEquation, this.id);
        //console.log(this.equationHashMap);
    }
    // OldSolveEquations()
    // {
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
    // }

    deleteEquations()
    {
        Window.windowManager.shiftUp(this.id);
    }

    solveEquations()
    {
        // Step 1: See which equations are selected
        var equationSet = [];
        var equationObjectSet = [];
        var variableSet = {}
        for(var index in this.LIST_OF_EQUATIONS_IN_WORKSPACE)
        {
            var currentEqn = this.LIST_OF_EQUATIONS_IN_WORKSPACE[index];
            if(currentEqn.selected == true)
            {
                equationObjectSet.push(currentEqn);
                var solvableRepr = currentEqn.createSolvableRepresentation();
                // Add the equation representations
                for(var x=0; x<solvableRepr["equations"].length; x++)
                    equationSet.push(solvableRepr["equations"][x]);
                // Find out the unknown varDisplay-varName mapping pairs
                for(var vname in solvableRepr["unknowns"])
                    variableSet[vname] = solvableRepr["unknowns"][vname];
            }
        }
        console.log(variableSet);
        console.log(equationSet);
        
        var soln = {};
        var listOfSolutions = nerdamer.solveEquations(equationSet);
        for(var i=0; i<listOfSolutions.length; i++)
            soln[listOfSolutions[i][0]] = listOfSolutions[i][1];
        console.log(soln);
        
        for(var unknownName in variableSet)
        {
            var currSolution = new ValueBox(
                false,
                {
                    "visuals": this.DIMENSIONS.ELEMENTS,
                    "dataset": {
                        "value": soln[unknownName],
                        "unit": "",
                        "variable": unknownName,
                        "valueDisplay": String(Number(Math.round(soln[unknownName]+'e3')+'e-3')),
                        "unitDisplay": "",
                        "variableDisplay": variableSet[unknownName],
                        "domain": ""
                    }
                },
                this.globalSectionObj,
                this.globalPointerReference
            )

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
                currentEqn.visualComponents["tickmark"].element[0].innerHTML = "&#x2610";
                currentEqn.selected = false;
            }
        }

    }
}

window.Workspace = window.Workspace || Workspace