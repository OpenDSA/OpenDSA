ifeq ($(OS),Windows_NT)
	SHELL=C:/Windows/System32/cmd.exe
endif
RM = rm -rf
CONFIG_SCRIPT = tools/configure.py
TARGET = build
LINT = eslint --no-color
CSSOLDLINTFLAGS = --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units
CSSLINTFLAGS = --quiet --ignore=ids,adjoining-classes
MINIMIZE = uglifyjs

.PHONY: all clean alllint csslint lint lintExe jsonlint min testLTI Test TestLMS

all: alllint


allbooks: Everything Test CS2 CS3 RecurTutor PL

clean:
	- $(RM) *~
	- $(RM) Books
	@# Remove minified JS and CSS files
	- $(RM) lib/*-min.*
	- $(RM) Doc/*~
	- $(RM) Scripts/*~
	- $(RM) config/*~

alllint: csslint lint jsonlint

csslint:
	@echo 'running csslint'
	@csslint $(CSSLINTFLAGS) AV/Background/*.css
	@csslint $(CSSLINTFLAGS) AV/Design/*.css

TODOcsslint:
	@csslint $(CSSLINTFLAGS) AV/List/*.css
	@csslint $(CSSLINTFLAGS) AV/Sorting/*.css
	@csslint $(CSSLINTFLAGS) AV/Hashing/*.css
	@csslint $(CSSLINTFLAGS) AV/Searching/*.css
	#@csslint $(CSSLINTFLAGS) AV/*.css
	@csslint $(CSSLINTFLAGS) Doc/*.css
	@csslint $(CSSLINTFLAGS) lib/*.css

lint: lintExe
	@echo 'running eslint'
	-@$(LINT) AV/Background/*.js
	-@$(LINT) AV/Design/*.js

TODOlintAV:
	@echo 'linting AVs'
	-@$(LINT) AV/Binary/*.js
	-@$(LINT) AV/General/*.js
	-@$(LINT) AV/List/*.js
	-@$(LINT) AV/Sorting/*.js
	-@$(LINT) AV/Hashing/*.js
	-@$(LINT) AV/Searching/*.js
	-@$(LINT) AV/Sorting/*.js

lintExe:
	@echo 'linting KA Exercises'
	-@$(LINT) Exercises/AlgAnal/*.js
	-@$(LINT) Exercises/Background/*.js
	-@$(LINT) Exercises/Binary/*.js
	-@$(LINT) Exercises/Design/*.js
	-@$(LINT) Exercises/General/*.js
	-@$(LINT) Exercises/Graph/*.js
	-@$(LINT) Exercises/Hashing/*.js
	-@$(LINT) Exercises/Indexing/*.js
	-@$(LINT) Exercises/List/*.js
	-@$(LINT) Exercises/RecurTutor/*.js
	-@$(LINT) Exercises/RecurTutor2/*.js
	-@$(LINT) Exercises/Sorting/*.js

TODO$(LINT)lib:
	@echo 'linting libraries'
	-@$(LINT) lib/odsaUtils.js
	-@$(LINT) lib/odsaAV.js
	-@$(LINT) lib/odsaMOD.js
	-@$(LINT) lib/gradebook.js
	-@$(LINT) lib/registerbook.js
	-@$(LINT) lib/createcourse.js
	-@$(LINT) lib/conceptMap.js

jsonlint:
	@jsonlint -q AV/Background/*.json
	@jsonlint -q AV/Design/*.json
	@jsonlint -q config/*.json
	@jsonlint -q config/Old/*.json

min: nomin
#lib/odsaUtils-min.js lib/site-min.css lib/odsaAV-min.js lib/odsaAV-min.css lib/odsaMOD-min.js lib/odsaMOD-min.css lib/gradebook-min.js lib/gradebook-min.css lib/registerbook-min.js

testLTI: min
	# python $(CONFIG_SCRIPT) config/testLTI.json
	# python $(CONFIG_SCRIPT) config/testLTI.json -b testLTI_HS1
	# python $(CONFIG_SCRIPT) config/testLTI.json -c config/testLTI_LMSconf.json
	python $(CONFIG_SCRIPT) config/testLTI.json -c config/testLTI_LMSconf_local.json
	# python $(CONFIG_SCRIPT) config/testLTI.json -c config/testLTI_LMSconf.json -b testLTI_HS2

S16: ECE252 Indiain CSCI204 CSE017 CPSC270 CS316 CS3in CS2114vt 

Test: min
	python $(CONFIG_SCRIPT) config/Test.json -c config/Test_LMSconf.json

Testvt: min
	python $(CONFIG_SCRIPT) config/Test.json -c config/Testvt_LMSconf.json -b Testvt

Testin: min
	python $(CONFIG_SCRIPT) config/Test.json -c config/Testin_LMSconf.json -b Testin

testcmap: min
	python $(CONFIG_SCRIPT) config/testcmap.json -b testcmap

testcmapin: min
	python $(CONFIG_SCRIPT) config/testcmap.json -c config/testcmapin_LMSconf.json -b testcmapin

RecurTutor: min
	python $(CONFIG_SCRIPT) config/RecurTutor.json -b RecurTutor

RecurTutorvt: min
	python $(CONFIG_SCRIPT) config/RecurTutor.json -c config/RecurTutorvt_LMSconf.json -b RecurTutorvt

RecurTutorin: min
	python $(CONFIG_SCRIPT) config/RecurTutor.json -c config/RecurTutorin_LMSconf.json -b RecurTutorin

Everything: min
	python $(CONFIG_SCRIPT) config/Everything.json

Everythingin: min
	python $(CONFIG_SCRIPT) config/Everything.json -c config/Everythingin_LMSconf.json -b Everythingin

Everythingvtt: min
	python $(CONFIG_SCRIPT) config/Everything.json -c config/Everythingvtt_LMSconf.json -b Everythingvtt

CS2: min
	python $(CONFIG_SCRIPT) config/CS2.json

CS2114vt: min
	python $(CONFIG_SCRIPT) config/CS2.json -c config/CS2114vt_LMSconf.json -b CS2114S16

CS2in: min
	python $(CONFIG_SCRIPT) config/CS2.json -c config/CS2in_LMSconf.json -b CS2in

CSE017: min
	python $(CONFIG_SCRIPT) config/CSE017.json -c config/CSE017in_LMSconf.json -b CSE017S16

CS3: min
	python $(CONFIG_SCRIPT) config/CS3.json

CS3vt: min
	python $(CONFIG_SCRIPT) config/CS3.json -c config/CS3vt_LMSconf.json -b CS3vt

CS3in: min
	python $(CONFIG_SCRIPT) config/CS3.json -c config/CS3in_LMSconf.json -b CS3in

CS316: min
	python $(CONFIG_SCRIPT) config/CS3.json -c config/CS316in_LMSconf.json -b CS316S16

CPSC270: min
	python $(CONFIG_SCRIPT) config/CS3.json -c config/CPSC270in_LMSconf.json -b CPSC270S16

CSCI204: min
	python $(CONFIG_SCRIPT) config/CS3.json -c config/CSCI204in_LMSconf.json -b CSCI204S16

ECE252: min
	python $(CONFIG_SCRIPT) config/ECE252.json -c config/ECE252in_LMSconf.json -b ECE252S16

India: min
	python $(CONFIG_SCRIPT) config/DS2.json

Indiain: min
	python $(CONFIG_SCRIPT) config/DS2.json -c config/DS2in_LMSconf.json -b DS2in

Algorithms: min
	python $(CONFIG_SCRIPT) config/Algorithms.json $(opts)

AlgorithmsLMS: min
	python $(CONFIG_SCRIPT) config/Algorithms.json -c True

PL: min
	python $(CONFIG_SCRIPT) config/PL.json

PLin: min
	python $(CONFIG_SCRIPT) config/PL.json -c config/PLin_LMSconf.json -b PLin

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

lib/createcourse-min.js: lib/createcourse.js
	@echo 'Minimizing lib/createcourse.js'
	@$(MINIMIZE) lib/createcourse.js --comments '/^!|@preserve|@license|@cc_on/i' > lib/createcourse-min.js
