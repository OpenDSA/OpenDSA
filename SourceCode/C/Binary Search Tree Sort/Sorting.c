/*In this project,we have worked on four main sorting algorithms which are Insertion Sort,Merge Sort,Quick Sory(By using pivot)and Tree Sort.These algorithms
are used with linked list inputs with different ways.We performed our algorithms by selecting our inputs as much as larger linked lists.
Also we dealed with three maincases to show how our inputs behave according to written algorithm.To observe average case we have used linked lists with random 
input sizes.For Best Case,we gave sorted linked lists as an input to our algorithm and for Worst Case our inputs were sorted linked lists in descending order.
To sum up,we calculated execution time for each case in each algorithm type.
*/

#include <stdio.h>
#include <stdlib.h>
#include<math.h>
#include<time.h>

//Create a struct node
struct node{
   int data;
   struct node* next;
};
//Create another struct type for tree sort
struct tree
{
    int data;
    struct tree* left;
    struct tree* right;
};
//Open a space for our linked list by using malloc.
struct node* new_node(int val){
    struct node* place = (struct node*)malloc(sizeof(struct node));
    place -> data = val;
    place -> next = NULL;
  
  return place;
}

//Push elements of linked list
struct node* push(struct node* begin, int new_value){
   struct node* place = new_node(new_value);
   place -> next = begin;
   return place;
 
}
//Pop elements of linked list
void pop(struct node* begin, int new_value){
    struct node* place = begin;
    struct node* new_end = new_node(new_value);
    while(place->next != NULL) {
        place = place -> next;
    }
    place -> next = new_end;
}
//Generate random values
int rand_number(int down, int up) {
    return (rand()%(up-down))+down;
}
//Generate random values according to upper and lower bound and push them to linked list.
struct node* generate_random(int count, int down_bound, int up_bound) {
    int i;
    struct node* start = new_node(rand_number(down_bound,up_bound));
    for(i=1;i<count;i++) {
        start = push(start, rand_number(down_bound,up_bound));
    }
    return start;
}

//Quick Sort Algorithm
struct node *getTail(struct node *current)
{
    while (current != NULL && current->next != NULL)
        current = current->next;
    return current;
}
 
//Partitions the list and taking the last element as a pivot
struct node *partition(struct node *head, struct node *end,struct node **newHead, struct node **newEnd)
{
	long int comparison=0;
    struct node *pivot = end;
    struct node *prev = NULL, *current = head, *tail = pivot;
 
    // During partition,both the head and end of the list might change which is updated in the newHead and newEnd variables
    while (current != pivot)
    {
        if (current->data < pivot->data)
        {
             comparison=comparison+2;
			// First node that has a value less than the pivot and becomes the new head
            if ((*newHead) == NULL)
                (*newHead) = current;
 
            prev = current;  
            current= current->next;
        }
        else 
        {
            
            if (prev)
            prev->next = current->next;
            struct node *temp = current->next;
            current->next = NULL;
            tail->next = current;
            tail = current;
            current = temp;
        }
    }
 
    // If the pivot data is the smallest element in the current list,pivot becomes the head
    if ((*newHead) == NULL)
        (*newHead) = pivot;
 
    
    (*newEnd) = tail;
 
   
    return pivot;
}
 
 
//Quicksort struct
struct node *quickSortRecur(struct node *head, struct node *end)
{
    
    if (!head || head == end)
        return head;
 
    struct node *newHead = NULL, *newEnd = NULL;
 
    // Partition the list,newHead and newEnd will be updated by the partition function
    struct node *pivot = partition(head, end, &newHead, &newEnd);
 
    // If pivot is the smallest element
    if (newHead != pivot)
    {
        //Set the node before the pivot node as NULL
        struct node *temp = newHead;
        while (temp->next != pivot)
            temp = temp->next;
        temp->next = NULL;
 
        //Recurrence for the list before pivot
        newHead = quickSortRecur(newHead, temp);
 
        // Change next of last node of the left half to pivot
        temp = getTail(newHead);
        temp->next =  pivot;
    }
 
    //Recurrence for the list after the pivot element
    pivot->next = quickSortRecur(pivot->next, newEnd);
 
    return newHead;
}
 
