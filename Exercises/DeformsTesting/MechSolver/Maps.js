Window.unitDomainMap = {
    'm': ['length', 'm'],
    'mm': ['length', 'mm'],
    'cm': ['length', 'cm'],
    'km': ['length', 'km'],
    'in': ['length', 'in'],
    'ft': ['length', 'ft'],
    'degC': ['temperature', 'C'],
    'degF': ['temperature', 'F'],
    'degR': ['temperature', 'R'],
    'K': ['temperature', 'K'],
    'degC^(-1)': ['temperature-1', '/C'],
    'degF^(-1)': ['temperature-1', '/F'],
    'degR^(-1)': ['temperature-1', '/R'],
    'K^(-1)': ['temperature-1', '/K'],
    'Pa': ['pressure', 'Pa'],
    'kPa': ['pressure', 'kPa'],
    'MPa': ['pressure', 'MPa'],
    'GPa': ['pressure', 'GPa'],
    'psi': ['pressure', 'psi'],
    'ksi': ['pressure', 'ksi'],
    'msi': ['pressure', 'msi'],
    'N': ['force', 'N'],
    'kN': ['force', 'kN'],
    'MN': ['force', 'MN'],
    'lbf': ['force', 'lbf'],
    'kip': ['force', 'kip'],
    'mip': ['force', 'mip'],
    'W': ['power', 'W'],
    'kW': ['power', 'kW'],
    'MW': ['power', 'MW'],
    'hp': ['power', 'hp'],
    'lbf ft/s': ['power', 'lb-force ft/s'],
    'rad': ['angles', 'rad'],
    'deg': ['angles', 'deg'],
    'grad': ['angles', 'grad'],
    'strain': ['strain', ' '],
    'microstrain': ['strain', ' '],
    'percentstrain': ['strain', '%']
}
Window.UNIT_DB = {
    'length': {
        //cm m mm km inch feet
        'metre': {'unit':'m', 'unitDisp':'m'},
        'millimetre': {'unit':'mm', 'unitDisp':'mm'},
        'centimetre': {'unit':'cm', 'unitDisp':'cm'},
        'kilometre': {'unit':'km', 'unitDisp':'km'},
        'inch': {'unit':'in', 'unitDisp':'in'},
        'feet': {'unit':'ft', 'unitDisp':'ft'},
    },
    'temperature': {
        'degree C': {'unit':'degC', 'unitDisp':'C'},
        'degree F': {'unit':'degF', 'unitDisp':'F'},
        'degree R': {'unit':'degR', 'unitDisp':'R'},
        'degree K': {'unit':'K', 'unitDisp':'K'}
    },
    'temperature-1': {
        'inv degree C': {'unit':'degC^(-1)', 'unitDisp':'/C'},
        'inv degree F': {'unit':'degF^(-1)', 'unitDisp':'/F'},
        'inv degree R': {'unit':'degR^(-1)', 'unitDisp':'/R'},
        'inv degree K': {'unit':'K^(-1)', 'unitDisp':'/K'}
    },
    'pressure': {
        // Pa, kPA, MPa, GPa, ksi, msi, psi
        'pascal': {'unit':'Pa', 'unitDisp':'Pa'},
        'kilopascal': {'unit':'kPa', 'unitDisp':'kPa'},
        'megapascal': {'unit':'MPa', 'unitDisp':'MPa'},
        'gigapascal': {'unit':'GPa', 'unitDisp':'GPa'},
        'psi': {'unit':'psi', 'unitDisp':'psi'},
        'ksi': {'unit':'ksi', 'unitDisp':'ksi'},
        'msi': {'unit':'msi', 'unitDisp':'msi'}
    },
    'force': {
        // kips lbs mips N kN MN 
        'newton': {'unit':'N', 'unitDisp':'N'},
        'kilonewton': {'unit':'kN', 'unitDisp':'kN'},
        'meganewton': {'unit':'MN', 'unitDisp':'MN'},
        'poundforce': {'unit': 'lbf', 'unitDisp':'lbf'},
        'kip-force': {'unit': 'kip', 'unitDisp':'kip'},
        'mip-force': {'unit': 'mip', 'unitDisp':'mip'},
    },
    'power': {
        // W kW MW 'ft lb/s' hp
        'watt': {'unit':'W', 'unitDisp':'W'},
        'kilowatt': {'unit':'kW', 'unitDisp':'kW'},
        'megawatt': {'unit':'MW', 'unitDisp':'MW'},
        'horsepower': {'unit':'hp', 'unitDisp':'hp'},
        'pound-feet/s': {'unit':'lbf ft/s', 'unitDisp':'lb-force ft/s'}
    },
    'angularvelocity': {
        // To be added after discussion

    },
    'angles': {
        "radian": {'unit':'rad', 'unitDisp':'radian'},
        "degree": {'unit':'deg', 'unitDisp':'deg'},
        "gradient": {'unit':'grad', 'unitDisp':'grad'}
    },
    'strain': {
        // Needs separate definitions for connecting strain to other things
        "strain": {'unit':'strain', 'unitDisp':''},
        "microstrain": {'unit':'microstrain', 'unitDisp':''},
        "percentstrain": {'unit':'percentstrain', 'unitDisp':'%'},
    },
    // '': {
    //     "": {'unit':'', 'unitDisp':''},
    // }
};

Window.defaultDomains = {
    'length': {
        'SI': 'metre',
        'imperial': 'feet'
    },
    'temperature': {
        'SI': 'degree C',
        'imperial': 'degree F'
    },
    'temperature-1': {
        'SI': 'inv degree C',
        'imperial': 'inv degree F'
    },
    'pressure': {
        'SI': 'pascal',
        'imperial': 'psi'
    },
    'force': {
        'SI': 'newton',
        'imperial': 'poundforce'
    },
    'power': {
        'SI': 'watt',
        'imperial': 'horsepower'
    },
    'angles': {
        'SI': 'radian',
        'imperial': 'degree'
    },
    'strain': {
        'SI': 'strain',
        'imperial': 'strain'
    },
    // '': {
    //     'SI': '',
    //     'imperial': ''
    // },
}