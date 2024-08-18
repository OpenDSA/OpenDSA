Defining Classes in Java
========================

You have already seen how to define classes in Java. It's unavoidable for
even the simplest of programs. In this section we will look at how we
define classes to create our own data types. Lets start by creating a
fraction class to extend the set of numeric data types provided by our
language. The requirements for this new data type are as follows:

-  Given a numerator and a denominator create a new Fraction.

-  When a fraction is printed it should be simplified.

-  Two fractions can be added or subtracted

-  Two fractions can be multiplied or divided

-  Two fractions can be compared

-  A fraction and an integer can be added together.

-  Given a list of Fractions that list should be sortable by the default
   sorting function.

Here is a mostly complete implementation of a Fraction class in Python
that we will refer to throughout this section:

.. activecode:: fraction
   :language: python

   class Fraction:
       def __init__(self, num, den):
           """
           :param num: The top of the fraction
           :param den: The bottom of the fraction
           """
           self.num = num
           self.den = den

       def __repr__(self):
           if self.num > self.den:
               retWhole = int(self.num / self.den)
               retNum = self.num - (retWhole * self.den)
               return str(retWhole) + " " + str(retNum) + "/" + str(self.den)
           else:
               return str(self.num) + "/" + str(self.den)

       def show(self):
           print(self.num, "/", self.den)

       def __add__(self, other):
           # convert to a fraction
           other = self.toFract(other)
           newnum = self.num * other.den + self.den * other.num
           newden = self.den * other.den
           common = gcd(newnum, newden)
           return Fraction(int(newnum / common), int(newden / common))

       __radd__ = __add__

       def __lt__(self, other):
           num1 = self.num * other.den
           num2 = self.den * other.num
           return num1 < num2

       def toFract(self, n):
           if isinstance(n, int):
               other = Fraction(n, 1)
           elif isinstance(n, float):
               wholePart = int(n)
               fracPart = n - wholePart
               # convert to 100ths???
               fracNum = int(fracPart * 100)
               newNum = wholePart * 100 + fracNum
               other = Fraction(newNum, 100)
           elif isinstance(n, Fraction):
               other = n
           else:
               print("Error: cannot add a fraction to a ", type(n))
               return None
           return other


   def gcd(m, n):
       """
       A helper function for Fraction
       """
       while m % n != 0:
           oldm = m
           oldn = n
           m = oldn
           n = oldm % oldn
       return n

   print(sorted([Fraction(5, 16), Fraction(3, 16), Fraction(1, 16) + 1]))

The instance variables (data members) we will need for our fraction
class are the numerator and denominator. Of course in Python we can add
instance variables to a class at any time by simply assigning a value to
``objectReference.variableName``, whereas in Java all data members must be
declared up front.

The declarations of instance variables can come at the beginning of the
class definition or the end. Cay Horstman, author of `the "Core Java"
books <https://horstmann.com/corejava/index.html>`_ puts the declarations at the end of the class. I like them at the
very beginning so you see the variables that are declared before you
begin looking at the code that uses them. With that in mind the first
part of the Fraction class definition is as follows:

.. highlight:: java
   :linenothreshold: 5


::

    public class Fraction {
        private Integer numerator;
        private Integer denominator;
    }

Notice that we have declared the numerator and denominator to be
private. This means that the compiler will generate an error if another
method tries to write code like the following:

::

    Fraction f = new Fraction(1,2);
    Integer y = f.numerator * 10;

Direct access to instance variables is not allowed. Therefore if we
legitimately want to be able to access information such as the numerator
or denominator for a particular fraction we must have getter methods.
It is very common programming practice to provide getter and setter
methods for instance variables in Java.

::

    public Integer getNumerator() {
        return numerator;
    }

    public void setNumerator(Integer numerator) {
        this.numerator = numerator;
    }

    public Integer getDenominator() {
        return denominator;
    }

    public void setDenominator(Integer denominator) {
        this.denominator = denominator;
    }

