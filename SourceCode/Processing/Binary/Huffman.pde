/* *** ODSATag: HuffmanNode *** */
/** Huffman tree node implementation: Base class */
interface HuffBaseNode {
  boolean isLeaf(); 
  int weight();
}


/** Huffman tree node: Leaf class */
class HuffLeafNode implements HuffBaseNode {
  private char element;      // Element for this node
  private int weight;        // Weight for this node

  /** Constructor */
  HuffLeafNode(char el, int wt)
    { element = el; weight = wt; }

  /** @return The element value */
  char element() { return element; }

  /** @return The weight */
  int weight() { return weight; }

  /** Return true */
  boolean isLeaf() { return true; }
}


/** Huffman tree node: Internal class */
class HuffInternalNode implements HuffBaseNode {
  private int weight;            
  private HuffBaseNode left;  
  private HuffBaseNode right; 

  /** Constructor */
  HuffInternalNode(HuffBaseNode l,
                          HuffBaseNode r, int wt)
    { left = l; right = r; weight = wt; }

  /** @return The left child */
  HuffBaseNode left() { return left; }

  /** @return The right child */
  HuffBaseNode right() { return right; }

  /** @return The weight */
  int weight() { return weight; }

  /** Return false */
  boolean isLeaf() { return false; }
}
/* *** ODSAendTag: HuffmanNode *** */

/* *** ODSATag: HuffmanTree *** */
/** A Huffman coding tree */
class HuffTree implements Comparable {
  private HuffBaseNode root;  

  /** Constructors */
  HuffTree(char el, int wt)
    { root = new HuffLeafNode(el, wt); }
  HuffTree(HuffBaseNode l, HuffBaseNode r, int wt)
    { root = new HuffInternalNode(l, r, wt); }

  HuffBaseNode root() { return root; }
  int weight() // Weight of tree is weight of root
    { return root.weight(); }
  int compareTo(Object t) {
    HuffTree that = (HuffTree)t;
    if (root.weight() < that.weight()) return -1;
    else if (root.weight() == that.weight()) return 0;
    else return 1;
  }
}
/* *** ODSAendTag: HuffmanTree *** */

/* *** ODSATag: HuffmanTreeBuild *** */
static HuffTree buildTree() {
  HuffTree tmp1, tmp2, tmp3 = null;

  while (Hheap.heapsize() > 1) { // While two items left
    tmp1 = Hheap.removemin();
    tmp2 = Hheap.removemin();
    tmp3 = new HuffTree(tmp1.root(), tmp2.root(),
                             tmp1.weight() + tmp2.weight());
    Hheap.insert(tmp3);   // Return new tree to heap
  }
  return tmp3;            // Return the tree
}
/* *** ODSAendTag: HuffmanTreeBuild *** */
