class ValueBox{
    constructor(booleanInQuestion, element, globalJSAV, globalPointerReference){
        if(booleanInQuestion) // This means that the element already exists, 
                              //no need for JSAV
        {
            // We only create the clickhandler for this thing.
            this.value = element.dataset.value;
            this.unit = element.dataset.unit;
            this.variable = null;
            this.valueDisplay = element.dataset.valueDisplay;
            this.unitDisplay = element.dataset.unitDisplay;
            this.domain = element.dataset.domain;
            this.globalPointerReference = Window.globalPointerReference;
            this.element = element;
        }
        else
        {
            this.value = element.dataset.value;
            this.unit = element.dataset.unit;
            this.variable = element.dataset.variable;
            this.valueDisplay = element.dataset.valueDisplay;
            this.unitDisplay = element.dataset.unitDisplay;
            this.domain = element.dataset.domain;
            this.globalPointerReference = Window.globalPointerReference;
            this.element = null;
            this.createSolutionBox(element, Window.jsavObject);
        }
    }
    createSolutionBox(element, globalJSAV)
    {
        // Create the JSAV label object with variable = value notation
        // element contains the location for the JSAV label
        // AND the value, unit, etc. things
        this.element = {};

        // Delete buttons
        this.element.deleteButton = globalJSAV.label(
            "&#x2702",
            {
                left: element.visuals["POSITION_X"],
                top: element.visuals["POSITION_Y"] //added three for visual padding balance between solutions and equations
            }
        ).addClass("activeEqMenu");
        this.element.deleteButton.element[0].dataset.selected="none";
        this.element.deleteButton.element[0].setAttribute("title", "Click to delete the solved value");
        this.element.deleteButton.element[0].addEventListener(
            "click", e=> {
                e.stopPropagation();
                console.log("Clicked on box, Want to delete?");
                // Insert function call deleting visual component here, together with calls to shiftup/down, etc.
                // see how you can connect this to deleting the object from the workspace
                Window.windowManager.shiftUp(null, this);
            }
        );
        
        // Help buttons
        this.element.helpButton = globalJSAV.label(
            "&#xFFFD",
            {
                left: element.visuals["POSITION_X"]+
                this.element.deleteButton.element[0].offsetWidth+10,
                top: element.visuals["POSITION_Y"] //added three for visual padding balance between solutions and equations
            }
        ).addClass("activeEqMenu");
        this.element.helpButton.element[0].dataset.selected="none";
        this.element.helpButton.element[0].setAttribute("title", "Click on box to get help");
        this.element.helpButton.element[0].addEventListener(
            "click", e=> {
                e.stopPropagation();
                console.log("Clicked on box, need help?");
                // show help text
            }
        );


        // First, create a box, that can be replaced by a value and a unit element (same as variable boxes)
        this.element.visualComponent = globalJSAV.label(
            katex.renderToString(
                // element.dataset.variableDisplay+"="+element.dataset.valueDisplay+element.dataset.unitDisplay),
                element.dataset.variableDisplay+"= \\Box"),
            {
                left: element.visuals["POSITION_X"]+
                this.element.deleteButton.element[0].offsetWidth+10+
                this.element.helpButton.element[0].offsetWidth+13, // verify if +5 or +13 works on testing
                top: element.visuals["POSITION_Y"]+3 //added three for visual padding balance between solutions and equations
            }
        ).addClass("solutionBox");

        var boxList = this.element.visualComponent.element[0].childNodes[0].childNodes[1].childNodes[2].querySelectorAll("span.mord.amsrm")
        boxList[0].setAttribute("data-domain", this.domain);
        boxList[0].innerHTML = '<span class="mord value"></span><span class="mord unit"></span>';
        this.element.valueDisplay = boxList[0].childNodes[0];
        this.element.unitDisplay = boxList[0].childNodes[1];

        // Then, populate the valueDisplay and unitDisplay fields
        this.setValueUnit(this.valueDisplay, this.unitDisplay);

        this.element.valueDisplay.addEventListener(
            "click",
            e => {
                e.stopPropagation();
                if(this.globalPointerReference.currentClickedObject == this){
                    this.value = -1 * this.value;
                    this.valueDisplay = Window.valueStringRepr(this.value);
                    this.setValueUnit(this.valueDisplay,this.unitDisplay);
                    Window.clearGlobalPointerReference();
                }
                else {
                    this.globalPointerReference.currentClickedObject = this;
                    this.globalPointerReference.currentClickedObjectType = "value-box";
                    this.globalPointerReference.currentClickedObjectDescription = "solved-value";
                    this.globalPointerReference.currentClickedObject.element.visualComponent.element[0].classList.add("selectedvalue");
                    Window.showBlankPrompt = false;
                }
            }
        )
        
        // Find the units segment of the display and setup unit change.
        this.element.unitDisplay.addEventListener("click", e=>{
            e.stopPropagation();
            this.changeUnits(e);
        });
    }
    setValueUnit(value, unit)
    {
        this.element.valueDisplay.innerHTML = "";
        this.element.unitDisplay.innerHTML = "";
        this.element.valueDisplay.dataset.status = "filled";
        this.element.unitDisplay.dataset.status = "filled";

        for(var digitindex=0; digitindex<value.split("").length; digitindex++)
        {
            this.element.valueDisplay.innerHTML+='<span class="mord">'+value.split("")[digitindex]+'</span>';
        }
        for(var u=0; u<unit.split("").length; u++)
        {
            this.element.unitDisplay.innerHTML+='<span class="mord mathit">'+unit.split("")[u]+'</span>';
        }
    }
    changeUnits(event){
        /**
         * Define list of units and standard value conversions in here
         * grouped by domain
         * UNIT_DB = {};
         */
        // Creating other units, to delegate this to a Singleton global object
        
        /**
         * Populate var text with the list of units for this domain.
         * Click handlers are associated with each element, create data-unit domains for them
         * to match with.
         */
        
        var text = "<ul>";
        // console.log(UNIT_DB[event.target.parentNode.parentNode.dataset.domain]);
        if(Window.UNIT_DB[event.target.parentNode.parentNode.dataset.domain] == null)
            text += "<li>No options available</li>"
        else for(var x in Window.UNIT_DB[event.target.parentNode.parentNode.dataset.domain])
        {
            text+='<li data-unitname="'+x+'">'+x+' ('+
            Window.UNIT_DB[event.target.parentNode.parentNode.dataset.domain][x]['unitDisp']+')</li>';
        }
        text+="</ul>";

        var element = JSAV.utils.dialog(
             text,
            {
                width: 100
            }
        );
        Window.obj = event.target;
        Window.showBlankPrompt = false; // TODO: Replace with explicit calls to createContext with details
        element[0].style.top = event.pageY+5+"px";
        element[0].style.left = event.pageX+10+"px";
        element[0].childNodes[0].childNodes.forEach(x => {
            x.addEventListener(
                "click", e=> {
                    e.stopPropagation();
                    
                    // Change internals
                    var oldUnit = this.unit;
                    this.unit = Window.UNIT_DB[event.target.parentNode.parentNode.dataset.domain][x.dataset.unitname]['unit'];
                    console.log(this.unit);
                    this.value = mathjs.evaluate("number("+this.value+" "+oldUnit+", "+this.unit+")")
                    // this.valueDisplay = Window.valueTruncate(this.value);
                    this.valueDisplay = Window.valueStringRepr(this.value);
                    this.unitDisplay = Window.UNIT_DB[event.target.parentNode.parentNode.dataset.domain][x.dataset.unitname]['unitDisp'];

                    // Change external views
                    this.setValueUnit(String(this.valueDisplay), this.unitDisplay);
                    element.close();
                    Window.clearGlobalPointerReference();
                }
            )
        });
    }
}
window.ValueBox = window.ValueBox || ValueBox