.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Software Design and MVC
=======================

Objectives
----------

Upon completion of this module, students will be able to:

* Identify functional and non-functional requirements
* Identify classes, fields, methods, and class relationships from documented requirements
* Describe the purpose and benefits of using Design Patterns
* Explain and use MVC and Observer Design Patterns
* Apply and demonstrate good design practices
* Produce the design of a software system using a UML class diagram

[9:30] Intro to Software Design Video
-------------------------------------

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_4gfpbvoi&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_1zy32v9u" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>

TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="Intro to Software Design.pptx">
   </a>

Functional and non-functional requirements
------------------------------------------

If you are ever tasked to design some software product and you find yourself
with only a high-level overview describing the proposed software product it may
be a good idea to start your analysis and design by **identifying** and
**documenting** potential functional and non-functional requirements.

This may help you to better envision the software product, the different users
and processes the software may support, as well as the various operations and
features expected within the software.  At the very least this exercise will
give you a starting point for subsequent discussions with stakeholders and
users, hopefully leading to more detailed requirements gathering.


Note, functional and non-functional requirements will be explored in much
greater detail in other courses.

For now a general understanding of these requirements would be sufficient.

Review the descriptions and examples of functional and non-functional
requirements provided below then click "next" to continue.

Functional Requirements
~~~~~~~~~~~~~~~~~~~~~~~

These are requirements that specify **what** a given system or software product
should do.  Functional requirements are often phrased in the
form "The system shall do "*<requirement>*".

With respect to an **e-Commerce solution (online storefront)** some examples
of functional requirements could be:

The system shall allow users to ________

* Search for a product based on specific search criteria
(for example by name, description, or product identifier)
* View product details
* Add a product to the shopping cart
* Remove a product from the shopping cart


The system shall allow registered customers to ________

* Place an order
* Submit a payment
* View order details
* Sign in to their account (log in)
* Manage account profile
* Change password


With respect to a Library management system some examples of functional requirements could be:

The system shall allow patrons (i.e. people who use the library ) to ________

Search for a book based on specific search criteria (for example by title, author, or ISBN)

* View book details
* Reserve a book
* Borrow a book
* Return a book



Non-functional requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~

While functional requirements specify **what** a system should do,
non-functional requirements specify how it should do it, i.e how a given
system or software product should perform its various functions.  Non-functional
requirements often specify quality attributes including those associated with
usability, performance, reliability, security, maintainability etc.

With respect to an **e-Commerce solution (online storefront)** some examples
of non-functional requirements could be:

The system shall ________

* Function correctly on all browsers and browser versions released after 2018
* Utilize Responsive Design
* Complete (and provide results for) user-initiated searches within 2 seconds
* Be capable of handling 10 million users per hour with no degradation in
performance/user response times
* Only accept account passwords that are a minimum of eight (8) characters in
length and contain - at least one uppercase letter, one special characters,
and one digit


With respect to a **Library management system** some examples of non-functional
requirements could be:

The system shall ________

* Complete (and confirm the success or failure of) user-initiated requests
within a maximum response time of 4 seconds
* Support the tracking and management of a minimum of 100,000 library
books and related library media
* Support up to 5000 patron requests per minute
* Be easy to use by people with basic computer literacy skills (Browsers,
Web Browsing, Word Processing, Search Engines, etc )
* Include validation checks, user confirmation prompts, and other prompts for
all relevant operations to help people avoid making mistakes



Checkpoint 1
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable


Identifying classes, fields, and methods
----------------------------------------

The first steps in crafting the design of a software product with a
UML class diagram is to review the documented requirements with the goal of
identifying the system's classes, fields, and methods.

Fortunately this is not a very difficult task!

All you need to do to get started is to review the software requirements
and note all of the nouns, verbs, processes, and concepts.

Recall that a class is a blueprint or specification for an object.  They are
usually entities of interest with attributes (pieces of data/information,
commonly referred to as fields) and behaviors (methods) that are needed for
the software to function as intended.


Identifying classes and fields
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Classes and fields are derived from the nouns and noun phrases found within
our software requirements documentation.  Some may also be found by considering
how our software product will be used, the processes the software is intended
to support, and the users of the software.

Nouns and noun phrases either refer to the entities (things) of interests to
the system or to the individual pieces of data/information associated with
these entities.

As such nouns and noun phrases are good candidates for classes or fields of a
class.

Distinguishing which nouns are classes and which are fields
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Once you have noted all of the nouns you next need to determine which are
classes and which are fields.  The following rules will help you to distinguish
classes from fields.

