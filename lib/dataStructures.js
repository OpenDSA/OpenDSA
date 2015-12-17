var DS = (function(){
    /** 
     * @description Creates a binary tree.
     * @class
     * @param [compareFunction] The function used to compare the values of nodes.
     */
    var BinaryTree = function(compareFunction) {
        this.root = null;
        this.compare = null;
        this._curNum = null;
        if (typeof compareFunction === "function") {
            this.compare = compareFunction;
        } else {
            this.compare = function(val1, val2) {
                if (val1 < val2) {
                    return -1;
                } else if (val1 == val2) {
                    return 0;
                } else {
                    return 1;
                }
            };
        }
    };

    BinaryTree.prototype = {
        /**
         * @description Inserts the value into the tree. Returns the tree node the value is stored at
         * @memberOf BinaryTree
         * @param value The value to insert.
         * @Return {Object} An object that has whether or not the value was in the tree already and the corresponding TreeNode.
         */
        insert: function(value) {
            var _find = function(curNode, parent, tree) {
                    if (curNode == null) {
                        // End of tree
                        return parent;
                    }
                    if (tree.compare(curNode.value, value) == 0) {
                        // Found the value
                        return curNode;
                    }
                    if (tree.compare(value, curNode.value) < 0) {
                        // Go to the left child
                        return _find(curNode.left, curNode, tree);
                    } else {
                        // Go to the right child
                        return _find(curNode.right, curNode, tree);
                    }
                }
                // This can either be a parent node or the node itself
                // Need to check the value
            var foundNode = _find(this.root, null, this);
            if (foundNode === null) {
                //There are no nodes in the tree yet so update root
                this.root = new TreeNode(value);
                return {
                    existed: false,
                    node: this.root
                };
            }
            if (this.compare(foundNode.value, value) == 0) {
                return {
                    existed: true,
                    node: foundNode
                };
            } else if (this.compare(foundNode.value, value) < 0) {
                var newNode = new TreeNode(value);
                foundNode.right = newNode;
                return {
                    existed: false,
                    node: newNode
                };
            } else {
                var newNode = new TreeNode(value);
                foundNode.left = newNode;
                return {
                    existed: false,
                    node: newNode
                };
            }
        },
        /**
         * Finds the TreeNode associated with a value.
         * @memberOf BinaryTree
         * @param value The value to find.
         * @param [rootNode] The root to start at.
         * @return {TreeNode} The TreeNode.
         */
        find: function(value, rootNode) {

            if (rootNode === null) {
                // End of tree
                return null;
            }

            var root = this.root;
            if (rootNode != undefined) {
                root = rootNode;
            }

            if (this.compare(root.value, value) == 0) {
                // Found the value
                return root;
            }
            if (this.compare(value, root.value) < 0) {
                // Go to the left child
                return this.find(value, root.left);
            } else {
                // Go to the right child
                return this.find(value, root.right);
            }

        },

        /**
         * Returns the minimum node in the subtree.
         * @memberOf BinaryTree
         * @param [rootNode] The root of the subtree to search. Default is root.
         * @return {TreeNode} The TreeNode.
         */
        min: function(rootNode) {
            if (rootNode === null) {
                return null;
            }
            // Determine if tree root or not
            var root = this.root;
            if (rootNode != undefined) {
                root = rootNode;
            }
            while (root.left != null) {
                root = root.left;
            }
            return root;
        },
        /**
         * Returns the maximum node in the subtree.
         * @memberOf BinaryTree
         * @param [rootNode] The root of the subtree to search. Default is root.
         * @return {TreeNode} The TreeNode.
         */
        max: function(rootNode) {
            if (rootNode === null) {
                return null;
            }
            var root = this.root;
            if (rootNode != undefined) {
                root = rootNode;
            }
            while (root.right != null) {
                root = root.right;
            }
            return root;
        },
        /**
         * Removes the TreeNode associated with value from the tree. Does nothing if not found.
         * @memberOf BinaryTree
         * @param value The value to remove
         **/
        remove: function(value) {
            this.root = this._remove(value, this.root);
        },
        /* Removes the value from the tree */
        _remove: function(value, curNode) {

            if (this.compare(curNode.value, value) === 0) {
                if (curNode.isLeaf()) {
                    curNode = null;
                } else if (curNode.left != null && curNode.right != null) {
                    var min = this.min(curNode.right);
                    curNode.right = this._remove(min.value, curNode.right);
                    curNode.data = min.data;
                    curNode.value = min.value;
                } else if (curNode.left != null) {
                    curNode = curNode.left;
                } else {
                    curNode = curNode.right;
                }
            } else if (this.compare(curNode.value, value) < 0) {
                curNode.right = this._remove(value, curNode.right);
            } else {
                curNode.left = this._remove(value, curNode.left);
            }
            return curNode;
        },
        /**
         * Counts the number of nodes in the tree.
         * @memberOf BinaryTree
         * @param [rootNode] The node to start the count at. Defaults to root.
         * @return {Integer} The count.
         **/
        count: function(rootNode) {
            var root = this.root;
            if (rootNode != undefined) {
                root = rootNode;
            }

            if (root.isLeaf()) {
                return 1;
            } else {
                var leftCount = 0;
                var rightCount = 0;
                if (root.left != null) {
                    leftCount = this.count(root.left);
                }
                if (root.right != null) {
                    rightCount = this.count(root.right);
                }
                return leftCount + rightCount + 1;
            }
        },
        /** 
         * @memberOf BinaryTree
         * @description In order traversal of the BinaryTree.
         * @param [assignNums] Boolean to assign numberings to each node.
         * If assignNums = true then each node will get a pos property which corresponds 
         * to it's position within the array. The idea is that each graph node maintains 
         * a list of references to all of it's child nodes. By associating a position with 
         * each node, it is not necessary to search through the list to determine the 
         * position of the child node within that list. This was done for integration with 
         * d3.js.
         * 
         * 
         * @return {Array} The list of GraphNodes in order
         */
        traverse: function(assignNums) {
            var curNum = 0; // The current numbering of the node
            var _traverse = function(root, assignNums) {
                if (root === null) {
                    // in case of empty tree
                    return [];
                } else {
                    var list = [];
                    // Add all nodes on the left
                    if (root.left != null) {
                        list = list.concat(_traverse(root.left, assignNums));
                    }
                    // Add current node
                    list.push(root);
                    if (assignNums) {
                        /* assign the index to the node */
                        root.pos = curNum;
                        curNum = curNum + 1;
                    }
                    // Add nodes on the right
                    if (root.right != null) {
                        list = list.concat(_traverse(root.right, assignNums));
                    }
                    return list;
                }
            }
            return _traverse(this.root, assignNums);
        }
    };

    /**
     * Creates a TreeNode object
     * @class
     * @param [value] The value to store at this node.
     **/
    var TreeNode = function(value) {
        this.value = null;
        this.left = null;
        this.right = null;
        if (value != undefined) {
            this.value = value;
        }
    };

    TreeNode.prototype = {
        /**
         * Determines if the node is a leaf.
         * @memberOf TreeNode
         * @return {Boolean} True if it is a leaf. False if it is not.
         **/
        isLeaf: function() {
            return (this.right === null && this.left === null);
        },
        /** 
         * Copies the contents of node into this node.
         * @memberOf TreeNode
         * @param [node] The node to copy.
         **/
        copy: function(node) {
            if (node === null) {
                this.left = this.right = this.value = this.data = null;
            } else {
                this.left = node.left;
                this.right = node.right;
                this.data = node.data;
                this.value = node.value;
            }
        }
    }

    /**
     * Creates a graph object. Only one of each data can be stored.
     * @class
     * @param {Function} compareData The function that determines how data should be compared.
     **/
    var Graph = function(compareData) {
        this.nodes = []; // The list of vertices (Node objects)
        this.compare = compareData;
    };

    Graph.prototype = {
        /**
         * Adds a node to the Graph.
         * @memberOf Graph
         * @param {Object} data The data to store at the node.
         * @return {GraphNode} The node the data was stored at.
         **/
        addNode: function(data) { // adds a node to the graph and returns it's index
            var node = new GraphNode(data, this);
            this.nodes.push(node);
            return node;
        },
        /**
         * @description Finds the nodes that contain data.
         * @memberOf Graph
         * @param {Object} data The data to search for.
         * @return {Array}
         **/
        find: function(data) {
            var index;
            var comparison = new GraphNode(data, this.compare);
            var matchingNodes = [];
            for (index = 0; index < this.nodes.length; index++) {
                var curNode = this.nodes[index];
                if (this.compare(curNode.data, data) == 0) {
                    matchingNodes.push(curNode);
                }
            }
            return matchingNodes;
        }
    };

    /**
     * @description Creates a node for use in the graph.
     * @class
     * @param {Object} data The data stored at this node.
     * @param {Graph} The graph that this node is a member of.
     **/
    var GraphNode = function(data, graph) {
        this.data = data; // data to store at this node
        this.edges = [];
        this.graph = graph;
    };

    // GraphNode Methods
    GraphNode.prototype = {
        /**
         * @description Adds an 'edge' between this node and node. The nodes must be in the same graph.
         * @memberOf GraphNode
         * @param {GraphNode} node The node to add an edge between.
         * @return {Boolean} True if successful. False if not successful.
         **/
        addEdge: function(node) {
            if ((this.graph === node.graph) === false) {
                throw "Not in same graph";
            }
            if (this.edges.indexOf(node) == -1) {
                // Add each node to each other's corresponding edge list
                this.edges.push(node);
                node.edges.push(this);
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
                this.edges.splice(this.edges.indexOf(node), 1);
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
        }
    };
    
    return {
        BinaryTree: BinaryTree, 
        TreeNode: TreeNode,
        Graph: Graph,
        GraphNode: GraphNode
    };
}());
