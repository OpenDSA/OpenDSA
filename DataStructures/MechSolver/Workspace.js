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
            "HEIGHT": dim_obj["HEIGHT"]
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
        this.elements[1] = {
            "jsav":
                this.globalSectionObj.label(this.name, 
                {
                    left: this.DIMENSIONS["POSITION_X"]+4, 
                    top: this.DIMENSIONS["POSITION_Y"]-15
                })
                .addClass("workspacelabel"),
            "div": (list => 
                list[list.length-1]
                )(document.getElementsByClassName("workspacelabel")),
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
                )((document.getElementsByClassName("close_x"))),
        };
        this.elements[2]["div"].setAttribute("id",this.name+"close");
        this.removebutton = 
        (list => 
            list[list.length-1]
            )(document.getElementsByClassName("close_x"))
        

        // // Adding the Add, Remove, Solve Buttons to add, remove, and solve equations
        // this.elements[3] = {
        //     "jsav":
        //         this.globalSectionObj.label("Add", 
        //         {
        //             left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 - 75, 
        //             top: this.DIMENSIONS["POSITION_Y"]-15
        //         })
        //         .addClass("addequation"),
        //     "div": (list => 
        //         list[list.length-1]
        //         )((document.getElementsByClassName("addequation"))),
        // };
        // this.elements[3]["div"].setAttribute("id",this.name+"addeq");
        // document.getElementById(this.name+"addeq").addEventListener('click', e => {
        //     e.stopPropagation();
        //     // Add function call to equation addition here.
        //     this.addNewEquation("Equation name");
        // });

        // this.elements[4] = {
        //     "jsav":
        //         this.globalSectionObj.label("Remove", 
        //         {
        //             left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 - 41, 
        //             top: this.DIMENSIONS["POSITION_Y"]-15
        //         })
        //         .addClass("delequation"),
        //     "div": (list => 
        //         list[list.length-1]
        //         )((document.getElementsByClassName("delequation"))),
        // };
        // this.elements[4]["div"].setAttribute("id",this.name+"deleq");
        // document.getElementById(this.name+"deleq").addEventListener('click', e => {
        //     e.stopPropagation();
        //     // Add function call to equation deletion here.
        // });

        // this.elements[5] = {
        //     "jsav":
        //         this.globalSectionObj.label("Solve", 
        //         {
        //             left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 + 26, 
        //             top: this.DIMENSIONS["POSITION_Y"]-15
        //         })
        //         .addClass("solveequation"),
        //     "div": (list => 
        //         list[list.length-1]
        //         )((document.getElementsByClassName("solveequation"))),
        // };
        // this.elements[5]["div"].setAttribute("id",this.name+"solveeq");
        // document.getElementById(this.name+"solveeq").addEventListener('click', e => {
        //     e.stopPropagation();
        //    // Add function call to equation set solving and result propagation here.
        //});
    }
    destroyBox()
    {
        // Triggered by the clickhandler
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
        // this.elements[3]["div"].style.top = this.DIMENSIONS["POSITION_Y"]-15+"px";
        // this.elements[4]["div"].style.top = this.DIMENSIONS["POSITION_Y"]-15+"px";
        // this.elements[5]["div"].style.top = this.DIMENSIONS["POSITION_Y"]-15+"px";
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
        console.log(this.name,"adding equation", equationListEntity)
        return;
        // equationListEntity is of type equation (which we will define later) and not 
        // necessarily everything in equation.js
        this.LIST_OF_EQUATIONS_IN_WORKSPACE[this.equationCounter] = equationListEntity 
        //        |_>  To be elaborated for additional operations.

        if(equationListEntity.name in this.equationHashMap)
        {
            function getLastElement(arraylist)
            {
                return arraylist[arraylist.length-1];
            }
            this.equationHashMap[equationListEntity.name]
            .push(getLastElement(this.equationHashMap[equationListEntity.name])+1)
        }
        else
        {
            this.equationHashMap[equationListEntity.name]
            this.equationCounter++;
        }
    }
}

window.Workspace = window.Workspace || Workspace