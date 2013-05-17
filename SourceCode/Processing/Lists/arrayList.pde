/* *** ODSATag: arrayList *** */
public  void  insert(E  it)  {
	for  (int  i=listSize;  i>0;  i--)  
		listArray[i]  =  listArray[i-1]; 
	listArray[0]  =  it;
	listSize++;
}
/* *** ODSAendTag: arrayList *** */