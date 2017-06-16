/**
 * Employee is a class used in this tutorial to explain various pointers concepts
 */
 /**
  * Employee is a class used in this tutorial to explain various references concepts
  */
 class Employee {
     String name;
     int salary;

     /**
      * class constructor to initialize name and salary fields
      * @param name: employee name
      * @param salary: employee salary
      */
     public Employee(String name, int salary)
     {
         this.name = name;
         this.salary = salary;
     }

     /**
      * getter method for the name field
      * @return the value of name field
      */
     public String getName()
     {
         return name;
     }

     /**
      * setter method for the name field
      * @param newName the value to be assigned to name field
      */
     public void setName(String newName)
     {
         name = newName;
     }
     /**
      * getter method for the salary field
      * @return the value of salary field
      */
     public int getSalary()
     {
         return salary;
     }
     /**
      * setter method for the salary field
      * @param newSalary the value to be assigned to salary field
      */
     public void setSalary(int newSalary)
     {
         salary = newSalary;
     }
 }
/**
 * Class to explain shallow and deep copy concepts
 */
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
