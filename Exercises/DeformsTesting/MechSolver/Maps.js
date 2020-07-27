// Creating non-supported units
// mathjs.createUnit('ksi','1000 psi');
// mathjs.createUnit('msi','1000 ksi');
// mathjs.createUnit('mip','1000 kip');

mathjs.createUnit("strain", {definition: "1"});
mathjs.createUnit("microstrain", "1e-6 strain");
mathjs.createUnit("percentstrain", "1e-2 strain");

mathjs.createUnit("rev", 1);
mathjs.createUnit("Radian", 1/(2*mathjs.pi)+" rev");
mathjs.createUnit("Degree",1/360+" rev");
mathjs.createUnit("microRadian", "1e-6 Radian");

mathjs.createUnit("dless", {definition: "1"});

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
    'length-1': {
        //cm m mm km inch feet
        'metre-1': {'unit':'m^-1', 'unitDisp':'/m'},
        'millimetre-1': {'unit':'mm^-1', 'unitDisp':'/mm'},
        'centimetre-1': {'unit':'cm^-1', 'unitDisp':'/cm'},
        'kilometre-1': {'unit':'km^-1', 'unitDisp':'/km'},
        'inch-1': {'unit':'in^-1', 'unitDisp':'/in'},
        'feet-1': {'unit':'ft^-1', 'unitDisp':'/ft'},
    },
    'length2': {
        //cm m mm km inch feet
        'metre2': {'unit':'m^2', 'unitDisp':'m2'},
        'millimetre2': {'unit':'mm^2', 'unitDisp':'mm2'},
        'centimetre2': {'unit':'cm^2', 'unitDisp':'cm2'},
        'inch2': {'unit':'in^2', 'unitDisp':'in2'},
        'feet2': {'unit':'ft^2', 'unitDisp':'ft2'},
    },
    'length-2': {
        //cm m mm km inch feet
        'metre-2': {'unit':'m^-2', 'unitDisp':'/m2'},
        'millimetre-2': {'unit':'mm^-2', 'unitDisp':'/mm2'},
        'centimetre-2': {'unit':'cm^-2', 'unitDisp':'/cm2'},
        'inch-2': {'unit':'in^-2', 'unitDisp':'/in2'},
        'feet-2': {'unit':'ft^-2', 'unitDisp':'/ft2'},
    },
    'length3': {
        //cm m mm km inch feet
        'metre3': {'unit':'m^3', 'unitDisp':'m3'},
        'millimetre3': {'unit':'mm^3', 'unitDisp':'mm3'},
        'centimetre3': {'unit':'cm^3', 'unitDisp':'cm3'},
        'inch3': {'unit':'in^3', 'unitDisp':'in3'},
        'feet3': {'unit':'ft^3', 'unitDisp':'ft3'},
    },
    'length-3': {
        //cm m mm km inch feet
        'metre-3': {'unit':'m^-3', 'unitDisp':'/m3'},
        'millimetre-3': {'unit':'mm^-3', 'unitDisp':'/mm3'},
        'centimetre-3': {'unit':'cm^-3', 'unitDisp':'/cm3'},
        'inch-3': {'unit':'in^-3', 'unitDisp':'/in3'},
        'feet-3': {'unit':'ft^-3', 'unitDisp':'/ft3'},
    },
    'length4': {
        //cm m mm km inch feet
        'metre4': {'unit':'m^4', 'unitDisp':'m4'},
        'millimetre4': {'unit':'mm^4', 'unitDisp':'mm4'},
        'centimetre4': {'unit':'cm^4', 'unitDisp':'cm4'},
        'inch4': {'unit':'in^4', 'unitDisp':'in4'},
        'feet4': {'unit':'ft^4', 'unitDisp':'ft4'},
    },
    'length-4': {
        //cm m mm km inch feet
        'metre-4': {'unit':'m^-4', 'unitDisp':'/m4'},
        'millimetre-4': {'unit':'mm^-4', 'unitDisp':'/mm4'},
        'centimetre-4': {'unit':'cm^-4', 'unitDisp':'/cm4'},
        'inch-4': {'unit':'in^-4', 'unitDisp':'/in4'},
        'feet-4': {'unit':'ft^-4', 'unitDisp':'/ft4'},
    },
    'temperature': {
        'degree C': {'unit':'degC', 'unitDisp':'C'},
        'degree F': {'unit':'degF', 'unitDisp':'F'},
        'degree R': {'unit':'degR', 'unitDisp':'R'},
        'degree K': {'unit':'K', 'unitDisp':'K'}
    },
    'temperature-1': {
        'inv degree C': {'unit':'degC^-1', 'unitDisp':'/C'},
        'inv degree F': {'unit':'degF^-1', 'unitDisp':'/F'},
        'inv degree R': {'unit':'degR^-1', 'unitDisp':'/R'},
        'inv degree K': {'unit':'K^-1', 'unitDisp':'/K'}
    },
    'pressure': {
        // Pa, kPA, MPa, GPa, ksi, msi, psi
        'pascal': {'unit':'Pa', 'unitDisp':'Pa'},
        'kilopascal': {'unit':'kPa', 'unitDisp':'kPa'},
        'megapascal': {'unit':'MPa', 'unitDisp':'MPa'},
        'gigapascal': {'unit':'GPa', 'unitDisp':'GPa'},
        'psi': {'unit':'psi', 'unitDisp':'psi'},
        // 'ksi': {'unit':'ksi', 'unitDisp':'ksi'}, // Disabled until further notice
        // 'msi': {'unit':'msi', 'unitDisp':'msi'} // Disabled until further notice
    },
    'pressure-1': {
        // Pa, kPA, MPa, GPa, ksi, msi, psi
        'pascal-1': {'unit':'Pa^-1', 'unitDisp':'/Pa'},
        'kilopascal-1': {'unit':'kPa^-1', 'unitDisp':'/kPa'},
        'megapascal-1': {'unit':'MPa^-1', 'unitDisp':'/MPa'},
        'gigapascal-1': {'unit':'GPa^-1', 'unitDisp':'/GPa'},
        'psi-1': {'unit':'psi^-1', 'unitDisp':'/psi'},
        // 'ksi-1': {'unit':'ksi^-1', 'unitDisp':'/ksi'}, // Disabled until further notice
        // 'msi-1': {'unit':'msi^-1', 'unitDisp':'/msi'} // Disabled until further notice
    },
    'force': {
        // kips lbs mips N kN MN 
        'newton': {'unit':'N', 'unitDisp':'N'},
        'kilonewton': {'unit':'kN', 'unitDisp':'kN'},
        'meganewton': {'unit':'MN', 'unitDisp':'MN'},
        'poundforce': {'unit': 'lbf', 'unitDisp':'lbf'},
        'kip-force': {'unit': 'kip', 'unitDisp':'kip'},
        // 'mip-force': {'unit': 'mip', 'unitDisp':'mip'}, // Disabled until further notice
    },
    'force-1': {
        // kips lbs mips N kN MN 
        'newton-1': {'unit':'N^-1', 'unitDisp':'/N'},
        'kilonewton-1': {'unit':'kN^-1', 'unitDisp':'/kN'},
        'meganewton-1': {'unit':'MN^-1', 'unitDisp':'/MN'},
        'poundforce-1': {'unit': 'lbf^-1', 'unitDisp':'/lbf'},
        'kip-force-1': {'unit': 'kip^-1', 'unitDisp':'/kip'},
        // 'mip-force-1': {'unit': 'mip^-1', 'unitDisp':'/mip'}, // Disabled until further notice
    },
    'power': {
        // W kW MW 'ft lb/s' hp
        'watt': {'unit':'W', 'unitDisp':'W'},
        'kilowatt': {'unit':'kW', 'unitDisp':'kW'},
        'megawatt': {'unit':'MW', 'unitDisp':'MW'},
        'horsepower': {'unit':'hp', 'unitDisp':'hp'},
        'pound-feet/s': {'unit':'lbf ft/s', 'unitDisp':'lb-force ft/s'}
    },
    'torque': {
        'newtonmetre': {'unit': 'N m', 'unitDisp': 'Nm'},
        'newtonmillimetre': {'unit': 'N mm', 'unitDisp': 'Nmm'},
        'kilonewtonmetre': {'unit': 'kN n', 'unitDisp': 'kNm'},
        'kilonewtonmillimetre': {'unit': 'kN mm', 'unitDisp': 'kNmm'},
        'footpound': {'unit': 'lbf ft', 'unitDisp':'ft-lb'},
        'footmip': {'unit': 'kip ft', 'unitDisp':'ft-kip'},
        // 'footkip': {'unit': 'mip ft', 'unitDisp':'ft-mip'}, // Disabled until further notice
    },
    'angularvelocity': {
        "hertz": {'unit':'Hz', 'unitDisp':'Hz'},
        "rps": {'unit':'rev/s', 'unitDisp':'rev/s'},
        "rpm": {'unit':'rev/mins', 'unitDisp':'rpm'},
        "radpersec": {'unit':'Radian/s', 'unitDisp':'rad/s'},
    },
    'angle': {
        "rev": {'unit':'rev', 'unitDisp':'rev'},
        "radian": {'unit':'Radian', 'unitDisp':'rad'},
        "microradian": {'unit':'microRadian', 'unitDisp':'urad'},
        "degree": {'unit':'Degree', 'unitDisp':'deg'},
    },
    'angle-1': {
        "radian-1": {'unit':'Radian^-1', 'unitDisp':'/rad'},
        "microradian-1": {'unit':'microRadian^-1', 'unitDisp':'/urad'},
        "degree-1": {'unit':'Degree^-1', 'unitDisp':'/deg'},
    },
    'strain': {
        // Needs separate definitions for connecting strain to other things
        "strain": {'unit':'strain', 'unitDisp':'S'},
        "microstrain": {'unit':'microstrain', 'unitDisp':'uS'},
        "percentstrain": {'unit':'percentstrain', 'unitDisp':'%S'},
    },
    'strain-1': {
        // Needs separate definitions for connecting strain to other things
        "strain-1": {'unit':'strain^-1', 'unitDisp':'/S'},
        "microstrain-1": {'unit':'microstrain^-1', 'unitDisp':'/uS'},
        "percentstrain-1": {'unit':'percentstrain^-1', 'unitDisp':'/%S'},
    },
    'dimensionless': {
        'dimensionless': {'unit':'', 'unitDisp':''}
    }
    // '': {
    //     "": {'unit':'', 'unitDisp':''},
    // }
};

