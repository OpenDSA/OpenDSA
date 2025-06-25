import pint

ureg = pint.UnitRegistry()
ureg.define('strain = [length]/[length]')
ureg.define('microstrain = 0.000001 * strain')
ureg.define('percentstrain = 0.01 * strain')
ureg.define('rev = revolution')
ureg.define('Radian = radian')

# message_text is placed here to remove errors, resolve later
message_text = None

def compare_quantities(m_magn, m_unit, a_magn, a_unit, debug=False):
    """
    Compares two comparable numeric quantities to see if they are within tolerable
    limits or not (0.1% of correct answer). Returns True or False
    """
    global ureg

    try:
        if m_unit == "":
            solutionComparableValue = m_magn;
            return abs((solutionComparableValue - a_magn) / solutionComparableValue) <= 0.0001 # corrected after DemoProblem error
        else:
            # solutionComparableValue = unit_parse.parser(f"{m_magn} {m_unit}").to(a_unit)
            solutionComparableValue = ureg.Quantity(m_magn, m_unit).to(a_unit)
            if debug:
                print(abs((solutionComparableValue.magnitude - a_magn) / solutionComparableValue.magnitude))
            return abs((solutionComparableValue.magnitude - a_magn) / solutionComparableValue.magnitude) <= 0.0001 # corrected after DemoProblem error
        
    except pint.DimensionalityError:
        return False
    
def compile_messages():
    """
    Takes the messages_text contents and puts them together
    to be printed on individual lines as required by the parser in the UI
    """
    
    for soln_id in message_text:
        if soln_id.isnumeric():
            if message_text[soln_id]["decision"] is not None:
                for line in message_text[soln_id].setdefault("decision", []):
                    print(line)
            if message_text[soln_id]["details"] is not None:
                for line in message_text[soln_id].setdefault("details", []):
                    print(line)
        else:
            if message_text[soln_id]["details"]:
                print("Errors for solutions "+",".join(
                    sorted(list(map(lambda x: str(int(x)+1),soln_id.split(',')))))
                )
                for line in message_text[soln_id].setdefault("details", []):
                    print(line)

def clean_json(json_string_attempt: str) -> str:
    """formats the json string received on the command line
    so it can be parsed into a json object.
    Modifies the string received in-place.
    Used only when invoked inside OpenDSA from an exercise over the Flask API
    
    Parameters:
    json_string_attempt (str): the json object of the attempt
    received via command line from the actual problem
    """
    
    # Cleans up everything inside of the opening and closing quotes
    
    return json_string_attempt[1:-1] \
        .replace('\'','\"') \
        .replace("None","null") \
        .replace("False","false") \
        .replace("True","true")

def print_error(error_text, error=None):
    print("{\"error\":\""+error_text+" "+str(error)+"\"}", end="")
