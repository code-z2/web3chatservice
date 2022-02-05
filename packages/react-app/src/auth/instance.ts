import { Web3AuthCore } from "@web3auth/core";
import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const polygonMumbaiConfig: CustomChainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x13881",
    rpcTarget: "https://rpc-mumbai.maticvigil.com",
    displayName: "Polygon Mumbai Testnet",
    blockExplorer: "https://mumbai-explorer.matic.today",
    ticker: "matic",
    tickerName: "matic",
};

const metamaskAdapter = new MetamaskAdapter({ chainConfig: polygonMumbaiConfig })
const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
        network: "testnet",
        clientId: "BM4cVG9SqfM3E2iU5la8MoL9zTT36oQeiPSPncdDE01yGed-3TOjc-KCiSXym-qKeOJKx5jlJJmgqwc_LNzSjJU",
        uxMode: "popup"
    }, chainConfig: polygonMumbaiConfig
})

const web3authcore = new Web3AuthCore({
    chainConfig: polygonMumbaiConfig,
});

export { web3authcore, metamaskAdapter, openloginAdapter };
