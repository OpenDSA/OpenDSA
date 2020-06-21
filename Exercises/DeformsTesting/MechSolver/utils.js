// generate the set of variable names that can be used throughout.
var VARIABLE_ID_USED = [];
var VARIABLE_ID_UNUSED = [];

Window.getVarName = function() {
    var name=null;
    // do{
    //     name = String.fromCharCode(97+Math.floor(Math.random()*26))+"_"
    //     +String.fromCharCode(97+Math.floor(Math.random()*26));
    // } while(!VARIABLE_ID.includes(name));
    // VARIABLE_ID.push(name);
    // return name;

    name = VARIABLE_ID_UNUSED.shift();
    VARIABLE_ID_USED.push(name);
    return name;
}

Window.valueTruncate = function(numericValue) {
    return String(Number(Math.round(parseFloat(numericValue)+'e3')+'e-3'))
}

Window.valueStringRepr = function(numericValueString) {
    var value = parseFloat(numericValueString);
    if(Math.abs(value) == 0) return "0";
    if(Math.abs(value) < 1e-3 || Math.abs(value) > 1e3) return value.toExponential(3);
    else return Window.valueTruncate(value);
}

Window.clearGlobalPointerReference = function() {
    if(
        Window.globalPointerReference.currentClickedObjectType == "value-box" &&
        Window.globalPointerReference.currentClickedObjectDescription == "in-question-description"
        )
    {
        Window.globalPointerReference.currentClickedObject.element.classList.remove("selectedvalue");
    }
    else if(
        Window.globalPointerReference.currentClickedObject == null &&
        Window.eqbank.currentSelectedEquationObject != null
    )
    {
        console.log(Window.eqbank.currentSelectedEquationObject);
        Window.eqbank.currentSelectedEquationObject.element.dataset.status='no';
        Window.eqbank.currentSelectedEquationObject = null;
    }

    // Last but not the least, this always gets done.
    Window.globalPointerReference.currentClickedObject = null;
    Window.globalPointerReference.currentClickedObjectType = null;
    Window.globalPointerReference.currentClickedObjectDescription = null;
}

Window.showHelp = function(keyword) {
    var helpText = Window.helpTexts[keyword];
    JSAV.utils.dialog(helpText, {width: 600, closeText: "OK", dialogClass: "helpPage"});
}