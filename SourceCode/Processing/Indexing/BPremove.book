/** Delete a record with the given key value, and 
    return true if the root underflows */
private boolean removehelp(BPNode<Key,E> rt, Key k) {
  int currec = binaryle(rt.keys(), rt.numrecs(), k);
  if (rt.isLeaf())
    if (((BPLeaf<Key,E>)rt).keys()[currec] == k)
      return ((BPLeaf<Key,E>)rt).delete(currec);
    else return false;
  else // Process internal node
    if (removehelp(((BPInternal<Key,E>)rt).pointers(currec),
        k))
      // Child will merge if necessary
      return ((BPInternal<Key,E>)rt).underflow(currec);
    else return false;
}
