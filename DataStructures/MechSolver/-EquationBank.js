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

class EquationBank
{
    constructor(masterWorkspace)
    {
        // Creating the div for the equation bank
        this.equationBankDiv = document.createElement('div');
        this.equationBankDiv.setAttribute("id","EquationBank");
        this.equationBankDiv.classList += "EquationBank"
        masterWorkspace.appendChild(this.equationBankDiv);    
    }
}

module.exports = EquationBank