Writing a constructor
---------------------

Once you have identified the instance variables for your class the next
thing to consider is the constructor. In Java, constructors have the
same name as the class and are declared public. They are declared
without a return type. So any method that is named the same as the
class and has no return type is a constructor. Our constructor will take
two parameters: the numerator and the denominator.

::

    public Fraction(Integer top, Integer bottom) {
        num = top;
        den = bottom;
    }

There are a couple of important things to notice here. First, you will
notice that the constructor does not have a ``self`` parameter. You will
also notice that we can simply refer to the instance variables by name
without the ``self`` prefix, because they have already been declared. This
allows the Java compiler to do the work of dereferencing the current
Java object. Java does provide a special variable called ``this`` that
works like the ``self`` variable. In Java, ``this`` is typically only used
when it is needed to differentiate between a parameter or local variable
and an instance variable. For example this alternate definition of the
the Fraction constructor uses ``this`` to differentiate between
parameters and instance variables.

::

    public Fraction(Integer num, Integer den) {
        this.num = num;
        this.den = den;
    }

Methods
-------

Now we come to one of the major differences between Java and Python. The
Python class definition used the special methods for addition and
comparison that have the effect of redefining how the standard operators
behave: in Python, ``__add__`` and ``__lt__`` change the behavior of ``+`` and ``<``, respectively. In Java there is **no operator overloading**. So we will have to write the method for addition a little differently.

A point of terminology: Python has both "functions" (``def`` outside a class) and "methods" (``def`` inside a class). Since Java requires all code to be inside classes, it only has "methods." Those from a C++ background might refer to methods as "member functions."

Let's begin by implementing addition in Java:

::

    public Fraction add(Fraction otherFrac) {
        Integer newNum = otherFrac.getDenominator() * this.numerator +
                                 this.denominator * otherFrac.getNumerator();
        Integer newDen = this.denominator * otherFrac.getDenominator();
        Integer common = gcd(newNum, newDen);
        return new Fraction(newNum/common, newDen/common);
    }

First you will notice that the ``add`` method is declared as
``public Fraction`` The ``public`` part means that any other method may
call the ``add`` method. The ``Fraction`` part means that ``add`` will
return a fraction as its result.

Second, you will notice that the method makes use of the ``this`` variable. In this method, ``this`` is not necessary, because there is no ambiguity about the ``numerator`` and ``denominator`` variables. So this version of the code is equivalent: 

::

    public Fraction add(Fraction otherFrac) {
        Integer newNum = otherFrac.getDenominator() * numerator +
                                 denominator * otherFrac.getNumerator();
        Integer newDen = denominator * otherFrac.getDenominator();
        Integer common = gcd(newNum, newDen);
        return new Fraction(newNum/common, newDen/common);
    }

The addition takes place by multiplying each numerator by the opposite
denominator before adding. This procedure ensures that we are adding two
fractions with common denominators. Using this approach the denominator
is computed by multiplying the two denominators. The greatest common
divisor method, ``gcd``, is used to find a common divisor to simplify the
numerator and denominator in the result.

Finally on line 6 a new ``Fraction`` is returned as the result of the
computation. The value that is returned by the return statement must
match the value that is specified as part of the declaration. So, in
this case the return value on line 8 must match the declared value on
line 1.

Method Signatures and Overloading
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Our specification for this project said that we need to be able to add a
``Fraction`` to an ``Integer``. In Python we can do this by checking the
type of the parameter using the ``isinstance`` function at runtime.
Recall that ``isinstance(1,int)`` returns ``True`` to indicate that 1 is
indeed an instance of the ``int`` class. See the ``__add__`` and ``toFract`` methods in the Python version of the ``Fraction`` class to see how our Python
implementation fulfills this requirement.

