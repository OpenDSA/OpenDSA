# Run the commandline compiler and runtime for all Processing code.
# This isn't quite running unit tests, but the effect should be similar.

# If you get errors that DISPLAY is not set, then do:
# (Bash) export DISPLAY=:0.0
# (csh/tcsh) setenv DISPLAY :0.0

PROCESS = ~/processing-2.0b9/processing-java

# Use this one on Linux
BUILD = build
# On Windows, I can't make it work without an absolute path
# BUILD = /c/Cliff/OpenDSA/SourceCode/Processing/build

# Run this to test the code for errors
all: Demo Misc Lists Design Binary General Sorting Graphs

# Note: Doing "all" (which happens when you just type "make") will NOT run "Sortime".
# Do "make Sorttime" if you want to run sorting timings

clean:
	-rm -rf build
	mkdir build

Demo: UpDown

UpDown: build/UpDown/success

build/UpDown/success:
	@echo "UpDown Test"
	-@rm -rf build/UpDown
	@mkdir build/UpDown
	@cp Demo/UpDown.pde build/UpDown
	@$(PROCESS) --run --sketch="$(BUILD)/UpDown" --output="build/build" --force

Misc: Fact TOH Fibonnaci Anal

Fact: build/Fact/success

build/Fact/success: Misc/Fact.pde Lists/Stack.pde Lists/AStack.pde
	@echo "Factorial Test"
	-@rm -rf build/Fact
	@mkdir build/Fact
	@cp Misc/Fact.pde build/Fact
	@cp Lists/Stack.pde build/Fact
	@cp Lists/AStack.pde build/Fact
	@$(PROCESS) --run --sketch="$(BUILD)/Fact" --output="build/build" --force

TOH: build/TOH/success

build/TOH/success: Misc/TOH.pde Lists/Stack.pde Lists/AStack.pde
	@echo "TOH Test"
	-@rm -rf build/TOH
	@mkdir build/TOH
	@cp Misc/TOH.pde build/TOH
	@cp Lists/Stack.pde build/TOH
	@cp Lists/AStack.pde build/TOH
	@$(PROCESS) --run --sketch="$(BUILD)/TOH" --output="build/build" --force

Fibonnaci: build/Fibonnaci/success

build/Fibonnaci/success: Misc/Fibonnaci.pde
	@echo "Fibonnaci Test"
	-@rm -rf build/Fibonnaci
	@mkdir build/Fibonnaci
	@cp Misc/Fibonnaci.pde build/Fibonnaci
	@$(PROCESS) --run --sketch="$(BUILD)/Fibonnaci" --output="build/build" --force

Anal:  build/Anal/success

build/Anal/success: Misc/Anal.pde
	@echo "Analysis Chapter Test"
	-@rm -rf build/Anal
	@mkdir build/Anal
	@cp Misc/Anal.pde build/Anal
	@$(PROCESS) --run --sketch="$(BUILD)/Anal" --output="build/build" --force

Lists: ListTest ListAlt FreeList DoubleTest StackTest QueueTest

ListTest: build/ListTest/success

build/ListTest/success: Lists/ListADT.pde Lists/AList.pde Lists/Link.pde Lists/LList.pde Lists/ListTest.pde
	@echo "Array-based and Linked List Test"
	-@rm -rf build/ListTest
	@mkdir build/ListTest
	@cp Lists/ListADT.pde build/ListTest
	@cp Lists/AList.pde build/ListTest/
	@cp Lists/LList.pde build/ListTest/
	@cp Lists/Link.pde build/ListTest/
	@cp Lists/ListTest.pde build/ListTest/
	@$(PROCESS) --run --sketch="$(BUILD)/ListTest" --output="$(BUILD)/build" --force

ListAlt: build/ListAlt/success

build/ListAlt/success: ListAlt/ListAlt.pde ListAlt/ListIndex.pde ListAlt/ListADT.pde ListAlt/AList.pde
	@echo "Alternate list implementation test"
	-@rm -rf build/ListAlt
	@mkdir build/ListAlt
	@cp ListAlt/ListADT.pde build/ListAlt
	@cp ListAlt/AList.pde build/ListAlt/
	@cp ListAlt/ListAlt.pde build/ListAlt/
	@cp ListAlt/ListIndex.pde build/ListAlt/
	@$(PROCESS) --run --sketch="$(BUILD)/ListAlt" --output="$(BUILD)/build" --force

