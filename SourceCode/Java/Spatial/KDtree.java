// This code is stuck in here just so that Sphinx won't complain about
// lex'ing raw code.
// Instead, a codeinclude runs it through a better pretty-printer.

/* *** ODSATag: findmin *** */
   private KDNode<E>
   findmin(KDNode<E> rt, int descrim, int level) {
     KDNode<E> temp1, temp2;
     int[] key1 = null;
     int[] key2 = null;
     if (rt == null) return null;
     temp1 = findmin(rt.left(), descrim, (level+1)%D);
     if (temp1 != null) key1 = temp1.key();
     if (descrim != level) {
       temp2 = findmin(rt.right(), descrim, (level+1)%D);
       if (temp2 != null) key2 = temp2.key();
       if ((temp1 == null) || ((temp2 != null) &&
                      (key1[descrim] > key2[descrim]))) {
         temp1 = temp2;
         key1 = key2;
       }
     } // Now, temp1 has the smaller value
     int[] rtkey = rt.key();
     if ((temp1 == null) || (key1[descrim] > rtkey[descrim]))
       return rt;
     else
       return temp1;
   }
/* *** ODSAendTag: findmin *** */


/* *** ODSATag: findhelp *** */
   private E findhelp(KDNode<E> rt, int[] key, int level) {
     if (rt == null) return null;
     E it = rt.element();
     int[] itkey = rt.key();
     if ((itkey[0] == key[0]) && (itkey[1] == key[1]))
       return rt.element();
     if (itkey[level] > key[level])
       return findhelp(rt.left(), key, (level+1)%D);
     else
       return findhelp(rt.right(), key, (level+1)%D);
   }
/* *** ODSAendTag: findhelp *** */


/* *** ODSATag: rshelp *** */
   private void rshelp(KDNode<E> rt, int[] point,
                       int radius, int lev) {
     if (rt == null) return;
     int[] rtkey = rt.key();
     if (InCircle(point, radius, rtkey))
       System.out.println(rt.element());
     if (rtkey[lev] > (point[lev] - radius))
       rshelp(rt.left(), point, radius, (lev+1)%D);
     if (rtkey[lev] < (point[lev] + radius))
       rshelp(rt.right(), point, radius, (lev+1)%D);
   }
/* *** ODSAendTag: rshelp *** */
