class Variable{
    constructor(id, name, symbol, element, globalPointerReference){
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.value = null;
        this.element = element;
        this.globalPointerReference = globalPointerReference;

        // Add click-to-add value behaviour
        this.element.addEventListener(
            "click", e => {
                e.stopPropagation();
                this.clickAddValue()
            }
        )
    }
    clickAddValue(){
        // Works just fine, no need for console.log()
        //console.log(this.name);
        //console.log(this.globalPointerReference);
        //console.log(this.globalPointerReference.currentClickedObjectType == "value-box");
        if(this.globalPointerReference.currentClickedObjectType == "value-box")
        {
            // add the value
            this.value = this.globalPointerReference.currentClickedObject.value;
            //change the innerHTML
            this.element.innerHTML = 
            this.globalPointerReference.currentClickedObject.valueDisplay +
            this.globalPointerReference.currentClickedObject.unitDisplay;
            // Add the new class for this value
            this.element.className += " param";
            this.element.setAttribute("data-domain",this.globalPointerReference.currentClickedObject.domain);
        }
    }
    changeUnits(){
        
    }
}
window.Variable = window.Variable || Variable