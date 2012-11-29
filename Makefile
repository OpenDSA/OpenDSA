RM = rm
TARGET = build
CSSLINTFLAGS = --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units

all: oldODSA

clean:
	- $(RM) -rf build
	- $(RM) *~
	- $(RM) Modules/*~
	- $(RM) Doc/*~
	- $(RM) Scripts/*~
	- $(RM) modules.json

oldODSA:
	-mkdir -p $(TARGET)/Images
	cp Modules/*.css $(TARGET)
	cp Modules/MIT-license.html $(TARGET)
#	cp lib/knowledgemap.html $(TARGET)	
	cp Modules/Images/* $(TARGET)/Images
	cp lib/Images/* $(TARGET)/Images
	python Scripts/preprocessor.py  -c="OpenDSA Test Textbook" Modules/ $(TARGET)

lint: csslint jshint

csslint:
	@echo 'running csslint'
	@csslint $(CSSLINTFLAGS) AV/Sorting/*.css
	@csslint $(CSSLINTFLAGS) AV/*.css
	@csslint $(CSSLINTFLAGS) Doc/*.css
	@csslint $(CSSLINTFLAGS) QBank/*.css

jshint:
	@echo 'running jshint'
	@jshint AV/Sorting/*.js
	@jshint AV/*.js
	@jshint lib/ODSA.js
	@jshint RST/source/_static/opendsaMOD.js
