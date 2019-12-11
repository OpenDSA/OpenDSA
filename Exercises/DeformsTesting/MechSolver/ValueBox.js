class ValueBox{
    constructor(booleanInQuestion, element, globalJSAV, globalPointerReference){
        if(booleanInQuestion) // This means that the element already exists, no need for JSAV
        {
            // We only create the clickhandler for this thing.
            this.value = element.dataset.value;
            this.unit = element.dataset.unit;
            this.valueDisplay = element.dataset.valueDisplay;
            this.unitDisplay = element.dataset.unitDisplay;
            this.domain = element.dataset.domain;
            this.globalPointerReference = globalPointerReference;
        }
    }
}
window.ValueBox = window.ValueBox || ValueBox