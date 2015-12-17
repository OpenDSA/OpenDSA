#! /bin/bash

if [ ! -d Sphinx-1.2b1/ ]; then
	wget https://pypi.python.org/packages/source/S/Sphinx/Sphinx-1.2b1.tar.gz#md5=67bea6df63be8e2a76ebedc76d8f71a3
	tar xzf Sphinx-1.2b1.tar.gz
fi

if [ ! -a Sphinx-1.2b1.tar.gz ]; then
	rm -f Sphinx-1.2b1.tar.gz
fi
make testcmap SPHINXBUILD=../../Sphinx-1.2b1/sphinx-build.py
