# Java version of Makefile to do sorting timings
# CFLAGS= -Xlint -Werror
CFLAGS= -cp "jmh-core-1.37.jar;jopt-simple-4.6.jar" -processorpath "jmh-generator-annprocess-1.37.jar;jmh-core-1.37.jar" -d .
RFLAGS= -cp ".;jmh-core-1.37.jar;jopt-simple-4.6.jar;commons-math3-3.6.1.jar" org.openjdk.jmh.Main

all: SortTime

# Should only need to do this one time when initially setting up
# a new installation
setup: jars build

build:
	@mkdir build

# Get the necessary .jar files when running from the command line with no infrastructure support. Should only need to do this one time.
jars: commons-math3-3.6.1.jar jmh-generator-annprocess-1.37.jar jmh-core-1.37.jar jopt-simple-4.6.jar
	curl - L -O https://repo1.maven.org/maven2/org/openjdk/jmh/jmh-core/1.37/jmh-core-1.37.jar
	curl -L -O https://repo1.maven.org/maven2/org/openjdk/jmh/jmh-generator-annprocess/1.37/jmh-generator-annprocess-1.37.jar
	curl -L -O https://repo1.maven.org/maven2/net/sf/jopt-simple/jopt-simple/4.6/jopt-simple-4.6.jar
	curl -L -O https://repo1.maven.org/maven2/org/apache/commons/commons-math3/3.6.1/commons-math3-3.6.1.jar

demo: TimeDemo.java
	@echo "Demonstration Timing Test"
	-@mkdir build/demo
	cp TimeDemo.java build/demo
	javac $(CFLAGS) build/demo/TimeDemo.java
	java $(RFLAGS) build.demo.TimeDemo

SortTime: inssort inssortinstrument inssortinline inssortshift bubsort bubsortcheck bubsortcheck2 bubwikipedia bubunwikipedia bubwikipedia2 selsort selsortcheck shellsort mergesort mergesortopt quicksort quicksortopt heapsort radix radixopt radixlink radixlinkopt

SortTimeProd: shellsort mergesort mergesortopt quicksort quicksortopt heapsort radix radixopt radixlink radixlinkopt inssort inssortshift bubsort bubwikipedia bubwikipedia2 selsort

inssort: Timeinssort.java
	@echo "Basic Insertionsort Timing Test"
	-@mkdir build/inssort
	cp Timeinssort.java build/inssort
	javac $(CFLAGS) build/inssort/Timeinssort.java
	java $(RFLAGS) build.inssort.Timeinssort

inssortinstrument: Timeinssortinstrument.java
	@echo "Instrumented Basic Insertionsort Timing Test"
	-@mkdir build/inssortinstrument
	cp Timeinssortinstrument.java build/inssortinstrument
	javac $(CFLAGS) build/inssortinstrument/Timeinssortinstrument.java
	java $(RFLAGS) build.inssortinstrument.Timeinssortinstrument

inssortinline: Timeinssortinline.java
	@echo "Basic Insertionsort with Inlined Swaps Timing Test"
	-@mkdir build/inssortinline
	cp Timeinssortinline.java build/inssortinline
	javac $(CFLAGS) build/inssortinline/Timeinssortinline.java
	java $(RFLAGS) build.inssortinline.Timeinssortinline

inssortshift: Timeinssortshift.java
	@echo "Shifting Insertionsort Timing Test"
	-@mkdir build/inssortshift
	cp Timeinssortshift.java build/inssortshift
	javac $(CFLAGS) build/inssortshift/Timeinssortshift.java
	java $(RFLAGS) build.inssortshift.Timeinssortshift

bubsort: Timebubsort.java
	@echo "Basic Bubblesort Timing Test"
	-@mkdir build/bubsort
	cp Timebubsort.java build/bubsort
	javac $(CFLAGS) build/bubsort/Timebubsort.java
	java $(RFLAGS) build.bubsort.Timebubsort

bubsortcheck: Timebubsortcheck.java
	@echo "Bubblesort with check flag Timing Test"
	-@mkdir build/bubsortcheck
	cp Timebubsortcheck.java build/bubsortcheck
	javac $(CFLAGS) build/bubsortcheck/Timebubsortcheck.java
	java $(RFLAGS) build.bubsortcheck.Timebubsortcheck

bubsortcheck2: Timebubsortcheck2.java
	@echo "Bubblesort with check flag last swap only Timing Test"
	-@mkdir build/bubsortcheck2
	cp Timebubsortcheck2.java build/bubsortcheck2
	javac $(CFLAGS) build/bubsortcheck2/Timebubsortcheck2.java
	java $(RFLAGS) build.bubsortcheck2.Timebubsortcheck2

bubwikipedia: Timebubwikipedia.java
	@echo "Bubblesort: Wikipedia version Timing Test"
	-@mkdir build/bubwikipedia
	cp Timebubwikipedia.java build/bubwikipedia
	javac $(CFLAGS) build/bubwikipedia/Timebubwikipedia.java
	java $(RFLAGS) build.bubwikipedia.Timebubwikipedia

