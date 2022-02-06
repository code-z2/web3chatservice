from brownie import ChatController
from scripts.helpful_scripts import fund_with_link


def main():
    chat_controller = ChatController[len(ChatController) - 1]
    fund_with_link(chat_controller.address)
