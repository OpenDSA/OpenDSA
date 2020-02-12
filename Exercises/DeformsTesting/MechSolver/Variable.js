class Variable{
    constructor(id, name, symbol, element, globalPointerReference){
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.value = null;
        this.valueDisplay = "<span>";
        this.unitDisplay = "<span>";
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
            // console.log(this.globalPointerReference)
            // add the value
            this.value = String(this.globalPointerReference.currentClickedObject.value).slice();
            this.element.setAttribute("data-domain",
            this.globalPointerReference.currentClickedObject.domain);
            // this.globalJSAVobject.logEvent({type: "adding new value", id: this.id });

            //change the innerHTML
            /*
            The pattern of the code is to change to create
            a div, with two separate elements in it.
            */
            
            //console.log(this.globalPointerReference.currentClickedObject.unitDisplay.split(""));

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
                this.unitDisplay+='<span class="mord">'+
                this.globalPointerReference.currentClickedObject.unitDisplay.split("")[u]
                +'</span>';
            }
            this.valueDisplay+="</span>";
            this.unitDisplay+="</span>";

            this.element.innerHTML = this.valueDisplay + this.unitDisplay;
        }
    }
    changeUnits(){
        
    }
}
window.Variable = window.Variable || Variable