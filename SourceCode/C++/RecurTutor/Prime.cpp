boolean prime(int x, int y) {
  if (x == 1)
    return true;
  else if (x % y == 0)
    return false;	
  else
    return prime(x, y-1);
}
