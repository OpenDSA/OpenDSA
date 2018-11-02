/*global JSAV, document */
// Written by Ziyou Shang

document.write('<script src="../../../AV/OpenFLAP/tape.js"></script>');

$(document).ready(function() {
  "use strict";
  var av = new JSAV("test2", {animationMode: "none"});

  var left = 200;
  var top = 20;


  var arr = av.ds.array(['1', '2', '2', '2', '1', '1', '', '', '', '' ]);
  arr.css(true, {"border-radius":"1px"});

  arr.css(9, {"border-right": "none"});
  
  var arr2 = av.ds.tape(['1', '2', '3'], 35, 20, "right");
  var arr3 = av.ds.tape(['1', '2', '3'], 35, 60, "left");
  var arr4 = av.ds.tape(['1', '2', '3'], 35, 100, "both");
  var arr5 = av.ds.tape(['1', '2', '3'], 35, 140, "none");
  

  av.displayInit();
  av.recorded();
});
