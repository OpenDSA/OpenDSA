private E findhelp(TTNode<Key,E> root, Key k) {
  if (root == null) return null;          // val not found
  if (k.compareTo(root.lkey()) == 0) return root.lval();
  if ((root.rkey() != null) && (k.compareTo(root.rkey())
       == 0))
    return root.rval();
  if (k.compareTo(root.lkey()) < 0)       // Search left
    return findhelp(root.lchild(), k);
  else if (root.rkey() == null)           // Search center
    return findhelp(root.cchild(), k);
  else if (k.compareTo(root.rkey()) < 0)  // Search center
    return findhelp(root.cchild(), k);
  else return findhelp(root.rchild(), k); // Search right
}
