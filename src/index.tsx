import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo-hooks";
import { createApolloClient } from "./graphql/apollo-client";
// import { AppRouter } from "./router";
import App from "./app";

const apolloClient = createApolloClient();

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
