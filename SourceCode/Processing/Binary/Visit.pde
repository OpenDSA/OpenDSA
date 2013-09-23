static class Visit {
  static private StringBuffer out;

  static void VisitInit() {
    out = new StringBuffer(100);
  }

  static String VisitOut() {
    return out.toString();
  }

  static void VisitInternalNode(Character val) {
    out.append(val + " ");
  }

  static void VisitLeafNode(String val) {
    out.append(val + " ");
  }
}
