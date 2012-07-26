/* *** ODSATag: HuffmanNode *** */
public interface HuffBaseNode {
  public boolean isLeaf(); 
  public int weight();
}

class HuffLeafNode implements HuffBaseNode {
  private E element;         
  private int weight;        

  public HuffLeafNode(E el, int wt)
    { element = el; weight = wt; }

  public E element() { return element; }

  public int weight() { return weight; }

  public boolean isLeaf() { return true; }
}

class HuffInternalNode implements HuffBaseNode {
  private int weight;            
  private HuffBaseNode left;  
  private HuffBaseNode right; 

  public HuffInternalNode(HuffBaseNode l,
                          HuffBaseNode r, int wt)
    { left = l; right = r; weight = wt; }

  public HuffBaseNode left() { return left; }

  public HuffBaseNode right() { return right; }

  public int weight() { return weight; }

  public boolean isLeaf() { return false; }
}
/* *** ODSAendTag: HuffmanNode *** */

/* *** ODSATag: HuffmanTree *** */
class HuffTree implements Comparable>{
  private HuffBaseNode root;  

  public HuffTree(E el, int wt)
    { root = new HuffLeafNode(el, wt); }
  public HuffTree(HuffBaseNode l,
                  HuffBaseNode r, int wt)
    { root = new HuffInternalNode(l, r, wt); }

  public HuffBaseNode root() { return root; }
  public int weight() { return root.weight(); }
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
