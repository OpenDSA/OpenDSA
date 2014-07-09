class Comparable {
protected:
  virtual void print(std::ostream& ostr) const = 0;
public:
  virtual ~Comparable() {}
  virtual bool operator<(const Comparable& other) const = 0;
  virtual bool operator>(const Comparable& other) const = 0;
  virtual bool operator<=(const Comparable& other) const = 0;
  virtual bool operator>=(const Comparable& other) const = 0;
  virtual Comparable& operator=(const Comparable& other) = 0;
  friend std::ostream& operator<<(std::ostream& ostr, const Comparable& c) {
    c.print(ostr);
    return ostr;
  }
};

void swap(Comparable *A[], int i, int j) {
  Comparable* tmp = A[i];
  A[i] = A[j];
  A[j] = tmp;
}

