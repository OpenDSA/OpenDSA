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
    if(value < 1e-3 || value > 1e3) return value.toExponential(3);
    else return Window.valueTruncate(value);
}