.. _AV:

Notes for AV and Exercise Developers
====================================

Equations
---------

Within ``jsav.umsg()`` text, all math should be done using LaTeX
format enclosed within ``$...$`` (for inline expressions) or
``$$ ... $$`` (for display equations).
MathJax will automatically recognize the dollar sign markup, and it
will automatically do the conversion from LaTeX format to HTML.
The only peculiarity that you should need to worry about is that
backslashes must be escaped by using two backslashes.
So a typical math markup within an AV or slideshow might look like::

   jsav.umsg("This takes $\\Theta(n)$ time.");

