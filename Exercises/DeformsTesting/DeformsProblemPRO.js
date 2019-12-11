/*global window*/
(function() {
    "use strict";
    //var definitions
    var av; //The JSAV Object
    var eqbank;
    var wkspacelist;
    var globalPointerReference = 
    // This is a hacky way to keep track of what was just clicked on in the question,
    // specifically for association clicking events. Needless to be said, this is only required
    // for pointing to the source of an association, and handling it. Any clickhandlers working
    // with association tasks will receive a pointer to this object, and work with it.
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

    var deformsProblemPRO = {

        //initializer, creates all the necessary object instances
        initJSAV: function(){
            // Creating one rectangle in the middle that allows scrolling through
            // the list of equations.
            reset();
        }
        
    };

    function reset(){
        // Clear the old JSAV canvas
        if ($("#DeformsProblemPRO")) { $("#DeformsProblemPRO").empty(); }
    
        //Setup the new display
        av = new JSAV("DeformsProblemPRO");
        eqbank = new EquationBank(av, CANVAS_DIMENSIONS);
        wkspacelist = new WorkspaceList(av, CANVAS_DIMENSIONS, eqbank, globalPointerReference)

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
        deformsProblemPRO.userInput = false;

        $("body").on("jsav-log-event", function(event, eventData) {
            //console.log(eventData);
          });
        
        // Setting up value boxes for those inside the question body
        var selectableParameters = document.getElementsByClassName("param");
        for (var index=0; index<selectableParameters.length; index++)
        {
            selectableParameters[index].addEventListener(
                "click", function() {
                    globalPointerReference.currentClickedObject = new ValueBox(true,this,null,globalPointerReference);
                    globalPointerReference.currentClickedObjectType = "value-box";
                    globalPointerReference.currentClickedObjectDescription = 
                    "in-question-description";
                    //console.log(globalPointerReference.currentClickedObject.valueDisplay, globalPointerReference.currentClickedObject.unitDisplay);
                }
            )
        }

        // Setting up solution boxes clickhandlers 

    }

    window.deformsProblemPRO = window.deformsProblemPRO || deformsProblemPRO;
}());