import { from, ApolloLink } from "apollo-link";
import { ApolloClient, ApolloClientOptions } from "apollo-client";

import { cache } from "./cache";
import { uploadLink } from "./middlewares";

function createApolloClient(): ApolloClient<any> {
    const apolloLinks: ApolloLink[] = [uploadLink];
    const apolloClientOptions: ApolloClientOptions<any> = {
        link: from(apolloLinks),
        cache
    };

    return new ApolloClient<any>(apolloClientOptions);
}

export { createApolloClient };
