Window.helpTexts = {
    "general": 
    `
    <h2>Welcome to the Deforms Problem Solving Suite!</h2>
    <br>Here are a few guidelines to help you find your way around this system.
    <br>And at any point, you can bring up this help box by clicking on the "Help" Button inside the grey rectangle.
    <ol>
        <li>Most items in the interface are clickable. Everything except the unboxed text in the problem prose
            are interactive.
        </li>
        <li>
            Hovering over individual elements in the interface pops up brief guides on how to use the corresponding element.
        </li>
        <li>
            For more detailed guides, clicking on the &#xFFFD for the corresponding element brings up the help text and animations for a particular
            element. For example, the &#xFFFD symbol in an equation shows how the different parts of the equation work.
            <br>
            <img src="MechSolver/gifs/general-qmarkguide.gif" style="width: 60%" alt="Click on the question mark for the equation, and this brings up the help dialog box.">
        </li>
    </ol>
    `,
    // "<h2>Welcome to the Deforms Problem Solving Suite!</h2>"+
    // "<br>Here are a few guidelines to help you find your way around this system."+
    // '<ol>'+
    // '<li> The primary way to interact with the system is using the mouse to click on items. '+
    // 'For example, we click on values to add them to equations, we click on equations to add them '+
    // 'to workspaces, etc.'
    // +'</li>'+
    // '<li>The problem prose has values in boxes that highlight when you hover over them. You can '+
    // 'click on them to select them, and then add them to equations.'+
    // '</li>'+
    // '<li> The Equation Bank to the right has the palette of equations to choose from. To choose '+
    // 'an equation, click on it (it will turn yellow), and then click on add in the desired Workspace '+ 
    // 'on the left (the white rectangular area).'+
    // '</li>'+
    // '<li> To change the pages of the equation palette, click on the name of the palette page (eg: Axial, Arithmetic, etc) '+
    // 'to pull up a list of palette page names, then click on the desired page name.'+
    // '</li>'+
    // '<li> An equation in the workspace will have a boxed version and a template version. '+
    // 'One can click on a value in the prose or a value generated in the workspace first and then '+
    // 'add click on any box in the equation to put it in there.'+
    // '</li>'+
    // '<li> To associate different variables in different equations to create a system of simulataneous '+
    // 'equations, click on the empty variable boxes. This will turn the boxes into bold letters. Afterwards, more '+
    // 'variables can be added to associations by clicking on an existing variable association, followed by "Add new variable"'+
    // '</li>'+
    // '<li> Clicking on any filled box will bring up its own right click menu to either negate the value/variable, '+
    // 'clear the box, copy the value, or add a new variable to the association.'+
    // '</li>'+
    // '<li> To remove an equation, click on the checkbox for it and click on Remove inside its workspace.</li>'+
    // '<li> To solve one/many equations, fill in the values, make the associations, and select the equation(s) '+
    // 'and click on Solve. If the system is consistent, this should pop up solution boxes below the equations.'+
    // '</li>'+
    // '<li> To change units for quantities, click on the unit for that quantity (highlights in green on hover) '+
    // 'to bring up the choice of units, then click on them.'+
    // '</li>'+
    // '<li>Finally, one can select a value and drop it into the yellow boxes next to the question subparts '+
    // 'to submit answers to the questions, and click on Check Answer to get feedback.'+
    // '</li>'+
    // '</ol>'

    "boxedEquation":
    `
    <h2>Equations in the workspace</h2>
    An equation in the workspace several parts. Hovering the mouse over each of these illustrates the function of each of these.
    <ol>
        <li>The checkboxes can be clicked to select/deselect an equation to solve it, or to delete it from the workspace</li>
        <img src="MechSolver/gifs/equation-check.gif" alt="Click on check box, and then on Remove to delete it, or click on check box and on solve to solve it.">
    </ol>
    `,

    "workspace":
    `
    <h2>Workspace</h2>
    Workspaces are where all of the operations take place. From adding and solving equations, to connecting them through unknowns, and generating solutions,
    Workspaces allow one to logically separate the work associated with different threads (problem subparts, alternate solutions, etc.) so progress in one line of
    thought does not interfere with the other.
    <ol>
        <li>The Add Workspace button is used to add workspaces, while the clippers in the right top corner for each workspace delete them, including all of its contents.</li>
        <img src="MechSolver/gifs/workspace-all.gif" alt="Click to add a workspace, and clip to delete it, including everything in it.">
        <li>The "Add" button is used to add a selected equation from the Equation Bank</li>
        <img src="MechSolver/gifs/workspace-add.gif" alt="Click on an equation to select it, and then on Add to place it in the workspace.">
        <li>The "Remove" and "Solve" buttons remove and solve selected equations</li>
        <img src="MechSolver/gifs/equation-check.gif" alt="Click on check box, and then on Remove to delete it, or click on check box and on solve to solve it.">
    </ol>

    `
}