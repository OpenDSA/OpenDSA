/**
 * Employee is a class used in this tutorial to explain various pointers concepts
 */
class Employee {
  String name;

  /**
   * class default constructor
   */
  public Employee() {
    this.name = "";
  }

  /**
   * class constructor to initialize the name variable
   * @param name: employee name
   */
  public Employee(String name) {
    this.name = name;
  }

  /**
   * getter method for the name variable
   * @return the value of name variable
   */
  public String getName() {
    return name;
  }

  /**
   * setter method for the name variable
   * @param newName the value to be assigned to name variable
   */
  public void setName(String newName) {
    name = newName;
  }
}

public class shallowCopy {

  public static void main(String[] args) {
    /* *** ODSATag: shallow *** */
    Employee firstEmployee = new Employee("Sam");
    Employee theSameEmployee = firstEmployee; // Shallow copy
    theSameEmployee.setName("John");
    System.out.println(theSameEmployee.getName()); // Print John
    Employee secondEmployee = new Employee("Patric");
    Employee deepCopyEmployee = new Employee();
    // Deep copying the secondEmployee's values
    deepCopyEmployee.setName(secondEmployee.getName());
    // Now we have two different Employees with the name Patric.
    // Any change in one object will not affect the other
    deepCopyEmployee.setName("John");
    System.out.println(secondEmployee.getName()); // this will print Patric
    /* *** ODSAendTag: shallow *** */
  }
}
