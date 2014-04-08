/* Bintree Constructor */
(function () {
    function Bintree(av, root, min, max) {

        this.t = av.ds.bintree({nodegap: 25});
        this.t.layout();
        this.r = this.t.root(root);
        this.t.layout();

        this.insert = function(val) {
            
            // check if valid bounds
            if (val < min || val > max) {
                return undefined;
            }

            this.r = insertHelp(this.r, val);
        }

        this.remove = function(val) {

        };

        this.layout = function() {
            t.layout();
        };

        this.insertHelp = function(node, val) {
            
            if (typeof node.value() === "undefined") {
                return undefined;
            }
            if (this.r.value() > val) {
                if (typeof this.r.left() === "undefined") {

                }
            }        
        };

        this.removeHelp = function(node, val) {
      
        };
    }

    var tree = {};
    tree.Bintree = Bintree;
    window.tree = tree;
}());
