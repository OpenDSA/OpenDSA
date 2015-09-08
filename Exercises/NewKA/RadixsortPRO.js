(function() {
	var
		jsav, // The JSAV object
		arr_size, // Full array size
		arrdata = [], // The array to be sorted; keep for reset
		answer = [], // Array that holds the correct order for the values
		jsavInput, // JSAV array of input values
		jsavBins, // JSAV array that serves as a point for user to click on bins
		jsavLists = [], // The actual set of lists
		empty = [], // Dummy for empty data to reset bin array
		isSelected, // Boolean: True iff user has already clicked an array element
		blockHeight = 46, // Width/height of an array or list element
		// Variables used to keep track of the index and array of the
		// currently selected element within click handler
		ValueIndex = -1,
		radixsortPRO = {
			userInput: null, // Boolean: Tells us if user ever did anything
			// Handle a click event on an array
			// On click of bottom array element, highlight.
			// On click of (free) position in top array, move highlighted element there.
			clickHandler: function(arr, index) {
				if (ValueIndex === -1) {
					// Nothing is selected. We must be in the input array
					if (arr !== jsavInput) {
						return;
					} // Wasn't in input array
					// Don't let the user select an empty element,
					if (arr.value(index) === "") {
						return;
					}
					arr.highlight(index);
					ValueIndex = index;
				} else {
					// We should be setting the value into a bin
					if (arr !== jsavBins) {
						return;
					} // Wasn't in bin array
					// Move currently selected element from input array to selected bin
					jsavLists[index].addLast(jsavInput.value(ValueIndex));
					jsavLists[index].layout({
						center: false
					});
					jsavInput.unhighlight(ValueIndex);
					arr.value(index, jsavInput.value(ValueIndex));
					jsavInput.value(ValueIndex, "");
					ValueIndex = -1;
				}
				userInput = true;
			},

			// function that creates and initialises the arrays
			resetInit: function() {
				var i;
				// Do initializations, both for initial use and reset
				userInput = false;
				ValueIndex = -1;
				jsavInput = jsav.ds.array(arrdata, {
					indexed: true,
					center: false,
					layout: "vertical",
					top: 10
				});
				jsavInput.click(function(index) {
					radixsortPRO.clickHandler(this, index);
				});
				jsavBins = jsav.ds.array(empty, {
					indexed: true,
					center: false,
					layout: "vertical",
					top: 10,
					left: 200
				});
				jsavBins.click(function(index) {
					radixsortPRO.clickHandler(this, index);
				});
				for (i = 0; i < 10; i++) {
					jsavLists[i] = jsav.ds.list({
						top: (16 + i * blockHeight),
						left: 260,
						nodegap: 30
					});
					jsavLists[i].layout({
						center: false
					});
				}
				jsav.step();
			},

			// reset function definition
			f_reset: function() {
				jsavInput.clear();
				jsavBins.clear();
				for (var i = 0; i < 10; i++) {
					jsavLists[i].clear();
				}
				radixsortPRO.resetInit();
			},

			// function that initialise JSAV library
			initJSAV: function(asize, qchoice) {
				var i, j;
				var shift = 1;
				var temp = [];
				// Do all of the one-time initializations
				arr_size = asize;
				jsav = new JSAV($("#container"));
				jsav.recorded();
				arrdata = JSAV.utils.rand.numKeys(0, 999, arr_size);
				for (i = 0; i < 10; i++) {
					empty[i] = "";
				}
				radixsortPRO.resetInit();
				// Set up handler for reset button
				$("#reset").click(function() {
					radixsortPRO.f_reset();
				});
				// Compute the answer
				for (i = 0; i < 10; i++) {
					temp[i] = [];
				}
				for (i = 0; i < qchoice; i++) {
					shift = shift * 10;
				}
				for (i = 0; i < arr_size; i++) {
					var a = Math.floor((arrdata[i] / shift) % 10);
					temp[a][temp[a].length] = arrdata[i];
				}
				var curr = 0;
				for (i = 0; i < 10; i++) {
					for (j = 0; j < temp[i].length; j++) {
						answer[curr++] = temp[i][j];
					}
				}
			},

			// Check user's answer for correctness
			checkAnswer: function(arr_size) {
				var i, j;
				var curr = 0;
				for (i = 0; i < 10; i++) {
					for (j = 0; j < jsavLists[i].size(); j++) {
						if (jsavLists[i].get(j).value() !== answer[curr++]) {
							return false;
						}
					}
				}
				//console.log("curr is " + curr + ", arr_size is " + arr_size);
				if (curr !== arr_size) {
					return false;
				}
				return true;
			}
		};

	window.radixsortPRO = window.radixsortPRO || radixsortPRO;
}())