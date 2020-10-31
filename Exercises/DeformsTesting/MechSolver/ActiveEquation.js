class ActiveEquation{
    constructor(equation_obj, position_obj, id, jsavObject, globalPointerReference){
        this.name=id;
        //console.log(this.name);
        this.equationObjectReference = equation_obj;
        this.selected = false;
        this.jsavequation = null;
        this.variables = {};
        this.globalPointerReference = globalPointerReference;
        this.jsavObject = jsavObject;
        this.positionObj = position_obj;

        this.visualComponents = {};
        this.createVisualEquation(position_obj, jsavObject);
    }
    createVisualEquation(position_obj, jsavObject){
        // Adding a tickmark object that indicates which equation is selected
        this.visualComponents["tickmark"] = jsavObject.label(
            //"OK",
            "&#x2610",
            {
                left: position_obj["POSITION_X"],
                top: position_obj["POSITION_Y"]
            }
        ).addClass("activeEqMenu");
        this.visualComponents["tickmark"].element[0].dataset.selected="unselected";
        this.visualComponents["tickmark"].element[0].addEventListener("click", e => {
            e.stopPropagation();
            if(this.selected==true){
                this.selected = false;
                this.visualComponents["tickmark"].element[0].innerHTML = "&#x2610";
                this.visualComponents["tickmark"].element[0].dataset.selected="unselected";
                // this.visualComponents["tickmark"].removeClass("tickselected");
                
                jsavObject.logEvent({type: "tick unselected", id: this.name});
            }
            else{
                this.selected = true;
                this.visualComponents["tickmark"].element[0].innerHTML = "&#x2611";
                this.visualComponents["tickmark"].element[0].dataset.selected="selected";
                // this.visualComponents["tickmark"].removeClass("tickunselected");
                
                jsavObject.logEvent({type: "tick selected", id: this.name});
            }
        });
        this.visualComponents["tickmark"].element[0]
        .setAttribute("title", "Click to select this equation and others to create a system, followed by clicking on Solve to solve the system.");

        // Delete button is added to remove the individual equation
        this.visualComponents["delete"] = jsavObject.label(
            "&#x2702",
            {
                left: position_obj["POSITION_X"]+
                this.visualComponents["tickmark"].element[0].offsetWidth+10,
                top: position_obj["POSITION_Y"],
                // left: 5,
                // top: 0,
                // relativeTo: this.visualComponents["tickmark"].element[0],
                // anchor: "right top",
                // myAnchor: "left top"
            }
        ).addClass("activeEqMenu");
        this.visualComponents["delete"].element[0].dataset.id = this.name.split("_")[2]-1;
        this.visualComponents["delete"].element[0].dataset.wkid = this.name.split("_")[0].slice(2,);
        this.visualComponents["delete"].element[0].setAttribute("title", "Click to remove the equation, with values and associations.");
        
        // Adding a help button to provide instructions about the usage of how to use the equations.
        this.visualComponents["help"] = jsavObject.label(
            "&#xFFFD",
            {
                left: position_obj["POSITION_X"]+
                this.visualComponents["tickmark"].element[0].offsetWidth+10+
                this.visualComponents["delete"].element[0].offsetWidth+10,
                top: position_obj["POSITION_Y"]
            }
        ).addClass("activeEqMenu");
        this.visualComponents["help"].element[0].dataset.id = this.name.split("_")[2]-1;
        this.visualComponents["help"].element[0].dataset.wkid = this.name.split("_")[0].slice(2,);
        this.visualComponents["help"].element[0].setAttribute("title", "Click here for help about the equations.");
        this.visualComponents["help"].element[0].addEventListener( "click", e=> {
            e.stopPropagation();
            Window.showHelp("boxedEquation")
        });

        // Adding a template text for the equation that was added, that shows the equation's subscripts
        // console.log(this.equationObjectReference)
        // Creating the visual elements.
        this.visualComponents["text"] = jsavObject.label(
            katex.renderToString(this.equationObjectReference["latex"]),
            {
                left: position_obj["POSITION_X"]+
                this.visualComponents["tickmark"].element[0].offsetWidth+10+ // Test if +5 or +13 works
                this.visualComponents["delete"].element[0].offsetWidth+10+
                this.visualComponents["help"].element[0].offsetWidth+10,
                top: position_obj["POSITION_Y"]+3
            }
        ).addClass("workspaceEquation");
        this.visualComponents["text"].element[0].addEventListener("click", e=> {
            // Window.parentObject = this;
            e.stopPropagation();
            this.subscriptizeEquationComponents(this);
        });

        /**
         * Add code here to add an additional span class to every single box,
         * and associate a click handler with that span class container, so that
         * elements inside this span class are substituted out.
         * Look for this: <span class="mord amsrm">□</span>
         */
        this.jsavequation = jsavObject.label(
            katex.renderToString(this.equationObjectReference["latex_boxes"]),
            {
                left: position_obj["POSITION_X"]+
                this.visualComponents["tickmark"].element[0].offsetWidth+10+ // test if +5 or +13 helps
                this.visualComponents["delete"].element[0].offsetWidth+10+
                this.visualComponents["help"].element[0].offsetWidth+10+
                this.visualComponents["text"].element[0].offsetWidth+20,    // test if +30 or +22 helps
                top: position_obj["POSITION_Y"]
            }
        ).addClass("boxedEquation");
        
        // To be useful later.
        this.visualComponents["height"] = this.equationObjectReference.height;

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
            boxList[i].className = " boxparam";
            boxList[i].setAttribute("data-domain", "empty");
            //boxList[i].innerHTML = '<span class="mord amsrm">&#9634;</span>';
            boxList[i].innerHTML = 
            '<span class="mord value"></span><span class="mord unit"></span>';
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
            // add a line for a hidden non nodifiable variable for fixed constants
            var name = Window.getVarName();
            var currentBox = boxList[boxIndex];
            this.variables[this.equationObjectReference.params[boxIndex]] = new Variable(
                this.name+"_"+this.equationObjectReference.params[boxIndex], // name unique to workspace, equation, and parameter
                this.equationObjectReference.params[boxIndex],
                name, // actual variable name to be used everywhere else.
                this.equationObjectReference.variables[this.equationObjectReference.params[boxIndex]],
                this.equationObjectReference.domains[this.equationObjectReference.params[boxIndex]],
                currentBox,
                this.globalPointerReference,
            )
        }
    }
    // oldCreateSolvableRepresentation(){
    //     // DEPRECATED: Features of Nerdamer+peculiarities required us to do things differently.
    //     // Plus, this function is really messily written.
    //     // TO WORK SPECIFICALLY ON THIS PART, TO CREATE THE SOLVABLE REPRESENTATION AND FINALLY, SOLUTION BOX
    //     var splitString = this.equationObjectReference.template.split(" ");
    //     for(var x=0; x<splitString.length; x++)
    //     {
    //         if(splitString[x], splitString[x] in this.variables)
    //         {
    //             if(this.variables[splitString[x]].value!=null)
    //                 splitString[x] = this.variables[splitString[x]].value;
    //             else
    //             {
    //                 // If this is called, there will be more than one unknown in the system.
    //                 // So, we need the current symbol, which would in turn be assigned by the
    //                 // corresponding Association object.
    //                 //splitString[x] = this.variables[splitString[x]].currentSymbol;
    //                 if(this.variables[splitString[x]].value == null){
    //                     // Then this is probably a single equation solving scenario, use id.
    //                     splitString[x] = this.variables[splitString[x]].currentSymbol;
    //                 }
    //                 else if(this.variables[splitString[x]].valueType == "number"){
    //                     splitString[x] = this.variables[splitString[x]].value;
    //                 }
    //                 else {
    //                     // it's an association, look up appropriate field.
    //                     //splitString[x] = this.variables[splitString[x]].value.varID;
    //                 }
    //             }
    //         }
    //     }
    //     return splitString.join(" ");
    // }
    createSolvableRepresentation(){
        var unitEquationSet = [];
        var unknowns = {};
        var splitString = this.equationObjectReference.template.split(" ");
        for(var x=0; x<splitString.length; x++)
        {
            // DEBUG:
            // console.log(splitString[x]);
            
            // if(splitString[x], splitString[x] in this.variables)
            if(splitString[x] in this.variables)
            {
                if(this.variables[splitString[x]].valueType=="number")
                {
                    // Add the variable=value assignment separately, putting only
                    // variables in the equation representation.
                    unitEquationSet.push(
                        this.variables[splitString[x]].currentSymbol+
                        "="+this.variables[splitString[x]].value
                        );
                    splitString[x] = this.variables[splitString[x]].currentSymbol;
                }
                else
                {
                    // This just means that there is an association -> valueType="association"
                    // Unlike the previous version, in our case, we will always have >1 equation.
                    // So, we simply check for the term, and call on its representation variable.
                    if(this.variables[splitString[x]].valueType=="association")
                    {
                        var ps = this.variables[splitString[x]].value.varDisplay;
                        // splitString[x] = this.variables[splitString[x]].value.var;
                        // unknowns[this.variables[splitString[x]].value.var] = ps;
                        var subject = this.variables[splitString[x]].value.var;
                        if(this.variables[splitString[x]].valueNegated)
                            splitString[x] = "(-"+subject+")";
                        else splitString[x] = subject;
                        unknowns[subject] = ps;
                    }
                    else
                    {
                        // OR it's a single unmarked, unconnected unknown
                        var ps = this.variables[splitString[x]].parentSymbol;
                        // splitString[x] = this.variables[splitString[x]].currentSymbol;
                        // unknowns[splitString[x]] = ps;
                        var subject = this.variables[splitString[x]].currentSymbol;
                        if(this.variables[splitString[x]].valueNegated)
                            splitString[x] = "(-"+subject+")";
                        else splitString[x] = subject;
                        unknowns[subject] = ps;
                    }
                }
            }
        }
        unitEquationSet.push(splitString.join(" "));
        return {
            "equations": unitEquationSet,
            "unknowns": unknowns
        };
    }
    solve()
    {
        // Insert checking mechanism first, this is a complete functionality.
        
        //Then, solve it.
        var splitString = this.equationObjectReference.template.split(" ");
        var subject = null;
        
        for(var x=0; x<splitString.length; x++)
        {
            if(splitString[x] in this.variables)
            {
                if(this.variables[splitString[x]].valueType=="number")
                    splitString[x] = this.variables[splitString[x]].value;
                else
                {
                    // This just means that there is an association -> valueType="association"
                    // Unlike the previous version, in our case, we will always have >1 equation.
                    // So, we simply check for the term, and call on its representation variable.
                    if(this.variables[splitString[x]].valueType=="association")
                    {
                        // var ps = this.variables[splitString[x]].value.varDisplay;
                        splitString[x] = this.variables[splitString[x]].value.var;
                        if(this.variables[splitString[x]].valueNegated)
                            splitString[x] = "(-"+subject+")";
                        else splitString[x] = subject;
                    }
                    else
                    {
                        // OR it's a single unmarked, unconnected unknown
                        // var ps = this.variables[splitString[x]].parentSymbol;
                        subject = this.variables[splitString[x]].currentSymbol;
                        if(this.variables[splitString[x]].valueNegated)
                            splitString[x] = "(-"+subject+")";
                        else splitString[x] = subject;
                    }
                }
            }
        }
        var solutions = nerdamer.solveEquations(
            [splitString.join(" "),
            subject+" = x + 1"]
            );
        console.log(solutions);
        for(var i in solutions)
        {
            if(solutions[i][0] == subject)
            {
                return [solutions[i]];
            }
        }
        //Substitute the random symbol name with the proper qualified variable name
    }
    subscriptizeEquationComponents(activeEqObject){
        // Steps:
        // 1. Add subscripts to all the elements in the equation in the represented version
        // 2. Add subscripts to all the grayed out boxes in the boxed equation
        // 3. For all filled boxes with Association type objects, add subscripts
        // 4. For ALL of these cases, add subscripts to both the text representation as well as the visual representation.

        // console.log(this);
        var inputPromptHTML = 
        '<h4>Enter a subscript name here.</h4>'+
        '<input type="text" id="subscriptname" name="subscriptname" size="8" />'+
        '<input type="button" id="submit" value="Set subscript"/>';

        var inputBox = JSAV.utils.dialog(inputPromptHTML, {width: 150});
        inputBox[0].style.top = event.pageY+5+"px";
        inputBox[0].style.left = event.pageX+10+"px";
        Window.box = inputBox;
        Window.showBlankPrompt = false;
        
        inputBox[0].addEventListener("click", 
            e=> { 
                e.stopPropagation();
            })

        inputBox[0].querySelector("#submit").addEventListener("click", 
            e=> { 
                e.stopPropagation();
                // Window.parentObject.setSubscript(
                activeEqObject.setSubscript(
                    e,
                    Window.box[0].querySelector("#subscriptname").value,
                    // Window.parentObject);
                    activeEqObject);
                Window.box.close();

                // Cleaning up
                delete Window.box;
                delete Window.parentObject;
            } 
        );
    }
    setSubscript(event, subscriptText, equationObject)
    {
        // var subscriptText = Window.box[0].querySelector("#subscriptname").value;
        // event.stopPropagation();
        if(subscriptText == "") subscriptText = " ";

        // Step 1.
        equationObject.visualComponents["text"].text(
            katex.renderToString(
                equationObject.equationObjectReference.latex.replace(new RegExp('_\{[A-Za-z0-9 ]+\}', 'g'),"_{"+subscriptText+"}")
                )
            );
        
        var assocVariables = [];
        for(var variable in equationObject.variables)
        {
            // Update the variable internal symbols for later associations and solving
            // This can be referenced from the current equation's equationRefObj and the variable's semantic name.

            // Update the current displayed boxes
            // Step 2.
            if (subscriptText == " ")
                equationObject.variables[variable].parentSymbol = 
                equationObject.variables[variable].parentSymbolTemplate;
            else 
                equationObject.variables[variable].parentSymbol = 
                // equationObject.variables[variable].parentSymbolTemplate.replace(
                equationObject.variables[variable].parentSymbol.replace(
                    new RegExp('_\{[A-Za-z0-9 ]+\}', 'g'),"_{"+subscriptText+"}");
            // equationObject.variables[variable].subscript = subscriptText;    // Not yet; we don't need this just yet.

            // Note: Expected behaviour with renaming variables explicitly for empty variable boxes - 
            // Either the new variables will have empty subscripts, in which case the above will work just fine.
            // There will be empty { } groups in the parentSymbolTemplate which will be discovered and replaced
            // And when resetting, these will be used again.
            // However, if the variable does not have a { } group, then it won't get discovered, and it won't be replaced.
            
            if(equationObject.variables[variable].valueType != "number")
            {
                // Step 3.
                // else if(Window.parentObject.variables[variable].valueType == "association")
                if(equationObject.variables[variable].valueType == "association")
                {
                    if(equationObject.variables[variable].value.startingAssocSubscriptEquationId 
                        == equationObject.name) // This part is debatable
                    {
                        console.log(equationObject.variables[variable].value.startingAssocSubscriptEquationId);
                        console.log(equationObject.name);
                        // equationObject.variables[variable].value.varDisplay = 
                        // equationObject.variables[variable].value.varDisplay
                        // .replace(new RegExp('_\{[A-Za-z0-9 ]+\}', 'g'),"_{"+subscriptText+"}");
                        // equationObject.variables[variable].value.updateVarDisplay();
                        equationObject.variables[variable].value.setAssocVarDisplay("", subscriptText);
                    }
                }
                else equationObject.variables[variable].grayOut();
            }
        }

        // TODO: Can be shortened to make the calls from inside one another; makes the segment less complicated.
        // Adjusting the visuals of the equation
        var shiftChain = Window.windowManager.shiftRight(equationObject);
        console.log(shiftChain);
        if(shiftChain == "shiftActiveEqDown") {
            // console.log(Window.parentObject);
            var extend = Window.windowManager.shiftActiveEqDown(equationObject.name);
            if(extend != null) {
                var split = equationObject.name.split("_");
                var wkspaceNum = split[0].substring(2, split[0].length);
                Window.windowManager.shiftDown(extend, wkspaceNum);
            }
            
        }
        else if(shiftChain == "shiftActiveEqUp") {
            Window.windowManager.shiftActiveEqUp(equationObject.name);
        }
        // Window.box.close();
        // delete Window.box;
        // delete Window.parentObject;
    }
    OldgetUnitOfVariable(varName)
    {
        // Find the unknown variable - which can be an option later, if no parameter is passed.
        // var varName = null;
        console.log("in getUnitOfVariable for"+varName);
        // NOTES: In our observation, we can either have an unknown that has an association, or that does not (i.e. is null).
        // If an unknown is associated, then it maybe difficult to compute its domain from inside 
        // especially if this equation contains atleast one unknown with a weird datatype.
        // PLACEHOLDER FOR POTENTIAL HACK

        // If an unknown is null (not associated), then we want to spend sometime computing its domain.
        var splitString = this.equationObjectReference.template.split(" ");
        for(var x=0; x<splitString.length; x++)
        {
            if(splitString[x] in this.variables)
            {
                if(this.variables[splitString[x]].value == null || this.variables[splitString[x]].valueType == "number")
                {
                    // Single solver; one unknown, with
                    splitString[x] = this.variables[splitString[x]].currentSymbol;
                }
                else if(this.variables[splitString[x]].valueType == 'association')
                {
                    // if there is an association, adds that automatically.
                    splitString[x] = this.variables[splitString[x]].value.var;
                }
                // No need for the numbers, we only need the variable symbols.
            }
        }
        var equation = nerdamer(splitString.join(" "));
        var substituted = equation.solveFor(varName).toString() // Only reference of varName, used when the 
        var values = {};
        var flagIndeterminate = false;
        for(var v in this.variables)
        {
            // This assumes that this is for a single variable solving scenario.
            if(this.variables[v].valueType == "number")
            {
                values[this.variables[v].currentSymbol] = '1 '+this.variables[v].currentUnit;
            }
            else if(this.variables[v].valueType == "association")
            {
                // The domain is this case would obviously be unknown.
                // For now, use the expected domain attribute of the variable to find the corresponding base unit
                // console.log(
                //     "Can we find the right unit?",
                //     this.variables[v].value.domain,
                //     Window.defaultDomains[this.variables[v].value.domain],
                //     Window.defaultDomains[this.variables[v].value.domain][Window.unitFamily],
                //     )
                var unitName = Window.defaultDomains[this.variables[v].value.domain][Window.unitFamily];
                // values[this.variables[v].currentSymbol] = '1 '+
                values[this.variables[v].value.var] = '1 '+
                    Window.UNIT_DB[this.variables[v].value.domain][unitName]['unit'];
                // console.log("Did we find the right unit?",values[this.variables[v].currentSymbol]);
            }
            else if(this.variables[v].valueType == null)
            {
                // Probably the unknown we would calculate things for anyway; it hasn't been associated yet.
                // Don't worry about it; this will certainly be the one we will be calculating the unit for.
                // However, if we need the unit for this thing to infer the unit of something else, then enable this.
                if (this.equationObjectReference.group == 'Arithmetic') {
                    // Special case, this is needed because everything else (mult, div, etc.) can fix itself (UPDATE: Maybe not)
                    // values[this.variables[v].currentSymbol] = ''; // Just leave it blank, let the rest of the units determine the rest.

                    // When it comes here, either this.variables[v] is the varName whose unit is requested,
                    // or this is the varName whose unit will be used for inference.
                    // For the first case, we can leave it blank.
                    if (varName == this.variables[v].currentSymbol) // It's not an assoc, otherwise it wouldn't be null
                        values[this.variables[v].currentSymbol] = '';
                    // Else, we abort and directly return the expectedDomain and corresponding unit for the requested variable.
                    // We already have some info to go off of, we don't need to waste anymore time.
                    else {
                        flagIndeterminate = true;
                    }
                }
                else {
                    var unitName = Window.defaultDomains[this.variables[v].expectedDomain][Window.unitFamily];
                    values[this.variables[v].currentSymbol] = '1 '+ Window.UNIT_DB[this.variables[v].expectedDomain][unitName]['unit'];
                }
                // Alternatively; try to find out what the unit for this thing should be, then use it for this one.
                // values[this.variables[v].currentSymbol] = '1 '+ this.getUnitOfVariable(this.variables[v].currentSymbol)[1];
            }
        }
        // By this point, things have been calculated, and can be indexed by the proper variable name.
        if(flagIndeterminate) {
            var resultUnit = values[varName].split(" ")[1];
            if(resultUnit in Window.unitDomainMap)
                var domain = Window.unitDomainMap[resultUnit];
            else
                var domain = "unknown"; // temporary fix
            return [varName, resultUnit, domain];
        }
        // console.log(substituted);
        // console.log(values);
        for(var v in values)
        {
            substituted = substituted.replace(v,"("+values[v]+")");
        }
        console.log(substituted);
        var resultUnit = mathjs.evaluate(substituted).toString().split(" ")[1];
        if(resultUnit in Window.unitDomainMap)
            var domain = Window.unitDomainMap[resultUnit];
        else
            var domain = "unknown"; // temporary fix
        return [varName, resultUnit, domain];
    }
    getUnitOfVariable(varName)
    {
        console.log("in getUnitOfVariable for"+varName);
        // Create the representable version of the equation with only variable names.
        // This will be placeholders for manipulation later.
        var splitString = this.equationObjectReference.template.split(" ");
        for(var x=0; x<splitString.length; x++)
        {
            if(splitString[x] in this.variables)
            {
                if(this.variables[splitString[x]].value == null || 
                    this.variables[splitString[x]].valueType == "number")
                {
                    splitString[x] = this.variables[splitString[x]].currentSymbol;
                }
                else if(this.variables[splitString[x]].valueType == 'association')
                {
                    splitString[x] = this.variables[splitString[x]].value.var;
                }
            }
        }
        
        var equation = nerdamer(splitString.join(" "));
        var substituted = equation.solveFor(varName).toString() // Only reference of varName, used when the 

        // Now, assign the units to the variables
        var values = {};
        var domains = {};
        var flagIndeterminate = false;
        for(var v in this.variables)
        {
            if(this.variables[v].valueType == "number")
            {
                console.log("Inside number", this.variables[v]);
                values[this.variables[v].currentSymbol] = '1 '+this.variables[v].currentUnit;
                domains[this.variables[v].currentSymbol] = this.variables[v].currentDomain;
            }
            else if(this.variables[v].valueType == "association")
            {
                // console.log("Domain of the current variable box",
                //     this.variables[v].value.domain,
                //     Window.UNIT_DB[this.variables[v].value.domain],
                // )
                var unitName = Window.defaultDomains[this.variables[v].value.domain][Window.unitFamily];
                
                // console.log(Window.UNIT_DB[this.variables[v].value.domain][unitName]);
                // console.log(Window.UNIT_DB[this.variables[v].value.domain][unitName]['unit']);

                values[this.variables[v].value.var] = '1 '+
                    Window.UNIT_DB[this.variables[v].value.domain][unitName]['unit'];
                domains[this.variables[v].value.var] = this.variables[v].value.domain;
                // console.log("Did we find the right unit?",values[this.variables[v].currentSymbol]);
            }
            else if(this.variables[v].valueType == null)
            {
                if(this.variables[v].expectedDomain != "free")
                {
                    // Not a free domain, which means we know exactly what is supposed to be here.
                    console.log("Inside non free variale domain unknown non assoc", this.variables[v]);
                    var unitName = Window.defaultDomains[this.variables[v].expectedDomain][Window.unitFamily];
                    values[this.variables[v].currentSymbol] = 
                    '1 '+ Window.UNIT_DB[this.variables[v].expectedDomain][unitName]['unit'];
                    domains[this.variables[v].currentSymbol] = this.variables[v].expectedDomain;
                }
                else
                {
                    // It is a free domain variable, but is it the subject of this call to getUnitOfVariable() ?
                    if (varName == this.variables[v].currentSymbol)
                        values[this.variables[v].currentSymbol] = ''; // We set it to nothing, since it doesn't matter; it won't be used. Alt: just "continue"
                    else {
                        flagIndeterminate = true; continue;
                        // We don't know what this unit is going to be. But we need it to guess the units of the other variables.
                        // The best we can do is guess it from the other units in this equation.
                        // TODO: Replace this with proper inference rules from other equations, since for each it would be specific.
                        // TODO: (contd.) It may even be coded in and accessed, if we don't want to write a whole function
                        // But, eg: c = a + b; the call to this wants the domain of a; given domain of b is known and c is null, unassoc.
                        // Since a is requested, it has to be an unknown; so it must be an assoc. So, we return the
                        // expected domain of the requested variable, and call it a day.
                        var resultUnit = Window.defaultDomains[this.variables[varName].expectedDomain][Window.unitFamily];
                        if(resultUnit in Window.unitDomainMap)
                            return [varName, resultUnit, Window.unitDomainMap[resultUnit]];
                        else
                            return [varName, "unit", "unknown"];
                    }
                }
            }
        }
        if(flagIndeterminate) {
            var resultUnit = values[varName].split(" ")[1];;
            // if(resultUnit in Window.unitDomainMap)
            if(resultUnit in Window.unitDomainMap)
                return [varName, resultUnit, Window.unitDomainMap[resultUnit]];
            // if (domains[varName] in Window.UNIT_DB)
            //     return [varName, resultUnit, domains[varName]];
            else
                return [varName, "", ["unknown", ""]];
        }

        console.log(values);
        for(var v in values) substituted = substituted.replace(new RegExp(v, 'g'),"("+values[v]+")");
        console.log(substituted);

        // Now, evaluate the expression to find the units
        // var resultUnit = mathjs.evaluate(substituted).toString().split(" ")[1];
        var result = mathjs.evaluate(substituted).toString().split(" ");

        // Now, the main logic: is this unit legit, not, or just dimensionless?
        if(result.length == 1)
        {
            // The quantity is dimensionless, in which case, we need to evaluate what 
            // the dimensions were to begin with. Just find the baseUnit for that variable,
            // and send that over. Let the others handle this conversion.
            
            // Go through the variables to find the correct variable name, and find its expectedDomain.
            var expDom = domains[varName];
            var unitName = Window.defaultDomains[expDom][Window.unitFamily];
            return [ 
                varName,
                Window.UNIT_DB[expDom][unitName]['unit'],
                [expDom, Window.UNIT_DB[expDom][unitName]['unitDisp']] 
            ];
        }
        else {
            // It's not dimensionless, we just need to verify this thing is correct.
            var resultUnit = (result.slice(1)).join(" ");   // TODO: add parser to get proper symbols for all units
            console.log(result);
            var resultDomain = Window.unitDomainMap[resultUnit];

            if(resultDomain != null) {
                return [ varName, resultUnit, resultDomain ];
            }
            else {
                console.log("Can't figure out the usual domain")
                resultDomain = domains[varName];
                try{
                    console.log(resultDomain);
                    console.log(Window.defaultDomains[resultDomain]);
                    var parentUnitName = Window.defaultDomains[resultDomain][Window.unitFamily];
                    var parentUnit = Window.UNIT_DB[resultDomain][parentUnitName]['unit'];
                    console.log(parentUnit);
                    // If this throws an error, then we have an actual type mismatch
                    // Otherwise, it just means the units simplified to something else: eg: N.m and J
                    var number = mathjs.evaluate("number(1 "+resultUnit+", "+parentUnit+")");
                    console.log(Window.unitDomainMap[parentUnit]);
                    return [varName, parentUnit, Window.unitDomainMap[parentUnit], number];
                }
                catch(err)
                {
                    return [varName, resultUnit, ["unknown", resultUnit]]
                }
            }
        }
    }
}
window.ActiveEquation = window.ActiveEquation || ActiveEquation