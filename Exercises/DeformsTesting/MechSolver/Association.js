class Association{
    /**
     * Purely a bookkeeping object, only used in substituting variables when 
     */
    constructor(sourceObject, targetObject)
    {
        this.variableObjects = {};
        this.variableObjects[sourceObject.id] = sourceObject; 
        this.variableObjects[targetObject.id] = targetObject;
        
        this.var = sourceObject.currentSymbol;
        this.varDisplay = sourceObject.parentSymbol;
        this.varDisplayTemplate = sourceObject.parentSymbolTemplate;

        this.updateVarDisplay();        
    }
    updateVarDisplay()
    {
        console.log(this.varDisplay);
        // option (dialog boxes, inputs, etc.) to change the variable name
        // throughout for all of the vars in the associations throughout.
        for(var variable in this.variableObjects)
        {
            console.log(variable);
            var tempElement = Window.jsavObject.label(katex.renderToString(this.varDisplay)).hide();
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
        console.log(newVar);
        var tempElement = Window.jsavObject.label(katex.renderToString(this.varDisplay)).hide();
        this.variableObjects[newVar.id].valueDisplay.innerHTML = 
        tempElement.element[0].childNodes[0].childNodes[1].childNodes[2].innerHTML;
        tempElement.clear();
        this.variableObjects[newVar.id].valueDisplay.dataset.status = "filled";
    }
    removeAssociation(obj)
    {
        // Clicking on the variable to remove this triggers this function first, 
        // then deletes the entire association
        if(Object.keys(this.variableObjects).length > 2)
        {
            console.log(this.variableObjects[obj.id]);
            this.variableObjects[obj.id].removeValue();
            delete this.variableObjects[obj.id];
            return;
        }
        for(var variable in this.variableObjects)
        {
            this.variableObjects[variable].removeValue();
        }
    }
}
window.Association = window.Association || Association