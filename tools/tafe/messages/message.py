class MessageText:
    
    # Constructor for basic text messages
    # Especially used when solution type is a text/choice type
    # eg: Solution 1: You didn't answer this question!
    # can double as default constructor when params are left alone
    def __init__(self, 
                 list_soln_id: list[int] = [],
                 int_soln_id: int = -1,
                 str_soln_text: str = ""
                 ) -> None:
        if str_soln_text == "":
            self.message_solution_text = None
        
        if int_soln_id == -1 and len(list_soln_id) == 0:
            self.message_solution_id = []
        elif int_soln_id > -1 and len(list_soln_id) > 0:
            raise TypeError
        else:
            if int_soln_id > -1:
                self.message_solution_id = [int_soln_id]
            else:
                self.message_solution_id = list_soln_id
        