class Association{
    /**
     * ADD Docs
     */
    constructor(sourceObject, targetObject)
    {
        this.variableObjects = {};
        this.variableObjects[sourceObject.id] = sourceObject; 
        this.variableObjects[targetObject.id] = targetObject;

        this.startingAssocSubscriptEquationId = sourceObject.getParentEquationId();
        
        this.var = sourceObject.currentSymbol;
        // console.log(this.var);
        this.varDisplay = sourceObject.parentSymbol;
        this.varDisplayTemplate = sourceObject.parentSymbolTemplate;
        this.domain = null;

        sourceObject.valueNegated = false; // reset to false to avoid complications.
        targetObject.valueNegated = false; // reset to false to avoid complications.

        if(sourceObject.expectedDomain == targetObject.expectedDomain)
            this.domain = sourceObject.expectedDomain;
        else {
            // Show the error, the student has to remove them though
            // Subject this response to error levels TO BE DEFINED LATER AS PER FEEDBACK SPECIFICATIONS.
            if (targetObject.expectedDomain == 'free')
                this.domain = sourceObject.expectedDomain;
            else if (sourceObject.expectedDomain == 'free')
                this.domain = targetObject.expectedDomain;
            else {
                console.log("attempted to associate domain mismatched quantities, please correct");
                // Insert jsav dialog text here.
                this.domain = sourceObject.expectedDomain;
            }
        }

        this.updateVarDisplay();        
    }
    setAssocVarDisplay(varname, subscript)
    {
        // This function gets called with a new text that basically updates the varDisplay
        // attribute and changes it for all the variables throughout.
        // Text must be in A_{b} or A_{ } format
        
        if(varname == "" && subscript == "")
            this.varDisplay = this.varDisplayTemplate;  // Reset to template ONLY IF nothing is input at all
        else if(varname == ""){
            // not very obvious, just means only the subscript will be updated, main text remains the same.
            // this.varDisplay = this.varDisplayTemplate;
            this.varDisplay = this.varDisplay.replace(new RegExp('_\{[A-Za-z0-9 ]+\}', 'g'),"_{"+subscript+"}");
        }
        else this.varDisplay = varname+"_{"+subscript+"}";
        this.updateVarDisplay();
    }
    updateVarDisplay()
    {
        // This updates the variable display text across all connected variables in that association.
        // For individual changes, using grayOut() for that variable is advised.
        // console.log(this.varDisplay, this.startingAssocSubscriptEquationId);
        // option (dialog boxes, inputs, etc.) to change the variable name
        // throughout for all of the vars in the associations throughout.
        for(var variable in this.variableObjects)
        {
            // console.log(variable);
            if(this.variableObjects[variable].valueNegated)
                var tempElement = Window.jsavObject.label(katex.renderToString("-"+this.varDisplay)).hide();
            else var tempElement = Window.jsavObject.label(katex.renderToString(this.varDisplay)).hide();
            this.variableObjects[variable].valueDisplay.innerHTML = 
            tempElement.element[0].childNodes[0].childNodes[1].childNodes[2].innerHTML;
            tempElement.clear();
            this.variableObjects[variable].valueDisplay.dataset.status = "filled";   
        }
    }
    addVariable(newVar)
    {
        // Add another variable to the association if it is used in >2 equations.
        this.variableObjects[newVar.id] = newVar;
        newVar.valueNegated = false; // reset to false to avoid complications.

        // console.log(newVar);
        var tempElement = Window.jsavObject.label(katex.renderToString(this.varDisplay)).hide();
        this.variableObjects[newVar.id].valueDisplay.innerHTML = 
        tempElement.element[0].childNodes[0].childNodes[1].childNodes[2].innerHTML;
        tempElement.clear();
        this.variableObjects[newVar.id].valueDisplay.dataset.status = "filled";
        this.valueNegated = false; // reset to false to avoid complications.

        if(this.domain != newVar.expectedDomain) {
            // Show the error, the student has to remove them though
            // Subject this response to error levels TO BE DEFINED LATER AS PER FEEDBACK SPECIFICATIONS.
            if (newVar.expectedDomain == 'free') {
                // Nothing needs to be done, the expectedDomain takes the same value
            }
            else {
                console.log("attempted to associate domain mismatched quantities, please correct");
                // Insert jsav dialog text here.
                this.domain = newVar.expectedDomain;
            }
        }
    }
    removeAssociation(obj)
    {
        // Clicking on the variable to remove this triggers this function first, 
        // then deletes the entire association
        if (obj.getParentEquationId() == this.startingAssocSubscriptEquationId) this.startingAssocSubscriptEquationId = null;
        if(Object.keys(this.variableObjects).length > 2)
        {
            // console.log(this.variableObjects[obj.id]);
            this.variableObjects[obj.id].removeValue();
            this.variableObjects[obj.id].valueNegated = false; // resets the negation to none to avoid confusion.
            delete this.variableObjects[obj.id];
            return;
        }
        for(var variable in this.variableObjects)
        {
            this.variableObjects[variable].removeValue();
            this.variableObjects[variable].valueNegated = false; // resets the negation to none to avoid confusion.
        }
    }
}
window.Association = window.Association || Association