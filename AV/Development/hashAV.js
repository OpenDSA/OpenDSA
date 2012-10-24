"use strict";
/*global alert: true, console: true, is */

/*
 * For queries & switch cases, follow the hashing methods & collision resolutions numbering below:
 * Methods:
 * 1. Simple Mod Hash
 * 2. Binning Hash
 * 3. Mid-Square Hash
 * 4. Simple Hash for Strings
 * 5. Improved Hash for Strings
 *
 * Coliision Resolutions:
 * 1. Linear Probing
 * 2. Linear Probing by Stepsize of 2
 * 3. Linear Probing by Stepsize of 3
 * 4. Pseudo-Random Probing
 * 5. Quadratic Probing
 *
 * To handle queries:
 * Set the method parameter and collision parameter according to reference above.
 * For example, to choose Mid-Square Hash with pseudo-random probing, you would use:
 * hash.html?method=3&collision=4
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
  var defArrSizeOptions;       // Stores the HTML of the default arraySize options
  var av;                      // JSAV
  var arr;                     // JSAV Array
  var nextStep = new Queue();  // A queue that will contain the "next step". Stores position and value of next step as an object
  var tableCount;              // Array that will hold an object that contains the show counts value
  var fullArray = false;       // Flag that determines whether array is full or not
  var canStillInsert = false;  // Flag that determines that even though the number of insertion attempts is greater than the array size, there are still slots available in the array.

  // Initialize JSAV object
  av = new JSAV("hashAV_avc");

  // Process About button: Pop up a message with an Alert
  function about() {
    var aboutStr = "Hashing Visualization\nWritten by Nayef Copty & Mauricio del la Bara.\nCreated as part of the OpenDSA hypertextbook project.\n";
    aboutStr += "For more information, see http://algoviz.org/OpenDSA\nWritten during Spring 2012\nLast Update: October 2012\nJSAV Library Version: " + JSAV.version();
    alert(aboutStr);
  }
  
  /**
   * Wrapper class for error messages
   */
  function error(message) {
    av.umsg(message, {"color" : "red"});
    av.umsg("<br />");
  }

  /* Query Parameters */
  // Query flag. 1 if a query is set, 0 if not.
  var paramFlag = 0;
  var params = JSAV.utils.getQueryParameter();

  // Check that the query has correct format to prevent injections
  if (params) {
    // Set method according to query parameter
    if (params.method) {
      if (params.method > 0 && params.method < 5) {
        $("#function").val(params.method);
        $('#function').attr("disabled", "disabled");
        paramFlag++;
      } else {
        console.error("Invalid URL parameter method: " + params.method);
      }
    }
    else {
      params.method = 0;
    }

    // Set collision resolution policy according to query parameter
    if (params.collision) {
      if (params.collision > 0 && params.collision < 5) {
        $("#collision").val(params.collision);
        $('#collision').attr("disabled", "disabled");
        paramFlag++;
      } else {
        console.error("Invalid URL parameter collision: " + params.collision);
      }
    }
    else {
      params.collision = 0;
    }

    // If a query parameter has been set and enable table size dropdown
    if (paramFlag === 2) {
      $("#arraysize").removeAttr("disabled");
    }
  }

  /*
   * Reset Function
   * There are a few things that must be restarted - please examine code.
   */
  function reset() {
    // Clear any existing messages and hash table data
    av.clearumsg();
    $('#hashTable').html('');
    
    // Reset the array size dropdown back to normal, in case mid-squares was previously selected
    $("#arraysize").html(defArrSizeOptions);

    // Reset & disable dropdowns
    $("#function").val(params.method);
    $("#collision").val(params.collision);
    $("#arraysize").val(0);
    $('#keyrange').val(0);
    $('#input').attr("disabled", "disabled");
    $('#collision').attr("disabled", "disabled");
    $('#keyrange').attr("disabled", "disabled");

    // Clear input textbox and disable next button
    $("#input").val("");
    $('#next').attr("disabled", "disabled");

    // Enable function dropdown and disable array size dropdown if a query paramter has not been set
    if (paramFlag === 0) {
      $("#function").removeAttr("disabled");
      $('#arraysize').attr("disabled", "disabled");
      av.umsg("Please select a hashing function");
    }
    else {    // Otherwise, ask user to enter a table size
      av.umsg("Please select a table size");
    }
  }

  function loadNextSlide() {
    var next = nextStep.dequeue();

    if (next.insert) {    // Insertion step
      av.umsg("Inserting " + next.value + " at position " + next.position + ".");
      av.umsg("<br>");
      arr.unhighlight(next.position);
      arr.value(next.position, next.value);
      // Clear input value box
      $("#input").val("");
    } else {    // Highlighting step
      av.umsg("Attempting to insert " + next.value + " at position " + next.position + ".");
      arr.unhighlight();
      arr.highlight(next.position);
    }

    // Disable Next Button & re-enable input field if queue is empty
    if (nextStep.isEmpty()) {
      // If array is full at the end of dequeue, display message
      if (fullArray) {
        var errorMsg;
        if (canStillInsert) {
          errorMsg = "Array is not full, but number of insertion attempts is greater than array size. Insertion failed.";
          canStillInsert = false;
        } else {
          errorMsg = "Array is full. Insertion failed. Please Restart.";
        }
        
        error(errorMsg);
        // Reset flag
        fullArray = false;
      }

      $('#next').attr("disabled", "disabled");
      $("#input").removeAttr("disabled");
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
    if (keyrange === 0) {
      error("Please select a key range.");
      // Return error
      return 1;
    }
    else {    // Else, get key range selected
      switch (keyrange) {
      case '1':
        keyrange = 100;
        break;

      case '2':
        keyrange = 1000;
        break;
      }

      // Check that the input value is a number within the correct range
      if (inputVal >= keyrange || inputVal < 0 || isNaN(inputVal)) {
        error("Please enter an input value between 0 and " + keyrange - 1 + ".");
        // Return Error
        return 1;
      }
      else {
        av.umsg("Attempting to insert: " + inputVal);

        // Binning function Position
        var binsize = keyrange / $("#arraysize").val();
        var pos =  Math.floor(inputVal / binsize);

        av.umsg("Bin Size = Key Range / Table Size");
        av.umsg("Bin Size = " + keyrange + " / " + $("#arraysize").val() + " = " + binsize.toFixed(2));
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
    var size = $("#arraysize").val();
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
    if (size === 16) {
      av.umsg("16-bit binary digit = " + binaryDigit);
    } else if (size === 8) {
      av.umsg("8-bit binary digit = " + binaryDigit);
    }
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
    var size = $("#arraysize").val();

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

    var size = $("#arraysize").val();
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
          if (stepSize > 1) {
            // Checking if there are still empty slots, even when count === arr.size()
            for (var b = 0; b < arr.size(); b++) {
              if (String(arr.value(b)) === "") {
                canStillInsert = true;
                break;
              }
            }
          }
          
          fullArray = true;
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
      if (!fullArray) {
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
          // Checking if there are still empty slots, even when count === arr.size()
          for (var b = 0; b < arr.size(); b++) {
            if (String(arr.value(b)) === "") {
              canStillInsert = true;
              break;
            }
          }

          fullArray = true;
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
      if (!fullArray) {
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
          // Checking if there are still empty slots, even when count === arr.size()
          for (var b = 0; b < arr.size(); b++) {
            if (String(arr.value(b)) === "") {
              canStillInsert = true;
              break;
            }
          }

          fullArray = true;
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
      if (!fullArray) {
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
    // Adjust UI element positions
    var contWidth = $('#container').width() - 20; // 20 pixels for padding
    $('.jsavoutput').width(contWidth / 2);
    $('#hashTable').css('left', (3 * contWidth / 4));
  
    /* Key Presses */
    
    // Enable Next as soon as the text field has been changed
    $('#input').keypress(function () {
      $('#next').removeAttr("disabled");
    });

    // Disable key range as soon as it has been set
    $('#keyrange').change(function () {
      $("#keyrange").attr("disabled", "disabled");
    });


    /* Event Triggers */

    // Event trigger change if hashing function option is changed
    $("#function").change(function () {
      if ($(this).val() === 0) {
        reset();
      }
      else {

        // Enable table size
        $("#arraysize").removeAttr("disabled");

        // Disable function change
        $("#function").attr("disabled", "disabled");

        // Display Appropriate Message and Enable Appropriate Controls for each function
        switch ($(this).val()) {
        // Simple Mod
        case '1':
          av.umsg("Algorithm Selected: Simple Mod");
          av.umsg("Please select a table size");
          break;

        // Binning
        case '2':
          // Enable key range
          $("#keyrange").removeAttr("disabled");
          av.umsg("Algorithm Selected: Binning");
          av.umsg("Please select a table size and a key range.");
          break;

        // Mid Square
        case '3':
          // Change array size options to only 8 and 16
          $("#arraysize").html('<option value="0"> Table Size</option> <option value="8"> 8</option> <option value="16"> 16</option>');
          av.umsg("Algorithm Selected: Mid Square Method");
          av.umsg("Please select a table size");
          break;

        // Simple Strings
        case '4':
          av.umsg("Algorithm Selected: Simple Hashing for Strings");
          av.umsg("Please select a table size");
          break;

        // Improved Strings
        case '5':
          av.umsg("Algorithm Selected: Improved Hashing for Strings");
          av.umsg("Please select a table size");
          break;
        }
      }
    });
    

    // Event trigger change if collision function option is changed
    $("#collision").change(function () {
      if ($(this).val() === 0) {
        //av.umsg("Please select a collision resolution method");
        reset();
      }
      else {
        // Enable collision resolution selection
        $("#input").removeAttr("disabled");

        av.umsg("Enter a value and click Next");
        av.umsg("<br />");
        
        // Display Appropriate Message and Enable Appropriate Controls for each function
        switch ($(this).val()) {
        // Linear Probing
        case '1':
          av.umsg("Collision Resolution Selected: Linear Probing");
          break;

        // Linear Probing by Stepsize of 2
        case '2':
          av.umsg("Collsion Resolution Selected: Linear Probing by Stepsize of 2");
          break;

        // Linear Probing by Stepsize of 3
        case '3':
          av.umsg("Algorithm Selected: Linear Probing by Stepsize of 3");
          break;

        // Pseudo-random Probing
        case '4':
          av.umsg("Collision Resolution Selected: Pseudo-random Probing");
          break;

        // Quadratic Probing
        case '5':
          av.umsg("Collsion Resolution Selected: Quadratic Probing");
          break;
        }
      }
    });


    // Event trigger change if size of hash changes
    $("#arraysize").change(function () {
      // Draw new array
      var size = $('#arraysize').val();
      
      var htmlData = "";
      for (var i = 0; i < size; i++) {
        htmlData += "<li></li>";
      }
      
      var $hashTable = $('#hashTable');
      $hashTable.html(htmlData);

      // Create a new JSAV array
      arr = av.ds.array($hashTable, {indexed: true, layout: "vertical", center: false});

      // If query parameters are set, ask user to input a value to hash
      if (paramFlag) {

        // Enable collision resolution selection
        $("#input").removeAttr("disabled");

        av.umsg("Enter a value and click Next");
        av.umsg("<br />");
      }

      // Else, user must select a collision resolution policy
      else {
        $("#collision").removeAttr("disabled");
        av.umsg("Please select a collision resolution policy.");
      }
      
      tableCount = [];
      
      // Append a span containing the count to each index
      $('li.jsavindex').each(function (index, item) {
        $(item).append('<span id="' + index + '_count" class="jsavindexlabel countlabel" style="top: 5px; right: -20px; display: none;">1</span>');
        tableCount[index] = {'count': 1, 'visited': false};
      });
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

        // Disable array size drop down to avoid havoc
        $("#arraysize").attr("disabled", "disabled");

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
        var tableSize = $("#arraysize").val();

        // Restart counts to 0 to be able to recalculate the counts
        // The label stays the same - so this won't affect what the user sees
        for (i = 0; i < tableSize; i++) {
          tableCount[i].count = 0;
          tableCount[i].visited = false;
        }

        for (i = 0; i < tableSize; i++) {
          ret = determineResolution(0, i, true, false);
          var count = tableCount[ret].count;
          count++;
          tableCount[ret].count = count;
          tableCount[ret].visited = true;
          $('#' + ret + '_count').html(count);
        }

        for (i = 0; i < tableSize; i++) {
          if (tableCount[i].visited === false) {
            tableCount[i].count = 0;
            $('#' + i + '_count').html(0);
          }
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
        $('#showcounts').text('Hide Counts');
      } else {
        $('.countlabel').hide();
        $('#showcounts').text('Show Counts');
      }
    });
    
    // Get the default HTML for the arraysize dropdown list
    defArrSizeOptions = $('#arraysize').html();
    
    // Call reset - the initial state of the vizualization
    reset();
  });
}(jQuery));