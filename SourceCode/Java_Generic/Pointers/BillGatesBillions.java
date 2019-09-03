/**
 * Bill Gates class to store the worth value
 */
class BillGatesBillions
{
    int netWorth;

    /**
     * class constructor to initialize the netWorth value
     * @param value the netWorth value
     */
    public BillGatesBillions(int value) {
        netWorth = value;
    }

    /**
     * getter for netWorth
     * @return the netWorth value
     */
    public int getNetWorth() {
        return netWorth;
    }

    /**
     * setter for netWorth
     * @param value the netWorth value
     */
    public void setNetWorth(int value) {
        netWorth = value;
    }
} //end of class

/**
 * class to test passing by reference
 */
class BillGatesByReference
{
    public static void main() {
        BillGatesBillions billGatesMoney = new BillGatesBillions(55);
        increment(billGatesMoney);  // Pass a reference to the object.
        System.out.println(billGatesMoney.getNetWorth()); //the output will be 56 Billion
    }

    /**
     * function takes an object's reference
     * @param billGatesMoneyRef a reference for BillGatesBillions
     */
    static void increment(BillGatesBillions billGatesMoneyRef) {
        // Java will send a copy of the reference instead of a copy of the object
        int money = billGatesMoneyRef.getNetWorth();
        billGatesMoneyRef.setNetWorth(money + 1);
    }
}