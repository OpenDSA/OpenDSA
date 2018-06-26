/*global window */
(function() {
  "use strict";
    var demo_ex = {  		
		recordNumber: function(tableSize, percentage) {
			var fact;
			var prob;
			for (var i = 1; i < tableSize; i++) {
				fact = 1.0;
				for (var j = tableSize - i + 1; j < tableSize; j++) {
					fact = fact * j / tableSize;
				}
				prob = 1.0 - fact;
				if (prob * 100 >= percentage) {
					return i;
				}
			}
		}
  };
  window.demo_ex = window.demo_ex || demo_ex;
}());
