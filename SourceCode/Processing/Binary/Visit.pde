public class Visit {
  static private StringBuffer out;

  public static void VisitInit() {
    out = new StringBuffer(100);
  }

  public static String VisitOut() {
    return out.toString();
  }

  public static void VisitInternalNode(Character val) {
    out.append(val + " ");
  }

  public static void VisitLeafNode(String val) {
    out.append(val + " ");
  }
}
