const equations = [
    {
        group: 'Axial',
        id: "axialStress",
        name: 'Stress in an axial',
        latex: '\\delta_t = \\alpha \\cdot \\Delta T \\cdot L',
        latex_boxes: '\\Box=\\Box\\times\\Box\\times\\Box',
        params: ['\\delta_t', '\\alpha', '\\Delta T', 'L'],
        template: '${deform} = ${const} \\cdot ${tempchange} \\cdot ${length}',
        variables: {
            'deform':'\\delta_t',
            'const':'\\alpha',
            'tempchange':'\\Delta T',
            'length':'L'
        }
    },
    {
        group: 'Basic definitions',
        id: "axialMemberAvgNormalStress",
        name: 'Average normal stress in an axial member',
        latex: '\\delta_{avg}=\\frac F A',
        latex_boxes: '\\Box=\\frac \\Box \\Box',
        params: ['\\delta_{avg}', 'F', 'A'],
        template: '',
        variables: {

        }
    },
    {
        group: 'Basic definitions',
        id: "dirShearStressAvg",
        name: 'Average direct shear stress',
        latex: '\\tau_{avg}=\\frac V {A_v}',
        latex_boxes: '\\Box=\\frac \\Box \\Box',
        params: ['\\tau_{avg}', 'V', 'A_v'],
        template: '',
        variables: {
            
        }
    },


    // {
    //     group: 'Axial',
    //     id: "shearStrainMaxInPlane1",
    //     name: 'Maximum in-plane shear strain',
    //     latex: '\\gamma_{max}=\\pm2\\sqrt{\\left(\\frac{\\varepsilon_x - \\varepsilon_y}{2}\\right)^2+\\left(\\frac{\\gamma_{xy}}{2}\\right)^2}',
    //     latex_boxes: '\\Box=\\pm2\\sqrt{\\left(\\frac{\\Box - \\Box}{2}\\right)^2+\\left(\\frac{\\Box}{2}\\right)^2}',
    //     params: ['\\gamma_{max}', '\\varepsilon_x', '\\varepsilon_y', '\\gamma_{xy}']
    // },
    // {
    //     group: 'Axial',
    //     name: 'Maximum in-plane shear strain',
    //     id: "shearStrainMaxInPlane2",
    //     latex: '\\gamma_{max}=\\pm\\sqrt{(\\varepsilon_x-\\varepsilon_y)^2+\\gamma_{xy}^2}',
    //     latex_boxes: '\\Box=\\pm\\sqrt{(\\Box-\\Box)^2+\\Box^2}',
    //     params: ['\\gamma_{max}', '\\varepsilon_x', '\\varepsilon_y', '\\gamma_{xy}']
    // },
    // {
    //     group: 'Basic definitions',
    //     id: "bearingStressAvg",
    //     name: 'Average bearing stress',
    //     latex: '\\delta_b=\\frac V {A_b}',
    //     latex_boxes: '\\Box=\\frac \\Box {\\Box}',
    //     params: ['\\delta_b', 'V', 'A_b']
    // },
    // {
    //     group: 'Basic definitions',
    //     id: "axialMemberAvgNormalStrain1",
    //     name: 'Average normal strain in an axial member',
    //     latex: '\\varepsilon_{long}=\\frac{\\Delta L} L',
    //     latex_boxes: '\\Box=\\frac{\\Box} \\Box',
    //     params: []
    // },
    // {
    //     group: 'Basic definitions',
    //     id: "axialMemberAvgNormalStrain2",
    //     name: 'Average normal strain in an axial member',
    //     latex: '\\varepsilon_{lat}=\\frac{\\Delta d} d',
    //     latex_boxes: '\\\\Box=\\frac{\\Box \\Box} \\Box',
    //     params: []
    // },
    // {
    //     group: 'Basic definitions',
    //     id: "tempChangeAvgNormalStrain",
    //     name: 'Average normal strain caused by temperature change',
    //     latex: '\\varepsilon_T=\\alpha \\cdot \\Delta L',
    //     latex_boxes: '\\Box=\\Box \\times \\Box',
    //     params: []
    // },
    // {
    //     group: 'Basic definitions',
    //     id: "relnEGV",
    //     name: 'Relationship between E, G, and ν',
    //     latex: 'G=\\frac E{2(1+\\nu)}',
    //     latex_boxes: '\\Box=\\frac \\Box{2(1+\\Box)}',
    //     params: []
    // },
    // {
    //     group: 'Basic definitions',
    //     id: "safetyFactor",
    //     name: 'Factor of safety',
    //     latex: '{FS}=\\frac{\\delta_{failure}}{\\delta_{actual}}',
    //     latex_boxes: '{\\Box}=\\frac{\\Box}{\\Box}',
    //     params: []
    // },
    // {
    //     group: 'Axial deformation',
    //     id: "RelnForceTempDef",
    //     name: 'Force-temperature-deformation relationship',
    //     latex: '\\delta=\\frac{F\\cdot L}{A\\cdot E} + \\alpha \\cdot \\Delta T\\cdot L',
    //     latex_boxes: '\\Box=\\frac{\\Box\\times\\Box}{\\Box\\times\\Box} + \\Box \\times \\Box\\times \\Box',
    //     params: ['\\delta', 'F', 'L', 'A', 'E', 'alpha', '\\Delta T', 'L']
    // },
    // {
    //     group: 'Torsion',
    //     id: "circShaftMaxTorsionShearStress",
    //     name: 'Maximum torsion shear stress in a circular shaft',
    //     latex: '\\tau_{max}=\\frac{T_c}J',
    //     latex_boxes: '\\Box=\\frac \\Box \\Box',
    //     params: []
    // },
    // {
    //     group: 'Torsion',
    //     id: "circShaftMaxTorsionShearStress-J",
    //     name: 'J in Maximum torsion shear stress in a circular shaft',
    //     latex: 'J=\\frac\\pi 2 [R^4-r^4]',
    //     latex_boxes: '\\Box=\\frac\\pi 2 [\\Box^4-\\Box^4]',
    //     params: ['J', 'R', 'r']
    // },
    // {
    //     group: 'Arithmetic',
    //     id: "add2",
    //     name: 'Addition of 2 terms',
    //     latex: 'c=a+b',
    //     latex_boxes: '\\Box=\\Box+\\Box',
    //     params: []
    // },
    // {
    //     group: 'Arithmetic',
    //     id: "add3",
    //     name: 'Addition of 3 terms',
    //     latex: 'c=x+y+z',
    //     latex_boxes: '\\Box=\\Box+\\Box+\\Box',
    //     params: []
    // },
    // {
    //     group: 'Arithmetic',
    //     id: "sub",
    //     name: 'Subtraction',
    //     latex: 'c=a-b',
    //     latex_boxes: '\\Box=\\Box-\\Box',
    //     params: []
    // },
    // {
    //     group: 'Arithmetic',
    //     id: "div",
    //     name: 'Division',
    //     latex: 'c=\\frac{a}{b}',
    //     latex_boxes: '\\Box=\\frac{\\Box}{\\Box}',
    //     params: []
    // },
    // {
    //     group: 'Arithmetic',
    //     id: "mult",
    //     name: 'Multiplication',
    //     latex: 'c=a \\times b',
    //     latex_boxes: '\\Box=\\Box\\times\\Box',
    //     params: []
    // },
]