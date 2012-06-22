Luther Sphinx eBook Extensions
==============================

Brad Miller

This repository contains two important groups of files:

* luther/sphinx/*
* static/*

The sphinx extensions are included in the luther.sphinx.* packages.
To install these extensions for use with sphinx you should just run
``python setup.py install``  from the main directory.  This will
install what you need in your site-packages directory for Python.

The static directory contains the necessary javascript and css files
that you will need for the browser at run time.  It is necessary for
you to copy these into your sphinx project, probably into your _static
directory where you keep your source.

Finally to use the extensions you will need to modify conf.py in your
sphinx project and change your extensions to the following::

    extensions = ['luther.sphinx.video','luther.sphinx.codelens','luther.sphinx.activecode']

Of course if you've already got other extensions that you're using you should
just add these to the list.

If you have problems please report problems or bugs on github:
http://github.com/bnmnetp/eBookExtensions/issues

If would like to contribute other sphinx extensions that are useful for writing
an eBook, please contact Brad Miller (bmiller at luther.edu) and I will be happy
to give you permission to add to the repository.

Thanks,

Brad Miller
