
var umsg = JSAV.ext.umsg;

JSAV.ext.umsg = function (msg, options) {
	if (options && options.fill) {
		for (var label in options.fill) {
			var reg = new RegExp("{"+label+"}", "g");
			console.log(reg.toString());
			msg = msg.replace(reg, options.fill[label]);
			console.log(msg);
		}
	}
	// console.log(msg);
	return umsg.apply(this, [msg, options]);
}

function getLanguageFunction(langJSON, selectedLanguage) {

	if (!selectedLanguage)
		selectedLanguage = "en";

	if (!langJSON[selectedLanguage]) {
		console.log("Language not found. (" + selectedLanguage + ")");
		return function (label) {
			return "[" + label + "]";
		};
	}

	return function (label) {
		if (!langJSON[selectedLanguage][label]) {
			console.log("Cannot find label: " + label);
			return "[" + label + "]";
		}
		return langJSON[selectedLanguage][label];
	};
}