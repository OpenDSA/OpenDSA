
/* *** ODSATag: Mod *** */
   int h(int x) {
     return x % 16;
   }
/* *** ODSAendTag: Mod *** */

/* *** ODSATag: sascii *** */
   int sascii(String x, int M) {
     char ch[];
     ch = x.toCharArray();
     int xlength = x.length();

     int i, sum;
     for (sum=0, i=0; i < x.length(); i++)
       sum += ch[i];
     return sum % M;
   }
/* *** ODSAendTag: sascii *** */

// This revised sfold implementation was contributed by
//   Torben Haagh <tbhaagh@gmail.com>.
  
/* *** ODSATag: sfold *** */
// Use folding on a string, summed 4 bytes at a time
int sfold(String s, int M) {
  long sum = 0, mul = 1;
  for (int i = 0; i < s.length(); i++) {
    mul = (i % 4 == 0) ? 1 : mul * 256;
    sum += s.charAt(i) * mul;
  }
  return (int)(Math.abs(sum) % M);
}
/* *** ODSAendTag: sfold *** */

/* *** ODSATag: hashInsert *** */
   // Insert e into hash table HT
   void hashInsert(const Key& k, const Elem& e) {
     int home;                     // Home position for e
     int pos = home = h(k);        // Init probe sequence
     for (int i=1; EMPTYKEY != (HT[pos]).key(); i++) {
       pos = (home + p(k, i)) % M; // probe
       if (k == HT[pos].key()) {
         println("Duplicates not allowed");
         return;
       }
     }
     HT[pos] = e;
   }
/* *** ODSAendTag: hashInsert *** */

/* *** ODSATag: hashSearch *** */
   // Search for the record with Key K
   bool hashSearch(const Key& K, Elem& e) const {
     int home;              // Home position for K
     int pos = home = h(K); // Initial position is the home slot
     for (int i = 1;
          (K != (HT[pos]).key()) && (EMPTYKEY != (HT[pos]).key());
          i++)
       pos = (home + p(K, i)) % M; // Next on probe sequence
     if (K == (HT[pos]).key()) {   // Found it
       e = HT[pos];
       return true;
     }
     else return false;            // K not in hash table
   }
/* *** ODSAendTag: hashSearch *** */
