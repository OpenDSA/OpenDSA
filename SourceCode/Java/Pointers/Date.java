// Date class to represent dates
class Date {
  int day;
  int month;
  int year;

  // Date constructor
  public Date(int d, int m, int y)
  {
    day = d; month = m; year = y;
  }
}

// An Employee class that includes a Date
class Employee {
  String name;
  Date dateOfBirth;

  // Employee constructor to initialize both name and date
  public Employee(String name , int d, int m, int y)
  {
    this.name = name;
    dateOfBirth = new Date(d, m, y);
  }
}

// Now let's test this code
class Test {

  public static void main() {
    Employee empPtr = new Employee("Sam", 3, 9, 1983);
    // Now empPtr references an object that contains a reference to a Date object

    empPtr = null; // Now the Employee object is eligible for garbage collection.
    // So its Date object will also be eligible for garbage collection
    // because nothing else points to it.
  }
}
