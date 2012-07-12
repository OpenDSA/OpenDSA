RM = rm
TARGET = build

all: target

clean:
	- $(RM) -rf build
	- $(RM) *~
	- $(RM) Modules/*~
	- $(RM) Doc/*~
	- $(RM) Scripts/*~
	- $(RM) modules.json

target:
	-mkdir $(TARGET)
	cp Modules/*.css $(TARGET)
	cp Modules/MIT-license.html $(TARGET)
	cp lib/knowledgemap.html $(TARGET)	
	-mkdir $(TARGET)/Images
	cp Modules/Images/* $(TARGET)/Images
	cp lib/Images/* $(TARGET)/Images
	python Scripts/preprocessor.py  -c="OpenDSA Test Textbook" Modules/ $(TARGET)

lint: csslint jshint

csslint:
	@echo 'run csslint'
	@csslint --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units AV/*.css
	@csslint --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units AV/Sorting/*.css
	@csslint --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units Doc/*.css
	@csslint --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units RST/source/_static/Code/*.css
	@csslint --quiet --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units QBank/*.css

jshint:
	@echo 'run jshint'
	@jshint RST/source/_static/Code/*.js
	@jshint AV/Sorting/*.js