* Nouns and noun phrases which refer to an entity (a thing) with more than one
attribute of interest are most likely classes

* Nouns and noun phrases which refer to a single attribute or data item are
most likely fields of some class


Data Structures
~~~~~~~~~~~~~~~

Thinking about the class, the entities that it needs to interact with, and its
fields and what they contain, should help you to identify if a class needs to
interact with (or manage) a single instance of another class or multiple
instances of another class.

If multiple instances are required then this may be accommodated within your
design either through the use of multiple fields or through a single field
representing a collection of instances of the other class.

Think about the software, its purpose and processes, then determine if it would
be wise to manage these instances as a collection.

If a collection is needed then the next step would be to evaluate  and choose a
data structure(s) that provides operations and features appropriate to the needs
of the envisioned system.



Identifying methods of a class
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Methods are derived from the verbs  and verb phrases found when reviewing the
software requirements documentation and considering the processes the software
is intended to support.

Verbs and verb phrases suggest the responsibilities of a class, these will help
you derive the methods.

Remember that each class should conform to a single clear abstraction, a
single set of related responsibilities.  Further each method should perform or
accomplish one task well.

Group the verbs and verb phrases under the class that should be responsible
for performing those actions or tasks.  Those are likely the methods of that
class.  Remember that a class should typically be responsible for managing
itself and its fields.



Access Modifiers and Visibility of classes, fields, and methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Access modifiers allow developers to specify whether other classes can use a
particular field or invoke a particular method of a given class.

New developers often forget to specify the access modifiers for classes,
fields, and methods.

This is a bad habit and something to avoid since omitting an access modifier
may result in some unexpected behavior, breaking encapsulation and
potentially allowing outside classes to access fields and methods in
unintended ways.

You should always specify access modifiers for all classes, fields, and
methods, both when depicting the software design and when developing the
software solution.


.. list-table:: Access Modifiers
   :header-rows: 1

   * - Access Modifier / Visibility Modifier
     - Same Class
     - Same Package
     - Outside Package
     - World
     - Notes
   * - **Not Set** For example some developers would declare a method like ``int print(int n)`` and omit the access modifie
     - Yes
     - Yes
     - No
     - No
     - **Avoid this!** Always specify an access modifier!!
   * - Public
     - Yes
     - Yes
     - Yes
     - Yes
     -
   * - Private
     - Yes
     - No
     - No
     - No
     -
   * - Protected
     - Yes
     - Yes
     - Yes
     - No
     -

Good design tends to adopt the approach of setting everything as **private**
except those fields and methods you explicitly wish outside classes to interact
with.

As a general rule the fields of your class should be set as **private** and
grant other levels of access on a **case-by-case basis**.

Access to these fields should be provided via corresponding getter and setter methods.

Typically getter and setter methods are **public** methods.



More information is available via the link below

`https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html <https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html>`_


Design Activity: Case Study e-Commerce solution (online storefront) for ABC Ltd
-------------------------------------------------------------------------------

Review the Case Study below, then

* Consider the various processes and requirements that the software solution
must support (examples could include, customer registration, checkout,
submitting a payment, sending an invoice, fulfilling an order, shipping)
* Note the nouns and noun phrases, then identify which are classes and which
fields
* Note the verbs and verb phrases, then identify possible methods for each class

Once you have completed the activity you may click on the "next" button to
proceed to the next page in the module.


Case Study - e-Commerce solution (online storefront) for ABC Ltd
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You are required to produce a design for an e-commerce solution
(online storefront) for the retail company ABC Ltd.

This design must take the form of a UML class diagram.
High-level requirements have been provided below.



ABC will use the solution to promote and sell the thousands of products listed
in ABC’s product catalog.  Though ABC expects to add other products in the near
future the catalog currently includes books, DVDs, music CDs, apparel, consumer
electronics, beauty products, kitchen items, jewelry, watches, garden items,
and toys.

Potential customers must be able to visit the online storefront to:

* Search or browse ABC’s product catalog
* View product details (including description, price, customer ratings and
reviews, etc.)
* Manage their shopping cart (add products to cart, remove products, etc.)

In addition, registered customers must be able to login, manage their user
account, check out/place orders, and submit reviews of items previously
purchased.  To register a customer user must complete and submit an online
registration form, providing ABC with their email address, password, and one
or more of each of the following, phone number, shipping address, billing
address, and payment details.

ABC’s  customer service, order fulfillment, and other employee users must also
be able to use the system to support business operations.


Identifying relationships, hierarchies, and opportunities for reuse
-------------------------------------------------------------------

The next step to crafting the design of a software product is to identify the
superclasses, subclasses, and the relationships among classes.

