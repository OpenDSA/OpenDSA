# Java version of Makefile
JAVA= java
CFLAGS= -Xlint
RFLAGS= 

all: Lists Binary Sorting Searching Graphs

build:
	@mkdir build

clean:
	-rm -rf build
	mkdir build

Lists: ListTest DoubleTest FreeList StackTest QueueTest

ListTest: build build/ListTest/success

build/ListTest/success: Lists/ListTest.java Lists/List.java Lists/AList.java Lists/LList.java Lists/Link.java Utils/ErrorRec.java
	@echo "Array-based and Linked List Test"
	-@rm -rf build/ListTest
	@mkdir build/ListTest
	cp Lists/ListTest.java build/ListTest
	cp Lists/List.java build/ListTest
	cp Lists/AList.java build/ListTest
	cp Lists/LList.java build/ListTest
	cp Lists/Link.java build/ListTest
	cp Utils/ErrorRec.java build/ListTest
	cd build/ListTest; \
	javac $(CFLAGS) ListTest.java; \
	$(JAVA) $(RFLAGS) ListTest

DoubleTest: build/DoubleTest/success

build/DoubleTest/success: Lists/ListTest.java Lists/List.java Lists/AList.java Lists/DList.java Lists/DLink.java Utils/ErrorRec.java
	@echo "Doubly Linked List Test"
	-@rm -rf build/DoubleTest
	@mkdir build/DoubleTest
	cp Lists/ListTest.java build/DoubleTest
	cp Lists/List.java build/DoubleTest
	cp Lists/AList.java build/DoubleTest
	cp Lists/DList.java build/DoubleTest/LList.java
	cp Lists/DLink.java build/DoubleTest/Link.java
	cp Utils/ErrorRec.java build/DoubleTest
	cd build/DoubleTest; \
	javac $(CFLAGS) ListTest.java; \
	$(JAVA) $(RFLAGS) ListTest

FreeList: build/FreeList/success

build/FreeList/success: Lists/List.java Lists/AList.java Lists/Freelink.java Lists/Freelist.java Lists/ListTest.java Utils/ErrorRec.java
	@echo "Freelist Test"
	-@rm -rf build/FreeList
	@mkdir build/FreeList
	@cp Lists/List.java build/FreeList
	@cp Lists/AList.java build/FreeList
	@cp Lists/Freelist.java build/FreeList/LList.java
	@cp Lists/Freelink.java build/FreeList/Link.java
	@cp Lists/ListTest.java build/FreeList
	@cp Utils/ErrorRec.java build/FreeList
	cd build/FreeList; \
	javac $(CFLAGS) ListTest.java; \
	$(JAVA) $(RFLAGS) ListTest

StackTest: build/StackTest/success

build/StackTest/success: Lists/Stack.java Lists/AStack.java Lists/Link.java Lists/LStack.java Lists/StackTest.java Utils/ErrorRec.java
	@echo "Array-based and Linked Stack Test"
	-@rm -rf build/StackTest
	@mkdir build/StackTest
	@cp Lists/Stack.java build/StackTest
	@cp Lists/AStack.java build/StackTest
	@cp Lists/LStack.java build/StackTest
	@cp Lists/Link.java build/StackTest
	@cp Utils/ErrorRec.java build/StackTest
	@cp Lists/StackTest.java build/StackTest
	cd build/StackTest; \
	javac $(CFLAGS) StackTest.java; \
	$(JAVA) $(RFLAGS) StackTest

QueueTest: build/QueueTest/success

build/QueueTest/success: Lists/Queue.java Lists/AQueue.java Lists/Link.java Lists/LQueue.java Lists/QueueTest.java Utils/ErrorRec.java
	@echo "Array-based and Linked Queue Test"
	-@rm -rf build/QueueTest
	@mkdir build/QueueTest
	@cp Lists/Queue.java build/QueueTest
	@cp Lists/AQueue.java build/QueueTest
	@cp Lists/LQueue.java build/QueueTest
	@cp Lists/Link.java build/QueueTest
	@cp Utils/ErrorRec.java build/QueueTest
	@cp Lists/QueueTest.java build/QueueTest
	cd build/QueueTest; \
	javac $(CFLAGS) QueueTest.java; \
	$(JAVA) $(RFLAGS) QueueTest


