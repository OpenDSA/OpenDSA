# Standard UNIX
CFLAGS= -s -Wall -O -DUNIX
# Debugging
#CFLAGS= -g -Wall -DUNIX
CC= g++ -std=c++0x

# Imlicit pattern rule for making .o files from .cpp files
%.o: %.cpp
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o $@ $<

#### Do the chapters #######################################################

all: build sorting lists

build: build
	mkdir build

clean:
	-rm -rf build
	mkdir build

Anal: build build/Anal/success

build/Anal/success: Misc/Anal.cpp Searching/Bsearch.cpp Searching/Sequential.cpp Misc/LargestTest.cpp Utils/utils.h
	@echo "Analysis Chapter Test"
	@rm -rf build/Anal
	@mkdir build/Anal
	@cp Misc/Anal.cpp build/Anal
	@cp Searching/Bsearch.cpp build/Anal
	@cp Searching/Sequential.cpp build/Anal
	@cp Misc/LargestTest.cpp build/Anal
	@cp Utils/utils.h build/Anal
	cd build/Anal; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Anal.o Anal.cpp; \
	$(CC) $(CFLAGS) Anal.o -o Anal; \
	./Anal

lists: ListTest

ListTest: build build/ListTest/success

build/ListTest/success: Lists/List.h Lists/AList.h Lists/ListTest.cpp
	@echo "Array-based List Test"
	-@rm -rf build/ListTest
	@mkdir build/ListTest
	@cp Lists/List.h build/ListTest
	@cp Lists/AList.h build/ListTest
	@cp Lists/ListTest.cpp build/ListTest
	cd build/ListTest; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o ListTest.o ListTest.cpp; \
	$(CC) $(CFLAGS) ListTest.o -o ListTest; \
	./ListTest

sorting: Inssort Bubblesort Selectionsort Shellsort Mergesort MergesortOpt Quicksort #Radixsort Heapsort

Inssort: build build/InssortTest/success

build/InssortTest/success: Sorting/Insertionsort.cpp Sorting/SortTest.cpp Utils/Checkorder.cpp Utils/Comparable.cpp Utils/utils.h Utils/KVPair.cpp Utils/Int.cpp
	@echo "Inssort Test"
	-@rm -rf build/InssortTest
	@mkdir build/InssortTest
	@cp Sorting/Insertionsort.cpp build/InssortTest
	@cp Sorting/SortTest.cpp build/InssortTest
	@cp Utils/Checkorder.cpp build/InssortTest
	@cp Utils/KVPair.cpp build/InssortTest
	@cp Utils/Comparable.cpp build/InssortTest
	@cp Utils/Int.cpp build/InssortTest
	@cp Utils/utils.h build/InssortTest
	cd build/InssortTest; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Insertionsort.o Insertionsort.cpp; \
	$(CC) $(CFLAGS) Insertionsort.o -o Insertionsort; \
	./Insertionsort 1000


Bubblesort: build build/BubblesortTest/success

build/BubblesortTest/success: Sorting/Bubblesort.cpp Sorting/SortTest.cpp Utils/Checkorder.cpp Utils/Comparable.cpp Utils/utils.h Utils/KVPair.cpp Utils/Int.cpp
	@echo "Bubblesort Test"
	-@rm -rf build/BubblesortTest
	@mkdir build/BubblesortTest
	@cp Sorting/Bubblesort.cpp build/BubblesortTest
	@cp Sorting/SortTest.cpp build/BubblesortTest
	@cp Utils/Checkorder.cpp build/BubblesortTest
	@cp Utils/KVPair.cpp build/BubblesortTest
	@cp Utils/Comparable.cpp build/BubblesortTest
	@cp Utils/Int.cpp build/BubblesortTest
	@cp Utils/utils.h build/BubblesortTest
	cd build/BubblesortTest; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Bubblesort.o Bubblesort.cpp; \
	$(CC) $(CFLAGS) Bubblesort.o -o Bubblesort; \
	./Bubblesort 1000

