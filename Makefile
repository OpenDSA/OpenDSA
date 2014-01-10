RM = rm -rf
CONFIG_SCRIPT = tools/configure.py
TARGET = build
CSSLINTFLAGS = --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units
MINIMIZE = java -jar tools/yuicompressor-2.4.7.jar --nomunge

.PHONY: all clean lint csslint jshint min CS223 CS3114 CS3114AM CS3114PM CS3114notes CS150 OpenDSA allBooks nomin pull

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
	@csslint $(CSSLINTFLAGS) AV/Sorting/*.css
	@csslint $(CSSLINTFLAGS) AV/Hashing/*.css
	@csslint $(CSSLINTFLAGS) AV/*.css
	@csslint $(CSSLINTFLAGS) Doc/*.css
	@csslint $(CSSLINTFLAGS) lib/*.css

jshint:
	@echo 'running jshint'
	-@jshint AV/Sorting/*.js
	-@jshint AV/Hashing/*.js
	-@jshint Exercises/Hashing/*.js
	-@jshint lib/odsaUtils.js
	-@jshint lib/odsaAV.js
	-@jshint lib/odsaMOD.js
	-@jshint lib/gradebook.js

min: lib/odsaUtils-min.js lib/site-min.css lib/odsaAV-min.js lib/odsaAV-min.css lib/khan-exercise-min.js lib/odsaMOD-min.js lib/odsaMOD-min.css lib/gradebook-min.js lib/gradebook-min.css

CS3114: min
	python $(CONFIG_SCRIPT) config/CS3114.json

CSCI102: min
	python $(CONFIG_SCRIPT) config/CSCI102.json

CSCI204: min
	python $(CONFIG_SCRIPT) config/CSCI204.json

CS3114AM: min
	python $(CONFIG_SCRIPT) config/CS3114AM.json

CS3114PM: min
	python $(CONFIG_SCRIPT) config/CS3114PM.json

CS3114notes: min
	python $(CONFIG_SCRIPT) s config/CS3114notes.json

CS150: min
	python $(CONFIG_SCRIPT) config/CS150.json

OpenDSA: min
	python $(CONFIG_SCRIPT) config/OpenDSA.json

test: min
	python $(CONFIG_SCRIPT) config/test.json

uwosh: min
	python $(CONFIG_SCRIPT) config/uwosh.json

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

allBooks: CS3114 CSCI204 OpenDSA Everything test slides uwosh

nomin:
	cp lib/odsaUtils.js lib/odsaUtils-min.js
	cp lib/odsaAV.js lib/odsaAV-min.js
	cp lib/odsaAV.css lib/odsaAV-min.css

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

lib/khan-exercise-min.js: ODSAkhan-exercises/khan-exercise.js
	@echo 'Minimizing lib/khan-exercise.js'
	@$(MINIMIZE) ODSAkhan-exercises/khan-exercise.js -o lib/khan-exercise-min.js

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
