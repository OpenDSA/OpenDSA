private E findhelp(BPNode<Key,E> rt, Key k) {
  int currec = binaryle(rt.keys(), rt.numrecs(), k);
  if (rt.isLeaf())
    if ((((BPLeaf<Key,E>)rt).keys())[currec] == k)
      return ((BPLeaf<Key,E>)rt).recs(currec);
    else return null;
  else
    return findhelp(((BPInternal<Key,E>)rt).pointers(currec), k);
}
