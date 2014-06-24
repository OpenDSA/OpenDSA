class Int: public Comparable {
public:
  Int() {}
  Int(int val) : n(val) {}
  
  void print(std::ostream& ostr) const {
    ostr << n;
  }
  // Comparison operator assumes type of other matches
  bool operator<(const Comparable& other) const {
    const Int& iOther = static_cast<const Int&>(other);
    return n < iOther.n;
  }
private:
  int n;
};
