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

csslint:
	@echo 'run csslint'
	@csslint --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units AV/opendsaAV.css
	@csslint --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units Doc/opendsadocs.css
	@csslint --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units RST/source/_static/opendsaMOD.css
	@csslint --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units QBank/new.css
