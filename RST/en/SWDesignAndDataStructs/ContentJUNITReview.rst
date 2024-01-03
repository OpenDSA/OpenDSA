.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Java Unit Testing
=========================

Objectives
----------

Upon completion of this module, students will be able to:

* Review the basics of a java class including fields, constructors, methods, parameters, and use of the keyword this
* Review debugging code and code coverage
* Implement variations for JUnit assert statements

Interactive: Introduction to Hokie Class
----------------------------------------

In this discussion we will be revisiting good testing practices with an example class called "Hokie Class".

.. admonition:: Follow Along, Practice and Explore
   
       Download to run and explore the java file (see below) from the video on your own in eclipse. You may download the standalone \*.java file for this example. To run the standalone \*.java file you will need to 
           1) create a new Eclipse project, then 
           2) create a package within the project called “example” (the package named at the top of the class MUST match the package the file is placed in within the Eclipse project), and finally 
           3) download and import the standalone \*.java file(s) to the created package.
   
      .. raw:: html
   
         <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/Hokie.java"  target="_blank">
         <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
         Hokie.java</img>
         </a>
   
   
   .. raw:: html
   
       <center>
       <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_0850nht8' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
       </center>


Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/JunitCheckpoint1Summ.html ka
   :long_name: Checkpoint 1


Intro to Hokie Class JUnit Testing
----------------------------------

A Note about Assert Statements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

So far in the course when we want to test that a piece of code acted the way we wanted, we'd run a statement like:

.. code-block:: java

   assertThat(<something we want to check>).isEqualTo(<expected value>);


This is a more modern style that's intended to be more readable. However, there is a different form of syntax you can use to create assertions:


.. code-block:: java

   assertEquals(<expected value>, <something we want to check>);

This second kind of assert statement is more commonly used today, but it can be tricky to use correctly.  When using ``asserEquals``, it can be easy to put the value we want to check first and the expected value second.

For example, say we wanted to check that a variable ``x`` was equal to 5.

.. code-block:: java

   int x = 4;
   assertEquals(x, 5);

Writing like this would be syntactically correct, but potentially confusing because the failure message would read "Expected [4] but got [5]".  In reality, we were
*expecting* 5 but *got* 4.

Videos in the second half of the course will be using this second, more commonly
used syntax.  You can continue to use either version.  Below, is a table of
assertions in both styles.

.. list-table:: Assertions
   :header-rows: 1

   * - Task
     - AssertThat Style
     - Traditional Style
     - Notes
   * - Checking that ``x`` is equal to 5
     - ``assertThat(x).isEqualTo(5);``
     - ``assertEquals(5, x);``
     - While the new style has a ``.isNotEqualTo()``, there is no ``assertNotEquals()`` in the old style
   * - Check that a double ``x`` is equal to double ``y``
     - ``assertThat(x).isEqualTo(y, within(0.01));``
     - ``assertEquals(y, x, 0.01);``
     -
   * - Checking that ``x`` is ``true``
     - ``assertThat(x).isTrue();``
     - ``assertTrue(x);``
     -
   * - Checking that ``x`` is ``false``
     - ``assertThat(x).isFalse();``
     - ``assertFalse(x);``
     -
   * - Checking that ``x`` is ``null``
     - ``assertThat(x).isNull();``
     - ``assertNull(x);``
     -
   * - Checking that ``x`` is *not* ``null``
     - ``assertThat(x).isNotNull();``
     - ``assertNotNull(x);``
     -
   * - Checking two object variables refer to the same space in memory
     - ``assertThat(obj1).isSameAs(obj2);``
     - ``assertSame(obj2, ob1);``
     -


Interactive: Hokie Class JUnit Testing
--------------------------------------
.. admonition:: Follow Along and Engage
     
         Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!
     
        .. raw:: html
        
           <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/JavaUnitTesting.pdf"  target="_blank">
           <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
           JavaUnitTesting.pdf</img>
           </a>
     
     
     .. raw:: html
     
        <center>
        <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_35cpol6i' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
        </center>


Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/JunitCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

Review of Writing JUnit Tests with student.TestCase
---------------------------------------------------

.. raw:: html
    
    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_zj2voxbz' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>



Use JUnit
~~~~~~~~~
To make a JUnit test class in eclipse:

#. Right-click the class you’re creating a test class for in the Package Explorer

