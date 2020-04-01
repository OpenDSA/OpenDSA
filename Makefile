SHELL := /bin/bash
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

# These are used by Makefile.venv for using python's venv in make
# Targets from Makefile.venv: venv, show-venv, clean-venv, python ...
PY=python3.8
WORKDIR=.
VENVDIR=.pyVenv
REQUIREMENTS_TXT=requirements.txt

all: alllint
.PHONY: clean min pull Webserver pyVenvCheck pipList
.PHONY: all alllint csslint lint lintExe jsonlint

# Can likely switch this to $(VENV)/python server.py
Webserver: pyVenvCheck
	./Webserver

.pyVenv pyVenv: venv
pyVenvCheck: venv
	@python -c "import sys; assert (hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix)), '.pyVenv must be activated!'"
	@echo '.pyVenv is active'
pipList: venv
	$(VENV)/pip list
pyReqs: venv requirements.txt
	$(VENV)/python -m pip install -U pip setuptools
	$(VENV)/pip install -r requirements.txt

allbooks: Everything CS2 CS3 RecurTutor PL

pull:
	git pull
	git submodule init
	git submodule update
	make --silent min
	
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

rst2json: pyVenvCheck
	$(VENV)/python tools/rst2json.py


JS_FNAMES = odsaUtils odsaAV odsaKA odsaMOD gradebook registerbook
JS_FILES = $(foreach fname, $(JS_FNAMES), lib/$(fname).js)
JS_MIN_FILES = $(foreach fname, $(JS_FNAMES), lib/$(fname)-min.js)

CSS_FNAMES = site odsaAV odsaKA odsaMOD gradebook normalize
CSS_FILES = $(foreach fname, $(CSS_FNAMES), lib/$(fname).css)
CSS_MIN_FILES = $(foreach fname, $(CSS_FNAMES), lib/$(fname)-min.css)


nomin:
	@echo 'Doing fake-minify for all (just copying)...'
	@cp lib/JSAV.js lib/JSAV-min.js
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

min: nomin # This is a fake-minify!
# min: $(JS_MIN_FILES) $(CSS_MIN_FILES) # This is the real minify!

lib/%-min.js: lib/%.js
	@echo 'Minimizing $^'
	@$(MINIMIZE) $^ --comments '/^!|@preserve|@license|@cc_on/i' > $@

lib/%-min.css: lib/%.css
	@echo 'Minimizing $^'
	@cleancss $^ -o $@

PittACOS: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/PittACOS.json --no-lms

OpenFLAP: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/OpenFLAP.json --no-lms

Obsolete: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Obsolete.json --no-lms

Test: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Test.json --no-lms

DanaG: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/DanaG.json --no-lms

TJeffrey: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/TJeffrey.json --no-lms

Michael: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Michael.json --no-lms

Tikhe: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Tikhe.json --no-lms

cschandr: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/cschandr.json --no-lms

Taylor: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Taylor.json --no-lms

Raghu: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Raghu.json --no-lms

Weihao: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Weihao.json --no-lms

SimpleDemo: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/SimpleDemo.json --no-lms

CT: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CT.json --no-lms

CTEX: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CTEX.json --no-lms

Sam: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Sam.json --no-lms

Yinwen: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Yinwen.json --no-lms

Xiaolin: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Xiaolin.json --no-lms

Ning: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Ning.json --no-lms

NP: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/NP.json --no-lms

NP4114: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/NP4114.json --no-lms

JFLAP: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/JFLAP.json --no-lms

FormalLang: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/FormalLang.json --no-lms

VisFormalLang: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/VisFormalLang.json --no-lms

FL2019: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/FormalLanguages2019.json --no-lms

PIExample: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/PIExample.json --no-lms

DeformsTesting: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/DeformsTesting.json --no-lms

OpenPOPExercises: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/OpenPOPExercises.json --no-lms

FLslides: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) -s config/FLslides.json --no-lms

CS4114: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS4114.json --no-lms

CS4114slides: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) -s config/CS4114slides.json --no-lms

Spatial: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Spatial.json --no-lms

PointersJavaSummer: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/PointersJavaSummer.json --no-lms

PointersJava: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/PointersJava.json --no-lms

PointersCPP: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/PointersCPP.json --no-lms

PL: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/PL.json --no-lms

Graphics: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Graphics.json --no-lms

PLdev: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/PLdev.json --no-lms

Everything: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Everything.json --no-lms

CS3notes: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS3slides.json -b CS3notes --no-lms

CS3slides: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) -s config/CS3slides.json --no-lms

CS3114slides: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) -s config/CS3114slides.json --no-lms

CS3F18slides: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) -s config/CS3F18slides.json --no-lms

CS3F18notes: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS3F18slides.json --no-lms -b CS3F18notes --no-lms

CS4104: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS4104.json --no-lms

CS2: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS2.json --no-lms

CS2114: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS2114.json --no-lms

CS5040: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS5040.json --no-lms

CS5040notes: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS5040slides.json -b CS5040notes --no-lms

CS5040slides: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) -s config/CS5040slides.json --no-lms

CS5040MasterN: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS5040Master.json -b CS5040MasterN --no-lms

CS5040Master: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) -s config/CS5040Master.json --no-lms

Codio: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Codio.json --no-lms

CS3: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS3.json --no-lms

CS3C: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS3C.json --no-lms

CSCI204: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CSCI204.json --no-lms

CSCI271: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CSCI271.json --no-lms

CS415: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS415.json --no-lms

CSCD320: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CSCD320.json --no-lms

CSC215: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CSC215.json --no-lms

CS240: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS240.json --no-lms

CSCI2101: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CSCI2101.json --no-lms

Yuhui: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Yuhui.json --no-lms

CS3SS18slides: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) -s config/CS3SS18slides.json --no-lms

CS3SS18notes: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS3SS18slides.json -b CS3SS18notes --no-lms

COMP271: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/COMP271.json --no-lms

COMPSCI186: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/COMPSCI186.json --no-lms

testcmap: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/testcmap.json --no-lms

WuChen: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/WuChen.json --no-lms

Echo: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Echo.json --no-lms

Ming: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Ming.json --no-lms

Blockchain: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/Blockchain.json --no-lms

include Makefile.venv