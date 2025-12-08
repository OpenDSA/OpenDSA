"""
Dedicated class to manage lists of messages and combine them as required
Also used by Resolver
"""
# from tafe.messages.message import MessageText
from messages.message import MessageText

from pprint import pprint

class MessageList:

    # special constructor in case someone needs to send the list directly
    def __init__(self, list_message_obj: list[MessageText] = []) -> None:
        
        if list_message_obj == []:
            self.dict_message_texts = {}
            self.list_message_texts = []
        
        else:    
            self.dict_message_texts = {}
            self.list_message_texts = list_message_obj

            # TODO: add text to turn list of MessageText objects
            # into a MessageText dictionary, indexed by the solution ID
            # #list_message_obj
            
            # once you have everything setup, this will be the merge step/reduce step
            self.merge_messages()
    
    def show(self):
        pprint(self.dict_message_texts)

    def merge_messages(self):
        """Combines a list of message texts

        Returns:
            MessageText: new combined MessageText object,
            with the message IDs combined and text in one place

        Uses:
            self.list_message_texts
        """
        combined_message = MessageText()
        
        return combined_message
    
    def add_new_message(self, message_item: dict):
        """
        Gets a new message to add to the dict of messages
        The message_item has the subgroup_ID attached to it,
        so we organize the messages into groups like that.
        """

        assert "subgroup_id" in message_item
        # assert "report_prefix" in message_item
        assert "message_details" in message_item

        if not message_item["subgroup_id"] in self.dict_message_texts:
            self.dict_message_texts[message_item["subgroup_id"]] = []
        
        self.dict_message_texts[
            message_item["subgroup_id"]].append(message_item["message_details"])
        
        # if not message_item["report_prefix"] in self.dict_message_texts[
        #     message_item["subgroup_id"]]:
        #     self.dict_message_texts[
        #         message_item["subgroup_id"]][
        #             message_item["report_prefix"]] = []
        
        # self.dict_message_texts[
        #     message_item["subgroup_id"]][
        #         message_item["report_prefix"]] = message_item["report"]