//The main function for quicksort.
void quickSort(struct node **headPtr)
{
    (*headPtr) = quickSortRecur(*headPtr, getTail(*headPtr));
    return;
}

//MergeSort
struct node* SortedMerge(struct node* a, struct node* b);
void FrontBackSplit(struct node* source,struct node** front, struct node** back);

//Sorts the linked list by changing next pointers
void MergeSort(struct node** headPtr)
{
  struct node* head = *headPtr;
  struct node* a;
  struct node* b;
 
  
  if ((head == NULL) || (head->next == NULL))
  {
    return;
  }
 
  // Split head into 'a' and 'b' sublists
  FrontBackSplit(head, &a, &b); 
 
  //Recursively sort the sublists
  MergeSort(&a);
  MergeSort(&b);
 
  
  *headPtr = SortedMerge(a, b);
}
 
//MergeSort struct type
struct node* SortedMerge(struct node* a, struct node* b)
{
  long int comparison=0;
  struct node* result = NULL;
 
  
  if (a == NULL)
     return(b);
  else if (b==NULL)
     return(a);
 
  
  if (a->data <= b->data)
  {
  	 comparison=comparison+2;
     result = a;
     result->next = SortedMerge(a->next, b);
  }
  else
  {
     result = b;
     result->next = SortedMerge(a, b->next);
  }
  return(result);
}
 

//Split the nodes of the given list into front and back halves, and return the two lists using the reference parameters.
//If the length is odd, the extra node should go in the front list.

void FrontBackSplit(struct node* source,struct node** front, struct node** back)
{
  struct node* first;
  struct node* second;
  if (source==NULL || source->next==NULL)
  {
    //If length < 2 
    *front = source;
    *back = NULL;
  }
  else
  {
    second = source;
    first = source->next;
 
   
    while (first != NULL)
    {
      first = first->next;
      if (first != NULL)
      {
        second = second->next;
        first = first->next;
      }
    }
 
    // Second is before the midpoint in the list,so split it in two at that point
    *front = source;
    *back = second->next;
    second->next = NULL;
  }
}
//Insert struct type
struct node* insert(struct node* begin, struct node* position, struct node* new_node){
   //Check if we add to the beginning
   if(begin == position) {
       new_node -> next = begin;
       return new_node;
   }
   
   struct node* place = begin;
   while(place -> next != position) {
       place = place -> next;
   }
   
   new_node -> next = place -> next;
   place -> next = new_node;
   
   return begin;
 
}
//InsertionSort
struct node* insertion_sort(struct node* begin)
{
   long int comparison=0;
   struct node* sorted = begin;
   struct node* list = begin; 
   struct node* place;
   struct node* place1;
   
   while(list -> next != NULL) {
       
       place = sorted;
	   while( list ->next  != NULL && place != list -> next && place -> data < list->next->data)
	    
	    comparison=comparison+2;
        place = place -> next;
       
       if(list -> next != place) { 
           
           //Connect element before with element which comes after
           place1 = list -> next;
           list -> next = list -> next -> next;
           sorted = insert(sorted,place, place1);
            
       }else{
        
        list = list -> next;
       }

   }
   

   return sorted;
}
//Reverse struct type to sort linked list in descending order
struct node* reverse(struct node* root) {
  struct node* new_root = 0;
  while (root) {
    struct node* next = root->next;
    root->next = new_root;
    new_root = root;
    root = next;
  }
  return new_root;
}
//Tree sort 
struct tree* treeSort(struct tree** sorted,struct node* header){ 
     
	long int comparison=0;
	//If list is null
	if((*sorted)==NULL){
		(*sorted)=malloc(sizeof(struct tree));	
		(*sorted)->data=header->data;
		(*sorted)->left=NULL;
		(*sorted)->right=NULL;

	}
	//Insert elements of linked list to tree
	while(header!=NULL){
		struct node *temp=malloc(sizeof(struct node));
		temp->data=header->data;
		temp->next=NULL;
	   
		if((*sorted)->data > temp->data){
			comparison+=comparison;
			treeSort(&((*sorted)->left),temp);
		}
		if((*sorted)->data < temp->data){
			comparison+=comparison;
			treeSort(&((*sorted)->right),temp);
		}
		 header=header->next;
	}
	
}
//Print Function to print both sorted and unsorted linked lists
void print(struct node* begin){
   struct node * help = begin;
   while(help != NULL)
   {
      printf("%d ",help->data);
      help = help->next;
   }
}

