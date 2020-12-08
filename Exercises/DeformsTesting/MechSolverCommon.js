/*global window*/
requirejs(["./mathjs.js"], function(){});

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
            Window.jsavObject.logEvent({
                "type": "deforms-submit-answer-check",
                "desc": JSON.stringify(solnEventText)
            })
            
            var dec = true;
            console.log(truthResults);
            for(var i=0; i<truthResults.length; i++)
            {
                dec = dec && truthResults[i].decision;
            }
            console.log(dec);

            Window.showBlankPrompt = false;
            JSAV.utils.dialog( feedBackText, {closeText: "OK"} 
                )[0].querySelector("button").addEventListener("click", e=>{
                    e.stopPropagation();
                    Window.clearGlobalPointerReference();
                });
            return dec;
        }
    };

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
                var currentHeight = parseInt(window.parent.document.querySelector("iframe#"+exerciseId+"_iframe.embeddedExercise").height);
                // TODO:
                // 
                // in ODSAMOD.js, there is ltiIframeResize()
                // Also, there is an eventer() which receives postMessage() calls from the exercise
                // including, requests to resize the iframe container, which also resizes the
                // canvas page by calling ltiIframeResize() inside it.
                // 
                // TODO: replace this line by passing the resized page height to window.parent.postMessage()
                // 
                // 
                window.parent.document.querySelector("iframe#"+exerciseId+"_iframe.embeddedExercise").height = 
                    Math.max(minWindowHeight, currentHeight+shiftAmount) + "px";
            }
        else Window.updateExerciseWindowHeight = function() {} ;
        Window.eqbank = new EquationBank(av, CANVAS_DIMENSIONS);
        Window.wkspacelist = new WorkspaceList(av, CANVAS_DIMENSIONS, Window.eqbank, globalPointerReference);
        Window.windowManager = new WindowManager(av, CANVAS_DIMENSIONS, Window.wkspacelist);
        Window.exerciseId = exerciseId;
        Window.globalPointerReference = globalPointerReference;
            
        // Initialize other variables
        av.displayInit();
        av.recorded();
        mechSolverCommon.userInput = false;
        globalPointerReference.currentClickedObject = null;
        globalPointerReference.currentClickedObjectType = null;
        globalPointerReference.currentClickedObjectDescription = null;

        $("body").on("jsav-log-event", function(event, eventData) {
            // console.log(eventData);
            if(window.parent.ODSA != undefined)
	            window.parent.ODSA.UTILS.logUserAction(eventData.type,eventData.desc)
        });
        
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
            globalSolutionBoxes[index] = {"solution":null};
            solutionSubmissionBoxes[index].dataset.index = index;
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
                            globalSolutionBoxes[this.dataset.index] = {
                                "solution": 
                                Window.valueStringRepr(globalPointerReference.currentClickedObject.value),
                                "unit":
                                globalPointerReference.currentClickedObject.unit
                            };
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
                                globalSolutionBoxes[this.dataset.index] = {
                                    "solution": event.target.dataset.choice
                                }
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
                globalSolutionBoxes[this.dataset.index] = {"solution":null};
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
        let div_notifications = document.createElement("span");
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
        notifBody.style["max-height"] = "89%";
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
    }

    window.mechSolverCommon = window.mechSolverCommon || mechSolverCommon;
}());
