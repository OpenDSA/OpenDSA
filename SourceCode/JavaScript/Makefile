# Run the commandline compiler and runtime for all Processing code.
# This isn't quite running unit tests, but the effect should be similar.
NODE = node
SRC = c:\Cliff\OpenDSA\SourceCode\JavaScript
BUILD = c:/Cliff/OpenDSA/SourceCode/JavaScript/build

all: Sorting

clean:
	-rm -rf build
	mkdir build

Demo: UpDown

Sorting: Inssort


UpDown: Demo/UpDown.js
	cp Demo/UpDown.js $(BUILD)
	node $(BUILD)/UpDown.js

Inssort: Sorting/SortTest.js Sorting/Swap.js Sorting/Insertionsort.js
	cat Sorting/SortTest.js Sorting/Swap.js Sorting/Insertionsort.js > $(BUILD)/InssortTest.js
	node $(BUILD)/InssortTest.js
