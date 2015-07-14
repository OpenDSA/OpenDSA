int modelnoOfPath (int n)
{
  if (n==1)
    return 1;
  if (n==2)
    return 2;
  if (n==3)
    return 4;
    	
  return modelnoOfPath(n-1) + modelnoOfPath(n-2) + modelnoOfPath(n-3);
		
}
