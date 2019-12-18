class ValueBox{
    constructor(booleanInQuestion, element, globalJSAV, globalPointerReference){
        if(booleanInQuestion) // This means that the element already exists, 
                              //no need for JSAV
        {
            // We only create the clickhandler for this thing.
            this.value = element.dataset.value;
            this.unit = element.dataset.unit;
            this.valueDisplay = element.dataset.valueDisplay;
            this.unitDisplay = element.dataset.unitDisplay;
            this.domain = element.dataset.domain;
            this.globalPointerReference = globalPointerReference;
        }
        else
        {
            this.value = element.dataset.value;
            this.unit = element.dataset.unit;
            this.valueDisplay = element.dataset.valueDisplay;
            this.unitDisplay = element.dataset.unitDisplay;
            this.domain = element.dataset.domain;
            this.globalPointerReference = globalPointerReference;
            this.createSolutionBox(element, globalJSAV);
        }
    }
    createSolutionBox(element, globalJSAV)
    {
        // Create the JSAV label object with variable = value notation
        // element contains the location for the JSAV label
        // AND the value, unit, etc. things
        var text = globalJSAV.label(
            katex.renderToString(
                element.dataset.valueDisplay+element.dataset.unitDisplay),
            {
                left: element.visuals["POSITION_X"],
                top: element.visuals["POSITION_Y"]
            }
        ).addClass("selectableEquation");
        text.element[0].addEventListener(
            "click",
            e => {
                e.stopPropagation();
                this.globalPointerReference.currentClickedObject = this;
                this.globalPointerReference.currentClickedObjectType = "value-box";
                this.globalPointerReference.currentClickedObjectDescription = 
                "solved-value";
            }
        )
    }
}
window.ValueBox = window.ValueBox || ValueBox