"use strict";
/*global alert: true, console: true, is */

/*
 * For queries & switch cases, follow the numbering below:
 * Hash Functions:
 *  1. Simple Mod Hash
 *  2. Binning Hash
 *  3. Mid-Square Hash
 *  4. Simple Hash for Strings
 *  5. Improved Hash for Strings
 *
 * Coliision Resolutions:
 *  1. Linear Probing
 *  2. Linear Probing by Stepsize of 2
 *  3. Linear Probing by Stepsize of 3
 *  4. Pseudo-Random Probing
 *  5. Quadratic Probing
 *
 * Table Size:
 *  Number between 1 and 16
 *
 * Key Range:
 *  1. 0-99
 *  2. 0-999
 *
 * To handle queries:
 *  Set the hashFunct, collision, tableSize and keyrange according to the reference above
 *  For example, to choose Mid-Square Hash with pseudo-random probing, you would use:
 *  hash.html?hashFunct=3&collision=4
 */

/* The fun starts here  */
(function ($) {
  /*
   * Queue Data Structure
   * Created by Stephen Morley - http://code.stephenmorley.org
   * Released under the terms of Creative Commons
   */
  function Queue() {
    // initialise the queue and offset
    var queue  = [];
    var offset = 0;

    /* Returns true if the queue is empty, and false otherwise.
     */
    this.isEmpty = function () {
      return (queue.length === 0);
    };

    /* Returns the length of the queue
     */
    this.getLength = function () {
      return (queue.length - offset);
    };

    /* Enqueues the specified item.
     */
    this.enqueue = function (item) {
      queue.push(item);
    };

    /* Dequeues an item and returns it. If the queue is empty then undefined is
     * returned.
     */
    this.dequeue = function () {

      // if the queue is empty, return undefined
      if (queue.length === 0) {
        return undefined;
      }

      // store the item at the front of the queue
      var item = queue[offset];

      // increment the offset and remove the free space if necessary
      if (++offset * 2 >= queue.length) {
        queue  = queue.slice(offset);
        offset = 0;
      }

      // return the dequeued item
      return item;
    };
  }
  /* End Queue */

  /* Variables */
  var defCtrlState;          // Stores the default state of the controls
  var defTableSizeOptions;        // Stores the HTML of the default table size options
  var av;                       // JSAV
  var arr;                      // JSAV Array
  var nextStep = new Queue();   // A queue that will contain the "next step". Stores position and value of next step as an object
  var tableCount;               // Array that will hold an object that contains the show counts value
  var isArrayFull = false;      // Flag that determines whether array is full or not
  var canStillInsert = true;    // Flag that determines that even though the number of insertion attempts is greater than the
                                // array size, there are still slots available in the array.

  // Initialize JSAV object
  av = new JSAV("hashAV_avc");

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Shellsort Algorithm Visualization\nWritten by Nayef Copty, Mauricio De la Barra, Daniel Breakiron, and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  /**
   * Wrapper class for error messages
   */
  function error(message) {
    console.log('error(' + message + ')');
    av.umsg(message, {"color" : "red"});
    av.umsg("<br />");
  }

  /**
   * Sets the default state for the controls based on the query parameters
   */
  function setDefaultControlState() {
    defCtrlState = {};
    defCtrlState.hashFunct = 0;
    defCtrlState.collision = 0;
    defCtrlState.tableSize = 0;
    defCtrlState.keyrange = 0;

    // Update the default control state based on the query parameters
    var params = JSAV.utils.getQueryParameter();

    // Set hash function
    if (params.hashFunct) {
      if (params.hashFunct > 0 && params.hashFunct <= 5) {
        defCtrlState.hashFunct = params.hashFunct;

        // Disable so user can't change the value set by parameter
        $('#function').attr('disabled', 'disabled');
      } else {
        console.error("Invalid URL parameter method: " + params.hashFunct);
      }
    }

    // Set collision resolution policy
    if (params.collision) {
      if (params.collision > 0 && params.collision <= 5) {
        defCtrlState.collision = params.collision;

        // Disable so user can't change the value set by parameter
        $('#collision').attr('disabled', 'disabled');
      } else {
        console.error("Invalid URL parameter collision: " + params.collision);
      }
    }

    // Set table size
    if (params.tableSize) {
      if (params.tableSize > 0 && params.tableSize <= 16) {
        defCtrlState.tableSize = params.tableSize;

        // Disable so user can't change the value set by parameter
        $('#tablesize').attr('disabled', 'disabled');
      } else {
        console.error("Invalid URL parameter tableSize: " + params.tableSize);
      }
    }

    // Set keyrange
    if (params.keyrange) {
      if (params.keyrange > 0 && params.keyrange <= 2) {
        defCtrlState.keyrange = params.keyrange;

        // Disable so user can't change the value set by parameter
        $('#keyrange').attr('disabled', 'disabled');
      } else {
        console.error("Invalid URL parameter keyrange: " + params.keyrange);
      }
    }
  }

  /**
   * Instruct the user on what fields they are missing and clear and redraw the hash table
   */
  function resetAV() {
    // Display a message telling them what fields they need to select
    av.clearumsg();
    var missingFields = [];

    if ($('#function').val() === '0') {
      missingFields.push('hash function');
    } else {
      av.umsg('Algorithm Selected: ' + $("#function option:selected").text());

      // If user selected binning, make sure they selected a key range too
      if ($('#function').val() === '2' && $('#keyrange').val() === '0') {
        missingFields.push('key range');
      } else {
        av.umsg('Key Range Selected: ' + $("#keyrange option:selected").text());
      }
    }

    if ($('#collision').val() === '0') {
      missingFields.push('collision policy');
    } else {
      av.umsg('Collsion Policy Selected: ' + $("#collision option:selected").text());
    }

    if ($('#tablesize').val() === '0') {
      missingFields.push('table size');
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

      av.umsg(msg);
    } else {
      $("#input").removeAttr("disabled");

      av.umsg("Enter a value and click Next");
      av.umsg("<br />");
    }

    // Draw new array
    var size = $('#tablesize').val();

    var htmlData = "";
    for (var i = 0; i < size; i++) {
      htmlData += "<li></li>";
    }

    var hashTable = $('#hashTable');
    hashTable.html(htmlData);

    // Create a new JSAV array
    arr = av.ds.array(hashTable, {indexed: true, layout: "vertical", center: false});

    tableCount = [];

    // TODO - might be able to combine this with the loop above
    // Append a span containing the count to each index
    $('li.jsavindex').each(function (index, item) {
      $(item).append('<span id="' + index + '_count" class="jsavindexlabel countlabel" style="display: none;">1</span>');
      tableCount[index] = 1;
    });
  }

  function setFunction() {
    console.log('setFunction');
    // Clear any existing hash data when the function is changed
    resetAV();

    // Reset the array size options list (in case the previously
    // selected function was mid-square), but keep the currently selected item
    var size = $("#tablesize").val();
    $("#tablesize").html(defTableSizeOptions);
    $("#tablesize").val(size);

    // Disable keyrange dropdown
    $("#keyrange").attr("disabled", "disabled");


    console.log('keyrange disabled');
    console.log('$("#function").val() = ' + $('#function').val());

    // Display Appropriate Message and Enable Appropriate Controls for each function
    switch ($('#function').val()) {
    // Prompt user to select a function
    case '0':
      $('#input').attr("disabled", "disabled");
      return;

    // Binning
    case '2':
      // Enable key range
      $("#keyrange").removeAttr("disabled");
      console.log('keyrange enabled');
      break;

    // Mid Square
    case '3':
      // Change array size options to only 8 and 16
      $("#tablesize").html('<option value="0">Table Size</option><option value="8">8</option><option value="16">16</option>');
      break;
    }
  }

  /**
   * Reset all controls to their default state
   */
  function resetControls() {
    $("#function").val(defCtrlState.hashFunct);
    $("#collision").val(defCtrlState.collision);
    $("#tablesize").val(defCtrlState.tableSize);
    $("#keyrange").val(defCtrlState.keyrange);
    setFunction();

    // Clear input textbox and disable next button
    $("#input").val("");
    $('#next').attr("disabled", "disabled");
  }

  /**
   * Resets the visualization
   */
  function reset() {
    // Clear any existing messages and hash table data
    av.clearumsg();
    $('#hashTable').html('');

    resetControls();

    nextStep = new Queue();
    isArrayFull = false;
    canStillInsert = true;
  }

  function loadNextSlide() {
    var next = nextStep.dequeue();

    if (next.insert) {    // Insertion step
      av.umsg("Inserting " + next.value + " at position " + next.position + ".");
      av.umsg("<br>");
      arr.unhighlight(next.position);
      arr.value(next.position, next.value);
    } else {    // Highlighting step
      av.umsg("Attempting to insert " + next.value + " at position " + next.position + ".");
      arr.unhighlight();
      arr.highlight(next.position);
    }

    // Disable Next Button & re-enable input field if queue is empty
    if (nextStep.isEmpty()) {
      // Clear, enable and set the focus to the input textbox
      $("#input").val("");
      $("#input").removeAttr("disabled");
      $("#input").focus();
      // Disable the next button
      $('#next').attr("disabled", "disabled");

      // If array is full at the end of dequeue, display message
      if (isArrayFull) {
        var errorMsg;
        if (canStillInsert) {
          errorMsg = "Array is not full, but number of insertion attempts is greater than array size. Insertion failed.";
        } else {
          errorMsg = "Array is full. Insertion failed. Please Restart.";
        }
        canStillInsert = false;

        error(errorMsg);
        arr.unhighlight();

        // Reset flag
        isArrayFull = false;

        // User has been informed the array is full and they
        // must restart, so disable the input textbox
        $('#input').attr("disabled", "disabled");
      }
    } else {
      // Set the focus to the 'Next' button so users can click 'Enter' to trigger the next step
      $("#next").focus();
    }
  }

  /* Hashing Functions */

  // Simple mod function
  function simpleMod(inputVal) {
    // Check that the input value is a number and within the correct range
    if (inputVal < 0 || inputVal > 99999 || isNaN(inputVal)) {
      error("Please enter a number in the range of 0-99999");
      // Return error
      return 1;
    }

    // Simple Mod Function
    var pos = inputVal % arr.size();

    av.umsg("Hash position = Input Value % Table Size");
    av.umsg("Hash position = " + inputVal + " % " + arr.size() + ' = ' + pos);

    // Process function with selected collision resolution
    determineResolution(inputVal, pos, false, true);

    // Return success
    return 0;
  }

  // Binning Function
  function binning(inputVal) {
    var keyrange = $("#keyrange").val();

    // Check that a key range has been selected
    if ((Number(keyrange)) === 0) {
      error("Please select a key range.");
      // Return error
      return 1;
    } else {    // Key range selected
      switch (keyrange) {
      case '1':
        keyrange = 100;
        break;

      case '2':
        keyrange = 1000;
        break;
      }

      // Check that the input value is a number within the correct range
      if (inputVal < 0 || inputVal >= keyrange || isNaN(inputVal)) {
        error("Please enter an input value between 0 and " + keyrange - 1 + ".");
        // Return Error
        return 1;
      } else {    // Valid input
        av.umsg("Attempting to insert: " + inputVal);

        // Binning function Position
        var binsize = keyrange / $("#tablesize").val();
        var pos =  Math.floor(inputVal / binsize);

        av.umsg("Bin Size = Key Range / Table Size");
        av.umsg("Bin Size = " + keyrange + " / " + $("#tablesize").val() + " = " + binsize.toFixed(2));
        av.umsg("Hash Position = Input Value / Bin Size");
        av.umsg("Hash Position = " + inputVal + " / " + binsize.toFixed(2) + " = " + pos);

        // Process function with selected collision resolution
        determineResolution(inputVal, pos, false, true);

        // Return success
        return 0;
      }
    }
  }

  // Mid-Square Method
  function midSquare(inputVal) {
    // Check that input is a number within the correct range
    if (inputVal > 65536 || inputVal < 0 || isNaN(inputVal)) {
      error("Please enter a value in the range of 0-65536");
      // Return error
      return 1;
    }

    av.umsg("Attempting to insert: " + inputVal);

    var strpadding = "00000000";
    var modVal = 256;
    var size = $("#tablesize").val();
    var strsubtract = size * -1;

    if (size === 16) {
      strpadding = "0000000000000000";
      modVal = 65536;
    }

    // Square Input Value
    var squaredInput = (inputVal * inputVal) % modVal;

    var binaryDigit = (strpadding + (squaredInput).toString(2)).substr(strsubtract);

    // Concatenate Middle Bits
    var middleBits;
    if (size === 16) {
      middleBits = binaryDigit.charAt(6) + binaryDigit.charAt(7) + binaryDigit.charAt(8) + binaryDigit.charAt(9);
    } else if (size === 8) {
      middleBits = binaryDigit.charAt(3) + binaryDigit.charAt(4);
    }

    // Convert Middle Bits to Decimal
    var pos = parseInt(middleBits, 2);

    av.umsg(inputVal + " * " + inputVal + " % " + modVal + " = " + squaredInput);
    av.umsg(size + "-bit binary digit = " + binaryDigit);
    av.umsg("Middle four bits = " + middleBits);
    av.umsg("Hash position = " + pos);

    // Process function with selected collision resolution
    determineResolution(inputVal, pos, false, true);

    // Return success
    return 0;
  }

  // Simple hashing for strings
  function simpleStrings(inputVal) {
    // Check input is a string
    if (!is("String", inputVal)) {
      error("Please enter a string to hash.");
      // Return error
      return 1;
    }

    av.umsg("Attempting to insert: " + inputVal);

    // Sum of string's ASCII number
    var sum = 0;
    for (var i = 0; i < inputVal.length; i++) {
      sum += inputVal.charCodeAt(i);
    }

    // Table Size
    var size = $("#tablesize").val();

    // Position is the sum mod the table size
    var pos = sum % size;

    av.umsg("The sum is " + sum);
    av.umsg("Hash value: " + sum + " % " + size + " = " + pos);

    // Process function with selected collision resolution
    determineResolution(inputVal, pos, false, true);

    // Return success
    return 0;

  }

  // Hashing for Strings (Improved)
  function improvedStrings(inputVal) {
    // Check input is a string
    if (!is("String", inputVal)) {
      error("Please enter a string to hash.");
      // Return error
      return 1;
    }

    av.umsg("Attempting to insert " + inputVal);

    var inputLength = inputVal.length / 4;
    var sum = 0;

    for (var i = 0; i < inputLength; i++) {
      // Grab the substring of size 4
      var inputsubstring = inputVal.substring(i * 4, (i * 4) + 4);
      var mult = 1;
      for (var j = 0; j < inputsubstring.length; j++) {
        sum += inputsubstring.charCodeAt(j) * mult;
        mult *= 256;
      }
    }

    var size = $("#tablesize").val();
    var pos = sum % size;

    av.umsg("The sum is " + sum);
    av.umsg("Hash value: " + sum + " % " + size + " = " + pos);

    // Process function with selected collision resolution
    determineResolution(inputVal, pos, false, true);

    // Return success
    return 0;
  }


  /* Collision Resolutions */

  // Function that determines which collision resolution to pick
  function determineResolution(inputVal, pos, showCounts, printPerm) {
    var collisionResolution = $("#collision").val();
    var ret = 0;

    switch (collisionResolution) {
      // No function chosen
    case '0':
      reset();
      break;
    case '1':
      ret = linearProbing(inputVal, pos, showCounts, 1);
      break;
    case '2':
      ret = linearProbing(inputVal, pos, showCounts, 2);
      break;
    case '3':
      ret = linearProbing(inputVal, pos, showCounts, 3);
      break;
    case '4':
      ret = pseudoRandom(inputVal, pos, showCounts, printPerm);
      break;
    case '5':
      ret = quadraticProbing(inputVal, pos, showCounts);
      break;
    }

    return ret;
  }

  // Linear Probing
  function linearProbing(inputVal, pos, showCounts, stepSize) {
    // Cast into a number, otherwise '0' will be considered false.
    if ((Number(arr.value(pos))) !== false) {
      // Counter that counts how many times the loop ran
      var count = 0;

      // Loop across the array. "infinite" loop. Breaks if array is full.
      for (;;) {
        // If array is full, break out
        if (count === arr.size()) {
          canStillInsert = false;

          if (stepSize > 1) {
            // Checking if there are still empty slots, even when count === arr.size()
            for (var b = 0; b < arr.size(); b++) {
              if (String(arr.value(b)) === "") {
                canStillInsert = true;
                break;
              }
            }
          }

          isArrayFull = true;
          break;
        }

        // If space is available, break
        if (String(arr.value(pos)) === "") {
          break;
        }

        // Insert attempt as highlighting activity
        if (!showCounts) {
          enqueueStep(pos, inputVal, false);
        }

        pos += stepSize;

        // Wrap around to the beginning of the array
        if (pos >= arr.size()) {
          pos %= arr.size();
        }

        // Increment count
        count++;
      }

      // Empty spot found. Insert element inputVal at pos
      if (!isArrayFull) {
        if (!showCounts) {
          enqueueStep(pos, inputVal, true);
        } else {
          return pos;
        }
      }
    } else {    // Otherwise, enqueue insertion activity
      // Hashing position found. Insert activity.
      if (!showCounts) {
        enqueueStep(pos, inputVal, true);
      } else {
        return pos;
      }
    }
  }

  // Pseudo-Random Probing
  function pseudoRandom(inputVal, pos, showCounts, printPerm) {
    // Cast into a number, otherwise '0' will be considered false.
    if ((Number(arr.value(pos))) !== false) {
      var i, j, randomnumber;

      // Create a random permutation slots
      var slots = [0];
      for (i = 1; i < arr.size(); i++) {
        randomnumber = Math.ceil(Math.random() * (arr.size() - 1));

        for (j = 0; j < arr.size(); j++) {
          if (slots[j] === randomnumber) {
            continue;
          }
        }

        slots.push(randomnumber);
      }

      if (printPerm) {
        av.umsg("Permutation: " + slots.join(' '));
      }

      // Counter that counts how many times the loop ran
      var count = 0;

      // Current index of array of permutations
      var currIndex = 1;

      // Position to check, will point to the correct position at the end of the loop
      var temp = pos;

      // Loop across the array. "infinite" loop. Breaks if array is full.
      for (;;) {
        // If array is full, break out
        if (count === arr.size()) {
          canStillInsert = false;

          // Checking if there are still empty slots, even when count === arr.size()
          for (var b = 0; b < arr.size(); b++) {
            if (String(arr.value(b)) === "") {
              canStillInsert = true;
              break;
            }
          }

          isArrayFull = true;
          break;
        }

        // If space is available, break
        if (String(arr.value(temp)) === "") {
          break;
        }

        // Insert attempt as highlighting activity
        if (!showCounts) {
          enqueueStep(temp, inputVal, false);
        }

        // Calculate next position to check by adding the next random slot to the original position
        temp  = pos + slots[currIndex];
        currIndex++;

        // Wrap around to the beginning of the array
        if (temp >= arr.size()) {
          temp %= arr.size();
        }

        // Increment count
        count++;
      }

      // Empty spot found. Insert element inputVal at temp
      if (!isArrayFull) {
        if (!showCounts) {
          enqueueStep(temp, inputVal, true);
        } else {
          return temp;
        }
      }
    }
    else {    // Otherwise, enqueue insertion activity
      // Hashing position found. Insert activity.
      if (!showCounts) {
        enqueueStep(pos, inputVal, true);
      } else {
        return pos;
      }
    }
  }

  // Quadratic Probing
  function quadraticProbing(inputVal, pos, showCounts) {
    // If pos is full, start resolution.
    // Cast into a number, otherwise '0' will be considered false.
    if ((Number(arr.value(pos))) !== false) {

      // Temp pointer that will point to the correct position at the end of the loop
      var temp = pos;

      // Counter that counts how many times the loop ran
      var count = 0;

      // i for the quadratic probing
      var i = 1;

      // Loop across the array. "infinite" loop. Breaks if array is full.
      for (;;) {
        // If array is full, break out
        if (count === arr.size()) {
          canStillInsert = false;

          // Checking if there are still empty slots, even when count === arr.size()
          for (var b = 0; b < arr.size(); b++) {
            if (String(arr.value(b)) === "") {
              canStillInsert = true;
              break;
            }
          }

          isArrayFull = true;
          break;
        }

        // If space is available, break
        if (String(arr.value(temp)) === "") {
          break;
        }

        // Insert attempt as highlighting activity
        if (!showCounts) {
          enqueueStep(temp, inputVal, false);
        }

        // Calculate the next position to check by adding the square of i to the original position, increment i
        temp = pos + i * i;
        i++;

        // Wrap around to the beginning of the array
        if (temp >= arr.size()) {
          temp %= arr.size();
        }

        // Increment count
        count++;
      }

      // Empty spot found. Insert element inputVal at temp
      if (!isArrayFull) {
        if (!showCounts) {
          enqueueStep(temp, inputVal, true);
        } else {
          return temp;
        }
      }
    }
    else {    // Otherwise, enqueue insertion activity
      // Hashing position found. Insert activity.
      if (!showCounts) {
        enqueueStep(pos, inputVal, true);
      } else {
        return pos;
      }
    }
  }


  /**
   * Adds a step to the queue, either solely highlight or highlight and insert
   */
  function enqueueStep(pos, val, insert) {
    // Enqueue highlight step
    var step = {
      position: pos,
      value: val,
      insert: false
    };
    nextStep.enqueue(step);

    // If insertion step
    if (insert) {
      step = {
        position: pos,
        value: val,
        insert: true
      };
      nextStep.enqueue(step);
    }
  }







  /**
   * Runs when page has finished loading
   * Anything that triggers an interaction with an HTML element should be done here
   */
  $(document).ready(function () {

    /* Key Presses */

    // Disable key range as soon as it has been set
    $('#keyrange').change(function () {
      resetAV();
    });

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
      setFunction();
    });

    // Event trigger change if collision function option is changed
    $("#collision").change(function () {
      resetAV();
    });

    // Event trigger change if size of hash changes
    $("#tablesize").change(function () {
      resetAV();
    });

    /* Next button pushed.
     * If no slide show exits, make one.
     * Else, load next slide
     */
    $('#next').click(function () {
      var ret = 1;
      if (nextStep.isEmpty()) {    // Perform first step
        // Input field value
        var inputVal = $("#input").val();

        // Disable input field to process it safely
        $("#input").attr("disabled", "disabled");

        // Process input with selected function
        var hashFunction = $("#function").val();

        switch (hashFunction) {
        case '0':  // No function chosen
          reset();
          break;
        case '1':
          ret = simpleMod(inputVal);
          break;
        case '2':
          ret = binning(inputVal);
          break;
        case '3':
          ret = midSquare(inputVal);
          break;
        case '4':
          ret = simpleStrings(inputVal);
          break;
        case '5':
          ret = improvedStrings(inputVal);
          break;
        }

        // Show first slide if success
        if (ret === 0) {
          loadNextSlide();
        } else {    // Error occurred, re-enable input textfield
          $("#input").removeAttr("disabled");
        }
      } else {    // Load next slide
        loadNextSlide();
        var i;
        var tableSize = $("#tablesize").val();

        // Reset counts to 0
        for (i = 0; i < tableSize; i++) {
          tableCount[i] = 0;
          $('#' + i + '_count').html(0);
        }

        // Recalculate the counts
        for (i = 0; i < tableSize; i++) {
          ret = determineResolution(0, i, true, false);
          var count = tableCount[ret];
          count++;
          tableCount[ret] = count;
          $('#' + ret + '_count').html(count);
        }
      }
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

    // create a new settings panel and specify the link to show it
    var settings = new JSAV.utils.Settings($(".jsavsettings"));

    // Set the default state for the controls
    setDefaultControlState();

    // Get the default HTML for the tablesize dropdown list
    defTableSizeOptions = $('#tablesize').html();

    // Adjust UI element positions
    var contWidth = $('#container').width() - 20; // 20 pixels for padding
    $('.jsavoutput').width(contWidth / 2);
    $('#hashTable').css('left', (3 * contWidth / 4));

    // Call reset - the initial state of the vizualization
    reset();
  });
}(jQuery));