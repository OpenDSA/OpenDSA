const equations = [
    {
        group: 'Axial',
        name: 'Stress in an axial',
        latex: '\\delta_t=\\alpha\\cdot\\Delta T\\cdot L',
        latex_boxes: '\\Box=\\Box\\times\\Box\\times\\Box',
        params: ['\\delta_t', '\\alpha', '\\Delta T', 'L']
    },
    {
        group: 'Axial',
        name: 'Maximum in-plane shear strain',
        latex: '\\gamma_{max}=\\pm2\\sqrt{\\left(\\frac{\\varepsilon_x - \\varepsilon_y}{2}\\right)^2+\\left(\\frac{\\gamma_{xy}}{2}\\right)^2}',
        latex_boxes: '\\Box=\\pm2\\sqrt{\\left(\\frac{\\Box - \\Box}{2}\\right)^2+\\left(\\frac{\\Box}{2}\\right)^2}',
        params: ['\\gamma_{max}', '\\varepsilon_x', '\\varepsilon_y', '\\gamma_{xy}']
    },
    {
        group: 'Axial',
        name: 'Maximum in-plane shear strain',
        latex: '\\gamma_{max}=\\pm\\sqrt{(\\varepsilon_x-\\varepsilon_y)^2+\\gamma_{xy}^2}',
        latex_boxes: '\\Box=\\pm\\sqrt{(\\Box-\\Box)^2+\\Box^2}',
        params: ['\\gamma_{max}', '\\varepsilon_x', '\\varepsilon_y', '\\gamma_{xy}']
    }
    // {
    //     group: 'Basic definitions',
    //     name: 'Average normal stress in an axial member',
    //     latex: '\\delta_{avg}=\\frac F A',
    //     latex_boxes: '\\square=\\frac \\square \\square',
    //     params: ['\\delta_{avg}', 'F', 'A']
    // },
    // {
    //     group: 'Basic definitions',
    //     name: 'Average direct shear stress',
    //     latex: '\\tau_{avg}=\\frac V {A_v}',
    //     latex_boxes: '\\square=\\frac \\square \\square',
    //     params: ['\\tau_{avg}', 'V', 'A_v']
    // },
    // {
    //     group: 'Basic definitions',
    //     name: 'Average bearing stress',
    //     latex: '\\delta_b=\\frac V {A_b}',
    //     latex_boxes: '',
    //     params: ['\\delta_b', 'V', 'A_b']
    // },
    // {
    //     group: 'Basic definitions',
    //     name: 'Average normal strain in an axial member',
    //     latex: '\\varepsilon_{long}=\\frac{\\Delta L} L',
    //     latex_boxes: '',
    //     params: []
    // },
    // {
    //     group: 'Basic definitions',
    //     name: 'Average normal strain in an axial member',
    //     latex: '\\varepsilon_{lat}=\\frac{\\Delta d} d',
    //     latex_boxes: '',
    //     params: []
    // },
    // {
    //     group: 'Basic definitions',
    //     name: 'Average normal strain caused by temperature change',
    //     latex: '\\varepsilon_T=\\alpha \\cdot \\Delta L',
    //     latex_boxes: '\\square=\\square \\times \\square',
    //     params: []
    // },
    // {
    //     group: 'Basic definitions',
    //     name: 'Relationship between E, G, and ν',
    //     latex: 'G=\\frac E{2(1+\\nu)}',
    //     latex_boxes: '',
    //     params: []
    // },
    // {
    //     group: 'Basic definitions',
    //     name: 'Factor of safety',
    //     latex: '{FS}=\\frac{\\delta_{failure}}{\\delta_{actual}}',
    //     latex_boxes: '',
    //     params: []
    // },
    // {
    //     group: 'Axial deformation',
    //     name: 'Force-temperature-deformation relationship',
    //     latex: '\\delta=\\frac{F\\cdot L}{A\\cdot E} + \\alpha \\cdot \\Delta T\\cdot L',
    //     latex_boxes: '\\square=\\frac{\\square\\times\\square}{\\square\\times\\square} + \\square \\times \\square\\times \\square',
    //     params: ['\\delta', 'F', 'L', 'A', 'E', 'alpha', '\\Delta T', 'L']
    // },
    // {
    //     group: 'Torsion',
    //     name: 'Maximum torsion shear stress in a circular shaft',
    //     latex: '\\tau_{max}=\\frac{T_c}J',
    //     latex_boxes: '\\square=\\frac \\square \\square',
    //     params: []
    // },
    // {
    //     group: 'Torsion',
    //     name: 'J in Maximum torsion shear stress in a circular shaft',
    //     latex: 'J=\\frac\\pi 2 [R^4-r^4]',
    //     latex_boxes: '\\square=\\frac\\pi 2 [\\square^4-\\square^4]',
    //     params: ['J', 'R', 'r']
    // }
]