# Java version of Makefile
JAVA= java
CFLAGS= -Xlint
RFLAGS= 

all: SortTime

clean:
	-rm -rf build
	mkdir build

build:
	mkdir build

Sorting: Inssort Bubblesort Mergesort QuickSort QuickSort3 RadixSort SelectionSort

Inssort: build/InssortTest/success

build/InssortTest/success: build Insertionsort.java SortTest.1 SortTest.2 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java ../Utils/KVPair.java
	@echo "Insertionsort Test"
	-@rm -rf build/InssortTest
	@mkdir build/InssortTest
	cat SortTest.1 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java Insertionsort.java SortTest.2 > build/InssortTest/SortTest.java
	cp ../Utils/KVPair.java build/InssortTest
	cd build/InssortTest; \
	javac $(CFLAGS) SortTest.java; \
	$(JAVA) $(RFLAGS) SortTest $(arraySize) $(arrayType) > Inssort.csv

Bubblesort: build/BubblesortTest/success

build/BubblesortTest/success: build Bubblesort.java SortTest.1 SortTest.2 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java ../Utils/KVPair.java
	@echo "Bubblesort Test"
	-@rm -rf build/BubblesortTest
	@mkdir build/BubblesortTest
	cat SortTest.1 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java Bubblesort.java SortTest.2 > build/BubblesortTest/SortTest.java
	cp ../Utils/KVPair.java build/BubblesortTest
	cd build/BubblesortTest; \
	javac $(CFLAGS) SortTest.java; \
	$(JAVA) $(RFLAGS) SortTest $(arraySize) $(arrayType) > Bubblesort.csv

Mergesort: build/MergesortTest/success

build/MergesortTest/success: build Mergesort.java SortTest.1 SortTest.2 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java ../Utils/KVPair.java
	@echo "Mergesort Test"
	-@rm -rf build/MergesortTest
	@mkdir build/MergesortTest
	cat SortTest.1 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java Mergesort.java SortTest.2 > build/MergesortTest/SortTest.java
	cp ../Utils/KVPair.java build/MergesortTest
	cd build/MergesortTest; \
	javac $(CFLAGS) SortTest.java; \
	$(JAVA) $(RFLAGS) SortTest $(arraySize) $(arrayType) > Mergesort.csv

QuickSort: build/QuickSortTest/success

build/QuickSortTest/success: build QuickSort.java SortTest.1 SortTest.2 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java ../Utils/KVPair.java
	@echo "QuickSort Test"
	-@rm -rf build/QuickSortTest
	@mkdir build/QuickSortTest
	cat SortTest.1 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java QuickSort.java SortTest.2 > build/QuickSortTest/SortTest.java
	cp ../Utils/KVPair.java build/QuickSortTest
	cd build/QuickSortTest; \
	javac $(CFLAGS) SortTest.java; \
	$(JAVA) $(RFLAGS) SortTest $(arraySize) $(arrayType) > Quicksort.csv

QuickSort3: build/QuickSort3Test/success

build/QuickSort3Test/success: build QuickSort3.java SortTest.1 SortTest.2 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java ../Utils/KVPair.java
	@echo "QuickSort3 Test"
	-@rm -rf build/QuickSort3Test
	@mkdir build/QuickSort3Test
	cat SortTest.1 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java QuickSort3.java SortTest.2 > build/QuickSort3Test/SortTest.java
	cp ../Utils/KVPair.java build/QuickSort3Test
	cd build/QuickSort3Test; \
	javac $(CFLAGS) SortTest.java; \
	$(JAVA) $(RFLAGS) SortTest $(arraySize) $(arrayType) > QuickSort3.csv

RadixSort: build/RadixSortTest/success

build/RadixSortTest/success: build RadixSort.java SortTest.1 SortTest.2 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java ../Utils/KVPair.java
	@echo "RadixSort Test"
	-@rm -rf build/RadixSortTest
	@mkdir build/RadixSortTest
	cat SortTest.1 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java RadixSort.java SortTest.2 > build/RadixSortTest/SortTest.java
	cp ../Utils/KVPair.java build/RadixSortTest
	cd build/RadixSortTest; \
	javac $(CFLAGS) SortTest.java; \
	$(JAVA) $(RFLAGS) SortTest $(arraySize) $(arrayType) > RadixSort.csv

SelectionSort: build/SelectionSortTest/success

build/SelectionSortTest/success: build SelectionSort.java SortTest.1 SortTest.2 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java ../Utils/KVPair.java
	@echo "SelectionSort Test"
	-@rm -rf build/SelectionSortTest
	@mkdir build/SelectionSortTest
	cat SortTest.1 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java SelectionSort.java SortTest.2 > build/SelectionSortTest/SortTest.java
	cp ../Utils/KVPair.java build/SelectionSortTest
	cd build/SelectionSortTest; \
	javac $(CFLAGS) SortTest.java; \
	$(JAVA) $(RFLAGS) SortTest $(arraySize) $(arrayType) > SelectionSort.csv
