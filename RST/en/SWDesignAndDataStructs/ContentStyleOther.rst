.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Style and Documentation: Other style matters
============================================

Use of constants and referenced values vs hard coding
-----------------------------------------------------

There may be times where you may wish to refer to a value directly in your code.

Examples of this may include when drawing shapes on a Graphic User Interface, when iterating through arrays or other data structures using loops, when performing some mathematical or business operation requiring some literal or operand, or when referencing the minimum or maximum limits to some range of values. 

As a general rule you should always consider the trade-off to using such values directly, this is referred to as **hard coding** ( sometimes spelled hard-coding or hardcoding). 

Hard coding is a bad practice because it assumes that these values will remain unchanged throughout the life of the software, thus making the code inflexible, difficult to update and maintain as circumstances and stakeholder needs evolve.

Consider, for example, implementing tax calculations within a shopping/eCommerce application which requires the software to perform these calculations in multiple classes/areas of the application.

If you were to hard code the tax rate for each of the instances where the tax calculation was required then, should the tax rate ever change, say from 0.15 (15%) to 0.17 (17%), then you, or a fellow developer, would need to review the entire body of code to ensure that all references to  0.15 (or 15/100) were updated to reflect the new tax rate.

A preferred approach to hard coding is to use either a *constant value*, a value that does not change, or a value that can be referenced.
 
Constants
---------

With respect to the example of the tax rate it would be preferable to create a field  constant in the following manner:

.. code-block:: java
    
    final double TAX_RATE = 0.15;

    total = subtotal * TAX_RATE 

Then refer to that constant within your calculations.  If the rate were to ever change you would simply adjust the value assigned to the constant.

.. admonition:: Note

    If a constant is to be used within a single class then it should be set to `private`. If it is expected to be used across multiple classes then it may be useful to set it as `public static`.

 
Referenced value
----------------

With respect to the example of iterating through an array, or some other similar task, it would be preferable to reference a value instead of hard coding.

So instead of using the following hard coded approach:

.. code-block:: java

    int [] myArray = new int [4];

    for (int i = 0; i < 4; i++ ) {
        System.out.println( myArray[ i ]  );
    }

 

You should use the more flexible approach depicted below:

.. code-block:: java

    final int MAX = 4;

    int [] myArray = new int [MAX];

    for (int i = 0; i < myArray.length ; i++ ) {
        System.out.println( myArray[ i ] );
    }

 

Alternatively you may use `MAX` within the loop instead of `myArray.length`.

Observe how the use of constants and referenced values make your code more flexible and easier to maintain.  Using `myArray.length` within the loop condition , instead of the value 4, makes our code more flexible as this referenced value always matches the correct length of the array even if it were to change.

When writing code you should always use the most flexible option available.

 

Access Modifiers and Visibility of classes, fields, and methods
---------------------------------------------------------------
Access modifiers allow developers to specify whether other classes can use a particular field or invoke a particular method of a given class. 

New developers often forget to specify the access modifiers for classes, fields, and methods.

This is a bad habit and something to avoid since omitting an access modifier may result in unexpected behavior, breaking encapsulation and potentially allowing outside classes to access fields and methods in unintended ways.

You should *always* specify access modifiers for all classes, fields, and methods, both when depicting the software design and when developing the software solution. 

Good design tends to adopt the approach of setting everything as `private` except those fields and methods you explicitly wish outside classes to interact with. 

.. admonition:: Note
    
    As a general rule you should set the fields of your class as `private` and grant other levels of access on a case-by-case basis.  

More information on Access Modifiers and Visibility is available here: https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html 

 

Testing methods by passing null params
--------------------------------------

As a general rule when setting up a test case which requires the passing of a null to a method, you should refrain from passing null directly. This is bad practice, and may result in a style deduction when submitted to Web-CAT.

For example the test: 

.. code-block:: java

    assertFalse( someNonNullObject.equals( null ) );

Would return a style error when submitted to Web-CAT.

 

To avoid this you should instead create another object (be sure to name it appropriately), set it to `null`, then pass that object to the method being tested.  See example below:

.. code-block:: java

       SomeObject nonNullObject = new SomeObject (...);

       SomeObject nullObject = null;

       assertFalse( nonNullObject.equals( nullObject ) );




Style & Documentation Final Review [8:17]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_5a3easxv&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_b6a92739" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>


Related Resources
----------------- 

*References:*

- Northeastern University. Style Guide for Web-CAT submissions: http://www.ccs.neu.edu/home/vkp/2510-sp13/web-cat-hints.html 
- Google. Java Style Guide: https://google.github.io/styleguide/javaguide.html 
- Sun Microsystems, Inc (known today as Oracle). (1996). Java Code Conventions: https://www.oracle.com/technetwork/java/codeconventions-150003.pdf 
