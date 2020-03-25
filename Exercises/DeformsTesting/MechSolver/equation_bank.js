const equations = [
    {
        group: 'Basic definitions',
        id: "axialMemberAvgNormalStress",
        name: 'Average normal stress in an axial member',
        latex: '\\sigma_{avg_{ }} = \\frac {F_{ }} {A_{ }}',
        latex_boxes: '\\Box = \\frac \\Box \\Box',
        params_latex: ['\\sigma_{avg_{ }}', 'A_{ }', 'F_{ }'],
        template: 'normalstress = normalforce / area',
        params: ['normalstress', 'area', 'normalforce'],
        variables: {
            'normalstress': '\\sigma_{avg_{ }}',
            'normalforce': 'F_{ }',
            'area': 'A_{ }'
        },
        domains: {
            'normalstress': 'pressure',
            'normalforce': 'force',
            'area': 'length2'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "dirShearStressAvg",
        name: 'Average direct shear stress',
        latex: '\\tau_{avg_{ }} = \\frac {V_{ }} {A_{v_{ }}}',
        latex_boxes: '\\Box = \\frac \\Box \\Box',
        params_latex: ['\\tau_{avg_{ }}', 'V_{ }', 'A_{v_{ }}'],
        template: 'shearstress = shearforce / area',
        params: ['shearstress', 'area', 'shearforce'],
        variables: {
            'shearstress': '\\tau_{avg_{ }}',
            'shearforce': 'V_{ }',
            'area': 'A_{v_{ }}'
        },
        domains: {
            'shearstress': 'pressure',
            'shearforce': 'length3',
            'area': 'length2'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "bearingStressAvg",
        name: 'Average bearing stress',
        latex: '\\sigma_{b_{ }} = \\frac {F_{ }} {A_{b_{ }}}',
        latex_boxes: '\\Box = \\frac \\Box \\Box',
        params_latex: ['\\sigma_{b_{ }}', 'F_{ }', 'A_{b_{ }}'],
        template: 'normalstress = normalforce / area',
        params: ['normalstress', 'area', 'normalforce'],
        variables: {
            'normalstress': '\\sigma_{b_{ }}',
            'normalforce': 'F_{ }',
            'area': 'A_{b_{ }}'
        },
        domains: {
            'normalstress': 'pressure',
            'normalforce': 'force',
            'area': 'length2'
<<<<<<< HEAD
        },
=======
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
>>>>>>> a45fa7b272b86a760f61ec87a0a72a61bdbfe9ec
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "axialMemberNormalStrainAvgLongdelta",
        name: 'Average normal strain on an axial member',
        latex: '\\epsilon_{long_{ }} = \\frac {\\delta_{ }} {L_{ }}',
        latex_boxes: '\\Box = \\frac \\Box \\Box',
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
        latex: '\\epsilon_{lat_{ }} = \\frac {\\Delta l_{ }} {l_{ }}',
        latex_boxes: '\\Box = \\frac \\Box \\Box',
        params_latex: ['\\epsilon_{lat_{ }}', '\\Delta l_{ }', 'l_{ }'],
        template: 'strain = changeLength / length',
        params: ['strain', 'length', 'changeLength'],
        variables: {
            'strain': '\\epsilon_{lat_{ }}',
            'changeLength': '\\Delta l_{ }',
            'length': 'l_{ }'
        },
        domains: {
            'strain': 'ratio',
<<<<<<< HEAD
            'changeLength': 'length',
            'length': 'length'
=======
            'changeDiam': 'length',
            'diameter': 'length'
>>>>>>> a45fa7b272b86a760f61ec87a0a72a61bdbfe9ec
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "tempChangeNormalStrainAvg",
        name: 'Average normal strain caused by temperature change',
        latex: '\\epsilon_{T_{ }} = \\alpha_{ } \\cdot \\Delta T_{ }',
        latex_boxes: '\\Box = \\Box \\cdot \\Box',
        params_latex: ['\\epsilon_{T_{ }}', '\\alpha_{ }', '\\Delta T_{ }'],
        template: 'strain = themalcoeff * tempchange',
        params: ['strain', 'themalcoeff', 'tempchange'],
        variables: {
            'strain': '\\epsilon_{T_{ }}',
            'themalcoeff': '\\Delta t_{ }',
            'tempchange': 't_{ }'
        },
        domains: {
            'strain': 'ratio',
<<<<<<< HEAD
            'themalcoeff': 'temperature-1',
            'tempchange': 'temperature'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "HookesLaw1Dsigma",
        name: 'Hookes Law, one dimensional for stress',
        latex: '\\sigma{ } = E_{ } \\cdot \\epsilon_{ }',
        latex_boxes: '\\Box = \\Box \\cdot \\Box',
        params_latex: ['\\sigma_{ }', 'E_{ }', '\\epsilon_{ }'],
        template: 'stress = stresscoeff * strain',
        params: ['stress', 'stresscoeff', 'strain'],
        variables: {
            'stress': '\\sigma_{ }',
            'stresscoeff': 'E_{ }',
            'strain': '\\epsilon_{ }'
        },
        domains: {
            'stress': 'pressure',
            'stresscoeff': 'pressure',
            'strain': 'ratio'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "HookesLaw1Dtau",
        name: 'Hookes Law, one dimensional for quantity',
        latex: '\\tau{ } = G_{ } \\cdot \\gamma_{ }',
        latex_boxes: '\\Box = \\Box \\cdot \\Box',
        params_latex: ['\\tau_{ }', 'G_{ }', '\\gamma_{ }'],
        template: 'stress = stresscoeff * strain',
        params: ['stress', 'stresscoeff', 'strain'],
        variables: {
            'stress': '\\tau_{ }',
            'stresscoeff': 'G_{ }',
            'strain': '\\gamma_{ }'
        },
        domains: {
            'stress': 'pressure',
            'stresscoeff': 'pressure',
            'strain': 'ratio'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "PoissonsRatio",
        name: 'Poisson\'s Ratio',
        latex: '\\nu_{ } = - \\frac {\\epsilon_{lat_{ }}} {\\epsilon_{long_{ }}}',
        latex_boxes: '\\Box = - \\frac \\Box \\Box',
        params_latex: ['\\nu_{ }', '\\epsilon_{lat_{ }}', '\\epsilon_{long_{ }}'],
        template: 'poissonratio = - latstrain * longstrain',
        params: ['poissonratio', 'longstrain', 'latstrain'],
        variables: {
            'poissonratio': '\\nu_{ }',
            'latstrain': '\\epsilon_{lat_{ }}',
            'longstrain': '\\epsilon_{long_{ }}'
        },
        domains: {
            'poissonratio': 'ratio',
            'latstrain': 'ratio',
            'longstrain': 'ratio'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "EGnuRelation",
        name: 'Relation between E, G, and nu',
        latex: 'G_{ } = \\frac {E_{ }} {2\\cdot(1+\\nu_{ })}',
        latex_boxes: '\\Box = \\frac {\\Box} {2\\cdot(1+\\Box)}',
        params_latex: ['G_{ }', 'E_{ }', '\\nu_{ }'],
        template: 'Gcoeff = Ecoeff / (2*(1+ poissonratio ))',
        params: ['Gcoeff', 'poissonratio', 'Ecoeff'],
        variables: {
            'Gcoeff': 'G_{ }',
            'Ecoeff': 'E_{ }',
            'poissonratio': '\\nu_{ }'
        },
        domains: {
            'Gcoeff': 'temperature-1',
            'Ecoeff': 'temperature-1',
            'poissonratio': 'ratio'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "AllowableStressDefinition1sigma",
        name: 'Definition of allowable stress',
        latex: '\\sigma_{allow_{ }} = \\frac {\\sigma_{failure_{ }}} {FS_{ }}',
        latex_boxes: '\\Box = \\frac {\\Box} {\\Box}',
        params_latex: ['\\sigma_{allow_{ }}', '\\sigma_{failure_{ }}', 'FS_{ }'],
        template: 'stressallowed = stressfailure / FS',
        params: ['stressallowed', 'FS', 'stressfailure'],
        variables: {
            'stressallowed': '\\sigma_{allow_{ }}',
            'stressfailure': '\\sigma_{failure_{ }',
            'FS': 'FS_{ }'
        },
        domains: {
            'stressallowed': 'pressure',
            'stressfailure': 'pressure',
            'FS': 'safetyfactor'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "AllowableStressDefinition1tau",
        name: 'Definition of allowable stress',
        latex: '\\tau_{allow_{ }} = \\frac {\\tau_{failure_{ }}} {FS_{ }}',
        latex_boxes: '\\Box = \\frac {\\Box} {\\Box}',
        params_latex: ['\\tau_{allow_{ }}', '\\tau_{failure_{ }}', 'FS_{ }'],
        template: 'stressallowed = stressfailure / FS',
        params: ['stressallowed', 'FS', 'stressfailure'],
        variables: {
            'stressallowed': '\\tau_{allow_{ }}',
            'stressfailure': '\\tau_{failure_{ }',
            'FS': 'FS_{ }'
        },
        domains: {
            'stressallowed': 'pressure',
            'stressfailure': 'pressure',
            'FS': 'safetyfactor'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "FactorOfSafety1sigma",
        name: 'Definition of allowable stress',
        latex: 'FS_{ } = \\frac {\\sigma_{failure_{ }}} {\\sigma_{actual_{ }}}',
        latex_boxes: '\\Box = \\frac {\\Box} {\\Box}',
        params_latex: ['FS', '\\sigma_{failure_{ }}', '\\sigma_{actual_{ }}'],
        template: 'FS = stressfailure / stressactual',
        params: ['FS', 'stressactual', 'stressfailure'],
        variables: {
            'stressactual': '\\sigma_{actual_{ }}',
            'stressfailure': '\\sigma_{failure_{ }',
            'FS': 'FS_{ }'
        },
        domains: {
            'stressactual': 'pressure',
            'stressfailure': 'pressure',
            'FS': 'safetyfactor'
        },
        height: 30
    },
    {
        group: 'Basic definitions',
        id: "FactorOfSafety1tau",
        name: 'Definition of allowable stress',
        latex: 'FS_{ } = \\frac {\\tau_{failure_{ }}} {\\tau_{actual_{ }}}',
        latex_boxes: '\\Box = \\frac {\\Box} {\\Box}',
        params_latex: ['FS', '\\tau_{failure_{ }}', '\\tau_{actual_{ }}'],
        template: 'FS = stressfailure / stressactual',
        params: ['FS', 'stressactual', 'stressfailure'],
        variables: {
            'stressactual': '\\tau_{actual_{ }}',
            'stressfailure': '\\tau_{failure_{ }',
            'FS': 'FS_{ }'
        },
        domains: {
            'stressactual': 'pressure',
            'stressfailure': 'pressure',
            'FS': 'safetyfactor'
=======
            'changeDiam': 'length',
            'diameter': 'length'
>>>>>>> a45fa7b272b86a760f61ec87a0a72a61bdbfe9ec
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