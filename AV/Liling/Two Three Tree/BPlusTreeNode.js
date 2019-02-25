// Helper function for tree nodes
$(document).ready(function() {
  "use strict";

  function newNode(valueArr, jsav, max, isLeaf){
    var arr = jsav.ds.array(valueArr, {left: "0", top: "0"});
    if (isLeaf) {
      arr.element.addClass("leaf-node");
    } else {
      arr.element.addClass("internal-node");
    }
    return new BPTNode(jsav, max, arr).center();
  }

  // Node constructor.
  function BPTNode(jsav, maximum, arr) {
    this.jsav = jsav;
    this.max = maximum;
    this.size = 0;
    this.array = arr;
    this.value = [];
    this.child = [];
    for(var i = 0; i < maximum; i++){
      this.value.push(0);
      this.child.push(null);
    }
  }
  //Add functions to node prototype
  var BPTNodeproto = BPTNode.prototype;

  //move array to the center
  // Move the node horizontally to the center of the canvas.
  BPTNodeproto.center = function() {
    var canvas = $(this.array.element).parent();
    var cw = $(canvas).outerWidth();
    var aw = $(this.array.element).outerWidth();
    var left_offset = (cw / 2) - (aw / 2);
    this.array.css({left: left_offset + "px", top: "15px"});
    return this;
  };

  // Shift the position of the node.
  BPTNodeproto.move = function(left, ttop) {
    this.array.css({left: "+=" + left + "px", top: "+=" + ttop + "px"});
  };

  BPTNodeproto.addChild = function(newChild) {
    this.children.push(newChild);
    this.drawEdge(this.children.length - 1);
  };

  // Draw edge from this node to child node.
  BPTNodeproto.drawEdge = function(child_node) {
    // Calculate edge position
    var pos = $(this.array.element).position();
    var c_pos = $(child_node.array.element).position();
    var x1 = pos.left,
        y1 = pos.top,
        x2 = c_pos.left,
        y2 = c_pos.top;

    // Adjust coordinates to align edges with arrays
    //var left_off = ($(this.array.element).outerWidth() / $(this.array.element).children("li").size()) * child_idx;
    var top_off = $(this.array.element).outerHeight();
    //x1 += left_off;
    y1 += top_off;
    x2 += $(child_node.array.element).outerWidth() / 2;
    y2 += 2;

    //edge = this.jsav.g.line(x1, y1, x2, y2);
    //edge.movePoints([[0, x1, y1], [1, x2, y2]]);
  };

  //check full
  BPTNodeproto.isFull = function(){
    return this.max == this.size;
  }

  //Set new to the val array at index position
  BPTNodeproto.setValue = function(index, newValue){
    this.value[index] = newValue;
  }

  //Set newChild to the Children array at index Position
  BPTNodeproto.setChildren = function(index, newChild){
    this.children[index] = newChild;
  }

  BPTNodeproto.clearValue = function(){
    this.size = 0;
    for(var i = 0; i < this.max; i++){
      this.value[i] = 0;
    }
  }

  BPTNodeproto.getChildrenSize = function(){
    var s = 0;
    for(var i = 0; i < this.max + 1; i++){
      if(this.children[i] != null){
        s++;
      }else{
        break;
      }
    }
    return s;
  }

  BPTNodeproto.clearChildren = function(){
    for(var i = 0; i < this.max + 1; i++){
      this.children[i] = null;
    }
  }

  //add addInfo into the value array in the right order
  BPTNodeproto.insert = function(addInfo){
    if(this.isFull()){
      return false;
    }else if(size == 0){
      this.value[0] = addInfo;
      this.size += 1;
      return true;
    }else{
      var pos = this.insertPos(addInfo, 0, this.size - 1);
      for(var i = size; i > pos; i--){
        this.value[i] = this.value[i - 1];
      }
      this.value[pos] = addInfo;
      this.size += 1;
      return true;
    }
  }

  BPTNodeproto.delete = function(delInfo){
    var pos = -1;
    for(var i = 0; i < this.size; i++){
      if(this.value[i] == delInfo){
        pos = i;
      }
    }
    if(pos != -1){
      this.size -= 1;
      for(var i = pos; i < this.size; i++){
        this.value[i] = this.value[i + 1];
      }
      return true;
    }
    return false;
  }

  /**
	 * find the position to add in the array: inside insert(when addInfo equal to
	 * the value in the parent, go to left side) used for insert
	 *
	 * @param addInfo the information that will be add in
	 * @param small   the smallest bound (pos)
	 * @param big     the biggest bound (pos)
	 * @return the index that we are going to added in
	 */
   BPTNodeproto.insertPos = function(addInfo, small, big){
     if(addInfo <= this.value[small]){
       return small;
     }else if(addInfo > this.value[big]){
       return big + 1;
     }else if(addInfo == this.value[big]){
       return big;
     }
     var index = (big + small) / 2;
     if(big - small == 1){
       return big;
     }else if(addInfo >= this.value[index]){
       return this.insertPos(addInfo, index, big);
     }else{
       return this.insertPos(addInfo, small, index);
     }
   }

   /**
	 * find the position to add in the array: inside insert(when addInfo equal to
	 * the value in the parent, go to right side) used for delete
	 *
	 * @param addInfo the information that will be add in
	 * @param small   the smallest bound (pos)
	 * @param big     the biggest bound (pos)
	 * @return the index that we are going to added in
	 */
   BPTNodeproto.findHelp = function(addInfo, small, big){
     if(addInfo < this.value[small]){
       return small;
     }else if(addInfo == this.value[small]){
       return small + 1;
     }else if(addInfo >= this.value[big]){
       return big + 1;
     }
     var index = (big + small) / 2;
     if(big - small == 1){
       return big;
     }else if(addInfo >= this.value[index]){
       return this.insertPos(addInfo, index, big);
     }else{
       return this.insertPos(addInfo, small, index);
     }
   }

   /**
	 * the Position that we will add Children in
	 *
	 * @param newChild new Child that will be added in the parent
	 * @return position that the new TreeNode will be added in
	 */
   BPTNodeproto.insertChildrenPos = function(newChild){
     var pos = 0;
     var b = newChild.getValue()[newChild.size() - 1];
     var curr = this.getChildren()[pos];
     while(pos < this.getChildrenSize() - 1){
       if(b <= curr.getValue()[0]){
         break;
       }else{
         pos += 1;
         curr = this.getChildren()[pos];
       }
     }
     if(b > curr.getValue()[0]){
       pos += 1;
     }
     return pos;
   }

   BPTNodeproto.size = function(){
     return this.size;
   }

   BPTNodeproto.setSize = function(newSize){
     this.size = newSize;
   }

   BPTNodeproto.getValue = function(){
     return this.value;
   }

   BPTNodeproto.getChildren = function(){
     return this.children;
   }

   BPTNodeproto.isLeaf = function(){
     for(var i = 0; i < this.max + 1; i++){
       if(this.children[i] != null){
         return false;
       }
     }
     return true;
   }

   //Testing function: toString
   BPTNodeproto.toString = function(){
     var result = "[";
     for(var i = 0; i < this.size - 1; i++){
       result += this.value[i];
       result += ",";
     }
     result += this.value[this.size - 1];
     result += "]";
     console.log(result);
   }

  // Publicize the public functions
  var BPTreeNode = {};
  BPTreeNode.newNode = newNode;
  window.BPTreeNode = BPTreeNode;
});
