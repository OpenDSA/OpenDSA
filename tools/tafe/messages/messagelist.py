"""
Dedicated class to manage lists of messages and combine them as required
Also used by Resolver


"""
from messages.message import MessageText

class MessageList:

    # special constructor in case someone needs to send the list directly
    def __init__(self, list_message_obj: [MessageText] = None) -> None:
        
        if list_message_obj == None:
            self.dict_message_texts = {}
            self.list_message_texts = []
        
        else:    
            self.dict_message_texts = {}
            self.list_message_texts = list_message_obj

            # TODO: add text to turn list of MessageText objects
            # into a MessageText dictionary, indexed by the solution ID
            # #list_message_obj
            
            # once you have everything setup, this will be the merge step/reduce step
            self.merge_messages(list_message_obj)
    
    def merge_messages(list_message_obj):
        """Combines a list of message texts

        Returns:
            MessageText: new combined MessageText object,
            with the message IDs combined and text in one place
        """
        combined_message = MessageText()
        
        return combined_message