 int range(BSTNode root , int min , int max) {
    if(root == null)
       return 0;
    int result = 0;
    if ((min <= (Integer)root.element()) && (max >= (Integer)root.element()))
      result = result + 1;
    result += range(root.left(), min, max); 
    result += range(root.right(), min, max);
    return result;
}
