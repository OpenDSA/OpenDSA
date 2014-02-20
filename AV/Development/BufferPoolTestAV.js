"use strict";
/*global alert: true, console: true, is, ODSA */

/*
 * For queries & switch cases, follow the numbering below:
 * Hash Functions (hashFunct):
 *  1. Simple Mod Hash
 *  2. Binning Hash
 *  3. Mid-Square Hash
 *  4. Simple Hash for Strings
 *  5. Improved Hash for Strings
 *
 * Collision Resolutions (collision):
 *  1. Linear Probing
 *  2. Linear Probing by Stepsize of 2
 *  3. Linear Probing by Stepsize of 3
 *  4. Pseudo-Random Probing
 *  5. Quadratic Probing
 *  6. Double Hashing (Prime)
 *  7. Double Hashing (Power-of-2)
 *
 * Table Size (tableSize):
 *  Number between 1 and 16
 *
 * Key Range (keyrange):
 *  1. 0-99
 *  2. 0-999
 *
 * M-value (m):
 *  - A prime number (if collision=6)
 *  - A power-of-2 (if collision=7)
 *
 * To handle queries:
 *  Set the hashFunct, collision, tableSize, keyrange and m according to the reference above
 *  For example, to choose Mid-Square Hash with pseudo-random probing, you would use:
 *  hash.html?hashFunct=3&collision=4
 */

/* The fun starts here  */
(function ($) {

  /* Variables */
  var jsav,                     // JSAV
      defCtrlState,             // Stores the default state of the controls
      defTableSizeOptions,      // Stores the HTML of the default table size options
      main_memory,                      // JSAV Array
      buffer_pool,   // A queue containing 'steps' to be played when the user clicks 'Next'
      slotPerm = [0];           // A permutation of slots for pseudo random probing, must be a global so that
                                // the same permutation is used each time

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("" + JSAV.version());
  }

  /**
   * Wrapper class for error messages
   */
  function error(message) {
    jsav.umsg(message, {"color" : "red"});
    jsav.umsg("<br />");
  }

  /**
   * Instruct the user on what fields they are missing and clear and redraw the hash table
   */
  function resetAV() {
    // Display a message telling them what fields they need to select
    jsav.clearumsg();
    var missingFields = [];

    // Ensure user selected a replacement strategy
    var funct = Number($('#function').val());
    if (funct === 0) {
      missingFields.push('replacement strategy');
    } else {
      jsav.umsg('Replacement Strategy Selected: ' + $("#function option:selected").text());
    }

    // Ensure user selected main memory size
    if ($('#mainmemory_size').val() === '0') {
      missingFields.push('main memory size');
    }

    // Ensure user selected buffer pool size
    if ($('#bufferpool_size').val() === '0') {
      missingFields.push('buffer pool size');
    }

    // Craft an appropriate message to the user, telling them what fields they are missing
    if (missingFields.length > 0) {
      // Disable the input box if fields are missing
      $("#input").attr("disabled", "disabled");

      var msg = 'Please select a ' + missingFields.join(', ');
      var commaIndex = msg.lastIndexOf(",");

      if (commaIndex > -1) {
        msg = msg.substring(0, commaIndex) + ' and' + msg.substring(commaIndex + 1, msg.length);
      }

      jsav.umsg(msg);
    } else {
      // If all necessary fields are selected, enable the input box and tell the user to begin
      $("#input").removeAttr("disabled");

      jsav.umsg("Enter a value and click Next");
      jsav.umsg("<br />");
    }

    // Draw new array
    var size = $('#mainmemory_size').val();
    var buf_size = $('#bufferpool_size').val();  

    var htmlData = "";
    for (var i = 0; i < size; i++) {
      htmlData += "<li></li>";
    }

    var buffer_pool = $('#buffer_pool');
    buffer_pool.html(htmlData);

    // Create a new JSAV array
    main_memory = jsav.ds.array(buffer_pool, {indexed: true, layout: "vertical"});
    
    /*var buffData = "";
    for (var i = 0; i < buf_size; i++) {
      buffData += "<li></li>";
    }

    var memory = $('#memory');
    memory.html(buffData);

    buffer_pool = jsav.ds.array(meory, {indexed: true, layout: "vertical"});
    */
  }

  /**
   * Runs when page has finished loading
   * Anything that triggers an interaction with an HTML element should be done here
   */
  $(document).ready(function () {
    jsav = new JSAV($('.avcontainer'));
    resetAV();

    // If the user hits 'Enter' while the focus is on the textbox,
    // click 'Next' rather than refreshing the page
    $("#input").keypress(function (event) {
      // Capture 'Enter' press
      if (event.which === 13) {
        // Prevent 'Enter' from posting the form and refreshing the page
        event.preventDefault();
        // If the user entered a value and inserting is allowed, trigger 'Next'
        if ($("#input").val() !== "" && !$('#next').attr('disabled')) {
          $('#next').click();
        }
      } else {
        // Enable the 'Next' button when the user enters a value
        $('#next').removeAttr('disabled');
      }
    });

    /* Event Triggers */

    // Event trigger change if hashing function option is changed
    $("#function").change(function () {
      resetAV();
    });

    // Event trigger change if collision function option is changed
    $("#mainmemory_size").change(function () {
      resetAV();
    });

    // Event trigger change if size of hash changes
    $("#bufferpool_size").change(function () {
      resetAV();
    });

    /* Next button pushed.
     * If no slide show exits, make one.
     * Else, load next slide
     */
    $('#next').click(function () {
      
    });

    // Connect action callbacks to the HTML entities
    $('#about').click(about);
    $('#reset').click(reset);
    $('#help').click(function () {
      window.open("hashAVHelp.html", 'helpwindow');
    });
    $('#showcounts').click(function () {
      if ($('.countlabel').css('display') === 'none') {
        $('.countlabel').show();
        $('#showcounts').val('Hide Counts');
      } else {
        $('.countlabel').hide();
        $('#showcounts').val('Show Counts');
      }
    });

    // Set the default state for the controls

    // Get the default HTML for the tablesize dropdown list
    defTableSizeOptions = $('#tablesize').html();

    // Adjust UI element positions
    var contWidth = $('#container').width() - 20; // 20 pixels for padding
    $('.jsavoutput').width(contWidth / 3);
    $('#buffer_pool').css('left', (3 * contWidth / 4));
  });
}(jQuery));