Selectionsort: build build/SelectionsortTest/success

build/SelectionsortTest/success: Sorting/Selectionsort.cpp Sorting/SortTest.cpp Utils/Checkorder.cpp Utils/Comparable.cpp Utils/utils.h Utils/KVPair.cpp Utils/Int.cpp
	@echo "Selectionsort Test"
	-@rm -rf build/SelectionsortTest
	@mkdir build/SelectionsortTest
	@cp Sorting/Selectionsort.cpp build/SelectionsortTest
	@cp Sorting/SortTest.cpp build/SelectionsortTest
	@cp Utils/Checkorder.cpp build/SelectionsortTest
	@cp Utils/KVPair.cpp build/SelectionsortTest
	@cp Utils/Comparable.cpp build/SelectionsortTest
	@cp Utils/Int.cpp build/SelectionsortTest
	@cp Utils/utils.h build/SelectionsortTest
	cd build/SelectionsortTest; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Selectionsort.o Selectionsort.cpp; \
	$(CC) $(CFLAGS) Selectionsort.o -o Selectionsort; \
	./Selectionsort 1000

Shellsort: build build/ShellsortTest/success

build/ShellsortTest/success: Sorting/Shellsort.cpp Sorting/SortTest.cpp Utils/Checkorder.cpp Utils/Comparable.cpp Utils/utils.h Utils/KVPair.cpp Utils/Int.cpp
	@echo "Shellsort Test"
	-@rm -rf build/ShellsortTest
	@mkdir build/ShellsortTest
	@cp Sorting/Shellsort.cpp build/ShellsortTest
	@cp Sorting/SortTest.cpp build/ShellsortTest
	@cp Utils/Checkorder.cpp build/ShellsortTest
	@cp Utils/KVPair.cpp build/ShellsortTest
	@cp Utils/Comparable.cpp build/ShellsortTest
	@cp Utils/Int.cpp build/ShellsortTest
	@cp Utils/utils.h build/ShellsortTest
	cd build/ShellsortTest; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Shellsort.o Shellsort.cpp; \
	$(CC) $(CFLAGS) Shellsort.o -o Shellsort; \
	./Shellsort 1000

Mergesort: build build/MergesortTest/success

build/MergesortTest/success: Sorting/Mergesort.cpp Sorting/SortTest.cpp Utils/Checkorder.cpp Utils/Comparable.cpp Utils/utils.h Utils/KVPair.cpp Utils/Int.cpp
	@echo "Mergesort Test"
	-@rm -rf build/MergesortTest
	@mkdir build/MergesortTest
	@cp Sorting/Mergesort.cpp build/MergesortTest
	@cp Sorting/SortTest.cpp build/MergesortTest
	@cp Utils/Checkorder.cpp build/MergesortTest
	@cp Utils/KVPair.cpp build/MergesortTest
	@cp Utils/Comparable.cpp build/MergesortTest
	@cp Utils/Int.cpp build/MergesortTest
	@cp Utils/utils.h build/MergesortTest
	cd build/MergesortTest; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Mergesort.o Mergesort.cpp; \
	$(CC) $(CFLAGS) Mergesort.o -o Mergesort; \
	./Mergesort 1000


MergesortOpt: build build/MergesortOptTest/success

build/MergesortOptTest/success: Sorting/MergesortOpt.cpp Sorting/SortTest.cpp Utils/Checkorder.cpp Utils/Comparable.cpp Utils/utils.h Utils/KVPair.cpp Utils/Int.cpp
	@echo "MergesortOpt Test"
	-@rm -rf build/MergesortOptTest
	@mkdir build/MergesortOptTest
	@cp Sorting/MergesortOpt.cpp build/MergesortOptTest
	@cp Sorting/SortTest.cpp build/MergesortOptTest
	@cp Utils/Checkorder.cpp build/MergesortOptTest
	@cp Utils/KVPair.cpp build/MergesortOptTest
	@cp Utils/Comparable.cpp build/MergesortOptTest
	@cp Utils/Int.cpp build/MergesortOptTest
	@cp Utils/utils.h build/MergesortOptTest
	cd build/MergesortOptTest; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o MergesortOpt.o MergesortOpt.cpp; \
	$(CC) $(CFLAGS) MergesortOpt.o -o MergesortOpt; \
	./MergesortOpt 1000

