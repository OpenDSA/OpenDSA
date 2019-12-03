(function(){
  "use strict";
  var av,     //The JSAV Object
      others=[],
      jsavEqSet=null,
      jsavWkspace=null,
      equationsSet=[
        {
          eqnText:"Remove\\;\\;Equation",
          eqnVars:[]
        },
        {
          eqnText:"c=a+b",
          eqnVars:["a","b","c"]
        },
        {
          eqnText:"c=a-b",
          eqnVars:["a","b","c"]
        },
        {
          eqnText:"c=a*b",
          eqnVars:["a","b","c"]
        },
        {
          eqnText:"c=\\frac{a}{b}",
          eqnVars:["a","b","c"]
        },
      ],
      equationsTextSet = [],
      promptObject = {
        eqnText:"Add\\;\\;a\\;\\;new\\;\\;equation",
        eqnVars:[]
      },
      currentEqnSet = [],
      currentEqnSetText = [];
      // This is set and modified by the clickHandler function and helpers.
  
  var WINDOW_TOP = "20px";  //Top position of the elements, in pixels; shared

  var clickSource = {
        index:-1,
        jsavObject: null,
        arrObject: null
      };
      // For any assignment of values, this is the 
      // set of variables looking at where to
      // send things to and from.
  
  var eqnSolverPRO = {
    userInput: null,

    // function that initiates the JSAV library
    initJSAV: function(equationsList, parameterList) {
      // Insert initializers

      // Add code for initialization, possibly solving the whole problem 
      // for a given situation;
      // and storing the answer into the designated answer parameter.
      var i=0;
      while(i<equationsList.length){
        equationsSet[i+4] = equationsList[i]; i++;
      }
      for(i=0;i<equationsSet.length;i++){
        equationsTextSet[i] = katex.renderToString(equationsSet[i].eqnText);
      }
      
      reset();
      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
      $("#solve").click(function() { evaluate(); });
    },

    checkAnswer: function() {
      // Something to check the answer, possibly evaluates the given 
      // expression and matches the answers
    }
  };

  function evaluate(){
    // This function actually uses the mathjs, nerdamer libraries for evaluation
    // NOTE: Add a new function for checking units.

    for(i=0; i<currentEqnSet.length-1; i++){
      console.log(currentEqnSet[i].eqnVars);
    }
  }

  // Handle atleast one type of click event
  function clickHandler(object, index){
    // Something Something Blaaarg
    if(clickSource.index<0){
      if (object == jsavEqSet && index > 0) {
        //To add condition for variable set
        object.highlight(index);
        clickSource = {
          index: index,
          jsavObject: object,
          arrObject: equationsSet
        };
      }
      else if (object == jsavWkspace) {
        //To add condition for variable set
        object.highlight(index);
        clickSource = {
          index: index,
          jsavObject: object,
          arrObject: currentEqnSet
        };
      }
    } else if (object == jsavWkspace && clickSource.jsavObject == jsavEqSet) {
      //To add condition for variable set
      
      if (index < currentEqnSet.length-1){
        object.value(index, clickSource.jsavObject.value(clickSource.index));
        currentEqnSet[index] = clickSource.arrObject[clickSource.index]
      }
      else { expandEqnWorkSpace(clickSource.arrObject[clickSource.index]); }
      
      clickSource.jsavObject.unhighlight(clickSource.index)
      clickSource = {
        index: -1,
        jsavObject: null,
        arrObject: null
      };
    } else if (index == 0 && 
      object==jsavEqSet && 
      clickSource.jsavObject == jsavWkspace &&
      clickSource.index < clickSource.arrObject.length-1
      ) {
      // Pointing to the removal option for equations, and the index is the
      // removal index from the WkSpace.
      shrinkEqnWorkSpace(clickSource.index);
      clickSource = {
        index: -1,
        jsavObject: null,
        arrObject: null
      }
    } else {
      clickSource.jsavObject.unhighlight(clickSource.index)
      clickSource = {
        index: -1,
        jsavObject: null,
        arrObject: null
      } 
    }
    ;

    eqnSolverPRO.userInput = true;
  }

  function createEqnWorkSpace(){
    if (jsavWkspace !== null) {jsavWkspace.clear()}
    jsavWkspace = av.ds.array(
      currentEqnSetText, 
      {
        indexed: false,
        center: false,
        layout: "vertical",
        left:180,
        top: WINDOW_TOP
      })
    jsavWkspace.click(function(index) { clickHandler(this, index); });
  }

  function expandEqnWorkSpace(entry){
    //Recieves the new object in question, and expands the list by 1 element
    //Also reloads the list (??)
    currentEqnSet[currentEqnSet.length-1] = entry;
    currentEqnSet[currentEqnSet.length] = promptObject;

    for(i=0;i<currentEqnSet.length;i++){
      currentEqnSetText[i] = katex.renderToString(currentEqnSet[i].eqnText);
    }
    
    createEqnWorkSpace();
    return;
  }

  function shrinkEqnWorkSpace(index){
    if (currentEqnSet.length == 1 ){
      return;
    }
    //eliminate at the given index
    currentEqnSet.splice(index,1);
    currentEqnSetText = [];

    for(i=0;i<currentEqnSet.length;i++){
      currentEqnSetText[i] = katex.renderToString(currentEqnSet[i].eqnText);
    }
    createEqnWorkSpace();
    return;
  }

  function reset(){
    // Clear the old JSAV canvas
    if ($("#EqnSolverPRO")) { $("#EqnSolverPRO").empty(); }

    //Setup the new display
    av = new JSAV("EqnSolverPRO");
    clickSource = {
      index: -1,
      jsavObject: null,
      arrObject: null
    };
    currentEqnSet = [ promptObject ];
    currentEqnSetText = [ katex.renderToString(promptObject.eqnText) ];
    //Add lines for initializing the variable set


    //Setup the Equation Bank
    jsavEqSet = av.ds.array(equationsTextSet, {indexed: false, center: false,
                                               layout: "vertical", top: WINDOW_TOP})
    jsavEqSet.click(function(index) { clickHandler(this, index); });

    //Setup the Workspace Bank
    createEqnWorkSpace();

    // Initialize other variables
    av.displayInit();
    av.recorded();
    eqnSolverPRO.userInput = false;
  }

  window.eqnSolverPRO = window.eqnSolverPRO || eqnSolverPRO;
}());