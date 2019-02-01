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
    /**
     * @description Creates a node for use in the graph.
     * @class
     * @param {Object} data The data stored at this node.
     * @param {Graph} The graph that this node is a member of.
     **/
    DS.GraphNode.prototype = function(data, graph) {
        this.data = data; // data to store at this node
        this.edges = [];
        //this.label = [];  //adds a label to the edge
        //this.parent = []; //stores the list of parents
        this.graph = graph;
    };
    
   // GraphNode Methods
    DS.GraphNode.prototype = {
        /**
         * @description Adds an 'edge' between this node and node. The nodes must be in the same graph.
         * @memberOf GraphNode
         * @param {GraphNode} node The node to add an edge between.
         * @return {Boolean} True if successful. False if not successful.
         **/
        addEdge: function(node,label) {
            if ((this.graph === node.graph) === false) {
                throw "Not in same graph";
            }
            if (this.edges.indexOf(node) == -1) {
                // Directed graph only one edge
                //this.edges.push(node);
                var i=-1;
                node.edges.push(this);
                node.edges[node.edges.length-1].label = label;
                this.parent = node;
                return true;
            }
            return false;
        },
        /**
         * @description Removes an 'edge' between this node and node. The nodes must be in the same graph
         * @memberOf GraphNode
         * @param {GraphNode} node The node to remove an edge between.
         * @return {Boolean} True if successful. False if not successful.
         **/
        removeEdge: function(node) {
            if ((this.graph === node.graph) === false) {
                throw "Not in same graph";
            }
            if (this.edges.indexOf(node) == -1) {
                return false;
            } else {
                node.edges.splice(node.edges.indexOf(this), 1);
                //this.edges.splice(this.edges.indexOf(node), 1);
                return true;
            }
        },
        /** 
         * @description Returns a list of all of the graph nodes that are at most depth edges away from this node.
         * @memberOf GraphNode
         * @param {Integer} depth
         * @param {Boolean} number Whether or not to assign each GraphNode a pos property that is used to index within the array returned.
         * @return {Array} An array of GraphNodes that meet the criteria including the source node.
         */
        connected: function(depth, number) {
            // Tree used to store the GraphNodes for quick lookup and then traversal
            var connectedNodes = [];
            var _connected = function(curNode, depth) {
                if (connectedNodes.indexOf(curNode) == -1) {
                    connectedNodes.push(curNode);
                }
                // Stops if depth is 0
                if (depth > 0) {
                    var index;
                    for (index = 0; index < curNode.edges.length; index++) {
                        var curEdge = curNode.edges[index]; // The current node connected to this node
                        if (connectedNodes.indexOf(curEdge) == -1) {
                            connectedNodes.concat(_connected(curEdge, depth - 1));
                        }
                    }
                }
            };
            // Call the function
            _connected(this, depth);
            if (number) {
                var index;
                for (index = 0; index < connectedNodes.length; index++) {
                    var curNode = connectedNodes[index];
                    curNode.index = index;
                }
            }
            return connectedNodes;
        },
        
        //Outgoing links
        revconnected: function(curIndex) {
            // Tree used to store the GraphNodes for quick lookup and then traversal
            var connectedNodes = [];
            if((this.parent === undefined) === false)
                connectedNodes = this.parent.connected(1, true,curIndex); 
            return connectedNodes;
        }
    };
    
    

    function buildGraph() {
        $.each(defs_obj.connections, function(key, value) {
            var edge = value;
            var toID = edge.to;
            var fromID = edge.from;
            var LabelID = edge.label;

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

            toNode.addEdge(fromNode,LabelID);
        });
    }

    function getDefinition(id) {
        return defs_obj.concepts[id];
    }

    function getLinkingPhrase(id) {
        return defs_obj.linking_phrase[id];
    }
    
