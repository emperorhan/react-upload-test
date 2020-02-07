import { createUploadLink } from "apollo-upload-client";
import { HttpOptions } from "apollo-link-http-common";
import { ApolloLink, Operation } from "apollo-link";

import { config } from "../../config";

// const uri = config.HASURA_GRAPHQL_ENDPOINT;
// const uri = config.GRAPHQL_ENDPOINT;
const uri = "http://localhost:9000/graphql";

const httpOptions: HttpOptions = {
    uri,
    headers: {
        "x-hasura-admin-secret": 1234
    }
};
const uploadLink: ApolloLink = createUploadLink(httpOptions);

const isFile = (value: any): boolean =>
    (typeof File !== "undefined" && value instanceof File) ||
    (typeof Blob !== "undefined" && value instanceof Blob) ||
    (typeof FileList !== "undefined" && value instanceof FileList);

const isUpload = ({ variables }: Operation): boolean =>
    Object.values(variables).some(isFile);

export { uploadLink, isFile, isUpload };
