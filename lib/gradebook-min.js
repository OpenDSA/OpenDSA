"use strict";
/*global console: true, ODSA */

(function($) {
  var settings = ODSA.SETTINGS,
    odsaUtils = ODSA.UTILS;

  var Status = ODSA.MOD.STATUS,
    langDict = ODSA.MOD.langDict;

  /**
   * How fast to show and hide subsections
   */
  var speed = 300,

    chapters = {},
    ex_mod_map = {},
    initServerData = {
      "assignments": [],
      "grades": [],
      "modules": []
    };

  /**
   * Utility function to search objects in JSON
   */
  function getObjects(obj, key) {
    var objects = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (typeof obj[i] === 'object') {
          if (i === key) {
            objects.push(obj[i]);
          }
          objects = objects.concat(getObjects(obj[i], key));
        }
      }
    }
    return objects;
  }

  /**
   * Generates a table of exercises and the user's score, for the given module
   */
  function generateModule(modName, modExercises, serverGradeData) {
    var userTotal = 0,
      modTotal = 0,
      html = '';

    if (Object.keys(modExercises).length === 0) { // Module contains no exercises
      html = 'There are no exercises in this section';
    } else {
      // If this value stays at -1 after looping through all exercises,
      // there are no exercises worth points in the module
      var exerPoints = -1;

      // Generate the table of exercises
      html = '<table id="' + modName + '-exercises" class="data" width="90%">';
      html += '<tr class="header"><th>' + langDict['exercises'] + '</th><th class="score">' + langDict['points'] + '</th></tr>';

      var exercise_;

      for (var exercise in modExercises) {
        if (modExercises.hasOwnProperty(exercise) && typeof modExercises[exercise].points !== "undefined") {
          ex_mod_map[exercise] = modName;
          exercise_ = exercise;
          if (!modExercises[exercise].hasOwnProperty('long_name')) {
            modExercises[exercise].long_name = modExercises[exercise].exercise;
            if (modExercises[exercise].points === 0) {
              var obj_Exe = getObjects(chapters, modExercises[exercise].name);
              if (typeof obj_Exe[0] !== "undefined") {
                modExercises[exercise].points = obj_Exe[0].points;
              } else {
                modExercises[exercise].points = 0;
              }
            }
            exercise_ = modExercises[exercise].name;
          }
          // Determine how many points the exercise is worth (to the nearest 2 decimal places and keep a running total for the module
          exerPoints = Math.round(parseFloat(modExercises[exercise].points) * 100) / 100;
          modTotal += exerPoints;

          // Create a row in the table for the exercise
          html += '<tr id="' + exercise + '"';

          // If the exercise is worth zero points, append a special class to the row
          if (exerPoints === 0) {
            html += ' class="zeroPointExer"';
          }

          html += '><td><a href="' + ex_mod_map[exercise_] + '.html#' + exercise_ + '_exer">' + modExercises[exercise].long_name + '</a></td>';

          var exerciseProfData = $.grep(serverGradeData.grades, function(e) {
            return e.exercise == exercise_;
          });
          if (typeof exerciseProfData !== 'undefined' && exerciseProfData.length > 0 && exerciseProfData[0].points != 0) {
            // User is proficient with this exercise
            userTotal += exerPoints;
            html += '<td class="score proficient">' + exerPoints.toFixed(2);
          } else {
            html += '<td class="score">0.00';
          }
          html += ' / ' + exerPoints.toFixed(2) + '</td></tr>';
        }
      }

      // Append the total row
      html += '<tr class="header"><th><span>' + langDict['total'] + '</span></th><th class="score">' + userTotal.toFixed(2) + ' / ' + modTotal.toFixed(2) + '</th></tr></table>';

      // If the module contains only exercises that don't have points, list the module as containing no exercises
      if (exerPoints === -1) {
        html = langDict['no_exercises'];
      }
    }

    return {
      'userTotal': userTotal,
      'total': modTotal,
      'html': html
    };
  }

  /**
   * Generate the necessary rows and tables for a section of the book (chapter, section, subsection, etc)
   */
  function generateSection(secData, prefix, depth, serverGradeData) {
    var i = 0,
      userTotal = 0,
      sectionTotal = 0,
      data,
      row,
      html = '<table width="100%">';

    for (var sect in secData) {
      if (secData.hasOwnProperty(sect)) {
        // Calculate the new prefix
        i++;
        var newPrefix = (prefix === '') ? prefix + (i - 1) : prefix + '.' + i;

        var modName = sect.slice(sect.lastIndexOf('/') + 1).replace('.rst', '');

        // Call the appropriate function for processing a module or a subsection
        if (secData[sect].exercises) {
          if (secData[sect].assignment) {
            secData[sect].long_name = secData[sect].assignment + ' (' + secData[sect].due_date + ')';
            data = generateModule(secData[sect].assignment, secData[sect].exercises, serverGradeData);
          } else {
            data = generateModule(modName, secData[sect].exercises, serverGradeData);
          }
        } else {
          data = generateSection(secData[sect], newPrefix, depth + 1, serverGradeData);

          // If an entire section is not worth any points, don't include it in the gradebook
          if (data.total === 0) {
            continue;
          }
        }

        // Keep a total of how many points a user has earned and how much each section is worth
        userTotal += data.userTotal;
        sectionTotal += data.total;

        // Remove the periods from the prefix and '/' from the section name, so that jQuery can properly use IDs
        var secName = newPrefix.replace(/\./g, '') + '-' + sect.replace(/\//g, '');
        secName = secName.replace(/\s/g, '_');

        // Add a row for the section
        html += '<tr><td class="section-header" data-sec-name="' + secName + '">' + newPrefix + ' ';
        html += ((secData[sect].exercises && secData[sect].long_name) ? secData[sect].long_name : sect) + '</td>';
        var moduleProfData = $.grep(serverGradeData.modules, function(e) {
          return e.module == modName;
        });
        if (typeof moduleProfData !== 'undefined' && moduleProfData.length > 0 && moduleProfData[0].proficient) {
          html += '<td class="score proficient">';
        } else {
          html += '<td class="score">';
        }
        html += data.userTotal.toFixed(2) + ' / ' + data.total.toFixed(2) + '</td></tr>';
        html += '<tr id="' + secName + '" class="gb-section-container"><td colspan="2" style="padding-left: 20px">';
        html += data.html;
        html += '</td></tr>';
      }
    }

    html += '</table>';

    return {
      'userTotal': userTotal,
      'total': sectionTotal,
      'html': html
    };
  }

  //utility function to escape special characters
  function escapeString(rawString) {
    var escapedString = "";
    var specialChar = ['&', '.', ':'];
    for (var i = 0; i < rawString.length; i++) {
      if (specialChar.indexOf(rawString[i]) > -1) {
        escapedString = escapedString + '\\' + rawString[i];
      } else {
        escapedString = escapedString + rawString[i];
      }
    }
    return escapedString;
  }

  /**
   * Get the config file and use it to initialize the gradebook
   * Attach click handlers to section headers to expand their subsections
   */
  function generateGradeTable(serverGradeData) {
    serverGradeData = serverGradeData || initServerData;
    // Hide the "loading" message
    $('#loadingMessage').hide();
    $('#gradeHeader').show();

    var data = generateSection(chapters, '', 0, serverGradeData);
    var data1 = generateSection(serverGradeData.assignments, '', 0, serverGradeData);
    var html = data.html;
    html = html.slice(html.indexOf('<tr'), html.lastIndexOf('</table'));
    html = '<table class="data" width="70%"><tr><th>' + langDict['chapter'] + '</th><th class="score">' + langDict['score'] + '</th></tr>' + html;
    html += '<tr class="header"><th>' + langDict['total'] + '</th><th class="score">' + data.userTotal.toFixed(2) + ' / ' + data.total.toFixed(2) + '</th></tr></table>';
    $('#gradeData').append(html);

    var html1 = data1.html;
    html1 = html1.slice(html1.indexOf('<tr'), html1.lastIndexOf('</table'));
    html1 = '<table class="data" width="70%"><tr><th>' + langDict['assignment'] + ' (' + langDict['due_date'] + ')</th><th class="score">' + langDict['score'] + '</th></tr>' + html1;
    html1 += '<tr class="header"><th>' + langDict['total'] + '</th><th class="score">' + data1.userTotal.toFixed(2) + ' / ' + data1.total.toFixed(2) + '</th></tr></table>';
    $('#gradeDataA').append(html1);

    // Hide all zero point exercises by default
    $('.zeroPointExer').hide();
    $('#showZeroPointExer').removeAttr('checked');

    // Collapse all the containers
    $('.section-header').addClass('expandImage');

    $('.section-header').each(function(index, item) {
      // Attach a click handler to all section headers that makes the appropriate container appear
      $(this).click(function(event) {
        var secName = $(event.target).data('sec-name');

        if (secName) {
          secName = escapeString(secName);
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

    // Hide assignment view ny default
    $('#selectGradeView').attr('checked', 'checked');
    $('#gradeDataA').hide();
  }

  // success handler for getgrade end point ajax call
  function getGradeSuccess(data) {
    data = odsaUtils.getJSON(data);

    if (data.grades && data.modules && data.assignments) {
      // Trigger grade table generation
      generateGradeTable(data);
    } else {
      // Trigger gradebook.js to display error message
      $('body').trigger('gradebook-error');
    }
  }

  // error handler for getgrade end point ajax call
  function getGradeError(data) {
    data = odsaUtils.getJSON(data);

    if (data.status === 404) {
      // 404 is returned when a new user views the gradebook before completing any exercises
      // because the database cannot find any data relating to that user, generate the default gradebook
      $('body').trigger('gradebook-gen-table');
    } else {
      // Trigger gradebook.js to display error message
      $('body').trigger('gradebook-error');

      if (data.status === 401) {
        ODSA.MOD.handleExpiredSession(key);
      } else {
        console.debug("Error getting user's points");
        console.debug(JSON.stringify(data));
      }
    }
  }

  /**
   * If the server is enabled and a user is logged in, queries the server for the user's points
   * Loads the grade book page using the config file
   */
  function loadGradebook(getGradeSuccess, getGradeError) { // Queries the server for the user's points
    // Clear previous grade data, show the "loading" message
    $('#gradeData').html('');
    $('#gradeDataA').html('');
    $('#gradeHeader').hide();
    $('#loadingMessage').show();

    // get student grade from the server
    if (!!settings.SCORE_SERVER && odsaUtils.userLoggedIn()) {
      ODSA.MOD.syncProficiency(getGradeSuccess, getGradeError);
    } else {
      generateGradeTable();
    }
  }

  function showErrorMsg() {
    // Remove the loading message and display an error message to the user
    $('#loadingMessage').hide();
    $('#gradeData').replaceWith('<div class="error">' + langDict['no_reply_server'] + '</div>');
  }

  function expandAll() {
    $('.gb-section-container').show(speed);
    $('.section-header').removeClass('expandImage');
    $('.section-header').addClass('collapseImage');
  }

  function collapseAll() {
    $('.gb-section-container').hide(speed);
    $('.section-header').addClass('expandImage');
    $('.section-header').removeClass('collapseImage');
  }

  $(document).ready(function() {
    // Get the config file and use it to initialize chapters
    $.getJSON(location.href.substring(0, location.href.lastIndexOf('/')) + '/_static/' + settings.BOOK_NAME + '.json', function(confData) {
      chapters = confData.chapters;
      loadGradebook(getGradeSuccess, getGradeError);
    });

    // Listen for event that triggers the gradebook to generate the grade table
    $("body").on("gradebook-gen-table", function(e, data) {
      generateGradeTable();
    });

    // Listen for event that triggers the error message to be shown
    $("body").on("gradebook-error", function(e, data) {
      generateGradeTable();
    });

    // Attach the expandAll function to the 'Expand All' link
    $('#expand').click(function() {
      expandAll();
      return false;
    });

    // Attach the collapseAll function to the 'Collapse All' link
    $('#collapse').click(function() {
      collapseAll();
      return false;
    });

    // Attach a handler to the ""select grade view" checkbox which will show or hide the chapter or the assignment grade table
    $('#selectGradeView').change(function() {
      if (this.checked) {
        $('#gradeData').show();
        odsaUtils.logUserAction('odsa-gradebook-show-chapview', '');
        odsaUtils.logUserAction('odsa-gradebook-hide-assgview', '');
        $('#gradeDataA').hide();
      } else {
        $('#gradeData').hide();
        odsaUtils.logUserAction('odsa-gradebook-hide-chapview', '');
        odsaUtils.logUserAction('odsa-gradebook-show-assgview', '');
        $('#gradeDataA').show();
      }
      return false;
    });

    // Attach a handler to the "Show 0-point execises" checkbox which will show or hide exercises that are worth 0-points
    $('#showZeroPointExer').change(function() {
      if (this.checked) {
        $('.zeroPointExer').show(speed);
        odsaUtils.logUserAction('odsa-gradebook-show-zpe', '');
      } else {
        $('.zeroPointExer').hide(speed);
        odsaUtils.logUserAction('odsa-gradebook-hide-zpe', '');
      }
      return false;
    });
  });
}(jQuery));