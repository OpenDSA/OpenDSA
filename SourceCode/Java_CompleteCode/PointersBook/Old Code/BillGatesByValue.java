void B(int worth) {
  worth = worth + 1;
  // T2
}

void A() {
  int netWorth;
  netWorth = 55;  // T1

  B(netWorth);
  // T3 -- B() did not change netWorth
}