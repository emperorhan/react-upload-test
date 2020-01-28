import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

interface IOptions {
    NODE_ENV: string;
    HOST: string;
    PORT: string | number;
    GRAPHQL_PORT: string | number;
    GRAPHQL_ROUTE: string;
    GRAPHQL_ENDPOINT: string;
    HASURA_GRAPHQL_HOST: string;
    HASURA_GRAPHQL_PORT: string | number;
    HASURA_GRAPHQL_VERSION: string;
    HASURA_GRAPHQL_ADMIN_SECRET: string;
    HASURA_GRAPHQL_JWT_SECRET: string;
    HASURA_GRAPHQL_ENDPOINT: string;
}

const config: IOptions = {
    NODE_ENV: process.env.NODE_ENV || "development",
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3000,
    GRAPHQL_PORT: process.env.GRAPHQL_PORT || 9000,
    GRAPHQL_ROUTE: process.env.GRAPHQL_ROUTE || "/graphql",
    GRAPHQL_ENDPOINT: "",
    HASURA_GRAPHQL_HOST: process.env.HASURA_GRAPHQL_HOST || "localhost",
    HASURA_GRAPHQL_PORT: process.env.HASURA_GRAPHQL_PORT || 26060,
    HASURA_GRAPHQL_VERSION: process.env.HASURA_GRAPHQL_VERSION || "v1",
    HASURA_GRAPHQL_ADMIN_SECRET:
        process.env.HASURA_GRAPHQL_ADMIN_SECRET || "1234",
    HASURA_GRAPHQL_JWT_SECRET: process.env.HASURA_GRAPHQL_JWT_SECRET || "",
    HASURA_GRAPHQL_ENDPOINT: ""
};

config.GRAPHQL_ENDPOINT = `http://${config.HOST}:${config.GRAPHQL_PORT}${config.GRAPHQL_ROUTE}`;
config.HASURA_GRAPHQL_ENDPOINT = `http://${config.HASURA_GRAPHQL_HOST}:${config.HASURA_GRAPHQL_PORT}/${config.HASURA_GRAPHQL_VERSION}${config.GRAPHQL_ROUTE}`;

export { config };
