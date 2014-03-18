"use strict";

(function ($) {

  /* Variables */
  var jsav,                     
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
    freq_counter = jsav.ds.array(empty, {indexed: true, layout: "vertical", left: 600});
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

      var msg = 'Please select: ' + missingFields.join(', ');
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
      main_memory = jsav.ds.array(empty, {layout: "vertical", left: 450});
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
      buffer_pool = jsav.ds.array(empty, {indexed: true, layout: "vertical", left: 800});
      freq_counter = jsav.ds.array(temp, {layout: "vertical", left: 950});
      freq_counter.hide();
    }
    if (replacement == 3) {
      freq_counter.show();  
    }

  }

  function LRU(input_val, counter) {
    console.log("counter " + counter);
    if (contains(input_val)) {
      var i;
      var temp = [];
      temp.length = buffer_pool.size();
      var old_first = buffer_pool.value(0);
      temp[0] = input_val;
      var counter = 1;
      for (i = 0; i < buffer_pool.size(); i++) {
        if (buffer_pool.value(i) != input_val) {
          temp[counter] = buffer_pool.value(i);
          counter++;
        }
      }
      for (i = 0; i< buffer_pool.size(); i++) {
        lines[i].hide();
      }      
      for (i = 0; i < buffer_pool.size(); i++) {
        buffer_pool.value(i, temp[i]);
        lines[0] = jsav.g.line(560,  45 + 45 * buffer_pool.value(i),  775, 45 + 45 * i, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
      }
    }
    else {
      if (counter == 0) {
        buffer_pool.value(0, input_val);
        lines[0] = jsav.g.line(560,  45 + 45 * input_val,  775, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        jsav.displayInit();
      }
      else if (counter < buffer_pool.size()) {
        for (i = 0; i< counter; i++) {
          lines[i].hide();
        }

        var temp = [];
        temp.length = buffer_pool.size();
        temp[0] = input_val;
        lines[0] = jsav.g.line(560,  45 + 45 * input_val,  775, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});

        var i;
        for (i = 0; i < counter; i++) {
          temp[i+1] = buffer_pool.value(i);
          lines[i+1] = jsav.g.line(560,  45 + 45 * buffer_pool.value(i),  775, 45 + 45 * (i+1), {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }

        for (i = 0; i < buffer_pool.size(); i++) {
          buffer_pool.value(i, temp[i]);
        }
      }
      else {
        for (i = 0; i< buffer_pool.size(); i++) {
          lines[i].hide();
        }

        var temp = [];
        temp.length = buffer_pool.size();
        temp[0] = input_val;
        lines[0] = jsav.g.line(560,  45 + 45 * input_val,  775, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});

        var i;
        for (i = 0; i < buffer_pool.size()-1; i++) {
          temp[i+1] = buffer_pool.value(i);
          lines[i+1] = jsav.g.line(560,  45 + 45 * buffer_pool.value(i),  775, 45 + 45 * (i+1), {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }

        for (i = 0; i < buffer_pool.size(); i++) {
          buffer_pool.value(i, temp[i]);
        }
      }
    }
  }

  function FIFO(input_val, counter) {
    if (contains(input_val)) {
    }
    else {
      if (counter == 0) {
        buffer_pool.value(0, input_val);
        lines[0] = jsav.g.line(560,  45 + 45 * input_val,  775, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        jsav.displayInit();
      }
      else if (counter < buffer_pool.size()) {
        for (i = 0; i< counter; i++) {
          lines[i].hide();
        }

        var temp = [];
        temp.length = buffer_pool.size();
        temp[0] = input_val;
        lines[0] = jsav.g.line(560,  45 + 45 * input_val,  775, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});

        var i;
        for (i = 0; i < counter; i++) {
          temp[i+1] = buffer_pool.value(i);
          lines[i+1] = jsav.g.line(560,  45 + 45 * buffer_pool.value(i),  775, 45 + 45 * (i+1), {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }

        for (i = 0; i < buffer_pool.size(); i++) {
          buffer_pool.value(i, temp[i]);
        }

      }
      else {
        
        for (i = 0; i< buffer_pool.size(); i++) {
          lines[i].hide();
        }

        var temp = [];
        temp.length = buffer_pool.size();
        temp[0] = input_val;
        lines[0] = jsav.g.line(560,  45 + 45 * input_val,  775, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});

        var i;
        for (i = 0; i < buffer_pool.size()-1; i++) {
          temp[i+1] = buffer_pool.value(i);
          lines[i+1] = jsav.g.line(560,  45 + 45 * buffer_pool.value(i),  775, 45 + 45 * (i+1), {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }

        for (i = 0; i < buffer_pool.size(); i++) {
          buffer_pool.value(i, temp[i]);
        }
      }
    }
  }
  function LFU(input_val, counter) {
    if (contains(input_val)) {
      for (i = 0; i< buffer_pool.size(); i++) {
        lines[i].hide();
      } 

      var i;
      var temp = [];
      temp.length = buffer_pool.size();
      for (i = 0; i < buffer_pool.size(); i++) {
        if (buffer_pool.value(i) == input_val) {
          freq_counter.value(i, freq_counter.value(i) + 1);
        }
      }
      var x, y, max;
      for (x = 0; x < buffer_pool.size()-1; x++) {
        max = x;
        for ( y = x + 1; y < buffer_pool.size(); y++) {
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
      for (i = 0; i < buffer_pool.size(); i++) {
        lines[i] = jsav.g.line(560,  45 + 45 * buffer_pool.value(i),  775, 45 + 45 * i, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
      }
    }
    else {
      if (counter == 0) {
        buffer_pool.value(0, input_val);
        lines[0] = jsav.g.line(560,  45 + 45 * input_val,  775, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        jsav.displayInit();
      }
      else if (counter < buffer_pool.size()) {
        for (i = 0; i< counter; i++) {
          lines[i].hide();
        }

        var temp = [];
        temp.length = buffer_pool.size();
        temp[0] = input_val;
        lines[0] = jsav.g.line(560,  45 + 45 * input_val,  775, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});

        var i;
        for (i = 0; i < counter; i++) {
          temp[i+1] = buffer_pool.value(i);
          lines[i+1] = jsav.g.line(560,  45 + 45 * buffer_pool.value(i),  775, 45 + 45 * (i+1), {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }

        for (i = 0; i < buffer_pool.size(); i++) {
          buffer_pool.value(i, temp[i]);
        }

      }
      else {
        for (i = 0; i< buffer_pool.size(); i++) {
          lines[i].hide();
        }
        buffer_pool.value(buffer_pool.size()-1, input_val);
        freq_counter.value(buffer_pool.size()-1, 0);
        for (i = 0; i < buffer_pool.size(); i++) {
          lines[i] = jsav.g.line(560,  45 + 45 * buffer_pool.value(i),  775, 45 + 45 * i, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
        }
      }
    }
    console.log(buffer_pool.size());
  }

  /**
   * Runs when page has finished loading
   * Anything that triggers an interaction with an HTML element should be done here
   */
  $(document).ready(function () {
    jsav = new JSAV($('.avcontainer'));
    array_init();
    jsav.displayInit();
    counter = 0;
    resetAV();

    //var properties = {"stroke-width": 1.5};
    //var z1FragArrow = jsav.g.line(560,  45,  775, 45, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
    //var z1FragArrow = jsav.g.line(560,  90,  775, 90, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
    //var z1FragArrow = jsav.g.line(560,  45,  775, 135, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
    //var z1FragArrow = jsav.g.line(560,  45,  775, 180, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
    //var z1FragArrow = jsav.g.line(560,  45,  775, 225, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
    //var z1FragArrow = jsav.g.line(560,  45,  775, 270, {'arrow-end': 'classic-wide-long','stroke-width' : 1});


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

    console.log("buffer size:" + buffer_pool.size()); 

    // Next button pushed.
    $('#next').click(function () {
      var replacement = $("#function").val();
      console.log("replacement" + replacement);
      var input_val = $("#input").val();
      if (input_val < 0 || input_val >= main_memory.size())
        jsav.umsg("enter a valid value");
      else {
        if (replacement == 1) {
          LRU(input_val, counter);
        }
        else if (replacement == 2){
          FIFO(input_val, counter);
        }
        else {
          LFU(input_val, counter);
        }
        counter++;
      }
    });

    // Adjust UI element positions
    var contWidth = $('#container').width() - 20; // 20 pixels for padding
    $('.jsavoutput').width(contWidth / 3);
  });
}(jQuery));
