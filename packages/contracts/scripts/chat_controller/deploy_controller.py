from brownie import ChatController, accounts, network, config
from scripts.helpful_scripts import fund_with_link, get_publish_source


def main():
    dev = accounts.add(config["wallets"]["from_key"])
    print(network.show_active())
    chat_controller = ChatController.deploy(
        config["networks"][network.show_active()]["vrf_coordinator"],
        config["networks"][network.show_active()]["link_token"],
        config["networks"][network.show_active()]["key_hash"],
        config["networks"][network.show_active()]["fee"],
        {"from": dev},
        publish_source=get_publish_source(),
    )
    fund_with_link(chat_controller.address)
    return chat_controller
