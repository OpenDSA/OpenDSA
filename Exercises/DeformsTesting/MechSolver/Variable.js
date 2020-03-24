class Variable{
    constructor(id, name, varName, symbol, domain, element, globalPointerReference){
        this.id = id;
        console.log(this.id)
        this.name = name;

        this.parentSymbolTemplate = symbol;
        this.parentSymbol = symbol;
        this.currentSymbol = varName;

        this.expectedDomain = domain;
        this.currentDomain = null;
        this.currentUnit = null;
        
        // TODO: decide if we should replace currentSymbol with delegating
        // everything to this.value; where this would have a numerical value
        // or just be used as a variable name if empty, or an Association object.
        // which can then be used
        this.value = null;
        this.valueType = null;
        
        this.element = element;
        this.globalPointerReference = globalPointerReference;

        this.valueDisplay = element.childNodes[0];
        this.unitDisplay = element.childNodes[1];
        this.valueDisplay.dataset.status = "empty";
        this.unitDisplay.dataset.status = "empty";
        
        // Creating the grayed out symbol representation
        this.grayOut();

        // this.element.addEventListener(
        //     "dblclick", e=> {
        //         console.log("double click",e);
        //         e.stopPropagation();
        //         this.removeValue();
        //         // TODO: INSERT DELETION logEvent here.
        //     }
        // )
        this.element.addEventListener(
            "click", e => {
                e.stopPropagation();
                //console.log(this.id)
                //MAJOR TODO: Clean up all the conditionals
                /**
                 * 1. If a value box is clicked, followed by a variable box,
                 *  a) If there is an association, we remove it and replace it with a value
                 *  b) if not, just place a value there.
                 * 2. If a variable box is clicked, and nothing before it, and it only contains a value, remove it.
                 * 3. If a variable box is clicked, and nothing before it, and it is empty, we record start of an
                 * association.
                 * 4. If a variable box is clicked,  whether or not it is empty, 
                 * and we clicked on another variable box before it, and it is not the same object, we create a
                 * 2-way association. Create this as the value for the two variable objects as well. valueType is
                 * "association".
                 * 5. If a variable box is clicked, whether or not it is empty, if 
                 * we clicked on a variable box earlier that had a value of type association,
                 * and it is not the same object, 
                 * then we add a valueType "association" to this variable as well, and add it to the association.
                 * 6. If a variable box is clicked, whether or not it is empty, if 
                 * we clicked on a variable box earlier that had a value of type association,
                 * and it IS INFACT the same object, by calling removeAssociation().
                 */
                
                if(this.globalPointerReference.currentClickedObjectType == "value-box")
                {
                    if(this.valueType == "association")
                        this.value.removeAssociation();
                    
                    // If it's empty, or has a numerical value, just add/overwrite the values in here.
                    this.clickAddValue();
                    console.log("added value to a box");
                }
                else if(this.globalPointerReference.currentClickedObject == null && this.valueType=="number")
                {
                    this.removeValue();
                    this.globalPointerReference.currentClickedObject = null;
                    this.globalPointerReference.currentClickedObjectType = null;
                    this.globalPointerReference.currentClickedObjectDescription = null;
                    console.log("remove value from a box");
                }
                else if(this.globalPointerReference.currentClickedObject == null && this.valueType!="number")
                {
                    this.globalPointerReference.currentClickedObject = this;
                    this.globalPointerReference.currentClickedObjectType = "var-box";
                    this.globalPointerReference.currentClickedObjectDescription = "variable box";
                    console.log("clicked first box");
                }
                else if(this.globalPointerReference.currentClickedObject == this && this.value == null)
                {
                    // do nothing
                    this.globalPointerReference.currentClickedObject = null;
                    this.globalPointerReference.currentClickedObjectType = null;
                    this.globalPointerReference.currentClickedObjectDescription = null;
                }
                else if(this.globalPointerReference.currentClickedObjectType == "var-box")
                {
                    if(this.globalPointerReference.currentClickedObject.valueType == "association")
                    {
                        // Start of a multiway association, >2 equations with same variable
                        if(this.globalPointerReference.currentClickedObject == this)
                        {
                            this.value.removeAssociation(this);
                            console.log("assoc deletion");
                        }
                        else
                        {
                            if(this.valueType == "association")
                                this.value.removeAssociation(this);
                            else if(this.valueType == "number")
                                this.removeValue();
                            
                            console.log("creating multiway association");
                            this.valueType = "association";
                            this.globalPointerReference.currentClickedObject.value.addVariable(this);
                            this.value = this.globalPointerReference.currentClickedObject.value;
                        }
                    }
                    else {
                        if(this.valueType == "association")
                            this.value.removeAssociation(this);
                        else if(this.valueType == "number")
                            this.removeValue();

                        // Create the 2-way association and clear the global pointer
                        console.log("creating two way association");
                        this.valueType = "association";
                        this.globalPointerReference.currentClickedObject.valueType = "association";
                        this.value = new Association(this.globalPointerReference.currentClickedObject, this);
                        this.globalPointerReference.currentClickedObject.value = this.value;
                    }
            
                    //console.log(this.globalPointerReference.currentClickedObject.parentSymbol);
                    console.log(this.globalPointerReference.currentClickedObject.id);
                    this.globalPointerReference.currentClickedObject = null;
                    this.globalPointerReference.currentClickedObjectType = null;
                    this.globalPointerReference.currentClickedObjectDescription = null;
                }

            }
        )
    }
    clickAddValue()
    {
        // Works just fine, no need for console.log()
        //console.log(this.name);
        //console.log(this.globalPointerReference);
        //console.log(this.globalPointerReference.currentClickedObjectType == "value-box");
        if(this.globalPointerReference.currentClickedObjectType == "value-box")
        {
            // domain check: to be checked later at solving stage
            // if(this.expectedDomain != this.globalPointerReference.currentClickedObject.domain
            //     && this.expectedDomain != "dimensionless"
            //     )
            // {
            //     alert("\nYou tried to put a '"+
            //     this.globalPointerReference.currentClickedObject.domain
            //     +"' type value in the box."
            //     +"\n Expected domain: "+this.expectedDomain
            //     +"\nPlease try a value of another type (the colors might help).\n\n");
            //     return;
            // }

            // console.log(this.globalPointerReference)
            // add the value
            this.value = String(this.globalPointerReference.currentClickedObject.value).slice();
            this.element.setAttribute("data-domain",
            this.globalPointerReference.currentClickedObject.domain);
            this.valueType = "number";
            // this.globalJSAVobject.logEvent({type: "adding new value", id: this.id });

            //change the innerHTML
            /*
            The pattern of the code is to change to create
            a div, with two separate elements in it.
            */
            
           this.valueDisplay.innerHTML = "";
           this.unitDisplay.innerHTML = "";
           this.valueDisplay.dataset.status = "filled";
           this.unitDisplay.dataset.status = "filled";

            for(var digitindex=0;
                digitindex<this.globalPointerReference.currentClickedObject.valueDisplay.split("").length;
                digitindex++
                )
            {
                this.valueDisplay.innerHTML+='<span class="mord">'+
                this.globalPointerReference.currentClickedObject.valueDisplay.split("")[digitindex]
                +'</span>';
            }
            for(var u=0; u<this.globalPointerReference.currentClickedObject.unitDisplay.split("").length; u++)
            {
                this.unitDisplay.innerHTML+='<span class="mord mathit">'+
                this.globalPointerReference.currentClickedObject.unitDisplay.split("")[u]
                +'</span>';
            }
            // Clear up the clicked context; the values and everything
            this.globalPointerReference.currentClickedObject = null;
            this.globalPointerReference.currentClickedObjectType = null;
            this.globalPointerReference.currentClickedObjectDescription = null;
            //console.log(this.globalPointerReference);

            // clickHandler for unit changes()
            this.unitDisplay.addEventListener("click", this.changeUnits)
        }
    }
    removeValue()
    {
        console.log("removed value");
        // Double click replaces the container with the empty box from before.
        // Possibly with the grayed out letters, once we've fixed that.
        this.element.setAttribute("data-domain","empty");
        this.valueDisplay.innerHTML="";
        this.unitDisplay.innerHTML="";
        this.currentDomain = null;
        this.value = null;
        this.valueType = null;

        this.unitDisplay.removeEventListener("click", this.changeUnits);
        this.valueDisplay.dataset.status = "empty";
        this.grayOut();
    }
    grayOut()
    {
        // Create a JSAV element temporarily based on the symbol, hide it;
        // copy over the katex element to the innerHTML, and save it.
        var tempElement = Window.jsavObject.label(katex.renderToString(this.parentSymbol)).hide();
        this.valueDisplay.innerHTML = tempElement.element[0].childNodes[0].childNodes[1].childNodes[2].innerHTML;
        tempElement.clear();
    }
    changeUnits(event){
        /**
         * Define list of units and standard value conversions in here
         * grouped by domain
         * UNIT_DB = {};
         */
        // Creating other units, to delegate this to a Singleton global object
        // mathjs.createUnit('ksi','1000 psi');
        // math.createUnit('msi','1000 ksi');
        // math.createUnit('mip','1000 kip');
        
        var UNIT_DB = {
            'length': {
                //cm m mm km inch feet
                'metre': {'unit':'m', 'unitDisp':'m'},
                'millimetre': {'unit':'mm', 'unitDisp':'mm'},
                'centimetre': {'unit':'cm', 'unitDisp':'cm'},
                'kilometre': {'unit':'km', 'unitDisp':'km'},
                'inch': {'unit':'in', 'unitDisp':'in'},
                'feet': {'unit':'ft', 'unitDisp':'ft'},
            },
            'temperature': {
                'degree C': {'unit':'degC', 'unitDisp':'C'},
                'degree F': {'unit':'degF', 'unitDisp':'F'},
                'degree R': {'unit':'degR', 'unitDisp':'R'},
                'degree K': {'unit':'K', 'unitDisp':'K'}
            },
            'temperature-1': {
                'inv degree C': {'unit':'degC^-1', 'unitDisp':'/C'},
                'inv degree F': {'unit':'degF^-1', 'unitDisp':'/F'},
                'inv degree R': {'unit':'degR^-1', 'unitDisp':'/R'},
                'inv degree K': {'unit':'K^-1', 'unitDisp':'/K'}
            },
            'pressure': {
                // Pa, kPA, MPa, GPa, ksi, msi, psi
                'pascal': {'unit':'Pa', 'unitDisp':'Pa'},
                'kilopascal': {'unit':'kPa', 'unitDisp':'kPa'},
                'megapascal': {'unit':'MPa', 'unitDisp':'MPa'},
                'gigapascal': {'unit':'GPa', 'unitDisp':'GPa'},
                'psi': {'unit':'psi', 'unitDisp':'psi'},
                'ksi': {'unit':'ksi', 'unitDisp':'ksi'},
                'msi': {'unit':'msi', 'unitDisp':'msi'}
            },
            'force': {
                // kips lbs mips N kN MN 
                'newton': {'unit':'N', 'unitDisp':'N'},
                'kilonewton': {'unit':'kN', 'unitDisp':'kN'},
                'meganewton': {'unit':'MN', 'unitDisp':'MN'},
                'poundforce': {'unit': 'lbf', 'unitDisp':'lbf'},
                'kip-force': {'unit': 'kip', 'unitDisp':'kip'},
                'mip-force': {'unit': 'mip', 'unitDisp':'mip'},
            },
            'power': {
                // W kW MW 'ft lb/s' hp
                'watt': {'unit':'W', 'unitDisp':'W'},
                'kilowatt': {'unit':'kW', 'unitDisp':'kW'},
                'megawatt': {'unit':'MW', 'unitDisp':'MW'},
                'horsepower': {'unit':'hp', 'unitDisp':'hp'},
                'pound-feet/s': {'unit':'lbf ft/s', 'unitDisp':'lb-force ft/s'}
            },
            'angularvelocity': {
                // To be added after discussion

            },
            'angles': {
                "radian": {'unit':'rad', 'unitDisp':'radian'},
                "degree": {'unit':'deg', 'unitDisp':'deg'},
                "gradient": {'unit':'grad', 'unitDisp':'grad'}
            }
        };
        
        event.stopPropagation();
        console.log(event);

        /**
         * Populate var text with the list of units for this domain.
         * Click handlers are associated with each element, create data-unit domains for them
         * to match with.
         */
        //var text = "<ul><li>Type 1</li><li>Type 2</li><li>Type 3</li></ul>";

        // loading javascript files dynamically
        // var FB_JQ = document.createElement('script');
        // FB_JQ.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjs/6.6.0/math.js';
        // FB_JQ.type = 'text/javascript';
        // document.getElementsByTagName('head')[0].appendChild(FB_JQ);
        
        var text = "<ul>";
        console.log(UNIT_DB[event.target.parentNode.parentNode.dataset.domain]);
        for(var x in UNIT_DB[event.target.parentNode.parentNode.dataset.domain])
        {
            text+='<li data-unit="'+UNIT_DB[event.target.parentNode.parentNode.dataset.domain][x]['unit']+'">'+x+' ('+
            UNIT_DB[event.target.parentNode.parentNode.dataset.domain][x]['unitDisp']+')</li>';
        }
        text+="</ul>";

        var element = JSAV.utils.dialog(
             text,
            {
                width: 100
            }
        );
        Window.obj = event.target;
        element[0].style.top = event.pageY+5+"px";
        element[0].style.left = event.pageX+10+"px";
        element[0].childNodes[0].childNodes.forEach(x => {
            x.addEventListener(
                "click", e=> {
                    e.stopPropagation();
                    console.log(x);
                    // this.value = mathjs.evaluate("number("+this.value+" to "+x.dataset.unit+")")
                    // this.value = math.evaluate("number("+this.value+" to "+x.dataset.unit+")")
                    // this.currentUnit = ""
                    element.close();
                }
            )
        });

        /**
         * Write conversion functionality in here, get it running.
         */
    }
}
window.Variable = window.Variable || Variable