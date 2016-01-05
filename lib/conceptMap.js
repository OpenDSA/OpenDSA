"use strict"
var CMap = (function() {
    /**
     * Local odsaUtils object that makes it easier to access ODSA.UTILS and
     * allows better minification
     *
     * ODSA.UTILS is initialized in odsaUtils.js which must be included before this library
     *
     *
     */
    var odsaUtils = ODSA.UTILS;
    var compareNodes = function(data1, data2) {
        if (data1.id === data2.id) {
            return 0;
        } else {
            return -1;
        }
    };

    var nodes = [],
        connections = [],
        linking_phrase = [],
        list = [],
        defs_obj = {},
        graph = new DS.Graph(compareNodes);

    function NodeData(id) {
        this.id = id;
    }

    function reprint(term) {
        if ((getLinkingPhrase(term) === undefined) === true) {
            $("#cmap").remove();
            if (printGraph(term)) {
                var definition = getDefinition(term);
                printDefinition(term, definition);
            } else {
                return false;
            }
            return true;
        }
    }

    function runit() {
        Parser();
        buildGraph();
        var odsaTermList = JSON.parse(localStorage["concept"]);
        var term = odsaTermList[odsaTermList.length - 1].toLowerCase();
        if (printGraph(term)) {
            var definition = getDefinition(term);
            printDefinition(term, definition);

        } else {
            return false;
        }
        return true;
    }

    function getTermsList() {
        if (localStorage.getItem("concept") !== null) {
            return JSON.parse(localStorage["concept"]);
        }
        return null;
    }

    function buildGraph() {
        $.each(defs_obj.connections, function(key, value) {
            var edge = value;
            var toID = edge.to;
            var fromID = edge.from;

            var toNode = null; // The node on the to side
            var fromNode = null; // The node on the from side

            var toNodes = graph.find(new NodeData(toID)); // Searching if the node already exists
            var fromNodes = graph.find(new NodeData(fromID)); // Same

            if (toNodes.length == 0) {
                var toNode = graph.addNode(new NodeData(toID));
            } else {
                var toNode = toNodes[0]; // Just take the first one. Unsure why there'd be more
            }
            if (fromNodes.length == 0) {
                var fromNode = graph.addNode(new NodeData(fromID));
            } else {
                var fromNode = fromNodes[0]; // Just take the first one. Unsure why there'd be more
            }

            toNode.addEdge(fromNode);
        });
    }

    function getDefinition(id) {
        return defs_obj.concepts[id];
    }

    function getLinkingPhrase(id) {
        return defs_obj.linking_phrase[id];
    }

    function printDefinition(term, definition) {
        if ((definition === undefined) === false) {
            $("#info").html(definition);
            var math = document.getElementById("info");
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]);
        } else {
            $("#info").html("The term " + term + " is not in the glossary");
        }
    }

    function Parser() {
        var url = 'OpenDSA/Books/' + ODSA.SETTINGS.BOOK_NAME + '/html/_static/GraphDefs.json';
        $.ajax({
            url: url,
            async: false,
            dataType: "json",
            success: function(data) {
                defs_obj = ODSA.UTILS.getJSON(data);
            },
            error: function(data) {
                data = ODSA.UTILS.getJSON(data);

                if (data.hasOwnProperty('status') && data.status === 200) {
                    console.error('JSON language file is malformed. Please make sure your JSON is valid.');
                } else {
                    console.error('Unable to load JSON language file (' + url + ')');
                }
            }
        });
    }

    function printGraph(concept) {
        var i;
        for (i = 0; i < graph.nodes.length; i++) {
            var node = graph.nodes[i];
            delete node.index;
        }
        var newNodeData = graph.find(new NodeData(concept))[0];
        if (newNodeData) {
            var connectedNodes = newNodeData.connected(2, true);

            var makeLinks = function(nodes) {
                var index;
                var links = [];
                for (index = 0; index < nodes.length; index++) {
                    var curNode = nodes[index];
                    var i;
                    for (i = 0; i < curNode.edges.length; i++) {
                        if ((curNode.edges[i].index === undefined) === false) {
                            links.push({
                                source: index,
                                target: curNode.edges[i].index
                            });
                        }
                    }
                }
                return links;
            };

            var links = makeLinks(connectedNodes);

            //Create SVG element
            var svg = d3.select("#cmapcontainer")
                .append("svg")
                .attr("id", "cmap")
                .attr("style", "width:800px; height:600px");

            var forceGraph = d3.layout.force();
            forceGraph.size([$("#cmap").width(), $("#cmap").height()]);
            forceGraph.nodes(connectedNodes).links(links)
                .friction(0.5)
                .linkDistance(100)
                .charge(-750)
                .gravity(0.2)
                .start();

            //Create edges as lines
            var edges = svg.selectAll("line")
                .data(links)
                .enter()
                .append("line")
                .style("stroke", "#ccc")
                .style("stroke-width", 1);

            //Create nodes as circles
            var nodes = svg.selectAll("g")
                .data(connectedNodes)
                .enter()
                .append("g")
                .attr("class", "termNode")
                .attr("ondblclick", function(d, i) {
                    return "CMap.reprint(\"" + d.data.id + "\");";
                })
                .call(forceGraph.drag);

            var circles = nodes.append("ellipse")
                .style("fill", function(d, i) {
                    if (d.data.id === concept) {
                        return "#00CCFF";
                    } else if ((getLinkingPhrase(d.data.id) === undefined) === false) {
                        return "#52527A";
                    } else {
                        return "#6666FF";
                    }
                });
            nodes.append("text")
                .text(function(d, i) {
                    if (getLinkingPhrase(d.data.id) === undefined) {
                        return d.data.id;
                    } else {
                        return getLinkingPhrase(d.data.id);
                    }
                })
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .each(function(d) {
                    var width = this.getBBox().width;
                    var height = this.getBBox().height;
                    d.width = Math.sqrt(2) * (width / 2);
                    d.height = Math.sqrt(2) * (height / 2);
                });

            circles.attr("rx", function(d, i) {
                return d.width;
            });
            circles.attr("ry", function(d, i) {
                return d.height;
            });

            //Every time the simulation "ticks", this will be called
            forceGraph.on("tick", function() {
                nodes.attr("transform", function(d) {
                    var width = $("#cmap").width();
                    var height = $("#cmap").height();
                    d.x = d.x - (d.width / 2) < 0 ? d.x += 1 : d.x = d.x;
                    d.x = d.x + (d.width / 2) > width ? d.x -= 1 : d.x = d.x;
                    d.y = d.y - (d.height / 2) < 0 ? d.y += 1 : d.y = d.y;
                    d.y = d.y + (d.height / 2) > height ? d.y -= 1 : d.y = d.y;

                    return "translate(" + d.x + "," + d.y + ")"
                });

                edges.attr("x1", function(d) {
                        return d.source.x;
                    })
                    .attr("y1", function(d) {
                        return d.source.y;
                    })
                    .attr("x2", function(d) {
                        return d.target.x;
                    })
                    .attr("y2", function(d) {
                        return d.target.y;
                    });
            });
        } else {
            return false;
        }
        return true;
    }

    return {
        reprint: reprint,
        runit: runit
    };
}());