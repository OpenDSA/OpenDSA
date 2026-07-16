# Java version of Makefile
# CFLAGS= -Xlint -Werror
CFLAGS= -cp "jmh-core-1.37.jar;jopt-simple-4.6.jar" -processorpath "jmh-generator-annprocess-1.37.jar;jmh-core-1.37.jar" -d .
RFLAGS= -cp ".;jmh-core-1.37.jar;jopt-simple-4.6.jar;commons-math3-3.6.1.jar" org.openjdk.jmh.Main

all: inssortTime

# Get the necessary .jar files when running from the command line with no infrastructure support. Should only need to do this one time.
jars:
	curl - L-O https://repo1.maven.org/maven2/org/openjdk/jmh/jmh-core/1.37/jmh-core-1.37.jar
	curl -L -O https://repo1.maven.org/maven2/org/openjdk/jmh/jmh-generator-annprocess/1.37/jmh-generator-annprocess-1.37.jar
	curl -L -O https://repo1.maven.org/maven2/net/sf/jopt-simple/jopt-simple/4.6/jopt-simple-4.6.jar
	curl -L -O https://repo1.maven.org/maven2/org/apache/commons/commons-math3/3.6.1/commons-math3-3.6.1.jar

SortTime: InssortTime BubblesortTime SelsortTime ShellsortTime MergesortTime QuicksortTime HeapsortTime RadixsortTime

demo: TimeDemo.java
	@echo "Demonstration Timing Test"
	@mkdir build/demo
	cp TimeDemo.java build/demo
	javac $(CFLAGS) build/demo/TimeDemo.java
	java $(RFLAGS) build.demo.TimeDemo

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
