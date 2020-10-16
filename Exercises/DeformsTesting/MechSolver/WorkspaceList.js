/**
 * This class points to the list of the workspaces created,
 * and keeps track of the workspace id, which then gets added
 * to the variable boxes in the equations for keeping track.
 * 
 * Only one object of this is ever created, and it ties in with the
 * workspace-global div id (which is currently the 'workspace' section).
 */

class WorkspaceList
{
    constructor(jsavCanvasObj, dim_obj, equationBank, globalPointerReference)
    {
        this.workspace_list = {};
        this.globalJSAVobject = jsavCanvasObj;
        this.globalEquationBank = equationBank;
        this.globalPointerReference = globalPointerReference;
        this.workspaceCounter=1;

        this.DIMENSIONS = {
            "BASE_NWK_UPPER_CORNER_X": dim_obj["WORKSPACE_LIST"]["X"]+3,
            "BASE_NWK_UPPER_CORNER_Y": dim_obj["WORKSPACE_LIST"]["Y"]+35,
            "BASE_HEIGHT": dim_obj["WORKSPACE_LIST"]["HEIGHT"],

            "UPPER_CORNER_X": dim_obj["WORKSPACE_LIST"]["X"],
            "UPPER_CORNER_Y": dim_obj["WORKSPACE_LIST"]["Y"],
            "HEIGHT": dim_obj["WORKSPACE_LIST"]["HEIGHT"],
            "PADDING": 20,
            "WK_PADDING": 5,
            "WIDTH": dim_obj["WORKSPACE_LIST"]["WIDTH"],

            "NEW_WKSPACE": {
                "CORNER_X": dim_obj["WORKSPACE_LIST"]["X"]+3,
                "CORNER_Y": dim_obj["WORKSPACE_LIST"]["Y"]+35,
                "WIDTH": dim_obj["WORKSPACE_LIST"]["WIDTH"]-6,
                "HEIGHT": 250
            }
        }

        // Creating the workspace list div/box
        this.workspaceListBox = jsavCanvasObj.g.rect(
            this.DIMENSIONS["UPPER_CORNER_X"], 
            this.DIMENSIONS["UPPER_CORNER_Y"], 
            this.DIMENSIONS["WIDTH"],
            this.DIMENSIONS["HEIGHT"]+this.DIMENSIONS["PADDING"],
            {
                "fill":"grey",
                "id": "wkspacelist",
                "r": 10
            });
        
        // Add the buttons for adding workspace
        
        // this.addbutton = this.globalJSAVobject.label("Add Workspace", 
        var addbuttonText = this.globalJSAVobject.label("", 
        {left: this.DIMENSIONS["UPPER_CORNER_X"]+4, top: this.DIMENSIONS["UPPER_CORNER_Y"]-12})
        .addClass("addworkspace");
        
        this.addbutton = document.createElement("input");
        this.addbutton.setAttribute("type", "button");
        this.addbutton.setAttribute("value", "Add Workspace");
        addbuttonText.element[0].appendChild(this.addbutton);
        addbuttonText.element[0].setAttribute("title", "Add a new workspace area to segregate subparts or separate attempts.");
        
        // this.addbutton.element[0].addEventListener('click', e => {
        this.addbutton.addEventListener("click", e=> {
            // e.stopPropagation();
            e.stopImmediatePropagation();
            this.addNewWorkspace();
            this.globalJSAVobject.logEvent({type: "adding new workspace", "id": this.workspaceCounter-1});
            // console.log(this.globalJSAVobject);
        });

        var helpButtonText = this.globalJSAVobject.label("", 
        {
            left: this.DIMENSIONS["UPPER_CORNER_X"]+this.DIMENSIONS["WIDTH"]-50,
            top: this.DIMENSIONS["UPPER_CORNER_Y"]-12
        })
        .addClass("addworkspace");
        
        var helpButton = document.createElement("input");
        helpButton.setAttribute("type", "button");
        helpButton.setAttribute("value", "Help");
        helpButtonText.element[0].appendChild(helpButton);
        helpButtonText.element[0].setAttribute("title", "Click to open the help text");
        
        // this.addbutton.element[0].addEventListener('click', e => {
        helpButtonText.element[0].addEventListener("click", e=> {
            // e.stopPropagation();
            e.stopImmediatePropagation();
            Window.showHelp("general");
            this.globalJSAVobject.logEvent({type: "getting help from the workspace", "id": this.workspaceCounter-1});
            // console.log(this.globalJSAVobject);
        });
        
        // Automatically add a new workspace, by default
        this.addNewWorkspace();
    }
    addNewWorkspace()
    {
        // Add the new object
        var newWkspace = new Workspace(
            this.globalJSAVobject,
            this.DIMENSIONS["NEW_WKSPACE"],
            this.workspaceCounter,
            this.globalEquationBank,
            this.globalPointerReference,
            this.workspace_list
            );        
        this.workspace_list[this.workspaceCounter] = newWkspace;
        this.workspaceCounter++;
        
        // Update reference positions
        this.updateShape();

        // Associate clickhandler for deletion
        newWkspace.removebutton.addEventListener('click', e => {
            e.stopPropagation();
            var delete_ID = newWkspace.destroyBox();
            delete this.workspace_list[delete_ID];
            this.globalJSAVobject.logEvent({type: "deleting workspace", "id": delete_ID});
            this.updateShape();
        });
        // Window.windowManager.extendCanvas(this.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]);
        // console.log(document.styleSheets[2].rules[0].style.height);
        document.styleSheets[2].rules[0].style.height = 
        Math.max(1000, (this.DIMENSIONS["HEIGHT"] + this.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"] + this.DIMENSIONS["WK_PADDING"])) + "px";

    }
    updateShape()
    {
        //DEBUG:
        //console.log(this.workspace_list);

        this.DIMENSIONS["HEIGHT"] = this.DIMENSIONS["BASE_HEIGHT"];
        this.DIMENSIONS["NEW_WKSPACE"]["CORNER_X"] = this.DIMENSIONS["BASE_NWK_UPPER_CORNER_X"];
        this.DIMENSIONS["NEW_WKSPACE"]["CORNER_Y"] = this.DIMENSIONS["BASE_NWK_UPPER_CORNER_Y"];
        // Window.windowManager.extendCanvas();
        // var jsavcan = document.querySelectorAll("#DeformsProblemPRO.jsavcanvas");
        // console.log(jsavcan);

        // Updating the height of the workspace list to include all the workspaces
        for(var wk in this.workspace_list) {
            this.DIMENSIONS["HEIGHT"]+=this.workspace_list[wk].DIMENSIONS["HEIGHT"]+this.DIMENSIONS["WK_PADDING"];
            // This shifts the reference points of all the existing workspace
            // boxes and the equations contained in them.
            this.workspace_list[wk].DIMENSIONS["POSITION_Y"] = 
                    this.DIMENSIONS["NEW_WKSPACE"]["CORNER_Y"];
            // this.workspace_list[wk].updateShape();

            // Set the corner parameters for the next workspace to be added
            this.DIMENSIONS["NEW_WKSPACE"]["CORNER_Y"] = 
                    this.DIMENSIONS["NEW_WKSPACE"]["CORNER_Y"]+
                    this.workspace_list[wk].DIMENSIONS["HEIGHT"]+this.DIMENSIONS["WK_PADDING"];
        }
        
        this.workspaceListBox.height(this.DIMENSIONS["HEIGHT"]+this.DIMENSIONS["PADDING"]);
    }
}

window.Workspace = window.Workspace || Workspace;