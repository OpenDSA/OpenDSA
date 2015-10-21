$(document).ready(function() {
  "use strict";
  var av,
      settings = new JSAV.utils.Settings($(".jsavsettings"));

  function showSteps(steps) {
    var array = av.ds.array(new Array(steps[0].ind.length), {indexed: true, layout: "bar"});

    steps.forEach(function(step, index) {
      av.umsg(JSON.stringify(step));
      if (index === 0) {
        array.state(step);
      } else {
        step.ind.forEach(function(element, i) {
          array.value(i, element.v);
          array.index(i).element.attr("class").split(" ").forEach(function(cls) {
            if (cls.indexOf("jsavnode") === -1 && cls.indexOf("jsavindex") === -1 && (!element.cls || element.cls.indexOf(cls) === -1)) {
              window.console.log("step", index, "remove class", cls, "from", i);
              array.removeClass(i, cls);
            }
          });
          if (element.cls) {
            element.cls.forEach(function(cls) {
              window.console.log("step", index, "addClass class", cls, "to", i);
              array.addClass(i, cls);
            });
          }
        });
      }
      array.layout();
      if (index === 0) {
        av.displayInit();
      } else {
        av.step();
      }
    });
  }

  function reset() {
    $(".jsavcanvas").remove();
    $(".jsavcontrols").html("");
    $(".jsavcounter").html("");
    $(".jsavoutput").html("");
  }

  // Execute the "Run" button function
  function runIt() {
    var steps = JSON.parse($("#json-answer").val()).answer;

    reset();
    av = new JSAV($(".avcontainer"), {settings: settings});
    // Create a new array using the layout the user has selected
    showSteps(steps);
    av.recorded(); // mark the end
  }


  // Connect action callbacks to the HTML entities
  $("#run").click(runIt);
  $("#reset").click(function() {
    reset();
    $("#json-answer").val("");
  });
});
