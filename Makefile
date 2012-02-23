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
	-mkdir $(TARGET)/Images
	cp Modules/Images/* $(TARGET)/Images
	python Scripts/preprocessor.py  -c="OpenDSA Test Textbook" Modules/ $(TARGET)