FreeList: build/FreeList/success

build/FreeList/success: Lists/ListADT.pde Lists/AList.pde Lists/Freelink.pde Lists/Freelist.pde Lists/ListTest.pde
	@echo "Freelist Test"
	-@rm -rf build/FreeList
	@mkdir build/FreeList
	@cp Lists/ListADT.pde build/FreeList
	@cp Lists/AList.pde build/FreeList/
	@cp Lists/Freelist.pde build/FreeList/LList.pde
	@cp Lists/Freelink.pde build/FreeList/Link.pde
	@cp Lists/ListTest.pde build/FreeList/FreeList.pde
	@$(PROCESS) --run --sketch="$(BUILD)/FreeList" --output="$(BUILD)/build" --force

DoubleTest: build/DoubleTest/success

build/DoubleTest/success: Lists/ListADT.pde Lists/AList.pde Lists/DLink.pde Lists/Dlist.pde Lists/ListTest.pde
	@echo "Array-based and Doubly Linked List Test"
	-@rm -rf build/DoubleTest
	@mkdir build/DoubleTest
	@cp Lists/ListADT.pde build/DoubleTest
	@cp Lists/AList.pde build/DoubleTest/
	@cp Lists/Dlist.pde build/DoubleTest/LList.pde
	@cp Lists/DLink.pde build/DoubleTest/Link.pde
	@cp Lists/ListTest.pde build/DoubleTest/DoubleTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/DoubleTest" --output="$(BUILD)/build" --force

StackTest: build/StackTest/success

build/StackTest/success: Lists/Stack.pde Lists/AStack.pde Lists/Link.pde Lists/LStack.pde Lists/StackTest.pde
	@echo "Array-based and Linked Stack Test"
	-@rm -rf build/StackTest
	@mkdir build/StackTest
	@cp Lists/Stack.pde build/StackTest
	@cp Lists/AStack.pde build/StackTest/
	@cp Lists/LStack.pde build/StackTest/
	@cp Lists/Link.pde build/StackTest/
	@cp Lists/StackTest.pde build/StackTest/
	@$(PROCESS) --run --sketch="$(BUILD)/StackTest" --output="$(BUILD)/build" --force

QueueTest: build/QueueTest/success

build/QueueTest/success: Lists/Queue.pde Lists/AQueue.pde Lists/Link.pde Lists/LQueue.pde Lists/QueueTest.pde
	@echo "Array-based and Linked Queue Test"
	-@rm -rf build/QueueTest
	@mkdir build/QueueTest
	@cp Lists/Queue.pde build/QueueTest
	@cp Lists/AQueue.pde build/QueueTest/
	@cp Lists/LQueue.pde build/QueueTest/
	@cp Lists/Link.pde build/QueueTest/
	@cp Lists/QueueTest.pde build/QueueTest/
	@$(PROCESS) --run --sketch="$(BUILD)/QueueTest" --output="$(BUILD)/build" --force

Design: Dictionary

Dictionary: build/DictionaryTest/success

build/DictionaryTest/success: Design/Dictionary.pde Design/DictionaryTest.pde Design/Payroll.pde Design/UALDictionary.pde Utils/KVPair.pde Lists/AList.pde Lists/ListADT.pde
	@echo "Dictionary Test"
	-@rm -rf build/DictionaryTest
	@mkdir build/DictionaryTest
	@cp Design/Dictionary.pde build/DictionaryTest
	@cp Design/DictionaryTest.pde build/DictionaryTest
	@cp Design/Payroll.pde build/DictionaryTest
	@cp Design/UALDictionary.pde build/DictionaryTest
	@cp Utils/KVPair.pde build/DictionaryTest
	@cp Lists/AList.pde build/DictionaryTest
	@cp Lists/ListADT.pde build/DictionaryTest
	@$(PROCESS) --run --sketch="$(BUILD)/DictionaryTest" --output="$(BUILD)/build" --force

Binary: Traverse ExpTree ExpTreeC BST BSTDict Minheap Maxheap Huffman

Traverse: build/Traverse/success

