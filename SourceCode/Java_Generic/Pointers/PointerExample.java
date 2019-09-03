/* *** ODSATag: EmployeeClass *** */
/**
 * Employee is a class used in this tutorial to explain various pointer concepts
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
/* *** ODSAendTag: EmployeeClass *** */
public class PointerExample {

  public static void main(String[] args) {
    /* *** ODSATag: PointerVariables *** */
    Employee empPtr1; // Declare a reference to an Employee
    // This allocates space for the reference, but not the pointee.
    // The reference starts out as "null"
    /* *** ODSAendTag: PointerVariables *** */
  }
}
