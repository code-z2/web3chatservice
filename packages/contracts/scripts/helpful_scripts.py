from brownie import (
    network,
    accounts,
    config,
    interface,
)
import os


def get_publish_source():
    if not os.getenv("POLYGONSCAN_TOKEN"):
        return False
    else:
        return True


def fund_with_link(contract_address, amount=1000000000000000000):
    dev = accounts.add(config["wallets"]["from_key"])
    link_token = config["networks"][network.show_active()]["link_token"]
    tx = interface.LinkTokenInterface(link_token).transfer(
        contract_address, amount, {"from": dev}
    )
    print(f"Funded {contract_address}")
    return tx
