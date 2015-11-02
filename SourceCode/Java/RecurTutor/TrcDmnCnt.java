NumOfDig(n){ 
  if(0≤n≤9) 
    result = 1
  else{
    result = NumOfDig(floor(n / 10)) + 1  //where n≥10.  
  }
} 
