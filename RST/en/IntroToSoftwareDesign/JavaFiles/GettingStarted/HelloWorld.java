/*
 * File: HelloWorld.java
 * Author: Java Java Java
 * Description: Prints Hello, World! greeting.
 */
public class HelloWorld extends Object // Class header
{                                   // Start class body
 private String greeting = "Hello, World!";
 public void greet()               // Method definition
 {                                 // Start method body
     System.out.println(greeting); //  Output statement
 } // greet()                      // End method body
public static void main(String args[])// Method header
{
  HelloWorld helloworld;         // declare
  helloworld = new HelloWorld(); // create
  helloworld.greet();            // Method call
 }  //  main()
}  // HelloWorld                  // End class body
