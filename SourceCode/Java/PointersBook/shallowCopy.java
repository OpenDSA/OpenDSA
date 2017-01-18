/**
 * Employee is a class used in this tutorial to explain various pointers concepts
 */
class Employee {
    String name;

    /**
     * class default constructor
     */
    public Employee()
    {
        this.name = "";
    }
    /**
     * class constructor to initialize the name variable
     * @param name: employee name
     */
    public Employee(String name)
    {
        this.name = name;
    }

    /**
     * getter method for the name variable
     * @return the value of name variable
     */
    public String getName()
    {
        return name;
    }

    /**
     * setter method for the name variable
     * @param newName the value to be assigned to name variable
     */
    public void setName(String newName)
    {
        name = newName;
    }
}
public class shallowCopy {

    public static void main(String[] args) {
	/* *** ODSATag: shallow *** */
        Employee firstEmployee = new Employee("Sam");
        Employee theSameEmployee = firstEmployee;// shallow copy
        theSameEmployee.setName("John");
        System.out.println(theSameEmployee.getName());//this will print John as the copy was shallow copy
        Employee secondEmployee = new Employee("Patric");
        Employee deepCopyEmployee = new Employee();
        deepCopyEmployee.setName(secondEmployee.getName());//deep copying the secondEmployee's values
        //Now we have to different Employees with the name Patric. Any change in any object will not affect the other
        deepCopyEmployee.setName("John");
        System.out.println(secondEmployee.getName()); // this will print Patric
	/* *** ODSAendTag: shallow *** */
    }
}
