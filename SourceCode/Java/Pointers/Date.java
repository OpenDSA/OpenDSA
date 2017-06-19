/**
 * Date class to represent dates
 */
class Date {

    int day;
    int month;
    int year;

    /**
     * date constructor
     * @param d day value
     * @param m month value
     * @param y year value
     */
    public Date(int d, int m, int y)
    {
        day = d; month = m; year = y;
    }
}
class Employee {
    String name;
    Date dateOfBirth;
    /**
     * class constructor to initialize the name variable
     * @param name employee name
     * @param d day value
     * @param m month value
     * @param y year value
     */
    public Employee(String name , int d, int m, int y)
    {
        this.name = name;
        dateOfBirth = new Date(d, m, y);
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

/**
 * Tester class
 */
class Test {

    public static void main() {

        Employee empPtr = new Employee("Sam", 3, 9, 1983);
        //now empPtr is an object that contains a reference to Date object
        empPtr = null; // now empPtr is eligible for garbage collection and also
        // the inner Date object will also be eligible for garbage collection
    }
}

