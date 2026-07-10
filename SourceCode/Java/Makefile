# Java version of Makefile
JAVA= java
# CFLAGS= -Xlint -Werror
CFLAGS= -Xlint
RFLAGS= 

all: Analysis Demo Misc Lists Design Binary Sorting Searching Randomized BufferPool Memman Indexing General Graphs

build:
	@mkdir build

clean:
	-rm -rf build
	mkdir build

Analysis: Increment

Increment: build/Increment/success

build/Increment/success: Analysis/Increment.java
	@echo "Increment Test"
	-@rm -rf build/Increment
	@mkdir build/Increment
	cp Analysis/Increment.java build/Increment
	cd build/Increment; \
	javac $(CFLAGS) Increment.java; \
	$(JAVA) $(RFLAGS) Increment

Demo: UpDown

UpDown: build/UpDown/success

build/UpDown/success: Demo/UpDown.java
	@echo "UpDown Test"
	-@rm -rf build/UpDown
	@mkdir build/UpDown
	cp Demo/UpDown.java build/UpDown/
	cd build/UpDown; \
	javac $(CFLAGS) UpDown.java; \
	$(JAVA) $(RFLAGS) UpDown

Misc: Largest Anal TOH Fact Fibonnaci MinMax

Largest: build/LargestTest/success

build/LargestTest/success: Misc/LargestTest.java
	@echo "Largest Test"
	-@rm -rf build/LargestTest
	@mkdir build/LargestTest
	cp Misc/LargestTest.java build/LargestTest
	cd build/LargestTest; \
	javac $(CFLAGS) LargestTest.java; \
	$(JAVA) $(RFLAGS) LargestTest

Anal: build/Anal/success

build/Anal/success: Misc/Anal.java
	@echo "Analysis Code Test"
	-@rm -rf build/Anal
	@mkdir build/Anal
	cp Misc/Anal.java build/Anal
	cd build/Anal; \
	javac $(CFLAGS) Anal.java; \
	$(JAVA) $(RFLAGS) Anal

TOH: build/TOH/success

build/TOH/success: Misc/TOH.java Lists/Stack.java Lists/AStack.java 
	@echo "TOH Code Test"
	-@rm -rf build/TOH
	@mkdir build/TOH
	cp Misc/TOH.java Lists/Stack.java Lists/AStack.java build/TOH
	cd build/TOH; \
	javac $(CFLAGS) TOH.java; \
	$(JAVA) $(RFLAGS) TOH

Fact: build/Fact/success

build/Fact/success: Misc/Fact.java Lists/Stack.java Lists/AStack.java
	@echo "Fact Code Test"
	-@rm -rf build/Fact
	@mkdir build/Fact
	@cp Misc/Fact.java build/Fact
	@cp Lists/Stack.java build/Fact
	@cp Lists/AStack.java build/Fact
	cd build/Fact; \
	javac $(CFLAGS) Fact.java; \
	$(JAVA) $(RFLAGS) Fact

Fibonnaci: build/Fibonnaci/success

build/Fibonnaci/success: Misc/Fibonnaci.java
	@echo "Fibonnaci Test"
	-@rm -rf build/Fibonnaci
	@mkdir build/Fibonnaci
	@cp Misc/Fibonnaci.java build/Fibonnaci
	cd build/Fibonnaci; \
	javac $(CFLAGS) Fibonnaci.java; \
	$(JAVA) $(RFLAGS) Fibonnaci

MinMax: build/MinMax/success

build/MinMax/success: Misc/MinMax.java
	@echo "MinMax Function Test"
	-@rm -rf build/MinMax
	@mkdir build/MinMax
	cp Misc/MinMax.java build/MinMax
	cd build/MinMax; \
	javac $(CFLAGS) MinMax.java; \
	$(JAVA) $(RFLAGS) MinMax

Lists: ListTest DoubleTest FreeList StackTest QueueTest ListAlt

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

ListAlt: build/ListAlt/success

build/ListAlt/success: ListAlt/ListAlt.java ListAlt/ListIndex.java ListAlt/List.java ListAlt/AList.java
	@echo "Alternate list implementation test"
	-@rm -rf build/ListAlt
	@mkdir build/ListAlt
	@cp ListAlt/List.java build/ListAlt
	@cp ListAlt/AList.java build/ListAlt/
	@cp ListAlt/ListAlt.java build/ListAlt/
	@cp ListAlt/ListIndex.java build/ListAlt/
	cd build/ListAlt; \
	javac $(CFLAGS) ListAlt.java; \
	$(JAVA) $(RFLAGS) ListAlt

