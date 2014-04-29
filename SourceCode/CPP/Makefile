# Standard UNIX
CFLAGS= -s -Wall -O -DUNIX
# Debugging
#CFLAGS= -g -Wall -DUNIX
CC= g++

# Imlicit pattern rule for making .o files from .cpp files
%.o: %.cpp
	$(CC) -c $(CFLAGS) $(CPPFLAGS) -o $@ $<

#### Do the chapters #######################################################

all: sorting

Sorting: Mergesort MergesortOpt

Mergesort: Sorting/Mergesort.o
	$(CC) $(CFLAGS) Sorting/Mergesort.o -o Sorting/Mergesort

MergesortOpt: Sorting/MergesortOpt.o
	$(CC) $(CFLAGS) Sorting/MergesortOpt.o -o Sorting/MergesortOpt
