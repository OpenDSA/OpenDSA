/* *** ODSATag: BST *** */
   /** Binary Search Tree implementation for Dictionary ADT */
   class BST<Key extends Comparable<? super Key>, E>
            implements Dictionary<Key, E> {
     private BSTNode<Key,E> root; // Root of the BST
     private int nodecount; // Number of nodes in the BST

     /** Constructor */
     BST() { root = null; nodecount = 0; }

     /** Reinitialize tree */
     public void clear() { root = null; nodecount = 0; }

     /** Insert a record into the tree.
         @param k Key value of the record.
         @param e The record to insert. */
     public void insert(Key k, E e) {
       root = inserthelp(root, k, e);
       nodecount++;
     }

     /** Remove a record from the tree.
         @param k Key value of record to remove.
         @return The record removed, null if there is none. */
     public E remove(Key k) {
       E temp = findhelp(root, k); // First find it
       if (temp != null) {
         root = removehelp(root, k); // Now remove it
         nodecount--;
       }
       return temp;
     }

     /** Remove and return the root node from the dictionary.
         @return The record removed, null if tree is empty. */
     public E removeAny() {
       if (root == null) return null;
       E temp = root.element();
       root = removehelp(root, root.key());
       nodecount--;
       return temp;
     }

     /** @return Record with key value k, null if none exist.
         @param k The key value to find. */
     public E find(Key k) { return findhelp(root, k); }

     /** @return The number of records in the dictionary. */
     public int size() { return nodecount; }
   }
/* *** ODSAendTag: BST *** */

/* *** ODSATag: findhelp *** */
   private E findhelp(BSTNode<Key,E> rt, Key k) {
     if (rt == null) return null;
     if (rt.key().compareTo(k) > 0)
       return findhelp(rt.left(), k);
     else if (rt.key().compareTo(k) == 0) return rt.element();
     else return findhelp(rt.right(), k);
   }
/* *** ODSAendTag: findhelp *** */

/* *** ODSATag: inserthelp *** */
   /** @return The current subtree, modified to contain
      the new item */
   private BSTNode<Key,E> inserthelp(BSTNode<Key,E> rt,
                                     Key k, E e) {
     if (rt == null) return new BSTNode<Key,E>(k, e);
     if (rt.key().compareTo(k) > 0)
       rt.setLeft(inserthelp(rt.left(), k, e));
     else
       rt.setRight(inserthelp(rt.right(), k, e));
     return rt;
   }
/* *** ODSAendTag: inserthelp *** */

/* *** ODSATag: deletemin *** */
   private BSTNode<Key,E> deletemin(BSTNode<Key,E> rt) {
     if (rt.left() == null) return rt.right();
     rt.setLeft(deletemin(rt.left()));
     return rt;
   }
/* *** ODSAendTag: deletemin *** */

/* *** ODSATag: getmin *** */
   private BSTNode<Key,E> getmin(BSTNode<Key,E> rt) {
     if (rt.left() == null) return rt;
     return getmin(rt.left());
   }
/* *** ODSAendTag: getmin *** */

/* *** ODSATag: removehelp *** */
   /** Remove a node with key value k
       @return The tree with the node removed */
   private BSTNode<Key,E> removehelp(BSTNode<Key,E> rt,Key k) {
     if (rt == null) return null;
     if (rt.key().compareTo(k) > 0)
       rt.setLeft(removehelp(rt.left(), k));
     else if (rt.key().compareTo(k) < 0)
       rt.setRight(removehelp(rt.right(), k));
     else { // Found it
       if (rt.left() == null) return rt.right();
       else if (rt.right() == null) return rt.left();
       else { // Two children
         BSTNode<Key,E> temp = getmin(rt.right());
         rt.setElement(temp.element());
         rt.setKey(temp.key());
         rt.setRight(deletemin(rt.right()));
       }
     }
     return rt;
   }
/* *** ODSAendTag: removehelp *** */

/* *** ODSATag: printhelp *** */
   private void printhelp(BSTNode<Key,E> rt) {
     if (rt == null) return;
     printhelp(rt.left());
     printVisit(rt.element());
     printhelp(rt.right());
   }
/* *** ODSAendTag: printhelp *** */