build/Traverse/success: Binary/BinNode.pde Binary/BSTNode.pde Binary/Preorder.pde Binary/Traverse.pde Utils/KVPair.pde Binary/checkBST.pde
	@echo "Traversal Test"
	-@rm -rf build/Traverse
	@mkdir build/Traverse
	@cp Binary/BinNode.pde build/Traverse
	@cp Binary/BSTNode.pde build/Traverse
	@cp Utils/KVPair.pde build/Traverse
	@cp Binary/Traverse.pde build/Traverse
	@cp Binary/checkBST.pde build/Traverse
	@cp Binary/Preorder.pde build/Traverse
	@$(PROCESS) --run --sketch="$(BUILD)/Traverse" --output="$(BUILD)/build" --force

ExpTree: build/ExpTree/success

build/ExpTree/success: Binary/ExpressionTree.pde Binary/Visit.pde Binary/ExpTreeTest.pde
	@echo "Expression Tree Test"
	-@rm -rf build/ExpTree
	@mkdir build/ExpTree
	@cp Binary/ExpTreeTest.pde build/ExpTree/ExpTree.pde
	@cp Binary/ExpressionTree.pde build/ExpTree
	@cp Binary/Visit.pde build/ExpTree
	@$(PROCESS) --run --sketch="$(BUILD)/ExpTree" --output="$(BUILD)/build" --force

ExpTreeC: build/ExpTreeC/success

build/ExpTreeC/success: Binary/ExpressionTreeC.pde Binary/Visit.pde Binary/ExpTreeTest.pde
	@echo "Expression Tree Test: Composite"
	-@rm -rf build/ExpTreeC
	@mkdir build/ExpTreeC
	@cp Binary/ExpTreeTest.pde build/ExpTreeC/ExpTreeC.pde
	@cp Binary/ExpressionTreeC.pde build/ExpTreeC
	@cp Binary/Visit.pde build/ExpTreeC
	@$(PROCESS) --run --sketch="$(BUILD)/ExpTreeC" --output="$(BUILD)/build" --force

BST: build/BSTTest/success

build/BSTTest/success: Binary/BST.pde Binary/BSTTest.pde Binary/BSTNode.pde Binary/BinNode.pde Utils/Permute.pde Utils/Swap.pde Binary/Preorder.pde Utils/KVPair.pde Binary/checkBST.pde
	@echo "BST Test"
	-@rm -rf build/BSTTest
	@mkdir build/BSTTest
	@cp Binary/BST.pde build/BSTTest
	@cp Binary/BSTNode.pde build/BSTTest
	@cp Binary/BinNode.pde build/BSTTest
	@cp Binary/BSTTest.pde build/BSTTest
	@cp Binary/Preorder.pde build/BSTTest
	@cp Binary/checkBST.pde build/BSTTest
	@cp Utils/Permute.pde build/BSTTest
	@cp Utils/Swap.pde build/BSTTest
	@cp Utils/KVPair.pde build/BSTTest
	@$(PROCESS) --run --sketch="$(BUILD)/BSTTest" --output="$(BUILD)/build" --force

BSTDict: build/BSTDictTest/success

build/BSTDictTest/success: Binary/BST.pde Binary/BSTDict.pde Binary/BSTDictTest.pde Binary/BSTNode.pde Binary/BinNode.pde Utils/Permute.pde Utils/Swap.pde Utils/KVPair.pde
	@echo "BST Dictionary Test"
	-@rm -rf build/BSTDictTest
	@mkdir build/BSTDictTest
	@cp Binary/BST.pde build/BSTDictTest
	@cp Binary/BSTNode.pde build/BSTDictTest
	@cp Binary/BinNode.pde build/BSTDictTest
	@cp Design/Dictionary.pde build/BSTDictTest
	@cp Binary/BSTDictTest.pde build/BSTDictTest
	@cp Binary/BSTDict.pde build/BSTDictTest
	@cp Utils/Permute.pde build/BSTDictTest
	@cp Utils/Swap.pde build/BSTDictTest
	@cp Utils/KVPair.pde build/BSTDictTest
	@$(PROCESS) --run --sketch="$(BUILD)/BSTDictTest" --output="$(BUILD)/build" --force

Minheap: build/MinheapTest/success

