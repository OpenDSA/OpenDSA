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
            "UPPER_CORNER_X": dim_obj["WORKSPACE_LIST"]["X"],
            "UPPER_CORNER_Y": dim_obj["WORKSPACE_LIST"]["Y"],
            "NEW_WKSPACE": {
                "CORNER_X": dim_obj["WORKSPACE_LIST"]["X"]+3,
                "CORNER_Y": dim_obj["WORKSPACE_LIST"]["Y"]+3,
                "WIDTH": dim_obj["WORKSPACE_LIST"]["WIDTH"]-6,
            }
        }

        // Creating the workspace list div/box
        this.workspaceListBox = jsavCanvasObj.g.rect(
            dim_obj["WORKSPACE_LIST"]["X"], 
            dim_obj["WORKSPACE_LIST"]["Y"], 
            dim_obj["WORKSPACE_LIST"]["WIDTH"], 500,
            {
                "fill":"grey",
                "id": "wkspacelist",
                "r": 10
            });

        // Automatically add a new workspace, by default
        this.addNewWorkspace()
        this.addNewWorkspace()
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
        
        //Update reference positions
        this.DIMENSIONS["NEW_WKSPACE"]["CORNER_Y"] = 
        newWkspace["DIMENSIONS"]["HEIGHT"]+5

        // Associate clickhandler for deletion
        newWkspace.removebutton.addEventListener('click', function(e){
            e.stopPropagation();
            var delete_ID = newWkspace.destroyBox();
        });
    }
}

window.Workspace = window.Workspace || Workspace;