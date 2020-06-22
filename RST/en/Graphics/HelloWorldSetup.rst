.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: David Furcy and Tom Naps


Introduction to WebGL
=====================

Setting Up a WebGL HelloWorld Program
-------------------------------------

WebGL is a graphics language that uses both your CPU and your GPU.
Figure :num:`Figure #ProgrammablePipeLine` shows the WebGL *programmable pipeline*.

.. _ProgrammablePipeLine:

.. odsafig:: Images/graphics-programmable-pipeline.png
   :width: 1200
   :align: center
   :capalign: justify
   :figwidth: 98%
   :alt: The Programmable Pipeline

   The Programmable Pipeline.

This is an imposing diagram.  Over the course of this book we will
refer to it often and come to understand all of its components.  In
this initial section, we will just touch upon a few of those
components.

A WebGL program is comprised of three different code groups.  First
there is JavaScript code that runs on your CPU.  In the
ProgrammablePipeLine_ diagram, references to this JavaScript code
appear at the left end of the pipeline.  The JavaScript code is mainly
responsible for operations that ideally only need to be executed once
-- at the start of the program's execution.  In the example we will
discuss below these operations include the computation of the vertices
of a square.  The JavaScript program then sends these vertices to your
GPU in a *vertex buffer*.  On the GPU there are two code groups -- the
*vertex shader* and the *fragment shader*.  Each of these shaders are
written in the GLSL shader language.  They appear as special scripts
in an HTML file that accompanies the JavaScript code group.  It is
worth noting that your GPU is a parallel processor specifically
designed for graphics operations.

When executing the vertex shader code, each core on your GPU is
working with one vertex in the vertex buffer, determining what
transformations, if any might be applied to that vertex.  In the GLSL
language, the vertex assigned to an individual core is called an
*attribute*.  The transformed vertex coming out of each core in the
vertex shader code is given the GLSL name **gl_Position**.

When executing the fragment shader code, each core on your GPU is
determining what color to assign to a particular pixel on your display
screen.  The number of pixels on the screen will far exceed the number
of vertices in your geometric figures.  For example, a triangle is a
*fragment* that has only three vertices but will cover many more than
three pixels.  Hence the properties of the pixel that the fragment
shader receives must be a location that is *interpolated* based on the
location within the triangular region determined by three vertices
that define the fragment.

.. _Hello World Example:

With this overview in mind, consider the simple "Hello World" WebGL
program described below.

.. inlineav:: HelloWorldSetupCON ss
   :long_name: Setting Up a Hello World Program
   :links: AV/Graphics/HelloWorldSetupCON.css
   :scripts: AV/Graphics/HelloWorldSetupCON.js
   :output: show

When the code from our `Hello World Example`_ executes, in your browser the resulting display is:

.. iframe:: AV/Graphics/HelloWorld.html
    :name: HelloWorld
    :width: 1100
    :height: 800
	    

HelloWorld with a Viewport
--------------------------

Test

.. iframe:: AV/Graphics/HelloWorldViewPort.html
    :name: HelloWorldViewPort
    :width: 1100
    :height: 800
	    
