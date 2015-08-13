
public class DataStructureGroup {

  public static String group (List<?> l) {
    return "List";
  }

  public static String group (Queue<?> l) {
    return "Queue";
  }

  public static String group (Collection<?> l) {
    return "Unknown group";
  }

  public static void main(String[] args)
  {
    Collection <?>[] cols = {
      new ArrayList<Integer>(),
      new PriorityQueue<String>(),
      new TreeSet<Long>()
    };

    for (Collection<?> c : cols) {
      System.out.println (group(c));
    }
  }
}

