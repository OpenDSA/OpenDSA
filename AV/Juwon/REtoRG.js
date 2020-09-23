$(document).ready(function() {
	var av_name = "REtoRG";
	var av = new JSAV(av_name);

	var expression = prompt("Regular Expressionnnnnnn:");

    var ex_parse = function(expression) {
        //do parsing with the expression
        if (expression.length <= 1)
            return 0;
        if (or(expression).length > 1)
            return 0;
        if (cat(expression).length > 1)
            return 0;
        if (expression.charAt(expression.length - 1) == '*')
            return 0;
        if (expression.charAt(0) == '('
                && expression.charAt(expression.length - 1) == ')')
            return 0;
        return 0;
    }

    ex_parse(expression);
    //display
    av.displayInit();
    av.recorded();
});