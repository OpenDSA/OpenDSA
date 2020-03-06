class ActiveEquation{
    constructor(equation_obj, position_obj, id, jsavObject, globalPointerReference){
        this.name=id;
        //console.log(this.name);
        this.equationObjectReference = equation_obj;
        this.selected = false;
        this.jsavequation = null;
        this.variables = {};
        this.globalPointerReference = globalPointerReference;
        this.positionObj = position_obj;

        this.visualComponents = {};
        this.createVisualEquation(position_obj, jsavObject);
    }
    createVisualEquation(position_obj, jsavObject){
        // Adding a tickmark object that indicates which equation is selected
        this.visualComponents["tickmark"] = jsavObject.label(
            "OK",
            {
                left: position_obj["POSITION_X"],
                top: position_obj["POSITION_Y"]
            }
        ).addClass("tickunselected");
        this.visualComponents["tickmark"].element[0].addEventListener("click", e => {
            e.stopPropagation();
            if(this.selected==true){
                this.selected = false;
                this.visualComponents["tickmark"].addClass("tickunselected");
                this.visualComponents["tickmark"].removeClass("tickselected");
                jsavObject.logEvent({type: "tick unselected", id: this.name});
            }
            else{
                this.selected = true;
                this.visualComponents["tickmark"].addClass("tickselected");
                this.visualComponents["tickmark"].removeClass("tickunselected");
                jsavObject.logEvent({type: "tick selected", id: this.name});
            }
        });

        // Creating the visual elements.
        this.visualComponents["text"] = jsavObject.label(
            katex.renderToString(this.equationObjectReference["latex"]),
            {
                left: position_obj["POSITION_X"]+
                this.visualComponents["tickmark"].element[0].offsetWidth+15,
                top: position_obj["POSITION_Y"]+3
            }
        ).addClass("selectableEquation");
        
        /**
         * Add code her to add an additional span class to every single box,
         * and associate a click handler with that span class container, so that
         * elements inside this span class are substituted out.
         * Look for this: <span class="mord amsrm">□</span>
         */
        this.jsavequation = jsavObject.label(
            katex.renderToString(this.equationObjectReference["latex_boxes"]),
            {
                left: position_obj["POSITION_X"]+
                this.visualComponents["tickmark"].element[0].offsetWidth+15+
                this.visualComponents["text"].element[0].offsetWidth+15,
                top: position_obj["POSITION_Y"]
            }
        ).addClass("boxedEquation");

        var boxList = 
        this.jsavequation.element[0].childNodes[0].childNodes[1].childNodes[2]
        .querySelectorAll("span.mord.amsrm")
        //console.log(boxList);
        
        /**
         * Delegation: we handle the modification of the elements here, since we are
         * creating the boxes here. As for actually setting up the clickhandlers, 
         * that is done in the call to createVariableBoxes(), so we change the query
         * for qSA to look for the container.
         */
        
        for(var i=0; i<boxList.length; i++)
        {
            //var containerSpan = document.createElement("span");
            boxList[i].className = "boxparam";
            boxList[i].setAttribute("data-domain", "empty");
            boxList[i].innerHTML = '<span class="mord amsrm">&#9634;</span>';
        }

        // Immediately create the variable boxes
        this.createVariableBoxes();
    }
    createVariableBoxes(){
        // This one is associated with creating Variable objects to go hand-in-hand with
        // box/parameter positions in the boxed representation

        var boxList = this.jsavequation.element[0].childNodes[0].childNodes[1].childNodes[2]
        .querySelectorAll("span.boxparam");
        //console.log(boxList);
        for(var boxIndex=0; boxIndex<boxList.length; boxIndex++)
        {
            var name = Window.getVarName();
            var currentBox = boxList[boxIndex];
            this.variables[this.equationObjectReference.params[boxIndex]] = new Variable(
                name, // "1", Update this to a unique variable name chosen from 26x26 choices.
                this.equationObjectReference.params[boxIndex],
                this.equationObjectReference.variables[this.equationObjectReference.params[boxIndex]],
                this.equationObjectReference.domains[this.equationObjectReference.params[boxIndex]],
                currentBox,
                this.globalPointerReference,
            )
        }
    }
    createSolvableRepresentation(){
        // TO WORK SPECIFICALLY ON THIS PART, TO CREATE THE SOLVABLE REPRESENTATION AND FINALLY, SOLUTION BOX
        var splitString = this.equationObjectReference.template.split(" ");
        for(var x=0; x<splitString.length; x++)
        {
            if(splitString[x], splitString[x] in this.variables)
            {
                if(this.variables[splitString[x]].value!=null)
                    splitString[x] = this.variables[splitString[x]].value;
                else
                {
                    // If this is called, there will be more than one unknown in the system.
                    // So, we need the current symbol, which would in turn be assigned by the
                    // corresponding Association object.
                    //splitString[x] = this.variables[splitString[x]].currentSymbol;
                    if(this.variables[splitString[x]].value == null){
                        // Then this is probably a single equation solving scenario, use id.
                        splitString[x] = this.variables[splitString[x]].id;
                    }
                    else if(this.variables[splitString[x]].valueType == "number"){
                        splitString[x] = this.variables[splitString[x]].value;
                    }
                    else {
                        // it's an association, look up appropriate field.
                        //splitString[x] = this.variables[splitString[x]].value.varID;
                    }
                }
            }
        }
        return splitString.join(" ");
    }
    solve()
    {
        // Insert checking mechanism first, this is a complete functionality.
        
        //Then, solve it.
        var splitString = this.equationObjectReference.template.split(" ");
        var subject = null;
        var subjectID = null;

        for(var x=0; x<splitString.length; x++)
        {
            if(splitString[x], splitString[x] in this.variables)
            {
                if(this.variables[splitString[x]].value!=null)
                    splitString[x] = this.variables[splitString[x]].value;
                else
                {
                    subject = this.variables[splitString[x]].parentSymbol;
                    subjectID = this.variables[splitString[x]].id;
                    splitString[x] = this.variables[splitString[x]].id;
                }
            }
        }
        var solutions = nerdamer.solveEquations(
            [splitString.join(" "),
            subjectID+" = r_n + 1"]
            );
        
        for(var i in solutions)
        {
            if(solutions[i][0] == subjectID)
            {
                return [solutions[i]];
            }
        }
        //Substitute the random symbol name with the proper qualified variable name

        // DEFAULT
        // return ["r_n",0]
    }
}
window.ActiveEquation = window.ActiveEquation || ActiveEquation