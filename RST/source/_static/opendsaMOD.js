"use strict";
/*global alert: true, console: true, serverEnabled, userLoggedIn,
warnUserLogin, logUserAction, inLocalStorage, isModulePage, getUsername,
getNameFromURL, flushStoredData, getJSON, storeProficiencyStatus,
updateExerProfDisplays, getModuleName, sendEventData, server_url, moduleName */

// Contains a list of all exercises (including AVs) on the page
var exerList = [];

// Contains a list of all Khan Academy-type exercises on the page
var kaExerList = [];


function info() { // This is what we pop up
  var loc = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  if (loc === "") {
    loc = "index.html";
  }
  var mod = loc.split('.');
  var outcome = -1;
  $.ajax({
    url: 'modules.json',
    async: false,
    dataType: 'json',
    success: function (data) {
      $.each(data, function (key, val) {
        if (val.fields.short_display_name.toLowerCase() === mod[0].toLowerCase()) {
          var mystring = mod[0] + "\nWritten by " + val.fields.author + " \nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nFile created: " + val.fields.last_modified + "\nJSAV library version " + JSAV.version();
          outcome = 1;
          alert(mystring);
        }
      });
    }
  });

  if (outcome === -1) {
    var mystring = mod[0] + " \nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nJSAV library version " + JSAV.version();
    alert(mystring);
  }
}

function updateLocalStorage(username) {
  var myDate = new Date();
  myDate.setDate(myDate.getDate() + 5);  //the session is valid 5 days
  var strSession = '{"username" :"' + username + '", "expires" :"' + myDate + '"}';
  localStorage.opendsa = strSession;
}

function isSessionExpired() {
  if (inLocalStorage("opendsa")) {
    var bj = JSON.parse(localStorage.opendsa);
    var sessionDate = bj.expires;
    var currentDate = new Date();
    return sessionDate <= currentDate;
  }
  return true;
}

/**
 * Given a button ID, toggles the visibility of the AV in the associated iframe
 */
function showHide(btnID) {
  var divID = btnID.replace('_showhide_btn', '');

  var btnText = $('#' + btnID).attr('value');

  if (document.getElementById(divID)) {
    if ($('#' + divID).css('display') !== "none") {
      // AV is visible, hide it
      $('#' + divID).css('display', 'none');
      // Update the button text
      $('#' + btnID).attr('value', btnText.replace('Hide', 'Show'));
      return;
    } else {
      // AV is hidden, show it
      $('#' + divID).css('display', 'block');
    }
  } else {
    // If the AV isn't loaded, load it
    var src = $('#' + btnID).attr("data-frame-src");
    var width = $('#' + btnID).attr("data-frame-width");
    var height = $('#' + btnID).attr("data-frame-height");

    $('#' + btnID).after('<div id="' + divID + '"><p></p><center><iframe id="' + divID + '_iframe" data-av="' + divID + '" src="' + src + '" type="text/javascript" width="' + width + '" height="' + height + '" frameborder="0" marginwidth="0" marginheight="0" scrolling="no">\n</iframe></center></div>');
  }

  // Update the button text
  $('#' + btnID).attr('value', btnText.replace('Show', 'Hide'));

  // If the server is enabled and no user is logged in, warn them
  // they will not receive credit for the exercise they are attempting
  // to view without logging in
  if (serverEnabled() && !userLoggedIn()) {
    warnUserLogin();
  }
}