//    function getLabel(id) {
//                   return defs_obj.connections[id].value.label;
//                         
//              }
    
    

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
        var url = '/OpenDSA/Books/' + ODSA.SETTINGS.BOOK_NAME + '/html/_static/GraphDefs.json';
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
        
        //Define Array unique function
            Array.prototype.unique = function() {
                return this.filter(function (value, index, self) { 
                    return self.indexOf(value) === index;
                    });
            }
            
        var newNodeData = graph.find(new NodeData(concept))[0];
        
        $('#cmapcontainer').off('dialogclose').on('dialogclose', function(event) {
          if (newNodeData) {
            odsaUtils.logUserAction('concept-map-closed', 'User closes the concept map window');
          }
        });
        
        if (newNodeData) {
            var connectedNodes = newNodeData.connected(2, true);
            //connectedNodes = connectedNodes.unique();

            //Adding Node's ingoing links
            if((newNodeData.parent === undefined)=== false)
            {
                var revconnectedNodes = newNodeData.revconnected();
                connectedNodes = connectedNodes.concat(revconnectedNodes);
                connectedNodes = connectedNodes.unique();
                var index;
                for (index = 0; index < connectedNodes.length; index++) {
                    var curNode = connectedNodes[index];
                    curNode.index = index;
                }
            }
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
                                target: curNode.edges[i].index,
                                label: curNode.edges[i].label
                            });
                        }
                    }
                }
                return links;
            };

            var links = makeLinks(connectedNodes);

//--------------Create SVG element
            var svg = d3.select("#cmapcontainer")
                        .append("svg")
                        .attr("id", "cmap")
                        .attr("style", "width:800px; height:600px")
                .call(d3.zoom().on("zoom", function () {
                   svg.attr("transform", d3.event.transform)}))
               .append("g")
                nodes,
                edges;
            
            svg.append('defs').append('marker')
               .attrs({'id':'arrowhead',
               'viewBox':'-0 -5 10 10',
               'refX':30,
               'refY':0,
               'markerUnits':'strokeWidth',
               'orient':'auto',
               'markerWidth':10,
               'markerHeight':10,
               'xoverflow':'visible'})
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#808080')
            .attr('stroke','#808080');
            
            

            var simulation = d3.forceSimulation()
                    .force("charge", d3.forceManyBody().strength(-1000))
        //strength(function(d, i) { return i ? -10000 : -5000; }).theta(0.1).distanceMax(150).distanceMin(100))
                    .force("link", d3.forceLink().distance(150).strength(1))
            //.id(function (d) {return d.data.id;})
                    .force("center", d3.forceCenter(400, 300))
                    .force('y', d3.forceY(300).strength(0.10));
                    //.force("collide", d3.forceCollide(20).radius(20).strength(0))
                    //.alphaDecay(0.1);
//-----------Create edges as lines-------------------
            var edges = svg.selectAll(".link")
                .data(links)
                .enter()
                .append("line")
                .attr("class", "link")
                .attr('marker-end','url(#arrowhead)')
                .attr("id",function(d,i) {return 'edge'+i})
                .style("stroke", "#808080")
                .style("stroke-width", 1);
            
            var edgepaths = svg.selectAll(".edgepath")
            .data(links)
            .enter()
            .append('path')
            .attrs({
                //'d': function(d) {
                //     return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
                'class': 'edgepath',
                'fill-opacity': 0,
                'stroke-opacity': 0,
                'id': function (d, i) {return 'edgepath' + i}
            })
            .style("pointer-events", "none");
            
            var edgelabels = svg.selectAll(".edgelabel")
            .data(links)
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .attrs({
                'class': 'edgelabel',
                'id': function (d, i) {return 'edgelabel' + i},
                'font-size': 11,
                'fill': '#484848'
            });
            
            edgelabels.append('textPath')
            .attr('xlink:href', function (d, i) {return '#edgepath' + i})
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .attr("startOffset", "50%")
            .text(function (d) {return d.label});
            
//-----------------Create nodes---------------
            var nodes = svg.selectAll("g")
                .data(connectedNodes)
                .enter()
                .append("g")
                .attr("class", "termNode")
//                .attr("ondblclick", function(d, i) {
//                    return "CMap.reprint(\"" + d.data.id + "\");";
//                })
                .style("font", "16px sans-serif")
                .call(d3.drag()
                    .on("start", drag_start)
                    .on("drag", dragged)
                    .on("end", drag_end)
                    //.on("end", dragended)
            );
 
            
//------------------------------------------------------

