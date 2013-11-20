// General Tree implementation for UNION/FIND
class ParPtrTree {
  private int[] array;     // Node array

  ParPtrTree(int size) {
    array = new int[size]; // Create node array
    for (int i=0; i<size; i++)
      array[i] = -1;       // Each node is its own root
  }

  // Merge two subtrees if they are different
  void UNION(int a, int b) {
    Integer root1 = FIND(a);     // Find root of node a
    Integer root2 = FIND(b);     // Find root of node b
    if (root1 != root2)          // Merge with weighted union
      array[root1] = root2;
  }

  // Return the root of curr's tree
  Integer FIND(Integer curr) {
    if (array[curr] == -1) return curr; // At root
    while (array[curr] != -1) curr = array[curr];
    return curr;
  }

  String print() {
    String out = "";
    for (int i=0; i<array.length; i++)
      out = out + array[i] + " ";
    return out;
  }
}