String.prototype.endsWith = function (suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

//*****************************************************************************
//*************           LOGIN AND REGISTRATION BOXES            *************
//*****************************************************************************


/**
 * Opens the registration window
 */
function showRegistrationBox() {
  if (serverEnabled()) {
    logUserAction('', 'registration-box-open', 'registration box was opened');

    var registrationBox = '#registration-box';
    var regBoxWidth = 300;

    //Fade in the Popup
    $(registrationBox).fadeIn(300);

    // Center the popup on the page
    // $(registrationBox).width() when run here does't give the correct width
    // (possibly because the box is still fading in?)
    var left = ($(window).width() / 2) - (regBoxWidth / 2);

    $(registrationBox).css({
      'top' : $('div.header').height(),
      'left' : left,
      'margin-top' : 0
    });

    //Embed backend registration page
    var server_regist_url = server_url + "/accounts/register/";
    var registration_page = '<center><iframe id="registration_iframe" src="' + server_regist_url + '" type="text/javascript" width="' + regBoxWidth + '" height="510" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe></center>';

    if ($('#registration_iframe').length === 0) {
      $('.registration-popup').append(registration_page);
    } else {
      $('#registration_iframe').remove();
      $('.registration-popup').append(registration_page);
    }

    // Add the mask to body
    $('body').append('<div id="mask"></div>');
    $('#mask').fadeIn(300);
  }
}

/**
 * Opens the login window
 */
function showLoginBox() {
  logUserAction('', 'login-box-open', 'Login box was opened');

  var loginBox = '#login-box';

  // Preload the last saved username in the login form
  var username = localStorage.name;
  if (username) {
    $('#username').attr('value', username);
  }

  //Fade in the Popup
  $(loginBox).fadeIn(300);

  //Set the center alignment padding + border see css style
  var popMargTop = ($(loginBox).height() + 24) / 2;
  var popMargLeft = ($(loginBox).width() + 24) / 2;

  $(loginBox).css({
    'margin-top' : -popMargTop,
    'margin-left' : -popMargLeft
  });

  // Add the mask to body
  $('body').append('<div id="mask"></div>');
  $('#mask').fadeIn(300);
}

/**
 * Returns true if the login or registration popup box is showing
 */
function isPopupBoxShowing() {
  return ($('#login-box').css('display') === 'block' || $('#registration-box').css('display') === 'block');
}

/**
 * Closes the login or registration window
 */
function hidePopupBox() {
  logUserAction('', 'login/registration-box-close', 'Login/Registration box was closed');

  $('#mask , .login-popup, .registration-popup').fadeOut(300, function () {
    $('#mask').remove();
  });
  return false;
}

//*****************************************************************************
//*************      Proficiency Check and Update Displays        *************
//*****************************************************************************

/**
 * If true, shows the module complete message, otherwise hides it
 */
function updateModuleProfDisplay(modName, status) {
  // Show or hide the 'Module Complete' message on a module page
  var modCompMsgID = '#' + modName + '_complete';

  if ($(modCompMsgID).length > 0) {
    if (status) {
      $(modCompMsgID).show();
    } else {
      $(modCompMsgID).hide();
    }
  }

  // Show or hide the check mark next to a module on the index page
  if ($('li.toctree-l1 > a.reference.internal[href="' + modName + '.html"]').length > 0) {
    var listStyleImage = '';

    if (status) {
      listStyleImage = 'url(_static/Images/small_check_mark_green.gif)';
    }

    $('li.toctree-l1 > a.reference.internal[href="' + modName + '.html"]').parent().css('list-style-image', listStyleImage);
  }
}

/**
 * Given a name, returns whether localStorage has a
 * record of the current user being proficient
 */
function checkProfLocalStorage(name) {
  var username = getUsername();

  // Check for proficiency status in localStorage
  if (inLocalStorage("proficiency_data")) {
    var profData = getJSON(localStorage.proficiency_data);

    // Check whether user has an entry
    if (profData[username]) {
      var profList = profData[username];

      // Check to see if the item exists in the user's proficiency list
      if (profList.indexOf(name) > -1) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Queries the server for the user's proficiency on an exercise
 */
function checkExerProficiency(exerName) {
  var profStatus = checkProfLocalStorage(exerName);

  // Clear the proficiency display if the current user is not listed as proficient
  updateExerProfDisplays(exerName, profStatus);

  if (profStatus) {
    return;
  }

  // Check server for proficiency status
  if (serverEnabled() && userLoggedIn()) {
    // Check proficiency of an exercise
    jQuery.ajax({
      url:   server_url + "/api/v1/userdata/isproficient/",
      type:  "POST",
      data: {"username": getUsername(), "exercise": exerName },
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      xhrFields: {withCredentials: true},
      success: function (data) {
        data = getJSON(data);

        // Proficiency indicators were cleared above, only need to
        // update them again if server responded that the user is proficient
        if (data.proficient) {
          updateExerProfDisplays(exerName, true);
        }
      },
      error: function (data) { console.error("ERROR " + "isProficient" /*JSON.stringify(data)*/); }
    });
  }
}

/**
 * Queries the server for the user's proficiency on an exercise or module
 */
function checkModuleProficiency(modName) {
  modName = (modName) ? modName : moduleName;
  var profStatus = checkProfLocalStorage(modName);

  // Clear the proficiency display if the current user is not listed as proficient
  updateModuleProfDisplay(modName, profStatus);

  if (profStatus) {
    return;
  }

  // Check server for proficiency status
  if (serverEnabled() && userLoggedIn()) {
    // Check proficiency of the module
    jQuery.ajax({
      url:   server_url + "/api/v1/usermodule/ismoduleproficient/",
      type:  "POST",
      data: {"username": getUsername(), "module": modName },
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      xhrFields: {withCredentials: true},
      success: function (data) {
        data = getJSON(data);

        if (data.proficient) {
          storeProficiencyStatus(modName);
          updateModuleProfDisplay(modName, true);
        }
      },
      error: function (data) { console.error("ERROR " + "isProficient" /*JSON.stringify(data)*/); }
    });
  }
}

/**
 * Queries the server for the progress of a KA exercise
 * and writes it to localStorage
 */
function storeKAExerProgress(exerName) {
  jQuery.ajax({
    url:   server_url + "/api/v1/user/exercise/getprogress/",
    type:  "POST",
    data: {"username": getUsername(), "exercise": exerName },
    contentType: "application/json; charset=utf-8",
    datatype: "json",
    xhrFields: {withCredentials: true},
    success: function (data) {
      data = getJSON(data);

      // Get the progress from the response
      if (data.progress) {
        var exerData = {};

        // Load any existing data
        if (inLocalStorage('khan_exercise')) {
          exerData = getJSON(localStorage.khan_exercise);
        }

        exerData[exerName] = data.progress;
        localStorage.khan_exercise = JSON.stringify(exerData);

        /*
        // TODO: get the correct function to trigger
        // Trigger progress bar update on KA exercise page, if its loaded
        if ($('#' + exerName + '_iframe')) {
          document.getElementById(exerName + '_iframe').contentWindow.updateProgressBar();
        }
        */
      }
    },
    error: function (data) { console.error("ERROR " + "isProficient" /*JSON.stringify(data)*/); }
  });
}

/**
 * Makes sure the display shows the currently logged in user
 * or lack there of
 */
function updateLogin() {
  if (serverEnabled() && isModulePage()) {
    var username = getUsername();
    var updated = false;

    if (inLocalStorage('opendsa') && $('a.username-link').text() !== username) {
      updated = true;

      // Update display to show logged in user
      $('a.login-window').text('Logout');
      $('a.username-link').text(username);
      $('a.username-link').attr('href', server_url + '/student_view/' + username);
      $('a.username-link').show();
      $('a.registration-window').hide();

      // In case the user loaded a bunch of pages,
      // then logs in on one of them
      if (isPopupBoxShowing()) {
        hidePopupBox();
      }
    } else if (!inLocalStorage('opendsa') && $('a.login-window').text() !== 'Login') {
      updated = true;

      // Update display to show that no user is logged in
      $('a.login-window').text("Login");
      $('a.username-link').text('');
      $('a.username-link').hide();
      $('a.registration-window').show();

      if (inLocalStorage('warn_login')) {
        localStorage.removeItem('warn_login');
      }

      // Remove the variable storing the user's progress on KA exercises
      if (inLocalStorage('khan_exercise')) {
        localStorage.removeItem('khan_exercise');

        /*
        // TODO: get the correct function to trigger
        // Trigger progress bar update for each exercise
        for (var i = 0; i < kaExerList.length; i++) {
          // Trigger progress bar update on KA exercise page
          if ($('#' + kaExerList[i] + '_iframe')) {
            document.getElementById(kaExerList[i] + '_iframe').contentWindow.updateProgressBar();
          }
        }
        */
      }
    }

    if (updated) {
      if (moduleName === 'index') {
        // Get every module page link on the index page and determine if the user is proficient
        $('li.toctree-l1 > a.reference.internal').each(function (index, item) {
          if ($(item).attr('href').endsWith('.html')) {
            var modName = getNameFromURL($(item).attr('href'));
            checkModuleProficiency(modName);
          }
        });
      } else {
        // Update exercise proficiency displays to reflect the proficiency of the current user
        var i;
        for (i = 0; i < exerList.length; i++) {
          checkExerProficiency(exerList[i]);
        }

        // Check for module proficiency
        checkModuleProficiency();

        if (userLoggedIn()) {
          // Check and store the progress of all KA exercises
          for (i = 0; i < kaExerList.length; i++) {
            storeKAExerProgress(kaExerList[i]);
          }
        }
      }
    }
  }
}


/**
 * Queries the server for the user's points
 */
function getUserPoints() {
  // Check server for user's points
  if (serverEnabled() && userLoggedIn()) {
    // get user points
    jQuery.ajax({
      url:   server_url + "/api/v1/userdata/getgrade/",
      type:  "POST",
      data: {"username": getUsername()},    
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      xhrFields: {withCredentials: true},
      success: function (data) {
        data = getJSON(data);
        
        if (!data.grade) {
          gradeDisplays(data);
        }
      },
      error: function (data) { console.error("ERROR " + "getGrade" /*JSON.stringify(data)*/); }
    });
  }
}


function gradeDisplays(data) {
  var row = '<tr class="header">';
  row += '<th style=""><a href="#" class="sort"><span>Exercises</span></a></th>';
  row += '<th style=""><a href="#" class="sort"><span>Modules</span></a></th>';
  var pos = new Array(); 
  var j = 0;
  var total = 0;   
  for (var i in data.headers) {
    row += '<th style=""><a href="#" class="sort"><span>' + data.headers[i] + '</span></a></th>';
    pos[j] = i;
    j += 1;
    }
  row += '</tr>'
  $(row).appendTo('table.data');
  row = '';
  for (var i in data.grades) {
    row += '<tr id="' + i + '">';
    row += '<td>' + data.grades[i].exercise + '</td>';
    row += '<td>' + data.grades[i].module + '</td>';
    var col = pos.indexOf(data.grades[i].type);  
    if (col == -1) {
      col =  pos.indexOf("ss");   
      }  
    for (var k=0;k<col;k++) {  
       row += '<td></td>'; 
       }    
    total += parseFloat(data.grades[i].points);   
    row += '<td>' + data.grades[i].points + '</td>';
    row += '</tr>';
    }
  $(row).appendTo('table.data'); 
  row = '';   
  row += '<tr class="header">';
  row += '<th style=""><span>Total</span></th>';  
  row += '<th style=""><span>' + total + '</span></th>';   
  row += '</tr>'; 
  $(row).appendTo('table.data');  
   $('#pointsBox').hide();   
}



//*****************************************************************************
//***********            Runs When Page Finishes Loading            ***********
//*****************************************************************************

$(document).ready(function () {
  // Append the module complete code to the header
  $('h1 > a.headerlink').parent().css('position', 'relative');
  $('h1 > a.headerlink').parent().append('<div id="' + moduleName + '_complete" class="mod_complete">Module Complete</div>');

  // Populate the list of AVs on the page
  // Add all AVs that have a showhide button
  $('.showHideLink').each(function (index, item) {
    var avName = $(item).attr('id').replace('_showhide_btn', '');

    exerList.push(avName);

    // If the item is an exercise add it to a list of exercises
    if ($(item).attr('data-frame-src') && $(item).attr('data-frame-src').indexOf('Exercises') > -1) {
      kaExerList.push(avName);
    }
  });

  /*
  // TODO: Attempt to dynamically add proficiency check marks to AVs that don't have showhide buttons
  // Works sometimes, but not consistently, CSS doesn't work right (top and right values aren't recognized
  $('iframe').contents().each(function (index, doc) {
    var avName = getNameFromURL($(doc).attr('location').pathname);

    // TODO: Fix the context once the avcontainers are renamed
    // If an AV doesn't have a showhide button or a check mark, dynamically add a check mark to the AV
    if ($('#' + avName + '_showhide_btn').length === 0 && $('#' + avName + '_check_mark', $(doc)).length === 0) {
      console.debug('test1: ' + avName + " doesn't have a showhide button");
      console.debug('test1: $(doc).title = ' + $(doc).title);

      $('#ssperform', $(doc)).after('<img id="' + avName + '_check_mark" class="prof_check_mark" style="position: absolute; top: 65px, right: 10px; display: none;" src="../../lib/Images/green_check.png">');
    }
  });
  */

  // Add all AVs that have a proficiency check mark that are not already in the list
  $('img.prof_check_mark').each(function (index, item) {
    var avName = $(item).attr('id').replace("_check_mark", '');

    if (exerList.indexOf(avName) === -1) {
      exerList.push(avName);
    }
  });

  if (serverEnabled()) {
    // Send any stored event data when the page loads
    if (userLoggedIn()) {
      flushStoredData();
    } else {
      sendEventData();
    }

    // Log the browser ready event
    logUserAction('', 'document-ready', 'User loaded the ' + moduleName + ' module page');

    // Suggest the user login if they don't have a valid session,
    // update the login link with their name if they do
    if (isSessionExpired()) {
      localStorage.removeItem("opendsa");
      if (!inLocalStorage("warn_login")) {
        showLoginBox();
      }
    } else {
      updateLogin();
    }

    $(window).focus(function (e) {
      // When the user switches tabs, make sure the loging display on the new tab is correct
      updateLogin();

      logUserAction('', 'window-focus', 'User looking at ' + moduleName + ' window');
    });

    $(window).blur(function (e) {
      // When the user leaves an OpenDSA window, log it
      logUserAction('', 'window-blur', 'User is no longer looking at ' + moduleName + ' window');
    });

    // Attempts to log the user in when they click submit on the login window
    $('button.submit-button').click(function (event) {
      //authenticate user
      var username = $('#username').attr('value');
      var password = $('#password').attr('value');
      //password = SHA1(password);
      jQuery.ajax({
        url:   server_url + "/api/v1/users/login/",
        type:  "POST",
        data: {"username":  username, "password": password  },
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = getJSON(data);

          if (data.success) {
            updateLocalStorage(username);
            localStorage.name = username;
            logUserAction('', 'user-login', 'User logged in');
            // Submit any stored data
            flushStoredData();

            updateLogin();
          }
        },
        error: function (data) {
          data = getJSON(data);
          console.error("ERROR " + JSON.stringify(data));

          if (data.status === 401) {
            alert("Incorrect username / password combination");
          } else if (data.status === 0) {
            alert("Login failed because the server is not responding or is not reachable.\nFor help, please contact the OpenDSA team.");
            localStorage.warn_login = true;
            hidePopupBox();
          } else {
            alert("Login failed");
            localStorage.warn_login = true;
            hidePopupBox();
          }
        }
      });
    });

    // Brings up the login box if the user clicks 'Login' and
    // logs the user out if they click their username
    $('a.login-window').click(function () {
      var username = getUsername();
      if ($('a.login-window').text() === 'Login') {
        showLoginBox();
        return false;
      } else {
        console.debug("Logout link clicked");
        // Submit whatever data we have collected before the user logs out
        flushStoredData();

        // Inform the server the user is logging out
        jQuery.ajax({
          url:   server_url + "/api/v1/users/logout/",
          type:  "GET",
          data: {"username":  username },
          contentType: "application/json; charset=utf-8",
          datatype: "json",
          xhrFields: {withCredentials: true},
          success: function (data) {
            data = getJSON(data);
          },
          error: function (data) { console.error("ERROR " + JSON.stringify(data)); }
        });

        // Log out the user locally
        logUserAction('', 'user-logout', 'User logged out');
        localStorage.removeItem('opendsa');
        updateLogin();
      }
    });

    //Brings the registration form from the login popup page
    $('a.signup').click(function () {
      $('.login-popup').fadeOut(300);
      showRegistrationBox();
      return false;
    });

    // Brings up the embedded registration  box if the user clicks 'Register' and
    // should close the reistration window upon success.
    $('a.registration-window').click(function () {
      showRegistrationBox();
      return false;
    });

    // When clicking on the button close or the mask layer the popup closed
    $('a.close, #mask').live('click', function () {
      // If the user tries to close the login box without logging
      // in, warn them they will not receive credit without logging in
      warnUserLogin();
      hidePopupBox();
    });
  } else {
    // If a backend server is NOT enabled

    // Hide page elements that don't make sense when there is no backend server
    $('a#logon').hide();  // Login link
    $('a#registration').hide();  // Registration link
  }

  $("input.showHideLink").click(function (event) {
    var btnID = event.target.id;
    showHide(btnID);
  });

  $("a.abt").click(function (event) {
    info();
  });


  //User wants to see grades
  $('#pointsBox').click(function(){
    getUserPoints();    
  });  

  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  eventer(messageEvent, function (e) {
    //if (e.origin !== odsa_url) {
    //  return;
    //}
    var msg = getJSON(e.data);
    updateExerProfDisplays(msg.exercise, msg.proficient);

    // Check for module proficiency
    checkModuleProficiency();
  }, false);
});
