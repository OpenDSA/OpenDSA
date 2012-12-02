/*
 * Written by Daniel Breakiron, 2012-11-30
 */
"use strict";

/**
 * Defines an AV object
 *    - Automatically generates the appropriate ID for the avcontainer element
 *    - Automatically populates the arraysize dropdown list
 *    - initJSAV - initializes a JSAV object with the appropriate values
 *    - reset - clears the avcontainer
 */
function AV(avName, min, max, selected) {
  this.minArrSize = min;
  this.maxArrSize = max;
  this.avName = avName;
  var av = this;
  
  var avcId = avName + '_avc';
  
  // Generate the appropriate ID for the avcontainer element
  $('.avcontainer').attr('id', avcId);
  
  // Save the empty contents of the avcontainer element
  var emptyContent = $('#' + avcId).html();
  
  // Check query parameters from URL
  var params = JSAV.utils.getQueryParameter();
  if ("array" in params) { // set value of array pick if it is a param
    $('#arrayValues').val(params.array).prop("disabled", true);
  }
  
  // Initialize the arraysize dropdown list
  var html = "";
  
  // Uses the midpoint between the min and max as a default, if a selected value isn't provided
  selected = (selected) ? selected : Math.round((max + min) / 2);
  
  for (var i = min; i <= max; i++) {
    html += '<option ';
    
    if (i === selected) {
      html += 'selected="selected" ';
    }
    
    html += 'value="' + i + '">' + i + '</option>';
  }

  $('#arraysize').html(html);
  // End initialize arraysize dropdown
  
  // Priveleged method that processes the Reset button press
  // Reinitializes the output textbox and the AV
  this.reset = function (flag) {
    if (av.jsav) {
      av.jsav.clearumsg();
      $('#' + avcId).unbind().html(emptyContent);
    }
    // Clear the array values field, when no params given and reset button hit
    if (flag !== true) {
      if (!$('#arrayValues').prop("disabled")) {
        $('#arrayValues').val("");
      }
    }
  }
  
  this.initJSAV = function () {
    av.reset(true);
    this.jsav = new JSAV(avcId);
    return this.jsav;
  }
}

/**
 * Validates the array values a user enters or generates an array of random numbers if none are provided
 */
AV.prototype.processArrayValues = function (upperLimit) {
  upperLimit = (upperLimit) ? upperLimit : 999;
  
  var i,
      initData = {},
      msg = "Please enter " + this.minArrSize + " to " + this.maxArrSize + " positive integers between 0 and " + upperLimit;
      
  // Convert user's values to an array,
  // assuming values are space separated
  var arrValues = $('#arrayValues').val().match(/[0-9]+/g) || [];
  
  if (arrValues.length === 0) { // Empty field
    // Generate (appropriate length) array of random numbers between 0 and the given upper limit
    for (i = 0; i < $('#arraysize').val(); i++) {
      arrValues[i] = Math.floor(Math.random() * (upperLimit + 1));
    }
    initData.gen_array = arrValues;
  } else {
    // Ensure user provided array is in correct range
    if (arrValues.length < this.minArrSize || arrValues.length > this.maxArrSize) {
      alert(msg);
      return false;
    }
    
    // Ensure all user entered values are positive integers
    for (i = 0; i < arrValues.length; i++) {
      arrValues[i] = Number(arrValues[i]);
      if (isNaN(arrValues[i]) || arrValues[i] < 0 || theArray[i] > upperLimit) {
        alert(msg);
        return false;
      }
    }
    
    initData.user_array = arrValues;
    
    // Update the arraysize dropdown to match the length of the user entered array
    $('#arraysize').val(arrValues.length);
  }
  
  this.arrValues = arrValues;
  this.initData = initData;
  return true;
}