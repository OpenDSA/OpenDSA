
  Boolean checkorder(T[] A) {
    for (int i=1; i<A.length; i++)
      if (A[i].compareTo(A[i-1]) < 0) {
        System.out.println("Error! Value " + A[i] + " at position " + i +
                " was less than " + A[i-1] + " at position " + (i-1));
        return false;
      }
    return true;
  }
