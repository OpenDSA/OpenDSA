# Run the commandline compiler and runtime for all Processing code.
# This isn't quite running unit tests, but the effect is meant to be similar.

# Processing is kinda broken, in that it insists on popping up an
# X-windows window, even when run from the command line.
# If you get errors that DISPLAY is not set, then do:
# (Bash) export DISPLAY=:0.0
# (csh/tcsh) setenv DISPLAY :0.0

PROCESS = ~/processing-2.2.1/processing-java

# On Windows, I can't make it work without an absolute path
ifeq ($(OS),Windows_NT)
	BUILD = /c/Cliff/OpenDSA/SourceCode/Processing/build
else
	# Use this one on Linux
	BUILD = build
endif

# Run this to test the code for errors
all: Lists Design Binary General Sorting Graphs

# Note: Doing "all" (which happens when you just type "make") will NOT run "Sortime".
# Do "make Sorttime" if you want to run sorting timings

Binary: Traverse ExpTree ExpTreeC BST BSTDict Minheap Maxheap Huffman

Traverse: build/Traverse/success

build/Traverse/success: Binary/BinNode.pde Binary/BSTNode.pde Binary/Traverse.pde Utils/KVPair.pde Binary/Preorder.pde Binary/checkBST.pde
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
	@mkdir build/Huffman
	@cp Binary/Huffman.pde build/Huffman
	@$(PROCESS) --run --sketch="$(BUILD)/Huffman" --output="$(BUILD)/build" --force

RecTutor: build/RecExCode/success

build/RecExCode/success: Binary/BST.pde Binary/BSTTest.pde Binary/BSTNode.pde Binary/BinNode.pde Binary/RecExCode.pde
	@echo "RecExCode Test"
	-@rm -rf build/RecExCode
	@mkdir build/RecExCode
	@cp Binary/RecExCode.pde build/RecExCode
	@cp Binary/BSTNode.pde build/RecExCode
	@cp Binary/BinNode.pde build/RecExCode
	@$(PROCESS) --run --sketch="$(BUILD)/RecExCode" --output="$(BUILD)/build" --force

General: GenTree UFTest1 UFTest2

GenTree: build/GenTree/success

build/GenTree/success: General/GenTree.pde
	@echo "GenTree Test"
	-@rm -rf build/GenTree
	@mkdir build/GenTree
	@cp General/GenTree.pde build/GenTree
	@$(PROCESS) --run --sketch="$(BUILD)/GenTree" --output="build/build" --force

UFTest1: build/UFTest1/success

build/UFTest1/success: General/ParPtrTree1.pde General/UFTest.pde
	@echo "UFTest1 Test"
	-@rm -rf build/UFTest1
	@mkdir build/UFTest1
	@cp General/ParPtrTree1.pde build/UFTest1
	@cat General/output1.txt General/UFTest.pde > build/UFTest1/UFTest1.pde
	@$(PROCESS) --run --sketch="$(BUILD)/UFTest1" --output="build/build" --force

UFTest2: build/UFTest2/success

build/UFTest2/success: General/ParPtrTree2.pde General/UFTest.pde
	@echo "UFTest2 Test"
	-@rm -rf build/UFTest2
	@mkdir build/UFTest2
	@cp General/ParPtrTree2.pde build/UFTest2
	@cat General/output2.txt General/UFTest.pde > build/UFTest2/UFTest2.pde
	@$(PROCESS) --run --sketch="$(BUILD)/UFTest2" --output="build/build" --force

Sorting: Inssort Bubblesort Selsort Shellsort Mergesort Quicksort Heapsort Binsort Radixsort

# This will do timing tests. The "Sorting" target tests for errors.
Sorttime: InssortTime BubblesortTime SelsortTime QuicksortTime MergesortTime RadixsortTime

Inssort: build/InssortTest/success

build/InssortTest/success: Sorting/Insertionsort.pde Sorting/SortTest.pde Utils/Swap.pde Utils/KVPair.pde Utils/Checkorder.pde
	@echo "Inssort Test"
	-@rm -rf build/InssortTest
	@mkdir build/InssortTest
	@cp Sorting/Insertionsort.pde build/InssortTest
	@cp Sorting/SortTest.pde build/InssortTest/InssortTest.pde
	@cp Utils/Swap.pde build/InssortTest
	@cp Utils/KVPair.pde build/InssortTest
	@cp Utils/Checkorder.pde build/InssortTest
	@$(PROCESS) --run --sketch="$(BUILD)/InssortTest" --output="$(BUILD)/build" --force

Bubblesort: build/BubblesortTest/success