Design: Dictionary

Dictionary: build/DictionaryTest/success

build/DictionaryTest/success: Design/Dictionary.java Design/DictionaryTest.java Design/Payroll.java Design/UALDictionary.java Utils/KVPair.java Lists/AList.java Lists/List.java
	@echo "Dictionary Test"
	-@rm -rf build/DictionaryTest
	@mkdir build/DictionaryTest
	@cp Design/Dictionary.java build/DictionaryTest
	@cp Design/DictionaryTest.java build/DictionaryTest
	@cp Design/Payroll.java build/DictionaryTest
	@cp Design/UALDictionary.java build/DictionaryTest
	@cp Utils/KVPair.java build/DictionaryTest
	@cp Lists/AList.java build/DictionaryTest
	@cp Lists/List.java build/DictionaryTest
	cd build/DictionaryTest; \
	javac $(CFLAGS) DictionaryTest.java; \
	$(JAVA) $(RFLAGS) DictionaryTest


Binary: Traverse ExpTree ExpTreeC BST RecTutor MinHeap MaxHeap

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

ExpTree: build/ExpTree/success

build/ExpTree/success: Binary/VarBinNode.java Binary/VarLeafNode.java Binary/VarIntlNode.java Binary/Visit.java Binary/ExpTree.java
	@echo "Expression Tree Test"
	-@rm -rf build/ExpTree
	@mkdir build/ExpTree
	@cp Binary/VarBinNode.java build/ExpTree
	@cp Binary/VarLeafNode.java build/ExpTree
	@cp Binary/VarIntlNode.java build/ExpTree
	@cp Binary/ExpTree.java build/ExpTree
	@cp Binary/Visit.java build/ExpTree
	cd build/ExpTree; \
	javac $(CFLAGS) ExpTree.java; \
	$(JAVA) $(RFLAGS) ExpTree

ExpTreeC: build/ExpTreeC/success

build/ExpTreeC/success: Binary/Visit.java Binary/ExpTreeC.java
	@echo "Expression Tree Test: Composite"
	-@rm -rf build/ExpTreeC
	@mkdir build/ExpTreeC
	@cp Binary/ExpTreeC.java build/ExpTreeC/ExpTree.java
	@cp Binary/VarBinNodeC.java build/ExpTreeC/VarBinNode.java
	@cp Binary/VarIntlNodeC.java build/ExpTreeC/VarIntlNode.java
	@cp Binary/VarLeafNodeC.java build/ExpTreeC/VarLeafNode.java
	@cp Binary/Visit.java build/ExpTreeC
	cd build/ExpTreeC; \
	javac $(CFLAGS) ExpTree.java; \
	$(JAVA) $(RFLAGS) ExpTree

BST: build/BSTTest/success

build/BSTTest/success: Binary/BST.java Binary/BSTTest1.java Binary/checkBST.java Binary/Preorder.java Binary/BSTTest.java Binary/BSTNode.java Binary/BinNode.java Utils/Permute.java Utils/Swap.java Binary/Traverse.java Utils/KVPair.java
	@echo "BST Test"
	-@rm -rf build/BSTTest
	@mkdir build/BSTTest
	@cp Binary/BST.java build/BSTTest
	@cp Binary/BSTNode.java build/BSTTest
	@cp Binary/BinNode.java build/BSTTest
	@cp Utils/Permute.java build/BSTTest
	@cp Utils/Swap.java build/BSTTest
	@cat Binary/BSTTest1.java Binary/checkBST.java Binary/Preorder.java Binary/BSTTest.java > build/BSTTest/BSTTest.java
	@cp Utils/KVPair.java build/BSTTest
	cd build/BSTTest; \
	javac $(CFLAGS) BSTTest.java; \
	$(JAVA) $(RFLAGS) BSTTest

RecTutor: build/RecTutor/success

build/RecTutor/success: Binary/BSTNode.java Binary/BinNode.java Binary/RecTutor.java
	-@rm -rf build/RecTutor
	@mkdir build/RecTutor
	@cp Binary/RecTutor.java build/RecTutor
	@cp Binary/BSTNode.java build/RecTutor
	@cp Binary/BinNode.java build/RecTutor
	cd build/RecTutor; \
	javac $(CFLAGS) RecTutor.java; \
	$(JAVA) $(RFLAGS) RecTutor

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


