/* *** ODSATag: Huffman *** */
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
/* *** ODSAendTag: Huffman *** */

