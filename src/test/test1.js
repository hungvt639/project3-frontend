import React, {useState} from 'react';
import getFactory from '../request/index'
import './test1.css'
import {Upload} from 'antd';
const Test1 = () =>{


    const API = getFactory('user');
    const [selectedFile, setSelectedFile] = useState(null);
       
        const onFileChange = event => { 
        setSelectedFile(event.target.files[0])
        }; 
       const changeAvatar = async (data) => {
        try{
            const res = await API.EditProfile(data);
            console.log(res);
        }catch(e){
            console.log(e);
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
            // console.log(selectedFile); 
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
                    <Upload>
                        Click to upload
                    </Upload>
                </div> 
            {/* {fileData()}  */}
          </div> 
        ); 
      
}
export default Test1;