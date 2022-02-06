from brownie import ChatController, accounts, config
from scripts.helpful_scripts import fund_with_link
import time


def main():
    dev = accounts.add(config["wallets"]["from_key"])
    chat_controller = ChatController[len(ChatController) - 1]
    fund_with_link(chat_controller.address)
    transaction = chat_controller.createController("None", {"from": dev})
    transaction.wait(1)