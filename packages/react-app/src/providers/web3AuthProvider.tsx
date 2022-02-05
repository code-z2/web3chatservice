import React, { useState, useEffect } from "react";
import { web3authcore, metamaskAdapter, openloginAdapter } from "../auth";
import Web3AuthContext from "./context";
import {
  SafeEventEmitterProvider,
  ADAPTER_EVENTS,
  CONNECTED_EVENT_DATA,
} from "@web3auth/base";
import { Web3AuthCore } from "@web3auth/core";

const Web3AuthProvider = (props) => {
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [providerIsSet, setProviderIsSet] = useState(false);

  const subscribeAuthEvents = (web3auth: Web3AuthCore) => {
    web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
      setIsConnected(true);
      setIsConnecting(false);
    });

    web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      setIsConnecting(true);
    });

    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      setIsConnected(false);
    });

    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      console.log("login request cancelled", error);
    });
  };

  const Initialize = async () => {
    web3authcore.configureAdapter(metamaskAdapter);
    web3authcore.configureAdapter(openloginAdapter);
    subscribeAuthEvents(web3authcore);
    await web3authcore.init();
  };

  const connect = async () => {
    await web3authcore.connectTo(metamaskAdapter.name).then((value) => {
      setProvider(value);
      setProviderIsSet(true);
    });
  };

  const getUser = async () => {
    return await web3authcore.getUserInfo();
  };

  const logout = async () => {
    await web3authcore.logout();
  };

  const values = {
    provider,
    providerIsSet,
    isConnected,
    isConnecting,
    connect,
    getUser,
    logout,
  };

  useEffect(() => {
    Initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Web3AuthContext.Provider value={values}>
      {props.children}
    </Web3AuthContext.Provider>
  );
};

function useWeb3Auth() {
  const context = React.useContext(Web3AuthContext);
  if (context === undefined) {
    throw new Error("useWeb3Auth must be used within a Web3AuthProvider");
  }
  return context;
}

export { Web3AuthProvider, useWeb3Auth };
