/* *** ODSATag: TOH *** */
// Compute the moves to solve a Tower of Hanoi puzzle.
// Function move does (or prints) the actual move of a disk
// from one pole to another.
// n: The number of disks
// start: The start pole
// goal: The goal pole
// temp: The other pole
static void TOH(int n, Pole start, Pole goal, Pole temp) {
  if (n == 0) return;          // Base case
  TOH(n-1, start, temp, goal); // Recursive call: n-1 rings
  move(start, goal);           // Move bottom disk to goal
  TOH(n-1, temp, goal, start); // Recursive call: n-1 rings
}
/* *** ODSAendTag: TOH *** */

/* *** ODSATag: TOHstack *** */
public enum operation { MOVE, TOH }

class TOHobj {
  public operation op;
  public int num;
  public Pole start, goal, temp;

  /** Recursive call operation */
  TOHobj(operation o, int n, Pole s, Pole g, Pole t)
  { op = o; num = n; start = s; goal = g; temp = t; }

  /** MOVE operation */
  TOHobj(operation o, Pole s, Pole g)
  { op = o; start = s; goal = g; }
}

static void TOH(int n, Pole start,
                       Pole goal, Pole temp) {
  // Make a stack just big enough
  Stack<TOHobj> S = new AStack<TOHobj>(2*n+1);
  S.push(new TOHobj(operation.TOH, n,
                    start, goal, temp));
  while (S.length() > 0) {
    TOHobj it = S.pop(); // Get next task
    if (it.op == operation.MOVE) // Do a move
      move(it.start, it.goal);
    else if (it.num > 0) { // Imitate TOH recursive
                           // solution (in reverse)
      S.push(new TOHobj(operation.TOH, it.num-1,
                        it.temp, it.goal, it.start));
      S.push(new TOHobj(operation.MOVE, it.start,
                        it.goal));  // A move to do
      S.push(new TOHobj(operation.TOH, it.num-1,
                        it.start, it.temp, it.goal));
    }
  }
}
/* *** ODSAendTag: TOHstack *** */
