RM = rm -rf
CONFIG_SCRIPT = tools/configure.py
TARGET = build
CSSOLDLINTFLAGS = --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units
CSSLINTFLAGS = --quiet --ignore=ids,adjoining-classes
MINIMIZE = java -jar tools/yuicompressor-2.4.7.jar --nomunge

.PHONY: all clean lint csslint jshint min CS2114 CS223 CS5114 CS3114 CS3114notes CS150 OpenDSA test testX IS allBooks nomin pull CPSC270S15 CS2401 COP3530 CS208 ECE252 Tutorial TDDD86_2014 S15 CSCI115

all: lint

clean:
	- $(RM) *~
	- $(RM) Books
	@# Remove minified JS and CSS files
	- $(RM) lib/*-min.*
	- $(RM) Doc/*~
	- $(RM) Scripts/*~
	- $(RM) config/*~

lint: csslint jshint

csslint:
	@echo 'running csslint'
	@csslint $(CSSLINTFLAGS) AV/Background/*.css
	@csslint $(CSSLINTFLAGS) AV/Design/*.css
	@csslint $(CSSLINTFLAGS) AV/List/*.css
	@csslint $(CSSLINTFLAGS) AV/Sorting/*.css
	@csslint $(CSSLINTFLAGS) AV/Hashing/*.css
	@csslint $(CSSLINTFLAGS) AV/Searching/*.css
	#@csslint $(CSSLINTFLAGS) AV/*.css
	@csslint $(CSSLINTFLAGS) Doc/*.css
	@csslint $(CSSLINTFLAGS) lib/*.css

jshint:
	@echo 'running jshint'
	-@jshint AV/Background/*.js
	-@jshint AV/Design/*.js
	-@jshint AV/Design/*.json
	-@jshint AV/List/*.js
	-@jshint AV/List/*.json
	-@jshint AV/Sorting/*.js
	-@jshint AV/Sorting/*.json
	-@jshint AV/Hashing/*.js
	-@jshint AV/Hashing/*.json
	-@jshint AV/Searching/*.js
	-@jshint AV/Searching/*.json
	-@jshint Exercises/Hashing/*.js
	-@jshint lib/odsaUtils.js
	-@jshint lib/odsaAV.js
	-@jshint lib/odsaMOD.js
	-@jshint lib/gradebook.js
	-@jshint lib/registerbook.js
	-@jshint lib/conceptMap.js

min: nomin
#lib/odsaUtils-min.js lib/site-min.css lib/odsaAV-min.js lib/odsaAV-min.css lib/odsaMOD-min.js lib/odsaMOD-min.css lib/gradebook-min.js lib/gradebook-min.css lib/registerbook-min.js

S15: CS2114 ECE252 CPSC270 CSCI204 CS3114 RecurTutor CSCI115 uwosh-pl

Tutorial: min
	python $(CONFIG_SCRIPT) config/Tutorial.json

TDDD86_2014: min
	python $(CONFIG_SCRIPT) config/TDDD86_2014.json

good: min
	python $(CONFIG_SCRIPT) config/good.json

RecurTutor: min
	python $(CONFIG_SCRIPT) config/RecurTutor.json

RecurTutor2: min
	python $(CONFIG_SCRIPT) config/RecurTutor2.json

CSCI102: min
	python $(CONFIG_SCRIPT) config/CSCI102.json

CSCI115: min
	python $(CONFIG_SCRIPT) config/CSCI115S15.json

CS150: min
	python $(CONFIG_SCRIPT) config/CS150.json

CPSC270: min
	python $(CONFIG_SCRIPT) config/CPSC270S15Siochi.json
	python $(CONFIG_SCRIPT) config/CPSC270S15Flores.json

CSCI204: min
	python $(CONFIG_SCRIPT) config/CSCI204S15.json

CS208: min
	python $(CONFIG_SCRIPT) config/CS208.json

CS223: min
	python $(CONFIG_SCRIPT) config/CS223.json

CSE-A1140: min
	python $(CONFIG_SCRIPT) config/CSE-A1140.json

CSE-A1141: min
	python $(CONFIG_SCRIPT) config/CSE-A1141.json

CSE-A1141eng: min
	python $(CONFIG_SCRIPT) config/CSE-A1141eng.json

CS2114: min
	python $(CONFIG_SCRIPT) config/CS2114.json

CS2401: min
	python $(CONFIG_SCRIPT) config/CS2401.json

CS3114: min
	python $(CONFIG_SCRIPT) config/CS3114.json

CS3114AM: min
	python $(CONFIG_SCRIPT) config/CS3114AM.json

CS3114PM: min
	python $(CONFIG_SCRIPT) config/CS3114PM.json

CS3114notes: min
	python $(CONFIG_SCRIPT) s config/CS3114notes.json

COP3530: min
	python $(CONFIG_SCRIPT) config/COP3530.json

CS5114: min
	python $(CONFIG_SCRIPT) config/CS5114.json

ECE252: min
	python $(CONFIG_SCRIPT) config/ECE252S15.json

OpenDSA: min
	python $(CONFIG_SCRIPT) config/OpenDSA.json

IS: min
	python $(CONFIG_SCRIPT) config/IS.json

NP: min
	python $(CONFIG_SCRIPT) config/NP.json

test: min
	python $(CONFIG_SCRIPT) config/test.json

testX: min
	python $(CONFIG_SCRIPT) config/testX.json

testcmap: min
	python $(CONFIG_SCRIPT) config/testcmap.json

testanal: min
	python $(CONFIG_SCRIPT) config/testanal.json	

testfi: min
	python $(CONFIG_SCRIPT) config/testfi.json

testpt: min
	python $(CONFIG_SCRIPT) config/testpt.json

testsv: min
	python $(CONFIG_SCRIPT) config/testsv.json

testcpp: min
	python $(CONFIG_SCRIPT) config/testcpp.json

uwosh: min
	python $(CONFIG_SCRIPT) config/uwosh.json

uwosh-pl: min
	python $(CONFIG_SCRIPT) config/uwosh-pl.json

List: min
	python $(CONFIG_SCRIPT) s config/List.json

Dev: min
	python $(CONFIG_SCRIPT) config/Dev.json

Everything: min
	python $(CONFIG_SCRIPT) config/Everything.json

invalid: min
	python $(CONFIG_SCRIPT) config/invalid.json

slides: min
	python $(CONFIG_SCRIPT) -s config/slides.json

allBooks: CS208 CS2114 CS2401 CS3114 CS3530 OpenDSA Everything testcmap

nomin:
	@cp JSAV/build/JSAV.js JSAV/build/JSAV-min.js
	@cp lib/odsaUtils.js lib/odsaUtils-min.js
	@cp lib/odsaMOD.js lib/odsaMOD-min.js
	@cp lib/odsaAV.js lib/odsaAV-min.js
	@cp lib/gradebook.js lib/gradebook-min.js
	@cp ODSAkhan-exercises/khan-exercise.js lib/khan-exercise-min.js
	@cp lib/registerbook.js lib/registerbook-min.js
	@cp lib/site.css lib/site-min.css
	@cat lib/normalize.css lib/odsaAV.css > lib/odsaAV-min.css
	@cp lib/odsaMOD.css lib/odsaMOD-min.css
	@cp lib/odsaStyle.css lib/odsaStyle-min.css
	@cp lib/gradebook.css lib/gradebook-min.css

pull:
	git pull
	git submodule update
	make -s -C JSAV
	make -s min
	cd Doc; make

lib/odsaUtils-min.js: lib/odsaUtils.js
	@echo 'Minimizing lib/odsaUtils.js'
	@$(MINIMIZE) lib/odsaUtils.js -o lib/odsaUtils-min.js

lib/site-min.css: lib/site.css
	@echo 'Minimizing lib/site.css'
	-@$(MINIMIZE) lib/site.css -o lib/site-min.css

lib/odsaAV-min.js: lib/odsaAV.js
	@echo 'Minimizing lib/odsaAV.js'
	@$(MINIMIZE) lib/odsaAV.js -o lib/odsaAV-min.js

lib/odsaAV-min.css: lib/odsaAV.css
	@echo 'Minimizing lib/odsaAV.css'
	@$(MINIMIZE) lib/odsaAV.css -o lib/odsaAV-min.css

lib/odsaMOD-min.js: lib/odsaMOD.js
	@echo 'Minimizing lib/odsaMOD.js'
	@$(MINIMIZE) lib/odsaMOD.js -o lib/odsaMOD-min.js

lib/odsaMOD-min.css: lib/odsaMOD.css
	@echo 'Minimizing lib/odsaMOD.css'
	@$(MINIMIZE) lib/odsaMOD.css -o lib/odsaMOD-min.css

lib/gradebook-min.js: lib/gradebook.js
	@echo 'Minimizing lib/gradebook.js'
	@$(MINIMIZE) lib/gradebook.js -o lib/gradebook-min.js

lib/gradebook-min.css: lib/gradebook.css
	@echo 'Minimizing lib/gradebook.css'
	@$(MINIMIZE) lib/gradebook.css -o lib/gradebook-min.css

lib/registerbook-min.js: lib/registerbook.js
	@echo 'Minimizing lib/registerbook.js'
	@$(MINIMIZE) lib/registerbook.js -o lib/registerbook-min.js
