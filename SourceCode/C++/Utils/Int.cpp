class Int: public Comparable {
public:
  Int() : n(0) {}
  Int(int val) : n(val) {}
  
  void print(std::ostream& ostr) const {
    ostr << n;
  }
  // Comparison operator assumes type of other matches
  bool operator<(const Comparable& other) const {
    const Int& iOther = static_cast<const Int&>(other);
    return n < iOther.n;
  }
  bool operator>(const Comparable& other) const {
    const Int& iOther = static_cast<const Int&>(other);
    return n > iOther.n;
  }
  bool operator<=(const Comparable& other) const {
    const Int& iOther = static_cast<const Int&>(other);
    return n <= iOther.n;
  }
  bool operator>=(const Comparable& other) const {
    const Int& iOther = static_cast<const Int&>(other);
    return n >= iOther.n;
  }
  Int& operator=(const Comparable& i) {
    n = static_cast<const Int&>(i).n;
    return *this;
  };
  
private:
  int n;
};
