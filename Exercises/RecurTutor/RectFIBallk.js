/*global window */
(function() {
  "use strict";
  var rectFIBallk = {
    checkAnswer: function(k,n) {
      return gcd(k,n);
    }
  };

  function gcd(k,n) {
    if (n == k)
     return k;
    else if(n > k)
     return gcd(k, n - k);
    else
     return gcd(k - n, n);
  }

  window.rectFIBallk = window.rectFIBallk || rectFIBallk;
}());
