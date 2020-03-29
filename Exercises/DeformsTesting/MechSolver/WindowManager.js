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

        if(currEquation != null && currEquation.positionObj["POSITION_Y"] > 
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
                    var equations = currWorkspace2.LIST_OF_EQUATIONS_IN_WORKSPACE;

                    //moves all equations down
                    for(const eq in equations) {
                        var amountShift = parseInt(equations[eq].visualComponents["tickmark"]["element"][0].style.top, 10) 
                            + currWkspaceElementHeight + currWkspaceElementHeightPad;

                        equations[eq].visualComponents["tickmark"]["element"][0].style.top = amountShift + "px";
                        equations[eq].visualComponents["text"]["element"][0].style.top = amountShift + 3 + "px";
                        equations[eq].jsavequation["element"][0].style.top = amountShift + "px";
                    }

                    //moves all solutions down
                    var solnList = this.workspace_list.workspace_list[wkspace2].LIST_OF_SOLUTIONS_IN_WORKSPACE;
                    for(const soln in solnList) {
                        var currSoln = solnList[soln];
                        currSoln["element"]["visualComponent"]["element"][0].style.top = 
                            parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10)
                            + currWkspaceElementHeight + currWkspaceElementHeightPad + "px";
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


    shiftUp(wkspaceID)
    {
        var totalShift = 0;
        // for(const wkspace in this.workspace_list.workspace_list) {
        var currWkspace = this.workspace_list.workspace_list[wkspaceID];
        var equations = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE;

        for(const eq in equations) {
            var currEquation = equations[eq];
            if(currEquation.selected) {
                // console.log(currWkspace);
                var currWkspaceElementHeight = currEquation.equationObjectReference.height;
                var currWkspaceElementHeightPad = currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
                // totalShift += currWkspaceElementHeight + currWkspaceElementHeightPad;
                currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] = 
                    currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] - 
                    currWkspaceElementHeight - 
                    currWkspaceElementHeightPad;

                //shifting ONLY following equations in current workspace up
                for(const eq2 in equations) {
                    if(parseInt(eq2) > parseInt(eq)) {
                        var amountShift = parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) - 
                        currWkspaceElementHeight -
                        currWkspaceElementHeightPad;

                        equations[eq2].visualComponents["tickmark"]["element"][0].style.top = amountShift + "px";
                        equations[eq2].visualComponents["text"]["element"][0].style.top = amountShift + 3 + "px";
                        equations[eq2].jsavequation["element"][0].style.top = amountShift + "px";
                    }
                }

                //shifting ONLY solutions up in current workspace up
                for(const soln in currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                    var currSoln = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
                    if(parseInt(currEquation.visualComponents["tickmark"]["element"][0].style.top, 10) < 
                        parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10)) {

                        currSoln["element"]["visualComponent"]["element"][0].style.top = 
                            parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10) - 
                            currWkspaceElementHeight - currWkspaceElementHeightPad + "px";
                    }
                }

                var isLast = false;
                if(currWkspace.lastEquation == currEquation) {
                    isLast = true;
                }

                currEquation.jsavequation.clear();
                currEquation.visualComponents["text"].clear();
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
            }
        }
        // }
        // console.log(totalShift);
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

                var equations = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE;
                for(const eq in equations) {
                    var origHeight = parseInt(equations[eq].visualComponents["tickmark"]["element"][0].style.top, 10) - totalShift;

                    equations[eq].visualComponents["tickmark"]["element"][0].style.top = origHeight + "px";
                    equations[eq].visualComponents["text"]["element"][0].style.top = origHeight + 3 + "px";
                    equations[eq].jsavequation["element"][0].style.top = origHeight + "px";
                }


                for(const soln in currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                    var currSoln = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
                    currSoln["element"]["visualComponent"]["element"][0].style.top = 
                    parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10) - totalShift + "px";

                }
            }
        }
        this.workspace_list.updateShape();

        this.extendCanvas(totalShift * -1);
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
                currWorkspace2.DIMENSIONS["POSITION_Y"] -= currWkspace.DIMENSIONS["HEIGHT"];
                currWorkspace2.DIMENSIONS.ELEMENTS["POSITION_Y"] -= currWkspace.DIMENSIONS["HEIGHT"];
                for(const eq2 in equations) {
                    var amountShift = parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top,10) - 
                        heightShift;

                    equations[eq2].visualComponents["tickmark"]["element"][0].style.top = amountShift + "px";
                    equations[eq2].visualComponents["text"]["element"][0].style.top = amountShift + 3 + "px";
                    equations[eq2].jsavequation["element"][0].style.top = amountShift + "px";
                }
                for(const soln in currWorkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                    var currSoln = currWorkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
                    currSoln["element"]["visualComponent"]["element"][0].style.top = 
                        parseInt(currSoln["element"]["visualComponent"]["element"][0].style.top,10) - 
                        currWkspace.DIMENSIONS["HEIGHT"] + "px";
                }
            }
        }

        //deletes all equations associated with workspace
        for(const eq in currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE) {
            var deleteEq = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE[eq];
            deleteEq.jsavequation.clear();
            deleteEq.visualComponents["text"].clear();
            deleteEq.visualComponents["tickmark"].clear();
        }

        //deletes all solutions associated with workspace
        for(const soln in currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
            var deleteSoln = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
            deleteSoln.element.visualComponent.clear();
        }

        this.extendCanvas(heightShift * -1);
    }
}
window.WindowManager = window.WindowManager || WindowManager