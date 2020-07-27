class WindowManager{
    /**
     * Purely a bookkeeping object, only used in substituting variables when 
     */
    constructor(jsavCanvasObj, dim_obj, wkspaceList)
    {
        this.globalJSAVobject = jsavCanvasObj;
        this.canvasDims = dim_obj;
        this.workspace_list = wkspaceList;
        
        document.styleSheets[2].rules[0].style.height = 1000+"px";
	}


	extendCanvas(shiftAmount) {
        var minHeight = 1000;
        // console.log(document.styleSheets[2].rules[0].style.height);
        document.styleSheets[2].rules[0].style.height = Math.max(minHeight, (this.workspace_list.DIMENSIONS["HEIGHT"] + shiftAmount)) + "px";
	}

    /*
    Check iteratively for the workspaces and if each of their respective 
    equations can fit in a workspace. If not, shift... Then check other workspaces
     */
    shiftDown(activeEq, wkspaceID)
    {
        var currWorkspace = this.workspace_list.workspace_list[wkspaceID];
        var currWkspaceElementHeight;
        if(activeEq == null) {
            currWkspaceElementHeight = currWorkspace.DIMENSIONS.ELEMENTS["HEIGHT"];
        }
        else {
            currWkspaceElementHeight = activeEq.equationObjectReference.height;
        }
        var currWkspaceElementHeightPad = currWorkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

        var needExpand = false;
        var currEquation = activeEq;
        var currSoln = currWorkspace.lastSolution;
        // console.log(currEquation.positionObj["POSITION_Y"]);
        // console.log(currWorkspace.DIMENSIONS["POSITION_Y"]);
        // console.log(currWorkspace.DIMENSIONS["HEIGHT"]);
        
        if(currEquation != null && currEquation.positionObj["POSITION_Y"]+currEquation.equationObjectReference.height > 
        currWorkspace.DIMENSIONS["POSITION_Y"] + currWorkspace.DIMENSIONS["HEIGHT"]) {
            
            needExpand = true;
        }
        //parseInt(currSoln.element.element[0].style.top, 10) + currWkspaceElementHeight + currWkspaceElementHeightPad
        if(currSoln != null && currWorkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] > 
            currWorkspace.DIMENSIONS["POSITION_Y"] + currWorkspace.DIMENSIONS["HEIGHT"]) {
            
            needExpand = true;
        }

        if(needExpand) {
            currWorkspace.DIMENSIONS["HEIGHT"] += currWkspaceElementHeight + currWkspaceElementHeightPad;
            currWorkspace.elements[0]["jsav"].height(currWorkspace.DIMENSIONS["HEIGHT"]); //expands the workspace rectangle

            for(const wkspace2 in this.workspace_list.workspace_list) {
                if(parseInt(wkspaceID) < parseInt(wkspace2)) {
                    //moves the following workspaces down more when adding equation overflows
                    var currWorkspace2 = this.workspace_list.workspace_list[wkspace2];

                    //workspace pointer and element pointer moves
                    currWorkspace2.DIMENSIONS["POSITION_Y"] += currWkspaceElementHeight + currWkspaceElementHeightPad;
                    currWorkspace2.DIMENSIONS.ELEMENTS["POSITION_Y"] += currWkspaceElementHeight + currWkspaceElementHeightPad;

                    //updates position of the workspace main elements 
                    var currWkspace2PosY = currWorkspace2.DIMENSIONS["POSITION_Y"];
                    currWorkspace2.elements[0]["div"].setAttribute("y", currWkspace2PosY+"px");
                    currWorkspace2.elements[1]["div"].style.top = currWkspace2PosY-15+"px";
                    currWorkspace2.elements[2]["div"].style.top = currWkspace2PosY-15+"px";
                    currWorkspace2.elements[3]["div"].style.top = currWkspace2PosY-15+"px";
                    currWorkspace2.elements[4]["div"].style.top = currWkspace2PosY-15+"px";
                    currWorkspace2.elements[5]["div"].style.top = currWkspace2PosY-15+"px";
                    currWorkspace2.elements[6]["div"].style.top = currWkspace2PosY-15+"px";
                    var equations = currWorkspace2.LIST_OF_EQUATIONS_IN_WORKSPACE;

                    //moves all equations down
                    for(const eq in equations) {
                        // Fallback in case this messes up
                        // var amountShift = parseInt(equations[eq].visualComponents["tickmark"]["element"][0].style.top, 10) 
                        //     + currWkspaceElementHeight + currWkspaceElementHeightPad;
                        // equations[eq].visualComponents["tickmark"]["element"][0].style.top = amountShift + "px";
                        // equations[eq].visualComponents["text"]["element"][0].style.top = amountShift + 3 + "px";
                        // equations[eq].visualComponents["delete"]["element"][0].style.top = amountShift + "px";
                        // equations[eq].visualComponents["help"]["element"][0].style.top = amountShift + "px";
                        // equations[eq].jsavequation["element"][0].style.top = amountShift + "px";

                        equations[eq].visualComponents["tickmark"]["element"][0].style.top = 
                            parseInt(equations[eq].visualComponents["tickmark"]["element"][0].style.top, 10) + 
                            currWkspaceElementHeight + 
                            currWkspaceElementHeightPad + "px";
                        equations[eq].visualComponents["delete"]["element"][0].style.top = 
                            parseInt(equations[eq].visualComponents["delete"]["element"][0].style.top, 10) + 
                            currWkspaceElementHeight + 
                            currWkspaceElementHeightPad + "px";
                        equations[eq].visualComponents["help"]["element"][0].style.top = 
                            parseInt(equations[eq].visualComponents["help"]["element"][0].style.top, 10) + 
                            currWkspaceElementHeight + 
                            currWkspaceElementHeightPad + "px";
                        equations[eq].visualComponents["text"]["element"][0].style.top = 
                            parseInt(equations[eq].visualComponents["text"]["element"][0].style.top, 10) + 
                            currWkspaceElementHeight + 
                            currWkspaceElementHeightPad + "px";
                        equations[eq].jsavequation["element"][0].style.top = 
                            parseInt(equations[eq].jsavequation["element"][0].style.top, 10) + 
                            currWkspaceElementHeight + 
                            currWkspaceElementHeightPad + "px";
                    }

                    //moves all solutions down
                    var solnList = this.workspace_list.workspace_list[wkspace2].LIST_OF_SOLUTIONS_IN_WORKSPACE;
                    for(const soln in solnList) {
                        var currSoln = solnList[soln];
                        currSoln["element"]["deleteButton"]["element"][0].style.top =
                            parseInt(currSoln["element"]["deleteButton"]["element"][0].style.top, 10)
                            + currWkspaceElementHeight + currWkspaceElementHeightPad + "px";
                        currSoln["element"]["visualComponent"]["element"][0].style.top = 
                            parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10)
                            + currWkspaceElementHeight + currWkspaceElementHeightPad + "px";
                        // currSoln["element"]["deleteButton"]["element"][0].style.top = 
                        //     parseInt(currSoln["element"]["deleteButton"]["element"][0].style.top,10)
                        //     + currWkspaceElementHeight + currWkspaceElementHeightPad + "px";
                    }
                }
            }
            this.workspace_list.updateShape();
            
            /**
             * Add a line for call to extendCanvas()
             */
            this.extendCanvas(currWkspaceElementHeight + currWkspaceElementHeightPad);
        }
    }


    shiftUp(wkspaceID, currValueBox)
    {
        var totalShift = 0;
        if(wkspaceID != null) {
            // for(const wkspace in this.workspace_list.workspace_list) {
            var currWkspace = this.workspace_list.workspace_list[wkspaceID];
            var equations = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE;

            for(const eq in equations) {
                var currEquation = equations[eq];
                if(currEquation.selected) {
                    // console.log(currWkspace);
                    var currWkspaceElementHeight = currEquation.visualComponents["height"];
                    var currWkspaceElementHeightPad = currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
                    // totalShift += currWkspaceElementHeight + currWkspaceElementHeightPad;
                    currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] = 
                        currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] - 
                        currWkspaceElementHeight - 
                        currWkspaceElementHeightPad;

                        // Fallback: in case 158 to 176 doesn't work
                        // equations[eq2].visualComponents["tickmark"]["element"][0].style.top = amountShift + "px";
                        // equations[eq2].visualComponents["text"]["element"][0].style.top = amountShift + 3 + "px";
                        // equations[eq2].visualComponents["delete"]["element"][0].style.top = amountShift + "px";
                        // equations[eq2].visualComponents["help"]["element"][0].style.top = amountShift + "px";
                        // equations[eq2].jsavequation["element"][0].style.top = amountShift + "px";

                    //shifting ONLY following equations in current workspace up
                    for(const eq2 in equations) {
                        if(parseInt(eq2) > parseInt(eq)) {
                            // var amountShift = parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) - 
                            // currWkspaceElementHeight -
                            // currWkspaceElementHeightPad;

                            // moving up non-equation elements
                            equations[eq2].visualComponents["tickmark"]["element"][0].style.top = 
                                parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) - 
                                currWkspaceElementHeight -
                                currWkspaceElementHeightPad + "px";
                            equations[eq2].visualComponents["delete"]["element"][0].style.top = 
                                parseInt(equations[eq2].visualComponents["delete"]["element"][0].style.top, 10) - 
                                currWkspaceElementHeight -
                                currWkspaceElementHeightPad + "px";
                            equations[eq2].visualComponents["help"]["element"][0].style.top = 
                                parseInt(equations[eq2].visualComponents["help"]["element"][0].style.top, 10) - 
                                currWkspaceElementHeight -
                                currWkspaceElementHeightPad + "px";
                            equations[eq2].visualComponents["text"]["element"][0].style.top = 
                                parseInt(equations[eq2].visualComponents["text"]["element"][0].style.top, 10) - 
                                currWkspaceElementHeight -
                                currWkspaceElementHeightPad + "px";
                            
                            // moving up equation elements
                            equations[eq2].jsavequation["element"][0].style.top = 
                                parseInt(equations[eq2].jsavequation["element"][0].style.top, 10) - 
                                currWkspaceElementHeight -
                                currWkspaceElementHeightPad + "px";
                        }
                    }

                    //shifting ONLY solutions up in current workspace up
                    for(const soln in currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                        var currSoln = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
                        if(parseInt(currEquation.visualComponents["tickmark"]["element"][0].style.top, 10) < 
                            parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10)) {

                            currSoln["element"]["deleteButton"]["element"][0].style.top =
                                parseInt(currSoln["element"]["deleteButton"]["element"][0].style.top, 10)
                                - currWkspaceElementHeight - currWkspaceElementHeightPad + "px";
                            currSoln["element"]["visualComponent"]["element"][0].style.top = 
                                parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10) - 
                                currWkspaceElementHeight - currWkspaceElementHeightPad + "px";
                        }
                    }

                    var isLast = false;
                    if(currWkspace.lastEquation == currEquation) {
                        isLast = true;
                    }

                    // clearing the texts for the equation in questions (selected for removal)
                    currEquation.jsavequation.clear();
                    currEquation.visualComponents["text"].clear();
                    currEquation.visualComponents["delete"].clear();
                    currEquation.visualComponents["help"].clear();
                    currEquation.visualComponents["tickmark"].clear();
                    delete currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE[eq];

                    //update lastEquation if it is deleted
                    if(isLast) {
                        var last = -1;
                        for(const eqIdx in Object.keys(equations)) {
                            last = Math.max(last, eqIdx);
                        }
                        if(last != -1) {
                            currWkspace.lastEquation = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE[last];
                        }
                        else {
                            currWkspace.lastEquation = null;
                        }
                        // console.log(last);
                    }

                    var lastEqPos = 0;
                    if(currWkspace.lastEquation != null) {
                        lastEqPos = currWkspace.lastEquation.positionObj["POSITION_Y"];
                    }
                    var lastSolnPos = 0;
                    if(currWkspace.lastSolution != null) {
                        lastSolnPos = parseInt(currWkspace.lastSolution.element["visualComponent"].element[0].style.top, 10);
                    }
                    console.log(lastEqPos);
                    console.log(lastSolnPos);

                    if(lastEqPos > lastSolnPos) {
                        var currEq = currWkspace.lastEquation;

                        console.log(currEq.positionObj["POSITION_Y"]);
                        console.log(currWkspace.DIMENSIONS["POSITION_Y"]);
                        console.log(currWkspace.DIMENSIONS["HEIGHT"]);
                        if((currWkspace.DIMENSIONS["HEIGHT"] != this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) &&
                            (currEq.positionObj["POSITION_Y"] < currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"])) {
                            
                            var origHeight = currWkspace.DIMENSIONS["HEIGHT"];
                            
                            currWkspace.DIMENSIONS["HEIGHT"] = 
                                currWkspace.DIMENSIONS["HEIGHT"] - 
                                currWkspaceElementHeight - 
                                currWkspaceElementHeightPad;

                            if(currWkspace.DIMENSIONS["HEIGHT"] < this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) {
                                currWkspace.DIMENSIONS["HEIGHT"] = this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                                currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                                totalShift = totalShift + origHeight - this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                            }
                            else {
                                currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                                totalShift = totalShift + currWkspaceElementHeight + currWkspaceElementHeightPad;
                            }

                        }
                    }
                    else if(lastSolnPos > lastEqPos) {
                        var currSol = currWkspace.lastSolution;
                        if((currWkspace.DIMENSIONS["HEIGHT"] != this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) &&
                            parseInt(currSol.element["visualComponent"].element[0].style.top, 10)  < 
                            currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"]) {

                            var origHeight = currWkspace.DIMENSIONS["HEIGHT"];

                            currWkspace.DIMENSIONS["HEIGHT"] = 
                                currWkspace.DIMENSIONS["HEIGHT"] - 
                                currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
                                currWkspaceElementHeightPad;

                            if(currWkspace.DIMENSIONS["HEIGHT"] < this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) {
                                currWkspace.DIMENSIONS["HEIGHT"] = this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                                currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                                totalShift = totalShift + origHeight - this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                            }
                            else {
                                currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                                totalShift = totalShift + currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] + currWkspaceElementHeightPad;
                            }
                        }
                        
                    }
                }
            }
        }
        else {
            //for deleting solutions
            var found = false;
            for(const wkspace in this.workspace_list.workspace_list) {
                var currWkspace = this.workspace_list.workspace_list[wkspace];
                for(const sol in currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                    var curSoln = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[sol];
                    if(curSoln["element"]["visualComponent"]["element"][0].style.top == currValueBox["element"]["visualComponent"]["element"][0].style.top) {
                        // totalShift = currWkspace.DIMENSIONS["ELEMENTS"]["HEIGHT"];
                        wkspaceID = wkspace;
                        // console.log(currWkspace);
                        var currWkspaceElementHeight = currWkspace.DIMENSIONS["ELEMENTS"]["HEIGHT"];
                        var currWkspaceElementHeightPad = currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

                        currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] = 
                        currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] - 
                        currWkspaceElementHeight - 
                        currWkspaceElementHeightPad;
                        
                        console.log("deleted solution");
                            
                        //shifting ONLY following equations in current workspace up
                        var equations = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE;
                        for(const eq2 in equations) {

                            if(parseInt(curSoln["element"]["visualComponent"]["element"][0].style.top, 10) < 
                            parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top, 10)) {
                                // var amountShift = parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) - 
                                // currWkspaceElementHeight -
                                // currWkspaceElementHeightPad;
                                
                                // DEBUG LINES
                                // console.log(parseInt(curSoln["element"]["visualComponent"]["element"][0].style.top, 10));
                                // console.log(parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top, 10));

                                // Removing non-equation elements
                                equations[eq2].visualComponents["tickmark"]["element"][0].style.top = 
                                    parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) - 
                                    currWkspaceElementHeight -
                                    currWkspaceElementHeightPad + "px";
                                // console.log(parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top, 10));
                                equations[eq2].visualComponents["delete"]["element"][0].style.top = 
                                    parseInt(equations[eq2].visualComponents["delete"]["element"][0].style.top, 10) - 
                                    currWkspaceElementHeight -
                                    currWkspaceElementHeightPad + "px";
                                equations[eq2].visualComponents["help"]["element"][0].style.top = 
                                    parseInt(equations[eq2].visualComponents["help"]["element"][0].style.top, 10) - 
                                    currWkspaceElementHeight -
                                    currWkspaceElementHeightPad + "px";
                                equations[eq2].visualComponents["text"]["element"][0].style.top = 
                                    parseInt(equations[eq2].visualComponents["text"]["element"][0].style.top, 10) - 
                                    currWkspaceElementHeight -
                                    currWkspaceElementHeightPad + "px";
                                
                                // Removing equation elements
                                equations[eq2].jsavequation["element"][0].style.top = 
                                    parseInt(equations[eq2].jsavequation["element"][0].style.top, 10) - 
                                    currWkspaceElementHeight -
                                    currWkspaceElementHeightPad + "px";
                            }
                        }

                        //shifting ONLY solutions up in current workspace up
                        for(const soln in currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                            var currSoln = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
                            if(parseInt(curSoln["element"]["visualComponent"]["element"][0].style.top) < 
                                parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10)) {

                                currSoln["element"]["deleteButton"]["element"][0].style.top =
                                    parseInt(currSoln["element"]["deleteButton"]["element"][0].style.top, 10)
                                    - currWkspaceElementHeight - currWkspaceElementHeightPad + "px";
                                currSoln["element"]["visualComponent"]["element"][0].style.top = 
                                    parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10) - 
                                    currWkspaceElementHeight - currWkspaceElementHeightPad + "px";
                            }
                        }


                        var isLast = false;
                        if(currWkspace.lastSolution == curSoln) {
                            console.log("trying to delete last solution from a workspace");
                            isLast = true;
                        }

                        curSoln["element"]["deleteButton"].clear();
                        curSoln["element"]["visualComponent"].clear();
                        delete currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[sol];
                        
                        //update lastSolution if it is deleted
                        if(isLast) {
                            var last = -1;
                            for(const eqIdx in Object.keys(currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE)) {
                                last = Math.max(last, eqIdx);
                            }
                            if(last != -1) {
                                currWkspace.lastSolution = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[last];
                                console.log("new last solution is: " + last);
                            }
                            else {
                                currWkspace.lastSolution = null;
                            }
                            // console.log(last);
                        }


                        var lastEqPos = 0;
                        if(currWkspace.lastEquation != null) {
                            lastEqPos = parseInt(currWkspace.lastEquation.jsavequation["element"][0].style.top, 10);
                        }
                        var lastSolnPos = 0;
                        if(currWkspace.lastSolution != null) {
                            lastSolnPos = parseInt(currWkspace.lastSolution.element["visualComponent"].element[0].style.top, 10);
                        }
                        console.log(currWkspace.lastEquation);
                        console.log(lastSolnPos);

                        if(lastEqPos > lastSolnPos) {

                            console.log("eq last");
                            var currEq = currWkspace.lastEquation;


                            console.log(currEq.positionObj["POSITION_Y"]);
                            console.log(currWkspace.DIMENSIONS["POSITION_Y"]);
                            console.log(currWkspace.DIMENSIONS["HEIGHT"]);
                            console.log(currWkspace);
                            if((currWkspace.DIMENSIONS["HEIGHT"] != this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) &&
                                (currEq.positionObj["POSITION_Y"] < currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"])) {
                                
                                var origHeight = currWkspace.DIMENSIONS["HEIGHT"];
                                
                                currWkspace.DIMENSIONS["HEIGHT"] = 
                                    currWkspace.DIMENSIONS["HEIGHT"] - 
                                    currWkspaceElementHeight - 
                                    currWkspaceElementHeightPad;

                                if(currWkspace.DIMENSIONS["HEIGHT"] < this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) {
                                    currWkspace.DIMENSIONS["HEIGHT"] = this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                                    currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                                    totalShift = totalShift + origHeight - this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                                }
                                else {
                                    currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                                    totalShift = totalShift + currWkspaceElementHeight + currWkspaceElementHeightPad;
                                }

                            }
                        }
                        else if(lastSolnPos > lastEqPos) {
                            console.log("soln last");
                            console.log(currWkspace);

                            var currSol = currWkspace.lastSolution;
                            if((currWkspace.DIMENSIONS["HEIGHT"] != this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) &&
                                parseInt(currSol.element["visualComponent"].element[0].style.top, 10)  < 
                                currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"]) {

                                var origHeight = currWkspace.DIMENSIONS["HEIGHT"];

                                currWkspace.DIMENSIONS["HEIGHT"] = 
                                    currWkspace.DIMENSIONS["HEIGHT"] - 
                                    currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
                                    currWkspaceElementHeightPad;

                                if(currWkspace.DIMENSIONS["HEIGHT"] < this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) {
                                    currWkspace.DIMENSIONS["HEIGHT"] = this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                                    currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                                    totalShift = totalShift + origHeight - this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                                }
                                else {
                                    currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                                    totalShift = totalShift + currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] + currWkspaceElementHeightPad;
                                }
                            }
                            
                        }
                        found = true;
                        break;
                    }
                }
                if(found) {
                    break;
                }
            }

        }


        // }
        console.log(totalShift);
        for(var wkspace in this.workspace_list.workspace_list) {
            if(parseInt(wkspaceID) < parseInt(wkspace)) {
                var currWkspace = this.workspace_list.workspace_list[wkspace];

                currWkspace.DIMENSIONS["POSITION_Y"] -= totalShift;
                currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] -= totalShift;

                currWkspace.elements[0].div.y.baseVal.value -= totalShift;
                currWkspace.elements[1].div.style.top = parseInt(currWkspace.elements[1].div.style.top, 10) - totalShift + "px";
                currWkspace.elements[2].div.style.top = parseInt(currWkspace.elements[2].div.style.top, 10) - totalShift + "px";
                currWkspace.elements[3].div.style.top = parseInt(currWkspace.elements[3].div.style.top, 10) - totalShift + "px";
                currWkspace.elements[4].div.style.top = parseInt(currWkspace.elements[4].div.style.top, 10) - totalShift + "px";
                currWkspace.elements[5].div.style.top = parseInt(currWkspace.elements[5].div.style.top, 10) - totalShift + "px";
                currWkspace.elements[6].div.style.top = parseInt(currWkspace.elements[6].div.style.top, 10) - totalShift + "px";
                
                var equations = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE;
                for(const eq in equations) {
                    var origHeight = parseInt(equations[eq].visualComponents["tickmark"]["element"][0].style.top, 10) - totalShift;

                    equations[eq].visualComponents["tickmark"]["element"][0].style.top = origHeight + "px";
                    equations[eq].visualComponents["delete"]["element"][0].style.top = origHeight + "px";
                    equations[eq].visualComponents["help"]["element"][0].style.top = origHeight + "px";
                    
                    equations[eq].visualComponents["text"]["element"][0].style.top = origHeight + 3 + "px";
                    equations[eq].jsavequation["element"][0].style.top =  parseInt(equations[eq].jsavequation["element"][0].style.top, 10) - totalShift + "px";
                }


                for(const soln in currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                    var currSoln = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];

                    currSoln["element"]["deleteButton"]["element"][0].style.top =
                    parseInt(currSoln["element"]["deleteButton"]["element"][0].style.top, 10)
                    - totalShift + "px";

                    currSoln["element"]["visualComponent"]["element"][0].style.top = 
                    parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10) - totalShift + "px";
                    
                    // TODO: Change to help button
                    // currSoln["element"]["deleteButton"]["element"][0].style.top = 
                    // parseInt(currSoln["element"]["deleteButton"]["element"][0].style.top,10) - totalShift + "px";
                }
            }
        }
        this.workspace_list.updateShape();

        this.extendCanvas(totalShift * -1);
    }

    deleteSolution() 
    {

    }

    deleteWkspace(id)
    {
        var currWkspace = this.workspace_list.workspace_list[id];
        var heightShift = currWkspace.DIMENSIONS["HEIGHT"] + this.workspace_list.DIMENSIONS["WK_PADDING"];
        for(const wkspace2 in this.workspace_list.workspace_list) {
            //move everything after the deleted workspace up
            
            if(parseInt(id) < parseInt(wkspace2)) {
                var currWorkspace2 = this.workspace_list.workspace_list[wkspace2];
                var equations = currWorkspace2.LIST_OF_EQUATIONS_IN_WORKSPACE;
                // console.log(currWorkspace2.elements);
                // console.log(currWorkspace2.elements[0].div.y.baseVal.value);
                currWorkspace2.elements[0].div.y.baseVal.value -= heightShift;
                currWorkspace2.elements[1].div.style.top = parseInt(currWorkspace2.elements[1].div.style.top, 10) - heightShift + "px";
                currWorkspace2.elements[2].div.style.top = parseInt(currWorkspace2.elements[2].div.style.top, 10) - heightShift + "px";
                currWorkspace2.elements[3].div.style.top = parseInt(currWorkspace2.elements[3].div.style.top, 10) - heightShift + "px";
                currWorkspace2.elements[4].div.style.top = parseInt(currWorkspace2.elements[4].div.style.top, 10) - heightShift + "px";
                currWorkspace2.elements[5].div.style.top = parseInt(currWorkspace2.elements[5].div.style.top, 10) - heightShift + "px";
                currWorkspace2.elements[6].div.style.top = parseInt(currWorkspace2.elements[6].div.style.top, 10) - heightShift + "px";
                
                currWorkspace2.DIMENSIONS["POSITION_Y"] -= currWkspace.DIMENSIONS["HEIGHT"];
                currWorkspace2.DIMENSIONS.ELEMENTS["POSITION_Y"] -= currWkspace.DIMENSIONS["HEIGHT"];
                for(const eq2 in equations) {
                    var amountShift = parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top,10) - 
                        heightShift;

                    equations[eq2].visualComponents["tickmark"]["element"][0].style.top = amountShift + "px";
                    equations[eq2].visualComponents["delete"]["element"][0].style.top = amountShift + "px";
                    equations[eq2].visualComponents["help"]["element"][0].style.top = amountShift + "px";

                    equations[eq2].visualComponents["text"]["element"][0].style.top = amountShift + 3 + "px";
                    equations[eq2].jsavequation["element"][0].style.top = amountShift + "px";
                    // equations[eq2].visualComponents["tickmark"]["element"][0].style.top = 
                    //     parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) - 
                    //     currWkspaceElementHeight -
                    //     currWkspaceElementHeightPad + "px";
                    // equations[eq2].visualComponents["text"]["element"][0].style.top = 
                    //     parseInt(equations[eq2].visualComponents["text"]["element"][0].style.top, 10) - 
                    //     currWkspaceElementHeight -
                    //     currWkspaceElementHeightPad + 3 + "px";
                    // equations[eq2].jsavequation["element"][0].style.top = 
                    //     parseInt(equations[eq2].jsavequation["element"][0].style.top, 10) - 
                    //     currWkspaceElementHeight -
                    //     currWkspaceElementHeightPad + "px";
                }
                for(const soln in currWorkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                    var currSoln = currWorkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];

                    currSoln["element"]["deleteButton"]["element"][0].style.top =
                        parseInt(currSoln["element"]["deleteButton"]["element"][0].style.top, 10) - 
                        currWkspace.DIMENSIONS["HEIGHT"] + "px";

                    currSoln["element"]["visualComponent"]["element"][0].style.top = 
                        parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10) - 
                        currWkspace.DIMENSIONS["HEIGHT"] + "px";
                    
                    // TODO when help button is added
                    // currSoln["element"]["help"]["element"][0].style.top = 
                    //     parseInt(currSoln["element"]["help"]["element"][0].style.top,10) - 
                    //     currWkspace.DIMENSIONS["HEIGHT"] + "px";
                }
            }
        }

        //deletes all equations associated with workspace
        for(const eq in currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE) {
            var deleteEq = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE[eq];
            deleteEq.jsavequation.clear();
            deleteEq.visualComponents["text"].clear();
            deleteEq.visualComponents["delete"].clear();
            deleteEq.visualComponents["tickmark"].clear();
            deleteEq.visualComponents["help"].clear();
        }

        //deletes all solutions associated with workspace
        for(const soln in currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
            var deleteSoln = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
            deleteSoln.element.deleteButton.clear();
            deleteSoln.element.visualComponent.clear();
            // deleteSoln.element.deleteButton.clear();
        }

        this.extendCanvas(heightShift * -1);
    }

    shiftRight(activeEqObject) 
    {
        // if(activeEqObject == null) {
        //     return "";
        // }
        // var eqWidth = Window.parentObject.visualComponents["text"]["element"][0].offsetWidth;
        // var eqLeft = parseInt(Window.parentObject.visualComponents["text"]["element"][0].style.left, 10);
        // var activeEqLeft = parseInt(Window.parentObject.jsavequation["element"][0].style.left, 10);
        // var activeEqWidth = Window.parentObject.jsavequation["element"][0].offsetWidth;
        var eqWidth = activeEqObject.visualComponents["text"]["element"][0].offsetWidth;
        var eqLeft = parseInt(activeEqObject.visualComponents["text"]["element"][0].style.left, 10);
        var activeEqLeft = parseInt(activeEqObject.jsavequation["element"][0].style.left, 10);
        var activeEqWidth = activeEqObject.jsavequation["element"][0].offsetWidth;



        if(activeEqObject.visualComponents.height == activeEqObject.equationObjectReference.height) {
            // if(eqWidth + eqLeft + 20 > activeEqLeft) {
            //     activeEqObject.jsavequation["element"][0].style.left = eqWidth + eqLeft + 20 + "px";
            //     return "shiftActiveEqDown";
            // }
            // else if(eqWidth + eqLeft + 20 < activeEqLeft) {
            //     activeEqObject.jsavequation["element"][0].style.left = eqWidth + eqLeft + 20 + "px";
            // }
            if(eqWidth + eqLeft + 14 + activeEqWidth + 3 > this.canvasDims["WORKSPACE_LIST"]["WIDTH"]  ) {
                activeEqObject.jsavequation["element"][0].style.left = eqWidth + eqLeft + 14 + "px";
                // Logic being the shifts are made, but this is corrected by shiftActiveEqDown
                return "shiftActiveEqDown";
            }
            else activeEqObject.jsavequation["element"][0].style.left = eqWidth + eqLeft + 14 + "px";
        }
        else {
            // if(eqWidth + eqLeft + 20 + activeEqLeft + activeEqWidth + 3 < this.canvasDims["WORKSPACE_LIST"]["WIDTH"]  ) {
            if(eqWidth + eqLeft + 14 + activeEqWidth + 3 < this.canvasDims["WORKSPACE_LIST"]["WIDTH"]  ) {
                    return "shiftActiveEqUp";
            }
        }
        
        return "";
    }

    shiftActiveEqDown(id) {
        
        var split = id.split("_");
        console.log(id);
        
        var wkspaceNum = split[0].substring(2, split[0].length);
        var eqNum = split[2] - 1;
        
        var currWkspace = this.workspace_list.workspace_list[wkspaceNum];
        var currActiveEq = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE[eqNum];
        console.log(eqNum, currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE)
        console.log(currActiveEq);

        var eqWidth = currActiveEq.jsavequation["element"][0].offsetWidth;
        var eqLeft = parseInt(currActiveEq.jsavequation["element"][0].style.left, 10);

        //checks if equation overflows pass the width of the canvas.
        if(currActiveEq.visualComponents.height == currActiveEq.equationObjectReference.height && 
            eqWidth + eqLeft + 3 > this.canvasDims["WORKSPACE_LIST"]["WIDTH"]) {

            //move activeEq down
            // console.log(currActiveEq);
            var currWkspaceElementHeightPad = currWkspace.DIMENSIONS["ELEMENTS"]["HEIGHT_PAD"];
            // var currWkspaceElementHeight = currActiveEq.visualComponents["height"];
            var currWkspaceElementHeight = currWkspace.DIMENSIONS["ELEMENTS"]["HEIGHT"]; // Change back to above if not working

            // currActiveEq.visualComponents["height"] = (currActiveEq.visualComponents["height"] * 2) + currWkspaceElementHeightPad;
            currActiveEq.visualComponents["height"] = (currActiveEq.visualComponents["height"]  // Change back to above if not working
                + currWkspace.DIMENSIONS["ELEMENTS"]["HEIGHT"]) 
                + currWkspaceElementHeightPad;
            
            currActiveEq.jsavequation["element"][0].style.top = parseInt(currActiveEq.jsavequation["element"][0].style.top, 10) +  
            currWkspaceElementHeight + currWkspaceElementHeightPad + "px";
                
            currActiveEq.jsavequation["element"][0].style.left =  currWkspace.DIMENSIONS["ELEMENTS"]["POSITION_X"] + "px";

            //change position_y of equations down also for future equations to be added
            currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] += currWkspaceElementHeight + currWkspaceElementHeightPad;

            var extendWkspace = false;

            var solutions = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE;
            for(const soln in solutions) {
                var currSoln = solutions[soln];
                // console.log(currSoln);
                // console.log(currSoln["element"]["visualComponent"]["element"][0].style.top);
                // console.log(parseInt(currActiveEq.jsavequation["element"][0].style.top, 10));
                // console.log(currWkspaceElementHeight);

                var oldTop = parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top, 10);
                if(oldTop > parseInt(currActiveEq.jsavequation["element"][0].style.top, 10)) {

                    currSoln["element"]["deleteButton"]["element"][0].style.top =
                            oldTop + currWkspaceElementHeight + currWkspaceElementHeightPad + "px";

                    currSoln["element"]["visualComponent"]["element"][0].style.top = 
                        oldTop + currWkspaceElementHeight + currWkspaceElementHeightPad + "px";

                    if(parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top, 10) + currWkspaceElementHeight + currWkspaceElementHeightPad > 
                        currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"]) {
                            
                        extendWkspace = true;
                    }

                }
                
            }

            // move following equations down
            var equations = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE;
            for(const eq in equations) {
                if(parseInt(eq) > parseInt(eqNum)) {
                    // var amountShift = parseInt(equations[eq].visualComponents["tickmark"]["element"][0].style.top, 10) + 
                    //     currWkspaceElementHeight +
                    //     currWkspaceElementHeightPad;

                    // equations[eq].visualComponents["tickmark"]["element"][0].style.top = amountShift + "px";
                    // equations[eq].visualComponents["text"]["element"][0].style.top = amountShift + 3 + "px";
                    // equations[eq].jsavequation["element"][0].style.top = amountShift + "px";
                    equations[eq].visualComponents["tickmark"]["element"][0].style.top = 
                        parseInt(equations[eq].visualComponents["tickmark"]["element"][0].style.top, 10) + 
                        currWkspaceElementHeight +
                        currWkspaceElementHeightPad + "px";
                    equations[eq].visualComponents["text"]["element"][0].style.top = 
                        parseInt(equations[eq].visualComponents["text"]["element"][0].style.top, 10) + 
                        currWkspaceElementHeight +
                        currWkspaceElementHeightPad + "px";
                    equations[eq].visualComponents["help"]["element"][0].style.top = 
                        parseInt(equations[eq].visualComponents["help"]["element"][0].style.top, 10) + 
                        currWkspaceElementHeight +
                        currWkspaceElementHeightPad + "px";
                    equations[eq].visualComponents["delete"]["element"][0].style.top = 
                        parseInt(equations[eq].visualComponents["delete"]["element"][0].style.top, 10) + 
                        currWkspaceElementHeight +
                        currWkspaceElementHeightPad + "px";
                    equations[eq].jsavequation["element"][0].style.top = 
                        parseInt(equations[eq].jsavequation["element"][0].style.top, 10) + 
                        currWkspaceElementHeight +
                        currWkspaceElementHeightPad + "px";
                    
                    // console.log("here");
                    // console.log(parseInt(equations[eq].jsavequation["element"][0].style.top, 10));
                    // console.log(currWkspaceElementHeight + currWkspaceElementHeightPad);
                    // console.log(currWkspace.DIMENSIONS["POSITION_Y"]);
                    // console.log(currWkspace.DIMENSIONS["HEIGHT"]);

                    if(parseInt(equations[eq].jsavequation["element"][0].style.top, 10) + currWkspaceElementHeight + currWkspaceElementHeightPad > 
                        currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"]) {
                        extendWkspace = true;
                    }
                }
                else if(parseInt(eq) == parseInt(eqNum)) {
                    if(parseInt(equations[eq].jsavequation["element"][0].style.top, 10) + currWkspaceElementHeight + currWkspaceElementHeightPad > 
                    currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"]) {
                        extendWkspace = true;
                    }
                }
            }
