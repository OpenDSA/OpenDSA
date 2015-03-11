.. _Introduction:

Introduction
============

This documentation describes various components of the OpenDSA system.
This includes the support infrastructure for authoring OpenDSA
modules, information helpful for developing AVs and exercises,
documentation for the textbook configuration system (to control which
modules and exercises are generated for a specific book instance and
how the exercises are scored),
documentation for using the front-end (client-side) portion of the
logging and scoring infrastructure,
and documentation for the back-end (server-side) API and data storage
system.

AVs and exercises are typically built using the JavaScript Algorithm
Visuailzation library (JSAV).
Complete documentation for JSAV can be found at
http://jsav.io.

If you are new to OpenDSA, it will help you to keep in mind as you
look through this manual that it targets a lot of different things,
but you are probably concerned with only one of several possible roles
at any given time.
Those roles include:

#. Content developer: Someone who wants to create or modify modules,
   visualizations, or exercises If so, you want to read the sections on
   creating content.

#. Instructor: Someone with a class to manage. If so, you want to read
   about the instructor tools. If you want to set up your own book
   instance by picking and choosing from the OpenDSA collection of
   materials, then look at compiling a book instance and the
   configuration system.

#. System administrator: Someone who wants to set up their own copy of
   OpenDSA. OpenDSA separates the front end content delivery server
   from the back end data collection server. You might want to set up
   either or both, in which case you should look at the installation
   guides.

#. OpenDSA Infrastructure developer: If you want to help to extend the
   OpenDSA infrastructure, then you will need to understand the
   details of the part of the system that you are targetting.
