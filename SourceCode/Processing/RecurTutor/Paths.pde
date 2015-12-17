int paths(int n) {
  if (n == 1)
    return 1;
  if (n == 2)
    return 2;
  if (n == 3)
    return 4;
  return paths(n - 1) + paths(n - 2) + paths(n - 3);
}