Binary: Traverse BST BSTDict MinHeap MaxHeap Huffman

Traverse: build/Traverse/success

build/Traverse/success: Binary/BinNode.java Binary/BSTNode.java Binary/Traverse1.java Binary/checkBST.java Binary/Preorder.java Binary/Traverse.java Utils/KVPair.java
	@echo "Traversal Test"
	-@rm -rf build/Traverse
	@mkdir build/Traverse
	@cp Binary/BinNode.java build/Traverse
	@cp Binary/BSTNode.java build/Traverse
	@cp Utils/KVPair.java build/Traverse
	@cat Binary/Traverse1.java Binary/checkBST.java Binary/Preorder.java Binary/Traverse.java > build/Traverse/Traverse.java
	cd build/Traverse; \
	javac $(CFLAGS) Traverse.java; \
	$(JAVA) $(RFLAGS) Traverse

BST: build/BSTTest/success

build/BSTTest/success: Binary/BST.java Binary/BSTTest1.java Binary/Preorder.java Binary/BSTTest.java Binary/BSTNode.java Binary/BinNode.java Utils/Permute.java Utils/Swap.java Binary/Traverse.java Utils/KVPair.java Utils/ErrorRec.java
	@echo "BST Test"
	-@rm -rf build/BSTTest
	@mkdir build/BSTTest
	@cp Binary/BST.java build/BSTTest
	@cp Binary/BSTNode.java build/BSTTest
	@cp Binary/BinNode.java build/BSTTest
	@cp Utils/Permute.java build/BSTTest
	@cat Binary/BSTTest1.java Utils/Swap.java Binary/Preorder.java Binary/BSTTest.java > build/BSTTest/BSTTest.java
	@cp Utils/KVPair.java build/BSTTest
	@cp Utils/ErrorRec.java build/BSTTest
	cd build/BSTTest; \
	javac $(CFLAGS) BSTTest.java; \
	$(JAVA) $(RFLAGS) BSTTest

BSTDict: build/BSTDictTest/success

build/BSTDictTest/success: Binary/BST.java Binary/BSTDict.java Binary/BSTDictTest.java Binary/BSTNode.java Binary/BinNode.java Utils/Permute.java Utils/Swap.java Utils/KVPair.java Design/Dictionary.java
	@echo "BST Dictionary Test"
	-@rm -rf build/BSTDictTest
	@mkdir build/BSTDictTest
	@cp Binary/BST.java build/BSTDictTest
	@cp Binary/BSTNode.java build/BSTDictTest
	@cp Binary/BinNode.java build/BSTDictTest
	@cp Design/Dictionary.java build/BSTDictTest
	@cp Utils/Permute.java build/BSTDictTest
	@cp Utils/Swap.java build/BSTDictTest
	@cp Binary/BSTDictTest.java build/BSTDictTest
	@cp Binary/BSTDict.java build/BSTDictTest
	@cp Utils/KVPair.java build/BSTDictTest
	cd build/BSTDictTest; \
	javac $(CFLAGS) BSTDictTest.java; \
	$(JAVA) $(RFLAGS) BSTDictTest

MinHeap: build/MinheapTest/success

build/MinheapTest/success: Binary/MinHeap.java Binary/MinheapTest.java Utils/Permute.java
	@echo "Minheap Test"
	-@rm -rf build/MinheapTest
	@mkdir build/MinheapTest
	@cp Binary/MinHeap.java build/MinheapTest
	@cp Utils/Permute.java build/MinheapTest
	@cp Binary/MinheapTest.java build/MinheapTest
	cd build/MinheapTest; \
	javac $(CFLAGS) MinheapTest.java; \
	$(JAVA) $(RFLAGS) MinheapTest

