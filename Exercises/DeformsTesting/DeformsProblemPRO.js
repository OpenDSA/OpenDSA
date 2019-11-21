/*global window*/
(function() {
    "use strict";
    //var definitions
    var av; //The JSAV Object
    const CANVAS_DIMENSIONS = {
        "TOTAL_WIDTH": 770,
        "TOTAL_HEIGHT": 1500,
        "WORKSPACE_LIST": {
            "X": 1,
            "Y": 1,
            "WIDTH": 511
        },
        "EQBANK": {
            "X": 515,
            "Y": 1,
            "WIDTH": 255
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
        var eqbank = new EquationBank(av, "equation_bank.js", CANVAS_DIMENSIONS);
        var wkspacelist = new WorkspaceList(av, CANVAS_DIMENSIONS)
            
        // Initialize other variables
        av.displayInit();
        av.recorded();
        deformsProblemPRO.userInput = false;
    }

    window.deformsProblemPRO = window.deformsProblemPRO || deformsProblemPRO;
}());