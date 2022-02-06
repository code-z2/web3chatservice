import { useState } from "react";
import Web3 from "web3";
import { useWeb3Auth } from "../providers/web3AuthProvider";


function useWeb3() {
    const { provider, providerIsSet, isConnected } = useWeb3Auth();
    const [address, setAddress] = useState();

    const web3 = (providerIsSet && isConnected) ? new Web3(provider) : !null;

    const addr = async () => {
        //@ts-ignore
        await web3.eth.getAccounts().then((value) => setAddress(value[0]))
    }
    const getAddress = () => {
        if (providerIsSet && isConnected) addr();
        return address;
    }

    const signMessage = async (message) => {
        //@ts-ignore
        await web3.eth.personal.sign(message, address);
    }

    const sendTransaction = async (destination) => {
        //@ts-ignore
        await web3.eth.sendTransaction({
            from: address,
            to: destination,
            //@ts-ignore
            value: web3.utils.toWei(1),
        });
    }

    return { getAddress, signMessage, sendTransaction };
}

export default useWeb3;