build/BubblesortTest/success: Sorting/Bubblesort.pde Sorting/SortTest.pde Utils/Swap.pde Utils/Checkorder.pde
	@echo "Bubblesort Test"
	-@rm -rf build/BubblesortTest
	@mkdir build/BubblesortTest
	@cp Sorting/Bubblesort.pde build/BubblesortTest
	@cp Sorting/SortTest.pde build/BubblesortTest/BubblesortTest.pde
	@cp Utils/Swap.pde build/BubblesortTest
	@cp Utils/Checkorder.pde build/BubblesortTest
	@$(PROCESS) --run --sketch="$(BUILD)/BubblesortTest" --output="$(BUILD)/build" --force

Selsort: build/SelsortTest/success

build/SelsortTest/success: Sorting/Selectionsort.pde Sorting/SortTest.pde Utils/Swap.pde Utils/Checkorder.pde
	@echo "Selsort Test"
	-@rm -rf build/SelsortTest
	@mkdir build/SelsortTest
	@cp Sorting/Selectionsort.pde build/SelsortTest
	@cp Utils/Swap.pde build/SelsortTest
	@cp Utils/Checkorder.pde build/SelsortTest
	@cp Sorting/SortTest.pde build/SelsortTest/SelsortTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/SelsortTest" --output="$(BUILD)/build" --force

Shellsort: build/ShellsortTest/success

build/ShellsortTest/success: Sorting/Shellsort.pde Sorting/SortTest.pde Utils/Swap.pde Utils/Checkorder.pde
	@echo "Shellsort Test"
	-@rm -rf build/ShellsortTest
	@mkdir build/ShellsortTest
	@cp Sorting/Shellsort.pde build/ShellsortTest
	@cp Utils/Swap.pde build/ShellsortTest
	@cp Utils/Checkorder.pde build/ShellsortTest
	@cp Sorting/SortTest.pde build/ShellsortTest/ShellsortTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/ShellsortTest" --output="$(BUILD)/build" --force

Mergesort: build/MergesortTest/success

build/MergesortTest/success: Sorting/Mergesort.pde Sorting/MergesortOpt.pde Sorting/SortTest.pde Utils/Swap.pde Utils/Swap.pde Utils/Checkorder.pde
	@echo "Mergesort Test"
	-@rm -rf build/MergesortTest
	@mkdir build/MergesortTest
	@cp Sorting/Mergesort.pde build/MergesortTest
	@cp Sorting/MergesortOpt.pde build/MergesortTest
	@cp Utils/Swap.pde build/MergesortTest
	@cp Utils/Checkorder.pde build/MergesortTest
	@cp Sorting/SortTest.pde build/MergesortTest/MergesortTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/MergesortTest" --output="$(BUILD)/build" --force

Quicksort: build/QuicksortTest/success

build/QuicksortTest/success: Sorting/Quicksort.pde Sorting/SortTest.pde Utils/Swap.pde Utils/Swap.pde Utils/Checkorder.pde
	@echo "Quicksort Test"
	-@rm -rf build/QuicksortTest
	@mkdir build/QuicksortTest
	@cp Sorting/Quicksort.pde build/QuicksortTest
	@cp Utils/Swap.pde build/QuicksortTest
	@cp Utils/Checkorder.pde build/QuicksortTest
	@cp Sorting/SortTest.pde build/QuicksortTest/QuicksortTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/QuicksortTest" --output="$(BUILD)/build" --force

Heapsort: build/HeapsortTest/success

build/HeapsortTest/success: Sorting/Heapsort.pde Sorting/SortTest.pde Binary/Maxheap.pde Utils/Swap.pde Utils/Checkorder.pde
	@echo "Heapsort Test"
	-@rm -rf build/HeapsortTest
	@mkdir build/HeapsortTest
	@cp Sorting/Heapsort.pde build/HeapsortTest
	@cp Sorting/SortTest.pde build/HeapsortTest/HeapsortTest.pde
	@cp Binary/Maxheap.pde build/HeapsortTest
	@cp Utils/Swap.pde build/HeapsortTest
	@cp Utils/Checkorder.pde build/HeapsortTest
	@$(PROCESS) --run --sketch="$(BUILD)/HeapsortTest" --output="$(BUILD)/build" --force

Binsort: build/Binsort/success

build/Binsort/success: Sorting/Binsort.pde Utils/Swap.pde Utils/Permute.pde Utils/Checkorder.pde
	@echo "Binsort Test"
	-@rm -rf build/Binsort
	@mkdir build/Binsort
	@cp Sorting/Binsort.pde build/Binsort
	@cp Utils/Swap.pde build/Binsort
	@cp Utils/Permute.pde build/Binsort
	@cp Utils/Checkorder.pde build/BinsortTest
	@$(PROCESS) --run --sketch="$(BUILD)/Binsort" --output="$(BUILD)/build" --force

