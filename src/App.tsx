import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useApolloClient, useQuery } from "react-apollo-hooks";
import { config } from "./config";

const UPLOAD_IMGS_MUTATION = gql`
    mutation UploadFiles($files: [Upload!]!) {
        UploadFiles(files: $files) {
            ok
            error
        }
    }
`;

const UPLOAD_PRODUCT_THUMBNAILS_MUTATION = gql`
    mutation UploadProductThumbnails($files: [Upload!]!) {
        UploadProductThumbnails(files: $files) {
            ok
            error
            thumbnailIds
        }
    }
`;

const UPLOAD_PRODUCT_IMAGE_MUTATION = gql`
    mutation UploadProductImages($files: [Upload!]!) {
        UploadProductImages(files: $files) {
            ok
            error
            data {
                id
                filepath
            }
        }
    }
`;

const CREATE_PRODUCT = gql`
    mutation CreateProduct(
        $user_id: Int!
        $name: String!
        $price: String!
        $ipfs_link: String!
        $description: String!
        $category1: String!
        $imageIds: [String!]
        $thumbnailIds: [[String!]!]!
    ) {
        CreateProduct(
            user_id: $user_id
            name: $name
            price: $price
            ipfs_link: $ipfs_link
            description: $description
            category1: $category1
            imageIds: $imageIds
            thumbnailIds: $thumbnailIds
        ) {
            ok
            error
            productId
        }
    }
`;

const TEST = gql`
    query GetTest {
        GetTest {
            hello
        }
    }
`;

interface IFile {
    user_id: number;
    name: string;
    price: string;
    ipfs_link: string;
    description: string;
    category1: string;
    files: FileList | undefined;
}

interface IThumbnailResponse {
    UploadProductThumbnails: {
        ok: boolean;
        error: string;
        thumbnailIds: string[][];
    };
}

interface ICreateProductResponse {
    CreateProduct: {
        ok: boolean;
        error: string;
        productId: string;
    };
}

interface IImgResponse {
    UploadProductImages: {
        ok: boolean;
        error: string;
        data: [
            {
                id: string;
                filepath: string;
            }
        ];
    };
}

interface IImgMetaData {
    id: string;
    filepath: string;
}

const App: React.FC = () => {
    const [uploadThumbnailsMutation] = useMutation<IThumbnailResponse>(
        UPLOAD_PRODUCT_THUMBNAILS_MUTATION
    );
    const [createProductMutation] = useMutation<ICreateProductResponse>(
        CREATE_PRODUCT
    );
    const [uploadImagesMutation] = useMutation<IImgResponse>(
        UPLOAD_PRODUCT_IMAGE_MUTATION
    );
    const { loading, error, data: testData } = useQuery(TEST);
    const apolloClient = useApolloClient();
    const [value, setValue] = useState<IFile>({
        user_id: 0,
        name: "",
        price: "",
        ipfs_link: "",
        description: "",
        category1: "",
        files: undefined
    });
    const [imgs, setImgs] = useState<IImgMetaData[]>();

    const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
        target: { validity, files }
    }) => {
        console.log(files);

        if (validity.valid && files) {
            setValue({
                ...value,
                files
            });
        }
    };

    const onChange2: React.ChangeEventHandler<HTMLInputElement> = async ({
        target: { validity, files }
    }) => {
        if (validity.valid && files) {
            const res: { id: string; filepath: string }[] | undefined = (
                await uploadImagesMutation({
                    variables: { files }
                })
            ).data?.UploadProductImages.data.map(value => {
                return { id: value.id, filepath: value.filepath };
            });
            console.log(`upload success ${res}`);
            if (res) {
                setImgs(res);
            } else {
                throw new Error("no imgs");
            }
        }
    };

    const Test = async (e: any) => {
        alert(JSON.stringify(testData));
    };

    const updateField = (e: any) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e: any) => {
        e.preventDefault();
        console.log(value);
        try {
            const UploadThumbnailIds = (
                await uploadThumbnailsMutation({
                    variables: {
                        files: value.files
                    }
                })
            ).data?.UploadProductThumbnails.thumbnailIds;
            console.log(UploadThumbnailIds);

            const imageIds = imgs ? imgs.map(img => img.id) : [];

            const productId = (
                await createProductMutation({
                    variables: {
                        user_id: Number(value.user_id),
                        name: value.name,
                        price: value.price,
                        ipfs_link: value.ipfs_link,
                        description: value.description,
                        category1: value.category1,
                        imageIds,
                        thumbnailIds: UploadThumbnailIds
                    }
                })
            ).data?.CreateProduct.productId;

            console.log(`create product ${productId}`);
            debugger;
        } catch (error) {
            console.log(error);
            debugger;
        }
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div
                    style={{
                        height: "-webkit-fill-available",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <label>
                        User Id
                        <input
                            type="number"
                            value={value.user_id}
                            name="user_id"
                            onChange={updateField}
                        />
                    </label>
                    <br />
                    <label>
                        Product Name
                        <input
                            value={value.name}
                            name="name"
                            onChange={updateField}
                        />
                    </label>
                    <br />
                    <label>
                        Product Price
                        <input
                            value={value.price}
                            name="price"
                            onChange={updateField}
                        />
                    </label>
                    <br />
                    <label>
                        Product IPFS Link
                        <input
                            value={value.ipfs_link}
                            name="ipfs_link"
                            onChange={updateField}
                        />
                    </label>
                    <br />
                    <label>
                        Product Description
                        <input
                            value={value.description}
                            name="description"
                            onChange={updateField}
                        />
                    </label>
                    <br />
                    <label>
                        Product Category
                        <input
                            value={value.category1}
                            name="category1"
                            onChange={updateField}
                        />
                    </label>
                </div>
                <div
                    style={{
                        height: "-webkit-fill-available",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <div>
                        <label>Thumbnail Uploads</label>
                        <br />

                        <input
                            type="file"
                            multiple
                            required
                            onChange={onChange}
                        />
                    </div>
                </div>
                <br />
                <button type="submit">Submit</button>
            </form>
            <div>
                <label>Image Uploads</label>
                <br />

                <input type="file" multiple required onChange={onChange2} />
            </div>
            {/* <img src={`${config.IMAGE_ENDPOINT}${img}`} /> */}
            <div>
                {imgs?.map(img => {
                    return <img src={`http://localhost:9000${img.filepath}`} />;
                })}
            </div>
            <div>
                <label>Test</label>
                <br />
                <button type="button" onClick={Test}>
                    클릭!
                </button>
            </div>
        </div>
    );
};

export default App;
