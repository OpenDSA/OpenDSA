# Java version of Makefile
JAVA= java
CFLAGS= -Xlint
RFLAGS= 

all: Demo Lists Sorting

clean:
	-rm -rf build
	mkdir build

Demo: UpDown

UpDown: Demo/UpDown.1 Demo/UpDown.2 Utils/Processing.java
	@echo "UpDown Test"
	-@rm -rf build/UpDown
	@mkdir build/UpDown
	cat Demo/UpDown.1 Utils/Processing.java Demo/UpDown.2 > build/UpDown/UpDown.java
	cd build/UpDown; \
	javac $(CFLAGS) UpDown.java; \
	$(JAVA) $(RFLAGS) UpDown

Lists: ListTest StackTest QueueTest

ListTest: build/ListTest/success

build/ListTest/success: Lists/ListTest.java Lists/List.java Lists/AList.java Lists/LList.java Lists/Link.java
	@echo "Array-based and Linked List Test"
	-@rm -rf build/ListTest
	@mkdir build/ListTest
	cp Lists/ListTest.java build/ListTest
	cp Lists/List.java build/ListTest
	cp Lists/AList.java build/ListTest
	cp Lists/LList.java build/ListTest
	cp Lists/Link.java build/ListTest
	cd build/ListTest; \
	javac $(CFLAGS) ListTest.java; \
	$(JAVA) $(RFLAGS) ListTest

StackTest: build/StackTest/success

build/StackTest/success: Lists/Stack.java Lists/AStack.java Lists/Link.java Lists/LStack.java Lists/StackTest.java
	@echo "Array-based and Linked Stack Test"
	-@rm -rf build/StackTest
	@mkdir build/StackTest
	@cp Lists/Stack.java build/StackTest
	@cp Lists/AStack.java build/StackTest
	@cp Lists/LStack.java build/StackTest
	@cp Lists/Link.java build/StackTest
	@cp Lists/StackTest.java build/StackTest
	cd build/StackTest; \
	javac $(CFLAGS) StackTest.java; \
	$(JAVA) $(RFLAGS) StackTest

QueueTest: build/QueueTest/success

build/QueueTest/success: Lists/Queue.java Lists/AQueue.java Lists/Link.java Lists/LQueue.java Lists/QueueTest.java
	@echo "Array-based and Linked Queue Test"
	-@rm -rf build/QueueTest
	@mkdir build/QueueTest
	@cp Lists/Queue.java build/QueueTest
	@cp Lists/AQueue.java build/QueueTest
	@cp Lists/LQueue.java build/QueueTest
	@cp Lists/Link.java build/QueueTest
	@cp Lists/QueueTest.java build/QueueTest
	cd build/QueueTest; \
	javac $(CFLAGS) QueueTest.java; \
	$(JAVA) $(RFLAGS) QueueTest


Sorting: Inssort Bubblesort Selsort

Sorttime: InssortTime BubblesortTime SelsortTime

Inssort: build/InssortTest/success

build/InssortTest/success: Sorting/Insertionsort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Processing.java
	@echo "Insertionsort Test"
	-@rm -rf build/InssortTest
	@mkdir build/InssortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Processing.java Sorting/Insertionsort.java Sorting/SortTest.2 > build/InssortTest/SortTest.java
	cd build/InssortTest; \
	javac $(CFLAGS) SortTest.java; \
	$(JAVA) $(RFLAGS) SortTest

Bubblesort: build/BubblesortTest/success

build/BubblesortTest/success: Sorting/Bubblesort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Processing.java
	@echo "Bubblesort Test"
	-@rm -rf build/BubblesortTest
	@mkdir build/BubblesortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Processing.java Sorting/Bubblesort.java Sorting/SortTest.2 > build/BubblesortTest/SortTest.java
	cd build/BubblesortTest; \
	javac $(CFLAGS) SortTest.java; \
	$(JAVA) $(RFLAGS) SortTest

Selsort: build/SelsortTest/success

build/SelsortTest/success: Sorting/Selectionsort.java Sorting/SortTest.1 Sorting/SortTest.2 Utils/Swap.java Utils/Processing.java
	@echo "Selectionsort Test"
	-@rm -rf build/SelsortTest
	@mkdir build/SelsortTest
	cat Sorting/SortTest.1 Utils/Swap.java Utils/Processing.java Sorting/Selectionsort.java Sorting/SortTest.2 > build/SelsortTest/SortTest.java
	cd build/SelsortTest; \
	javac $(CFLAGS) SortTest.java; \
	$(JAVA) $(RFLAGS) SortTest

InssortTime: Sorting/Insertionsort.java Sorting/SortTime.1 Sorting/SortTime.2 Utils/Swap.java Utils/Processing.java
	@echo "Inssort Timing Test"
	-@rm -rf build/InssortTime
	@mkdir build/InssortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Processing.java Sorting/Insertionsort.java Sorting/SortTime.2 > build/InssortTime/SortTime.java
	cd build/InssortTime; \
	javac $(CFLAGS) SortTime.java; \
	$(JAVA) $(RFLAGS) SortTime

BubblesortTime: Sorting/Bubblesort.java Sorting/SortTime.1 Sorting/SortTime.2 Utils/Swap.java Utils/Processing.java
	@echo "Bubble Sort Timing Test"
	-@rm -rf build/BubblesortTime
	@mkdir build/BubblesortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Processing.java Sorting/Bubblesort.java Sorting/SortTime.2 > build/BubblesortTime/SortTime.java
	cd build/BubblesortTime; \
	javac $(CFLAGS) SortTime.java; \
	$(JAVA) $(RFLAGS) SortTime

SelsortTime: Sorting/Selectionsort.java Sorting/SortTime.1 Sorting/SortTime.2 Utils/Swap.java Utils/Processing.java
	@echo "Selection Sort Timing Test"
	-@rm -rf build/SelsortTime
	@mkdir build/SelsortTime
	cat Sorting/SortTime.1 Utils/Swap.java Utils/Processing.java Sorting/Selectionsort.java Sorting/SortTime.2 > build/SelsortTime/SortTime.java
	cd build/SelsortTime; \
	javac $(CFLAGS) SortTime.java; \
	$(JAVA) $(RFLAGS) SortTime
