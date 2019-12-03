/*global window*/
(function() {
    "use strict";
    //var definitions
    var av; //The JSAV Object
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
        
        /* var wkl = document.createElement("div");
        wkl.setAttribute("id","WorkspaceList");
        var eqb = document.createElement("div")
        eqb.setAttribute("id","equationbox");
        document.getElementById("DeformsProblemPRO").appendChild(wkl);
        document.getElementById("DeformsProblemPRO").appendChild(eqb); */
        // document.getElementById("DeformsProblemPRO").childNodes[0].appendChild(wkl);
        // document.getElementById("DeformsProblemPRO").childNodes[0].appendChild(eqb);

        var eqbank = new EquationBank(av, CANVAS_DIMENSIONS);
        var wkspacelist = new WorkspaceList(av, CANVAS_DIMENSIONS)
            
        // Initialize other variables
        av.displayInit();
        av.recorded();
        deformsProblemPRO.userInput = false;

        $("body").on("jsav-log-event", function(event, eventData) {
            //console.log(eventData);
          });
    }

    window.deformsProblemPRO = window.deformsProblemPRO || deformsProblemPRO;
}());