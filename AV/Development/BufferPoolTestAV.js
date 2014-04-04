"use strict";

(function ($) {

  /* Variables */
  var jsav,
      jsav_counter,                     
      main_memory,                      
      buffer_pool,
      freq_counter,
      lines
      
  var counter = 0;

  function array_init() {
    var empty = [];
    lines = [];
    main_memory = jsav.ds.array(empty, {layout: "vertical", left: 450});
    buffer_pool = jsav.ds.array(empty, {indexed: true, layout: "vertical", left: 800});
    freq_counter = jsav_counter.ds.array(empty, {indexed: true, layout: "vertical", left: 0});
  }

  function contains(arg) {
    var i;
    for (i = 0; i < buffer_pool.size(); i++) {
      if (buffer_pool.value(i) == arg)
        return true;
    }
    return false;
  }

  /**
   * Instruct the user on what fields they are missing and clear and redraw the hash table
   */
  function resetAV() {
    // Display a message telling them what fields they need to select
    counter = 0;
    main_memory.clear();
    buffer_pool.clear();
    jsav.clearumsg();
    var missingFields = [];

    // Ensure user selected a replacement strategy
    var funct = Number($('#function').val());
    if (funct === 0) {
      missingFields.push('replacement strategy');
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

    } else {
      // If all necessary fields are selected, enable the input box and tell the user to begin
      $("#input").removeAttr("disabled");
      $("#function").attr("disabled", "disabled");
      $("#mainmemory_size").attr("disabled", "disabled");
      $("#bufferpool_size").attr("disabled", "disabled");

      jsav.umsg("Enter a value and click Next");
      jsav.umsg("<br />");
    }
    var replacement = $("#function").val();

    // Create a new JSAV array
    var main_memory_size = $('#mainmemory_size').val();
    if (main_memory_size > 0) {
      var empty = [];
      empty.length = main_memory_size;
      var i;
      for (i = 0; i < main_memory_size; i++) {
        empty[i] = i;
      }
      main_memory = jsav.ds.array(empty, {layout: "vertical", left: 0});
    }

    var buf_size = $('#bufferpool_size').val();
    if (buf_size > 0) {
      var empty = [];
      var temp = [];

      empty.length = buf_size;
      temp.length = buf_size;

      var i;
      for (i = 0; i < buf_size; i++) {
        temp[i] = 0;
      }
      lines.size = buf_size;
      buffer_pool = jsav.ds.array(empty, {indexed: true, layout: "vertical", left: 315});
      freq_counter = jsav_counter.ds.array(temp, {layout: "vertical", left: 0, top: -21});
      freq_counter.hide();
    }
    if (replacement == 3) {
      freq_counter.show();  
    }

  }

  function LRU(input_val, counter) {
    if (contains(input_val)) {
      var i;
      var temp = [];
      temp.length = buffer_pool.size();
      var old_first = buffer_pool.value(0);
      temp[0] = input_val;
      var curr_index = 1;
      var size;
      if (counter < buffer_pool.size()) {
        size = counter;
      }
      else {
        size = buffer_pool.size();
      }
      for (i = 0; i < size; i++) {
        if (buffer_pool.value(i) != input_val) {
          temp[curr_index] = buffer_pool.value(i);
          curr_index++;
        }
      }
      for (i = 0; i< size; i++) {
        lines[i].hide();
      }      
      for (i = 0; i < size; i++) {
        buffer_pool.value(i, temp[i]);
        lines[i] = jsav.g.line(105,  45 + 45 * buffer_pool.value(i),  320, 45 + 45 * i, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
      }
      jsav.umsg("sector " + input_val + " already in buffer pool");
      jsav.umsg("moving buffer holding sector " + input_val + " to the front");
      return true;
    }
    else {
      if (counter == 0) {
        jsav.umsg("storing sector " + input_val + " in buffer pool");
        buffer_pool.value(0, input_val);
        lines[0] = jsav.g.line(105,  45 + 45 * input_val,  320, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        jsav.displayInit();
      }
      else if (counter < buffer_pool.size()) {
        jsav.umsg("storing sector " + input_val + " in buffer pool");
        for (i = 0; i< counter; i++) {
          lines[i].hide();
        }

        var temp = [];
        temp.length = buffer_pool.size();
        temp[0] = input_val;
        lines[0] = jsav.g.line(105,  45 + 45 * input_val,  320, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});

        var i;
        for (i = 0; i < counter; i++) {
          temp[i+1] = buffer_pool.value(i);
          lines[i+1] = jsav.g.line(105,  45 + 45 * buffer_pool.value(i),  320, 45 + 45 * (i+1), {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }

        for (i = 0; i < buffer_pool.size(); i++) {
          buffer_pool.value(i, temp[i]);
        }
      }
      else {
        jsav.umsg("request to sector " + input_val + " requires emptying least recently used buffer");
        for (i = 0; i< buffer_pool.size(); i++) {
          lines[i].hide();
        }

        var temp = [];
        temp.length = buffer_pool.size();
        temp[0] = input_val;
        lines[0] = jsav.g.line(105,  45 + 45 * input_val,  320, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});

        var i;
        for (i = 0; i < buffer_pool.size()-1; i++) {
          temp[i+1] = buffer_pool.value(i);
          lines[i+1] = jsav.g.line(105,  45 + 45 * buffer_pool.value(i),  320, 45 + 45 * (i+1), {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }

        for (i = 0; i < buffer_pool.size(); i++) {
          buffer_pool.value(i, temp[i]);
        }
      }
      return false;
    }
  }

  function FIFO(input_val, counter) {
    if (contains(input_val)) {
    }
    else {
      if (counter == 0) {
        jsav.umsg("storing sector " + input_val + " in buffer pool");
        buffer_pool.value(0, input_val);
        lines[0] = jsav.g.line(105,  45 + 45 * input_val,  320, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        jsav.displayInit();
      }
      else if (counter < buffer_pool.size()) {
        jsav.umsg("storing sector " + input_val + " in buffer pool");
        for (i = 0; i< counter; i++) {
          lines[i].hide();
        }

        var temp = [];
        temp.length = buffer_pool.size();
        temp[0] = input_val;
        lines[0] = jsav.g.line(105,  45 + 45 * input_val,  320, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});

        var i;
        for (i = 0; i < counter; i++) {
          temp[i+1] = buffer_pool.value(i);
          lines[i+1] = jsav.g.line(105,  45 + 45 * buffer_pool.value(i),  320, 45 + 45 * (i+1), {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }

        for (i = 0; i < buffer_pool.size(); i++) {
          buffer_pool.value(i, temp[i]);
        }

      }
      else {
        jsav.umsg("emptying buffer at the end of the queue");
        for (i = 0; i< buffer_pool.size(); i++) {
          lines[i].hide();
        }

        var temp = [];
        temp.length = buffer_pool.size();
        temp[0] = input_val;
        lines[0] = jsav.g.line(105,  45 + 45 * input_val,  320, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});

        var i;
        for (i = 0; i < buffer_pool.size()-1; i++) {
          temp[i+1] = buffer_pool.value(i);
          lines[i+1] = jsav.g.line(105,  45 + 45 * buffer_pool.value(i),  320, 45 + 45 * (i+1), {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }

        for (i = 0; i < buffer_pool.size(); i++) {
          buffer_pool.value(i, temp[i]);
        }
      }
    }
  }
  function LFU(input_val, counter) {
    if (contains(input_val)) {
      jsav.umsg("sector " + input_val + " already in buffer pool");
      jsav.umsg("incrementing counter for sector " + input_val);
      var size;
      if (counter < buffer_pool.size()) {
        size = counter;
      }
      else {
        size = buffer_pool.size();
      }
      for (i = 0; i< size; i++) {
        lines[i].hide();
      } 
      var i;
      var temp = [];
      temp.length = buffer_pool.size();
      for (i = 0; i < size; i++) {
        if (buffer_pool.value(i) == input_val) {
          freq_counter.value(i, freq_counter.value(i) + 1);
        }
      }
      var x, y, max;
      for (x = 0; x < size-1; x++) {
        max = x;
        for ( y = x + 1; y < size; y++) {
          if (freq_counter.value(y) > freq_counter.value(max)) {
            max = y;
          }
        }
        if (max != x) {
          var old;
          old = freq_counter.value(x);
          freq_counter.value(x, freq_counter.value(max));
          freq_counter.value(max, old);

          old = buffer_pool.value(x);
          buffer_pool.value(x, buffer_pool.value(max));
          buffer_pool.value(max, old);
        }
      }
      for (i = 0; i < size; i++) {
        lines[i] = jsav.g.line(105,  45 + 45 * buffer_pool.value(i),  320, 45 + 45 * i, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
      }
      return true;
    }
    else {
      if (counter == 0) {
        jsav.umsg("storing sector " + input_val + " in buffer pool");
        buffer_pool.value(0, input_val);
        lines[0] = jsav.g.line(105,  45 + 45 * input_val,  320, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        jsav.displayInit();
      }
      else if (counter < buffer_pool.size()) {
        jsav.umsg("storing sector " + input_val + " in buffer pool");
        for (i = 0; i< counter; i++) {
          lines[i].hide();
        }

        var temp = [];
        temp.length = buffer_pool.size();
        temp[counter] = input_val;

        var i;
        for (i = 0; i < counter-1; i++) {
          temp[i] = buffer_pool.value(i);
        }

        for (i = 0; i < buffer_pool.size(); i++) {
          buffer_pool.value(i, temp[i]);
        }
        for (i = 0; i < counter+1; i++) {
          lines[i] = jsav.g.line(105,  45 + 45 * buffer_pool.value(i),  320, 45 + 45 * i, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }
      }
      else {
        jsav.umsg("request to sector " + input_val + " requires emptying least frequently used buffer");
        for (i = 0; i< buffer_pool.size(); i++) {
          lines[i].hide();
        }
        buffer_pool.value(buffer_pool.size()-1, input_val);
        freq_counter.value(buffer_pool.size()-1, 0);
        for (i = 0; i < buffer_pool.size(); i++) {
          lines[i] = jsav.g.line(105,  45 + 45 * buffer_pool.value(i),  320, 45 + 45 * i, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }
      }
      return false;
    }
  }

  /**
   * Runs when page has finished loading
   * Anything that triggers an interaction with an HTML element should be done here
   */
  $(document).ready(function () {
    jsav = new JSAV($('.avcontainer'));
    jsav_counter = new JSAV($('.av'));
    array_init();
    jsav.displayInit();
    counter = 0;
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

    $('#reset').click(function () {
      location.reload(true);
    });
    // Next button pushed.
    $('#next').click(function () {
      var replacement = $("#function").val();
      var input_val = $("#input").val();
      if (input_val < 0 || input_val >= main_memory.size())
        jsav.umsg("enter a valid value");
      else {
        jsav.umsg("requesting sector " + input_val);
        if (replacement == 1) {
          if (!LRU(input_val, counter))
            counter++;
        }
        else if (replacement == 2){
          FIFO(input_val, counter);
          counter++;
        }
        else {
          if (!LFU(input_val, counter))
            counter++;
        }
        var i;
        for (i = 0; i < main_memory.size(); i++) {
          main_memory.unhighlight(i);
        }
        for (i = 0; i < buffer_pool.size(); i++) {
          main_memory.highlight(buffer_pool.value(i));
        }
      }
      jsav.umsg("<p></p>");
    });

    // Adjust UI element positions
    var contWidth = $('#container').width() - 20; // 20 pixels for padding
    $('.jsavoutput').width(contWidth / 3);
  });
}(jQuery));
