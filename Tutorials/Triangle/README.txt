This applet is run by loading TriangleApplet.html.
Add the url parameter ?code=true to view the code block that shows the requirements to get 100% code coverage.

The two javascript files are Bugs.js and TriangleClassifier.js.  Bugs.js is not used in the current implementation.  It's intent is to 
allow for a secondary measure of performance, looking for a set of bugs.  It is currently commented out because its implementation
was confusing. 
The other js file is TriangleClassifier.js.  This is the main implementation of the Triangle Applet.  It also loads bootstrap css files and jquery.

The two text files Bugs and ClassifyTriangle contain the code that is optionally displayed next to the app.  They are loaded in through the 
TriangleApplet.html.