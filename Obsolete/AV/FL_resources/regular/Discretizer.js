/**
 * Given a regular expression, this will return the subexpressions that,
 * when ored together, will result in the expression.
 *
 * @param expression  the regular expression
 *
 * @return an array of the subexpressions
 */
var or = function(expression) {
	var se = []; // Subexpressions.
	var start = 0, level = 0;
	for (var i = 0; i < expression.length; i++) {
		if (expression.charAt(i) == '(')
			level++;
		if (expression.charAt(i) == ')')
			level--;
		if (expression.charAt(i) != '+')
			continue;
		if (level != 0)
			continue;
		// First level or!
		se.push(delambda(expression.substring(start, i)));
		start = i + 1;
	}
	se.push(delambda(expression.substring(start)));
	return se;
}

/**
 * Given a regular expression, this will return the subexpressions that,
 * when concatenated together, will result in the expression.
 * 
 * @param expression
 *            the regular expression
 * @return an array of the subexpressions
 */
var cat = function(expression) {
	var se = []; // Subexpressions.
	var start = 0, level = 0;
	for (var i = 0; i < expression.length; i++) {
		var c = expression.charAt(i);
		if (c == ')') {
			level--;
			continue;
		}
		if (c == '(')
			level++;
		if (!(c == '(' && level == 1) && level != 0)
			continue;
		if (c == '+') {
			// Hum. That shouldn't be...
			alert("Error in the code. Sorry~");
		}
		if (c == '*')
			continue;
		// Not an operator, and on the first level!
		if (i == 0)
			continue;
		se.push(delambda(expression.substring(start, i)));
		start = i;
	}
	se.push(delambda(expression.substring(start)));
	return se;
}

/**
 * Given a string, returns the string, or the empty string if the string is
 * the lambda string.
 * 
 * @param string
 *            the string to possibly replace
 * @return the string, or the empty string if the string is the lambda
 *         string
 */
var delambda = function(string) {
	return string == lambda ? "" : string;
}