MaxHeap: build/MaxheapTest/success

build/MaxheapTest/success: Binary/MaxHeap.java Binary/MaxheapTest.java Utils/Permute.java
	@echo "Maxheap Test"
	-@rm -rf build/MaxheapTest
	@mkdir build/MaxheapTest
	@cp Binary/MaxHeap.java build/MaxheapTest
	@cp Utils/Permute.java build/MaxheapTest
	@cp Binary/MaxheapTest.java build/MaxheapTest
	cd build/MaxheapTest; \
	javac $(CFLAGS) MaxheapTest.java; \
	$(JAVA) $(RFLAGS) -ea MaxheapTest

Huffman: build/Huffman/success

build/Huffman/success: Binary/Huffman.java
	@echo "Huffman Test"
	-@rm -rf build/Huffman
	@mkdir build/Huffman
	@cp Binary/Huffman.java build/Huffman
	@cp Binary/MinHeap.java build/Huffman
	cd build/Huffman; \
	javac $(CFLAGS) Huffman.java; \
	$(JAVA) $(RFLAGS) Huffman


Sorting: Inssort Bubblesort Selsort Shellsort Mergesort Quicksort Heapsort

Inssort: build/InssortTest/success

build/InssortTest/success: Sorting/Sort.java Sorting/Insertionsort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Utils/KVPair.java
	@echo "Insertionsort Test"
	-@rm -rf build/InssortTest
	@mkdir build/InssortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Insertionsort.java Sorting/SortTest.2 > build/InssortTest/SortTest.java
	cp Sorting/Sort.java build/InssortTest
	cp Utils/KVPair.java build/InssortTest
	cd build/InssortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Bubblesort: build/BubblesortTest/success

build/BubblesortTest/success: Sorting/Sort.java Sorting/Bubblesort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java
	@echo "Bubblesort Test"
	-@rm -rf build/BubblesortTest
	@mkdir build/BubblesortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Bubblesort.java Sorting/SortTest.2 > build/BubblesortTest/SortTest.java
	cp Sorting/Sort.java build/BubblesortTest
	cp Utils/KVPair.java build/BubblesortTest
	cd build/BubblesortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Selsort: build/SelsortTest/success

build/SelsortTest/success: Sorting/Selectionsort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Utils/KVPair.java
	@echo "Selectionsort Test"
	-@rm -rf build/SelsortTest
	@mkdir build/SelsortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Selectionsort.java Sorting/SortTest.2 > build/SelsortTest/SortTest.java
	cp Sorting/Sort.java build/SelsortTest
	cp Utils/KVPair.java build/SelsortTest
	cd build/SelsortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Shellsort: build/ShellsortTest/success

build/ShellsortTest/success: Sorting/Sort.java Sorting/Shellsort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Utils/KVPair.java
	@echo "Shellsort Test"
	-@rm -rf build/ShellsortTest
	@mkdir build/ShellsortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Shellsort.java Sorting/SortTest.2 > build/ShellsortTest/SortTest.java
	cp Sorting/Sort.java build/ShellsortTest
	cp Utils/KVPair.java build/ShellsortTest
	cd build/ShellsortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Mergesort: build/MergesortTest/success

build/MergesortTest/success: Sorting/Sort.java Sorting/Mergesort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Utils/KVPair.java
	@echo "Mergesort Test"
	-@rm -rf build/MergesortTest
	@mkdir build/MergesortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Mergesort.java Sorting/SortTest.2 > build/MergesortTest/SortTest.java
	cp Sorting/Sort.java build/MergesortTest
	cp Utils/KVPair.java build/MergesortTest
	cd build/MergesortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Quicksort: build/QuicksortTest/success

