import React from "react";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "react-apollo-hooks";

// const SINGLE_UPLOAD_IMG_MUTATION = gql`
//     mutation SingleUploadImg($file: Upload!) {
//         SingleUploadImg(file: $file) {
//             ok
//             error
//             file {
//                 filename
//                 mimetype
//                 encoding
//             }
//         }
//     }
// `;
// const UPLOAD_FILES_MUTATION = gql`
//     mutation UploadFiles($files: [Upload!]!, $type: String) {
//         UploadFiles(files: $files, type: $type) {
//             ok
//             error
//         }
//     }
// `;

const UPLOAD_IMGS_MUTATION = gql`
    mutation UploadFiles($files: [Upload!]!) {
        UploadFiles(files: $files, type: "image") {
            ok
            error
        }
    }
`;

const App: React.FC = () => {
    const [uploadImgsMutation] = useMutation(UPLOAD_IMGS_MUTATION);
    const apolloClient = useApolloClient();
    const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
        target: { validity, files }
    }) => {
        console.log(files);

        if (validity.valid && files) {
            const { data } = await uploadImgsMutation({
                variables: { files }
            });
            console.log(`upload success ${data}`);
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

// const App: React.FC = () => {
//     const [uploadImgMutation] = useMutation(SINGLE_UPLOAD_IMG_MUTATION);
//     const apolloClient = useApolloClient();
//     const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
//         target: { validity, files }
//     }) => {
//         if (validity.valid && files) {
//             if (files.length > 1) {
//                 const data = await uploadImgMutation({
//                     variables: { files }
//                 });
//                 console.log(`upload success ${data}`);
//             } else {
//                 const file = files[0];
//                 const { data } = await uploadImgMutation({
//                     variables: { file }
//                 });
//                 console.log(`upload success ${data}`);
//             }
//         }
//     };
//     return (
//         <div
//             style={{
//                 height: "-webkit-fill-available",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center"
//             }}
//         >
//             <div>
//                 <label>Single Upload</label>
//                 <br />
//                 <input type="file" onChange={onChange} />
//             </div>
//             <div>
//                 <label>Multi Upload</label>
//                 <br />

//                 <input type="file" multiple required onChange={onChange} />
//             </div>
//         </div>
//     );
// };

export default App;
