import "./index.css"
import { ApolloProvider } from "@apollo/react-hooks"
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'
import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import App from "./App"

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals(console.log);

