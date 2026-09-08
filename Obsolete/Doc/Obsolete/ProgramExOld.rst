.. This is the original section on programming exercises, for the
   original system that Sally created. This is now obsolete.
   
---------------------
Programming Exercises
---------------------

To create a programming exercise, you will need to create/modify files
on the front-end and others on the back-end:

* Front end:

   1. Go to  OpenDSA/Exercises/ModuleName. ModuleName can be any of the modules in the Exercises directory (e.g. List, Binary, RecurTutor..etc )
   
   2. Create html file exercisename.html. 
   
   3. Open the html file and modify the text of the following tag to have the problem statement::
   
      <p class="problem" id = "test">
   
      e.g. Complete the missing recursive call so that the following function computes something.

   4. Modify the text of the codeTextarea to have the code that required to be edited by the student::
   
      <textarea  id="codeTextarea">
      
      Example::
   
       int examplefunc(int i) {
   
        if (i > 0) {
    
         if (i % 2 == 1) {
   
          return i;
   
        }
   
        //<<Missing a Recursive call>>
   
       }
   
       }
   5. Add a DOM variable to specify the programming exercise type (e.g. recursio, BinaryTree, List,..etc)
      
      Example::
      
         window.progexType= "recursion";    
      
       
   6. Open OpenDSA/config/ModuleName.json
   
   7. Add the exercise in the exercises section as the following example::
   
      "recprogex1":{   
      "long_name": "Recursion Programming Exercise Number or Description",
      "required": true,
      "points": 0.0,
      "threshold": 1.0}
   
      
   8. Open OpenDSA/RST/en/ModuleName/ModuleName.rst
   
   9. Add the following line so that the programming exercise appears in the lesson. As the following example::
    
      .. avembed:: Exercises/RecurTutor/recprogex1.html ka

   10. Build the book on the front end:
   
      a. Go to by the command CD OpenDSA/
      
      b. Run the command: sudo make ModuleName
     

* Back end (Unit tests):

   1. Go to OpenDSA-server/ODSA-django/openpop/build/ModuleName
   
   2. Create a directory with the same name as the exercise name created on the front end (e.g. recprogex1)
   
   3. Create java file that will have the unit tests: exercisename.java (e.g. recprogex1.java)
   
   4. Open the exercisename.java.
   
   5. Name the class in the file as studentexercisename (e.g. studentrecprogex1). 
      Note that the class should be missing its closing brace. 
      The Python code on the back end will append that closing brace dynamically when the student submit his code. 
      The Python code appends the function submitted by the student to the java code and add the closing brace dynamically.
   
   6. Create a  function in the java file that returns the model answer.
   
   7. In the main function, create the code required for the unit tests and call the model answer function (e.g. int x= modelexercisefunction(i)).
   
   8. For each unit test, call both the model answer function and the function given to the student in the front end in::
   
      <textarea  id="codeTextarea">
      
      Example:: 
      
        examplefunc(int i)
   
   9. Compare both answers as follows::
   
       if (studentfunctionreturn(i) == modelexamplefunction(i)) SUCCESS = true;

       try{

       PrintWriter output = new PrintWriter("output");

       if (SUCCESS) {
       
       output.println("Well Done!");
       output.close();
       }
       
       else
       {
       output.println("Try Again! Incorrect Answer!");
       output.close();
       }

       }
       catch (IOException e) {
       e.printStackTrace();
       }
       }

   10. Note that: you should do the necessary logic to make sure that all the unit tests are correct. 
       Also, you will not need to modify any of the Python files on the back end.
