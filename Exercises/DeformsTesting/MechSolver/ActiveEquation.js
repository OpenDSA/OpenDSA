class ActiveEquation{
    constructor(equation_obj, position_obj, id, jsavObject){
        this.name=id;
        console.log(this.name);
        this.equationObjectReference = equation_obj;
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
    }
    createVariableBoxes(){
        // This one is associated with creating Variable objects to go hand-in-hand with
        // box/parameter positions in the boxed representation
    }
    createSolvableRepresentation(){

    }
}
window.ActiveEquation = window.ActiveEquation || ActiveEquation