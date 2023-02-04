/*global window*/
requirejs(["./mathjs.js"], function(){});

// graphml( cytoscape, jquery ); // register extension

(function() {
    "use strict";
    //var definitions
    var av; //The JSAV Object
    var eqbank;
    var wkspacelist;

    /**
     * This variable is only used in the non-Canvas mode (on content server)
     * to switch between training a solution on the system and switching back
     * to test the system itself.
     * When enabled:
     * i)   it sends the path to the file where to store the solution
     *      (usually exerciseIDPPROmaster.json) inside "master_solution_path" option.
     * ii)  stores the JSON object for the whole solution in the master file
     * iii) if applicable, returns the minimal set of associated variables in 
     *      the system and the unknown names (\\latex_name) they're mapped to
     *      for variable mapping later on.
     * When disabled
     * i)   it sends the stored path to the master solution
     *      (usually exerciseIDPPROmaster.json) inside "master_solution_path" 
     *      option to load master solution.
     * ii)  also send the current solution attempt as a JSON object.
     * iii) if applicable, send the mapping of the associated variables/unknowns in attempt 
     *      to associated variables/unknowns in the master solution.
     * Generally, this should stay as false when used in Canvas,
     * Otherwise it can be true or false.
    */
    var trainingStatus = false;     // Setup for button occurs in line 446
    var master_vars = null;
    var varmap = {};

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
        "TOTAL_HEIGHT": 1000,
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
    var LTI_CANVAS_HEIGHT ; //This is only relevant when the exercise is served inside Canvas LMS - to prevent scrolling too much and to allow the content to fit.

    Window.showBlankPrompt = true;

    var mechSolverCommon = {

        //initializer, creates all the necessary object instances
        initJSAV: function(exerciseId, unitFamily, ltiCanvasHeight){
            // Creating one rectangle in the middle that allows scrolling through
            // the list of equations.
            Window.unitFamily = unitFamily; // Setting this here since resetting is not going to change this.
		    LTI_CANVAS_HEIGHT = ltiCanvasHeight;
            reset(exerciseId);
        },
        
        checkAnswer: function()
        {
            var feedBackText = "";
            // var equationDetails = {};
            // for (var wk in wkspacelist.workspace_list)
            // {
            //     for(var eq in wkspacelist.workspace_list[wk].LIST_OF_EQUATIONS_IN_WORKSPACE)
            //     {
            //         // creating entry for the equation
            //         var eqDetails = {};
            //         for(var v in wkspacelist.workspace_list[wk].LIST_OF_EQUATIONS_IN_WORKSPACE[eq].variables)
            //         {
            //             eqDetails[
            //                 wkspacelist.workspace_list[wk].LIST_OF_EQUATIONS_IN_WORKSPACE[eq].variables[v].name
            //             ] = wkspacelist.workspace_list[wk].LIST_OF_EQUATIONS_IN_WORKSPACE[eq].variables[v].value;
            //         }
                    
            //         equationDetails[
            //             wkspacelist.workspace_list[wk].LIST_OF_EQUATIONS_IN_WORKSPACE[eq].equationObjectReference.id
            //         ] = eqDetails;
            //     }
            // }
            //console.log(equationDetails);
            var truthResults = [];

            // Creating solution dump for logs
            let solnEventText = {};

            for(var solnIndex=0; solnIndex<Object.keys(globalSolutionBoxes).length; solnIndex++)
            {
                // feedBackText += "<h3>Question "+(solnIndex+1)+"</h3>";
                var solnResults = { decision:false, description:{} };

                // // 1. Check if all the equations are present
                // feedBackText += "<h4>Equations:</h4> <ul>";
                // solnResults.description.allEqn = true;
                // for(var e in solution[solnIndex].equations)
                // {
                //     if(!(solution[solnIndex].equations[e] in equationDetails))
                //     {
                //         solnResults.description.allEqn = false;
                //         solnResults.decision = false;
                //         //console.log(solution[solnIndex].equations[e]+" is a required equation that was not used.")
                //         feedBackText += "<li>"+solution[solnIndex].equations[e]+" is a required equation that was not used.</li>";
                //     }
                // }
                // feedBackText += "</ul>";
                // feedBackText += solnResults.decision? "<h4>All equations were chosen</h4>":"";

                // // 2. Check if all the variables are assigned properly with values
                // feedBackText += "<h4>Variable assignments:</h4> <ul>";
                // var varList = Object.keys(solution[solnIndex].variables);
                // solnResults.description.allVars = true;
                // for(var e in equationDetails)
                // {
                //     for(var v in equationDetails[e])
                //     {
                //         if(varList.indexOf(v)>=0)
                //         {
                //             varList.splice(varList.indexOf(v), 1);
                //             if(solution[solnIndex].variables[v] == equationDetails[e][v])
                //             {
                //                 //console.log(v+" value matches");
                //                 feedBackText += "<li>"+v+" value matches.</li>";
                //             }
                //             else
                //             {
                //                 //console.log(v+" value does not match");
                //                 feedBackText += "<li>"+v+" value does not match.</li>";
                //                 solnResults.description.allVars = false;
                //             }
                //        }
                //     }
                // }
                // feedBackText += "</ul>";
                // if(varList.length==0)
                // {
                //     //console.log("All variables were correctly assigned.");
                //     feedBackText += "<h4>All variables were correctly assigned.</h4>";
                // }
                // else
                // {
                //     //console.log("Not all variables were correctly assigned; the following were not used",varList);
                //     feedBackText += "<h4>Not all variables were correctly assigned; the following were not used: "+varList+"</h4>";
                // }

                // 3. Check if the answer is correct, enable this only for the time being.
                try {
                    if (solution[solnIndex].type == "string")
                    {
                        // Just compare strings
                        if(globalSolutionBoxes[solnIndex].solution == solution[solnIndex].solution)
                            solnResults.decision = true;
                        else
                            solnResults.decision = false;
                    }
                    else if(solution[solnIndex].type == "number")
                    {
                        if(solution[solnIndex].unit == "") var solutionComparableValue = globalSolutionBoxes[solnIndex].solution;
                        else var solutionComparableValue = mathjs.evaluate(
                                `number(
                                    ${globalSolutionBoxes[solnIndex].solution} ${globalSolutionBoxes[solnIndex].unit},
                                    ${solution[solnIndex].unit})`
                                )
                        console.log(solutionComparableValue, solution[solnIndex].solution);
                        console.log(Math.abs(solutionComparableValue - solution[solnIndex].solution), 0.005 * solution[solnIndex].solution)
                        if(Math.abs((solutionComparableValue - solution[solnIndex].solution) / solution[solnIndex].solution) <= 0.005)
                        {
                            solnResults.decision = true;
                        }
                        else solnResults.decision = false;
                        console.log(solnResults.decision);
                    }
                }
                catch (exception) {
                    solnResults.decision = false;
                }

                // DEPRECATED; DUMPING WHOLE WORKSPACE ATTEMPT NOW
                // BASICALLY SAME AS WHAT IS SENT TO THE SERVER FOR ANALYSIS
                solnEventText[solnIndex] = {
                    "solution": globalSolutionBoxes[solnIndex].solution+" "+globalSolutionBoxes[solnIndex].unit,
                    "decision": solnResults.decision
                }

                // solnResults.decision = 
                // (solution[solnIndex].solution == globalSolutionBoxes[solnIndex]["solution"]) && 
                // (solution[solnIndex].unit == globalSolutionBoxes[solnIndex]["unit"]);
                // console.log(solnResults.decision? "Final answer is correct": "Final answer is incorrect");
                console.log(solnResults);
                feedBackText += solnResults.decision? 
                "<h2>Q"+(solnIndex+1)+". Final answer is correct</h2>":
                "<h2>Q"+(solnIndex+1)+". Final answer is incorrect</h2>";
                truthResults.push(solnResults);
            }

            // TODO: Weird exception error; not sure how.

            // truthResults.push({decision:true, description:{}});
            // pushing event log
            
            // DEPRECATED; PUSHING WHOLE WORKSPACE DUMP FOR ANALYSIS
            // Window.jsavObject.logEvent({
            //     "type": "deforms-submit-answer-check",
            //     "desc": JSON.stringify(solnEventText)
            // })

            Window.jsavObject.logEvent({
                "type": "deforms-submit-answer-check",
                "desc": JSON.stringify(
                    {
                        "master_solution_path": 
                            // solution['master_solution_path'],
                            `./Exercises/DeformsTesting/${Window.jsavObject.id()}master.json`,
                        "attempt": Window.getAttemptSummaryComplete(false)
                    }
                )
            })
            
            var dec = true;
            console.log(truthResults);
            for(var i=0; i<truthResults.length; i++)
            {
                dec = dec && truthResults[i].decision;
            }
            console.log(dec);

            // Record unique marker events for success or failure 
            // to avoid having to join tables later
            if(dec == true)
                Window.jsavObject.logEvent({
                    "type": "deforms-submit-answer-correct",
                    "desc": "correct answer submitted"
                })
            else
                Window.jsavObject.logEvent({
                    "type": "deforms-submit-answer-incorrect",
                    "desc": "incorrect answer submitted, check description for related event"
                })
            
            // Regardless of success or failure, 
            // push out the events to the server when the button is clicked
            // Moved to after we hear back from the server
            // if(window.parent.ODSA != undefined)
	        //     window.parent.ODSA.UTILS.sendEventData()
            
            /**
             * Creating variable mapper for situations where that is expected.
             */
            
            feedBackText = "" // To remove later when cleaning up
            
            var launch_loadingbox = function() {
                var loadingBox = JSAV.utils.dialog(
                    `<p class="a2" style="float: center; ">
                    <img src="MechSolver/gifs/loading.gif" 
                    style="padding-left:10px; border:1px; width: 90%;"
                    alt="Analysing solution">
                    </p>`, {modal: false, height:200, width:200}
                )

                loadingBox[0].addEventListener("get_feedback", e=>{
                    e.stopPropagation();
                    
                    // Trying to download full solution
                    // Window.getAttemptSummaryComplete();
                    // console.log("Downloading full solution attempt")
    
                    // Down the line, 
                    // create an API call to the endpoint api/deforms_feedback which returns a JSON string
                    // with the feedback, and then create a 
                    // create a view/controller that receives this information
                    // and prints it to the screen/processes it
    
                    console.log("get_feedback was generated")
                    var data;
                    if(trainingStatus == false) 
                    {
                        data = {
                            "mode": "analyze",
                            "master_solution_path": 
                                // solution['master_solution_path'],
                                `./Exercises/DeformsTesting/${Window.jsavObject.id()}master.json`,
                            "attempt": Window.getAttemptSummaryComplete(false)
                        }
    
                        if (master_vars !== null) 
                        {
                            let flag = true;
                            for(v in varmap)
                            {
                                if(v == "")
                                {
                                    alert("One or more variables have not been mapped. Please check your mapping again.");
                                    flag = false;
                                    break;
                                }
                            }
                            if (flag) data["varmap"] = varmap;
                            else
                            {
                                data="";
                                loadingBox.close();
                            }
                        }
    
                    }
                    else if (trainingStatus == true) 
                    {
                        data = {
                            "mode": "training",
                            "master_solution_path": 
                                `./Exercises/DeformsTesting/${Window.jsavObject.id()}master.json`,
                            "master_solution": Window.getAttemptSummaryComplete(false)
                        };
                    }
                    
                    if (data != "") // So something is being sent back for feedback
                    {
                        var settings = {
                            // "url": "https://opendsa.localhost.devcom.vt.edu/api/deformsfeedback/",
                            "url": "https://deforms.localhost.devcom.vt.edu/deforms/api/deformsfeedback/",
                            // "url": "https://opendsa-server.cs.vt.edu/deforms/api/deformsfeedback/",
                            "method": "POST",
                            // "async": false,
                            "timeout": 0,
                            "headers": {
                                "Content-Type": "application/json"
                            },
                            "data": JSON.stringify(data, null, 4),
                        };
                        
                        $.ajax(settings).done(function (response) {
                            console.log(response);
                            loadingBox.close();
                            showErrors(response["stdout_compressed"].split("\n"));

                            // Record submit responses as event
                            Window.jsavObject.logEvent({
                                "type": "deforms-submit-answer-response",
                                "desc": JSON.stringify(
                                    {
                                        "master_solution_path": 
                                            // solution['master_solution_path'],
                                            `./Exercises/DeformsTesting/${Window.jsavObject.id()}master.json`,
                                        "response": response
                                    }
                                )
                            })
                            
                            // Send back all events on clicking "Check Answer", register events
                            if(window.parent.ODSA != undefined)
	                            window.parent.ODSA.UTILS.sendEventData()
                        });
                    }
                });
                loadingBox[0].dispatchEvent(new Event('get_feedback'));
            }

            if (master_vars != null)
            {
                // If the master_vars variable exists
                var list_associations = {}
                for(var v in Window.wkspacelist.workspace_list){
                    for(var eq in Window.wkspacelist.workspace_list[v].LIST_OF_EQUATIONS_IN_WORKSPACE){
                        for(var varbox in Window.wkspacelist.workspace_list[v].LIST_OF_EQUATIONS_IN_WORKSPACE[eq].variables)
                        {
                            var variable = Window.wkspacelist.workspace_list[v].LIST_OF_EQUATIONS_IN_WORKSPACE[eq].variables[varbox]
                            if(variable.valueType == "association")
                            {
                                list_associations[variable.value.var] = variable.value.varDisplay
                            }
                            else if(variable.valueType == null)
                            {
                                list_associations[variable.currentSymbol] = variable.parentSymbol
                            }
                        }
                    }
                }

                // Creating the list of options, creating the select elements for each variable, and adding the list.
                // Then, setting up the listeners for those elements.
                // To remove later

                var var_options = '<option value="">--Select--</option>';
                for(var v in list_associations){
                    var_options += '<option value="'+v+'">'+list_associations[v]+'</option>'
                }
                feedBackText = feedBackText + "<p>We found the following variables in your work. Please associate them to variables expected by the problem.<\p><p>";
                for(var v in master_vars){
                    feedBackText = feedBackText + '<p>' + master_vars[v] + " := " + 
                    '<select data-mastervar="'+v+'" >'+var_options+'</select></p>'
                }
                
                Window.showBlankPrompt = false;

                var dialogBoxResults = JSAV.utils.dialog( feedBackText+
                    // '<button id="checkAnswerSummaryDownload">Download attempt summary (JSON)</button>',
                    '<button id="registerVarmap">Mapping done, get feedback</button>',
                    {closeText: "Go back"} 
                    );
                
                dialogBoxResults[0].querySelectorAll('[data-mastervar]').forEach(
                    function(selectList){
                        selectList.addEventListener("click",
                            e=> {
                                Window.showBlankPrompt = false;
                                e.stopPropagation();
                                Window.clearGlobalPointerReference();
                            }
                        );
                        
                        selectList.addEventListener("change",
                            e=> {
                                Window.showBlankPrompt = false;
                                e.stopPropagation();
                                delete varmap[""]
                                varmap[e.target.value] = e.target.dataset.mastervar
                                Window.clearGlobalPointerReference();
                            }
                        );
                        selectList.dispatchEvent(new Event("change"));
                    }
                )
                
                // For the registerVarmap button
                dialogBoxResults[0].querySelector("#registerVarmap").addEventListener("click", e=>{
                    e.stopPropagation();
                    Window.clearGlobalPointerReference();
                    dialogBoxResults.close();

                    launch_loadingbox();
                });

                dialogBoxResults[0].querySelectorAll("button")[1].addEventListener("click", e=>{
                        e.stopPropagation();
                        Window.clearGlobalPointerReference();
                        varmap = {};
                    });
            }
            else
            {
                launch_loadingbox();
            }
            /**DEPRECATED: Move all the graph processing functionality to Python processed through API calls
            only generate summaries of JSON data in the front end and show interactive feedback.

            if(ANALYZER_OPTIONS.ENABLE_LIST_DOWNLOAD == true) {
                // dialogBoxResults[0].innerHTML += '<button id="listDownload">Download List Description of solution</button>';
                dialogBoxResults[0].querySelector("#listDownload").addEventListener("click", e=>{
                    e.stopPropagation();
                    Window.getListAnswer()
                    console.log("List button clicked")
                });
            }
            if(ANALYZER_OPTIONS.ENABLE_GRAPH_DOWNLOAD == true) {
                // dialogBoxResults[0].innerHTML += '<button id="graphDownload">Download Graph Description of solution</button>';
                dialogBoxResults[0].querySelector("#graphDownload").addEventListener("click", e=>{
                    e.stopPropagation();
                    dialogBoxResults.close();    // TEMP ONLY
                    Window.getGraphAnswer()
                    console.log("Graph button clicked")
                });
            }
            */

            // dialogBoxResults[0].querySelector("#checkAnswerSummaryDownload").addEventListener("click", e=>{
            
            // Sending results over API call to the feedback engine script
            
            if (trainingStatus == true || window.parent.ODSA == undefined) { return false }
            else return dec;
        }
    };

    function showErrors(responseText)
    {

        var parent = document.querySelector("#notifications")
        parent.textContent = "";
        // showErrorLocation defined here
        var showErrorLocation = function(event) 
        { 
            event.stopPropagation(); 
            // console.log(event.target.dataset);

            if(event.target.classList.contains("notiferrorelement"))
            {
                // We don't call it here, because no matter where we click
                // either i) we click on error element or ii) somewhere else,
                // the error element needs to be cleared out, along with anything else
                // it is highlighting. Easiest method is: have cGPR() invoke
                // "click" event on this error element if it was the last thing clicked on,
                // and handle it here.

                event.target.classList.remove("notiferrorelement");
                if(event.target.dataset.type == "box" || event.target.dataset.type == "eq" )
                {
                    // console.log(document.querySelectorAll(`[id = '${event.target.dataset.item}']`))
                    document.querySelectorAll(`[id = '${event.target.dataset.item}']`).forEach(
                        function(box) { box.classList.remove("notiferrorelement") }
                    )
                }
                if(event.target.dataset.type == "var-assoc")
                {
                    // console.log(document.querySelectorAll(`[data-association = '${event.target.dataset.item}']`))
                    document.querySelectorAll(`[data-association = '${event.target.dataset.item}']`).forEach(
                        function(box) { box.classList.remove("notiferrorelement") }
                    )
                }
                if(event.target.dataset.type == "var-single")
                {
                    // console.log(document.querySelectorAll(`[data-csymbol = '${event.target.dataset.item}']`))
                    document.querySelectorAll(`[data-csymbol = '${event.target.dataset.item}']`).forEach(
                        function(box) { box.classList.remove("notiferrorelement") }
                    )
                }
                if(event.target.dataset.type == "pallette-eq")
                {
                    /**
                     * Requires: name of palette page (page), name of equation (item)
                     * Selects only the first one, doesn't resolve conflict between
                     * intended equation and one appearing on Favourites, but assumes FCFS.
                     */
                    // Not showing page here, since not necessary. Could be anywhere in any context,
                    // clicking should just un-highlight this.
                    document.querySelector(`[data-id = '${event.target.dataset.item}']`).classList.remove("notiferrorelement")
                }

                // safeguard to ensure context is cleared
                Window.globalPointerReference.currentClickedObject = null;
                Window.globalPointerReference.currentClickedObjectType = null;
                Window.globalPointerReference.currentClickedObjectDescription = null;
            }
            else
            {
                // Call this because something else may have been clicked on before clicking on the
                // element in notifications.
                Window.clearGlobalPointerReference();
                Window.showBlankPrompt = false;

                Window.globalPointerReference.currentClickedObject = event.target;
                Window.globalPointerReference.currentClickedObjectType = "notif-feedback-pointer";
                Window.globalPointerReference.currentClickedObjectDescription = null;

                // Don't automatically remove it on clicking elsewhere.
                // Keep this persistent.
                event.target.classList.add("notiferrorelement");
                if(event.target.dataset.type == "box" || event.target.dataset.type == "eq" )
                {
                    document.querySelectorAll(`[id = '${event.target.dataset.item}']`).forEach(
                        function(box) { box.classList.add("notiferrorelement") }
                    )
                }
                if(event.target.dataset.type == "var-assoc")
                {
                    // console.log(document.querySelectorAll(`[data-association = '${event.target.dataset.item}']`))
                    document.querySelectorAll(`[data-association = '${event.target.dataset.item}']`).forEach(
                        function(box) { box.classList.add("notiferrorelement") }
                    )
                }
                if(event.target.dataset.type == "var-single")
                {
                    // console.log(document.querySelectorAll(`[data-csymbol = '${event.target.dataset.item}']`))
                    document.querySelectorAll(`[data-csymbol = '${event.target.dataset.item}']`).forEach(
                        function(box) { box.classList.add("notiferrorelement") }
                    )
                }
                if(event.target.dataset.type == "pallette-eq")
                {
                    /**
                     * Requires: name of palette page (page), name of equation (item)
                     * Selects only the first one, doesn't resolve conflict between
                     * intended equation and one appearing on Favourites, but assumes FCFS.
                     */
                    let paletteTitle = document.querySelector('#equationPageTitle')
                    paletteTitle.value = event.target.dataset.page
                    paletteTitle.dispatchEvent(new Event("change"))
                    
                    document.querySelector(`[data-id = '${event.target.dataset.item}']`).classList.add("notiferrorelement")
                }
            }
        }

        for(var fti=0; fti<responseText.length; fti++){
            var feedback_text = document.createElement("div")
            feedback_text.classList.add("notifelement")
            feedback_text.innerHTML = responseText[fti]
            parent.appendChild(feedback_text)

            document.querySelector("#notifications")
            .querySelectorAll("[data-type]")
            .forEach(function(errorElement){errorElement.addEventListener("click", showErrorLocation)});
        }
    }


    function bodyClickPrompt(e) {
        // Creating clickhandlers associated with the body to clear the globalPointerReference
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
        if(window.parent.document.querySelector("iframe#"+exerciseId+"_iframe")!=null)
            Window.updateExerciseWindowHeight = function(shiftAmount) {	
                var minWindowHeight = LTI_CANVAS_HEIGHT;
                var currentHeight = parseInt(
                    window.parent.document.querySelector("iframe#"+exerciseId+"_iframe.embeddedExercise")
                    .height
                    );
                // IMPORTANT: Removing this line for some reason doesn't let the canvas area increase, so keep this.
                window.parent.document.querySelector("iframe#"+exerciseId+"_iframe.embeddedExercise").height = 
                    Math.max(minWindowHeight, currentHeight+shiftAmount) + "px";
                // 
                // in ODSAMOD.js, there is ltiIframeResize()
                // Also, there is an eventer() which receives postMessage() calls from the exercise
                // including, requests to resize the iframe container, which also resizes the
                // canvas page by calling ltiIframeResize() inside it.
                
                // DEBUG
                // console.log(window.parent);
                
                window.parent.postMessage({
                    type: "resize-iframe",
                    exerName: exerciseId,
                    width: 970,
                    height: Math.max(minWindowHeight, currentHeight+shiftAmount)
                }, '*');

                // TODO: $('.content') can be addressed to change height
            }
        else Window.updateExerciseWindowHeight = function(shiftAmount) {} ;
        Window.eqbank = new EquationBank(av, CANVAS_DIMENSIONS);
        Window.wkspacelist = new WorkspaceList(av, CANVAS_DIMENSIONS, Window.eqbank, globalPointerReference);
        Window.windowManager = new WindowManager(av, CANVAS_DIMENSIONS, Window.wkspacelist);
        Window.exerciseId = exerciseId;
        Window.globalPointerReference = globalPointerReference;
        Window.globalSolutionBoxes = globalSolutionBoxes;
        
        // Initialize other variables
        av.displayInit();
        av.recorded();
        mechSolverCommon.userInput = false;
        globalPointerReference.currentClickedObject = null;
        globalPointerReference.currentClickedObjectType = null;
        globalPointerReference.currentClickedObjectDescription = null;
        
        // Loading the varmap by sending a request;
        // If we are training the system, we don't need to get a defined varmap.
        // Otherwise, we must get a varmap back for n-n problems, or nothing for 1-1 problems.
        // master_vars is guaranteed to be null if in training mode (i.e. true), 
        // otherwise it depends on what is stored in the solution (for false).
        if (trainingStatus == false)
        {
            // Also done in trainingStatus switching; move to a separate function when possible.
            var data = {
                "master_solution_path": 
                    `./Exercises/DeformsTesting/${Window.jsavObject.id()}master.json`,
                "mode": "init"
            }
            var settings = {
                // "url": "https://opendsa.localhost.devcom.vt.edu/api/deformsfeedback/",
                "url": "https://deforms.localhost.devcom.vt.edu/deforms/api/deformsfeedback/",
                // "url": "https://opendsa-server.cs.vt.edu/deforms/api/deformsfeedback/",
                "async": false,
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify(data, null, 4),
              };
              
            $.ajax(settings).done(function (response) {
                master_vars = JSON.parse(response["stdout_compressed"])
                console.log(`Logging master_vars, fetched at startup; is null?: ${master_vars == null}`)
                console.log(master_vars)
            })
        }
        // else master_vars = null; // We will generate and store this.
        
        // TODO: Work on this to update this with
        // 1. Schedule event flushing to server immediately when attempt is submitted
        // 2. Setup calls to event logger without context from HTML files.
        $("body").on("jsav-log-event", function(event, eventData) {
            // console.log(eventData);
            if(window.parent.ODSA != undefined)
	            window.parent.ODSA.UTILS.logUserAction(eventData.type,eventData.desc)
        });
        
        // Setting up the button for training mode, if not inside Canvas.
        if(window.parent.ODSA == undefined)
        {
            var trainingModeButtonText = Window.jsavObject.label("", 
            {
                left: Window.wkspacelist.DIMENSIONS["UPPER_CORNER_X"]
                     +Window.wkspacelist.DIMENSIONS["WIDTH"]-150, 
                top:  Window.wkspacelist.DIMENSIONS["UPPER_CORNER_Y"]-12
            })
            .addClass("addworkspace");
            
            var trainingModeButton = document.createElement("input");
            trainingModeButton.setAttribute("type", "button");
            trainingModeButton.setAttribute("id", "trainingModeButton");
            // this.trainingModeButton.setAttribute("value", "Download Solution Attempt");
            trainingModeButtonText.element[0].appendChild(trainingModeButton);
            trainingModeButton.setAttribute("title", "Toggle training mode");
            trainingModeButton.setAttribute("value", "Training: OFF");  // Since state is false at start
            
            // this.addbutton.element[0].addEventListener('click', e => {
            trainingModeButton.addEventListener("click", e=> {
                // e.stopPropagation();
                e.stopImmediatePropagation();
                if(trainingStatus == false)
                {
                    // was false, becomes true
                    trainingStatus = true;
                    trainingModeButton.setAttribute("value", "Training: ON");
                }
                else if(trainingStatus == true)
                {
                    // was true, becomes false
                    trainingStatus = false;
                    trainingModeButton.setAttribute("value", "Training: OFF");
                    
                    // Just in case we've finished training, and want to verify our answer
                    // loads the varmap in as soon as training stops for verification.
                    // Change to a listener that listens for changes on only this variable
                    // Or listens for the init event for API call only.
                    var data = JSON.stringify({
                        "master_solution_path": 
                            `./Exercises/DeformsTesting/${Window.jsavObject.id()}master.json`,
                        "mode": "init"
                    })
                    var settings = {
                        // "url": "https://opendsa.localhost.devcom.vt.edu/api/deformsfeedback/",
                        "url": "https://deforms.localhost.devcom.vt.edu/deforms/api/deformsfeedback/",
                        // "url": "https://opendsa-server.cs.vt.edu/deforms/api/deformsfeedback/",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                          "Content-Type": "application/json"
                        },
                        "data": data,
                      };
                      
                    $.ajax(settings).done(function (response) {
                        master_vars = JSON.parse(response["stdout_compressed"])
                        console.log(`Logging master_vars, fetched at startup; is null?: ${master_vars == null}`)
                        console.log(master_vars)
                    })
                }
            });
        }

        // Setting up value boxes for those inside the question body
        var selectableParameters = document.getElementsByClassName("param");
        for (let index=0; index<selectableParameters.length; index++)
        {
            selectableParameters[index].addEventListener(
                "click", function() {
                    event.stopPropagation();
                    Window.clearGlobalPointerReference();
                    Window.showBlankPrompt = false;
                    
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
                    globalPointerReference.currentClickedObject.element.classList.add("selectedvalue");
                    av.logEvent({
                        type: "deforms-body-value-click",
                        desc: globalPointerReference.currentClickedObject.element.dataset.value+" "+globalPointerReference.currentClickedObject.element.dataset.unit,
                    });
                }
            )

            // Setting up tooltip for guidance
            selectableParameters[index].setAttribute("title", "Click to select value");
        }

        // Setting up solution boxes clickhandlers 
        var solutionSubmissionBoxes = document.getElementsByClassName("solution-box");
        for (let index=0; index<solutionSubmissionBoxes.length; index++)
        {
            globalSolutionBoxes[index] = {
                "solution":null,
                "type": solutionSubmissionBoxes[index].dataset.inputtype
            };
            solutionSubmissionBoxes[index].dataset.index = index;
            solutionSubmissionBoxes[index].dataset.source = '';
            
            var helpbox = document.createElement("span");
            solutionSubmissionBoxes[index].after(helpbox);
            helpbox.classList.add("helpbutton");
            helpbox.innerHTML = "&#xFFFD";
            helpbox.setAttribute("title","Click to get help");
            helpbox.addEventListener("click", e=> {
                e.stopPropagation();
                Window.showHelp("submissionBox", e);
            })

            // console.log(solutionSubmissionBoxes[index]);

            // Filling in data
            if(solutionSubmissionBoxes[index].dataset.inputtype=="number") {
                solutionSubmissionBoxes[index].setAttribute("title", "Click on your solved value in the workspace, then click here to add it");
                solutionSubmissionBoxes[index].addEventListener(
                    // "click", e=> {
                    "click", function() {
                        // console.log(
                        //     globalPointerReference.currentClickedObject.valueDisplay,
                        //     globalPointerReference.currentClickedObject.unitDisplay);
                        // e.stopPropagation();
                        event.stopPropagation();
                        console.log(this);
                        if(globalPointerReference.currentClickedObjectType == "value-box")
                        {
                            this.innerHTML =
                            Window.valueStringRepr(globalPointerReference.currentClickedObject.value)+" "+
                                globalPointerReference.currentClickedObject.unitDisplay;

                            globalSolutionBoxes[this.dataset.index].solution =  
                                Window.valueStringRepr(globalPointerReference.currentClickedObject.value);
                            globalSolutionBoxes[this.dataset.index].unit = 
                                globalPointerReference.currentClickedObject.unit,
                                // Setting the unknown/assoc name that calculated this answer
                            globalSolutionBoxes[this.dataset.index].source =
                                globalPointerReference.currentClickedObject.valueSourceParent
                            //console.log(this.globalPointerReference);
                        }
                        Window.clearGlobalPointerReference();
                        // globalPointerReference.currentClickedObject = null;
                        // globalPointerReference.currentClickedObjectType = null;
                        // globalPointerReference.currentClickedObjectDescription = null
                    }, false
                )
            }
            else if(solutionSubmissionBoxes[index].dataset.inputtype=="text") {
                solutionSubmissionBoxes[index].addEventListener(
                    // "click", e=> {
                    "click", function() {
                        event.stopPropagation();
                        console.log(this);
                        Window.clearGlobalPointerReference();

                        // Add functionality to type in value, compare as a string
                        // additional functionality
                        // Alternatively, drop-down list of options
                    }, false
                )
            }
            else if(solutionSubmissionBoxes[index].dataset.inputtype=="choices") {
                solutionSubmissionBoxes[index].setAttribute("title", "Click to show possible answer choices");
                solutionSubmissionBoxes[index].addEventListener(
                    // "click", e=> {
                    "click", function() {
                        event.stopPropagation();
                        console.log(this);
                        
                        var choicesText = this.dataset.choices.split(",");
                        var choicelistHTML = "<ul>";
                        for(var choiceId=0; choiceId<choicesText.length; choiceId++)
                            choicelistHTML+='<li data-choice="'+choicesText[choiceId]+'">'+choicesText[choiceId]+"</li>";
                        choicelistHTML+="</ul>";
                        var choiceBox = JSAV.utils.dialog(choicelistHTML, {width: 100});
                        choiceBox[0].style.top = event.pageY+5+"px";
                        choiceBox[0].style.left = event.pageX+10+"px";

                        Window.showBlankPrompt = false;
                        choiceBox[0].childNodes[0].childNodes.forEach(x => {
                            x.addEventListener("click", e=> {
                                e.stopPropagation();
                                // console.log(event.target.parentNode.parentNode)
                                this.innerHTML = event.target.dataset.choice;
                                globalSolutionBoxes[this.dataset.index].solution = event.target.dataset.choice;
                                choiceBox.close();
                                Window.clearGlobalPointerReference();
                            })
                        });
                    }, false
                )
            }

            // Deleting answers/clearing data from solution boxes
            solutionSubmissionBoxes[index].dataset.index = index;
            
            var delcross = document.createElement("span")
            solutionSubmissionBoxes[index].after(delcross);
            delcross.classList.add("helpbutton");
            delcross.innerHTML = "&#x2702";
            delcross.setAttribute("title","Click to get help");
            delcross.dataset.index = index;
            delcross.addEventListener("click", function() {
                event.stopPropagation();
                console.log(this);
                solutionSubmissionBoxes[this.dataset.index].innerHTML = "";
                solutionSubmissionBoxes[this.dataset.index].dataset.source = '';
                globalSolutionBoxes[this.dataset.index] = {
                    "solution": null,
                    "type": globalSolutionBoxes[this.dataset.index]["type"]
                }
            });
        }

        // Creating list of usable variables
        for (let i=0; i<26; i++)
        {
            for(let j=0; j<26; j++)
            {
                VARIABLE_ID_UNUSED.push(String.fromCharCode(97+i)+"_"+String.fromCharCode(97+j));
            }
        }

        // Once everything is done, popup the help text once, and the next couple of times it can be
        // loaded from the (?) button probably located on the side
        // var questionSign = Window.jsavObject.label("?",
        //     {
        //         top: 1,
        //         right: 20
        //     }
        // ).addClass("equationPageTitle");
        // questionSign.element[0].addEventListener("click", e => { e.stopPropagation(); Window.showHelp("general") } );
        
        // This loads the general help menu; for now, work is delegated to Intro.js
        // Window.showHelp("general");
        // Window.tutorialSteps();
        
        
	    // console.log(window.parent.document.querySelector("iframe#"+exerciseId+"_iframe.embeddedExercise").height)
        
        // Adding a notifications div with scrollable part
        // let div_notifications = document.createElement("span");
        let div_notifications = document.createElement("div");
        div_notifications.setAttribute("id", "notifications-container");
        // div_notifications.style["overflow-y"] = "auto";
        div_notifications.classList.add("notification");
        
        let notifHead = document.createElement("div");
        notifHead.style["max-height"] = "10%";
        notifHead.innerHTML = "<h2 style='display: inline-block; padding-left: 10px; padding-right: 10px'>Notifications</h2>";
        notifHead.style["border-bottom"] = "2px solid black";
        div_notifications.appendChild(notifHead);

        // optional button to show all the errors at once if so desired.
        // let showAllErrorButton = document.createElement("input");
        // showAllErrorButton.setAttribute("type", "button");
        // showAllErrorButton.setAttribute("value", "show all errors");
        // notifHead.appendChild(showAllErrorButton);
        
        let notifBody = document.createElement("div");
        notifBody.style["max-height"] = "95%";
        notifBody.style["overflow-y"] = "auto";
        notifBody.setAttribute("id", "notifications");
        div_notifications.appendChild(notifBody);

        // DEBUG: adding sample notifications
        // use divs with notifelement class
        // for (let i=0; i<20; i++)
        // {
        //     let newelem = document.createElement("div")
        //     newelem.innerHTML= "Notification";
        //     newelem.classList.add('notifelement')
        //     notifBody.appendChild(newelem);
        // }
        
        // document.getElementById("DeformsSimpleProblemPPROp").insertBefore(
        document.getElementById(exerciseId+"p").insertBefore(
            div_notifications,
            // document.getElementById("DeformsSimpleProblemPPRO")
            document.getElementById(exerciseId)
            );
        
        // Body Clicks registered as directive message was included here, now delegated to utils.
        document.body.removeEventListener("click", bodyClickPrompt);
        document.body.addEventListener("click", bodyClickPrompt);

        // Creating first blank workspace for everything
        Window.wkspacelist.addNewWorkspace();
    }

    window.mechSolverCommon = window.mechSolverCommon || mechSolverCommon;
}());
