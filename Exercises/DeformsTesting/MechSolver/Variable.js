class Variable{
    constructor(id, name, symbol, domain, element, globalPointerReference){
        this.id = id;
        this.name = name;

        this.parentSymbol = symbol;
        this.currentSymbol = null;

        this.expectedDomain = domain;
        this.currentDomain = null;
        
        // TODO: decide if we should replace currentSymbol with delegating
        // everything to this.value; where this would have a numerical value
        // or just be used as a variable name if empty, or an Association object.
        // which can then be used
        this.value = null;
        this.valueType = null;
        
        this.valueDisplay = "<span>";
        this.unitDisplay = "<span>";
        
        this.element = element;
        this.globalPointerReference = globalPointerReference;

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
                if(this.globalPointerReference.currentClickedObjectType == "value-box")
                {
                    // If someone clicked on a value box (in prose, solution box)
                    // prior to this, then we add the value here.
                    this.clickAddValue();
                }
                else if(
                    this.globalPointerReference.currentClickedObjectType == "var-box" &&
                    this.value == null)
                {
                    // A previous empty variable box was clicked, and this box was also empty
                    // at the time. This creates an Association object, read at the time of
                    // equation creation.
                    // Note: the previous box had to be of type var-box, but we don't
                    // restrict it to see if the box was empty or not, since it might be
                    // already in another equation (trying to make 3-way assoc).
                    // Note: The association object has a variable name determined by the
                    // variable name (internal and display) determined by the variable
                    // previously clicked.

                    //this.value = Association()
                    this.valueType = "association";
                    //console.log(this.globalPointerReference.currentClickedObject.parentSymbol);
                    console.log(this.globalPointerReference.currentClickedObject.id);
                    this.globalPointerReference.currentClickedObject = null;
                    this.globalPointerReference.currentClickedObjectType = null;
                    this.globalPointerReference.currentClickedObjectDescription = null;
                }
                else if(this.value!=null)
                {
                    // If someone did not click on anything before this, such as another
                    // variable (for associations), then remove the value.
                    // This is to be replaced by a proper right click menu in the future.
                    this.removeValue();
                }
                else
                {
                    // the value box is empty, and we're trying to start creating an association.
                    this.globalPointerReference.currentClickedObject = this;
                    this.globalPointerReference.currentClickedObjectType = "var-box";
                    this.globalPointerReference.currentClickedObjectDescription =
                    "empty variable box";
                    console.log("clicked first box");
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
            this.currentDomain = this.globalPointerReference.currentClickedObject.domain;
            // This is temporarily disabled for CHEP 2020 presentation, to be enabled
            // in tutorial mode 
            // this.element.setAttribute("data-domain",this.currentDomain);
            this.element.setAttribute("data-domain","filled");
            this.valueType = "number";
            
            //change the innerHTML
            /*
            The pattern of the code is to change to create
            a div, with two separate elements in it.
            */
            this.valueDisplay="";
            this.unitDisplay="";

            for(var digitindex=0;
                digitindex<this.globalPointerReference.currentClickedObject.valueDisplay.split("").length;
                digitindex++
                )
            {
                this.valueDisplay+='<span class="mord">'+
                this.globalPointerReference.currentClickedObject.valueDisplay.split("")[digitindex]
                +'</span>';
            }
            for(var u=0; u<this.globalPointerReference.currentClickedObject.unitDisplay.split("").length; u++)
            {
                this.unitDisplay+='<span class="mord mathit">'+
                this.globalPointerReference.currentClickedObject.unitDisplay.split("")[u]
                +'</span>';
            }
            this.valueDisplay+="</span>   ";
            this.unitDisplay+="</span>";

            this.element.innerHTML = this.valueDisplay + this.unitDisplay;

            // Clear up the clicked context; the values and everything
            this.globalPointerReference.currentClickedObject = null;
            this.globalPointerReference.currentClickedObjectType = null;
            this.globalPointerReference.currentClickedObjectDescription = null;
            //console.log(this.globalPointerReference);
        }
    }
    removeValue()
    {
        console.log("removed value");
        // Double click replaces the container with the empty box from before.
        // Possibly with the grayed out letters, once we've fixed that.
        this.element.setAttribute("data-domain","empty");
        this.element.innerHTML = '<span class="mord amsrm">&#9634;</span>';
        this.currentDomain = null;
        this.value = null;
        this.valueType = null;
    }
    changeUnits(){
        
    }
}
window.Variable = window.Variable || Variable