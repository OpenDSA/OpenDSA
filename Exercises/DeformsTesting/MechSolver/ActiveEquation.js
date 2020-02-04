class ActiveEquation{
    constructor(equation_obj, position_obj, id, jsavObject, globalPointerReference){
        this.name=id;
        //console.log(this.name);
        this.equationObjectReference = equation_obj;
        this.selected = false;
        this.jsavequation = null;
        this.variables = {};
        this.globalPointerReference = globalPointerReference;
        this.createVisualEquation(position_obj, jsavObject);
    }
    createVisualEquation(position_obj, jsavObject){
        // Adding a tickmark object that indicates which equation is selected
        var tickmark = jsavObject.label(
            "OK",
            {
                left: position_obj["POSITION_X"],
                top: position_obj["POSITION_Y"]
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

        // Creating the visual elements.
        var text = jsavObject.label(
            katex.renderToString(this.equationObjectReference["latex"]),
            {
                left: position_obj["POSITION_X"]+
                tickmark.element[0].offsetWidth+15,
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
                tickmark.element[0].offsetWidth+15+
                text.element[0].offsetWidth+15,
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
            var currentBox = boxList[boxIndex];
            this.variables[this.equationObjectReference.params[boxIndex]] = new Variable(
                "1", 
                this.equationObjectReference.params[boxIndex],
                //this.equationObjectReference.variables[this.equationObjectReference.params[boxIndex]],
                "x",
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
                    splitString[x] = this.variables[splitString[x]].symbol;
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

        for(var x=0; x<splitString.length; x++)
        {
            if(splitString[x], splitString[x] in this.variables)
            {
                if(this.variables[splitString[x]].value!=null)
                    splitString[x] = this.variables[splitString[x]].value;
                else
                {
                    subject = this.variables[splitString[x]].symbol;
                    splitString[x] = this.variables[splitString[x]].symbol;
                }
            }
        }
        var solutions = nerdamer.solveEquations(
            [splitString.join(" "),
            subject+" = r_n + 1"]
            );
        
        for(var i in solutions)
        {
            if(solutions[i][0] == subject)
                return solutions[i];
        }
        //Substitute the random symbol name with the proper qualified variable name

        // DEFAULT
        // return ["r_n",0]
    }
}
window.ActiveEquation = window.ActiveEquation || ActiveEquation