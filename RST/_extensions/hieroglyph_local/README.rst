============
 Hieroglyph
============

.. image:: https://api.travis-ci.org/nyergler/hieroglyph.png?branch=master
   :target: https://travis-ci.org/nyergler/hieroglyph

.. image:: https://coveralls.io/repos/nyergler/hieroglyph/badge.png?branch=master
   :target: https://coveralls.io/r/nyergler/hieroglyph?branch=master


**Hieroglyph** is an extension for `Sphinx`_ which builds HTML
presentations from ReStructured Text documents.

Installing
==========

You can install **Hieroglyph** using ``easy_install`` or ``pip``::

   $ pip install hieroglyph

You can also install the latest development version, which may
contain new features::

  $ pip install git+https://github.com/nyergler/hieroglyph#egg=hieroglyph

Hieroglyph supports Sphinx 2.4 and later, and Python 3.7 and later.

Using Hieroglyph
================

You can start a new **Hieroglyph** presentation using the included
quickstart script::

  $ hieroglyph-quickstart

This will generate the Sphinx configuration, along with an optional
Makefile and batch file, with Hieroglyph enabled.

If you're on something UNIX-like (Linux, Mac OS X, etc), you can then
generate your slides by running ``make``::

  $ make slides


You can also add **Hieroglyph** as a Sphinx extension to your
existing configuration::

  extensions = [
      'hieroglyph',
  ]


`Read the documentation`_ for all the details about using,
configuring, and extending Hieroglyph.

Connect
=======

You can connect with other Hieroglyph users and the developers via the
`hieroglyph-users`_ email list (Google Groups). A `Gmane archive`_ is
also available.

.. _`hieroglyph-users`: http://groups.google.com/d/forum/hieroglyph-users
.. _`Gmane archive`: http://dir.gmane.org/gmane.comp.python.hieroglyph.user

Developing
==========

Making a Release
----------------

Hieroglyph uses `Versioneer`_ for managing verison numbers. Versioneer is
able to derive a reasonable version number using git tags as the source of
truth.

To create a release, do the following:

* Update the change log (`NEWS.txt`_)
* Tag the release commit as `hieroglyph-x.y.z`
* Build the distributions using `setup.py`::

  $ python setup.py sdist bdist_wheel

* Push the changes to Github & upload to PyPI using `Twine`_::

   $ git push origin head
   $ twine upload dist/<built filenames>

License
=======

**Hieroglyph** is made available under a BSD license; see LICENSE for
details.

Included slide CSS and JavaScript originally based on `HTML 5 Slides`_
and `io-2012-slides`_ projects licensed under the Apache Public
License.

.. _`Sphinx`: http://sphinx.pocoo.org/
.. _`HTML 5 Slides`: http://code.google.com/p/html5slides/
.. _`io-2012-slides`: https://code.google.com/p/io-2012-slides/
.. _`Read the documentation`: http://docs.hieroglyph.io/
.. _`Versioneer`: https://github.com/warner/python-versioneer
.. _`Twine`: https://twine.readthedocs.io/en/latest/
.. _`NEWS.txt`: ./NEWS.txt