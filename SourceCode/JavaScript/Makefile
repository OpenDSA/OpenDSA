# Run JavaScript code examples using node.js
# This isn't quite running unit tests, but the effect should be similar.
NODE = node

all: Sorting

clean:
	-rm -rf build
	mkdir build

Demo: UpDown

Sorting: Inssort Bubblesort Selsort

Sorttime: InssortTime BubblesortTime SelsortTime

UpDown: Demo/UpDown.js
	cp Demo/UpDown.js build
	cd build; node UpDown.js

InssortTime: Utils/Strict.js Sorting/SortTime.js Utils/Swap.js Sorting/Insertionsort.js
	cat Utils/Strict.js Utils/Swap.js Sorting/Insertionsort.js Sorting/SortTime.js> build/InssortTime.js
	cd build; node InssortTime.js

BubblesortTime: Utils/Strict.js Sorting/SortTime.js Utils/Swap.js Sorting/Bubblesort.js
	cat Utils/Strict.js Utils/Swap.js Sorting/Bubblesort.js Sorting/SortTime.js> build/BubblesortTime.js
	cd build; node BubblesortTime.js

SelsortTime: Utils/Strict.js Sorting/SortTime.js Utils/Swap.js Sorting/Selectionsort.js
	cat Utils/Strict.js Utils/Swap.js Sorting/Selectionsort.js Sorting/SortTime.js> build/SelsortTime.js
	cd build; node SelsortTime.js


Inssort: build/InssortTestSuccess

build/InssortTestSuccess: Utils/Strict.js Sorting/SortTest.js Utils/Swap.js Sorting/Insertionsort.js
	cat Utils/Strict.js Sorting/SortTest.js Utils/Swap.js Sorting/Insertionsort.js > build/InssortTest.js
	cd build; node InssortTest.js

Bubblesort: build/BubblesortTestSuccess

build/BubblesortTestSuccess: Utils/Strict.js Sorting/SortTest.js Utils/Swap.js Sorting/Bubblesort.js
	cat Utils/Strict.js Sorting/SortTest.js Utils/Swap.js Sorting/Bubblesort.js > build/BubblesortTest.js
	cd build; node BubblesortTest.js

Selsort: build/SelsortTestSuccess

build/SelsortTestSuccess: Utils/Strict.js Sorting/SortTest.js Utils/Swap.js Sorting/selectionsort.js
	cat Utils/Strict.js Sorting/SortTest.js Utils/Swap.js Sorting/Selectionsort.js > build/SelsortTest.js
	cd build; node SelsortTest.js
