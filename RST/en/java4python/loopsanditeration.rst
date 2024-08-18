Loops and Iteration
===================

You have already seen a couple of examples of iteration and looping in
Java. So this section will just serve as a reference for the differences
in Syntax.

Definite Loop
-------------

In Python the easiest way to write a definite loop is using the for loop
in conjunction with the range function. For example:

::

    for i in range(10):
       print(i)

In Java we would write this as:

::

    for (Integer i = 0; i < 10; i++ ) {
        System.out.println(i);
    }

Recall that the ``range`` function provides you with a wide variety of
options for controlling the value of the loop variable.

::

    range(stop)
    range(start,stop)
    range(start,stop,step)

The Java for loop is really analogous to the last option giving you
explicit control over the starting, stopping, and stepping in the three
clauses inside the parenthesis. You can think of it this way:

::

    for (start clause; stop clause; step clause) {
        statement1
        statement2
        ...
    }

If you want to start at 100, stop at 0 and count backward by 5 the
Python loop would be written as:

::

    for i in range(100,-1,-5):
        print(i)

In Java we would write this as:

::

    for (Integer i = 100; i >= 0; i -= 5)
        System.out.println(i);

In Python the for loop can also iterate over any sequence such as a
list, a string, or a tuple. Java also provides a variation of its for
loop that provides the same functionality in its so called ``for each``
loop.

In Python we can iterate over a list as follows:

::

    l = [1, 1, 2, 3, 5, 8, 13, 21]
    for fib in l:
       print(fib)

In Java we can iterate over an ArrayList of integers too:

::

    ArrayList<Integer> l = new ArrayList<Integer>();
    l.add(1); l.add(1); l.add(2); l.add(3);
    for (Integer i : l) {
        System.out.println(i)
    }

This example stretches the imagination a bit, and in fact points out one
area where Java’ s primitive arrays are easier to use than an array
list. In fact all primitive arrays can be used in a ``for each`` loop.

::

    int l[] = {1,1,2,3,5,8,13,21};
    for(int i : l) {
        System.out.println(i);
    }

To iterate over the characters in a string in Java do the following:

::

    String t = "Hello World";
    for (char c : t.toCharArray()) {
        System.out.println(c);
    }

Indefinite Loops
----------------

Both Python and Java support the while loop. Recall that in Python the
while loop is written as:

::

    while  condition:
       statement1
       statement2
       ...

In Java we add parenthesis and curly braces to get:

::

    while (condition) {
        statement1
        statement2
        ...
    }

Java adds an additional, if seldom used variation of the while loop
called the do loop. The do loop is very similar to while except that the
condition is evaluated at the end of the loop rather than the beginning.
This ensures that a loop will be executed at least one time. Some
programmers prefer this loop in some situations because it avoids an
additional assignment prior to the loop. For example:

::

    do {
        statement1
        statement2
        ...
    } while (condition);
