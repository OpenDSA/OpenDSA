var testvisualizerTrace = {
    "code": "\tLink p = createList(1,2,3); \n\tLink q = p.next(); \n\n \tp = q; \n\t\n\t\n",
    "trace": [{
            "stdout": "",
            "event": "step_line",
            "line": 1,
            "stack_to_render": [{
                    "func_name": "reAssignPointer:1",
                    "encoded_locals": {},
                    "ordered_varnames": [],
                    "parent_frame_id_list": [],
                    "is_highlighted": true,
                    "is_zombie": false,
                    "is_parent": false,
                    "unique_hash": "142",
                    "frame_id": 142
                }
            ],
            "globals": {},
            "ordered_globals": [],
            "func_name": "reAssignPointer",
            "heap": {}
        }, {
            "stdout": "",
            "event": "step_line",
            "line": 2,
            "stack_to_render": [{
                    "func_name": "reAssignPointer:2",
                    "encoded_locals": {
                        "p": ["REF", 478]
                    },
                    "ordered_varnames": ["p"],
                    "parent_frame_id_list": [],
                    "is_highlighted": true,
                    "is_zombie": false,
                    "is_parent": false,
                    "unique_hash": "168",
                    "frame_id": 168
                }
            ],
            "globals": {},
            "ordered_globals": [],
            "func_name": "reAssignPointer",
            "heap": {
                "478": ["INSTANCE", "Link", ["e", 1],
                    ["n", ["REF", 476]]
                ],
                "476": ["INSTANCE", "Link", ["e", 2],
                    ["n", ["REF", 474]]
                ],
                "474": ["INSTANCE", "Link", ["e", 3],
                    ["n", null]
                ],
                "475": 3,
                "477": 2,
                "479": 1
            }
        }, {
            "stdout": "",
            "event": "step_line",
            "line": 4,
            "stack_to_render": [{
                    "func_name": "reAssignPointer:4",
                    "encoded_locals": {
                        "p": ["REF", 478],
                        "q": ["REF", 476]
                    },
                    "ordered_varnames": ["p", "q"],
                    "parent_frame_id_list": [],
                    "is_highlighted": true,
                    "is_zombie": false,
                    "is_parent": false,
                    "unique_hash": "170",
                    "frame_id": 170
                }
            ],
            "globals": {},
            "ordered_globals": [],
            "func_name": "reAssignPointer",
            "heap": {
                "476": ["INSTANCE", "Link", ["e", 2],
                    ["n", ["REF", 474]]
                ],
                "474": ["INSTANCE", "Link", ["e", 3],
                    ["n", null]
                ],
                "475": 3,
                "477": 2,
                "478": ["INSTANCE", "Link", ["e", 1],
                    ["n", ["REF", 476]]
                ],
                "479": 1
            }
        }, {
            "stdout": "",
            "event": "step_line",
            "line": 4,
            "stack_to_render": [{
                    "func_name": "reAssignPointer:4",
                    "encoded_locals": {
                        "p": ["REF", 476],
                        "q": ["REF", 476]
                    },
                    "ordered_varnames": ["p", "q"],
                    "parent_frame_id_list": [],
                    "is_highlighted": true,
                    "is_zombie": false,
                    "is_parent": false,
                    "unique_hash": "176",
                    "frame_id": 176
                }
            ],
            "globals": {},
            "ordered_globals": [],
            "func_name": "reAssignPointer",
            "heap": {
                "476": ["INSTANCE", "Link", ["e", 2],
                    ["n", ["REF", 474]]
                ],
                "474": ["INSTANCE", "Link", ["e", 3],
                    ["n", null]
                ],
                "475": 3,
                "477": 2
            }
        }
    ],
    "userlog": "Debugger VM maxMemory: 807M \n "
}
$(document).ready(function() { 
 
 	 var testvisualizer = new ExecutionVisualizer('testvisualizerDiv', testvisualizerTrace,{embeddedMode: false, lang: 'java', heightChangeCallback: redrawAllVisualizerArrows}); 
 
 	function redrawAllVisualizerArrows() { 
 
 	 	 if (testvisualizer) testvisualizer.redrawConnectors(); 
 	 } 
 
 $(window).resize(redrawAllVisualizerArrows); 
});