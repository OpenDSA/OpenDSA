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

Sorting: Inssort Mergesort MergesortOpt

Inssort: build/InssortTest/success

build/InssortTest/success: Sorting/Insertionsort.cpp build/InssortTest/Insertionsort.o
	@echo "Inssort Test"
	-@rm -rf build/InssortTest
	@mkdir build/InssortTest
	@cp Sorting/Insertionsort.cpp build/InssortTest
	$(CC) $(CFLAGS) build/InssortTest/Insertionsort.o -o build/InssortTest/Insertionsort.o
	build/InssortTest/Insertionsort

Mergesort: build/Mergesort/success

build/Mergesort/success: Sorting/Mergesort.cpp Sorting/sortmain.cpp book.h compare.h
	@echo "Mergesort Test"
	-@rm -rf build/Mergesort
	@mkdir build/Mergesort
	@cp Sorting/Mergesort.cpp build/Mergesort
	@cp Sorting/sortmain.cpp build/Mergesort
	@cp book.h build/Mergesort
	@cp compare.h build/Mergesort
	cd build/Mergesort; \
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o Mergesort.o Mergesort.cpp; \
	$(CC) $(CFLAGS) Mergesort.o -o Mergesort; \
	./Mergesort 1000 1000

MergesortOpt: Sorting/MergesortOpt.o
	$(CC) $(CFLAGS) Sorting/MergesortOpt.o -o Sorting/MergesortOpt
