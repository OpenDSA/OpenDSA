# Run Python code examples
# This isn't quite running unit tests, but the effect should be similar.
PYTHON = python

all: Sorting

clean:
	-rm -rf build
	mkdir build

Demo: UpDown

Sorting: Inssort Bubblesort Selsort

Sorttime: InssortTime BubblesortTime SelsortTime

UpDown: Demo/UpDown.py
	cat Utils/Header.py Demo/UpDown.py > build/UpDown.py
	cd build; python UpDown.py

InssortTime: Utils/Header.py Sorting/SortTime.py Utils/Swap.py Sorting/Insertionsort.py
	cat Utils/Header.py Utils/Swap.py Sorting/Insertionsort.py Sorting/SortTime.py > build/InssortTime.py
	cd build; python InssortTime.py

BubblesortTime: Utils/Header.py Sorting/SortTime.py Utils/Swap.py Sorting/Bubblesort.py
	cat Utils/Header.py Utils/Swap.py Sorting/Bubblesort.py Sorting/SortTime.py > build/BubblesortTime.py
	cd build; python BubblesortTime.py

SelsortTime: Utils/Header.py Sorting/SortTime.py Utils/Swap.py Sorting/Selectionsort.py
	cat Utils/Header.py Utils/Swap.py Sorting/Selectionsort.py Sorting/SortTime.py > build/SelsortTime.py
	cd build; python SelsortTime.py


Inssort: build/InssortTestSuccess

build/InssortTestSuccess: Utils/Header.py Sorting/SortTest.py Utils/Swap.py Sorting/Insertionsort.py
	cat Utils/Header.py Utils/Swap.py Sorting/Insertionsort.py Sorting/SortTest.py> build/InssortTest.py
	cd build; python InssortTest.py

Bubblesort: build/BubblesortTestSuccess

build/BubblesortTestSuccess: Utils/Header.py Sorting/SortTest.py Utils/Swap.py Sorting/Bubblesort.py
	cat Utils/Header.py Utils/Swap.py Sorting/Bubblesort.py Sorting/SortTest.py > build/BubblesortTest.py
	cd build; python BubblesortTest.py

Selsort: build/SelsortTestSuccess

build/SelsortTestSuccess: Utils/Header.py Sorting/SortTest.py Utils/Swap.py Sorting/selectionsort.py
	cat Utils/Header.py Utils/Swap.py Sorting/Selectionsort.py Sorting/SortTest.py > build/SelsortTest.py
	cd build; python SelsortTest.py