Generalization / Inheritance
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Recall that there may be “is a” relationships, also referred to as
Generalization / Inheritance relationships, where a child class (or subclass)
"inherits" common attributes (fields) and behaviors (methods) from some
parent class (superclass).

Identifying these relationships, and the corresponding subclasses and
superclasses, is usually a good early step towards a final design.

Realization
~~~~~~~~~~~

Further, there may be Realization relationships, where one class,
**the interface**, conceptually defines a set of attributes (fields) and
behaviors (methods) as a contract, with another class agreeing to
"contract terms" and "realizing" the contract, by implementing the
attributes (fields) and behaviors (methods) in accordance with the
contract's requirements.

If you are making use of an ADT, you should have one or more realization
relationships to include in your design.  If not, then you may need to
revisit your classes and add the appropriate interface(s).

Aggregate/Composition
~~~~~~~~~~~~~~~~~~~~~

There may be “has a” relationships, also referred to as
Aggregation relationships, that depicts a part-whole or part-of relationship
between entities (classes).



Other relationships and design considerations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Other relationships such as **Association**, **Dependency**,
**Composition**, and **Multiplicity** may also exist.  The detail required by
your UML class design document depends greatly on your software development
context, some require the full use of all appropriate UML annotation, while
others may require that only the most important design elements  be depicted.

When in doubt about the level of detail needed please feel free to ask
questions and review the UML class designs provided within the examples
provided throughout the module, labs, and projects.

Note: All of the relationships mentioned above should be depicted where appropriate.



TODO: fix URLS.

Much of what you need to know for this step has been covered within the
`LINK <Java OOP (Object Oriented Programming) Module>`_ .  Additionally you may
download the UML Diagram key via this link

TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="here">
   </a>

TODO: fix URLS.
We encourage you to review the `LINK <Java OOP (Object Oriented Programming) Module>`_ .
and

TODO: fix URLS.
`LINK <UML Diagram key>`_

Then continue the activity below


Activity
--------

Nouns and Noun Phrases
~~~~~~~~~~~~~~~~~~~~~~

* Products
* Product Catalog
* Books
* DVDs
* Apparel
* Consumer Electronics
* Beauty items
* Kitchen items
* Jewelry
* Watches
* Toys
* Customers
* Ratings
* Reviews
* Shopping cart
* Account
* Orders
* User
* Email address
* Password
* Shipping address
* Billing address
* Payment details
* Employee users

Concepts
~~~~~~~~

* User Account
* Shopping cart
* Checking out
* Payments, Payment system, Payment Options
* Order fulfillment

Considering the above we may identify the following as an initial list of possible classes.

* Product Catalog
  * Product
    * Book
    * DVD
    * Apparel
    * Consumer Electronics
    * Beauty Item
    * Kitchen Item
    * Jewlery
    * Watch
    * Toys
* Rating
* Review
* Order
* Payment
* User
* Customer
* Employee

Note: There may be other options,

For example:

ShoppingCart could be a class or simply a collection of Products

Address could be a class with fields for street, city, country etc. or simply
a single String.  If Address is a class then the fields billingAddress and
shippingAddress could then be of type Address.

Superclass and Subclasses
~~~~~~~~~~~~~~~~~~~~~~~~~

Now that we have our candidate list of classes we can identify superclasses and
subclasses, recall that we are looking for "Is-a" relationships between pairs
of classes.



Some should hopefully become immediately apparent.

We may recognize possible superclass/subclass pairs when considering Products

Note:

* Book "Is-a" Product
* DVD "Is-a" Product
* So are Apparel, Consumer Electronics, Beauty item, Kitchen item, Jewelry, Watch, and Toys!

We have our first superclass and subclass hierarchy!



Additionally

* Customer "Is-a" User
* Employee "Is-a" User



Keep in mind that the envisioned software system would need to manage pieces of
information common to each Product as well as any information and behaviors
unique to each type of Product.

For example price and description would be attributes of interest common to
all Products, whether Apparel, Book, or DVD.

On the other hand, for a Product like Apparel the system would need to also
manage unique Apparel-specific attributes like size, material type, and color.
For a Product like a Book the system would need to manage unique Book-specific
attributes like ISBN and author.

A good design approach would be to include the attributes and behaviors common
to all within the respective superclass or parent class, in this case
Product.  The unique attributes and behaviors will then be included as part of
each subclass or child class.


Relationships and Data Structures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You may have already identified your Data Structure needs when defining the
fields for your classes.  Great job!

Further examination of the relationships may help you identify if the design
requires one or more Data Structures or refine your approach to including
Data Structures within your design.

