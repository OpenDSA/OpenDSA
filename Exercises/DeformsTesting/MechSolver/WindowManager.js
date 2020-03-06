class WindowManager{
    /**
     * Purely a bookkeeping object, only used in substituting variables when 
     */
    constructor(jsavCanvasObj, dim_obj, wkspaceList)
    {
        this.globalJSAVobject = jsavCanvasObj;
        this.canvasDims = dim_obj;
        this.DIMENSIONS = {
            "BASE_NWK_UPPER_CORNER_X": dim_obj["WORKSPACE_LIST"]["X"]+3,
            "BASE_NWK_UPPER_CORNER_Y": dim_obj["WORKSPACE_LIST"]["Y"]+35,
            "BASE_HEIGHT": dim_obj["WORKSPACE_LIST"]["HEIGHT"],

            "UPPER_CORNER_X": dim_obj["WORKSPACE_LIST"]["X"],
            "UPPER_CORNER_Y": dim_obj["WORKSPACE_LIST"]["Y"],
            "HEIGHT": dim_obj["WORKSPACE_LIST"]["HEIGHT"],
            "PADDING": 20,
            "WIDTH": dim_obj["WORKSPACE_LIST"]["WIDTH"],

            "NEW_WKSPACE": {
                "CORNER_X": dim_obj["WORKSPACE_LIST"]["X"]+3,
                "CORNER_Y": dim_obj["WORKSPACE_LIST"]["Y"]+35,
                "WIDTH": dim_obj["WORKSPACE_LIST"]["WIDTH"]-6,
                "HEIGHT": 400
            }
        };
        this.workspace_list = wkspaceList;
        

	}


	extendCanvas(activeEq) {
		var jsavcanvas = document.getElementById("DeformsProblemPRO");
		console.log(jsavcanvas, activeEq.equationObjectReference.height);
	}

    /*
    Check iteratively for the workspaces and if each of their respective 
    equations can fit in a workspace. If not, shift... Then check other workspaces
     */
    shiftDown(activeEq, activeSoln)
    {
        for(const wkspace in this.workspace_list.workspace_list) {
            var currWorkspace = this.workspace_list.workspace_list[wkspace];
			console.log(currWorkspace);
            if(currWorkspace.lastSolution == null && currWorkspace.lastEquation == null) {
                continue;
            }
            else if(currWorkspace.lastEquation == null) { 
                //case where no equation. Only checks last solution in workspace
				console.log("hello no Eq");

                var currSoln = parseInt(currWorkspace.lastSolution.element.element[0].style.top, 10);

                if(currSoln > currWorkspace.DIMENSIONS["POSITION_Y"] + currWorkspace.DIMENSIONS["HEIGHT"]) {
					var currWkspaceElementHeight;
					if(activeEq == null) {
						currWkspaceElementHeight = currWorkspace.DIMENSIONS.ELEMENTS["HEIGHT"];
					}
					else {
						currWkspaceElementHeight = activeEq.equationObjectReference.height;
					}
                    var currWkspaceElementHeightPad = currWorkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
                    currWorkspace.DIMENSIONS["HEIGHT"] += currWkspaceElementHeight + currWkspaceElementHeightPad;
                    currWorkspace.elements[0]["jsav"].height(currWorkspace.DIMENSIONS["HEIGHT"]);

                    for(const wkspace2 in this.workspace_list.workspace_list) {
                        var currWorkspace2 = this.workspace_list.workspace_list[wkspace2];
                        if(parseInt(wkspace) < parseInt(wkspace2)) {
                            //moves the following workspaces down more when adding equation overflows

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
                                  + currWkspaceElementHeight + currWkspaceElementHeightPad + "px";

                                equations[eq].visualComponents["tickmark"]["element"][0].style.top = amountShift;
                                equations[eq].visualComponents["text"]["element"][0].style.top = amountShift;
                                equations[eq].jsavequation["element"][0].style.top = amountShift;
                            }

                            //moves all solutions down
                            var solnList = this.workspace_list.workspace_list[wkspace2].LIST_OF_SOLUTIONS_IN_WORKSPACE;
                            for(const soln in solnList) {
                                var currSoln = solnList[soln];
                                currSoln["element"]["element"][0].style.top = parseInt(currSoln["element"]["element"][0].style.top,10)
                                  + currWkspaceElementHeight + currWkspaceElementHeightPad + "px";
                            }
                        }
                    }
                    this.workspace_list.updateShape();
					
					/**
					 * Add a line for call to extendCanvas()
					 */
					this.extendCanvas(activeEq);
					break;	// TODO: See how top avoid doing this.
                }
            }
            else if(currWorkspace.lastSolution == null) { 
                //case where there is no solution. Only checks last equation in workspace
                // var abc = document.getElementsByClassName("jsavcanvas");
                // abc[1].style.height = parseInt(abc[1].style.height, 10) + 100 + "px";
                // console.log(abc);
                var currEquation = currWorkspace.lastEquation;
				console.log("hello No sol");

                if(currEquation.positionObj["POSITION_Y"] > 
                    currWorkspace.DIMENSIONS["POSITION_Y"] + currWorkspace.DIMENSIONS["HEIGHT"]) {
						// console.log(activeEq.equationObjectReference.height);

					// var currWkspaceElementHeight = currWorkspace.DIMENSIONS.ELEMENTS["HEIGHT"];
					var currWkspaceElementHeight;
					if(activeEq == null) {
						currWkspaceElementHeight = currWorkspace.DIMENSIONS.ELEMENTS["HEIGHT"];
					}
					else {
						currWkspaceElementHeight = activeEq.equationObjectReference.height;
					}
					
					var currWkspaceElementHeightPad = currWorkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
                
                    currWorkspace.DIMENSIONS["HEIGHT"] += currWkspaceElementHeight + currWkspaceElementHeightPad;
                    currWorkspace.elements[0]["jsav"].height(currWorkspace.DIMENSIONS["HEIGHT"]);

                    for(const wkspace2 in this.workspace_list.workspace_list) {
                        var currWorkspace2 = this.workspace_list.workspace_list[wkspace2];
                        if(parseInt(wkspace) < parseInt(wkspace2)) {
                            //moves the following workspaces down more when adding equation overflows

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
                            
                            //moves all equations down
                            var equations = currWorkspace2.LIST_OF_EQUATIONS_IN_WORKSPACE;
                            for(const eq in equations) {
                                var amountShift = parseInt(equations[eq].visualComponents["tickmark"]["element"][0].style.top, 10)
                                  + currWkspaceElementHeight + currWkspaceElementHeightPad + "px";

                                equations[eq].visualComponents["tickmark"]["element"][0].style.top = amountShift;
                                equations[eq].visualComponents["text"]["element"][0].style.top = amountShift;
                                equations[eq].jsavequation["element"][0].style.top = amountShift;
                            }

                            //moves all solutions down
                            for(const soln in this.workspace_list.workspace_list[wkspace2].LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                                var currSoln = this.workspace_list.workspace_list[wkspace2].LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
                                currSoln["element"]["element"][0].style.top = parseInt(currSoln["element"]["element"][0].style.top,10) + 
								  currWkspaceElementHeight + 
                                  currWkspaceElementHeightPad + "px";

                            }
                        }
                    }
                    this.workspace_list.updateShape();
					
					/**
					 * Add a line for call to extendCanvas()
					 */
					this.extendCanvas(activeEq);
					break;
                }
            }
            else { 
                //case where either the bottom-most element is a equation or solution
                var currEquation = currWorkspace.lastEquation;
                var currSoln = currWorkspace.lastSolution;

				console.log("hello");

                if((currEquation.positionObj["POSITION_Y"] > 
                  currWorkspace.DIMENSIONS["POSITION_Y"] + currWorkspace.DIMENSIONS["HEIGHT"]) || 
                  parseInt(currSoln.element.element[0].style.top, 10)  > 
                  currWorkspace.DIMENSIONS["POSITION_Y"] + currWorkspace.DIMENSIONS["HEIGHT"]) {

					var currWkspaceElementHeight;
					if(activeEq == null) {
						currWkspaceElementHeight = currWorkspace.DIMENSIONS.ELEMENTS["HEIGHT"];
					}
					else {
						currWkspaceElementHeight = activeEq.equationObjectReference.height;
					}
                    var currWkspaceElementHeightPad = currWorkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

                    currWorkspace.DIMENSIONS["HEIGHT"] += currWkspaceElementHeight+currWkspaceElementHeightPad;
                    currWorkspace.elements[0]["jsav"].height(currWorkspace.DIMENSIONS["HEIGHT"]);
                    for(const wkspace2 in this.workspace_list.workspace_list) {
                        var currWorkspace2 = this.workspace_list.workspace_list[wkspace2];
                        if(parseInt(wkspace) < parseInt(wkspace2)) {
                            //moves the following workspaces down more when adding equation overflows

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
                                  + currWkspaceElementHeight + currWkspaceElementHeightPad + "px";

                                equations[eq].visualComponents["tickmark"]["element"][0].style.top = amountShift;
                                equations[eq].visualComponents["text"]["element"][0].style.top = amountShift;
                                equations[eq].jsavequation["element"][0].style.top = amountShift;
                            }

							//moves all solutions down
							// if(this.workspace_list.workspace_list[wkspace2].LIST_OF_SOLUTIONS_IN_WORKSPACE) {
							// 	continue;
							// }
							console.log(this.workspace_list.workspace_list[wkspace2].LIST_OF_SOLUTIONS_IN_WORKSPACE);
							// break;
                            for(const soln in this.workspace_list.workspace_list[wkspace2].LIST_OF_SOLUTIONS_IN_WORKSPACE) {
								var currSoln = this.workspace_list.workspace_list[wkspace2].LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
								console.log(currSoln);
                                currSoln["element"]["element"][0].style.top = parseInt(currSoln["element"]["element"][0].style.top,10) + 
                                  this.workspace_list.workspace_list[wkspace].DIMENSIONS.ELEMENTS["HEIGHT"] + 
                                  this.workspace_list.workspace_list[wkspace].DIMENSIONS.ELEMENTS["HEIGHT_PAD"] + "px";

                            }
                        }
                    }
                    this.workspace_list.updateShape();
					
					/**
					 * Add a line for call to extendCanvas()
					 */
					this.extendCanvas(activeEq);
					break;
                }

            }
        }
    }


    shiftUp()
    {
        for(const wkspace in this.workspace_list.workspace_list) {
			var currWkspace = this.workspace_list.workspace_list[wkspace];
            var equations = currWkspace.LIST_OF_EQUATIONS_IN_WORKSPACE;
            for(const eq in equations) {
                var currEquation = equations[eq];
                if(currEquation.selected == true) {
					// console.log(currWkspace);
					currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] = 
						currWkspace.DIMENSIONS.ELEMENTS["POSITION_Y"] - 
						currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
						currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

                    //shifting ONLY following equations in current workspace up
                    for(const eq2 in equations) {
                        if(parseInt(eq2) > parseInt(eq)) {
							var amountShift = parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) - 
								currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] -
								currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"] + "px";

                            equations[eq2].visualComponents["tickmark"]["element"][0].style.top = amountShift;
                            equations[eq2].visualComponents["text"]["element"][0].style.top = amountShift;
                            equations[eq2].jsavequation["element"][0].style.top = amountShift;
                        }
                    }
                    var currWkspaceElementHeight = currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"];
                    var currWkspaceElementHeightPad = currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
                    //shifting ONLY solutions up in current workspace up
                    for(const soln in currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                        var currSoln = currWkspace.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
						if(parseInt(currEquation.visualComponents["tickmark"]["element"][0].style.top, 10) < 
							parseInt(currSoln["element"]["element"][0].style.top,10)) {
	
							currSoln["element"]["element"][0].style.top = parseInt(currSoln["element"]["element"][0].style.top,10) - 
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
                    }

                    //reducing size of workspace if the equations and solutions don't overflow anymore
                    if(currWkspace.lastEquation != null && currWkspace.lastSolution != null) {

                        var currEq = currWkspace.lastEquation;
						var currSol = currWkspace.lastSolution;
						console.log(currEq);
						console.log(currSol);
						console.log(currWkspace);
        
                        if((currEq.positionObj["POSITION_Y"] < currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"]) 
                            || parseInt(currSol.element.element[0].style.top, 10)  < currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"]) {

							currWkspace.DIMENSIONS["HEIGHT"] = 
								currWkspace.DIMENSIONS["HEIGHT"] - 
								currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
								currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

                            if(currWkspace.DIMENSIONS["HEIGHT"] < this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) {
                                currWkspace.DIMENSIONS["HEIGHT"] = this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                            }
                            else {
                                currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                                for(const wkspace2 in this.workspace_list.workspace_list) {
                                    if(parseInt(wkspace2) > parseInt(wkspace)) {
										var currWkspace2 = this.workspace_list.workspace_list[wkspace2];
										currWkspace2.DIMENSIONS["POSITION_Y"] = 
											currWkspace2.DIMENSIONS["POSITION_Y"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

										currWkspace2.DIMENSIONS.ELEMENTS["POSITION_Y"] = 
											currWkspace2.DIMENSIONS.ELEMENTS["POSITION_Y"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
    
                                        var equations2 = currWkspace2.LIST_OF_EQUATIONS_IN_WORKSPACE;
                                        for(const eq2 in equations2) {
											var amountShift = parseInt(equations2[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) - 
												currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"] + "px";
    
                                            equations2[eq2].visualComponents["tickmark"]["element"][0].style.top = amountShift;
                                            equations2[eq2].visualComponents["text"]["element"][0].style.top = amountShift;
                                            equations2[eq2].jsavequation["element"][0].style.top = amountShift;
                                        }

                                        for(const soln in currWkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                                            var currSoln = currWkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
											currSoln["element"]["element"][0].style.top = parseInt(currSoln["element"]["element"][0].style.top,10) - 
												currWkspace2.DIMENSIONS.ELEMENTS["HEIGHT"] - currWkspace2.DIMENSIONS.ELEMENTS["HEIGHT_PAD"] + "px";
                    
                                        }
                                    }
                                }
                            }
                            
                            this.workspace_list.updateShape();

                        }

                    }
                    else if(currWkspace.lastEquation != null) { //case where no equation. Only checks last solution in workspace
                        var currEq = currWkspace.lastEquation;
        
        
                        if((currEq.positionObj["POSITION_Y"] < currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"])) {
							currWkspace.DIMENSIONS["HEIGHT"] = currWkspace.DIMENSIONS["HEIGHT"] - currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
								currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
                            if(currWkspace.DIMENSIONS["HEIGHT"] < this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) {
                                currWkspace.DIMENSIONS["HEIGHT"] = this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                            }
                            else {
                                currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                                for(const wkspace2 in this.workspace_list.workspace_list) {
                                    if(parseInt(wkspace2) > parseInt(wkspace)) {
										var currWkspace2 = this.workspace_list.workspace_list[wkspace2];
										currWkspace2.DIMENSIONS["POSITION_Y"] = 
											currWkspace2.DIMENSIONS["POSITION_Y"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

										currWkspace2.DIMENSIONS.ELEMENTS["POSITION_Y"] = 
											currWkspace2.DIMENSIONS.ELEMENTS["POSITION_Y"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
    
                                        var equations2 = currWkspace2.LIST_OF_EQUATIONS_IN_WORKSPACE;
                                        for(const eq2 in equations2) {
											var amountShift = parseInt(equations2[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) - 
												currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"] + "px";
    
                                            equations2[eq2].visualComponents["tickmark"]["element"][0].style.top = amountShift;
                                            equations2[eq2].visualComponents["text"]["element"][0].style.top = amountShift;
                                            equations2[eq2].jsavequation["element"][0].style.top = amountShift;
                                        }

                                        for(const soln in currWkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                                            var currSoln = currWkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
											currSoln["element"]["element"][0].style.top = parseInt(currSoln["element"]["element"][0].style.top,10) - 
												currWkspace2.DIMENSIONS.ELEMENTS["HEIGHT"] - currWkspace2.DIMENSIONS.ELEMENTS["HEIGHT_PAD"] + "px";
                    
                                        }
                                    }
                                }
                            }
                            
                            this.workspace_list.updateShape();

                        }
                    }
                    else if(currWkspace.lastSolution != null) { //case where no solution. Only checks last equation in workspace
                        var currSol = currWkspace.lastSolution;
        
        
						if(parseInt(currSol.element.element[0].style.top, 10)  < 
							currWkspace.DIMENSIONS["POSITION_Y"] + currWkspace.DIMENSIONS["HEIGHT"]) {

							currWkspace.DIMENSIONS["HEIGHT"] = 
								currWkspace.DIMENSIONS["HEIGHT"] - 
								currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
								currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

                            if(currWkspace.DIMENSIONS["HEIGHT"] < this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]) {
                                currWkspace.DIMENSIONS["HEIGHT"] = this.workspace_list.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"];
                            }
                            else {
                                currWkspace.elements[0]["jsav"].height(currWkspace.DIMENSIONS["HEIGHT"]);
                                for(const wkspace2 in this.workspace_list.workspace_list) {
                                    if(parseInt(wkspace2) > parseInt(wkspace)) {
										var currWkspace2 = this.workspace_list.workspace_list[wkspace2];
										currWkspace2.DIMENSIONS["POSITION_Y"] = 
											currWkspace2.DIMENSIONS["POSITION_Y"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];

										currWkspace2.DIMENSIONS.ELEMENTS["POSITION_Y"] = 
											currWkspace2.DIMENSIONS.ELEMENTS["POSITION_Y"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - 
											currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"];
    
                                        var equations2 = currWkspace2.LIST_OF_EQUATIONS_IN_WORKSPACE;
                                        for(const eq2 in equations2) {
											var amountShift = parseInt(equations2[eq2].visualComponents["tickmark"]["element"][0].style.top, 10) - 
												currWkspace.DIMENSIONS.ELEMENTS["HEIGHT"] - currWkspace.DIMENSIONS.ELEMENTS["HEIGHT_PAD"] + "px";
    
                                            equations2[eq2].visualComponents["tickmark"]["element"][0].style.top = amountShift;
                                            equations2[eq2].visualComponents["text"]["element"][0].style.top = amountShift;
                                            equations2[eq2].jsavequation["element"][0].style.top = amountShift;
                                        }

                                        for(const soln in currWkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                                            var currSoln = currWkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
											currSoln["element"]["element"][0].style.top = parseInt(currSoln["element"]["element"][0].style.top,10) - 
												currWkspace2.DIMENSIONS.ELEMENTS["HEIGHT"] - currWkspace2.DIMENSIONS.ELEMENTS["HEIGHT_PAD"] + "px";
                    
                                        }
                                    }
                                }
                            }
                            
                            this.workspace_list.updateShape();

                        }
                    }
        
                }
            }
        }
    }

    deleteWkspace(id)
    {
        for(const wkspace in this.workspace_list.workspace_list) {
            if(wkspace == id) {
				var currWkspace = this.workspace_list.workspace_list[wkspace];
                for(const wkspace2 in this.workspace_list.workspace_list) {
                    //move everything after the deleted workspace up
                    if(parseInt(wkspace) < parseInt(wkspace2)) {
                        var currWorkspace2 = this.workspace_list.workspace_list[wkspace2];
                        var equations = currWorkspace2.LIST_OF_EQUATIONS_IN_WORKSPACE;
                        currWorkspace2.DIMENSIONS.ELEMENTS["POSITION_Y"] -= currWkspace.DIMENSIONS["HEIGHT"];
                        for(const eq2 in equations) {
							var amountShift = parseInt(equations[eq2].visualComponents["tickmark"]["element"][0].style.top,10) - 
								currWkspace.DIMENSIONS["HEIGHT"];

                            equations[eq2].visualComponents["tickmark"]["element"][0].style.top = amountShift + "px";
                            equations[eq2].visualComponents["text"]["element"][0].style.top = amountShift + 3 + "px";
                            equations[eq2].jsavequation["element"][0].style.top = amountShift + "px";
                        }
                        for(const soln in currWorkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                            var currSoln = currWorkspace2.LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
							currSoln["element"]["element"][0].style.top = parseInt(currSoln["element"]["element"][0].style.top,10) - 
								currWkspace.DIMENSIONS["HEIGHT"] + "px";
                        }
                    }
                }

                //deletes all equations associated with workspace
                for(const eq in this.workspace_list.workspace_list[wkspace].LIST_OF_EQUATIONS_IN_WORKSPACE) {
                    var deleteEq = this.workspace_list.workspace_list[wkspace].LIST_OF_EQUATIONS_IN_WORKSPACE[eq];
                    deleteEq.jsavequation.clear();
                    deleteEq.visualComponents["text"].clear();
                    deleteEq.visualComponents["tickmark"].clear();
                }

                //deletes all solutions associated with workspace
                for(const soln in this.workspace_list.workspace_list[wkspace].LIST_OF_SOLUTIONS_IN_WORKSPACE) {
                    var deleteSoln = this.workspace_list.workspace_list[wkspace].LIST_OF_SOLUTIONS_IN_WORKSPACE[soln];
                    deleteSoln.element.clear();
                }
            }
        }
    }
}
window.WindowManager = window.WindowManager || WindowManager