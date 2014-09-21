private TTNode<Key,E> inserthelp(TTNode<Key,E> rt, Key k, E e) {
  TTNode<Key,E> retval;
  if (rt == null) // Empty tree: create a leaf node for root
    return new TTNode<Key,E>(k, e, null, null, null, null, null);
  if (rt.isLeaf()) // At leaf node: insert here
    return rt.add(new TTNode<Key,E>(k, e, null, null,
                                  null, null, null));
  // Add to internal node
  if (k.compareTo(rt.lkey()) < 0) { // Insert left
    retval = inserthelp(rt.lchild(), k, e);
    if (retval == rt.lchild()) return rt;
    else return rt.add(retval);
  }
  else if((rt.rkey() == null) || (k.compareTo(rt.rkey()) < 0)) {
    retval = inserthelp(rt.cchild(), k, e);
    if (retval == rt.cchild()) return rt;
    else return rt.add(retval);
  }
  else { // Insert right
    retval = inserthelp(rt.rchild(), k, e);
    if (retval == rt.rchild()) return rt;
    else return rt.add(retval);
  }
}

// Add a new key/value pair to the node. There might be a subtree
// associated with the record being added. This information comes
// in the form of a 2-3 tree node with one key and a (possibly null)
// subtree through the center pointer field.
public TTNode<Key,E> add(TTNode<Key,E> it) {
  if (rkey == null) { // Only one key, add here
    if (lkey.compareTo(it.lkey()) < 0) {
      rkey = it.lkey(); rval = it.lval();
      right = center; center = it.cchild();
    }
    else {
      rkey = lkey; rval = lval; right = center;
      lkey = it.lkey(); lval = it.lval();
      center = it.cchild();
    }
    return this;
  }
  else if (lkey.compareTo(it.lkey()) >= 0) { // Add left
    TTNode<Key,E> N1 = new TTNode<Key,E>(lkey, lval, null, null, it, this, null);
    it.setLeftChild(left);
    left = center; center = right; right = null;
    lkey = rkey; lval = rval; rkey = null; rval = null;
    return N1;
  }
  else if (rkey.compareTo(it.lkey()) < 0) { // Add center
    it.setCenterChild(new TTNode<Key,E>(rkey, rval, null, null, it.cchild(), right, null));
    it.setLeftChild(this);
    rkey = null; rval = null; right = null;
    return it;
  }
  else { // Add right
    TTNode<Key,E> N1 = new TTNode<Key,E>(rkey, rval, null, null, this, it, null);
    it.setLeftChild(right);
    right = null; rkey = null; rval = null;
    return N1;
  }
}

