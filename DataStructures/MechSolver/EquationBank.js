/**
 * This class points to the list of equations in different groups
 * created from the equation_bank.js file.
 * 
 * It is to be directly associated with the equation_bank section id.
 * Behaviour/Description: On spawning,
 * 1) find the unique "groups" values for all the equations,
 * 2) create a new div element for each page pointer in dictionary indexed by group,
 * 3) For each equation in the bank, create a new 
 * 
 */

class EquationBank{
    constructor(jsavCanvasObj, filename, dim_obj) {
        this.equationBankBox = jsavCanvasObj.g.rect(
            dim_obj["EQBANK"]["X"], dim_obj["EQBANK"]["Y"], dim_obj["EQBANK"]["WIDTH"], 500,
            {
                "fill":"whitesmoke",
                "id": "eqbank",
                "r": 10
            });
    }
}
window.EquationBank = window.EquationBank || EquationBank