build/MinheapTest/success: Binary/Minheap.pde Binary/MinheapTest.pde Utils/Permute.pde Utils/Swap.pde
	@echo "Minheap Test"
	-@rm -rf build/MinheapTest
	@mkdir build/MinheapTest
	@cp Binary/Minheap.pde build/MinheapTest
	@cp Binary/MinheapTest.pde build/MinheapTest
	@cp Utils/Permute.pde build/MinheapTest
	@cp Utils/Swap.pde build/MinheapTest
	@$(PROCESS) --run --sketch="$(BUILD)/MinheapTest" --output="$(BUILD)/build" --force

Maxheap: build/MaxheapTest/success

build/MaxheapTest/success: Binary/Maxheap.pde Binary/MaxheapTest.pde Utils/Permute.pde Utils/Swap.pde
	@echo "Maxheap Test"
	-@rm -rf build/MaxheapTest
	@mkdir build/MaxheapTest
	@cp Binary/Maxheap.pde build/MaxheapTest
	@cp Binary/MaxheapTest.pde build/MaxheapTest
	@cp Utils/Permute.pde build/MaxheapTest
	@cp Utils/Swap.pde build/MaxheapTest
	@$(PROCESS) --run --sketch="$(BUILD)/MaxheapTest" --output="$(BUILD)/build" --force

Huffman: build/Huffman/success

build/Huffman/success: Binary/Huffman.pde
	@echo "Huffman Test"
	-@rm -rf build/Huffman
	@mkdir build/HuffmanTest
	@cp Binary/Huffman.pde build/Huffman
	@$(PROCESS) --run --sketch="$(BUILD)/Huffman" --output="$(BUILD)/build" --force

General: GenTree UFTest

GenTree: build/GenTree/success

build/GenTree/success: General/GenTree.pde
	@echo "GenTree Test"
	-@rm -rf build/GenTree
	@mkdir build/GenTree
	@cp General/GenTree.pde build/GenTree
	@$(PROCESS) --run --sketch="$(BUILD)/GenTree" --output="build/build" --force

UFTest: build/UFTest/success

build/UFTest/success: General/ParPtrTree.pde General/UFTest.pde
	@echo "UFTest Test"
	-@rm -rf build/UFTest
	@mkdir build/UFTest
	@cp General/ParPtrTree.pde build/UFTest
	@cp General/UFTest.pde build/UFTest
	@$(PROCESS) --run --sketch="$(BUILD)/UFTest" --output="build/build" --force

Sorting: Inssort InssortKV Bubblesort Selsort Shellsort Mergesort MergesortOpt Quicksort Heapsort Binsort Radixsort

# This will do timing tests. The "Sorting" target tests for errors.
Sorttime: InssortTime BubblesortTime SelsortTime

Inssort: build/InssortTest/success

build/InssortTest/success: Sorting/Insertionsort.pde Sorting/SortTest.pde Utils/Swap.pde
	@echo "Inssort Test"
	-@rm -rf build/InssortTest
	@mkdir build/InssortTest
	@cp Sorting/Insertionsort.pde build/InssortTest
	@cp Sorting/SortTest.pde build/InssortTest/InssortTest.pde
	@cp Utils/Swap.pde build/InssortTest
	@$(PROCESS) --run --sketch="$(BUILD)/InssortTest" --output="$(BUILD)/build" --force

InssortKV: build/InssortKVTest/success

build/InssortKVTest/success: Sorting/InssortKV.pde Sorting/SortTestKV.pde Utils/KVPair.pde
	@echo "InssortKV Test"
	-@rm -rf build/InssortKVTest
	@mkdir build/InssortKVTest
	@cp Sorting/InssortKV.pde build/InssortKVTest
	@cp Utils/KVPair.pde build/InssortKVTest
	@cp Sorting/SortTestKV.pde build/InssortKVTest/InssortKVTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/InssortKVTest" --output="$(BUILD)/build" --force

Bubblesort: build/BubblesortTest/success

build/BubblesortTest/success: Sorting/Bubblesort.pde Sorting/SortTest.pde Utils/Swap.pde
	@echo "Bubblesort Test"
	-@rm -rf build/BubblesortTest
	@mkdir build/BubblesortTest
	@cp Sorting/Bubblesort.pde build/BubblesortTest
	@cp Sorting/SortTest.pde build/BubblesortTest/BubblesortTest.pde
	@cp Utils/Swap.pde build/BubblesortTest
	@$(PROCESS) --run --sketch="$(BUILD)/BubblesortTest" --output="$(BUILD)/build" --force