build/QuicksortTest/success: Sorting/Sort.java Sorting/Quicksort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Utils/KVPair.java
	@echo "Quicksort Test"
	-@rm -rf build/QuicksortTest
	@mkdir build/QuicksortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Quicksort.java Sorting/SortTest.2 > build/QuicksortTest/SortTest.java
	cp Sorting/Sort.java build/QuicksortTest
	cp Utils/KVPair.java build/QuicksortTest
	cd build/QuicksortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Heapsort: build/HeapsortTest/success

build/HeapsortTest/success: Sorting/Sort.java Sorting/Heapsort.java Binary/MaxHeap.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Utils/KVPair.java
	@echo "Heapsort Test"
	-@rm -rf build/HeapsortTest
	@mkdir build/HeapsortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Heapsort.java Sorting/SortTest.2 > build/HeapsortTest/SortTest.java
	cp Sorting/Sort.java build/HeapsortTest
	cp Utils/KVPair.java build/HeapsortTest
	cp Binary/MaxHeap.java build/HeapsortTest
	cd build/HeapsortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

SortTime: InssortTime BubblesortTime SelsortTime ShellsortTime MergesortTime QuicksortTime HeapsortTime

InssortTime: Sorting/Insertionsort.java Sorting/SortTime.1 Utils/Checkorder.java Sorting/SortTime.2 Utils/Swap.java Sorting/TimeSort.java Utils/KVPair.java
	@echo "Inssort Timing Test"
	-@rm -rf build/InssortTime
	@mkdir build/InssortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Insertionsort.java Sorting/SortTime.2 > build/InssortTime/SortTime.java
	cp Sorting/TimeSort.java build/InssortTime
	cp Utils/KVPair.java build/InssortTime
	cd build/InssortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

BubblesortTime: Sorting/Bubblesort.java Sorting/SortTime.1 Utils/Checkorder.java Sorting/SortTime.2 Utils/Swap.java Sorting/TimeSort.java Utils/KVPair.java
	@echo "Bubble Sort Timing Test"
	-@rm -rf build/BubblesortTime
	@mkdir build/BubblesortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Bubblesort.java Sorting/SortTime.2 > build/BubblesortTime/SortTime.java
	cp Sorting/TimeSort.java build/BubblesortTime
	cp Utils/KVPair.java build/BubblesortTime
	cd build/BubblesortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

SelsortTime: Sorting/Selectionsort.java Sorting/SortTime.1 Utils/Checkorder.java Sorting/SortTime.2 Utils/Swap.java Sorting/TimeSort.java Utils/KVPair.java
	@echo "Selection Sort Timing Test"
	-@rm -rf build/SelsortTime
	@mkdir build/SelsortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Selectionsort.java Sorting/SortTime.2 > build/SelsortTime/SortTime.java
	cp Sorting/TimeSort.java build/SelsortTime
	cp Utils/KVPair.java build/SelsortTime
	cd build/SelsortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

ShellsortTime: Sorting/Shellsort.java Sorting/SortTime.1 Utils/Checkorder.java Sorting/SortTime.2 Utils/Swap.java Sorting/TimeSort.java Utils/KVPair.java
	@echo "Shellsort Timing Test"
	-@rm -rf build/ShellsortTime
	@mkdir build/ShellsortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Shellsort.java Sorting/SortTime.2 > build/ShellsortTime/SortTime.java
	cp Sorting/TimeSort.java build/ShellsortTime
	cp Utils/KVPair.java build/ShellsortTime
	cd build/ShellsortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

MergesortTime: Sorting/Mergesort.java Sorting/SortTime.1 Utils/Checkorder.java Sorting/SortTime.2 Utils/Swap.java Sorting/TimeSort.java Utils/KVPair.java
	@echo "Mergesort Timing Test"
	-@rm -rf build/MergesortTime
	@mkdir build/MergesortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Mergesort.java Sorting/SortTime.2 > build/MergesortTime/SortTime.java
	cp Sorting/TimeSort.java build/MergesortTime
	cp Utils/KVPair.java build/MergesortTime
	cd build/MergesortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

