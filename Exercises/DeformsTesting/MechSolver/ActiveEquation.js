class ActiveEquation{
    constructor(equation_obj, position_obj, id, jsavObject){
        this.name=id;
        console.log(this.name);
        this.equationObjectReference = equation_obj;
        this.selected = false;
        this.createVisualEquation(position_obj, jsavObject);
    }
    createVisualEquation(position_obj, jsavObject){
        // Creating the visual elements.
        var text = jsavObject.label(
            katex.renderToString(this.equationObjectReference["latex"]),
            {
                left: position_obj["POSITION_X"],
                top: position_obj["POSITION_Y"]
            }
        ).addClass("selectableEquation");

        var box = jsavObject.label(
            katex.renderToString(this.equationObjectReference["latex_boxes"]),
            {
                left: position_obj["POSITION_X"]+20+
                text.element[0].offsetWidth,
                top: position_obj["POSITION_Y"]-3
            }
        ).addClass("boxedEquation");
        
        // Adding a tickmark object that indicates which equation is selected
        var tickmark = jsavObject.label(
            "OK",
            {
                left: position_obj["POSITION_X"]+20+
                text.element[0].offsetWidth+20+
                box.element[0].offsetWidth+30,
                top: position_obj["POSITION_Y"]-3
            }
        ).addClass("tickunselected");
        tickmark.element[0].addEventListener("click", e => {
            e.stopPropagation();
            if(this.selected==true){
                this.selected = false;
                tickmark.addClass("tickunselected");
                tickmark.removeClass("tickselected");
            }
            else{
                this.selected = true;
                tickmark.addClass("tickselected");
                tickmark.removeClass("tickunselected");
            }
        });
    }
    createVariableBoxes(){
        // This one is associated with creating Variable objects to go hand-in-hand with
        // box/parameter positions in the boxed representation
    }
    createSolvableRepresentation(){

    }
}
window.ActiveEquation = window.ActiveEquation || ActiveEquation