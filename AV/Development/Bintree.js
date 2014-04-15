/* Bintree Constructor */
(function () {
    function Bintree(av, root, min, max) {

        this.t = av.ds.binarytree({nodegap: 25});
        this.t.layout();
        this.r = this.t.root(root);
        this.r.type = "leaf";
        this.r.value = root;
        this.t.layout();

        this.insertHelp = function(node, val, splitValue) {
            
            // if (typeof node === "undefined") {
            //     return val;
            // }

            // if (node.value() > val) {
            //     node.left(this.insertHelp(node.left(), val));
            // }

            // if (node.value() <= val) {
            //     node.right(this.insertHelp(node.right(), val));
            // }        
            
            if (node.type === "leaf") 
            {
                var newInternal = this.t.newNode(-1);
                newInternal.type = "internal";
                newInternal.splitVal = splitValue;

                var newNode = this.t.newNode(val);
                newInternal.type = "leaf";
                newNode.splitValue = this.splitValue / 2;

                insertHelp(newNode, )
            }
            else if (node.type === "internal")
            {

            } 
            else // we know its empty
            {    
                return this.t.newNode(val);
            }
        };

        this.removeHelp = function(node, val) {
      
        };

        this.insert = function(val) {
            // check if valid bounds
            if (val < min || val > max) {
                return undefined;
            }

            this.r = this.insertHelp(this.r, val, max / 2);
        }

        this.remove = function(val) {

        };

        this.layout = function() {
            this.t.layout();
        };
    }

    var tree = {};
    tree.Bintree = Bintree;
    window.tree = tree;
}());