Window.unitDomainMap = {};
for(domain in Window.UNIT_DB)
{
    for(unit in Window.UNIT_DB[domain])
    {
        Window.unitDomainMap[Window.UNIT_DB[domain][unit]["unit"]]
        = [domain, Window.UNIT_DB[domain][unit]["unitDisp"]];
    }
}

Window.defaultDomains = {
    'length': {
        'SI': 'metre',
        'imperial': 'feet'
    },
    'length-1': {
        'SI': 'metre-1',
        'imperial': 'feet-1'
    },
    'length2': {
        'SI': 'metre2',
        'imperial': 'feet2'
    },
    'length-2': {
        'SI': 'metre-2',
        'imperial': 'feet-2'
    },
    'length3': {
        'SI': 'metre3',
        'imperial': 'feet3'
    },
    'length-3': {
        'SI': 'metre-3',
        'imperial': 'feet-3'
    },
    'length4': {
        'SI': 'metre4',
        'imperial': 'feet4'
    },
    'length-4': {
        'SI': 'metre-4',
        'imperial': 'feet-4'
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
    'pressure-1': {
        'SI': 'pascal-1',
        'imperial': 'psi-1'
    },
    'force': {
        'SI': 'newton',
        'imperial': 'poundforce'
    },
    'force-1': {
        'SI': 'newton-1',
        'imperial': 'poundforce-1'
    },
    'power': {
        'SI': 'watt',
        'imperial': 'horsepower'
    },
    'torque': {
        'SI': 'newtonmetre',
        'imperial': 'footpound'
    },
    'angle': {
        'SI': 'radian',
        'imperial': 'degree'
    },
    'angle-1': {
        'SI': 'radian-1',
        'imperial': 'degree-1'
    },
    'angularvelocity': {
        'SI': 'hertz',
        'imperial': 'hertz'
    },
    'strain': {
        'SI': 'strain',
        'imperial': 'strain'
    },
    'strain-1': {
        'SI': 'strain-1',
        'imperial': 'strain-1'
    },
    'dimensionless': {
        'SI': '',
        'imperial': ''
    }
    // '': {
    //     'SI': '',
    //     'imperial': ''
    // },
}