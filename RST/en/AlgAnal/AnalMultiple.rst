.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: algorithm analysis
   :satisfies: analysis multiple parameters
   :topic: Algorithm Analysis

Multiple Parameters
===================

Sometimes the proper analysis for an algorithm requires
multiple parameters to describe the cost.
To illustrate the concept, consider an algorithm to compute
the rank ordering for counts of all pixel values in a picture.
Pictures are often represented by a two-dimensional array, and a
pixel is one cell in the array.
The value of a pixel is either the code value for the color, or a
value for the intensity of the picture at that pixel.
Assume that each pixel can take any integer value in the range 0
to :math:`C - 1`.
The problem is to find the number of pixels of each color
value and then sort the color values with respect to the number
of times each value appears in the picture.
Assume that the picture is a rectangle with :math:`P` pixels.
A pseudocode algorithm to solve the problem follows.

   .. codeinclude:: Misc/Anal 
      :tag: c3p16

In this example, ``count`` is an array of size ``C`` that
stores the number of pixels for each color value.
Function ``value(i)`` returns the color value for pixel :math:`i`.

The time for the first ``for`` loop (which initializes
``count``) is based on the number of colors, :math:`C`.
The time for the second loop (which determines the number of pixels
with each color) is :math:`\Theta(P)`.
The time for the final line, the call to ``sort``, depends on the
cost of the sorting algorithm used.
We will assume that the sorting algorithm has cost
:math:`\Theta(P \log P)` if :math:`P` items are sorted,
thus yielding :math:`\Theta(P \log P)` as the total algorithm cost.

Is this a good representation for the cost of this algorithm?
What is actually being sorted?
It is not the pixels, but rather the colors.
What if :math:`C` is much smaller than :math:`P`?
Then the estimate of :math:`\Theta(P \log P)` is pessimistic,
because much fewer than :math:`P` items are being sorted.
Instead, we should use :math:`P` as our analysis variable for steps
that look at each pixel, and :math:`C` as our analysis variable for
steps that look at colors.
Then we get :math:`\Theta(C)` for the initialization loop,
:math:`\Theta(P)` for the pixel count loop,
and :math:`\Theta(C \log C)` for the sorting operation.
This yields a total cost of :math:`\Theta(P + C \log C)`.

Why can we not simply use the value of :math:`C` for input size and
say that the cost of the algorithm is :math:`\Theta(C \log C)`?
Because, :math:`C` is typically much less than :math:`P`.
For example, a picture might have 1000 :math:`\times` 1000 pixels and
a range of 256 possible colors.
So, :math:`P` is one million, which is much larger than :math:`C \log C`.
But, if :math:`P` is smaller, or :math:`C` larger (even if it is still
less than :math:`P`), then :math:`C \log C` can become the larger
quantity.
Thus, neither variable should be ignored.
