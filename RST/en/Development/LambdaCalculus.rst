.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Tom Naps and Taylor Rydahl

Lambda Calculus [Draft]
===================================

Alpha conversion is used when substituting for a formal parameter in a lambda calculus expression will capture a free variable.  To illustrate this, consider:


.. Slideshow for Alpha Conversion

.. avembed:: AV/Development/AlphaConversionSlideshow.html ss

Practice alpha conversion with the following exercise:

.. Exercise for AlphaConversion

.. avembed:: Exercises/Development/AlphaConversionChoice.html ka

You can get some more alpha conversion practice with the following exercise:

.. Exercise for AlphaConversion

.. avembed:: Exercises/Development/AlphaConversionHighlight.html ka


A fundamental tool in evaluating expressions in the lambda calculus is
the notion of substitution.  For the application of a function to its
argument, we need merely substitute the argument for the formal
parameter in the expression that defines the function, being careful
to first alpha convert if doing this would capture a free variable.
This is called beta conversion, and to fully evaluate a lambda
calculus expression, we may have to perform multiple beta conversions.
The entire process is called beta reduction.  Since it involves
potentially multiple beta conversions, we have a choice for the order
in which the individual beta conversions are performed.

In Applicative Order Reduction we  evaluate the innermost subexpressions first. That is, we only perform an application when each of the subexpressions has been reduced and there are no redexes left except the topmost application.  Consider:

.. Slideshow for Applicative order

.. avembed:: AV/Development/BetaReductionAppSlideshow.html ss

Practice an applicative order reduction in the following exercise:

.. Exercise for Applicative

.. avembed:: Exercises/Development/BetaReductionAppNextStep.html ka

For some more practice, try:

.. Exercise for Applicative

.. avembed:: Exercises/Development/BetaReductionAppHighlight.html ka




Normal order evaluation  reduces the leftmost redex first -- before reducing the subexpressions that follow it.  Another way of thinking about it is that while applicative order proceeds by evaluating the subexpressions then applying the function, normal order evaluation proceeds by applying the function and then evaluating the subexpressions.   Consider the following example:


.. Slideshow for Normal Order

.. avembed:: AV/Development/BetaReductionNormSlideshow.html ss



Practice a normal order reduction in the following exercise:

.. Exercise for Normal

.. avembed:: Exercises/Development/BetaReductionNormNextStep.html ka

For some more practice, try:

.. Exercise for Applicative

.. avembed:: Exercises/Development/BetaReductionNormHighlight.html ka


As a final test of your proficiency in doing beta reductions, try doing

1. All the steps in a complete applicative order reduction:

.. avembed:: AV/Development/BetaAppPro.html pe

2. All the steps in a complete normal order reduction

.. avembed:: AV/Development/BetaNormPro.html pe

