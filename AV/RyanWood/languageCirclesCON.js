$(document).ready(function(){
    "use strict";
    var av = new JSAV("languageCirclesCON");
    //Context-Free Languages Circle
    av.g.circle(250, 85, 160);
    av.label("context-free\\ languages", {top: 40, left: 250})
    //Deterministic Context-Free Languages
    av.g.circle(250, 75, 115);
    av.label("determinisitic\\ context-free\\ languages", {top: 130, left: 250})
    //Regular Languages
    av.g.circle(250, 65, 75);
    av.label("regular\\ languages", {top: 250, left: 250})
    av.displayInit();
    //av.recorded();
});