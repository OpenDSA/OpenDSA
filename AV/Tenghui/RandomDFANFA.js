(function ($) {
    "use strict";

    function randomDFA() {
        var jsav = new JSAV("av");
        var initGraph = function(opts) {
            var a, b, c, d, e, f, g;
            var g2 = jsav.ds.graph($.extend({width: 500, height: 500, directed: true}, opts));
            var nodeArray = [a, b, c, d, e, f, g];
            var nodeNameArray = ["q0", "q1", "q2", "q3", "q4", "q5", "q6"];
            var randomInputType = Math.floor(Math.random() * 2);
            var transferArray;
            if (randomInputType === 0){
                transferArray = [0, 1];
            }
            else{
                transferArray = ["a", "b"];
            }
            var nodeSize = Math.floor(Math.random() * 6) + 2;
            var i;
            for (i = 0; i < nodeSize; i++){
                nodeArray[i] = g2.addNode(nodeNameArray[i]);
            }
            for (i = 0; i < nodeSize; i++){
                var firstTransferRandom = Math.floor(Math.random() * 2);
                if (firstTransferRandom === 1) {
                    var toNode = Math.floor(Math.random() * nodeSize);
                    g2.addEdge(nodeArray[i], nodeArray[toNode], {weight: transferArray[0]});
                }
                var secondTransferRandom = Math.floor(Math.random() * 2);
                if (secondTransferRandom === 1){
                    var toNode2 = Math.floor(Math.random() * nodeSize);
                    g2.addEdge(nodeArray[i], nodeArray[toNode2], {weight: transferArray[1]});
                }
                if (firstTransferRandom === 0 && secondTransferRandom === 0) {
                    var randomWeight = Math.floor(Math.random() * 2);
                    var toNode3 = Math.floor(Math.random() * nodeSize);
                    g2.addEdge(nodeArray[i], nodeArray[toNode3], {weight: transferArray[randomWeight]});
                }
            }


            return g2;
        };
        var g3 = initGraph({layout: "automatic"});
        g3.layout();
        jsav.displayInit();
    }

    function randomNFA() {
        var jsav = new JSAV("av");
        var initGraph = function(opts) {
            var a, b, c, d, e, f, g;
            var g2 = jsav.ds.graph($.extend({width: 500, height: 350, directed: true}, opts));
            var nodeArray = [a, b, c, d, e, f, g];
            var nodeNameArray = ["q0", "q1", "q2", "q3", "q4", "q5", "q6"];
            var randomInputType = Math.floor(Math.random() * 2);
            var transferArray;
            if (randomInputType === 0){
                transferArray = [0, 1];
            }
            else{
                transferArray = ["a", "b"];
            }
            var nodeSize = Math.floor(Math.random() * 6) + 2;
            var i;
            for (i = 0; i < nodeSize; i++){
                nodeArray[i] = g2.addNode(nodeNameArray[i]);
            }
            for (i = 0; i < nodeSize; i++){
                var transferTimes = Math.floor(Math.random() * 3) + 1;
                var j;
                for (j = 0; j < transferTimes; j++){
                    var toNode = Math.floor(Math.random() * nodeSize);
                    g2.addEdge(nodeArray[i], nodeArray[toNode], {weight: transferArray[0]});
                    if (j > 0 && g2.hasEdge(nodeArray[i], nodeArray[toNode], {weight: transferArray[0]})){
                        break;
                    }
                }
                var transferTimes2 = Math.floor(Math.random() * 3) + 1;
                for (j = 0; j < transferTimes2; j++) {
                    var toNode2 = Math.floor(Math.random() * nodeSize);
                    g2.addEdge(nodeArray[i], nodeArray[toNode2], {weight: transferArray[1]});
                    if (j > 0 && g2.hasEdge(nodeArray[i], nodeArray[toNode2], {weight: transferArray[1]})){
                        break;
                    }
                }
            }


            return g2;
        };
        var g3 = initGraph({layout: "automatic"});
        g3.layout();
        jsav.displayInit();
    }

    // Publicize the public functions
    var randomGraph = {};
    randomGraph.randomDFA = randomDFA;
    randomGraph.randomNFA = randomNFA;
    window.RANDOMNFA = randomGraph;
    window.RANDOMDFA = randomGraph;

}(jQuery));
