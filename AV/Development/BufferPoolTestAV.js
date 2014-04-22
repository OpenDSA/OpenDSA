"use strict";
// bug when move element up, then add
(function ($) {

  /* Variables */
  var jsav,
      jsav_counter,                     
      main_memory,                      
      buffer_pool,
      freq_counter,
      lines
      
  var counter = 0;
  var index = [];
  var index_size = 0;
  var LRU_replacement = 0;
  var LRU_move_up = 0;

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

  function clear_lines() {
    for (i = 0; i< buffer_pool.size(); i++) {
      lines[i].hide();
    }
  }

  /**
   * Instruct the user on what fields they are missing and clear and redraw the hash table
   */
  function resetAV() {
    // Display a message telling them what fields they need to select
    counter = 0;
    main_memory.clear();
    buffer_pool.clear();
    freq_counter.clear();
    if (index_size != 0) {
      var i;
      for (i = 0; i < index_size; i++) {
        index[i].hide();
      }
    }
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
      jsav.label("main memory", {"top": 0, "left": "19px"});    
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
      buffer_pool = jsav.ds.array(empty, {layout: "vertical", left: 250});
      jsav.label("buffer pool", {"top": 0, "left": "280px"});    
      freq_counter = jsav_counter.ds.array(temp, {layout: "vertical", left: -10, top: -21});
      freq_counter.hide();
    }
    if (replacement == 3) {
      freq_counter.show();  
    }
    index.length = buf_size;
    index_size = buf_size;
    var i;
    for (i = 0; i < index.length; i++) {
      index[i] = jsav.label(i, {"top": 35 + 45 * i, "left": "400px"});
    }
  }

  function LRU(input_val, counter) {
    if (LRU_replacement != 0) {
      LRU_full(input_val, counter);
      if (LRU_replacement == 3) {
        return false;
      }
      return true;
    }
    else if (LRU_move_up != 0) {
      LRU_moveup(input_val, counter);
      return true;
    }
    else {
      console.log(input_val);
      if (contains(input_val)) {
        LRU_contains(input_val, counter);
        return true;
      }
      else {
        LRU_new(input_val, counter);
        return false;
      }

    }
  }

  function LRU_moveup(input_val, counter) {
    var size;
    if (counter < buffer_pool.size()) {
      size = counter;
    }
    else {
      size = buffer_pool.size();
    }
    if (LRU_move_up == 1) {
      for (i = 0; i< size; i++) {
        lines[i].hide();
      }
      var i;
      var index = 0;
      for (i = 0; i < size; i++) {
        if (buffer_pool.value(i) == input_val) {
          index = i;
          buffer_pool.unhighlight(i);
        }
      }
      buffer_pool.value(index, "");
      for (i = 0; i < size; i++) {
        if (buffer_pool.value(i) != "") {
          lines[i] = jsav.g.line(145,  45 + 45 * buffer_pool.value(i),  255, 45 + 45 * i, 
            {'arrow-end': 'classic-wide-long','stroke-width' : 3});
        }
      }
      LRU_move_up++;
    }

    else if (LRU_move_up == 2) {
      for (i = 0; i< size; i++) {
        lines[i].hide();
      }      
      var index;
      var i;
      for (i = 0; i < size; i++) {
        if (buffer_pool.value(i) == "") {
          index = i;
        }
      }
      for (i = index - 1; i > -1; i--) {
        jsav.effects.moveValue(buffer_pool, i, buffer_pool, i+1);
      }
      for (i = 0; i < buffer_pool.size(); i++) {
        if (buffer_pool.value(i) != "") {
          lines[i] = jsav.g.line(145,  45 + 45 * buffer_pool.value(i),  255, 45 + 45 * i, 
            {'arrow-end': 'classic-wide-long','stroke-width' : 3});
        }
      }
      LRU_move_up++;
    }

    else if (LRU_move_up == 3) {
      jsav.umsg("storing sector " + input_val + " in buffer pool");
      buffer_pool.value(0, input_val);
      lines[0] = jsav.g.line(145,  45 + 45 * input_val,  255, 45, 
        {'arrow-end': 'classic-wide-long','stroke-width' : 3});
      LRU_move_up = 0;
    }
  }

  function LRU_full(input_val, counter) {
    if (LRU_replacement == 1) {
      buffer_pool.unhighlight(buffer_pool.size()-1);
      clear_lines();
      var temp = [];
      temp.length = buffer_pool.size();
      var i;
      for (i = 0; i < buffer_pool.size()-1; i++) {
        temp[i] = buffer_pool.value(i);
        lines[i] = jsav.g.line(145,  45 + 45 * buffer_pool.value(i),  255, 45 + 45 * i, 
          {'arrow-end': 'classic-wide-long','stroke-width' : 3});
      }
      buffer_pool.value(buffer_pool.size()-1, "");
      lines[buffer_pool.size()-1].hide();
      for (i = 0; i < buffer_pool.size()-1; i++) {
        buffer_pool.value(i, temp[i]);
      }
      LRU_replacement++;
    }

    else if (LRU_replacement == 2) {
      clear_lines();
      var i;
      for (i = buffer_pool.size()-2; i > -1; i--) {
        jsav.effects.moveValue(buffer_pool, i, buffer_pool, i+1);
      }
      var temp = [];
      temp.length = buffer_pool.size();
      for (i = 0; i < buffer_pool.size(); i++) {
        temp[i] = buffer_pool.value(i);
        if (buffer_pool.value(i) != "") {
          lines[i] = jsav.g.line(145,  45 + 45 * buffer_pool.value(i),  255, 45 + 45 * i, 
            {'arrow-end': 'classic-wide-long','stroke-width' : 3});
        }
      }
      LRU_replacement++;
    }
    else if (LRU_replacement == 3) {
      jsav.umsg("storing sector " + input_val + " in buffer pool");
      buffer_pool.value(0, input_val);
      lines[0] = jsav.g.line(145,  45 + 45 * input_val,  255, 45, 
        {'arrow-end': 'classic-wide-long','stroke-width' : 3});
      LRU_replacement = 0;
    }
  }

  function LRU_contains(input_val, counter) {
    var i;
    if (buffer_pool.value(0) == input_val) {
      jsav.umsg("sector " + input_val + " already in buffer pool");
      jsav.umsg("sector " + input_val + " already at front of buffer pool");
    }
    else {
      for (i = 0; i < buffer_pool.size(); i++) {
        if (buffer_pool.value(i) == input_val) {
          buffer_pool.highlight(i);
        }
      }
      LRU_move_up++;
      jsav.umsg("sector " + input_val + " already in buffer pool");
      jsav.umsg("moving buffer holding sector " + input_val + " to the front");
    }
  }

  function LRU_new(input_val, counter) {
    if (counter == 0) {
      jsav.umsg("storing sector " + input_val + " in buffer pool");
      buffer_pool.value(0, input_val);
      lines[0] = jsav.g.line(145,  45 + 45 * input_val,  255, 45, 
        {'arrow-end': 'classic-wide-long','stroke-width' : 3});
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
      lines[0] = jsav.g.line(145,  45 + 45 * input_val,  255, 45, 
        {'arrow-end': 'classic-wide-long','stroke-width' : 3});

      var i;
      for (i = 0; i < counter; i++) {
        temp[i+1] = buffer_pool.value(i);
        lines[i+1] = jsav.g.line(145,  45 + 45 * buffer_pool.value(i),  255, 45 + 45 * (i+1), 
          {'arrow-end': 'classic-wide-long','stroke-width' : 3});
      }

      for (i = 0; i < buffer_pool.size(); i++) {
        buffer_pool.value(i, temp[i]);
      }
    }
    else {
      if (LRU_replacement == 0) {
        jsav.umsg("request to sector " + input_val + " requires emptying least recently used buffer");
        buffer_pool.highlight(buffer_pool.size()-1);
        LRU_replacement++;
      }
    }
  }


  function FIFO(input_val, counter) {
    if (contains(input_val)) {
    }
    else {
      if (counter == 0) {
        jsav.umsg("storing sector " + input_val + " in buffer pool");
        buffer_pool.value(0, input_val);
        lines[0] = jsav.g.line(145,  45 + 45 * input_val,  255, 45, 
          {'arrow-end': 'classic-wide-long','stroke-width' : 3});
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
        lines[0] = jsav.g.line(145,  45 + 45 * input_val,  255, 45, 
          {'arrow-end': 'classic-wide-long','stroke-width' : 3});

        var i;
        for (i = 0; i < counter; i++) {
          temp[i+1] = buffer_pool.value(i);
          lines[i+1] = jsav.g.line(145,  45 + 45 * buffer_pool.value(i),  255, 45 + 45 * (i+1), 
            {'arrow-end': 'classic-wide-long','stroke-width' : 3});
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
        lines[0] = jsav.g.line(145,  45 + 45 * input_val,  255, 45, 
          {'arrow-end': 'classic-wide-long','stroke-width' : 3});

        var i;
        for (i = 0; i < buffer_pool.size()-1; i++) {
          temp[i+1] = buffer_pool.value(i);
          lines[i+1] = jsav.g.line(145,  45 + 45 * buffer_pool.value(i),  255, 45 + 45 * (i+1), 
            {'arrow-end': 'classic-wide-long','stroke-width' : 3});
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
        lines[i] = jsav.g.line(145,  45 + 45 * buffer_pool.value(i),  255, 45 + 45 * i, 
          {'arrow-end': 'classic-wide-long','stroke-width' : 3});
      }
      return true;
    }
    else {
      if (counter == 0) {
        jsav.umsg("storing sector " + input_val + " in buffer pool");
        buffer_pool.value(0, input_val);
        lines[0] = jsav.g.line(145,  45 + 45 * input_val,  255, 45, 
          {'arrow-end': 'classic-wide-long','stroke-width' : 3});
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
          lines[i] = jsav.g.line(145,  45 + 45 * buffer_pool.value(i),  255, 45 + 45 * i, 
            {'arrow-end': 'classic-wide-long','stroke-width' : 3});
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
          lines[i] = jsav.g.line(145,  45 + 45 * buffer_pool.value(i),  255, 45 + 45 * i, 
            {'arrow-end': 'classic-wide-long','stroke-width' : 3});
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
