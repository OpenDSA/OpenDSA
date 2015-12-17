Domino(n){
  If(n == 1) 
    //manually tip the domino over.
  else{
    Domino(n-1) //to tip the first (n-1) dominos over
    //the nth domino will be tipped over subsequently //where 1 < n <= N 
  }
}
