SHELL := /bin/bash
RM = rm --recursive --force
CONFIG_SCRIPT = tools/configure.py
.DEFAULT_GOAL := alllint
JS_LINT = eslint --no-color
CSS_LINT = csslint --quiet --ignore=ids,adjoining-classes
# CSSOLDLINTFLAGS = --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units
JSON_LINT = jsonlint --quiet
PYTHON_LINT = pyLint --disable=C --reports=y
# Can be overridden by env varis, such as ODSA_ENV='PROD' or PYTHON="python3.8"
ODSA_ENV ?= DEV
PYTHON ?= python
VENVDIR = .pyVenv
ACTIVATE = source $(VENVDIR)/bin/activate 
VENV_PYTHON = $(VENVDIR)/bin/python
PYTHON_FLAGS = -bb 
# PYTHON_FLAGS += -Werror 


# Changes for installs on native Windows:
ifeq ($(OS),Windows_NT) 
	SHELL = bash.exe
	ACTIVATE = . $(VENVDIR)/Scripts/activate
	VENV_PYTHON = $(VENVDIR)/Scripts/python
endif

JS_MINIFY = uglifyjs --comments '/^!|@preserve|@license|@cc_on/i' -- 
CSS_MINIFY = cleancss
ifeq ($(strip $(ODSA_ENV)),DEV)
	# fake-minify for easier debugging in DEV setups...
	JS_MINIFY = cat 
	CSS_MINIFY = cat
endif


# For the python virtual environment:
.PHONY: venv clean-venv pyVenvCheck 
pyVenvCheck: venv
	$(PYTHON) tools/pyVenvCheck.py
venv: $(VENVDIR)/.pipMarker
$(VENVDIR)/.pipMarker: $(VENVDIR)/.venvMarker requirements.txt
	$(ACTIVATE) && pip install --requirement requirements.txt
	touch $@
$(VENVDIR)/.venvMarker: 
	@echo "Using env variable: PYTHON=$(PYTHON)"
	@echo -n 'Making new $(VENVDIR) using: ' && $(PYTHON) --version
	$(PYTHON) -m venv $(VENVDIR)
	$(ACTIVATE) && python -m pip install --upgrade setuptools pip
	touch $@
clean-venv:
	- $(RM) $(VENVDIR)
	@ echo "Note: Use 'deactivate' if $(VENVDIR) is still activated"

.PHONY: clean min pull Webserver 

Webserver:
	@-echo -n "System is: " & uname -s
	@echo "Using env variable: PYTHON=$(PYTHON)"
	exec $(PYTHON) server.py

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

.PHONY: alllint jsonlint lint lintExe csslint pylint
alllint: lint csslint jsonlint pyLint