Pay particular attention to Aggregation, Composition, and Multiplicities.
For example, one class may include multiple instances of another,
a ProductCatalog for example, would include multiple instances of Product.
Within the design this can be accommodated either through multiple fields or
through a single field representing a collection of Products.   Upon
recognizing such a need you would then need to decide on which data
structure(s) would be most appropriate.



For other relationships think about the Concepts, Verbs and Verb Phrases, and
the processes the software will support.  Reflecting on these would help you
refine your design document.

We have restated the Concepts, Verbs and Verb Phrases for the Case
Study - e-Commerce solution (online storefront) for ABC Ltd, for your review.

Concepts
~~~~~~~~

* Online Store
* User Account
* Shopping Cart
* Checking Out
* Payments, Payment system, Payment Options
* Order fulfillment

Verb and Verb Phrases
~~~~~~~~~~~~~~~~~~~~~

* Search or Browsers
* Manage (shopping cart)
* Add and remove (products)
* Register (customer account)
* Place (an order)
* Submit (reviews)
* Support (employees)


Review your design with a critical eye, ask yourself, "can my design support
this concept, process, or action"? If not, what needs to be changed to refine
your design?


Checkpoint 2
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable


Intro to Design Patterns and MVC
--------------------------------

Patterns
~~~~~~~~

The idea of leveraging patterns, repeatable best-practice solutions to
commonly occurring well-explored problems, was first introduced in
Architecture within the 1977 book  "A pattern language: towns, buildings,
construction".

Within this book the authors convey the following thoughts about the potential
benefits of leveraging patterns:

“Each pattern describes a problem which occurs over and over again in our
environment, and then describes the core of the solution to that problem, in
such a way that you can use this solution a mil­lion times over, without ever
doing it the same way twice”

A Pattern Language - Towns, Buildings, Construction
Christopher Alexander, Sara Ishikawa, Murray Silverstein, Max Jacobson,
Ingrid Fiksdahl-King, Shlomo Angel


Design Patterns
~~~~~~~~~~~~~~~

The software engineering community, inspired by these authors and the
potential benefits of harnessing prior experiences to solve common problems,
chose to adopt a similar approach through the creation and use of Design
Patterns.

"In software engineering, a design pattern is a general reusable solution to a
commonly occurring problem in software design. A design pattern is not a
finished design that can be transformed directly into code. It is a description
or template for how to solve a problem that can be used in many different
situations."

Design Patterns provide software developers best-practice solutions to the
problems they encounter during software design and development.

It is important to note these design patterns evolved over a period of time,
through trial-and-error and the hard won experiences of many different
developers.  Understanding and appropriately using design patterns speeds up
the development process, help developers avoid common pitfalls, and in general
helps software developers learn and practice good software design without
needing to experiences the failures and trial-and-error of those who came
before us.


[11:00] MVC and Observer Video
------------------------------

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_pws7qjiz&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_5sdnrfdi" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


Reflect upon existing designs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now that we've been introduced to MVC let us take a moment to reflect upon an
existing design, specifically the design of the game presented within the
Project 3 specification.

Does the design of the game incorporate elements of MVC?  Yes definitely!

Now that we agree upon that let's consider, which class(s) would be the
Controller and which the View?



MVC Example AddressBook
-----------------------


Consider the design of a simple mobile AddressBook application used to manage a
person's collection of contacts.  Building an application of this nature would
necessitate writing code responsible for:

Managing and maintaining the various data items associated with each contact,
including their first name, last name, and phone number(s)
Handling the processing of the data items into useful information, providing
necessary user features, responding to user input, and ensuring that the
application's rules are followed
Presenting the data and information to the user as well as providing a
facility for users to interact with the data and information presented
This collection of responsibilities has been well explored over the decades
of software development in many other application areas.

We can therefore leverage insights and expertise derived from past
experiences and make use of proven designs.  One proven design for applications
requiring data logic, processing logic, and presentation logic,  is the
MVC (Model–View–Controller) Design Pattern.

Take a moment to reflect on the MVC (Model–View–Controller) Design Pattern
and the AddressBook application and consider the design of the AddressBook
application.

.. odsafig:: Images/ExMVCAddressBook.png
   :align: center



TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="Example: ExMVCAddressBook">
   </a>


Design Review: Case Study - e-Commerce solution (online storefront) for ABC Ltd.
--------------------------------------------------------------------------------

Recall from the "Intro to Software Design Video" we discussed a number of
steps to producing a proper design.  At this point you should review and
reflect upon your draft design for the e-Commerce solution (online storefront)
for ABC Ltd. then consider what you have learnt since producing the last
version.