Sorting: Inssort Bubblesort Selsort Shellsort Mergesort Quicksort Heapsort Binsort Radixsort

Inssort: build/InssortTest/success

build/InssortTest/success: Sorting/Insertionsort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Sorting/Sort.java
	@echo "Insertionsort Test"
	-@rm -rf build/InssortTest
	@mkdir build/InssortTest
	cp Sorting/Sort.java build/InssortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Insertionsort.java Sorting/SortTest.2 > build/InssortTest/SortTest.java
	cd build/InssortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Bubblesort: build/BubblesortTest/success

build/BubblesortTest/success: Sorting/Bubblesort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Sorting/Sort.java
	@echo "Bubblesort Test"
	-@rm -rf build/BubblesortTest
	@mkdir build/BubblesortTest
	cp Sorting/Sort.java build/BubblesortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Bubblesort.java Sorting/SortTest.2 > build/BubblesortTest/SortTest.java
	cd build/BubblesortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Selsort: build/SelsortTest/success

build/SelsortTest/success: Sorting/Selectionsort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Sorting/Sort.java
	@echo "Selectionsort Test"
	-@rm -rf build/SelsortTest
	@mkdir build/SelsortTest
	cp Sorting/Sort.java build/SelsortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Selectionsort.java Sorting/SortTest.2 > build/SelsortTest/SortTest.java
	cd build/SelsortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Shellsort: build/ShellsortTest/success

build/ShellsortTest/success: Sorting/Shellsort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Sorting/Sort.java
	@echo "Shellsort Test"
	-@rm -rf build/ShellsortTest
	@mkdir build/ShellsortTest
	cp Sorting/Sort.java build/ShellsortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Shellsort.java Sorting/SortTest.2 > build/ShellsortTest/SortTest.java
	cd build/ShellsortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Mergesort: build/MergesortTest/success

build/MergesortTest/success: Sorting/Mergesort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Sorting/Sort.java
	@echo "Mergesort Test"
	-@rm -rf build/MergesortTest
	@mkdir build/MergesortTest
	cp Sorting/Sort.java build/MergesortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Mergesort.java Sorting/SortTest.2 > build/MergesortTest/SortTest.java
	cd build/MergesortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Quicksort: build/QuicksortTest/success

build/QuicksortTest/success: Sorting/Quicksort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Sorting/Sort.java
	@echo "Quicksort Test"
	-@rm -rf build/QuicksortTest
	@mkdir build/QuicksortTest
	cp Sorting/Sort.java build/QuicksortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Quicksort.java Sorting/SortTest.2 > build/QuicksortTest/SortTest.java
	cd build/QuicksortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Heapsort: build/HeapsortTest/success

build/HeapsortTest/success: Sorting/Heapsort.java Binary/MaxHeap.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Sorting/Sort.java
	@echo "Heapsort Test"
	-@rm -rf build/HeapsortTest
	@mkdir build/HeapsortTest
	cp Sorting/Sort.java build/HeapsortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Heapsort.java Sorting/SortTest.2 > build/HeapsortTest/SortTest.java
	@cp Binary/MaxHeap.java build/HeapsortTest
	cd build/HeapsortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Binsort: build/BinsortTest/success

build/BinsortTest/success: Sorting/Binsort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Utils/Permute.java Sorting/Sort.java
	@echo "Binsort Test"
	-@rm -rf build/BinsortTest
	@mkdir build/BinsortTest
	cp Sorting/Sort.java build/BinsortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Binsort.java Sorting/SortTest.2 > build/BinsortTest/SortTest.java
	@cp Utils/Permute.java build/BinsortTest
	cd build/BinsortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

Radixsort: build/RadixsortTest/success

build/RadixsortTest/success: Sorting/Radixsort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Checkorder.java Sorting/Sort.java
	@echo "Radixsort Test"
	-@rm -rf build/RadixsortTest
	@mkdir build/RadixsortTest
	cp Sorting/Sort.java build/RadixsortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Checkorder.java Sorting/Radixsort.java Sorting/SortTest.2 > build/RadixsortTest/SortTest.java
	cd build/RadixsortTest; \
	javac $(CFLAGS) Sort.java; \
	$(JAVA) $(RFLAGS) Sort

