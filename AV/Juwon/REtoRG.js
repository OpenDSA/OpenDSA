var jsav,
		expression, // input by user
		controller, // REtoFA controller object
		exerciseController,
        pageType; //determine weather the page is an RE exercise or REtoFA

(function($) {
    var start = function() {
        if (localStorage["expression"] && localStorage["expression"] !== "null") {
			expression = localStorage["expression"];
			localStorage["expression"] = null;
        }
        else {
			expression = prompt("Regular Expression:");
		}
		while (!expression) {
			alert("Put in Something, your input is empty!");
			expression = prompt("Regular Expression:");
		}
		controller = new REtoRGController(jsav, expression, {});	
	}

}(jQuery));