// Helper function for tree nodes
$(document).ready(function() {
  "use strict";

  function newNode(valueArr, jsav, max, isLeaf){
    var arr = jsav.ds.array(valueArr, {left: "0", top: "0"});
    arr.element.addClass("internal-node");
    // if (isLeaf) {
    //   arr.element.addClass("leaf-node");
    // } else {
    //   arr.element.addClass("internal-node");
    // }
    return new BPTNode(valueArr, jsav, max, arr);
  }

  // Node constructor.
  function BPTNode(valueArr, jsav, maximum, arr) {
    this.jsav = jsav;
    this.max = maximum;
    this.size_value = 0;
    this.size_child = 0;
    this.array = arr;
    this.value = [];
    this.child = [];
    for(var i = 0; i < maximum; i++){
      if(valueArr[i] != ""){
        this.value[i] = valueArr[i];
        this.size_value++;
      }
    }
  }

  //Add functions to node prototype
  var BPTNodeproto = BPTNode.prototype;

  //following functions are for graphing

  BPTNodeproto.hide = function(){
    this.array.hide();
  }

  BPTNodeproto.showArray = function(){
    this.array.show();
  }

   BPTNodeproto.center = function() {
     var canvas = $(this.array.element).parent();
     var cw = $(canvas).outerWidth();
     var aw = $(this.array.element).outerWidth();
     var left_offset = (cw / 2) - (aw / 2);
     this.array.css({left: left_offset + "px", top: "0px"});
     return this;
   };

   BPTNodeproto.move = function(left, ttop) {
     this.array.css({left: "+=" + left + "px", top: "+=" + ttop + "px"});
   };

   BPTNodeproto.isLeaf = function(){
     if(this.size_child == 0){
       return true;
     }
     return false;
   }

   //help method for Children

  BPTNodeproto.setChildren = function(index, newChild){
    this.child[index] = newChild;
  }

  BPTNodeproto.clearChildren = function(){
    this.child.splice(0, this.size_child);
    this.size_child = 0;
  }

  BPTNodeproto.getChildren = function(){
    return this.child;
  }

  BPTNodeproto.getChildrenSize = function(){
    return this.size_child;
  }

  BPTNodeproto.addChildrenInNode = function(newChild){
    if(this.size_child == 0) {
      this.setChildren(0, newChild);
    }else{
      var pos = this.insertChildrenPos(newChild);
      this.setChildren(pos, newChild);
    }
    this.size_child++;
  }

  BPTNodeproto.addChildrenInNodeIndex = function(index, newChild){
    this.setChildren(index, newChild);
    this.size_child++;
  }

  BPTNodeproto.popChild = function(){
    this.size_child--;
    this.child.pop();
  }

  //help method for value

  BPTNodeproto.size = function(){
    return this.size_value;
  }

  BPTNodeproto.setSize = function(newSize){
    this.size_value = newSize;
  }

  BPTNodeproto.getValue = function(){
    return this.value;
  }

  BPTNodeproto.clearValue = function(){
    for(var i = 0; i < this.size_value; i++){
      this.array.value(i, "");
    }
    this.value.splice(0, this.size_value);
    this.size_value = 0;
  }

  BPTNodeproto.isFull = function(){
    return this.size_value == this.max;
  }

  BPTNodeproto.setValue = function(index, newValue){
    this.value[index] = newValue;
    this.array.value(index, newValue);
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
     var index = Math.trunc((big + small) / 2);
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
     while(pos < this.size_child - 1){
       if(b <= curr.getValue()[0]){
         break;
       }else{
         pos++;
         curr = this.getChildren()[pos];
       }
     }
     if(b > curr.getValue()[0]){
       pos++;
     }
     return pos;
   }

  BPTNodeproto.insert = function(addInfo){
    if(this.isFull()){
      return false;
    }else if(this.size_value == 0){
      this.setValue(0, addInfo);
      this.size_value += 1;
      return true;
    }else{
      var pos = this.insertPos(addInfo, 0, this.size_value - 1);
      for(var i = this.size_value; i > pos; i--){
        this.value[i] = this.value[i - 1];
        this.array.value(i, this.value[i - 1]);
      }
      this.setValue(pos, addInfo);
      this.size_value++;
      return true;
    }
  }

  BPTNodeproto.delete = function(delInfo){
    var pos = -1;
    for(var i = 0; i < this.size_value; i++){
      if(this.value[i] == delInfo){
        pos = i;
      }
    }
    if(pos != -1){
      this.size_value--;
      for(var i = pos; i < this.size_value; i++){
        this.setValue(i, this.value[i + 1]);
        this.array.value(i, this.value[i + 1]);
      }
      this.value.pop();
      this.array.value(this.size_value, "");
      return true;
    }
    return false;
  }

  // Publicize the public functions
  var BPTreeNode = {};
  BPTreeNode.newNode = newNode;
  window.BPTreeNode = BPTreeNode;
});
