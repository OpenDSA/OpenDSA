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
        this.currentSelectedEquationObject = null;  // An equation selected from here to be added is present here.
    }
    createEquationBank()
    {
        // Creating the equation div/box
        // this.equationBankBox = this.globalSectionObj.g.rect(
        //     this.DIMENSIONS["POSITION_X"],
        //     this.DIMENSIONS["POSITION_Y"],
        //     this.DIMENSIONS["WIDTH"],
        //     this.DIMENSIONS["HEIGHT"],
        //     {
        //         "fill":"whitesmoke",
        //         "id": "eqbank",
        //         "r": 10,
        //         "element": document.getElementById("equationbank")
        //     })
        // this.equationBankDiv = (list => list[list.length-1])
        // (document.getElementsByTagName("rect"))

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
        ).addClass("boldface")
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
        ).addClass("boldface")
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

            // Create the JSAV changeable title
            this.equation_pages[pagename]["pagetitlejsav"] = 
                this.globalSectionObj.label(
                    pagename,
                    {
                        left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"]/10,
                        top: this.DIMENSIONS["POSITION_Y"]+15
                    }
                ).addClass("boldface");

            // Create the equation label texts, and possibly the selectable objects
            
            // OBSOLETE: MAY TRY TO FIX LATER, MOVING TO AV.DS.ARRAY instead
            // var equationCounter=-1;
            // this.equation_pages[pagename]["pagejsav"] = [];
            // for(var equation in this.equation_pages[pagename]["equations"])
            // {
            //     equationCounter++;
            //     var selectableEqn = this.globalSectionObj.label(
            //         katex.renderToString(
            //             this.equation_pages[pagename]["equations"]
            //             [equation]["equationObj"]["latex"]
            //             ),
            //         {
            //             left: this.DIMENSIONS["PAGE"]["POSITION_X"],
            //             top: this.DIMENSIONS["PAGE"]["POSITION_Y"]+15+
            //             equationCounter*this.DIMENSIONS["PAGE"]["HEIGHT"]
            //         }
            //     ).addClass("selectableEquation");

            //     this.equation_pages[pagename]["pagejsav"].push(selectableEqn);
            //     this.equation_pages[pagename]["equations"]
            //         [equation]["SelectableEquationObject"]= selectableEqn;
            //     /* 
            //     The aim: the jsav array is only required to batch hide/show all the equations
            //     in a page. When setting up clickhandlers however, we need to be able to associate
            //     each clickable equation representation with the corresponding equation object in
            //     equation_bank.js. And this will be done outside EquationBank, in *PRO.js, since
            //     they have to track what equation is selected globally, and what is to be done.
            //      */
                
            //     // something something
            //     //.addClass("selectableEquation");
            //     //this.equation_pages[pagename]["equations"]
            //     // Start working on this.
            // }
            
            var eqPageArray = [];
            for(var equation in this.equation_pages[pagename]["equations"])
            {
                eqPageArray.push(
                    katex.renderToString(
                        this.equation_pages[pagename]["equations"][equation]["latex"]
                    )
                )
            }
            this.equation_pages[pagename]["pagejsav"] = this.globalSectionObj.ds.array(eqPageArray, 
                {
                    indexed: false, center: false, layout: "vertical",
                    top: this.DIMENSIONS["PAGE"]["POSITION_Y"]+15,
                    left: this.DIMENSIONS["PAGE"]["POSITION_X"]
                }
            )
            
            /* 
            THERE IS A SERIOUS AMOUNT OF DOCUMENTATION TO BE ADDED JUST FOR THIS PART.
            MORE LIKE, AN ENTIRE CHAPTER FOR A BOOK ON JAVASCRIPT.
             */
            var method = this.selectEquation;
            var equationBank = this;
            this.equation_pages[pagename]["pagejsav"].click(
                function(index){
                    method(this, index, equationBank);
                    //console.log(equationBank.currentSelectedEquationObject);
                }
            );
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
        var eqDict = {};

        for(var objectIndex in equations)
        {
            var currentObj = equations[objectIndex];
            
            if(currentObj["group"] in this.equation_pages)
                this.equation_pages[currentObj["group"]]["equations"][eqDict[currentObj["group"]]++] = currentObj;
                // {
                //     "equationObj": currentObj,
                //     "SelectableEquationObject": null
                // };
            else
            {
                eqDict[currentObj["group"]] = 0;
                this.equation_pages[currentObj["group"]] = 
                {
                    "pagetitlejsav": null,  // JSAV label for pagename
                    "pagejsav": null,       // JSAV for the list; currently av.ds.array type
                    "equations": {          // actual list of equations
                        // objIndexNum: {
                        //     "equationObj": currentObj,
                        //     "SelectableEquationObject": null
                        // }
                        0: currentObj // Effectively a number and the object reference.
                        // The index itself draws from the index on the array for that page.
                        // Getting the eqobject includes using the page title name and the index in the array
                        // that was clicked and passed to the handler.
                    }
                };
                eqDict[currentObj["group"]]++;
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
            this.equation_pages[group]["pagetitlejsav"].hide();
            // for(var x in this.equation_pages[group]["pagejsav"])
            // {
            //     this.equation_pages[group]["pagejsav"][x].hide();
            // }
            this.equation_pages[group]["pagejsav"].hide()
        }

        // Show the current page
        this.equation_pages[pageName]["pagetitlejsav"].show();
        // for(var x in this.equation_pages[pageName]["pagejsav"])
        // {
        //     this.equation_pages[pageName]["pagejsav"][x].show();
        // }
        this.equation_pages[pageName]["pagejsav"].show();
    }
    selectEquation(jsavPageArray, index, eqb)
    {
        if(eqb.currentSelectedEquationObject==null)
        {
            jsavPageArray.highlight(index);
            eqb.currentSelectedEquationObject = {
                index: index,
                eqobject: 
                eqb.equation_pages[eqb.equation_page_titles[eqb.equation_page_number]]
                ["equations"][index]
            }
        }
        else
        {
            jsavPageArray.unhighlight(
                eqb.currentSelectedEquationObject.index
            )
            eqb.currentSelectedEquationObject = null;
        }
    }
}
window.EquationBank = window.EquationBank || EquationBank
