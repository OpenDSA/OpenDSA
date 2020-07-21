$(document).ready(function() {
    var av_name = "GeneralOverview";
    var av = new JSAV(av_name);

    //Rectangles
    av.g.rect(10, 320, 150, 50);
    av.g.rect(450, 50, 150, 50);
    av.g.rect(450, 190, 150, 50);
    av.g.rect(450, 330, 150, 50);
    av.g.rect(450, 470, 150, 50);
    av.g.rect(450, 600, 150, 50);
    av.g.rect(820, 320, 150, 50);

    //Labels
    av.label("Symbol Table", {left: 11, top: 300});
    av.label("Management", {left: 11, top: 325});
    av.label("Lexical Analysis", {left: 451, top: 30});
    av.label("Syntax Analysis", {left: 451, top: 170});
    av.label("Intermediate", {left: 451, top: 310});
    av.label("Code Generation", {left: 451, top: 335});
    av.label("Code Optimization", {left: 451, top: 450});
    av.label("Code Generation", {left: 451, top: 580});
    av.label("Error Handling", {left: 821, top: 300});
    av.label("Source Code", {left: 465, top: 0});
    av.label("tokens", {left: 526, top: 105});
    av.label("parse trees", {left: 526, top: 245});
    av.label("intermediate code", {left: 526, top: 385});
    av.label("intermediate code", {left: 526, top: 525});
    av.label("Object Program", {left: 465, top: 665});
    

    //Lines
    av.g.line(60, 320, 450, 75, {"stroke-width": 1});
    av.g.line(110, 320, 450, 215, {"stroke-width": 1});
    av.g.line(160, 345, 450, 355, {"stroke-width": 1});
    av.g.line(110, 370, 450, 495, {"stroke-width": 1});
    av.g.line(60, 370, 450, 625, {"stroke-width": 1});

    av.g.line(920, 320, 600, 75, {"stroke-width": 1});
    av.g.line(870, 320, 600, 215, {"stroke-width": 1});
    av.g.line(820, 345, 600, 355, {"stroke-width": 1});
    av.g.line(870, 370, 600, 495, {"stroke-width": 1});
    av.g.line(920, 370, 600, 625, {"stroke-width": 1});

    av.g.line(525, 10, 525, 45, {"stroke-width": 1});
    av.g.polyline([[520, 40], [525, 45], [530, 40]], {"stroke-width": 1});

    av.g.line(525, 100, 525, 185, {"stroke-width": 1});
    av.g.polyline([[520, 180], [525, 185], [530, 180]], {"stroke-width": 1});

    av.g.line(525, 240, 525, 325, {"stroke-width": 1});
    av.g.polyline([[520, 320], [525, 325], [530, 320]], {"stroke-width": 1});

    av.g.line(525, 380, 525, 465, {"stroke-width": 1});
    av.g.polyline([[520, 460], [525, 465], [530, 460]], {"stroke-width": 1});

    av.g.line(525, 520, 525, 595, {"stroke-width": 1});
    av.g.polyline([[520, 590], [525, 595], [530, 590]], {"stroke-width": 1});

    av.g.line(525, 650, 525, 665, {"stroke-width": 1});
    av.g.polyline([[520, 660], [525, 665], [530, 660]], {"stroke-width": 1});

    //display
    av.displayInit();
    av.recorded();
});