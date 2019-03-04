//Helper functions for Node
$(document).ready(function() {
  "use strict";

  function newNode(element){
    this.data = element;
    this.next = null;
  }

  function setNext(nextNode){
    this.next = nextNode;
  }

  function next(){
    return this.next;
  }

  function data(){
    return this.data;
  }

  // Publicize the public functions
  var Node = {};
  Node.newNode = newNode;
  Node.setNext = setNext;
  Node.next = next;
  Node.data = data;
  window.Node = Node;
});


//Helper functions for SingleLinkedList Data Structure
$(document).ready(function() {
  "use strict";

  function newlist(){
    this.head = null;
    this.size = 0;
  }

 /**
  * Get the node in givenPosition PreCondition: List is not empty
  *
  * @param givenPosition position that the Node we want stored in
  * @throws IndexOutOfBoundsException if index is less than zero or greater than
  *                                   size
  * @throws IllegalArgumentException  if there is nothing in the Linked List
  * @return node at givenPosition
  */
  function getNodeAt(givenPosition){
    if(givenPosition >= 0 && givenPosition < this.size)

    var curr = this.head;
    var index = 0;
    while(index != givenPosition){
      curr = curr.next();
      index += 1;
    }
    return curr;

    if(givenPosition < 0 || givenPosition > this.size){
      throw "Index exceeds the size!";
    }else if(this.head == null){
      throw "Nothing in the List!";
    }else{

    }
  }

  function size(){
    return this.size;
  }

  /**
	 * Adds the object to the position in the list
	 *
	 * @precondition obj cannot be null
	 * @param index where to add the object
	 * @param obj   the object to add
	 * @throws IndexOutOfBoundsException if index is less than zero or greater than
	 *                                   size
	 * @throws IllegalArgumentException  if obj is null
	 */
   function add(index, obj){
     if(obj == null){
       throw "Object is null!";
     }
     if((index < 0) || (index > this.size)){
       throw "Index is out of bounds!"
     }
     var result = null;
     if(index == 0){
       result = new Node(obj);
       result.setNext(this.head);
       this.head = result;
     }else{
       var front = getNodeAt(index - 1);
       var frontNext = front.next();
       result = new Node(obj);
       front.setNext(result);
       result.setNext(frontNext);
     }
     this.size += 1;
   }

   /**
	 * Adds the object to the end of the list.
	 *
	 * @Precondition obj cannot be null
	 * @param obj the object to add
	 * @throws IllegalArgumentException is obj is null
	 */
   function add(obj){
     if(obj == null){
       throw "Object is null!";
     }
     var newNode = new Node(obj);
     if(isEmpty()){
       this.head = newNode;
     }else{
       var lastNode = getNodeAt(this.size - 1);
       lastNode.setNext(newNode);
     }
     this.size += 1;
   }

   function isEmpty(){
     return this.size == 0;
   }

   /**
	 * Remove the object at the given position
	 *
	 * @param index the position of the object
	 * @return true if the removal was successful
	 * @throws IndexOutOfBoundsException if there is not an element at the index
	 */
   function remove(index){
     if((index < 0) || (index > size) || (head == null)){
       throw "Index is out of bounds!";
     }
     if(index == 0){
       this.head = this.head.next();
       size -= 1;
       return true;
     }else{
       var front = getNodeAt(index - 1);
       var frontNext = front.next().next();
       front.setNext(frontNext);
       size -= 1;
       return true;
     }
   }

   /**
	 * Gets the data at index
	 *
	 * @param index the object is located
	 * @return The object at the given position
	 */
   function get(index){
     return this.getNodeAt(index).data();
   }

   /**
	 * remove all of the elements from the list
	 */
   function clear(){
     if(this.head != null){
       this.head.setNext(null);
       this.head = null;
       this.size = 0;
     }
   }

   //B+ Tree help method
   function getPosition(goal){
     var curr = this.head;
     var pos = -1;
     while(curr != null){
       pos += 1;
       if(curr.data() == goal){
         return pos;
       }
       curr = curr.next();
     }
     return pos;
   }

   // Publicize the public functions
   var List = {};
   List.getNodeAt = getNodeAt;
   List.size = size;
   List.add = add;
   List.isEmpty = isEmpty;
   List.remove = remove;
   List.get = get;
   List.clear = clear;
   List.getPosition = getPosition;
   window.List = List;
});
