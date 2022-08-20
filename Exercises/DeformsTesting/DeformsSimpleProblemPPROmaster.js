{
    "parameters": {
        "param1": {
            "id": "param1",
            "type": "question_parameter",
            "valueDisplay": "50mm",
            "value": "50",
            "unit": "mm",
            "parent": "question_params"
        },
        "param2": {
            "id": "param2",
            "type": "question_parameter",
            "valueDisplay": "50mm",
            "value": "50",
            "unit": "mm",
            "parent": "question_params"
        },
        "param3": {
            "id": "param3",
            "type": "question_parameter",
            "valueDisplay": "1mm",
            "value": "1",
            "unit": "mm",
            "parent": "question_params"
        },
        "param4": {
            "id": "param4",
            "type": "question_parameter",
            "valueDisplay": "25degC",
            "value": "25",
            "unit": "degC",
            "parent": "question_params"
        },
        "param5": {
            "id": "param5",
            "type": "question_parameter",
            "valueDisplay": "70GPa",
            "value": "70",
            "unit": "GPa",
            "parent": "question_params"
        },
        "param6": {
            "id": "param6",
            "type": "question_parameter",
            "valueDisplay": "0.000023degC^-1",
            "value": "0.000023",
            "unit": "degC^-1",
            "parent": "question_params"
        },
        "param7": {
            "id": "param7",
            "type": "question_parameter",
            "valueDisplay": "100degC",
            "value": "100",
            "unit": "degC",
            "parent": "question_params"
        },
        "param8": {
            "id": "param8",
            "type": "question_parameter",
            "valueDisplay": "0.8m",
            "value": "0.8",
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
                    "id": "wk1_axialStress_1_1",
                    "equation_template_id": "axialStress",
                    "variables": {
                        "deform": {
                            "id": "wk1_axialStress_1_1_deform",
                            "name": "deform",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "\\delta_{T_{}}",
                                "parentSymbolTemplate": "\\delta_{T_{}}",
                                "parentSymbol": "\\delta_{T_{}}"
                            },
                            "currentSymbol": "a_v",
                            "expectedDomain": "length",
                            "currentDomain": "length",
                            "currentUnit": "mm",
                            "valueType": "number",
                            "valueSource": "param3",
                            "valueNegated": false,
                            "value": "1"
                        },
                        "thermalcoeff": {
                            "id": "wk1_axialStress_1_1_thermalcoeff",
                            "name": "thermalcoeff",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "\\alpha_{}",
                                "parentSymbolTemplate": "\\alpha_{}",
                                "parentSymbol": "\\alpha_{}"
                            },
                            "currentSymbol": "a_w",
                            "expectedDomain": "temperature-1",
                            "currentDomain": "temperature-1",
                            "currentUnit": "degC^-1",
                            "valueType": "number",
                            "valueSource": "param6",
                            "valueNegated": false,
                            "value": "0.000023"
                        },
                        "tempchange": {
                            "id": "wk1_axialStress_1_1_tempchange",
                            "name": "tempchange",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "\\DeltaT_{}",
                                "parentSymbolTemplate": "\\DeltaT_{}",
                                "parentSymbol": "\\DeltaT_{}"
                            },
                            "currentSymbol": "a_x",
                            "expectedDomain": "temperature",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_x",
                                "varDisplay": "\\DeltaT_{}",
                                "varDisplayTemplate": "\\DeltaT_{}"
                            }
                        },
                        "length": {
                            "id": "wk1_axialStress_1_1_length",
                            "name": "length",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "L_{}",
                                "parentSymbolTemplate": "L_{}",
                                "parentSymbol": "L_{}"
                            },
                            "currentSymbol": "a_y",
                            "expectedDomain": "length",
                            "currentDomain": "length",
                            "currentUnit": "m",
                            "valueType": "number",
                            "valueSource": "param8",
                            "valueNegated": false,
                            "value": "0.8"
                        }
                    }
                },
                "1": {
                    "id": "wk1_add2_2_1",
                    "equation_template_id": "add2",
                    "variables": {
                        "sterm": {
                            "id": "wk1_add2_2_1_sterm",
                            "name": "sterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "s_{}",
                                "parentSymbolTemplate": "s_{}",
                                "parentSymbol": "s_{}"
                            },
                            "currentSymbol": "b_h",
                            "expectedDomain": "free",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": null,
                            "valueSource": null,
                            "valueNegated": false,
                            "value": "wk1_add2_2_1_sterm"
                        },
                        "aterm": {
                            "id": "wk1_add2_2_1_aterm",
                            "name": "aterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "a_{}",
                                "parentSymbolTemplate": "a_{}",
                                "parentSymbol": "a_{}"
                            },
                            "currentSymbol": "b_i",
                            "expectedDomain": "free",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_x",
                                "varDisplay": "\\DeltaT_{}",
                                "varDisplayTemplate": "\\DeltaT_{}"
                            }
                        },
                        "bterm": {
                            "id": "wk1_add2_2_1_bterm",
                            "name": "bterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "b_{}",
                                "parentSymbolTemplate": "b_{}",
                                "parentSymbol": "b_{}"
                            },
                            "currentSymbol": "b_j",
                            "expectedDomain": "free",
                            "currentDomain": "temperature",
                            "currentUnit": "degC",
                            "valueType": "number",
                            "valueSource": "param4",
                            "valueNegated": false,
                            "value": "25"
                        }
                    }
                }
            },
            "solutionBoxes": {
                "0": {
                    "value": 54.3478260869565,
                    "unit": "degC",
                    "variable": "a_x",
                    "variableDisplay": "\\DeltaT_{}",
                    "valueSourceParent": "a_x",
                    "valueNegated": false
                },
                "1": {
                    "value": 79.3478260869565,
                    "unit": "degC",
                    "variable": "b_h",
                    "variableDisplay": "s_{}",
                    "valueSourceParent": "b_h",
                    "valueNegated": false
                },
                "a_x": {
                    "box_id_current": 0,
                    "value": 54.3478260869565,
                    "unit": "degC",
                    "variable": "a_x",
                    "variableDisplay": "\\DeltaT_{}"
                },
                "b_h": {
                    "box_id_current": 1,
                    "value": 79.3478260869565,
                    "unit": "degC",
                    "variable": "b_h",
                    "variableDisplay": "s_{}"
                }
            }
        },
        "2": {
            "id": 2,
            "name": "wk2",
            "equations": {
                "0": {
                    "id": "wk2_axialStress_1_1",
                    "equation_template_id": "axialStress",
                    "variables": {
                        "deform": {
                            "id": "wk2_axialStress_1_1_deform",
                            "name": "deform",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "\\delta_{T_{}}",
                                "parentSymbolTemplate": "\\delta_{T_{}}",
                                "parentSymbol": "\\delta_{T_{}}"
                            },
                            "currentSymbol": "a_z",
                            "expectedDomain": "length",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_z",
                                "varDisplay": "\\delta_{T_{}}",
                                "varDisplayTemplate": "\\delta_{T_{}}"
                            }
                        },
                        "thermalcoeff": {
                            "id": "wk2_axialStress_1_1_thermalcoeff",
                            "name": "thermalcoeff",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "\\alpha_{}",
                                "parentSymbolTemplate": "\\alpha_{}",
                                "parentSymbol": "\\alpha_{}"
                            },
                            "currentSymbol": "b_a",
                            "expectedDomain": "temperature-1",
                            "currentDomain": "temperature-1",
                            "currentUnit": "degC^-1",
                            "valueType": "number",
                            "valueSource": "param6",
                            "valueNegated": false,
                            "value": "0.000023"
                        },
                        "tempchange": {
                            "id": "wk2_axialStress_1_1_tempchange",
                            "name": "tempchange",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "\\DeltaT_{}",
                                "parentSymbolTemplate": "\\DeltaT_{}",
                                "parentSymbol": "\\DeltaT_{}"
                            },
                            "currentSymbol": "b_b",
                            "expectedDomain": "temperature",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "b_b",
                                "varDisplay": "\\DeltaT_{}",
                                "varDisplayTemplate": "\\DeltaT_{}"
                            }
                        },
                        "length": {
                            "id": "wk2_axialStress_1_1_length",
                            "name": "length",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "L_{}",
                                "parentSymbolTemplate": "L_{}",
                                "parentSymbol": "L_{}"
                            },
                            "currentSymbol": "b_c",
                            "expectedDomain": "length",
                            "currentDomain": "length",
                            "currentUnit": "m",
                            "valueType": "number",
                            "valueSource": "param8",
                            "valueNegated": false,
                            "value": "0.8"
                        }
                    }
                },
                "1": {
                    "id": "wk2_deformationAxialMemberStressLE_2_1",
                    "equation_template_id": "deformationAxialMemberStressLE",
                    "variables": {
                        "deform": {
                            "id": "wk2_deformationAxialMemberStressLE_2_1_deform",
                            "name": "deform",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "\\delta_{}",
                                "parentSymbolTemplate": "\\delta_{}",
                                "parentSymbol": "\\delta_{}"
                            },
                            "currentSymbol": "b_d",
                            "expectedDomain": "length",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "b_d",
                                "varDisplay": "\\delta_{}",
                                "varDisplayTemplate": "\\delta_{}"
                            }
                        },
                        "normalstress": {
                            "id": "wk2_deformationAxialMemberStressLE_2_1_normalstress",
                            "name": "normalstress",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "\\sigma_{}",
                                "parentSymbolTemplate": "\\sigma_{}",
                                "parentSymbol": "\\sigma_{}"
                            },
                            "currentSymbol": "b_e",
                            "expectedDomain": "pressure",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": null,
                            "valueSource": null,
                            "valueNegated": false,
                            "value": "wk2_deformationAxialMemberStressLE_2_1_normalstress"
                        },
                        "coeffEnstress": {
                            "id": "wk2_deformationAxialMemberStressLE_2_1_coeffEnstress",
                            "name": "coeffEnstress",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "E_{}",
                                "parentSymbolTemplate": "E_{}",
                                "parentSymbol": "E_{}"
                            },
                            "currentSymbol": "b_f",
                            "expectedDomain": "pressure",
                            "currentDomain": "pressure",
                            "currentUnit": "GPa",
                            "valueType": "number",
                            "valueSource": "param5",
                            "valueNegated": false,
                            "value": "70"
                        },
                        "length": {
                            "id": "wk2_deformationAxialMemberStressLE_2_1_length",
                            "name": "length",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "L_{}",
                                "parentSymbolTemplate": "L_{}",
                                "parentSymbol": "L_{}"
                            },
                            "currentSymbol": "b_g",
                            "expectedDomain": "length",
                            "currentDomain": "length",
                            "currentUnit": "m",
                            "valueType": "number",
                            "valueSource": "param8",
                            "valueNegated": false,
                            "value": "0.8"
                        }
                    }
                },
                "2": {
                    "id": "wk2_add2_3_1",
                    "equation_template_id": "add2",
                    "variables": {
                        "sterm": {
                            "id": "wk2_add2_3_1_sterm",
                            "name": "sterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "s_{}",
                                "parentSymbolTemplate": "s_{}",
                                "parentSymbol": "s_{}"
                            },
                            "currentSymbol": "b_k",
                            "expectedDomain": "free",
                            "currentDomain": "temperature",
                            "currentUnit": "degC",
                            "valueType": "number",
                            "valueSource": "param7",
                            "valueNegated": false,
                            "value": "100"
                        },
                        "aterm": {
                            "id": "wk2_add2_3_1_aterm",
                            "name": "aterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "a_{}",
                                "parentSymbolTemplate": "a_{}",
                                "parentSymbol": "a_{}"
                            },
                            "currentSymbol": "b_l",
                            "expectedDomain": "free",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "b_b",
                                "varDisplay": "\\DeltaT_{}",
                                "varDisplayTemplate": "\\DeltaT_{}"
                            }
                        },
                        "bterm": {
                            "id": "wk2_add2_3_1_bterm",
                            "name": "bterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "b_{}",
                                "parentSymbolTemplate": "b_{}",
                                "parentSymbol": "b_{}"
                            },
                            "currentSymbol": "b_m",
                            "expectedDomain": "free",
                            "currentDomain": "temperature",
                            "currentUnit": "degC",
                            "valueType": "number",
                            "valueSource": "param4",
                            "valueNegated": false,
                            "value": "25"
                        }
                    }
                },
                "3": {
                    "id": "wk2_add2_4_2",
                    "equation_template_id": "add2",
                    "variables": {
                        "sterm": {
                            "id": "wk2_add2_4_2_sterm",
                            "name": "sterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "s_{}",
                                "parentSymbolTemplate": "s_{2}",
                                "parentSymbol": "s_{2}"
                            },
                            "currentSymbol": "b_n",
                            "expectedDomain": "free",
                            "currentDomain": "length",
                            "currentUnit": "mm",
                            "valueType": "number",
                            "valueSource": "param3",
                            "valueNegated": false,
                            "value": "1"
                        },
                        "aterm": {
                            "id": "wk2_add2_4_2_aterm",
                            "name": "aterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "a_{}",
                                "parentSymbolTemplate": "a_{2}",
                                "parentSymbol": "a_{2}"
                            },
                            "currentSymbol": "b_o",
                            "expectedDomain": "free",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "b_d",
                                "varDisplay": "\\delta_{}",
                                "varDisplayTemplate": "\\delta_{}"
                            }
                        },
                        "bterm": {
                            "id": "wk2_add2_4_2_bterm",
                            "name": "bterm",
                            "symbol_context": {
                                "parentSymbolTemplateZero": "b_{}",
                                "parentSymbolTemplate": "b_{2}",
                                "parentSymbol": "b_{2}"
                            },
                            "currentSymbol": "b_p",
                            "expectedDomain": "free",
                            "currentDomain": null,
                            "currentUnit": null,
                            "valueType": "association",
                            "valueSource": null,
                            "valueNegated": false,
                            "value": {
                                "var": "a_z",
                                "varDisplay": "\\delta_{T_{}}",
                                "varDisplayTemplate": "\\delta_{T_{}}"
                            }
                        }
                    }
                }
            },
            "solutionBoxes": {
                "0": {
                    "value": 1.38,
                    "unit": "mm",
                    "variable": "a_z",
                    "variableDisplay": "\\delta_{T_{}}",
                    "valueSourceParent": "a_z",
                    "valueNegated": false
                },
                "1": {
                    "value": 75,
                    "unit": "degC",
                    "variable": "b_b",
                    "variableDisplay": "\\DeltaT_{}",
                    "valueSourceParent": "b_b",
                    "valueNegated": false
                },
                "2": {
                    "value": -0.38,
                    "unit": "mm",
                    "variable": "b_d",
                    "variableDisplay": "\\delta_{}",
                    "valueSourceParent": "b_d",
                    "valueNegated": false
                },
                "3": {
                    "value": -33.250000000000014,
                    "unit": "MPa",
                    "variable": "b_e",
                    "variableDisplay": "\\sigma_{}",
                    "valueSourceParent": "b_e",
                    "valueNegated": false
                },
                "a_z": {
                    "box_id_current": 0,
                    "value": 1.38,
                    "unit": "mm",
                    "variable": "a_z",
                    "variableDisplay": "\\delta_{T_{}}"
                },
                "b_b": {
                    "box_id_current": 1,
                    "value": 75,
                    "unit": "degC",
                    "variable": "b_b",
                    "variableDisplay": "\\DeltaT_{}"
                },
                "b_d": {
                    "box_id_current": 2,
                    "value": -0.38,
                    "unit": "mm",
                    "variable": "b_d",
                    "variableDisplay": "\\delta_{}"
                },
                "b_e": {
                    "box_id_current": 3,
                    "value": -0.033250000000000016,
                    "unit": "GPa",
                    "variable": "b_e",
                    "variableDisplay": "\\sigma_{}"
                }
            }
        }
    },
    "solutions": {
        "0": {
            "id": "0",
            "solution": "79.35",
            "unit": "degC",
            "source": "b_h",
            "parent": "solution_box",
            "type": "number"
        },
        "1": {
            "id": "1",
            "solution": "-33.25",
            "unit": "MPa",
            "source": "b_e",
            "parent": "solution_box",
            "type": "number"
        }
    }
}