#. Click: `New > Class` (creating a JUnit Test Case isn’t CS2-Support compliant)

#. Name the class Test. (i.e. HokieTest, ArrayBagTest)

#. Click finish (You may want to check the box for ‘generate comments’ if you wish)

#. Add an import statement: import student.TestCase

#. Add that your class extends TestCase.

#. Project Build Path should be configured to have CS2-Support project included (note that CS2-Support needs to be open to appear as an option)

#. Declare instance variables

   * Create at least one field of the object of the class you are testing.

#. Write setUp method

#. Use the setUp() method to initialize your object(s), it will be run before each test method.

#. Write test methods for each method in class being tested

   * Create at least one test method for each of the methods in your class. Each method in your test class needs to start with ‘test’ or else it will not run correctly! (i.e. testGetName, testAdd) For a test method, call the corresponding method on the object and use assertion statements to test your code.

#. Write additional test methods as needed. A simplified test class example for the Student class:

.. code-block:: java

   public class StudentTest extends student.TestCase
   {
      private Student janeDoe;

      public void setUp()
      {
         janeDoe = new Student(“Jane Doe”);
      }

      public void testGetName()
      {
         assertEquals(“Jane Doe”, janeDoe.getName());
      }
   }








.. raw:: html
  
   <div class="section" id="run-a-junit-test">
   <h2>4.<span class="section-number">7.2. </span>Run a JUnit Test<a class="headerlink" href="#run-a-junit-test" title="Permalink to this headline">¶</a></h2>
   <p>To run a JUnit test class:</p>
   <ol class="arabic simple">
   <li><p>Right-click the test class in the Package Explorer</p></li>
   <li><p>Click: <code class="docutils literal notranslate"><span class="pre">Run</span> <span class="pre">as</span> <span class="pre">&gt;</span> <span class="pre">JUnit</span> <span class="pre">Test</span></code> (Click <code class="docutils literal notranslate"><span class="pre">Android</span> <span class="pre">Junit</span> <span class="pre">Test</span></code> for Android projects).  A JUnit window should pop-up and display green if all of your tests are correct and red if one more has failed.</p></li>
   </ol>
   </div>
   <div class="section" id="naming-conventions">
   <h2>4.<span class="section-number">7.3. </span>Naming Conventions<a class="headerlink" href="#naming-conventions" title="Permalink to this headline">¶</a></h2>
   <p>For classes: Add <code class="docutils literal notranslate"><span class="pre">Test</span></code> to the end of the class name</p>
   <blockquote>
   <div><ul class="simple">
   <li><p>example: <code class="docutils literal notranslate"><span class="pre">HelloWorld</span></code> is the class; <code class="docutils literal notranslate"><span class="pre">HelloWorldTest</span></code> is the test class</p></li>
   </ul>
   </div></blockquote>
   <p>For methods: start the test method with <code class="docutils literal notranslate"><span class="pre">test</span></code></p>
   <blockquote>
   <div><ul class="simple">
   <li><p>example: <code class="docutils literal notranslate"><span class="pre">foo</span></code> is the method; <code class="docutils literal notranslate"><span class="pre">testFoo</span></code> is the test method</p></li>
   </ul>
   </div></blockquote>
   </div>
   <div class="section" id="instance-variables">
   <h24.<span class="section-number">7.4. </span>Instance Variables<a class="headerlink" href="#instance-variables" title="Permalink to this headline">¶</a></h2>
   <ul class="simple">
   <li><p>Use instance variables to hold values for testing</p></li>
   <li><p>AKA field variables, member variables</p></li>
   <li><p>scope of instance variable is all instance methods so variable can be used in multiple tests</p></li>
   <li><p>in the example above, <code class="docutils literal notranslate"><span class="pre">janeDoe</span></code> is an instance variable</p></li>
   </ul>
   </div>
   <div class="section" id="setup-method">
   <h2>4.<span class="section-number">7.5. </span>setUp Method<a class="headerlink" href="#setup-method" title="Permalink to this headline">¶</a></h2>
   <ul class="simple">
   <li><p>The <code class="docutils literal notranslate"><span class="pre">setUp()</span></code> method runs before each test method.</p></li>
   <li><p>Use this method to initialize instance variables</p></li>
   <li><p><strong>Must be called</strong> <code class="docutils literal notranslate"><span class="pre">setUp</span></code> – remember to make that <strong>U</strong> uppercase!</p></li>
   </ul>
   </div>
   <div class="section" id="teardown-method-optional">
   <h2>4.<span class="section-number">7.6. </span>tearDown Method (Optional)<a class="headerlink" href="#teardown-method-optional" title="Permalink to this headline">¶</a></h2>
   <ul class="simple">
   <li><p>The tearDown() method runs at the end of each test method. It is <em>optional</em> for the test case.</p></li>
   <li><p>It is used to wrap up work after the test is concluded</p></li>
   <li><p>Uses: check the layout of a linked list, closing files</p></li>
   <li><p><strong>Must be called</strong> <code class="docutils literal notranslate"><span class="pre">tearDown</span></code> – remember to make that <strong>D</strong> uppercase!</p></li>
   </ul>
   </div>
   <div class="section" id="code-coverage">
   <h2>4.<span class="section-number">7.7. </span>Code coverage<a class="headerlink" href="#code-coverage" title="Permalink to this headline">¶</a></h2>
   <p>Write tests that test average cases</p>
   <ul class="simple">
   <li><p>example: In a list, test for adding to the middle</p></li>
   </ul>
   <p>Write tests that test edge cases</p>
   <ul class="simple">
   <li><p>example: In a list, test for adding at the beginning of a list</p></li>
   </ul>
   <div class="section" id="n-simple-conditions-n-1-branches-and-tests">
   <h3>4.<span class="section-number">7.7.1. </span>N simple conditions, N+1 branches and tests<a class="headerlink" href="#n-simple-conditions-n-1-branches-and-tests" title="Permalink to this headline">¶</a></h3>
   <p>Assertions in a test method need to make it to every condition of an if-else statement. It isn’t enough that the test reaches the ‘else’ condition. To test an if-else statement properly, the body of each condition must be run during testing.</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="o">&amp;&amp;</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="o">==</span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="c1">// 2 conditions, 3 checks- TF, FT, TT</span>

   <span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="o">||</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="c1">// 2 conditions, 3 checks- TF, FT, FF</span>
   </pre></div>
   </div>
   <p>Clarification for edge and average cases- For a list that contains 100 values, you must check for indices -1, 0, 99, 100, and something in between.</p>
   <p><strong>Example</strong>: say we had the following:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span>
   <p><code>if ( score &gt;= 90 )
   {
       System.out.println( “Your grade is an A”);
   }
   else if ( score &gt;= 80 )
   {
       System.out.println( “Your grade is a B”);
   }
   else if ( score &gt;= 70 )
   {
       System.out.println( “Your grade is a C”);
   }
   else if ( score &gt;= 60 )
   {
       System.out.println( “Your grade is a D”);
   }
   else
   {
       System.out.println( “Your grade is an F”);
   }</code></p></pre></div>
   </div>
   <p>Your test class would have to test for all 5 of the above possibilities in order to execute every single line of code in the block of if-else statements.</p>
   <p><strong>Sometimes the best way to test your code is to clean your code first!</strong></p>
   <p>Cleaning up your code before you test it can save lots of time. In addition, the way you structure your code may make it easier to test correctly.</p>
   <p>Example: Say we had written the following inside of a method:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="o">&gt;</span><span class="w"> </span><span class="n">B</span><span class="w"> </span><span class="p">)</span>
   <span class="p">{</span>
   <span class="w">    </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="o">!=</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="o">&amp;&amp;</span><span class="w"> </span><span class="p">(</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="o">&gt;</span><span class="w"> </span><span class="n">B</span><span class="w"> </span><span class="p">))</span>
   <span class="w">    </span><span class="p">{</span>
   <span class="w">       </span><span class="c1">// do something</span>
   <span class="w">    </span><span class="p">}</span>
   <span class="p">}</span>
   </pre></div>
   </div>
   <p>We can easily clean up this if statement by noticing that we are evaluating A &gt; B twice when it’s unnecessary. We can re-write it as the following:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="o">&gt;</span><span class="w"> </span><span class="n">B</span><span class="w"> </span><span class="p">)</span>
   <span class="p">{</span>
   <span class="w">    </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="o">!=</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
   <span class="w">    </span><span class="p">{</span>
   <span class="w">        </span><span class="c1">// do something</span>
   <span class="w">    </span><span class="p">}</span>
   <span class="p">}</span>
   </pre></div>
   </div>
   <p>We might decide to un-nest them as well:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="w"> </span><span class="p">(</span><span class="n">A</span><span class="w"> </span><span class="o">&gt;</span><span class="w"> </span><span class="n">B</span><span class="p">)</span><span class="w"> </span><span class="o">&amp;&amp;</span><span class="w"> </span><span class="p">(</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="o">!=</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="p">)</span>
   <span class="p">{</span>
   <span class="w">    </span><span class="c1">//do something</span>
   <span class="p">}</span>
   </pre></div>
   </div>
   <p>Now, it’s easier to see all the conditions that need to be tested.</p>
   </div>
   <div class="section" id="keep-junit-test-methods-to-a-small-example">
   <h3>4.<span class="section-number">7.7.2. </span>Keep JUnit test methods to a small example<a class="headerlink" href="#keep-junit-test-methods-to-a-small-example" title="Permalink to this headline">¶</a></h3>
   <p>When testing a method with multiple if-else statements, it can usually simplify testing to split each possibility into its own test method.This can be particularly helpful when making sure you’re reaching every condition in a more complex if-else statement block ( a common Web-CAT error ).</p>
   <p>Say we are testing a method with the following if-else statement in it:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="o">&gt;</span><span class="w"> </span><span class="n">B</span><span class="p">)</span>
   <span class="p">{</span>
   <span class="w">    </span><span class="c1">//do something</span>
   <span class="p">}</span>
   <span class="k">else</span>
   <span class="p">{</span>
   <span class="w">    </span><span class="c1">//do something else</span>
   <span class="p">}</span>
   </pre></div>
   </div>
   <p>It might be a good idea to have one test method evaluate this if statement when A &gt; B is true and another test method evaluate the same if statement when A &gt; B is false.</p>
   </div>
   <div class="section" id="assert-statements">
   <h3>4.<span class="section-number">7.7.3. </span>Assert Statements<a class="headerlink" href="#assert-statements" title="Permalink to this headline">¶</a></h3>
   <p>Assert statements are used in test classes to test code
   When you run your test class, the assert statements will let you know whether or not your code is working
   Read about them here: <a class="reference external" href="http://courses.cs.vt.edu/~cs1114/api/student/TestCase.html">http://courses.cs.vt.edu/~cs1114/api/student/TestCase.html</a></p>
   <p>Common ones:</p>
   <ul class="simple">
   <li><p>assertEquals</p></li>
   <li><p>assertTrue</p></li>
   <li><p>assertFalse</p></li>
   <li><p>assertNull</p></li>
   <li><p>assertNotNull</p></li>
   </ul>
   <p>Avoid testing via <code class="docutils literal notranslate"><span class="pre">System.out.println()</span></code></p>
   <p>Use assertion statements rather than testing via <code class="docutils literal notranslate"><span class="pre">System.out.println()</span></code></p>
   <p>Example: Say you want to make sure that the method <code class="docutils literal notranslate"><span class="pre">getName()</span></code> is returning the correct String. Rather than calling:</p>
   <p><code class="docutils literal notranslate"><span class="pre">System.out.println(janeDoe.getName());</span></code></p>
   <p>Use an assertion statement:</p>
   <p><code class="docutils literal notranslate"><span class="pre">assertEquals(“Jane</span> <span class="pre">Doe”,</span> <span class="pre">janeDoe.getName());</span></code></p>
   <p>Warning If you do NOT have any assertion statements inside a test method, it will always evaluate as “true” when run as a JUnit test. To prevent this, you can add the line:</p>
   <p><code class="docutils literal notranslate"><span class="pre">fail(&quot;Not</span> <span class="pre">yet</span> <span class="pre">implemented&quot;);</span></code></p>
   <p>inside of a test method you haven’t completed yet.</p>
   </div>
   </div>
   <div class="section" id="testing-exceptions">
   <h2>4.<span class="section-number">7.8. </span>Testing Exceptions<a class="headerlink" href="#testing-exceptions" title="Permalink to this headline">¶</a></h2>
   <p><strong>If you throw them, then catch them in your testing!</strong></p>
   <p>Use a <code class="docutils literal notranslate"><span class="pre">try-catch</span></code> block in your testing to check if your code has thrown the right exception. In your try block, you should call the method that results in an exception being thrown. The catch block should catch the exception thrown. Then assert that the exception exists, is the correct exception, and (if applicable) contains the correct message.</p>
   <p><strong>Example</strong>: Say you are trying to access an element in a data structure that cannot be accessed by using an iterator object, so you are testing to check if a NoSuchElementException is thrown with the message “There are no more elements left to iterate over.”. The following inside of a test method will determine if you caught the right exception correctly:</p>
   <p><strong>Example</strong>:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="n">Exception</span><span class="w"> </span><span class="n">thrown</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="kc">null</span><span class="p">;</span>

   <span class="k">try</span>
   <span class="p">{</span>
   <span class="w">    </span><span class="c1">//call the method that should throw a NoSuchElementException</span>
   <span class="w">    </span><span class="n">iterate</span><span class="p">.</span><span class="na">next</span><span class="p">();</span>
   <span class="p">}</span>
   <span class="k">catch</span><span class="w"> </span><span class="p">(</span><span class="n">Exception</span><span class="w"> </span><span class="n">exception</span><span class="p">)</span>
   <span class="p">{</span>
   <span class="w">    </span><span class="c1">//”Catch” and store the exception</span>
   <span class="w">    </span><span class="n">thrown</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">exception</span><span class="p">;</span>
   <span class="p">}</span>
   <span class="c1">//assert that an exception was thrown</span>
   <span class="n">assertNotNull</span><span class="p">(</span><span class="n">thrown</span><span class="p">);</span>

   <span class="c1">//assert that the correct exception was thrown</span>
   <span class="n">assertTrue</span><span class="p">(</span><span class="n">thrown</span><span class="w"> </span><span class="k">instanceof</span><span class="w"> </span><span class="n">NoSuchElementException</span><span class="p">);</span>

   <span class="c1">//Check the message of the exception is correct</span>
   <span class="n">assertEquals</span><span class="p">(</span><span class="n">thrown</span><span class="p">.</span><span class="na">getMessage</span><span class="p">(),</span><span class="w"> </span><span class="s">&quot;There are no more elements left to iterate over.&quot;</span><span class="p">);</span>
   </pre></div>
   </div>
   <div class="section" id="testing-toarray-methods">
   <h3>4.<span class="section-number">7.8.1. </span>Testing toArray() methods<a class="headerlink" href="#testing-toarray-methods" title="Permalink to this headline">¶</a></h3>
   <p>The <code class="docutils literal notranslate"><span class="pre">toArray()</span></code> method returns an Object array containing each element found in a given collection.</p>
   <p>Testing the <code class="docutils literal notranslate"><span class="pre">toArray()</span></code> method requires that we confirm that the actual array of Objects returned by the method matches an expected array of Objects.</p>
   <p>Note that the <code class="docutils literal notranslate"><span class="pre">assertEquals</span></code> and <code class="docutils literal notranslate"><span class="pre">assertTrue</span></code> methods <strong>do NOT</strong> provide a mechanism to readily compare two arrays.
   We therefore cannot simply perform the following:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="n">Object</span><span class="o">[]</span><span class="w"> </span><span class="n">expectedArray</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="p">{</span><span class="s">&quot;A&quot;</span><span class="p">,</span><span class="s">&quot;B&quot;</span><span class="p">,</span><span class="s">&quot;C&quot;</span><span class="p">,</span><span class="s">&quot;D&quot;</span><span class="p">};</span>

   <span class="n">Object</span><span class="o">[]</span><span class="w"> </span><span class="n">actualArray</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="p">{</span><span class="s">&quot;A&quot;</span><span class="p">,</span><span class="s">&quot;B&quot;</span><span class="p">,</span><span class="s">&quot;C&quot;</span><span class="p">,</span><span class="s">&quot;D&quot;</span><span class="p">};</span>

   <span class="n">assertEquals</span><span class="p">(</span><span class="n">expectedArray</span><span class="p">,</span><span class="w"> </span><span class="n">actualArray</span><span class="p">);</span>
   </pre></div>
   </div>
   <p>Using the assert in this manner would result in a failed test and an <code class="docutils literal notranslate"><span class="pre">AssertionFailedError</span></code> (see image below).</p>
   <div class="figure align-center" style="width: 90%">
   <img alt="_images/eclipse_failure_trace.png" src="_images/eclipse_failure_trace.png" />
   </div>
   <p>nor can we use:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="n">assertTrue</span><span class="p">(</span><span class="w"> </span><span class="n">expectedArray</span><span class="p">.</span><span class="na">equals</span><span class="p">(</span><span class="w"> </span><span class="n">actualArray</span><span class="p">)</span><span class="w"> </span><span class="p">);</span>
   </pre></div>
   </div>
   <p>We need therefore need an alternative option.</p>
   <p>One approach is to iterate through the elements of each array, comparing each element in one array with the corresponding element in the other array. If any pair do not match then we can conclude that the two arrays are not equal and therefore return false.  Note that we must check ALL of the elements of an array against their counterparts before we can determine if they are equal or not.  They will only be equal if we did not encounter any two pairs that were not equal to each other. In this case, for example, we would start by comparing the elements at index 0, i.e. compare <code class="docutils literal notranslate"><span class="pre">expectedArray[0]</span></code> against <code class="docutils literal notranslate"><span class="pre">actualArray[0]</span></code>,then index 1, i.e. compare <code class="docutils literal notranslate"><span class="pre">expectedArray[1]</span></code> against <code class="docutils literal notranslate"><span class="pre">actualArray[1]</span></code>, and so on until completed.</p>
   <p>Consider using the <code class="docutils literal notranslate"><span class="pre">for</span></code> loop to help with such a task.</p>
   </div>
   </div>
   <div class="section" id="general-unit-testing-tips">
   <h2>4.<span class="section-number">7.9. </span>General Unit Testing Tips<a class="headerlink" href="#general-unit-testing-tips" title="Permalink to this headline">¶</a></h2>
   <p>Debugging a broken test can be tedious, especially in bigger projects.  To make the process easier on yourself, Make sure each test case covers exactly 1 logical component.  For instance let’s consider this abbreviated form of our Hokie class:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="kd">public</span><span class="w"> </span><span class="kd">class</span> <span class="nc">Hokie</span><span class="w"> </span><span class="p">{</span>
   <span class="w">    </span><span class="kd">private</span><span class="w"> </span><span class="n">String</span><span class="w"> </span><span class="n">pid</span><span class="p">;</span>
   <span class="w">    </span><span class="kd">private</span><span class="w"> </span><span class="n">String</span><span class="w"> </span><span class="n">hometown</span><span class="p">;</span>
   <span class="w">    </span><span class="kd">private</span><span class="w"> </span><span class="kt">int</span><span class="w"> </span><span class="n">graduationYear</span><span class="p">;</span>
   <span class="w">    </span><span class="kd">private</span><span class="w"> </span><span class="kt">int</span><span class="w"> </span><span class="n">DOBYear</span><span class="p">;</span>

   <span class="w">    </span><span class="kd">public</span><span class="w"> </span><span class="kt">boolean</span><span class="w"> </span><span class="nf">setDOBYear</span><span class="p">(</span><span class="kt">int</span><span class="w"> </span><span class="n">year</span><span class="p">)</span><span class="w"> </span><span class="p">{</span>
   <span class="w">        </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">year</span><span class="w"> </span><span class="o">&gt;</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="o">&amp;&amp;</span><span class="w"> </span><span class="p">(</span><span class="n">year</span><span class="w"> </span><span class="o">&lt;</span><span class="w"> </span><span class="mi">3000</span><span class="p">))</span><span class="w"> </span><span class="p">{</span>
   <span class="w">            </span><span class="n">DOBYear</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">year</span><span class="p">;</span>
   <span class="w">            </span><span class="k">return</span><span class="w"> </span><span class="kc">true</span><span class="p">;</span>
   <span class="w">        </span><span class="p">}</span>
   <span class="w">        </span><span class="k">return</span><span class="w"> </span><span class="kc">false</span><span class="p">;</span>
   <span class="w">    </span><span class="p">}</span>


   <span class="w">    </span><span class="kd">public</span><span class="w"> </span><span class="n">String</span><span class="w"> </span><span class="nf">toString</span><span class="p">()</span><span class="w"> </span><span class="p">{</span>
   <span class="w">        </span><span class="k">return</span><span class="w"> </span><span class="n">pid</span><span class="p">;</span>
   <span class="w">    </span><span class="p">}</span>
   <span class="p">}</span>
   </pre></div>
   </div>
   <p>We could create a test case like this:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="kd">public</span><span class="w"> </span><span class="kt">void</span><span class="w"> </span><span class="nf">test1</span><span class="p">(){</span>
   <span class="w">    </span><span class="c1">// Tests setDOBYear</span>
   <span class="w">    </span><span class="n">assertTrue</span><span class="p">(</span><span class="n">elena</span><span class="p">.</span><span class="na">setDOBYear</span><span class="p">(</span><span class="mi">1968</span><span class="p">));</span>
   <span class="w">    </span><span class="n">assertEquals</span><span class="p">(</span><span class="mi">1968</span><span class="p">,</span><span class="n">elena</span><span class="p">.</span><span class="na">getDOBYear</span><span class="p">());</span>
   <span class="w">    </span><span class="n">assertFalse</span><span class="p">(</span><span class="n">john</span><span class="p">.</span><span class="na">setDOBYear</span><span class="p">(</span><span class="mi">12031995</span><span class="p">));</span>


   <span class="w">    </span><span class="c1">// tests toString</span>
   <span class="w">    </span><span class="n">Hokie</span><span class="w"> </span><span class="n">gobbler</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="k">new</span><span class="w"> </span><span class="n">Hokie</span><span class="p">(</span><span class="s">&quot;gobbledee&quot;</span><span class="p">,</span><span class="mi">1973</span><span class="p">);</span>
   <span class="w">    </span><span class="n">assertEquals</span><span class="p">(</span><span class="s">&quot;gobbledee&quot;</span><span class="p">,</span><span class="n">gobbler</span><span class="p">.</span><span class="na">toString</span><span class="p">());</span>
   <span class="p">}</span>


   <span class="w"> </span><span class="kd">public</span><span class="w"> </span><span class="kt">void</span><span class="w"> </span><span class="nf">test1</span><span class="p">(){</span>
   <span class="w">       </span><span class="c1">// Tests setDOBYear</span>
   <span class="w">       </span><span class="n">assertTrue</span><span class="p">(</span><span class="n">elena</span><span class="p">.</span><span class="na">setDOBYear</span><span class="p">(</span><span class="mi">1968</span><span class="p">));</span>
   <span class="w">       </span><span class="n">assertEquals</span><span class="p">(</span><span class="mi">1968</span><span class="p">,</span><span class="n">elena</span><span class="p">.</span><span class="na">getDOBYear</span><span class="p">());</span>
   <span class="w">       </span><span class="n">assertFalse</span><span class="p">(</span><span class="n">john</span><span class="p">.</span><span class="na">setDOBYear</span><span class="p">(</span><span class="mi">12031995</span><span class="p">));</span>


   <span class="w">       </span><span class="c1">// tests toString</span>
   <span class="w">       </span><span class="n">Hokie</span><span class="w"> </span><span class="n">gobbler</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="k">new</span><span class="w"> </span><span class="n">Hokie</span><span class="p">(</span><span class="s">&quot;gobbledee&quot;</span><span class="p">,</span><span class="mi">1973</span><span class="p">);</span>
   <span class="w">       </span><span class="n">assertEquals</span><span class="p">(</span><span class="s">&quot;gobbledee&quot;</span><span class="p">,</span><span class="n">gobbler</span><span class="p">.</span><span class="na">toString</span><span class="p">());</span>
   <span class="p">}</span>
   </pre></div>
   </div>
   <p>However if <code class="docutils literal notranslate"><span class="pre">test1</span></code> fails, to debug it you now must consider a potential error in the test or a potential error in the <code class="docutils literal notranslate"><span class="pre">setDOBYear()</span></code> method or in the <code class="docutils literal notranslate"><span class="pre">getDOBYear()</span></code> method or in the <code class="docutils literal notranslate"><span class="pre">toString()</span></code> method.  Eclipse will direct you to the line that failed but that may not always tell you where the problem actually started!  Either way, it’s good practice to write a test method for 1 and only 1 logical component of your code.  Dividing these two into separate tests will make debugging easier down the road.</p>
   <p>In bigger programs, it may not be enough to make 1 test per method either.  Consider the following code:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="kd">public</span><span class="w"> </span><span class="kt">int</span><span class="w"> </span><span class="nf">foo</span><span class="p">(</span><span class="kt">int</span><span class="w"> </span><span class="n">x</span><span class="p">,</span><span class="w"> </span><span class="kt">int</span><span class="w"> </span><span class="n">y</span><span class="p">){</span>
   <span class="w">  </span><span class="k">for</span><span class="w"> </span><span class="p">(</span><span class="kt">int</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="mi">0</span><span class="p">;</span><span class="w"> </span><span class="n">i</span><span class="o">&lt;</span><span class="mi">10</span><span class="p">;</span><span class="w"> </span><span class="n">i</span><span class="o">++</span><span class="p">){</span>
   <span class="w">    </span><span class="n">x</span><span class="o">+=</span><span class="n">i</span><span class="p">;</span>
   <span class="w">    </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="o">%</span><span class="mi">3</span><span class="w"> </span><span class="o">==</span><span class="mi">0</span><span class="p">){</span>
   <span class="w">      </span><span class="n">x</span><span class="o">++</span><span class="p">;</span>
   <span class="w">    </span><span class="p">}</span>
   <span class="w">    </span><span class="n">y</span><span class="w"> </span><span class="o">*=</span><span class="w"> </span><span class="n">i</span><span class="p">;</span>
   <span class="w">  </span><span class="p">}</span>
   <span class="w">  </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="o">%</span><span class="mi">2</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="mi">0</span><span class="p">){</span>
   <span class="w">    </span><span class="k">return</span><span class="w"> </span><span class="n">x</span><span class="p">;</span>
   <span class="w">  </span><span class="p">}</span><span class="k">else</span><span class="w"> </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">y</span><span class="o">%</span><span class="mi">2</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="mi">0</span><span class="p">){</span>
   <span class="w">    </span><span class="k">return</span><span class="w"> </span><span class="n">y</span><span class="p">;</span>
   <span class="w">  </span><span class="p">}</span>
   <span class="w">  </span><span class="k">return</span><span class="w"> </span><span class="mi">0</span><span class="p">;</span>
   <span class="p">}</span>
   </pre></div>
   </div>
   <p>You may find it easier to write one test case that handles the logic inside the for loop and a separate test case for the conditionals outside of it.  That way if one fails, you know exactly where in your code to look!</p>
   </div>
   <div class="section" id="testing-methods-by-passing-null-params">
   <h2>4.<span class="section-number">7.10. </span>Testing methods by passing null params<a class="headerlink" href="#testing-methods-by-passing-null-params" title="Permalink to this headline">¶</a></h2>
   <p>As a general rule when setting up a test case which requires the passing of a null to a method, you should refrain from passing null directly since this would result in a style deduction when submitted to Web-CAT.</p>
   <p>For example the test:
   .. code-block:: java</p>
   <blockquote>
   <div><p>assertFalse( someNonNullObject.equals( null ) );</p>
   </div></blockquote>
   <p>Would return a style error when submitted to Web-CAT.</p>
   <p>To avoid this you should instead create another object (be sure to name it appropriately), set it to <code class="docutils literal notranslate"><span class="pre">null</span></code>, then pass that object to the method being tested.
   For example:</p>
   <div class="highlight-java notranslate"><div class="highlight"><pre><span></span><span class="n">SomeObject</span><span class="w"> </span><span class="n">nonNullObject</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="k">new</span><span class="w"> </span><span class="n">SomeObject</span><span class="w"> </span><span class="p">(...);</span>

   <span class="n">SomeObject</span><span class="w"> </span><span class="n">nullObject</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="kc">null</span><span class="p">;</span>

   <span class="n">assertFalse</span><span class="p">(</span><span class="w"> </span><span class="n">nonNullObject</span><span class="p">.</span><span class="na">equals</span><span class="p">(</span><span class="w"> </span><span class="n">nullObject</span><span class="w"> </span><span class="p">)</span><span class="w"> </span><span class="p">);</span>
   </pre></div>
   </div>
   </div>


Additional reference for writing JUnit Tests:
---------------------------------------------

`Writing JUnit Tests With Student TestCase <2114_junit_tutorial.html>`_

`A Whirlwind Introduction to JUnit <https://web-cat.org/eclstats/junit-quickstart/>`_

Checkpoint 3
------------

.. avembed:: Exercises/SWDesignAndDataStructs/JunitCheckpoint3Summ.html ka
   :long_name: Checkpoint 3
