/*global JSAV, document */
// Written by Sushma Mandava
//variable xPositionLocalRectangles controls the horizontal position of the visualization
String.prototype.visualLength = function () {
    var AV = document.getElementById('LocalHeapintptr42');
    var canvas = AV.getElementsByClassName('jsavcanvas')[0];
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var svgNS = svg.namespaceURI;
    var svgDocument = canvas.appendChild(svg);
    var data = document.createTextNode( this );
    var svgElement = document.createElementNS( svgNS, "text" );
    svgElement.appendChild(data);
    svgDocument.appendChild( svgElement );
    var bbox = svgElement.getBBox();
    data.parentNode.removeChild(data);
    svgElement.parentNode.removeChild(svgElement);
    svgDocument.parentNode.removeChild(svgDocument);
    return bbox.width;
}
function drawEmployeeField(av, labelXpos, labelYpos, fieldHeight, labelValue, fieldValue, labelWidth, rectWidth, boolDisplayLable, boolDisplayRect)
{
    var s = av.g.set();
    if (boolDisplayRect) {

        var rect = av.g.rect(labelXpos + labelWidth, labelYpos, rectWidth, fieldHeight);
        s.push(rect);
    }
    if(boolDisplayLable) {
        var label = av.label(labelValue, {top: labelYpos - 6, left: labelXpos + labelWidth - labelValue.visualLength() - 10});
        s.push(label);
    }
    if(!boolDisplayLable)
    {
        var f = av.label(fieldValue, {top: labelYpos - 6,
            left: labelXpos + (rectWidth - fieldValue.visualLength())/2 });
        s.push(f);
    }
    else {
        var fv = av.label(fieldValue, {
            top: labelYpos - 6,
            left: labelXpos + labelWidth + (rectWidth - fieldValue.visualLength()) / 2});
        s.push(fv);
    }
    return s;
}
function drawEmplyeeObject(av, xPos, yPos, numberOfFields, arrayOfValues, arrayOfLabels, boolDisplayLable, boolDisplayRect) {
    var s = av.g.set();
    var delta = 10;
    var clonedL = JSON.parse(JSON.stringify(arrayOfLabels))
    var clonedV = JSON.parse(JSON.stringify(arrayOfValues))
    var longestLabel = clonedL.sort(function (a, b) {
        return b.length - a.length;
    })[0];
    var longestValue = clonedV.sort(function (a, b) {
        return b.length - a.length;
    })[0];
    var width;
    if(boolDisplayLable)
        width = longestValue.visualLength() + longestLabel.visualLength() + 2*delta;
    else
        width =longestValue.visualLength() + 2*delta;
    var filedH = 40;
    var height = numberOfFields * (15 + filedH);

    var rect = av.g.rect(xPos, yPos, width, height);
    s.push(rect);
    for (var i = 0; i < numberOfFields; i++) {
        var emp = drawEmployeeField(av, xPos + delta, yPos + (i + 1) * delta + i * filedH, filedH, String(arrayOfLabels[i]),
            String(arrayOfValues[i]), longestLabel.visualLength(), longestValue.visualLength(), boolDisplayLable, boolDisplayRect);
        s.push(emp);
    }
    return s;
}
$(document).ready(function() {
    "use strict";
    var av_name = "LocalHeapintptr42";
    // Load the config object with interpreter and code created by odsaUtils.js
    var av;
    av = new JSAV(av_name);
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        code = config.code;
    var pseudo = av.code(code[0]);
    pseudo.element.css({
        position: "absolute",
        top: 10,
        left: -10
    });
    pseudo.hide();
    var xPositionLocalRectangles = 440;
    var yPositionLocal1 = 60;
    var xPositionHeapRectangles = xPositionLocalRectangles + 160;
    var length1 = 100;
    var width = 30;

    av.umsg("Here is a simple example that allocates an Employee object block in the heap, and then deallocates it." +
        " This is the simplest possible example of heap block allocation, use, and deallocation.");
    av.displayInit();
    av.umsg("The example shows the state of memory at three different times during the execution of the above code.");
    av.step();
    // drawEmplyeeObject(av, 50, 100, 3, ["asd", "50000000000000000000000000000", "a"], ["name", "salary", "aaaaaaaaaaaaaaaaaa"],false,false);
    av.umsg("The stack and heap are shown separately in the drawing—a drawing for code which uses stack and heap memory" +
        " needs to distinguish between the two areas to be accurate since the rules which govern the two areas are so" +
        " different. In this case, the lifetime of the local variable empPtr is totally separate from the lifetime of " +
        "the heap block, and the drawing needs to reflect that difference.");
    av.step();
    av.umsg("This line of code allocates local pointer to a local variable (but not its pointee)");
    pseudo.show();
    pseudo.setCurrentLine(3);
    av.label("Local", {top: 0, left: xPositionLocalRectangles + 20});
    av.label("Heap", {top: 0, left: xPositionLocalRectangles + 200});
    av.g.rect(xPositionLocalRectangles, yPositionLocal1, length1, width, {"stroke-width": 2});
    av.label("empPtr", {top: yPositionLocal1 - (width / 2), left: xPositionLocalRectangles - 55});
    //creating the x's
    var x1 = av.g.line(xPositionLocalRectangles + 16, yPositionLocal1 + 23, xPositionLocalRectangles + 27, yPositionLocal1 + 8, {"stroke-width": 2});
    var x2 = av.g.line(xPositionLocalRectangles + 16, yPositionLocal1 + 8, xPositionLocalRectangles + 27, yPositionLocal1 + 23, {"stroke-width": 2});

    var x3 = av.g.line(xPositionLocalRectangles + 41, yPositionLocal1 + 23, xPositionLocalRectangles + 53, yPositionLocal1 + 8, {"stroke-width": 2});
    var x4 = av.g.line(xPositionLocalRectangles + 41, yPositionLocal1 + 8, xPositionLocalRectangles + 53, yPositionLocal1 + 23, {"stroke-width": 2});

    var x5 = av.g.line(xPositionLocalRectangles + 66, yPositionLocal1 + 23, xPositionLocalRectangles + 77, yPositionLocal1 + 8, {"stroke-width": 2});
    var x6 = av.g.line(xPositionLocalRectangles + 66, yPositionLocal1 + 8, xPositionLocalRectangles + 77, yPositionLocal1 + 23, {"stroke-width": 2});

    //gray line in the middle
    av.g.line((xPositionLocalRectangles + 130), 0, (xPositionLocalRectangles + 130),
        140, {"stroke-width": 3, stroke: "gray"});
    var ptline = av.g.line(xPositionLocalRectangles + 80, yPositionLocal1 + (width / 2), xPositionLocalRectangles + 150,
        yPositionLocal1 + (width / 2),
        {"arrow-end": "classic-wide-long", "stroke-width": 2});
    ptline.hide();
    av.step();
    pseudo.setCurrentLine(7);
    // Slide 5
    x1.hide();
    x2.hide();
    x3.hide();
    x4.hide();
    x5.hide();
    x6.hide();
    ptline.show();
    var heapRectangle = av.g.rect(xPositionHeapRectangles, yPositionLocal1, length1, width * 2, {"stroke-width": 2});
    var label1 = av.label("Sam", {top: yPositionLocal1 - 10, left: xPositionHeapRectangles + 40});
    var label2 = av.label("1000", {top: yPositionLocal1 + width/2 , left: xPositionHeapRectangles + 40});
    av.step();
    pseudo.setCurrentLine(9);
    // Slide 6
    heapRectangle.hide();
    label1.hide();
    label2.hide();
    ptline.css({stroke: "gray"});

    av.recorded();

});
