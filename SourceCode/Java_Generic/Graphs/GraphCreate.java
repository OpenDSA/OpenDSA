// Create a graph from file
static void GraphCreate(Graph G, String filename) throws FileNotFoundException {
  BufferedReader file;
  String line = null;
  boolean undirected = false;
  int v1, v2, weight;
  FileInputStream fstream = new FileInputStream(filename);
  file = new BufferedReader(new InputStreamReader(fstream));
  try { line = file.readLine(); }
  catch (IOException e) {
    System.out.println("Unable to read line from file");
    System.exit(0);
  }
  // Skip the comments
  while(line.charAt(0) == '#')
    try { line = file.readLine(); }
    catch (IOException e) {
      System.out.println("Unable to read line from file");
      System.exit(0);
    }
  String[] pieces = line.split(" ",0);
  
  int n = Integer.parseInt(pieces[0]);
  G.init(n);
  try { line = file.readLine(); }
  catch (IOException e) {
    System.out.println("Unable to read line from file");
    System.exit(0);
  }
  pieces = line.split(" ",0);
  if (pieces[0].equals("U"))
    undirected = true;
  else if (pieces[0].equals("D"))
    undirected = false;
  else {
    System.out.println("Bad graph type: " + line);
    System.exit(0);
  }
  // Read in edges
  while(true) {
    try { line = file.readLine(); }
    catch (IOException e) {
      System.exit(0);
    }
    if (line == null) break;
    pieces = line.split(" ",0);
    if (pieces.length < 2) {
      System.out.println("Bad edge: " + line);
      System.exit(0);
    }
    v1 = Integer.parseInt(pieces[0]);
    v2 = Integer.parseInt(pieces[1]);
    if ((v1 >= n) || (v2 >= n)) {
      System.out.println("Bad edge: " + line);
      System.exit(0);
    }
    if (pieces.length > 2)
      weight = Integer.parseInt(pieces[2]);
    else // No weight given -- set at 1
      weight = 1;
    G.addEdge(v1, v2, weight);
    if (undirected) // Put in edge in other direction
      G.addEdge(v2, v1, weight);
  }
}
