$(document).ready(function() {
  "use strict";
  var av,
      settings = new JSAV.utils.Settings($(".jsavsettings"));

  function showSteps(steps) {
    var array = av.ds.array(new Array(steps[0].ind.length), {indexed: true, layout: "bar"});
    var pseudo = av.code({
      url: "../../SourceCode/Processing/Sorting/Quicksort.pde",
      startAfter: "/* *** ODSATag: partition *** */",
      endBefore: "/* *** ODSAendTag: Quicksort *** */",
      tags: {
        comments_and_findpivot: [9, 11, 12, 13, 14, 15, 16]
      }
    });
    pseudo.hide("comments_and_findpivot");


    // redos the steps the student has done based on the log
    steps.forEach(function(step, index) {
      av.umsg(JSON.stringify(step));
      if (index === 0) {
        array.state(step);
        array.element.css("top", 0);
      } else {
        var swapIndex = -1;
        step.ind.forEach(function(element, i) {
          if (array.value(i) !== element.v) {
            if (swapIndex === -1) {
              swapIndex = i;
            } else {
              // we assume there will only be one swap per step
              array.swap(swapIndex, i);
            }
          }
          array.index(i).element.attr("class").split(" ").forEach(function(cls) {
            if (cls.indexOf("jsavnode") === -1 && cls.indexOf("jsavindex") === -1 && (!element.cls || element.cls.indexOf(cls) === -1)) {
              array.removeClass(i, cls);
            }
          });
          if (element.cls) {
            element.cls.forEach(function(cls) {
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
