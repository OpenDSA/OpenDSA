PrintOneToN(n){
  if(n==1)  
    print 1 
  else{
    PrintOneToN(n-1) //to print integers from 1 to n-1
    print n //where 1<n≤N
  }
}