In Java we can do runtime type checking, but the compiler will not allow
us to pass an Integer to the ``add`` method since the parameter has been
declared to be a Fraction. The way that we solve this problem is by
writing another ``add`` method with a different set of parameters. In
Java this practice is legal and common we call this practice
**method overloading**.

This idea of method overloading raises a very important difference between
Python and Java. In Python a method is known by its name only. In Java a
method is known by its signature. The signature of a method includes its
name, and the types of all of its parameters. The name and the types of
the parameters are enough information for the Java compiler to decide
which method to call at runtime.

To solve the problem of adding an ``Integer`` and a ``Fraction`` in Java
we will overload both the constructor and the ``add`` method. We will
overload the constructor so that if it only receives a single
``Integer`` it will convert the ``Integer`` into a ``Fraction``. We will
also overload the ``add`` method so that if it receives an ``Integer`` as a
parameter it will first construct a ``Fraction`` from that integer and then
add the two ``Fractions`` together. The new methods that accomplish this
task are as follows:

::

    public Fraction(Integer num) {
        this.numerator = num;
        this.denominator = 1;
    }

    public Fraction add(Integer other) {
        return add(new Fraction(other));
    }

Notice that the overloading approach can provide us with a certain
elegance to our code. Rather than utilizing if statements to check the
types of parameters we just overload methods ahead of time which
allows us to call the method we want and allow the compiler to make the
decisions for us. This way of thinking about programming takes some
practice.

Our full ``Fraction`` class to this point would look like the following. You
should compile and run the program to see what happens.

.. activecode:: fraction1
    :language: java
    :sourcefile: Fraction.java

    public class Fraction {

        private Integer numerator;
        private Integer denominator;

        public Fraction(Integer num, Integer den) {
            this.numerator = num;
            this.denominator = den;
        }

        public Fraction(Integer num) {
            this.numerator = num;
            this.denominator = 1;
        }
        
        public Integer getNumerator() {
            return numerator;
        }
        
        public Integer getDenominator() {
            return denominator;
        }

        public Fraction add(Fraction other) {
            Integer newNum = other.getDenominator()*this.numerator + this.denominator*other.getNumerator();
            Integer newDen = this.denominator * other.getDenominator();
            Integer common = gcd(newNum,newDen);
            return new Fraction(newNum/common, newDen/common );
        }

        public Fraction add(Integer other) {
            return add(new Fraction(other));
        }

        private static Integer gcd(Integer m, Integer n) {
            while (m % n != 0) {
                Integer oldm = m;
                Integer oldn = n;
                m = oldn;
                n = oldm%oldn;
            }
            return n;
        }

        public static void main(String[] args) {
            Fraction f1 = new Fraction(1,2);

            System.out.println(f1.add(1));
        }

    }

Inheritance
-----------

If you ran the program above you probably noticed that the output is not
very satisfying. Chances are your output looked something like this:

::

    Fraction@6ff3c5b5

The reason is that we have not yet provided a friendly string
representation for our ``Fraction`` objects. Just like in
Python, whenever an object is printed by the ``println`` method it must
be converted to string format. In Python you can control how that looks
by writing an ``__str__`` method for your class. If you do not then you
will get the default, which looks something like the above.

The ``Object`` Class
~~~~~~~~~~~~~~~~~~~~

In Java, the equivalent of ``__str__`` is the ``toString`` method. Every
object in Java already has a ``toString`` method defined for it because
every class in Java automatically inherits from the ``Object`` class. The
``Object`` class provides default implementations for the following
methods.

-  ``clone``
-  ``equals``
-  ``finalize``
-  ``getClass``
-  ``hashCode``
-  ``notify``
-  ``notifyAll``
-  ``toString``
-  ``wait``

We are not interested in most of the methods on that list, and many
Java programmers live happy and productive lives without knowing much
about most of the methods on that list. However, to make our output
nicer we will implement the ``toString`` method for the ``Fraction``
class. A simple version of the method is provided below.