Radixsort: build/RadixsortTest/success

build/RadixsortTest/success: Sorting/Radixsort.pde Sorting/SortTest.pde Utils/Checkorder.pde
	@echo "Radixsort Test"
	-@rm -rf build/RadixsortTest
	@mkdir build/RadixsortTest
	@cp Sorting/Radixsort.pde build/RadixsortTest
	@cp Utils/Checkorder.pde build/RadixsortTest
	@cp Sorting/SortTest.pde build/RadixsortTest/RadixsortTest.pde
	@$(PROCESS) --run --sketch="$(BUILD)/RadixsortTest" --output="$(BUILD)/build" --force


InssortTime: Sorting/Insertionsort.pde Sorting/SortTime.pde Utils/Swap.pde Utils/KVPair.pde Utils/Checkorder.pde
	@echo "Insertion Sort Timer"
	-@rm -rf build/InssortTime
	@mkdir build/InssortTime
	@cp Sorting/SortTime.pde build/InssortTime/InssortTime.pde
	@cp Sorting/Insertionsort.pde build/InssortTime
	@cp Utils/Swap.pde build/InssortTime
	@cp Utils/KVPair.pde build/InssortTime
	@cp Utils/Checkorder.pde build/InssortTime
	@$(PROCESS) --run --sketch="$(BUILD)/InssortTime" --output="$(BUILD)/build" --force

SelsortTime: Sorting/Selectionsort.pde Sorting/SortTime.pde Utils/Swap.pde Utils/Checkorder.pde
	@echo "Selection Sort Timer"
	-@rm -rf build/SelsortTime
	@mkdir build/SelsortTime
	@cp Sorting/SortTime.pde build/SelsortTime/SelsortTime.pde
	@cp Sorting/Selectionsort.pde build/SelsortTime
	@cp Utils/Swap.pde build/SelsortTime
	@cp Utils/Checkorder.pde build/SelsortTime
	@$(PROCESS) --run --sketch="$(BUILD)/SelsortTime" --output="build/build" --force

BubblesortTime: Sorting/Bubblesort.pde Sorting/SortTime.pde Utils/Swap.pde Utils/Checkorder.pde
	@echo "Bubble Sort Timer"
	-@rm -rf build/BubblesortTime
	@mkdir build/BubblesortTime
	@cp Sorting/SortTime.pde build/BubblesortTime/BubblesortTime.pde
	@cp Sorting/Bubblesort.pde build/BubblesortTime
	@cp Utils/KVPair.pde build/BubblesortTime
	@cp Utils/Swap.pde build/BubblesortTime
	@cp Utils/Checkorder.pde build/BubblesortTime
	@$(PROCESS) --run --sketch="$(BUILD)/BubblesortTime" --output="build/build" --force

QuicksortTime: Sorting/Quicksort.pde Sorting/SortTime.pde Utils/Swap.pde Utils/Checkorder.pde
	@echo "Quicksort Timer"
	-@rm -rf build/QuicksortTime
	@mkdir build/QuicksortTime
	@cp Sorting/SortTime.pde build/QuicksortTime/QuicksortTime.pde
	@cp Sorting/Quicksort.pde build/QuicksortTime
	@cp Utils/Swap.pde build/QuicksortTime
	@cp Utils/Checkorder.pde build/QuicksortTime
	@$(PROCESS) --run --sketch="$(BUILD)/QuicksortTime" --output="build/build" --force

MergesortTime: Sorting/Mergesort.pde Sorting/SortTime.pde Utils/Swap.pde Utils/Checkorder.pde
	@echo "Mergesort Timer"
	-@rm -rf build/MergesortTime
	@mkdir build/MergesortTime
	@cp Sorting/SortTime.pde build/MergesortTime/MergesortTime.pde
	@cp Sorting/Mergesort.pde build/MergesortTime
	@cp Utils/Swap.pde build/MergesortTime
	@cp Utils/Checkorder.pde build/MergesortTime
	@$(PROCESS) --run --sketch="$(BUILD)/MergesortTime" --output="build/build" --force

RadixsortTime: Sorting/Radixsort.pde Sorting/SortTime.pde Utils/Swap.pde Utils/Checkorder.pde
	@echo "Radixsort Timer"
	-@rm -rf build/RadixsortTime
	@mkdir build/RadixsortTime
	@cp Sorting/SortTime.pde build/RadixsortTime/RadixsortTime.pde
	@cp Sorting/Radixsort.pde build/RadixsortTime
	@cp Utils/Checkorder.pde build/RadixsortTime
	@$(PROCESS) --run --sketch="$(BUILD)/RadixsortTime" --output="build/build" --force

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
