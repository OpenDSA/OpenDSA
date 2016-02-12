RM = rm -rf
CONFIG_SCRIPT = tools/configure.py
TARGET = build
LINT = eslint
CSSOLDLINTFLAGS = --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units
CSSLINTFLAGS = --quiet --ignore=ids,adjoining-classes
MINIMIZE = uglifyjs

.PHONY: all clean lint csslint jshint min CS2114S215 CS2114F15 CS223 CS5114 CS3114 NewKA CS3114F15 CS3114notes CS150 OpenDSA test testX IS allBooks nomin pull CPSC270S15 CS2401 COP3530 CS208 ECE252 Tutorial TDDD86F15 TDDC91F15 S15 CSCI115 CS316 CSE017F15 CS226JHU

all: alllint

clean:
	- $(RM) *~
	- $(RM) Books
	@# Remove minified JS and CSS files
	- $(RM) lib/*-min.*
	- $(RM) Doc/*~
	- $(RM) Scripts/*~
	- $(RM) config/*~

alllint: csslintAV csslintExe lint lintlib

csslintAV:
	@echo 'running csslint: AVs'
	@csslint $(CSSLINTFLAGS) AV/AlgAnal/*.css
	@csslint $(CSSLINTFLAGS) AV/Background/*.css
	@csslint $(CSSLINTFLAGS) AV/Binary/*.css
	@csslint $(CSSLINTFLAGS) AV/BTRecurTutor/*.css
	@csslint $(CSSLINTFLAGS) AV/Design/*.css
	@csslint $(CSSLINTFLAGS) AV/Files/*.css
	@csslint $(CSSLINTFLAGS) AV/FLA/*.css
	@csslint $(CSSLINTFLAGS) AV/General/*.css
	@csslint $(CSSLINTFLAGS) AV/Graph/*.css
	@csslint $(CSSLINTFLAGS) AV/Hashing/*.css
	@csslint $(CSSLINTFLAGS) AV/Indexing/*.css
	@csslint $(CSSLINTFLAGS) AV/List/*.css
	@csslint $(CSSLINTFLAGS) AV/MemManage/*.css
	@csslint $(CSSLINTFLAGS) AV/PL/*.css
	@csslint $(CSSLINTFLAGS) AV/RecurTutor/*.css
	@csslint $(CSSLINTFLAGS) AV/Searching/*.css
	@csslint $(CSSLINTFLAGS) AV/Sorting/*.css
	@csslint $(CSSLINTFLAGS) AV/Tutorials/*.css
	@csslint $(CSSLINTFLAGS) lib/*.css

csslintExe:
	@echo 'running csslint: Exercises'
	@csslint $(CSSLINTFLAGS) Exercises/AlgAnal/*.css
	@csslint $(CSSLINTFLAGS) Exercises/Background/*.css
	@csslint $(CSSLINTFLAGS) Exercises/Binary/*.css
	@csslint $(CSSLINTFLAGS) Exercises/BTRecurTutor/*.css
	@csslint $(CSSLINTFLAGS) Exercises/Design/*.css
	@csslint $(CSSLINTFLAGS) Exercises/General/*.css
	@csslint $(CSSLINTFLAGS) Exercises/Graph/*.css
	@csslint $(CSSLINTFLAGS) Exercises/Hashing/*.css
	@csslint $(CSSLINTFLAGS) Exercises/Indexing/*.css
	@csslint $(CSSLINTFLAGS) Exercises/List/*.css
	@csslint $(CSSLINTFLAGS) Exercises/PL/*.css
	@csslint $(CSSLINTFLAGS) Exercises/RecurTutor/*.css
	@csslint $(CSSLINTFLAGS) Exercises/Sorting/*.css

lint: lintAV lintExe

lintAV:
	@echo 'linting AVs'
	-@$(LINT) AV/AlgAnal/*.js
	-@$(LINT) AV/Background/*.js
	-@$(LINT) AV/Design/*.js
	-@$(LINT) AV/RecurTutor/*.js

lintAVTODO:
	-@$(LINT) AV/Binary/*.js
	-@$(LINT) AV/BTRecurTutor/*.js
	-@$(LINT) AV/Files/*.js
	-@$(LINT) AV/FLA/*.js
	-@$(LINT) AV/General/*.js
	-@$(LINT) AV/Graph/*.js
	-@$(LINT) AV/Hashing/*.js
	-@$(LINT) AV/Indexing/*.js
	-@$(LINT) AV/List/*.js
	-@$(LINT) AV/MemManage/*.js
	-@$(LINT) AV/PL/*.js
	-@$(LINT) AV/Searching/*.js
	-@$(LINT) AV/Sorting/*.js
	-@$(LINT) AV/Tutorials/*.js

lintExe:
	@echo 'linting KA Exercises'
	-@$(LINT) Exercises/AlgAnal/*.js
	-@$(LINT) Exercises/Background/*.js
	-@$(LINT) Exercises/Binary/*.js
	-@$(LINT) Exercises/BTRecurTutor/*.js
	-@$(LINT) Exercises/Design/*.js
	-@$(LINT) Exercises/General/*.js
	-@$(LINT) Exercises/Graph/*.js
	-@$(LINT) Exercises/Hashing/*.js
	-@$(LINT) Exercises/Indexing/*.js
	-@$(LINT) Exercises/List/*.js
	-@$(LINT) Exercises/PL/*.js
	-@$(LINT) Exercises/RecurTutor/*.js
	-@$(LINT) Exercises/Sorting/*.js

$(LINT)lib:
	@echo 'linting libraries'
	-@$(LINT) lib/conceptMap.js
	-@$(LINT) lib/dataStructures.js
	-@$(LINT) lib/gradebook.js
	-@$(LINT) lib/odsaAV.js
	-@$(LINT) lib/odsaKA.js
	-@$(LINT) lib/odsaMOD.js
	-@$(LINT) lib/odsaUtils.js
	-@$(LINT) lib/registerbook.js

min: nomin
#lib/odsaUtils-min.js lib/site-min.css lib/odsaAV-min.js lib/odsaAV-min.css lib/odsaMOD-min.js lib/odsaMOD-min.css lib/gradebook-min.js lib/gradebook-min.css lib/registerbook-min.js

F15: CS2114 CS3114F15 CS316 TDDD86F15 TDDC91F15 TDDI16F15 CSE017F15 CPSC270 COP3530 CISC-187 CS4104F15 CS226JHU

Pointers: min
	python $(CONFIG_SCRIPT) config/Pointers.json

Tutorial: min
	python $(CONFIG_SCRIPT) config/Tutorial.json

Algorithms: min
	python $(CONFIG_SCRIPT) config/Algorithms.json

TDDD86F15: min
	python $(CONFIG_SCRIPT) config/TDDD86F15.json

TDDC91F15: min
	python $(CONFIG_SCRIPT) config/TDDC91F15.json

TDDI16F15: min
	python $(CONFIG_SCRIPT) config/TDDI16F15.json

good: min
	python $(CONFIG_SCRIPT) config/good.json

RecurTutor: min
	python $(CONFIG_SCRIPT) config/RecurTutor.json

TestRecur: min
	python $(CONFIG_SCRIPT) config/TestRecur.json

BTRecurTutor: min
	python $(CONFIG_SCRIPT) config/BTRecurTutor.json

CS226JHU: min
	python $(CONFIG_SCRIPT) config/CS226JHU.json -o CS226JHUS16

CISC-187: min
	python $(CONFIG_SCRIPT) config/CISC-187.json

CSCI102: min
	python $(CONFIG_SCRIPT) config/CSCI102.json

CSCI115: min
	python $(CONFIG_SCRIPT) config/CSCI115S15.json

CS150: min
	python $(CONFIG_SCRIPT) config/CS150.json

CSE017F15: min
	python $(CONFIG_SCRIPT) config/CSE017F15.json

CPSC270: min
	python $(CONFIG_SCRIPT) config/CPSC270F15.json

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

CS2114SS215: min
	python $(CONFIG_SCRIPT) config/CS2114SS215.json

CS2114: min
	python $(CONFIG_SCRIPT) config/CS2114.json

CS2401: min
	python $(CONFIG_SCRIPT) config/CS2401.json

CS3114: min
	python $(CONFIG_SCRIPT) config/CS3114.json
	# python $(CONFIG_SCRIPT) config/CS3114.json --local

NewKA: min
	python $(CONFIG_SCRIPT) config/NewKA.json

CS3114F15: min
	python $(CONFIG_SCRIPT) config/CS3114F15Cao.json
	python $(CONFIG_SCRIPT) config/CS3114F15Barnette.json

CS3114notes: min
	python $(CONFIG_SCRIPT) -s config/CS3114notes.json

CS3114mynotes: min
	python $(CONFIG_SCRIPT) -s config/CS3114mynotes.json

CS316: min
	python $(CONFIG_SCRIPT) config/CS316.json

COP3530: min
	python $(CONFIG_SCRIPT) config/COP3530F15.json

CS4104F15: min
	python $(CONFIG_SCRIPT) config/CS4104F15.json

CS5114: min
	python $(CONFIG_SCRIPT) config/CS5114S16.json

CS5114S15: min
	python $(CONFIG_SCRIPT) config/CS5114S15.json

DatabaseJoins: min
	python $(CONFIG_SCRIPT) config/DatabaseJoins.json --local

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

PL: min
	python $(CONFIG_SCRIPT) config/PL.json

PL2: min
	python $(CONFIG_SCRIPT) config/PL2.json

uwosh-taylor: min
	python $(CONFIG_SCRIPT) config/uwosh-taylor.json

List: min
	python $(CONFIG_SCRIPT) s config/List.json

Dev: min
	python $(CONFIG_SCRIPT) config/Dev.json

Everything: min
	python $(CONFIG_SCRIPT) config/Everything.json

AlgAnalTest: min
	python $(CONFIG_SCRIPT) config/AlgAnalTest.json

invalid: min
	python $(CONFIG_SCRIPT) config/invalid.json

C2GEN: min
	python $(CONFIG_SCRIPT) config/C2GEN.json

slides: min
	python $(CONFIG_SCRIPT) -s config/slides.json

allBooks: CS208 CS2114 CS2401 CS3114 CS3530 OpenDSA Everything testcmap

nomin:
	@cp JSAV/build/JSAV.js JSAV/build/JSAV-min.js
	@cp lib/odsaUtils.js lib/odsaUtils-min.js
	@cp lib/odsaMOD.js lib/odsaMOD-min.js
	@cp lib/odsaAV.js lib/odsaAV-min.js
	@cp lib/odsaKA.js lib/odsaKA-min.js
	@cp lib/gradebook.js lib/gradebook-min.js
	@cp lib/registerbook.js lib/registerbook-min.js
	@cp lib/site.css lib/site-min.css
	@cat lib/normalize.css lib/odsaAV.css > lib/odsaAV-min.css
	@cp lib/odsaMOD.css lib/odsaMOD-min.css
	@cp lib/odsaStyle.css lib/odsaStyle-min.css
	@cp lib/odsaKA.css lib/odsaKA-min.css
	@cp lib/gradebook.css lib/gradebook-min.css

pull:
	git pull
	git submodule init
	git submodule update
	make -s -C JSAV
	make -s min
	cd Doc; make

lib/odsaUtils-min.js: lib/odsaUtils.js
	@echo 'Minimizing lib/odsaUtils.js'
	@$(MINIMIZE) lib/odsaUtils.js --comments '/^!|@preserve|@license|@cc_on/i' > lib/odsaUtils-min.js

lib/site-min.css: lib/site.css
	@echo 'Minimizing lib/site.css'
	-@$(MINIMIZE) lib/site.css --comments '/^!|@preserve|@license|@cc_on/i' > lib/site-min.css

lib/odsaAV-min.js: lib/odsaAV.js
	@echo 'Minimizing lib/odsaAV.js'
	@$(MINIMIZE) lib/odsaAV.js --comments '/^!|@preserve|@license|@cc_on/i' > lib/odsaAV-min.js

lib/odsaKA-min.js: lib/odsaKA.js
	@echo 'Minimizing lib/odsaKA.js'
	@$(MINIMIZE) lib/odsaKA.js --comments '/^!|@preserve|@license|@cc_on/i' > lib/odsaKA-min.js

lib/odsaAV-min.css: lib/odsaAV.css
	@echo 'Minimizing lib/odsaAV.css'
	@$(MINIMIZE) lib/odsaAV.css --comments '/^!|@preserve|@license|@cc_on/i' > lib/odsaAV-min.css

lib/odsaKA-min.css: lib/odsaKA.css
	@echo 'Minimizing lib/odsaKA.css'
	@$(MINIMIZE) lib/odsaKA.css --comments '/^!|@preserve|@license|@cc_on/i' > lib/odsaKA-min.css

lib/odsaMOD-min.js: lib/odsaMOD.js
	@echo 'Minimizing lib/odsaMOD.js'
	@$(MINIMIZE) lib/odsaMOD.js --comments '/^!|@preserve|@license|@cc_on/i' > lib/odsaMOD-min.js

lib/odsaMOD-min.css: lib/odsaMOD.css
	@echo 'Minimizing lib/odsaMOD.css'
	@$(MINIMIZE) lib/odsaMOD.css --comments '/^!|@preserve|@license|@cc_on/i' > lib/odsaMOD-min.css

lib/gradebook-min.js: lib/gradebook.js
	@echo 'Minimizing lib/gradebook.js'
	@$(MINIMIZE) lib/gradebook.js --comments '/^!|@preserve|@license|@cc_on/i' > lib/gradebook-min.js

lib/gradebook-min.css: lib/gradebook.css
	@echo 'Minimizing lib/gradebook.css'
	@$(MINIMIZE) lib/gradebook.css --comments '/^!|@preserve|@license|@cc_on/i' > lib/gradebook-min.css

lib/registerbook-min.js: lib/registerbook.js
	@echo 'Minimizing lib/registerbook.js'
	@$(MINIMIZE) lib/registerbook.js --comments '/^!|@preserve|@license|@cc_on/i' > lib/registerbook-min.js
