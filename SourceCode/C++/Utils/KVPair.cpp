/* *** ODSATag: KVPair *** */
// Container for a key-value pair
class KVPair: public Comparable {
public:
  // Constructors
  KVPair() {}
  KVPair(int kval, void* eval) : k(kval), e(eval) {}

  void print(std::ostream& ostr) const {
    ostr << k;
  }
  bool operator <(const Comparable& other) const { // < operator
    const KVPair& KVother = static_cast<const KVPair&>(other);
    return k < KVother.k;
  }
  bool operator >(const Comparable& other) const { // > operator
    const KVpair& KVother = static_cast<const KVpair&>(other);
    return k > KVother.k;
  }
  bool operator <=(const Comparable& other) const { // <= operator
    const KVpair& KVother = static_cast<const KVpair&>(other);
    return k <= KVother.k;
  }
  // Data member access functions
  int key() { return k; }
  void setKey(int ink) { k = ink; }
  void* value() { return e; }
  void setValue(void* ine) { e = ine; }
  
private:
  int k;
  void* e;
};
/* *** ODSAendTag: KVPair *** */
