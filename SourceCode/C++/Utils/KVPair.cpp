/* *** ODSATag: KVPair *** */
// Container for a key-value pair
class KVPair: public Comparable {
public:
  // Constructors
  KVPair() : k(0), e(nullptr) {}
  KVPair(const KVPair& KV): k(KV.k), e(KV.e) {}
  KVPair& operator=(const KVPair&) = delete;
  KVPair(int kval, void* eval) : k(kval), e(eval) {}

  void print(std::ostream& ostr) const {
    ostr << k;
  }
  bool operator <(const Comparable& other) const { // < operator
    const KVPair& KVother = static_cast<const KVPair&>(other);
    return k < KVother.k;
  }
  bool operator >(const Comparable& other) const { // > operator
    const KVPair& KVother = static_cast<const KVPair&>(other);
    return k > KVother.k;
  }
  bool operator <=(const Comparable& other) const { // <= operator
    const KVPair& KVother = static_cast<const KVPair&>(other);
    return k <= KVother.k;
  }
  bool operator >=(const Comparable& other) const { // >= operator
    const KVPair& KVother = static_cast<const KVPair&>(other);
    return k >= KVother.k;
    }
  KVPair& operator=(const Comparable& i)  {
    auto KV = static_cast<const KVPair&>(i);
    k = KV.k;
    e = KV.e;
    return *this;
  };

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
