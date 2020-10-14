$(document).ready(function(){
    "use strict";
    var av = new JSAV("languageCirclesCON");
    //Context-Free Languages Circle
    av.g.circle(400, 165, 160);
    av.label("context-free", {top: 10, left: 360});
    av.label("languages", {top: 25, left: 360});
    
    //Deterministic Context-Free Languages
    av.g.circle(400, 190, 120);
    av.label("determinisitic", {top: 75, left: 360});
    av.label("context-free",{top: 90, left: 360});
    av.label("languages", {top: 105, left:365});
    
    //Regular Languages
    av.g.circle(400, 225, 75);
    av.label("regular", {top: 185, left: 360});
    av.label("languages", {top: 200, left: 350});
    av.displayInit();
    //av.recorded();
});