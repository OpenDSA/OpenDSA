"use strict";
$(document).ready(function () {
  var jsav = new JSAV("Suffix");
// jsav.g.polygon([[400, 10] ,[10,400],[10,400],[400,800]],
//     {"stroke-width": 7});
   var sq=jsav.g.rect(400, 10, 100,100 )


  jsav.displayInit();

	jsav.recorded();

});
