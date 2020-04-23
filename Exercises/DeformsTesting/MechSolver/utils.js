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

Window.valueTruncate = function(numericValue) {
    return String(Number(Math.round(parseFloat(numericValue)+'e3')+'e-3'))
}

Window.valueStringRepr = function(numericValueString) {
    var value = parseFloat(numericValueString);
    if(Math.abs(value) < 1e-3 || Math.abs(value) > 1e3) return value.toExponential(3);
    else return Window.valueTruncate(value);
}

Window.showHelp = function() {
    var helpText = "<h2>Welcome to the Deforms Problem Solving Suite!</h2>"+
    "<br>Here are a few guidelines to help you find your way around this system."+
    '<ol>'+
    '<li> The primary way to interact with the system is using the mouse to click on items. '+
    'For example, we click on values to add them to equations, we click on equations to add them '+
    'to workspaces, etc.'
    +'</li>'+
    '<li>The problem prose has values in boxes that highlight when you hover over them. You can '+
    'click on them to select them, and then add them to equations.'+
    '</li>'+
    '<li> The Equation Bank to the right has the palette of equations to choose from. To choose '+
    'an equation, click on it (it will turn yellow), and then click on add in the desired Workspace '+ 
    'on the left (the white rectangular area).'+
    '</li>'+
    '<li> To change the pages of the equation palette, click on the name of the palette page (eg: Axial, Arithmetic, etc) '+
    'to pull up a list of palette page names, then click on the desired page name.'+
    '</li>'+
    '<li> An equation in the workspace will have a boxed version and a template version. '+
    'One can click on a value in the prose or a value generated in the workspace first and then '+
    'add click on any box in the equation to put it in there.'+
    '</li>'+
    '<li> To associate different variables in different equations to create a system of simulataneous '+
    'equations, click on the empty variable boxes. This will turn the boxes into bold letters. Afterwards, more '+
    'variables can be added to associations by clicking on an existing variable association, followed by "Add new variable"'+
    '</li>'+
    '<li> Clicking on any filled box will bring up its own right click menu to either negate the value/variable, '+
    'clear the box, copy the value, or add a new variable to the association.'+
    '</li>'+
    '<li> To remove an equation, click on the checkbox for it and click on Remove inside its workspace.</li>'+
    '<li> To solve one/many equations, fill in the values, make the associations, and select the equation(s) '+
    'and click on Solve. If the system is consistent, this should pop up solution boxes below the equations.'+
    '</li>'+
    '<li> To change units for quantities, click on the unit for that quantity (highlights in green on hover) '+
    'to bring up the choice of units, then click on them.'+
    '</li>'+
    '<li>Finally, one can select a value and drop it into the yellow boxes next to the question subparts '+
    'to submit answers to the questions, and click on Check Answer to get feedback.'+
    '</li>'+
    '</ol>';
    JSAV.utils.dialog(helpText, {width: 600, closeText: "OK", dialogClass: "helpPage"});
}