QuicksortTime: Sorting/Quicksort.java Sorting/SortTime.1 Utils/Checkorder.java Sorting/SortTime.2 Utils/Swap.java Sorting/TimeSort.java Utils/KVPair.java
	@echo "Quicksort Timing Test"
	-@rm -rf build/QuicksortTime
	@mkdir build/QuicksortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Quicksort.java Sorting/SortTime.2 > build/QuicksortTime/SortTime.java
	cp Sorting/TimeSort.java build/QuicksortTime
	cp Utils/KVPair.java build/QuicksortTime
	cd build/QuicksortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

HeapsortTime: Sorting/Heapsort.java Binary/MaxHeap.java Sorting/SortTime.1 Utils/Checkorder.java Sorting/SortTime.2 Utils/Swap.java Sorting/TimeSort.java Utils/KVPair.java
	@echo "Heapsort Timing Test"
	-@rm -rf build/HeapsortTime
	@mkdir build/HeapsortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Heapsort.java Sorting/SortTime.2 > build/HeapsortTime/SortTime.java
	cp Sorting/TimeSort.java build/HeapsortTime
	cp Binary/MaxHeap.java build/HeapsortTime
	cp Utils/KVPair.java build/HeapsortTime
	cd build/HeapsortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

Searching: Bsearch Sequential

Bsearch: build/Bsearch/success

build/Bsearch/success: Searching/Bsearch.java
	@echo "Binary Search Test"
	-@rm -rf build/Bsearch
	@mkdir build/Bsearch
	cp Searching/Bsearch.java build/Bsearch
	cd build/Bsearch; \
	javac $(CFLAGS) Bsearch.java; \
	$(JAVA) $(RFLAGS) Bsearch

Sequential: build/Sequential/success

build/Sequential/success: Searching/Sequential.java
	@echo "Binary Search Test"
	-@rm -rf build/Sequential
	@mkdir build/Sequential
	cp Searching/Sequential.java build/Sequential
	cd build/Sequential; \
	javac $(CFLAGS) Sequential.java; \
	$(JAVA) $(RFLAGS) Sequential

Randomized: SkipList

SkipList: build/SkipListTest/success

build/SkipListTest/success: Randomized/SkipList.java Randomized/SkipListTest.java Design/Dictionary.java Utils/KVPair.java
	@echo "SkipList Test"
	-@rm -rf build/SkipListTest
	@mkdir build/SkipListTest
	cp Randomized/SkipListTest.java build/SkipListTest
	cp Randomized/SkipList.java build/SkipListTest
	@cp Design/Dictionary.java build/SkipListTest
	@cp Utils/KVPair.java build/SkipListTest
	cd build/SkipListTest; \
	javac $(CFLAGS) SkipListTest.java; \
	$(JAVA) $(RFLAGS) SkipListTest

Graphs: GraphDummy GraphTrav GraphTop GraphDijk Floyd MCST

GraphDummy: build/GraphDummy/success

build/GraphDummy/success: Graphs/GraphDummy.java Graphs/Graph.java Graphs/GraphM.java Graphs/GraphL.java
	@echo "GraphDummy Test"
	-@rm -rf build/GraphDummy
	@mkdir build/GraphDummy
	@cp Graphs/GraphDummy.java build/GraphDummy
	@cp Graphs/Graph.java build/GraphDummy
	@cp Graphs/GraphM.java build/GraphDummy
	@cp Graphs/GraphL.java build/GraphDummy
	cd build/GraphDummy; \
	javac $(CFLAGS) GraphDummy.java; \
	$(JAVA) $(RFLAGS) GraphDummy

GraphTrav: build/GraphTrav/success

