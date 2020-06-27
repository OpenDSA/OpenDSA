SHELL := /bin/bash
ifeq ($(OS),Windows_NT)
	SHELL=C:/Windows/System32/cmd.exe
endif
RM = rm --recursive --force
CONFIG_SCRIPT = tools/configure.py
TARGET = build
LINT = eslint --no-color
CSSOLDLINTFLAGS = --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units
CSSLINTFLAGS = --quiet --ignore=ids,adjoining-classes

JS_MINIFY = cat 
CSS_MINIFY = cat
# Uncomment the lines below to do a real-minify:
# JS_MINIFY = uglifyjs --comments '/^!|@preserve|@license|@cc_on/i' -- 
# CSS_MINIFY = cleancss

# These are used by Makefile.venv for using python's venv in make
# Targets from Makefile.venv: venv, show-venv, clean-venv, python ...
PY=python3.8
WORKDIR=.
VENVDIR=.pyVenv
REQUIREMENTS_TXT=requirements.txt

all: alllint
.PHONY: clean min pull Webserver pyVenvCheck pipList
.PHONY: all alllint csslint lint lintExe jsonlint

Webserver:
	@-echo -n "System is: " & uname -s
	python3 server.py

.pyVenv pyVenv: venv
pyVenvCheck: venv
	@python -c "import sys; assert (hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix)), '.pyVenv must be activated!'"
	@echo '.pyVenv is active'
pipList: venv
	$(VENV)/pip list
pyReqs: venv requirements.txt
	$(VENV)/python -m pip install --upgrade pip setuptools
	$(VENV)/pip install --requirement requirements.txt

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
	@jsonlint --quiet AV/Background/*.json
	@jsonlint --quiet AV/Design/*.json
	@jsonlint --quiet config/*.json
	@jsonlint --quiet config/Old/*.json

rst2json: pyVenvCheck
	$(VENV)/python tools/rst2json.py

JS_FNAMES = odsaUtils odsaAV odsaKA odsaMOD gradebook registerbook
JS_FILES = $(foreach fname, $(JS_FNAMES), lib/$(fname).js)
JS_MIN_FILES = $(foreach fname, $(JS_FNAMES), lib/$(fname)-min.js)

CSS_FNAMES = site odsaAV odsaKA odsaMOD gradebook normalize
CSS_FILES = $(foreach fname, $(CSS_FNAMES), lib/$(fname).css)
CSS_MIN_FILES = $(foreach fname, $(CSS_FNAMES), lib/$(fname)-min.css)

min: $(JS_MIN_FILES) $(CSS_MIN_FILES) 
	@echo 'Completed: Minify of all files (or fake-minify)'

lib/%-min.js:: lib/%.js
	@$(JS_MINIFY) $^ > $@

lib/%-min.css:: lib/%.css
	@$(CSS_MINIFY) $^ > $@
	
# one file has a special minify process:
lib/odsaAV-min.css: lib/normalize.css lib/odsaAV.css
	@$(CSS_MINIFY) lib/normalize.css lib/odsaAV.css > lib/odsaAV-min.css

CONFIGS := $(wildcard config/*.json)
ALL_BOOKS := $(patsubst config/%.json,%,$(CONFIGS))

SLIDE_BOOKS = $(filter %slides %Slides,$(ALL_BOOKS))
SLIDE_BOOKS += CS5040Master
BOOKS = $(filter-out $(SLIDE_BOOKS),$(ALL_BOOKS))
.PHONY: $(BOOKS) $(SLIDE_BOOKS)

# A Static-Pattern Rule for making Books
# TODO: can remove -bb option once all py3 str encoding in odsa is debugged 
$(BOOKS): % : config/%.json min pyVenvCheck
	$(VENV)/python -bb $(CONFIG_SCRIPT) $< --no-lms
	@echo "Created an eBook in Books/: $@"
	
$(SLIDE_BOOKS) : % : config/%.json min pyVenvCheck
	$(VENV)/python -bb $(CONFIG_SCRIPT) --slides $< --no-lms
	@echo "Created an Slide-eBook in Books/: $@"

# Target eBooks with unique recipies below:::
CS3notes: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS3slides.json -b CS3notes --no-lms

CS3F18notes: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS3F18slides.json --no-lms -b CS3F18notes --no-lms

CS5040notes: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS5040slides.json -b CS5040notes --no-lms

CS5040MasterN: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS5040Master.json -b CS5040MasterN --no-lms

CS3SS18notes: min pyVenvCheck
	$(VENV)/python $(CONFIG_SCRIPT) config/CS3SS18slides.json -b CS3SS18notes --no-lms

include Makefile.venv