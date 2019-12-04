/**
 * This class points to the list of equations in different groups
 * created from the equation_bank.js file.
 * 
 * It is to be directly associated with the equation_bank section id.
 * Behaviour/Description: On spawning,
 * 1) find the unique "groups" values for all the equations,
 * 2) create a new div element for each page pointer in dictionary indexed by group,
 * 3) For each equation in the bank, create a new 
 * 
 */

class EquationBank{
    constructor(jsavCanvasObj, dim_obj) 
    {
        this.globalSectionObj = jsavCanvasObj;
        this.DIMENSIONS = {
            "POSITION_X": dim_obj["EQBANK"]["CORNER_X"],
            "POSITION_Y": dim_obj["EQBANK"]["CORNER_Y"],
            "WIDTH": dim_obj["EQBANK"]["WIDTH"],
            "HEIGHT": dim_obj["EQBANK"]["HEIGHT"],
            "PAGE": {
                "POSITION_X": dim_obj["EQBANK"]["CORNER_X"]+5,
                "POSITION_Y": dim_obj["EQBANK"]["CORNER_Y"]+40,
                "WIDTH": 30,
                "HEIGHT_PAD": 5,
                "HEIGHT": 50
            }
        }

        // Initializing the equation bank list: pointers to actual objects
        // + list representations
        this.equation_pages = {};
        this.createEquationPages();
        //console.log(this.equation_pages);

        this.equation_page_number = -1;
        this.equation_page_titles = [];

        // Structure:
        /* 
        {
            group:
            {
                pagediv: pageDivObject, // control css display attribute for selection.
                equations:
                {
                    equationObj:
                    {
                        equationObjectName: equationObject,
                        equationDivName: equationDiv
                    }
                }
            }
        }
         */
        
        // Create the main visual element, and start filling in.
        this.createEquationBank();
    }
    createEquationBank()
    {
        // Creating the equation div/box
        this.equationBankBox = this.globalSectionObj.g.rect(
            this.DIMENSIONS["POSITION_X"],
            this.DIMENSIONS["POSITION_Y"],
            this.DIMENSIONS["WIDTH"],
            this.DIMENSIONS["HEIGHT"],
            {
                "fill":"whitesmoke",
                "id": "eqbank",
                "r": 10,
                "element": document.getElementById("equationbank")
            })
        this.equationBankDiv = (list => list[list.length-1])
        (document.getElementsByTagName("rect"))

        this.globalSectionObj.label("Equation Bank", 
            {
                left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/2 - 46, 
                top: this.DIMENSIONS["POSITION_Y"]-12,
            })
            .addClass("workspacelabel")
        
        // Setup the page selection and equation selection mechanisms
        //console.log(this.equationBankDiv);
        this.globalSectionObj.label(
            "<",
            {
                left: this.DIMENSIONS["POSITION_X"],
                top: this.DIMENSIONS["POSITION_Y"]+15
            }
        ).addClass("addworkspace")
        .element[0].addEventListener("click", e=> {
            e.stopPropagation();
            if(this.equation_page_number == 0)
                this.equation_page_number = this.equation_page_titles.length-1;
            else
                this.equation_page_number--;
            this.showPage();
        });
        this.globalSectionObj.label(
            ">",
            {
                left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"] - 15,
                top: this.DIMENSIONS["POSITION_Y"]+15
            }
        ).addClass("addworkspace")
        .element[0].addEventListener("click", e=> {
            e.stopPropagation();
            if(this.equation_page_number-this.equation_page_titles.length == -1)
                this.equation_page_number = 0;
            else
                this.equation_page_number++;
            this.showPage();
        });
        
        // Creating the page objects (JSAV objects)
        for(var pagename in this.equation_pages)
        {
            this.equation_page_titles.push(pagename);

            // Create a JSAV set containing all the visual elements.
            this.equation_pages[pagename]["pagejsav"] = [];

            this.equation_pages[pagename]["pagejsav"].push(
                this.globalSectionObj.label(
                    pagename,
                    {
                        left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/10,
                        top: this.DIMENSIONS["POSITION_Y"]+15
                    }
                ).addClass("boldface")
            );

            var equationCounter=-1;

            // Create the equation label texts, and possibly the selectable objects
            for(var equation in this.equation_pages[pagename]["equations"])
            {
                equationCounter++;
                this.equation_pages[pagename]["pagejsav"].push(
                    this.globalSectionObj.label(
                        katex.renderToString(
                            this.equation_pages[pagename]["equations"]
                            [equation]["equationObj"]["latex"]
                            ),
                        {
                            left: this.DIMENSIONS["PAGE"]["POSITION_X"],
                            top: this.DIMENSIONS["PAGE"]["POSITION_Y"]+15+
                            equationCounter*this.DIMENSIONS["PAGE"]["HEIGHT"]
                        }
                    ).addClass("selectableEquation")
                );
                // something something
                //.addClass("selectableEquation");
                //this.equation_pages[pagename]["equations"]
            }
        }

        // Create the page title labels, just hide them in plain sight
        this.equation_page_number = 0;
        this.showPage();

        // Add clickhandlers to the equations in the equation pages here, that pass the
        // the object back to a tracker variable in DeformsProblemPRO
        // TODO: Add these event handlers in a global context, or keep it local? because, this is
        // a transfer between the equationbank and the workspace, and a higher level object should
        // track this.
    }
    createEquationPages()
    {
        // We have access to the equations dictionary in equation_bank.js, we process it directly.
        var objIndexNum = 0;
        for(var objectIndex in equations)
        {
            var currentObj = equations[objectIndex];
            if(currentObj["group"] in this.equation_pages)
                this.equation_pages[currentObj["group"]]["equations"][objIndexNum++] = {
                    "equationObj": currentObj,
                    "SelectableEquationObject": null
                };
            else
            {
                this.equation_pages[currentObj["group"]] = 
                {
                    "pagediv": null,
                    "pagejsav": null,
                    "equations": {
                        objIndexNum: {
                            "equationObj": currentObj,
                            "SelectableEquationObject": null
                        }
                    }
                    
                };
                objIndexNum++;
            }
        }
    }
    showPage()
    {
        // This function handles the onchange() event for the selection
        var pageName = this.equation_page_titles[this.equation_page_number];

        // Turn everything off first, then show only the page_number indexed page
        for(var group in this.equation_pages)
        {
            for(var x in this.equation_pages[group]["pagejsav"])
            {
                this.equation_pages[group]["pagejsav"][x].hide();
            }
        }
        for(var x in this.equation_pages[pageName]["pagejsav"])
        {
            this.equation_pages[pageName]["pagejsav"][x].show();
        }

    }
    selectEquation()
    {

    }
}
window.EquationBank = window.EquationBank || EquationBank
