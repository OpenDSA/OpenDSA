// Create a graph from file
void GraphCreate(Graph G, String filename) {
  BufferedReader file;
  String line = null;
  boolean undirected = false;
  int v1, v2, weight;

  file = createReader(filename);
  try { line = file.readLine(); }
  catch (IOException e) {
    println("Unable to read line from file");
    exit();
  }
  // Skip the comments
  while(line.charAt(0) == '#')
    try { line = file.readLine(); }
    catch (IOException e) {
      println("Unable to read line from file");
      exit();
    }
  String[] pieces = split(line, " ");
  int n = int(pieces[0]);
  G.init(n);
  try { line = file.readLine(); }
  catch (IOException e) {
    println("Unable to read line from file");
    exit();
  }
  pieces = split(line, " ");  
  if (match(pieces[0],"U") != null)
    undirected = true;
  else if (match(pieces[0],"D") != null)
    undirected = false;
  else {
    println("Bad graph type: " + line);
    exit();
  }
  // Read in edges
  while(true) {
    try { line = file.readLine(); }
    catch (IOException e) {
      exit();
    }
    if (line == null) break;
    pieces = split(line, " ");
    if (pieces.length < 2) {
      println("Bad edge: " + line);
      exit();
    }
    v1 = int(pieces[0]);
    v2 = int(pieces[1]);
    if ((v1 >= n) || (v2 >= n)) {
      println("Bad edge: " + line);
      exit();
    }
    if (pieces.length > 2)
      weight = int(pieces[2]);
    else // No weight given -- set at 1
      weight = 1;
    G.addEdge(v1, v2, weight);
    if (undirected) // Put in edge in other direction
      G.addEdge(v2, v1, weight);
  }
}
