import React, { useState } from 'react';
import getFactory from '../request/index'
import './test1.css'
const Test1 = () => {
    const API = getFactory('user');
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = event => {
        setSelectedFile(event.target.files[0])
    };
    const changeAvatar = async (data) => {
        try {
            // const res = await API.EditProfile(data);
        } catch (e) {
        }
    }
    const onFileUpload = () => {
        // Create an object of formData 
        const formData = new FormData();
        // Update the formData object 
        formData.append(
            "avatar",
            selectedFile,
            // selectedFile.name 
        );
        // Details of the uploaded file 
        changeAvatar(formData);
    };


    return (
        <div>
            <h1>
                GeeksforGeeks
              </h1>
            <h3>
                File Upload using React!
              </h3>
            <div>
                <input name='avatar' type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>
                    Upload!
                  </button>
            </div>
            {/* {fileData()}  */}
        </div>
    );

}
export default Test1;