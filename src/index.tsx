import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo-hooks";
import { createApolloClient } from "./graphql/apollo-client";
// import { AppRouter } from "./router";
import App from "./app";
import { config } from "./config";

console.log(config.IMAGE_ENDPOINT);
console.log(config.GRAPHQL_ENDPOINT);
console.log(config.HASURA_GRAPHQL_ENDPOINT);

const apolloClient = createApolloClient();

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
