/* *** ODSATag: UMLcomposition *** */
public class Car {
 
  private Engine mopar = new Engine();
 
}


// an alternative method using constructor initialization 
public class Car {
 
  private Engine mopar;
 
  public Car() {
    mopar = new Engine();
  } 
}


// another alternative using lazy initialization
public class Car {
 
  private Engine mopar;
 
  public void buildEngine() {
    if (null == mopar) {
      mopar = new Engine();
    }
    return mopar.doSomething();
  }
}
/* *** ODSAendTag: UMLcomposition *** */