//-----------Make nodes as Rectangles---------
            var recta = nodes.append("rect") 
                .style("fill", function(d, i) {
                    if (d.data.id === concept) {
                    odsaUtils.logUserAction('concept-map-opened', 'User opens a concept map term');     
                        return "#FFFF33";
                    }
                    else if ((getLinkingPhrase(d.data.id) === undefined) === false) {
                        return "#586170";
                    } else {
                        return "#afb5af";
                    }
                })
                .style("stroke", "black");      
            
            nodes.on("mouseover", function(){
                d3.select(this)
                .style("fill","#ffffff")
                }); 

            nodes.on('mouseout', function() {
                d3.select(this)
                .style("fill","black")
                });
            
           nodes.on('click', function(d) {
                odsaUtils.logUserAction('inner-concept-map-term', 'User selects inner concept map term');
               if ($('#cmapcontainer').dialog("isOpen")) {
                    $('#cmapcontainer').dialog("close");
               }
               var termid = d.data.id;
               localStorage.setItem("concept","[\""+termid+"\"]");
               termid = termid.replace(/\s+/g, "-");
               termid = "#term-" + termid;
               localStorage.setItem("glossaryTarget",termid);
               window.location.reload();
               window.location.href = termid;
            });
            
            nodes.append("text")
                 .text(function(d, i) {
                    if (getLinkingPhrase(d.data.id) === undefined) {
                        var termid = d.data.id;
                        return d.data.id;
                    }
                })
                .attr("y", -5)
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "hanging")
                .each(function(d) {
                    var width = this.getBBox().width;
                    var height = this.getBBox().height;
                    d.width = Math.sqrt(5) * (width / 2);
                    d.height = Math.sqrt(5) * (height / 2);
                })
                .attr("width", function(d, i) {
                        return d.width;
                })
                .attr("height", function(d, i) {
                        return d.height;
                });
            
            recta.attr("width", function(d, i) {
                return d.width;
            })
            
            recta.attr("height", function(d, i) {
                return d.height;
            })
            recta.attr("x", function(d, i) {
                return - d.width/2;
            })
		    
            recta.attr("y", function(d, i) {
                return - d.height/2;
            })
            
            
            simulation
                 .nodes(connectedNodes)
                 .on("tick", ticked);

            simulation.force("link")
                 .links(links);            
                        
//------------------------------------------------------
//Every time the simulation "ticks", this will be called 
            
            function ticked() {  
                nodes.attr(
                    'transform',function(d) {
                    var width = $("#cmap").width();
                    var height = $("#cmap").height();
                    if (d.data.id === concept) {
                        d.x = width / 2;
                        d.y = height /  2;
                        d.fixed;
                    }
                    else                        
                    {
                        d.x = d.x - (d.width / 2) < 0 ? d.x += 2 : d.x = d.x;
                        d.x = d.x + (d.width / 2) > width ? d.x -= 2 : d.x = d.x;
                        d.y = d.y - (d.height / 2) < 0 ? d.y += 2 : d.y = d.y;
                        d.y = d.y + (d.height / 2) > height ? d.y -= 2 : d.y = d.y;
                    }
                   
                    return "translate(" + d.x + "," + d.y + ")"
                });
                

                edges.attr("x1", function (d) {return d.source.x;})
                     .attr("y1", function (d) {return d.source.y;})
                     .attr("x2", function (d) {return d.target.x;})
                     .attr("y2", function (d) {return d.target.y;});
                
                edgepaths.attr('d', function (d) {
                    return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                });
                
                edgelabels.attr('transform', function (d) {
                                    if (d.target.x < d.source.x) {
                                       var bbox = this.getBBox();
                                       var dx = bbox.x + bbox.width / 2;
                                       var dy = bbox.y + bbox.height / 2;
                                       return 'rotate(180 ' + dx + ' ' + dy + ')';
                                   }
                                   else {
                                   return 'rotate(0)';
                                    }
                });                
     }
            
    function drag_start(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    function drag_end(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
           d.fx = Math.max(70, Math.min(800 - 70, d3.event.x));
           d.fy = Math.max(10, Math.min(600 - 30, d3.event.y));   
    }

            
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