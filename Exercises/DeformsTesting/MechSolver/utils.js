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
        // console.log(Window.eqbank.currentSelectedEquationObject);
        Window.eqbank.currentSelectedEquationObject.element.dataset.status='no';
        Window.eqbank.currentSelectedEquationObject = null;
    }
    else if(
        Window.globalPointerReference.currentClickedObjectType == "var-box"  && 
        Window.eqbank.currentSelectedEquationObject == null
    )
    {
        // console.log(Window.eqbank.currentSelectedEquationObject);
        Window.globalPointerReference.currentClickedObject.element.classList.remove("selectedvalue");
    }
    else if(
        Window.globalPointerReference.currentClickedObjectType == "value-box"  && 
        Window.globalPointerReference.currentClickedObjectDescription == "solved-value"
    )
    {
        // console.log(Window.eqbank.currentSelectedEquationObject);
        Window.globalPointerReference.currentClickedObject.element.visualComponent.element[0].classList.remove("selectedvalue");
    }

    // Last but not the least, this always gets done.
    Window.globalPointerReference.currentClickedObject = null;
    Window.globalPointerReference.currentClickedObjectType = null;
    Window.globalPointerReference.currentClickedObjectDescription = null;
    Window.showBlankPrompt = true;
    // console.log("Came here");
    // console.trace();
}

Window.isThereContext = function() {
    if(Window.globalPointerReference.currentClickedObject == null &&
    Window.globalPointerReference.currentClickedObjectType == null &&
    Window.globalPointerReference.currentClickedObjectDescription == null)
        return false;
    else return true;
}

Window.showHelp = function(keyword) {
    if(keyword in Window.helpTexts) {
        var helpText = Window.helpTexts[keyword];
        var helpDialog = JSAV.utils.dialog(
            helpText+`<button type="button" id="closeButton" class="jsavrow">OK</button>`, 
            {width: 600, dialogClass: "helpPage"}
            );
        Window.globalPointerReference.currentClickedObjectType = "help";
        Window.globalPointerReference.currentClickedObjectDescription = "main";
        Window.showBlankPrompt = false;
        helpDialog[0].addEventListener("click", e=> {
            e.stopPropagation();
        })
        helpDialog[0].querySelector("#closeButton").addEventListener("click", e=> {
            e.stopPropagation();
            helpDialog.close();
            Window.clearGlobalPointerReference();
        })
    }
    else console.log(`HelpText for ${keyword} requested`);
}