/*
 Copyright 2010 Redfin Corporation
 Licensed under the Apache License, Version 2.0:
 http://www.apache.org/licenses/LICENSE-2.0
 */

// Added a wrapper function to allow us to load dynamically
function FastMarkerOverlayInit() {
    com = {redfin: {}};

    /* Construct a new FastMarkerOverlay layer for a V2 map
     * @constructor
     * @param {google.maps.Map} map the map to which we'll add markers
     * @param {Array.<com.redfin.FastMarker>} markers the array of markers to display on the map
     */
    com.redfin.FastMarkerOverlay = function(map, markers) {
      this.setMap(map);
      this._markers = markers;
    };

    com.redfin.FastMarkerOverlay.prototype = new google.maps.OverlayView();

    com.redfin.FastMarkerOverlay.prototype.onAdd = function() {
      this._div = document.createElement("div");
      var panes = this.getPanes();

      // Ben Kamens: this needs to be overlayMouseTarget, not overlayLayer, for iOS
      // to work in Google Maps API 3+.
      //
      // See http://code.google.com/p/gmaps-api-issues/issues/detail?id=3078
      //
      panes.overlayMouseTarget.appendChild(this._div);
    };

    /* Copy our data to a new FastMarkerOverlay
     * @param {google.maps.Map} map the map to which the copy will add markers
     * @return {FastMarkerOverlay} Copy of FastMarkerOverlay
     */
    com.redfin.FastMarkerOverlay.prototype.copy = function(map) {
      var markers = this._markers;
      var i = markers.length;
      var markersCopy = new Array(i);
      while (i--) {
        markersCopy[i] = markers[i].copy();
      }
      return new com.redfin.FastMarkerOverlay(map, markers);
    };

    /* Draw the FastMarkerOverlay based on the current projection and zoom level; called by Gmaps */
    com.redfin.FastMarkerOverlay.prototype.draw = function() {
      // if already removed, never draw
      if (!this._div) return;

      // Size and position the overlay. We use a southwest and northeast
      // position of the overlay to peg it to the correct position and size.
      // We need to retrieve the projection from this overlay to do this.
      var overlayProjection = this.getProjection();

      // DGF use fastloop http://ajaxian.com/archives/fast-loops-in-js
      // JD Create string with all the markers
      var i = this._markers.length;
      var textArray = [];
      while (i--) {
        var marker = this._markers[i];
        var divPixel = overlayProjection.fromLatLngToDivPixel(marker._latLng);
        textArray.push("<div style='position:absolute; left:");
        textArray.push(divPixel.x + marker._leftOffset);
        textArray.push("px; top:");
        textArray.push(divPixel.y + marker._topOffset);
        textArray.push("px;");
        if (marker._zIndex) {
          textArray.push(" z-index:");
          textArray.push(marker._zIndex);
          textArray.push(";");
        }
        textArray.push("'");
        if (marker._divClassName) {
          textArray.push(" class='");
          textArray.push(marker._divClassName);
          textArray.push("'");
        }
        textArray.push(" id='");
        textArray.push(marker._id);
        textArray.push("' >");

        var markerHtmlArray = marker._htmlTextArray;
        var j = markerHtmlArray.length;
        var currentSize = textArray.length;
        while (j--) {
          textArray[j + currentSize] = markerHtmlArray[j];
        }
        textArray.push("</div>");
      }

      //Insert the HTML into the overlay
      this._div.innerHTML = textArray.join('');
    };

    /** Hide all of the markers */
    com.redfin.FastMarkerOverlay.prototype.hide = function() {
      if (!this._div) return;
      this._div.style.display = "none";
    };

    /** Show all of the markers after hiding them */
    com.redfin.FastMarkerOverlay.prototype.unhide = function() {
      if (!this._div) return;
      this._div.style.display = "block";
    };

    /** Remove the overlay from the map; never use the overlay again after calling this function */
    com.redfin.FastMarkerOverlay.prototype.onRemove = function() {
      this._div.parentNode.removeChild(this._div);
      this._div = null;
    };


    /** Create a single marker for use in FastMarkerOverlay
     * @constructor
     * @param {string} id DOM node ID of the div that will contain the marker
     * @param {google.maps.LatLng} latLng geographical location of the marker
     * @param {Array.<string>} htmlTextArray an array of strings which we'll join together to form the HTML of your marker
     * @param {string=} divClassName the CSS class of the div that will contain the marker. (optional)
     * @param {string=} zIndex zIndex of the div that will contain the marker. (optional, 'auto' by default)
     * @param {number=} leftOffset the offset in pixels by which we'll horizontally adjust the marker position (optional)
     * @param {number=} topOffset the offset in pixels by which we'll vertically adjust the marker position (optional)
    */
    com.redfin.FastMarker = function(id, latLng, htmlTextArray, divClassName, zIndex, leftOffset, topOffset) {
      this._id = id;
      this._latLng = latLng;
      this._htmlTextArray = htmlTextArray;
      this._divClassName = divClassName;
      this._zIndex = zIndex;
      this._leftOffset = leftOffset || 0;
      this._topOffset = topOffset || 0;
    };

    /** Copy the FastMarker
     * @return {com.redfin.FastMarker} duplicate of this marker
     */
    com.redfin.FastMarker.prototype.copy = function() {
      var htmlArray = this._htmlTextArray;
      var i = htmlArray.length;
      var htmlArrayCopy = new Array(i);
      while (i--) {
        htmlArrayCopy[i] = htmlArray[i];
      }
      return new com.redfin.FastMarker(this._id, latLng, htmlArrayCopy, this._divClassName, this._zIndex, this._leftOffset, this._topOffset);
    };
}
