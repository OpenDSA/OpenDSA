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

Sorting: Inssort

Inssort: build/InssortTest/success

build/InssortTest/success: build Insertionsort.java SortTest.1 SortTest.2 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java ../Utils/KVPair.java
	@echo "Insertionsort Test"
	-@rm -rf build/InssortTest
	@mkdir build/InssortTest
	cat SortTest.1 ../Utils/Swap.java ../Utils/Processing.java ../Utils/Checkorder.java Insertionsort.java SortTest.2 > build/InssortTest/SortTest.java
	cp ../Utils/KVPair.java build/InssortTest
	cd build/InssortTest; \
	javac $(CFLAGS) SortTest.java; \
	$(JAVA) $(RFLAGS) SortTest > Inssort.csv
