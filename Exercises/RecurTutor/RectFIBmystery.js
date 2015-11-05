/*global window */
(function() {
  "use strict";
  var rectFIBmystery = {
    checkAnswer: function(n) {
      return mystery(n);
    }
  };

  function mystery(n) {
    if (n < 0) {
      return "-" + mystery(-n);
    } else if (n < 10) {
      return n;
    } else {
      var two = n % 100;
      return (Math.floor(two/10)).toString() + (Math.floor(two%10)).toString()
              + mystery((Math.floor(n/100)).toString());
    }
  }

  window.rectFIBmystery = window.rectFIBmystery || rectFIBmystery;
}());
