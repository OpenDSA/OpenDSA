RM = rm
CONFIG_SCRIPT = lib/configure.py
TARGET = build
CSSLINTFLAGS = --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units

all: lint

clean:
	- $(RM) -rf Books
	- $(RM) -r *~
	- $(RM) -r Doc/*~
	- $(RM) -r Scripts/*~
	- $(RM) -r config/*~

lint: csslint jshint

csslint:
	@echo 'running csslint'
	@csslint $(CSSLINTFLAGS) AV/Sorting/*.css
	@csslint $(CSSLINTFLAGS) AV/Hashing/*.css
	@csslint $(CSSLINTFLAGS) AV/*.css
	@csslint $(CSSLINTFLAGS) Doc/*.css
	@csslint $(CSSLINTFLAGS) QBank/*.css
	@csslint $(CSSLINTFLAGS) RST/source/_static/opendsaMOD.css

jshint:
	@echo 'running jshint'
	-@jshint AV/Sorting/*.js
	-@jshint AV/Hashing/*.js
	-@jshint AV/*.js
	-@jshint Exercises/Hashing/*.js
	-@jshint lib/ODSA.js
	-@jshint RST/source/_static/opendsaMOD.js
	-@jshint RST/source/_static/gradebook.js

CS223:
	python $(CONFIG_SCRIPT) config/CS223.json

CS3114a:
	python $(CONFIG_SCRIPT) config/CS3114a.json

CS3114b:
	python $(CONFIG_SCRIPT) config/CS3114b.json

OpenDSA:
	python $(CONFIG_SCRIPT) config/OpenDSA.json

T1061220:
	python $(CONFIG_SCRIPT) config/T1061220.json

allBooks: CS223 CS3114a CS3114b OpenDSA T1061220
