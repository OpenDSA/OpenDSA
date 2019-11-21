(function (){
    "use strict";
    /*const float = document.getElementById('float')
    const unitConversion = document.getElementById('unit_conversion')
    const workspace = document.getElementById('workspace')
    const equation_bank = document.getElementById('equation_bank')
    document.addEventListener('mousemove', e =>
    {
        e.stopPropagation()
        float.style.top = e.clientY + 10 + 'px'
        float.style.left = e.clientX + 10 + 'px'
    })
    document.body.addEventListener('click', e =>
    {
        e.stopPropagation()
        if (window.SELECTED_OBJ) window.SELECTED_OBJ.classList.remove('selected')
        window.SELECTED_OBJ = null
        document.body.style.cursor = 'default'
        float.innerHTML = ''
        float.style.display = 'none';
        unitConversion.style.display = 'none';
        workspace.querySelectorAll('.box').forEach(box => box.classList.remove('droppable'))
    })
    equations.forEach(e => new Equation(e, equation_bank, workspace))
    document.querySelectorAll('.param').forEach(p => new Variable(p))
    */

    // Classes for objects being created more than once
    //const Variable = require('./classes/Variable');
    //const Association = require('./classes/Association');
    //const SelectableEquation = require('./classes/SelectableEquation');
    //const ActiveEquation = require('./classes/ActiveEquation');
    const Workspace = require('MechSolver/Workspace');
    //const ValueBox = require('./classes/ValueBox');

    // Singleton classes
    const EquationBank = require('MechSolver/EquationBank')
    const WorkspaceList = require('MechSolver/WorkspaceList')
    
    const mainArea = document.getElementById("DeformsProblemPROp");
    //const mainArea = document.getElementById("solutionarea");

    // Adding buttons at the top of the workspace for everything
    //mainArea.appendChild(document.createElement('input', ))

    // Adding two divisions, one for the equations, one for the workspaces list
    var masterWorkspace = document.createElement('div');
    masterWorkspace.setAttribute("id","MasterWorkspace");
    masterWorkspace.classList += "main";
    mainArea.appendChild(masterWorkspace);
    
    // Adding the equation bank
    var eqbank = new EquationBank(masterWorkspace);

    // Adding the main workspace 
    var wkspacelist = new WorkspaceList(masterWorkspace);
})();