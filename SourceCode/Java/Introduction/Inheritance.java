/* *** ODSATag: Inheritance *** */
class Test {
  public static void main (String[] args) {
    Test test1 = new Test();
    Test test2 = new Test();

    if (!test1.equals(test2)) {
      System.out.println ("'test1' does not equal 'test2'.");
    }
    if (!test1 instanceof Object) {
      System.out.println ("'test1' is an Object.");
    }
  }
}
/* *** ODSAendTag: Inheritance *** */
