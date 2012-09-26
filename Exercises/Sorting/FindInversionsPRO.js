"use strict";
var
  jsav,    // The JSAV object
  jsavArr, // The JSAV array
  answer;  // The correct answer

var initJSAV = function (a) {
  var i, j;
  jsav = new JSAV("jsav", {"animationMode": "none"});
  jsavArr = jsav.ds.array(JSAV.utils.rand.numKeys(0, 999, a),
                          {indexed: true, center: false});
  
  // Compute the answer
  answer = 0;
  for (i = 1; i < jsavArr.size(); i++) {
    for (j = 0; j < i; j++) {
      if (jsavArr.value(i) < jsavArr.value(j)) {
        answer++;
      }
    }
  }
};

// Return the computed Answer
var genAnswer = function () {
  return answer;
};
