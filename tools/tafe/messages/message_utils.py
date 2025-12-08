# from tafe.core.report import ReportContext
# from tafe.core.global_objects import eqbank

from core.report import ReportContext
from core.global_objects import eqbank

def get_html_equation_palette(
    equation_palette_id: str
) -> str:
    clickable_string = \
        '<span class="param" data-type=\"pallette-eq\" data-page=\"'\
            +str(eqbank[equation_palette_id])\
                +'\" data-item=\"'+\
                    str(equation_palette_id)+\
                        '\">this equation</span>'
    return clickable_string

def get_html_equation_in_workspace(
    equation_workspace_id: str,
) -> str:
    clickable_string = \
        '<span class="param" data-type=\"eq\" data-item=\"'+\
            equation_workspace_id+\
                '\">this equation</span>'
    return clickable_string

def get_html_parameter_box(
    equation_box_id: str,
    value: int,
    unit: str
) -> str:
    if equation_box_id == "":
        clickable_string = \
        '<span class="param" data-type=\"box\"\">'\
            +str(value)+" "+unit+\
                '</span>'
    else:
        clickable_string = \
        '<span class="param" data-type=\"box\" data-item=\"'+\
            str(equation_box_id)+\
                '\">'+str(value)+" "+unit+\
                    '</span>'
    
    return clickable_string