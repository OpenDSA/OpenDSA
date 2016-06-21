# Makefile for sorting tests
JAVA= java
CFLAGS= -Xlint
RFLAGS= 

all: Insertionsort

clean:
	-rm -rf build
	mkdir build

build:
	mkdir build

Insertionsort: build
	@echo "Timing tests for insertionsort"
	-@rm -rf build/Insertionsort
	@mkdir build/Insertionsort
	cat SortTime.1 Insertionsort.java SortTime.2 > build/Insertionsort/SortTime.java
	cd build/Insertionsort; \
	javac $(CFLAGS) SortTime.java; \
	$(JAVA) $(RFLAGS) SortTime
