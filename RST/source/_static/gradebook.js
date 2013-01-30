"use strict";
/*global console: true, debugMode, serverEnabled, userLoggedIn, getUsername, getSessionKey, getJSON, server_url, moduleName */

(function($) {
  var Gradebook = {};
  
  /**
   * Populates the grade table on the student page
   */
  function gradeDisplays(data) {
    // Create the table header
    var i = 0,
        total = 0,
        type,
        max,
        points,
        row = '<tr class="header">';

    row += '<th style=""><a href="#" class="sort"><span>Exercises</span></a></th>';
    row += '<th style=""><a href="#" class="sort"><span>Modules</span></a></th>';
    row += '<th style=""><a href="#" class="sort"><span>Points</span></a></th>';
    row += '</tr>';
    $(row).appendTo('table.data');

    row = '';
    for (i = 0; i < data.grades.length; i++) {
      row += '<tr id="' + i + '">';
      row += '<td>' + data.grades[i].exercise + '</td>';
      row += '<td>' + data.grades[i].module + '</td>';

      type = (data.grades[i].type !== "") ? data.grades[i].type : 'ss';
      max = data.max_points[type];
      points = parseFloat(data.grades[i].points);

      row += (points > 0) ? '<td bgcolor="#00FF00">' : '<td>';
      row += points.toFixed(2) + '/' + parseFloat(max).toFixed(2) + '</td></tr>';
      total += points;
    }
    $(row).appendTo('table.data');

    // Create the table footer with
    row = '<tr class="header">';
    row += '<th></th><th><span>Total</span></th>';
    row += '<th><span>' + total.toFixed(2) + '</span></th>';
    row += '</tr>';
    $(row).appendTo('table.data');
    $('#pointsBox').hide();
    $('#example').css('margin', '10px');
  }

  function loadSection(section, secData, depth) {
    if (debugMode) {
      console.group('loadSection(' + section + ', secData, ' + depth + ')');
      console.debug(JSON.stringify(secData));
    }

    var username = getUsername(),
        profData = getJSON(localStorage.proficiency_data);

    $('#gradeData').append('<h' + (depth + 1) + '>' + section + '</h' + (depth + 1) + '>');

    if (profData[username]) {
      profData = profData[username];
    }

    if (secData.modules) {
      var userPoints = 0,
          exerPoints = 0,
          userTotal = 0,
          total = 0,
          rowsAdded = 0,
          html = '<table id="' + section + '" class="data">';
      html += '<tr class="header">';
      html += '<th style=""><a href="#" class="sort"><span>Exercises</span></a></th>';
      html += '<th style=""><a href="#" class="sort"><span>Modules</span></a></th>';
      html += '<th style=""><a href="#" class="sort"><span>Points</span></a></th>';
      html += '</tr>';

      for (var module in secData.modules) {
        if (secData.modules.hasOwnProperty(module)) {
          for (var exercise in secData.modules[module]) {
            if (secData.modules[module].hasOwnProperty(exercise) && secData.modules[module][exercise].points) {
              userPoints = 0;

              if (profData[exercise] && profData[exercise].points) {
                userPoints = parseFloat(profData[exercise].points);
                userTotal += userPoints;
              }

              exerPoints = parseFloat(secData.modules[module][exercise].points);
              total += exerPoints;

              html += '<tr id="' + exercise + '"><td>' + exercise + '</td><td>' + module + '</td>';
              html += (userPoints > 0) ? '<td bgcolor="#00FF00">' : '<td>';
              html += userPoints.toFixed(2) + '/' + exerPoints.toFixed(2) + '</td></tr>';
              rowsAdded++;
            }
          }
        }
      }

      html += '<tr class="header"><th></th><th><span>Total</span></th><th><span>' + userTotal.toFixed(2) + '/' + total.toFixed(2) + '</span></th></tr></table>';

      if (rowsAdded === 0) {
        html = '<div>There are no exercises in this section</div>';
      } 
      /*else {
        $('#chapterTotals').append('<tr class="header"><th></th><th><span>' +  + '</span></th><th><span>' + userTotal.toFixed(2) + '/' + total.toFixed(2) + '</span></th></tr></table>');
      }*/

      $('#gradeData').append(html);
    } else {
      for (var sect in secData) {
        if (secData.hasOwnProperty(sect)) {
          loadSection(sect, secData[sect], depth + 1);
        }
      }
    }

    if (debugMode) {
      console.groupEnd();
    }
  }

  function loadConfig() {
    //$('#chapterTotals').append('<h2>Chapter Totals</h2><table class="data">');

    // Hide the "loading" message
    $('#pointsBox').hide();

    // Get the config file and use it to load the exercises
    $.getJSON(location.href.replace(moduleName + '.html', '_static/' + bookName + '.json'), function (data) {
      for (var chapter in data.chapters) {
        if (data.chapters.hasOwnProperty(chapter)) {
          loadSection(chapter, data.chapters[chapter], 1);
        }
      }
    });

    //$('#chapterTotals').append('</table>');
  }

  /**
   * If the server is enabled and a user is logged in, queries the server for the user's points and updates local proficiency cache
   * Loads the grade book page using the config file
   */
  Gradebook.load = function () { // Queries the server for the user's points
    if (debugMode) {
      console.group('loadGradebook()');
      console.debug('book: ' + bookName);
    }
    
    // Clear previous grade data, show the "loading" message
    $('#gradeData').html('');
    $('#pointsBox').show();

    // Check server for user's points
    if (serverEnabled() && userLoggedIn()) {
      var username = getUsername();

      // Append the grade table
      $('#gradeData').append('<table id="example" class="data"></table>');

      // get user points
      jQuery.ajax({
        url:   server_url + "/api/v1/userdata/getgrade/",
        type:  "POST",
        data: {"key": getSessionKey(), "book": bookName},
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = getJSON(data);

          if (data.grades) {
            // Update local proficiency cache
            var profData = getJSON(localStorage.proficiency_data),
                exerName;

            if (debugMode) {
              console.debug('profData:');
              console.debug(JSON.stringify(profData));
            }

            if (!profData) {
              profData = {};
            }

            if (!profData[username]) {
              profData[username] = {};
            }

            for (var i = 0; i < data.grades.length; i++) {
              exerName = data.grades[i].exercise;

              if (data.grades[i].points > 0) {
                if (!profData[username][exerName]) {
                  profData[username][exerName] = {};
                }

                profData[username][exerName].points = data.grades[i].points;
                profData[username][exerName].status = Status.STORED;
              } else {
                delete profData[username][exerName];
              }
            }

            // Save the updated information
            localStorage.proficiency_data = JSON.stringify(profData);

            if (debugMode) {
              console.debug('profData:');
              console.debug(JSON.stringify(profData));
            }

            //gradeDisplays(data); // Replace with loadConfig()?
            loadConfig();
          } else {
            // Remove the loading message and display an error message to the user
            $('#pointsBox').hide();
            $('table.data').replaceWith('<div class="error">The server did not respond.  Please try again later.</div>');
          }
        },
        error: function (data) {
          data = getJSON(data);

          // Remove the loading message and display an error message to the user
          $('#pointsBox').hide();
          $('table.data').replaceWith('<div class="error">The server did not respond.  Please try again later.</div>');

          console.debug("Error getting user's points");
          console.debug(JSON.stringify(data));
        }
      });
    } else {
      loadConfig();
    }

    if (debugMode) {
      console.groupEnd();
    }
  }
  
  $(document).ready(function () {
    Gradebook.load();
  
    // Listen for and process JSAV events
    $("body").on("gradebook-load", function (e, data) {
      Gradebook.load();
    });
  });
}(jQuery));