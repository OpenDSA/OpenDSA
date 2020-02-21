const solution = {
    0 : {
        equations : ["axialStress","add2"],
        variables : {
            'deform':"0.001",
            'const':"0.000023",
            'len':"0.8",
            //'term':"25",
        },
        solution : 79.348 
    }
}
// Find a way to specify sets of equations being solved at any stage,
// and the values that are assigned to variables in them at that time.