Quicksort: build build/QuicksortTest/success

build/QuicksortTest/success: Sorting/Quicksort.cpp Sorting/SortTest.cpp Utils/Checkorder.cpp Utils/Comparable.cpp Utils/utils.h Utils/KVPair.cpp Utils/Int.cpp
	@echo "Quicksort Test"
	-@rm -rf build/QuicksortTest
	@mkdir build/QuicksortTest
	@cp Sorting/Quicksort.cpp build/QuicksortTest
	@cp Sorting/SortTest.cpp build/QuicksortTest
	@cp Utils/Checkorder.cpp build/QuicksortTest
	@cp Utils/KVPair.cpp build/QuicksortTest
	@cp Utils/Comparable.cpp build/QuicksortTest
	@cp Utils/Int.cpp build/QuicksortTest
	@cp Utils/utils.h build/QuicksortTest
	cd build/QuicksortTest; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Quicksort.o Quicksort.cpp; \
	$(CC) $(CFLAGS) Quicksort.o -o Quicksort; \
	./Quicksort 1000

#Heapsort: build build/HeapsortTest/success

#build/HeapsortTest/success: Sorting/Heapsort.cpp Sorting/SortTest.cpp Sorting/Maxheap.cpp Utils/Checkorder.cpp Utils/Comparable.cpp Utils/utils.h Utils/KVPair.cpp Utils/Int.cpp
#	@echo "Heapsort Test"
#	-@rm -rf build/HeapsortTest
#	@mkdir build/HeapsortTest
#	@cp Sorting/Heapsort.cpp build/HeapsortTest
#	@cp Sorting/SortTest.cpp build/HeapsortTest
#	@cp Sorting/Maxheap.cpp build/HeapsortTest
#	@cp Utils/Checkorder.cpp build/HeapsortTest
#	@cp Utils/KVPair.cpp build/HeapsortTest
#	@cp Utils/Comparable.cpp build/HeapsortTest
#	@cp Utils/Int.cpp build/HeapsortTest
#	@cp Utils/utils.h build/HeapsortTest
#	cd build/HeapsortTest; \
#	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Heapsort.o Heapsort.cpp; \
#	$(CC) $(CFLAGS) Heapsort.o -o Heapsort; \
#	./Heapsort 25

#Radixsort: build build/RadixsortTest/success

#build/RadixsortTest/success: Sorting/Radixsort.cpp Sorting/SortTest.cpp Utils/Checkorder.cpp Utils/Comparable.cpp Utils/utils.h Utils/KVPair.cpp Utils/Int.cpp
#	@echo "Radixsort Test"
#	-@rm -rf build/RadixsortTest
#	@mkdir build/RadixsortTest
#	@cp Sorting/Radixsort.cpp build/RadixsortTest
#	@cp Sorting/SortTest.cpp build/RadixsortTest
#	@cp Utils/Checkorder.cpp build/RadixsortTest
#	@cp Utils/KVPair.cpp build/RadixsortTest
#	@cp Utils/Comparable.cpp build/RadixsortTest
#	@cp Utils/Int.cpp build/RadixsortTest
#	@cp Utils/utils.h build/RadixsortTest
#	cd build/RadixsortTest; \
#	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Radixsort.o Radixsort.cpp; \
#	$(CC) $(CFLAGS) Radixsort.o -o Radixsort; \
#	./Radixsort 1000

