Conditionals
============

Conditional statements in Python and Java are very similar. In Python we
have three patterns:

Simple if
---------

::

    if condition:
        statement1
        statement2
        ...

In Java this same pattern is simply written as:

::

    if (condition) {
        statement1
        statement2
        ...
    }

Once again you can see that in Java the curly braces define a block
rather than indentation. In Java the parenthesis around the condition
are required because if is technically a function that evaluates to True
or False.

if else
-------

::

    if condition:
        statement1
        statement2
        ...
    else:
        statement1
        statement2
        ...

In Java this is written as:

::

    if (condition) {
        statement1
        statement2
        ...
    } else {
        statement1
        statement2
        ...
    }

elif
----

Java does not have an elif pattern like Python. In Java you can get the
functionality of an elif statement by nesting if and else. Here is a
simple example in both Python and Java.

.. activecode:: pyelif
    :language: python

    grade = int(input('enter a grade'))
    if grade < 60:
        print('F')
    elif grade < 70:
        print('D')
    elif grade < 80:
        print('C')
    elif grade < 90:
        print('B')
    else:
        print('A')

In Java we have a couple of ways to write this

.. activecode:: javaelif
   :language: java
   :sourcefile: ElseIf.java

   public class ElseIf {
       public static void main(String args[]) {
        int grade = 85;

        if (grade < 60) {
            System.out.println('F');
        } else {
            if (grade < 70) {
                System.out.println('F');
            } else {
                if (grade < 80) {
                    System.out.println('F');
                } else {
                    if (grade < 90) {
                        System.out.println('F');
                    } else {
                        System.out.println('F');
                    }
                }
            }
        }
      }
    }

We can get even closer to the elif statement by taking advantage of the
Java rule that a single statement does not need to be enclosed in curly
braces. Since the if is the only statement used in each else we can get
away with the following.

.. activecode:: javaelif2
   :language: java
   :sourcefile: ElseIf.java

   public class ElseIf {
       public static void main(String args[]) {
        int grade = 85;
        if (grade < 60) {
            System.out.println('F');
        } else if (grade < 70) {
            System.out.println('D');
        } else if (grade < 80) {
            System.out.println('C');
        } else if (grade < 90) {
            System.out.println('B');
        } else  System.out.println('A');
       }
   }

switch
------

Java also supports a ``switch`` statement that acts something like the
elif statement of Python under certain conditions. To write the grade
program using a switch statement we would use the following:

.. activecode:: javaswitch
   :language: java
   :sourcefile: SwitchUp.java

   public class SwitchUp {
       public static void main(String args[]) {
        int grade = 85;

        int tempgrade = grade / 10;
        switch(tempgrade) {
        case 10:
        case 9:
            System.out.println('A');
            break;
        case 8:
            System.out.println('B');
            break;
        case 7:
            System.out.println('C');
            break;
        case 6:
            System.out.println('A');
            break;
        default:
            System.out.println('F');
        }
      }
    }

The ``switch`` statement is not used very often, and I recommend you do
not use it! First, it is not as powerful as the ``else if`` model
because the switch variable can only be compared for equality with an
integer or enumerated constant. Second it is very easy to forget to put
in the ``break`` statement. If the break statement is left out then then
the next alternative will be automatically executed. For example if the
grade was 95 and the ``break`` was omitted from the ``case 9:``
alternative then the program would print(out both A and B.)

Boolean Operators
-----------------

The conditionals used in the if statement can be boolean variables,
simple comparisons, and compound boolean expressions.

Java also supports the boolean expression.
``condition ? trueValue : falseValue`` This expression can be used to
test a condition as part of an assignment statement. For example
``a = a % 2 == 0 ? a*a : 3*x -1`` In the previous assignment statement
the expression ``a%2 ==0`` is first checked. If it is true then a is
assigned the value ``a * a`` if it is false then a is assigned the value
of ``3*x-1``. Of course all of this could have been accomplished using a
regular if else statement, but sometimes the convenience of a single
statement is too much to resist.
