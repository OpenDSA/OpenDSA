/*global window*/
(function() {
    "use strict";
    //var definitions
    var av; //The JSAV Object
    var eqbank;
    var wkspacelist;
    var globalSolutionBoxes = {};
    var globalPointerReference = 
    // This is a hacky way to keep track of what was just clicked on in the question,
    // specifically for association clicking events. Needless to be said, this is only 
    // required for pointing to the source of an association, and handling it. Any 
    // clickhandlers working with association tasks will receive a pointer to this
    // object, and work with it.
    // STILL IN PROGRESS
    {
        currentClickedObject: null,
        currentClickedObjectType: null,
        currentClickedObjectDescription: null,
    }

    const CANVAS_DIMENSIONS = {
        "TOTAL_WIDTH": 767,
        "TOTAL_HEIGHT": 1500,
        "WORKSPACE_LIST": {
            "X": 1,
            "Y": 1,
            "WIDTH": 500,
            "HEIGHT": 50
        },
        "EQBANK": {
            "CORNER_X": 504,
            "CORNER_Y": 1,
            "WIDTH": 230,
            "HEIGHT": 500
        },
    };

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

    var mechSolverCommon = {

        //initializer, creates all the necessary object instances
        initJSAV: function(exerciseId){
            // Creating one rectangle in the middle that allows scrolling through
            // the list of equations.
            reset(exerciseId);
        },
        
        checkAnswer: function()
        {
            var feedBackText = "";
            var equationDetails = {};
            for (var wk in wkspacelist.workspace_list)
            {
                for(var eq in wkspacelist.workspace_list[wk].LIST_OF_EQUATIONS_IN_WORKSPACE)
                {
                    // creating entry for the equation
                    var eqDetails = {};
                    for(var v in wkspacelist.workspace_list[wk].LIST_OF_EQUATIONS_IN_WORKSPACE[eq].variables)
                    {
                        eqDetails[
                            wkspacelist.workspace_list[wk].LIST_OF_EQUATIONS_IN_WORKSPACE[eq].variables[v].name
                        ] = wkspacelist.workspace_list[wk].LIST_OF_EQUATIONS_IN_WORKSPACE[eq].variables[v].value;
                    }
                    
                    equationDetails[
                        wkspacelist.workspace_list[wk].LIST_OF_EQUATIONS_IN_WORKSPACE[eq].equationObjectReference.id
                    ] = eqDetails;
                }
            }
            //console.log(equationDetails);
            var truthResults = [];

            for(var solnIndex=0; solnIndex<Object.keys(solution).length; solnIndex++)
            {
                feedBackText += "<h3>Question "+(solnIndex+1)+"</h3>";
                var solnResults = { decision:true, description:{} };
            
                // 1. Check if all the equations are present
                feedBackText += "<h4>Equations:</h4> <ul>";
                solnResults.description.allEqn = true;
                for(var e in solution[solnIndex].equations)
                {
                    if(!(solution[solnIndex].equations[e] in equationDetails))
                    {
                        solnResults.description.allEqn = false;
                        solnResults.decision = false;
                        //console.log(solution[solnIndex].equations[e]+" is a required equation that was not used.")
                        feedBackText += "<li>"+solution[solnIndex].equations[e]+" is a required equation that was not used.</li>";
                    }
                }
                feedBackText += "</ul>";
                feedBackText += solnResults.decision? "<h4>All equations were chosen</h4>":"";

                // 2. Check if all the variables are assigned properly with values
                feedBackText += "<h4>Variable assignments:</h4> <ul>";
                var varList = Object.keys(solution[solnIndex].variables);
                solnResults.description.allVars = true;
                for(var e in equationDetails)
                {
                    for(var v in equationDetails[e])
                    {
                        if(varList.indexOf(v)>=0)
                        {
                            varList.splice(varList.indexOf(v), 1);
                            if(solution[solnIndex].variables[v] == equationDetails[e][v])
                            {
                                //console.log(v+" value matches");
                                feedBackText += "<li>"+v+" value matches.</li>";
                            }
                            else
                            {
                                //console.log(v+" value does not match");
                                feedBackText += "<li>"+v+" value does not match.</li>";
                                solnResults.description.allVars = false;
                            }
                       }
                    }
                }
                feedBackText += "</ul>";
                if(varList.length==0)
                {
                    //console.log("All variables were correctly assigned.");
                    feedBackText += "<h4>All variables were correctly assigned.</h4>";
                }
                else
                {
                    //console.log("Not all variables were correctly assigned; the following were not used",varList);
                    feedBackText += "<h4>Not all variables were correctly assigned; the following were not used: "+varList+"</h4>";
                }

                // 3. Check if the answer is correct
                solnResults.decision = (solution[solnIndex].solution == globalSolutionBoxes[solnIndex]["solution"]);
                //console.log(solnResults.decision? "Final answer is correct": "Final answer is incorrect");
                console.log(solnResults);
                feedBackText += solnResults.decision? "<h2>Final answer is correct</h2>": "<h2>Final answer is incorrect</h2>";
                truthResults.push(solnResults);
            }

            // TODO: Weird exception error; not sure how.

            truthResults.push({decision:true, description:{}});
            
            var dec = true;
            console.log(truthResults);
            for(var i=0; i<truthResults.length; i++)
            {
                dec = dec && truthResults[i].decision;
            }
            console.log(dec);

            JSAV.utils.dialog(
                feedBackText,
                {closeText: "OK"}
            )

            return dec;
        }
    };
    
    function reset(exerciseId){
        // Clear the old JSAV canvas
        // if ($("#DeformsProblemPPRO")) { $("#DeformsProblemPPRO").empty(); }
        if ($("#"+exerciseId)) { $("#"+exerciseId).empty(); }
    
        //Setup the new display
        // av = new JSAV("DeformsProblemPPRO");
        av = new JSAV(exerciseId);
        // av = new JSAV("DeformsProblemPRO", { logEvent: function(eventData) {
        //     console.log(eventData);
        // }});
        Window.jsavObject = av;
        eqbank = new EquationBank(av, CANVAS_DIMENSIONS);
        
        wkspacelist = new WorkspaceList(av, CANVAS_DIMENSIONS, 
            eqbank, globalPointerReference);
        Window.windowManager = new WindowManager(av, CANVAS_DIMENSIONS, wkspacelist);
        Window.exerciseId = exerciseId;
        // Setting up clickhandlers for the equations in the EquationBank
        // OBSOLETE: MAY TRY TO FIX LATER, MOVING TO DISTRIBUTED APPROACH INSTEAD
        // for(var page in eqbank.equation_pages){
        //     for(var eqnNumber in eqbank.equation_pages[page]["equations"]){
        //         var eqn = eqbank.equation_pages[page]["equations"][eqnNumber];
        //         eqn["SelectableEquationObject"].element[0].click(e => {
        //             e.stopPropagation();
        //             console.log(page,eqnNumber);
        //         });
        //     }
        // }
            
        // Initialize other variables
        av.displayInit();
        av.recorded();
        mechSolverCommon.userInput = false;

        // $("body").on("jsav-log-event", function(event, eventData) {
        //     console.log(eventData);
        //     jsav.logEvent({type: "jsav-heap-decrement",
        //        newSize: bh.heapsize()});
        //   });
        
        // Setting up value boxes for those inside the question body
        var selectableParameters = document.getElementsByClassName("param");
        for (var index=0; index<selectableParameters.length; index++)
        {
            selectableParameters[index].addEventListener(
                "click", function() {
                    globalPointerReference.currentClickedObject = 
                    new ValueBox(
                        true,this,null,globalPointerReference
                        );
                    globalPointerReference.currentClickedObjectType = "value-box";
                    globalPointerReference.currentClickedObjectDescription = 
                    "in-question-description";
                    // console.log(
                    //     globalPointerReference.currentClickedObject.valueDisplay,
                    //     globalPointerReference.currentClickedObject.unitDisplay);
                }
            )
        }

        // Setting up solution boxes clickhandlers 
        var solutionSubmissionBoxes = document.getElementsByClassName("solution-box");
        for (var index=0; index<solutionSubmissionBoxes.length; index++)
        {
            globalSolutionBoxes[index] = {"solution":null};
            solutionSubmissionBoxes[index].dataset.index = index;
            solutionSubmissionBoxes[index].addEventListener(
                "click", function() {
                    // console.log(
                    //     globalPointerReference.currentClickedObject.valueDisplay,
                    //     globalPointerReference.currentClickedObject.unitDisplay);
                    if(globalPointerReference.currentClickedObjectType == "value-box")
                    {
                        this.innerHTML =
                        Number(Math.round(
                            globalPointerReference.currentClickedObject.value
                            +'e3')+'e-3'); 
                        globalSolutionBoxes[this.dataset.index] = {
                            "solution": 
                            Number(Math.round(globalPointerReference.currentClickedObject.value+'e3')+'e-3')
                        };
                    }
                }
            )
        }

        // Creating list of usable variables
        for(var i=0; i<26; i++)
        {
            for(var j=0; j<26; j++)
            {
                VARIABLE_ID_UNUSED.push(String.fromCharCode(97+i)+"_"+String.fromCharCode(97+j));
            }
        }
    }

    window.mechSolverCommon = window.mechSolverCommon || mechSolverCommon;
}());
