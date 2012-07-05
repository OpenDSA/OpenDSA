"use strict";
/*global alert*/
(function ($) {
  // Declare and initialize state variables
  var
    TSize = Number($('input[name="tablesize"]').val()), // Table size
    Recs = Number($('input[name="numrecs"]').val()), // Number of records
    // Convenience function for writing output messages
    tell = function (msg) { $('p[class="output"]').text(msg); };

  // Process About button: Pop up a message with an Alert
  function About() {
    alert("Birthday problem calculator\nWritten by Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at https://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Validate Table size field
  function CheckTable() {
    TSize = Number($('input[name="tablesize"]').val());
    if (isNaN(TSize) || (TSize < 1) || (TSize > 10000)) {
      alert("Table size has to be a positive number less than 10000");
    }
  }

  // Validate number of records field
  function CheckRecs() {
    Recs = Number($('input[name="numrecs"]').val());
    if (isNaN(Recs) || (Recs < 1) || (Recs > TSize)) {
      alert("Number of records must be a positive number less than the table size");
    }
  }

  // Main action: Result of clicking "Calculate" button
  function Calculate() {
    var prob, fact;
    if (TSize <= 0 || Recs < 0) { tell("Bad input"); }
    else {
      if (Recs === 0) { prob = 0.0; }
      else if (Recs > TSize) { prob = 1.0; }
      else {
        fact = 1.0;
        for (var i = TSize - Recs + 1; i < TSize; i++) {
          fact = fact * i / TSize;
        }
        prob = 1.0 - fact;
      }
      tell(prob * 100 + "%");
    }
  }

  // Action callbacks for form entities
  $('input[name="about"]').click(About);
  $('input[name="tablesize"]').focusout(CheckTable);
  $('input[name="numrecs"]').focusout(CheckRecs);
  $('input[name="calculate"]').click(Calculate);
}(jQuery));
