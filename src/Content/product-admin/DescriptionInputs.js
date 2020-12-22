import React from 'react';
import { CloseOutlined } from '@ant-design/icons';


const DescriptionInputs = ({ descriptions, description, index, setDescriptions }) => {
    function getBase64(file) {
        var reader = new FileReader();
        reader.onloadend = function () {
            setDescriptions(descriptions.slice(0, index).concat({ ...descriptions[index], "image": reader.result, "img": file }).concat(descriptions.slice(index + 1)))
        }
        reader.readAsDataURL(file);
        return reader
    }
    const handleImageChange = (val) => {
        getBase64(val.target.files[0])

    }

    const handleChange = (val) => {
        console.log(val.target.value)
        setDescriptions(descriptions.slice(0, index).concat({ ...descriptions[index], "text": val.target.value }).concat(descriptions.slice(index + 1)))
    }
    const deleteInput = () => {
        setDescriptions(descriptions.slice(0, index).concat(descriptions.slice(index + 1)))
    }
    return (
        <div className="description_inputs">
            <div className="description_inputs_texts">
                <textarea value={description.text} className="description_inputs_text" type="text" placeholder='Chi tiết' id='text' onChange={handleChange} />
                <button onClick={deleteInput} className="description_inputs_x"><CloseOutlined /></button>
            </div>

            <label className="custom-file-upload">
                <input type="file"
                    id="image"
                    accept="image/png, image/jpeg" onChange={handleImageChange} />
                {description.image ? <img className="description_inputs_img" src={description.image} alt="ảnh" /> : <div className="description_inputs_image"><p>+</p><p>Ảnh</p></div>}
            </label>
        </div>
    )
}
export default DescriptionInputs;