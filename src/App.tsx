import React from "react";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "react-apollo-hooks";

const SINGLE_UPLOAD_IMG_MUTATION = gql`
    mutation SingleUploadImg($file: Upload!) {
        SingleUploadImg(file: $file) {
            ok
            error
            file {
                filename
                mimetype
                encoding
            }
        }
    }
`;

const App: React.FC = () => {
    const [uploadImgMutation] = useMutation(SINGLE_UPLOAD_IMG_MUTATION);
    const apolloClient = useApolloClient();
    const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
        target: { validity, files }
    }) => {
        if (validity.valid && files) {
            if (files.length > 1) {
                const data = await uploadImgMutation({
                    variables: { files }
                });
                console.log(`upload success ${data}`);
            } else {
                const file = files[0];
                const { data } = await uploadImgMutation({
                    variables: { file }
                });
                console.log(`upload success ${data}`);
            }
        }
    };
    return (
        <div
            style={{
                height: "-webkit-fill-available",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div>
                <label>Single Upload</label>
                <br />
                <input type="file" onChange={onChange} />
            </div>
            <div>
                <label>Multi Upload</label>
                <br />

                <input type="file" multiple required onChange={onChange} />
            </div>
        </div>
    );
};

export default App;
