/*global window*/
(function() {
    "use strict";
    //var definitions
    var av; //The JSAV Object
    var eqbank;
    var wkspacelist;
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

        eqbank = new EquationBank(av, CANVAS_DIMENSIONS);
        wkspacelist = new WorkspaceList(av, CANVAS_DIMENSIONS, eqbank)

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
    }

    window.deformsProblemPRO = window.deformsProblemPRO || deformsProblemPRO;
}());