//             if(extendWkspace) {
//                 console.log(currWkspace.DIMENSIONS["HEIGHT"]);
//                 currWkspace.DIMENSIONS["HEIGHT"] += currWkspaceElementHeight + currWkspaceElementHeightPad;
//                 currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
// console.log(currWkspace.DIMENSIONS["HEIGHT"]);
//                 for(const wkspace2 in this.workspace_list.workspace_list) {
//                     if(parseInt(wkspace2) > parseInt(wkspaceNum)) {
//                         console.log(wkspace2);
//                         var currWorkspace2 = this.workspace_list.workspace_list[wkspace2];

//                         //workspace pointer and element pointer moves
//                         currWorkspace2.DIMENSIONS["POSITION_Y"] += currWkspaceElementHeight + currWkspaceElementHeightPad;
//                         currWorkspace2.DIMENSIONS.ELEMENTS["POSITION_Y"] += currWkspaceElementHeight + currWkspaceElementHeightPad;

//                         //updates position of the workspace main elements 
//                         var currWkspace2PosY = currWorkspace2.DIMENSIONS["POSITION_Y"];
//                         currWorkspace2.elements[0]["div"].setAttribute("y", currWkspace2PosY+"px");
//                         currWorkspace2.elements[1]["div"].style.top = currWkspace2PosY-15+"px";
//                         currWorkspace2.elements[2]["div"].style.top = currWkspace2PosY-15+"px";
//                         currWorkspace2.elements[3]["div"].style.top = currWkspace2PosY-15+"px";
//                         currWorkspace2.elements[4]["div"].style.top = currWkspace2PosY-15+"px";
//                         currWorkspace2.elements[5]["div"].style.top = currWkspace2PosY-15+"px";
//                         var equations2 = currWorkspace2.LIST_OF_EQUATIONS_IN_WORKSPACE;

