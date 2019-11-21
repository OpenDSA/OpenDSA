/**
 * Class for defining individual workspaces. Each workspace can contain multiple
 * equations, and is associated with a single task of the problem.
 * Workspaces are created when people move to different tasks of the problem,
 * after completing the previous tasks.
 * (??)TODO: However, equations from different workspaces are accessible for solving
 * elsewhere as well.
 */

class Workspace
{
    constructor(jsavCanvasObj, dim_obj, workspaceid)
    {
        this.id=workspaceid;
        this.name="wk"+workspaceid;
        this.globalSectionObj = jsavCanvasObj;
        this.LIST_OF_EQUATIONS_IN_WORKSPACE = {};
        this.LIST_OF_ASSOCIATIONS = {};
        this.equationCounter = 0;
        this.equationHashMap = {};  // This is used to keep track of an enumerate
                                    // multiple instances of the same equation.

        // Actually create the div for the new workspace
        this.DIMENSIONS = {
            "POSITION_X": dim_obj["CORNER_X"],
            "POSITION_Y": dim_obj["CORNER_Y"],
            "WIDTH": dim_obj["WIDTH"],
            "HEIGHT": 100
        }
        
        // Hold references to the individual elements in the box,
        // To delete later when required.
        this.elements = [];
        this.removebutton = null;

        this.createBox();
    }
    createBox()
    {
        // Creating the div element and setting attributes
        /*var wkspacediv = document.createElement("div");
        wkspacediv.setAttribute("id",this.name);
        wkspacediv.classList += "workspace";*/
        /* wkspacediv.innerHTML +=
         "<input id='"+this.name+"_close' type='button' 
         class='close_x' value='X'/>" */
        /* wkspacediv.style.background = this.selectWorkspaceColor() */

        this.elements[0] = this.globalSectionObj.g.rect(
            //Update this to a global object all Workspace instances receive.
            this.DIMENSIONS["POSITION_X"],
            this.DIMENSIONS["POSITION_Y"],
            this.DIMENSIONS["WIDTH"],
            this.DIMENSIONS["HEIGHT"],
            {
                "fill":"white",
                "r": 10,
            }
        );
        this.elements[1] = this.globalSectionObj.label(this.name, 
        {
            left: this.DIMENSIONS["POSITION_X"]+4, 
            top: this.DIMENSIONS["POSITION_Y"]-15
        })
        .addClass("workspacelabel");
        
        this.elements[2] = this.globalSectionObj.label("X", 
        {
            left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]-20, 
            top: this.DIMENSIONS["POSITION_Y"]-15
        })
        .addClass("workspacelabel")
        
        this.removebutton = 
        (list => 
            list[list.length-1]
            )(document.getElementsByClassName("workspacelabel"))
        

        // Possibly required elsewhere
        /* this.element = this.globalSectionObj.g.set();
        this.element.push(this.wkspacebox);
        this.element.push(this.wkspaceid);
        this.element.push(this.close_x); */
    }
    destroyBox()
    {
        // Triggered by the clickhandler
        this.elements.forEach(x => x.clear())

        //This is fine, since the parent knows to remove this from their tracking.
        return this.id;
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
    addNewEquation(equationListEntity)
    {
        // equationListEntity is of type equation (which we will define later) and not 
        // necessarily everything in equation.js
        this.LIST_OF_EQUATIONS_IN_WORKSPACE[this.equationCounter] = equationListEntity // To be elaborated for additional operations.
        if(equationListEntity.name in this.equationHashMap)
        {
            function getLastElement(arraylist)
            {
                return arraylist[arraylist.length-1];
            }
            this.equationHashMap[equationListEntity.name].push(getLastElement(this.equationHashMap[equationListEntity.name])+1)
        }
        else
        {
            this.equationHashMap[equationListEntity.name]
            this.equationCounter++;
        }
    }
}

window.Workspace = window.Workspace || Workspace