import java.io.*;

/* *** ODSATag: HuffmanNode *** */
/** Huffman tree node implementation: Base class */
interface HuffBaseNode {
  public boolean isLeaf(); 
  public int weight();
}


/** Huffman tree node: Leaf class */
class HuffLeafNode implements HuffBaseNode {
  private char element;      // Element for this node
  private int weight;        // Weight for this node

  /** Constructor */
  HuffLeafNode(char el, int wt)
    { element = el; weight = wt; }

  /** @return The element value */
  public char value() { return element; }

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
  HuffInternalNode(HuffBaseNode l,
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
class HuffTree implements Comparable<HuffTree> {
  private HuffBaseNode root;  

  /** Constructors */
  HuffTree(char el, int wt)
    { root = new HuffLeafNode(el, wt); }
  HuffTree(HuffBaseNode l, HuffBaseNode r, int wt)
    { root = new HuffInternalNode(l, r, wt); }

  public HuffBaseNode root() { return root; }
  public int weight() // Weight of tree is weight of root
    { return root.weight(); }
  public int compareTo(HuffTree t) {
    if (root.weight() < t.weight()) { return -1; }
    else if (root.weight() == t.weight()) { return 0; }
    else { return 1; }
  }
}
/* *** ODSAendTag: HuffmanTree *** */

class Huffman {
/* *** ODSATag: HuffmanTreeBuild *** */
public static HuffTree buildTree(MinHeap<HuffTree> hheap) {
  HuffTree tmp1, tmp2, tmp3 = null;

  while (hheap.heapSize() > 1) { // While two items left
    tmp1 = hheap.removemin();
    tmp2 = hheap.removemin();
    tmp3 = new HuffTree(tmp1.root(), tmp2.root(),
                        tmp1.weight() + tmp2.weight());
    hheap.insert(tmp3);   // Return new tree to heap
  }
  return tmp3;            // Return the tree
}
/* *** ODSAendTag: HuffmanTreeBuild *** */

    public static void main(String args[]) throws IOException {
        System.out.println("We declare success (even though we can't build this heap)");
    }
}