Selsort: build/SelsortTest/success

build/SelsortTest/success: Sorting/Selectionsort.pde Sorting/SortTest.pde Utils/Swap.pde
	@echo "Selsort Test"
	-@rm -rf build/SelsortTest
	@mkdir build/SelsortTest
	@cp Sorting/Selectionsort.pde build/SelsortTest
	@cp Utils/Swap.pde build/SelsortTest
	@cp Sorting/SortTest.pde build/SelsortTest/SelsortTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/SelsortTest" --output="$(BUILD)/build" --force

Shellsort: build/ShellsortTest/success

build/ShellsortTest/success: Sorting/Shellsort.pde Sorting/SortTest.pde Utils/Swap.pde
	@echo "Shellsort Test"
	-@rm -rf build/ShellsortTest
	@mkdir build/ShellsortTest
	@cp Sorting/Shellsort.pde build/ShellsortTest
	@cp Utils/Swap.pde build/ShellsortTest
	@cp Sorting/SortTest.pde build/ShellsortTest/ShellsortTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/ShellsortTest" --output="$(BUILD)/build" --force

Mergesort: build/MergesortTest/success

build/MergesortTest/success: Sorting/Mergesort.pde Sorting/SortTest.pde Utils/Swap.pde Utils/Swap.pde
	@echo "Mergesort Test"
	-@rm -rf build/MergesortTest
	@mkdir build/MergesortTest
	@cp Sorting/Mergesort.pde build/MergesortTest
	@cp Utils/Swap.pde build/MergesortTest
	@cp Sorting/SortTest.pde build/MergesortTest/MergesortTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/MergesortTest" --output="$(BUILD)/build" --force

MergesortOpt: build/MergesortOptTest/success

build/MergesortOptTest/success: Sorting/MergesortOpt.pde Sorting/SortTest.pde Utils/Swap.pde
	@echo "MergesortOpt Test"
	-@rm -rf build/MergesortOptTest
	@mkdir build/MergesortOptTest
	@cp Sorting/MergesortOpt.pde build/MergesortOptTest
	@cp Utils/Swap.pde build/MergesortOptTest
	@cp Sorting/SortTest.pde build/MergesortOptTest/MergesortOptTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/MergesortOptTest" --output="$(BUILD)/build" --force

Quicksort: build/QuicksortTest/success

build/QuicksortTest/success: Sorting/Quicksort.pde Sorting/SortTest.pde Utils/Swap.pde Utils/Swap.pde
	@echo "Quicksort Test"
	-@rm -rf build/QuicksortTest
	@mkdir build/QuicksortTest
	@cp Sorting/Quicksort.pde build/QuicksortTest
	@cp Utils/Swap.pde build/QuicksortTest
	@cp Sorting/SortTest.pde build/QuicksortTest/QuicksortTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/QuicksortTest" --output="$(BUILD)/build" --force

Heapsort: build/HeapsortTest/success

build/HeapsortTest/success: Sorting/Heapsort.pde Sorting/SortTest.pde Binary/Maxheap.pde Utils/Swap.pde
	@echo "Heapsort Test"
	-@rm -rf build/HeapsortTest
	@mkdir build/HeapsortTest
	@cp Sorting/Heapsort.pde build/HeapsortTest
	@cp Sorting/SortTest.pde build/HeapsortTest/HeapsortTest.pde
	@cp Binary/Maxheap.pde build/HeapsortTest
	@cp Utils/Swap.pde build/HeapsortTest
	@$(PROCESS) --run --sketch="$(BUILD)/HeapsortTest" --output="$(BUILD)/build" --force

Binsort: build/Binsort/success

build/Binsort/success: Sorting/Binsort.pde Utils/Swap.pde Utils/Permute.pde
	@echo "Binsort Test"
	-@rm -rf build/Binsort
	@mkdir build/Binsort
	@cp Sorting/Binsort.pde build/Binsort
	@cp Utils/Swap.pde build/Binsort
	@cp Utils/Permute.pde build/Binsort
	@$(PROCESS) --run --sketch="$(BUILD)/Binsort" --output="$(BUILD)/build" --force