int main( )
{
	//Defining variables by using time library of c.
	clock_t t1, t2,t3;
    srand(time(NULL));
	
	//To calculate execution time for each sort type,we have defined variables in float type.
    long long int AVGBaseOp1=0,AVGBaseOp2=0,AVGBaseOp3=0,AVGBaseOp4=0;
	float AVGTime1=0,AVGTime2=0,AVGTime3=0,AVGTime4=0,AVGTime5=0,AVGTime6=0,AVGTime7=0,Result1=0,Result2=0,Result3=0,Result4=0,Result5=0,Result6=0,Result7=0,Result8=0;
	float diff=0;
	
	
	int i;
	int k;
	
	printf("Press 1 For Insertion Sort:\nPress 2 For Merge Sort:\nPress 3 For Quick Sort:\nPress 4 For Tree Sort:\n");
	scanf("%d",&k);
	
	//We have tried our sort algorithms by using random number input size that is already defined below.
	struct node* input1 = generate_random(1000,0,10);   /// 1000 INPUT
	struct node* input2 = generate_random(5000,0,10);   /// 5000 INPUT
	struct node* input3 = generate_random(10000,0,10);   /// 10000 INPUT
	struct node* input4 = generate_random(25000,0,10);   /// 25000 INPUT
	struct node* input5 = generate_random(50000,0,10);   /// 50000 INPUT
	struct node* input6 = generate_random(100000,0,10);   /// 100000 INPUT
	struct node* input7 = generate_random(250000,0,10);   /// 250000 INPUT
	struct node* input8 = generate_random(500000,0,10);   /// 500000 INPUT
	
	
  	struct node *zoznam1,*zoznam2,*zoznam3,*zoznam4,*zoznam5,*zoznam6;
  	
   	struct tree *zoznam7=NULL;
 
    struct tree *header=input1;
   
   //Switch case to show our sorting algorithms
	switch(k){
	//Insertion Sort
  	case 1:  
	  //Average Case
	  	for(i=0;i<30;i++){
  		t1 = clock();//Take time value before algorithm runs
  	    zoznam2 =insertion_sort(input2);//We have changed parameter of insertion sort according to given input values above
  		t2 = clock();//Take time value after algorithm runs
  		
		//Calculate difference btw t2 and t1.
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime4+=diff;
  		}
  		Result1 = AVGTime1 /30 ;
  		AVGTime1,diff=0;
  		printf("\t");
  		printf("Execution Time of Insertion Sort in Average Case= %lf",Result1);
  		
  		printf("\n");
  
	  //Best Case
	  	for(i=0;i<30;i++){
  		
		t1 = clock();//Take time value before algorithm runs
  	    zoznam3=insertion_sort(zoznam2);//We have changed parameter of insertion sort according to given input values above
  		t2 = clock();//Take time value after algorithm runs
  		
		//Calculate difference btw t2 and t1.
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime2+=diff;
  		}
  		Result2 = AVGTime2 /30 ;
  		AVGTime2,diff=0;
  		printf("\t");
  		printf("Execution Time of Insertion Sort in Best Case= %lf",Result2);
		
	 
	  	printf("\n");
	  //Worst Case
	    zoznam3=reverse(zoznam2);
	  	for(i=0;i<30;i++){
  		
		t1 = clock();//Take time value before algorithm runs
  	    zoznam4=insertion_sort(zoznam3);//We have changed parameter of insertion sort according to given input values above
  		t2 = clock();//Take time value after algorithm runs
  		
		//Calculate difference btw t2 and t1.
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime3+=diff;
  		}
  		Result3 = AVGTime3 /30 ;
  		AVGTime3,diff=0;
  		printf("\t");
  		printf("Execution Time of Insertion Sort in Worst Case= %lf",Result3);
	  
	break;
	//Mergesort
   case 2: 
   	  //Average Case
    	for(i=0;i<30;i++){
  		t1 = clock();
  		MergeSort(&input1);
  		t2 = clock();
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime4+=diff;
  		}
  		Result4 = AVGTime4 /30 ;
  		AVGTime4,diff=0;
  		printf("\t");
  		printf("Execution Time of MergeSort in Average Case= %lf",Result4);
      
		printf("\n");
	  
	  //Best Case
		for(i=0;i<30;i++){
		
		zoznam1=treeSort(&zoznam2,header);
  		t1 = clock();
  		MergeSort(&zoznam1);
  		t2 = clock();
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime5+=diff;
  		}
  		Result5 = AVGTime5 /30 ;
  		AVGTime5,diff=0;
  		printf("\t");
  		printf("Execution Time of MergeSort in Best Case Case= %lf",Result5);
      	
      	printf("\n");
      	
	  //Worst Case
	  
	  	for(i=0;i<30;i++){
	  	
	  	header=reverse(header);
  		t1 = clock();
  		MergeSort(&header);
  		t2 = clock();
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime6+=diff;
  		}
  		Result6 = AVGTime6 /30 ;
  		AVGTime6,diff=0;
  		printf("\t");
  		printf("Execution Time of MergeSort in Worst Case Case= %lf",Result6);
      	
 

  		break;
  	//Quicksort
   case 3:
   	 //Average Case
   		for(i=0;i<30;i++){
   		t1 = clock();
  		quickSort(&input1);
  		t2 = clock();
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime1+=diff;
  		}
  		Result1 = AVGTime1 /30 ;
  		AVGTime1,diff=0;
  		printf("\t");
  		printf("Execution Time of QuickSort in Average Case = %lf",Result1);
  		
  		printf("\n");
  	  //Best Case
  	  
		for(i=0;i<30;i++){
   		zoznam1=treeSort(&zoznam2,header);	
  		t1 = clock();
  		quickSort(&zoznam1);
  		t2 = clock();
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime2+=diff;
  		}
  		Result2 = AVGTime2 /30 ;
  		AVGTime2,diff=0;
  		printf("\t");
  		printf("Execution Time of QuickSort in Best Case = %lf",Result2);	
  		
  		printf("\n");
  		
  	  //Worst Case
  	  
  	    for(i=0;i<30;i++){
   		header=reverse(header);	
  		t1 = clock();
  		quickSort(&header);	
  		t2 = clock();
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime3+=diff;
  		}
  		Result3 = AVGTime3/30 ;
  		AVGTime3,diff=0;
  		printf("\t");
  		printf("Execution Time of QuickSort in Worst Case = %lf",Result3);	
  	  
  		break;
    
    //Treesort
    case 4:
    	//Average Case
    	for(i=0;i<30;i++){
  		t1=clock();
  		treeSort(&zoznam7,header);
  		t2 =clock();
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime1+=diff;
  		}
  		Result1 = AVGTime1 /30 ;
  		AVGTime1,diff=0;
 		printf("\t");
  		printf("Execuiton Time of Tree Sort in Average Case = %lf",Result1);
    	
    	printf("\n");
    	//Best Case
    	for(i=0;i<30;i++){
    	zoznam2=treeSort(&zoznam7,header);
  		t1 =clock();
  		treeSort(&zoznam7,zoznam2);
  		t2 =clock();
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime2+=diff;
  		}
  		Result2 = AVGTime2 /30 ;
  		AVGTime2,diff=0;
 		printf("\t");
  		printf("Execuiton Time of Tree Sort in Best Case = %lf",Result2);
    	
    	printf("\n");
    	
		//Worst Case
    	for(i=0;i<30;i++){
    	
    	header=reverse(header);
  		t1=clock();
  		treeSort(&zoznam7,zoznam2);
  		t2 =clock();
  	  	diff = (((float)t2 - (float)t1) / 1000000.0F ) * 1000;
  	  	AVGTime3+=diff;
  		}
  		Result3 = AVGTime3 /30 ;
  		AVGTime3,diff=0;
 		printf("\t");
  		printf("Execuiton Time of Tree Sort in Worst Case = %lf",Result3);
    	
    	
    	break;
    	
  	default:
  	
  	break;
}
}
