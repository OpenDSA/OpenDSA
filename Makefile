RM = rm -rf
TARGET = build

all: target

clean:
	$(RM) *~
	$(RM) Modules/*
	$(RM) Doc/*~
	$(RM) Scripts/*~

target:
	-mkdir $(TARGET)
	cp Modules/*.css $(TARGET)
	-mkdir $(TARGET)/Images
	cp Modules/Images/* $(TARGET)/Images
	python Scripts/preprocessor.py  -c="OpenDSA Textbook" Modules/ $(TARGET)
