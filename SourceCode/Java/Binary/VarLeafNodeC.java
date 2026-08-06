/** Leaf node: Composite */
public class VarLeafNode implements VarBinNode {
  private String operand;                 // Operand value

  VarLeafNode(String val) { operand = val; }
  public boolean isLeaf() { return true; }
  public String value() { return operand; }

  public void traverse() {
    Visit.VisitLeafNode(operand);
  }
}
