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
    // else if(
    //     Window.globalPointerReference.currentClickedObjectType == "var-box"  && 
    //     Window.eqbank.currentSelectedEquationObject == null
    // )
    // {
    //     // console.log(Window.eqbank.currentSelectedEquationObject);
    //     Window.globalPointerReference.currentClickedObject.element.classList.remove("selectedvalue");
    // }
    else if(
        Window.globalPointerReference.currentClickedObjectType == "value-box"  && 
        Window.globalPointerReference.currentClickedObjectDescription == "solved-value"
    )
    {
        // console.log(Window.eqbank.currentSelectedEquationObject);
        Window.globalPointerReference.currentClickedObject.element.visualComponent.element[0].classList.remove("selectedvalue");
    }
    else if(
        Window.globalPointerReference.currentClickedObjectType == "var-box" &&
        Window.globalPointerReference.currentClickedObjectDescription == "copy number"
    )
    {
        // console.log(Window.eqbank.currentSelectedEquationObject);
        this.globalPointerReference.currentClickedObject.element.classList.remove("selectedvalue")
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

Window.showHelp = function(keyword, event) {
    if(keyword in Window.helpTexts) {
        var helpText = Window.helpTexts[keyword];
        var helpDialog = JSAV.utils.dialog(
            helpText+`<button type="button" id="closeButton" class="jsavrow">OK</button>`, 
            {width: 600, dialogClass: "helpPage"}
            );
        if(event != null)
            helpDialog[0].style.top = window.scrollY+50+"px";
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

Window.bodyClickPrompt = function() {
    // Creating clickhandlers associated with the body to clear the globalPointerReference
    document.body.addEventListener("click", e=> {
        e.stopPropagation();
        // console.log("Inside the body snatcher");
        if(Window.showBlankPrompt) {
            var messageBox = JSAV.utils.dialog("Add an equation from the bank to begin.", {modal: false, width: 100})
            messageBox[0].style.top = e.pageY+5+"px";
            messageBox[0].style.left = e.pageX+10+"px";
            setTimeout(messageBox.close, 900)
        }
        else {
            Window.clearGlobalPointerReference();
        }
    });
}