.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Style and Documentation: Introduction
=====================================
- Introduction <- You are here
- :doc:`Naming </ContentStyleNaming>`
- :doc:`Format </ContentStyleFormat>`
- :doc:`Documentation </ContentStyleComment>`
- :doc:`Other Issues </ContentStyleOther>`
- :doc:`Review </ContentStyleReview>`



Overview & Objectives
---------------------
*Upon completion of this module, students will be able to:*

- Describe the software engineering benefits to following style guides and software development standards and conventions
- Apply naming, formatting, and commenting conventions and best practices
- Format and indent code in accordance with current standards and conventions
- Create properly formatted JavaDoc Comments
- Prepare effective Internal Documentation/Comments
- Appraise the quality of the internal documentation included in produced code


Suggested Reading:
---------------------

**Appendices A (Documentation and Programming Style)**  from `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <http://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

Introduction to Style and Documentation
---------------------------------------
A note about style
Building software is a complex and typically collaborative process involving: 

- Multiple programming languages, environments, libraries, and related technologies
- A myriad of stakeholders with unique stakeholder needs and interactions
- A number of developers and development and project teams
- A diverse variety of developer skill sets and individual developer coding "styles", practices, and preferences

The Software Development process, like many other complex endeavors,  often follow a life cycle.  While there are various life cycle options many usually involve phases of planning,  requirements gathering and analysis, design, development/implementation, testing, deployment and integration, and maintenance. 

The programming languages, environments, libraries, and technologies developers use are also evolving.  Functions, features, and approaches become obsolete or "deprecated", eventually being replaced by newer, more favored, ones.   

Developers write code which are then handed over to others for review, approval, and migration (deployment) into "production" or for integration with other code.  Most often the software produced eventually enters into the "maintenance" phase of the software development life cycle.  Once there it may undergo future code reviews, general maintenance, and modification.

    | "Hardly any software is maintained for its whole life by the original author."  - Oracle 1996

 

The challenge
-------------
These varied complexities affect software development in a number of ways, such complexities, when combined with the changing demands of software stakeholders, create a context where it becomes critical for developers to be able to acclimate quickly.

This "acclimation" may entail developers learning new programming paradigms, languages, and libraries and developing the skills to be able to review and understand code written by others, or by themselves in the distant past. 

This raises a number of concerns including,

- What can be done to help developers adopt and use new programming languages, approaches, and technology with minimum effort and the least stress possible?
- What measures can be put in place to facilitate developer acclimation when dealing with new or vaguely familiar code?
- What support can be provided to help developers understand new code quickly and effectively?

We address many of these concerns through the use of style guides and software documentation.

 

Style Guides
------------
A style guide is essentially a set of standards, conventions, guidelines, and practices which a developer should adhere to when writing, formatting, and documenting software solutions. Such guides often support other aspects of software development, including software design and testing.  

Adhering to style guides and code conventions improves the readability and maintainability of code.

It is important to note that there is no one set of standards, conventions, and guidelines, rather you are likely to encounter a hierarchy of them. For example the creators of a given programming language will provide documentation to inform standards, conventions. and general use.  The community of developers who utilize the language (or follow the programming paradigm the language adheres to) may adopt and communicate additional standards and conventions.  Furthermore, internally within a given organization, team, or project, there may be other specific standards, conventions, and guidelines, layered on top of others higher up in the hierarchy.

 

.. admonition:: Takeaway

    - Developers need to quickly and effectively understand new (or long-forgotten) code and new technologies
    - Style guides help with this task
    - Developers should form the habit of understanding and adopting the standards, conventions, and practices conveyed within the style guides relevant to their software development context  
 


