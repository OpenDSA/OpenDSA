// Written by Liling Yuan, Spring 2019
// B+ Tree Node implementation
$(document).ready(function() {
  "use strict";

  function newNode(valueArr, jsav, max, isLeaf, detail){
    var arr = jsav.ds.array(valueArr, {left: "0", top: "0"});
    if (isLeaf) {
      arr.element.addClass("leaf-node");
    } else {
      arr.element.addClass("internal-node");
    }
    return new BPTNode(valueArr, jsav, max, arr, detail);
  }

  // Node constructor.
  function BPTNode(valueArr, jsav, maximum, arr, det) {
    this.jsav = jsav;
    this.max = maximum;
    this.size_value = 0;
    this.size_child = 0;
    this.array = arr;
    this.value = [];
    this.child = [];
    this.info = [];
    this.detail = det;
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

  BPTNodeproto.highlight = function(boolean){
    if(boolean){
      this.array.highlight(boolean);
    }else{
      for(var i = 0; i < this.max; i++){
        this.array.unhighlight(i);
      }
    }
  }

  BPTNodeproto.unhighlight = function(levelArr){
    for(var i = 0; i < levelArr.length; i++){
        levelArr[i].highlight(false);
    }
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
     this.array.css({left: "+" + left + "px", top: "+" + ttop + "px"});
   };

   //rt will be a node
   BPTNodeproto.addInfoGraph = function(){
     for(var i = 0; i < this.size_value; i++){
         this.array.value(i, this.value[i] + "<br><div class='leaf-node-value'>" + this.info[i] + "</div>");
     }
   }

   BPTNodeproto.isLeaf = function(){
     if(this.size_child == 0){
       return true;
     }
     return false;
   }

   BPTNodeproto.drawRectangle = function(rect, node1, node2) {
     var padding = 10;
     var n1p = $(node1.array.element).position();
     var n2p = $(node2.array.element).position();
     var width = $(node1.array.element).outerWidth();
     var height = $(node1.array.element).outerHeight();

     var x = n1p.left - padding + 3;
     var y = n1p.top - padding + 3;
     var w = (n2p.left + width) - (n1p.left) + (padding * 2);
     var h = height + (padding * 2);

     if (rect) {
       rect.hide();
     }
     rect = this.jsav.g.rect(x, y, w, h);
     rect.addClass("node-split-rect");
     return rect;
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

  //parameter jsarr is the array in javascript
  BPTNodeproto.checkSame = function(jsarr){
    if(this.size_value == jsarr.length){
      for(var i = 0; i < jsarr.length; i++){
        if(this.value[i] != jsarr[i]){
          return false;
        }
      }
      return true;
    }
    return false;
  }

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
    this.info.splice(0, this.size_value);//clear info
    this.size_value = 0;
  }

  BPTNodeproto.isFull = function(){
    return this.size_value == this.max;
  }

  BPTNodeproto.setValue = function(index, newValue, information){
    this.value[index] = newValue;
    this.array.value(index, newValue);
    this.info[index] = information;
  }

   /**
  * find the position to add in the array: inside insert(when delInfo equal to
  * the value in the parent, go to right side) used for delete
  *
  * @param delInfo the information that will be add in
  * @param small   the smallest bound (pos)
  * @param big     the biggest bound (pos)
  * @return the index that we are going to added in
  */
   BPTNodeproto.findHelp = function(delInfo, small, big){
     if(delInfo < this.value[small]){
       return small;
     }else if(delInfo == this.value[small]){
       return small + 1;
     }else if(delInfo >= this.value[big]){
       return big + 1;
     }
     var index = Math.trunc((big + small) / 2);
     if(big - small == 1){
       return big;
     }else if(delInfo >= this.value[index]){
       return this.findHelp(delInfo, index, big);
     }else{
       return this.findHelp(delInfo, small, index);
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

  BPTNodeproto.insert = function(addInfo, information, show){
    if(this.isFull()){
      return false;
    }else if(this.size_value == 0){
      this.setValue(0, addInfo, information); //add information
      this.size_value += 1;
      return true;
    }else{
      var pos = this.findHelp(addInfo, 0, this.size_value - 1);
      this.array.value(this.size_value, "");
      for(var i = this.size_value; i > pos; i--){
        this.value[i] = this.value[i - 1];
        this.array.value(i, this.value[i - 1]);
        //shift info array
        this.info[i] = this.info[i - 1];
        if(this.detail&& show){
          this.array.swap(i, i-1);
          this.array.value(i-1, "");
          (this.jsav).umsg("Insert key-value pair (" + addInfo + ", " + information + "): because " + addInfo + " is less than " + this.value[i-1] + ", swap " + this.value[i - 1] + " with right side value to create a space for " + addInfo);
          (this.jsav).step();
        }
      }
      this.setValue(pos, addInfo, information); //set new info
      this.size_value++;
      return true;
    }
  }

  //no details show delete
  BPTNodeproto.delete = function(delInfo, show){
    var pos = -1;
    for(var i = 0; i < this.size_value; i++){
      if(this.value[i] == delInfo){
        pos = i;
      }
    }
    if(pos != -1){
      this.size_value--;
      this.array.value(pos, "");
      if(this.detail && show){
        (this.jsav).umsg("Delete " + delInfo + ".");
        if(pos != this.size_value){
            (this.jsav).step();
        }
      }
      for(var i = pos; i < this.size_value; i++){
        this.setValue(i, this.value[i + 1], this.info[i + 1]); //shift both value and info
        this.array.value(i, this.value[i + 1]);
        if(this.detail && show){
          (this.jsav).umsg("Swap " + this.value[i + 1] + " with previous empty value to remove the empty space.");
          this.array.swap(i, i+1);
          this.array.value(i+1, "");
          if(i != this.size_value - 1){
              (this.jsav).step();
          }
        }
      }
      this.value.pop();
      this.info.pop(); //pop info from array
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