//                         //moves all equations down
//                         for(const eq2 in equations2) {
//                             // var amountShift = parseInt(equations2[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) 
//                             //     + currWkspaceElementHeight + currWkspaceElementHeightPad;

//                             equations2[eq2].visualComponents["tickmark"]["element"][0].style.top = 
//                                 parseInt(equations2[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) + 
//                                 currWkspaceElementHeight +
//                                 currWkspaceElementHeightPad + "px";
//                             equations2[eq2].visualComponents["text"]["element"][0].style.top = 
//                                 parseInt(equations2[eq2].visualComponents["text"]["element"][0].style.top, 10) + 
//                                 currWkspaceElementHeight +
//                                 currWkspaceElementHeightPad + "px";
//                             equations2[eq2].jsavequation["element"][0].style.top = 
//                                 parseInt(equations2[eq2].jsavequation["element"][0].style.top, 10) + 
//                                 currWkspaceElementHeight +
//                                 currWkspaceElementHeightPad + "px";
//                         }

//                         //moves all solutions down
//                         var solnList = this.workspace_list.workspace_list[wkspace2].LIST_OF_SOLUTIONS_IN_WORKSPACE;
//                         for(const soln in solnList) {
//                             var currSoln = solnList[soln];
//                             currSoln["element"]["visualComponent"]["element"][0].style.top = 
//                                 parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10)
//                                 + currWkspaceElementHeight + currWkspaceElementHeightPad + "px";
//                         }
//                     }
//                 }
//             }
            this.workspace_list.updateShape();
            if(extendWkspace) {
                return currActiveEq;
            }

        }
        return null;
    }

    shiftActiveEqUp(id) {

        var split = id.split("_");
        
        var wkspaceNum = split[0].substring(2, split[0].length);
        var eqNum = split[2] - 1;
        
        var currWkspace = this.workspace_list.workspace_list[wkspaceNum];
        var currActiveEq = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE[eqNum];

        var activeEqWidth = currActiveEq.jsavequation["element"][0].offsetWidth;
        var activeEqLeft = parseInt(currActiveEq.jsavequation["element"][0].style.left, 10);

        console.log(currActiveEq);
        var eqWidth = currActiveEq.visualComponents["text"]["element"][0].offsetWidth;
        var eqLeft = parseInt(currActiveEq.visualComponents["text"]["element"][0].style.left, 10);

        if(activeEqLeft < eqLeft && eqWidth + eqLeft + activeEqWidth + activeEqLeft + 3 < this.canvasDims["WORKSPACE_LIST"]["WIDTH"]) {
            console.log("move up");
            
            var currWkspaceElementHeightPad = currWkspace.DIMENSIONS["ELEMENTS"]["HEIGHT_PAD"];
            // var currWkspaceElementHeight = currActiveEq.equationObjectReference.height; // Change to this if necessary
            var currWkspaceElementHeight = currWkspace.DIMENSIONS["ELEMENTS"]["HEIGHT"]
            
            currActiveEq.visualComponents["height"] = currActiveEq.equationObjectReference.height;

            currActiveEq.jsavequation["element"][0].style.top = parseInt(currActiveEq.jsavequation["element"][0].style.top, 10) -  
            currWkspaceElementHeight - currWkspaceElementHeightPad + "px";
                
            currActiveEq.jsavequation["element"][0].style.left =  eqLeft + eqWidth + 15 + "px";

            //change position_y of equations down also for future equations to be added
            currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] -= (currWkspaceElementHeight + currWkspaceElementHeightPad);

            var totalShift = 0; 

            var solutions = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE;
            for(const soln in solutions) {
                var currSoln = solutions[soln];
                // console.log(currSoln);
                // console.log(currSoln["element"]["visualComponent"]["element"][0].style.top);
                // console.log(parseInt(currActiveEq.jsavequation["element"][0].style.top, 10));
                // console.log(currWkspaceElementHeight);

                var oldTop = parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top, 10);
                if(oldTop > parseInt(currActiveEq.jsavequation["element"][0].style.top, 10)) {

                    currSoln["element"]["deleteButton"]["element"][0].style.top =
                        oldTop - currWkspaceElementHeight - currWkspaceElementHeightPad + "px";

                    currSoln["element"]["visualComponent"]["element"][0].style.top = 
                        oldTop - currWkspaceElementHeight - currWkspaceElementHeightPad + "px";

                }
                
            }

            // move following equations down
            var equations = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE;
            for(const eq in equations) {
                if(parseInt(eq) > parseInt(eqNum)) {
                    // var amountShift = parseInt(equations[eq].visualComponents["tickmark"]["element"][0].style.top, 10) + 
                    //     currWkspaceElementHeight +
                    //     currWkspaceElementHeightPad;

                    // equations[eq].visualComponents["tickmark"]["element"][0].style.top = amountShift + "px";
                    // equations[eq].visualComponents["text"]["element"][0].style.top = amountShift + 3 + "px";
                    // equations[eq].jsavequation["element"][0].style.top = amountShift + "px";
                    equations[eq].visualComponents["tickmark"]["element"][0].style.top = 
                        parseInt(equations[eq].visualComponents["tickmark"]["element"][0].style.top, 10) - 
                        currWkspaceElementHeight -
                        currWkspaceElementHeightPad + "px";
                    equations[eq].visualComponents["text"]["element"][0].style.top = 
                        parseInt(equations[eq].visualComponents["text"]["element"][0].style.top, 10) - 
                        currWkspaceElementHeight -
                        currWkspaceElementHeightPad + "px";
                    equations[eq].visualComponents["delete"]["element"][0].style.top = 
                        parseInt(equations[eq].visualComponents["delete"]["element"][0].style.top, 10) - 
                        currWkspaceElementHeight -
                        currWkspaceElementHeightPad + "px";
                    equations[eq].visualComponents["help"]["element"][0].style.top = 
                        parseInt(equations[eq].visualComponents["help"]["element"][0].style.top, 10) - 
                        currWkspaceElementHeight -
                        currWkspaceElementHeightPad + "px";
                    equations[eq].jsavequation["element"][0].style.top = 
                        parseInt(equations[eq].jsavequation["element"][0].style.top, 10) - 
                        currWkspaceElementHeight -
                        currWkspaceElementHeightPad + "px";
                    
                    // console.log("here");
                    // console.log(parseInt(equations[eq].jsavequation["element"][0].style.top, 10));
                    // console.log(currWkspaceElementHeight + currWkspaceElementHeightPad);
                    // console.log(currWkspace.DIMENSIONS["POSITION_Y"]);
                    // console.log(currWkspace.DIMENSIONS["HEIGHT"]);

                    // if(parseInt(equations[eq].jsavequation["element"][0].style.top, 10) + currWkspaceElementHeight + currWkspaceElementHeightPad > 
                    //     currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"]) {
                        
                    // }
                }
                // else if(parseInt(eq) == parseInt(eqNum)) {
                //     if(parseInt(equations[eq].jsavequation["element"][0].style.top, 10) + currWkspaceElementHeight + currWkspaceElementHeightPad > 
                //     currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"]) {
                //         shortenWkspace = true;
                //     }
                // }
            }

            //shorten wkspace by totalshift
            var lastEqPos = 0;
            if(currWkspace.lastEquation != null) {
                lastEqPos = currWkspace.lastEquation.positionObj["POSITION_Y"];
            }
            var lastSolnPos = 0;
            if(currWkspace.lastSolution != null) {
                lastSolnPos = parseInt(currWkspace.lastSolution.element["visualComponent"].element[0].style.top, 10);
            }
            // console.log(lastEqPos);
            // console.log(lastSolnPos);

            if(lastEqPos > lastSolnPos) {
                var currEq = currWkspace.lastEquation;

                // console.log(currEq.positionObj["POSITION_Y"]);
                // console.log(currWkspace.DIMENSIONS["POSITION_Y"]);
                // console.log(currWkspace.DIMENSIONS["HEIGHT"]);
                if((currWkspace.DIMENSIONS["HEIGHT"] != this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) &&
                    (currEq.positionObj["POSITION_Y"] < currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"])) {
                    
                    var origHeight = currWkspace.DIMENSIONS["HEIGHT"];
                    
                    currWkspace.DIMENSIONS["HEIGHT"] = 
                        currWkspace.DIMENSIONS["HEIGHT"] - 
                        currWkspaceElementHeight - 
                        currWkspaceElementHeightPad;

                    if(currWkspace.DIMENSIONS["HEIGHT"] < this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) {
                        currWkspace.DIMENSIONS["HEIGHT"] = this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                        currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                        totalShift = totalShift + origHeight - this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                    }
                    else {
                        currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                        totalShift = totalShift + currWkspaceElementHeight + currWkspaceElementHeightPad;
                    }

                }
            }
            else if(lastSolnPos > lastEqPos) {
                var currSol = currWkspace.lastSolution;
                if((currWkspace.DIMENSIONS["HEIGHT"] != this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) &&
                    parseInt(currSol.element["visualComponent"].element[0].style.top, 10)  < 
                    currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"]) {

                    var origHeight = currWkspace.DIMENSIONS["HEIGHT"];

                    currWkspace.DIMENSIONS["HEIGHT"] = 
                        currWkspace.DIMENSIONS["HEIGHT"] - 
                        currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
                        currWkspaceElementHeightPad;

                    if(currWkspace.DIMENSIONS["HEIGHT"] < this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) {
                        currWkspace.DIMENSIONS["HEIGHT"] = this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                        currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                        totalShift = totalShift + origHeight - this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                    }
                    else {
                        currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                        totalShift = totalShift + currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] + currWkspaceElementHeightPad;
                    }
                }
                
            }
            console.log(totalShift);
            //moving following workspaces and vars down.
            for(var wkspace in this.workspace_list.workspace_list) {
                if(parseInt(wkspaceNum) < parseInt(wkspace)) {
                    var currWkspace = this.workspace_list.workspace_list[wkspace];
    
                    currWkspace.DIMENSIONS["POSITION_Y"] -= totalShift;
                    currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] -= totalShift;
    
                    currWkspace.elements[0].div.y.baseVal.value -= totalShift;
                    currWkspace.elements[1].div.style.top = parseInt(currWkspace.elements[1].div.style.top, 10) - totalShift + "px";
                    currWkspace.elements[2].div.style.top = parseInt(currWkspace.elements[2].div.style.top, 10) - totalShift + "px";
                    currWkspace.elements[3].div.style.top = parseInt(currWkspace.elements[3].div.style.top, 10) - totalShift + "px";
                    currWkspace.elements[4].div.style.top = parseInt(currWkspace.elements[4].div.style.top, 10) - totalShift + "px";
                    currWkspace.elements[5].div.style.top = parseInt(currWkspace.elements[5].div.style.top, 10) - totalShift + "px";
                    currWkspace.elements[6].div.style.top = parseInt(currWkspace.elements[6].div.style.top, 10) - totalShift + "px";
    
                    var equations = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE;
                    for(const eq in equations) {
                        var origHeight = parseInt(equations[eq].visualComponents["tickmark"]["element"][0].style.top, 10) - totalShift;
    
                        equations[eq].visualComponents["tickmark"]["element"][0].style.top = origHeight + "px";
                        equations[eq].visualComponents["text"]["element"][0].style.top = origHeight + 3 + "px";
                        equations[eq].visualComponents["delete"]["element"][0].style.top = origHeight + "px";
                        equations[eq].visualComponents["help"]["element"][0].style.top = origHeight + "px";
                        
                        equations[eq].jsavequation["element"][0].style.top = parseInt(equations[eq].jsavequation["element"][0].style.top, 10) - totalShift + "px";
                    }
    
    
                    for(const soln in currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                        var currSoln = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];

                        currSoln["element"]["deleteButton"]["element"][0].style.top =
                            parseInt(currSoln["element"]["deleteButton"]["element"][0].style.top, 10)
                            - totalShift + "px";

                        currSoln["element"]["visualComponent"]["element"][0].style.top = 
                        parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10) - totalShift + "px";
    
                    }
                }
            }
            this.workspace_list.updateShape();

        }

    }
}
window.WindowManager = window.WindowManager || WindowManager