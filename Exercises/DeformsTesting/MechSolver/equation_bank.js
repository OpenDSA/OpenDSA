const equations = [
    {
        group: 'Basic definitions',
        id: "axialMemberAvgNormalStress",
        name: 'Average normal stress in an axial member',
        latex: '\\sigma_{avg_{ }}=\\frac {F_{ }} {A_{ }}',
        latex_boxes: '\\Box=\\frac \\Box \\Box',
        params_latex: ['\\sigma_{avg_{ }}', 'A_{ }', 'F_{ }'],
        template: 'avgstress = force / area',
        params: ['avgstress', 'area', 'force'],
        variables: {
            'avgstress': '\\sigma_{avg_{ }}',
            'force': 'F_{ }',
            'area': 'A_{ }'
        },
        domains: {
            'avgstress': 'length',
            'force': 'force',
            'area': 'length2'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "dirShearStressAvg",
        name: 'Average direct shear stress',
        latex: '\\tau_{avg_{ }}=\\frac {V_{ }} {A_{v_{ }}}',
        latex_boxes: '\\Box=\\frac \\Box \\Box',
        params_latex: ['\\tau_{avg_{ }}', 'V_{ }', 'A_{v_{ }}'],
        template: 'stress = volume / area',
        params: ['stress', 'area', 'volume'],
        variables: {
            'avgstress': '\\tau_{avg_{ }}',
            'volume': 'V_{ }',
            'area': 'A_{v_{ }}'
        },
        domains: {
            'avgstress': 'pressure',
            'volume': 'length3',
            'areaV': 'length2'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "bearingStressAvg",
        name: 'Average bearing stress',
        latex: '\\sigma_{b_{ }}=\\frac {F_{ }} {A_{b_{ }}}',
        latex_boxes: '\\Box=\\frac \\Box \\Box',
        params_latex: ['\\sigma_{b_{ }}', 'F_{ }', 'A_{b_{ }}'],
        template: 'stress = force / area',
        params: ['stress', 'area', 'force'],
        variables: {
            'avgstress': '\\sigma_{b_{ }}',
            'force': 'F_{ }',
            'area': 'A_{b_{ }}'
        },
        domains: {
            'avgstress': 'pressure',
            'force': 'force',
            'area': 'length2'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "axialMemberNormalStrainAvgLongL",
        name: 'Average normal strain on an axial member',
        latex: '\\epsilon_{long_{ }}=\\frac {\\Delta L_{ }} {L_{ }}',
        latex_boxes: '\\Box=\\frac \\Box \\Box',
        params_latex: ['\\epsilon_{long_{ }}', '\\Delta L_{ }', 'L_{ }'],
        template: 'strain = changeL / length',
        params: ['strain', 'length', 'changeL'],
        variables: {
            'strain': '\\epsilon_{long_{ }}',
            'changeL': '\\Delta L_{ }',
            'length': 'L_{ }'
        },
        domains: {
            'strain': 'ratio',
            'changeL': 'length',
            'length': 'length'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "axialMemberNormalStrainAvgLongdelta",
        name: 'Average normal strain on an axial member',
        latex: '\\epsilon_{long_{ }}=\\frac {\\delta_{ }} {L_{ }}',
        latex_boxes: '\\Box=\\frac \\Box \\Box',
        params_latex: ['\\epsilon_{long_{ }}', '\\delta_{ }', 'L_{ }'],
        template: 'strain = deform / length',
        params: ['strain', 'length', 'deform'],
        variables: {
            'strain': '\\epsilon_{long_{ }}',
            'deform': '\\delta_{ }',
            'length': 'L_{ }'
        },
        domains: {
            'strain': 'ratio',
            'deform': 'length',
            'length': 'length'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "axialMemberNormalStrainAvgLatDiameter",
        name: 'Average normal strain on an axial member',
        latex: '\\epsilon_{lat_{ }}=\\frac {\\Delta d_{ }} {d_{ }}',
        latex_boxes: '\\Box=\\frac \\Box \\Box',
        params_latex: ['\\epsilon_{lat_{ }}', '\\Delta d_{ }', 'd_{ }'],
        template: 'strain = changeDiam / diameter',
        params: ['strain', 'diameter', 'changeDiam'],
        variables: {
            'strain': '\\epsilon_{lat_{ }}',
            'changeDiam': '\\Delta d_{ }',
            'diameter': 'd_{ }'
        },
        domains: {
            'strain': 'ratio',
            'changeDiam': 'length',
            'diameter': 'length'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "axialMemberNormalStrainAvgLatT",
        name: 'Average normal strain on an axial member',
        latex: '\\epsilon_{lat_{ }}=\\frac {\\Delta t_{ }} {t_{ }}',
        latex_boxes: '\\Box=\\frac \\Box \\Box',
        params_latex: ['\\epsilon_{lat_{ }}', '\\Delta t_{ }', 't_{ }'],
        template: 'strain = changeDiam / diameter',
        params: ['strain', 'diameter', 'changeDiam'],
        variables: {
            'strain': '\\epsilon_{lat_{ }}',
            'changeDiam': '\\Delta t_{ }',
            'diameter': 't_{ }'
        },
        domains: {
            'strain': 'ratio',
            'changeDiam': 'length',
            'diameter': 'length'
        },
        height: 30
    },

    {
        group: 'Axial',
        id: "axialStress",
        name: 'Stress in an axial',
        latex: '\\delta_{T_{ }} = \\alpha_{ } \\cdot \\Delta T_{ } \\cdot L_{ }',
        latex_boxes: '\\Box=\\Box\\times\\Box\\times\\Box',
        params_latex: ['\\delta', '\\alpha', '\\Delta T', 'L'],
        template: 'deform = const * tempchange * len',
        params: ['deform', 'const', 'tempchange', 'len'],
        variables: {
            'deform':'\\delta_{T_{ }}',
            'const':'\\alpha_{ }',
            'tempchange':'\\Delta T_{ }',
            'len':'L_{ }'
        },
        domains: {
            'deform':'length',
            'const':'temperature-1',
            'tempchange':'temperature',
            'len':'length'
        },
        height: 30
    },
    {
        group: 'Axial',
        id: "shearStrainMaxInPlane1",
        name: 'Maximum in-plane shear strain',
        latex: '\\gamma_{max_{ }} = \\pm2 \\sqrt{\\left(\\frac{ \\varepsilon_{x_{ }} - \\varepsilon_{y_{ }} }{2}\\right)^2+\\left(\\frac{ \\gamma_{xy_{ }} }{2}\\right)^2}',
        latex_boxes: '\\Box=\\pm2\\sqrt{\\left(\\frac{\\Box - \\Box}{2}\\right)^2+\\left(\\frac{\\Box}{2}\\right)^2}',
        params_latex: ['\\gamma_{max_{ }}', '\\varepsilon_{x_{ }}', '\\varepsilon_{y_{ }}', '\\gamma_{xy_{ }}'],
        template: 'maxshear=2*sqrt( (epsX - epsY/2)^2 + (shear/2)^2 )',
        params: ['maxshear', 'epsX', 'epsY', 'shear'],
        variables: {
            'maxshear': '\\gamma_{max_{ }}',
            'epsX': '\\varepsilon_{x_{ }}',
            'epsY': '\\varepsilon_{y_{ }}',
            'shear': '\\gamma_{xy_{ }}',
        },
        domains: {
            'maxshear': 'coefficient',
            'epsX': 'coefficient',
            'epsY': 'coefficient',
            'shear': 'coefficient',
        },
        height: 50
    },
    {
        group: 'Axial',
        id: "Relating deformation to stress L and E",
        name: 'Intermediate stress equation',
        latex: '\\delta_{ } = \\sigma_{ } \\frac {L_{ }} {E_{ }}',
        latex_boxes: '\\Box=\\Box \\frac \\Box \\Box',
        params_latex: ['\\delta_{ }','\\sigma_{ }', 'L_{ }', 'E_{ }'],
        template: 'deform = stress * length / pressE',
        params: ['deform', 'stress', 'pressE', 'length'],
        variables: {
            'deform': '\\delta_{ }',
            'stress': '\\sigma_{ }',
            'pressE': 'E_{ }',
            'length': 'L_{ }'
        },
        domains: {
            'deform': 'length',
            'stress': 'pressure',
            'pressE': 'pressure',
            'length': 'length'
        },
        height: 30
    },
    // {
    //     group: 'Axial',
    //     id: "deformationToStressLEdemo",
    //     name: 'Intermediate stress equation',
    //     latex: '45.856=45.856 \\frac {45.856} {45.856}',
    //     latex_boxes: '\\Box=\\Box \\frac \\Box \\Box',
    //     params_latex: ['\\delta','\\sigma', 'L', 'E'],
    //     template: 'deform = stress * length / pressE',
    //     params: ['deform', 'stress', 'pressE', 'length'],
    //     variables: {
    //         'deform': '\\delta',
    //         'stress': '\\sigma',
    //         'pressE': 'E',
    //         'length': 'L'
    //     }
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
    {
        group: 'Arithmetic',
        id: "add2",
        name: 'Addition of 2 terms',
        latex: 's_{ }=a_{ }+b_{ }',
        latex_boxes: '\\Box=\\Box+\\Box',
        params_latex: ['s_{ }','b_{ }', 'a_{ }'],
        template: 'cterm = aterm + bterm',
        params: ['cterm', 'bterm', 'aterm'],
        variables: {
            'cterm': 's_{ }',
            'bterm': 'b_{ }',
            'aterm': 'a_{ }'
        },
        domains: {
            'cterm': 'dimensionless',
            'bterm': 'dimensionless',
            'aterm': 'dimensionless'
        },
        height: 30
    },
    // {
    //     group: 'Arithmetic',
    //     id: "add3",
    //     name: 'Addition of 3 terms',
    //     latex: 's_{}=x_{}+y_{}+z_{}',
    //     latex_boxes: '\\Box=\\Box+\\Box+\\Box',
    //     params_latex: ['s', 'x', 'y', 'z'],
    //     template: 'cterm = xterm + yterm + zterm',
    //     params: ['cterm', 'xterm', 'yterm', 'zterm'],
    //     variables: {
    //         'cterm': 's',
    //         'xterm': 'x',
    //         'yterm': 'y',
    //         'zterm': 'z'
    //     },
    //     domains: {
    //         'cterm': 'dimensionless',
    //         'xterm': 'dimensionless',
    //         'yterm': 'dimensionless',
    //         'zterm': 'dimensionless'
    //     }
    // },
    {
        group: 'Arithmetic',
        id: "sub",
        name: 'Subtraction',
        latex: 'c=a-b',
        latex_boxes: '\\Box=\\Box-\\Box',
        params_latex: ['c','b', 'a'],
        template: 'cterm = bterm - aterm',
        params: ['cterm', 'bterm', 'aterm'],
        variables: {
            'cterm': 'c',
            'bterm': 'b',
            'aterm': 'a'
        },
        domains: {
            'cterm': 'dimensionless',
            'bterm': 'dimensionless',
            'aterm': 'dimensionless'
        },
        height: 30
    },
    {
        group: 'Arithmetic',
        id: "div",
        name: 'Division',
        latex: 'c=\\frac{a}{b}',
        latex_boxes: '\\Box=\\frac{\\Box}{\\Box}',
        params_latex: ['c','b', 'a'],
        template: 'cterm = aterm  bterm',
        params: ['cterm', 'bterm', 'aterm'],
        variables: {
            'cterm': 'c',
            'bterm': 'b',
            'aterm': 'a'
        },
        domains: {
            'cterm': 'dimensionless',
            'bterm': 'dimensionless',
            'aterm': 'dimensionless'
        },
        height: 30
    },
    {
        group: 'Arithmetic',
        id: "mult",
        name: 'Multiplication',
        latex: 'c=a \\times b',
        latex_boxes: '\\Box=\\Box\\times\\Box',
        params_latex: ['c','b', 'a'],
        template: 'cterm = aterm * bterm',
        params: ['cterm', 'aterm', 'bterm'],
        variables: {
            'cterm': 'c',
            'bterm': 'b',
            'aterm': 'a'
        },
        domains: {
            'cterm': 'dimensionless',
            'bterm': 'dimensionless',
            'aterm': 'dimensionless'
        },
        height: 30
    },
    {
        group: 'Arithmetic',
        id: "power",
        name: 'Power',
        latex: 'c_{} = a_{} ^ {b_{}}',
        latex_boxes: '\\Box=\\Box^{\\Box}',
        params_latex: ['c','b', 'a'],
        template: 'cterm = aterm ^ bterm',
        params: ['cterm', 'aterm', 'bterm'],
        variables: {
            'cterm': 'c',
            'bterm': 'b',
            'aterm': 'a'
        },
        domains: {
            'cterm': 'dimensionless',
            'bterm': 'dimensionless',
            'aterm': 'dimensionless'
        },
        height: 30
    },
    {
        group: 'Arithmetic',
        id: "root",
        name: 'Root',
        latex: 'c_{} = a_{} ^ {1/ b_{}}',
        latex_boxes: '\\Box=\\Box^{1/\\Box}',
        params_latex: ['c','b', 'a'],
        template: 'cterm = aterm ^ (1/bterm)',
        params: ['cterm', 'aterm', 'bterm'],
        variables: {
            'cterm': 'c',
            'bterm': 'b',
            'aterm': 'a'
        },
        domains: {
            'cterm': 'dimensionless',
            'bterm': 'dimensionless',
            'aterm': 'dimensionless'
        },
        height: 30
    }
]