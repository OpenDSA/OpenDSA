"use strict";

(function(){

  window.urlBaseOverride = typeof urlBaseOverride !== "undefined"? urlBaseOverride : {};
  window.serverOverride = typeof window.serverOverride !== "undefined"? serverOverride : null;

  var khanVersion = "new";

  if(khanVersion === "old"){
    urlBaseOverride = "../../ODSAkhan-exercises/";
    var url = "../../lib/khan-exercise-min.js";
    loadScript("http://cdn.mathjax.org/mathjax/1.1-latest/MathJax.js?config=http://algoviz.org/OpenDSA/dev/OpenDSA/ODSAkhan-exercises/KAthJax-77111459c7d82564a705f9c5480e2c88.js");

  }else if(khanVersion === "new"){
    urlBaseOverride = "../../ODSAkhan-exercises-new/";
    var url = "../../ODSAkhan-exercises-new/khan-exercise.js";
  }
  loadScript(url);
  function loadScript(url){
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.async = "async";
    script.src = url;
    /*script.onload = script.onreadystatechange = function() {
      if (!script.readyState ||
         (/loaded|complete/).test(script.readyState)) {
        // Handle memory leak in IE
        script.onload = script.onreadystatechange = null;

        // Remove the script
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }

        // Dereference the script
        script = undefined;
      }
    };*/
    head.appendChild(script);
  }
}());
