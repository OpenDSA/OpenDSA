"use strict";
/*global console: true, debugMode, serverEnabled, userLoggedIn, getUsername, getSessionKey, getJSON, server_url, moduleName, getCachedProf, bookName, Status */

(function ($) {
  /**
   * How fast to show and hide subsections
   */
  var speed = 300;

  var Gradebook = {};

  /**
   * Generates a table of exercises and the user's score, for the given module
   */
  function loadModule(modName, modData, depth) {
    if (debugMode) {
      console.group('loadModule(' + modName + ', modData, ' + depth + ')');
      console.debug(JSON.stringify(modData));
    }

    var userTotal = 0,
        modTotal = 0,
        html = '';

    if (Object.keys(modData).length === 0) { // Module contains no exercises
      html = 'There are no exercises in this section';
    } else {
      var userProfData = getJSON(localStorage.proficiency_data)[getUsername()],
          // If this value stays at -1 after looping through all exercises,
          // there are no exercises worth points in the module
          userPoints = -1, 
          exerPoints = 0;

      // Generate the table of exercises
      html = '<table id="' + modName + '-exercises" class="data" width="90%">';
      html += '<tr class="header"><th>Exercises</th><th>Points</th></tr>';

      for (var exercise in modData) {
        if (modData.hasOwnProperty(exercise) && modData[exercise].points) {
          userPoints = 0;

          // Get user's points from local proficiency cache
          if (userProfData && userProfData[exercise] && userProfData[exercise].points) {
            userPoints = parseFloat(userProfData[exercise].points);
            userTotal += userPoints;
          }

          // Determine how many points the exercise is worth and keep a running total for the module
          exerPoints = parseFloat(modData[exercise].points);
          modTotal += exerPoints;

          // Create a row in the table for the exercise
          html += '<tr id="' + exercise + '"><td><a href="' + modName + '.html">' + exercise + '</a></td>';
          html += (userPoints > 0) ? '<td class="center proficient">' : '<td class="center">';
          html += userPoints.toFixed(2) + '/' + exerPoints.toFixed(2) + '</td></tr>';
        }
      }

      // Append the total row
      html += '<tr class="header"><th><span>Total</span></th><th><span>' + userTotal.toFixed(2) + '/' + modTotal.toFixed(2) + '</span></th></tr></table>';

      // If the module contains only exercises that don't have points, list the module as containing no exercises
      if (userPoints === -1) {
        html = 'There are no exercises in this section';
      }
    }

    if (debugMode) {
      console.groupEnd();
    }

    return {'userTotal': userTotal, 'total': modTotal, 'html': html};
  }

  /**
   * Generate the necessary rows and tables for a section of the book (chapter, section, subsection, etc)
   */
  function loadSection(secData, prefix, depth, isModule) {
    if (debugMode) {
      console.group('loadSection(secData, ' + depth + ')');
      console.debug(JSON.stringify(secData));
    }

    var i = 0,
        userTotal = 0,
        sectionTotal = 0,
        data,
        html = '<table width="100%">';

    for (var sect in secData) {
      if (secData.hasOwnProperty(sect)) {
        if (sect === "modules") { // Don't print anything for the "modules" key, simply move on to the modules
          if (debugMode) {
            console.groupEnd();
          }
          return loadSection(secData[sect], prefix, depth + 1, true);
        } else {
          // Calculate the new prefix
          i++;
          var newPrefix = (prefix === '') ? prefix + (i - 1) : prefix + '.' + i;

          // Call the appropriate function for processing a module or a subsection
          if (isModule) {
            data = loadModule(sect, secData[sect], depth + 1);
          } else {
            data = loadSection(secData[sect], newPrefix, depth + 1, false);
          }

          // Keep a total of how many points a user has earned and how much each section is worth
          userTotal += data.userTotal;
          sectionTotal += data.total;

          // Remove the periods from the prefix, so that jQuery can properly use IDs
          var secName = newPrefix.replace(/\./g, '') + '-' + sect;

          // Add a row for the section
          html += '<tr><td class="section-header" data-sec-name="' + secName + '">' + newPrefix + ' ' + sect + '</td>';
          html += (getCachedProf(sect).status === Status.STORED) ? '<td class="center proficient">' : '<td class="center">';
          html += data.userTotal + ' / ' + data.total + '</td></tr>';
          html += '<tr id="' + secName + '" class="gb-section-container"><td colspan="2" style="padding-left: 20px">';
          html += data.html;
          html += '</td></tr>';
        }
      }
    }

    html += '</table>';

    if (debugMode) {
      console.groupEnd();
    }

    return {'userTotal': userTotal, 'total': sectionTotal, 'html': html};
  }

  /**
   * Get the config file and use it to initialize the gradebook
   * Attach click handlers to section headers to expand their subsections
   */
  function loadConfig() {
    // Hide the "loading" message
    $('#loadingMessage').hide();

    // Get the config file and use it to load the exercises
    $.getJSON(location.href.replace(moduleName + '.html', '_static/' + bookName + '.json'), function (confData) {
      var data = loadSection(confData.chapters, '', 0, false);

      var html = data.html;
      html = html.slice(html.indexOf('<tr'), html.lastIndexOf('</table'));
      html = '<table class="data" width="50%"><tr><th>Chapter</th><th class="center">Score</th></tr>' + html;
      html += '<tr class="header"><th>Total</th><th class="center">' + data.userTotal + ' / ' + data.total + '</th></tr></table>';
      $('#gradeData').append(html);

      // Collapse all the containers
      $('.section-header').addClass('expandImage');

      $('.section-header').each(function (index, item) {
        // Attach a click handler to all section headers that makes the appropriate container appear
        $(this).click(function (event) {
          var secName = $(event.target).data('sec-name');

          if (secName) {
            var container = $('#' + secName);

            if ($(this).hasClass('expandImage')) {
              container.show(speed);
              $(this).removeClass('expandImage');
              $(this).addClass('collapseImage');
            } else {
              container.hide(speed);
              $(this).removeClass('collapseImage');
              $(this).addClass('expandImage');
            }
          }
        });
      });
    });
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
    $('#loadingMessage').show();

    // Check server for user's points
    if (serverEnabled() && userLoggedIn()) {
      var username = getUsername();

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

            loadConfig();
          } else {
            // Remove the loading message and display an error message to the user
            $('#loadingMessage').hide();
            $('table.data').replaceWith('<div class="error">The server did not respond.  Please try again later.</div>');
          }
        },
        error: function (data) {
          data = getJSON(data);

          // Remove the loading message and display an error message to the user
          $('#loadingMessage').hide();
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
  };

  Gradebook.expandAll = function () {
    $('.gb-section-container').show(speed);
  };
  
  Gradebook.collapseAll = function () {
    $('.gb-section-container').hide(speed);
  };

  $(document).ready(function () {
    // Hack for removing the chapter number from the "Gradebook" header
    var html = $($('h1')[1]).html();
    html = html.slice(html.indexOf(' ') + 1, html.length);
    $($('h1')[1]).html(html);

    Gradebook.load();

    // Listen for and process JSAV events
    $("body").on("gradebook-load", function (e, data) {
      Gradebook.load();
    });
    
    $('#expand').click(function () {
      Gradebook.expandAll();
      return false;
    });
    
    $('#collapse').click(function () {
      Gradebook.collapseAll();
      return false;
    });
  });
}(jQuery));