build/GraphTrav/success: Graphs/BFS.java Graphs/DFS.java Graphs/Graph.java Graphs/GraphM.java Graphs/GraphL.java Graphs/GraphTrav.gph Graphs/GraphCreate.java Lists/Queue.java Lists/LQueue.java Lists/Link.java Graphs/GraphTrav.java Graphs/GraphTrav1.java
	@echo "GraphTrav Test"
	-@rm -rf build/GraphTrav
	@mkdir build/GraphTrav
	@cat Graphs/GraphTrav1.java Graphs/GraphCreate.java Graphs/BFS.java Graphs/DFS.java Graphs/GraphTrav.java > build/GraphTrav/GraphTrav.java
	@cp Graphs/GraphTrav.gph build/GraphTrav
	@cp Graphs/Graph.java build/GraphTrav
	@cp Graphs/GraphM.java build/GraphTrav
	@cp Graphs/GraphL.java build/GraphTrav
	@cp Lists/Queue.java build/GraphTrav
	@cp Lists/LQueue.java build/GraphTrav
	@cp Lists/Link.java build/GraphTrav
	cd build/GraphTrav; \
	javac $(CFLAGS) GraphTrav.java; \
	$(JAVA) $(RFLAGS) GraphTrav

GraphTop: build/GraphTop/success

build/GraphTop/success: Graphs/TopsortBFS.java Graphs/TopsortDFS.java Graphs/Graph.java Graphs/GraphM.java Graphs/GraphL.java Graphs/GraphTop.gph Graphs/GraphCreate.java Lists/Queue.java Lists/LQueue.java Lists/Link.java Graphs/GraphTop.java Graphs/GraphTop1.java
	@echo "GraphTop Test"
	-@rm -rf build/GraphTop
	@mkdir build/GraphTop
	@cat Graphs/GraphTop1.java Graphs/GraphCreate.java Graphs/TopsortBFS.java Graphs/TopsortDFS.java Graphs/GraphTop.java > build/GraphTop/GraphTop.java
	@cp Graphs/GraphTop.gph build/GraphTop
	@cp Graphs/Graph.java build/GraphTop
	@cp Graphs/GraphM.java build/GraphTop
	@cp Graphs/GraphL.java build/GraphTop
	@cp Lists/Queue.java build/GraphTop
	@cp Lists/LQueue.java build/GraphTop
	@cp Lists/Link.java build/GraphTop
	cd build/GraphTop; \
	javac $(CFLAGS) GraphTop.java; \
	$(JAVA) $(RFLAGS) GraphTop

GraphDijk: build/GraphDijk/success

build/GraphDijk/success: Graphs/Dijkstra.java Graphs/DijkstraPQ.java Graphs/Graph.java Graphs/GraphM.java Graphs/GraphL.java Graphs/GraphDijk.gph Graphs/GraphCreate.java Lists/Queue.java Lists/LQueue.java Lists/Link.java Graphs/GraphDijk.java Graphs/GraphDijk1.java Utils/KVPair.java Binary/MinHeap.java Utils/Swap.java
	@echo "GraphDijk Test"
	-@rm -rf build/GraphDijk
	@mkdir build/GraphDijk
	@cat Graphs/GraphDijk1.java Graphs/GraphCreate.java Graphs/Dijkstra.java Graphs/DijkstraPQ.java Graphs/GraphDijk.java > build/GraphDijk/GraphDijk.java
	@cp Graphs/GraphDijk.gph build/GraphDijk
	@cp Graphs/Graph.java build/GraphDijk
	@cp Graphs/GraphM.java build/GraphDijk
	@cp Graphs/GraphL.java build/GraphDijk
	@cp Lists/Queue.java build/GraphDijk
	@cp Lists/LQueue.java build/GraphDijk
	@cp Lists/Link.java build/GraphDijk
	@cp Utils/KVPair.java build/GraphDijk
	@cp Utils/Swap.java build/GraphDijk
	@cp Binary/MinHeap.java build/GraphDijk
	cd build/GraphDijk; \
	javac $(CFLAGS) GraphDijk.java; \
	$(JAVA) $(RFLAGS) GraphDijk

Floyd: Graphs/Floyde.java
	@echo "TODO: Graphs: Floyd.java"

MCST: GraphMCST.java Kruskal.java Prim.java PrimPQ.java
	@echo "TODO: Graphs: TEST MCST CODE"
