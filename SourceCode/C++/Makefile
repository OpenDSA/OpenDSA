# Standard UNIX
CFLAGS= -s -Wall -O -DUNIX
# Debugging
#CFLAGS= -g -Wall -DUNIX
CC= g++

# Imlicit pattern rule for making .o files from .cpp files
%.o: %.cpp
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o $@ $<

#### Do the chapters #######################################################

all: build sorting

build:
	mkdir build

clean:
	-rm -rf build
	mkdir build

sorting: Inssort Bubblesort Selectionsort Shellsort Mergesort MergesortOpt Quicksort Heapsort

Inssort: build/InssortTest/success

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


Bubblesort: build/BubblesortTest/success

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

Selectionsort: build/SelectionsortTest/success

build/SelectionTest/success: Sorting/Selectionsort.cpp Sorting/SortTest.cpp Utils/Checkorder.cpp Utils/Comparable.cpp Utils/utils.h Utils/KVPair.cpp Utils/Int.cpp
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


Shellsort: build/ShellsortTest/success

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

Mergesort: build/Mergesort/success

build/Mergesort/success: Sorting/Mergesort.cpp Sorting/sortmain.cpp Utils/book.h Utils/compare.h
	@echo "Mergesort Test"
	-@rm -rf build/Mergesort
	@mkdir build/Mergesort
	@cp Sorting/Mergesort.cpp build/Mergesort
	@cp Sorting/sortmain.cpp build/Mergesort
	@cp Utils/book.h build/Mergesort
	@cp Utils/compare.h build/Mergesort
	cd build/Mergesort; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Mergesort.o Mergesort.cpp; \
	$(CC) $(CFLAGS) Mergesort.o -o Mergesort; \
	./Mergesort 1000 1000

MergesortOpt: build/MergesortOpt/success

build/MergesortOpt/success: Sorting/MergesortOpt.cpp Sorting/sortmain.cpp Utils/book.h Utils/compare.h
	@echo "MergesortOpt Test"
	-@rm -rf build/MergesortOpt
	@mkdir build/MergesortOpt
	@cp Sorting/MergesortOpt.cpp build/MergesortOpt
	@cp Sorting/sortmain.cpp build/MergesortOpt
	@cp Utils/book.h build/MergesortOpt
	@cp Utils/compare.h build/MergesortOpt
	cd build/MergesortOpt; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o MergesortOpt.o MergesortOpt.cpp; \
	$(CC) $(CFLAGS) MergesortOpt.o -o MergesortOpt; \
	./MergesortOpt 1000 1000

Quicksort: build/Quicksort/success

build/Quicksort/success: Sorting/Quicksort.cpp Sorting/sortmain.cpp Utils/book.h Utils/compare.h
	@echo "Quicksort Test"
	-@rm -rf build/Quicksort
	@mkdir build/Quicksort
	@cp Sorting/Quicksort.cpp build/Quicksort
	@cp Sorting/sortmain.cpp build/Quicksort
	@cp Utils/book.h build/Quicksort
	@cp Utils/compare.h build/Quicksort
	cd build/Quicksort; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Quicksort.o Quicksort.cpp; \
	$(CC) $(CFLAGS) Quicksort.o -o Quicksort; \
	./Quicksort 1000 1000

Heapsort: build/Heapsort/success

build/Heapsort/success: Sorting/Heapsort.cpp Sorting/sortmain.cpp Utils/book.h Utils/compare.h
	@echo "Heapsort Test"
	-@rm -rf build/Heapsort
	@mkdir build/Heapsort
	@cp Sorting/Heapsort.cpp build/Heapsort
	@cp Sorting/sortmain.cpp build/Heapsort
	@cp Utils/book.h build/Heapsort
	@cp Utils/compare.h build/Heapsort
	cd build/Heapsort; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Heapsort.o Heapsort.cpp; \
	$(CC) $(CFLAGS) Heapsort.o -o Heapsort; \
	./Heapsort 1000 1000
