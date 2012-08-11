.. _ODSAExtensions:

OpenDSA ReST Extensions
=======================

A number of custom ReST extensions have been created for the OpenDSA
project.
They are documented here.

avembed
-------
NAME
    avembed - embed an AV or other HTML page inside a ReST document.     

SYNOPSIS::  
                      
    .. avembed:: <AV_Path> 
       [:showbutton: {show|hide}]       
       [:title: ]              

DESCRIPTION
    ``.. avembed:: <AV_Path>``                        		              
      Call the directive followed by the relative path of the
      AV or Exercise.
    ``[:showbutton: {show|hide}]`` 
      Include a button to show or hide the embedded
      content. The options are ``show`` to have the content visible
      when the page is first loaded and ``hide`` to have it hidden.
    ``[:title: ]``
      Specify the text that will appear in the *show|hide*
      button. Alphanumeric characters plus space and special
      characters are allowed.
               
NOTES
    The ``.. avembed::`` directive fetches the AV's information
    (width and height, etc.) from its XML description file.
    This XML file is located in the directory ``xml`` contained
    within the same directory as the AV. If the AV is named
    ``fooAV.html`` then the XML file must be ``xml/fooAV.xml``.
 
avmetadata
----------
NAME                   
    avmetadata - list of metadata information associated with the
    ReST document. It is used to generate the knowledge map and
    the module selection interface.

SYNOPSIS::             
        
    .. avmetadata:: module_name
       :author:
       :prerequisites:
       :topic:
       :short_name:                    	

DESCRIPTION
    ``.. avmetadata:: module_name``
      Call the directive followed by the module's
      identifier (``module_name``). It should match the module's
      (ReST) file name without the extension. No space nor special
      characters are allowed.
    ``:author:``
      Module author's name.
    ``:prerequisites:``
      A comma-separated list of ``module_name``.
      These represent the prerequisites for this module.
    ``:topic:``
      The topic covered by this module.
    ``:short_name:``
      The name that will be displayed in the knowledge map.
      Spaces and special characters are allowed here.

codeinclude
-----------
NAME
    codeinclude - displays code snippets within the eTextbook.

SYNOPSIS::

    .. codeinclude:: <relative path>
       [:tag: <my tag>]    

DESCRIPTION
    ``.. codeinclude:: <relative path>``

      Include the code present inside the file located at
      ``<relative path>``.

    ``:tag: <my tag>``

      A tag inside the source code file that delimits the block
      of code that will be included.
      Note that the source code must use the tags correctly, as shown
      below.

NOTES
    The ``codeinclude`` directive closely matches the standard ReST
    directive ``literalinclude``.::

        .. codeinclude:: <relative path>
           [:tag: <my tag>]  

    will (logically) map to:::

        .. literalinclude:: <relative path>
           :start-after: /* *** ODSATag: <my tag> *** */
           :end-before: /* *** ODSAendTag: <my tag> *** */

numref
------
NAME
    numref - adds numbered cross references to modules.

SYNOPSIS::

    :numref:`[caption] <reference_label>`
    :numref:`reference_label`

DESCRIPTION
    ``:numref:``               

    A custom interpreted text role. ``numref`` adds numbered cross
    references within ODSA documents.

    ``caption``      

    Text that will be display next to the numbered reference.    

    ``reference_label``

    Reference name (unique) of the referenced object. Should be
    enclose in brackets ('<>') when a caption is provided. It is
    specified via the standard ReST referencing mechanisms.

NOTES
    The ODSA preprocessor creates a table of all referenced objects
    with numbers and writes it into a file that is read by the ``numref``
    role.

TODO
----
NAME
    TODO - adds a todo box in the output HTML file, and is
    also used by the ODSA preprocessor script to create a HTML
    page containing the collated list of desired AVs and Exercises.
    (NOTE: Can also be called as ``todo``.)

SYNOPSIS::

    .. TODO::
       [:type: <type label of the desired artifact>]  

DESCRIPTION

    ``.. TODO::``

    Within the module, this behaves like the standard Sphinx
    TODO (or todo) directive. The ODSA version also creates a
    separate page TODO.html that includes a listing of all TODO
    blocks from all of the modules.

    ``:type: <type label of the desired artifact>``    

    The type of the desired artifact (AV, Proficiency Exercise,
    etc). This is just a label, so it can be anything. Each
    separate label will collate together all TODO entries with
    that label on the TODO.html page.

NOTES
    The ODSA preprocessor collects the description of the TODO
    directive (inside rst files) to create a TODO.rst file that lists
    all the desired AVs and Exercises grouped by type.
    The TODO.rst file should be included in the index.rst file to be
    part of the table of contents for the eBook.  
