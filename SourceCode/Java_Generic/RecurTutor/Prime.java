boolean Prime(int X, int Y) {
  if (Y == 1)
    return true;
  else if (X % Y == 0)
    return false;	
  else
    return Prime(X, Y-1);
}
