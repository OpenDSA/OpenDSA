const equations = [
    {
        group: 'Basic definitions',
        id: "axialMemberAvgNormalStress",
        name: 'Average normal stress in an axial member',
        latex: '\\sigma_{ } = \\frac {F_{ }} {A_{ }}',
        latex_boxes: '\\Box = \\dfrac \\Box \\Box',  //dfrac for mathematics, frac with font change for the representation possibly. Change height padding and widths etc. accordingly throughout.
        params_latex: ['\\sigma_{ }', 'A_{ }', 'F_{ }'],
        template: 'normalstress = normalforce / area',
        params: ['normalstress', 'area', 'normalforce'],
        variables: {
            'normalstress': '\\sigma_{ }',
            'normalforce': 'F_{ }',
            'area': 'A_{ }'
        },
        domains: {
            'normalstress': 'pressure',
            'normalforce': 'force',
            'area': 'length2'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Basic definitions',
        id: "dirShearStressAvg",
        name: 'Average direct shear stress',
        latex: '\\tau_{ } = \\frac {V_{ }} {A_{ }}',
        latex_boxes: '\\Box = \\dfrac \\Box \\Box',
        params_latex: ['\\tau_{ }', 'V_{ }', 'A_{ }'],
        template: 'shearstress = shearforce / area',
        params: ['shearstress', 'area', 'shearforce'],
        variables: {
            'shearstress': '\\tau_{ }',
            'shearforce': 'V_{ }',
            'area': 'A_{ }'
        },
        domains: {
            'shearstress': 'pressure',
            'shearforce': 'length3',
            'area': 'length2'
        },
        height: 60,
        dispheight: 30
    },
    // {
    //     group: 'Basic definitions',
    //     id: "bearingStressAvg",
    //     name: 'Average bearing stress',
    //     latex: '\\sigma_{ } = \\frac {F_{ }} {A_{ }}',
    //     latex_boxes: '\\Box = \\frac \\Box \\Box',
    //     params_latex: ['\\sigma_{ }', 'F_{ }', 'A_{ }'],
    //     template: 'normalstress = normalforce / area',
    //     params: ['normalstress', 'area', 'normalforce'],
    //     variables: {
    //         'normalstress': '\\sigma_{ }',
    //         'normalforce': 'F_{ }',
    //         'area': 'A_{ }'
    //     },
    //     domains: {
    //         'normalstress': 'pressure',
    //         'normalforce': 'force',
    //         'area': 'length2'
    //     },
    //     height: 30
    // },
    // {
    //     group: 'Basic definitions',
    //     id: "axialMemberNormalStrainAvgLongL",
    //     name: 'Average normal strain on an axial member',
    //     latex: '\\epsilon_{long_{ }}=\\frac {\\Delta L_{ }} {L_{ }}',
    //     latex_boxes: '\\Box=\\frac \\Box \\Box',
    //     params_latex: ['\\epsilon_{long_{ }}', '\\Delta L_{ }', 'L_{ }'],
    //     template: 'strain = changeL / length',
    //     params: ['strain', 'length', 'changeL'],
    //     variables: {
    //         'strain': '\\epsilon_{long_{ }}',
    //         'changeL': '\\Delta L_{ }',
    //         'length': 'L_{ }'
    //     },
    //     domains: {
    //         'strain': 'strain',
    //         'changeL': 'length',
    //         'length': 'length'
    //     },
    //     height: 30
    // },
    {
        group: 'Basic definitions',
        id: "axialMemberNormalStrainAvgLongdelta",
        name: 'Average normal strain on an axial member',
        latex: '\\epsilon_{long_{ }} = \\frac {\\delta_{ }} {L_{ }}',
        latex_boxes: '\\Box = \\dfrac \\Box \\Box',
        params_latex: ['\\epsilon_{long_{ }}', '\\delta_{ }', 'L_{ }'],
        template: 'normallongstrain = deform / length',
        params: ['normallongstrain', 'length', 'deform'],
        variables: {
            'normallongstrain': '\\epsilon_{long_{ }}',
            'deform': '\\delta_{ }',
            'length': 'L_{ }'
        },
        domains: {
            'normallongstrain': 'strain',
            'deform': 'length',
            'length': 'length'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Basic definitions',
        id: "axialMemberNormalStrainAvgLatDiameter",
        name: 'Average normal strain on an axial member',
        latex: '\\epsilon_{lat_{ }} = \\frac {\\Delta l_{ }} {l_{ }}',
        latex_boxes: '\\Box = \\dfrac \\Box \\Box',
        params_latex: ['\\epsilon_{lat_{ }}', '\\Delta l_{ }', 'l_{ }'],
        template: 'normallatstrain = changeLength / length',
        params: ['normallatstrain', 'length', 'changeLength'],
        variables: {
            'normallatstrain': '\\epsilon_{lat_{ }}',
            'changeLength': '\\Delta l_{ }',
            'length': 'l_{ }'
        },
        domains: {
            'normallatstrain': 'strain',
            'changeLength': 'length',
            'length': 'length'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Basic definitions',
        id: "tempChangeNormalStrainAvg",
        name: 'Average normal strain caused by temperature change',
        latex: '\\epsilon_{T_{ }} = \\alpha_{ } \\cdot \\Delta T_{ }',
        latex_boxes: '\\Box = \\Box \\cdot \\Box',
        params_latex: ['\\epsilon_{T_{ }}', '\\alpha_{ }', '\\Delta T_{ }'],
        template: 'normalstrain = thermalcoeff * tempchange',
        params: ['normalstrain', 'thermalcoeff', 'tempchange'],
        variables: {
            'normalstrain': '\\epsilon_{T_{ }}',
            'thermalcoeff': '\\alpha_{ }',
            'tempchange': '\\Delta T_{ }'
        },
        domains: {
            'normalstrain': 'strain',
            'thermalcoeff': 'temperature-1',
            'tempchange': 'temperature'
        },
        height: 42,
        dispheight: 30
    },
    {
        group: 'Basic definitions',
        id: "HookesLaw1Dsigma",
        name: 'Hookes Law, one dimensional for stress',
        latex: '\\sigma_{ } = E_{ } \\cdot \\epsilon_{ }',
        latex_boxes: '\\Box = \\Box \\cdot \\Box',
        params_latex: ['\\sigma_{ }', 'E_{ }', '\\epsilon_{ }'],
        template: 'normalstress = normalstresscoeff * normalstrain',
        params: ['normalstress', 'normalstresscoeff', 'normalstrain'],
        variables: {
            'normalstress': '\\sigma_{ }',
            'normalstresscoeff': 'E_{ }',
            'normalstrain': '\\epsilon_{ }'
        },
        domains: {
            'normalstress': 'pressure',
            'normalstresscoeff': 'pressure',
            'normalstrain': 'strain'
        },
        height: 42,
        dispheight: 30
    },
    {
        group: 'Basic definitions',
        id: "HookesLaw1Dtau",
        name: 'Hookes Law, one dimensional for quantity',
        latex: '\\tau{ } = G_{ } \\cdot \\gamma_{ }',
        latex_boxes: '\\Box = \\Box \\cdot \\Box',
        params_latex: ['\\tau_{ }', 'G_{ }', '\\gamma_{ }'],
        template: 'shearstress = shearstresscoeff * shearstrain',
        params: ['shearstress', 'shearstresscoeff', 'shearstrain'],
        variables: {
            'shearstress': '\\tau_{ }',
            'shearstresscoeff': 'G_{ }',
            'shearstrain': '\\gamma_{ }'
        },
        domains: {
            'shearstress': 'pressure',
            'shearstresscoeff': 'pressure',
            'shearstrain': 'strain'
        },
        height: 42,
        dispheight: 30
    },
    {
        group: 'Basic definitions',
        id: "PoissonsRatio",
        name: 'Poisson\'s Ratio',
        latex: '\\nu_{ } = - \\frac {\\epsilon_{lat_{ }}} {\\epsilon_{long_{ }}}',
        latex_boxes: '\\Box = - \\dfrac \\Box \\Box',
        params_latex: ['\\nu_{ }', '\\epsilon_{lat_{ }}', '\\epsilon_{long_{ }}'],
        template: 'poissonratio = - latstrain * longstrain',
        params: ['poissonratio', 'longstrain', 'latstrain'],
        variables: {
            'poissonratio': '\\nu_{ }',
            'latstrain': '\\epsilon_{lat_{ }}',
            'longstrain': '\\epsilon_{long_{ }}'
        },
        domains: {
            'poissonratio': 'dimensionless',
            'latstrain': 'strain',
            'longstrain': 'strain'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Basic definitions',
        id: "EGnuRelation",
        name: 'Relation between E, G, and nu',
        latex: 'G_{ } = \\frac {E_{ }} {2\\cdot(1+\\nu_{ })}',
        latex_boxes: '\\Box = \\dfrac {\\Box} {2\\cdot(1+\\Box)}',
        params_latex: ['G_{ }', 'E_{ }', '\\nu_{ }'],
        template: 'shearstresscoeff = normalstresscoeff / (2*(1+ poissonratio ))',
        params: ['shearstresscoeff', 'poissonratio', 'normalstresscoeff'],
        variables: {
            'shearstresscoeff': 'G_{ }',
            'normalstresscoeff': 'E_{ }',
            'poissonratio': '\\nu_{ }'
        },
        domains: {
            'shearstresscoeff': 'pressure',
            'normalstresscoeff': 'pressure',
            'poissonratio': 'dimensionless'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Basic definitions',
        id: "AllowableStressDefinition1sigma",
        name: 'Definition of allowable stress',
        latex: '\\sigma_{allow_{ }} = \\frac {\\sigma_{failure_{ }}} {FS_{ }}',
        latex_boxes: '\\Box = \\dfrac {\\Box} {\\Box}',
        params_latex: ['\\sigma_{allow_{ }}', '\\sigma_{failure_{ }}', 'FS_{ }'],
        template: 'normalstressallowed = normalstressfailure / FS',
        params: ['normalstressallowed', 'FS', 'normalstressfailure'],
        variables: {
            'normalstressallowed': '\\sigma_{allow_{ }}',
            'normalstressfailure': '\\sigma_{failure_{ }}',
            'FS': 'FS_{ }'
        },
        domains: {
            'normalstressallowed': 'pressure',
            'normalstressfailure': 'pressure',
            'FS': 'dimensionless'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Basic definitions',
        id: "AllowableStressDefinition1tau",
        name: 'Definition of allowable stress',
        latex: '\\tau_{allow_{ }} = \\frac {\\tau_{failure_{ }}} {FS_{ }}',
        latex_boxes: '\\Box = \\dfrac {\\Box} {\\Box}',
        params_latex: ['\\tau_{allow_{ }}', '\\tau_{failure_{ }}', 'FS_{ }'],
        template: 'shearstressallowed = shearstressfailure / FS',
        params: ['shearstressallowed', 'FS', 'shearstressfailure'],
        variables: {
            'shearstressallowed': '\\tau_{allow_{ }}',
            'shearstressfailure': '\\tau_{failure_{ }}',
            'FS': 'FS_{ }'
        },
        domains: {
            'shearstressallowed': 'pressure',
            'shearstressfailure': 'pressure',
            'FS': 'dimensionless'
        },
        height: 60,
        dispheight: 30
    },
    // {
    //     group: 'Basic definitions',
    //     id: "FactorOfSafety1sigma",
    //     name: 'Definition of allowable stress',
    //     latex: 'FS_{ } = \\frac {\\sigma_{failure_{ }}} {\\sigma_{actual_{ }}}',
    //     latex_boxes: '\\Box = \\frac {\\Box} {\\Box}',
    //     params_latex: ['FS', '\\sigma_{failure_{ }}', '\\sigma_{actual_{ }}'],
    //     template: 'FS = stressfailure / stressactual',
    //     params: ['FS', 'stressactual', 'stressfailure'],
    //     variables: {
    //         'stressactual': '\\sigma_{actual_{ }}',
    //         'stressfailure': '\\sigma_{failure_{ }',
    //         'FS': 'FS_{ }'
    //     },
    //     domains: {
    //         'stressactual': 'pressure',
    //         'stressfailure': 'pressure',
    //         'FS': 'safetyfactor'
    //     },
    //     height: 30
    // },
    // {
    //     group: 'Basic definitions',
    //     id: "FactorOfSafety1tau",
    //     name: 'Definition of allowable stress',
    //     latex: 'FS_{ } = \\frac {\\tau_{failure_{ }}} {\\tau_{actual_{ }}}',
    //     latex_boxes: '\\Box = \\frac {\\Box} {\\Box}',
    //     params_latex: ['FS', '\\tau_{failure_{ }}', '\\tau_{actual_{ }}'],
    //     template: 'FS = stressfailure / stressactual',
    //     params: ['FS', 'stressactual', 'stressfailure'],
    //     variables: {
    //         'stressactual': '\\tau_{actual_{ }}',
    //         'stressfailure': '\\tau_{failure_{ }',
    //         'FS': 'FS_{ }'
    //     },
    //     domains: {
    //         'stressactual': 'pressure',
    //         'stressfailure': 'pressure',
    //         'FS': 'safetyfactor'
    //     },
    //     height: 30
    // },

    {
        group: 'Axial',
        id: "axialStress",
        name: 'Stress in an axial',
        latex: '\\delta_{T_{ }} = \\alpha_{ } \\cdot \\Delta T_{ } \\cdot L_{ }',
        latex_boxes: '\\Box=\\Box\\times\\Box\\times\\Box',
        params_latex: ['\\delta_{ }', '\\alpha_{ }', '\\Delta T_{ }', 'L_{ }'],
        template: 'deform = thermalcoeff * tempchange * length',
        params: ['deform', 'thermalcoeff', 'tempchange', 'length'],
        variables: {
            'deform':'\\delta_{T_{ }}',
            'thermalcoeff':'\\alpha_{ }',
            'tempchange':'\\Delta T_{ }',
            'length':'L_{ }'
        },
        domains: {
            'deform':'length',
            'thermalcoeff':'temperature-1',
            'tempchange':'temperature',
            'length':'length'
        },
        height: 42,
        dispheight: 30
    },
    {
        group: 'Axial',
        id: "deformationAxialMember",
        name: 'Deformation in Axial Member with F L A E',
        latex: '\\delta_{ } = \\frac {F_{ } \\cdot L_{ }} {A_{ } \\cdot E_{ }}',
        latex_boxes: '\\Box= \\dfrac {\\Box \\cdot \\Box} {\\Box \\cdot \\Box}',
        params_latex: ['\\delta_{ }','F_{ }', 'L_{ }', 'A_{ }', 'E_{ }'],
        template: 'deform = ( force * length ) / ( area * normalstresscoeff )',
        params: ['deform', 'area', 'normalstresscoeff', 'force', 'length'],
        variables: {
            'deform': '\\delta_{ }',
            'force': 'F_{ }',
            'area': 'A_{ }',
            'normalstresscoeff': 'E_{ }',
            'length': 'L_{ }',
        },
        domains: {
            'deform': 'length',
            'force': 'force',
            'area': 'area',
            'normalstresscoeff': 'pressure',
            'length': 'length'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Axial',
        id: "Relating deformation to stress L and E",
        name: 'Intermediate stress equation',
        latex: '\\delta_{ } = \\sigma_{ } \\frac {L_{ }} {E_{ }}',
        latex_boxes: '\\Box=\\Box \\dfrac \\Box \\Box',
        params_latex: ['\\delta_{ }','\\sigma_{ }', 'L_{ }', 'E_{ }'],
        template: 'deform = normalstress * length / normalstresscoeff',
        params: ['deform', 'normalstress', 'normalstresscoeff', 'length'],
        variables: {
            'deform': '\\delta_{ }',
            'normalstress': '\\sigma_{ }',
            'normalstresscoeff': 'E_{ }',
            'length': 'L_{ }'
        },
        domains: {
            'deform': 'length',
            'normalstress': 'pressure',
            'normalstresscoeff': 'pressure',
            'length': 'length'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Axial',
        id: "combinedDeformEquation",
        name: 'Force temperature deformation relationship',
        latex: '\\delta_{ } = \\frac {F_{ } \\cdot L_{ }} {A_{ } \\cdot E_{ }}'+
            '+ \\alpha_{ } \\cdot \\Delta T_{ } \\cdot L_{ }',
        latex_boxes: '\\Box=\\dfrac {\\Box \\cdot \\Box} {\\Box \\cdot \\Box}'+
            '+ \\Box \\cdot \\Box \\cdot \\Box',
        params_latex: ['\\delta_{ }','F_{ }', 'L_{ }', 'A_{ }', 'E_{ }',
            '\\alpha_{ }', '\\Delta T_{ }', 'L_{ }'],
        template: 'deform = ( force * length1 ) / ( area * normalstresscoeff ) + '+
            'thermalcoeff * tempchange * length2',
        params: ['deform', 'area', 'normalstresscoeff', 'force', 'length1', 
            'thermalcoeff', 'tempchange', 'length2'],
        variables: {
            'deform': '\\delta_{ }',
            'normalstresscoeff': 'E_{ }',
            'length1': 'L_{ }',
            'force': 'F_{ }',
            'area': 'A_{ }',
            'thermalcoeff':'\\alpha_{ }',
            'tempchange':'\\Delta T_{ }',
            'length2':'L_{ }'
        },
        domains: {
            'deform': 'length',
            'force': 'force',
            'area': 'length2',
            'normalstresscoeff': 'pressure',
            'length1': 'length',
            'length2': 'length',
            'tempchange': 'temperature',
            'thermalcoeff': 'temperature-1'
        },
        height: 60,
        dispheight: 30
    },

    {
        group: 'Torsion',
        id: 'shearMaxTorque1',
        name: 'shearMaxTorque1',
        latex: '\\tau_{ } = \\frac {T_{ } \\cdot d_{ }} {2 \\cdot J_{ }}',
        latex_boxes: '\\Box = \\dfrac {\\Box \\cdot \\Box} {2 \\cdot \\Box}',
        template: 'shearstress = ( torque * diameter ) / (2* mominertia )',
        params: ['shearstress', 'mominertia', 'torque', 'diameter'],
        variables: {
            'shearstress': '\\tau_{ }',
            'torque': 'T_{ }',
            'diameter': 'd_{ }',
            'mominertia': 'J_{ }'
        },
        domains: {
            'shearstress': 'pressure',
            'torque': 'torque',
            'diameter': 'length',
            'mominertia': 'length4'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Torsion',
        id: 'shearMaxTorque2',
        name: 'shearMaxTorque2',
        latex: '\\tau_{ } = \\frac {T_{ } \\cdot c_{ }} {J_{ }}',
        latex_boxes: '\\Box = \\dfrac {\\Box \\cdot \\Box} {\\Box}',
        template: 'shearstress = ( torque * radius ) / ( mominertia )',
        params: ['shearstress', 'mominertia', 'torque', 'radius'],
        variables: {
            'shearstress': '\\tau_{ }',
            'torque': 'T_{ }',
            'radius': 'c_{ }',
            'mominertia': 'J_{ }'
        },
        domains: {
            'shearstress': 'pressure',
            'torque': 'torque',
            'radius': 'length',
            'mominertia': 'length4'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Torsion',
        id: 'momInertiaRadius',
        name: 'momInertiaRadius',
        latex: 'J_{ } = \\pi/2 * ( r_{ } )^4',
        latex_boxes: '\\Box = \\pi/2 \\cdot ( \\Box )^4',
        template: 'mominertia = 3.1419/2 * ( radius )^4',
        params: ['mominertia', 'radius'],
        variables: {
            'mominertia': 'J_{ }',
            'radius': 'r_{ }'
        },
        domains: {
            'mominertia': 'length4',
            'radius': 'length'
        },
        height: 42,
        dispheight: 30
    },
    {
        group: 'Torsion',
        id: 'momInertiaDiameter',
        name: 'momInertiaDiameter',
        latex: 'J_{ } = \\pi/32 * ( d_{ } )^4',
        latex_boxes: '\\Box = \\pi/32 \\cdot ( \\Box )^4',
        template: 'mominertia = 3.1419/32 * ( diameter )^4',
        params: ['mominertia', 'diameter'],
        variables: {
            'mominertia': 'J_{ }',
            'diameter': 'd_{ }'
        },
        domains: {
            'mominertia': 'length4',
            'diameter': 'length'
        },
        height: 42,
        dispheight: 30
    },
    // {
    //     group: 'Torsion',
    // },
    // {
    //     group: 'Torsion',
    // },
    // {
    //     group: 'Torsion',
    // },
    // {
    //     group: 'Torsion',
    // },
    {
        group: 'Torsion',
        id: 'angletwist',
        name: 'angletwist',
        latex: '\\phi_{ } = \\frac { T_{ } L_{ } } { J_{ } G_{ } }',
        latex_boxes: '\\Box = \\dfrac { \\Box \\Box } { \\Box \\Box }',
        template: 'angletwist = ( torque * length ) / ( mominertia * shearstresscoeff )',
        params: ['angletwist', 'mominertia', 'shearstresscoeff', 'torque', 'length'],
        variables: {
            'angletwist': '\\phi_{ }',
            'mominertia': 'J_{ }',
            'shearstresscoeff': 'G_{ }',
            'torque': 'T_{ }',
            'length': 'L_{ }'
        },
        domains: {
            'angletwist': 'angle',
            'mominertia': 'length4',
            'shearstresscoeff': 'pressure',
            'torque': 'torque',
            'length': 'length'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Torsion',
        id: "power",
        name: 'power',
        latex: 'P_{ } = T_{ } \\cdot \\omega_{ }',
        latex_boxes: '\\Box = \\Box \\cdot \\Box',
        template: 'power = torque * angularvelocity',
        params: ['power', 'torque', 'angularvelocity'],
        variables: {
            'power': 'P_{ }',
            'torque': 'T_{ }',
            'angularvelocity': '\\omega_{ }'
        },
        domains: {
            'power': 'power',
            'torque': 'torque',
            'angularvelocity': 'angularvelocity'
        },
        height: 42,
        dispheight: 30
    },
    // {
    //     group: 'Torsion',
    //     id: "circShaftMaxTorsionShearStress",
    //     name: 'Maximum torsion shear stress in a circular shaft',
    //     latex: '\\tau_{max_{ }}=\\frac{T_{c_{ }}}{J_{}}',
    //     latex_boxes: '\\Box=\\frac {\\Box} {\\Box}',
    //     params: []
    // },
    // {
    //     group: 'Torsion',
    //     id: "circShaftMaxTorsionShearStress-J",
    //     name: 'J in Maximum torsion shear stress in a circular shaft',
    //     latex: 'J=\\frac\\pi 2 [{R}^4-{r}^4]',
    //     latex_boxes: '\\Box=\\frac\\pi 2 [{\\Box}^4-{\\Box}^4]',
    //     params: ['J', 'R', 'r']
    // },
    // {
    //     group: 'Axial',
    //     id: "shearStrainMaxInPlane1",
    //     name: 'Maximum in-plane shear strain',
    //     latex: '\\gamma_{max_{ }} = \\pm2 \\sqrt{\\left(\\frac{ \\varepsilon_{x_{ }} - \\varepsilon_{y_{ }} }{2}\\right)^2+\\left(\\frac{ \\gamma_{xy_{ }} }{2}\\right)^2}',
    //     latex_boxes: '\\Box=\\pm2\\sqrt{\\left(\\frac{\\Box - \\Box}{2}\\right)^2+\\left(\\frac{\\Box}{2}\\right)^2}',
    //     params_latex: ['\\gamma_{max_{ }}', '\\varepsilon_{x_{ }}', '\\varepsilon_{y_{ }}', '\\gamma_{xy_{ }}'],
    //     template: 'maxshear=2*sqrt( (epsX - epsY/2)^2 + (shear/2)^2 )',
    //     params: ['maxshear', 'epsX', 'epsY', 'shear'],
    //     variables: {
    //         'maxshear': '\\gamma_{max_{ }}',
    //         'epsX': '\\varepsilon_{x_{ }}',
    //         'epsY': '\\varepsilon_{y_{ }}',
    //         'shear': '\\gamma_{xy_{ }}',
    //     },
    //     domains: {
    //         'maxshear': 'coefficient',
    //         'epsX': 'coefficient',
    //         'epsY': 'coefficient',
    //         'shear': 'coefficient',
    //     },
    //     height: 60
    // },

    {
        group: 'Geometry',
        id: 'areaCircleRadius',
        name: 'areaCircleRadius',
        latex: 'A_{ } = \\pi { r_{ } }^2',
        latex_boxes: '\\Box = \\pi { \\Box }^2',
        template: 'area = 3.1419 * ( radius )^2',
        params: ['area', 'radius'],
        variables: {
            'area': 'A_{ }',
            'radius': 'r_{ }'
        },
        domains: {
            'area': 'length2',
            'radius': 'length'
        },
        height: 42,
        dispheight: 30
    },
    {
        group: 'Geometry',
        id: 'areaCircleDiameter',
        name: 'areaCircleDiameter',
        latex: 'A_{ } = \\frac {\\pi { d_{ } }^2 } {4}',
        latex_boxes: '\\Box = \\dfrac {\\pi { \\Box }^2 } {4}',
        template: 'area = 3.1419/4 * ( diameter )^2',
        params: ['area', 'diameter'],
        variables: {
            'area': 'A_{ }',
            'diameter': 'd_{ }'
        },
        domains: {
            'area': 'length2',
            'diameter': 'length'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Geometry',
        id: 'areaTriangle',
        name: 'areaTriangle',
        latex: 'A_{ } = \\frac {1}{2} b_{ } h_{ }',
        latex_boxes: '\\Box = \\frac {1}{2} \\Box_{ } \\Box_{ }',
        template: 'area = 0.5 * base * height',
        params: ['area', 'base', 'height'],
        variables: {
            'area': 'A_{ }',
            'height': 'h_{ }',
            'base': 'b_{ }'
        },
        domains: {
            'area': 'length2',
            'base': 'length',
            'height': 'length'
        },
        height: 42,
        dispheight: 30
    },
    {
        group: 'Geometry',
        id: 'radiusDiamReln',
        name: 'radiusDiamReln',
        latex: 'd_{ } = \\frac { r_{ } }{2}',
        latex_boxes: '\\Box = \\dfrac { \\Box }{2}',
        template: 'diameter = 0.5 * radius',
        params: ['diameter', 'radius'],
        variables: {
            'diameter': 'd_{ }',
            'radius': 'r_{ }',
        },
        domains: {
            'diameter': 'length',
            'radius': 'length',
        },
        height: 60,
        dispheight: 30
    },

    {
        group: 'Arithmetic',
        id: "equal",
        name: 'Equality',
        latex: 'a_{ }=b_{ }',
        latex_boxes: '\\Box=\\Box',
        params_latex: ['a_{ }', 'b_{ }'],
        template: 'aterm = bterm',
        params: ['aterm', 'bterm',],
        variables: {
            'bterm': 'b_{ }',
            'aterm': 'a_{ }'
        },
        domains: {
            'bterm': 'free',
            'aterm': 'free'
        },
        height: 42,
        dispheight: 30
    },
    {
        group: 'Arithmetic',
        id: "add2",
        name: 'Addition of 2 terms',
        latex: 's_{ }=a_{ }+b_{ }',
        latex_boxes: '\\Box=\\Box+\\Box',
        params_latex: ['s_{ }','a_{ }', 'b_{ }'],
        template: 'sterm = aterm + bterm',
        params: ['sterm', 'aterm', 'bterm'],
        variables: {
            'sterm': 's_{ }',
            'bterm': 'b_{ }',
            'aterm': 'a_{ }'
        },
        domains: {
            'sterm': 'free',
            'bterm': 'free',
            'aterm': 'free'
        },
        height: 42,
        dispheight: 30
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
        latex: 'c_{ }=a_{ }-b_{ }',
        latex_boxes: '\\Box=\\Box-\\Box',
        params_latex: ['c_{ }','b_{ }', 'a_{ }'],
        template: 'cterm = aterm - bterm',
        params: ['cterm', 'aterm', 'bterm'],
        variables: {
            'cterm': 'c_{ }',
            'bterm': 'b_{ }',
            'aterm': 'a_{ }'
        },
        domains: {
            'cterm': 'free',
            'bterm': 'free',
            'aterm': 'free'
        },
        height: 42,
        dispheight: 30
    },
    {
        group: 'Arithmetic',
        id: "div",
        name: 'Division',
        latex: 'c_{ }=\\frac{a_{ }}{b_{ }}',
        latex_boxes: '\\Box=\\dfrac{\\Box}{\\Box}',
        params_latex: ['c_{ }','b_{ }', 'a_{ }'],
        template: 'cterm = aterm / bterm',
        params: ['cterm', 'bterm', 'aterm'],
        variables: {
            'cterm': 'c_{ }',
            'bterm': 'b_{ }',
            'aterm': 'a_{ }'
        },
        domains: {
            'cterm': 'free',
            'bterm': 'free',
            'aterm': 'free'
        },
        height: 60,
        dispheight: 30
    },
    {
        group: 'Arithmetic',
        id: "mult",
        name: 'Multiplication',
        latex: 'c_{ }=a_{ } \\times b_{ }',
        latex_boxes: '\\Box=\\Box\\times\\Box',
        params_latex: ['c_{ }','b_{ }', 'a_{ }'],
        template: 'cterm = aterm * bterm',
        params: ['cterm', 'aterm', 'bterm'],
        variables: {
            'cterm': 'c_{ }',
            'bterm': 'b_{ }',
            'aterm': 'a_{ }'
        },
        domains: {
            'cterm': 'free',
            'bterm': 'free',
            'aterm': 'free'
        },
        height: 42,
        dispheight: 30
    },
    // {
    //     group: 'Arithmetic',
    //     id: "power",
    //     name: 'Power',
    //     latex: 'c_{ } = a_{ } ^ {b_{ }}',
    //     latex_boxes: '\\Box=\\Box^{\\Box}',
    //     params_latex: ['c_{ }','b_{ }', 'a_{ }'],
    //     template: 'cterm = aterm ^ bterm',
    //     params: ['cterm', 'aterm', 'bterm'],
    //     variables: {
    //         'cterm': 'c_{ }',
    //         'bterm': 'b_{ }',
    //         'aterm': 'a_{ }'
    //     },
    //     domains: {
    //         'cterm': 'free',
    //         'bterm': 'free',
    //         'aterm': 'free'
    //     },
    //     height: 30
    // },
    // {
    //     group: 'Arithmetic',
    //     id: "root",
    //     name: 'Root',
    //     latex: 'c_{ } = a_{ } ^ {1/ b_{ }}',
    //     latex_boxes: '\\Box=\\Box^{1/\\Box}',
    //     params_latex: ['c_{ }','b_{ }', 'a_{ }'],
    //     template: 'cterm = aterm ^ (1/bterm)',
    //     params: ['cterm', 'aterm', 'bterm'],
    //     variables: {
    //         'cterm': 'c',
    //         'bterm': 'b',
    //         'aterm': 'a'
    //     },
    //     domains: {
    //         'cterm': 'free',
    //         'bterm': 'free',
    //         'aterm': 'free'
    //     },
    //     height: 30
    // }
]