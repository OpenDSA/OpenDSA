/*global window KhanUtil */
(function() {
  "use strict";
  var shellsortSeries = {
    // Determine whether a proposed series is legal or not
    getAnswer: function(series) {
      if (series[series.length - 1] !== 1) { return "No"; }
      for (var i = 1; i < series.length; i++) {
        if (series[i] >= series[i - 1]) { return "No"; }
      }
      return "Yes";
    },

    // Generate an array containing a proposed increment series
    // The series will have count+1 elements
    makeSeries: function(count) {
      var series = [];
      for (var i = 0; i <= count; i++) {
        series[i] = KhanUtil.randRange(count - i, 10 - (2 * i));
      }
      if (KhanUtil.randRange(0, 4) !== 3) {
        series[count] = 1;
      }
      return series;
    }
  };

  window.shellsortSeries = window.shellsortSeries || shellsortSeries;
}());
