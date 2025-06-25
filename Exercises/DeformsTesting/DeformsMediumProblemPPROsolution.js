const solution = {
    0 : {
        type: "number",
        equations : [],
        variables : {
            '':"",
        },
        solution : 290.1,
        unit: "N m",
    },
    1 : {
        type: "number",
        equations : [],
        variables : {
            '':"",
        },
        solution : 184.7,
        unit: "MPa",
    },
    2 : {
        type: "number",
        equations : [],
        variables : {
            '':"",
        },
        solution : 0.323,
        unit: "Radian",
    },
    master_file_path: "/Exercises/DeformsTesting/dmedium-all-c1.json"
}
// Find a way to specify sets of equations being solved at any stage,
// and the values that are assigned to variables in them at that time.
// const master_vars = {
//     a_j : "T_{A}, Torque in Aluminium", 
//     a_o : "T_{B}, Torque in Brass",
//     a_g : "\\phi_{A}, angle in Aluminium",
//     a_l : "\\phi_{B}, angle in Brass",
//     a_y : "\\tau, Shear in Brass"
// }