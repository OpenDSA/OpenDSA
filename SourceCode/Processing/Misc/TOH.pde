boolean SUCCESS = true;
int counter;

// Fake an "enum" -- a Processing deficiency
final int MOVE = 13;
final int TOH = 15;

class Pole {
  int poleNum;
  
  Pole(int value) {
    poleNum = value;
  }

  // Override Object.toString
  String toString() {
    return Integer.toString(poleNum);
  }
}

void move(Pole start, Pole goal) {
  System.out.println(counter + ": Move " + start + " to " + goal);
  counter++;
}

/* *** ODSATag: TOH *** */
// Compute the moves to solve a Tower of Hanoi puzzle.
// Function move does (or prints) the actual move of a disk
// from one pole to another.
// n: The number of disks
// start: The start pole
// goal: The goal pole
// temp: The other pole
/* *** ODSATag: TOHshort *** */
void TOH(int n, Pole start, Pole goal, Pole temp) {
  if (n == 0) return;          // Base case
  TOH(n-1, start, temp, goal); // Recursive call: n-1 rings
  move(start, goal);            // Move bottom disk to goal
  TOH(n-1, temp, goal, start); // Recursive call: n-1 rings
}
/* *** ODSAendTag: TOHshort *** */
/* *** ODSAendTag: TOH *** */

/* *** ODSATag: TOHstack *** */
class TOHobj {
  int op;
  int num;
  Pole start, goal, temp;

  // Recursive call operation
  TOHobj(int o, int n, Pole s, Pole g, Pole t)
  { op = o; num = n; start = s; goal = g; temp = t; }

  // MOVE operation
  TOHobj(int o, Pole s, Pole g)
  { op = o; start = s; goal = g; }
}

void TOHs(int n, Pole start, Pole goal, Pole temp) {
  // Make a stack just big enough
  Stack S = new AStack(2*n+1);
  S.push(new TOHobj(TOH, n, start, goal, temp));
  while (S.length() > 0) {
    TOHobj it = (TOHobj)S.pop();   // Get next task
    if (it.op == MOVE) // Do a move
      move(it.start, it.goal);
    else if (it.num > 0) { // Imitate TOH recursive solution (in reverse)
      S.push(new TOHobj(TOH, it.num-1, it.temp, it.goal, it.start));
      S.push(new TOHobj(MOVE, it.start, it.goal));  // A move to do
      S.push(new TOHobj(TOH, it.num-1, it.start, it.temp, it.goal));
    }
  }
}
/* *** ODSAendTag: TOHstack *** */

void setup() {
  long temp1, temp2;

  Pole start = new Pole(1);
  Pole goal = new Pole(2);
  Pole temp = new Pole(3);

  counter = 1;
  TOH(4, start, goal, temp);
  counter = 1;
  TOHs(4, start, goal, temp);

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
  } else {
    println("Testing failed");
  }

  exit();
}
