// General Tree class implementation for UNION/FIND
class ParPtrTree {
  private int[] array;      // Node array
  private int[] weights;

  ParPtrTree(int size) {
    array = new int[size];   // Create node array
    weights = new int[size]; // Create node array
    for (int i=0; i<size; i++) {
      array[i] = -1;
      weights[i] = 1;
    }
  }

  // Determine if nodes are in different trees
  boolean differ(int a, int b) {
    int root1 = FIND(a);     // Find root of node a
    int root2 = FIND(b);     // Find root of node b
    return root1 != root2;       // Compare roots
  }

  // Merge two subtrees with weighted union
  /* *** ODSATag: UnionFind *** */
  void UNION(int a, int b) {
    int root1 = FIND(a);     // Find root of node a
    int root2 = FIND(b);     // Find root of node b
    if (root1 != root2)          // Merge with weighted union
      if (weights[root2] > weights[root1]) {
        array[root1] = root2;
        weights[root2] += weights[root1];
      } else {
        array[root2] = root1;
        weights[root1] += weights[root2];
      }
  }
  /* *** ODSAendTag: UnionFind *** */

  /* *** ODSATag: PathCompress *** */
  // Return the root of curr's tree with path compression
  int FIND(int curr) {
    if (array[curr] == -1) return curr; // At root
    array[curr] = FIND(array[curr]);
    return array[curr];
  }
  /* *** ODSAendTag: PathCompress *** */

  String print() {
    String out = "";
    for (int i=0; i<array.length; i++)
      out = out + array[i] + " ";
    return out;
  }
}

