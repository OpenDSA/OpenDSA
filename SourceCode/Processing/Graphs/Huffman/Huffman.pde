/* *** ODSATag: HuffmanNode *** */
/** Huffman tree node implementation: Base class */
public interface HuffBaseNode {
  public boolean isLeaf(); 
  public int weight();
}


/** Huffman tree node: Leaf class */
class HuffLeafNode implements HuffBaseNode {
  private E element;         // Element for this node
  private int weight;        // Weight for this node

  /** Constructor */
  public HuffLeafNode(E el, int wt)
    { element = el; weight = wt; }

  /** @return The element value */
  public E element() { return element; }

  /** @return The weight */
  public int weight() { return weight; }

  /** Return true */
  public boolean isLeaf() { return true; }
}


/** Huffman tree node: Internal class */
class HuffInternalNode implements HuffBaseNode {
  private int weight;            
  private HuffBaseNode left;  
  private HuffBaseNode right; 

  /** Constructor */
  public HuffInternalNode(HuffBaseNode l,
                          HuffBaseNode r, int wt)
    { left = l; right = r; weight = wt; }

  /** @return The left child */
  public HuffBaseNode left() { return left; }

  /** @return The right child */
  public HuffBaseNode right() { return right; }

  /** @return The weight */
  public int weight() { return weight; }

  /** Return false */
  public boolean isLeaf() { return false; }
}
/* *** ODSAendTag: HuffmanNode *** */

/* *** ODSATag: HuffmanTree *** */
/** A Huffman coding tree */
class HuffTree implements Comparable>{
  private HuffBaseNode root;  

  /** Constructors */
  public HuffTree(E el, int wt)
    { root = new HuffLeafNode(el, wt); }
  public HuffTree(HuffBaseNode l,
                  HuffBaseNode r, int wt)
    { root = new HuffInternalNode(l, r, wt); }

  public HuffBaseNode root() { return root; }
  public int weight() // Weight of tree is weight of root
    { return root.weight(); }
  public int compareTo(HuffTree that) {
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