csslint:
	@echo 'running csslint'
	@$(CSS_LINT) AV/Background/*.css
	@$(CSS_LINT) AV/Design/*.css

TODOcsslint:
	@$(CSS_LINT) AV/List/*.css
	@$(CSS_LINT) AV/Sorting/*.css
	@$(CSS_LINT) AV/Hashing/*.css
	@$(CSS_LINT) AV/Searching/*.css
	#@$(CSS_LINT) AV/*.css
	@$(CSS_LINT) Doc/*.css
	@$(CSS_LINT) lib/*.css

lint: lintExe
	@echo 'running eslint'
	-@$(JS_LINT) AV/Background/*.js
	-@$(JS_LINT) AV/Design/*.js

TODOlintAV:
	@echo 'linting AVs'
	-@$(JS_LINT) AV/Binary/*.js
	-@$(JS_LINT) AV/General/*.js
	-@$(JS_LINT) AV/List/*.js
	-@$(JS_LINT) AV/Sorting/*.js
	-@$(JS_LINT) AV/Hashing/*.js
	-@$(JS_LINT) AV/Searching/*.js
	-@$(JS_LINT) AV/Sorting/*.js

lintExe:
	@echo 'linting KA Exercises'
	-@$(JS_LINT) Exercises/AlgAnal/*.js
	-@$(JS_LINT) Exercises/Background/*.js
	-@$(JS_LINT) Exercises/Binary/*.js
	-@$(JS_LINT) Exercises/Design/*.js
	-@$(JS_LINT) Exercises/General/*.js
	-@$(JS_LINT) Exercises/Graph/*.js
	-@$(JS_LINT) Exercises/Hashing/*.js
	-@$(JS_LINT) Exercises/Indexing/*.js
	-@$(JS_LINT) Exercises/List/*.js
	-@$(JS_LINT) Exercises/RecurTutor/*.js
	-@$(JS_LINT) Exercises/RecurTutor2/*.js
	-@$(JS_LINT) Exercises/Sorting/*.js

TODOlintlib:
	@echo 'linting libraries'
	-@$(JS_LINT) lib/odsaUtils.js
	-@$(JS_LINT) lib/odsaAV.js
	-@$(JS_LINT) lib/odsaMOD.js
	-@$(JS_LINT) lib/gradebook.js
	-@$(JS_LINT) lib/registerbook.js
	-@$(JS_LINT) lib/conceptMap.js

jsonlint:
	@$(JSON_LINT) AV/Background/*.json
	@$(JSON_LINT) AV/Design/*.json
	@$(JSON_LINT) config/*.json
	@$(JSON_LINT) config/Old/*.json


pyLint:
	$(PYTHON_LINT) server.py tools/*.py RST/ODSAextensions/**/*.py 
	# $(PYTHON_LINT) SourceCode/Python/**/*.py # These are python 2!!!

rst2json: pyVenvCheck
	python tools/rst2json.py

JS_FNAMES = odsaUtils odsaAV odsaKA odsaMOD gradebook registerbook JSAV
JS_FILES = $(foreach fname, $(JS_FNAMES), lib/$(fname).js)
JS_MIN_FILES = $(foreach fname, $(JS_FNAMES), lib/$(fname)-min.js)

CSS_FNAMES = site odsaMOD odsaStyle odsaAV odsaKA gradebook  
CSS_FILES = $(foreach fname, $(CSS_FNAMES), lib/$(fname).css)
CSS_MIN_FILES = $(foreach fname, $(CSS_FNAMES), lib/$(fname)-min.css)

min: $(JS_MIN_FILES) $(CSS_MIN_FILES) 
ifeq ($(strip $(ODSA_ENV)),DEV)
	@echo 'Completed: FAKE-Minify of many .js and .css files (just copied)'
else
	@echo 'Completed: Minify of many .js and .css files'
endif

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

allbooks: Everything CS2 CS3 PL CS3slides CS3notes CS4104 VisFormalLang

# A Static-Pattern Rule for making Books
# TODO: can remove -bb option once all py3 str encoding in odsa is debugged 
$(BOOKS): % : config/%.json min pyVenvCheck
	python $(PYTHON_FLAGS) $(CONFIG_SCRIPT) $< --no-lms
	@echo "Created an eBook in Books/: $@"

$(SLIDE_BOOKS) : % : config/%.json min pyVenvCheck
	python $(PYTHON_FLAGS) $(CONFIG_SCRIPT) --slides $< --no-lms
	@echo "Created an Slide-eBook in Books/: $@"


# Target eBooks with unique recipies below:::
CS3notes: min pyVenvCheck
	python $(CONFIG_SCRIPT) config/CS3slides.json -b CS3notes --no-lms

CS3F18notes: min pyVenvCheck
	python $(CONFIG_SCRIPT) config/CS3F18slides.json --no-lms -b CS3F18notes --no-lms

CS5040notes: min pyVenvCheck
	python $(CONFIG_SCRIPT) config/CS5040slides.json -b CS5040notes --no-lms

CS5040MasterN: min pyVenvCheck
	python $(CONFIG_SCRIPT) config/CS5040Master.json -b CS5040MasterN --no-lms

CS3SS18notes: min pyVenvCheck
	python $(CONFIG_SCRIPT) config/CS3SS18slides.json -b CS3SS18notes --no-lms