bubunwikipedia: Timebubunwikipedia.java
	@echo "Bubblesort: Standard wikipedia-like version Timing Test"
	-@mkdir build/bubunwikipedia
	cp Timebubunwikipedia.java build/bubunwikipedia
	javac $(CFLAGS) build/bubunwikipedia/Timebubunwikipedia.java
	java $(RFLAGS) build.bubunwikipedia.Timebubunwikipedia

bubwikipedia2: Timebubwikipedia2.java
	@echo "Bubblesort: Wikipedia version 2 (for loop) Timing Test"
	-@mkdir build/bubwikipedia2
	cp Timebubwikipedia2.java build/bubwikipedia2
	javac $(CFLAGS) build/bubwikipedia2/Timebubwikipedia2.java
	java $(RFLAGS) build.bubwikipedia2.Timebubwikipedia2

selsort: Timeselsort.java
	@echo "Basic Selectionsort Timing Test"
	-@mkdir build/selsort
	cp Timeselsort.java build/selsort
	javac $(CFLAGS) build/selsort/Timeselsort.java
	java $(RFLAGS) build.selsort.Timeselsort

selsortcheck: Timeselsortcheck.java
	@echo "Basic Selectionsort with Check Timing Test"
	-@mkdir build/selsortcheck
	cp Timeselsortcheck.java build/selsortcheck
	javac $(CFLAGS) build/selsortcheck/Timeselsortcheck.java
	java $(RFLAGS) build.selsortcheck.Timeselsortcheck

shellsort: Timeshellsort.java
	@echo "Basic Shellsort Timing Test"
	-@mkdir build/shellsort
	cp Timeshellsort.java build/shellsort
	javac $(CFLAGS) build/shellsort/Timeshellsort.java
	java $(RFLAGS) build.shellsort.Timeshellsort

mergesort: Timemergesort.java
	@echo "Basic Mergesort Timing Test"
	-@mkdir build/mergesort
	cp Timemergesort.java build/mergesort
	javac $(CFLAGS) build/mergesort/Timemergesort.java
	java $(RFLAGS) build.mergesort.Timemergesort

mergesortopt: Timemergesortopt.java
	@echo "Optimzed Mergesort Timing Test"
	-@mkdir build/mergesortopt
	cp Timemergesortopt.java build/mergesortopt
	javac $(CFLAGS) build/mergesortopt/Timemergesortopt.java
	java $(RFLAGS) build.mergesortopt.Timemergesortopt

quicksort: Timequicksort.java
	@echo "Basic Quicksort Timing Test"
	-@mkdir build/quicksort
	cp Timequicksort.java build/quicksort
	javac $(CFLAGS) build/quicksort/Timequicksort.java
	java $(RFLAGS) build.quicksort.Timequicksort

quicksortopt: Timequicksortopt.java
	@echo "Optimized Quicksort Timing Test"
	-@mkdir build/quicksortopt
	cp Timequicksortopt.java build/quicksortopt
	javac $(CFLAGS) build/quicksortopt/Timequicksortopt.java
	java $(RFLAGS) build.quicksortopt.Timequicksortopt

heapsort: Timeheapsort.java
	@echo "Basic Heapsort Timing Test"
	-@mkdir build/heapsort
	cp Timeheapsort.java build/heapsort
	javac $(CFLAGS) build/heapsort/Timeheapsort.java
	java $(RFLAGS) build.heapsort.Timeheapsort

radix: Timeradix.java
	@echo "Basic Radix Sort Timing Test"
	-@mkdir build/radix
	cp Timeradix.java build/radix
	javac $(CFLAGS) build/radix/Timeradix.java
	java $(RFLAGS) build.radix.Timeradix

radixopt: Timeradixopt.java
	@echo "Optimized Radix Sort Timing Test"
	-@mkdir build/radixopt
	cp Timeradixopt.java build/radixopt
	javac $(CFLAGS) build/radixopt/Timeradixopt.java
	java $(RFLAGS) build.radixopt.Timeradixopt

radixlink: Timeradixlink.java
	@echo "Basic Linked-list Radix Sort Timing Test"
	-@mkdir build/radixlink
	cp Timeradixlink.java build/radixlink
	javac $(CFLAGS) build/radixlink/Timeradixlink.java
	java $(RFLAGS) build.radixlink.Timeradixlink

radixlinkopt: Timeradixlinkopt.java
	@echo "Optimized Linked-list Radix Sort Timing Test"
	-@mkdir build/radixlinkopt
	cp Timeradixlinkopt.java build/radixlinkopt
	javac $(CFLAGS) build/radixlinkopt/Timeradixlinkopt.java
	java $(RFLAGS) build.radixlinkopt.Timeradixlinkopt
