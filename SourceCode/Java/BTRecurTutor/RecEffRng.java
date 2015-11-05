int range(BSTNode root , int min , int max) {
  if (root == null)
    return 0;
  int result = 0;
  if ((min <= (Integer)root.element()) && (max >= (Integer)root.element()))
    result = result + 1;
  if (min <= (Integer)root.element())
    result += range(root.left(), min, max); 
  if (max > (Integer)root.element())
    result += range(root.right(), min, max);
  return result;
}