SortTime: InssortTime BubblesortTime SelsortTime ShellsortTime MergesortTime QuicksortTime HeapsortTime RadixsortTime

InssortTime: Sorting/Insertionsort.java Sorting/SortTime.1 Sorting/SortTime.2 Utils/Swap.java Utils/Checkorder.java Sorting/TimeSort.java
	@echo "Inssort Timing Test"
	-@rm -rf build/InssortTime
	@mkdir build/InssortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Insertionsort.java Sorting/SortTime.2 > build/InssortTime/SortTime.java
	cp Sorting/TimeSort.java build/InssortTime
	cd build/InssortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

BubblesortTime: Sorting/Bubblesort.java Sorting/SortTime.1 Sorting/SortTime.2 Utils/Swap.java Utils/Checkorder.java Sorting/TimeSort.java
	@echo "Bubble Sort Timing Test"
	-@rm -rf build/BubblesortTime
	@mkdir build/BubblesortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Bubblesort.java Sorting/SortTime.2 > build/BubblesortTime/SortTime.java
	cp Sorting/TimeSort.java build/BubblesortTime
	cd build/BubblesortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

SelsortTime: Sorting/Selectionsort.java Sorting/SortTime.1 Sorting/SortTime.2 Utils/Swap.java Utils/Checkorder.java Sorting/TimeSort.java
	@echo "Selection Sort Timing Test"
	-@rm -rf build/SelsortTime
	@mkdir build/SelsortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Selectionsort.java Sorting/SortTime.2 > build/SelsortTime/SortTime.java
	cp Sorting/TimeSort.java build/SelsortTime
	cd build/SelsortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

ShellsortTime: Sorting/Shellsort.java Sorting/SortTime.1 Sorting/SortTime.2 Utils/Swap.java Utils/Checkorder.java Sorting/TimeSort.java
	@echo "Shellsort Timing Test"
	-@rm -rf build/ShellsortTime
	@mkdir build/ShellsortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Shellsort.java Sorting/SortTime.2 > build/ShellsortTime/SortTime.java
	cp Sorting/TimeSort.java build/ShellsortTime
	cd build/ShellsortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

MergesortTime: Sorting/Mergesort.java Sorting/SortTime.1 Sorting/SortTime.2 Utils/Swap.java Utils/Checkorder.java Sorting/TimeSort.java
	@echo "Mergesort Timing Test"
	-@rm -rf build/MergesortTime
	@mkdir build/MergesortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Mergesort.java Sorting/SortTime.2 > build/MergesortTime/SortTime.java
	cp Sorting/TimeSort.java build/MergesortTime
	cd build/MergesortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

QuicksortTime: Sorting/Quicksort.java Sorting/SortTime.1 Sorting/SortTime.2 Utils/Swap.java Utils/Checkorder.java Sorting/TimeSort.java
	@echo "Quicksort Timing Test"
	-@rm -rf build/QuicksortTime
	@mkdir build/QuicksortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Quicksort.java Sorting/SortTime.2 > build/QuicksortTime/SortTime.java
	cp Sorting/TimeSort.java build/QuicksortTime
	cd build/QuicksortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

HeapsortTime: Sorting/Heapsort.java Binary/MaxHeap.java Sorting/SortTime.1 Sorting/SortTime.2 Utils/Swap.java Utils/Checkorder.java Sorting/TimeSort.java
	@echo "Heapsort Timing Test"
	-@rm -rf build/HeapsortTime
	@mkdir build/HeapsortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Heapsort.java Sorting/SortTime.2 > build/HeapsortTime/SortTime.java
	cp Binary/MaxHeap.java build/HeapsortTime
	cp Sorting/TimeSort.java build/HeapsortTime
	cd build/HeapsortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

RadixsortTime: Sorting/Radixsort.java Sorting/SortTime.1 Sorting/SortTime.2 Utils/Swap.java Utils/Checkorder.java Sorting/TimeSort.java
	@echo "Radixsort Timing Test"
	-@rm -rf build/RadixsortTime
	@mkdir build/RadixsortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Checkorder.java Sorting/Radixsort.java Sorting/SortTime.2 > build/RadixsortTime/SortTime.java
	cp Sorting/TimeSort.java build/RadixsortTime
	cd build/RadixsortTime; \
	javac $(CFLAGS) TimeSort.java; \
	$(JAVA) $(RFLAGS) TimeSort 1000

