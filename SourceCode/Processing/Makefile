# Run the commandline compiler and runtime for all Processing code.
# This isn't quite running unit tests, but the effect should be similar.
PROCESS = ~/processing-2.0b8/processing-java
SRC = c:\Cliff\OpenDSA\SourceCode\Processing
TEMP = c:\Cliff\OpenDSA\SourceCode\Processing\TEMP

all: GraphTrav Sorting

clean:
	-rm -rf TEMP
	mkdir TEMP

Sorting: Inssort InssortKV Bubblesort Selsort Shellsort Mergesort MergesortOpt Quicksort Heapsort

Inssort: Sorting/Insertionsort.pde Sorting/SortTest.pde
	@echo "Inssort Test"
	-@rm -rf TEMP/InssortTest
	@mkdir TEMP/InssortTest
	@cp Sorting/Insertionsort.pde TEMP/InssortTest
	@cp Sorting/SortTest.pde TEMP/InssortTest/InssortTest.pde
	@$(PROCESS) --run --sketch="$(TEMP)/InssortTest" --output="$(TEMP)/TEMP" --force

InssortKV: Sorting/InssortKV.pde Sorting/SortTestKV.pde Sorting/KVPair.pde
	@echo "InssortKV Test"
	-@rm -rf TEMP/InssortKVTest
	@mkdir TEMP/InssortKVTest
	@cp Sorting/InssortKV.pde TEMP/InssortKVTest
	@cp Sorting/KVPair.pde TEMP/InssortKVTest
	@cp Sorting/SortTestKV.pde TEMP/InssortKVTest/InssortKVTest.pde
	@$(PROCESS) --run --sketch="$(TEMP)/InssortKVTest" --output="$(TEMP)/TEMP" --force

Bubblesort: Sorting/Bubblesort.pde Sorting/SortTest.pde
	@echo "Bubblesort Test"
	-@rm -rf TEMP/BubblesortTest
	@mkdir TEMP/BubblesortTest
	@cp Sorting/Bubblesort.pde TEMP/BubblesortTest
	@cp Sorting/SortTest.pde TEMP/BubblesortTest/BubblesortTest.pde
	@$(PROCESS) --run --sketch="$(TEMP)/BubblesortTest" --output="$(TEMP)/TEMP" --force

Selsort: Sorting/Selectionsort.pde Sorting/SortTest.pde
	@echo "Selsort Test"
	-@rm -rf TEMP/SelsortTest
	@mkdir TEMP/SelsortTest
	@cp Sorting/Selectionsort.pde TEMP/SelsortTest
	@cp Sorting/SortTest.pde TEMP/SelsortTest/SelsortTest.pde
	@$(PROCESS) --run --sketch="$(TEMP)/SelsortTest" --output="$(TEMP)/TEMP" --force

Shellsort: Sorting/Shellsort.pde Sorting/SortTest.pde
	@echo "Shellsort Test"
	-@rm -rf TEMP/ShellsortTest
	@mkdir TEMP/ShellsortTest
	@cp Sorting/Shellsort.pde TEMP/ShellsortTest
	@cp Sorting/SortTest.pde TEMP/ShellsortTest/ShellsortTest.pde
	@$(PROCESS) --run --sketch="$(TEMP)/ShellsortTest" --output="$(TEMP)/TEMP" --force

Mergesort: Sorting/Mergesort.pde Sorting/SortTest.pde
	@echo "Mergesort Test"
	-@rm -rf TEMP/MergesortTest
	@mkdir TEMP/MergesortTest
	@cp Sorting/Mergesort.pde TEMP/MergesortTest
	@cp Sorting/SortTest.pde TEMP/MergesortTest/MergesortTest.pde
	@$(PROCESS) --run --sketch="$(TEMP)/MergesortTest" --output="$(TEMP)/TEMP" --force

MergesortOpt: Sorting/MergesortOpt.pde Sorting/SortTest.pde
	@echo "MergesortOpt Test"
	-@rm -rf TEMP/MergesortOptTest
	@mkdir TEMP/MergesortOptTest
	@cp Sorting/MergesortOpt.pde TEMP/MergesortOptTest
	@cp Sorting/SortTest.pde TEMP/MergesortOptTest/MergesortOptTest.pde
	@$(PROCESS) --run --sketch="$(TEMP)/MergesortOptTest" --output="$(TEMP)/TEMP" --force

Quicksort: Sorting/Quicksort.pde Sorting/SortTest.pde
	@echo "Quicksort Test"
	-@rm -rf TEMP/QuicksortTest
	@mkdir TEMP/QuicksortTest
	@cp Sorting/Quicksort.pde TEMP/QuicksortTest
	@cp Sorting/SortTest.pde TEMP/QuicksortTest/QuicksortTest.pde
	@$(PROCESS) --run --sketch="$(TEMP)/QuicksortTest" --output="$(TEMP)/TEMP" --force

Heapsort: Sorting/Heapsort.pde Sorting/SortTest.pde
	@echo "Heapsort Test"
	-@rm -rf TEMP/HeapsortTest
	@mkdir TEMP/HeapsortTest
	@cp Sorting/Heapsort.pde TEMP/HeapsortTest
	@cp Sorting/SortTest.pde TEMP/HeapsortTest/HeapsortTest.pde
	@$(PROCESS) --run --sketch="$(TEMP)/HeapsortTest" --output="$(TEMP)/TEMP" --force

GraphTrav: Graphs/BFS.pde Graphs/DFS.pde Graphs/Graph.pde Graphs/GraphM.pde Graphs/GraphL.pde Graphs/GraphTrav.pde
	@echo "GraphTrav Test"
	-@rm -rf TEMP/GraphTrav
	@mkdir TEMP/GraphTrav
	@cp Graphs/GraphTrav.pde TEMP/GraphTrav
	@cp Graphs/Graph.pde TEMP/GraphTrav
	@cp Graphs/GraphM.pde TEMP/GraphTrav
	@cp Graphs/GraphL.pde TEMP/GraphTrav
	@cp Graphs/DFS.pde TEMP/GraphTrav
	@cp Graphs/BFS.pde TEMP/GraphTrav
	@$(PROCESS) --run --sketch="$(TEMP)/GraphTrav" --output="$(TEMP)/TEMP" --force
