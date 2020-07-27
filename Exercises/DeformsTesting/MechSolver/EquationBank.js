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
                "POSITION_Y": dim_obj["EQBANK"]["CORNER_Y"]+20,
                "WIDTH": 30,
                "HEIGHT_PAD": 5,
                "HEIGHT": 50
            }
        }

        // Initializing the equation bank list: pointers to actual objects
        // + list representations
        this.equation_pages = {};
        this.createEquationPages(); // This function populates the above object
        //console.log(this.equation_pages);

        // this.equation_page_number = -1;
        this.lastPageShown = null;
        this.equation_page_titles = [];
        
        // Creating the dialog menu text from the page titles
        // to avoid recreating it every single time.
        this.dialogMenuText = "<ul>";
        for(var pagename in this.equation_pages)
            this.dialogMenuText+="<li data-pagename='"+pagename+"'>"+pagename+"</li>";
        this.dialogMenuText += "</ul>";

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

        var eqbankddlpos = this.globalSectionObj.label("Select:",//"Equation Bank", 
            {
                left: this.DIMENSIONS["POSITION_X"], 
                top: this.DIMENSIONS["POSITION_Y"]-12,
            })
            .addClass("workspacelabel")
        
        // Setup the page selection and equation selection mechanisms
        //console.log(this.equationBankDiv);
        //
        // this.globalSectionObj.label(
        //     "<",
        //     {
        //         left: this.DIMENSIONS["POSITION_X"],
        //         top: this.DIMENSIONS["POSITION_Y"]+15
        //     }
        // ).addClass("boldface")
        // .element[0].addEventListener("click", e=> {
        //     e.stopPropagation();
        //     if(this.equation_page_number == 0)
        //         this.equation_page_number = this.equation_page_titles.length-1;
        //     else
        //         this.equation_page_number--;
        //     this.showPage();
        //     this.globalSectionObj.logEvent({type: "switching equation page", id: this.equation_page_titles[this.equation_page_number]});
        //     // console.log(this.equation_page_titles[this.equation_page_number]);
        // });
        
        // this.globalSectionObj.label(
        //     ">",
        //     {
        //         left: this.DIMENSIONS["POSITION_X"]+this.DIMENSIONS["WIDTH"] - 15,
        //         top: this.DIMENSIONS["POSITION_Y"]+15
        //     }
        // ).addClass("boldface")
        // .element[0].addEventListener("click", e=> {
        //     e.stopPropagation();
        //     if(this.equation_page_number-this.equation_page_titles.length == -1)
        //         this.equation_page_number = 0;
        //     else
        //         this.equation_page_number++;
        //     this.showPage();
        //     this.globalSectionObj.logEvent({type: "switching equation page", id: this.equation_page_titles[this.equation_page_number]});
        //     // console.log(this.equation_page_titles[this.equation_page_number]);
        // });
        
        // Creating the page objects (JSAV objects)
        var eqbank_ddl = document.createElement("select");
        eqbank_ddl.classList.add("equationPageTitle");

        for(var pagename in this.equation_pages)
        {
            var option = document.createElement("option");
            option.value = pagename;
            option.innerText = pagename;
            eqbank_ddl.options.add(option);
            option.addEventListener("mouseover", e=> {console.log(e.target.value)});

            this.equation_page_titles.push(pagename);

            // Create the JSAV changeable title
            // this.equation_pages[pagename]["pagetitlejsav"] = 
            //     this.globalSectionObj.label(
            //         pagename,
            //         {
            //             left: this.DIMENSIONS["POSITION_X"]+15,
            //             top: this.DIMENSIONS["POSITION_Y"]+15
            //         }
            //     ).addClass("equationPageTitle");

            // this.equation_pages[pagename]["pagetitlejsav"].element[0]
            // .addEventListener("click", event=> {
            //         event.stopPropagation();
            //         var eqMenu = JSAV.utils.dialog(
            //             this.dialogMenuText, {width: 100}
            //         );
            //         eqMenu[0].style.top = event.pageY+5+"px";
            //         eqMenu[0].style.left = event.pageX+10+"px";
            //         eqMenu[0].childNodes[0].childNodes.forEach(x => {
            //             x.addEventListener(
            //                 "click", x=> {
            //                     x.stopPropagation();
            //                     // console.log(x.target.dataset.pagename);
            //                     this.showPage(x.target.dataset.pagename);
            //                     eqMenu.close();
            //             });
            //         });
            //     });
            // this.equation_pages[pagename]["pagetitlejsav"].hide();
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
            
            var tempPositionIndex = {
                "POSITION_X": this.DIMENSIONS["PAGE"]["POSITION_X"],
                "POSITION_Y": this.DIMENSIONS["PAGE"]["POSITION_Y"]+15,
            };
            for(var equation in this.equation_pages[pagename]["equations"])
            {
                var currentEqnObject = this.equation_pages[pagename]["equations"][equation];

                // Create the JSAV element
                var jsavEq = this.globalSectionObj.label(
                    katex.renderToString(currentEqnObject["latex"]),
                    {
                        left: tempPositionIndex["POSITION_X"],
                        top: tempPositionIndex["POSITION_Y"]
                    }
                ).addClass("selectableEquation");
                tempPositionIndex["POSITION_Y"] += 15 + currentEqnObject["dispheight"]; // replaced with element dispheight attribute for EquationBanks only.
                this.equation_pages[pagename]["pagejsav"][currentEqnObject["id"]] = jsavEq;
                
                jsavEq.hide();
                jsavEq.element[0].dataset.id = currentEqnObject["id"];
                jsavEq.element[0].dataset.status = 'no'; // Becomes yes when selected.
                jsavEq.element[0].setAttribute("title", "Click on the equation to select it, and click on Add inside the workspace to add it");
                jsavEq.element[0].addEventListener(
                    "click", e=> {
                        e.stopPropagation();
                        Window.clearGlobalPointerReference();
                        Window.showBlankPrompt = false;
                        
                        // De-select the previous one
                        if(this.currentSelectedEquationObject != null)
                        {
                            this.currentSelectedEquationObject.element.dataset.status='no';
                            if(this.currentSelectedEquationObject.element.dataset.id != e.target.dataset.id) {
                                e.target.dataset.status = 'yes';
                                this.currentSelectedEquationObject = {
                                    element: 
                                    this.equation_pages[this.lastPageShown]["pagejsav"][e.target.dataset.id].element[0],
                                    eqobject: this.equation_pages[this.lastPageShown]["equations"][e.target.dataset.id]
                                }
                            }
                            else this.currentSelectedEquationObject = null;
                        }
                        else {
                            console.log("Initial click on empty"); 
                            e.target.dataset.status = 'yes';
                            this.currentSelectedEquationObject = {
                                element: 
                                this.equation_pages[this.lastPageShown]["pagejsav"][e.target.dataset.id].element[0],
                                eqobject: this.equation_pages[this.lastPageShown]["equations"][e.target.dataset.id]
                            }
                        }
                    }
                )                
            }
            this.currentSelectedEquationObject = null;
            
            // Creating a JSAV array from the list of equations,
            // TODO: Replace this with a selectable list
            // this.equation_pages[pagename]["pagejsav"] = this.globalSectionObj.ds.array(eqPageArray, 
            //     {
            //         indexed: false, center: false, layout: "vertical",
            //         top: this.DIMENSIONS["PAGE"]["POSITION_Y"]+15,
            //         left: this.DIMENSIONS["PAGE"]["POSITION_X"]
            //     }
            // );
            
            /* 
            THERE IS A SERIOUS AMOUNT OF DOCUMENTATION TO BE ADDED JUST FOR THIS PART.
            MORE LIKE, AN ENTIRE CHAPTER FOR A BOOK ON JAVASCRIPT.
             */
            // var method = this.selectEquation;
            // var equationBank = this;
            // this.equation_pages[pagename]["pagejsav"].click(
            //     function(index){
            //         method(this, index, equationBank);
            //         //console.log(equationBank.currentSelectedEquationObject);
            //     }
            // );
            // this.equation_pages[pagename]["pagejsav"].hide();
        }

        // Create the page title labels, just hide them in plain sight
        // this.equation_page_number = 0;
        eqbankddlpos.element[0].appendChild(eqbank_ddl);
        eqbankddlpos.element[0].setAttribute("title", "Click to select the palette of equations desired");
        eqbank_ddl.value = this.equation_page_titles[0];
        eqbank_ddl.addEventListener(
            "click", e=> {e.stopPropagation();
            Window.showBlankPrompt = false;
            });
        eqbank_ddl.addEventListener(
            "change", e=> {e.stopPropagation();
            this.showPage(event.target.value);
            Window.clearGlobalPointerReference();
            });

        this.showPage(this.equation_page_titles[0]);

        var helpButton = this.globalSectionObj.label("&#xFFFD",
            {
                left: this.DIMENSIONS["POSITION_X"]+eqbank_ddl.offsetWidth+50, 
                top: this.DIMENSIONS["POSITION_Y"]-16
            })
            .addClass("helpbutton")
        
        // Add clickhandlers to the equations in the equation pages here, that pass the
        // the object back to a tracker variable in DeformsProblemPRO
        // TODO: Add these event handlers in a global context, or keep it local? because, this is
        // a transfer between the equationbank and the workspace, and a higher level object should
        // track this.
    }
    createEquationPages()
    {
        // We have access to the equations dictionary in equation_bank.js, we process it directly.
        // var eqDict = {};
        for(var objectIndex in equations)
        {
            var currentObj = equations[objectIndex];
            
            if(currentObj["group"] in this.equation_pages)
                this.equation_pages[currentObj["group"]]["equations"][currentObj['id']] = currentObj;
                // {
                //     "equationObj": currentObj,
                //     "SelectableEquationObject": null
                // };
            else
            {
                // eqDict[currentObj["group"]] = 0;
                this.equation_pages[currentObj["group"]] = 
                {
                    "pagetitlejsav": null,  // JSAV label for pagename
                    "pagejsav": {},       // JSAV for the list; currently av.ds.array type
                    "equations": {}          // actual list of equations
                         // Effectively a number and the object reference.
                        // The index itself draws from the index on the array for that page.
                        // Getting the eqobject includes using the page title name and the index in the array
                        // that was clicked and passed to the handler.
                };
                this.equation_pages[currentObj["group"]]["equations"][currentObj['id']] = currentObj;
                // eqDict[currentObj["group"]]++;
            }
        }
        this.equation_pages["Favourites"] = {
            "pagetitlejsav": null,  // JSAV label for pagename
            "pagejsav": {},       // JSAV for the list; currently av.ds.array type
            "equations": {},          // actual list of equations
                 // Effectively a number and the object reference.
                // The index itself draws from the index on the array for that page.
                // Getting the eqobject includes using the page title name and the index in the array
                // that was clicked and passed to the handler.
            "equationsID": {},
            "visualComponents": {
                "POSITION_X": this.DIMENSIONS["PAGE"]["POSITION_X"],
                "POSITION_Y": this.DIMENSIONS["PAGE"]["POSITION_Y"]+15,
            }
        };
    }
    addToFavourites(currentEqnObject)
    {
        // console.log("Adding to favourites", eqobject.group, eqobject.id);
        if(currentEqnObject.id in this.equation_pages["Favourites"]["equationsID"]) return; // Do nothing; equation is already there.
        var jsavEq = Window.jsavObject.label(
            katex.renderToString(currentEqnObject["latex"]),
            {
                left: this.equation_pages["Favourites"]["visualComponents"]["POSITION_X"],
                top: this.equation_pages["Favourites"]["visualComponents"]["POSITION_Y"],
                visible: false
            }
        ).addClass("selectableEquation");
        this.equation_pages["Favourites"]["equations"][currentEqnObject["id"]] = currentEqnObject;
        this.equation_pages["Favourites"]["pagejsav"][currentEqnObject["id"]] = jsavEq;
        this.equation_pages["Favourites"]["visualComponents"]["POSITION_Y"] += 15 + currentEqnObject["dispheight"];
        this.equation_pages["Favourites"]["equationsID"][currentEqnObject.id] = "";
        
        jsavEq.hide();
        jsavEq.element[0].dataset.id = currentEqnObject["id"];
        jsavEq.element[0].dataset.status = 'no'; // Becomes yes when selected.
        jsavEq.element[0].setAttribute("title", "Click on the equation to select it, and click here inside workspace or Add add it");
        jsavEq.element[0].addEventListener(
            "click", e=> {
                e.stopPropagation();
                Window.clearGlobalPointerReference();
                
                // De-select the previous one
                if(this.currentSelectedEquationObject != null)
                {
                    this.currentSelectedEquationObject.element.dataset.status='no';
                    if(this.currentSelectedEquationObject.element.dataset.id != e.target.dataset.id) {
                        e.target.dataset.status = 'yes';
                        this.currentSelectedEquationObject = {
                            element: 
                            this.equation_pages[this.lastPageShown]["pagejsav"][e.target.dataset.id].element[0],
                            eqobject: this.equation_pages[this.lastPageShown]["equations"][e.target.dataset.id]
                        }
                    }
                    else this.currentSelectedEquationObject = null;
                }
                else {
                    console.log("Initial click on empty"); 
                    e.target.dataset.status = 'yes';
                    this.currentSelectedEquationObject = {
                        element: 
                        this.equation_pages[this.lastPageShown]["pagejsav"][e.target.dataset.id].element[0],
                        eqobject: this.equation_pages[this.lastPageShown]["equations"][e.target.dataset.id]
                    }
                }
            }
        )
    }
    showPage(pageName)
    {
        // This function handles the onchange() event for the selection
        // var pageName = this.equation_page_titles[this.equation_page_number];
        // Turn everything off first, then show only the page_number indexed page
        // for(var group in this.equation_pages)
        // {
        //     this.equation_pages[group]["pagetitlejsav"].hide();
        //     // for(var x in this.equation_pages[group]["pagejsav"])
        //     // {
        //     //     this.equation_pages[group]["pagejsav"][x].hide();
        //     // }
        //     this.equation_pages[group]["pagejsav"].hide()
        // }

        // I don't know why this fails, but this needs to be fixed.
        if(this.lastPageShown == pageName) return;

        if(this.lastPageShown !=  null) {
            // this.equation_pages[this.lastPageShown]["pagetitlejsav"].hide();
            for(var x in this.equation_pages[this.lastPageShown]["pagejsav"])
            {
                this.equation_pages[this.lastPageShown]["pagejsav"][x].hide();
            }
            // this.equation_pages[this.lastPageShown]["pagejsav"].hide();
        }
        
        // Show the current page
        // this.equation_pages[pageName]["pagetitlejsav"].show();
        for(var x in this.equation_pages[pageName]["pagejsav"])
        {
            this.equation_pages[pageName]["pagejsav"][x].show();
        }
        // this.equation_pages[pageName]["pagejsav"].show();
        this.lastPageShown = pageName;
    }
    // selectEquation(jsavPageArray, index, eqb)
    // {
    //     if(eqb.currentSelectedEquationObject==null)
    //     {
    //         jsavPageArray.highlight(index);
    //         eqb.currentSelectedEquationObject = {
    //             index: index,
    //             eqobject: 
    //             eqb.equation_pages[eqb.equation_page_titles[eqb.equation_page_number]]
    //             ["equations"][index]
    //         }
    //     }
    //     else
    //     {
    //         jsavPageArray.unhighlight(
    //             eqb.currentSelectedEquationObject.index
    //         )
    //         eqb.currentSelectedEquationObject = null;
    //     }
    // }
}
window.EquationBank = window.EquationBank || EquationBank
