/**
 * This class points to the list of the workspaces created,
 * and keeps track of the workspace id, which then gets added
 * to the variable boxes in the equations for keeping track.
 * 
 * Only one object of this is ever created, and it ties in with the
 * workspace-global div id (which is currently the 'workspace' section).
 */

//const Workspace = require("./Workspace");

class WorkspaceList
{
    constructor(jsavCanvasObj, dim_obj)
    {
        this.workspace_list = {};
        this.globalSectionObj = jsavCanvasObj;
        this.workspaceCounter=1;

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
        this.globalSectionObj.label("Add Workspace", 
        {left: this.DIMENSIONS["UPPER_CORNER_X"]+4, top: this.DIMENSIONS["UPPER_CORNER_Y"]-12})
        .addClass("addworkspace");

        this.addbutton = 
        (list => 
            list[list.length-1]
            )(document.getElementsByClassName("addworkspace"));
        
        this.addbutton.addEventListener('click', e => {
            e.stopPropagation();
            this.addNewWorkspace();
            this.globalSectionObj.logEvent({type: "adding new workspace", "id": this.workspaceCounter-1});
        });
        
        // Automatically add a new workspace, by default
        this.addNewWorkspace();
    }
    addNewWorkspace()
    {
        // Add the new object
        var newWkspace = new Workspace(
            this.globalSectionObj,
            this.DIMENSIONS["NEW_WKSPACE"],
            this.workspaceCounter
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
            this.globalSectionObj.logEvent({type: "deleting workspace", "id": delete_ID});
            this.updateShape();
        });
    }
    updateShape()
    {
        //DEBUG:
        //console.log(this.workspace_list);

        this.DIMENSIONS["HEIGHT"] = this.DIMENSIONS["BASE_HEIGHT"];
        this.DIMENSIONS["NEW_WKSPACE"]["CORNER_X"] = this.DIMENSIONS["BASE_NWK_UPPER_CORNER_X"];
        this.DIMENSIONS["NEW_WKSPACE"]["CORNER_Y"] = this.DIMENSIONS["BASE_NWK_UPPER_CORNER_Y"];

        // Updating the height of the workspace list to include all the workspaces
        for(var wk in this.workspace_list) {
            this.DIMENSIONS["HEIGHT"]+=this.workspace_list[wk].DIMENSIONS["HEIGHT"];
            
            // This shifts the reference points of all the existing workspace
            // boxes and the equations contained in them.
            this.workspace_list[wk].DIMENSIONS["POSITION_Y"] = 
                    this.DIMENSIONS["NEW_WKSPACE"]["CORNER_Y"];
            this.workspace_list[wk].updateShape();

            // Set the corner parameters for the next workspace to be added
            this.DIMENSIONS["NEW_WKSPACE"]["CORNER_Y"] = 
                    this.DIMENSIONS["NEW_WKSPACE"]["CORNER_Y"]+
                    this.workspace_list[wk].DIMENSIONS["HEIGHT"]+5;
        }
        
        this.workspaceListBox.height(this.DIMENSIONS["HEIGHT"]+this.DIMENSIONS["PADDING"]);
    }
}

window.Workspace = window.Workspace || Workspace;