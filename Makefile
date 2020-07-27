SHELL := /bin/bash
RM = rm --recursive --force
CONFIG_SCRIPT = tools/configure.py
TARGET = build
LINT = eslint --no-color
CSSOLDLINTFLAGS = --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units
CSSLINTFLAGS = --quiet --ignore=ids,adjoining-classes
# Can be overridden by env varis, such as ODSA_ENV='PROD' or PYTHON="python3.8"
ODSA_ENV ?= DEV
PYTHON ?= python
VENVDIR = .pyVenv
ACTIVATE = source $(VENVDIR)/bin/activate 
VENV_PYTHON = $(VENVDIR)/bin/python

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

CHECK_ACTIVE = python -c "import sys; assert getattr(sys, 'base_prefix',  sys.exec_prefix) != sys.prefix, '$(INACTIVE_MSG)'"
INACTIVE_MSG = pyVenv is not activated!!! \n
INACTIVE_MSG +=Command to activate:   $(ACTIVATE) \n
INACTIVE_MSG +=Command to deactivate: deactivate \n
INACTIVE_MSG +=Retry after activating pyVenv.  Exiting now...

all: alllint
.PHONY: clean min pull Webserver 
.PHONY: all alllint csslint lint lintExe jsonlint

.PHONY: venv clean-venv pyVenvCheck # for the python virtual environment
pyVenvCheck: venv
	@$(CHECK_ACTIVE)
	@echo 'pyVenv seems activated, good'
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

TODOlintlib:
	@echo 'linting libraries'
	-@$(LINT) lib/odsaUtils.js
	-@$(LINT) lib/odsaAV.js
	-@$(LINT) lib/odsaMOD.js
	-@$(LINT) lib/gradebook.js
	-@$(LINT) lib/registerbook.js
	-@$(LINT) lib/conceptMap.js

jsonlint:
	@jsonlint --quiet AV/Background/*.json
	@jsonlint --quiet AV/Design/*.json
	@jsonlint --quiet config/*.json
	@jsonlint --quiet config/Old/*.json

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
	python -bb $(CONFIG_SCRIPT) $< --no-lms
	@echo "Created an eBook in Books/: $@"

$(SLIDE_BOOKS) : % : config/%.json min pyVenvCheck
	python -bb $(CONFIG_SCRIPT) --slides $< --no-lms
	@echo "Created an Slide-eBook in Books/: $@"


# one book config that does not match the naming convention:
FL2019: min
	python $(CONFIG_SCRIPT) config/FormalLanguages2019.json --no-lms


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