Searching: Bsearch Sequential Interpolation SequentialNoComments

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
	@echo "Sequential Search Test"
	-@rm -rf build/Sequential
	@mkdir build/Sequential
	cp Searching/Sequential.java build/Sequential
	cd build/Sequential; \
	javac $(CFLAGS) Sequential.java; \
	$(JAVA) $(RFLAGS) Sequential

Interpolation: build/Interpolation/success

build/Interpolation/success: Searching/interpolationSearch.java
	@echo "Interpolation Search Test"
	-@rm -rf build/Interpolation
	@mkdir build/Interpolation
	cp Searching/interpolationSearch.java build/Interpolation
	cd build/Interpolation; \
	javac $(CFLAGS) interpolationSearch.java; \
	$(JAVA) $(RFLAGS) interpolationSearch

SequentialNoComments: build/SequentialNoComments/success

build/SequentialNoComments/success: Searching/SequentialNoComments.java
	@echo "Sequential Search Test -- No commments"
	-@rm -rf build/SequentialNoComments
	@mkdir build/SequentialNoComments
	cp Searching/SequentialNoComments.java build/SequentialNoComments
	cd build/SequentialNoComments; \
	javac $(CFLAGS) SequentialNoComments.java; \
	$(JAVA) $(RFLAGS) SequentialNoComments

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

BufferPool: build/BufferPool/success

build/BufferPool/success: BufferPool/BuffBuffADT.java BufferPool/BufferADT.java BufferPool/BufferPoolADT.java BufferPool/BuffMsgADT.java
	@echo "TODO: BUFFERPOOL"

Memman: build/Memman/success

build/Memman/success: Memman/MemmanADT.java
	@echo "TODO: MEMMAN"

Indexing: build/Indexing/success

build/Indexing/success:
	@echo "TODO: Indexing"

General: GenTree UFTest1 UFTest2

GenTree: build/GenTreeTest/success

build/GenTreeTest/success: General/GenTreeTest.java
	@echo "GenTree Test"
	-@rm -rf build/GenTreeTest
	@mkdir build/GenTreeTest
	@cp General/GenTreeTest.java build/GenTreeTest
	cd build/GenTreeTest; \
	javac $(CFLAGS) GenTreeTest.java; \
	$(JAVA) $(RFLAGS) GenTreeTest

UFTest1: build/UFTest1/success

build/UFTest1/success: General/ParPtrTree1.java General/UFTest1.java
	@echo "UFTest1 Test"
	-@rm -rf build/UFTest1
	@mkdir build/UFTest1
	@cp General/ParPtrTree1.java build/UFTest1/ParPtrTree.java
	@cp General/UFTest1.java build/UFTest1
	cd build/UFTest1; \
	javac $(CFLAGS) UFTest1.java; \
	$(JAVA) $(RFLAGS) UFTest1

UFTest2: build/UFTest2/success

build/UFTest2/success: General/ParPtrTree2.java General/UFTest2.java
	@echo "UFTest2 Test"
	-@rm -rf build/UFTest2
	@mkdir build/UFTest2
	@cp General/ParPtrTree2.java build/UFTest2/ParPtrTree.java
	@cp General/UFTest2.java build/UFTest2
	cd build/UFTest2; \
	javac $(CFLAGS) UFTest2.java; \
	$(JAVA) $(RFLAGS) UFTest2

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

build/GraphDijk/success: Graphs/Dijkstra.java Graphs/Graph.java Graphs/GraphM.java Graphs/GraphL.java Graphs/GraphDijk.gph Graphs/GraphCreate.java Lists/Queue.java Lists/LQueue.java Lists/Link.java Graphs/GraphDijk.java Graphs/GraphDijk1.java Utils/KVPair.java Binary/MinHeap.java Utils/Swap.java
	@echo "GraphDijk Test"
	-@rm -rf build/GraphDijk
	@mkdir build/GraphDijk
	@cat Graphs/GraphDijk1.java Graphs/GraphCreate.java Graphs/Dijkstra.java Graphs/GraphDijk.java > build/GraphDijk/GraphDijk.java
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

Floyd: Graphs/Floyd.java
	@echo "TODO: Graphs: Floyd.java"

MCST: Graphs/GraphMCST.java Graphs/Kruskal.java Graphs/Prim.java Graphs/PrimPQ.java
	@echo "TODO: Graphs: TEST MCST CODE"
