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
        
        this.colors = {
            // azure:                  {colorcode: "#f0ffff", selected: false},
            // aquamarine:             {colorcode: "#7FFFD4", selected: false},
            // blanchedalmond:         {colorcode: "#FFEBCD", selected: false},
            // beige:                  {colorcode: "#f5f5dc", selected: false},
            // babyblue:               {colorcode: "#6495ED", selected: false},
            // coral:                  {colorcode: "#FF7F50", selected: false},
            // darksalmon:             {colorcode: "#e9967a", selected: false},
            // darkturquoise:          {colorcode: "#00CED1", selected: false},
            // greenyellow:            {colorcode: "#ADFF2F", selected: false},
            ivory:                  {colorcode: "#FFFFF0", selected: false},
            lavender:               {colorcode: "#E6E6FA", selected: false},
            LavenderBlush:          {colorcode: "#FFF0F5", selected: false},
            LightBlue:              {colorcode: "#ADD8E6", selected: false},
            // gold:                   {colorcode: "#ffd700", selected: false},
            khaki:                  {colorcode: "#f0e68c", selected: false},
            // orange:                 {colorcode: "#ffa500", selected: false},
            // pink:                   {colorcode: "#ffc0cb", selected: false},
            // silver:                 {colorcode: "#c0c0c0", selected: false},
            white:                  {colorcode: "#ffffff", selected: false},
            // yellow:                 {colorcode: "#ffff00", selected: false},
            // LightCyan:              {colorcode: "#E0FFFF", selected: false},
            // LightGoldenRodYellow:   {colorcode: "#FAFAD2", selected: false},
            // LightGreen:             {colorcode: "#90EE90", selected: false},
            // LightPink:              {colorcode: "#FFB6C1", selected: false},
            // LightSalmon:            {colorcode: "#FFA07A", selected: false},
            // LightSeaGreen:          {colorcode: "#20B2AA", selected: false},
            // LightSkyBlue:           {colorcode: "#87CEFA", selected: false},
            // PaleGoldenRod:          {colorcode: "#EEE8AA", selected: false},
            // PaleGreen:              {colorcode: "#98FB98", selected: false},
            // PaleTurquoise:          {colorcode: "#AFEEEE", selected: false},
            // PaleVioletRed:          {colorcode: "#DB7093", selected: false},
            // PapayaWhip:             {colorcode: "#FFEFD5", selected: false},
            // PeachPuff:              {colorcode: "#FFDAB9", selected: false},
            // Plum:                   {colorcode: "#DDA0DD", selected: false},
        };
        this.remainingcolors = 0; // To be set on the first call to the function

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
        
        // TEMPORARILY DISABLED 2023-02-06 FOR IN-CLASS FEEDBACK ENGINE TESTING
        // POSITIVELY ENABLE THIS AFTERWARDS

        // // this.addbutton = this.globalJSAVobject.label("Add Workspace", 
        // var addbuttonText = this.globalJSAVobject.label("", 
        // {left: this.DIMENSIONS["UPPER_CORNER_X"]+4, top: this.DIMENSIONS["UPPER_CORNER_Y"]-12})
        // .addClass("addworkspace");
        
        // this.addbutton = document.createElement("input");
        // this.addbutton.setAttribute("type", "button");
        // this.addbutton.setAttribute("value", "Add Workspace");
        // addbuttonText.element[0].appendChild(this.addbutton);
        // addbuttonText.element[0].setAttribute("title", "Add a new workspace area to segregate subparts or separate attempts.");
        
        // // this.addbutton.element[0].addEventListener('click', e => {
        // this.addbutton.addEventListener("click", e=> {
        //     // e.stopPropagation();
        //     e.stopImmediatePropagation();
        //     this.addNewWorkspace();
        //     this.globalJSAVobject.logEvent({type: "adding new workspace", desc: `Added workspace ${this.workspaceCounter-1}`});
        //     // console.log(this.globalJSAVobject);
        // });

        // Adding button for downloading entire configuration

        if(window.parent.ODSA == undefined) {
            var downloadButtonText = this.globalJSAVobject.label("", 
            {
                left: this.DIMENSIONS["UPPER_CORNER_X"]+this.DIMENSIONS["WIDTH"]/2-86, 
                top: this.DIMENSIONS["UPPER_CORNER_Y"]-12
            })
            .addClass("addworkspace");
            
            this.downloadButton = document.createElement("input");
            this.downloadButton.setAttribute("type", "button");
            this.downloadButton.setAttribute("value", "Download Solution Attempt");
            this.downloadButton.setAttribute("id", "workspaceSummaryDownload");
            downloadButtonText.element[0].appendChild(this.downloadButton);
            downloadButtonText.element[0].setAttribute("title", "Downloads the current workspace (equations and values computed) and answers submitted");
            
            // this.addbutton.element[0].addEventListener('click', e => {
            this.downloadButton.addEventListener("click", e=> {
                // e.stopPropagation();
                e.stopImmediatePropagation();
                Window.getAttemptSummaryComplete();
                console.log("Downloading full solution attempt")
                // console.log(this.globalJSAVobject);
            });
        }

        // Adding "Help button" for immediate help

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
        
        helpButtonText.element[0].addEventListener("click", e=> {
            // e.stopPropagation();
            e.stopImmediatePropagation();
            Window.showHelp("general", null);
            this.globalJSAVobject.logEvent({type: "getting help from the workspace", desc: `workspace help from no. ${this.workspaceCounter-1}`});
            // console.log(this.globalJSAVobject);
        });
        
        // Automatically add a new workspace, by default
        // this.addNewWorkspace(); 
        // Update: This is commented out since it uses WindowManager.extendCanvas() which has not been defined yet.
        // This will be called later.
    }
    selectWorkspaceColor()
    {
        let result;
        
        // Check if any colors are remaining
        if(this.remainingcolors == 0)
        {
            for (let bg in this.colors) this.colors[bg]["selected"] = false;
            this.remainingcolors = Object.keys(this.colors).length;
        }

        // Select a random color that hasn't been picked before
        while(true)
        {   
            let bgindex = Math.floor(Math.random() * Object.keys(this.colors).length);
            let bg = Object.keys(this.colors)[bgindex];
            if (this.colors[bg]["selected"] == false)
            {
                result = bg;
                break;
            }
        }
        
        this.colors[result]["selected"] = true;
        this.remainingcolors--;

        return result;
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
            // this.workspace_list,
            this.selectWorkspaceColor()
            );        
        this.workspace_list[this.workspaceCounter] = newWkspace;
        this.workspaceCounter++;
        
        // Update reference positions
        this.updateShape();
        
        
        // TEMPORARILY DISABLED 2023-02-06 FOR IN-CLASS FEEDBACK ENGINE TESTING
        // POSITIVELY ENABLE THIS AFTERWARDS
        
        // Associate clickhandler for deletion
        // newWkspace.removebutton.addEventListener('click', e => {
        //     e.stopPropagation();
        //     var delete_ID = newWkspace.destroyBox();
        //     delete this.workspace_list[delete_ID];
        //     this.globalJSAVobject.logEvent({type: "deleting workspace", "id": delete_ID});
        //     this.updateShape();
        // });

	    // TODO: Clean this up and replace with call to WindowManager functions
        Window.windowManager.extendCanvas(this.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"]);
        // console.log(document.styleSheets[2].rules[0].style.height);
        document.styleSheets[2].rules[0].style.height = 
        Math.max(600, (this.DIMENSIONS["HEIGHT"] + this.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"] + this.DIMENSIONS["WK_PADDING"])) + "px";
	
	    Window.updateExerciseWindowHeight(this.DIMENSIONS["NEW_WKSPACE"]["HEIGHT"] + this.DIMENSIONS["WK_PADDING"]);
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