While you review your design you should consider if the e-Commerce solution
(online storefront) for ABC Ltd.  requires one or more Data Structures to
manage the data/objects used by the system as well as if the design would
benefit from the application of Design Patterns like MVC or Observer.


Data Structure
~~~~~~~~~~~~~~

Once you have determined that a given design needs one or more Data Structures
the designer must then assess each of the Data Structures they have been
exposed to.  Further the designer must consider the requirements of the
application along with the features and operations of the various
Data Structures, determining if any specific feature or operation would be
useful or necessary for the given application.

With respect to the e-Commerce solution (online storefront) for ABC Ltd.
it should become apparent that the design should, in fact, incorporate at
least one Data Structure.  The concepts and nouns for ProductCatalog, Payments,
Orders, Shopping Cart, and UserAccounts all indicate possible groupings or
collections of Objects that need to be managed by the system.

Consider the various Data Structures, which would you choose for each and why?

For example would it make more sense to use a Bag or a Stack for a ShoppingCart?
We know that a Shopping Cart should allow for adding and removing of elements
(Products or Items) without any restrictions regarding which element may be
added or removed at any given point in time.  A Stack adds restrictions to
such ShoppingCart operations without adding any significant benefits, as such
a Stack would NOT be appropriate when compared against a Bag.

What about for a ProductCatalog, would a Bag, List, Queue, or some other
Data Structure make the most sense? Again always have a reason for your choices.

Revisit your software requirements if you are uncertain about how to
determine the most appropriate one then perhaps .

For example, would it be beneficial for the system to including a sorting
feature for the Product Catalog?  The answer, most likely, is yes.

This would probably be one of the requirements of the system.

If so then you, the designer, should consider which Data Structure supports
sorting and which do not, this should help narrow down the most appropriate
options for the implementation of the Product Catalog.

Consider each requirement and collection in turn then refine your design to
include the chosen Data Structure(s) and supporting classes (Interfaces etc.).



Design Patterns
~~~~~~~~~~~~~~~

Hopefully your design is progressing well, now is as good a time as any to
consider the possible use of one or more design patterns.  While this would be
the focus of much more in-depth study in later Software Engineering courses we
have a relatively easy decision to make at this level.  For now, with respect
to the e-Commerce solution (online storefront) for ABC Ltd.,  we are primarily
concerned with answering the following questions:

* Should the design make use of the MVC Design Pattern?
* Should the design make use of the Observer Design Pattern?
* Should the design make use of both the MVC and Observer Design Patterns?


Based on our understanding of MVC and the requirements of the e-Commerce solution
(online storefront) for ABC Ltd. it is apparent that our proposed system

* requires a GUI (View)
* has data and business logic to manage (Model), and
* has processing that needs to be handled, some of which would be in
response to user interactions (Controller)

The pattern of our application's needs match what is offered by the
MVC Design Pattern, it would therefore be a good fit for this design.

For now we will not delve too deeply into the Observer Pattern, while it
could be useful in this application it also adds (for this application)
unnecessary complexity.  We use Observer when we have Objects (Observables)
with continuously changing states that another Object (the Observer) needs
to be notified of.

With respect to the e-Commerce solution (online storefront) for ABC Ltd. the
state of most of the Objects are mostly affected when the user directly
interacts with them.  The Objects do not change state on their own and,
for now, are not prompted to change state by anything classes other than the
View, Controller, or Model.  As such these already work together to updating
the relevant classes that could be considered as Observers (for example the
View or GUI classes).

With respect to this Case, the MVC Design Pattern should be used while the
Observer (for now, should not).

You should review your current design and amend it to include these updates.

Case Study - Vending Machine
----------------------------

You have been hired to produce a high-level software design for a
Vending Machine application.

This design must take the form of a UML class diagram.

Your client has asked you to use good examples of actual vending machines as
inspiration for your software design.

With respect to other requirements your client has indicated that the physical
vending machine would be similar in form, behavior, and features to the machine
depicted in the images below.



.. odsafig:: Images/VendingMachine1.png
   :align: left

.. odsafig:: Images/VendingMachine2.png
   :align: center

.. odsafig:: Images/VendingMachine3.png
   :align: right


Consider the software requirements of the software needed to support the
Vending Machine, then

* Consider the various processes that the software solution must support and
note the main processes and some of the main requirements
* Review your notes, identify the nouns and noun phrases, then consider
which are classes and which fields
* Review your notes, identify the verbs and verb phrases, then identify
possible methods for each class

Once you have completed the activity you may click on the "next" button to
proceed to the next page in the module.