Radixsort: build/RadixsortTest/success

build/RadixsortTest/success: Sorting/Radixsort.pde Sorting/SortTest.pde
	@echo "Radixsort Test"
	-@rm -rf build/RadixsortTest
	@mkdir build/RadixsortTest
	@cp Sorting/Radixsort.pde build/RadixsortTest
	@cp Sorting/SortTest.pde build/RadixsortTest/RadixsortTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/RadixsortTest" --output="$(BUILD)/build" --force


InssortTime:
	@echo "Insertion Sort Timer"
	-@rm -rf build/InssortTime
	@mkdir build/InssortTime
	@cp Sorting/SortTime.pde build/InssortTime/InssortTime.pde
	@cp Sorting/Insertionsort.pde build/InssortTime
	@cp Utils/Swap.pde build/InssortTime
	@$(PROCESS) --run --sketch="$(BUILD)/InssortTime" --output="$(BUILD)/build" --force

SelsortTime:
	@echo "Selection Sort Timer"
	-@rm -rf build/SelsortTime
	@mkdir build/SelsortTime
	@cp Sorting/SortTime.pde build/SelsortTime/SelsortTime.pde
	@cp Sorting/Selectionsort.pde build/SelsortTime
	@cp Utils/Swap.pde build/SelsortTime
	@$(PROCESS) --run --sketch="$(BUILD)/SelsortTime" --output="build/build" --force

BubblesortTime:
	@echo "Bubble Sort Timer"
	-@rm -rf build/BubblesortTime
	@mkdir build/BubblesortTime
	@cp Sorting/SortTime.pde build/BubblesortTime/BubblesortTime.pde
	@cp Sorting/Bubblesort.pde build/BubblesortTime
	@cp Utils/Swap.pde build/BubblesortTime
	@$(PROCESS) --run --sketch="$(BUILD)/BubblesortTime" --output="build/build" --force


Graphs: GraphDummy GraphTrav GraphTop GraphDijk GraphMCST

GraphDummy: build/GraphDummy/success

build/GraphDummy/success: Graphs/GraphDummy.pde Graphs/Graph.pde Graphs/GraphM.pde
	@echo "GraphDummy Test"
	-@rm -rf build/GraphDummy
	@mkdir build/GraphDummy
	@cp Graphs/GraphDummy.pde build/GraphDummy
	@cp Graphs/Graph.pde build/GraphDummy
	@cp Graphs/GraphM.pde build/GraphDummy
	@$(PROCESS) --run --sketch="$(BUILD)/GraphDummy" --output="build/build" --force

GraphTrav: build/GraphTrav/success

build/GraphTrav/success: Graphs/BFS.pde Graphs/DFS.pde Graphs/Graph.pde Graphs/GraphM.pde Graphs/GraphL.pde Graphs/GraphTrav.pde Graphs/GraphCreate.pde Lists/Queue.pde Lists/LQueue.pde Lists/Link.pde Graphs/GraphTrav.gph
	@echo "GraphTrav Test"
	-@rm -rf build/GraphTrav
	@mkdir build/GraphTrav
	@cp Graphs/GraphTrav.pde build/GraphTrav
	@cp Graphs/GraphTrav.gph build/GraphTrav
	@cp Graphs/GraphCreate.pde build/GraphTrav
	@cp Graphs/Graph.pde build/GraphTrav
	@cp Graphs/GraphM.pde build/GraphTrav
	@cp Graphs/GraphL.pde build/GraphTrav
	@cp Graphs/DFS.pde build/GraphTrav
	@cp Graphs/BFS.pde build/GraphTrav
	@cp Lists/Queue.pde build/GraphTrav
	@cp Lists/LQueue.pde build/GraphTrav
	@cp Lists/Link.pde build/GraphTrav
	@$(PROCESS) --run --sketch="$(BUILD)/GraphTrav" --output="build/build" --force

GraphTop: build/GraphTop/success