::

    public String toString() {
        return numerator.toString() + "/" + denominator.toString();
    }

The other important class for us to implement from the list of methods
inherited from ``Object`` is the ``equals`` method. In Java, when two objects are compared using the ``==`` operator they are tested to see if they are exactly the same object (that is, do the two objects occupy the same
exact space in the computer's memory?). This is also the default behavior of the ``equals`` method provided by ``Object``. The ``equals`` method allows us to
decide if two objects are equal by looking at their instance variables.
However it is important to remember that since Java does not have
operator overloading **if you want to use your** ``equals`` **method you must call it directly**. Therefore once you write your own ``equals`` method:

::

    object1 == object2

is NOT the same as

::

    object1.equals(object2)

Here is an ``equals`` method for the ``Fraction`` class:

::

    public boolean equals(Fraction other) {
        Integer num1 = this.numerator * other.getDenominator();
        Integer num2 = this.denominator * other.getNumerator();
        if (num1 == num2)
            return true;
        else
            return false;
    }

One important thing to remember about ``equals`` is that it only checks
to see if two objects are equal -- it does not have any notion of less than
or greater than. We’ll see more about that shortly.

Abstract Classes and Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If we want to make our ``Fraction`` class behave like ``Integer``, ``Double``, and
the other numeric classes in Java then we need to make a couple of additional
modifications to the class. The first thing we will do is plug
``Fraction`` into the Java class hierarchy at the same place as ``Integer``
and its siblings. If you look at the documentation for ``Integer`` you will
see that ``Integer``’s parent class is ``Number``. Number is an **abstract
class** that specifies several methods that all of its children must
implement. In Java an abstract class is more than just a placeholder for
common methods. In Java an abstract class has the power to specify
certain methods that all of its children **must** implement. You can
trace this power back to the strong typing nature of Java.

Here is code that makes the ``Fraction`` class a child of ``Number``:

::

    public class Fraction extends Number {
        ...
    }

The keyword ``extends`` tells the compiler that the class ``Fraction``
extends, or adds new functionality to the ``Number`` class. A child
class always extends its parent.

The methods we must implement if ``Fraction`` is going to be a child of
``Number`` are:

-  ``longValue``
-  ``intValue``
-  ``floatValue``
-  ``doubleValue``

This really isn’t much work for us to implement these methods, as all
we have to do is some type conversion and some division:

::

    public double doubleValue() {
        return numerator.doubleValue() / denominator.doubleValue();
    }


    public float floatValue() {
        return numerator.floatValue() / denominator.floatValue();
    }


    public int intValue() {
        return numerator.intValue() / denominator.intValue();
    }


    public long longValue() {
        return numerator.longValue() / denominator.longValue();
    }

By having the ``Fraction`` class extend the ``Number`` class we can now
pass a ``Fraction`` to any Java method that specifies it can receive a
``Number`` as one of its parameters. For example many Java user
interface methods accept any object that is a subclass of ``Number`` as
a parameter. In Java the class hierarchy and the "is-a" relationships are
very important. Whereas in Python you can pass any kind of object as a
parameter to any method or function, the strong typing of Java makes sure that you
only pass an object as a parameter that is of the type specified in the
method signature, or one of the children of the type specified. When you see a
parameter of type ``Number`` it's important to remember that an
``Integer`` *is-a* ``Number`` and a ``Double`` *is-a* ``Number`` and a
``Fraction`` *is-a* ``Number``, because these classes are children of ``Number``.

However, and this is a big however, it is important to remember
that if you specify ``Number`` as the type of a particular parameter
then the Java compiler will **only let you use the methods of a**
``Number``: ``longValue``, ``intValue``, ``floatValue``, and
``doubleValue``.

Suppose you try to define a method as follows:

::

    public void test(Number a, Number b) {
        a.add(b);
    }

The Java compiler would give an error because ``add`` is not a defined
method of the ``Number`` class. You will **still get this error** even if all your code that calls this ``test`` method passes two ``Fractions`` as parameters (remember that ``Fraction`` does implement ``add``).

Interfaces
----------

Lets turn our attention to making a list of fractions sortable by the
standard Java sorting method ``Collections.sort``. In Python, we would just need to implement the ``__cmp__`` method. But in Java we
cannot be that informal. In Java, things that are sortable must be
``Comparable``. Your first thought might be that ``Comparable`` is
superclass of ``Number``, but that is actually not the case. Java only supports single inheritance, that is, a class can
have only one parent. Although it would be possible to add an additional
layer to the class hierarchy it would also complicate things
dramatically, because not only are ``Numbers`` comparable, but ``Strings`` are
also ``Comparable`` as would many other types. For example, we might have a
``Student`` class and we want to be able to sort students by their GPA.
But ``Student`` might already extends the class ``Person`` for which there would be no natural comparison method.

Java’s answer to this problem is the ``Interface`` mechanism. Interfaces
are like a combination of "inheritance" and "contracts" all rolled into one.
An interface is a *specification* that says any object that claims it
implements this interface must provide the following methods. It sounds
a little bit like an abstract class, however it is outside the
inheritance mechanism. You can never create an instance of
``Comparable``. Many objects, however, do implement the ``Comparable``
interface. What does the ``Comparable`` interface specify?

The ``Comparable`` interface says that any object that claims to be
``Comparable`` must implement the ``compareTo`` method. Here is an excerpt from `the official documentation <https://docs.oracle.com/javase/7/docs/api/java/lang/Comparable.html#compareTo(T)>`_ for the ``compareTo`` method as specified by the ``Comparable`` interface.

.. highlight:: text
   :linenothreshold: 50

.. code-block:: text

    int compareTo(T o)

    Compares this object with the specified object for order. Returns a 
    negative integer, zero, or a positive integer as this object is less
    than, equal to, or greater than the specified object. The
    implementor must ensure sgn(x.compareTo(y)) == -sgn(y.compareTo(x)) for 
    all x and y. (This implies that x.compareTo(y) must throw an exception
    iff y.compareTo(x) throws an exception.)

    ...

To make our ``Fraction`` class ``Comparable`` we must modify the class
declaration line as follows:

.. highlight:: java
   :linenothreshold: 5

::

    public class Fraction extends Number implements Comparable<Fraction> {
        ...
    }

The specification ``Comparable<Fraction>`` makes it clear that ``Fraction``
is only comparable with another ``Fraction``. The ``compareTo`` method could
be implemented as follows:

::

    public int compareTo(Fraction other) {
        Integer num1 = this.numerator * other.getDenominator();
        Integer num2 = this.denominator * other.getNumerator();
        return num1 - num2;
    }

Static member variables
-----------------------

Suppose that you wanted to write a Student class so that the class could
keep track of the number of students it had created. Although you could
do this with a global counter variable that is an ugly solution. The
right way to do it is to use a static variable. In Python we could do
this as follows:

.. activecode:: pystudent
    :language: python

    class Student:
        numStudents = 0

        def __init__(self, id, name):
            self.id = id
            self.name = name

            Student.numStudents = Student.numStudents + 1

    def main():
        for i in range(10):
            s = Student(i,"Student-"+str(i))
        print('Number of students:', Student.numStudents)

    main()

In Java we would write this same example using a static declaration.

.. activecode:: studentclass
    :language: java
    :sourcefile: Student.java

    public class Student {
        public static Integer numStudents = 0;

        private int id;
        private String name;

        public Student(Integer id, String name) {
            this.id = id;
            this.name = name;

            numStudents = numStudents + 1;
        }

        public static void main(String[] args) {
            for(Integer i = 0; i < 10; i++) {
                Student s = new Student(i,"Student"+i.toString());
            }
            System.out.println("Number of students: "+Student.numStudents.toString());
        }
    }


In this example notice that we create a static member variable by using
the ``static`` modifier on the variable declaration. Once a variable has
been declared ``static`` in Java it can be accessed from inside the class
without prefixing the name of the class as we had to do in Python.

Static Methods
--------------

We have already discussed the most common static method of all,
``main``. However in our ``Fraction`` class we also implemented a method to
calculate the greatest common divisor for two fractions (``gdc``). There
is no reason for this method to be a member method since it takes two
``Integer`` values as its parameters. Therefore we declare the method to
be a static method of the class. Furthermore, since we are only going to
use this ``gcd`` method for our own purposes we can make it ``private``.

::

    private static Integer gcd(Integer m, Integer n) {
        while (m % n != 0) {
            Integer oldm = m;
            Integer oldn = n;
            m = oldn;
            n = oldm%oldn;
        }
        return n;
    }

Full Implementation of the Fraction Class
-----------------------------------------

Here is a final version of the ``Fraction`` class in Java, which includes all the features we discussed:

.. activecode:: fullfraction
    :language: java
    :sourcefile: Fraction.java

    import java.util.ArrayList;
    import java.util.Collections;

    public class Fraction extends Number implements Comparable<Fraction> {

        private Integer numerator;
        private Integer denominator;

        /** Creates a new instance of Fraction */
        public Fraction(Integer num, Integer den) {
            this.numerator = num;
            this.denominator = den;
        }

        public Fraction(Integer num) {
            this.numerator = num;
            this.denominator = 1;
        }

        public Fraction add(Fraction other) {
            Integer newNum = other.getDenominator()*this.numerator + this.denominator*other.getNumerator();
            Integer newDen = this.denominator * other.getDenominator();
            Integer common = gcd(newNum,newDen);
            return new Fraction(newNum/common, newDen/common);
        }

        public Fraction add(Integer other) {
            return add(new Fraction(other));
        }

        public Integer getNumerator() {
            return numerator;
        }

        public void setNumerator(Integer numerator) {
            this.numerator = numerator;
        }

        public Integer getDenominator() {
            return denominator;
        }

        public void setDenominator(Integer denominator) {
            this.denominator = denominator;
        }

        public String toString() {
            return numerator.toString() + "/" + denominator.toString();
        }

        public boolean equals(Fraction other) {
            Integer num1 = this.numerator * other.getDenominator();
            Integer num2 = this.denominator * other.getNumerator();
            if (num1 == num2)
                return true;
            else
                return false;
        }

        public double doubleValue() {
            return numerator.doubleValue() / denominator.doubleValue();
        }

        public float floatValue() {
            return numerator.floatValue() / denominator.floatValue();
        }

        public int intValue() {
            return numerator.intValue() / denominator.intValue();
        }

        public long longValue() {
            return numerator.longValue() / denominator.longValue();
        }

        public int compareTo(Fraction other) {
            Integer num1 = this.numerator * other.getDenominator();
            Integer num2 = this.denominator * other.getNumerator();
            return num1 - num2;
        }

        private static Integer gcd(Integer m, Integer n) {
            while (m % n != 0) {
                Integer oldm = m;
                Integer oldn = n;
                m = oldn;
                n = oldm%oldn;
            }
            return n;
        }

        public static void main(String[] args) {
            Fraction f1 = new Fraction(1,2);
            Fraction f2 = new Fraction(2,3);
            Fraction f3 = new Fraction(1,4);

            System.out.println("Adding: " + f1.add(1));
            System.out.println("Calling intValue(): " + f1.intValue());
            System.out.println("Calling doubleValue(): " + f1.doubleValue());

            ArrayList<Fraction> myFracs = new ArrayList<Fraction>();
            myFracs.add(f1);
            myFracs.add(f2);
            myFracs.add(f3);
            Collections.sort(myFracs);

            System.out.println("Sorted fractions:");
            for(Fraction f : myFracs) {
                System.out.println(f);
            }
        }

    }
