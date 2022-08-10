{
    "parameters": {
        "param1": {
            "id": "param1",
            "type": "question_parameter",
            "valueDisplay": "20mm",
            "value": "20",
            "unit": "mm",
            "parent": "question_params"
        },
        "param2": {
            "id": "param2",
            "type": "question_parameter",
            "valueDisplay": "25mm",
            "value": "25",
            "unit": "mm",
            "parent": "question_params"
        },
        "param3": {
            "id": "param3",
            "type": "question_parameter",
            "valueDisplay": "600Nm",
            "value": "600",
            "unit": "Nm",
            "parent": "question_params"
        },
        "param4": {
            "id": "param4",
            "type": "question_parameter",
            "valueDisplay": "40GPa",
            "value": "40",
            "unit": "GPa",
            "parent": "question_params"
        },
        "param5": {
            "id": "param5",
            "type": "question_parameter",
            "valueDisplay": "25GPa",
            "value": "25",
            "unit": "GPa",
            "parent": "question_params"
        },
        "param6": {
            "id": "param6",
            "type": "question_parameter",
            "valueDisplay": "0.7m",
            "value": "0.7",
            "unit": "m",
            "parent": "question_params"
        },
        "param7": {
            "id": "param7",
            "type": "question_parameter",
            "valueDisplay": "1.0m",
            "value": "1.0",
            "unit": "m",
            "parent": "question_params"
        }
    },
    "workspaces": {
        "1": {
            "id": 1,
            "name": "wk1",
            "equations": {
                "0": {
                    "id": "wk1_add2_1_1",
                    "equation_template_id": "add2",
                    "variables": {
                        "sterm": {
                            "id": "wk1_add2_1_1_sterm",
                            "name": "sterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "s_{}",
                                "parentSymbolTemplate": "s_{}",
                                "parentSymbol": "s_{T}"
                            },
                            "currentSymbol": "a_a",
                            "expectedDomain": "free",
                            "currentDomain": "torque",
                            "currentUnit": "Nm",
                            "valueType": "number",
                            "valueSource": "param3",
                            "valueNegated": false,
                            "value": "600"
                        },
                        "aterm": {
                            "id": "wk1_add2_1_1_aterm",
                            "name": "aterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "a_{}",
                                "parentSymbolTemplate": "a_{}",
                                "parentSymbol": "a_{T}"
                            },
                            "currentSymbol": "a_b",
                            "expectedDomain": "free",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_j",
                                "varDisplay": "T_{Al}",
                                "varDisplayTemplate": "T_{}"
                            }
                        },
                        "bterm": {
                            "id": "wk1_add2_1_1_bterm",
                            "name": "bterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "b_{}",
                                "parentSymbolTemplate": "b_{}",
                                "parentSymbol": "b_{T}"
                            },
                            "currentSymbol": "a_c",
                            "expectedDomain": "free",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_o",
                                "varDisplay": "T_{Br}",
                                "varDisplayTemplate": "T_{2}"
                            }
                        }
                    }
                },
                "1": {
                    "id": "wk1_add2_2_2",
                    "equation_template_id": "add2",
                    "variables": {
                        "sterm": {
                            "id": "wk1_add2_2_2_sterm",
                            "name": "sterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "s_{}",
                                "parentSymbolTemplate": "s_{2}",
                                "parentSymbol": "s_{phi}"
                            },
                            "currentSymbol": "a_d",
                            "expectedDomain": "free",
                            "currentDomain": "angle",
                            "currentUnit": "Radian",
                            "valueType": "number",
                            "valueSource": "",
                            "valueNegated": false,
                            "value": "0"
                        },
                        "aterm": {
                            "id": "wk1_add2_2_2_aterm",
                            "name": "aterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "a_{}",
                                "parentSymbolTemplate": "a_{2}",
                                "parentSymbol": "a_{phi}"
                            },
                            "currentSymbol": "a_e",
                            "expectedDomain": "free",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_g",
                                "varDisplay": "\\phi_{Al}",
                                "varDisplayTemplate": "\\phi_{}"
                            }
                        },
                        "bterm": {
                            "id": "wk1_add2_2_2_bterm",
                            "name": "bterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "b_{}",
                                "parentSymbolTemplate": "b_{2}",
                                "parentSymbol": "b_{phi}"
                            },
                            "currentSymbol": "a_f",
                            "expectedDomain": "free",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_l",
                                "varDisplay": "\\phi_{Br}",
                                "varDisplayTemplate": "\\phi_{2}"
                            }
                        }
                    }
                },
                "2": {
                    "id": "wk1_angletwist_3_1",
                    "equation_template_id": "angletwist",
                    "variables": {
                        "angletwist": {
                            "id": "wk1_angletwist_3_1_angletwist",
                            "name": "angletwist",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "\\phi_{}",
                                "parentSymbolTemplate": "\\phi_{}",
                                "parentSymbol": "\\phi_{Al}"
                            },
                            "currentSymbol": "a_g",
                            "expectedDomain": "angle",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_g",
                                "varDisplay": "\\phi_{Al}",
                                "varDisplayTemplate": "\\phi_{}"
                            }
                        },
                        "mominertia": {
                            "id": "wk1_angletwist_3_1_mominertia",
                            "name": "mominertia",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "J_{}",
                                "parentSymbolTemplate": "J_{}",
                                "parentSymbol": "J_{Al}"
                            },
                            "currentSymbol": "a_h",
                            "expectedDomain": "length4",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_h",
                                "varDisplay": "J_{Al}",
                                "varDisplayTemplate": "J_{}"
                            }
                        },
                        "coeffGshstress": {
                            "id": "wk1_angletwist_3_1_coeffGshstress",
                            "name": "coeffGshstress",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "G_{}",
                                "parentSymbolTemplate": "G_{}",
                                "parentSymbol": "G_{Al}"
                            },
                            "currentSymbol": "a_i",
                            "expectedDomain": "pressure",
                            "currentDomain": "pressure",
                            "currentUnit": "GPa",
                            "valueType": "number",
                            "valueSource": "param5",
                            "valueNegated": false,
                            "value": "25"
                        },
                        "torque": {
                            "id": "wk1_angletwist_3_1_torque",
                            "name": "torque",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "T_{}",
                                "parentSymbolTemplate": "T_{}",
                                "parentSymbol": "T_{Al}"
                            },
                            "currentSymbol": "a_j",
                            "expectedDomain": "torque",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": true,
                            "value": {
                                "var": "a_j",
                                "varDisplay": "T_{Al}",
                                "varDisplayTemplate": "T_{}"
                            }
                        },
                        "length": {
                            "id": "wk1_angletwist_3_1_length",
                            "name": "length",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "L_{}",
                                "parentSymbolTemplate": "L_{}",
                                "parentSymbol": "L_{Al}"
                            },
                            "currentSymbol": "a_k",
                            "expectedDomain": "length",
                            "currentDomain": "length",
                            "currentUnit": "m",
                            "valueType": "number",
                            "valueSource": "param7",
                            "valueNegated": false,
                            "value": "1.0"
                        }
                    }
                },
                "3": {
                    "id": "wk1_angletwist_4_2",
                    "equation_template_id": "angletwist",
                    "variables": {
                        "angletwist": {
                            "id": "wk1_angletwist_4_2_angletwist",
                            "name": "angletwist",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "\\phi_{}",
                                "parentSymbolTemplate": "\\phi_{2}",
                                "parentSymbol": "\\phi_{Br}"
                            },
                            "currentSymbol": "a_l",
                            "expectedDomain": "angle",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_l",
                                "varDisplay": "\\phi_{Br}",
                                "varDisplayTemplate": "\\phi_{2}"
                            }
                        },
                        "mominertia": {
                            "id": "wk1_angletwist_4_2_mominertia",
                            "name": "mominertia",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "J_{}",
                                "parentSymbolTemplate": "J_{2}",
                                "parentSymbol": "J_{Br}"
                            },
                            "currentSymbol": "a_m",
                            "expectedDomain": "length4",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_m",
                                "varDisplay": "J_{Br}",
                                "varDisplayTemplate": "J_{2}"
                            }
                        },
                        "coeffGshstress": {
                            "id": "wk1_angletwist_4_2_coeffGshstress",
                            "name": "coeffGshstress",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "G_{}",
                                "parentSymbolTemplate": "G_{2}",
                                "parentSymbol": "G_{Br}"
                            },
                            "currentSymbol": "a_n",
                            "expectedDomain": "pressure",
                            "currentDomain": "pressure",
                            "currentUnit": "GPa",
                            "valueType": "number",
                            "valueSource": "param4",
                            "valueNegated": false,
                            "value": "40"
                        },
                        "torque": {
                            "id": "wk1_angletwist_4_2_torque",
                            "name": "torque",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "T_{}",
                                "parentSymbolTemplate": "T_{2}",
                                "parentSymbol": "T_{Br}"
                            },
                            "currentSymbol": "a_o",
                            "expectedDomain": "torque",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_o",
                                "varDisplay": "T_{Br}",
                                "varDisplayTemplate": "T_{2}"
                            }
                        },
                        "length": {
                            "id": "wk1_angletwist_4_2_length",
                            "name": "length",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "L_{}",
                                "parentSymbolTemplate": "L_{2}",
                                "parentSymbol": "L_{Br}"
                            },
                            "currentSymbol": "a_p",
                            "expectedDomain": "length",
                            "currentDomain": "length",
                            "currentUnit": "m",
                            "valueType": "number",
                            "valueSource": "param6",
                            "valueNegated": false,
                            "value": "0.7"
                        }
                    }
                },
                "4": {
                    "id": "wk1_momInertiaDiameter_5_1",
                    "equation_template_id": "momInertiaDiameter",
                    "variables": {
                        "mominertia": {
                            "id": "wk1_momInertiaDiameter_5_1_mominertia",
                            "name": "mominertia",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "J_{}",
                                "parentSymbolTemplate": "J_{}",
                                "parentSymbol": "J_{Al}"
                            },
                            "currentSymbol": "a_q",
                            "expectedDomain": "length4",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_h",
                                "varDisplay": "J_{Al}",
                                "varDisplayTemplate": "J_{}"
                            }
                        },
                        "diameter": {
                            "id": "wk1_momInertiaDiameter_5_1_diameter",
                            "name": "diameter",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "d_{}",
                                "parentSymbolTemplate": "d_{}",
                                "parentSymbol": "d_{Al}"
                            },
                            "currentSymbol": "a_r",
                            "expectedDomain": "length",
                            "currentDomain": "length",
                            "currentUnit": "mm",
                            "valueType": "number",
                            "valueSource": "param2",
                            "valueNegated": false,
                            "value": "25"
                        }
                    }
                },
                "5": {
                    "id": "wk1_momInertiaDiameter_6_2",
                    "equation_template_id": "momInertiaDiameter",
                    "variables": {
                        "mominertia": {
                            "id": "wk1_momInertiaDiameter_6_2_mominertia",
                            "name": "mominertia",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "J_{}",
                                "parentSymbolTemplate": "J_{2}",
                                "parentSymbol": "J_{Br}"
                            },
                            "currentSymbol": "a_s",
                            "expectedDomain": "length4",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_m",
                                "varDisplay": "J_{Br}",
                                "varDisplayTemplate": "J_{2}"
                            }
                        },
                        "diameter": {
                            "id": "wk1_momInertiaDiameter_6_2_diameter",
                            "name": "diameter",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "d_{}",
                                "parentSymbolTemplate": "d_{2}",
                                "parentSymbol": "d_{Br}"
                            },
                            "currentSymbol": "a_t",
                            "expectedDomain": "length",
                            "currentDomain": "length",
                            "currentUnit": "m",
                            "valueType": "number",
                            "valueSource": "param1",
                            "valueNegated": false,
                            "value": 0.02
                        }
                    }
                },
                "7": {
                    "id": "wk1_shearMaxTorque1_8_1",
                    "equation_template_id": "shearMaxTorque1",
                    "variables": {
                        "shearstress": {
                            "id": "wk1_shearMaxTorque1_8_1_shearstress",
                            "name": "shearstress",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "\\tau_{}",
                                "parentSymbolTemplate": "\\tau_{}",
                                "parentSymbol": "\\tau_{Br}"
                            },
                            "currentSymbol": "a_y",
                            "expectedDomain": "pressure",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": null,
                            "valueSource": null,
                            "valueNegated": false,
                            "value": "wk1_shearMaxTorque1_8_1_shearstress"
                        },
                        "mominertia": {
                            "id": "wk1_shearMaxTorque1_8_1_mominertia",
                            "name": "mominertia",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "J_{}",
                                "parentSymbolTemplate": "J_{}",
                                "parentSymbol": "J_{Br}"
                            },
                            "currentSymbol": "a_z",
                            "expectedDomain": "length4",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_m",
                                "varDisplay": "J_{Br}",
                                "varDisplayTemplate": "J_{2}"
                            }
                        },
                        "torque": {
                            "id": "wk1_shearMaxTorque1_8_1_torque",
                            "name": "torque",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "T_{}",
                                "parentSymbolTemplate": "T_{}",
                                "parentSymbol": "T_{Br}"
                            },
                            "currentSymbol": "b_a",
                            "expectedDomain": "torque",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_o",
                                "varDisplay": "T_{Br}",
                                "varDisplayTemplate": "T_{2}"
                            }
                        },
                        "diameter": {
                            "id": "wk1_shearMaxTorque1_8_1_diameter",
                            "name": "diameter",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "d_{}",
                                "parentSymbolTemplate": "d_{}",
                                "parentSymbol": "d_{Br}"
                            },
                            "currentSymbol": "b_b",
                            "expectedDomain": "length",
                            "currentDomain": "length",
                            "currentUnit": "m",
                            "valueType": "number",
                            "valueSource": "param1",
                            "valueNegated": false,
                            "value": 0.02
                        }
                    }
                }
            },
            "solutionBoxes": {
                "1": {
                    "value": 290.11923031519297,
                    "unit": "Nm",
                    "variable": "a_o",
                    "variableDisplay": "T_{Br}",
                    "valueSourceParent": "a_o",
                    "valueNegated": false
                },
                "3": {
                    "value": 0.32318574942015,
                    "unit": "Radian",
                    "variable": "a_l",
                    "variableDisplay": "\\phi_{Br}",
                    "valueSourceParent": "a_l",
                    "valueNegated": false
                },
                "6": {
                    "value": 184.67757109722973,
                    "unit": "MPa",
                    "variable": "a_y",
                    "variableDisplay": "\\tau_{Br}",
                    "valueSourceParent": "a_y",
                    "valueNegated": false
                },
                "a_j": {
                    "box_id_current": 0,
                    "value": 309.880769684807,
                    "unit": "Nm",
                    "variable": "a_j",
                    "variableDisplay": "T_{Al}"
                },
                "a_o": {
                    "box_id_current": 1,
                    "value": 290.11923031519297,
                    "unit": "Nm",
                    "variable": "a_o",
                    "variableDisplay": "T_{Br}"
                },
                "a_g": {
                    "box_id_current": 2,
                    "value": -0.32318574942015,
                    "unit": "Radian",
                    "variable": "a_g",
                    "variableDisplay": "\\phi_{Al}"
                },
                "a_l": {
                    "box_id_current": 3,
                    "value": 0.32318574942015,
                    "unit": "Radian",
                    "variable": "a_l",
                    "variableDisplay": "\\phi_{Br}"
                },
                "a_h": {
                    "box_id_current": 4,
                    "value": 3.835327e-08,
                    "unit": "m^4",
                    "variable": "a_h",
                    "variableDisplay": "J_{Al}"
                },
                "a_m": {
                    "box_id_current": 5,
                    "value": 1.57095e-08,
                    "unit": "m^4",
                    "variable": "a_m",
                    "variableDisplay": "J_{Br}"
                },
                "a_y": {
                    "box_id_current": 6,
                    "value": 184677571.09722972,
                    "unit": "Pa",
                    "variable": "a_y",
                    "variableDisplay": "\\tau_{Br}"
                }
            }
        }
    },
    "solutions": {
        "0": {
            "id": "0",
            "solution": "290.1",
            "unit": "Nm",
            "source": "a_o",
            "parent": "solution_box",
            "type": "number"
        },
        "1": {
            "id": "1",
            "solution": "184.7",
            "unit": "MPa",
            "source": "a_y",
            "parent": "solution_box",
            "type": "number"
        },
        "2": {
            "id": "2",
            "solution": "0.3232",
            "unit": "Radian",
            "source": "a_l",
            "parent": "solution_box",
            "type": "number"
        }
    },
    "varmap": {
        "a_j": "T_{Al}",
        "a_o": "T_{Br}",
        "a_g": "\\phi_{Al}",
        "a_l": "\\phi_{Br}",
        "a_y": "\\tau_{Br}"
    }
}