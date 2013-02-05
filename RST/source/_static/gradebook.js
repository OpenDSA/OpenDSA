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
  function generateModule(modName, modExercises) {
    if (debugMode) {
      console.group('generateModule(' + modName + ', modExercises)');
      console.debug(JSON.stringify(modExercises));
    }

    var userTotal = 0,
        modTotal = 0,
        html = '';

    if (Object.keys(modExercises).length === 0) { // Module contains no exercises
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

      for (var exercise in modExercises) {
        if (modExercises.hasOwnProperty(exercise) && modExercises[exercise].points) {
          userPoints = 0;

          // Get user's points from local proficiency cache
          if (userProfData && userProfData[exercise] && userProfData[exercise].points) {
            userPoints = parseFloat(userProfData[exercise].points);
            userTotal += userPoints;
          }

          // Determine how many points the exercise is worth and keep a running total for the module
          exerPoints = parseFloat(modExercises[exercise].points);
          modTotal += exerPoints;

          // Create a row in the table for the exercise
          html += '<tr id="' + exercise + '"><td><a href="' + modName + '.html">' + modExercises[exercise].long_name + '</a></td>';
          html += (userPoints > 0) ? '<td class="score proficient">' : '<td class="score">';
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
  function generateSection(secData, prefix, depth) {
    if (debugMode) {
      console.group('generateSection(secData, ' + depth + ')');
      console.debug(JSON.stringify(secData));
    }

    var i = 0,
        userTotal = 0,
        sectionTotal = 0,
        data,
        html = '<table width="100%">';

    for (var sect in secData) {
      if (secData.hasOwnProperty(sect)) {
        // Calculate the new prefix
        i++;
        var newPrefix = (prefix === '') ? prefix + (i - 1) : prefix + '.' + i;

        // Call the appropriate function for processing a module or a subsection
        if (secData[sect].exercises) {
          data = generateModule(sect, secData[sect].exercises);
        } else {
          data = generateSection(secData[sect], newPrefix, depth + 1);
        }

        // Keep a total of how many points a user has earned and how much each section is worth
        userTotal += data.userTotal;
        sectionTotal += data.total;

        // Remove the periods from the prefix, so that jQuery can properly use IDs
        var secName = newPrefix.replace(/\./g, '') + '-' + sect;

        // Add a row for the section
        html += '<tr><td class="section-header" data-sec-name="' + secName + '">' + newPrefix + ' ';
        html += ((secData[sect].exercises && secData[sect].long_name) ? secData[sect].long_name : sect) + '</td>';
        html += (getCachedProf(sect).status === Status.STORED) ? '<td class="score proficient">' : '<td class="score">';
        html += data.userTotal + ' / ' + data.total + '</td></tr>';
        html += '<tr id="' + secName + '" class="gb-section-container"><td colspan="2" style="padding-left: 20px">';
        html += data.html;
        html += '</td></tr>';
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
    $('#gradeHeader').show();

    // Get the config file and use it to load the exercises
    $.getJSON(location.href.replace(moduleName + '.html', '_static/' + bookName + '.json'), function (confData) {
      var data = generateSection(confData.chapters, '', 0);

      var html = data.html;
      html = html.slice(html.indexOf('<tr'), html.lastIndexOf('</table'));
      html = '<table class="data" width="50%"><tr><th>Chapter</th><th class="score">Score</th></tr>' + html;
      html += '<tr class="header"><th>Total</th><th class="score">' + data.userTotal + ' / ' + data.total + '</th></tr></table>';
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
      console.group('Gradebook.load()');
      console.debug('book: ' + bookName);
    }

    // Clear previous grade data, show the "loading" message
    $('#gradeData').html('');
    $('#gradeHeader').hide();
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
          
          if (debugMode) {
            console.group('Server response, Gradebook.load()');
            console.debug(JSON.stringify(data));
          }

          if (data.grades && data.modules) {
            // Update local proficiency cache
            var profData = getJSON(localStorage.proficiency_data),
                exerName,
                modName;

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
            
            // Load proficiency data for exercises
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
            
            // Load proficiency data for modules
            for (var i = 0; i < data.modules.length; i++) {
              modName = data.modules[i].module;
              
              if (data.modules[i].status) {
                profData[username][modName].status = Status.STORED;
              } else {
                delete profData[username][modName];
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
            $('#gradeData').replaceWith('<div class="error">The server did not respond.  Please try again later.</div>');
          }
          
          if (debugMode) {
            console.groupEnd();
          }
        },
        error: function (data) {
          data = getJSON(data);

          // Remove the loading message and display an error message to the user
          $('#loadingMessage').hide();
          $('#gradeData').replaceWith('<div class="error">The server did not respond.  Please try again later.</div>');

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
    $('.section-header').removeClass('expandImage');
    $('.section-header').addClass('collapseImage');
  };

  Gradebook.collapseAll = function () {
    $('.gb-section-container').hide(speed);
    $('.section-header').addClass('expandImage');
    $('.section-header').removeClass('collapseImage');
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