build/GraphTop/success: Graphs/TopsortBFS.pde Graphs/TopsortDFS.pde Graphs/Graph.pde Graphs/GraphM.pde Graphs/GraphL.pde Graphs/GraphTop.pde Graphs/GraphCreate.pde Lists/Queue.pde Lists/LQueue.pde Lists/Link.pde Graphs/GraphTop.gph
	@echo "GraphTop Test"
	-@rm -rf build/GraphTop
	@mkdir build/GraphTop
	@cp Graphs/GraphTop.pde build/GraphTop
	@cp Graphs/GraphTop.gph build/GraphTop
	@cp Graphs/GraphCreate.pde build/GraphTop
	@cp Graphs/Graph.pde build/GraphTop
	@cp Graphs/GraphM.pde build/GraphTop
	@cp Graphs/GraphL.pde build/GraphTop
	@cp Graphs/TopsortDFS.pde build/GraphTop
	@cp Graphs/TopsortBFS.pde build/GraphTop
	@cp Lists/Queue.pde build/GraphTop
	@cp Lists/LQueue.pde build/GraphTop
	@cp Lists/Link.pde build/GraphTop
	@$(PROCESS) --run --sketch="$(BUILD)/GraphTop" --output="build/build" --force

GraphDijk: build/GraphDijk/success

build/GraphDijk/success: Graphs/Graph.pde Graphs/GraphM.pde Graphs/GraphL.pde Graphs/GraphDijk.pde Graphs/GraphCreate.pde Lists/Queue.pde Lists/LQueue.pde Lists/Link.pde Graphs/GraphDijk.gph Graphs/Dijkstra.pde Graphs/DijkstraPQ.pde Utils/KVPair.pde Binary/Minheap.pde
	@echo "GraphDijk Test"
	-@rm -rf build/GraphDijk
	-@mkdir build/GraphDijk
	@cp Graphs/Graph.pde build/GraphDijk
	@cp Graphs/GraphM.pde build/GraphDijk
	@cp Graphs/GraphL.pde build/GraphDijk
	@cp Graphs/GraphDijk.pde build/GraphDijk
	@cp Graphs/GraphDijk.gph build/GraphDijk
	@cp Graphs/GraphCreate.pde build/GraphDijk
	@cp Lists/Queue.pde build/GraphDijk
	@cp Lists/LQueue.pde build/GraphDijk
	@cp Lists/Link.pde build/GraphDijk
	@cp Graphs/Dijkstra.pde build/GraphDijk
	@cp Graphs/DijkstraPQ.pde build/GraphDijk
	@cp Utils/KVPair.pde build/GraphDijk
	@cp Binary/Minheap.pde build/GraphDijk
	@$(PROCESS) --run --sketch="$(BUILD)/GraphDijk" --output="build/build" --force

GraphMCST: build/GraphMCST/success

build/GraphMCST/success: Graphs/Graph.pde Graphs/GraphM.pde Graphs/GraphL.pde Graphs/GraphMCST.pde Graphs/GraphCreate.pde Lists/Queue.pde Lists/LQueue.pde Lists/Link.pde Graphs/GraphTrav.gph Graphs/Prim.pde Graphs/PrimPQ.pde Graphs/Kruskal.pde Utils/KVPair.pde Binary/Minheap.pde
	@echo "GraphMCST Test"
	-@rm -rf build/GraphMCST
	@mkdir build/GraphMCST
	@cp Graphs/Graph.pde build/GraphMCST
	@cp Graphs/GraphM.pde build/GraphMCST
	@cp Graphs/GraphL.pde build/GraphMCST
	@cp Graphs/GraphMCST.pde build/GraphMCST
	@cp Graphs/GraphTrav.gph build/GraphMCST
	@cp Graphs/GraphCreate.pde build/GraphMCST
	@cp Lists/Queue.pde build/GraphMCST
	@cp Lists/LQueue.pde build/GraphMCST
	@cp Lists/Link.pde build/GraphMCST
	@cp Graphs/Prim.pde build/GraphMCST
	@cp Graphs/PrimPQ.pde build/GraphMCST
	@cp Graphs/Kruskal.pde build/GraphMCST
	@cp Utils/KVPair.pde build/GraphMCST
	@cp Binary/Minheap.pde build/GraphMCST
	@cp General/ParPtrTree.pde build/GraphMCST
	@$(PROCESS) --run --sketch="$(BUILD)/GraphMCST" --output="build/build" --force
